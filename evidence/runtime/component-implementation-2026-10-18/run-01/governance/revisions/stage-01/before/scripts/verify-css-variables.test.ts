import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { validateTabsCssExceptions } from "./verify-tailwind-b2.mjs";
import { checkCssVariables, verifyCssVariables } from "./verify-css-variables.mjs";

it("rejects undefined Rain variables even with a fallback or inside a nested fallback", () => {
  const result = checkCssVariables(new Map([["example.css", ":root { --rain-known: 1px; } .test { width: var(--rain-missing, var(--rain-also-missing, 2px)); height: var(--rain-known); }"]]));
  expect(result.failures).toEqual(expect.arrayContaining([expect.stringContaining("undefined --rain-missing"), expect.stringContaining("undefined --rain-also-missing")]));
});

it("recognizes local CSS, inline styles and literal runtime writers without accepting a prefix", () => {
  const result = checkCssVariables(new Map([
    ["example.css", ".test { --rain-local-width: 40px; width: var(--rain-local-width); height: var(--rain-runtime); gap: var(--rain-inline); color: var(--rain-runtime-typo); }"],
    ["example.tsx", 'const style = { "--rain-inline": "2px" }; node.style.setProperty("--rain-runtime", "20px");'],
  ]));
  expect(result.failures).toEqual([expect.stringContaining("undefined --rain-runtime-typo")]);
  expect(checkCssVariables(new Map([["new.tsx", '`var(--rain-unknown-${size})`']])).failures).toEqual([expect.stringContaining("unregistered dynamic")]);
});

it("resolves static Rain variables across the actual public CSS and live examples", () => {
  expect(verifyCssVariables().failures).toEqual([]);
});

it("protects the current Tabs divider repair instead of normalizing back to historical CSS", () => {
  const source = readFileSync("packages/ui/src/styles.css", "utf8");
  const contract = { cssExceptions: { entries: ["tabs-geometry", "tabs-touch-targets", "tabs-forced-colors"].map(id => ({ id, component: "ui-tabs" })) } };
  expect(validateTabsCssExceptions({ source, contract, authorized: true })).toEqual([]);
  const reverted = source.replace(".rain-tabs__divider { position: absolute; inset: auto 0 0; height: var(--rain-line-thickness-1)", ".rain-tabs__divider { position: absolute; inset: auto 0 0; height: var(--rain-space-1)");
  expect(validateTabsCssExceptions({ source: reverted, contract, authorized: true })).not.toEqual([]);
});
