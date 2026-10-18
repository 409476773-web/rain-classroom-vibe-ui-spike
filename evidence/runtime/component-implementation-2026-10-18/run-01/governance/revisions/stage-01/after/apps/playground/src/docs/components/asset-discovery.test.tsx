import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { AssetDiscovery } from "./asset-discovery";

afterEach(() => { cleanup(); window.location.hash = ""; });
it("searches legacy document names without inventing a public Label export", () => {
  window.location.hash = "#components?q=Label&asset=ui-form-item";
  render(<AssetDiscovery />);
  expect(screen.getByRole("textbox", { name: "查找组件名称或旧称" })).toHaveValue("Label");
  expect(screen.getByRole("link", { name: "查看规范：FormItem" })).toBeVisible();
  const details = document.querySelector('[data-canonical-asset="ui-form-item"]')!;
  expect(details.textContent).toContain('import { FormItem } from "@rain-next/ui"');
  expect(details.textContent).not.toContain('import { Label }');
});
it("provides a real empty result and preserves local identities in the complete catalogue", () => {
  render(<AssetDiscovery />);
  expect(screen.getByRole("link", { name: "查看规范：Button" }).closest("li")?.textContent).toContain("本地实验");
  fireEvent.change(screen.getByRole("textbox", { name: "查找组件名称或旧称" }), { target: { value: "不存在的需求zzzz" } });
  expect(screen.getByRole("status", { name: "选型结果" })).toHaveTextContent("0 项结果");
  expect(screen.getByText("没有匹配项。可清除名称或切换任务与家族。")).toBeVisible();
});
it("tracks hash changes and exposes navigation state ownership and meaningful alternatives", async () => {
  window.location.hash = "#components?asset=ui-navigation-tabs";
  render(<AssetDiscovery />);
  const details = document.querySelector('[data-canonical-asset="ui-navigation-tabs"]')!;
  expect(details.textContent).toContain("唯一 value");
  expect(within(details as HTMLElement).getByRole("link", { name: "NavigationBar" })).toHaveAttribute("href", "#components?asset=ui-navigation-bar");
  await act(async () => { window.location.hash = "#components?asset=ui-segmented-control"; fireEvent(window, new HashChangeEvent("hashchange")); });
  expect(document.querySelector('[data-canonical-asset="ui-navigation-tabs"]')).toBeNull();
  expect(document.querySelector('[data-canonical-asset="ui-segmented-control"]')?.textContent).toContain("RadioGroup");
});

it("retains query and task context in canonical and neighbor links", () => {
  window.location.hash = "#components?q=Navigation&task=navigate&asset=ui-navigation-tabs";
  render(<AssetDiscovery />);
  const details = document.querySelector('[data-canonical-asset="ui-navigation-tabs"]')!;
  expect(within(details as HTMLElement).getByRole("link", { name: "NavigationBar" })).toHaveAttribute("href", "#components?q=Navigation&task=navigate&asset=ui-navigation-bar");
});

it.each(["未批改", "保存成功", "NavigationTabs.Nav", "teacher-grading"])("finds actual task or API phrase %s", query => {
  window.location.hash = `#components?q=${encodeURIComponent(query)}`;
  render(<AssetDiscovery />);
  expect(screen.getByRole("status", { name: "选型结果" })).not.toHaveTextContent(/^0 项/);
});
it("ranks an explicit legacy Field name before incidental text matches", () => {
  window.location.hash = "#components?q=Field";
  render(<AssetDiscovery />);
  expect(document.querySelector(".asset-results li h3")?.textContent).toBe("FormItem");
});
