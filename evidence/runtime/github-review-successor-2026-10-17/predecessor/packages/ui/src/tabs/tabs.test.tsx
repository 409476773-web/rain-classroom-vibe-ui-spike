import { useState } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { Tabs, formatTabsCount, type TabsItem, type TabsProps } from "./tabs";

function Draft() { const [text, setText] = useState(""); return <input aria-label="草稿" value={text} onChange={event => setText(event.target.value)} />; }
const items: TabsItem[] = [
  { value: 1, label: "数字", count: 0, content: <p>数字内容</p> },
  { value: "1", label: "字符串", content: <Draft /> },
  { value: "blocked", label: "完整禁用分区名称", count: "99+", countAccessibleLabel: "共 120 项", disabled: true, disabledReason: "课程已归档", content: <p>禁用内容</p> },
];
const tab = (name: string) => screen.getByRole("tab", { name });

it("defaults both complete and compound Tabs to size-capped indicators while preserving stretch", () => {
  const { rerender } = render(<Tabs aria-label="内容" items={items} />);
  expect(tab("数字")).toHaveAttribute("data-indicator-size", "content");
  for (const size of [28, 32, 38] as const) {
    rerender(<Tabs.Root aria-label="内容" items={items} size={size}><Tabs.Nav /><Tabs.Panels /></Tabs.Root>);
    expect(tab("数字")).toHaveAttribute("data-indicator-size", "content");
    expect(tab("数字").closest('[data-rain-id="ui-tabs"]')).toHaveStyle({ "--tabs-max-indicator": `${({ 28: 24, 32: 28, 38: 32 })[size]}px` });
  }
  rerender(<Tabs aria-label="内容" items={items} indicatorSize="stretch" />);
  expect(tab("数字")).toHaveAttribute("data-indicator-size", "stretch");
});

it("distinguishes number and string identities and retains only actually visited content", () => {
  const { rerender } = render(<Tabs aria-label="内容" items={items} />);
  expect(tab("数字")).toHaveAttribute("aria-selected", "true");
  expect(screen.queryByLabelText("草稿")).toBeNull();
  fireEvent.click(tab("字符串"));
  const draft = screen.getByLabelText("草稿"); fireEvent.change(draft, { target: { value: "保留" } });
  fireEvent.click(tab("数字"));
  rerender(<Tabs aria-label="内容" items={items.map(item => ({ ...item }))} />);
  fireEvent.click(tab("字符串")); expect(screen.getByLabelText("草稿")).toBe(draft);
  expect(draft).toHaveValue("保留");
  rerender(<Tabs aria-label="内容" items={items.filter(item => item.value !== "1")} />);
  rerender(<Tabs aria-label="内容" items={items} />);
  fireEvent.click(tab("字符串")); expect(screen.getByLabelText("草稿")).toHaveValue("");
});

it("waits for a controlled acceptance, supports null, and retains selected disabled content", () => {
  const change = vi.fn();
  const { rerender } = render(<Tabs aria-label="内容" items={items} value={1} onValueChange={change} />);
  fireEvent.click(tab("字符串"));
  expect(change).toHaveBeenLastCalledWith("1", { reason: "tab", previousValue: 1 });
  expect(tab("数字")).toHaveAttribute("aria-selected", "true"); expect(screen.queryByLabelText("草稿")).toBeNull();
  rerender(<Tabs aria-label="内容" items={items} value="1" onValueChange={change} />); expect(screen.getByLabelText("草稿")).toBeVisible();
  rerender(<Tabs aria-label="内容" items={items} value="blocked" onValueChange={change} />); expect(screen.getByText("禁用内容")).toBeVisible();
  rerender(<Tabs aria-label="内容" items={items} value={null} onValueChange={change} />); expect(screen.queryByRole("tabpanel")).toBeNull();
});

