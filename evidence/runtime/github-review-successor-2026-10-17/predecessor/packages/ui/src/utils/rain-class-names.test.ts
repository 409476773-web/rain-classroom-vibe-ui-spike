import { describe, expect, it } from "vitest";

import { rainCn } from "./rain-class-names";

describe("rainCn", () => {
  it("keeps only the last Rain surface class in one conflict group", () => {
    expect(
      rainCn("bg-rain-surface-panel", "bg-rain-surface-subtle"),
    ).toBe("bg-rain-surface-subtle");
  });

  it("recognizes Rain spacing values as Tailwind spacing conflicts", () => {
    expect(rainCn("px-rain-8", "px-rain-10")).toBe("px-rain-10");
  });

  it("keeps Rain typography size and foreground color in separate groups", () => {
    expect(
      rainCn(
        "text-rain-button-medium",
        "text-rain-button-secondary-text",
      ),
    ).toBe("text-rain-button-medium text-rain-button-secondary-text");
    expect(
      rainCn(
        "text-rain-button-text-regular-leading-icon",
        "text-rain-button-text-danger",
      ),
    ).toBe(
      "text-rain-button-text-regular-leading-icon text-rain-button-text-danger",
    );
  });

  it("keeps Rain border and outline widths separate from their colors", () => {
    expect(
      rainCn("border-rain-button", "border-rain-button-secondary-border"),
    ).toBe("border-rain-button border-rain-button-secondary-border");
    expect(
      rainCn("outline-rain-button-focus", "outline-rain-action-ghost"),
    ).toBe("outline-rain-button-focus outline-rain-action-ghost");
  });

  it.each([
    ["rounded-rain-button-mini", "rounded-rain-button-xl"],
    ["font-rain-button", "font-rain-button-text"],
    ["opacity-rain-button-loading", "opacity-rain-button-disabled-rest"],
    ["duration-rain-button", "duration-rain-feedback"],
    ["ease-rain-button", "ease-rain-out"],
  ] as const)("replaces conflicting Rain theme classes %s → %s", (first, last) => {
    expect(rainCn(first, last)).toBe(last);
  });

  it("keeps only the final Rain shared-Focus bridge", () => {
    expect(rainCn("focus-rain-button", "focus-rain-button-text")).toBe(
      "focus-rain-button-text",
    );
  });

  it("filters the explicitly supported falsey inputs", () => {
    expect(
      rainCn("flex items-center", false, undefined, null, "gap-rain-8"),
    ).toBe("flex items-center gap-rain-8");
  });

  it("does not expose an object or array class API", () => {
    if (false) {
      // @ts-expect-error rainCn intentionally accepts no object class maps.
      rainCn({ "items-center": true });
      // @ts-expect-error rainCn intentionally accepts no nested class arrays.
      rainCn(["flex", "items-center"]);
    }

    expect(rainCn("inline-flex")).toBe("inline-flex");
  });
});

describe("Token Foundations typography merging", () => {
  it("keeps Category foreground when replacing a registered font size", () => {
    expect(rainCn("text-rain-category-text-neutral-1 text-rain-size-14", "text-rain-size-16"))
      .toBe("text-rain-category-text-neutral-1 text-rain-size-16");
  });
  it("replaces a complete preset and clears preceding field overrides", () => {
    expect(rainCn("rain-type-ui-default text-rain-size-16 leading-rain-32", "rain-type-reading-default"))
      .toBe("rain-type-reading-default");
    expect(rainCn("rain-type-ui-default", "text-rain-size-16 leading-rain-32"))
      .toBe("rain-type-ui-default text-rain-size-16 leading-rain-32");
  });
});

describe("independent typography fields", () => {
  it("keeps a previously chosen line height when only font size changes", () => {
    expect(rainCn("leading-rain-32", "text-rain-size-16")).toBe("leading-rain-32 text-rain-size-16");
    expect(rainCn("text-rain-size-14", "text-rain-ui")).toBe("text-rain-ui");
    expect(rainCn("text-rain-ui", "text-rain-size-16")).toBe("text-rain-size-16");
  });
  it("keeps family and weight as separate fields", () => {
    expect(rainCn("font-rain-ui", "font-rain-semibold")).toBe("font-rain-ui font-rain-semibold");
    expect(rainCn("font-rain-data", "font-rain-ui")).toBe("font-rain-ui");
  });
});
