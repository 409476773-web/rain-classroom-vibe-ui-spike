import { createRef, useState } from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";
import * as UI from "../index";

const options = [{ value: "a", label: "方案 A", description: "说明 A" }, { value: "b", label: "方案 B", description: "说明 B" }];
beforeEach(() => { expect(UI.CheckboxCard).toBeDefined(); expect(UI.RadioCard).toBeDefined(); });

it("keeps one real Checkbox, concise name/description, input ref and default reset", async () => {
  const ref = createRef<HTMLInputElement>(), change = vi.fn();
  render(<form aria-label="选择"><UI.CheckboxCard ref={ref} label="课程" description="秋季课程" name="course" value="physics" defaultChecked onCheckedChange={change}
    trailingVisual={<span>物</span>}><span>120 名学生</span></UI.CheckboxCard></form>);
  expect(ref.current).toBe(screen.getByRole("checkbox", { name: "课程" }));
  expect(ref.current).toHaveAccessibleDescription("秋季课程");
  expect(screen.getAllByRole("checkbox")).toHaveLength(1);
  await userEvent.click(screen.getByText("120 名学生"));
  expect(ref.current).not.toBeChecked(); expect(change.mock.calls).toEqual([[false]]);
  await act(async () => { (screen.getByRole("form") as HTMLFormElement).reset(); });
  expect(ref.current).toBeChecked(); expect(change).toHaveBeenCalledTimes(1);
});

it("uses CheckboxGroup as the sole set owner when composing cards, including form reset", async () => {
  const change = vi.fn();
  render(<form aria-label="选择"><UI.CheckboxGroup legend="课程" options={options} name="courses" defaultValue={["a"]} onValueChange={change}
    renderOption={(props) => <UI.CheckboxCard {...props} label={props.label!}><span>{props.value} 人</span></UI.CheckboxCard>} /></form>);
  await userEvent.click(screen.getByText("b 人")); await userEvent.click(screen.getByText("说明 A"));
  expect(change.mock.calls).toEqual([[["a", "b"]], [["b"]]]);
  expect(new FormData(screen.getByRole("form") as HTMLFormElement).getAll("courses")).toEqual(["b"]);
  await act(async () => { (screen.getByRole("form") as HTMLFormElement).reset(); });
  expect(screen.getByRole("checkbox", { name: "方案 A" })).toBeChecked(); expect(screen.getByRole("checkbox", { name: "方案 B" })).not.toBeChecked();
});

it("keeps RadioGroup single selection and default reset through the card renderer", async () => {
  const change = vi.fn();
  render(<form aria-label="选择"><UI.RadioGroup legend="方案" name="scheme" options={options} defaultValue="a" onValueChange={change}
    renderOption={(props) => <UI.RadioCard {...props} label={props.label!}><span>{props.value} 详情</span></UI.RadioCard>} /></form>);
  await userEvent.click(screen.getByText("b 详情")); await userEvent.click(screen.getByText("b 详情"));
  expect(change.mock.calls).toEqual([["b"]]);
  expect(screen.getByRole("radio", { name: "方案 A" })).not.toBeChecked(); expect(screen.getByRole("radio", { name: "方案 B" })).toBeChecked();
  expect(new FormData(screen.getByRole("form") as HTMLFormElement).getAll("scheme")).toEqual(["b"]);
  await act(async () => { (screen.getByRole("form") as HTMLFormElement).reset(); });
  expect(screen.getByRole("radio", { name: "方案 A" })).toBeChecked(); expect(change).toHaveBeenCalledTimes(1);
});

it("forwards controlled ownership without prop echoes or disabled changes", async () => {
  let update!: (value: string | null) => void;
  const change = vi.fn();
  function Owner() { const [value, setValue] = useState<string | null>(null); update = setValue; return <UI.RadioGroup legend="方案" options={options} value={value} onValueChange={change}
    renderOption={(props) => <UI.RadioCard {...props} label={props.label!} />} />; }
  render(<Owner />);
  await userEvent.click(screen.getByText("方案 A")); expect(change.mock.calls).toEqual([["a"]]);
  expect(screen.getByRole("radio", { name: "方案 A" })).not.toBeChecked();
  act(() => update("b")); expect(change).toHaveBeenCalledTimes(1); expect(screen.getByRole("radio", { name: "方案 B" })).toBeChecked();
});

it("keeps actions outside selection, available when selection is disabled and non-submitting", async () => {
  const select = vi.fn(), preview = vi.fn(), submit = vi.fn((event) => event.preventDefault());
  render(<form aria-label="选择" onSubmit={submit}><UI.RadioCardWithPreview name="scheme" value="a" label="实验量规" description="实验说明" supportingValue="总分 100 分"
    identityVisual={<span>量</span>} checked={false} disabled onCheckedChange={select} onPreview={preview} /></form>);
  const button = screen.getByRole("button", { name: "查看预览：实验量规" });
  expect(button.closest("label")).toBeNull(); expect(button).toHaveAttribute("type", "button");
  await userEvent.click(screen.getByText("实验说明")); await userEvent.click(button);
  expect(preview).toHaveBeenCalledTimes(1); expect(select).not.toHaveBeenCalled(); expect(submit).not.toHaveBeenCalled();
  expect(screen.getByRole("radio")).toBeDisabled(); expect(screen.getByRole("radio")).not.toBeChecked();
});

it("renders the four compositions without changing native selection or accessible names", () => {
  const radio = { name: "choices", value: "a", checked: false, onCheckedChange: vi.fn() };
  render(<><UI.RadioPreviewCard {...radio} label="模板" description="图文模板" imageSrc="/preview.png" layoutLabel="列表布局" audienceLabel="教师工作台" />
    <UI.CheckboxObjectCard label="物理" description="学期" supportingValue="120 名学生" status="进行中" identityVisual={<span>物</span>} />
    <UI.RadioComparisonCard {...radio} value="b" label="比较方案" description="两种方法" recommended details={[{ label: "适用", value: "实验报告" }, { label: "输出", value: "最终成绩" }]} />
    <UI.RadioCardWithPreview {...radio} value="c" label="预览方案" supportingValue="总分 100 分" identityVisual={<span>量</span>} onPreview={vi.fn()} /></>);
  expect(screen.getAllByRole("radio")).toHaveLength(3); expect(screen.getAllByRole("checkbox")).toHaveLength(1);
  expect(screen.getByRole("radio", { name: "比较方案" })).not.toBeChecked();
  expect(screen.getByText("推荐")).toBeInTheDocument();
  const list = screen.getByRole("list", { name: "方案属性" }); expect(within(list).getAllByRole("listitem").map((item) => item.textContent)).toEqual(["适用实验报告", "输出最终成绩"]);
  expect(document.querySelector('img')).toHaveAttribute("alt", "");
  expect(document.querySelectorAll("label button, label a, label label")).toHaveLength(0);
});

it("preserves native mixed semantics and requires a visible card label", () => {
  render(<UI.CheckboxCard label="部分内容" indeterminate defaultChecked={false} />);
  expect(screen.getByRole("checkbox", { name: "部分内容" })).toBePartiallyChecked();
  expect(() => render(<UI.CheckboxCard label=" " aria-label="隐藏名" />)).toThrow(/label/i);
});
