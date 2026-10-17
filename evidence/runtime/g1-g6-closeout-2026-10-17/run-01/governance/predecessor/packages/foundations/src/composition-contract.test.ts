import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { compile } from "tailwindcss";
import { describe, expect, it } from "vitest";

import {
  compositionSpaceTokens,
  radiusTokens,
  semanticColorTokens,
  shadowTokens,
} from "./index";

const sourceDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = join(sourceDirectory, "../../..");

function readSource(relativePath: string) {
  return readFileSync(join(workspaceRoot, relativePath), "utf8");
}

function occurrences(source: string, fragment: string) {
  return source.split(fragment).length - 1;
}

function sha256(relativePath: string) {
  return createHash("sha256")
    .update(readFileSync(join(workspaceRoot, relativePath)))
    .digest("hex");
}

const expectedCompositionSpaceTokens = {
  0: "0px",
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  14: "14px",
  16: "16px",
  18: "18px",
  20: "20px",
  24: "24px",
  28: "28px",
  32: "32px",
  36: "36px",
  40: "40px",
} as const;

const bridgeSource = readSource("packages/foundations/src/tailwind-theme.css");
const tokenSource = readSource("packages/foundations/src/tokens.css");
const typographySource = readSource("packages/foundations/src/typography.css");

describe("Rain composition Token contract", () => {
  it("defines only the agreed public composition spacing scale in TypeScript and CSS", () => {
    expect(compositionSpaceTokens).toEqual(expectedCompositionSpaceTokens);

    const cssTokens = Object.fromEntries(
      [...tokenSource.matchAll(/--rain-space-([0-9]+)\s*:\s*([^;]+);/g)].map(
        ([, name, value]) => [name, value?.trim()],
      ),
    );
    expect(cssTokens).toEqual(
      Object.fromEntries(Object.entries(expectedCompositionSpaceTokens)),
    );
    expect(tokenSource).not.toContain("--rain-space-22:");
    expect(tokenSource).not.toContain("--rain-space-30:");
  });

  it("keeps dynamic Density and component-specific Button/Input values separate", () => {
    expect(tokenSource).toContain(
      "--rain-density-control-height: 36px;",
    );
    expect(tokenSource).toContain(
      "--rain-density-control-padding-inline: var(--rain-space-14);",
    );
    expect(tokenSource).toContain("--rain-density-item-gap: var(--rain-space-10);");

    for (const [name, value] of Object.entries({
      "--rain-button-mini-height": "28px",
      "--rain-button-small-height": "32px",
      "--rain-button-medium-height": "36px",
      "--rain-button-large-height": "40px",
      "--rain-button-xl-height": "48px",
      "--rain-button-gap-default": "var(--rain-space-4)",
      "--rain-button-gap-xl": "var(--rain-space-6)",
      "--rain-button-xl-leading-icon-size": "22px",
      "--rain-input-font-size": "var(--rain-font-size-13)",
      "--rain-input-control-min-width": "64px",
      "--rain-input-border-width": "var(--rain-line-thickness-1)",
    })) {
      expect(tokenSource).toContain(`${name}: ${value};`);
    }
    expect(bridgeSource).toContain(
      "--spacing-rain-button-xl-leading-icon: var(--rain-button-xl-leading-icon-size);",
    );
    expect(bridgeSource).not.toContain("--spacing-rain-22:");
    expect(bridgeSource).not.toContain("--spacing-rain-30:");
    expect(tokenSource).not.toContain("--rain-input-height:");
    expect(tokenSource).not.toContain("--rain-input-padding-inline:");
    expect(bridgeSource).toContain(
      "--spacing-rain-input-height: var(--rain-density-control-height);",
    );
    expect(bridgeSource).toContain(
      "--spacing-rain-input-padding-inline: var(--rain-density-control-padding-inline);",
    );
  });
});

