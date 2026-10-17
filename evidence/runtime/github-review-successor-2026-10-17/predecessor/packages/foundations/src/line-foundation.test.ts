import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { compile } from "tailwindcss";
import { describe, expect, it } from "vitest";

import * as tokens from "./token-contract";
import { compositionSpaceTokens } from "./composition-contract";
import { rainCn } from "../../ui/src/utils/rain-class-names";
import { generateTokenFoundations } from "../../../scripts/generate-token-foundations.mjs";

describe("Token Foundations V1 line and geometry", () => {
  it("refuses a second hand-written fact outside generated sections", () => {
    const root = mkdtempSync(join(tmpdir(), "rain-token-generation-"));
    try {
      mkdirSync(join(root, "packages/foundations/src"), { recursive: true });
      for (const name of ["tokens.css", "typography.css", "tailwind-theme.css"]) {
        writeFileSync(join(root, "packages/foundations/src", name), readFileSync(`packages/foundations/src/${name}`, "utf8"));
      }
      const path = join(root, "packages/foundations/src/tokens.css");
      writeFileSync(path, `${readFileSync(path, "utf8")}\n:root { --rain-category-text-neutral-1: rgb(255 0 0); }`);
      expect(() => generateTokenFoundations({ root, check: true })).toThrow(/outside its generated section/);
    } finally { rmSync(root, { recursive: true, force: true }); }
  });
  it("exposes fixed line thickness independently from spacing and component sizes", () => {
    expect(tokens).toHaveProperty("lineThicknessTokens", {
      "1": "1px", "2": "2px", "3": "3px", "4": "4px", "5": "5px", "6": "6px",
    });
    expect(Object.keys(compositionSpaceTokens)).toEqual([
      "0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "40",
    ]);
    expect(Object.keys(tokens.radiusTokens)).toEqual(["4", "6", "8", "10", "12", "16", "full"]);
    expect(compositionSpaceTokens).not.toHaveProperty("1");
  });

  it("compiles the 18 exact line entrances without opening spacing or zero/single-side aliases", async () => {
    const source = readFileSync("packages/foundations/src/tailwind-theme.css", "utf8");
    const compiler = await compile(`${source}\n@tailwind utilities;`);
    const allowed = [1, 2, 3, 4, 5, 6].flatMap((n) => [
      `border-rain-line-${n}`, `h-rain-line-${n}`, `w-rain-line-${n}`,
    ]);
    const forbidden = ["gap-rain-line-1", "p-rain-line-2", "size-rain-line-3", "h-rain-line-0", "border-t-rain-line-1"];
    const css = compiler.build([...allowed, ...forbidden, "border-dashed", "rounded-rain-12", "gap-rain-28"]);
    for (const name of allowed) expect(css).toContain(`.${name} {`);
    for (const name of forbidden) expect(css).not.toContain(`.${name} {`);
    expect(css).toContain("height: var(--rain-line-thickness-1)");
    expect(css).toContain("border-width: var(--rain-line-thickness-6)");
    expect(css).toContain(".border-dashed");
    expect(css).toContain(".rounded-rain-12");
    expect(css).toContain(".gap-rain-28");
  });

  it("replaces the painted dimension while keeping boundary color and line style", () => {
    expect(rainCn("border-rain-line-2 border-rain-border-subtle border-solid", "border-rain-line-4 border-dashed"))
      .toBe("border-rain-border-subtle border-rain-line-4 border-dashed");
    expect(rainCn("h-rain-line-2", "h-rain-line-4")).toBe("h-rain-line-4");
    expect(rainCn("w-rain-line-2", "w-full")).toBe("w-full");
    expect(rainCn("hover:border-rain-line-2", "border-rain-line-4"))
      .toBe("hover:border-rain-line-2 border-rain-line-4");
  });
});
