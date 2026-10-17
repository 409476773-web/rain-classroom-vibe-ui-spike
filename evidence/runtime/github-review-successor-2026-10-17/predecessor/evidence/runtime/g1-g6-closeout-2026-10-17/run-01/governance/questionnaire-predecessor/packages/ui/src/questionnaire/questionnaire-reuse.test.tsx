import * as React from "react";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Questionnaire as Primitive } from "@shadcn/react/questionnaire";
import { describe, expect, it, vi } from "vitest";
import { FormItem } from "../input/form-item";
import { Questionnaire, QuestionnaireChoice, QuestionnaireInput, QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireSkip, QuestionnaireSubmit, QuestionnaireTitle, type QuestionnaireRecipe } from "./questionnaire";

const parts = { Root: Questionnaire, Item: QuestionnaireItem, Title: QuestionnaireTitle, Input: QuestionnaireInput, Next: QuestionnaireNext, Previous: QuestionnairePrevious, Skip: QuestionnaireSkip, Submit: QuestionnaireSubmit };
function Comparison({ raw, defaultValue, cancelReset = false, controlled = false }: { raw: boolean; defaultValue?: string; cancelReset?: boolean; controlled?: boolean }) {
  const P = raw ? Primitive : parts;
  const [value, setValue] = React.useState(defaultValue ?? "");
  return <P.Root aria-label="对照问答" items={[{ name: "goal", choices: [{ value: "a" }, { value: "b", disabled: true }] }, { name: "last" }]} shortcuts="letters" onSubmit={e => e.preventDefault()} onReset={e => { if (cancelReset) e.preventDefault(); else if (controlled) setValue(defaultValue ?? ""); }}>
    <P.Item name="goal"><P.Title>目标</P.Title>
      {raw ? <><Primitive.Choice value="a"><Primitive.ChoiceInput /><Primitive.ChoiceLabel>选项 A</Primitive.ChoiceLabel></Primitive.Choice><Primitive.Choice value="b" disabled><Primitive.ChoiceInput /><Primitive.ChoiceLabel>禁用 B</Primitive.ChoiceLabel></Primitive.Choice></> : <><QuestionnaireChoice value="a">选项 A</QuestionnaireChoice><QuestionnaireChoice value="b" disabled>禁用 B</QuestionnaireChoice></>}
      <P.Input aria-label="自由答案" size={20} maxLength={120} {...(controlled ? { value, onChange: e => setValue(e.currentTarget.value) } : { defaultValue })} />
    </P.Item>
    <P.Item name="last"><P.Title>末题</P.Title><P.Input aria-label="末题答案" /></P.Item>
    <P.Previous>返回</P.Previous><P.Next>前进</P.Next><P.Skip>跳过</P.Skip><P.Submit>提交</P.Submit><button type="reset">重置</button>
  </P.Root>;
}
function facts() {
  const form = screen.getByRole("form", { name: "对照问答" }) as HTMLFormElement;
  const text = screen.getByLabelText("自由答案") as HTMLInputElement;
  const choice = screen.getByRole("radio", { name: "选项 A" }) as HTMLInputElement;
  return { value: text.value, selected: choice.checked, name: text.getAttribute("name"), form: text.getAttribute("form"), data: Array.from(new FormData(form).entries()), status: choice.closest("fieldset")!.getAttribute("data-status"), focused: document.activeElement === text ? "text" : document.activeElement === choice ? "choice" : document.activeElement?.tagName };
}