describe("Rain Token to Tailwind v4 bridge", () => {
  it("resets Tailwind's default theme before opening the Rain namespace", () => {
    const resetIndex = bridgeSource.indexOf("@theme {");
    const mappingIndex = bridgeSource.indexOf("@theme inline {");

    expect(resetIndex).toBeGreaterThanOrEqual(0);
    expect(mappingIndex).toBeGreaterThan(resetIndex);
    expect(bridgeSource.slice(resetIndex, mappingIndex)).toContain(
      "--*: initial;",
    );
    expect(bridgeSource).not.toMatch(/--breakpoint-[a-z0-9-]+\s*:/);
  });

  it("maps flat colors once, separates primary paints and keeps the gradient as an image", () => {
    for (const name of Object.keys(semanticColorTokens)) {
      if (name === "action-primary") {
        expect(bridgeSource).not.toContain("--color-rain-action-primary:");
        for (const prefix of ["text", "bg"]) expect(occurrences(bridgeSource, `@utility ${prefix}-rain-action-primary {`)).toBe(1);
        continue;
      }
      if (name === "intelligence-gradient") {
        expect(bridgeSource).toContain(
          "--background-image-rain-intelligence-gradient: var(--rain-color-intelligence-gradient);",
        );
        expect(bridgeSource).not.toContain(
          "--color-rain-intelligence-gradient:",
        );
        continue;
      }
      const mapping = `--color-rain-${name}: var(--rain-color-${name});`;
      expect(occurrences(bridgeSource, mapping), name).toBe(1);
    }
  });

  it("compiles primary text and fill to different sources without a generic color override", async () => {
    const compiler = await compile(`${bridgeSource}\n@tailwind utilities;`);
    const css = compiler.build(["text-rain-action-primary", "bg-rain-action-primary"]);
    expect(css.match(/\.text-rain-action-primary\s*\{([^}]+)\}/)?.[1]?.trim())
      .toBe("color: var(--rain-color-action-primary-text);");
    expect(css.match(/\.bg-rain-action-primary\s*\{([^}]+)\}/)?.[1]?.trim())
      .toBe("background-color: var(--rain-color-action-primary);");
  });

  it("maps every locked radius and shadow through a Rain-prefixed name", () => {
    for (const name of Object.keys(radiusTokens)) {
      expect(bridgeSource).toContain(
        `--radius-rain-${name}: var(--rain-radius-${name});`,
      );
    }
    for (const name of Object.keys(shadowTokens)) {
      if (name === "none") {
        expect(bridgeSource).toContain("@utility shadow-rain-none {");
        expect(bridgeSource).toContain(
          "box-shadow: var(--rain-shadow-none);",
        );
        expect(bridgeSource).not.toContain("--shadow-rain-none:");
        continue;
      }
      expect(bridgeSource).toContain(
        `--shadow-rain-${name}: var(--rain-shadow-${name});`,
      );
    }
  });

  it("maps Rain fonts, type, Density, Focus and Motion without copying values", () => {
    for (const mapping of [
      "--font-rain-ui: var(--rain-font-ui);",
      "--font-rain-reading: var(--rain-font-reading);",
      "--font-rain-data: var(--rain-font-data);",
      "--text-rain-ui: var(--rain-type-ui-size);",
      "--text-rain-ui--line-height: var(--rain-type-ui-line);",
      "--spacing-rain-control: var(--rain-density-control-height);",
      "--spacing-rain-control-inline: var(--rain-density-control-padding-inline);",
      "--spacing-rain-item-gap: var(--rain-density-item-gap);",
      "--outline-width-rain-focus: var(--rain-focus-width);",
      "--outline-offset-rain-focus: var(--rain-focus-offset);",
      "--transition-duration-rain-feedback: var(--rain-motion-feedback-duration);",
      "--ease-rain-out: var(--rain-motion-ease-out);",
    ]) {
      expect(bridgeSource).toContain(mapping);
    }

    expect(typographySource).toContain("--rain-font-weight-regular: 400;");
    expect(typographySource).toContain("--rain-font-weight-semibold: 600;");
    expect(typographySource).toMatch(
      /\.rain-type-ui\s*\{[^}]*font-weight:\s*var\(--rain-font-weight-regular\);/s,
    );
    expect(typographySource).toMatch(
      /\.rain-type-reading\s*\{[^}]*font-weight:\s*var\(--rain-font-weight-regular\);/s,
    );
    expect(typographySource).toMatch(
      /\.rain-type-data\s*\{[^}]*font-weight:\s*var\(--rain-font-weight-bold\);/s,
    );
    expect(bridgeSource).not.toMatch(/--rain-ref-/);
    for (const declaration of bridgeSource.matchAll(/--[a-z0-9-*]+\s*:\s*([^;]+);/g)) {
      expect(
        declaration[1]?.trim(),
        `bridge value must be a reset or a Rain variable: ${declaration[0]}`,
      ).toMatch(/^(?:initial|var\(--rain-[a-z0-9-]+\))$/);
    }
  });

  it("compiles the opened Rain utilities while keeping default theme-backed visuals and breakpoints closed", async () => {
    const compiler = await compile(`${bridgeSource}\n@tailwind utilities;`);
    const builtCss = compiler.build([
      "bg-rain-surface-panel",
      "text-rain-text-primary",
      "bg-rain-intelligence-gradient",
      "font-rain-ui",
      "font-rain-semibold",
      "text-rain-ui",
      "rounded-rain-6",
      "shadow-rain-overlay",
      "shadow-rain-none",
      "gap-rain-8",
      "h-rain-control",
      "px-rain-control-inline",
      "h-rain-input-height",
      "px-rain-input-padding-inline",
      "h-rain-button-xl-height",
      "size-rain-button-xl-leading-icon",
      "border-rain-input",
      "duration-rain-feedback",
      "ease-rain-out",
      "min-w-0",
      "bg-blue-500",
      "bg-red-500",
      "bg-gray-100",
      "font-sans",
      "font-semibold",
      "text-sm",
      "rounded-md",
      "shadow-sm",
      "gap-4",
      "sm:flex",
    ]);

    for (const selector of [
      ".bg-rain-surface-panel",
      ".text-rain-text-primary",
      ".bg-rain-intelligence-gradient",
      ".font-rain-ui",
      ".font-rain-semibold",
      ".text-rain-ui",
      ".rounded-rain-6",
      ".shadow-rain-overlay",
      ".shadow-rain-none",
      ".gap-rain-8",
      ".h-rain-control",
      ".px-rain-control-inline",
      ".h-rain-input-height",
      ".px-rain-input-padding-inline",
      ".h-rain-button-xl-height",
      ".size-rain-button-xl-leading-icon",
      ".border-rain-input",
      ".duration-rain-feedback",
      ".ease-rain-out",
      ".min-w-0",
    ]) {
      expect(builtCss, selector).toContain(selector);
    }
    expect(builtCss).toContain(
      "background-image: var(--rain-color-intelligence-gradient);",
    );
    expect(builtCss).toMatch(
      /\.h-rain-input-height\s*\{[^}]*height:\s*var\(--rain-density-control-height\)/,
    );
    expect(builtCss).toMatch(
      /\.px-rain-input-padding-inline\s*\{[^}]*padding-inline:\s*var\(--rain-density-control-padding-inline\)/,
    );
    expect(
      builtCss.match(/\.shadow-rain-none\s*\{([^}]+)\}/)?.[1]?.trim(),
    ).toMatch(/box-shadow: var\(--rain-shadow-none\);$/);
    for (const defaultSelector of [
      ".bg-blue-500",
      ".bg-red-500",
      ".bg-gray-100",
      ".font-sans",
      ".font-semibold",
      ".text-sm",
      ".rounded-md",
      ".shadow-sm",
      ".gap-4",
    ]) {
      expect(builtCss, defaultSelector).not.toContain(defaultSelector);
    }
    expect(builtCss).not.toContain("@media (width >= 40rem)");
  });

});

