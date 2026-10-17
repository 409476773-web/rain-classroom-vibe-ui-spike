import { createRef } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoices, QuestionnaireError, QuestionnaireInput, QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress, QuestionnaireSkip, QuestionnaireSubmit, QuestionnaireTitle } from "./questionnaire";

const items = [{ name: "goal", required: true, choices: [{ value: "review" }, { value: "practice" }] }, { name: "topics", required: false, choices: [{ value: "concept" }, { value: "example" }] }] as const;
function Fixture({ onSubmit = () => {}, onStatusChange = () => {} }: { onSubmit?: (data: FormData) => void; onStatusChange?: (status: string) => void }) {
  return <Questionnaire items={items} shortcuts="letters" onSubmit={event => { event.preventDefault(); onSubmit(new FormData(event.currentTarget)); }}>
    <QuestionnaireProgress />
    <QuestionnaireItem name="goal" required><QuestionnaireTitle>学习目标</QuestionnaireTitle><QuestionnaireChoices>
      <QuestionnaireChoice value="review">复习</QuestionnaireChoice><QuestionnaireChoice value="practice">练习</QuestionnaireChoice>
      <QuestionnaireInput aria-label="其他目标" />
    </QuestionnaireChoices><QuestionnaireError /></QuestionnaireItem>
    <QuestionnaireItem name="topics" multiple onStatusChange={onStatusChange}><QuestionnaireTitle>希望补充的内容</QuestionnaireTitle><QuestionnaireChoices>
      <QuestionnaireChoice value="concept">概念</QuestionnaireChoice><QuestionnaireChoice value="example">例题</QuestionnaireChoice>
    </QuestionnaireChoices><QuestionnaireError /></QuestionnaireItem>
    <QuestionnaireActions><QuestionnairePrevious /><QuestionnaireSkip /><QuestionnaireNext /><QuestionnaireSubmit /></QuestionnaireActions>
  </Questionnaire>;
}

