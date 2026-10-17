import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

// Run against the existing Playground: node packages/ui/src/navigation/navigation-isolation.browser.mjs [url]
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.goto(process.argv[2] ?? 'http://127.0.0.1:5198/#navigation-v042');
  await page.waitForSelector('.rain-scope-navigation .rain-connected-surface__panel');
  const result = await page.evaluate(async () => {
    const resources = performance.getEntriesByType('resource').map(entry => entry.name);
    const reactUrl = resources.find(url => /\/react\.js\?/.test(url));
    const domUrl = resources.find(url => /\/react-dom_client\.js\?/.test(url));
    const tabsUrl = resources.find(url => /\/tabs\/tabs\.tsx(?:\?|$)/.test(url));
    if (!reactUrl || !domUrl || !tabsUrl) throw new Error('Expected the current Vite consumer to load React and Tabs.');
    const [{ default: React }, dom, { Tabs }] = await Promise.all([import(reactUrl), import(domUrl), import(tabsUrl)]);
    const createRoot = dom.createRoot ?? dom.default.createRoot;
    const container = document.createElement('div');
    container.style.width = '600px';
    document.querySelector('.rain-scope-navigation').parentElement.append(container);
    const root = createRoot(container);
    root.render(React.createElement(Tabs, { 'aria-label': '嵌套旧消费者校验', items: [{ value: 'old', label: '原有 Tabs', content: '原有内容' }] }));
    const frames = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    await frames();
    const facts = () => {
      const tab = container.querySelector('[role="tab"]');
      const read = selector => getComputedStyle(container.querySelector(selector));
      return {
        height: tab.getBoundingClientRect().height,
        font: read('[role="tab"]').font,
        padding: read('[role="tab"]').padding,
        color: read('[data-part="label"]').color,
        gap: read('[role="tablist"]').gap,
        paint: read('[data-part="paint"]').display,
        indicator: read('[data-part="indicator"]').display,
        indicatorHeight: read('[data-part="indicator"]').height,
      };
    };
    const outside = facts();
    document.querySelector('.rain-scope-navigation .rain-connected-surface__panel').append(container);
    await frames();
    const inside = facts();
    const navigationHeight = document.querySelector('.rain-scope-navigation [role="tab"]').getBoundingClientRect().height;
    const scopeSupported = typeof CSSScopeRule === 'function';
    root.unmount(); container.remove();
    return { outside, inside, navigationHeight, scopeSupported };
  });
  assert.deepEqual(result.inside, result.outside, 'Navigation styles changed a nested ordinary Tabs consumer');
  assert.equal(result.navigationHeight, 64);
  assert.equal(result.scopeSupported, true);
  console.log(JSON.stringify({ status: 'passed', browser: browser.version(), ...result }, null, 2));
} finally {
  await browser.close();
}
