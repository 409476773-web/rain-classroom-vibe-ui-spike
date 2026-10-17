import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { FormItem } from "../input/form-item";
import { Slider } from "./slider";

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const thumb = this.classList.contains("rain-slider__thumb"), width = thumb ? 12 : 200;
    const value = Number(this.querySelector("input")?.value ?? 0), left = thumb ? value * 1.88 : 0;
    return { x: left, y: 0, top: 0, left, right: left + width, bottom: 32, width, height: 32, toJSON() {} };
  });
});
afterEach(() => vi.restoreAllMocks());

it("uses step and limits for keyboard changes and reports committed values", async () => {
  const user = userEvent.setup(), changed = vi.fn(), committed = vi.fn();
  render(<Slider aria-label="音量" defaultValue={20} min={0} max={40} step={5} onValueChange={changed} onValueCommitted={committed} />);
  (await screen.findByRole("slider", { name: "音量" })).focus();
  await user.keyboard("{ArrowRight}");
  expect(changed).toHaveBeenLastCalledWith(25, expect.objectContaining({ reason: "keyboard" }));
  expect(committed).toHaveBeenLastCalledWith(25, expect.objectContaining({ reason: "keyboard" }));
  await user.keyboard("{End}");
  expect(screen.getByRole("slider")).toHaveValue("40");
  await user.keyboard("{Home}");
  expect(screen.getByRole("slider")).toHaveValue("0");
});

it("keeps range thumbs ordered and gives both distinct names and form entries", async () => {
  const user = userEvent.setup();
  render(<form aria-label="筛选"><Slider range name="score" defaultValue={[20, 30]} thumbLabels={["最低分", "最高分"]} /></form>);
  const low = await screen.findByRole("slider", { name: "最低分" }), high = screen.getByRole("slider", { name: "最高分" });
  low.focus();
  await user.keyboard("{End}");
  expect(Number((low as HTMLInputElement).value)).toBeLessThanOrEqual(Number((high as HTMLInputElement).value));
  expect(new FormData(screen.getByRole("form") as HTMLFormElement).getAll("score")).toHaveLength(2);
});

it("uses FormItem naming and validation without duplicate IDs", async () => {
  render(<FormItem label="完成度" help="调整比例" status="error" message="请核对"><Slider defaultValue={25} /></FormItem>);
  const thumb = await screen.findByRole("slider", { name: "完成度" });
  expect(thumb).toHaveAccessibleDescription("调整比例 请核对");
  expect(thumb).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByText("完成度").closest("label")).toHaveAttribute("for", thumb.id);
  expect(document.querySelectorAll(`#${CSS.escape(thumb.id)}`)).toHaveLength(1);
});

it("honors controlled values and disabled fields", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  const { rerender } = render(<Slider value={10} onValueChange={changed} aria-label="音量" />);
  (await screen.findByRole("slider")).focus();
  await user.keyboard("{ArrowRight}");
  expect(changed).toHaveBeenCalledWith(11, expect.anything());
  expect(screen.getByRole("slider")).toHaveValue("10");
  rerender(<FormItem label="音量" disabled><Slider value={10} onValueChange={changed} /></FormItem>);
  expect(await screen.findByRole("slider")).toBeDisabled();
});

it("updates during dragging, commits on release and never pushes the other thumb", async () => {
  const changed = vi.fn(), committed = vi.fn();
  const { container } = render(<Slider range defaultValue={[20, 60]} thumbLabels={["最低", "最高"]} onValueChange={changed} onValueCommitted={committed} />);
  const low = await screen.findByRole("slider", { name: "最低" }), high = screen.getByRole("slider", { name: "最高" });
  const control = container.querySelector('[data-slot="control"]')!;
  const pointer = (type: string, clientX: number) => new MouseEvent(type, { bubbles: true, button: 0, buttons: type === "pointerup" ? 0 : 1, clientX, clientY: 16 });
  fireEvent(control, pointer("pointerdown", 45));
  fireEvent(document, pointer("pointermove", 180));
  expect(Number((low as HTMLInputElement).value)).toBeLessThanOrEqual(60);
  expect(high).toHaveValue("60");
  expect(changed).toHaveBeenCalled();
  expect(committed).not.toHaveBeenCalled();
  fireEvent(document, pointer("pointerup", 180));
  expect(committed).toHaveBeenCalledOnce();
  expect(committed.mock.calls[0]![0]).toEqual([Number((low as HTMLInputElement).value), 60]);
});

