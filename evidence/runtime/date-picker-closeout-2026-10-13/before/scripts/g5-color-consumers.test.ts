import { existsSync, readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { getG5ColorConsumers, verifyG5ColorSources, measureG5StateContrast, prepareG5NativePaints, resolveG5ConsumerPaint } from "./g5-color-consumers.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
it("binds all G5 colors to finite original Token roles and sources", () => {
  const ledger = verifyG5ColorSources();
  const original = JSON.parse(readFileSync("evidence/runtime/g5-components-2026-10-12/color-consumers.json", "utf8"));
  const successor = JSON.parse(readFileSync("evidence/runtime/date-time-optimization-2026-10-12/color-consumers.json", "utf8"));
  expect(original.colorCssConsumers).toHaveLength(46);
  const replacedPaths = Object.keys(successor.sourceFiles);
  const retained = original.colorCssConsumers.filter((row: any) => !replacedPaths.includes(row.filePath));
  let expected = [...retained, ...successor.colorCssConsumers];
  const uxPath = "evidence/runtime/date-picker-ux-refinement-2026-10-12/color-consumers.json";
  if (existsSync(uxPath)) {
    const ux = JSON.parse(readFileSync(uxPath, "utf8"));
    expected = [...expected.filter((row: any) => !Object.keys(ux.sourceFiles).includes(row.filePath)), ...ux.colorCssConsumers];
    expect(Object.keys(ux.sourceFiles)).toEqual(["packages/ui/src/date-picker/date-picker.css"]);
    expect(ux.colorCssConsumers.every((row: any) => row.contrastReview === "pending-review")).toBe(true);
  }
  const slider = JSON.parse(readFileSync("evidence/runtime/slider-refinement-2026-10-13/color-consumers.json", "utf8"));
  expected = [...expected.filter((row: any) => !Object.keys(slider.sourceFiles).includes(row.filePath)), ...slider.colorCssConsumers];
  expect(slider.humanGate).toBe("awaiting_human");
  expect(slider.contrastAcceptance).toBe("not-granted");
  const visualPath = "evidence/runtime/date-picker-visual-feedback-2026-10-13/color-consumers.json";
  if (existsSync(visualPath)) {
    const visual = JSON.parse(readFileSync(visualPath, "utf8"));
    expected = [...expected.filter((row: any) => !Object.keys(visual.sourceFiles).includes(row.filePath)), ...visual.colorCssConsumers];
    expect(visual.humanGate).toBe("awaiting_human"); expect(visual.contrastAcceptance).toBe("not-granted");
  }
  expect(ledger.colorCssConsumers).toEqual(expected);
  expect(successor.colorCssConsumers.every((row: any) => row.contrastReview === "pending-review")).toBe(true);
  expect(ledger.nativeCssConsumers.some((row: any) => row.role === "native-system")).toBe(true);
  expect(ledger.colorCssConsumers.find((row: any) => row.use.tokenId.startsWith("OnColor/"))?.use).toMatchObject({ role: "text", content: "text", onColor: true });
  expect(measureG5StateContrast().every((row: any) => row.minimum === 3 && row.acceptedException === false)).toBe(true);
});
it("rejects changes to inherited focus or native system colors", () => {
  const filePath = "packages/ui/src/slider/slider.css";
  const source = readFileSync(filePath, "utf8");
  expect(() => prepareG5NativePaints(filePath, source.replace("var(--rain-focus-control-halo)", "red"))).toThrow("inherited focus paint changed");
  expect(() => prepareG5NativePaints(filePath, source.replace("background: Highlight", "background: red"))).toThrow("native/platform");
});
it("rejects unregistered palette declarations without accepting contrast findings", () => {
  const ledger = getG5ColorConsumers(), outputs = getTokenFoundationOutputs();
  outputs.colorCssConsumers.push(...ledger.colorCssConsumers);
  const filePath = "packages/ui/src/combobox/combobox.css";
  const source = readFileSync(filePath, "utf8") + "\n.extra { color: var(--rain-category-text-red-1); }\n";
  expect(validateRegisteredRecipeColors({ filePath, source, outputs })).toContain(`Unregistered Category CSS paint ${filePath}: .extra color`);
});

it("measures the preview at the declared 5% alpha without fading the foreground", () => {
  for (const theme of ["light", "dark"]) {
    const original = resolveG5ConsumerPaint({ tokenId: "Fill/Brand/Alpha/4", theme });
    const preview = resolveG5ConsumerPaint({ tokenId: "Fill/Brand/Alpha/4", theme, alpha: 5, alphaOperation: "replace" });
    expect(original.alpha).toBe(0.1);
    expect(preview).toEqual({ rgb: original.rgb, alpha: 0.05 });
    expect(resolveG5ConsumerPaint({ tokenId: "Text/Neutral/1", theme }).alpha).toBe(1);
  }
});
