import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { getG5ColorConsumers, verifyG5ColorSources, measureG5StateContrast, prepareG5NativePaints } from "./g5-color-consumers.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
it("binds all G5 colors to finite original Token roles and sources", () => {
  const ledger = verifyG5ColorSources();
  expect(ledger.colorCssConsumers.length).toBe(46);
  expect(ledger.nativeCssConsumers.some((row: any) => row.role === "native-system")).toBe(true);
  expect(ledger.colorCssConsumers.find((row: any) => row.use.tokenId.startsWith("OnColor/"))?.use).toMatchObject({ role: "text", content: "text", onColor: true });
  expect(measureG5StateContrast().every((row: any) => row.minimum === 3 && row.acceptedException === false)).toBe(true);
});
it("rejects changes to inherited focus or native system colors", () => {
  const filePath = "packages/ui/src/slider/slider.css";
  const source = readFileSync(filePath, "utf8");
  expect(() => prepareG5NativePaints(filePath, source.replace("var(--rain-field-focus-halo)", "red"))).toThrow("inherited focus paint changed");
  expect(() => prepareG5NativePaints(filePath, source.replace("background: Highlight", "background: red"))).toThrow("native/platform");
});
it("rejects unregistered palette declarations without accepting contrast findings", () => {
  const ledger = getG5ColorConsumers(), outputs = getTokenFoundationOutputs();
  outputs.colorCssConsumers.push(...ledger.colorCssConsumers);
  const filePath = "packages/ui/src/combobox/combobox.css";
  const source = readFileSync(filePath, "utf8") + "\n.extra { color: var(--rain-category-text-red-1); }\n";
  expect(validateRegisteredRecipeColors({ filePath, source, outputs })).toContain(`Unregistered Category CSS paint ${filePath}: .extra color`);
});
