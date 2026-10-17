import { readFileSync } from "node:fs";
import { compile } from "tailwindcss";
import { describe, expect, it } from "vitest";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { getGeneratedTokenFiles } from "./generate-token-foundations.mjs";
import { validateTokenConsumerSource } from "./verify-token-foundations.mjs";

const sizes = [4, 6, 8, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36];
const controls = [18, 20, 24, 28, 32, 36];

describe("Icon Size generation and consumer boundary", () => {
  it("emits the finite shared size classes without scanning Playground consumers", async () => {
    const bridge = getGeneratedTokenFiles()["packages/foundations/src/tailwind-theme.css"]!;
    const compiler = await compile(`${bridge}\n@tailwind utilities;`);
    const css = compiler.build([]);
    for (const name of [...sizes.map((n) => `size-rain-icon-${n}`), ...controls.map((n) => `size-rain-icon-button-control-${n}`)]) {
      expect(css).toContain(`.${name} {`);
    }
    expect(css).not.toContain(".size-rain-icon-13 {");
    expect(css).not.toContain(".gap-rain-icon-16 {");
    expect(compiler.sources).toEqual([]);
    expect(bridge).not.toContain("apps/playground");
  });
  it("generates only square icon and control utilities without widening spacing or typography", async () => {
    const files = getGeneratedTokenFiles();
    const bridge = files["packages/foundations/src/tailwind-theme.css"]!;
    const compiler = await compile(`${bridge}\n@tailwind utilities;`);
    const allowed = [...sizes.map((n) => `size-rain-icon-${n}`), ...controls.map((n) => `size-rain-icon-button-control-${n}`)];
    const forbidden = ["size-rain-icon-9", "size-rain-icon-13", "size-rain-icon-40", "size-rain-icon-button-control-16",
      ...["h", "w", "min-h", "max-w", "p", "gap", "text"].flatMap((prefix) => [`${prefix}-rain-icon-16`, `${prefix}-rain-icon-button-control-24`])];
    const css = compiler.build([...allowed, ...forbidden, "rounded-rain-6", "gap-rain-24", "h-rain-button-medium-height"]);
    for (const name of allowed) expect(css).toContain(`.${name} {`);
    for (const name of forbidden) expect(css).not.toContain(`.${name} {`);
    expect(css).toContain("width: var(--rain-icon-size-11)");
    expect(css).toContain("height: var(--rain-icon-button-control-18)");
    expect(bridge).not.toMatch(/--spacing-rain-icon(?:-button-control)?-/);
    for (const name of ["rounded-rain-6", "gap-rain-24", "h-rain-button-medium-height"]) expect(css).toContain(`.${name} {`);
  });

  it("registers generated metadata while preserving existing component geometry", () => {
    const outputs = getTokenFoundationOutputs();
    for (const n of sizes) expect(outputs.variables).toHaveProperty(`--rain-icon-size-${n}`, `${n}px`);
    for (const n of controls) expect(outputs.variables).toHaveProperty(`--rain-icon-button-control-${n}`, `${n}px`);
    const files = getGeneratedTokenFiles();
    const manifest = JSON.parse(files["manifests/contracts/token-foundations-v1.json"]!);
    expect(manifest.sourcePaths).toContain("packages/foundations/src/icon-size-contract.ts");
    expect(manifest.iconSize).toMatchObject({ glyphSuitability: "independent", microSizes: [4, 6], mainSizes: sizes.slice(2), existingComponentMigration: "not-included" });
    expect(manifest.iconSize.records).toHaveLength(15);
    const tokens = files["packages/foundations/src/tokens.css"]!;
    const original = readFileSync("packages/foundations/src/tokens.css", "utf8");
    expect(tokens.split("/* token-foundations-v1:values:start")[0]).toBe(original.split("/* token-foundations-v1:values:start")[0]);
    expect(tokens).toContain("--rain-button-medium-height: 36px;");
    expect(tokens).toContain("--rain-input-clear-min-height: var(--rain-space-24);");
  });

  it("accepts registered public class tables and rejects unregistered icon-size use", () => {
    const filePath = "apps/playground/src/docs/token-foundations/icon-size-panel.tsx";
    const source = 'import { iconSizeClassNames, iconButtonControlSizeClassNames } from "@rain-next/foundations"; export function Panel({ size }) { return <span className={iconButtonControlSizeClassNames[24]}><span className={iconSizeClassNames[size]} /></span>; }';
    expect(validateTokenConsumerSource({ filePath, source })).toEqual([]);
    expect(validateTokenConsumerSource({ filePath, source: 'export function Panel() { return <span className="gap-rain-icon-16" />; }' }).join("\n")).toMatch(/Unregistered Rain utility/);
  });

  it("keeps feedback and loading aliases component-specific", async () => {
    const outputs = getTokenFoundationOutputs();
    expect(outputs.variables).toMatchObject({
      "--rain-icon-button-transition-duration": "var(--rain-motion-feedback-duration)",
      "--rain-icon-button-transition-easing": "var(--rain-motion-ease-out)",
      "--rain-icon-button-loading-mask-size": "120%",
      "--rain-icon-button-loading-duration": "var(--rain-button-loading-duration)",
      "--rain-icon-button-loading-timing-function": "var(--rain-button-loading-timing-function)",
    });
    const files = getGeneratedTokenFiles();
    const compiler = await compile(`${files["packages/foundations/src/tailwind-theme.css"]}\n@tailwind utilities;`);
    const css = compiler.build(["duration-rain-icon-button", "ease-rain-icon-button"]);
    expect(css).toContain("transition-duration: var(--rain-icon-button-transition-duration)");
    expect(css).toContain("transition-timing-function: var(--rain-icon-button-transition-easing)");
  });
});
