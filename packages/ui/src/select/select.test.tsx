import { DensityProvider } from "@rain-next/foundations";
import { createRef } from "react";
import { fireEvent, render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { FormItem } from "../input/form-item";
import { Select, type SelectHandle, type SelectOption, type SelectProps } from "./select";

const options: readonly SelectOption[] = [
  { value: "a", label: "视传 2401", group: "视觉传达" },
  { value: "blocked", label: "已停用班级", disabled: true, group: "视觉传达" },
  { value: "b", label: "数媒 2401", description: "数字媒体联合班", group: "数字媒体" },
  { value: "c", label: "工业设计 2401" },
];
const trigger = () => screen.getByRole("combobox", { name: "教学班" });
const root = () => trigger().closest('[data-rain-id="ui-select"]') as HTMLElement;

it("ports the options out of clipping containers while keeping widget focus and local theme", async () => {
  const user = userEvent.setup(), blurred = vi.fn();
  render(<DensityProvider density="compact"><div data-rain-theme="dark" data-density="compact" style={{ overflow: "hidden", height: 40 }}>
    <Select multiple searchable options={options} aria-label="教学班" onBlur={blurred} />
  </div></DensityProvider>);
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  const list = screen.getByRole("listbox");
  expect(root().contains(list)).toBe(false);
  expect(list.closest('[data-rain-theme]')).toHaveAttribute("data-rain-theme", "dark");
  expect(list.closest('[data-density]')).toHaveAttribute("data-density", "compact");
  await user.click(screen.getByRole("option", { name: "视传 2401" }));
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
  expect(blurred).not.toHaveBeenCalled();
});

it("composes selected values with formal Tags and preserves Select recipe parts", async () => {
  const user = userEvent.setup();
  render(<Select multiple display="tags" options={options} defaultValue={["a", "b"]} aria-label="教学班" />);
  expect(root().querySelectorAll('[data-rain-id="ui-tag"]')).toHaveLength(2);
  await user.click(screen.getByRole("button", { name: "移除 视传 2401" }));
  expect(screen.getByRole("button", { name: "移除 数媒 2401" })).toHaveFocus();
});

it.each([[false, false], [false, true], [true, false], [true, true]] as const)(
  "provides a complete selection flow (multiple=%s, searchable=%s)", async (multiple, searchable) => {
    const user = userEvent.setup(), changed = vi.fn();
    render(multiple
      ? <Select multiple searchable={searchable} options={options} aria-label="教学班" onValueChange={changed} />
      : <Select searchable={searchable} options={options} aria-label="教学班" onValueChange={changed} />);
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(Boolean(screen.queryByLabelText("搜索选项"))).toBe(searchable);
    await user.click(screen.getByRole("option", { name: "视传 2401" }));
    expect(changed).toHaveBeenCalledExactlyOnceWith(multiple ? ["a"] : "a", expect.objectContaining({ reason: "select", selectedOptions: [options[0]] }));
    expect(trigger()).toHaveTextContent("视传 2401");
    expect(trigger()).toHaveAttribute("aria-expanded", String(multiple));
    if (!multiple) expect(trigger()).toHaveFocus();
  },
);

it("preserves selected metadata when remote search replaces the candidates and respects controlled values", async () => {
  const user = userEvent.setup(), changed = vi.fn(), selected = [options[0]!];
  const { rerender } = render(<Select multiple aria-label="教学班" value={["a"]} options={selected} selectedOptions={selected} onValueChange={changed} />);
  rerender(<Select multiple aria-label="教学班" value={["a"]} options={[options[2]!]} selectedOptions={selected} onValueChange={changed} />);
  expect(trigger()).toHaveTextContent("视传 2401");
  expect(changed).not.toHaveBeenCalled();
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  await user.click(screen.getByRole("option", { name: /数媒 2401/ }));
  expect(changed).toHaveBeenCalledExactlyOnceWith(["a", "b"], expect.objectContaining({ selectedOptions: [options[0], options[2]] }));
  expect(trigger()).not.toHaveTextContent("数媒 2401");
  rerender(<Select multiple aria-label="教学班" value={["a", "b", "unknown"]} options={[{ ...options[2]!, label: "最新班名" }]} selectedOptions={selected} onValueChange={changed} />);
  expect(trigger()).toHaveAccessibleDescription(/unknown/);
  expect(trigger()).toHaveTextContent("最新班名");
});

it("treats zero and the empty string as values and distinguishes numbers from their string forms", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  const values = [{ value: 0, label: "零" }, { value: "", label: "空标识" }, { value: 1, label: "数字一" }, { value: "1", label: "文字一" }];
  render(<Select aria-label="教学班" options={values} defaultValue={0} onValueChange={changed} />);
  expect(trigger()).toHaveTextContent("零");
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  await user.click(screen.getByRole("option", { name: "零" }));
  expect(changed).not.toHaveBeenCalled();
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  await user.click(screen.getByRole("option", { name: "空标识" }));
  expect(changed).toHaveBeenLastCalledWith("", expect.objectContaining({ reason: "select" }));
  expect(trigger()).toHaveTextContent("空标识");
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  await user.click(screen.getByRole("option", { name: "文字一" }));
  expect(changed).toHaveBeenLastCalledWith("1", expect.anything());
});

