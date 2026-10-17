import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

// Review evidence only; this does not change either visual baseline or application state storage.
const phase = process.argv[2];
if (!['before', 'after'].includes(phase)) throw new Error('Expected before or after');
const out = resolve('evidence/runtime/navigation-v042/review-01', `${phase}-${new Date().toISOString().replace(/[:.]/g, '-')}`);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 1, locale: 'zh-CN', reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
const facts = { phase, browser: browser.version(), dpr: 1, captures: [], errors };
const measure = async (root, selectors) => root.evaluate((root, selectors) => selectors.flatMap(selector => [...root.querySelectorAll(selector)].map(el => {
  const r = el.getBoundingClientRect(), s = getComputedStyle(el);
  return { selector, text: el.textContent.trim().slice(0, 80), x: r.x, y: r.y, width: r.width, height: r.height,
    styles: Object.fromEntries(['fontSize','fontWeight','lineHeight','color','backgroundColor','gap','padding','marginTop','marginBottom','flexDirection','justifyContent'].map(key => [key,s[key]])) };
})), selectors);
const capture = async (root, name, selectors) => {
  await page.evaluate(() => document.fonts.ready);
  await root.screenshot({ path: resolve(out, name + '.png'), animations: 'disabled' });
  facts.captures.push({ name, measurements: await measure(root, selectors) });
};
try {
  if (phase === 'before') {
    const pack = resolve('../../rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack');
    const reference = await readFile(resolve(pack,'reference/approved-v0.4.2.html'));
    facts.referenceSha256 = createHash('sha256').update(reference).digest('hex');
    await page.goto('http://127.0.0.1:5199/reference/approved-v0.4.2.html#R2');
    // Same existing reference diagnostics as the W1 capture: artboard setup only.
    await page.evaluate(() => {
      YKT_DEBUG.navigate('R2');
      if (typeof vClearTransientSession === 'function') vClearTransientSession();
      configs[current] = { ...defaults, ...cfg(), preset:'brand', density:'regular', contour:'rounded', polish:'refined', connectionRevision:'current', inspect:'native', viewport:1440, frameHeight:800 };
      render(); document.body.classList.add('standalone'); resizeScene();
    });
    const ref = page.locator('.prototype');
    const selectors = ['.rail', '.vr-pane-head', '.rail-logo', '.rail-bottom', '.vr-account', '.vr-account-copy', '.vr-utilities'];
    await capture(ref, 'reference-compact-1440', selectors);
    await ref.locator('.rail').getByRole('button',{name:'展开平台导航',exact:true}).click();
    await capture(ref, 'reference-expanded-1440', selectors);
  }
  await page.goto('http://127.0.0.1:5198/#navigation-v042');
  const root = page.locator('.nv42-r2');
  const selectors = ['.nv42-rail','.nv42-rail-head','.nv42-brand','.nv42-rail-head .rain-icon', '.nv42-rail-links [data-slot="item"]','.nv42-rail-links .rain-icon','.nv42-rail-footer','.nv42-account','.nv42-account-copy','.nv42-utilities','.nv42-context-head','.nv42-context-head strong','.nv42-back','.nv42-back .rain-icon','.nv42-term','.nv42-term .rain-icon','.nv42-course-links [data-slot="item"]','.nv42-history','.nv42-history .rain-icon','.nv42-main','.rain-navigation__description','.rain-navigation__identity .rain-tabs__label','.nv42-path','.nv42-title-row h3','.nv42-title-row p','.nv42-stats'];
  for (const width of [1440,1200]) {
    await page.getByRole('combobox',{name:/画板宽度/}).selectOption(String(width));
    const rail = root.getByRole('navigation',{name:'平台导航',exact:true});
    await capture(root, `candidate-compact-${width}`, selectors);
    await rail.getByRole('button',{name:'展开平台导航',exact:true}).click();
    await capture(root, `candidate-expanded-${width}`, selectors);
    await rail.getByRole('link',{name:'工作台',exact:true}).hover();
    await capture(rail, `candidate-platform-hover-${width}`, ['[data-slot="item"]']);
    await root.getByRole('link',{name:'数据面板',exact:true}).hover();
    await capture(root.locator('.nv42-context'), `candidate-context-hover-${width}`, ['[data-slot="item"]','.nv42-history']);
    await rail.getByRole('button',{name:'收起平台导航',exact:true}).click();
  }
  if (phase === 'after') {
    await root.getByRole('button',{name:'2026 秋季学期',exact:true}).click();
    await page.screenshot({path:resolve(out,'candidate-term-open.png')});
    await page.keyboard.press('Escape');
  }
  await writeFile(resolve(out,'measurements.json'), JSON.stringify(facts,null,2));
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(out);
} finally { await browser.close(); }
