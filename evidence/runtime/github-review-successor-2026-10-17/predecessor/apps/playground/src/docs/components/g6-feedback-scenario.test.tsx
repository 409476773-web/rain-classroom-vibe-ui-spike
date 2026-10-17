import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FeedbackScenario } from "./g6-feedback-scenario";
const form = () => screen.getByRole("form", { name: "课堂反馈" });
const userAction = (name: string) => within(form()).getByRole("button", { name });
type User = ReturnType<typeof userEvent.setup>;

async function reachNote(user: User) {
  await user.click(within(form()).getByRole("radio", { name: /希望多看示例/ }));
  await user.click(userAction("下一题"));
  await user.click(within(form()).getByRole("checkbox", { name: "观察记录" }));
  await user.click(userAction("下一题"));
}

async function showDemoControls(user: User) {
  const summary = screen.getByText("演示控制");
  if (!summary.closest("details")?.open) await user.click(summary);
}

describe("G6 feedback task flow", () => {
  it("keeps plain Enter inside the multiline answer and retains the engine submit shortcut", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await reachNote(user);
    const note = within(form()).getByRole("textbox", { name: "给老师的补充" });
    await user.type(note, "希望增加课堂示例");
    await user.keyboard("{Enter}");
    expect(screen.queryByRole("region", { name: "反馈摘要" })).not.toBeInTheDocument();
    expect(note).toHaveValue("希望增加课堂示例\n");
    await user.type(note, "也想学习证据判断");
    await user.keyboard("{Shift>}{Enter}{/Shift}");
    expect(note).toHaveValue("希望增加课堂示例\n也想学习证据判断\n");
    await user.type(note, "谢谢老师");
    await user.keyboard("{Control>}{Enter}{/Control}");
    const result = await screen.findByRole("region", { name: "反馈摘要" });
    expect(result).toHaveTextContent("希望增加课堂示例");
    expect(result).toHaveTextContent("也想学习证据判断");
    expect(result).toHaveTextContent("谢谢老师");
  });

  it("keeps multiline edits through navigation and draft restore in one native FormData field", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await reachNote(user);
    await user.click(within(form()).getByRole("textbox", { name: "给老师的补充" }));
    await user.paste("第一段反馈\n第二段反馈");
    expect(within(form()).getByRole("textbox", { name: "给老师的补充" })).toHaveValue("第一段反馈\n第二段反馈");
    await user.click(userAction("上一题"));
    await user.click(userAction("下一题"));
    expect(within(form()).getByRole("textbox", { name: "给老师的补充" })).toHaveValue("第一段反馈\n第二段反馈");
    await user.click(screen.getByRole("button", { name: "保存本页草稿" }));
    const draftNotice = screen.getByRole("status");
    expect(draftNotice).toHaveTextContent("草稿已保存在本页");
    expect(form()).not.toContainElement(draftNotice);
    await user.clear(within(form()).getByRole("textbox", { name: "给老师的补充" }));
    await user.type(within(form()).getByRole("textbox", { name: "给老师的补充" }), "临时修改");
    await user.click(screen.getByRole("button", { name: "恢复草稿" }));
    const restored = within(form()).getByRole("textbox", { name: "给老师的补充" });
    expect(restored).toHaveValue("第一段反馈\n第二段反馈");
    await user.clear(restored);
    await user.type(restored, "第一段反馈{Enter}调整后的第二段");
    expect(new FormData(form() as HTMLFormElement).getAll("note")).toEqual(["第一段反馈\n调整后的第二段"]);
    expect(form().querySelectorAll('[name="note"]')).toHaveLength(1);
    await user.click(userAction("提交反馈"));
    const result = await screen.findByRole("region", { name: "反馈摘要" });
    expect(within(result).getByText("给老师的补充").nextElementSibling?.textContent).toBe("第一段反馈\n调整后的第二段");
  });

  it("enforces the 120-character limit including line breaks", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await reachNote(user);
    const note = within(form()).getByRole("textbox", { name: "给老师的补充" });
    await user.type(note, `${"测".repeat(59)}{Enter}${"试".repeat(61)}`);
    const expected = `${"测".repeat(59)}\n${"试".repeat(60)}`;
    expect(note).toHaveValue(expected);
    expect(new FormData(form() as HTMLFormElement).get("note")).toBe(expected);
    await user.click(userAction("提交反馈"));
    const result = await screen.findByRole("region", { name: "反馈摘要" });
    expect(within(result).getByText("给老师的补充").nextElementSibling?.textContent).toBe(expected);
  });

  it("offers only the native final action for an empty or filled optional answer", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await reachNote(user);
    expect(within(form()).queryByRole("button", { name: "提交反馈" })).not.toBeInTheDocument();
    expect(userAction("跳过并提交")).toBeInTheDocument();
    const note = within(form()).getByRole("textbox", { name: "给老师的补充" });
    await user.type(note, "希望继续练习");
    expect(within(form()).queryByRole("button", { name: "跳过并提交" })).not.toBeInTheDocument();
    expect(userAction("提交反馈")).toBeInTheDocument();
    await user.clear(note);
    expect(userAction("跳过并提交")).toBeInTheDocument();
  });

  it("replaces the editable form with a completed summary and moves focus there", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await reachNote(user);
    await user.type(within(form()).getByRole("textbox", { name: "给老师的补充" }), "希望继续练习");
    await user.click(userAction("提交反馈"));
    const result = await screen.findByRole("region", { name: "反馈摘要" });
    expect(result).toHaveTextContent("希望多看示例");
    expect(result).toHaveTextContent("观察记录");
    expect(result).toHaveTextContent("希望继续练习");
    expect(screen.queryByRole("form", { name: "课堂反馈" })).not.toBeInTheDocument();
    expect(within(result).getByRole("heading", { name: "反馈已提交" })).toHaveFocus();
    expect(screen.queryByRole("button", { name: "修改反馈" })).not.toBeInTheDocument();
  });

  it("preserves a dormant conditional answer in a draft but omits it from the current payload", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await user.click(within(form()).getByRole("radio", { name: /其他目标/ }));
    await user.click(userAction("下一题"));
    await user.type(within(form()).getByRole("textbox", { name: "具体学习目标" }), "希望学习课堂观察");
    await user.click(userAction("上一题"));
    await user.click(within(form()).getByRole("radio", { name: /希望多看示例/ }));
    expect(new FormData(form() as HTMLFormElement).has("detail")).toBe(false);
    await user.click(screen.getByRole("button", { name: "保存本页草稿" }));
    await showDemoControls(user);
    await user.click(screen.getByRole("button", { name: "重新填写" }));
    await user.click(screen.getByRole("button", { name: "恢复草稿" }));
    await user.click(within(form()).getByRole("radio", { name: /其他目标/ }));
    await user.click(userAction("下一题"));
    expect(within(form()).getByRole("textbox", { name: "具体学习目标" })).toHaveValue("希望学习课堂观察");
    await user.click(userAction("上一题"));
    await user.click(within(form()).getByRole("radio", { name: /希望多看示例/ }));
    await user.click(userAction("下一题"));
    await user.click(within(form()).getByRole("checkbox", { name: "证据判断" }));
    await user.click(userAction("下一题"));
    expect(new FormData(form() as HTMLFormElement).has("detail")).toBe(false);
    await user.click(userAction("跳过并提交"));
    const result = await screen.findByRole("region", { name: "反馈摘要" });
    expect(result).not.toHaveTextContent("希望学习课堂观察");
    expect(result).toHaveTextContent("证据判断");
    expect(result).toHaveTextContent("未填写");
  });

  it("restores the current step and multiple answers without making a short conditional answer valid", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await user.click(within(form()).getByRole("radio", { name: /其他目标/ }));
    await user.click(userAction("下一题"));
    await user.type(within(form()).getByRole("textbox", { name: "具体学习目标" }), "一");
    await user.click(screen.getByRole("button", { name: "保存本页草稿" }));
    await user.click(screen.getByRole("button", { name: "恢复草稿" }));
    expect(within(form()).getByRole("textbox", { name: "具体学习目标" })).toHaveValue("一");
    await user.click(userAction("下一题"));
    expect(within(form()).getByRole("alert")).toHaveTextContent("请至少填写 4 个字");
    expect(within(form()).getByRole("textbox", { name: "具体学习目标" })).toHaveFocus();
    await user.type(within(form()).getByRole("textbox", { name: "具体学习目标" }), "起学习吧");
    await user.click(userAction("下一题"));
    await user.click(within(form()).getByRole("checkbox", { name: "观察记录" }));
    await user.click(within(form()).getByRole("checkbox", { name: "证据判断" }));
    await user.click(screen.getByRole("button", { name: "保存本页草稿" }));
    await showDemoControls(user);
    await user.click(screen.getByRole("button", { name: "重新填写" }));
    await user.click(screen.getByRole("button", { name: "恢复草稿" }));
    expect(within(form()).getByRole("checkbox", { name: "观察记录" })).toBeChecked();
    expect(within(form()).getByRole("checkbox", { name: "证据判断" })).toBeChecked();
  });

  it("keeps one submission failure beside the submit action and retains the answer for retry", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await reachNote(user);
    await user.type(within(form()).getByRole("textbox", { name: "给老师的补充" }), "请保留这句反馈");
    await showDemoControls(user);
    await user.click(screen.getByRole("button", { name: "模拟提交失败：关" }));
    await user.click(userAction("提交反馈"));
    const failure = await screen.findByRole("alert");
    expect(failure).toHaveTextContent("回答已保留");
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(userAction("提交反馈").closest('[data-slot="actions"]')).toContainElement(failure);
    expect(screen.queryByRole("region", { name: "反馈摘要" })).not.toBeInTheDocument();
    expect(within(form()).getByRole("textbox", { name: "给老师的补充" })).toHaveValue("请保留这句反馈");
    await user.click(screen.getByRole("button", { name: "模拟提交失败：开" }));
    await user.click(userAction("提交反馈"));
    expect(await screen.findByRole("region", { name: "反馈摘要" })).toHaveTextContent("请保留这句反馈");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("clears the old submission failure when revisiting a question so validation has one alert", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await reachNote(user);
    await showDemoControls(user);
    await user.click(screen.getByRole("button", { name: "模拟提交失败：关" }));
    await user.click(userAction("跳过并提交"));
    expect(await screen.findByRole("alert")).toHaveTextContent("回答已保留");
    await user.click(userAction("上一题"));
    await user.click(within(form()).getByRole("checkbox", { name: "观察记录" }));
    await user.click(userAction("下一题"));
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(screen.getByRole("alert")).toHaveTextContent("请至少选择一项练习内容");
    expect(screen.queryByText(/提交失败，回答已保留/)).not.toBeInTheDocument();
  });

  it("still validates all enabled questions when the final skip submits", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await user.click(within(form()).getByRole("radio", { name: /其他目标/ }));
    await user.click(userAction("下一题"));
    await user.type(within(form()).getByRole("textbox", { name: "具体学习目标" }), "课堂学习");
    await user.click(userAction("下一题"));
    await user.click(within(form()).getByRole("checkbox", { name: "观察记录" }));
    await user.click(userAction("下一题"));
    const detail = form().querySelector<HTMLInputElement>('input[aria-label="具体学习目标"]')!;
    fireEvent.change(detail, { target: { value: "一" } });
    await user.click(userAction("跳过并提交"));
    await waitFor(() => expect(within(form()).getByRole("textbox", { name: "具体学习目标" })).toHaveFocus());
    expect(within(form()).getByRole("alert")).toHaveTextContent("请至少填写 4 个字");
    expect(screen.queryByRole("region", { name: "反馈摘要" })).not.toBeInTheDocument();
  });

  it("restores a failed final skip as an explicit choice without losing earlier answers", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await reachNote(user);
    await showDemoControls(user);
    await user.click(screen.getByRole("button", { name: "模拟提交失败：关" }));
    await user.click(userAction("跳过并提交"));
    expect(await screen.findByRole("alert")).toHaveTextContent("回答已保留");
    await user.click(screen.getByRole("button", { name: "保存本页草稿" }));
    await user.click(screen.getByRole("button", { name: "重新填写" }));
    await user.click(screen.getByRole("button", { name: "恢复草稿" }));
    expect(within(form()).getByRole("progressbar")).toHaveTextContent("第 3 题 · 当前共 3 题");
    expect(screen.getByText("上次未填写，请确认填写或跳过后提交。")).toBeInTheDocument();
    await user.type(within(form()).getByRole("textbox", { name: "给老师的补充" }), "这次补充一句话");
    await user.click(screen.getByRole("button", { name: "模拟提交失败：开" }));
    await user.click(userAction("提交反馈"));
    const result = await screen.findByRole("region", { name: "反馈摘要" });
    expect(result).toHaveTextContent("希望多看示例");
    expect(result).toHaveTextContent("观察记录");
    expect(result).toHaveTextContent("这次补充一句话");
  });

  it("reports real conditional question counts while retaining native selection and focus", async () => {
    const user = userEvent.setup();
    render(<FeedbackScenario />);
    await user.click(userAction("下一题"));
    expect(within(form()).getByRole("alert")).toHaveTextContent("请选择学习目标");
    const first = within(form()).getByRole("radio", { name: /希望多看示例/ });
    expect(first).toHaveFocus();
    await user.keyboard("c");
    expect(within(form()).getByRole("radio", { name: /其他目标/ })).toBeChecked();
    const progress = within(form()).getByRole("progressbar");
    expect(progress).toHaveTextContent("第 1 题 · 当前共 4 题");
    expect(progress).toHaveAttribute("aria-valuemax", "4");
    expect(progress).toHaveAttribute("aria-valuetext", "第 1 题 · 当前共 4 题");
    await user.click(userAction("下一题"));
    expect(within(form()).getByRole("group", { name: "请补充你的学习目标" })).toHaveFocus();
  });
});
