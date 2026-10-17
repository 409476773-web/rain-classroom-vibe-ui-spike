import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
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
  navigate("#icon-button");
  return render(<App />);
}

afterEach(() => {
  cleanup();
  window.history.replaceState(null, "", "#overview");
});

describe("IconButton designer playground", () => {
  it("makes the component and shared icon sizes discoverable from their own directories", () => {
    navigate("#components");
    render(<App />);
    expect(screen.getByRole("link", { name: "体验 IconButton 图标按钮" })).toHaveAttribute("href", "#icon-button");
    navigate("#icon-button");
    expect(screen.getByRole("heading", { name: "图标按钮，让紧凑操作更清楚", level: 1 })).toHaveFocus();
    navigate("#foundations");
    expect(screen.getByRole("link", { name: "查看公共图标尺寸 IconSize" })).toHaveAttribute("href", "#icon-sizes");
    navigate("#icon-sizes");
    expect(screen.getByRole("heading", { name: "公共图标尺寸", level: 2 })).toHaveFocus();
  });

  it("shows all eighteen size combinations and fifteen shared icon sizes", () => {
    openPage();
    const sizes = screen.getByTestId("icon-button-size-matrix");
    expect(sizes.querySelectorAll('[data-rain-id="ui-icon-button"]')).toHaveLength(18);
    expect(sizes.querySelector('[data-size="18/11"]')).toBeInTheDocument();
    expect(sizes.querySelector('[data-size="36/20"]')).toBeInTheDocument();
    expect(screen.getByTestId("icon-size-matrix").querySelectorAll('[data-icon-size]')).toHaveLength(15);
    expect(screen.getByTestId("icon-button-density-compact").querySelector('[data-rain-id="ui-icon-button"]')).toHaveAttribute("data-size", "32/18");
    expect(screen.getByTestId("icon-button-density-default").querySelector('[data-rain-id="ui-icon-button"]')).toHaveAttribute("data-size", "36/20");
  });

  it("uses the seven confirmed mark pairs, including the unchanged top-pinning glyph", async () => {
    const user = userEvent.setup();
    openPage();
    for (const [label, resting, marked] of [
      ["星标收藏课程", "rating-star", "rating-star-100"],
      ["收藏课程", "favorite", "favorite-filled"],
      ["点赞课程", "like", "like-filled"],
      ["不喜欢课程", "dislike", "dislike-filled"],
      ["为课程鼓掌", "like-alt-2", "like-alt"],
      ["置顶课程", "pin-top-alt-2", "pin-top-alt-2"],
      ["固定课程", "pin", "pin-top-alt"],
    ]) {
      const button = screen.getByRole("button", { name: label });
      expect(button).toHaveAttribute("aria-pressed", "false");
      expect(button.querySelector(`[data-icon="icon/${resting}"]`)).toBeInTheDocument();
      await user.click(button);
      expect(button).toHaveAttribute("aria-pressed", "true");
      expect(button).toHaveAttribute("data-highlight", "icon");
      expect(button).not.toHaveAttribute("aria-expanded");
      expect(button.querySelector(`[data-icon="icon/${marked}"]`)).toBeInTheDocument();
      await user.click(button);
      expect(button).toHaveAttribute("aria-pressed", "false");
      expect(button).toHaveAttribute("data-highlight", "none");
      expect(button.querySelector(`[data-icon="icon/${resting}"]`)).toBeInTheDocument();
    }
    expect(screen.queryByText(/置顶图形的成对选择仍待核实/)).not.toBeInTheDocument();
  });

  it("keeps top-pinning, fixing and directory actions independent", async () => {
    const user = userEvent.setup();
    openPage();
    const top = screen.getByRole("button", { name: "置顶课程" });
    const pin = screen.getByRole("button", { name: "固定课程" });
    await user.click(top);
    expect(pin).toHaveAttribute("aria-pressed", "false");
    expect(top.querySelector('[data-icon="icon/pin-top-alt-2"]')).toBeInTheDocument();
    await user.click(pin);
    expect(pin.querySelector('[data-icon="icon/pin-top-alt"]')).toBeInTheDocument();
    const directory = screen.getByRole("button", { name: "展开课程目录" });
    expect(directory.querySelector('[data-icon="icon/expand"]')).toBeInTheDocument();
    await user.click(directory);
    expect(directory).toHaveAccessibleName("收起课程目录");
    expect(directory).toHaveAttribute("aria-expanded", "true");
    expect(directory).not.toHaveAttribute("aria-pressed");
    expect(directory).toHaveAttribute("data-highlight", "surface");
    expect(directory.querySelector('[data-icon="icon/collapse"]')).toBeInTheDocument();
    expect(document.getElementById(directory.getAttribute("aria-controls")!)).toBeVisible();
    await user.click(directory);
    expect(directory).toHaveAccessibleName("展开课程目录");
    expect(directory).toHaveAttribute("aria-expanded", "false");
    expect(directory).toHaveAttribute("data-highlight", "none");
    expect(document.getElementById(directory.getAttribute("aria-controls")!)).not.toBeVisible();
    expect(top).toHaveAttribute("aria-pressed", "true");
    expect(pin).toHaveAttribute("aria-pressed", "true");
  });

  it("shows four filter combinations and does not clear applied filters when the panel closes", async () => {
    const user = userEvent.setup();
    openPage();
    for (const [key, applied, open] of [["00", false, false], ["01", false, true], ["10", true, false], ["11", true, true]] as const) {
      const trigger = within(screen.getByTestId(`icon-button-filter-${key}`)).getByRole("button", { name: "筛选课程" });
      expect(trigger).toHaveAttribute("aria-expanded", String(open));
      expect(trigger).not.toHaveAttribute("aria-pressed");
      expect(trigger.querySelector(`[data-icon="icon/filter${applied ? "-filled" : ""}"]`)).toBeInTheDocument();
    }
    const fixture = screen.getByTestId("icon-button-filter-11");
    const filter = within(fixture).getByRole("button", { name: "筛选课程" });
    await user.click(filter);
    expect(filter).toHaveAttribute("aria-expanded", "false");
    expect(filter.querySelector('[data-icon="icon/filter-filled"]')).toBeInTheDocument();
    expect(within(fixture).getByText("已筛选 · 已收起")).toBeVisible();
  });

  it("keeps a loading button focused and restores the latest host-selected icon", async () => {
    const user = userEvent.setup();
    openPage();
    const button = screen.getByTestId("icon-button-loading-action");
    button.focus();
    fireEvent.click(screen.getByRole("checkbox", { name: "加载中" }));
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button.querySelector('[data-slot="loading-indicator"]')).toBeInTheDocument();
    await user.click(screen.getByRole("checkbox", { name: "加载期间更新收藏结果" }));
    fireEvent.click(button);
    expect(screen.getByTestId("icon-button-loading-status")).toHaveTextContent("触发 0 次");
    await user.click(screen.getByRole("checkbox", { name: "加载中" }));
    expect(button.querySelector('[data-icon="icon/favorite-filled"]')).toBeInTheDocument();
    await user.click(screen.getByRole("checkbox", { name: "操作不可用" }));
    await user.click(screen.getByRole("checkbox", { name: "加载中" }));
    expect(button).toBeDisabled();
    expect(button.querySelector('[data-slot="loading-indicator"]')).toBeInTheDocument();
  });

  it("isolates the table action from row activation for pointer and keyboard", async () => {
    const user = userEvent.setup();
    openPage();
    const row = screen.getByTestId("icon-button-table-row");
    fireEvent.click(row);
    expect(screen.getByTestId("icon-button-row-status")).toHaveTextContent("打开课程 1 次 · 编辑 0 次");
    const edit = within(row).getByRole("button", { name: "编辑第一章" });
    await user.click(edit);
    expect(screen.getByTestId("icon-button-row-status")).toHaveTextContent("打开课程 1 次 · 编辑 1 次");
    edit.focus();
    await user.keyboard(" ");
    expect(screen.getByTestId("icon-button-row-status")).toHaveTextContent("打开课程 1 次 · 编辑 2 次");
  });

  it("composes Input trailingAction without hiding or stealing its keyboard target", async () => {
    const user = userEvent.setup();
    openPage();
    const input = screen.getByRole("textbox", { name: "课程关键词" });
    const action = screen.getByRole("button", { name: "搜索课程" });
    expect(action.closest('[data-slot="trailing-action"]')).toBeInTheDocument();
    await user.type(input, "函数");
    await user.tab();
    expect(input.closest('[data-rain-id="ui-input"]')!.querySelector('[data-slot="clear-action"]')).toHaveFocus();
    await user.tab();
    expect(action).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByTestId("icon-button-input-status")).toHaveTextContent("正在查看“函数”的演示结果");
    expect(action).toHaveFocus();
  });
});
