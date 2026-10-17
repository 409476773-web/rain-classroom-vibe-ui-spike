import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cpSync, mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync, symlinkSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { chromium, expect } from "@playwright/test";
import { build, preview } from "vite";
import { assertDownloadClosure } from "../../../../../../scripts/verify-chart-variant-consumption.mjs";

const evidence = dirname(fileURLToPath(import.meta.url));
const workspace = resolve(evidence, "../../../../../../");
const host = resolve(evidence, "host-copied");
const hash = content => createHash("sha256").update(content).digest("hex");
const put = (path, content) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content); };
const facts = { startedAt: new Date().toISOString(), command: "node evidence/runtime/chart-variants/feedback-2026-10-08/structure/default-consumer/verify.mjs", source: "Actual default-source browser download links", host, mode: "copied current candidate UI/Foundation sources with reused workspace dependencies; no installation; not a clean or isolated package install", pages: [], checks: [] };
let server;
const browser = await chromium.launch();
try {
  mkdirSync(host, { recursive: true });
  mkdirSync(resolve(host, "node_modules"), { recursive: true });
  for (const name of readdirSync(resolve(workspace, "apps/playground/node_modules"))) {
    if (name === "@rain-next") continue;
    const target = resolve(host, "node_modules", name);
    if (!existsSync(target)) symlinkSync(resolve(workspace, "apps/playground/node_modules", name), target, "dir");
  }
  for (const name of ["ui", "foundations"]) {
    const target = resolve(host, "node_modules/@rain-next", name);
    cpSync(resolve(workspace, "packages", name, "src"), resolve(target, "src"), { recursive: true });
    cpSync(resolve(workspace, "packages", name, "package.json"), resolve(target, "package.json"));
    if (!existsSync(resolve(target, "node_modules"))) symlinkSync(resolve(workspace, "packages", name, "node_modules"), resolve(target, "node_modules"), "dir");
  }
  facts.candidateStyles = ["charts/styles.css", "charts/utilities.generated.css", "breadcrumb/breadcrumb.css"].map(path => ({ path: `packages/ui/src/${path}`, sha256: hash(readFileSync(resolve(host, "node_modules/@rain-next/ui/src", path))) }));
  put(resolve(host, "package.json"), JSON.stringify({ private: true, type: "module" }));
  const page = await browser.newPage({ viewport: { width: 880, height: 796 }, reducedMotion: "reduce" });
  const failures = [];
  page.on("pageerror", error => failures.push(String(error)));
  for (const id of ["choropleth", "sunburst"]) {
    await page.goto(`http://127.0.0.1:5173/#chart-${id}`);
    const source = page.locator('[data-source="default"]');
    await source.locator("summary").click();
    const files = Object.fromEntries(await source.locator("a[download]").evaluateAll(nodes => nodes.map(node => {
      const anchor = node;
      const href = anchor.getAttribute("href");
      return [anchor.getAttribute("download"), decodeURIComponent(href.slice(href.indexOf(",") + 1))];
    })));
    assertDownloadClosure(files, id);
    assert(Object.hasOwn(files, "chart-variants/data/world.geojson"));
    assert(Object.hasOwn(files, "chart-variants/data/README.md"));
    for (const [path, source] of Object.entries(files)) put(resolve(host, id, path), source);
    put(resolve(host, `${id}.html`), files["index.html"].replace('src="/main.tsx"', `src="/${id}/main.tsx"`));
    facts.pages.push({ id, files: Object.entries(files).map(([path, content]) => ({ path, sha256: hash(content) })) });
  }
  put(resolve(host, "env.d.ts"), '/// <reference types="vite/client" />\n');
  put(resolve(host, "tsconfig.json"), JSON.stringify({ compilerOptions: { target: "ES2022", lib: ["ES2022", "DOM", "DOM.Iterable"], module: "ESNext", moduleResolution: "Bundler", jsx: "react-jsx", strict: true, skipLibCheck: true, noEmit: true, allowImportingTsExtensions: true }, include: ["**/*.tsx", "**/*.ts"], exclude: ["node_modules"] }));
  const typed = spawnSync("pnpm", ["exec", "tsc", "--noEmit", "--project", "tsconfig.json"], { cwd: host, encoding: "utf8" });
  put(resolve(evidence, "typecheck.log"), `${typed.stdout}${typed.stderr}`);
  assert.equal(typed.status, 0, "downloaded default sources typecheck");
  facts.checks.push({ name: "Typecheck downloaded default sources", exitCode: typed.status });
  await build({ root: host, configFile: false, base: "./", oxc: { jsx: { runtime: "automatic" } }, build: { outDir: "dist", minify: false, rolldownOptions: { input: [resolve(host, "choropleth.html"), resolve(host, "sunburst.html")] } } });
  facts.checks.push({ name: "Vite production build", entries: 2, status: "passed", htmlAdaptation: "Preserved downloaded index.html; two batch entries only prefix each main.tsx URL with the sample directory" });
  server = await preview({ root: host, configFile: false, preview: { host: "127.0.0.1", port: 0 }, build: { outDir: "dist" } });
  const port = server.httpServer.address().port;
  await page.goto(`http://127.0.0.1:${port}/choropleth.html`);
  await expect(page.locator('[data-rain-id="ui-chart-choropleth"] path')).toHaveCount(177);
  await expect(page.getByText(/Natural Earth 1:110m/)).toBeVisible();
  await page.screenshot({ path: resolve(evidence, "downloaded-world.png"), fullPage: true });
  facts.checks.push({ name: "Downloaded world import and rendering", features: 177, status: "passed" });
  await page.goto(`http://127.0.0.1:${port}/sunburst.html`);
  const title = page.getByRole("heading", { name: "学习内容", exact: true });
  await expect(title).toBeVisible();
  assert.equal(await title.evaluate(node => getComputedStyle(node).fontSize), "15px");
  const segment = page.locator('svg g[style*="cursor: pointer"] path:not([fill="transparent"])').first();
  await expect(segment).toBeVisible();
  const point = await segment.evaluate(path => {
    const box = path.getBBox();
    for (let row = 1; row < 10; row++) for (let column = 1; column < 10; column++) {
      const point = new DOMPoint(box.x + box.width * column / 10, box.y + box.height * row / 10);
      if (path.isPointInFill(point)) { const screen = point.matrixTransform(path.getScreenCTM()); return { x: screen.x, y: screen.y }; }
    }
    return null;
  });
  assert(point, "native sunburst segment contains a clickable fill point");
  await page.mouse.click(point.x, point.y);
  const breadcrumb = page.getByRole("navigation", { name: "学习内容层级" });
  await expect(breadcrumb).toHaveAttribute("data-rain-id", "ui-breadcrumb");
  const rootLink = breadcrumb.getByRole("link", { name: "返回学习内容" });
  await expect(rootLink).toBeVisible();
  await page.screenshot({ path: resolve(evidence, "downloaded-breadcrumb.png"), fullPage: true });
  facts.breadcrumbStyles = await breadcrumb.evaluate(node => {
    const root = getComputedStyle(node), list = getComputedStyle(node.querySelector("ol")), link = getComputedStyle(node.querySelector("a"));
    return { root: { fontSize: root.fontSize, lineHeight: root.lineHeight, color: root.color }, list: { display: list.display, padding: list.padding, margin: list.margin, listStyle: list.listStyleType }, link: { fontSize: link.fontSize, paddingInline: link.paddingInline, textDecoration: link.textDecorationLine, border: link.border } };
  });
  assert.equal(await rootLink.evaluate(node => getComputedStyle(node).fontSize), "13px");
  assert.equal(facts.breadcrumbStyles.root.lineHeight, "18px");
  assert.equal(facts.breadcrumbStyles.list.padding, "0px");
  assert.equal(facts.breadcrumbStyles.list.margin, "0px");
  assert.equal(facts.breadcrumbStyles.list.listStyle, "none");
  assert.equal(facts.breadcrumbStyles.link.paddingInline, "4px");
  assert.equal(facts.breadcrumbStyles.link.textDecoration, "none");
  await expect(page.getByRole("navigation", { name: "学习内容层级" })).toHaveCount(1);
  await rootLink.click(); await expect(title).toBeVisible();
  facts.checks.push({ name: "Downloaded Breadcrumb CSS, native mouse drill and library link return", titleFont: "15px", breadcrumbFont: "13px", status: "passed" });
  assert.deepEqual(failures, []);
  facts.runtimeErrors = failures;
  facts.status = "passed";
} catch (error) {
  facts.status = "failed"; facts.error = String(error); throw error;
} finally {
  if (server) await new Promise(resolve => server.httpServer.close(resolve));
  await browser.close();
  facts.finishedAt = new Date().toISOString();
  put(resolve(evidence, "facts.json"), JSON.stringify(facts, null, 2));
}
