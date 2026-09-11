import { compile } from "tailwindcss";
import { expect, it } from "vitest";
import { getTokenFoundationOutputs } from "../../../scripts/token-foundation-outputs.mjs";
import { getGeneratedTokenFiles } from "../../../scripts/generate-token-foundations.mjs";

it("provides the four complete Input heights and a 24px clear target without opening a spacing scale", async () => {
  const outputs = getTokenFoundationOutputs();
  expect(outputs.variables).toMatchObject({
    "--rain-input-height-24": "24px", "--rain-input-height-28": "28px",
    "--rain-input-height-32": "32px", "--rain-input-height-36": "36px",
    "--rain-input-clear-size": "24px",
  });
  const bridge = getGeneratedTokenFiles()["packages/foundations/src/tailwind-theme.css"]!;
  const compiler = await compile(`${bridge}\n@tailwind utilities;`);
  const css = compiler.build(["h-rain-input-30", "w-rain-input-24", "gap-rain-input-24"]);
  for (const size of [24, 28, 32, 36]) expect(css).toContain(`.h-rain-input-${size} {`);
  expect(css).toContain(".size-rain-input-clear {");
  for (const name of ["h-rain-input-30", "w-rain-input-24", "gap-rain-input-24"]) expect(css).not.toContain(`.${name} {`);
  expect(compiler.sources).toEqual([]);
  expect(getGeneratedTokenFiles()["packages/foundations/src/tokens.css"]).toContain("--rain-input-clear-min-height: var(--rain-space-24);");
});