describe("Task 4 icon host boundary", () => {
  it("does not modify the renderer or canonical Search and Loading graphics", () => {
    expect(sha256("packages/ui/src/icon/icon.tsx")).toBe(
      "4a717dc0861919c43bd443a62b8c8c40bc37cb889c63752d2ca4a5fc98c19cb8",
    );
    expect(sha256("packages/ui/src/icons/search.tsx")).toBe(
      "4312348daf79d6f5dcdc7b1b4c42bf6d2b8fd4122c10e5c56679da3d0a441b72",
    );
    expect(sha256("packages/ui/src/icons/assets/search.svg")).toBe(
      "6e7a1b6b3e43def3ce73e3ea1f655422090f3a4fdde360a8518961c3408fbd7f",
    );
    expect(sha256("packages/ui/src/icons/button-loading.tsx")).toBe(
      "0306a4b497ebd77393220a93782ddf6bd5957243649474f5aa4c6575541f690c",
    );
    expect(sha256("packages/ui/src/icons/assets/button-loading.png")).toBe(
      "48eb44ae2822e9f82d119a423f4a78909b55ce6e4a3917540c9ba13413582915",
    );
    expect(tokenSource).toContain("--rain-button-loading-mask-size: 120%;");
    expect(tokenSource).toContain("--rain-button-loading-duration: 800ms;");
    expect(tokenSource).toContain("--rain-button-loading-opacity: 0.82;");
  });
});