it("filters descriptions and keeps value clearing separate from query clearing", async () => {
  const user = userEvent.setup();
  render(<Select multiple searchable aria-label="教学班" options={options} />);
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  const search = screen.getByLabelText("搜索选项");
  await user.type(search, " 联合 ");
  expect(screen.queryByRole("option", { name: "视传 2401" })).not.toBeInTheDocument();
  await user.click(screen.getByRole("option", { name: /数媒 2401/ }));
  expect(search).toHaveValue(" 联合 ");
  await user.click(within(root()).getByRole("button", { name: "清除教学班" }));
  expect(search).toHaveValue(" 联合 ");
  expect(trigger()).toHaveTextContent("请选择");
  await user.keyboard("{Escape}");
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  expect(screen.getByLabelText("搜索选项")).toHaveValue("");
});

it.each(["pointer", "keyboard"] as const)("keeps the panel open when its search is cleared by %s", async (method) => {
  const user = userEvent.setup(), focused = vi.fn(), blurred = vi.fn();
  render(<Select multiple searchable options={options} aria-label="教学班" onFocus={focused} onBlur={blurred} />);
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  const search = screen.getByLabelText("搜索选项");
  await user.type(search, "视传");
  const clear = screen.getByRole("button", { name: "清除搜索选项" });
  if (method === "keyboard") { await user.tab(); expect(clear).toHaveFocus(); await user.keyboard("{Enter}"); }
  else await user.click(clear);
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  expect(search).toHaveValue("");
  expect(search).toHaveFocus();
  expect(focused).toHaveBeenCalledOnce();
  expect(blurred).not.toHaveBeenCalled();
});

it("commits Chinese composition once without filtering or submitting the enclosing form mid-composition", async () => {
  const user = userEvent.setup(), query = vi.fn(), submit = vi.fn((event) => event.preventDefault());
  render(<form onSubmit={submit}><Select searchable aria-label="教学班" options={options} onSearchValueChange={query} /></form>);
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  const search = screen.getByLabelText("搜索选项");
  fireEvent.compositionStart(search);
  fireEvent.change(search, { target: { value: "视传" } });
  fireEvent.keyDown(search, { key: "Enter", isComposing: true, keyCode: 229 });
  expect(search).toHaveValue("视传");
  expect(query).not.toHaveBeenCalled();
  expect(screen.getAllByRole("option")).toHaveLength(4);
  fireEvent.compositionEnd(search, { data: "视传" });
  fireEvent.change(search, { target: { value: "视传" } });
  expect(query).toHaveBeenCalledExactlyOnceWith("视传");
  expect(screen.getAllByRole("option")).toHaveLength(1);
  expect(submit).not.toHaveBeenCalled();
});

it("selects the highlighted search result with Enter without submitting its form", async () => {
  const user = userEvent.setup(), changed = vi.fn(), submit = vi.fn((event) => event.preventDefault());
  render(<form onSubmit={submit}><Select searchable multiple options={options} aria-label="教学班" onValueChange={changed} /></form>);
  await user.click(trigger());
  const search = await screen.findByLabelText("搜索选项");
  await user.type(search, "视传");
  await user.keyboard("{Enter}");
  expect(changed).toHaveBeenCalledExactlyOnceWith(["a"], expect.objectContaining({ reason: "select" }));
  expect(search).toHaveValue("视传");
  expect(submit).not.toHaveBeenCalled();
});

