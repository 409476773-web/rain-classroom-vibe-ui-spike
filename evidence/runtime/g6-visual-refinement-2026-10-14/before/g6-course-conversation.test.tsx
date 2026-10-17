import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ClassroomDiscussion, CourseConversation } from "./g6-course-conversation";

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

function sendQuestion(text = "请再举一个观察与解释的例子。") {
  fireEvent.change(screen.getByRole("textbox", { name: "输入课程问题" }), { target: { value: text } });
  fireEvent.submit(screen.getByRole("form", { name: "课程提问" }));
}

describe("course conversation host lifecycle", () => {
  it("a real stop click never submits the next question draft", async () => {
    const user = userEvent.setup();
    const { container } = render(<CourseConversation />);
    const input = screen.getByRole("textbox", { name: "输入课程问题" });
    await user.type(input, "请举例。");
    await user.click(screen.getByRole("button", { name: "发送问题" }));
    await user.type(input, "下一问：如何记录验证过程？");
    const stop = screen.getByRole("button", { name: "停止生成" });
    await user.click(stop);
    // The original click target must not become a submit button before its
    // browser default action. jsdom does not reproduce that activation race.
    expect(stop).toHaveAttribute("type", "button");
    expect(input).toHaveValue("下一问：如何记录验证过程？");
    expect(container.querySelector('[data-g6-answer-id="answer-1"]')).toHaveAttribute("data-answer-status", "stopped");
    expect(container.querySelector('[data-g6-answer-id="answer-2"]')).toBeNull();
    expect(container.querySelector('[data-answer-status="generating"], [data-answer-status="waiting"]')).toBeNull();
  });
  it("stops a partial answer, keeps the next draft and regenerates that answer in place", () => {
    vi.useFakeTimers();
    const { container } = render(<CourseConversation />);
    sendQuestion();
    expect(screen.getByRole("button", { name: "停止生成" })).toBeEnabled();
    act(() => vi.advanceTimersByTime(210));
    const row = container.querySelector('[data-g6-answer-id="answer-1"]')!;
    expect(row).not.toBeNull();
    const partial = row.querySelector('[data-g6-answer-body]')!.textContent;
    expect(partial!.length).toBeGreaterThan(0);
    fireEvent.change(screen.getByRole("textbox", { name: "输入课程问题" }), { target: { value: "下一问的草稿" } });
    fireEvent.click(screen.getByRole("button", { name: "停止生成" }));
    expect(row).toHaveTextContent("已停止生成，回答尚未完成");
    act(() => vi.advanceTimersByTime(500));
    expect(row.querySelector('[data-g6-answer-body]')!.textContent).toBe(partial);
    fireEvent.click(within(row as HTMLElement).getByRole("button", { name: "重新生成此回答" }));
    expect(container.querySelector('[data-g6-answer-id="answer-1"]')).toBe(row);
    expect(container.querySelector('[data-g6-answer-id="answer-2"]')).toBeNull();
    expect(row).toHaveTextContent("上次未完成内容");
    act(() => vi.advanceTimersByTime(7000));
    expect(row).toHaveAttribute("data-answer-status", "done");
    expect(screen.getByRole("textbox", { name: "输入课程问题" })).toHaveValue("下一问的草稿");
  });

  it("retries a failed turn without a new answer and rejects a callback from the previous attempt", () => {
    vi.useFakeTimers();
    const intervals = vi.spyOn(globalThis, "setInterval");
    const { container } = render(<CourseConversation />);
    sendQuestion();
    const oldTick = intervals.mock.calls.find(call => call[1] === 70)?.[0] as (() => void) | undefined;
    expect(oldTick).toBeTypeOf("function");
    act(() => vi.advanceTimersByTime(210));
    fireEvent.click(screen.getByText("演示控制"));
    fireEvent.click(screen.getByRole("button", { name: "模拟回答中断" }));
    const row = container.querySelector('[data-g6-answer-id="answer-1"]')!;
    expect(row).toHaveTextContent("回答中断，已保留生成内容");
    fireEvent.click(within(row as HTMLElement).getByRole("button", { name: "重试此回答" }));
    act(() => vi.advanceTimersByTime(70));
    const text = row.querySelector('[data-g6-answer-body]')!.textContent;
    act(() => oldTick?.());
    expect(row.querySelector('[data-g6-answer-body]')!.textContent).toBe(text);
    expect(container.querySelectorAll('[data-g6-answer-id="answer-1"]')).toHaveLength(1);
    expect(container.querySelector('[data-g6-answer-id="answer-2"]')).toBeNull();
  });

  it("stops before the first chunk without leaving a false waiting message, and clears work on unmount", () => {
    vi.useFakeTimers();
    const intervals = vi.spyOn(globalThis, "setInterval");
    const clear = vi.spyOn(globalThis, "clearInterval");
    const { container, unmount } = render(<CourseConversation />);
    sendQuestion();
    fireEvent.click(screen.getByRole("button", { name: "停止生成" }));
    const row = container.querySelector('[data-g6-answer-id="answer-1"]')!;
    expect(row).toHaveTextContent("已停止生成，回答尚未完成");
    expect(row).not.toHaveTextContent("正在准备回答");
    fireEvent.click(within(row as HTMLElement).getByRole("button", { name: "重新生成此回答" }));
    let index = -1;
    intervals.mock.calls.forEach((call, current) => { if (call[1] === 70) index = current; });
    const activeTimer = intervals.mock.results[index]?.value;
    unmount();
    expect(clear).toHaveBeenCalledWith(activeTimer);
  });

  it("keeps an explicit focus destination when stopping or retrying removes its action", () => {
    vi.useFakeTimers();
    const { container } = render(<CourseConversation />);
    sendQuestion();
    const stop = screen.getByRole("button", { name: "停止生成" });
    stop.focus();
    fireEvent.click(stop);
    expect(screen.getByRole("textbox", { name: "输入课程问题" })).toHaveFocus();
    const row = container.querySelector('[data-g6-answer-id="answer-1"]')!;
    const retry = within(row as HTMLElement).getByRole("button", { name: "重新生成此回答" });
    retry.focus();
    fireEvent.click(retry);
    expect(row).toHaveFocus();
  });
});

