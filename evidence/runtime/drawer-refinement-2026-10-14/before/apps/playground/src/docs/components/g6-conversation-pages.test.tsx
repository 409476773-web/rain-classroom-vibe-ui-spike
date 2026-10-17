import { act, fireEvent, render, screen, within, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, it, expect, vi } from "vitest";
afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); });
import { G6ConversationPage } from "./g6-conversation-pages";

describe("G6 document trial integration", () => {
  it("ends the feedback task at its submitted summary instead of leaving an editable old form", async () => {
    const user = userEvent.setup();
    render(<G6ConversationPage component="questionnaire" />);
    const form = screen.getByRole("form", { name: "课堂反馈" });
    await user.click(within(form).getByRole("radio", { name: /希望多看示例/ }));
    await user.click(within(form).getByRole("button", { name: "下一题" }));
    await user.click(within(form).getByRole("checkbox", { name: "观察记录" }));
    await user.click(within(form).getByRole("button", { name: "下一题" }));
    await user.type(within(form).getByRole("textbox", { name: "给老师的补充" }), "继续练习事实记录");
    await user.click(within(form).getByRole("button", { name: "提交反馈" }));
    expect(screen.getByRole("region", { name: "反馈摘要" })).toHaveTextContent("继续练习事实记录");
    expect(screen.queryByRole("form", { name: "课堂反馈" })).not.toBeInTheDocument();
  });
});

describe("G6 conversation host interactions", () => {
  it("uses a keyboard-operable whole bubble and expands the real long answer", async () => {
    render(<G6ConversationPage component="bubble" />);
    const user = userEvent.setup();
    const bubble = screen.getByRole("button", { name: "采用记录提示" });
    bubble.focus();
    await user.keyboard(" ");
    expect(bubble).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("记录提示已采用。")).toBeInTheDocument();
    const expand = screen.getByRole("button", { name: "展开完整辅导回答" });
    await user.click(expand);
    expect(expand).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/观察片段：三位同学举手之后/)).toBeInTheDocument();
  });

  it("uses a real Marker button to finish the local processing state", async () => {
    render(<G6ConversationPage component="marker" />);
    const button = screen.getByRole("button", { name: "完成本地整理" });
    expect(button).toHaveClass("rain-marker");
    await userEvent.setup().click(button);
    expect(screen.getByText("课程资料整理完成。")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "重新开始整理" })).toBeInTheDocument();
  });

  it("loads the last-anchor sample, handles all four aligns and reports a missing id", async () => {
    render(<G6ConversationPage component="message-scroller" />);
    const user = userEvent.setup();
    const section = screen.getByRole("heading", { name: "空会话与定位 API" }).closest("section")!;
    expect(within(section).getByText("暂无消息，请载入示例存档。")).toBeInTheDocument();
    expect(within(section).getByRole("button", { name: "第 3 条：start" })).toBeDisabled();
    await user.click(within(section).getByRole("button", { name: "载入锚点存档" }));
    await user.click(within(section).getByRole("button", { name: "定位不存在的消息" }));
    expect(within(section).getByText("未找到该消息；已挂载列表返回 false。")).toBeInTheDocument();
    for (const align of ["start", "center", "end", "nearest"]) {
      await user.click(within(section).getByRole("button", { name: `第 3 条：${align}` }));
      expect(within(section).getByText(`定位请求已接受：${align}。`)).toBeInTheDocument();
    }
  });

  it("keeps the questionnaire local recipe and chosen answer within that specimen", async () => {
    render(<G6ConversationPage component="questionnaire" />);
    const user = userEvent.setup();
    const local = screen.getByRole("form", { name: "局改偏好样板" });
    const sibling = screen.getByRole("form", { name: "未改兄弟偏好样板" });
    expect(local).toHaveAttribute("data-local-recipe", "g6-feedback-focus");
    expect(sibling).not.toHaveAttribute("data-local-recipe");
    await user.click(within(local).getByRole("radio", { name: "简短回答" }));
    await user.click(within(local).getByRole("button", { name: "应用偏好" }));
    expect(screen.getByText("局改偏好样板已应用：简短回答。")).toBeInTheDocument();
    expect(within(sibling).getByRole("radio", { name: "简短回答" })).not.toBeChecked();
  });
  it("copies the actual assistant answer and reports clipboard failure", async () => {
    const user=userEvent.setup(); const writeText=vi.fn().mockResolvedValue(undefined); Object.defineProperty(navigator,"clipboard",{ configurable:true,value:{writeText} });
    render(<G6ConversationPage component="message"/>);
    await user.click(screen.getByRole("button",{name:"复制辅导回答"}));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("先写下你直接看到的事实"));
    expect(screen.getByText("已复制辅导回答。" )).toBeInTheDocument();
    writeText.mockRejectedValueOnce(new Error("denied")); await user.click(screen.getByRole("button",{name:"复制辅导回答"}));
    expect(screen.getByText("复制未完成，请选择正文复制。")).toBeInTheDocument();
  });
  it("toggles a reaction with its real pressed state", async () => {
    render(<G6ConversationPage component="bubble"/>);
    const button=screen.getByRole("button",{name:/有帮助/});
    await userEvent.setup().click(button);
    expect(button).toHaveAttribute("aria-pressed","true");
    await userEvent.setup().click(button);expect(button).toHaveAttribute("aria-pressed","false");
  });
  it("validates answers, goes back without losing them and submits native FormData", async () => {
    render(<G6ConversationPage component="questionnaire"/>); const user=userEvent.setup();
    const form=screen.getByRole("form",{name:"课堂反馈"});
    await user.click(within(form).getByRole("button",{name:"下一题"}));
    expect(within(form).getByRole("alert")).toBeInTheDocument();
    await user.click(within(form).getByRole("radio",{name:/希望多看示例/}));
    await user.click(within(form).getByRole("button",{name:"下一题"}));
    await user.click(within(form).getByRole("checkbox",{name:/观察记录/}));
    await user.click(within(form).getByRole("button",{name:"上一题"}));
    expect(within(form).getByRole("radio",{name:/希望多看示例/})).toBeChecked();
    await user.click(within(form).getByRole("button",{name:"下一题"}));
    await user.click(within(form).getByRole("button",{name:"下一题"}));
    await user.type(within(form).getByRole("textbox",{name:"给老师的补充"}),"希望继续练习");
    await user.click(within(form).getByRole("button",{name:"提交反馈"}));
    await waitFor(()=>expect(screen.getByRole("region",{name:"反馈摘要"})).toHaveTextContent("希望多看示例"));
    expect(screen.getByRole("region",{name:"反馈摘要"})).toHaveTextContent("观察记录");
  });
});

