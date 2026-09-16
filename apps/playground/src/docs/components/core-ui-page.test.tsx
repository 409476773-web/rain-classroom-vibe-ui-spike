import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CoreUiPage } from "./core-ui-page";

describe("CoreUiPage", () => {
  it("documents exactly four prototype-ready local experiments", () => {
    const { container } = render(<CoreUiPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Core UI，先把高频动作做准",
      }),
    ).toHaveAttribute("id", "core-ui-title");
    expect(container.querySelector('[data-rain-id="core-ui-page"]')).toHaveAttribute(
      "data-asset-identity",
      "local-experiment",
    );
    expect(container.querySelector('[data-rain-id="core-ui-page"]')).toHaveAttribute(
      "data-maturity",
      "prototype-ready",
    );
    expect(container.querySelectorAll('[data-slot="family-contract"]')).toHaveLength(4);
    for (const rainId of [
      "core-ui-button",
      "core-ui-input",
      "core-ui-tag-badge",
      "core-ui-surface-card",
    ]) {
      expect(container.querySelector(`[data-rain-id="${rainId}"]`)).toBeInTheDocument();
    }
  });

  it("shows use, avoid, anatomy, accessibility, lineage and modification boundaries", () => {
    const { container } = render(<CoreUiPage />);

    for (const label of [
      "Use when",
      "Do not use when",
      "Anatomy",
      "Accessibility",
      "Visual lineage",
      "Modification boundary",
    ]) {
      expect(screen.getAllByText(label)).toHaveLength(4);
    }
    expect(screen.getAllByText(/VE-001/)).toHaveLength(2);
    expect(screen.getByText(/VE-014/)).toBeVisible();
    const tagBadgeFamily = container.querySelector<HTMLElement>(
      '[data-rain-id="core-ui-tag-badge"]',
    );
    expect(tagBadgeFamily).not.toBeNull();
    if (!tagBadgeFamily) {
      throw new Error("Tag / Badge family is missing");
    }
    expect(within(tagBadgeFamily).getByText(/VE-001/)).toBeVisible();
    expect(within(tagBadgeFamily).queryByText(/VE-009|VE-012/)).toBeNull();
  });

  it("keeps the removable Tag interaction real and text-based", async () => {
    const user = userEvent.setup();
    render(<CoreUiPage />);

    const tagFixture = screen.getByTestId("removable-tag-fixture");
    expect(within(tagFixture).getByText("专业必修")).toBeVisible();
    const removeButton = within(tagFixture).getByRole("button", {
      name: "移除标签 专业必修",
    });
    expect(removeButton).toHaveTextContent("移除");
    await user.click(removeButton);
    expect(screen.queryByTestId("removable-tag-fixture")).not.toBeInTheDocument();
  });

  it("keeps the preview free of unregistered icon substitutes", () => {
    const { container } = render(<CoreUiPage />);

    expect(container.querySelectorAll("svg")).toHaveLength(0);
    expect(container.textContent).not.toMatch(/[\u00d7✕✖✗✘]/u);
  });
});