describe("Questionnaire shared control compatibility", () => {
  for (const mode of ["current", "old-text", "default-old-text", "skip", "cancel", "controlled"] as const) {
    it(`matches the original engine through ${mode} native reset`, async () => {
      async function exercise(raw: boolean) {
        render(<Comparison raw={raw} defaultValue={mode === "default-old-text" || mode === "controlled" ? "默认" : undefined} cancelReset={mode === "cancel"} controlled={mode === "controlled"} />);
        const user = userEvent.setup();
        await user.type(screen.getByLabelText("自由答案"), "新文本");
        if (mode === "old-text" || mode === "default-old-text") await user.click(screen.getByRole("radio", { name: "选项 A" }));
        if (mode === "skip") { await user.click(screen.getByRole("button", { name: "跳过" })); await user.click(screen.getByRole("button", { name: "返回" })); }
        const before = facts();
        await user.click(screen.getByRole("button", { name: "重置" }));
        const after = facts();
        cleanup();
        return { before, after };
      }
      expect(await exercise(false)).toEqual(await exercise(true));
    });
  }

  it("keeps one label/input, refs, rich children and the existing choice render contract", async () => {
    const ref = React.createRef<HTMLLabelElement>(), change = vi.fn();
    render(<Questionnaire items={[{ name: "one", choices: [{ value: "a" }] }]}><QuestionnaireItem name="one"><QuestionnaireTitle>题目</QuestionnaireTitle>
      <QuestionnaireChoice ref={ref} value="a" className="caller-choice" style={{ order: 2 }} onChange={change} render={(props, state) => <label {...props} data-custom-checked={String(state.checked)} />}><strong>富内容</strong><span>补充</span></QuestionnaireChoice>
    </QuestionnaireItem></Questionnaire>);
    const input = screen.getByRole("radio", { name: "富内容补充" });
    expect(input.parentElement).toBe(ref.current);
    expect(ref.current).toHaveClass("caller-choice", "rain-selection-card");
    expect(ref.current).toHaveStyle({ order: 2 });
    expect(ref.current!.querySelector("label")).toBeNull();
    expect(ref.current!.querySelectorAll("input")).toHaveLength(1);
    await userEvent.setup().click(input);
    expect(change).toHaveBeenCalledTimes(1);
    expect(ref.current).toHaveAttribute("data-custom-checked", "true");
  });

  it("uses the shared card surface for default choices while retaining the engine's label root", () => {
    render(<Comparison raw={false} />);
    const choice = screen.getByRole("radio", { name: "选项 A" });
    expect(choice.parentElement!.tagName).toBe("LABEL");
    expect(choice.parentElement).toHaveClass("rain-selection-card", "rain-selection-card__selection", "rain-radio");
    expect(choice.nextElementSibling).toHaveAttribute("data-slot", "canvas");
    expect(screen.getByRole("radio", { name: "禁用 B" })).toBeDisabled();
  });

  it("keeps the engine's presence-based disabled attributes on enabled and disabled labels", () => {
    for (const raw of [true, false]) {
      render(<Comparison raw={raw} />);
      expect(screen.getByRole("radio", { name: "选项 A" }).parentElement).not.toHaveAttribute("data-disabled");
      expect(screen.getByRole("radio", { name: "禁用 B" }).parentElement).toHaveAttribute("data-disabled", "");
      cleanup();
    }
  });

  it("isolates the added wrapper recipe and keeps input classes, styles, ref and native constraints on input", () => {
    const ref = React.createRef<HTMLInputElement>();
    const recipe: QuestionnaireRecipe = { id: "reuse-field", scope: "feature", origin: "ui-questionnaire", classes: { "input-wrapper": "wrapper-local", input: "input-local" }, modifiedParts: ["input-wrapper", "input"], candidateTokens: [], promotionStatus: "not-proposed" };
    render(<Questionnaire items={[{ name: "one" }]} localRecipe={recipe}><QuestionnaireItem name="one"><QuestionnaireTitle>题目</QuestionnaireTitle>
      <QuestionnaireInput ref={ref} aria-label="局改" size={20} maxLength={120} minLength={2} pattern=".{2,}" className="caller-input" style={{ letterSpacing: "1px" }} />
      <QuestionnaireInput aria-label="兄弟" localRecipe={{ ...recipe, id: "sibling", classes: {}, modifiedParts: [] }} />
    </QuestionnaireItem></Questionnaire>);
    const input = screen.getByRole("textbox", { name: "局改" });
    expect(input).toBe(ref.current);
    expect(input).toHaveAttribute("data-slot", "input");
    expect(input).toHaveClass("rain-input__control", "input-local", "caller-input");
    expect(input).toHaveStyle({ letterSpacing: "1px" });
    expect(input).toHaveAttribute("size", "20");
    expect(input).toHaveAttribute("maxlength", "120");
    expect(input).toHaveAttribute("minlength", "2");
    expect(input).toHaveAttribute("pattern", ".{2,}");
    expect(input.parentElement).toHaveClass("rain-field-frame", "wrapper-local");
    expect(input.parentElement).not.toHaveClass("caller-input", "input-local");
    expect(screen.getByLabelText("兄弟").parentElement).not.toHaveClass("wrapper-local");
  });

  it("maps engine invalid/disabled/readOnly to frame appearance", async () => {
    const { rerender } = render(<Questionnaire items={[{ name: "one", required: true }]}><QuestionnaireItem name="one" required><QuestionnaireTitle>必填</QuestionnaireTitle><QuestionnaireInput aria-label="答案" /></QuestionnaireItem><QuestionnaireSubmit /></Questionnaire>);
    await userEvent.setup().click(screen.getByRole("button", { name: "提交" }));
    expect(screen.getByLabelText("答案").parentElement).toHaveAttribute("data-status", "error");
    for (const permission of ["disabled", "readonly"] as const) {
      rerender(<Questionnaire items={[{ name: "one" }]}><QuestionnaireItem name="one"><QuestionnaireTitle>状态</QuestionnaireTitle><QuestionnaireInput aria-label="答案" disabled={permission === "disabled"} readOnly={permission === "readonly"} /></QuestionnaireItem></Questionnaire>);
      expect(screen.getByLabelText("答案").parentElement).toHaveAttribute("data-permission", permission);
    }
  });

  it("keeps outer FormItem permissions and errors out of the questionnaire's input", () => {
    render(<FormItem label="外围字段" required disabled status="error"><Questionnaire items={[{ name: "one" }]}><QuestionnaireItem name="one"><QuestionnaireTitle>题目</QuestionnaireTitle><QuestionnaireInput aria-label="问答答案" /></QuestionnaireItem></Questionnaire></FormItem>);
    const input = screen.getByLabelText("问答答案");
    expect(input).not.toBeDisabled();
    expect(input).not.toBeRequired();
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input.parentElement).toHaveAttribute("data-permission", "editable");
    expect(input.parentElement).toHaveAttribute("data-status", "default");
  });

  it("matches the engine's ReactElement render: undefined keeps native attributes and cancellation stops caller callbacks", async () => {
    async function exercise(raw: boolean) {
      const P = raw ? Primitive : parts;
      const change = vi.fn();
      const ref = React.createRef<HTMLInputElement>(), renderRef = React.createRef<HTMLInputElement>();
      function Controlled() {
        const [value, setValue] = React.useState("默认");
        return <P.Root aria-label="渲染对照" items={[{ name: "one" }]}><P.Item name="one"><P.Title>题目</P.Title>
          <P.Input aria-label="渲染答案" value={value} ref={ref} style={{ letterSpacing: "1px" }} onChange={e => { change(); setValue(e.currentTarget.value); }} render={<input ref={renderRef} name={undefined} style={{ textIndent: "2px" }} onChange={e => e.preventDefault()} />} />
        </P.Item></P.Root>;
      }
      render(<Controlled />);
      const input = screen.getByLabelText("渲染答案") as HTMLInputElement;
      expect(ref.current).toBe(input);
      expect(renderRef.current).toBe(input);
      expect(input).toHaveStyle({ letterSpacing: "1px", textIndent: "2px" });
      const before = { name: input.getAttribute("name"), data: Array.from(new FormData(screen.getByRole("form", { name: "渲染对照" }) as HTMLFormElement).entries()) };
      await userEvent.setup().type(input, "追加");
      expect(input).toHaveValue("默认");
      const after = { callerCount: change.mock.calls.length, name: input.getAttribute("name"), data: Array.from(new FormData(screen.getByRole("form", { name: "渲染对照" }) as HTMLFormElement).entries()) };
      cleanup();
      return { before, after };
    }
    expect(await exercise(false)).toEqual(await exercise(true));
  });

  it("matches the engine's ReactElement label event cancellation and preserves both label refs", async () => {
    async function exercise(raw: boolean) {
      const P = raw ? Primitive : parts;
      const click = vi.fn(), ref = React.createRef<HTMLLabelElement>(), renderRef = React.createRef<HTMLLabelElement>();
      const choiceProps = { value: "a", ref, onClick: click, render: <label ref={renderRef} title={undefined} onClick={(e: React.MouseEvent) => e.preventDefault()} />, title: "保留" };
      render(<P.Root items={[{ name: "one", choices: [{ value: "a" }] }]}><P.Item name="one"><P.Title>题目</P.Title>
        {raw ? <Primitive.Choice {...choiceProps}><Primitive.ChoiceInput /><Primitive.ChoiceLabel>答案</Primitive.ChoiceLabel></Primitive.Choice> : <QuestionnaireChoice {...choiceProps}>答案</QuestionnaireChoice>}
      </P.Item></P.Root>);
      await userEvent.setup().click(screen.getByRole("radio", { name: "答案" }));
      const result = { count: click.mock.calls.length, title: ref.current!.title, sameRef: ref.current === renderRef.current };
      cleanup();
      return result;
    }
    expect(await exercise(false)).toEqual(await exercise(true));
  });

  it.each(["date", "datetime-local", "email", "month", "number", "password", "search", "tel", "text", "time", "url", "week"] as const)("preserves native %s and the input render state", type => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Questionnaire items={[{ name: "one" }]}><QuestionnaireItem name="one"><QuestionnaireTitle>类型</QuestionnaireTitle><QuestionnaireInput aria-label="原生" ref={ref} type={type} min="1" max="12" step="2" render={(props, state) => <input {...props} data-render-disabled={String(state.disabled)} />} /></QuestionnaireItem></Questionnaire>);
    expect(ref.current).toHaveAttribute("type", type);
    expect(ref.current).toHaveAttribute("min", "1");
    expect(ref.current).toHaveAttribute("max", "12");
    expect(ref.current).toHaveAttribute("step", "2");
    expect(ref.current).toHaveAttribute("data-render-disabled", "false");
    expect(ref.current!.parentElement!.querySelectorAll("input")).toHaveLength(1);
  });

  it("reselects a skipped choice without advancing and leaves IME Enter to the input", async () => {
    render(<Comparison raw={false} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("radio", { name: "选项 A" }));
    await user.click(screen.getByRole("button", { name: "跳过" }));
    await user.click(screen.getByRole("button", { name: "返回" }));
    expect(facts().data).toEqual([]);
    await user.click(screen.getByRole("radio", { name: "选项 A" }));
    expect(facts().data).toEqual([["goal", "a"]]);
    expect(screen.getByRole("group", { name: "目标" })).toBeVisible();
    fireEvent.keyDown(screen.getByLabelText("自由答案"), { key: "Enter", isComposing: true, keyCode: 229 });
    expect(screen.getByRole("group", { name: "目标" })).toBeVisible();
    expect(within(screen.getByRole("group", { name: "目标" })).getAllByRole("radio")).toHaveLength(2);
  });
});
