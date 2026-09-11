import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../../app";

function navigateHash(hash: string) {
  act(() => {
    window.history.pushState(null, "", hash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
}

function getInputExample(name: string) {
  const group = screen.getByRole("group", { name });
  return {
    group,
    input: within(group).getByRole("textbox"),
    action: within(group).getByRole("button", { name: "检查" }),
    status: within(group).getByRole("status"),
  };
}

describe("TextButton interactive review page", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "#text-button");
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    window.history.replaceState(null, "", "#overview");
  });

  it("routes directly to six honest review sections without a platform shell", () => {
    const { container } = render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "TextButton 文字按钮" }))
      .toHaveAttribute("id", "text-button-title");
    expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute("tabindex", "-1");
    expect(screen.getByText("最新配方 · 视觉验收已通过")).toBeVisible();
    expect(screen.getByText("演示数据，不会连接后台或修改课程")).toBeVisible();
    for (const name of ["颜色与状态", "三档尺寸", "图标组合", "试试加载", "放进输入框", "真正的链接"]) {
      expect(screen.getByRole("region", { name })).toBeVisible();
    }
    expect(container.querySelector('[data-rain-id="text-button-page"]'))
      .toHaveAttribute("data-asset-identity", "local-experiment");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(screen.getByText(/20.*24.*26.*已确认/)).toBeVisible();
    expect(screen.getByText("禁用淡化与双层键盘焦点已通过视觉验收。")).toBeVisible();
  });

  it("starts keyboard navigation at the return and Token review links then a text action", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.tab();
    expect(screen.getByRole("link", { name: "返回组件页" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "查看主题、状态与尺寸对照" })).toHaveFocus();
    await user.tab();
    expect(document.activeElement).toHaveAttribute("data-variant", "text");
    expect(document.activeElement).toHaveAttribute("data-state", "default");
  });

  it("adds only a native Core UI entry and preserves route heading focus", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("link", { name: "返回组件页" }));
    const coreHeading = await screen.findByRole("heading", { level: 1, name: "Core UI，把高频动作先做准" });
    expect(coreHeading).toHaveFocus();
    const entry = screen.getByRole("link", { name: "体验 TextButton 文字按钮" });
    expect(entry).toHaveAttribute("href", "#text-button");
    expect(entry).toHaveAttribute("data-rain-id", "ui-link");
    await user.click(entry);
    expect(await screen.findByRole("heading", { level: 1, name: "TextButton 文字按钮" })).toHaveFocus();
  });

  it.each([
    ["普通灰蓝", "default"],
    ["突出主题蓝", "brand"],
    ["危险红", "danger"],
  ])("provides one default, disabled and loading %s action with local feedback", (name, tone) => {
    render(<App />);
    const region = screen.getByRole("region", { name: "颜色与状态" });
    const group = within(region).getByRole("group", { name });
    const buttons = within(group).getAllByRole("button");
    expect(buttons).toHaveLength(3);
    for (const button of buttons) {
      expect(button).toHaveAttribute("data-variant", "text");
      expect(button).toHaveAttribute("data-tone", tone);
    }
    const active = group.querySelector('button[data-state="default"]')!;
    const disabled = group.querySelector('button[data-state="disabled"]')!;
    const loading = group.querySelector('button[data-state="loading"]')!;
    expect(disabled).toBeDisabled();
    expect(loading).toHaveAttribute("aria-busy", "true");
    fireEvent.click(active);
    const feedback = within(region).getByRole("status");
    expect(feedback).toHaveTextContent(name);
    expect(feedback).toHaveTextContent("已触发 1 次");
    fireEvent.click(disabled);
    fireEvent.click(loading);
    expect(feedback).toHaveTextContent("已触发 1 次");
  });

  it("labels feedback as the section total when different colors are activated", () => {
    render(<App />);
    const region = screen.getByRole("region", { name: "颜色与状态" });
    for (const name of ["普通灰蓝", "突出主题蓝"]) {
      const group = within(region).getByRole("group", { name });
      fireEvent.click(group.querySelector('button[data-state="default"]')!);
    }
    expect(within(region).getByRole("status")).toHaveTextContent(
      "最近操作：突出主题蓝；本区已触发 2 次，仅本地演示。",
    );
  });

  it.each([
    ["small", "小号"],
    ["compact", "紧凑号"],
    ["regular", "常规号"],
  ])("shows one %s size with working feedback", (size, name) => {
    render(<App />);
    const region = screen.getByRole("region", { name: "三档尺寸" });
    const buttons = within(region).getAllByRole("button");
    expect(buttons).toHaveLength(3);
    const button = region.querySelector(`button[data-size="${size}"]`)!;
    expect(button).toHaveAttribute("data-variant", "text");
    fireEvent.click(button);
    expect(within(region).getByRole("status")).toHaveTextContent(name);
    expect(within(region).getByRole("status")).toHaveTextContent("已触发 1 次");
  });

  it("uses the confirmed public edit and disclosure assets without page-private drawings", () => {
    render(<App />);
    const region = screen.getByRole("region", { name: "图标组合" });
    const buttons = within(region).getAllByRole("button");
    expect(buttons).toHaveLength(4);
    for (const [index, count] of [0, 1, 1, 2].entries()) {
      expect(buttons[index]!.querySelectorAll('[data-rain-id="icon"]')).toHaveLength(count);
    }
    const allIcons = region.querySelectorAll('[data-rain-id="icon"]');
    expect(allIcons.length).toBeGreaterThan(0);
    for (const icon of allIcons) {
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(icon).not.toHaveAttribute("tabindex");
    }
    expect(region.querySelectorAll('svg, [data-icon="edit"], [data-icon="chevron-right"]')).toHaveLength(0);
    expect(buttons[1]!.querySelector('[data-icon="icon/edit-pencil"]')).not.toBeNull();
    expect(buttons[2]!.querySelector('[data-icon="icon/double-arrow-down"]')).not.toBeNull();
    expect(buttons[3]!.querySelector('[data-icon="icon/arrow-down"]')).not.toBeNull();
  });

  it("changes both explicit disclosure copy and the corresponding formal direction", () => {
    render(<App />);
    const region = screen.getByRole("region", { name: "图标组合" });
    const disclosure = within(region).getByRole("button", { name: "展开说明" });
    fireEvent.click(disclosure);
    expect(disclosure).toHaveAccessibleName("收起说明");
    expect(disclosure.querySelector('[data-icon="icon/double-arrow-up"]')).not.toBeNull();
    fireEvent.click(disclosure);
    expect(disclosure).toHaveAccessibleName("展开说明");
    expect(disclosure.querySelector('[data-icon="icon/double-arrow-down"]')).not.toBeNull();
    const options = within(region).getByRole("button", { name: "编辑选项" });
    fireEvent.click(options);
    expect(options.querySelector('[data-icon="icon/arrow-up"]')).not.toBeNull();
  });

  it("makes all four icon compositions work and exposes disclosure as one click target", () => {
    render(<App />);
    const region = screen.getByRole("region", { name: "图标组合" });
    const buttons = within(region).getAllByRole("button");
    for (const button of buttons.slice(0, 2)) {
      fireEvent.click(button);
      expect(within(region).getByRole("status")).toHaveTextContent(button.textContent!);
    }
    for (const button of buttons.slice(2)) {
      expect(button).toHaveAttribute("aria-expanded", "false");
      const disclosure = document.getElementById(button.getAttribute("aria-controls")!);
      expect(disclosure).not.toBeVisible();
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(disclosure).toBeVisible();
      expect(within(region).getByRole("status")).toHaveTextContent("已展开");
      fireEvent.click(button);
      expect(disclosure).not.toBeVisible();
      expect(within(region).getByRole("status")).toHaveTextContent("已收起");
      expect(button.querySelectorAll('button, a, [tabindex="0"]')).toHaveLength(0);
    }
  });

  it("switches all four compositions into loading for comparison then restores their icons", () => {
    render(<App />);
    const region = screen.getByRole("region", { name: "图标组合" });
    const toggle = within(region).getByRole("checkbox", { name: "对比加载前后" });
    const buttons = within(region).getAllByRole("button");
    const names = buttons.map((button) => button.textContent);
    fireEvent.click(toggle);
    expect(within(region).getByRole("status")).toHaveTextContent("加载状态对比");
    for (const [index, button] of buttons.entries()) {
      expect(button).toHaveAttribute("data-state", "loading");
      expect(button.textContent).toBe(names[index]);
      expect(button.querySelectorAll('[data-slot="loading-indicator"]')).toHaveLength(1);
      expect(button.querySelectorAll('[data-slot="leading-icon"], [data-slot="trailing-icon"]')).toHaveLength(0);
      fireEvent.click(button);
    }
    expect(within(region).getByRole("status")).toHaveTextContent("加载状态对比");
    fireEvent.click(toggle);
    for (const [index, count] of [0, 1, 1, 2].entries()) {
      expect(buttons[index]).toHaveAttribute("data-state", "default");
      expect(buttons[index]!.querySelectorAll('[data-rain-id="icon"]')).toHaveLength(count);
    }
    expect(within(region).getByRole("status")).toHaveTextContent("已恢复");
  });

  it("runs exactly two seconds, keeps the export name and focus, and rejects repeats", () => {
    vi.useFakeTimers();
    render(<App />);
    const region = screen.getByRole("region", { name: "试试加载" });
    const button = within(region).getByRole("button", { name: "导出演示数据" });
    const status = within(region).getByRole("status");
    button.focus();
    act(() => {
      fireEvent.click(button);
      fireEvent.click(button);
    });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).not.toBeDisabled();
    expect(button).toHaveAccessibleName("导出演示数据");
    expect(button).toHaveFocus();
    expect(status).toHaveTextContent("已触发 1 次");
    expect(button.querySelector('[data-slot="trailing-icon"]')).toBeNull();
    act(() => vi.advanceTimersByTime(1999));
    expect(button).toHaveAttribute("data-state", "loading");
    fireEvent.click(button);
    expect(status).toHaveTextContent("已触发 1 次");
    act(() => vi.advanceTimersByTime(1));
    expect(button).toHaveAttribute("data-state", "default");
    expect(status).toHaveTextContent("已完成 1 次");
    expect(button).toHaveFocus();
    fireEvent.click(button);
    expect(status).toHaveTextContent("已触发 2 次");
    act(() => vi.advanceTimersByTime(2000));
    expect(status).toHaveTextContent("已完成 2 次");
  });

  it.each([
    ["常规输入框", "default", "regular"],
    ["紧凑输入框", "compact", "compact"],
  ])("keeps the %s action in place and respects its context density", async (name, density, size) => {
    const user = userEvent.setup();
    render(<App />);
    const { input, action, group } = getInputExample(name);
    expect(input).toHaveAccessibleName();
    expect(input).toHaveValue("");
    expect(action).toBeVisible();
    expect(action).toBeDisabled();
    expect(action).toHaveAttribute("data-density", density);
    expect(action).toHaveAttribute("data-size", size);
    expect(input.closest('[data-rain-id="ui-input"]')).toHaveAttribute("data-density", density);
    await user.type(input, "课堂示例");
    expect(action).toBeEnabled();
    const clear = group.querySelector('[data-slot="clear-action"]');
    expect(clear).toBeInTheDocument();
    await user.tab();
    expect(clear).toHaveFocus();
    await user.tab();
    expect(action).toHaveFocus();
    await user.clear(input);
    expect(action).toBeDisabled();
    expect(action).toBeVisible();
    expect(within(group).getAllByRole("button")).toHaveLength(1);
  });

  it("can disable both input actions without disabling or removing either input", () => {
    render(<App />);
    const region = screen.getByRole("region", { name: "放进输入框" });
    for (const name of ["常规输入框", "紧凑输入框"]) {
      const { input, action } = getInputExample(name);
      fireEvent.change(input, { target: { value: "有内容" } });
      expect(action).toBeEnabled();
    }
    fireEvent.click(within(region).getByRole("checkbox", { name: "模拟暂不可用" }));
    for (const name of ["常规输入框", "紧凑输入框"]) {
      const { input, action, status } = getInputExample(name);
      expect(input).toBeEnabled();
      expect(action).toBeDisabled();
      expect(action).toBeVisible();
      fireEvent.click(action);
      fireEvent.keyDown(input, { key: "Enter" });
      expect(status).not.toHaveTextContent("已触发 1 次");
      fireEvent.change(input, { target: { value: "依然可以编辑" } });
      expect(input).toHaveValue("依然可以编辑");
    }
    fireEvent.click(within(region).getByRole("checkbox", { name: "模拟暂不可用" }));
    for (const action of within(region).getAllByRole("button", { name: "检查" })) {
      expect(action).toBeEnabled();
    }
  });

  it.each(["常规输入框", "紧凑输入框"])("uses existing Enter and IME protection for %s", (name) => {
    vi.useFakeTimers();
    render(<App />);
    const { input, action, status } = getInputExample(name);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(action).not.toHaveAttribute("aria-busy", "true");
    fireEvent.compositionStart(input);
    fireEvent.change(input, { target: { value: "课堂" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(action).not.toHaveAttribute("aria-busy", "true");
    fireEvent.compositionEnd(input);
    fireEvent.keyDown(input, { key: "Enter", isComposing: true });
    expect(action).not.toHaveAttribute("aria-busy", "true");
    input.focus();
    fireEvent.keyDown(input, { key: "Enter" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(status).toHaveTextContent("已触发 1 次");
    expect(action).toHaveAttribute("aria-busy", "true");
    expect(input).toHaveFocus();
    act(() => vi.advanceTimersByTime(2000));
    expect(status).toHaveTextContent("已完成 1 次");
    expect(status).toHaveTextContent("课堂");
  });

  it.each(["常规输入框", "紧凑输入框"])("reports the trigger-time snapshot for %s while editing remains available", (name) => {
    vi.useFakeTimers();
    render(<App />);
    const { input, action, status } = getInputExample(name);
    fireEvent.change(input, { target: { value: "检查当时的内容" } });
    action.focus();
    fireEvent.click(action);
    expect(action).toHaveFocus();
    expect(input).toBeEnabled();
    fireEvent.change(input, { target: { value: "等待时新输入的内容" } });
    fireEvent.keyDown(input, { key: "Enter" });
    act(() => vi.advanceTimersByTime(1999));
    expect(action).toHaveAttribute("aria-busy", "true");
    act(() => vi.advanceTimersByTime(1));
    expect(status).toHaveTextContent("检查当时的内容");
    expect(status).toHaveTextContent("触发时");
    expect(status).not.toHaveTextContent("等待时新输入的内容");
    expect(input).toHaveValue("等待时新输入的内容");
    expect(action).toHaveFocus();
  });

  it("clears export and both input demonstration timers on unmount", () => {
    vi.useFakeTimers();
    const { unmount } = render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "导出演示数据" }));
    for (const name of ["常规输入框", "紧凑输入框"]) {
      const { input, action } = getInputExample(name);
      fireEvent.change(input, { target: { value: "演示" } });
      fireEvent.click(action);
    }
    expect(vi.getTimerCount()).toBe(3);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
    act(() => vi.advanceTimersByTime(2000));
  });

  it("preserves native same-page, inline and safely labelled new-tab links", async () => {
    const user = userEvent.setup();
    render(<App />);
    const region = screen.getByRole("region", { name: "真正的链接" });
    const standalone = within(region).getByRole("link", { name: "打开演示帮助" });
    expect(standalone).toHaveAttribute("href", "#text-button-help");
    expect(standalone).not.toHaveAttribute("target");
    const inline = within(region).getByRole("link", { name: "阅读使用说明" });
    expect(inline).toHaveAttribute("data-variant", "inline");
    expect(inline.closest("p")).not.toBeNull();
    const separate = within(region).getByRole("link", { name: "另开帮助（新标签页打开）" });
    expect(separate).toHaveAttribute("href", "#text-button-help");
    expect(separate).toHaveAttribute("target", "_blank");
    expect(separate).toHaveAttribute("rel", "noopener noreferrer");
    expect(within(region).queryByRole("button")).not.toBeInTheDocument();
    await user.click(standalone);
    const heading = await screen.findByRole("heading", { level: 1, name: "TextButton 演示帮助" });
    expect(heading).toHaveAttribute("id", "text-button-help-title");
    expect(heading).toHaveFocus();
    navigateHash("#text-button");
    expect(screen.getByRole("heading", { level: 1, name: "TextButton 文字按钮" })).toHaveFocus();
  });

  it("provides a complete longer action with real local feedback in the narrow example", () => {
    render(<App />);
    const region = screen.getByRole("region", { name: "完整文字与窄空间" });
    const action = within(region).getByRole("button", { name: "为本课程重新生成课堂练习" });
    expect(action).toHaveAttribute("data-variant", "text");
    fireEvent.click(action);
    expect(within(region).getByRole("status")).toHaveTextContent("已触发 1 次");
    expect(within(region).getByRole("status")).toHaveTextContent("没有生成或修改课程练习");
    fireEvent.click(action);
    expect(within(region).getByRole("status")).toHaveTextContent("已触发 2 次");
    expect(action).toHaveAccessibleName("为本课程重新生成课堂练习");
  });

  it("keeps the long narrow-space explanation a native inline link to local help", () => {
    render(<App />);
    const region = screen.getByRole("region", { name: "完整文字与窄空间" });
    const link = within(region).getByRole("link", { name: "了解课堂练习的生成方式与使用注意事项" });
    expect(link).toHaveAttribute("href", "#text-button-help");
    expect(link).toHaveAttribute("data-rain-id", "ui-link");
    expect(link).toHaveAttribute("data-variant", "inline");
    expect(link).not.toHaveAttribute("target");
    expect(link.closest("p")).not.toBeNull();
  });

  it("supports a direct help route and an actual return link", async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, "", "#text-button-help");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "TextButton 演示帮助" })).toHaveAttribute("tabindex", "-1");
    const back = screen.getByRole("link", { name: "返回 TextButton 验收页" });
    expect(back).toHaveAttribute("href", "#text-button");
    await user.click(back);
    expect(await screen.findByRole("heading", { level: 1, name: "TextButton 文字按钮" })).toHaveFocus();
  });
});
