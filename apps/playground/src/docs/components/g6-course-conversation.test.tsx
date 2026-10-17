import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ClassroomDiscussion, CourseConversation } from "./g6-course-conversation";

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers(); });

async function sendQuestion(text = "请再举一个观察与解释的例子。") {
  fireEvent.change(screen.getByRole("textbox", { name: "输入课程问题" }), { target: { value: text } });
  fireEvent.submit(screen.getByRole("form", { name: "课程提问" }));
  // Accepted local submissions settle before the next draft is editable.
  await act(async () => {});
}

describe("conversation composer growth", () => {
  it.each([
    { Scene: CourseConversation, label: "输入课程问题" },
    { Scene: ClassroomDiscussion, label: "输入讨论内容" },
  ])("grows and caps $label while Enter remains a newline, then shrinks after clearing", async ({ Scene, label }) => {
    const user = userEvent.setup();
    const { container } = render(<Scene />);
    const input = screen.getByRole("textbox", { name: label }) as HTMLTextAreaElement;
    const messageCount = container.querySelectorAll("[data-message-id]").length;
    expect(input.rows).toBe(1);

    // jsdom has no text layout. Supply browser measurements and the computed
    // height ceiling while exercising the real input and controlled value.
    let measuredHeight = 38;
    Object.defineProperty(input, "scrollHeight", { configurable: true, get: () => measuredHeight });
    input.style.maxHeight = "112px";
    await user.type(input, "事实");
    expect(input.style.height).toBe("38px");
    measuredHeight = 60;
    await user.type(input, "{Enter}解释");
    expect(input).toHaveValue("事实\n解释");
    expect(input.style.height).toBe("60px");
    expect(container.querySelectorAll("[data-message-id]")).toHaveLength(messageCount);

    measuredHeight = 280;
    const longDraft = "保留的观察和解释\n".repeat(12);
    fireEvent.change(input, { target: { value: longDraft } });
    expect(input).toHaveValue(longDraft);
    expect(input.style.height).toBe("112px");
    expect(input.style.overflowY).toBe("auto");

    measuredHeight = 38;
    fireEvent.change(input, { target: { value: "" } });
    expect(input.style.height).toBe("38px");
    expect(input.style.overflowY).toBe("hidden");
  });
});

