import { createRef, memo, startTransition, Suspense, useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as UI from "../index";

const options = [
  { value: "locked", label: "固定权限", disabled: true, description: "由管理员配置" },
  { value: "a", label: "作业通知", description: "发布作业时通知我" },
  { value: "b", label: "课堂通知" },
];
beforeEach(() => {
  expect(UI.Checkbox, "Checkbox must be a public native control").toBeDefined();
  expect(UI.CheckboxGroup, "CheckboxGroup must be a public complete recipe").toBeDefined();
});
const reset = async (form: HTMLFormElement) => { await act(async () => { form.reset(); }); };

describe("Checkbox", () => {
  it("keeps canceled activation tied to committed state during a suspended owner update", async () => {
    let changeOwner!: (checked: boolean) => void;
    const pending = new Promise<never>(() => {});
    function Pending(): never { throw pending; }
    function Owner() {
      const [checked, setChecked] = useState(false);
      changeOwner = setChecked;
      return <Suspense fallback={<p>等待更新</p>}>
        <UI.Checkbox label="稳定选择" checked={checked} onCheckedChange={() => {}} onClick={(event) => event.preventDefault()} />
        {checked && <Pending />}
      </Suspense>;
    }
    render(<Owner />);
    await act(async () => { startTransition(() => changeOwner(true)); });
    const input = screen.getByRole("checkbox");
    await userEvent.click(input);
    expect(input).not.toBeChecked();
    expect(input).toHaveAttribute("aria-checked", "false");
  });

  it("does not change state or notify when native activation is canceled", async () => {
    const change = vi.fn();
    render(<UI.Checkbox label="取消点击" onClick={(event) => event.preventDefault()} onCheckedChange={change} />);
    const input = screen.getByRole("checkbox");
    await userEvent.click(input);
    expect(input).not.toBeChecked();
    expect(input).toHaveAttribute("aria-checked", "false");
    expect(input.closest("label")).toHaveAttribute("data-state", "unchecked");
    expect(change).not.toHaveBeenCalled();
  });

  it("follows a replaced associated form even if the checkbox does not rerender", async () => {
    const Choice = memo(() => <UI.Checkbox label="外部选择" form="replaceable" defaultChecked />);
    function Owner() {
      const [key, setKey] = useState(0);
      return <><form key={key} id="replaceable" aria-label="可替换表单" /><Choice />
        <button onClick={() => setKey(key + 1)}>替换表单</button></>;
    }
    render(<Owner />);
    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(screen.getByRole("button"));
    await reset(screen.getByRole("form") as HTMLFormElement);
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("labels one native input and toggles once by label or Space", async () => {
    const change = vi.fn(), user = userEvent.setup(), ref = createRef<HTMLInputElement>();
    render(<UI.Checkbox ref={ref} label="接收通知" description="仅在发布时通知" onCheckedChange={change} />);
    const input = screen.getByRole("checkbox", { name: "接收通知" });
    expect(ref.current).toBe(input);
    expect(input).toHaveAccessibleDescription("仅在发布时通知");
    await user.click(screen.getByText("接收通知"));
    expect(input).toBeChecked();
    await user.keyboard(" ");
    expect(input).not.toBeChecked();
    expect(change.mock.calls).toEqual([[true], [false]]);
  });

  it("keeps controlled state with the owner and does not echo prop updates", async () => {
    const change = vi.fn(), user = userEvent.setup();
    const view = render(<UI.Checkbox label="受控" checked={false} onCheckedChange={change} />);
    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    view.rerender(<UI.Checkbox label="受控" checked onCheckedChange={change} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(change.mock.calls).toEqual([[true]]);
  });

  it("keeps mixed as a presentation over native boolean serialization", async () => {
    render(<form aria-label="混合表单"><UI.Checkbox label="汇总" name="summary" value="all" defaultChecked indeterminate /></form>);
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    expect(input).toHaveAttribute("aria-checked", "mixed");
    expect(input.closest("label")?.querySelector('[data-icon="icon/minus-bold"]')).toBeTruthy();
    const form = screen.getByRole("form") as HTMLFormElement;
    expect(new FormData(form).getAll("summary")).toEqual(["all"]);
    await userEvent.click(input);
    expect(input.indeterminate).toBe(true);
    expect(new FormData(form).has("summary")).toBe(false);
  });

  it("restores default UI and immediate FormData on reset without change callbacks", async () => {
    const change = vi.fn();
    render(<form aria-label="默认表单"><UI.Checkbox label="默认项" name="x" defaultChecked onCheckedChange={change} /></form>);
    const form = screen.getByRole("form") as HTMLFormElement;
    await userEvent.click(screen.getByRole("checkbox"));
    expect(new FormData(form).has("x")).toBe(false);
    await act(async () => {
      form.reset();
      expect(new FormData(form).getAll("x")).toEqual(["on"]);
    });
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(change.mock.calls).toEqual([[false]]);
  });

  it("honors canceled reset and disabled activation", async () => {
    render(<form aria-label="取消重置" onReset={(event) => event.preventDefault()}>
      <UI.Checkbox label="可选" defaultChecked /><UI.Checkbox label="禁用" disabled />
    </form>);
    await userEvent.click(screen.getByRole("checkbox", { name: "可选" }));
    await reset(screen.getByRole("form") as HTMLFormElement);
    expect(screen.getByRole("checkbox", { name: "可选" })).not.toBeChecked();
    await userEvent.click(screen.getByRole("checkbox", { name: "禁用" }));
    expect(screen.getByRole("checkbox", { name: "禁用" })).not.toBeChecked();
  });
});

describe("CheckboxGroup", () => {
  it("preserves locked and non-rendered values across rapid item changes", async () => {
    const change = vi.fn(), user = userEvent.setup();
    render(<UI.CheckboxGroup legend="权限" options={options} defaultValue={["locked", "outside"]} onValueChange={change} />);
    await user.click(screen.getByRole("checkbox", { name: "作业通知" }));
    await user.click(screen.getByRole("checkbox", { name: "课堂通知" }));
    await user.click(screen.getByRole("checkbox", { name: "作业通知" }));
    expect(change.mock.calls).toEqual([
      [["locked", "outside", "a"]], [["locked", "outside", "a", "b"]], [["locked", "outside", "b"]],
    ]);
    expect(screen.getByRole("checkbox", { name: "固定权限" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "固定权限" })).toBeDisabled();
  });

  it("resets externally associated forms and serializes enabled rendered inputs only", async () => {
    render(<><form id="external" aria-label="外部表单" />
      <UI.CheckboxGroup legend="通知" form="external" name="notice" options={options} defaultValue={["locked", "outside", "a"]} />
    </>);
    const form = screen.getByRole("form") as HTMLFormElement;
    expect(new FormData(form).getAll("notice")).toEqual(["a"]);
    await userEvent.click(screen.getByRole("checkbox", { name: "课堂通知" }));
    await act(async () => {
      form.reset();
      expect(new FormData(form).getAll("notice")).toEqual(["a"]);
    });
    expect(screen.getByRole("checkbox", { name: "课堂通知" })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: "作业通知" })).toBeChecked();
  });

  it("lets a controlled owner reset its own group and emits no reset change", async () => {
    const change = vi.fn();
    function Owner() {
      const [value, setValue] = useState<string[]>(["a"]);
      return <form aria-label="受控表单" onReset={() => setValue(["a"])}>
        <UI.CheckboxGroup legend="受控通知" name="notice" options={options} value={value} onValueChange={(next) => { change(next); setValue(next); }} />
      </form>;
    }
    render(<Owner />);
    await userEvent.click(screen.getByRole("checkbox", { name: "课堂通知" }));
    await reset(screen.getByRole("form") as HTMLFormElement);
    expect(new FormData(screen.getByRole("form") as HTMLFormElement).getAll("notice")).toEqual(["a"]);
    expect(change).toHaveBeenCalledTimes(1);
  });

  it("provides legend, help and error associations without requiring every item", () => {
    render(<UI.CheckboxGroup legend="选择通知" required invalid help="可以多选" message="请至少选择一项" options={options} />);
    const group = screen.getByRole("group", { name: /选择通知/ });
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(group).toHaveAccessibleDescription("可以多选 请至少选择一项");
    const input = screen.getByRole("checkbox", { name: "作业通知" });
    expect(input).toHaveAccessibleDescription("可以多选 请至少选择一项 发布作业时通知我");
    expect(input).not.toBeRequired();
  });

  it("uses declared defaults on reset without resetting when defaults change", async () => {
    const view = render(<form aria-label="更新默认"><UI.CheckboxGroup legend="通知" name="notice" options={options} defaultValue={["a"]} /></form>);
    view.rerender(<form aria-label="更新默认"><UI.CheckboxGroup legend="通知" name="notice" options={options} defaultValue={["b"]} /></form>);
    expect(screen.getByRole("checkbox", { name: "作业通知" })).toBeChecked();
    await reset(screen.getByRole("form") as HTMLFormElement);
    expect(screen.getByRole("checkbox", { name: "课堂通知" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "作业通知" })).not.toBeChecked();
  });

  it("rejects ambiguous IDs, state ownership and unsupported readonly", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<UI.CheckboxGroup legend="重复" options={[{ value: "a", label: "A" }, { value: "a", label: "B" }]} />)).toThrow(/unique/);
    expect(() => render(<UI.Checkbox {...({ label: "两种状态", checked: true, defaultChecked: true, onCheckedChange() {} } as unknown as UI.CheckboxProps)} />)).toThrow(/checked/);
    expect(() => render(<UI.Checkbox label="只读" {...{ readOnly: true }} />)).toThrow(/readOnly/);
    expect(() => render(<UI.CheckboxGroup legend="无效" options={options} defaultValue={[""]} />)).toThrow(/value/);
    error.mockRestore();
  });
});
