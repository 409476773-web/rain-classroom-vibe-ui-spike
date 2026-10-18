import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from '@playwright/test';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const output = evidenceOutputPath(resolve('evidence/runtime/tabs-visual-refinement'));

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto('/#tabs');
  await page.locator('[data-tabs-verification] > summary').click();
  await page.locator('[data-tabs-refinement] > summary').click();
});
test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));

test('default capped indicators cover every size, theme and position with short and long natural or equal content', async ({ page }) => {
  const facts = [];
  for (const theme of ['light', 'dark']) {
    await page.getByRole('button', { name: theme === 'light' ? '浅色主题' : '深色主题', exact: true }).click();
    for (const size of [28, 32, 38] as const) for (const position of ['top', 'bottom', 'start', 'end']) for (const equal of [false, true]) {
      const scope = page.locator(`[data-public-case="${equal ? 'layout-' : ''}line-${size}-${position}"]`);
      const root = scope.locator('[data-rain-id="ui-tabs"]');
      await expect(root).toHaveAttribute('data-indicator-size', 'content');
      for (const long of [false, true]) {
        const tab = scope.getByRole('tab', { name: long ? /^完整课堂记录与课后练习资料/ : '概览', exact: !long });
        await tab.click();
        const fact = await tab.evaluate(node => {
          const box = (element: Element) => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
          return { tab: box(node), content: box(node.querySelector('[data-part="content"]')!), line: box(node.querySelector('[data-part="indicator"]')!) };
        });
        const vertical = position === 'start' || position === 'end', maximum = ({ 28: 24, 32: 28, 38: 32 })[size], thickness = size === 38 ? 3 : 2;
        expect(vertical ? fact.line.height : fact.line.width).toBeCloseTo(Math.min(maximum, vertical ? fact.tab.height : fact.content.width), 1);
        expect(vertical ? fact.line.width : fact.line.height).toBe(thickness);
        if (vertical) {
          expect(fact.line.y + fact.line.height / 2).toBeCloseTo(fact.tab.y + fact.tab.height / 2, 1);
          expect(fact.line.x).toBe(position === 'start' ? fact.tab.x + fact.tab.width - thickness : fact.tab.x);
        } else {
          expect(fact.line.x + fact.line.width / 2).toBeCloseTo(fact.content.x + fact.content.width / 2, 1);
          expect(fact.line.y).toBe(position === 'top' ? fact.tab.y + fact.tab.height - thickness : fact.tab.y);
          if (equal && !long && size === 38) expect(fact.line.width).toBeLessThan(maximum);
        }
        facts.push({ theme, size, position, equal, long, ...fact });
      }
    }
    await page.getByRole('region', { name: '选择一套完整外观' }).screenshot({ path: resolve(output, `indicator-${theme}.png`) });
  }
  expect(facts).toHaveLength(96);
  mkdirSync(output, { recursive: true });
  writeFileSync(resolve(output, 'indicator-facts.json'), JSON.stringify({ capturedAt: new Date().toISOString(), count: facts.length, defaultMode: 'content', maximums: { 28: 24, 32: 28, 38: 32 }, facts }, null, 2) + '\n');
});