it("keeps external query and open control independent and does not refilter server results", async () => {
  const user = userEvent.setup(), query = vi.fn(), opened = vi.fn();
  const { rerender } = render(<Select searchable aria-label="教学班" options={options} filterOption={false} searchValue="server only" open={false} onSearchValueChange={query} onOpenChange={opened} />);
  await user.click(trigger());
  await waitFor(() => expect(opened).toHaveBeenCalledExactlyOnceWith(true));
  expect(trigger()).toHaveAttribute("aria-expanded", "false");
  rerender(<Select searchable aria-label="教学班" options={options} filterOption={false} searchValue="server only" open onSearchValueChange={query} onOpenChange={opened} />);
  expect(screen.getAllByRole("option")).toHaveLength(4);
  await user.type(screen.getByLabelText("搜索选项"), "x");
  expect(query).toHaveBeenCalledWith("server onlyx");
  expect(screen.getByLabelText("搜索选项")).toHaveValue("server only");
});

it("isolates the internal search from FormItem status, required and IDs", async () => {
  const user = userEvent.setup(), ref = createRef<SelectHandle>();
  render(<FormItem label="教学班" required status="error" message="请选择班级"><Select searchable options={options} ref={ref} /></FormItem>);
  const fieldTrigger = screen.getByRole("combobox", { name: "教学班" });
  expect(fieldTrigger).toHaveAttribute("aria-invalid", "true");
  expect(fieldTrigger).toHaveAttribute("aria-required", "true");
  expect(fieldTrigger).toHaveAccessibleDescription(/请选择班级/);
  ref.current!.focus();
  expect(fieldTrigger).toHaveFocus();
  await user.click(fieldTrigger);
  await waitFor(() => expect(fieldTrigger).toHaveAttribute("aria-expanded", "true"));
  const search = screen.getByLabelText("搜索选项");
  expect(search).not.toHaveAttribute("aria-invalid");
  expect(search).not.toBeRequired();
  expect(search.id).not.toBe(fieldTrigger.id);
  expect(search.closest('[data-rain-id="ui-input"]')).toHaveAttribute("data-status", "default");
  expect(search).not.toHaveAttribute("aria-describedby");
});

it("keeps selection readable and editable while the candidate area loads or fails", async () => {
  const user = userEvent.setup(), retry = vi.fn();
  const { rerender } = render(<Select searchable aria-label="教学班" options={options} defaultValue="a" loading />);
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  expect(trigger()).toHaveTextContent("视传 2401");
  expect(screen.queryByRole("option")).not.toBeInTheDocument();
  expect(screen.getByLabelText("搜索选项")).toBeEnabled();
  expect(screen.getByRole("button", { name: "清除教学班" })).toBeEnabled();
  rerender(<Select searchable aria-label="教学班" options={options} defaultValue="a" loadError="加载失败" onRetry={retry} />);
  expect(screen.getByRole("alert")).toHaveTextContent("加载失败");
  await user.click(screen.getByRole("button", { name: "重试" }));
  expect(retry).toHaveBeenCalledOnce();
  expect(root()).toHaveAttribute("data-status", "default");
});

it("limits only additions while allowing deselection and preserving over-limit backfills", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<Select multiple aria-label="教学班" options={options} defaultValue={["a", "b"]} maxCount={1} onValueChange={changed} />);
  expect(trigger()).toHaveTextContent("数媒 2401");
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  expect(screen.getByRole("option", { name: "工业设计 2401" })).toHaveAttribute("aria-disabled", "true");
  await user.click(screen.getByRole("option", { name: "工业设计 2401" }));
  expect(changed).not.toHaveBeenCalled();
  await user.click(screen.getByRole("option", { name: /数媒 2401/ }));
  expect(changed).toHaveBeenCalledExactlyOnceWith(["a"], expect.objectContaining({ reason: "deselect" }));
});

it.each(["readOnly", "disabled"] as const)("closes and blocks mutation when permission becomes %s", async (permission) => {
  const user = userEvent.setup(), opened = vi.fn();
  const { rerender } = render(<Select aria-label="教学班" options={options} defaultValue="a" open onOpenChange={opened} />);
  rerender(<Select aria-label="教学班" options={options} defaultValue="a" open onOpenChange={opened} {...{ [permission]: true }} />);
  expect(trigger()).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("button", { name: "清除教学班" })).not.toBeInTheDocument();
  expect(opened).toHaveBeenCalledExactlyOnceWith(false);
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  if (permission === "disabled") expect(trigger()).toBeDisabled();
  else expect(trigger()).toBeEnabled();
});

