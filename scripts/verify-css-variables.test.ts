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

it("does not let an isolated definition satisfy an entry that never imports it", () => {
  const result = checkCssVariables(new Map([
    ["app.ts", 'import "./consumer.css";'],
    ["consumer.css", '.test { height: var(--rain-only-isolated); }'],
    ["isolated.css", ':root { --rain-only-isolated: 1px; }'],
  ]), { entrypoints: [{ name: "app", files: ["app.ts"] }] });
  expect(result.failures).toEqual([expect.stringContaining("not reachable from entry app: --rain-only-isolated")]);
});

it("follows real static exports and CSS imports while reporting lazy-only definitions as pending", () => {
  const result = checkCssVariables(new Map([
    ["app.ts", 'import "./consumer.css"; export * from "./barrel"; import("./late.css");'],
    ["barrel.ts", 'import "@rain-next/example/tokens.css";'],
    ["tokens.css", ':root { --rain-thickness: 1px; }'],
    ["late.css", ':root { --rain-late: 1px; }'],
    ["consumer.css", '@import "./local.css"; .test { height: var(--rain-thickness); width: var(--rain-late); gap: var(--rain-local); }'],
    ["local.css", ' :root { --rain-local: 2px; }'],
  ]), { entrypoints: [{ name: "app", files: ["app.ts"] }], packageExports: new Map([["@rain-next/example/tokens.css", "tokens.css"]]) });
  expect(result.failures).toEqual([]);
  expect(result.pendingReview).toContainEqual(expect.objectContaining({ variable: "--rain-late", reason: expect.stringContaining("lazy") }));
  expect(result.entrypoints[0]).toMatchObject({ name: "app", files: 6, eagerFiles: 5 });
  expect(result.limitations.join(" ")).toMatch(/scope.*cascade/);
});

it("ignores comments without deleting comment-like strings or accepting commented imports", () => {
  const result = checkCssVariables(new Map([
    ["app.ts", '// import "./isolated.css"; var(--rain-comment)\nimport "./consumer.css"; const value = "/* literal */ var(--rain-known)";'],
    ["consumer.css", '/* var(--rain-comment) */ :root { --rain-known: 1px; } .test { width: var(--rain-known); }'],
    ["isolated.css", ':root { --rain-comment: 1px; }'],
  ]), { entrypoints: [{ name: "app", files: ["app.ts"] }] });
  expect(result.failures).toEqual([]);
  expect(result.references).toBe(2);
  expect(result.entrypoints[0]!.files).toBe(2);
});

it("records third-party fallbacks separately and never lets a fallback hide a missing Rain token", () => {
  const result = checkCssVariables(new Map([["app.css", '.test { width: var(--vendor-width, 10px); height: var(--vendor-height); color: var(--rain-typo, var(--vendor-color, red)); }']]), { entrypoints: [{ name: "app", files: ["app.css"] }] });
  expect(result.failures).toEqual([expect.stringContaining("undefined --rain-typo")]);
  expect(result.externalReferences).toEqual(expect.arrayContaining([
    expect.objectContaining({ file: "app.css", variable: "--vendor-width", fallback: true }),
    expect.objectContaining({ file: "app.css", variable: "--vendor-height", fallback: false }),
    expect.objectContaining({ file: "app.css", variable: "--vendor-color", fallback: true }),
  ]));
  expect(result.pendingReview).toContainEqual(expect.objectContaining({ variable: "--vendor-height", reason: expect.stringContaining("external producer") }));
});

it("reports unresolved local entry dependencies instead of claiming reachability", () => {
  const result = checkCssVariables(new Map([["app.ts", 'import "./missing.css";']]), { entrypoints: [{ name: "app", files: ["app.ts"] }] });
  expect(result.failures).toEqual([expect.stringContaining("unresolved local dependency ./missing.css")]);
});


it("keeps optional host overrides finite by consumer, producer and exact fallback", () => {
  const consumer = "packages/ui/src/tree/tree.tsx", producer = "apps/playground/src/recipes/navigation-v042/r1-r3.css";
  const options = { entrypoints: [{ name: "tree", files: [consumer] }] };
  const sources = new Map([[consumer, 'const style = "var(--rain-tree-row-inset, 8px)";'], [producer, '.local-tree { --rain-tree-row-inset: 12px; }']]);
  const result = checkCssVariables(sources, options);
  expect(result.failures).toEqual([]);
  expect(result.pendingReview).toContainEqual(expect.objectContaining({ variable: "--rain-tree-row-inset", producer, reason: expect.stringContaining("optional host override") }));
  sources.set(consumer, 'const style = "var(--rain-tree-row-inset)";');
  expect(checkCssVariables(sources, options).failures).toEqual([expect.stringContaining("not reachable")]);
  sources.set(consumer, 'const style = "var(--rain-tree-row-typo, 8px)";');
  expect(checkCssVariables(sources, options).failures).toEqual([expect.stringContaining("undefined --rain-tree-row-typo")]);
});


it("records a component-local inline producer without pretending its stylesheet mounts that component", () => {
  const result = checkCssVariables(new Map([
    ["packages/ui/src/tree/tree.css", '.rain-tree-node { height: var(--rain-tree-anchor); }'],
    ["packages/ui/src/tree/tree.tsx", 'const style = { "--rain-tree-anchor": "22px" };'],
  ]), { entrypoints: [{ name: "css-only", files: ["packages/ui/src/tree/tree.css"] }] });
  expect(result.failures).toEqual([]);
  expect(result.pendingReview).toContainEqual(expect.objectContaining({ variable: "--rain-tree-anchor", producer: "packages/ui/src/tree/tree.tsx", scope: ".rain-tree-node", reason: expect.stringContaining("mounted scope") }));
});