test('the preview switches between capped and original stretch geometry without losing the selected panel', async ({ page }) => {
  const scope = page.getByRole('region', { name: '选择一套完整外观' });
  const choose = async (label: string, name: string) => {
    await scope.getByRole('combobox', { name: label, exact: true }).click();
    await page.getByRole('option', { name, exact: true }).click();
  };
  await scope.getByRole('tab', { name: '待评作业', exact: true }).click();
  const draft = scope.getByRole('textbox', { name: '待评作业备注' });
  await draft.fill('长度变化后保留');
  for (const [position, label] of [['top', '顶部'], ['bottom', '底部'], ['start', '左侧'], ['end', '右侧']]) {
    await choose('示例位置', label!);
    for (const [size, sizeLabel] of [[28, '小号 · 28'], [32, '紧凑 · 32'], [38, '常规 · 38']] as const) {
      await choose('示例尺寸', sizeLabel);
      await choose('蓝线长度', '自适应长度');
      const tab = scope.getByRole('tab', { name: '待评作业', exact: true });
      await expect(tab).toHaveAttribute('aria-selected', 'true');
      await expect(tab).toHaveAttribute('data-indicator-size', 'stretch');
      const fact = await tab.evaluate(node => ({ tab: { width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height }, line: { width: node.querySelector('[data-part="indicator"]')!.getBoundingClientRect().width, height: node.querySelector('[data-part="indicator"]')!.getBoundingClientRect().height } }));
      expect(position === 'start' || position === 'end' ? fact.line.height : fact.line.width).toBe(position === 'start' || position === 'end' ? fact.tab.height : fact.tab.width - 16);
      await choose('蓝线长度', '限制最大长度（默认）');
      const line = tab.locator('[data-part="indicator"]');
      await expect(line).toHaveCSS(position === 'start' || position === 'end' ? 'height' : 'width', `${({ 28: 24, 32: 28, 38: 32 })[size]}px`);
      await expect(draft).toHaveValue('长度变化后保留');
    }
  }
  await choose('示例外观', '底板');
  await expect(scope.getByRole('combobox', { name: '蓝线长度' })).toHaveCount(0);
});

test('contained first and last backgrounds have three-pixel outer gutters without doubled padding', async ({ page }) => {
  const scope = page.locator('[data-public-case="contained-38-top"]');
  const first = scope.getByRole('tab', { name: '概览', exact: true });
  await first.click();
  const gaps = await scope.evaluate(root => {
    const tray = root.querySelector('.rain-tabs__tray')!.getBoundingClientRect();
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const a = tabs[0]!.querySelector('[data-part="paint"]')!.getBoundingClientRect();
    const b = tabs.at(-1)!.querySelector('[data-part="paint"]')!.getBoundingClientRect();
    const next = tabs[1]!.querySelector('[data-part="paint"]')!.getBoundingClientRect();
    return { left: a.left - tray.left, right: tray.right - b.right, top: a.top - tray.top, bottom: tray.bottom - a.bottom, between: next.left - a.right };
  });
  expect(gaps).toEqual({ left: 3, right: 3, top: 3, bottom: 3, between: 8 });
});

test('selected lines have rounded ends in horizontal and vertical positions', async ({ page }) => {
  for (const position of ['top', 'bottom', 'start', 'end']) {
    const scope = page.locator(`[data-public-case="line-38-${position}"]`);
    const line = scope.locator('[aria-selected="true"] [data-part="indicator"]');
    const radii = await line.evaluate(node => {
      const style = getComputedStyle(node);
      return [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius].map(Number.parseFloat);
    });
    expect(radii.every(radius => radius >= 1.5)).toBe(true);
  }
});

test('scrolling vertical navigation keeps native scrollbars beyond the selected line and focus ring', async ({ page }) => {
  const list = page.getByRole('tablist', { name: '课程设置', exact: true });
  await list.getByRole('tab', { name: '基本信息', exact: true }).click();
  const facts = await list.evaluate(node => {
    const viewport = node.closest('.rain-tabs__viewport')!, tab = node.querySelector('[aria-selected="true"]')!;
    return { scrollbarSpace: viewport.getBoundingClientRect().right - tab.getBoundingClientRect().right, scrolls: viewport.scrollHeight > viewport.clientHeight, width: tab.getBoundingClientRect().width };
  });
  expect(facts.scrolls).toBe(true); expect(facts.width).toBe(192);
  expect(facts.scrollbarSpace).toBeGreaterThanOrEqual(12);
});

