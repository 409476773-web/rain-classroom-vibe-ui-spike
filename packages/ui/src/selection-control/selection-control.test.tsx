import { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { SelectionControlSurface } from "./selection-control";
import { CardSurface } from "../selection-card/selection-card.parts";

it("preserves an injected input's native change, reset and separate label/input refs", async () => {
  const inputRef = createRef<HTMLInputElement>(), labelRef = createRef<HTMLLabelElement>();
  const observedInputs: HTMLInputElement[] = [];
  const change = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => observedInputs.push(event.currentTarget));
  render(<form aria-label="选择呈现">
    <SelectionControlSurface state={{ kind: "checkbox", checked: true, disabled: false }}
      labelProps={{ ref: labelRef, className: "consumer-layout", style: { maxWidth: 320 }, "aria-describedby": "extra-help" }}
      renderLabel={props => <CardSurface as="label" {...props} />}
      input={<input ref={inputRef} type="checkbox" name="course" value="physics" defaultChecked onChange={change} aria-labelledby="course-label" />}
      trailing={<span aria-hidden="true">A</span>}>
      <span id="course-label">物理课程</span>
    </SelectionControlSurface>
    <p id="extra-help">课程说明</p>
  </form>);

  const input = screen.getByRole("checkbox", { name: "物理课程" });
  const form = screen.getByRole("form") as HTMLFormElement;
  expect(inputRef.current).toBe(input);
  expect(input.parentElement).toBe(labelRef.current);
  expect(labelRef.current?.tagName).toBe("LABEL");
  expect(labelRef.current).toHaveClass("consumer-layout", "rain-checkbox", "rain-selection-card");
  expect(labelRef.current).toHaveStyle({ maxWidth: "320px" });
  expect(labelRef.current).toHaveAttribute("aria-describedby", "extra-help");
  expect(form.querySelectorAll("input")).toHaveLength(1);
  expect(form.querySelectorAll("label")).toHaveLength(1);
  expect(new FormData(form).getAll("course")).toEqual(["physics"]);

  await userEvent.click(screen.getByText("物理课程"));
  expect(input).not.toBeChecked();
  expect(change).toHaveBeenCalledTimes(1);
  expect(observedInputs).toEqual([input]);
  expect(new FormData(form).getAll("course")).toEqual([]);
  await act(async () => form.reset());
  expect(input).toBeChecked();
  expect(change).toHaveBeenCalledTimes(1);
});

it("does not supply a name or overwrite an injected radio's controlled and ARIA props", () => {
  const change = vi.fn();
  render(<SelectionControlSurface state={{ kind: "radio", checked: false, disabled: true, invalid: true }}
    input={<input type="radio" checked={false} disabled required onChange={change} aria-label="跳过的答案" aria-invalid="true" aria-keyshortcuts="B" />}>
    <span>跳过的答案</span>
  </SelectionControlSurface>);
  const input = screen.getByRole("radio", { name: "跳过的答案" });
  expect(input).not.toHaveAttribute("name");
  expect(input).toBeDisabled();
  expect(input).toBeRequired();
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAttribute("aria-keyshortcuts", "B");
  expect(input.parentElement).toHaveAttribute("data-state", "unchecked");
  expect(input.parentElement).toHaveAttribute("data-disabled", "true");
  expect(change).not.toHaveBeenCalled();
});
