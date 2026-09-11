import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { ColorPanel } from "./color-panel";
import { colorRegistry } from "@rain-next/foundations";

describe("ColorPanel", () => {
  it("searches by hue and role, preserves selected details and clears to the complete catalogue", async () => {
    render(createElement(ColorPanel));
    const search = screen.getByRole("searchbox", { name: "搜索颜色" });
    await userEvent.type(search, "蓝紫");
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "颜色用途" }), "Fill");
    expect(screen.getAllByRole("button", { name: /^Fill\// })).toHaveLength(4);
    await userEvent.click(screen.getByRole("button", { name: "Dark Fill/TagPurple/Alpha/1" }));
    const detail = screen.getByRole("region", { name: "颜色详情" });
    expect(detail).toHaveTextContent("蓝紫");
    expect(detail).toHaveTextContent("bg-rain-category-fill-tagpurple-alpha-1");
    await userEvent.click(within(detail).getByRole("button", { name: "预览此色组配对" }));
    const preview = screen.getByRole("region", { name: "Fill 前景配对预览" });
    expect(within(preview).getByRole("combobox", { name: "色系" })).toHaveValue("TagPurple");
    expect(within(preview).getByRole("combobox", { name: "文字颜色" })).toHaveValue("Text/Neutral/1");
    expect(preview).toHaveTextContent("文字用途校验：通过");
    expect(preview).toHaveTextContent("新页面实际使用尚未验证");
    await userEvent.selectOptions(within(preview).getByRole("combobox", { name: "填充背景" }), "Fill/TagPurple/Alpha/2");
    expect(preview).toHaveTextContent("文字用途校验：需补充条件");
    await userEvent.selectOptions(within(preview).getByRole("combobox", { name: "色系" }), "TagGold");
    await userEvent.click(within(detail).getByRole("button", { name: "预览此色组配对" }));
    const resetPreview = screen.getByRole("region", { name: "Fill 前景配对预览" });
    expect(within(resetPreview).getByRole("combobox", { name: "填充背景" })).toHaveValue("Fill/TagPurple/Alpha/1");
    expect(within(resetPreview).getByRole("heading", { name: "Fill 前景配对预览" })).toHaveFocus();
    await userEvent.click(screen.getByRole("button", { name: "清空筛选" }));
    expect(screen.getAllByRole("button", { name: /^(Text|Icon|Border|Background|Fill|OnColor)\// })).toHaveLength(colorRegistry.length);
    expect(detail).toHaveTextContent("Fill/TagPurple/Alpha/1");
    await userEvent.type(search, "不存在的色组");
    expect(screen.getByText("没有匹配的颜色，请换一个色名、业务名称或 Token ID。")).toBeVisible();
  });

  it("does not present a numerically passing OnColor preview as an eligible page use", async () => {
    render(createElement(ColorPanel));
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "预览主题" }), "dark");
    const preview = screen.getByRole("region", { name: "Fill 前景配对预览" });
    await userEvent.selectOptions(within(preview).getByRole("combobox", { name: "色系" }), "TagPurple");
    expect(preview).toHaveTextContent("文字 4.60 : 1 · 满足 4.5 : 1");
    expect(preview).toHaveTextContent("文字用途校验：未通过");
    expect(preview).toHaveTextContent("OnColor needs an explicit surface Recipe context");
  });
  it("offers every stable ID in paired Text/Icon and category matrices", () => {
    render(createElement(ColorPanel));
    expect(screen.getAllByRole("button", { name: /^(Text|Icon|Border|Background|Fill|OnColor)\// })).toHaveLength(colorRegistry.length);
    expect(screen.getAllByRole("button", { name: /^Dark (Text|Icon|Border|Background|Fill|OnColor)\// })).toHaveLength(colorRegistry.length);
    for (const id of ["Text/TagEnded/2", "Icon/TagReminder/1", "Icon/TagNeutralSolid/1"]) expect(screen.getByRole("button", { name: id })).toBeVisible();
    expect(screen.queryByText("Unconfigured")).not.toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Text + Icon / Neutral" })).toHaveTextContent("Icon/Neutral/3");
    for (const family of ["Second", "Orange", "Green", "Red"]) {
      expect(screen.getByRole("table", { name: `Text + Icon / ${family}` })).toHaveTextContent(`Icon/${family}/2`);
    }
  });

  it("shows the selected token's actual source", async () => {
    render(createElement(ColorPanel));
    const detail = screen.getByRole("region", { name: "颜色详情" });
    expect(detail).toHaveTextContent("docs/plans/2026-09-05-color-token-governance-design.md#4");
    await userEvent.click(screen.getByRole("button", { name: "Text/Second/2" }));
    expect(detail).toHaveTextContent("docs/plans/2026-09-06-color-family-supplement-design.md#2");
  });

  it("limits strong fills to OnColor and keeps insufficient samples visible with a warning", async () => {
    const { container } = render(createElement(ColorPanel));
    const preview = screen.getByRole("region", { name: "Fill 前景配对预览" });
    const textSelect = within(preview).getByRole("combobox", { name: "文字颜色" });
    const iconSelect = within(preview).getByRole("combobox", { name: "图标颜色" });
    expect(within(textSelect).getAllByRole("option").map((option) => option.getAttribute("value"))).toEqual(["OnColor/1", "OnColor/2", "OnColor/3", "OnColor/4", "OnColor/5"]);
    await userEvent.selectOptions(within(preview).getByRole("combobox", { name: "色系" }), "Orange");
    expect(textSelect).toHaveValue("OnColor/1");
    expect(iconSelect).toHaveValue("OnColor/1");
    expect(within(preview).getByRole("status")).toHaveTextContent("文字 2.95 : 1 · 不足 4.5 : 1");
    expect(within(preview).getByRole("status")).toHaveTextContent("图标 2.95 : 1 · 不足 3 : 1");
    expect(preview).toHaveTextContent("仅作展示，不能作为已通过的组件方案");
    expect(preview.querySelector('[data-slot="pairing-text"]')).toHaveClass("text-rain-swatch-oncolor-1");
    expect(preview.querySelector('[data-slot="pairing-text"]')).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll('[style]:not([data-rain-id="icon"])')).toHaveLength(0);
  });

  it("allows independent same-family text/icon on subtle fills and measures the actual Alpha parent", async () => {
    render(createElement(ColorPanel));
    const preview = screen.getByRole("region", { name: "Fill 前景配对预览" });
    const controls = within(preview);
    await userEvent.selectOptions(controls.getByRole("combobox", { name: "色系" }), "Red");
    await userEvent.selectOptions(controls.getByRole("combobox", { name: "填充背景" }), "Fill/Red/Solid/3");
    const textSelect = controls.getByRole("combobox", { name: "文字颜色" });
    const iconSelect = controls.getByRole("combobox", { name: "图标颜色" });
    expect(within(textSelect).getAllByRole("option").map((option) => option.getAttribute("value"))).toEqual(["Text/Neutral/1", "Text/Red/1", "Text/Red/2"]);
    await userEvent.selectOptions(iconSelect, "Icon/Red/2");
    expect(textSelect).toHaveValue("Text/Red/1");
    expect(controls.getByRole("status")).toHaveTextContent("文字 4.80 : 1 · 满足 4.5 : 1");
    expect(controls.getByRole("status")).toHaveTextContent("图标 3.17 : 1 · 满足 3 : 1");
    await userEvent.selectOptions(controls.getByRole("combobox", { name: "填充背景" }), "Fill/Red/Alpha/2");
    expect(controls.getByRole("status")).toHaveTextContent("文字 4.81 : 1 · 满足 4.5 : 1");
    await userEvent.selectOptions(controls.getByRole("combobox", { name: "Alpha 父背景" }), "Background/Neutral/3");
    expect(preview).toHaveTextContent("实际父背景：Background/Neutral/3");
    expect(controls.getByRole("status")).toHaveTextContent("不足 4.5 : 1");
    expect(preview.querySelector('[data-slot="pairing-background"]')).toHaveClass("bg-rain-swatch-background-neutral-3");
    expect(preview.querySelector('[data-slot="pairing-icon"] [data-rain-id="icon"]')).toHaveAttribute("data-icon", "icon/arrow-down");
    await userEvent.selectOptions(controls.getByRole("combobox", { name: "填充背景" }), "Fill/Red/Solid/2");
    expect(textSelect).toHaveValue("OnColor/1");
    expect(iconSelect).toHaveValue("OnColor/1");
  });

  it("opens details by stable ID without promoting the displayed order to an identity", async () => {
    render(createElement(ColorPanel));
    await userEvent.click(screen.getByRole("button", { name: "Fill/Neutral/Alpha/3" }));
    const detail = screen.getByRole("region", { name: "颜色详情" });
    expect(within(detail).getByText("Fill/Neutral/Alpha/3")).toBeInTheDocument();
    expect(detail).toHaveTextContent("rgb(80 117 254 / 16%)");
    expect(detail).toHaveTextContent("rgb(86 106 181 / 20%)");
    expect(detail).toHaveTextContent("待消费者证据确认");
  });

  it("keeps the Alpha replacement fixture local, with original and derived static classes", () => {
    const { container } = render(createElement(ColorPanel));
    const sample = container.querySelector('[data-rain-id="token-color-demo"]');
    expect(sample).toHaveAttribute("data-local-recipe", "token-color-demo-highlight");
    expect(sample).toHaveAttribute("data-rain-theme", "light");
    expect(sample?.querySelector('[data-slot="original-fill"]')).toHaveClass("bg-rain-category-fill-neutral-alpha-3");
    expect(sample?.querySelector('[data-slot="derived-fill"]')).toHaveClass("bg-rain-local-token-color-demo-highlight");
    expect(container.querySelectorAll('[style]:not([data-rain-id="icon"])')).toHaveLength(0);
  });

  it("selects Dark facts and uses that theme for Alpha compositing without losing foreground choices", async () => {
    const { container } = render(createElement(ColorPanel));
    const themeSelect = screen.getByRole("combobox", { name: "预览主题" });
    await userEvent.click(screen.getByRole("button", { name: "Dark Fill/Neutral/Solid/2" }));
    expect(themeSelect).toHaveValue("dark");
    const detail = screen.getByRole("region", { name: "颜色详情" });
    expect(detail).toHaveTextContent("当前预览主题Dark");
    expect(detail).toHaveTextContent("rgb(42 48 74)");
    expect(detail).toHaveTextContent("evidence/runtime/color-dark-theme/confirmed-input.json");
    const preview = screen.getByRole("region", { name: "Fill 前景配对预览" });
    const controls = within(preview);
    await userEvent.selectOptions(controls.getByRole("combobox", { name: "色系" }), "Red");
    await userEvent.selectOptions(controls.getByRole("combobox", { name: "填充背景" }), "Fill/Red/Alpha/2");
    await userEvent.selectOptions(controls.getByRole("combobox", { name: "图标颜色" }), "Icon/Red/2");
    expect(preview.querySelector(".token-color-pairing-canvas")).toHaveAttribute("data-rain-theme", "dark");
    expect(controls.getByRole("status")).toHaveTextContent("文字 4.26 : 1");
    await userEvent.selectOptions(controls.getByRole("combobox", { name: "Alpha 父背景" }), "Background/Neutral/3");
    expect(preview).toHaveTextContent("rgb(21 25 43)");
    expect(controls.getByRole("status")).toHaveTextContent("文字 4.84 : 1");
    expect(controls.getByRole("status")).toHaveTextContent("图标 3.66 : 1");
    await userEvent.selectOptions(themeSelect, "light");
    expect(controls.getByRole("combobox", { name: "文字颜色" })).toHaveValue("Text/Red/1");
    expect(controls.getByRole("combobox", { name: "图标颜色" })).toHaveValue("Icon/Red/2");
    expect(preview.querySelector(".token-color-pairing-canvas")).toHaveAttribute("data-rain-theme", "light");
    expect(container.querySelectorAll('[data-slot="category-swatch"]')).toHaveLength(colorRegistry.length * 2);
  });
});