test('equal horizontal columns consume the available width and preserve a readable minimum when More appears', async ({ page }) => {
  const scope = page.locator('[data-public-case="layout-contained-38-top"]');
  const widths = await scope.getByRole('tab').evaluateAll(tabs => tabs.map(tab => tab.getBoundingClientRect().width));
  expect(Math.max(...widths) - Math.min(...widths)).toBeLessThan(0.1);
  const used = await scope.evaluate(root => ({ tray: root.querySelector('.rain-tabs__tray')!.getBoundingClientRect().width, viewport: root.querySelector('.rain-tabs__viewport')!.clientWidth - 8 }));
  expect(Math.abs(used.tray - used.viewport)).toBeLessThan(1);
  const responsive = page.locator('[data-tabs-responsive="immediate"]');
  await responsive.getByRole('button', { name: '收窄空间', exact: true }).click();
  await expect(responsive.getByRole('button', { name: '更多分区' })).toBeVisible();
  const geometry = await responsive.getByRole('tab').evaluateAll(tabs => tabs.map(tab => ({ width: tab.getBoundingClientRect().width, label: tab.querySelector('[data-part="label"]')!.getBoundingClientRect().width })));
  expect(Math.max(...geometry.map(item => item.width)) - Math.min(...geometry.map(item => item.width))).toBeLessThan(0.1);
  expect(geometry.every(item => item.label >= 30)).toBe(true);
});

test('responsive orientation preserves Root identity, selection, panel drafts and direction keys on either side', async ({ page }) => {
  const scope = page.locator('[data-tabs-responsive="immediate"]');
  const root = scope.locator('[data-rain-id="ui-tabs"]');
  await root.evaluate(node => node.setAttribute('data-identity-check', 'same-root'));
  await scope.getByRole('textbox', { name: '课程概览备注' }).fill('换向后保留草稿');
  const overview = scope.getByRole('tab', { name: '课程概览', exact: true });
  await overview.click();
  await overview.press('ArrowDown');
  const tasks = scope.getByRole('tab', { name: '待评作业', exact: true });
  await expect(tasks).toBeFocused();
  await scope.locator('[data-responsive-width]').evaluate(node => (node as HTMLElement).style.width = '320px');
  await expect(root).toHaveAttribute('data-position', 'top');
  await expect(tasks).toBeFocused();
  await expect(tasks).toHaveCSS('height', '38px');
  await expect(scope.getByRole('tab', { name: '课程概览', exact: true, includeHidden: true })).toHaveAttribute('aria-selected', 'true');
  await tasks.press('End');
  await expect(scope.getByRole('tab', { name: '学生', exact: true })).toBeFocused();
  await scope.getByRole('tab', { name: '学生', exact: true }).press('Enter');
  await scope.locator('[data-responsive-width]').evaluate(node => (node as HTMLElement).style.width = '640px');
  await expect(root).toHaveAttribute('data-position', 'start');
  await expect(scope.getByRole('tab', { name: '学生', exact: true })).toHaveCSS('height', '60px');
  await overview.click();
  await expect(scope.getByRole('textbox', { name: '课程概览备注' })).toHaveValue('换向后保留草稿');
  await scope.getByRole('button', { name: '切换左右侧' }).click();
  await expect(root).toHaveAttribute('data-position', 'end');
  await scope.getByRole('button', { name: '收窄空间', exact: true }).click();
  await expect(root).toHaveAttribute('data-position', 'top');
  await scope.getByRole('button', { name: '展开空间', exact: true }).click();
  await expect(root).toHaveAttribute('data-position', 'end');
  await expect(root).toHaveAttribute('data-identity-check', 'same-root');
});

test('widening closes More and restores focus only when the disappearing menu or trigger owned it', async ({ page }) => {
  const scope = page.locator('[data-tabs-responsive="immediate"]');
  for (const openMenu of [true, false]) {
    await scope.locator('[data-responsive-width]').evaluate(node => (node as HTMLElement).style.width = '320px');
    const more = scope.getByRole('button', { name: '更多分区' });
    await more.focus();
    if (openMenu) { await more.press('ArrowDown'); await expect(page.getByRole('menu')).toBeVisible(); }
    await scope.locator('[data-responsive-width]').evaluate(node => (node as HTMLElement).style.width = '640px');
    await expect(scope.locator('[data-rain-id="ui-tabs"]')).toHaveAttribute('data-position', 'start');
    await expect(page.getByRole('menu')).toHaveCount(0);
    await expect(scope.getByRole('tab', { name: '课程概览', exact: true })).toBeFocused();
  }
  const panel = scope.getByRole('textbox', { name: '课程概览备注' });
  await panel.fill('保持面板焦点');
  await scope.locator('[data-responsive-width]').evaluate(node => (node as HTMLElement).style.width = '320px');
  await expect(scope.locator('[data-rain-id="ui-tabs"]')).toHaveAttribute('data-position', 'top');
  await expect(panel).toBeFocused();
});