describe("G6 conversation lifecycle regressions", () => {


  it("restores explicit answers and controlled step from the saved native form", async () => {
    const user=userEvent.setup();
    render(<G6ConversationPage component="questionnaire" />);
    const form=screen.getByRole("form",{name:"课堂反馈"});
    await user.click(within(form).getByRole("radio",{name:/希望多看示例/}));
    await user.click(within(form).getByRole("button",{name:"下一题"}));
    await user.click(within(form).getByRole("checkbox",{name:"观察记录"}));
    await user.click(within(form).getByRole("checkbox",{name:"证据判断"}));
    await user.click(screen.getByRole("button",{name:"保存本页草稿"}));
    await user.click(screen.getByRole("button",{name:"重新填写"}));
    await user.click(screen.getByRole("button",{name:"恢复草稿"}));
    const restored=screen.getByRole("form",{name:"课堂反馈"});
    expect(within(restored).getByRole("progressbar")).toHaveTextContent("第 2 题 · 当前共 3 题");
    expect(within(restored).getByRole("checkbox",{name:"观察记录"})).toBeChecked();
    expect(within(restored).getByRole("checkbox",{name:"证据判断"})).toBeChecked();
    await user.click(within(restored).getByRole("button",{name:"上一题"}));
    expect(within(restored).getByRole("radio",{name:/希望多看示例/})).toBeChecked();
  });

  it("keeps a restored conditional short answer invalid before moving", async () => {
    const user=userEvent.setup();
    render(<G6ConversationPage component="questionnaire" />);
    await user.click(screen.getByRole("radio",{name:/其他目标/}));
    await user.click(screen.getByRole("button",{name:"下一题"}));
    await user.type(screen.getByRole("textbox",{name:"具体学习目标"}),"一");
    expect(screen.getByRole("alert")).toHaveTextContent("请至少填写 4 个字");
    await user.click(screen.getByRole("button",{name:"保存本页草稿"}));
    await user.click(screen.getByRole("button",{name:"恢复草稿"}));
    expect(screen.getByRole("textbox",{name:"具体学习目标"})).toHaveValue("一");
    await user.click(screen.getByRole("button",{name:"下一题"}));
    expect(within(screen.getByRole("form",{name:"课堂反馈"})).getByRole("progressbar")).toHaveTextContent("第 2 题 · 当前共 4 题");
    expect(screen.getByRole("alert")).toHaveTextContent("请至少填写 4 个字");
  });

  it("retains answers and the current question after failed submission and can retry", async () => {
    const user=userEvent.setup();
    render(<G6ConversationPage component="questionnaire" />);
    await user.click(screen.getByRole("radio",{name:/希望多看示例/}));
    await user.click(screen.getByRole("button",{name:"下一题"}));
    await user.click(screen.getByRole("checkbox",{name:"观察记录"}));
    await user.click(screen.getByRole("button",{name:"下一题"}));
    await user.type(screen.getByRole("textbox",{name:"给老师的补充"}),"保留回答");
    await user.click(screen.getByRole("button",{name:"模拟提交失败：关"}));
    await user.click(screen.getByRole("button",{name:"提交反馈"}));
    expect(screen.getByText("提交失败，回答已保留。关闭模拟失败后可以重试。")).toBeInTheDocument();
    expect(screen.getByRole("textbox",{name:"给老师的补充"})).toHaveValue("保留回答");
    expect(within(screen.getByRole("form",{name:"课堂反馈"})).getByRole("progressbar")).toHaveTextContent("第 3 题 · 当前共 3 题");
    await user.click(screen.getByRole("button",{name:"模拟提交失败：开"}));
    await user.click(screen.getByRole("button",{name:"提交反馈"}));
    expect(screen.getByRole("region",{name:"反馈摘要"})).toHaveTextContent("保留回答");
  });

  it("opens a prior conditional invalid answer with Error when final Submit validates all items", async () => {
    const user=userEvent.setup();render(<G6ConversationPage component="questionnaire" />);
    await user.click(screen.getByRole("radio",{name:/其他目标/}));
    await user.click(screen.getByRole("button",{name:"下一题"}));
    await user.type(screen.getByRole("textbox",{name:"具体学习目标"}),"课堂学习");
    await user.click(screen.getByRole("button",{name:"下一题"}));
    await user.click(screen.getByRole("checkbox",{name:"观察记录"}));
    await user.click(screen.getByRole("button",{name:"下一题"}));
    const input=screen.getByRole("form",{name:"课堂反馈"}).querySelector<HTMLInputElement>('input[aria-label="具体学习目标"]')!;
    fireEvent.change(input,{target:{value:"一"}});
    await user.click(screen.getByRole("button",{name:"跳过并提交"}));
    expect(screen.queryByRole("region",{name:"反馈摘要"})).not.toBeInTheDocument();
    expect(within(screen.getByRole("form",{name:"课堂反馈"})).getByRole("progressbar")).toHaveTextContent("第 2 题 · 当前共 4 题");
    expect(screen.getByRole("alert")).toHaveTextContent("请至少填写 4 个字");
    expect(screen.getByRole("textbox",{name:"具体学习目标"})).toHaveFocus();
  });

  it("keeps SSR definitions and first progress coherent without definition warnings", () => {
    const warn=vi.spyOn(console,"warn").mockImplementation(()=>{});
    const html=renderToString(<G6ConversationPage component="questionnaire" />);
    expect(html).toContain("第 1 题 · 当前共 3 题");
    expect(html).toContain('name="topic"');
    expect(html).toContain('data-shortcut="A"');
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("retries a local message through pending and clears the pending timer on unmount", () => {
    vi.useFakeTimers();
    try {
      const clear=vi.spyOn(globalThis,"clearTimeout");
      const set=vi.spyOn(globalThis,"setTimeout");
      const { unmount }=render(<G6ConversationPage component="message" />);
      fireEvent.click(screen.getByRole("button",{name:"重试发送补充问题"}));
      expect(screen.getByText("正在重试…")).toBeInTheDocument();
      expect(screen.queryByRole("button",{name:"重试发送补充问题"})).not.toBeInTheDocument();
      const pendingIndex=set.mock.calls.findIndex(call=>call[1]===350);
      const pending=set.mock.results[pendingIndex]?.value;
      unmount();
      expect(clear).toHaveBeenCalledWith(pending);
      act(()=>vi.advanceTimersByTime(400));
      clear.mockRestore();set.mockRestore();
    } finally { vi.useRealTimers(); }
  });

  it("completes a local message retry after its pending state", () => {
    vi.useFakeTimers();
    try {
      render(<G6ConversationPage component="message" />);
      fireEvent.click(screen.getByRole("button",{name:"重试发送补充问题"}));
      expect(screen.getByText("正在重试…")).toBeInTheDocument();
      act(()=>vi.advanceTimersByTime(350));
      expect(screen.getByText("已发送 · 本地模拟")).toBeInTheDocument();
    } finally { vi.useRealTimers(); }
  });

  it("connects course and discussion composers to the Scroller documentation", () => {
    render(<G6ConversationPage component="message-scroller" />);
    expect(screen.getByRole("textbox", { name: "输入课程问题" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "输入讨论内容" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "发送问题" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "发送讨论" })).toBeDisabled();
    expect(screen.queryByRole("button", { name: "暂停" })).not.toBeInTheDocument();
  });
});
