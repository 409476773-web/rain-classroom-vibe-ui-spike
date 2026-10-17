import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { QuestionNumber, type QuestionNumberPart } from "./question-number";
import { DensityProvider } from "@rain-next/foundations";

describe("QuestionNumber", () => {
  it("defaults to 28 in either density and accepts only the six approved sizes", () => {
    const { rerender } = render(<QuestionNumber number={100} />);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "28");
    rerender(<DensityProvider density="compact"><QuestionNumber number={100} /></DensityProvider>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "28");
    for (const size of [20, 24, 28, 32, 36, 40] as const) {
      rerender(<DensityProvider density="compact"><QuestionNumber number={100} size={size} /></DensityProvider>);
      expect(screen.getByRole("button")).toHaveAttribute("data-size", String(size));
    }
    expect(() => render(<QuestionNumber number={1} size={30 as 28} />)).toThrow(/size/i);
    expect(() => render(<QuestionNumber number={1} size={"28" as unknown as 28} />)).toThrow(/size/i);
  });

  it("uses native navigation semantics and keeps current independent of feedback", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    const { rerender } = render(<QuestionNumber number={12} feedback="wrong" current onClick={onClick} ref={ref} />);
    const button = screen.getByRole("button", { name: "第 12 题，错误" });
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-current", "step");
    expect(button).not.toHaveAttribute("aria-pressed");
    expect(button).not.toHaveAttribute("aria-selected");
    await user.tab();
    await user.keyboard("{Enter} ");
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(button).toHaveAttribute("aria-current", "step");
    expect(button.querySelector('[data-icon="icon/close-bold"]')).toBeInTheDocument();
    rerender(<QuestionNumber number={12} feedback="wrong" />);
    expect(button).not.toHaveAttribute("aria-current");
    expect(button).toHaveAttribute("data-feedback", "wrong");
    expect(button.querySelector('[data-icon="icon/close-bold"]')).toBeInTheDocument();
  });

  it("does not infer unanswered, and uses the exact five library assets", () => {
    const { rerender } = render(<QuestionNumber number={1} />);
    const button = screen.getByRole("button", { name: "第 1 题" });
    expect(button).toHaveAttribute("data-feedback", "none");
    expect(button.querySelector('[data-slot="feedback"]')).toBeNull();
    rerender(<QuestionNumber number={1} feedback="answered" />);
    expect(button).toHaveAccessibleName("第 1 题，已作答");
    expect(button.querySelector('[data-slot="feedback"]')).toBeNull();
    for (const [feedback, icon, label] of [
      ["correct", "check-bold", "正确"], ["wrong", "close-bold", "错误"],
      ["unanswered", "warning-bold", "未作答"], ["pending", "grading-pending", "待批改"],
      ["reviewed", "grading-reviewed", "已批改"],
    ] as const) {
      rerender(<QuestionNumber number={1} feedback={feedback} />);
      expect(button).toHaveAccessibleName(`第 1 题，${label}`);
      expect(button.querySelector('[data-slot="feedback"]')).toHaveAttribute("aria-hidden", "true");
      expect(button.querySelector(`[data-icon="icon/${icon}"]`)).toBeInTheDocument();
    }
  });

  it("keeps child identity and caller descriptions without changing the button action", () => {
    render(<><p id="progress">批改 12 / 30 份</p><QuestionNumber number={2} shape="circle" aria-label="第 8 题，小题 2，待批改" aria-describedby="progress" feedback="pending" /></>);
    const button = screen.getByRole("button", { name: "第 8 题，小题 2，待批改" });
    expect(button).toHaveAttribute("data-shape", "circle");
    expect(button).toHaveAccessibleDescription("批改 12 / 30 份");
    expect(button.querySelector('[data-slot="label"]')).toHaveTextContent("2");
  });

  it("uses native disabled behavior for both disabled inputs and retains supplied feedback", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<QuestionNumber number={1} feedback="pending" disabled onClick={onClick} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    await userEvent.tab();
    expect(button).not.toHaveFocus();
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toHaveAttribute("data-feedback", "pending");
    rerender(<QuestionNumber number={1} aria-disabled="true" onClick={onClick} />);
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("exposes bounded recipe parts and rejects empty or non-finite identity", () => {
    const localRecipe = defineRainLocalRecipe<QuestionNumberPart, "ui-question-number">({
      id: "grading-question-example", scope: "feature", origin: "ui-question-number",
      classes: { label: "font-rain-bold" }, modifiedParts: ["label"], candidateTokens: [], promotionStatus: "not-proposed",
    });
    const { unmount } = render(<QuestionNumber number="108" localRecipe={localRecipe} />);
    expect(screen.getByRole("button")).toHaveAttribute("data-local-recipe", "grading-question-example");
    expect(screen.getByText("108")).toHaveClass("font-rain-bold");
    unmount();
    expect(() => render(<QuestionNumber number=" " />)).toThrow(/non-empty/);
    expect(() => render(<QuestionNumber number={NaN} />)).toThrow(/finite/);
  });
});