it.each([[0, 40], [1, 40], [0, 80], [1, 80]])("opens overlapping thumbs from thumb %i toward %i without changing endpoint identity", async (pressedIndex, destination) => {
  const changed = vi.fn(), committed = vi.fn();
  render(<Slider range defaultValue={[60, 60]} thumbLabels={["最低", "最高"]}
    onValueChange={changed} onValueCommitted={committed} />);
  const thumbs = await screen.findAllByRole("slider"), pressed = thumbs[pressedIndex]!.closest('[data-slot="thumb"]')!;
  const selectedIndex = destination! < 60 ? 0 : 1, next = selectedIndex ? [60, destination] : [destination, 60];
  const pointer = (type: string, clientX: number) => new MouseEvent(type, { bubbles: true, button: 0, buttons: type === "pointerup" ? 0 : 1, clientX, clientY: 16 });
  fireEvent(pressed, pointer("pointerdown", 118.8));
  await waitFor(() => expect(thumbs[pressedIndex]).toHaveFocus());
  fireEvent(document, pointer("pointermove", destination! * 1.88 + 6));
  expect(thumbs[0]).toHaveValue(String(next[0]));
  expect(thumbs[1]).toHaveValue(String(next[1]));
  expect(thumbs[selectedIndex]).toHaveFocus();
  expect(changed).toHaveBeenLastCalledWith(next, expect.objectContaining({ reason: "drag", activeThumbIndex: selectedIndex, cancel: expect.any(Function) }));
  expect(changed.mock.lastCall![1].event.type).toBe("pointermove");
  expect(committed).not.toHaveBeenCalled();
  const crossingX = selectedIndex ? 30 : 180;
  fireEvent(document, pointer("pointermove", crossingX));
  expect(thumbs[0]).toHaveValue("60");
  expect(thumbs[1]).toHaveValue("60");
  expect(thumbs[selectedIndex]).toHaveFocus();
  fireEvent(document, pointer("pointerup", crossingX));
  expect(committed).toHaveBeenCalledOnce();
  expect(committed).toHaveBeenLastCalledWith([60, 60], expect.objectContaining({ reason: "drag", event: expect.objectContaining({ type: "pointerup" }) }));
});

it.each([[0, 20], [100, 80]])("opens an overlapping range at boundary %i toward %i", async (initial, destination) => {
  render(<Slider range defaultValue={[initial!, initial!]} thumbLabels={["最低", "最高"]} />);
  const thumbs = await screen.findAllByRole("slider");
  const pointer = (type: string, clientX: number) => new MouseEvent(type, { bubbles: true, button: 0, buttons: type === "pointerup" ? 0 : 1, clientX, clientY: 16 });
  fireEvent(thumbs[1]!.closest('[data-slot="thumb"]')!, pointer("pointerdown", initial! * 1.88 + 6));
  await waitFor(() => expect(thumbs[initial === 100 ? 0 : 1]).toHaveFocus());
  fireEvent(document, pointer("pointermove", destination! * 1.88 + 6));
  expect(thumbs[0]).toHaveValue(String(Math.min(initial!, destination!)));
  expect(thumbs[1]).toHaveValue(String(Math.max(initial!, destination!)));
  fireEvent(document, pointer("pointerup", destination! * 1.88 + 6));
});

