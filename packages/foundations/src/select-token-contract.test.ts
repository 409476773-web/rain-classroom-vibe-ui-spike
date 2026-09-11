import { compile } from "tailwindcss";
import { expect, it } from "vitest";
import { getTokenFoundationOutputs } from "../../../scripts/token-foundation-outputs.mjs";
import { getGeneratedTokenFiles } from "../../../scripts/generate-token-foundations.mjs";

it("keeps Select geometry scoped and aliases the existing equal-purpose field heights", async () => {
  const variables = getTokenFoundationOutputs().variables as Record<string, string>;
  for (const size of [24, 28, 32, 36]) {
    expect(variables[`--rain-select-height-${size}`]).toBe(`var(--rain-input-height-${size})`);
  }
  expect(variables["--rain-select-action-size"]).toBe("24px");
  const bridge = getGeneratedTokenFiles()["packages/foundations/src/tailwind-theme.css"]!;
  const compiler = await compile(`${bridge}\n@tailwind utilities;`);
  const css = compiler.build(["h-rain-select-30", "w-rain-select-24", "gap-rain-select-24"]);
  for (const size of [24, 28, 32, 36]) expect(css).toContain(`.h-rain-select-${size} {`);
  expect(css).toContain(".size-rain-select-action {");
  for (const name of ["h-rain-select-30", "w-rain-select-24", "gap-rain-select-24"]) expect(css).not.toContain(`.${name} {`);
  expect(compiler.sources).toEqual([]);
});
