import { createRef } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MessageScroller, MessageScrollerProvider, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, useMessageScroller } from "./message-scroller";

let scroll: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.spyOn(Element.prototype, "clientHeight", "get").mockReturnValue(100);
  vi.spyOn(Element.prototype, "scrollHeight", "get").mockReturnValue(300);
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const element = this as HTMLElement;
    const top = element.hasAttribute("data-message-id") ? Number(element.dataset.messageId?.slice(1)) * 100 - (element.closest(".rain-message-scroller__viewport")?.scrollTop ?? 0) : 0;
    return { x: 0, y: top, top, left: 0, width: 300, height: 100, right: 300, bottom: top + 100, toJSON() {} };
  });
  scroll = vi.fn(function (this: HTMLElement, options: ScrollToOptions) { this.scrollTop = options.top ?? 0; });
  Object.defineProperty(HTMLElement.prototype, "scrollTo", { configurable: true, value: scroll });
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); delete (HTMLElement.prototype as { scrollTo?: unknown }).scrollTo; });

function Fixture() {
  return <MessageScrollerProvider defaultScrollPosition="start"><MessageScroller>
    <MessageScrollerViewport><MessageScrollerContent>
      {[0, 1, 2].map(id => <MessageScrollerItem key={id} messageId={`m${id}`}>消息{id}</MessageScrollerItem>)}
    </MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton />
  </MessageScroller></MessageScrollerProvider>;
}

describe("Message Scroller Rain composition", () => {
  it("keeps the labelled keyboard region, log, item identity and viewport ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<MessageScrollerProvider defaultScrollPosition="start"><MessageScroller>
      <MessageScrollerViewport ref={ref} aria-label="课程会话"><MessageScrollerContent aria-busy>
        <MessageScrollerItem messageId="m0" scrollAnchor>课程提问</MessageScrollerItem>
      </MessageScrollerContent></MessageScrollerViewport>
    </MessageScroller></MessageScrollerProvider>);
    expect(screen.getByRole("region", { name: "课程会话" })).toBe(ref.current);
    expect(ref.current).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("log")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("课程提问")).toHaveAttribute("data-message-id", "m0");
  });

  it("uses automatic scroll instead of smooth when motion is reduced at activation", async () => {
    render(<Fixture />);
    const button = screen.getByRole("button", { name: "滚动到最新" });
    await waitFor(() => expect(button).toHaveAttribute("data-active", "true"));
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));
    const blur = vi.spyOn(button, "blur");
    scroll.mockClear();
    await userEvent.setup().click(button);
    expect(scroll).toHaveBeenCalled();
    expect(scroll.mock.calls.at(-1)?.[0]).toMatchObject({ behavior: "auto" });
    expect(blur).toHaveBeenCalledTimes(1);
  });

  it("lets a host cancel the jump and returns false for a mounted missing id", async () => {
    let missing: boolean | undefined;
    function Commands() {
      const { scrollToMessage } = useMessageScroller();
      return <button onClick={() => { missing = scrollToMessage("missing"); }}>查找缺失消息</button>;
    }
    render(<MessageScrollerProvider defaultScrollPosition="start"><MessageScroller>
      <MessageScrollerViewport><MessageScrollerContent><MessageScrollerItem messageId="m2">消息</MessageScrollerItem></MessageScrollerContent></MessageScrollerViewport>
      <MessageScrollerButton onClick={event => event.preventDefault()}>跳到末尾</MessageScrollerButton>
    </MessageScroller><Commands /></MessageScrollerProvider>);
    await waitFor(() => expect(screen.getByRole("button", { name: "跳到末尾" })).toHaveAttribute("data-active", "true"));
    scroll.mockClear();
    const canceled = screen.getByRole("button", { name: "跳到末尾" });
    await userEvent.setup().click(canceled);
    expect(scroll).not.toHaveBeenCalled();
    expect(canceled).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "查找缺失消息" }));
    expect(missing).toBe(false);
  });

  it("keeps an aria-disabled jump focusable and cancels pointer and keyboard activation", async () => {
    const onClick = vi.fn();
    render(<MessageScrollerProvider defaultScrollPosition="start"><MessageScroller>
      <MessageScrollerViewport><MessageScrollerContent><MessageScrollerItem messageId="m2">消息</MessageScrollerItem></MessageScrollerContent></MessageScrollerViewport>
      <MessageScrollerButton aria-disabled="true" onClick={onClick}>暂不可跳转</MessageScrollerButton>
    </MessageScroller></MessageScrollerProvider>);
    const button = screen.getByRole("button", { name: "暂不可跳转" });
    await waitFor(() => expect(button).toHaveAttribute("data-active", "true"));
    const user = userEvent.setup();
    scroll.mockClear();
    await user.click(button);
    expect(button).toHaveFocus();
    await user.keyboard("{Enter} ");
    expect(scroll).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