it("retains the selected endpoint when overlap movement precedes the next animation frame", async () => {
  render(<Slider range defaultValue={[60, 60]} thumbLabels={["最低", "最高"]} />);
  const thumbs = await screen.findAllByRole("slider");
  const pointer = (type: string, clientX: number) => new MouseEvent(type, { bubbles: true, button: 0, buttons: type === "pointerup" ? 0 : 1, clientX, clientY: 16 });
  fireEvent(thumbs[1]!.closest('[data-slot="thumb"]')!, pointer("pointerdown", 118.8));
  fireEvent(document, pointer("pointermove", 81.2));
  expect(thumbs[0]).toHaveValue("40");
  await act(async () => { await new Promise(requestAnimationFrame); });
  expect(thumbs[0]).toHaveFocus();
  fireEvent(document, pointer("pointerup", 81.2));
});

it("opens a touch overlap with native drag and release details", async () => {
  const changed = vi.fn(), committed = vi.fn();
  render(<Slider range defaultValue={[60, 60]} thumbLabels={["最低", "最高"]} onValueChange={changed} onValueCommitted={committed} />);
  const thumbs = await screen.findAllByRole("slider");
  const touch = (type: string, clientX: number) => {
    const event = new Event(type, { bubbles: true });
    Object.defineProperty(event, "changedTouches", { value: [{ identifier: 1, clientX, clientY: 16 }] });
    return event;
  };
  fireEvent(thumbs[1]!.closest('[data-slot="thumb"]')!, touch("touchstart", 118.8));
  fireEvent(document, touch("touchmove", 81.2));
  expect(thumbs[0]).toHaveValue("40");
  expect(thumbs[1]).toHaveValue("60");
  expect(changed).toHaveBeenLastCalledWith([40, 60], expect.objectContaining({ reason: "drag", activeThumbIndex: 0, event: expect.objectContaining({ type: "touchmove" }) }));
  expect(committed).not.toHaveBeenCalled();
  fireEvent(document, touch("touchend", 81.2));
  expect(committed).toHaveBeenCalledOnce();
  expect(committed).toHaveBeenLastCalledWith([40, 60], expect.objectContaining({ reason: "drag", event: expect.objectContaining({ type: "touchend" }) }));
});

it("keeps overlap direction selection available after a canceled native change", async () => {
  const changed = vi.fn().mockImplementationOnce((_, details) => details.cancel()), committed = vi.fn();
  render(<Slider range defaultValue={[60, 60]} thumbLabels={["最低", "最高"]} step={5}
    onValueChange={changed} onValueCommitted={committed} />);
  const low = await screen.findByRole("slider", { name: "最低" }), high = screen.getByRole("slider", { name: "最高" });
  const pointer = (type: string, clientX: number) => new MouseEvent(type, { bubbles: true, button: 0, buttons: type === "pointerup" ? 0 : 1, clientX, clientY: 16 });
  fireEvent(high.closest('[data-slot="thumb"]')!, pointer("pointerdown", 118.8));
  await waitFor(() => expect(high).toHaveFocus());
  fireEvent(document, pointer("pointermove", 80));
  expect(changed).toHaveBeenLastCalledWith([40, 60], expect.objectContaining({ isCanceled: true }));
  expect(low).toHaveValue("60");
  expect(high).toHaveValue("60");
  fireEvent(document, pointer("pointermove", 90));
  expect(low).toHaveValue("45");
  expect(high).toHaveValue("60");
  expect(low).toHaveFocus();
  fireEvent(document, pointer("pointerup", 90));
  expect(committed).toHaveBeenCalledOnce();
  expect(committed).toHaveBeenLastCalledWith([45, 60], expect.objectContaining({ reason: "drag" }));
});