it("normalizes uncontrolled initial, missing and disabled choices with exact reasons", () => {
  const change = vi.fn();
  const { rerender } = render(<Tabs aria-label="内容" items={items} defaultValue="missing" onValueChange={change} />);
  expect(change).toHaveBeenLastCalledWith(1, { reason: "initial", previousValue: "missing" });
  fireEvent.click(tab("字符串"));
  rerender(<Tabs aria-label="内容" items={items.filter(item => item.value !== "1")} onValueChange={change} />);
  expect(change).toHaveBeenLastCalledWith(1, { reason: "missing", previousValue: "1" });
  rerender(<Tabs aria-label="内容" items={items.map(item => ({ ...item, disabled: true }))} onValueChange={change} />);
  expect(change).toHaveBeenLastCalledWith(null, { reason: "disabled", previousValue: 1 });
});

it.each(["lazy-retain", "eager-retain", "unmount"] as const)("honors the %s panel policy", policy => {
  render(<Tabs aria-label="内容" items={items} panelMount={policy} />);
  expect(Boolean(screen.queryByLabelText("草稿"))).toBe(policy === "eager-retain");
  fireEvent.click(tab("字符串")); fireEvent.click(tab("数字"));
  expect(Boolean(screen.queryByLabelText("草稿"))).toBe(policy !== "unmount");
});

it("shares names, counts and disabled reasons without duplicating visible count in the name", () => {
  render(<Tabs aria-label="课程内容" items={items} />);
  expect(screen.getByRole("tablist")).toHaveAccessibleName("课程内容");
  expect(tab("数字")).toHaveAccessibleDescription("数量 0");
  fireEvent.click(screen.getByText("分区说明"));
  expect(screen.getByRole("listitem")).toHaveTextContent("共 120 项");
  expect(screen.getByText(/课程已归档/)).toBeVisible();
  expect(formatTabsCount({ count: "002" })).toEqual({ display: "(002)", description: "数量 002" });
  for (const count of [null, undefined, ""]) expect(formatTabsCount({ count })).toBeNull();
  const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
  for (const count of [-1, 1.2, Infinity]) expect(formatTabsCount({ count })).toBeNull();
  expect(warning).toHaveBeenCalledTimes(3); warning.mockRestore();
  expect(() => formatTabsCount({ count: "99+" })).toThrow("countAccessibleLabel");
});

it("keeps compound Nav and Panels on the same model and rejects malformed composition", () => {
  const { unmount } = render(<Tabs.Root aria-label="开放" items={items}><Tabs.Nav /><p>共享说明</p><Tabs.Panels /></Tabs.Root>);
  fireEvent.click(tab("字符串")); expect(screen.getByLabelText("草稿")).toBeVisible(); unmount();
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Tabs.Nav />)).toThrow("Tabs.Root");
  expect(() => render(<Tabs.Root aria-label="坏例" items={items}><Tabs.Nav /></Tabs.Root>)).toThrow("one Nav and one Panels");
  error.mockRestore();
});

it("rejects malformed identities, models, combinations and controlled-mode changes", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  for (const invalid of [
    { items: [items[0], items[0]] }, { items: [{ ...items[0], value: NaN }] }, { items: [{ ...items[0], label: " " }] },
    { position: "start", overflow: "more" }, { appearance: "soft", showDivider: true }, { value: 1, defaultValue: 1 }, { size: 30 },
  ]) expect(() => render(<Tabs {...({ "aria-label": "错误", items, ...invalid } as TabsProps)} />)).toThrow();
  const { rerender } = render(<Tabs aria-label="内容" items={items} />);
  expect(() => rerender(<Tabs aria-label="内容" items={items} value={1} onValueChange={() => {}} />)).toThrow("controlled mode");
  error.mockRestore();
});

