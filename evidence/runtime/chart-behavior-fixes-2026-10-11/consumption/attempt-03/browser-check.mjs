import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { chromium, expect } from "@playwright/test";
import { assertDownloadClosure, exportedDownloads } from "../../../../scripts/verify-chart-variant-consumption.mjs";

// Reuses the existing isolated-consumption browser check: export, build, preview, real hover and source freeze.
const workspace = process.cwd();
const evidence = resolve("evidence/runtime/chart-behavior-fixes-2026-10-11/consumption");
const official = JSON.parse(readFileSync(join(evidence, "facts.json"), "utf8"));
const host = official.host;
const port = Number(process.env.RAIN_CHART_CONSUMER_PORT ?? 5191);
const base = `http://127.0.0.1:${port}`;
const ids = ["line-x-axis", "area-default", "scatter-default", "composed-default", "line-profit-loss", "radar-default"];
const hash = content => createHash("sha256").update(content).digest("hex");
const put = (path, text) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, text); };
const facts = { status: "running", host, base, scriptSha256: hash(readFileSync(new URL(import.meta.url))), reuse: "chart-radar-feedback-2026-10-09/consumption-final/browser-check.mjs: isolated preview and real browser pattern", sourceMode: official.mode, officialStatus: official.status, checks: [], pageErrors: [], failedRequests: [], badResponses: [], externalBrowserOrigins: [], limits: ["Copied installed dependency cache and full current UI/Foundation packages; not a clean or minimum Registry installation.", "Twelve representative entries: six families at 1440px reduced motion and six at 390px ordinary motion. The 170-entry type/build check is broader than this browser sample.", "Radar has no native tooltip panel; its precise table, visible polygons, points and interactive legend are checked instead.", "No Safari/VoiceOver, full accessibility, visual Human Gate or publication claim."] };
const save = () => put(join(evidence, "browser-facts.json"), JSON.stringify(facts, null, 2) + "\n");
const sourceChanges = () => official.sourceFiles.filter(file => hash(readFileSync(join(workspace, file.path))) !== file.sha256).map(file => file.path);
let server, browser, page, serverLog = "";
try {
  assert.equal(official.status, "passed");
  assert.equal(official.builtEntries, 170);
  assert.deepEqual(sourceChanges(), []);
  assert.equal(official.externalDependencyLinks, 0);
  assert.equal(official.moduleAudit.externalModulePaths, 0);
  assert.deepEqual(official.aliases, []);
  const reference = JSON.parse(readFileSync(join(workspace, "apps/playground/src/docs/components/chart-variants/reference.json"), "utf8"));
  const selected = ids.map(id => {
    const row = reference.find(row => row.id === id);
    assert(row, `Missing real reference id: ${id}`);
    return row;
  });
  const downloads = await exportedDownloads(join(workspace, "apps/playground/src/docs/components"));
  assert.equal(downloads.exporterSha256, official.exporterSha256);
  facts.normalDownloads = [];
  for (const row of selected) {
    const files = downloads.files(row, "category-near", 0, 0, false);
    assertDownloadClosure(files, `${row.id}-normal`);
    for (const [name, source] of Object.entries(files)) put(join(host, "samples", `${row.id}-normal`, name), source);
    put(join(host, `${row.id}-normal.html`), files["index.html"].replace('src="/main.tsx"', `src="/samples/${row.id}-normal/main.tsx"`));
    facts.normalDownloads.push({ id: row.id, family: row.family, files: Object.entries(files).map(([path, source]) => ({ path, sha256: hash(source) })) });
  }
  const compiler = JSON.parse(readFileSync(join(host, "node_modules/typescript/package.json"), "utf8"));
  const typecheck = spawnSync(process.execPath, [join(host, "node_modules/typescript", compiler.bin.tsc), "--project", "tsconfig.json"], { cwd: host, encoding: "utf8", env: { ...process.env, NODE_PATH: "" } });
  put(join(evidence, "browser-normal-typecheck.log"), `${typecheck.stdout ?? ""}${typecheck.stderr ?? ""}`);
  assert.equal(typecheck.status, 0, "Additional six ordinary-mode captures must typecheck in the same independent host");
  facts.normalTypecheck = "passed";
  const { build } = await import(pathToFileURL(join(host, "node_modules/vite/dist/node/index.js")));
  await build({ root: host, configFile: false, base: "./", oxc: { jsx: { runtime: "automatic" } }, resolve: { alias: [] }, build: { outDir: "dist", emptyOutDir: false, minify: false, rolldownOptions: { input: selected.map(row => join(host, `${row.id}-normal.html`)) } }, plugins: [{ name: "normal-isolated-consumption-audit", generateBundle() {
    const modules = [...this.getModuleIds()].filter(id => isAbsolute(id.split("?")[0]));
    for (const id of modules) assert(realpathSync(id.split("?")[0]).startsWith(host + "/"), `Module escaped independent host: ${id}`);
    facts.normalModuleAudit = { moduleCount: modules.length, externalModulePaths: 0, aliases: [] };
  } }] });
  facts.normalBuild = "passed";
  server = spawn(process.execPath, [join(host, "node_modules/vite/bin/vite.js"), "preview", "--outDir", "dist", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], { cwd: host, stdio: "pipe" });
  server.stdout.on("data", chunk => serverLog += chunk);
  server.stderr.on("data", chunk => serverLog += chunk);
  await expect.poll(async () => { try { return (await fetch(`${base}/line-x-axis.html`)).status; } catch { return 0; } }, { timeout: 15000 }).toBe(200);
  browser = await chromium.launch();
  page = await browser.newPage();
  page.on("pageerror", error => facts.pageErrors.push(error.message));
  page.on("requestfailed", request => facts.failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
  page.on("response", response => { if (response.status() >= 400) facts.badResponses.push({ url: response.url(), status: response.status() }); });
  page.on("request", request => { const url = new URL(request.url()); if (/^https?:$/.test(url.protocol) && url.origin !== base && !facts.externalBrowserOrigins.includes(url.origin)) facts.externalBrowserOrigins.push(url.origin); });
  for (const mode of [{ width: 1440, motion: "reduce", suffix: "" }, { width: 390, motion: "no-preference", suffix: "-normal" }]) {
    await page.setViewportSize({ width: mode.width, height: 1000 });
    await page.emulateMedia({ reducedMotion: mode.motion });
    for (const row of selected) {
      const name = `${row.id}${mode.suffix}`;
      const url = `${base}/${name}.html`;
      facts.currentCase = { id: row.id, width: mode.width, motion: mode.motion, url };
      const html = await (await fetch(url)).text();
      assert.equal(hash(html), hash(readFileSync(join(host, "dist", `${name}.html`))), "Real preview serves this independent built entry");
      await page.goto(url);
      const main = page.locator("main.rain-chart");
      const svg = main.locator("svg").first();
      await expect(svg).toBeVisible();
      await main.getByText("查看精确数据", { exact: true }).click();
      const rows = main.locator("tbody tr");
      await expect(rows).toHaveCount(row.id === "radar-default" ? 2 : 24);
      const table = await rows.evaluateAll(nodes => nodes.map(node => ({ label: node.querySelector("th")?.textContent, values: [...node.querySelectorAll("td")].map(cell => cell.textContent) })));
      assert(table.every(row => row.values.every(value => value !== "" && Number.isFinite(Number(value)))), "Exact table has genuine finite readings");
      const paths = main.locator("svg path");
      if (row.id !== "scatter-default") await expect.poll(async () => paths.evaluateAll(nodes => nodes.some(node => { const path = node; const box = path.getBBox(); return box.width > 10 && box.height > 5 && !/NaN|Infinity/.test(path.getAttribute("d") ?? ""); }))).toBe(true);
      let interaction;
      if (row.id === "radar-default") {
        const groups = main.locator('[data-rain-id="ui-chart-radar"] svg g[style*="cursor"]');
        await expect(groups).toHaveCount(2);
        await expect.poll(async () => groups.evaluateAll(nodes => nodes.every(node => { const box = node.querySelector("path").getBBox(); return box.width > 50 && box.height > 50 && Number(getComputedStyle(node).opacity) > .99; }))).toBe(true);
        const buttons = main.locator(".rain-chart-legend-button");
        await expect(buttons).toHaveCount(2);
        await buttons.first().focus();
        await expect.poll(async () => groups.first().locator("path").evaluate(node => Number(getComputedStyle(node).fillOpacity))).toBeCloseTo(.35, 2);
        await expect.poll(async () => groups.last().evaluate(node => Number(getComputedStyle(node).opacity))).toBeCloseTo(.3, 2);
        interaction = { kind: "interactive-legend", preciseTable: table, focusedFill: await groups.first().locator("path").evaluate(node => Number(getComputedStyle(node).fillOpacity)), peerOpacity: await groups.last().evaluate(node => Number(getComputedStyle(node).opacity)), nativeTooltip: "not-applicable" };
        await buttons.first().evaluate(node => node.blur());
        await page.mouse.move(0, 0);
      } else {
        if (row.id === "scatter-default") await expect.poll(async () => main.locator("svg circle").evaluateAll(nodes => nodes.filter(node => Number(node.getAttribute("r")) > 0).length)).toBeGreaterThanOrEqual(48);
        if (row.id === "composed-default") await expect.poll(async () => main.locator("svg rect").evaluateAll(nodes => nodes.filter(node => Number(node.getAttribute("height")) > 0 && Number(node.getAttribute("width")) > 0).length)).toBeGreaterThanOrEqual(24);
        if (row.id === "line-profit-loss") {
          const strokes = await main.locator('[data-slot="profit-loss-line"] path').evaluateAll(nodes => nodes.map(node => node.getAttribute("stroke")));
          assert(strokes.includes("var(--chart-negative)") && strokes.includes("var(--chart-positive)"), "Native profit/loss segments are both rendered");
        }
        await svg.scrollIntoViewIfNeeded();
        const box = await svg.boundingBox();
        const index = Math.floor(table.length / 2), selectedRow = table[index];
        const left = row.id === "line-profit-loss" ? 58 : 16, right = row.id === "line-profit-loss" ? 24 : 16;
        const tooltip = main.locator(".rain-chart-tooltip");
        await expect.poll(async () => { await page.mouse.move(0, 0); await page.mouse.move(box.x + left + (box.width - left - right) * index / (table.length - 1), box.y + box.height / 2); return tooltip.isVisible(); }).toBe(true);
        await expect(tooltip).toContainText(selectedRow.label);
        for (const value of selectedRow.values) await expect(tooltip).toContainText(new RegExp(`(^|\\D)${value}(\\D|$)`));
        interaction = { kind: "real-pointer-tooltip", index, selectedRow, tooltip: await tooltip.innerText() };
        await page.mouse.move(0, 0);
      }
      const geometry = await svg.evaluate(node => ({ width: Number(node.getAttribute("width")), height: Number(node.getAttribute("height")), paths: [...node.querySelectorAll("path")].map(path => ({ d: path.getAttribute("d"), stroke: path.getAttribute("stroke"), box: { width: path.getBBox().width, height: path.getBBox().height } })), circles: node.querySelectorAll("circle").length, rects: node.querySelectorAll("rect").length }));
      geometry.renderedCircleCount = await main.locator("svg circle").evaluateAll(nodes => nodes.filter(node => Number(node.getAttribute("r")) > 0).length);
      assert(geometry.width > 100 && geometry.height > 100);
      assert(geometry.paths.every(path => !/NaN|Infinity/.test(path.d ?? "")));
      const bounds = await page.evaluate(() => ({ viewport: innerWidth, pageWidth: document.documentElement.scrollWidth }));
      assert(bounds.pageWidth <= bounds.viewport + 1, "Independent page stays inside its viewport");
      await page.screenshot({ path: join(evidence, `${row.id}-${mode.width}-${mode.motion}.png`), fullPage: true });
      facts.checks.push({ id: row.id, family: row.family, chartId: row.chartId, width: mode.width, motion: mode.motion, url, independentServedHtmlVerified: true, table, geometry, interaction, bounds });
      save();
    }
  }
  facts.sourceChanges = sourceChanges();
  const downloaded = new Map(official.variants.flatMap(row => row.files.filter(file => !["main.tsx", "index.html"].includes(file.path)).map(file => [file.path, file.sha256])));
  facts.downloadChanges = [...downloaded].filter(([path, sha]) => hash(readFileSync(join(workspace, "apps/playground/src/docs/components", path))) !== sha).map(([path]) => path);
  assert.deepEqual(facts.sourceChanges, []);
  assert.deepEqual(facts.downloadChanges, []);
  assert.deepEqual(facts.pageErrors, []);
  assert.deepEqual(facts.failedRequests, []);
  assert.deepEqual(facts.badResponses, []);
  assert.deepEqual(facts.externalBrowserOrigins, []);
  facts.status = "passed";
  console.log(JSON.stringify({ status: facts.status, host, base, checks: facts.checks.length, realTooltips: facts.checks.filter(check => check.interaction.kind === "real-pointer-tooltip").length, radarLegends: 2, sourceChanges: facts.sourceChanges, downloadChanges: facts.downloadChanges, pageErrors: facts.pageErrors, normalModuleAudit: facts.normalModuleAudit }, null, 2));
} catch (error) {
  facts.status = "failed"; facts.error = String(error);
  if (page) {
    await page.screenshot({ path: join(evidence, "browser-failed.png"), fullPage: true });
    facts.failureDiagnostics = await page.evaluate(() => ({ hidden: document.hidden, svgs: [...document.querySelectorAll("main svg")].map(svg => ({ width: svg.getAttribute("width"), height: svg.getAttribute("height"), bounds: svg.getBoundingClientRect().toJSON(), paths: [...svg.querySelectorAll("path")].map(path => ({ d: path.getAttribute("d"), stroke: path.getAttribute("stroke"), box: { width: path.getBBox().width, height: path.getBBox().height }, opacity: getComputedStyle(path).opacity })) })) }));
  }
  throw error;
}
finally { if (browser) await browser.close(); if (server) server.kill(); facts.finishedAt = new Date().toISOString(); put(join(evidence, "browser-server.log"), serverLog); save(); }
