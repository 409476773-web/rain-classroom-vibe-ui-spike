import { fireEvent, render, screen } from "@testing-library/react";
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