it("preserves explicit uncontrolled null, empty state and per-item mount overrides", () => {
  const change = vi.fn();
  const { rerender } = render(<Tabs aria-label="内容" items={items} defaultValue={null} onValueChange={change} />);
  expect(screen.queryByRole('tabpanel')).toBeNull(); expect(change).not.toHaveBeenCalled();
  fireEvent.click(tab('字符串')); expect(screen.getByLabelText('草稿')).toBeVisible();
  rerender(<Tabs aria-label="内容" items={[]} onValueChange={change} />);
  expect(screen.queryByRole('tab')).toBeNull();
  expect(change).toHaveBeenLastCalledWith(null, { reason: 'missing', previousValue: '1' });
  rerender(<Tabs aria-label="内容" items={items.map(item => ({ ...item, panelMount: 'eager-retain' }))} panelMount="unmount" onValueChange={change} />);
  expect(screen.getByLabelText('草稿')).not.toBeVisible();
  expect(screen.queryByRole('tabpanel')).toBeNull();
});

it("rejects duplicated compound parts without sharing registration across roots", () => {
  const error = vi.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => render(<Tabs.Root aria-label="重复" items={items}><Tabs.Nav /><Tabs.Nav /><Tabs.Panels /></Tabs.Root>)).toThrow('exactly one');
  error.mockRestore();
});


it("resolves density and merges actual conflicting Local Recipe classes on each appearance", () => {
  const recipe = defineRainLocalRecipe({ id: 'tabs-local', scope: 'feature', origin: 'ui-tabs', classes: { tab: 'h-rain-tabs-28 h-rain-tabs-38' }, modifiedParts: ['tab'], candidateTokens: [], promotionStatus: 'not-proposed' } as const);
  const { rerender } = render(<DensityProvider density="compact"><Tabs aria-label="内容" items={items} /></DensityProvider>);
  expect(tab('数字')).toHaveClass('h-rain-tabs-32');
  for (const appearance of ['line', 'contained', 'soft'] as const) {
    const paint = appearance === "line" ? { appearance: "line" as const } : { appearance };
    rerender(<DensityProvider density="default"><Tabs aria-label="内容" items={items} size={28} {...paint} localRecipe={recipe} /></DensityProvider>);
    expect(tab('数字')).toHaveClass('h-rain-tabs-38');
    expect(tab('数字')).not.toHaveClass('h-rain-tabs-28');
  }
});

it('uses a shared icon column only for left-aligned vertical groups and keeps the two-line recipe complete', () => {
  const mixed = items.map((item, index) => ({ ...item, leadingIcon: index === 1 ? <span>图标</span> : undefined }));
  const { rerender, container } = render(<Tabs aria-label="双行分区" items={mixed} position="end" labelLines={2} size={32} />);
  expect(tab('数字')).toHaveClass('h-rain-tabs-two-line-32');
  expect(tab('数字')).not.toHaveClass('h-rain-tabs-32');
  expect(tab('数字')).toHaveAttribute('data-item-align', 'left');
  expect(tab('数字').querySelector('[data-part="icon"]')).toBeEmptyDOMElement();
  expect(tab('字符串').querySelector('[data-part="icon"]')).toHaveTextContent('图标');
  expect(tab('数字')).toHaveAccessibleDescription('数量 0');
  rerender(<Tabs aria-label="双行分区" items={items} position="start" labelLines={2} size={28} />);
  expect(container.querySelector('[role="tab"] [data-part="icon"]')).toBeNull();
  rerender(<Tabs aria-label="双行分区" items={mixed} position="start" itemAlign="center" size={28} />);
  expect(tab('数字').querySelector('[data-part="icon"]')).toBeNull();
  expect(tab('数字')).toHaveClass('h-rain-tabs-28');
});

it('rejects incompatible line count, width mode and responsive thresholds', () => {
  const error = vi.spyOn(console, 'error').mockImplementation(() => {});
  try {
    for (const invalid of [
      { position: 'top', labelLines: 2 }, { position: 'start', labelLines: 3 },
      { position: 'start', labelLines: 2, itemAlign: 'right' }, { widthMode: 'stretch' },
      { position: 'top', collapseBelow: 560 },
      ...[0, -1, Infinity, NaN].map(collapseBelow => ({ position: 'start', collapseBelow })),
    ]) expect(() => render(<Tabs {...({ 'aria-label': '错误', items, ...invalid } as TabsProps)} />)).toThrow();
  } finally { error.mockRestore(); }
});
