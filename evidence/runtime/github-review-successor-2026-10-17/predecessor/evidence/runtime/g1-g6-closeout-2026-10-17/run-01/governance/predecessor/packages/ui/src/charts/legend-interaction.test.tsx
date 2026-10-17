import React, { useState } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { ChartLegend, Legend, LegendItemComponent, LegendLabel, useLegendItem } from "./index";

afterEach(cleanup);
const initial = [{ label: "甲系列", value: 10, color: "blue" }, { label: "乙系列", value: 20, color: "purple" }];
function CompoundItem() {
  const { item } = useLegendItem();
  return <LegendItemComponent><button type="button"><LegendLabel />{item.value}</button></LegendItemComponent>;
}
function Reading({ kind, items = initial }: { kind: "default" | "custom" | "compound"; items?: typeof initial }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return <><output aria-label="当前聚焦">{hovered == null ? "全部" : items[hovered]?.label ?? "失效"}</output>
    {kind === "compound" ? <Legend items={items} hoveredIndex={hovered} onHoverChange={setHovered}><CompoundItem /></Legend> : <ChartLegend items={items} hoveredIndex={hovered} onHover={setHovered} renderItem={kind === "custom" ? ({ item }) => <button type="button">{item.label}{item.value}</button> : undefined} />}
    <div data-testid="plot" onPointerEnter={() => setHovered(1)} onPointerLeave={() => setHovered(null)}>图形指向区</div><button type="button">外部操作</button></>;
}
const selected = () => screen.getByRole("status", { name: "当前聚焦" });

for (const kind of ["default", "custom", "compound"] as const) {
  test(`${kind}: pointer preview returns to the keyboard target, and Escape clears without hiding data`, () => {
    render(<Reading kind={kind} />);
    const a = screen.getByRole("button", { name: /^甲系列/ });
    const b = screen.getByRole("button", { name: /^乙系列/ });
    act(() => a.focus());
    expect(selected().textContent).toBe("甲系列");
    fireEvent.pointerEnter(b);
    fireEvent.mouseEnter(b);
    expect(selected().textContent).toBe("乙系列");
    fireEvent.pointerLeave(b);
    fireEvent.mouseLeave(b);
    expect(selected().textContent).toBe("甲系列");
    fireEvent.keyDown(a, { key: "Escape" });
    expect(selected().textContent).toBe("全部");
    expect(screen.getAllByRole("button")).toHaveLength(3);
    fireEvent.click(a);
    expect(selected().textContent).toBe("甲系列");
    fireEvent.pointerEnter(b);
    fireEvent.pointerLeave(b);
    expect(selected().textContent).toBe("甲系列");
    fireEvent.pointerEnter(screen.getByTestId("plot"));
    expect(selected().textContent).toBe("乙系列");
    fireEvent.pointerLeave(screen.getByTestId("plot"));
    expect(selected().textContent).toBe("甲系列");
  });
  test(`${kind}: value updates keep the same focused item, removed identities clear`, () => {
    const view = render(<Reading kind={kind} />);
    const a = screen.getByRole("button", { name: /^甲系列/ });
    act(() => a.focus());
    view.rerender(<Reading kind={kind} items={initial.map(item => ({ ...item, value: item.value + 1 }))} />);
    expect(document.activeElement).toBe(a);
    expect(selected().textContent).toBe("甲系列");
    view.rerender(<Reading kind={kind} items={[initial[1]!]} />);
    expect(selected().textContent).toBe("全部");
  });
  test(`${kind}: reordered identities follow the same item and an outside tap clears`, () => {
    const view = render(<Reading kind={kind} />);
    const a = screen.getByRole("button", { name: /^甲系列/ });
    act(() => a.focus());
    view.rerender(<Reading kind={kind} items={[initial[1]!, initial[0]!]} />);
    expect(document.activeElement).toBe(a);
    expect(selected().textContent).toBe("甲系列");
    fireEvent.pointerDown(screen.getByRole("button", { name: "外部操作" }), { pointerType: "touch" });
    expect(selected().textContent).toBe("全部");
  });
}
test("a legend without a reading callback stays a static key", () => {
  render(<ChartLegend items={initial} />);
  expect(screen.queryByRole("button")).toBeNull();
  expect(screen.getByText("甲系列")).toBeTruthy();
});

test("a host that already follows label identity is not remapped twice after a reorder", () => {
  function KeyReading({ items }: { items: typeof initial }) {
    const [key, setKey] = useState<string | null>(null);
    const index = items.findIndex(item => item.label === key);
    return <><output aria-label="当前聚焦">{key ?? "全部"}</output><ChartLegend items={items} hoveredIndex={index < 0 ? null : index} onHover={next => setKey(next == null ? null : items[next]!.label)} /></>;
  }
  const view = render(<KeyReading items={initial} />);
  act(() => screen.getByRole("button", { name: /^乙系列/ }).focus());
  view.rerender(<KeyReading items={[initial[1]!, initial[0]!]} />);
  expect(selected().textContent).toBe("乙系列");
});
