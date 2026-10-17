/// <reference path="../../../../../../tests/node-runtime.d.ts" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { ChinaRegionExamples } from "./china-region-examples";
import { makeChinaStatistics } from "./china-region-data";

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

test("one national selector replaces the breadcrumb and separate right-hand picker", async () => {
  const view = render(<ChinaRegionExamples reduced />);
  await view.findByRole("group", { name: /参与人数色阶/ });
  const selector = view.getByRole("combobox", { name: "地图地区" });
  expect(selector).toHaveTextContent("全国");
  expect(view.queryByRole("button", { name: /^选择地区$/ })).toBeNull();
  expect(view.queryByRole("navigation", { name: "当前地图层级" })).toBeNull();
});

test("the searchable selector changes provinces directly and selects the current province's city", async () => {
  const user = userEvent.setup();
  const view = render(<ChinaRegionExamples provinceId="440000" reduced />);
  await view.findByRole("group", { name: /参与人数色阶/ });
  await user.click(view.getByRole("combobox", { name: "地图地区" }));
  await user.type(await view.findByRole("combobox", { name: "搜索选项" }), "浙江");
  expect(view.queryByRole("option", { name: "广东省" })).toBeNull();
  await user.keyboard("{ArrowDown}{Enter}");
  await waitFor(() => expect(view.container.querySelector("[data-china-layer]")).toHaveAttribute("data-china-layer", "330000"));
  await user.click(view.getByRole("combobox", { name: "地图地区" }));
  expect(await view.findByRole("combobox", { name: "搜索选项" })).toHaveValue("");
  await user.type(view.getByRole("combobox", { name: "搜索选项" }), "杭州");
  await user.keyboard("{ArrowDown}{Enter}");
  await waitFor(() => expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "330100"));
  expect(view.getByRole("combobox", { name: "地图地区" })).toHaveTextContent("杭州市");
});
const regionList = (view: ReturnType<typeof render>) => {
  if (!view.queryByRole("listbox", { name: "选项" })) fireEvent.click(view.getByRole("combobox", { name: /^地图地区$/ }));
  return within(view.getByRole("listbox", { name: "选项" }));
};
async function regionButton(view: ReturnType<typeof render>, name: RegExp) {
  await waitFor(() => expect(view.getByRole("combobox", { name: /^地图地区$/ })).toBeEnabled());
  regionList(view);
  return view.findByRole("option", { name });
}

test("map exploration offers a compact region picker instead of a permanently expanded button grid", async () => {
  const view = render(<ChinaRegionExamples reduced />);
  const picker = await view.findByRole("combobox", { name: /^地图地区$/ });
  await waitFor(() => expect(picker).toBeEnabled());
  expect(picker).toHaveAttribute("aria-expanded", "false");
  expect(view.queryByRole("listbox", { name: "选项" })).toBeNull();
  fireEvent.click(picker);
  expect(await view.findByRole("listbox", { name: "选项" })).toBeVisible();
});

