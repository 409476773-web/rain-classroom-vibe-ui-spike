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
  navigate("#option-button");
  return render(<App />);
}

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "#overview");
});

describe("OptionButton designer playground", () => {
  it("opens from the component directory and focuses its own heading", () => {
    navigate("#components");
    render(<App />);
    expect(screen.getByRole("link", { name: "体验 OptionButton 选项按钮" })).toHaveAttribute("href", "#option-button");
    navigate("#option-button");
    expect(screen.getByRole("heading", { name: "选项按钮，独立与整行共用选择", level: 1 })).toHaveFocus();
  });

  it("starts unanswered and keeps single-choice examples independent", async () => {
    const user = userEvent.setup();
    openPage();
    const filled = screen.getByTestId("option-single-filled");
    const outlined = screen.getByTestId("option-single-outlined");
    expect(within(filled).getAllByRole("radio").every((input) => !(input as HTMLInputElement).checked)).toBe(true);
    const filledB = within(filled).getByRole("radio", { name: "B" });
    await user.click(filledB);
    await user.click(filledB);
    expect(filledB).toBeChecked();
    expect(within(outlined).getAllByRole("radio").every((input) => !(input as HTMLInputElement).checked)).toBe(true);
    await user.click(within(outlined).getByRole("radio", { name: "D" }));
    expect(filledB).toBeChecked();
    expect(within(filled).getByRole("status")).toHaveTextContent("已选 B");
    expect(within(outlined).getByRole("status")).toHaveTextContent("已选 D");
  });

  it("adds and removes independent multiple choices", async () => {
    const user = userEvent.setup();
    openPage();
    const example = screen.getByTestId("option-multiple");
    const a = within(example).getByRole("checkbox", { name: "A" });
    const c = within(example).getByRole("checkbox", { name: "C" });
    await user.click(a);
    await user.click(c);
    expect(a).toBeChecked();
    expect(c).toBeChecked();
    await user.click(a);
    expect(a).not.toBeChecked();
    expect(c).toBeChecked();
    expect(within(example).getByRole("status")).toHaveTextContent("已选 C");
  });

  it("keeps outlined multiple choices separate from the filled example", async () => {
    const user = userEvent.setup();
    openPage();
    const filled = screen.getByTestId("option-multiple");
    const outlined = screen.getByTestId("option-multiple-outlined");
    expect(within(outlined).getByRole("group", { name: "多选 · 描边" })).toBeInTheDocument();
    expect(within(outlined).getAllByRole("checkbox").every((input) => !(input as HTMLInputElement).checked)).toBe(true);
    const filledA = within(filled).getByRole("checkbox", { name: "A" });
    const outlinedB = within(outlined).getByRole("checkbox", { name: "B" });
    const outlinedD = within(outlined).getByRole("checkbox", { name: "D" });
    await user.click(filledA);
    await user.click(outlinedB);
    await user.click(outlinedD);
    expect(filledA).toBeChecked();
    expect(within(filled).getByRole("checkbox", { name: "B" })).not.toBeChecked();
    expect(within(outlined).getByRole("checkbox", { name: "A" })).not.toBeChecked();
    expect(within(outlined).getByRole("status")).toHaveTextContent("已选 B、D");
    await user.click(outlinedB);
    expect(outlinedB).not.toBeChecked();
    expect(outlinedD).toBeChecked();
    expect(filledA).toBeChecked();
  });

  it("selects single and multiple choices from their row text", async () => {
    const user = userEvent.setup();
    openPage();
    const single = screen.getByTestId("option-single-rows");
    const text = "在课程结束时，根据一次考试成绩确定学生的最终等级。";
    await user.click(within(single).getByText(text));
    await user.click(within(single).getByText(text));
    expect(within(single).getByRole("radio", { name: new RegExp(text) })).toBeChecked();
    expect(within(single).queryByRole("button")).not.toBeInTheDocument();
    const multiple = screen.getByTestId("option-multiple-rows");
    const firstText = "阅读文字材料";
    const secondText = "参与课堂讨论";
    await user.click(within(multiple).getByText(firstText));
    await user.click(within(multiple).getByText(secondText));
    expect(within(multiple).getByRole("checkbox", { name: new RegExp(firstText) })).toBeChecked();
    expect(within(multiple).getByRole("checkbox", { name: new RegExp(secondText) })).toBeChecked();
    await user.click(within(multiple).getByText(firstText));
    expect(within(multiple).getByRole("checkbox", { name: new RegExp(firstText) })).not.toBeChecked();
  });

  it("preserves selected and unselected states when options are disabled", async () => {
    const user = userEvent.setup();
    openPage();
    const example = screen.getByTestId("option-disabled");
    for (const type of ["radio", "checkbox"] as const) {
      const [unselected, selected] = within(example).getAllByRole(type);
      expect(unselected).toBeDisabled();
      expect(selected).toBeDisabled();
      expect(unselected).not.toBeChecked();
      expect(selected).toBeChecked();
      await user.click(unselected!);
      await user.click(selected!);
      expect(unselected).not.toBeChecked();
      expect(selected).toBeChecked();
    }
  });

  it("switches all previews together to the dark theme", async () => {
    const user = userEvent.setup();
    openPage();
    await user.click(within(screen.getByRole("group", { name: "预览主题" })).getByRole("button", { name: "深色" }));
    expect(screen.getByRole("main")).toHaveAttribute("data-rain-theme", "dark");
    expect(screen.getByText("基础选择 32 px · 视觉已验收")).toBeVisible();
    expect(screen.getByText("结果与内容组合 · 验收已完成")).toBeVisible();
  });

  it("shows only selected results and keeps reviewed row answers unchanged", async () => {
    const user = userEvent.setup();
    openPage();
    const standalone = screen.getByTestId("option-result-standalone");
    expect(within(standalone).getByRole("radio", { name: "A" })).toHaveAccessibleDescription(/回答正确/);
    expect(within(standalone).getByRole("radio", { name: "B" })).toHaveAccessibleDescription(/回答错误/);
    const rows = screen.getByTestId("option-result-rows");
    const selected = within(rows).getByRole("radio", { name: /^A/ });
    expect(selected).toBeChecked();
    expect(selected).not.toBeDisabled();
    await user.click(within(rows).getByRole("radio", { name: /^B/ }));
    expect(selected).toBeChecked();
    expect(within(rows).getByRole("radio", { name: /^B/ })).not.toBeChecked();
    expect(selected).toHaveAccessibleDescription(/回答错误/);
    expect(within(rows).getByRole("radio", { name: /^B/ })).not.toHaveAccessibleDescription(/回答正确|回答错误/);
    const multiple = screen.getByTestId("option-result-multiple");
    expect(within(multiple).getByRole("checkbox", { name: "A" })).toHaveAccessibleDescription(/回答正确/);
    expect(within(multiple).getByRole("checkbox", { name: "B" })).toHaveAccessibleDescription(/回答错误/);
    expect(within(multiple).getByRole("checkbox", { name: "C" })).not.toHaveAccessibleDescription(/回答正确|回答错误/);
  });

  it("keeps reviewed result descriptions hidden without adding a separate result icon", () => {
    openPage();
    const standalone = screen.getByTestId("option-result-standalone");
    for (const input of within(standalone).getAllByRole("radio")) {
      const option = input.closest('[data-rain-id="ui-option-button"]')!;
      const description = option.querySelector('[data-slot="feedback"]');
      expect(description).toHaveClass("sr-only");
      expect(description?.querySelector("[data-icon]")).toBeNull();
    }
  });

  it("does not reveal results before publication or when no answer exists", () => {
    openPage();
    const hidden = screen.getByTestId("option-result-hidden");
    expect(within(hidden).getByRole("radio", { name: "A" })).toBeChecked();
    expect(hidden.querySelector('[data-slot="feedback"]')).not.toBeInTheDocument();
    const unanswered = screen.getByTestId("option-result-unanswered");
    expect(within(unanswered).getAllByRole("radio").every((input) => !(input as HTMLInputElement).checked)).toBe(true);
    expect(within(unanswered).getByText("未作答")).toBeVisible();
    expect(unanswered.querySelector('[data-slot="feedback"]')).not.toBeInTheDocument();
  });

  it("keeps judgment content separate from its reviewed result", async () => {
    const user = userEvent.setup();
    openPage();
    const active = screen.getByTestId("option-judgment");
    await user.click(within(active).getByRole("radio", { name: "错" }));
    expect(within(active).getByRole("radio", { name: "错" })).toBeChecked();
    expect(active.querySelector('[data-slot="feedback"]')).not.toBeInTheDocument();
    const review = screen.getByTestId("option-judgment-review");
    await user.click(within(review).getByRole("radio", { name: "对" }));
    expect(within(review).getByRole("radio", { name: "错" })).toBeChecked();
    expect(within(review).getByRole("radio", { name: "错" })).toHaveAccessibleDescription(/回答错误/);
  });

  it("selects the owning media option through either its image or its text", async () => {
    const user = userEvent.setup();
    openPage();
    const media = screen.getByTestId("option-media");
    const curve = within(media).getByRole("img", { name: "曲线先下降后上升，形成开口向上的抛物线" });
    await user.click(curve);
    expect(within(media).getByRole("radio", { name: /^B/ })).toBeChecked();
    expect(within(media).getByRole("radio", { name: /^A/ })).not.toBeChecked();
    expect(within(media).getByRole("status")).toHaveTextContent("已选 B");
    await user.click(within(media).getByText("图 A：沿直线持续上升。"));
    expect(within(media).getByRole("radio", { name: /^A/ })).toBeChecked();
    expect(within(media).getByRole("radio", { name: /^B/ })).not.toBeChecked();
    expect(within(media).getByRole("status")).toHaveTextContent("已选 A");
  });
});
