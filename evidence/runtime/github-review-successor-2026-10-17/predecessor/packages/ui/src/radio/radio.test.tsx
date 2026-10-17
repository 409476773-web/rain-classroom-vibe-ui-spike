import { createRef, memo, startTransition, Suspense, useState } from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";
import * as UI from "../index";

const options = [
  { value: "locked", label: "固定方式", disabled: true, description: "暂不可选" },
  { value: "a", label: "立即发布", description: "发布后学生即可查看" },
  { value: "b", label: "定时发布" },
];
beforeEach(() => {
  expect(UI.Radio, "Radio must be publicly exported").toBeDefined();
  expect(UI.RadioGroup, "RadioGroup must be publicly exported").toBeDefined();
});
const form = () => screen.getByRole("form") as HTMLFormElement;
const reset = async () => { await act(async () => { form().reset(); }); };

it("names a native input, exposes its ref and only reports becoming selected", async () => {
  const change = vi.fn(), ref = createRef<HTMLInputElement>();
  const view = render(<UI.Radio ref={ref} name="single" value="a" label="单选" description="说明" checked={false} onCheckedChange={change} />);
  expect(ref.current).toBe(screen.getByRole("radio", { name: "单选" }));
  expect(ref.current).toHaveAccessibleDescription("说明");
  await userEvent.click(screen.getByText("说明"));
  expect(change.mock.calls).toEqual([[true]]);
  expect(ref.current).not.toBeChecked();
  view.rerender(<UI.Radio ref={ref} name="single" value="a" label="单选" checked onCheckedChange={change} />);
  await userEvent.click(ref.current!);
  expect(ref.current).toBeChecked();
  expect(change).toHaveBeenCalledTimes(1);
});

it("keeps canceled selection tied to committed state during suspended updates", async () => {
  let setOwner!: (value: boolean) => void;
  const pending = new Promise<never>(() => {}), change = vi.fn();
  function Pending(): never { throw pending; }
  function Owner() {
    const [checked, setChecked] = useState(false); setOwner = setChecked;
    return <Suspense fallback="等待">
      <UI.Radio name="cancel" value="a" label="取消" checked={checked} onCheckedChange={change} onClick={(event) => event.preventDefault()} />
      {checked && <Pending />}
    </Suspense>;
  }
  render(<Owner />);
  await act(async () => { startTransition(() => setOwner(true)); });
  await userEvent.click(screen.getByRole("radio"));
  expect(screen.getByRole("radio")).not.toBeChecked();
  expect(change).not.toHaveBeenCalled();
});

it("selects exactly one value, skips repeated activation and permits replacing a disabled selected value", async () => {
  const change = vi.fn();
  render(<UI.RadioGroup legend="发布方式" options={options} defaultValue="locked" onValueChange={change} />);
  await userEvent.click(screen.getByText("发布后学生即可查看"));
  await userEvent.click(screen.getByRole("radio", { name: "立即发布" }));
  await userEvent.click(screen.getByRole("radio", { name: "定时发布" }));
  expect(change.mock.calls).toEqual([["a"], ["b"]]);
  expect(screen.getAllByRole("radio").filter((input) => (input as HTMLInputElement).checked)).toEqual([screen.getByRole("radio", { name: "定时发布" })]);
});

it("leaves empty or absent values unselected and gives separate groups unique native names", async () => {
  const view = render(<><UI.RadioGroup legend="一组" options={options} defaultValue="missing" /><UI.RadioGroup legend="二组" options={options} /></>);
  const groups = screen.getAllByRole("radiogroup");
  expect(screen.getAllByRole("radio").every((input) => !(input as HTMLInputElement).checked)).toBe(true);
  expect(within(groups[0]!).getAllByRole("radio")[0]!.getAttribute("name")).not.toBe(within(groups[1]!).getAllByRole("radio")[0]!.getAttribute("name"));
  await userEvent.click(within(groups[1]!).getByRole("radio", { name: "定时发布" }));
  view.rerender(<><UI.RadioGroup legend="一组" options={[...options, { value: "missing", label: "后来出现" }]} defaultValue="missing" /><UI.RadioGroup legend="二组" options={options} /></>);
  expect(screen.getByRole("radio", { name: "后来出现" })).toBeChecked();
  expect(within(groups[1]!).getByRole("radio", { name: "定时发布" })).toBeChecked();
});

