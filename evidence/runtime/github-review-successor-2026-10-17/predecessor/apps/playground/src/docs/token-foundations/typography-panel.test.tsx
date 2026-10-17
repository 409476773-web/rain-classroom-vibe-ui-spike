import { fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { TypographyPanel } from "./typography-panel";

describe("TypographyPanel", () => {
  it("offers 16/17/18px headings and keeps Data options within 28px", () => {
    render(createElement(TypographyPanel));
    const preset = screen.getByRole("combobox", { name: "排版方案" });
    const size = screen.getByRole("combobox", { name: "字号" });
    fireEvent.change(preset, { target: { value: "heading-page" } });
    expect(within(size).getAllByRole("option").map(option => Number((option as HTMLOptionElement).value))).toEqual([16, 17, 18]);
    fireEvent.change(preset, { target: { value: "data-default" } });
    expect(size).toHaveValue("28");
    expect(within(size).getAllByRole("option").every(option => Number((option as HTMLOptionElement).value) <= 28)).toBe(true);
  });
  it("offers the ten complete presets and keeps their actual font verification explicit", () => {
    render(createElement(TypographyPanel));
    expect(within(screen.getByRole("combobox", { name: "排版方案" })).getAllByRole("option")).toHaveLength(10);
    expect(screen.getByRole("table", { name: "10 个排版默认方案" })).toBeVisible();
    expect(screen.getByText(/本机字体是否安装与实际字形仍需视觉核对/)).toBeVisible();
    expect(screen.getByTestId("typography-live-preview")).toHaveClass("rain-type-ui-default");
    expect(screen.getByTestId("typography-live-preview")).not.toHaveAttribute("style");
  });

  it("applies registered local fields, rejects out-of-range combinations and resets on preset change", () => {
    render(createElement(TypographyPanel));
    fireEvent.change(screen.getByRole("combobox", { name: "字号" }), { target: { value: "16" } });
    fireEvent.change(screen.getByRole("combobox", { name: "行高" }), { target: { value: "32" } });
    expect(screen.getByTestId("typography-live-preview")).toHaveClass("text-rain-size-16", "leading-rain-32");
    fireEvent.change(screen.getByRole("combobox", { name: "行高" }), { target: { value: "36" } });
    expect(screen.getByRole("alert")).toHaveTextContent("行高必须在字号的 1 至 2 倍之间");
    expect(screen.queryByTestId("typography-live-preview")).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "排版方案" }), { target: { value: "reading-default" } });
    expect(screen.getByTestId("typography-live-preview")).toHaveClass("rain-type-reading-default");
    expect(screen.getByTestId("typography-live-preview")).not.toHaveClass("text-rain-size-16", "leading-rain-36");
    expect(screen.getByRole("combobox", { name: "字号" })).toHaveValue("15");
    expect(screen.getByRole("combobox", { name: "行高" })).toHaveValue("26");
  });

  it("uses Equal at the selected size and separates Data value, unit and label", () => {
    render(createElement(TypographyPanel));
    fireEvent.change(screen.getByRole("combobox", { name: "字号" }), { target: { value: "17" } });
    fireEvent.change(screen.getByRole("combobox", { name: "行高" }), { target: { value: "equal" } });
    expect(screen.getByRole("status")).toHaveTextContent("17px / 17px");
    fireEvent.change(screen.getByRole("combobox", { name: "排版方案" }), { target: { value: "data-default" } });
    const preview = screen.getByTestId("typography-live-preview");
    expect(preview).not.toHaveClass("rain-type-data-default");
    expect(within(preview).getByText("98.6")).toHaveClass("rain-type-data-default");
    expect(within(preview).getByText("分")).toHaveClass("rain-type-ui-default");
    expect(within(preview).getByText("关键得分")).toHaveClass("rain-type-ui-default");
  });

  it.each(["ui-default", "reading-default", "data-default"])("keeps %s preview visible when a size change needs a different line height", (presetName) => {
    render(createElement(TypographyPanel));
    const size = screen.getByRole("combobox", { name: "字号" });
    const line = screen.getByRole("combobox", { name: "行高" });
    fireEvent.change(screen.getByRole("combobox", { name: "排版方案" }), { target: { value: presetName } });
    fireEvent.change(size, { target: { value: "24" } });
    fireEvent.change(line, { target: { value: "32" } });
    fireEvent.change(size, { target: { value: "14" } });
    expect(screen.getByTestId("typography-live-preview")).toBeVisible();
    expect(line).toHaveValue("28");
    fireEvent.change(size, { target: { value: "9" } });
    expect(line).toHaveValue("18");
    if (presetName === "data-default") {
      fireEvent.change(size, { target: { value: "28" } });
      expect(line).toHaveValue("28");
    } else {
      fireEvent.change(size, { target: { value: "40" } });
      expect(line).toHaveValue("40");
      fireEvent.change(size, { target: { value: "36" } });
      expect(line).toHaveValue("40");
    }
    fireEvent.change(line, { target: { value: "equal" } });
    fireEvent.change(size, { target: { value: "9" } });
    expect(line).toHaveValue("equal");
    expect(screen.getByRole("status")).toHaveTextContent("9px / 9px");
    fireEvent.click(screen.getByRole("button", { name: "恢复完整方案" }));
    expect(screen.getByTestId("typography-live-preview")).toBeVisible();
    expect(line).toHaveValue(presetName === "data-default" ? "36" : presetName === "reading-default" ? "26" : "22");
  });
});
