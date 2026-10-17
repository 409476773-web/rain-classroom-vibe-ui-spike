# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w6-review02.spec.ts >> R02-C01-C02-C03-C04-C05-C06 E3 title identity, real connected panel and compact fields at 1200x747
- Location: tests/e2e/navigation-v042-w6-review02.spec.ts:153:3

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-scene="E3"]').getByTestId('grading-identity').getByRole('tablist', { name: '当前题目选择', exact: true }).getByRole('tab').nth(1)
Expected pattern: /.+/
Received string:  ""
Timeout: 5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-scene="E3"]').getByTestId('grading-identity').getByRole('tablist', { name: '当前题目选择', exact: true }).getByRole('tab').nth(1)
    14 × locator resolved to <button role="tab" type="button" tabindex="-1" data-slot="tab" data-part="tab" aria-label="第2题" data-focus="item" id="base-ui-_r_1h_" data-position="top" aria-disabled="false" aria-selected="false" data-selected="false" data-disabled="false" data-item-align="center" data-orientation="horizontal" data-indicator-size="content" data-base-ui-tooltip-trigger="" data-activation-direction="none" class="rain-tabs__tab group/tabs h-rain-tabs-38">…</button>
       - unexpected value "null"

```

```yaml
- tab "第2题"
```

# Test source

```ts
  62  |     const path = element.querySelector<SVGPathElement>('.rain-connected-surface__union')!;
  63  |     const seam = panel.top - frame.top, left = selected.left - frame.left, right = selected.right - frame.left;
  64  |     const shoulder = parseFloat(getComputedStyle(element).getPropertyValue('--rain-local-cs-shoulder'));
  65  |     const s = Number.isFinite(shoulder) ? shoulder : 4;
  66  |     const point = (x: number, y: number) => path.isPointInFill(new DOMPoint(x, y));
  67  |     return { d: path.getAttribute('d'), fill: getComputedStyle(path).fill, track: getComputedStyle(element).backgroundColor,
  68  |       frame: { width: frame.width, height: frame.height }, seam, selected: { left, right, top: selected.top - frame.top, bottom: selected.bottom - frame.top },
  69  |       points: { insideTab: point((left + right) / 2, selected.top - frame.top + selected.height / 2),
  70  |         insidePanel: point(frame.width / 2, seam + 8), rightShoulder: point(right + s / 2, seam - 0.2),
  71  |         aboveRightShoulder: point(right + s / 2, seam - s - 1) } };
  72  |   });
  73  | }
  74  | 
  75  | test.beforeEach(async ({ page }) => {
  76  |   const faults: string[] = [];
  77  |   page.on('pageerror', error => faults.push(`pageerror: ${error.message}`));
  78  |   page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) faults.push(`HTTP ${response.status()}: ${response.url()}`); });
  79  |   (page as Page & { review02Faults?: string[] }).review02Faults = faults;
  80  | });
  81  | test.afterEach(async ({ page }) => {
  82  |   const faults = (page as Page & { review02Faults?: string[] }).review02Faults ?? [];
  83  |   await record('browser-faults', faults); expect(faults, 'no runtime exception or missing served asset').toEqual([]);
  84  | });
  85  | 
  86  | for (const width of widths) {
  87  |   test(`R02-C07-C08-C10-C11 E2 compact hierarchy and filled feedback at ${width}x747`, async ({ page }) => {
  88  |     const root = await open(page, 'E2', width), main = root.getByTestId('interaction-identity');
  89  |     const title = await title16x22(main.getByRole('heading', { level: 1 }));
  90  |     const summary = main.locator('.w6-interaction-summary');
  91  |     const summaryBox = (await summary.boundingBox())!;
  92  |     expect(summaryBox.height, 'summary leaves first screen for reading').toBeLessThanOrEqual(100);
  93  |     const activities = region(root, 'activities'), groups = region(root, 'groups');
  94  |     await expect(activities.getByRole('heading', { name: '课堂内', exact: true })).toBeVisible();
  95  |     await expect(activities.getByRole('heading', { name: '课后', exact: true })).toBeVisible();
  96  |     await expect(groups.getByRole('group', { name: '小组对象', exact: true })).toHaveAttribute('data-appearance', 'queue');
  97  |     const cards = activities.getByRole('group', { name: '课堂内活动', exact: true }).getByRole('button');
  98  |     const boxes = await Promise.all((await cards.all()).map(card => card.boundingBox()));
  99  |     const panelBox = (await activities.boundingBox())!;
  100 |     expect(boxes).toHaveLength(2); expect(Math.abs(boxes[0]!.x - boxes[1]!.x)).toBeLessThanOrEqual(1);
  101 |     expect(boxes[1]!.y).toBeGreaterThanOrEqual(boxes[0]!.y + boxes[0]!.height);
  102 |     for (const box of boxes) { expect(box!.x).toBeGreaterThanOrEqual(panelBox.x); expect(box!.x + box!.width).toBeLessThanOrEqual(panelBox.x + panelBox.width); }
  103 |     const content = main.getByRole('tabpanel', { name: '小组提交', exact: true });
  104 |     await expect(content).toBeVisible(); expect((await content.boundingBox())!.y).toBeLessThan(summaryBox.y + 180);
  105 |     const feedback = main.locator('[data-rain-id="ui-textarea"]');
  106 |     await page.mouse.move(2, 2); const paint = await filledPaint(feedback);
  107 |     await record('E2-density-and-paint', { title, summaryBox, boxes, panelBox, paint });
  108 |     await screenshot(page, `E2-submission-${width}x747`);
  109 |   });
  110 | 
  111 |   test(`R02-C09 E2 complete members 4-5-6 with loaded portraits and stable IDs at ${width}x747`, async ({ page }) => {
  112 |     const root = await open(page, 'E2', width), main = root.getByTestId('interaction-identity');
  113 |     await main.getByRole('tab', { name: '小组成员', exact: true }).click();
  114 |     const sets: { group: number; ids: string[]; numbers: string[]; sources: string[] }[] = [];
  115 |     for (const [index, label] of ['第一研究组', '第二研究组', '第三研究组'].entries()) {
  116 |       await region(root, 'groups').getByRole('button', { name: label, exact: true }).click();
  117 |       await expect(main).toHaveAttribute('data-group-id', `discussion-g${index + 1}`);
  118 |       const panel = main.getByRole('tabpanel', { name: '小组成员', exact: true });
  119 |       const rows = panel.locator('[data-member-id]');
  120 |       await expect(rows).toHaveCount(4 + index);
  121 |       await expect(panel.locator('[data-rain-id="ui-avatar"]')).toHaveCount(4 + index);
  122 |       await expect(panel.locator('img[data-slot="portrait"]')).toHaveCount(4 + index);
  123 |       await expect.poll(() => panel.locator('img[data-slot="portrait"]').evaluateAll(elements => elements.every(element => element.getAttribute('data-ready') === 'true'))).toBe(true);
  124 |       await expect.poll(() => rows.evaluateAll(elements => elements.every(element => [...element.querySelectorAll<HTMLImageElement>('img')].every(img => img.complete && img.naturalWidth > 0)))).toBe(true);
  125 |       const members = await rows.evaluateAll(elements => elements.map(element => {
  126 |         const text = element.textContent ?? '';
  127 |         const avatar = element.querySelector('[data-rain-id="ui-avatar"]')!;
  128 |         const portraits = [...element.querySelectorAll<HTMLImageElement>('img')];
  129 |         return { id: element.getAttribute('data-member-id')!, number: element.getAttribute('data-student-number') ?? '', text,
  130 |           role: element.querySelector('[data-member-role]')?.textContent?.trim() ?? '', name: element.querySelector('strong')?.textContent?.trim() ?? '',
  131 |           size: avatar.getAttribute('data-size'), source: portraits.at(-1)!.currentSrc,
  132 |           box: { width: avatar.getBoundingClientRect().width, height: avatar.getBoundingClientRect().height } };
  133 |       }));
  134 |       expect(new Set(members.map(member => member.id)).size).toBe(4 + index);
  135 |       expect(new Set(members.map(member => member.number)).size).toBe(4 + index);
  136 |       for (const member of members) {
  137 |         expect(member.number).toMatch(/^\d{7,}$/);
  138 |         expect(member.role.length).toBeGreaterThan(0); expect(member.name.length).toBeGreaterThan(0);
  139 |         expect(['32', '40']).toContain(member.size); expect(member.box.width).toBe(Number(member.size)); expect(member.box.height).toBe(Number(member.size));
  140 |       }
  141 |       sets.push({ group: index + 1, ids: members.map(member => member.id), numbers: members.map(member => member.number), sources: members.map(member => member.source) });
  142 |       await record(`E2-group-${index + 1}-members`, members);
  143 |       await screenshot(page, `E2-members-${index + 1}-${width}x747`);
  144 |     }
  145 |     expect(new Set(sets.flatMap(set => set.ids)).size).toBe(15); expect(new Set(sets.flatMap(set => set.numbers)).size).toBe(15);
  146 |     await region(root, 'activities').getByRole('button', { name: '课后反思', exact: true }).click();
  147 |     await main.getByRole('tab', { name: '小组成员', exact: true }).click();
  148 |     const again = await main.getByRole('tabpanel', { name: '小组成员', exact: true }).locator('[data-member-id]').evaluateAll(elements => elements.map(element => ({ id: element.getAttribute('data-member-id')!, number: element.getAttribute('data-student-number') ?? '', source: [...element.querySelectorAll<HTMLImageElement>('img')].at(-1)!.currentSrc })));
  149 |     expect(again.map(member => member.id)).toEqual(sets[0]!.ids); expect(again.map(member => member.number)).toEqual(sets[0]!.numbers); expect(again.map(member => member.source)).toEqual(sets[0]!.sources);
  150 |     await record('E2-member-set-stability', { sets, again });
  151 |   });
  152 | 
  153 |   test(`R02-C01-C02-C03-C04-C05-C06 E3 title identity, real connected panel and compact fields at ${width}x747`, async ({ page }) => {
  154 |     const root = await open(page, 'E3', width), main = root.getByTestId('grading-identity');
  155 |     const title = await title16x22(main.getByRole('heading', { level: 1 }));
  156 |     const titleBox = (await main.getByRole('heading', { level: 1 }).boundingBox())!, metadataBox = (await main.locator('.w6-grade-identity-meta').boundingBox())!;
  157 |     expect(Math.abs(titleBox.y + titleBox.height / 2 - metadataBox.y - metadataBox.height / 2)).toBeLessThanOrEqual(1);
  158 |     expect(metadataBox.x).toBeGreaterThan(titleBox.x + titleBox.width);
  159 |     await expect(main.getByText('这份报告的题目', { exact: true })).toHaveCount(0); await expect(main.getByText('选择题目后在右侧评分', { exact: true })).toHaveCount(0);
  160 |     const tabs = main.getByRole('tablist', { name: '当前题目选择', exact: true });
  161 |     await expect(tabs.getByRole('tab')).toHaveCount(3);
> 162 |     for (const tab of await tabs.getByRole('tab').all()) await expect(tab).toHaveAttribute('aria-controls', /.+/);
      |                                                                            ^ Error: expect(locator).toHaveAttribute(expected) failed
  163 |     await tabs.getByRole('tab', { name: '第2题', exact: true }).click();
  164 |     const panel = main.getByRole('tabpanel', { name: '第2题', exact: true });
  165 |     await expect(panel.getByRole('heading', { name: '设计控制变量', exact: true })).toBeVisible();
  166 |     await expect(panel.getByRole('region', { name: '当前学生答案', exact: true })).toBeVisible(); await expect(panel.getByRole('heading', { name: '评分参考', exact: true })).toBeVisible();
  167 |     const surface = main.locator('.rain-connected-surface'); await expect(surface).toHaveAttribute('data-active-visible', 'true');
  168 |     const profile = await surfaceProfile(surface);
  169 |     expect(profile.fill).toBe('rgb(255, 255, 255)'); expect(profile.track).not.toBe(profile.fill); expect(profile.d).toContain(' Q '); expect(profile.d).not.toMatch(/NaN|Infinity/);
  170 |     expect(profile.points).toEqual({ insideTab: true, insidePanel: true, rightShoulder: true, aboveRightShoulder: false }); expect(profile.selected.bottom).toBeCloseTo(profile.seam, 1);
  171 |     const score = root.getByRole('spinbutton', { name: '本题分数', exact: true }), number = root.locator('[data-rain-id="ui-input-number"]'), aside = root.getByRole('complementary', { name: '评分区', exact: true });
  172 |     await expect(number).toHaveAttribute('data-full-width', 'false'); const numberBox = (await number.boundingBox())!, asideBox = (await aside.boundingBox())!;
  173 |     expect(numberBox.width).toBeLessThan(asideBox.width - 24); expect(numberBox.height).toBe(36);
  174 |     await expect(score).toHaveAttribute('aria-valuemin', '0'); await expect(score).toHaveAttribute('aria-valuemax', '20');
  175 |     await page.mouse.move(2, 2); const numberPaint = await filledPaint(number.locator('[data-slot="frame"]')), commentPaint = await filledPaint(aside.locator('[data-rain-id="ui-textarea"]'));
  176 |     await record('E3-layout-profile-fields', { title, titleBox, metadataBox, profile, numberBox, asideBox, numberPaint, commentPaint });
  177 |     await screenshot(page, `E3-${width}x747`);
  178 |   });
  179 | }
  180 | 
  181 | test('R02 E3 controlled browser tabs use native keyboard and preserve correct saved drafts across both axes', async ({ page }) => {
  182 |   const root = await open(page, 'E3'), main = root.getByTestId('grading-identity'), score = root.getByRole('spinbutton', { name: '本题分数' }), comment = root.getByRole('textbox', { name: '评分评语' });
  183 |   const tabs = main.getByRole('tablist', { name: '当前题目选择', exact: true });
  184 |   await tabs.getByRole('tab', { name: '第1题', exact: true }).click();
  185 |   await page.keyboard.press('ArrowRight'); await expect(tabs.getByRole('tab', { name: '第2题', exact: true })).toBeFocused(); await page.keyboard.press('Enter');
  186 |   await expect(main).toHaveAttribute('data-draft-key', 'paper-microclimate/q2/lin-ning');
  187 |   await score.fill('17'); await score.press('Tab'); await comment.fill('林宁第二题独立评语');
  188 |   await root.getByRole('button', { name: '保存本地草稿', exact: true }).click(); await expect(root.getByRole('status')).toHaveText('已保存到本地状态');
  189 |   await tabs.getByRole('tab', { name: '第2题', exact: true }).click(); await page.keyboard.press('End'); await page.keyboard.press('Enter');
  190 |   await expect(main).toHaveAttribute('data-question-id', 'q3'); await expect(score).toHaveValue(''); await expect(comment).toHaveValue('');
  191 |   await score.fill('12'); await score.press('Tab'); await comment.fill('林宁第三题尚未保存');
  192 |   await tabs.getByRole('tab', { name: '第3题', exact: true }).click(); await page.keyboard.press('Home'); await page.keyboard.press('Enter'); await expect(main).toHaveAttribute('data-question-id', 'q1');
  193 |   await tabs.getByRole('tab', { name: '第2题', exact: true }).click(); await expect(score).toHaveValue('17'); await expect(comment).toHaveValue('林宁第二题独立评语'); await expect(root.getByRole('status')).toHaveText('已保存到本地状态');
  194 |   await root.getByRole('button', { name: '显示批改队列', exact: true }).click();
  195 |   const queue = region(root, 'grading-queue'); await queue.getByRole('radio', { name: '按题', exact: true }).click();
  196 |   const studentTabs = main.getByRole('tablist', { name: '当前学生选择', exact: true });
  197 |   await expect(studentTabs.getByRole('tab')).toHaveCount(3); await studentTabs.getByRole('tab', { name: '陈安', exact: true }).click();
  198 |   await expect(main).toHaveAttribute('data-draft-key', 'paper-microclimate/q2/chen-an'); await expect(score).toHaveValue(''); await expect(comment).toHaveValue('');
  199 |   for (const tab of await studentTabs.getByRole('tab').all()) await expect(tab).toHaveAttribute('aria-controls', /.+/);
  200 |   await studentTabs.getByRole('tab', { name: '林宁', exact: true }).click(); await expect(score).toHaveValue('17'); await expect(comment).toHaveValue('林宁第二题独立评语');
  201 |   const surface = main.locator('.rain-connected-surface'); await studentTabs.getByRole('tab', { name: '陈安', exact: true }).click();
  202 |   const profile = await surfaceProfile(surface); expect(profile.points.rightShoulder).toBe(true); expect(profile.fill).toBe('rgb(255, 255, 255)');
  203 |   await record('E3-alternate-axis-profile', profile); await screenshot(page, 'E3-question-mode-1343x747');
  204 | });
  205 | 
  206 | test('R02 E2 feedback belongs to the stable group across activities and detail tabs', async ({ page }) => {
  207 |   const root = await open(page, 'E2'), main = root.getByTestId('interaction-identity'), feedback = root.getByRole('textbox', { name: '课堂反馈草稿' });
  208 |   await feedback.fill('讨论第一组反馈'); await region(root, 'groups').getByRole('button', { name: '第二研究组', exact: true }).click(); await expect(feedback).toHaveValue(''); await feedback.fill('讨论第二组反馈');
  209 |   await main.getByRole('tab', { name: '小组成员', exact: true }).click(); await expect(feedback).toHaveValue('讨论第二组反馈'); await main.getByRole('tab', { name: '小组提交', exact: true }).click();
  210 |   await region(root, 'activities').getByRole('button', { name: '课后反思', exact: true }).click(); await expect(main).toHaveAttribute('data-group-id', 'reflection-g1'); await expect(feedback).toHaveValue(''); await feedback.fill('反思第一组反馈');
  211 |   await region(root, 'activities').getByRole('button', { name: '证据分析讨论', exact: true }).click(); await expect(feedback).toHaveValue('讨论第一组反馈'); await region(root, 'groups').getByRole('button', { name: '第二研究组', exact: true }).click(); await expect(feedback).toHaveValue('讨论第二组反馈');
  212 | });
  213 | 
  214 | test('R02 E2 996 hide and native keyboard recovery retain width, draft and focus', async ({ page }) => {
  215 |   const root = await open(page, 'E2', 996), main = root.getByTestId('interaction-identity');
  216 |   const before = await main.boundingBox();
  217 |   await root.getByRole('textbox', { name: '课堂反馈草稿' }).fill('996恢复前的反馈');
  218 |   await root.getByRole('button', { name: '隐藏课堂活动', exact: true }).click();
  219 |   const restore = root.getByRole('button', { name: '显示课堂活动', exact: true });
  220 |   expect((await main.boundingBox())!.width).toBeGreaterThan(before!.width + 190);
  221 |   await tabTo(page, restore); await page.keyboard.press('Enter');
  222 |   await expect(region(root, 'activities')).toHaveAttribute('data-mode', 'expanded');
  223 |   await expect(region(root, 'activities')).toHaveAttribute('data-temporary', 'false');
  224 |   await expect(root.getByRole('button', { name: '隐藏课堂活动', exact: true })).toBeFocused();
  225 |   await sameGeometry(main, before); await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('996恢复前的反馈');
  226 |   await record('E2-narrow-restored-bounds', before); await screenshot(page, 'E2-narrow-996x747');
  227 | });
  228 | 
  229 | test('R02 E2 800 forced temporary navigation keeps main geometry and native restore focus', async ({ page }) => {
  230 |   const root = await open(page, 'E2', 800), main = root.getByTestId('interaction-identity');
  231 |   const hidden = root.locator('.rain-workspace__region[data-mode="hidden"][data-side="start"]').first();
  232 |   const id = await hidden.getAttribute('data-region-id'); expect(id).toBeTruthy();
  233 |   const restore = root.getByRole('button', { name: `显示${id === 'activities' ? '课堂活动' : '小组列表'}`, exact: true });
  234 |   await root.getByRole('textbox', { name: '课堂反馈草稿' }).fill('窄屏恢复前的反馈');
  235 |   const before = await main.boundingBox(); await tabTo(page, restore); await page.keyboard.press('Enter');
  236 |   await expect(hidden).toHaveAttribute('data-temporary', 'true'); await sameGeometry(main, before);
  237 |   await page.keyboard.press('Escape'); await expect(restore).toBeFocused(); await expect(hidden).toHaveAttribute('data-temporary', 'false');
  238 |   await sameGeometry(main, before); await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('窄屏恢复前的反馈');
  239 |   await record('E2-temporary-main-bounds', before); await screenshot(page, 'E2-temporary-800x747');
  240 | });
  241 | 
  242 | test('R02 E3 996 header wraps within the article and fields fit without losing score', async ({ page }) => {
  243 |   const root = await open(page, 'E3', 996), main = root.getByTestId('grading-identity');
  244 |   const title = await title16x22(main.getByRole('heading', { level: 1 })), titleBox = (await main.getByRole('heading', { level: 1 }).boundingBox())!, meta = (await main.locator('.w6-grade-identity-meta').boundingBox())!, box = (await main.boundingBox())!;
  245 |   expect(meta.x).toBeGreaterThanOrEqual(box.x); expect(meta.x + meta.width).toBeLessThanOrEqual(box.x + box.width);
  246 |   const separated = meta.y >= titleBox.y + titleBox.height || meta.x >= titleBox.x + titleBox.width;
  247 |   expect(separated, 'identity either sits to the right or wraps below without overlap').toBe(true);
  248 |   const number = root.locator('[data-rain-id="ui-input-number"]'); expect((await number.boundingBox())!.width).toBeLessThan((await region(root, 'score').boundingBox())!.width - 24);
  249 |   await expect(root.getByRole('complementary', { name: '评分区' })).toBeVisible();
  250 |   const scroll = await main.evaluate(element => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth })); expect(scroll.scrollWidth).toBeLessThanOrEqual(scroll.clientWidth + 1);
  251 |   await record('E3-narrow-title-fit', { title, titleBox, meta, box, scroll }); await screenshot(page, 'E3-narrow-996x747');
  252 | });
  253 | 
  254 | test('R02 E3 score remains mounted through queue, appearance and focus actions without implicit save', async ({ page }) => {
  255 |   const root = await open(page, 'E3'), aside = root.getByRole('complementary', { name: '评分区' }), handle = await aside.elementHandle(), score = root.getByRole('spinbutton', { name: '本题分数' }), comment = root.getByRole('textbox', { name: '评分评语' });
  256 |   await score.fill('16'); await score.press('Tab'); await comment.fill('布局操作前未保存');
  257 |   await root.getByRole('button', { name: '显示批改队列', exact: true }).click();
  258 |   await region(root, 'grading-queue').getByRole('radio', { name: '卡片队列', exact: true }).click();
  259 |   await root.getByRole('button', { name: '隐藏批改队列', exact: true }).click();
  260 |   await root.getByRole('button', { name: '进入专注', exact: true }).click(); await expect(aside).toBeVisible();
  261 |   await root.getByRole('button', { name: '退出专注', exact: true }).click(); await expect(aside).toBeVisible();
  262 |   expect(await handle!.evaluate(element => element.isConnected)).toBe(true); expect(await aside.evaluate((element, original) => element === original, handle)).toBe(true);
```