test("the fixed local reading appears immediately below the map and before optional precise data", async () => {
  const view = render(<ChinaRegionExamples provinceId="440000" selectedId="440100" reduced />);
  const detail = await view.findByRole("region", { name: "地区样本详情" });
  const map = view.container.querySelector(".rain-china-map")!;
  expect(map.compareDocumentPosition(detail) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(detail.compareDocumentPosition(view.container.querySelector(".rain-china-data")!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(view.container.querySelector(".rain-china-reading")).toContainElement(detail);
});

test("the single region selector returns to national without a separate breadcrumb", async () => {
  const view = render(<ChinaRegionExamples provinceId="440000" reduced />);
  await view.findByRole("heading", { name: "广东省 · 地区参与人数" });
  expect(view.queryByRole("link", { name: /^返回全国$/ })).toBeNull();
  fireEvent.click(await regionButton(view, /^全国$/));
  await waitFor(() => expect(view.container.querySelector("[data-china-layer]")).toHaveAttribute("data-china-layer", "national"));
});

test("load failure retains a stable map canvas and retries at its original location", async () => {
  const view = render(<ChinaRegionExamples state="load-error" reduced />);
  await view.findByRole("alert");
  expect(view.container.querySelector(".rain-china-canvas")).toContainElement(view.getByRole("alert"));
});

test("same-layer data updates preserve the color domain and selected region", async () => {
  const view = render(<ChinaRegionExamples provinceId="440000" selectedId="440300" revision={0} reduced />);
  const scale = await view.findByRole("group", { name: /参与人数色阶/ });
  const before = scale.getAttribute("aria-label");
  view.rerender(<ChinaRegionExamples provinceId="440000" selectedId="440300" revision={1} reduced />);
  const expected = `${makeChinaStatistics("440000", "normal", 1).find(row => row.id === "440300")!.value} 人`;
  await waitFor(() => expect(view.getByRole("region", { name: "地区样本详情" })).toHaveTextContent(expected));
  expect(scale).toHaveAttribute("aria-label", before);
});

test("national loading becomes 34 real provincial buttons and a same-value precise table", async () => {
  const view = render(<ChinaRegionExamples reduced />);
  expect(view.getByRole("status")).toHaveTextContent("加载地区边界");
  await regionButton(view, /^广东省$/);
  expect(regionList(view).getAllByRole("option")).toHaveLength(35);
  expect(view.getByText(/CH-117/)).toBeInTheDocument();
  await waitFor(() => expect(view.container.querySelector("svg")).toHaveAttribute("aria-hidden", "true"));
  await waitFor(() => expect(view.container.querySelectorAll(".choropleth-features path[data-feature-id]")).toHaveLength(34));
  expect(view.getByRole("table", { hidden: true })).toHaveTextContent("全国 · 示例参与人数");
  const buttonValue = `${makeChinaStatistics(null, "normal", 0).find(row => row.id === "440000")!.value} 人`;
  const tableRow = view.container.querySelector('[data-china-row="440000"]')!;
  expect(tableRow).toHaveTextContent(buttonValue!);
});

test("nation to Guangdong to Guangzhou detail and return preserves the independent layer", async () => {
  const view = render(<ChinaRegionExamples revision={2} state="missing" reduced />);
  fireEvent.click(await regionButton(view, /^广东省$/));
  await regionButton(view, /^广州市$/);
  expect(view.getByText(/CH-119/)).toBeInTheDocument();
  expect(regionList(view).getAllByRole("option")).toHaveLength(56);
  fireEvent.click(regionList(view).getByRole("option", { name: /^广州市$/ }));
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "440100");
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveTextContent("Mock");
  fireEvent.click(await regionButton(view, /^全国$/));
  await regionButton(view, /^广东省$/);
  expect(regionList(view).getAllByRole("option")).toHaveLength(35);
  expect(view.container.querySelector('[data-china-layer]')).toHaveAttribute("data-state", "missing");
  expect(view.container.querySelector('[data-china-layer]')).toHaveAttribute("data-revision", "2");
  expect(view.queryByRole("region", { name: "地区样本详情" })).toBeNull();
});

test("a leaf selection survives revisions and recipe switches by stable region ID", async () => {
  const view = render(<ChinaRegionExamples provinceId="440000" reduced />);
  fireEvent.click(await regionButton(view, /^广州市$/));
  view.rerender(<ChinaRegionExamples provinceId="440000" revision={1} recipe="intensity" reduced />);
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "440100");
  regionList(view);
  expect(view.getByRole("option", { name: /^广州市$/ })).toHaveAttribute("data-selected", "true");
  await waitFor(() => expect(view.container.querySelector('.choropleth-features path[data-selected="true"]')).not.toBeNull());
});

test("keyboard search selects a city and Escape closes the menu without clearing its pinned detail", async () => {
  const user = userEvent.setup();
  const view = render(<ChinaRegionExamples provinceId="330000" reduced />);
  await regionButton(view, /^杭州市$/);
  await user.type(view.getByRole("combobox", { name: "搜索选项" }), "杭州");
  await user.keyboard("{ArrowDown}{Enter}");
  await waitFor(() => expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "330100"));
  await waitFor(() => expect(view.getByRole("combobox", { name: "地图地区" })).toHaveAttribute("aria-expanded", "false"));
  await user.click(view.getByRole("combobox", { name: "地图地区" }));
  await view.findByRole("combobox", { name: "搜索选项" });
  await user.keyboard("{Escape}");
  expect(view.getByRole("combobox", { name: "地图地区" })).toHaveFocus();
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "330100");
  expect(view.container.querySelector("svg [tabindex]")).toBeNull();
});

