import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { DensityProvider } from "../../../foundations/src/density";
import { Input } from "./input";

function getFieldRoot(control: HTMLElement) {
  const field = control.closest('[data-rain-id="ui-input"]');
  expect(field).not.toBeNull();
  return field as HTMLElement;
}

function describedByIds(control: HTMLElement) {
  return new Set(
    (control.getAttribute("aria-describedby") ?? "")
      .split(/\s+/)
      .filter(Boolean),
  );
}

describe("Input", () => {
  it("associates the Field label and description with the native control", () => {
    render(
      <Input
        description="最多输入 30 个字"
        label="课程名称"
        name="course-name"
        placeholder="请输入课程名称"
        required
      />,
    );

    const control = screen.getByRole("textbox", { name: "课程名称" });
    const field = getFieldRoot(control);
    const label = screen.getByText("课程名称");
    const description = screen.getByText("最多输入 30 个字");

    expect(field).toHaveAttribute("data-slot", "field");
    expect(field).toHaveAttribute("data-state", "default");
    expect(field).toHaveAttribute("data-density", "default");
    expect(label).toHaveAttribute("data-slot", "label");
    expect(label).toHaveAttribute("for", control.id);
    expect(description).toHaveAttribute("data-slot", "description");
    expect(description.id).not.toBe("");
    expect(describedByIds(control)).toContain(description.id);
    expect(control).toHaveAttribute("data-slot", "control");
    expect(control).toHaveAttribute("data-focus", "control");
    expect(control).toHaveAttribute("name", "course-name");
    expect(control).toBeRequired();
  });

  it("inherits Compact density from the nearest DensityProvider", () => {
    render(
      <DensityProvider density="compact">
        <Input label="紧凑课程名称" />
      </DensityProvider>,
    );

    const control = screen.getByRole("textbox", {
      name: "紧凑课程名称",
    });
    expect(getFieldRoot(control)).toHaveAttribute(
      "data-density",
      "compact",
    );
  });

  it("lets an explicit density override the surrounding context", () => {
    render(
      <DensityProvider density="compact">
        <Input density="default" label="默认密度课程名称" />
      </DensityProvider>,
    );

    const control = screen.getByRole("textbox", {
      name: "默认密度课程名称",
    });
    const field = getFieldRoot(control);
    expect(field).toHaveAttribute(
      "data-density",
      "default",
    );
    expect(
      field.style.getPropertyValue("--rain-density-control-height"),
    ).toBe("36px");
    expect(
      field.style.getPropertyValue("--rain-density-control-padding-inline"),
    ).toBe("14px");
  });

  it("applies a standalone Compact override to the actual geometry variables", () => {
    render(<Input density="compact" label="紧凑课程名称" />);

    const field = getFieldRoot(
      screen.getByRole("textbox", { name: "紧凑课程名称" }),
    );
    expect(field).toHaveAttribute("data-density", "compact");
    expect(
      field.style.getPropertyValue("--rain-density-control-height"),
    ).toBe("30px");
    expect(
      field.style.getPropertyValue("--rain-density-control-padding-inline"),
    ).toBe("10px");
  });

  it("connects an error message without dropping the description", () => {
    render(
      <Input
        defaultValue="重复课程"
        description="课程名称需要保持唯一"
        errorMessage="该课程名称已存在"
        label="课程名称"
      />,
    );

    const control = screen.getByRole("textbox", { name: "课程名称" });
    const field = getFieldRoot(control);
    const description = screen.getByText("课程名称需要保持唯一");
    const message = screen.getByRole("alert");
    const ids = describedByIds(control);

    expect(field).toHaveAttribute("data-state", "error");
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(message).toHaveAttribute("data-slot", "message");
    expect(message).toHaveTextContent("该课程名称已存在");
    expect(description.id).not.toBe("");
    expect(message.id).not.toBe("");
    expect(ids).toContain(description.id);
    expect(ids).toContain(message.id);
  });

  it("renders semantic start and end adornment parts", () => {
    render(
      <Input
        endAdornment={<span>字</span>}
        label="课程简称"
        startAdornment={<span>课程</span>}
      />,
    );

    expect(screen.getByText("课程")).toHaveAttribute(
      "data-slot",
      "start-adornment",
    );
    expect(screen.getByText("字")).toHaveAttribute(
      "data-slot",
      "end-adornment",
    );
  });

  it("clears an uncontrolled value through an explicit text action", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Input
        clearable
        defaultValue="人工智能导论"
        label="课程名称"
        onValueChange={onValueChange}
      />,
    );

    const control = screen.getByRole("textbox", { name: "课程名称" });
    const field = getFieldRoot(control);
    const clearAction = screen.getByRole("button", {
      name: "清除课程名称",
    });

    expect(field).toHaveAttribute("data-state", "value");
    expect(clearAction).toHaveAttribute("data-slot", "clear-action");
    expect(clearAction.textContent?.trim()).toBe("清除");
    expect(clearAction.querySelector("svg")).toBeNull();

    await user.click(clearAction);

    expect(control).toHaveValue("");
    expect(control).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("");
    expect(field).toHaveAttribute("data-state", "default");
    expect(
      screen.queryByRole("button", { name: "清除课程名称" }),
    ).not.toBeInTheDocument();
  });

  it("keeps a controlled value on the same onValueChange path", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    let currentValue = "旧课程名";
    let rerenderControlled:
      | ReturnType<typeof render>["rerender"]
      | undefined;
    const onValueChange = (nextValue: string) => {
      changes(nextValue);
      currentValue = nextValue;
      rerenderControlled?.(
        <Input
          clearable
          label="受控课程名称"
          onValueChange={onValueChange}
          value={currentValue}
        />,
      );
    };
    const view = render(
      <Input
        clearable
        label="受控课程名称"
        onValueChange={onValueChange}
        value={currentValue}
      />,
    );
    rerenderControlled = view.rerender;

    const control = screen.getByRole("textbox", {
      name: "受控课程名称",
    });
    await user.click(
      screen.getByRole("button", { name: "清除受控课程名称" }),
    );
    expect(control).toHaveValue("");
    expect(changes).toHaveBeenLastCalledWith("");

    await user.type(control, "新课程名");

    expect(control).toHaveValue("新课程名");
    expect(changes).toHaveBeenLastCalledWith("新课程名");
    expect(getFieldRoot(control)).toHaveAttribute("data-state", "value");
  });

  it("clears a controlled value through the inherited native onChange path", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function NativeControlledInput() {
      const [controlledValue, setControlledValue] = useState("旧课程名");
      return (
        <Input
          clearable
          label="原生受控课程名称"
          onChange={(event) => {
            onChange(event.currentTarget.value);
            setControlledValue(event.currentTarget.value);
          }}
          value={controlledValue}
        />
      );
    }

    render(<NativeControlledInput />);
    const control = screen.getByRole("textbox", {
      name: "原生受控课程名称",
    });

    await user.click(
      screen.getByRole("button", { name: "清除原生受控课程名称" }),
    );

    expect(onChange).toHaveBeenLastCalledWith("");
    expect(control).toHaveValue("");
    expect(control).toHaveFocus();
  });

  it("uses native disabled semantics and removes the clear action", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Input
        clearable
        defaultValue="不可编辑课程"
        disabled
        label="禁用课程名称"
        onValueChange={onValueChange}
      />,
    );

    const control = screen.getByRole("textbox", {
      name: "禁用课程名称",
    });
    expect(control).toBeDisabled();
    expect(getFieldRoot(control)).toHaveAttribute("data-state", "disabled");
    expect(
      screen.queryByRole("button", { name: "清除禁用课程名称" }),
    ).not.toBeInTheDocument();

    await user.type(control, "测试");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("uses native read-only semantics without presenting a clear action", () => {
    render(
      <Input
        clearable
        defaultValue="只读课程"
        label="只读课程名称"
        readOnly
      />,
    );

    const control = screen.getByRole("textbox", {
      name: "只读课程名称",
    });
    expect(control).toHaveAttribute("readonly");
    expect(control).not.toBeDisabled();
    expect(getFieldRoot(control)).toHaveAttribute(
      "data-state",
      "read-only",
    );
    expect(
      screen.queryByRole("button", { name: "清除只读课程名称" }),
    ).not.toBeInTheDocument();
  });

  it("keeps error intent separate from the keyboard focus semantic", async () => {
    const user = userEvent.setup();
    render(<Input errorMessage="请输入课程名称" label="课程名称" />);

    const control = screen.getByRole("textbox", { name: "课程名称" });
    expect(control).toHaveAttribute("data-focus", "control");

    await user.tab();
    expect(control).toHaveFocus();
  });
});