describe("classroom discussion reply and send contract", () => {
  it("preserves the existing group header and date marker when earlier messages are prepended", () => {
    const { container } = render(<ClassroomDiscussion />);
    const teacher = container.querySelector('[data-message-id="teacher"]') as HTMLElement;
    const author = within(teacher).getByText("张老师");
    const dateMarker = within(teacher).getByText("今天", { exact: false });

    fireEvent.click(screen.getByRole("button", { name: "加载更早讨论" }));

    expect(container.querySelector('[data-message-id="teacher"]')).toBe(teacher);
    expect(teacher).toContainElement(dateMarker);
    expect(teacher).toContainElement(author);
    expect(teacher).not.toHaveAttribute("data-grouped");
    expect(container.querySelector('[data-message-id="earlier-discussion"]')).not.toBeNull();
  });

  it("focuses the reply composer and canceling the reply preserves the text", () => {
    render(<ClassroomDiscussion />);
    fireEvent.click(screen.getByRole("button", { name: "回复张老师的消息" }));
    const input = screen.getByRole("textbox", { name: "输入讨论内容" });
    expect(input).toHaveFocus();
    expect(screen.getByRole("group", { name: "当前回复对象" })).toHaveTextContent("张老师");
    fireEvent.change(input, { target: { value: "我想补充可观察的证据。" } });
    fireEvent.click(screen.getByRole("button", { name: "取消回复" }));
    expect(input).toHaveValue("我想补充可观察的证据。");
    expect(screen.queryByRole("group", { name: "当前回复对象" })).not.toBeInTheDocument();
  });

  it("locks the pending draft, restores it after failure and appends only once after a successful retry", () => {
    vi.useFakeTimers();
    const { container } = render(<ClassroomDiscussion />);
    fireEvent.click(screen.getByRole("button", { name: "回复张老师的消息" }));
    const input = screen.getByRole("textbox", { name: "输入讨论内容" });
    fireEvent.change(input, { target: { value: "三位同学举手是事实，理解了知识是解释。" } });
    fireEvent.click(screen.getByText("演示控制"));
    fireEvent.click(screen.getByRole("button", { name: "模拟发送失败：关" }));
    fireEvent.submit(screen.getByRole("form", { name: "发送课堂讨论" }));
    expect(input).toHaveAttribute("readonly");
    expect(screen.getByRole("button", { name: "取消回复" })).toBeDisabled();
    act(() => vi.advanceTimersByTime(500));
    expect(input).not.toHaveAttribute("readonly");
    expect(input).toHaveValue("三位同学举手是事实，理解了知识是解释。");
    expect(screen.getByRole("group", { name: "当前回复对象" })).toHaveTextContent("张老师");
    expect(container.querySelectorAll('[data-discussion-own="true"]')).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "模拟发送失败：开" }));
    fireEvent.submit(screen.getByRole("form", { name: "发送课堂讨论" }));
    fireEvent.submit(screen.getByRole("form", { name: "发送课堂讨论" }));
    act(() => vi.advanceTimersByTime(500));
    expect(container.querySelectorAll('[data-discussion-own="true"]')).toHaveLength(1);
    expect(input).toHaveValue("");
    expect(screen.queryByRole("group", { name: "当前回复对象" })).not.toBeInTheDocument();
  });
});
