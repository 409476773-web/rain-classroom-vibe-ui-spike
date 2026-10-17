# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-r4-feedback.spec.ts >> R4 feedback contracts >> context boundary moves closer while keyboard, pointer resizing and temporary restoration retain the selected object
- Location: tests/e2e/navigation-v042-r4-feedback.spec.ts:124:3

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-recipe-id="recipe-navigation-r4"]').locator('.rain-workspace__region[data-region-id="context"]')
Expected: "true"
Received: "false"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-recipe-id="recipe-navigation-r4"]').locator('.rain-workspace__region[data-region-id="context"]')
    14 × locator resolved to <div data-side="start" aria-label="课堂功能" data-forced="false" data-mode="expanded" data-temporary="false" data-region-id="context" id="_r_1_-workspace-context" class="rain-workspace__region nv5-class-context">…</div>
       - unexpected value "false"

```

```yaml
- strong: 课堂功能
- button "取消固定课堂功能"
- button "隐藏课堂功能"
- heading "课堂数据" [level=4]
- navigation "课堂功能":
  - list
- text: 课堂范围内的功能导航
```

# Test source

```ts
  44  |   test.skip(!capture, 'Evidence capture is a separate operation from contract verification.');
  45  |   const dir = resolve(evidence, capture!); mkdirSync(dir, { recursive: true });
  46  |   const results: Record<string, unknown> = {}; const errors: string[] = [];
  47  |   page.on('pageerror', error => errors.push(error.message));
  48  |   for (const width of [1200, 1440, 1600]) {
  49  |     const root = await open(page, width);
  50  |     for (const mode of ['compact', 'expanded', 'ungraded']) {
  51  |       if (mode === 'expanded') await region(root, 'global').getByRole('button', { name: '展开平台导航', exact: true }).click();
  52  |       if (mode === 'ungraded') await root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '知行合一', exact: true }).click();
  53  |       await settle(page);
  54  |       const key = `R4-interaction-${width}-${mode}`;
  55  |       results[key] = await metrics(root);
  56  |       await root.screenshot({ path: resolve(dir, `${key}.png`) });
  57  |       writeFileSync(resolve(dir, 'measurements.json'), JSON.stringify({ createdAt: new Date().toISOString(), phase: capture, scope: 'R4 interaction, DPR1 Chromium; approved HTML remains historical baseline', pageErrors: errors, cases: results }, null, 2));
  58  |     }
  59  |   }
  60  |   writeFileSync(resolve(dir, 'measurements.json'), JSON.stringify({ createdAt: new Date().toISOString(), phase: capture, scope: 'R4 interaction, DPR1 Chromium; approved HTML remains historical baseline', pageErrors: errors, cases: results }, null, 2));
  61  |   expect(errors).toEqual([]);
  62  | });
  63  | 
  64  | test.describe('R4 feedback contracts', () => {
  65  |   test.skip(Boolean(capture), 'Contract assertions run separately from immutable before/after capture.');
  66  |   test('existing AvatarGroup portraits remain visible and do not nest actions inside group selectors', async ({ page }) => {
  67  |     const root = await open(page), row = root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '第一小分队', exact: true });
  68  |     const avatars = row.locator('[data-rain-id="ui-avatar-group"] [data-rain-id="ui-avatar"]');
  69  |     await expect(avatars).toHaveCount(4);
  70  |     await settle(page);
  71  |     for (const avatar of await avatars.all()) {
  72  |       const portrait = avatar.locator('img[data-slot="portrait"]');
  73  |       await expect(portrait).toBeVisible();
  74  |       expect(await portrait.evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
  75  |     }
  76  |     expect(await root.locator('button button').count()).toBe(0);
  77  |   });
  78  |   test('compact activity cards reserve more room for details across every supported canvas width', async ({ page }) => {
  79  |     const before = JSON.parse(readFileSync(resolve(evidence, 'before-v2/measurements.json'), 'utf8'));
  80  |     for (const width of [1200, 1440, 1600]) {
  81  |       const root = await open(page, width), now = await metrics(root), prior = before.cases[`R4-interaction-${width}-compact`];
  82  |       expect(now.recovery?.height).toBe(56); expect(now.module?.height).toBe(44);
  83  |       expect(now.activityTrack?.padding).toBe('12px');
  84  |       expect(now.activityTrack!.height).toBeLessThan(prior.activityTrack.height);
  85  |       expect(now.queueHead!.height).toBeLessThan(prior.queueHead.height);
  86  |       expect(now.queueList!.height).toBeGreaterThan(prior.queueList.height);
  87  |       for (const card of now.activities) expect(card.height).toBeLessThan(prior.activities[0].height);
  88  |       expect(now.progress?.height).toBe(4); expect(now.activityMetadata?.gap).toBe('4px');
  89  |       expect(now.activityTrack?.background).toBe(await tokenColor(root, '--rain-category-background-neutral-2'));
  90  |       const progress = root.locator('.nv5-activities [role="progressbar"]').first();
  91  |       expect(await progress.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-neutral-solid-3'));
  92  |       expect(await root.locator('.nv5-activities [data-active="true"] [data-slot="progress-fill"]').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-brand-solid-3'));
  93  |       expect(await root.locator('.nv5-activities [data-active="false"] [data-slot="progress-fill"]').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-neutral-solid-1'));
  94  |       expect(now.queueRegionHead?.height).toBe(36); expect(now.groupLabel?.fontSize).toBe('14px');
  95  |       expect(now.detailTitle?.fontSize).toBe('16px'); expect(now.detailTitle?.height).toBe(22);
  96  |       expect(now.contextFooter?.fontSize).toBe('12px');
  97  |       const selectedTab = root.getByRole('tab', { name: '智能汇报', exact: true });
  98  |       expect(await selectedTab.evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(root, '--rain-category-text-neutral-1'));
  99  |       expect(await root.getByRole('tab', { name: '投稿', exact: true }).evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(root, '--rain-category-text-neutral-2'));
  100 |       for (const control of await root.locator('.nv5-region-head>[data-rain-id="ui-icon-button"]').all()) {
  101 |         const box = await shape(control); expect(box.width).toBe(32); expect(box.height).toBe(32);
  102 |       }
  103 |       for (const pane of now.horizontalRegions) expect(pane.scrollWidth).toBeLessThanOrEqual(pane.clientWidth + 1);
  104 |     }
  105 |   });
  106 |   test('group filter, search and activity selection preserve identity and grey ungraded scores', async ({ page }) => {
  107 |     const root = await open(page);
  108 |     await root.getByRole('group', { name: '课堂活动', exact: true }).getByRole('button', { name: '小组汇报：从概念到真实应用', exact: true }).click();
  109 |     await root.getByRole('radio', { name: '未评分', exact: true }).locator('..').click();
  110 |     expect(await root.locator('.nv5-queue-filter .rain-segmented-control__option[data-state="checked"]').evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(root, '--rain-category-text-brand-1'));
  111 |     await root.getByRole('textbox', { name: '搜索小组', exact: true }).fill('知行');
  112 |     const row = root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '知行合一', exact: true });
  113 |     await row.click();
  114 |     await expect(root.getByRole('heading', { name: '知行合一', exact: true })).toBeVisible();
  115 |     await expect(root.locator('.nv5-recovery-identity')).toContainText('知行合一');
  116 |     await expect(root.locator('.nv5-group-title')).toContainText('小组汇报：从概念到真实应用');
  117 |     await expect(root.getByLabel('当前小组得分')).toContainText('—');
  118 |     const color = await row.locator('.nv5-score').evaluate(el => getComputedStyle(el).color);
  119 |     expect(color).toBe(await tokenColor(root, '--rain-category-text-neutral-3'));
  120 |     await region(root, 'queue').getByRole('button', { name: '隐藏小组列表', exact: true }).click();
  121 |     await restore(root, 'queue').click(); await expect(row).toHaveAttribute('aria-pressed', 'true');
  122 |     await expect(root.getByRole('textbox', { name: '搜索小组', exact: true })).toHaveValue('知行');
  123 |   });
  124 |   test('context boundary moves closer while keyboard, pointer resizing and temporary restoration retain the selected object', async ({ page }) => {
  125 |     const root = await open(page), splitter = root.getByRole('separator', { name: '调整课堂功能宽度', exact: true });
  126 |     const nav = region(root, 'context').getByRole('navigation', { name: '课堂功能', exact: true });
  127 |     const last = await shape(nav.locator('.rain-navigation-family__entry').first()), boundary = await shape(splitter);
  128 |     expect(boundary.x - (last.x + last.width)).toBeLessThanOrEqual(8);
  129 |     expect(await splitter.evaluate(el => getComputedStyle(el, '::before').backgroundColor)).toBe(await tokenColor(root, '--rain-category-border-neutral-3'));
  130 |     await splitter.hover();
  131 |     expect(await splitter.evaluate(el => getComputedStyle(el, '::before').backgroundColor)).toBe(await tokenColor(root, '--rain-category-border-brand-1'));
  132 |     const original = Number(await splitter.getAttribute('aria-valuenow'));
  133 |     await splitter.focus(); await page.keyboard.press('ArrowRight'); expect(Number(await splitter.getAttribute('aria-valuenow'))).toBeGreaterThan(original);
  134 |     expect(await splitter.evaluate(el => getComputedStyle(el).outlineColor)).toBe(await tokenColor(root, '--rain-color-focus-control'));
  135 |     const box = await shape(splitter); await page.mouse.move(box.x + box.width / 2, box.y + 80); await page.mouse.down(); await page.mouse.move(box.x + 28, box.y + 80, { steps: 8 }); await page.mouse.up();
  136 |     expect(Number(await splitter.getAttribute('aria-valuenow'))).toBeGreaterThan(original + 10);
  137 |     await region(root, 'context').getByRole('button', { name: '隐藏课堂功能', exact: true }).click(); await expect(region(root, 'context')).toBeHidden();
  138 |     const recovery = restore(root, 'context');
  139 |     await page.mouse.move(1790, 1090);
  140 |     expect(await recovery.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-background-neutral-2'));
  141 |     await recovery.hover();
  142 |     expect(await recovery.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-brand-solid-3'));
  143 |     await recovery.click(); await expect(region(root, 'context')).toBeVisible();
> 144 |     await expect(region(root, 'context')).toHaveAttribute('data-temporary', 'true');
      |                                           ^ Error: expect(locator).toHaveAttribute(expected) failed
  145 |     expect(await region(root, 'context').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-background-neutral-1'));
  146 |     expect(await region(root, 'context').evaluate(el => getComputedStyle(el).boxShadow)).toBe(await tokenStyle(root, '--rain-shadow-overlay', 'box-shadow'));
  147 |     expect(await region(root, 'context').locator('.nv5-region-head>small').evaluate(el => getComputedStyle(el).color)).toBe(await tokenColor(root, '--rain-category-text-neutral-3'));
  148 |     await expect(root.getByRole('heading', { name: '第一小分队', exact: true })).toBeVisible();
  149 |   });
  150 |   test('platform brand and footer keep sensible alignment in compact and expanded modes', async ({ page }) => {
  151 |     const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  152 |     for (const width of [1200, 1440, 1600]) {
  153 |       const root = await open(page, width), footer = root.locator('.nv5-platform-content>footer'), global = region(root, 'global');
  154 |       const compact = await footer.locator(':scope>*').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }));
  155 |       expect(compact).toHaveLength(3); expect(Math.max(...compact.map(r => r.x)) - Math.min(...compact.map(r => r.x))).toBeLessThanOrEqual(1);
  156 |       await global.getByRole('button', { name: '展开平台导航', exact: true }).click();
  157 |       if (width === 1200) await expect(global).toHaveAttribute('data-temporary', 'true');
  158 |       else await expect(global).toHaveAttribute('data-mode', 'expanded');
  159 |       expect(await root.locator('.nv5-platform .rain-navigation-family__item[data-active="true"] .rain-navigation-family__row').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-brand-solid-3'));
  160 |       expect(await global.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-background-neutral-4'));
  161 |       const expanded = await footer.locator(':scope>*').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }));
  162 |       const brand = await shape(root.locator('.nv5-brand')), platform = await shape(global);
  163 |       expect(Math.max(...expanded.map(r => r.y)) - Math.min(...expanded.map(r => r.y))).toBeLessThanOrEqual(1);
  164 |       for (const control of expanded) { expect(control.width).toBe(32); expect(control.height).toBe(32); expect(control.x).toBeGreaterThanOrEqual(platform.x); expect(control.x + control.width).toBeLessThanOrEqual(platform.x + platform.width); }
  165 |       expect(brand.x - platform.x).toBeLessThanOrEqual(20);
  166 |       await expect(root.locator('.nv5-platform-content>footer [data-rain-id="ui-avatar"] .rain-avatar__picture')).toBeVisible();
  167 |     }
  168 |     expect(errors).toEqual([]);
  169 |   });
  170 | });
  171 | 
```