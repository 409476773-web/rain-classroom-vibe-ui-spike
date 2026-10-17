import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../../../..");
const { chromium } = await import(pathToFileURL(join(root, "node_modules/@playwright/test/index.mjs")).href);
const browser = await chromium.launch({ headless: true });
const viewport = { width: 1024, height: 800 };
const scenes = [];
try {
  for (const file of ["resource-list.html", "notification-settings.html", "learning-units.html"]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1, colorScheme: "light" });
    const errors = [], external = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("request", request => { if (new URL(request.url()).protocol !== "file:") external.push(request.url()); });
    await page.goto(pathToFileURL(join(here, file)).href);
    await page.evaluate(() => document.fonts.ready);
    const facts = await page.evaluate(() => {
      const probes = Object.fromEntries([...document.querySelectorAll("[data-probe]")].map(node => {
        const r = node.getBoundingClientRect();
        return [node.dataset.probe, { x: r.x, y: r.y, width: r.width, height: r.height, text: node.textContent, fontSize: getComputedStyle(node).fontSize }];
      }));
      return { viewport: innerWidth, documentWidth: document.documentElement.scrollWidth, background: getComputedStyle(document.body).backgroundColor, fontSize: getComputedStyle(document.body).fontSize, fontFamily: getComputedStyle(document.body).fontFamily, mainWidth: document.querySelector("main").getBoundingClientRect().width, mainCount: document.querySelectorAll("main").length, headingCount: document.querySelectorAll("h1").length, linkedDescriptionsResolve: [...document.querySelectorAll("[aria-describedby]")].every(node => node.getAttribute("aria-describedby").split(" ").every(id => document.getElementById(id))), probes };
    });
    assert.equal(facts.mainCount, 1);
    assert.equal(facts.mainWidth, 760);
    assert.equal(facts.headingCount, 1);
    assert.equal(facts.fontSize, "14px");
    assert.equal(facts.background, "rgb(242, 244, 255)");
    assert.equal(facts.documentWidth, viewport.width);
    assert.equal(facts.linkedDescriptionsResolve, true);
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("DOM.enable");
    await cdp.send("CSS.enable");
    const { root: dom } = await cdp.send("DOM.getDocument");
    const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: dom.nodeId, selector: "h1" });
    const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    assert(fonts.some(font => font.familyName === "PingFang SC"));
    await page.screenshot({ path: join(here, file.replace(".html", ".png")), fullPage: true });
    scenes.push({ file, facts, fonts, errors, externalRequests: external });
    await page.close();
  }
  const sha256 = bytes => createHash("sha256").update(bytes).digest("hex");
  const files = Object.fromEntries(readdirSync(here).sort().map(file => [file, sha256(readFileSync(join(here, file)))]));
  writeFileSync(join(here, "../fixture-validation.json"), JSON.stringify({ assetIdentity: "local-experiment", purpose: "static visual diagnosis fixtures", checkedAt: new Date().toISOString(), browser: browser.version(), viewport, dpr: 1, zoom: 1, theme: "light", sourceCss: ["packages/foundations/src/tokens.css", "packages/foundations/src/typography.css"].map(file => ({ file, sha256: sha256(readFileSync(join(root, file))) })), fontFilesCopied: false, renderingSelfChecks: "passed", opticalAcceptance: "requires actual screenshot inspection; geometry alone is insufficient", scenes, fileSha256: files }, null, 2) + "\n");
  console.log(JSON.stringify({ scenes: scenes.length, selfChecks: "passed", browser: browser.version(), viewport }));
} finally {
  await browser.close();
}
