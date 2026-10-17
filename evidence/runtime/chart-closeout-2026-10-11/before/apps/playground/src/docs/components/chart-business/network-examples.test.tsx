import { render, fireEvent, within, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { filterNetwork, NetworkExamples } from "./network-examples";
import { makeNetworkFixtures } from "./network-data";
import { ChartExample } from "../chart-examples";

test("empty networks do not suggest unavailable node selection", () => {
  const view = render(<NetworkExamples state="empty" fixtureId="courses" reduced />);
  expect(within(view.container.querySelector(".rain-network") as HTMLElement).getByRole("status")).toHaveTextContent("暂无关系数据");
  expect(view.queryByText("选择节点查看关联详情；也可通过节点列表操作。")).toBeNull();
});

test("exiting scenes immediately stop accepting keyboard and pointer interaction", async () => {
  const view = render(<NetworkExamples />);
  const leaving = view.container.querySelector('[data-network-example="elements"]');
  view.rerender(<NetworkExamples fixtureId="practice" />);
  expect(leaving).toHaveAttribute('inert');
  expect(leaving).toHaveAttribute('aria-hidden', 'true');
  expect(view.container.querySelector('[data-network-example="practice"]')).not.toHaveAttribute('inert');
  await waitFor(() => expect(leaving).not.toBeInTheDocument());
});

test("relation filtering keeps only involved nodes, while all preserves isolated nodes", () => {
  const fixture = makeNetworkFixtures().find(item => item.id === "elements")!;
  const isolated = { id:"isolated", label:"独立知识点", category:"knowledge" };
  const nodes = [...fixture.nodes, isolated];
  expect(filterNetwork(nodes, fixture.edges, "all").nodes).toBe(nodes);
  const filtered = filterNetwork(nodes, fixture.edges, "examines");
  expect(filtered.edges.every(edge => edge.relation === "examines")).toBe(true);
  const involved = new Set(filtered.edges.flatMap(edge => [edge.source, edge.target]));
  expect(new Set(filtered.nodes.map(node => node.id))).toEqual(involved);
  expect(filterNetwork(nodes, fixture.edges, "unknown")).toEqual({ nodes:[], edges:[] });
});

test.each(["zero", "missing"] as const)("generic %s requests stay explicit rather than showing a normal network", state => {
  const view = render(<ChartExample id="network" state={state} reduced />);
  expect(view.getByText("本图不使用数值零值或缺测状态")).toBeInTheDocument();
  expect(view.container.querySelector(".rain-network")).toBeNull();
});

test.each(["glow", "structured"] as const)("%s: four business references retain equivalent precise node and edge tables", variant => {
  const view = render(<NetworkExamples variant={variant} reduced />);
  expect(view.getAllByRole("table", { hidden:true })).toHaveLength(8);
  for (const reference of ["CH-065", "CH-070", "CH-083", "CH-086"]) expect(view.getByText(reference)).toBeInTheDocument();
  expect(view.getAllByRole("table", { hidden:true }).some(table => within(table).queryAllByText("程序设计基础").length > 0)).toBe(true);
  for (const fixture of makeNetworkFixtures()) {
    const section = view.container.querySelector(`[data-network-example="${fixture.id}"]`)!;
    expect([...section.querySelectorAll("[data-network-node]")].map(node => node.getAttribute("data-network-node")).sort()).toEqual(fixture.nodes.map(node => node.id).sort());
    expect([...section.querySelectorAll("[data-network-edge]")].map(edge => edge.getAttribute("data-network-edge")).sort()).toEqual(fixture.edges.map(edge => edge.id).sort());
  }
});

test("invalid observations fail visibly per instance instead of crashing the page", () => {
  const view = render(<NetworkExamples state="invalid" />);
  expect(view.getAllByRole("alert")).toHaveLength(4);
  expect(view.queryByRole("table", { hidden:true })).toBeNull();
  view.rerender(<NetworkExamples fixtureId="elements" state="single" reduced />);
  expect(view.getByText(/当前 1 个节点、0 条关系/)).toBeInTheDocument();
});

test("host feedback survives data updates and clears when filtering or invalid data removes the selection", () => {
  const fixture = makeNetworkFixtures().find(item => item.id === "elements")!;
  const node = fixture.nodes[0]!;
  const name = `${node.label}，${fixture.categories.find(category => category.id === node.category)!.label}`;
  const view = render(<NetworkExamples fixtureId="elements" reduced />);
  fireEvent.click(view.getByRole("button", { name }));
  expect(view.container.querySelector(".rain-network-feedback")).toHaveTextContent(`已选择：${node.label}`);
  view.rerender(<NetworkExamples fixtureId="elements" revision={1} reduced />);
  expect(view.container.querySelector(".rain-network__detail")).toHaveAttribute("data-selected-node", node.id);
  view.rerender(<NetworkExamples fixtureId="elements" relation="examines" reduced />);
  expect(view.container.querySelector(".rain-network-feedback")).not.toHaveTextContent("已选择");
  view.rerender(<NetworkExamples fixtureId="elements" reduced />);
  fireEvent.click(view.getByRole("button", { name }));
  view.rerender(<NetworkExamples fixtureId="elements" state="invalid" reduced />);
  view.rerender(<NetworkExamples fixtureId="elements" reduced />);
  expect(view.container.querySelector(".rain-network-feedback")).not.toHaveTextContent("已选择");
});

test("style and palette switches retain the current selection and filtered node positions", async () => {
  const view = render(<NetworkExamples fixtureId="elements" reduced />);
  fireEvent.click(view.getByRole("button", { name: "导数与变化率，知识点" }));
  const node = view.container.querySelector('[data-network-node="derivative"]')!;
  const position = [node.getAttribute("data-x"), node.getAttribute("data-y")];
  view.rerender(<NetworkExamples fixtureId="elements" variant="structured" recipe="category-wide" reduced />);
  expect(view.container.querySelector(".rain-network")).toHaveAttribute("data-variant", "structured");
  expect(view.container.querySelector(".rain-network__detail")).toHaveAttribute("data-selected-node", "derivative");
  const structuredNodes = [...view.container.querySelectorAll("[data-network-node]")];
  const x = (id: string) => Number(structuredNodes.find(node => node.getAttribute("data-network-node") === id)!.getAttribute("data-x"));
  expect(new Set(structuredNodes.map(node => node.getAttribute("data-x"))).size).toBe(2);
  for (const source of ["guide", "reading", "case", "quiz", "lab"]) for (const target of ["function", "derivative", "integral"]) expect(x(target) - x(source)).toBeGreaterThan(300);
  const structuredPosition = [x("derivative"), Number(structuredNodes.find(node => node.getAttribute("data-network-node") === "derivative")!.getAttribute("data-y"))];
  view.rerender(<NetworkExamples fixtureId="elements" variant="structured" relation="examines" recipe="category-near" reduced />);
  const structuredFiltered = view.container.querySelector('[data-network-node="derivative"]')!;
  expect([Number(structuredFiltered.getAttribute("data-x")), Number(structuredFiltered.getAttribute("data-y"))]).toEqual(structuredPosition);
  view.rerender(<NetworkExamples fixtureId="elements" variant="glow" relation="examines" recipe="category-wide" reduced />);
  const filtered = view.container.querySelector('[data-network-node="derivative"]')!;
  expect([filtered.getAttribute("data-x"), filtered.getAttribute("data-y")]).toEqual(position);
  expect(position.every(value => value !== null)).toBe(true);
  expect(view.container.querySelector(".rain-network__detail")).toHaveAttribute("data-selected-node", "derivative");
  await waitFor(() => expect(view.container.querySelectorAll("[data-network-edge]")).toHaveLength(3));
});
