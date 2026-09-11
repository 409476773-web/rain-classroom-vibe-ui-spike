import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buttonColorRecipes } from "../../../foundations/src/button-token-contract";

import {
  buttonPartClassName,
  buttonRootRecipe,
  type ButtonStyleState,
} from "./button.styles";

const states = ["default", "loading", "disabled"] as const;
const ordinaryVariants = ["primary", "secondary", "tertiary"] as const;
const ordinaryTones = ["default", "danger"] as const;
const ordinarySizes = ["mini", "small", "medium", "large", "xl"] as const;
const textTones = ["default", "brand", "danger"] as const;
const textSizes = ["small", "compact", "regular"] as const;
const styles = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "../styles.css"),
  "utf8",
);

const forbiddenVisualClass =
  /\b(?:bg|text)-(?:black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-\d+)?\b|\btext-(?:xs|sm|base|lg|xl|[2-9]xl)\b|\brounded(?!-rain-)(?:-(?:none|xs|sm|md|lg|xl|2xl|3xl|4xl|full))?\b|\bshadow(?!-rain-)(?:-(?:none|2xs|xs|sm|md|lg|xl|2xl|inner))?\b|\bfont-(?!rain-)(?:sans|serif|mono|thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b/;

function expectGovernedClasses(classNames: string) {
  expect(classNames).not.toMatch(forbiddenVisualClass);
  expect(classNames).not.toMatch(/\b(?:bg|text|border|rounded|shadow|font|gap|p[xy]?|h|min-w|size|opacity|duration|ease|outline)-\[/);
  expect(classNames).not.toContain("!");
}

describe("Button Tailwind-first styles", () => {
  it("consumes the registered color recipe in every actual CVA state and Part", () => {
    const bridge = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../../../foundations/src/tailwind-theme.css"), "utf8");
    const names = new Map([...bridge.matchAll(/--color-([a-z0-9-]+):\s*var\((--rain-button-[a-z0-9-]+)\)/g)].map((match) => [match[2], match[1]]));
    for (const recipe of buttonColorRecipes) {
      const state = recipe.state === "hover" || recipe.state === "pressed" ? "default" : recipe.state;
      const options = { ...recipe, state, block: false, size: recipe.variant === "text" ? "regular" : "medium" } as const;
      for (const entry of recipe.parts) {
        const root = entry.part === "background" || entry.part === "border";
        const classes = root ? buttonRootRecipe(options) : buttonPartClassName({ ...options, hasLeadingIcon: true, part: entry.part === "label" ? "label" : entry.part === "trailing-icon" ? "trailing-icon" : "leading-icon" });
        const prefix = entry.part === "background" ? "bg" : entry.part === "border" ? "border" : "text";
        const candidates = classes.split(" ").filter((name) =>
          name.startsWith(`${prefix}-`) || recipe.state === "hover" && name.startsWith(`hover:${prefix}-`)
          || recipe.state === "pressed" && /^(hover|active):/.test(name) && name.includes(`${prefix}-`));
        const active = candidates.filter((name) => name.startsWith("active:"));
        const hover = candidates.filter((name) => name.startsWith("hover:"));
        const effective = active.length ? active : hover.length ? hover : candidates;
        expect(effective.map((name) => name.replace(/^(hover|active):/, "")), `${recipe.id}/${entry.part}`).toContain(`${prefix}-${names.get(entry.alias)}`);
      }
    }
  });

  it("separates text and icon roles while preserving disabled and loading hues", () => {
    const common = { size: "medium", state: "default", variant: "secondary", tone: "default" } as const;
    expect(buttonPartClassName({ ...common, part: "label" })).toContain("text-rain-button-secondary-text");
    expect(buttonPartClassName({ ...common, part: "leading-icon" })).toContain("text-rain-button-brand-icon");
    expect(buttonPartClassName({ ...common, tone: "danger", part: "loading-indicator" })).toContain("text-rain-button-danger-icon");
    expect(buttonPartClassName({ ...common, variant: "primary", part: "label" })).toContain("text-rain-button-on-color-foreground");
    for (const state of ["disabled", "loading"] as const) {
      expect(buttonPartClassName({ ...common, state, part: "label" })).toContain("text-rain-button-secondary-text");
      expect(buttonPartClassName({ ...common, state, tone: "danger", part: "label" })).toContain("text-rain-button-danger-text");
      expect(buttonPartClassName({ ...common, state, part: "leading-icon" })).toContain("text-rain-button-brand-icon");
    }
  });

  it("keeps fill out of the border role and retains original disabled fading", () => {
    const common = { block: false, size: "medium", state: "default", variant: "primary", tone: "default" } as const;
    const root = buttonRootRecipe(common);
    expect(root.split(" ")).toContain("border-rain-action-ghost");
    expect(root.split(" ")).not.toContain("border-rain-button-primary");
    expect(root).toContain("py-rain-0");
    const disabled = buttonRootRecipe({ ...common, state: "disabled" });
    expect(disabled).toContain("bg-rain-button-primary");
    expect(disabled).toContain("opacity-rain-button-disabled-primary");
  });

  it("fades only the loading surface while retaining original foregrounds", () => {
    const common = { block: false, size: "medium", state: "loading", variant: "primary", tone: "default" } as const;
    expect(buttonRootRecipe(common)).not.toContain("opacity-rain-button-loading");
    expect(buttonRootRecipe(common)).toContain("bg-rain-button-loading-primary-bg");
    expect(buttonPartClassName({ ...common, variant: "secondary", part: "label" })).toContain("text-rain-button-secondary-text");
  });

  it.each(
    ordinaryVariants.flatMap((variant) =>
      ordinaryTones.flatMap((tone) =>
        states.map((state) => [variant, tone, state] as const),
      ),
    ),
  )("statically covers ordinary %s/%s/%s", (variant, tone, state) => {
    const classNames = buttonRootRecipe({
      block: false,
      size: "medium",
      state,
      tone,
      variant,
    });

    expect(classNames).toContain("rain-button");
    expect(classNames).toContain("h-rain-button-medium-height");
    expect(classNames).toContain("text-rain-button-medium");
    expect(classNames).toContain(
      state === "loading" && variant === "primary" && tone === "default"
          ? "bg-rain-button-loading-primary-bg"
          : state === "loading" && variant === "primary"
            ? "bg-rain-button-loading-danger-primary-bg"
          : state === "loading" && variant === "secondary"
            ? tone === "danger" ? "bg-rain-button-loading-danger-subtle-bg" : "bg-rain-button-loading-secondary-bg"
          : variant === "primary"
        ? tone === "danger"
          ? "bg-rain-button-danger-primary"
          : "bg-rain-button-primary"
        : variant === "secondary"
          ? tone === "danger"
            ? "bg-rain-button-danger-subtle"
            : "bg-rain-button-secondary"
          : "bg-rain-action-ghost",
    );
    expect(classNames).toContain(
      state === "loading"
        ? "cursor-progress"
        : state === "disabled"
            ? variant === "primary" ? "opacity-rain-button-disabled-primary" : "opacity-rain-button-disabled-rest"
            : "cursor-pointer",
    );
    expect(classNames.includes("hover:")).toBe(state === "default");
    expect(classNames.includes("active:")).toBe(state === "default");
    expectGovernedClasses(classNames);
  });

  it.each(
    textTones.flatMap((tone) =>
      states.map((state) => [tone, state] as const),
    ),
  )("statically covers text/%s/%s", (tone, state) => {
    const classNames = buttonRootRecipe({
      block: false,
      size: "regular",
      state,
      tone,
      variant: "text",
    });

    expect(classNames).toContain("h-rain-button-text-regular-height");
    expect(classNames).toContain("text-rain-button-text-regular");
    expect(classNames).toContain(
      tone === "brand"
        ? "text-rain-button-text-brand"
        : tone === "danger"
          ? "text-rain-button-text-danger"
          : "text-rain-button-text-default",
    );
    expect(classNames).toContain("opacity-rain-button-text-loading");
    expect(classNames.includes("hover:")).toBe(state === "default");
    expect(classNames.includes("active:")).toBe(state === "default");
    expectGovernedClasses(classNames);
  });

  it.each(ordinarySizes)("maps ordinary %s through Rain geometry Tokens", (size) => {
    const root = buttonRootRecipe({
      block: false,
      size,
      state: "default",
      tone: "default",
      variant: "secondary",
    });
    const leading = buttonPartClassName({
      part: "leading-icon",
      size,
      state: "default",
      variant: "secondary",
    });
    const trailing = buttonPartClassName({
      part: "trailing-icon",
      size,
      state: "default",
      variant: "secondary",
    });

    expect(root).toContain(`h-rain-button-${size}-height`);
    expect(root).toContain(`min-w-rain-button-${size}-min-width`);
    expect(root).toContain(`px-rain-button-${size}-padding-inline`);
    expect(root).toContain(`rounded-rain-button-${size}`);
    expect(leading).toContain(`size-rain-button-${size}-leading-icon`);
    expect(trailing).toContain(`size-rain-button-${size}-trailing-icon`);
    expectGovernedClasses(`${root} ${leading} ${trailing}`);
  });

  it.each(textSizes)("maps text %s through its independent Rain geometry Tokens", (size) => {
    const root = buttonRootRecipe({
      block: false,
      size,
      state: "default",
      tone: "default",
      variant: "text",
    });
    const label = buttonPartClassName({
      part: "label",
      size,
      state: "default",
      variant: "text",
    });

    expect(root).toContain(`h-rain-button-text-${size}-height`);
    expect(root).toContain(`text-rain-button-text-${size}`);
    expect(label).toContain("flex-none");
    expect(label).toContain("overflow-visible");
    expect(label).toContain("text-clip");
    expectGovernedClasses(`${root} ${label}`);
  });

  it("keeps every declared Part static and dims only text-disabled foreground Parts", () => {
    const styleState: ButtonStyleState = "disabled";
    for (const part of [
      "leading-icon",
      "label",
      "trailing-icon",
      "loading-indicator",
    ] as const) {
      const classNames = buttonPartClassName({
        part,
        size: "regular",
        state: styleState,
        variant: "text",
      });
      expect(classNames).toContain("opacity-rain-button-text-disabled");
      expectGovernedClasses(classNames);
    }
  });

  it("supports the explicit block layout capability without a visual override", () => {
    const classNames = buttonRootRecipe({
      block: true,
      size: "medium",
      state: "default",
      tone: "default",
      variant: "secondary",
    });
    expect(classNames).toContain("flex");
    expect(classNames).toContain("w-full");
    expectGovernedClasses(classNames);
  });

  it("uses Rain-owned transition and shared Focus bridge classes", () => {
    const ordinary = buttonRootRecipe({
      block: false,
      size: "medium",
      state: "default",
      tone: "default",
      variant: "primary",
    });
    const text = buttonRootRecipe({
      block: false,
      size: "regular",
      state: "default",
      tone: "default",
      variant: "text",
    });

    expect(ordinary.split(" ")).toContain("transition-rain-button");
    expect(ordinary.split(" ")).not.toContain("transition");
    expect(ordinary.split(" ")).toContain("focus-rain-button");
    expect(text.split(" ")).toContain("focus-rain-button-text");
    expect(text.split(" ")).not.toContain("focus-rain-button");
    expectGovernedClasses(`${ordinary} ${text}`);
  });

  it("lets a governed Button Part size an otherwise standalone 1em Icon renderer", () => {
    const leading = buttonPartClassName({
      part: "leading-icon",
      size: "regular",
      state: "default",
      variant: "text",
    });

    expect(leading.split(" ")).toContain(
      "text-rain-button-text-regular-leading-icon",
    );
    expect(styles).toContain("width: 1em");
    expect(styles).toContain("height: 1em");
    expectGovernedClasses(leading);
  });

  it("leaves only registered, reason-based Button rules in native CSS", () => {
    expect(styles.match(/\.rain-button/g)).toHaveLength(4);
    expect(styles).not.toMatch(
      /\.rain-button\[data-(?:block|size|state|tone|variant)=/,
    );
    expect(styles.match(/@rain-css-exception button-loading-mask/g)).toHaveLength(3);
    expect(styles).toContain("@rain-css-exception button-forced-colors");
    expect(styles).toContain("@rain-css-exception button-reduced-motion");
  });
});
