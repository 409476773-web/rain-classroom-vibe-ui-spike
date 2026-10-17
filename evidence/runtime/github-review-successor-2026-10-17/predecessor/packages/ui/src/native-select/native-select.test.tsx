import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { DensityProvider } from "@rain-next/foundations";
import { FormItem } from "../input/form-item";
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "./native-select";

const options = <><NativeSelectOption value="">请选择</NativeSelectOption><NativeSelectOptGroup label="课程">
  <NativeSelectOption value="math">数学</NativeSelectOption><NativeSelectOption value="art" disabled>美术</NativeSelectOption>
  <option value="science">科学</option></NativeSelectOptGroup></>;

describe("NativeSelect", () => {
  it("keeps the native select, label, description, required and ref contract", async () => {
    const ref = createRef<HTMLSelectElement>();
    render(<FormItem label="课程" id="native-course" help="按教学安排选择" message="请选择课程" status="error" required>
      <NativeSelect ref={ref} name="course" defaultValue="">{options}</NativeSelect>
    </FormItem>);
    const select = screen.getByRole("combobox", { name: "课程" });
    expect(select).toBe(ref.current);
    expect(select.tagName).toBe("SELECT");
    expect(select).toBeRequired();
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAccessibleDescription("按教学安排选择 请选择课程");
    await userEvent.click(screen.getByText("课程", { selector: "label" }));
    expect(select).toHaveFocus();
    expect(screen.getByRole("group", { name: "课程" }).tagName).toBe("OPTGROUP");
  });

  it("uses native form association, required validity, submission and reset", async () => {
    const user = userEvent.setup();
    render(<><form id="native-settings" aria-label="设置" /><NativeSelect aria-label="课程" name="course" form="native-settings" required defaultValue="">{options}</NativeSelect></>);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.checkValidity()).toBe(false);
    await user.selectOptions(select, "math");
    expect(select.checkValidity()).toBe(true);
    const form = screen.getByRole("form", { name: "设置" }) as HTMLFormElement;
    expect(new FormData(form).get("course")).toBe("math");
    form.reset();
    expect(select).toHaveValue("");
  });

  it("supports host controlled value with both value and native change callbacks", async () => {
    const changed = vi.fn();
    const native = vi.fn();
    function Example() {
      const [value, setValue] = useState("math");
      return <NativeSelect aria-label="课程" value={value} onValueChange={(next) => { changed(next); setValue(next); }} onChange={native}>{options}</NativeSelect>;
    }
    render(<Example />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "science");
    expect(screen.getByRole("combobox")).toHaveValue("science");
    expect(changed).toHaveBeenCalledExactlyOnceWith("science");
    expect(native).toHaveBeenCalledOnce();
  });

  it("honors inherited disabled and disabled options without emitting changes", async () => {
    const changed = vi.fn();
    const native = vi.fn();
    const { rerender } = render(<FormItem label="课程" disabled><NativeSelect defaultValue="math" onValueChange={changed} onChange={native}>{options}</NativeSelect></FormItem>);
    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
    await userEvent.selectOptions(select, "science");
    fireEvent.change(select, { target: { value: "science" } });
    expect(changed).not.toHaveBeenCalled();
    expect(native).not.toHaveBeenCalled();
    rerender(<NativeSelect aria-label="课程" defaultValue="math" onValueChange={changed}>{options}</NativeSelect>);
    await userEvent.selectOptions(screen.getByRole("combobox"), "art");
    expect(screen.getByRole("combobox")).toHaveValue("math");
    expect(changed).not.toHaveBeenCalled();
  });

  it("uses the Input density sizes and permits four explicit heights", () => {
    const { rerender } = render(<DensityProvider density="compact"><NativeSelect aria-label="课程">{options}</NativeSelect></DensityProvider>);
    expect(screen.getByRole("combobox").parentElement).toHaveAttribute("data-size", "24");
    for (const size of [24, 28, 32, 36] as const) {
      rerender(<NativeSelect aria-label="课程" size={size}>{options}</NativeSelect>);
      expect(screen.getByRole("combobox").parentElement).toHaveAttribute("data-size", `${size}`);
      expect(screen.getByRole("combobox")).not.toHaveAttribute("size");
    }
    rerender(<NativeSelect aria-label="课程">{options}</NativeSelect>);
    expect(screen.getByRole("combobox").parentElement).toHaveAttribute("data-size", "32");
  });

  it("supports a single inside label without duplicating its accessible name", () => {
    render(<FormItem label="课程" labelPosition="inside"><NativeSelect defaultValue="math">{options}</NativeSelect></FormItem>);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select).toHaveAccessibleName("课程");
    expect(select.labels).toHaveLength(1);
    expect(select.parentElement).toContainElement(select.labels![0]!);
  });
});