describe("Questionnaire engine through Rain Parts", () => {
  it("validates before moving, focuses an answer and localizes all progress text", async () => {
    render(<Fixture />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "下一题" }));
    expect(screen.getByRole("alert")).toHaveTextContent("请");
    expect(screen.getByRole("radio", { name: "复习" })).toHaveFocus();
    const progress = screen.getByRole("progressbar", { name: "问答进度" });
    expect(progress).toHaveTextContent("第 1 题，共 2 题");
    expect(progress).toHaveAttribute("aria-valuetext", "第 1 题，共 2 题");
    await user.click(screen.getByRole("radio", { name: "复习" }));
    await user.click(screen.getByRole("button", { name: "下一题" }));
    expect(screen.getByRole("group", { name: "希望补充的内容" })).toHaveFocus();
  });

  it("keeps one native control per choice, a freeform single answer and multi-value form data", async () => {
    const submit = vi.fn();
    render(<Fixture onSubmit={submit} />);
    const user = userEvent.setup();
    const goal = screen.getByRole("group", { name: "学习目标" });
    expect(within(goal).getAllByRole("radio")).toHaveLength(2);
    await user.click(screen.getByRole("radio", { name: "复习" }));
    await user.type(screen.getByRole("textbox", { name: "其他目标" }), "课堂准备");
    expect(screen.getByRole("radio", { name: "复习" })).not.toBeChecked();
    await user.click(screen.getByRole("button", { name: "下一题" }));
    await user.click(screen.getByRole("checkbox", { name: "概念" }));
    await user.click(screen.getByRole("checkbox", { name: "例题" }));
    await user.click(screen.getByRole("button", { name: "提交" }));
    expect(submit).toHaveBeenCalledTimes(1);
    expect((submit.mock.calls[0]![0] as FormData).get("goal")).toBe("课堂准备");
    expect((submit.mock.calls[0]![0] as FormData).getAll("topics")).toEqual(["concept", "example"]);
  });

  it("preserves answers when going back and records an intentional skip without form data", async () => {
    const submit = vi.fn(), status = vi.fn();
    render(<Fixture onSubmit={submit} onStatusChange={status} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("radio", { name: "练习" }));
    await user.click(screen.getByRole("button", { name: "下一题" }));
    await user.click(screen.getByRole("button", { name: "上一题" }));
    expect(screen.getByRole("radio", { name: "练习" })).toBeChecked();
    await user.click(screen.getByRole("button", { name: "下一题" }));
    await user.click(screen.getByRole("button", { name: "跳过" }));
    expect(status).toHaveBeenLastCalledWith("skipped");
    await user.click(screen.getByRole("button", { name: "提交" }));
    expect((submit.mock.calls[0]![0] as FormData).has("topics")).toBe(false);
  });

  it("selects by letter without advancing and leaves composition Enter to the text field", async () => {
    render(<Fixture />);
    const group = screen.getByRole("group", { name: "学习目标" });
    fireEvent.keyDown(group, { key: "b" });
    expect(screen.getByRole("radio", { name: "练习" })).toBeChecked();
    expect(screen.getByRole("progressbar")).toHaveTextContent("第 1 题");
    const input = screen.getByRole("textbox", { name: "其他目标" });
    await userEvent.setup().type(input, "中文");
    fireEvent.keyDown(input, { key: "Enter", keyCode: 229, isComposing: true });
    expect(screen.getByRole("progressbar")).toHaveTextContent("第 1 题");
  });

  it("keeps custom progress render, native attributes, text and refs through localization", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Questionnaire items={[{ name: "one" }]}><QuestionnaireProgress ref={ref} aria-valuetext="课程进度：开始" render={(props, state) => <div {...props} data-count={state.total} />}>
      自定义进度
    </QuestionnaireProgress><QuestionnaireItem name="one"><QuestionnaireTitle>自定义题</QuestionnaireTitle></QuestionnaireItem></Questionnaire>);
    expect(screen.getByRole("progressbar", { name: "问答进度" })).toBe(ref.current);
    expect(ref.current).toHaveAttribute("data-count", "1");
    expect(ref.current).toHaveAttribute("aria-valuetext", "课程进度：开始");
    expect(ref.current).toHaveTextContent("自定义进度");
  });

  it("keeps an aria-disabled navigation focusable and cancels click and keyboard navigation", async () => {
    const onClick = vi.fn();
    render(<Questionnaire items={[{ name: "goal", choices: [{ value: "review" }] }, { name: "topics" }]}><QuestionnaireProgress />
      <QuestionnaireItem name="goal"><QuestionnaireTitle>学习目标</QuestionnaireTitle><QuestionnaireChoice value="review" defaultChecked>复习</QuestionnaireChoice></QuestionnaireItem>
      <QuestionnaireItem name="topics"><QuestionnaireTitle>补充内容</QuestionnaireTitle><QuestionnaireInput aria-label="补充" /></QuestionnaireItem>
      <QuestionnaireNext aria-disabled onClick={onClick} />
    </Questionnaire>);
    const button = screen.getByRole("button", { name: "下一题" });
    const user = userEvent.setup();
    await user.click(button);
    expect(button).toHaveFocus();
    await user.keyboard("{Enter} ");
    expect(screen.getByRole("progressbar")).toHaveTextContent("第 1 题");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("cancels an aria-disabled native submit without losing answers or focus", async () => {
    const submit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());
    render(<Questionnaire items={[{ name: "goal", choices: [{ value: "review" }] }]} onSubmit={submit}>
      <QuestionnaireItem name="goal"><QuestionnaireTitle>学习目标</QuestionnaireTitle><QuestionnaireChoice value="review" defaultChecked>复习</QuestionnaireChoice></QuestionnaireItem>
      <QuestionnaireSubmit aria-disabled="true" />
    </Questionnaire>);
    const button = screen.getByRole("button", { name: "提交" });
    const user = userEvent.setup();
    await user.click(button);
    await user.keyboard("{Enter} ");
    expect(submit).not.toHaveBeenCalled();
    expect(button).toHaveFocus();
    expect(screen.getByRole("radio", { name: "复习" })).toBeChecked();
  });
});
