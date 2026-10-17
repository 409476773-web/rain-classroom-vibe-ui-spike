import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { FormItem } from "../input/form-item";
import { Select } from "./select";

const options = [
  { value: "report", label: "案例报告", group: "课内任务" },
  { value: "practice", label: "课堂练习", group: "课内任务" },
  { value: "archived", label: "已归档任务", disabled: true },
];

it.each([false, true])("submits a named choice and validates empty values (searchable=%s)", async searchable => {
  const user = userEvent.setup(), submitted = vi.fn();
  render(<form aria-label="任务表单" onSubmit={event => { event.preventDefault(); submitted(new FormData(event.currentTarget).get("kind")); }}>
    <FormItem label="任务类型" required><Select name="kind" searchable={searchable} options={options} /></FormItem>
    <button type="submit">提交</button>
  </form>);
  const form = screen.getByRole("form", { name: "任务表单" }) as HTMLFormElement;
  expect(form.checkValidity()).toBe(false);
  await user.click(screen.getByRole("button", { name: "提交" }));
  expect(submitted).not.toHaveBeenCalled();
  await user.click(screen.getByRole("combobox", { name: "任务类型" }));
  expect(await screen.findByRole("option", { name: "已归档任务" })).toHaveAttribute("aria-disabled", "true");
  await user.click(screen.getByRole("option", { name: "课堂练习" }));
  await waitFor(() => expect(form.checkValidity()).toBe(true));
  await user.click(screen.getByRole("button", { name: "提交" }));
  expect(submitted).toHaveBeenCalledExactlyOnceWith("practice");
  await user.click(screen.getByRole("button", { name: "清除任务类型" }));
  expect(form.checkValidity()).toBe(false);
  expect(new FormData(form).get("kind")).toBe("");
});

it.each([false, true])("associates an external form and excludes disabled controls (searchable=%s)", searchable => {
  const show = (disabled: boolean) => <>
    <form id="task-form" aria-label="外部表单" />
    <FormItem label="任务类型" disabled={disabled}>
      <Select name="kind" form="task-form" searchable={searchable} options={options} defaultValue="report" />
    </FormItem>
  </>;
  const { rerender } = render(show(false));
  const form = screen.getByRole("form", { name: "外部表单" }) as HTMLFormElement;
  expect(new FormData(form).get("kind")).toBe("report");
  rerender(show(true));
  expect(new FormData(form).has("kind")).toBe(false);
});

it.each([false, true])("serializes multiple values without duplicating the field (searchable=%s)", searchable => {
  render(<form aria-label="多选表单"><Select name="kind" multiple searchable={searchable} required
    aria-label="任务类型" options={options} defaultValue={["report", "practice"]} /></form>);
  const form = screen.getByRole("form", { name: "多选表单" }) as HTMLFormElement;
  expect(new FormData(form).getAll("kind")).toEqual(["report", "practice"]);
  expect(form.checkValidity()).toBe(true);
});

it("keeps unnamed required choices under the existing host validation contract", () => {
  render(<form aria-label="宿主表单"><FormItem label="任务类型" required><Select options={options} /></FormItem></form>);
  expect(screen.getByRole("combobox", { name: "任务类型" })).toHaveAttribute("aria-required", "true");
  expect((screen.getByRole("form", { name: "宿主表单" }) as HTMLFormElement).checkValidity()).toBe(true);
});
