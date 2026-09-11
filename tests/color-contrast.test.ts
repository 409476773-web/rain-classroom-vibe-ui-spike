import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

import { contrastRatio } from "./e2e/color-contrast";

const testsDirectory = dirname(fileURLToPath(import.meta.url));
const helperPath = join(testsDirectory, "e2e/color-contrast.ts");

test("uses one alpha-aware color contrast helper across Chromium specs", async () => {
  expect(existsSync(helperPath)).toBe(true);
  expect(contrastRatio("rgb(0, 0, 0)", "rgb(255, 255, 255)")).toBe(21);
  expect(
    contrastRatio("rgba(0, 0, 0, 0.5)", "rgb(255, 255, 255)"),
  ).toBeCloseTo(3.98, 2);

  for (const spec of ["e2e/foundations.spec.ts", "e2e/playground-shell.spec.ts"]) {
    const source = readFileSync(join(testsDirectory, spec), "utf8");
    expect(source).toContain('from "./color-contrast"');
    expect(source).not.toContain("function contrastRatio(");
  }
});