it("moves active options separately from selection, skips disabled rows and restores focus", async () => {
  const user = userEvent.setup();
  render(<><Select aria-label="教学班" options={options} /><button>下一项</button></>);
  trigger().focus();
  await user.keyboard("{ArrowDown}");
  const list = screen.getByRole("listbox");
  await waitFor(() => expect(screen.getByRole("option", { name: "视传 2401" })).toHaveFocus());
  await user.keyboard("{ArrowDown}");
  const active = screen.getByRole("option", { name: /数媒 2401/ });
  expect(active).toHaveFocus();
  expect(active).toHaveAttribute("aria-selected", "false");
  await user.keyboard("{End}{Home}{Enter}");
  expect(trigger()).toHaveTextContent("视传 2401");
  expect(trigger()).toHaveFocus();
  await user.keyboard("{ArrowDown}{Escape}");
  expect(trigger()).toHaveFocus();
});

it("reports focus for the whole widget and lets external clicks keep their focus", async () => {
  const user = userEvent.setup(), focused = vi.fn(), blurred = vi.fn();
  render(<><Select searchable aria-label="教学班" options={options} onFocus={focused} onBlur={blurred} /><button>外部操作</button></>);
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  await waitFor(() => expect(screen.getByLabelText("搜索选项")).toHaveFocus());
  await user.keyboard("{ArrowDown}");
  await waitFor(() => expect(screen.getByLabelText("搜索选项")).toHaveFocus());
  expect(screen.getByLabelText("搜索选项")).toHaveAttribute("aria-activedescendant");
  expect(focused).toHaveBeenCalledOnce();
  expect(blurred).not.toHaveBeenCalled();
  await user.keyboard("{Escape}");
  expect(trigger()).toHaveFocus();
  expect(blurred).not.toHaveBeenCalled();
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  expect(focused).toHaveBeenCalledOnce();
  await user.click(screen.getByRole("button", { name: "外部操作" }));
  expect(screen.getByRole("button", { name: "外部操作" })).toHaveFocus();
  expect(blurred).toHaveBeenCalledOnce();
  expect(trigger()).toHaveAttribute("aria-expanded", "false");
});

it.each([false, true])("reports one focus exit when Tab crosses portal guards (searchable=%s)", async (searchable) => {
  const user = userEvent.setup(), focused = vi.fn(), blurred = vi.fn();
  render(<><Select searchable={searchable} options={options} aria-label="教学班" onFocus={focused} onBlur={blurred} /><button>下一项</button></>);
  trigger().focus();
  await user.keyboard("{ArrowDown}");
  await screen.findByRole("listbox");
  await waitFor(() => expect(searchable ? screen.getByLabelText("搜索选项") : screen.getByRole("option", { name: "视传 2401" })).toHaveFocus());
  await user.tab();
  await waitFor(() => expect(screen.getByRole("button", { name: "下一项" })).toHaveFocus());
  expect(trigger()).toHaveAttribute("aria-expanded", "false");
  expect(focused).toHaveBeenCalledOnce();
  expect(blurred).toHaveBeenCalledOnce();
});

it.each([
  ["readOnly", false], ["readOnly", true], ["disabled", false], ["disabled", true], ["external", false], ["external", true],
] as const)("reports focus leaving an unmounted panel (%s, searchable=%s)", async (reason, searchable) => {
  const user = userEvent.setup(), focused = vi.fn(), blurred = vi.fn();
  const show = (closed = false, open = true) => <><Select searchable={searchable} options={options} aria-label="教学班"
    open={reason === "external" && closed ? false : open} disabled={reason === "disabled" && closed} readOnly={reason === "readOnly" && closed}
    onFocus={focused} onBlur={(event) => blurred(event.currentTarget, event.relatedTarget)} /><button>外部操作</button></>;
  const { rerender } = render(show());
  await user.click(searchable ? screen.getByLabelText("搜索选项") : screen.getByRole("listbox"));
  const widget = root();
  expect(focused).toHaveBeenCalledOnce();
  rerender(show(true));
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  expect(document.body).toHaveFocus();
  await waitFor(() => expect(blurred).toHaveBeenCalledExactlyOnceWith(widget, document.body));
  await user.click(screen.getByRole("button", { name: "外部操作" }));
  rerender(show(false, false));
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  expect(trigger()).toHaveFocus();
  expect(focused).toHaveBeenCalledTimes(2);
  expect(blurred).toHaveBeenCalledOnce();
  await user.click(screen.getByRole("button", { name: "外部操作" }));
  expect(blurred).toHaveBeenCalledTimes(2);
});