it("exposes each range endpoint's current usable bounds", async () => {
  const user = userEvent.setup();
  render(<Slider range defaultValue={[20, 80]} thumbLabels={["下限", "上限"]} />);
  const low = await screen.findByRole("slider", { name: "下限" }), high = screen.getByRole("slider", { name: "上限" });
  expect(low).toHaveAttribute("aria-valuemax", "80");
  expect(high).toHaveAttribute("aria-valuemin", "20");
  high.focus();
  await user.keyboard("{Home}");
  expect(high).toHaveValue("20");
  expect(low).toHaveAttribute("aria-valuemax", "20");
  low.focus();
  await user.keyboard("{Home}");
  expect(high).toHaveAttribute("aria-valuemin", "0");
});

it("formats live values, shows only the focused tooltip and adds no Tab stop", async () => {
  const user = userEvent.setup();
  render(<><Slider range defaultValue={[40, 60]} thumbLabels={["下限", "上限"]}
    formatValue={value => `${value} 分`} marks={[{ value: 0, label: "0" }, { value: 60, label: "及格线 60" }, { value: 100, label: "100" }]} />
    <button>下一个操作</button></>);
  expect(screen.getByText("及格线 60")).toBeVisible();
  await user.tab();
  const low = screen.getByRole("slider", { name: "下限" });
  expect(low).toHaveFocus();
  expect(low).toHaveAttribute("aria-valuetext", "40 分");
  expect(await screen.findByRole("tooltip")).toHaveTextContent("下限 40 分");
  await user.keyboard("{ArrowRight}");
  expect(await screen.findByRole("tooltip")).toHaveTextContent("下限 41 分");
  expect(low).not.toHaveAttribute("aria-describedby");
  await user.tab();
  expect(screen.getByRole("slider", { name: "上限" })).toHaveFocus();
  expect(await screen.findByRole("tooltip")).toHaveTextContent("上限 60 分");
  expect(screen.getAllByRole("tooltip")).toHaveLength(1);
  await user.tab();
  expect(screen.getByRole("button", { name: "下一个操作" })).toHaveFocus();
});

it("keeps existing accessible formatting authoritative and permits hiding value tips", async () => {
  const user = userEvent.setup();
  render(<Slider aria-label="速度" defaultValue={1.25} min={0.5} max={2} step={0.05} showValue={false}
    formatValue={value => `${value} 倍`} getAriaValueText={(_, value) => `每秒 ${value} 倍`} />);
  await user.tab();
  expect(screen.getByRole("slider")).toHaveAttribute("aria-valuetext", "每秒 1.25 倍");
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});

it("keeps full accessible endpoint names while using concise range value tips", async () => {
  const user = userEvent.setup();
  render(<Slider range defaultValue={[40, 60]} thumbLabels={["成绩下限滑钮", "成绩上限滑钮"]} formatValue={value => `${value} 分`} />);
  await user.tab();
  expect(screen.getByRole("slider", { name: "成绩下限滑钮" })).toHaveFocus();
  expect(await screen.findByRole("tooltip")).toHaveTextContent(/^下限 40 分$/);
  await user.tab();
  expect(screen.getByRole("slider", { name: "成绩上限滑钮" })).toHaveFocus();
  expect(await screen.findByRole("tooltip")).toHaveTextContent(/^上限 60 分$/);
});

it("dismisses the value tip with Escape while retaining keyboard focus and value", async () => {
  const user = userEvent.setup();
  render(<Slider aria-label="音量" defaultValue={60} />);
  await user.tab();
  const slider = screen.getByRole("slider", { name: "音量" });
  expect(await screen.findByRole("tooltip")).toHaveTextContent("60");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  expect(slider).toHaveFocus();
  expect(slider).toHaveValue("60");
});

it.each([
  [{ value: NaN, label: "错误" }], [{ value: 101, label: "越界" }],
  [{ value: 20, label: "一" }, { value: 20, label: "二" }],
].map(marks => [marks]))("rejects invalid marks instead of painting misleading positions", marks => {
  expect(() => render(<Slider marks={marks} />)).toThrow(/Slider marks/);
});
