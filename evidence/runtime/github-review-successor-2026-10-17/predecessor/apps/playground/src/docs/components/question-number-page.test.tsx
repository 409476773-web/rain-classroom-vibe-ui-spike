import { act, cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { App } from "../../app";

function navigate(hash: string) {
  act(() => {
    window.history.pushState(null, "", hash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
}

function openPage() {
  navigate("#question-number");
  return render(<App />);
}

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "#overview");
});

describe("QuestionNumber designer playground", () => {
  it("opens from the component directory and focuses its own heading", () => {
    navigate("#components");
    render(<App />);
    expect(screen.getByRole("link", { name: "体验 QuestionNumber 题号按钮" })).toHaveAttribute("href", "#question-number");
    navigate("#question-number");
    expect(screen.getByRole("heading", { name: "题号按钮，定位与结果各自清楚", level: 1 })).toHaveFocus();
  });

  it("keeps feedback while changing location in each independent matrix", async () => {
    const user = userEvent.setup();
    openPage();
    for (const shape of ["square", "circle"] as const) {
      const matrix = screen.getByTestId(`question-number-${shape}-matrix`);
      const buttons = within(matrix).getAllByRole("button");
      expect(buttons).toHaveLength(7);
      expect(buttons[0]).toHaveAttribute("data-feedback", "none");
      expect(buttons[4]).toHaveAttribute("data-feedback", "unanswered");
      await user.click(buttons[6]!);
      await user.click(buttons[6]!);
      expect(buttons[6]).toHaveAttribute("aria-current", "step");
      expect(buttons[6]).toHaveAttribute("data-feedback", "reviewed");
      expect(matrix.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
    }
    expect(screen.getByTestId("question-number-square-matrix").querySelector('[aria-current="step"]')).toHaveTextContent("7");
    expect(screen.getByTestId("question-number-multi-digit")).toHaveTextContent("108");
    expect(screen.getByTestId("question-number-disabled")).toBeDisabled();
  });

  it("keeps one location across the parent material and its children", async () => {
    const user = userEvent.setup();
    openPage();
    const example = screen.getByTestId("question-number-parent-child");
    const child = within(example).getByRole("button", { name: "第 8 题，小题 2，待批改" });
    await user.click(child);
    expect(child).toHaveAttribute("aria-current", "step");
    expect(within(example).getByRole("status")).toHaveTextContent("当前查看第 8 题 · 小题 2");
    expect(example.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
    await user.click(within(example).getByRole("button", { name: "第 8 题，阅读材料" }));
    expect(within(example).getByRole("status")).toHaveTextContent("当前查看第 8 题 · 阅读材料");
  });

  it("switches the preview theme", async () => {
    const user = userEvent.setup();
    openPage();
    await user.click(within(screen.getByRole("group", { name: "预览主题" })).getByRole("button", { name: "深色" }));
    expect(screen.getByRole("main")).toHaveAttribute("data-rain-theme", "dark");
  });
});
