import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../../../..');
const { chromium } = await import(pathToFileURL(join(root, 'node_modules/@playwright/test/index.mjs')).href);
const hash = file => createHash('sha256').update(readFileSync(join(here, file))).digest('hex');
const scoringHashBefore = hash('frozen-scoring.json');
const publicFiles = new Set(['schedule.html', 'task-tree.html', 'rain.css', 'holdout.css']);
const server = createServer((request, response) => {
  const file = new URL(request.url, 'http://localhost').pathname.slice(1);
  if (!publicFiles.has(file)) { response.writeHead(file === 'favicon.ico' ? 204 : 404).end(); return; }
  response.writeHead(200, { 'Content-Type': file.endsWith('.css') ? 'text/css; charset=utf-8' : 'text/html; charset=utf-8' });
  response.end(readFileSync(join(here, file)));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true });
const viewport = { width: 1024, height: 800 };
const scenes = [];
try {
  for (const file of ['schedule.html', 'task-tree.html']) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1, colorScheme: 'light' });
    const errors = [], externalRequests = [], failures = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('request', request => { if (new URL(request.url()).origin !== origin) externalRequests.push(request.url()); });
    page.on('requestfailed', request => failures.push(request.url()));
    await page.goto(`${origin}/${file}`);
    await page.evaluate(() => document.fonts.ready);
    const facts = await page.evaluate(() => {
      const probes = Object.fromEntries([...document.querySelectorAll('[data-probe]')].map(node => {
        const r = node.getBoundingClientRect(), style = getComputedStyle(node);
        return [node.dataset.probe, { x:r.x, y:r.y, width:r.width, height:r.height, text:node.textContent, color:style.color, fontSize:style.fontSize, fontWeight:style.fontWeight }];
      }));
      return { width:innerWidth, height:innerHeight, dpr:devicePixelRatio, zoom:getComputedStyle(document.documentElement).zoom, scale:visualViewport.scale, light:matchMedia('(prefers-color-scheme: light)').matches, documentWidth:document.documentElement.scrollWidth, documentHeight:document.documentElement.scrollHeight, bodyBackground:getComputedStyle(document.body).backgroundColor, mainWidth:document.querySelector('main').getBoundingClientRect().width, disabledColor:getComputedStyle(document.documentElement).getPropertyValue('--rain-color-text-disabled').trim(), headingCount:document.querySelectorAll('h1').length, interactiveCount:document.querySelectorAll('button,input,select,a[href],script').length, probes };
    });
    assert.equal(facts.width, 1024); assert.equal(facts.height, 800);
    assert.equal(facts.dpr, 1); assert.equal(facts.zoom, '1'); assert.equal(facts.scale, 1); assert.equal(facts.light, true);
    assert.equal(facts.documentWidth, 1024); assert.equal(facts.documentHeight, 800);
    assert.equal(facts.mainWidth, 760); assert.equal(facts.headingCount, 1); assert.equal(facts.interactiveCount, 0);
    assert.equal(facts.bodyBackground, 'rgb(242, 244, 255)');
    for (const p of Object.values(facts.probes)) { assert(p.x >= 0 && p.y >= 0 && p.x + p.width <= 1024 && p.y + p.height <= 800); }
    if (file === 'schedule.html') {
      const p = facts.probes;
      assert(p['time-three'].y > p['event-two'].y && p['time-three'].y < p['event-two'].y + p['event-two'].height);
      assert(p['event-three'].y - p['time-three'].y >= 40);
      assert.equal(p['room-one'].color, 'rgb(160, 172, 197)');
    } else {
      const p = facts.probes;
      assert(p['child-one'].x - p['parent-one'].x >= 40);
      assert.notEqual(p['complete-status'].color, p['current-status'].color);
      assert.equal(p['current-task'].fontWeight, '600');
    }
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
    const { root: dom } = await cdp.send('DOM.getDocument');
    const fontEvidence = [];
    for (const selector of ['h1', 'h2', '[data-probe]']) {
      const { nodeId } = await cdp.send('DOM.querySelector', { nodeId:dom.nodeId, selector });
      const { fonts } = await cdp.send('CSS.getPlatformFontsForNode', { nodeId });
      assert(fonts.some(font => font.familyName === 'PingFang SC' && font.glyphCount > 0));
      assert(fonts.every(font => !font.isCustomFont));
      fontEvidence.push({ selector, fonts });
    }
    assert.deepEqual(errors, []); assert.deepEqual(externalRequests, []); assert.deepEqual(failures, []);
    const png = file.replace('.html', '.png');
    await page.screenshot({ path:join(here,png), fullPage:false, animations:'disabled' });
    const bytes = readFileSync(join(here,png));
    assert.equal(bytes.readUInt32BE(16), 1024); assert.equal(bytes.readUInt32BE(20), 800);
    scenes.push({ file, png, facts, fontEvidence, errors, externalRequests, failedRequests:failures });
    await page.close();
  }
  assert.equal(hash('frozen-scoring.json'), scoringHashBefore);
  const files = ['rain.css','holdout.css','schedule.html','task-tree.html','render.mjs','frozen-scoring.json','schedule.png','task-tree.png'];
  writeFileSync(join(here,'validation.json'), JSON.stringify({ assetIdentity:'independent-static-simulation-holdout', checkedAt:new Date().toISOString(), browser:browser.version(), viewport, dpr:1, zoom:1, theme:'light', fontFilesDistributed:false, renderingSelfChecks:'passed', geometryMeaning:'Only confirms seeded geometry and rendering conditions, never optical acceptance.', actualScreenshotInspection:'pending', frozenScoringSha256:scoringHashBefore, scenes, fileSha256:Object.fromEntries(files.map(file=>[file,hash(file)])) },null,2)+'\n');
  console.log(JSON.stringify({ scenes:scenes.length, checks:'passed', browser:browser.version(), viewport, scoringSha256:scoringHashBefore }));
} finally { await browser.close(); await new Promise(resolve => server.close(resolve)); }
