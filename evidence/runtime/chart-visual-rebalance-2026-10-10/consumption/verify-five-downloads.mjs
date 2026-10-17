import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cpSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn, spawnSync } from "node:child_process";
import { chromium, expect } from "@playwright/test";
import { assertDownloadClosure, exportedDownloads } from "../../../../scripts/verify-chart-variant-consumption.mjs";

const evidence = dirname(fileURLToPath(import.meta.url));
const workspace = resolve(evidence, "../../../..");
const read = path => readFileSync(path, "utf8");
const hash = value => createHash("sha256").update(value).digest("hex");
const put = (path, value) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, value); };
const setup = JSON.parse(read(join(evidence, "setup-facts.json")));
const host = realpathSync(setup.host);
const port = 5188;
const facts = {
  startedAt: new Date().toISOString(), command: `node ${fileURLToPath(import.meta.url)}`, verifierSha256: hash(readFileSync(fileURLToPath(import.meta.url))),
  host, port, status: "running", mode: "new isolated host, freshly copied current UI and Foundations sources; copied already installed dependencies; not a clean install",
  dependencySource: setup.dependencySource, dependencyLinks: { internal: setup.internalDependencyLinks, external: setup.externalDependencyLinks },
  styleRequirements: { foundations: ["tokens.css", "typography.css", "focus.css", "tailwind-theme.css"], rainUi: "@rain-next/ui/styles.css and Tailwind utilities compiled from the copied @rain-next/ui/src and each downloaded sample", charts: "@rain-next/ui/charts/styles.css and the actual downloaded CSS", defaultExamples: "Default examples use Rain Button and Breadcrumb; their restored component styles require the ordinary Rain UI/Tailwind host setup, not only chart CSS" },
  sourceScope: "complete current UI and Foundations packages, not minimum Registry item installation", checks: [], errors: [], commands: [],
};
let browser, server, serverLog = "";
try {
  facts.sourceFiles = [];
  facts.packageManifests = [];
  for (const name of ["ui", "foundations"]) {
    const target = join(host, "node_modules/@rain-next", name);
    rmSync(join(target, "src"), { recursive: true, force: true });
    cpSync(join(workspace, "packages", name, "src"), join(target, "src"), { recursive: true });
    const manifestPath = `packages/${name}/package.json`, manifest = JSON.parse(read(join(workspace, manifestPath)));
    if (name === "ui") manifest.dependencies["@rain-next/foundations"] = "0.0.0";
    put(join(target, "package.json"), JSON.stringify(manifest, null, 2));
    facts.packageManifests.push({ path: manifestPath, currentSha256: hash(readFileSync(join(workspace, manifestPath))), copiedSha256: hash(readFileSync(join(target, "package.json"))), adaptation: name === "ui" ? "workspace Foundations points to copied 0.0.0 package" : "none" });
    for (const file of readdirSync(join(target, "src"), { recursive: true })) if (lstatSync(join(target, "src", file)).isFile()) facts.sourceFiles.push({ path: `packages/${name}/src/${file}`, sha256: hash(readFileSync(join(target, "src", file))) });
  }
  const registryPath = join(workspace, "registry/charts.json"), registry = JSON.parse(read(registryPath));
  assert.equal(registry.items.length, 19);
  facts.registry = { sha256: hash(readFileSync(registryPath)), items: [] };
  for (const item of registry.items) {
    const paths = [...new Set([...registry.shared.files, ...item.files])];
    assertDownloadClosure(Object.fromEntries(paths.map(path => [path, read(join(workspace, path))])), item.name);
    facts.registry.items.push({ name: item.name, files: paths.length, closure: "passed" });
  }
  const directory = join(workspace, "apps/playground/src/docs/components");
  const business = await exportedDownloads(directory, "chartBusinessFiles"), single = await exportedDownloads(directory, "chartExampleFiles"), variants = await exportedDownloads(directory, "chartVariantFiles");
  assert.equal(business.exporterSha256, single.exporterSha256); assert.equal(single.exporterSha256, variants.exporterSha256);
  facts.exporterSha256 = business.exporterSha256;
  const variant = JSON.parse(read(join(directory, "chart-variants/reference.json"))).find(item => item.id === "sunburst-interactive");
  assert(variant);
  const samples = [
    ...["normal", "long"].map(state => ({ name: `business-${state}`, kind: "business", settings: { recipe: "monochrome-blue", state, revision: 0, descending: false, many: false, filter: false } })),
    ...["normal", "long"].map(state => ({ name: `sunburst-${state}`, kind: "default", settings: { id: "sunburst", recipe: "category-near", state, size: "standard", revision: 0 } })),
    { name: "sunburst-interactive", kind: "variant", settings: { recipe: "category-near", revision: 0, reduced: true } },
  ];
  facts.downloads = [];
  for (const sample of samples) {
    const files = sample.kind === "business" ? business.files(sample.settings) : sample.kind === "default" ? single.files(sample.settings) : variants.files(variant, sample.settings.recipe, 0, 0, true);
    assertDownloadClosure(files, sample.name);
    for (const [path, source] of Object.entries(files)) put(join(host, sample.name, path), source);
    put(join(host, `${sample.name}.html`), files["index.html"].replace('src="/main.tsx"', `src="/${sample.name}/main.tsx"`).replace("</head>", '<link rel="stylesheet" href="./consumer.css"></head>'));
    facts.downloads.push({ ...sample, files: Object.entries(files).map(([path, source]) => ({ path, sha256: hash(source) })) });
  }
  put(join(host, "consumer.css"), `@import "tailwindcss" source(none);\n@import "@rain-next/foundations/tailwind-theme.css";\n@import "@rain-next/ui/styles.css";\n@source "./node_modules/@rain-next/ui/src";\n${samples.map(sample => `@source "./${sample.name}";`).join("\n")}\n:root { font-family:var(--rain-font-ui); color:var(--rain-color-text-primary); }\n`);
  facts.hostCss = { path: "consumer.css", sha256: hash(readFileSync(join(host, "consumer.css"))), scanSources: ["node_modules/@rain-next/ui/src", ...samples.map(sample => sample.name)], uiStyleImport: true, tailwindVersion: JSON.parse(read(join(host, "node_modules/tailwindcss/package.json"))).version };
  put(join(host, "visual-tsconfig.json"), JSON.stringify({ extends: "./tsconfig.json", include: [...samples.flatMap(sample => [`${sample.name}/**/*.tsx`, `${sample.name}/**/*.ts`]), "env.d.ts"] }, null, 2));
  const compiler = JSON.parse(read(join(host, "node_modules/typescript/package.json"))), args = [join(host, "node_modules/typescript", compiler.bin.tsc), "--project", "visual-tsconfig.json"];
  const started = Date.now(), typed = spawnSync(process.execPath, args, { cwd: host, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  put(join(evidence, "typecheck.log"), typed.stdout + typed.stderr);
  facts.commands.push({ label: "typecheck", command: process.execPath, args, cwd: host, exitCode: typed.status, elapsedMs: Date.now() - started });
  assert.equal(typed.status, 0, "Five current downloads typecheck failed");
  const { build } = await import(pathToFileURL(join(host, "node_modules/vite/dist/node/index.js")).href);
  const { default: tailwindcss } = await import(pathToFileURL(join(host, "node_modules/@tailwindcss/vite/dist/index.mjs")).href);
  const buildStarted = Date.now();
  await build({ root: host, configFile: false, base: "./", oxc: { jsx: { runtime: "automatic" } }, resolve: { alias: [] }, plugins: [tailwindcss(), { name: "isolated-current-source-audit", generateBundle() { const modules = [...this.getModuleIds()].filter(id => isAbsolute(id.split("?")[0])); for (const id of modules) assert(realpathSync(id.split("?")[0]).startsWith(host + "/"), `Module escaped copied host: ${id}`); facts.moduleAudit = { modules: modules.length, externalModulePaths: 0 }; put(join(evidence, "module-paths.json"), JSON.stringify(modules, null, 2)); } }], build: { outDir: "dist-visual", rolldownOptions: { input: samples.map(sample => join(host, `${sample.name}.html`)) } } });
  facts.build = { status: "passed", entries: samples.length, elapsedMs: Date.now() - buildStarted };
  server = spawn(process.execPath, [join(host, "node_modules/vite/bin/vite.js"), "preview", "--outDir", "dist-visual", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], { cwd: host, stdio: "pipe" });
  server.stdout.on("data", chunk => serverLog += chunk); server.stderr.on("data", chunk => serverLog += chunk);
  await expect.poll(async () => { try { return (await fetch(`http://127.0.0.1:${port}/business-normal.html`)).status; } catch { return 0; } }, { timeout: 15000 }).toBe(200);
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  page.on("pageerror", error => facts.errors.push(error.message));
  for (const sample of samples) {
    await page.goto(`http://127.0.0.1:${port}/${sample.name}.html`);
    await expect(page.locator("svg").first()).toBeVisible();
    expect(await page.locator("svg path").evaluateAll(paths => paths.filter(path => /NaN|Infinity|undefined/.test(path.getAttribute("d") ?? "")).length)).toBe(0);
    if (sample.kind === "business") {
      await expect(page.locator(".rain-business-mini-gallery__group")).toHaveCount(9);
      for (const group of await page.locator(".rain-business-mini-gallery__group").all()) { await expect(group.locator("figure")).toHaveCount(2); await expect(group.locator("[data-size=compact]")).toHaveCount(1); await expect(group.locator("[data-size=comfortable]")).toHaveCount(1); }
      await page.locator(".rain-business-cards").scrollIntoViewIfNeeded();
      await expect(page.locator(".rain-business-cards .rain-business-number")).toHaveCount(3);
      await expect(page.locator(".rain-business-cards [data-mini-reading]")).toHaveCount(0);
      await expect(page.locator(".rain-business-cards .rain-business-number").last()).toContainText("20%");
      const primaryStyles = await page.locator(".rain-business-cards .rain-business-number").evaluateAll(nodes => nodes.map(node => { const css = getComputedStyle(node); return { text: node.textContent, fontSize: css.fontSize, lineHeight: css.lineHeight, fontFamily: css.fontFamily }; }));
      for (const style of primaryStyles) { expect(style.fontSize).toBe("28px"); expect(style.lineHeight).toBe("36px"); expect(style.fontFamily).toContain("LINE Seed"); }
      await page.locator(".rain-business-table").scrollIntoViewIfNeeded();
      await expect(page.locator(".rain-business-table tbody tr")).toHaveCount(5);
      const readingStyles = await page.locator(".rain-business-reading").evaluateAll(nodes => nodes.map(node => { const css = getComputedStyle(node); return { text: node.textContent, fontSize: css.fontSize, lineHeight: css.lineHeight, fontFamily: css.fontFamily }; }));
      expect(readingStyles.length).toBeGreaterThan(0);
      for (const style of readingStyles) { expect(style.fontSize).toBe("13px"); expect(style.lineHeight).toBe("20px"); expect(style.fontFamily).toContain("LINE Seed"); }
      const before = await page.locator(".rain-business-number").first().innerText();
      await page.getByRole("button", { name: "更新数据", exact: true }).click();
      await expect(page.locator(".rain-business-number").first()).not.toHaveText(before);
      await expect(page.locator(".rain-business-table tbody tr").first().locator(".rain-data-bar")).toHaveAttribute("data-fraction", "0.75");
      await page.locator(".rain-business-row-link").first().click();
      await expect(page.locator(".rain-business-detail")).toContainText("每日读数");
      facts.checks.push({ name: sample.name, miniPairs: "9 kinds with two sizes", primaryStyles, readingStyles, updateAndDetails: "passed" });
    } else {
      const layer = page.getByRole("group", { name: "当前层级，可用键盘查看下级", exact: true });
      const long = sample.settings.state === "long", suffix = long ? " · 综合课程学习情况" : "";
      const drill = layer.getByRole("button", { name: `查看基础课程${suffix}`, exact: true });
      await expect(drill).toHaveAttribute("data-rain-id", "ui-button");
      const style = await drill.evaluate(node => { const css = getComputedStyle(node); return { backgroundColor: css.backgroundColor, color: css.color, padding: css.padding, fontSize: css.fontSize, height: node.getBoundingClientRect().height, genericNativeRuleMatches: node.matches(".rain-chart :is(button,select):where(:not([data-rain-id]))") }; });
      expect(style.genericNativeRuleMatches).toBe(false); expect(style.backgroundColor).toBe("rgba(0, 0, 0, 0)");
      await drill.focus(); await page.keyboard.press("Enter");
      const breadcrumb = page.getByRole("navigation", { name: "学习内容层级", exact: true });
      const back = breadcrumb.getByRole("link", { name: "返回学习内容", exact: true });
      await expect(breadcrumb.getByText(`基础课程${suffix}`, { exact: true })).toHaveAttribute("aria-current", "page");
      if (sample.kind === "default") { await expect(back).toBeFocused(); if (long) { const video = layer.getByRole("button", { name: "查看视频", exact: true }); await video.focus(); await page.keyboard.press("Enter"); await expect(breadcrumb.getByText("视频", { exact: true })).toHaveAttribute("aria-current", "page"); const parent = breadcrumb.getByRole("link", { name: `返回基础课程${suffix}`, exact: true }); await parent.focus(); await page.keyboard.press("Enter"); await expect(video).toBeFocused(); } await back.focus(); await page.keyboard.press("Enter"); await expect(drill).toBeFocused(); }
      else { await back.click(); await expect(drill).toBeVisible(); }
      if (sample.kind === "default") { await page.getByText("查看精确数据", { exact: true }).click(); await expect(page.getByRole("table")).toContainText("学习内容 / 基础课程"); const before = await page.getByRole("table").locator("td").allTextContents(); await page.getByRole("button", { name: "更新数据", exact: true }).click(); await expect.poll(() => page.getByRole("table").locator("td").allTextContents()).not.toEqual(before); }
      facts.checks.push({ name: sample.name, rainButtonStyles: style, keyboardDrillAndReturn: "passed", multilevelFocusReturn: long ? "passed" : "not-applicable" });
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: join(evidence, `${sample.name}-1440.png`), fullPage: true });
    await page.setViewportSize({ width: 390, height: 1000 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.screenshot({ path: join(evidence, `${sample.name}-390.png`), fullPage: true });
    facts.checks.push({ name: sample.name, render: "passed", finiteGeometry: "passed", narrow: "passed", width: 390 });
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  for (const sample of facts.downloads) for (const file of sample.files) if (!["main.tsx", "index.html"].includes(file.path)) assert.equal(hash(readFileSync(join(directory, file.path))), file.sha256, `Downloaded source changed during validation: ${file.path}`);
  for (const file of facts.sourceFiles) assert.equal(hash(readFileSync(join(workspace, file.path))), file.sha256, `Copied Rain source changed during validation: ${file.path}`);
  for (const manifest of facts.packageManifests) assert.equal(hash(readFileSync(join(workspace, manifest.path))), manifest.currentSha256, `Package changed during validation: ${manifest.path}`);
  assert.equal(hash(readFileSync(join(directory, "chart-example-source.tsx"))), facts.exporterSha256);
  assert.equal(hash(readFileSync(registryPath)), facts.registry.sha256);
  assert.deepEqual(facts.errors, []);
  facts.status = "passed";
  console.log(JSON.stringify({ downloads: samples.length, registryClosures: facts.registry.items.length, typecheckExit: typed.status, build: facts.build.status, errors: facts.errors.length, moduleAudit: facts.moduleAudit, host, evidence }));
} catch (error) { facts.status = "failed"; facts.error = String(error); throw error; }
finally { await browser?.close(); server?.kill("SIGTERM"); put(join(evidence, "server.log"), serverLog); facts.finishedAt = new Date().toISOString(); put(join(evidence, "facts.json"), JSON.stringify(facts, null, 2) + "\n"); }
