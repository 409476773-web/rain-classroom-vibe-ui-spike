import { fireEvent, render, waitFor, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { NetworkChart, type NetworkChartProps } from "./network-chart";

const props: NetworkChartProps = {
  caption: "课程关系", reducedMotion: true,
  categories: [{ id: "course", label: "课程" }, { id: "knowledge", label: "知识点" }],
  relations: [{ id: "before", label: "先修", lineStyle: "solid" }, { id: "similar", label: "相似", lineStyle: "dashed" }],
  nodes: [{ id: "a", label: "高等数学", category: "course" }, { id: "b", label: "概率统计", category: "course" }, { id: "c", label: "随机变量", category: "knowledge" }],
  edges: [{ id: "ab", source: "a", target: "b", relation: "before", directed: true }, { id: "ba", source: "b", target: "a", relation: "similar", directed: false, value: 0 }, { id: "bc", source: "b", target: "c", relation: "before", directed: true }],
};

test("structured filtering changes the port face without morphing its endpoint through the card", async () => {
  const nodes = ["a", "b", "c"].map((id, index) => ({ id, label: id, category: "course", x: .5, y: .1 + index * .4 }));
  const edges = [{ id: "ac", source: "a", target: "c", relation: "before", directed: true }];
  const view = render(<NetworkChart {...props} nodes={nodes} edges={edges} variant="structured" reducedMotion={false} />);
  const sourceX = Number(view.container.querySelector('[data-network-node="a"]')!.getAttribute("data-x"));
  const startX = () => Number(view.container.querySelector('[data-network-edge="ac"]')!.getAttribute("d")!.match(/-?\d+(?:\.\d+)?/g)![0]);
  expect(view.container.querySelector(".rain-network")).toHaveAttribute("data-reduced-motion", "false");
  expect(startX()).not.toBe(sourceX);
  view.rerender(<NetworkChart {...props} nodes={nodes.filter(node => node.id !== "b")} edges={edges} variant="structured" reducedMotion={false} />);
  await waitFor(() => expect(startX()).toBe(sourceX), { timeout: 80, interval: 5 });
});

test("direction, line style and exact readings accompany an operable node list", () => {
  const view = render(<NetworkChart {...props} />);
  expect(view.container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  expect(view.getByRole("button", { name: "高等数学，课程" })).toBeInTheDocument();
  const directed = view.container.querySelector('[data-network-edge="ab"]');
  expect(directed).toHaveAttribute("marker-end");
  const reverse = view.container.querySelector('[data-network-edge="ba"]');
  expect(reverse).not.toHaveAttribute("marker-end");
  expect(reverse).toHaveAttribute("stroke-dasharray", "5 4");
  expect(directed?.getAttribute("d")).not.toBe(reverse?.getAttribute("d"));
  expect(view.getByRole("table", { name: "课程关系 · 关系精确数据" })).toHaveTextContent("0");
  expect(view.getByRole("table", { name: "课程关系 · 节点精确数据" })).toHaveTextContent("随机变量");
});

test("pointer and keyboard focus highlight the same neighbours; selection opens the same detail", () => {
  const selected: (string | null)[] = [];
  const view = render(<NetworkChart {...props} onNodeSelect={node => selected.push(node?.id ?? null)} />);
  const node = view.container.querySelector('[data-network-node="a"]')!;
  fireEvent.mouseEnter(node);
  expect(view.container.querySelector('[data-network-edge="ab"]')).toHaveAttribute("data-highlighted", "true");
  expect(view.container.querySelector('[data-network-edge="bc"]')).toHaveAttribute("data-highlighted", "false");
  const knowledge = view.getByRole("button", { name: "随机变量，知识点" });
  fireEvent.focus(knowledge);
  expect(view.container.querySelector('[data-network-edge="bc"]')).toHaveAttribute("data-highlighted", "true");
  expect(view.container.querySelector('[data-network-edge="ab"]')).toHaveAttribute("data-highlighted", "false");
  fireEvent.mouseEnter(node);
  expect(view.container.querySelector('[data-network-edge="ab"]')).toHaveAttribute("data-highlighted", "true");
  expect(view.container.querySelector('[data-network-edge="bc"]')).toHaveAttribute("data-highlighted", "false");
  fireEvent.mouseLeave(node);
  fireEvent.blur(knowledge);
  const button = view.getByRole("button", { name: "高等数学，课程" });
  fireEvent.focus(button);
  expect(view.container.querySelector('[data-network-edge="ab"]')).toHaveAttribute("data-highlighted", "true");
  fireEvent.click(button);
  expect(view.getByRole("region", { name: "节点详情" })).toHaveTextContent("高等数学");
  fireEvent.click(view.getByRole("button", { name: "清除节点选择" }));
  fireEvent.click(node);
  expect(view.getByRole("region", { name: "节点详情" })).toHaveTextContent("高等数学");
  expect(selected).toEqual(["a", null, "a"]);
});

test("filtering clears an absent selection and keeps surviving node identity", () => {
  const selected: (string | null)[] = [];
  const onNodeSelect = (node: { id: string } | null) => selected.push(node?.id ?? null);
  const view = render(<NetworkChart {...props} onNodeSelect={onNodeSelect} />);
  const surviving = view.container.querySelector('[data-network-node="c"]');
  fireEvent.click(view.getByRole("button", { name: "高等数学，课程" }));
  view.rerender(<NetworkChart {...props} nodes={[props.nodes[2]!]} edges={[]} onNodeSelect={onNodeSelect} />);
  expect(view.queryByRole("region", { name: "节点详情" })).toBeNull();
  expect(selected).toEqual(["a", null]);
  expect(view.container.querySelector('[data-network-node="c"]')).toBe(surviving);
});

test("two instances resolve their arrows and gradients inside their own SVG", () => {
  const view = render(<><NetworkChart {...props} /><NetworkChart {...props} /></>);
  const definitions = [...view.container.querySelectorAll("marker, radialGradient")].map(node => node.id);
  expect(definitions.length).toBeGreaterThan(0);
  expect(new Set(definitions).size).toBe(definitions.length);
  for (const svg of view.container.querySelectorAll("svg.rain-network__svg")) {
    for (const node of svg.querySelectorAll("[marker-end], [fill]")) {
      const ref = (node.getAttribute("marker-end") ?? node.getAttribute("fill"))?.match(/^url\(#(.+)\)$/)?.[1];
      if (ref) expect([...svg.querySelectorAll("[id]")].some(definition => definition.id === ref)).toBe(true);
    }
  }
});

test("empty and single-node graphs keep truthful status and operable readings", () => {
  const view = render(<NetworkChart {...props} nodes={[]} edges={[]} />);
  expect(view.getByRole("status")).toHaveTextContent("暂无关系数据");
  view.rerender(<NetworkChart {...props} nodes={[props.nodes[0]!]} edges={[]} />);
  fireEvent.click(view.getByRole("button", { name: "高等数学，课程" }));
  expect(within(view.getByRole("region", { name: "节点详情" })).getByText("暂无相邻关系")).toBeInTheDocument();
  expect(view.container.querySelectorAll("[data-network-edge]")).toHaveLength(0);
});

test("unknown and duplicate category/relation configuration is rejected", () => {
  expect(() => render(<NetworkChart {...props} categories={[]} />)).toThrow(/类别/);
  expect(() => render(<NetworkChart {...props} relations={[]} />)).toThrow(/关系/);
  expect(() => render(<NetworkChart {...props} categories={[props.categories[0]!, props.categories[0]!]} />)).toThrow(/类别/);
});

test.each(["", "unknown", null])("invalid line style %s cannot silently become a solid relationship", lineStyle => {
  expect(() => render(<NetworkChart {...props} relations={props.relations.map(entry => ({ ...entry, lineStyle:lineStyle as never }))} />)).toThrow(/线型/);
});

test("glow is the default and switching presentation preserves selection and relationship semantics", () => {
  const selected: (string | null)[] = [];
  const onNodeSelect = (node: { id: string } | null) => selected.push(node?.id ?? null);
  const view = render(<NetworkChart {...props} onNodeSelect={onNodeSelect} />);
  expect(view.container.querySelector(".rain-network")).toHaveAttribute("data-variant", "glow");
  expect(view.container.querySelector('[data-network-node="b"] circle')).not.toHaveAttribute("stroke");
  expect(view.container.querySelector('[data-network-node="b"]')).toHaveTextContent("概率统计");
  expect([...view.container.querySelectorAll('[data-network-node="b"] text')].map(text => text.textContent).join("")).not.toContain("课程");
  expect(view.container.querySelector("marker")).toHaveAttribute("markerUnits", "strokeWidth");
  fireEvent.click(view.getByRole("button", { name: "高等数学，课程" }));
  const root = view.container.querySelector(".rain-network");
  view.rerender(<NetworkChart {...props} variant="structured" data-recipe="category-wide" onNodeSelect={onNodeSelect} />);
  expect(view.container.querySelector(".rain-network")).toBe(root);
  expect(root).toHaveAttribute("data-variant", "structured");
  expect(root).toHaveAttribute("data-recipe", "category-wide");
  expect(view.container.querySelector('[data-network-node="b"] rect')).not.toBeNull();
  expect(view.getByRole("button", { name: "高等数学，课程" })).toHaveAttribute("aria-pressed", "true");
  expect(view.getByRole("region", { name: "节点详情" })).toHaveAttribute("data-selected-node", "a");
  expect(view.getByRole("region", { name: "节点详情" })).toHaveTextContent("高等数学 → 概率统计 · 先修");
  expect(view.container.querySelector('[data-network-edge="ba"]')).not.toHaveAttribute("marker-end");
  expect(view.container.querySelector('[data-network-edge="ba"]')).toHaveAttribute("stroke-dasharray", "5 4");
  expect(selected).toEqual(["a"]);
});

test("an unsupported presentation cannot silently change graph semantics", () => {
  expect(() => render(<NetworkChart {...props} variant={"unknown" as never} />)).toThrow(/样式/);
});

test("graph selection returns the caller's node rather than derived layout coordinates", () => {
  let result: unknown;
  const input = { ...props, nodes: props.nodes.map((node, index) => ({ ...node, x: index * 20, y: index * 10 })) };
  const view = render(<NetworkChart {...input} onNodeSelect={node => { result = node; }} />);
  fireEvent.click(view.container.querySelector('[data-network-node="a"]')!);
  expect(result).toBe(input.nodes[0]);
});
