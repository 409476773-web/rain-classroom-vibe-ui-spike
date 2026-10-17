/// <reference path="../../../../../../tests/node-runtime.d.ts" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { ChinaRegionExamples } from "./china-region-examples";

// JSDOM has no file fetch; serve the actual licensed files at the network boundary.
beforeAll(() => {
  vi.stubGlobal("fetch", async (input: URL) => new Response(readFileSync(resolve("apps/playground/src/docs/components/chart-business/data/china", String(input).split("/").at(-1)!), "utf8"), { status: 200, headers: { "Content-Type": "application/geo+json" } }));
  vi.stubGlobal("ResizeObserver", class {
    constructor(private callback: ResizeObserverCallback) {}
    observe(target: Element) { this.callback([{ target, contentRect: DOMRect.fromRect({ width: 720, height: 430 }) } as ResizeObserverEntry], this as unknown as ResizeObserver); }
    unobserve() {}
    disconnect() {}
  });
});
afterAll(() => vi.unstubAllGlobals());
const regionList = (view: ReturnType<typeof render>) => within(view.getByRole("list", { name: "地区列表" }));

test("national loading becomes 34 real provincial buttons and a same-value precise table", async () => {
  const view = render(<ChinaRegionExamples reduced />);
  expect(view.getByRole("status")).toHaveTextContent("加载地区边界");
  await view.findByRole("button", { name: /^广东省$/ });
  expect(regionList(view).getAllByRole("button")).toHaveLength(34);
  expect(view.getByText("CH-117")).toBeInTheDocument();
  await waitFor(() => expect(view.container.querySelector("svg")).toHaveAttribute("aria-hidden", "true"));
  await waitFor(() => expect(view.container.querySelectorAll(".choropleth-features path[data-feature-id]")).toHaveLength(34));
  expect(view.getByRole("table", { hidden: true })).toHaveTextContent("全国 · 示例参与人数");
  const buttonValue = view.container.querySelector('[data-china-region="440000"] [data-slot="value"]')!.textContent;
  const tableRow = view.container.querySelector('[data-china-row="440000"]')!;
  expect(tableRow).toHaveTextContent(buttonValue!);
});

test("nation to Guangdong to Guangzhou detail and return preserves the independent layer", async () => {
  const view = render(<ChinaRegionExamples revision={2} state="missing" reduced />);
  fireEvent.click(await view.findByRole("button", { name: /^广东省$/ }));
  await view.findByRole("button", { name: /^广州市$/ });
  expect(view.getByText("CH-119")).toBeInTheDocument();
  expect(regionList(view).getAllByRole("button")).toHaveLength(21);
  fireEvent.click(regionList(view).getByRole("button", { name: /^广州市$/ }));
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "440100");
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveTextContent("Mock");
  fireEvent.click(view.getByRole("button", { name: /^返回全国$/ }));
  await view.findByRole("button", { name: /^广东省$/ });
  expect(regionList(view).getAllByRole("button")).toHaveLength(34);
  expect(view.container.querySelector('[data-china-layer]')).toHaveAttribute("data-state", "missing");
  expect(view.container.querySelector('[data-china-layer]')).toHaveAttribute("data-revision", "2");
  expect(view.queryByRole("region", { name: "地区样本详情" })).toBeNull();
});

test("a leaf selection survives revisions and recipe switches by stable region ID", async () => {
  const view = render(<ChinaRegionExamples provinceId="440000" reduced />);
  fireEvent.click(await view.findByRole("button", { name: /^广州市$/ }));
  view.rerender(<ChinaRegionExamples provinceId="440000" revision={1} recipe="intensity" reduced />);
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "440100");
  expect(view.container.querySelector('[data-china-region="440100"]')).toHaveAttribute("aria-pressed", "true");
  await waitFor(() => expect(view.container.querySelector('.choropleth-features path[data-selected="true"]')).not.toBeNull());
});

test("equivalent district buttons activate by Enter and Space without another hidden SVG focus target", async () => {
  const user = userEvent.setup();
  const view = render(<ChinaRegionExamples provinceId="330000" reduced />);
  const city = await view.findByRole("button", { name: /^杭州市$/ });
  city.focus();
  await user.keyboard("{Enter}");
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "330100");
  await user.keyboard(" ");
  expect(city).toHaveAttribute("aria-pressed", "true");
  expect(view.container.querySelector("svg [tabindex]")).toBeNull();
});

