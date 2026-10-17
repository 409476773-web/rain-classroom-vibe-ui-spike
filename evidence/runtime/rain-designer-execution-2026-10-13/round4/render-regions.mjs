// local-experiment: screenshots of supplied images; no application source or page access.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const [manifestPath, outputPath] = process.argv.slice(2);
assert(manifestPath && outputPath, 'usage: node render-regions.mjs MANIFEST OUTPUT');
const { images, regions } = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
assert(Array.isArray(regions) && regions.length <= 8, 'invalid region count');
for (const region of regions) {
  assert(['image', 'x', 'y', 'width', 'height'].every(key => Number.isInteger(region[key])), 'integer bounds required');
  const source = images[region.image - 1];
  assert(source && region.image > 0, 'invalid image index');
  assert(region.x >= 0 && region.y >= 0 && region.width >= 80 && region.height >= 80, 'invalid region bounds');
  assert(region.x + region.width <= source.width && region.y + region.height <= source.height, 'region outside image');
}
await fs.mkdir(outputPath, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--force-color-profile=srgb'] });
const rendered = [];
try {
  const context = await browser.newContext({ deviceScaleFactor: 1, serviceWorkers: 'block' });
  await context.route('**/*', route => route.abort());
  const page = await context.newPage();
  for (const [index, region] of regions.entries()) {
    const source = images[region.image - 1];
    await page.setViewportSize({ width: source.width, height: source.height });
    const data = (await fs.readFile(source.path)).toString('base64');
    await page.setContent('<style>html,body{margin:0;padding:0;overflow:hidden}img{display:block}</style><img alt="source image">');
    const display = await page.locator('img').evaluate(async (img, input) => {
      img.src = `data:${input.mime || 'image/png'};base64,${input.data}`;
      await img.decode();
      const bounds = img.getBoundingClientRect();
      return { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight,
        width: bounds.width, height: bounds.height, x: bounds.x, y: bounds.y,
        dpr: window.devicePixelRatio, zoom: window.visualViewport.scale };
    }, { data, mime: source.mime });
    assert.deepEqual(display, { naturalWidth: source.width, naturalHeight: source.height,
      width: source.width, height: source.height, x: 0, y: 0, dpr: 1, zoom: 1 }, 'image must display at natural size and DPR1');
    const screenshot = path.resolve(outputPath, `region-${String(index + 1).padStart(2, '0')}.png`);
    const { x, y, width, height } = region;
    const png = await page.screenshot({ path: screenshot, clip: { x, y, width, height },
      scale: 'css', omitBackground: true, animations: 'disabled' });
    assert.equal(png.readUInt32BE(16), width, 'screenshot width mismatch');
    assert.equal(png.readUInt32BE(20), height, 'screenshot height mismatch');
    rendered.push({ region: index + 1, image: region.image, path: screenshot, ...display,
      screenshotWidth: width, screenshotHeight: height });
  }
} finally {
  await browser.close();
}
await fs.writeFile(path.join(outputPath, 'rendered.json'), JSON.stringify(rendered, null, 2) + '\n');
console.log(JSON.stringify({ status: 'rendered', count: rendered.length }));
