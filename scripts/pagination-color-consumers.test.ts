import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { getPaginationColorConsumers, paginationColorSourcePaths } from "./pagination-color-consumers.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

it("registers exact RN-08 colors and separates visual acceptance from contrast acceptance", () => {
  const findings: unknown[] = [];
  for (const filePath of paginationColorSourcePaths) {
    expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), pendingContrastFindings: findings })).toEqual([]);
  }
  expect(findings).toEqual([]);
  expect(getPaginationColorConsumers().lifecycle).toEqual({ humanGate: "accepted", humanGateScope: "pagination-current-runtime-visual-only", contrastAcceptance: "not-granted", acceptedException: false });
});

it("rejects undeclared paint, geometry-as-color, changed role metadata and missing authorization", () => {
  const cssPath = "packages/ui/src/pagination/pagination.css";
  const css = readFileSync(cssPath, "utf8");
  for (const extra of [
    ".rain-pagination { color: var(--rain-local-pagination-control-size); }",
    ".rain-pagination { color: var(--rain-category-text-red-1); }",
  ]) expect(validateRegisteredRecipeColors({ filePath: cssPath, source: css + extra })).not.toEqual([]);
  expect(validateRegisteredRecipeColors({ filePath: cssPath, source: css.replace("GrayText", "CanvasText") })).not.toEqual([]);
  expect(validateRegisteredRecipeColors({ filePath: cssPath, source: css, root: "/not-an-authorized-rn08-project" })).not.toEqual([]);
  const filePath = "packages/ui/src/pagination/pagination.styles.ts";
  const outputs = getTokenFoundationOutputs();
  const entry = outputs.colorRecipeConsumers.find((consumer: { filePath: string }) => consumer.filePath === filePath)!;
  Object.assign(entry, { foregroundContent: "decorative" });
  expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8"), outputs })).not.toEqual([]);
  expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(filePath, "utf8").replace("text-rain-category-text-neutral-3", "text-rain-category-text-neutral-5") })).not.toEqual([]);
});