test("municipalities and province-only source branches do not fabricate another city layer", async () => {
  const view = render(<ChinaRegionExamples reduced />);
  fireEvent.click(await view.findByRole("button", { name: /^北京市$/ }));
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveTextContent("直辖市");
  expect(regionList(view).getAllByRole("button")).toHaveLength(34);
  fireEvent.click(regionList(view).getByRole("button", { name: /^台湾省$/ }));
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveTextContent("当前来源未提供下级地图");
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "710000");
  expect(regionList(view).getAllByRole("button")).toHaveLength(34);
});

test("Xinjiang keeps real prefectures and all 12 province-direct county cities labelled accurately", async () => {
  const view = render(<ChinaRegionExamples provinceId="650000" reduced />);
  await view.findByRole("button", { name: /^和田地区$/ });
  expect(regionList(view).getAllByRole("button")).toHaveLength(26);
  fireEvent.click(regionList(view).getByRole("button", { name: /^白杨市$/ }));
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveTextContent("省直管县级");
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "659012");
});

test.each(["zero", "missing"] as const)("%s uses the same truthful readings in list, scale and table", async state => {
  const view = render(<ChinaRegionExamples provinceId="440000" state={state} reduced />);
  await view.findByRole("button", { name: /^广州市$/ });
  const listValues = [...view.container.querySelectorAll('[data-china-region] [data-slot="value"]')].map(node => node.textContent);
  expect(listValues).toContain(state === "zero" ? "0 人" : "无数据");
  expect(view.getByRole("table", { hidden: true })).toHaveTextContent(state === "zero" ? "0 人" : "无数据");
  expect(view.getByLabelText(/参与人数色阶/)).toHaveTextContent("无数据");
  await waitFor(() => expect(view.container.querySelectorAll(".choropleth-features path[data-feature-id]")).toHaveLength(21));
});

test("an all-null layer does not claim all values are zero", async () => {
  const view = render(<ChinaRegionExamples provinceId="440000" state="missing" reduced />);
  await view.findByRole("button", { name: /^广州市$/ });
  expect(view.getByLabelText(/参与人数色阶/)).toHaveTextContent("暂无有效数值");
  expect(view.getByLabelText(/参与人数色阶/)).not.toHaveTextContent("全部为 0");
  expect(view.getByLabelText(/参与人数色阶/)).toHaveAttribute("aria-label", "参与人数色阶，暂无有效数值，另有无数据");
});

test("unmatched statistical IDs remain visible while malformed IDs reject rendering", async () => {
  const view = render(<ChinaRegionExamples state="unmatched" reduced />);
  await view.findByRole("button", { name: /^广东省$/ });
  expect(view.getByRole("alert")).toHaveTextContent("未匹配统计地区");
  expect(view.getByRole("alert")).toHaveTextContent(/\d{6}/);
  view.rerender(<ChinaRegionExamples state="invalid" reduced />);
  await waitFor(() => expect(view.getByRole("alert")).toHaveTextContent("已拒绝无效统计数据"));
  expect(view.container.querySelector("svg")).toBeNull();
});

test("a simulated initial loader rejection offers retry and restores actual boundaries", async () => {
  const view = render(<ChinaRegionExamples state="load-error" reduced />);
  expect(await view.findByRole("alert")).toHaveTextContent("边界加载失败");
  expect(view.container.querySelector("svg")).toBeNull();
  fireEvent.click(view.getByRole("button", { name: /^重试加载$/ }));
  await view.findByRole("button", { name: /^广东省$/ });
  expect(regionList(view).getAllByRole("button")).toHaveLength(34);
  expect(view.queryByRole("alert")).toBeNull();
});

test("unknown or incompatible initial region identities are rejected explicitly", async () => {
  const view = render(<ChinaRegionExamples provinceId="999999" reduced />);
  expect(view.getByRole("alert")).toHaveTextContent("无效地区配置");
  view.rerender(<ChinaRegionExamples provinceId="440000" selectedId="330100" reduced />);
  expect(view.getByRole("alert")).toHaveTextContent("无效地区配置");
});
