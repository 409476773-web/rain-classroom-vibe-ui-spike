import { createRef, type MouseEvent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { Bubble, BubbleContent, type BubblePart } from "./bubble";
import { Message, MessageContent, MessageFooter, type MessagePart } from "../message/message";

describe("Bubble source composition and Rain adaptation", () => {
  it("keeps the rendered button, keyboard action, ref and both click handlers", async () => {
    const ref = createRef<HTMLButtonElement>();
    const sourceClick = vi.fn();
    const hostClick = vi.fn((event: MouseEvent) => event.preventDefault());
    render(<Bubble><BubbleContent onClick={sourceClick}
      render={<button type="button" ref={ref} onClick={hostClick} />}>查看课程建议</BubbleContent></Bubble>);
    const button = screen.getByRole("button", { name: "查看课程建议" });
    expect(button).toBe(ref.current);
    const user = userEvent.setup();
    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(sourceClick).toHaveBeenCalledTimes(1);
    expect(hostClick).toHaveBeenCalledTimes(1);
  });

  it("leaves a disabled rendered action disabled", async () => {
    const click = vi.fn();
    render(<Bubble><BubbleContent render={<button type="button" disabled onClick={click} />}>等待回答</BubbleContent></Bubble>);
    await userEvent.setup().click(screen.getByRole("button", { name: "等待回答" }));
    expect(click).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "等待回答" })).toBeDisabled();
  });

  it("limits a content recipe to its bubble, including nested bubbles", () => {
    const recipe = defineRainLocalRecipe<BubblePart, "ui-bubble">({
      id: "course-answer", scope: "feature", origin: "ui-bubble",
      classes: { content: "course-answer-content" }, modifiedParts: ["content"],
      candidateTokens: [], promotionStatus: "not-proposed",
    });
    render(<><Bubble localRecipe={recipe}><BubbleContent>局部回复</BubbleContent>
      <Bubble><BubbleContent>引用回复</BubbleContent></Bubble></Bubble>
      <Bubble><BubbleContent>相邻回复</BubbleContent></Bubble></>);
    expect(screen.getByText("局部回复")).toHaveClass("course-answer-content");
    expect(screen.getByText("引用回复")).not.toHaveClass("course-answer-content");
    expect(screen.getByText("相邻回复")).not.toHaveClass("course-answer-content");
  });

  it("can change an explicit part recipe without changing render hooks", () => {
    const recipe = defineRainLocalRecipe<BubblePart, "ui-bubble">({
      id: "part-answer", scope: "feature", origin: "ui-bubble",
      classes: { content: "part-answer-content" }, modifiedParts: ["content"],
      candidateTokens: [], promotionStatus: "not-proposed",
    });
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const view = render(<Bubble><BubbleContent localRecipe={recipe}>课程回复</BubbleContent></Bubble>);
      view.rerender(<Bubble><BubbleContent>课程回复</BubbleContent></Bubble>);
      expect(screen.getByText("课程回复")).not.toHaveClass("part-answer-content");
      expect(errors).not.toHaveBeenCalled();
    } finally { errors.mockRestore(); }
  });

  it("keeps message recipes around their own content and footer", () => {
    const recipe = defineRainLocalRecipe<MessagePart, "ui-message">({
      id: "course-message", scope: "feature", origin: "ui-message",
      classes: { content: "course-message-content", footer: "course-message-footer" },
      modifiedParts: ["content", "footer"], candidateTokens: [], promotionStatus: "not-proposed",
    });
    render(<><Message localRecipe={recipe}><MessageContent>教师回复</MessageContent><MessageFooter>已读</MessageFooter></Message>
      <Message><MessageContent>学生回复</MessageContent><MessageFooter>未读</MessageFooter></Message></>);
    expect(screen.getByText("教师回复")).toHaveClass("course-message-content");
    expect(screen.getByText("已读")).toHaveClass("course-message-footer");
    expect(screen.getByText("学生回复")).not.toHaveClass("course-message-content");
    expect(screen.getByText("未读")).not.toHaveClass("course-message-footer");
  });
});