it("keeps controlled ownership without echoing value updates", async () => {
  const change = vi.fn();
  const view = render(<UI.RadioGroup legend="受控" options={options} value="a" onValueChange={change} />);
  await userEvent.click(screen.getByRole("radio", { name: "定时发布" }));
  expect(screen.getByRole("radio", { name: "立即发布" })).toBeChecked();
  view.rerender(<UI.RadioGroup legend="受控" options={options} value={null} onValueChange={change} />);
  expect(screen.getAllByRole("radio").every((input) => !(input as HTMLInputElement).checked)).toBe(true);
  expect(change.mock.calls).toEqual([["b"]]);
});

it("restores latest defaults and immediate FormData without reset notifications", async () => {
  const change = vi.fn();
  const view = render(<form aria-label="表单"><UI.RadioGroup legend="方式" name="mode" options={options} defaultValue="a" onValueChange={change} /></form>);
  view.rerender(<form aria-label="表单"><UI.RadioGroup legend="方式" name="mode" options={options} defaultValue="b" onValueChange={change} /></form>);
  expect(new FormData(form()).get("mode")).toBe("a");
  await act(async () => {
    form().reset();
    expect(new FormData(form()).getAll("mode")).toEqual(["b"]);
  });
  expect(screen.getByRole("radio", { name: "定时发布" })).toBeChecked();
  expect(change).not.toHaveBeenCalled();
});

it("honors canceled reset and disabled fieldsets and validates native required groups", async () => {
  render(<form aria-label="表单" onReset={(event) => event.preventDefault()}>
    <UI.RadioGroup legend="必填" name="mode" options={options} required invalid help="仅选一项" message="请选择" />
    <fieldset disabled><UI.RadioGroup legend="禁用组" options={options} /></fieldset>
  </form>);
  const group = screen.getByRole("radiogroup", { name: /必填/ });
  expect(group).toHaveAccessibleDescription("仅选一项 请选择");
  expect(group).toHaveAttribute("aria-invalid", "true");
  expect(form().checkValidity()).toBe(false);
  await userEvent.click(within(group).getByRole("radio", { name: "定时发布" }));
  expect(form().checkValidity()).toBe(true);
  await reset();
  expect(new FormData(form()).get("mode")).toBe("b");
  const disabled = within(screen.getByRole("radiogroup", { name: "禁用组" })).getByRole("radio", { name: "立即发布" });
  await userEvent.click(disabled);
  expect(disabled).toBeDisabled(); expect(disabled).not.toBeChecked();
});

it("follows a replaced external form without rerendering the group", async () => {
  const Choice = memo(() => <UI.RadioGroup legend="外部" name="mode" form="external" options={options} defaultValue="a" />);
  function Owner() {
    const [key, setKey] = useState(0);
    return <><form key={key} id="external" aria-label="外部表单" /><Choice /><button onClick={() => setKey(key + 1)}>替换</button></>;
  }
  render(<Owner />);
  await userEvent.click(screen.getByRole("radio", { name: "定时发布" }));
  await userEvent.click(screen.getByRole("button"));
  expect(new FormData(form()).get("mode")).toBe("b");
  await reset();
  expect(new FormData(form()).get("mode")).toBe("a");
  expect(screen.getByRole("radio", { name: "立即发布" })).toBeChecked();
});

it("allows a controlled owner to reset and makes disabled selection absent from submission", async () => {
  const change = vi.fn();
  function Owner() {
    const [value, setValue] = useState<string | null>("locked");
    return <form aria-label="表单" onReset={() => setValue("locked")}><UI.RadioGroup legend="方式" options={options} name="mode" value={value} onValueChange={(next) => { setValue(next); change(next); }} /></form>;
  }
  render(<Owner />);
  expect(new FormData(form()).has("mode")).toBe(false);
  await userEvent.click(screen.getByRole("radio", { name: "定时发布" }));
  await reset();
  expect(screen.getByRole("radio", { name: "固定方式" })).toBeChecked();
  expect(new FormData(form()).has("mode")).toBe(false);
  expect(change.mock.calls).toEqual([["b"]]);
});

it("rejects ambiguous IDs, state ownership and unsupported item modes", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  for (const props of [
    { options: [{ value: "a", label: "A" }, { value: "a", label: "B" }] },
    { value: "a", defaultValue: "b", onValueChange() {} }, { defaultValue: 1 }, { name: "" }, { readOnly: true },
  ]) expect(() => render(<UI.RadioGroup {...({ legend: "组", options, ...props } as unknown as UI.RadioGroupProps)} />)).toThrow();
  for (const props of [{ name: "" }, { value: "" }, { label: undefined }, { checked: undefined }, { defaultChecked: true }, { readOnly: true }]) {
    expect(() => render(<UI.Radio {...({ label: "单项", name: "mode", value: "a", checked: false, onCheckedChange() {}, ...props } as unknown as UI.RadioProps)} />)).toThrow();
  }
  error.mockRestore();
});