it("removes chips with predictable focus and permits clearing a disabled selected option", async () => {
  const user = userEvent.setup(), changed = vi.fn();
  render(<Select multiple display="tags" size={36} aria-label="教学班" options={options} defaultValue={["a", "blocked", "b"]} onValueChange={changed} />);
  await user.click(screen.getByRole("button", { name: "移除 视传 2401" }));
  expect(screen.getByRole("button", { name: "移除 已停用班级" })).toHaveFocus();
  await user.click(screen.getByRole("button", { name: "移除 已停用班级" }));
  expect(screen.getByRole("button", { name: "移除 数媒 2401" })).toHaveFocus();
  expect(changed).toHaveBeenLastCalledWith(["b"], expect.objectContaining({ reason: "remove" }));
  await user.click(screen.getByRole("button", { name: "清除教学班" }));
  expect(trigger()).toHaveFocus();
  expect(changed).toHaveBeenLastCalledWith([], expect.objectContaining({ reason: "clear" }));
});

it("allows a new open request when the controlled parent ignored the previous one", async () => {
  const user = userEvent.setup(), opened = vi.fn();
  const { rerender } = render(<Select aria-label="教学班" options={options} open={false} onOpenChange={opened} />);
  await user.click(trigger());
  await waitFor(() => expect(opened).toHaveBeenCalled());
  rerender(<Select aria-label="教学班" options={options} open={false} onOpenChange={opened} />);
  await user.click(trigger());
  await waitFor(() => expect(opened).toHaveBeenCalledTimes(2));
  expect(opened.mock.calls).toEqual([[true], [true]]);
});

it("deduplicates the final composition input even when controlled query is not echoed", async () => {
  const user = userEvent.setup(), query = vi.fn();
  render(<Select searchable aria-label="教学班" options={options} searchValue="" onSearchValueChange={query} />);
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  const search = screen.getByLabelText("搜索选项");
  fireEvent.compositionStart(search);
  fireEvent.change(search, { target: { value: "视传" } });
  fireEvent.compositionEnd(search, { data: "视传" });
  fireEvent.change(search, { target: { value: "视传" } });
  expect(query).toHaveBeenCalledExactlyOnceWith("视传");
});

it("does not take external focus when a controlled removal is echoed later", async () => {
  const user = userEvent.setup();
  const show = (value: string[]) => <><Select multiple display="tags" options={options} value={value} aria-label="教学班" /><button>外部操作</button></>;
  const { rerender } = render(show(["a", "b"]));
  await user.click(screen.getByRole("button", { name: "移除 视传 2401" }));
  await user.click(screen.getByRole("button", { name: "外部操作" }));
  rerender(show(["b"]));
  expect(screen.getByRole("button", { name: "外部操作" })).toHaveFocus();
});

it("accepts the same query as a later edit after composition and reopening", async () => {
  const user = userEvent.setup(), query = vi.fn();
  render(<Select searchable aria-label="教学班" options={options} onSearchValueChange={query} />);
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  const search = screen.getByLabelText("搜索选项");
  fireEvent.compositionStart(search);
  fireEvent.change(search, { target: { value: "视传" } });
  fireEvent.compositionEnd(search, { data: "视传" });
  await user.keyboard("{Escape}");
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  fireEvent.change(screen.getByLabelText("搜索选项"), { target: { value: "视传" } });
  expect(screen.getByLabelText("搜索选项")).toHaveValue("视传");
  expect(query.mock.calls).toEqual([["视传"], [""], ["视传"]]);
});

it("allows repeated outside dismissal requests from a controlled open popup", async () => {
  const user = userEvent.setup(), opened = vi.fn();
  const show = () => <><Select options={options} open aria-label="教学班" onOpenChange={opened} /><button>外部操作</button></>;
  const { rerender } = render(show());
  await user.click(screen.getByRole("button", { name: "外部操作" }));
  rerender(show());
  await user.click(screen.getByRole("button", { name: "外部操作" }));
  expect(opened.mock.calls).toEqual([[false], [false]]);
});

it("keeps a stable widget currentTarget when blur has no related target", async () => {
  const user = userEvent.setup(), blurred = vi.fn();
  render(<Select options={options} aria-label="教学班" onBlur={(event) => blurred(event.currentTarget)} />);
  await user.click(trigger());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
  const widget = root();
  (document.activeElement as HTMLElement).blur();
  await Promise.resolve();
  expect(blurred).toHaveBeenCalledExactlyOnceWith(widget);
});