test("municipalities and province-only source branches do not fabricate another city layer", async () => {
  const view = render(<ChinaRegionExamples reduced />);
  fireEvent.click(await regionButton(view, /^北京市$/));
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveTextContent("直辖市");
  expect(regionList(view).getAllByRole("option")).toHaveLength(35);
  fireEvent.click(regionList(view).getByRole("option", { name: /^台湾省$/ }));
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveTextContent("当前来源未提供下级地图");
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "710000");
  expect(regionList(view).getAllByRole("option")).toHaveLength(35);
});

test("Xinjiang keeps real prefectures and all 12 province-direct county cities labelled accurately", async () => {
  const view = render(<ChinaRegionExamples provinceId="650000" reduced />);
  await regionButton(view, /^和田地区$/);
  expect(regionList(view).getAllByRole("option")).toHaveLength(61);
  fireEvent.click(regionList(view).getByRole("option", { name: /^白杨市$/ }));
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveTextContent("省直管县级");
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveAttribute("data-selected-region", "659012");
});

test.each(["zero", "missing"] as const)("%s retains truthful fixed readings and precise data after choosing a region", async state => {
  const view = render(<ChinaRegionExamples provinceId="440000" state={state} reduced />);
  fireEvent.click(await regionButton(view, /^广州市$/));
  const value = state === "zero" ? "0 人" : "无数据";
  expect(view.getByRole("region", { name: "地区样本详情" })).toHaveTextContent(value);
  expect(view.getByRole("table", { hidden: true })).toHaveTextContent(value);
  expect(view.getByRole("group", { name: /参与人数色阶/ })).toHaveTextContent(state === "zero" ? "全部为 0" : "无数据");
});

test("an all-null layer does not claim all values are zero", async () => {
  const view = render(<ChinaRegionExamples provinceId="440000" state="missing" reduced />);
  await regionButton(view, /^广州市$/);
  expect(view.getByLabelText(/参与人数色阶/)).toHaveTextContent("暂无有效数值");
  expect(view.getByLabelText(/参与人数色阶/)).not.toHaveTextContent("全部为 0");
  expect(view.getByLabelText(/参与人数色阶/)).toHaveAttribute("aria-label", "参与人数色阶，暂无有效数值，另有无数据");
});

test("unmatched statistical IDs remain visible while malformed IDs reject rendering", async () => {
  const view = render(<ChinaRegionExamples state="unmatched" reduced />);
  await regionButton(view, /^广东省$/);
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
  await regionButton(view, /^广东省$/);
  expect(regionList(view).getAllByRole("option")).toHaveLength(35);
  expect(view.queryByRole("alert")).toBeNull();
});

test("unknown or incompatible initial region identities are rejected explicitly", async () => {
  const view = render(<ChinaRegionExamples provinceId="999999" reduced />);
  expect(view.getByRole("alert")).toHaveTextContent("无效地区配置");
  view.rerender(<ChinaRegionExamples provinceId="440000" selectedId="330100" reduced />);
  expect(view.getByRole("alert")).toHaveTextContent("无效地区配置");
});