describe("course conversation host lifecycle", () => {
  it("replaces the empty list with guidance and starts the first question without remounting its composer", async () => {
    const user = userEvent.setup();
    const { container } = render(<CourseConversation />);
    const input = screen.getByRole("textbox", { name: "输入课程问题" });
    await user.click(screen.getByText("演示控制"));
    await user.click(screen.getByRole("button", { name: "查看空会话" }));
    expect(screen.queryByRole("log")).toBeNull();
    expect(screen.queryByRole("button", { name: "加载更早记录" })).toBeNull();
    expect(screen.queryByRole("button", { name: "返回最新" })).toBeNull();
    expect(container.querySelector("[data-message-id]")).toBeNull();

    await user.click(screen.getByRole("button", { name: "怎样区分事实与解释？" }));
    expect(screen.getByRole("textbox", { name: "输入课程问题" })).toBe(input);
    expect(input).toHaveFocus();
    expect(input).toHaveValue("课堂观察中，怎样区分事实与解释？能用一个例子说明吗？");
    expect(container.querySelector("[data-message-id]")).toBeNull();
    await user.click(screen.getByRole("button", { name: "发送问题" }));
    expect(within(screen.getByRole("log")).getByText("课堂观察中，怎样区分事实与解释？能用一个例子说明吗？")).toBeInTheDocument();
    expect(container.querySelectorAll("[data-message-id]")).toHaveLength(1);
    expect(screen.getByRole("textbox", { name: "输入课程问题" })).toBe(input);
    expect(input).toHaveValue("");
    await user.click(screen.getByRole("button", { name: "停止生成" }));
    expect(container.querySelector('[data-g6-answer-id="answer-1"]')).toHaveAttribute("data-answer-status", "stopped");
    expect(input).toHaveFocus();
  });

  it("keeps the source trigger in place when expanding from the latest position, then allows returning to latest", () => {
    vi.useFakeTimers();
    const observers: { callback: ResizeObserverCallback; elements: Set<Element> }[] = [];
    vi.stubGlobal("ResizeObserver", class {
      entry: typeof observers[number];
      constructor(callback: ResizeObserverCallback) { this.entry = { callback, elements: new Set() }; observers.push(this.entry); }
      observe(element: Element) { this.entry.elements.add(element); }
      unobserve(element: Element) { this.entry.elements.delete(element); }
      disconnect() { this.entry.elements.clear(); }
    });
    const expanded = () => document.querySelector('.g6-course-sources [aria-expanded="true"]') !== null;
    // jsdom has no layout or ResizeObserver delivery. Model a long answer whose
    // details grow below the trigger, while exercising the actual scroll engine.
    vi.spyOn(Element.prototype, "clientHeight", "get").mockImplementation(function (this: Element) {
      return this.classList.contains("rain-message-scroller__viewport") ? 280 : 40;
    });
    vi.spyOn(Element.prototype, "scrollHeight", "get").mockImplementation(function (this: Element) {
      return this.classList.contains("rain-message-scroller__viewport") ? 1000 + (expanded() ? 240 : 0) : 40;
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
      const element = this;
      const viewport = element.closest<HTMLElement>(".rain-message-scroller__viewport");
      const offset = viewport?.scrollTop ?? 0;
      const id = element.dataset.messageId;
      const top = element.classList.contains("rain-message-scroller__viewport") ? 100
        : id === "question-example" ? 100 - offset
          : element.matches('[data-slot="collapsible-trigger"]') ? 950 - offset : 100 - offset;
      const height = element.classList.contains("rain-message-scroller__viewport") ? 280
        : id === "question-example" ? 1000 + (expanded() ? 240 : 0) : 100;
      return { x: 0, y: top, top, left: 0, width: 600, height, right: 600, bottom: top + height, toJSON() {} };
    });
    const originalScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollTo");
    Object.defineProperty(HTMLElement.prototype, "scrollTo", { configurable: true, value(this: HTMLElement, options: ScrollToOptions) { this.scrollTop = options.top ?? 0; } });
    try {
      const { container } = render(<CourseConversation />);
      // Match the real content padding, which the engine subtracts when
      // resolving an align=start message jump.
      (container.querySelector(".rain-message-scroller__content") as HTMLElement).style.paddingBlockStart = "20px";
      act(() => vi.advanceTimersByTime(20));
      const viewport = screen.getByRole("region", { name: "课程答疑记录" });
      const latest = screen.getByRole("button", { name: "返回最新" });
      fireEvent.click(latest);
      expect(viewport.scrollTop).toBe(720);
      const trigger = screen.getByRole("button", { name: "参考资料 · 2 份" });
      trigger.focus();
      const top = trigger.getBoundingClientRect().top;
      fireEvent.click(trigger);
      act(() => {
        for (const observer of observers) {
          if ([...observer.elements].some(element => element.classList.contains("rain-message-scroller__content"))) {
            observer.callback([], observer as unknown as ResizeObserver);
          }
        }
        vi.advanceTimersByTime(20);
      });
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(trigger).toHaveFocus();
      expect(trigger.getBoundingClientRect().top).toBe(top);
      expect(viewport.scrollTop).toBe(720);
      fireEvent.click(latest);
      expect(viewport.scrollTop).toBe(960);
    } finally {
      cleanup();
      if (originalScrollTo) Object.defineProperty(HTMLElement.prototype, "scrollTo", originalScrollTo);
      else delete (HTMLElement.prototype as { scrollTo?: unknown }).scrollTo;
    }
  });

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
  it("stops a partial answer, keeps the next draft and regenerates that answer in place", async () => {
    vi.useFakeTimers();
    const { container } = render(<CourseConversation />);
    await sendQuestion();
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

  it("retries a failed turn without a new answer and rejects a callback from the previous attempt", async () => {
    vi.useFakeTimers();
    const intervals = vi.spyOn(globalThis, "setInterval");
    const { container } = render(<CourseConversation />);
    await sendQuestion();
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

  it("stops before the first chunk without leaving a false waiting message, and clears work on unmount", async () => {
    vi.useFakeTimers();
    const intervals = vi.spyOn(globalThis, "setInterval");
    const clear = vi.spyOn(globalThis, "clearInterval");
    const { container, unmount } = render(<CourseConversation />);
    await sendQuestion();
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

  it("keeps an explicit focus destination when stopping or retrying removes its action", async () => {
    vi.useFakeTimers();
    const { container } = render(<CourseConversation />);
    await sendQuestion();
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
  it("uses the shared composer in both G6 scenes", () => {
    const { container, unmount } = render(<CourseConversation />);
    expect(container.querySelector('[data-rain-id="recipe-conversation-composer"]')).not.toBeNull();
    expect(screen.getByRole("button", { name: "选择搜索范围" })).toBeInTheDocument();
    unmount();
    const discussion = render(<ClassroomDiscussion />);
    expect(discussion.container.querySelector('[data-rain-id="recipe-conversation-composer"]')).not.toBeNull();
    expect(screen.queryByRole("button", { name: "选择搜索范围" })).not.toBeInTheDocument();
  });

  it.each(["edit", "cancel-reply"] as const)("clears a rejected discussion's old error after %s", async change => {
    vi.useFakeTimers();
    render(<ClassroomDiscussion />);
    fireEvent.click(screen.getByRole("button", { name: "回复张老师的消息" }));
    const input = screen.getByRole("textbox", { name: "输入讨论内容" });
    fireEvent.change(input, { target: { value: "待发送的观察记录。" } });
    fireEvent.click(screen.getByText("演示控制"));
    fireEvent.click(screen.getByRole("button", { name: "模拟发送失败：关" }));
    fireEvent.submit(screen.getByRole("form", { name: "发送课堂讨论" }));
    await act(async () => vi.advanceTimersByTimeAsync(500));
    expect(screen.getByText("发送未成功，文字、资料和回复对象已保留。请重试。")).toBeInTheDocument();
    if (change === "edit") fireEvent.change(input, { target: { value: "修改后的观察记录。" } });
    else fireEvent.click(screen.getByRole("button", { name: "取消回复" }));
    expect(screen.queryByText("发送未成功，文字、资料和回复对象已保留。请重试。")).not.toBeInTheDocument();
    expect(input).toHaveValue(change === "edit" ? "修改后的观察记录。" : "待发送的观察记录。");
  });

  it("uploads and sends every selected file with the accepted discussion snapshot", async () => {
    vi.useFakeTimers();
    const { container } = render(<ClassroomDiscussion />);
    const form = screen.getByRole("form", { name: "发送课堂讨论" });
    fireEvent.change(form.querySelector('input[type="file"]')!, { target: { files: [new File(["one"], "记录一.txt"), new File(["two"], "记录二.txt")] } });
    fireEvent.submit(form);
    expect(container.querySelectorAll('[data-discussion-own="true"]')).toHaveLength(0);
    await act(async () => vi.advanceTimersByTimeAsync(600));
    fireEvent.submit(form);
    await act(async () => vi.advanceTimersByTimeAsync(500));
    const message = container.querySelector('[data-discussion-own="true"]') as HTMLElement;
    expect(message).not.toBeNull();
    expect(within(message).getByRole("button", { name: "查看完整文件名：记录一.txt" })).toBeInTheDocument();
    expect(within(message).getByRole("button", { name: "查看完整文件名：记录二.txt" })).toBeInTheDocument();
    expect(within(form).queryByText("记录一.txt")).not.toBeInTheDocument();
  });

  it("keeps the chosen reference scope after removing the final reference until the user explicitly changes it", async () => {
    const user = userEvent.setup();
    render(<CourseConversation />);
    const input = screen.getByRole("textbox", { name: "输入课程问题" });
    await user.type(input, "请解释这份资料中的观察记录。");
    await user.click(screen.getByRole("button", { name: "添加资料" }));
    await user.click(await screen.findByRole("menuitem", { name: "选择课程资料" }));
    await user.click(await screen.findByRole("checkbox", { name: "课堂观察记录与同伴反馈说明.pdf" }));
    await user.click(screen.getByRole("button", { name: "添加引用" }));
    await user.click(screen.getByRole("button", { name: "选择搜索范围" }));
    await user.click(screen.getByRole("radio", { name: "本次引用资料" }));
    await user.click(screen.getByRole("button", { name: "移除引用 课堂观察记录与同伴反馈说明.pdf" }));
    expect(screen.getByRole("button", { name: "选择搜索范围" })).toHaveTextContent("本次引用资料");
    expect(screen.getByText("请添加引用资料或更改范围。")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "发送问题" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "选择搜索范围" }));
    await user.click(screen.getByRole("radio", { name: "本课程资料" }));
    expect(screen.getByRole("button", { name: "发送问题" })).toBeEnabled();
    expect(screen.getByRole("textbox", { name: "输入课程问题" })).toBe(input);
    expect(input).toHaveValue("请解释这份资料中的观察记录。");
  });

  it("keeps a failed local upload and supports turning off the failure demo before retry", async () => {
    vi.useFakeTimers();
    render(<ClassroomDiscussion />);
    fireEvent.click(screen.getByText("演示控制"));
    fireEvent.click(screen.getByRole("button", { name: "模拟上传失败：关" }));
    const form = screen.getByRole("form", { name: "发送课堂讨论" });
    fireEvent.change(form.querySelector('input[type="file"]')!, { target: { files: [new File(["x"], "保留记录.txt")] } });
    await act(async () => vi.advanceTimersByTimeAsync(600));
    expect(within(form).getByText("本地模拟：上传失败，文件已保留，可关闭演示开关后重试。")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "发送讨论" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "模拟上传失败：开" }));
    fireEvent.click(within(form).getByRole("button", { name: "重试" }));
    await act(async () => vi.advanceTimersByTimeAsync(600));
    expect(within(form).queryByText("本地模拟：上传失败，文件已保留，可关闭演示开关后重试。")).not.toBeInTheDocument();
    expect(within(form).getByText("保留记录.txt")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "发送讨论" })).toBeEnabled();
  });

  it.each([
    { Scene: CourseConversation, formLabel: "课程提问", inputLabel: "输入课程问题" },
    { Scene: ClassroomDiscussion, formLabel: "发送课堂讨论", inputLabel: "输入讨论内容" },
  ])("opens the full filename by keyboard without submitting $formLabel, restores focus and cleans up on removal", async ({ Scene, formLabel, inputLabel }) => {
    const user = userEvent.setup();
    const { container } = render(<Scene />);
    const messageCount = container.querySelectorAll("[data-message-id]").length;
    const form = screen.getByRole("form", { name: formLabel });
    const draft = within(form).getByRole("textbox", { name: inputLabel });
    await user.type(draft, "准备核对这份记录。");
    const name = "课堂观察记录_第二组讨论_事实解释与验证证据_2026年10月14日.pdf";
    await user.upload(form.querySelector('input[type="file"]') as HTMLInputElement, new File(["layout sample"], name));
    await waitFor(() => expect(within(form).queryByRole("button", { name: "取消上传" })).not.toBeInTheDocument());
    const title = within(form).getByRole("button", { name: `查看资料 ${name}` });
    expect(title).toHaveAttribute("type", "button");
    await user.click(draft);
    await user.tab({ shift: true });
    await user.tab({ shift: true });
    expect(title).toHaveFocus();
    await user.keyboard("{Enter}");
    const popup = await screen.findByRole("dialog", { name });
    expect(popup).toHaveTextContent(name);
    await waitFor(() => expect(within(popup).getByRole("heading", { name })).toHaveFocus());
    expect(draft).toHaveValue("准备核对这份记录。");
    expect(container.querySelectorAll("[data-message-id]")).toHaveLength(messageCount);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name })).not.toBeInTheDocument();
    await waitFor(() => expect(draft).toHaveFocus());
    title.focus();
    await user.keyboard(" ");
    expect(await screen.findByRole("dialog", { name })).toHaveTextContent(name);
    await user.keyboard("{Escape}");
    await user.click(within(form).getByRole("button", { name: `移除资料 ${name}` }));
    expect(within(form).queryByText(name, { exact: true })).not.toBeInTheDocument();
    expect(draft).toHaveValue("准备核对这份记录。");
    expect(draft).toHaveFocus();
    expect(screen.queryByRole("dialog", { name })).not.toBeInTheDocument();
  });

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

  it("locks the pending draft, restores it after failure and appends only once after a successful retry", async () => {
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
    await act(async () => vi.advanceTimersByTimeAsync(500));
    expect(input).not.toHaveAttribute("readonly");
    expect(input).toHaveValue("三位同学举手是事实，理解了知识是解释。");
    expect(screen.getByRole("group", { name: "当前回复对象" })).toHaveTextContent("张老师");
    expect(container.querySelectorAll('[data-discussion-own="true"]')).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "模拟发送失败：开" }));
    fireEvent.submit(screen.getByRole("form", { name: "发送课堂讨论" }));
    fireEvent.submit(screen.getByRole("form", { name: "发送课堂讨论" }));
    await act(async () => vi.advanceTimersByTimeAsync(500));
    expect(container.querySelectorAll('[data-discussion-own="true"]')).toHaveLength(1);
    expect(input).toHaveValue("");
    expect(screen.queryByRole("group", { name: "当前回复对象" })).not.toBeInTheDocument();
  });
});