it.each([
  { options: [{ value: "a", label: "一" }, { value: "a", label: "二" }] },
  { options: [{ value: Infinity, label: "无限" }] },
  { options: [{ value: "a", label: " " }] },
  { options, value: ["a"] },
  { options, multiple: true, value: "a" },
  { options, multiple: true, value: ["a", "a"] },
  { options, multiple: true, display: "tags", size: 24 },
  { options, multiple: true, maxCount: -1 },
])("rejects invalid input instead of silently converting or dropping values: %j", (props) => {
  expect(() => render(<Select {...props as SelectProps} aria-label="教学班" />)).toThrow(/Select/);
});


it.each([[false, false], [false, true], [true, false], [true, true]] as const)(
  "keeps inside labels named and persistent through native activation, selection and clear (multiple=%s, searchable=%s)", async (multiple, searchable) => {
    const user = userEvent.setup(), opened = vi.fn();
    render(<FormItem label="教学班" labelPosition="inside" help="选择授课班级" status="error" message="请核对班级" required>
      {multiple ? <Select multiple searchable={searchable} options={options} onOpenChange={opened} />
        : <Select searchable={searchable} options={options} onOpenChange={opened} />}
    </FormItem>);
    const checkLabel = () => {
      const labels = screen.getAllByText("教学班", { exact: true });
      expect(labels).toHaveLength(1);
      const label = labels[0]!.closest("label")!;
      expect(root().querySelector('[data-slot="frame"]')).toContainElement(label);
      expect(label).toHaveAttribute("for", trigger().id);
      expect(trigger()).toHaveAccessibleName("教学班");
      expect(trigger()).toHaveAccessibleDescription(/选择授课班级 请核对班级/);
      expect(trigger()).toHaveAttribute("aria-required", "true");
      expect(trigger()).toHaveAttribute("aria-invalid", "true");
      return label;
    };
    await user.click(checkLabel());
    await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "true"));
    expect(opened).toHaveBeenCalledExactlyOnceWith(true);
    if (searchable) {
      await waitFor(() => expect(screen.getByLabelText("搜索选项")).toHaveFocus());
      expect(screen.getByLabelText("搜索选项")).not.toBeRequired();
      expect(screen.getByLabelText("搜索选项")).not.toHaveAttribute("aria-invalid");
    } else await waitFor(() => expect(screen.getByRole("listbox").closest('[data-rain-id="ui-select-popup"]')!.contains(document.activeElement)).toBe(true));
    await user.click(screen.getByRole("option", { name: "视传 2401" }));
    checkLabel();
    if (multiple) await user.keyboard("{Escape}");
    await user.click(within(root()).getByRole("button", { name: "清除教学班" }));
    expect(trigger()).toHaveTextContent("请选择");
    expect(trigger()).toHaveFocus();
    checkLabel();
  },
);

it.each(["readOnly", "disabled"] as const)("preserves inside-label permissions and switching to top (%s)", async (permission) => {
  const user = userEvent.setup(), changed = vi.fn(), opened = vi.fn();
  const show = (labelPosition: "top" | "inside") => <FormItem label="教学班" labelPosition={labelPosition} disabled={permission === "disabled"}>
    <Select multiple options={options} display="count" defaultValue={["a", "b"]} readOnly={permission === "readOnly"} onValueChange={changed} onOpenChange={opened} />
  </FormItem>;
  const { rerender } = render(show("inside"));
  await user.click(screen.getByText("教学班", { exact: true }));
  expect(trigger()).toHaveAttribute("aria-expanded", "false");
  expect(trigger()).toHaveTextContent("已选 2 项");
  expect(within(root()).queryByRole("button", { name: "清除教学班" })).not.toBeInTheDocument();
  expect(changed).not.toHaveBeenCalled();
  expect(opened).not.toHaveBeenCalled();
  if (permission === "disabled") expect(trigger()).toBeDisabled();
  else expect(trigger()).toHaveFocus();
  rerender(show("top"));
  expect(screen.getAllByText("教学班", { exact: true })).toHaveLength(1);
  expect(root().contains(screen.getByText("教学班", { exact: true }))).toBe(false);
  expect(trigger()).toHaveAccessibleName("教学班");
});