test('a rejected or delayed controlled More request cannot change selection or take external focus during a resize', async ({ page }) => {
  const scope = page.locator('[data-tabs-responsive="controlled"]');
  await scope.getByRole('button', { name: '收窄空间', exact: true }).click();
  await scope.getByRole('button', { name: '更多分区' }).press('ArrowDown');
  await page.getByRole('menuitemradio', { name: '学生', exact: true }).click();
  await expect(scope.getByRole('tab', { name: '课程概览', exact: true, includeHidden: true })).toHaveAttribute('aria-selected', 'true');
  const outside = scope.getByRole('textbox', { name: '分区外的备注' });
  await outside.fill('继续这里的编辑');
  await scope.locator('[data-responsive-width]').evaluate(node => (node as HTMLElement).style.width = '640px');
  await expect(scope.locator('[data-rain-id="ui-tabs"]')).toHaveAttribute('data-position', 'start');
  await expect(outside).toBeFocused();
  await scope.getByRole('button', { name: '接受待处理选择' }).evaluate(node => (node as HTMLElement).click());
  await expect(scope.getByRole('tab', { name: '学生', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(outside).toBeFocused();
});

test('automatic activation does not create a selection request when an empty or disabled selection changes direction', async ({ page }) => {
  for (const mode of ['empty', 'disabled']) {
    const scope = page.locator(`[data-tabs-automatic-resize="${mode}"]`);
    const more = scope.getByRole('button', { name: '更多分区' });
    await more.press('ArrowDown'); await expect(page.getByRole('menu')).toBeVisible();
    await scope.locator('[data-responsive-width]').evaluate(node => (node as HTMLElement).style.width = '640px');
    await expect(scope.locator('[data-rain-id="ui-tabs"]')).toHaveAttribute('data-position', 'start');
    await expect(page.getByRole('menu')).toHaveCount(0);
    await expect(scope).toHaveAttribute('data-change-count', '0');
    await expect(scope.locator('[data-part="nav"]')).toBeFocused();
    await expect(scope.getByRole('tab', { selected: true, includeHidden: true })).toHaveCount(mode === 'empty' ? 0 : 1);
    if (mode === 'empty') await expect(scope.getByRole('tabpanel')).toHaveCount(0);
  }
});

test('horizontal collapse centers content even when the requested vertical alignment is left or right', async ({ page }) => {
  for (const align of ['left', 'right']) {
    const scope = page.locator(`[data-tabs-item-align="${align}"]`);
    await scope.evaluate(node => (node as HTMLElement).style.width = '320px');
    await expect(scope.locator('[data-rain-id="ui-tabs"]')).toHaveAttribute('data-position', 'top');
    const target = scope.getByRole('tab', { name: '概览', exact: true });
    await expect(target).toHaveAttribute('data-item-align', 'center');
    const centered = await target.evaluate(node => {
      const tab = node.getBoundingClientRect(), content = node.querySelector('[data-part="content"]')!.getBoundingClientRect();
      return Math.abs((tab.left + tab.right) / 2 - (content.left + content.right) / 2);
    });
    expect(centered).toBeLessThan(0.1);
  }
});

test('long counts stay inside the vertical column and expose their full value without changing the label', async ({ page }) => {
  const scope = page.locator('[data-tabs-responsive="immediate"]');
  await scope.getByRole('button', { name: '更新长数量' }).click();
  const tab = scope.getByRole('tab', { name: '学生', exact: true });
  await expect(tab).toHaveAccessibleDescription(`数量 ${Number.MAX_SAFE_INTEGER}`);
  const fact = await tab.evaluate(node => {
    const box = node.getBoundingClientRect(), label = node.querySelector('[data-part="label"]')!.getBoundingClientRect();
    const count = node.querySelector('[data-part="count"]')!, rect = count.getBoundingClientRect();
    return { width: box.width, label: label.width, countRight: rect.right, right: box.right, truncated: count.scrollWidth > count.clientWidth };
  });
  expect(fact.width).toBe(192); expect(fact.label).toBeGreaterThanOrEqual(30); expect(fact.countRight).toBeLessThanOrEqual(fact.right - 16); expect(fact.truncated).toBe(true);
  await tab.hover();
  await expect(page.getByRole('tooltip')).toHaveText(`学生 (${Number.MAX_SAFE_INTEGER})`);
});

test('short titles retain ordinary counts and two-line ellipsis exposes the complete name and count', async ({ page }) => {
  const ordinary = page.getByRole('tablist', { name: '课程内容', exact: true }).getByRole('tab', { name: '待评作业', exact: true });
  await ordinary.locator('[data-part="count"]').evaluate(node => {
    // Reproduce IAB's observed 15px text extent in a 14px single-line count box.
    Object.defineProperty(node, 'scrollHeight', { configurable: true, value: node.clientHeight + 1 });
    document.fonts.dispatchEvent(new Event('loadingdone'));
  });
  await ordinary.press('Home'); await ordinary.focus();
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  const short = page.locator('[data-tabs-item-align="left"]').getByRole('tab', { name: '课', exact: true });
  const clipped = await short.locator('[data-part="count"]').evaluate(node => node.scrollWidth > node.clientWidth);
  expect(clipped).toBe(false);
  const long = page.locator('[data-public-case="layout-contained-28-start"]').getByRole('tab', { name: '完整课堂记录与课后练习资料和拓展阅读的使用说明', exact: true });
  await long.press('Home'); await long.focus();
  await expect(page.getByRole('tooltip')).toHaveText('完整课堂记录与课后练习资料和拓展阅读的使用说明 (128)');
  await long.press('Escape'); await expect(page.getByRole('tooltip')).toHaveCount(0);
});

test('all refined layouts keep every part, focus outline and selected line inside the navigation', async ({ page }) => {
  test.setTimeout(180_000); mkdirSync(output, { recursive: true });
  const samples: object[] = [], screenshots: string[] = [];
  for (const theme of ['light', 'dark']) {
    await page.getByRole('button', { name: theme === 'light' ? '浅色主题' : '深色主题', exact: true }).click();
    for (const appearance of ['line', 'contained', 'soft']) for (const size of [28, 32, 38]) for (const position of ['top', 'bottom', 'start', 'end']) {
      const scope = page.locator(`[data-public-case="layout-${appearance}-${size}-${position}"]`), vertical = position === 'start' || position === 'end';
      const target = scope.getByRole('tab', { name: '完整课堂记录与课后练习资料和拓展阅读的使用说明', exact: true });
      await target.click(); await target.press(vertical ? 'ArrowDown' : 'ArrowRight'); await page.mouse.move(0, 0);
      const fact = await scope.evaluate(root => {
        const bounds = (node: Element) => { const rect = node.getBoundingClientRect(); return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height }; };
        const nav = root.querySelector('[data-part="nav"]')!, viewport = root.querySelector('.rain-tabs__viewport')!, tray = root.querySelector('.rain-tabs__tray')!;
        const items = [...root.querySelectorAll<HTMLElement>('[role="tab"]')].map(tab => ({
          box: bounds(tab), label: bounds(tab.querySelector('[data-part="label"]')!), paint: bounds(tab.querySelector('[data-part="paint"]')!),
          parts: [...tab.querySelectorAll('[data-part="icon"], [data-part="label"], [data-part="count"], [data-part="indicator"]')].map(bounds),
          focus: tab.matches(':focus-visible'), selected: tab.getAttribute('aria-selected') === 'true', outline: getComputedStyle(tab).outlineWidth,
          countClipped: (() => { const count = tab.querySelector('[data-part="count"]'); return count ? count.scrollWidth > count.clientWidth : false; })(),
          labelLines: tab.querySelector('[data-part="label"]')!.scrollHeight / parseFloat(getComputedStyle(tab.querySelector('[data-part="label"]')!).lineHeight),
        }));
        return { nav: bounds(nav), viewport: bounds(viewport), tray: bounds(tray), overflow: viewport.scrollWidth - viewport.clientWidth, items };
      });
      const context = JSON.stringify({ theme, appearance, size, position });
      expect(fact.overflow, context).toBeLessThanOrEqual(1);
      const height = vertical ? ({ 28: 46, 32: 52, 38: 60 } as Record<number, number>)[size]! : size;
      for (const item of fact.items) {
        expect(item.box.height, context).toBe(height);
        expect(item.countClipped, context).toBe(false);
        if (vertical) { expect(item.box.width).toBe(192); expect(item.label.left).toBeCloseTo(fact.items[0]!.label.left, 1); expect(item.label.height).toBeLessThanOrEqual(({ 28: 36, 32: 40, 38: 44 } as Record<number, number>)[size]!); }
        for (const part of item.parts) {
          expect(part.left, context).toBeGreaterThanOrEqual(item.box.left - 0.1); expect(part.right, context).toBeLessThanOrEqual(item.box.right + 0.1);
          expect(part.top, context).toBeGreaterThanOrEqual(item.box.top - 0.1); expect(part.bottom, context).toBeLessThanOrEqual(item.box.bottom + 0.1);
        }
        if (item.focus) {
          expect(item.outline).toBe('1px');
          expect(item.box.left - 3).toBeGreaterThanOrEqual(fact.viewport.left); expect(item.box.right + 3).toBeLessThanOrEqual(fact.viewport.right);
          expect(item.box.top - 3).toBeGreaterThanOrEqual(fact.viewport.top); expect(item.box.bottom + 3).toBeLessThanOrEqual(fact.viewport.bottom);
        }
      }
      if (!vertical) expect(Math.max(...fact.items.map(item => item.box.width)) - Math.min(...fact.items.map(item => item.box.width))).toBeLessThan(0.1);
      if (appearance === 'contained') {
        const first = fact.items[0]!.paint, last = fact.items.at(-1)!.paint;
        expect(first.left - fact.tray.left).toBe(3); expect(first.top - fact.tray.top).toBe(3);
        expect(fact.tray.right - last.right).toBe(3); expect(fact.tray.bottom - last.bottom).toBe(3);
        for (let i = 1; i < fact.items.length; i++) expect(vertical ? fact.items[i]!.paint.top - fact.items[i - 1]!.paint.bottom : fact.items[i]!.paint.left - fact.items[i - 1]!.paint.right).toBe(8);
      }
      const name = `layout-${theme}-${appearance}-${size}-${position}.png`;
      await scope.locator('[data-part="nav"]').screenshot({ path: resolve(output, name) }); screenshots.push(name);
      samples.push({ theme, appearance, size, position, ...fact });
    }
  }
  expect(samples).toHaveLength(72);
  writeFileSync(resolve(output, 'layout-facts.json'), JSON.stringify({ capturedAt: new Date().toISOString(), groups: 72, scope: 'horizontal equal widths; vertical mixed-icon two-line groups; selected long label and separate keyboard focus', screenshots, samples }, null, 2) + '\n');
  const cards = screenshots.filter(name => name.includes('-28-') && /-(top|start)\.png$/.test(name)).map(name => `<figure><figcaption>${name}</figcaption><img src="data:image/png;base64,${readFileSync(resolve(output, name)).toString('base64')}"></figure>`).join('');
  await page.setViewportSize({ width: 2400, height: 1400 });
  await page.setContent(`<!doctype html><meta charset="utf-8"><title>Tabs 布局修订</title><style>body{margin:24px;background:#e8e9ed;font:16px system-ui}main{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}figure{margin:0;background:white;padding:12px}img{max-width:100%;display:block}figcaption{margin-bottom:8px}</style><h1>最小档的横向等分与纵向双行 · 12 份实际截图</h1><main>${cards}</main>`);
  await page.screenshot({ path: resolve(output, 'layout-contact.png'), fullPage: true });
});
