import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vitest";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

const files = [
  "packages/ui/src/charts/styles.css",
  "apps/playground/src/docs/components/chart-examples.css",
  "apps/playground/src/docs/components/chart-page.css",
  "apps/prototype/src/scenarios/bklit-validation/catalog.css",
  "apps/playground/src/docs/components/chart-business/chart-business.css",
  "packages/ui/src/charts/matrix/matrix.css",
  "apps/playground/src/docs/components/chart-business/network-page.css",
  "apps/playground/src/docs/components/chart-business/category-page.css",
  "apps/playground/src/docs/components/chart-business/china-region-page.css",
];
const read = (filePath: string) => readFileSync(filePath, "utf8");

test("chart and business color sources register in light mode while contrast and weak-content findings remain pending", () => {
  const pendingContrastFindings: any[] = [], pendingEligibilityFindings: any[] = [];
  for (const filePath of files) expect(validateRegisteredRecipeColors({ filePath, source: read(filePath), pendingContrastFindings, pendingEligibilityFindings }), filePath).toEqual([]);
  expect(pendingContrastFindings.some(row => row.tokenId === "Text/Neutral/5" && row.minimum === 4.5)).toBe(true);
  expect(pendingEligibilityFindings.some(row => row.tokenId === "Text/Neutral/5" && row.interaction === "interactive")).toBe(true);
  for (const row of [...pendingContrastFindings, ...pendingEligibilityFindings]) {
    expect(row.status).toBe("pending-review");
    expect(row.acceptedException).toBe(false);
    expect(row.theme).toBe("light");
  }
});

test("chart registration rejects changed aliases, palettes, extra scope and weaker metadata", () => {
  const filePath = files[0]!;
  const source = read(filePath);
  const mutations = [
    source.replace("--rain-local-chart-series-1: #5074ff", "--rain-local-chart-series-1: #000000"),
    source.replace("--chart-1: var(--rain-local-chart-series-1)", "--chart-1: var(--rain-local-chart-series-5)"),
    source.replace('.rain-chart[data-recipe="category-wide"]', '.rain-chart[data-recipe="unknown"]'),
    source + "\n.escape { --rain-local-chart-series-1: #5074ff; color: var(--chart-1); }\n",
    source + "\n.rain-chart { --another-alias: var(--chart-1); }\n",
    source.replace("--chart-label: var(--rain-category-text-neutral-5)", "--chart-label: var(--rain-category-text-neutral-1)"),
    source.replace(/\.rain-chart \.sankey-nodes text \{[^}]*\}/, rule => `@media (prefers-color-scheme: dark) { ${rule} }`),
  ];
  for (const mutation of mutations) expect(validateRegisteredRecipeColors({ filePath, source: mutation }).length).toBeGreaterThan(0);
  const outputs = getTokenFoundationOutputs();
  const index = outputs.colorCssConsumers.findIndex(entry => entry.filePath === filePath);
  expect(index).toBeGreaterThanOrEqual(0);
  const tampered = structuredClone(outputs);
  const use = tampered.colorCssConsumers[index]!.use as { content: string; critical: boolean };
  use.content = "decorative"; use.critical = false;
  expect(validateRegisteredRecipeColors({ filePath, source, outputs: tampered }).length).toBeGreaterThan(0);
});

test("chart registration requires the exact task authorization and never grants another file the exception", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-chart-colors-"));
  try {
    mkdirSync(join(root, "status"));
    writeFileSync(join(root, "status/current-phase.yaml"), read("status/current-phase.yaml").replace('authorization: "authorized-full-plan-implementation"', 'authorization: "not-authorized"'));
    expect(validateRegisteredRecipeColors({ filePath: files[0]!, source: read(files[0]!), root }).join("\n")).toMatch(/Chart.*authorization/i);
  } finally { rmSync(root, { recursive: true, force: true }); }
  expect(validateRegisteredRecipeColors({ filePath: "packages/ui/src/unregistered-chart.css", source: read(files[0]!) }).length).toBeGreaterThan(0);
});

test("chart registration rejects drift of the fixed upstream source lock", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-chart-source-"));
  try {
    mkdirSync(join(root, "status"));
    mkdirSync(join(root, "packages/ui/src/charts/vendor"), { recursive: true });
    writeFileSync(join(root, "status/current-phase.yaml"), read("status/current-phase.yaml"));
    const lock = JSON.parse(read("packages/ui/src/charts/vendor/source-lock.json"));
    writeFileSync(join(root, "packages/ui/src/charts/vendor/source-lock.json"), JSON.stringify({ ...lock, commit: "another-source" }));
    expect(validateRegisteredRecipeColors({ filePath: files[0]!, source: read(files[0]!), root }).join("\n")).toMatch(/Chart source lock/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
