# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w6-review02.spec.ts >> R02 E2 996 temporary navigation keeps main geometry, draft and native restore focus
- Location: tests/e2e/navigation-v042-w6-review02.spec.ts:214:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-scene="E2"]').locator('.rain-workspace__region[data-region-id="activities"]')
Expected: "hidden"
Received: "expanded"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-scene="E2"]').locator('.rain-workspace__region[data-region-id="activities"]')
    14 × locator resolved to <div data-side="start" aria-label="课堂活动" data-forced="false" data-mode="expanded" data-temporary="false" data-region-id="activities" id="_r_k_-workspace-activities" class="rain-workspace__region w6-pane w6-activity-pane">…</div>
       - unexpected value "expanded"

```

```yaml
- text: 选择活动
- heading "课堂活动" [level=2]
- group "课堂活动对象":
  - heading "课堂内" [level=3]
  - text: 讨论与即时反馈
  - group "课堂内活动"
  - heading "课后" [level=3]
  - text: 复盘与延伸
  - group "课后活动"
```

# Test source

```ts
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
  162 |     for (const tab of await tabs.getByRole('tab').all()) await expect(tab).toHaveAttribute('aria-controls', /.+/);
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
  214 | test('R02 E2 996 temporary navigation keeps main geometry, draft and native restore focus', async ({ page }) => {
  215 |   const root = await open(page, 'E2'), main = root.getByTestId('interaction-identity');
  216 |   // A 996px viewport fits both defaults. Widen a real pane first so adaptation
  217 |   // legitimately needs a temporary recovery; do not alter controller state.
  218 |   await root.getByRole('button', { name: '隐藏小组列表', exact: true }).click();
  219 |   const splitter = root.getByRole('separator', { name: '调整课堂活动宽度', exact: true });
  220 |   await splitter.click(); await page.keyboard.press('End');
  221 |   await root.getByRole('button', { name: '显示小组列表', exact: true }).click();
  222 |   await page.setViewportSize({ width: 996, height: 747 });
> 223 |   const hidden = region(root, 'activities'); await expect(hidden).toHaveAttribute('data-mode', 'hidden');
      |                                                                   ^ Error: expect(locator).toHaveAttribute(expected) failed
  224 |   const restore = root.getByRole('button', { name: '显示课堂活动', exact: true });
  225 |   await root.getByRole('textbox', { name: '课堂反馈草稿' }).fill('窄屏恢复前的反馈');
  226 |   const before = await main.boundingBox(); await tabTo(page, restore); await page.keyboard.press('Enter');
  227 |   await expect(hidden).toHaveAttribute('data-temporary', 'true'); await sameGeometry(main, before);
  228 |   await page.keyboard.press('Escape'); await expect(restore).toBeFocused(); await expect(hidden).toHaveAttribute('data-temporary', 'false');
  229 |   await sameGeometry(main, before); await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('窄屏恢复前的反馈');
  230 |   await record('E2-temporary-main-bounds', before); await screenshot(page, 'E2-narrow-996x747');
  231 | });
  232 | 
  233 | test('R02 E3 996 header wraps within the article and fields fit without losing score', async ({ page }) => {
  234 |   const root = await open(page, 'E3', 996), main = root.getByTestId('grading-identity');
  235 |   const title = await title16x22(main.getByRole('heading', { level: 1 })), titleBox = (await main.getByRole('heading', { level: 1 }).boundingBox())!, meta = (await main.locator('.w6-grade-identity-meta').boundingBox())!, box = (await main.boundingBox())!;
  236 |   expect(meta.x).toBeGreaterThanOrEqual(box.x); expect(meta.x + meta.width).toBeLessThanOrEqual(box.x + box.width);
  237 |   const separated = meta.y >= titleBox.y + titleBox.height || meta.x >= titleBox.x + titleBox.width;
  238 |   expect(separated, 'identity either sits to the right or wraps below without overlap').toBe(true);
  239 |   const number = root.locator('[data-rain-id="ui-input-number"]'); expect((await number.boundingBox())!.width).toBeLessThan((await region(root, 'score').boundingBox())!.width - 24);
  240 |   await expect(root.getByRole('complementary', { name: '评分区' })).toBeVisible();
  241 |   const scroll = await main.evaluate(element => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth })); expect(scroll.scrollWidth).toBeLessThanOrEqual(scroll.clientWidth + 1);
  242 |   await record('E3-narrow-title-fit', { title, titleBox, meta, box, scroll }); await screenshot(page, 'E3-narrow-996x747');
  243 | });
  244 | 
  245 | test('R02 E3 score remains mounted through queue, appearance and focus actions without implicit save', async ({ page }) => {
  246 |   const root = await open(page, 'E3'), aside = root.getByRole('complementary', { name: '评分区' }), handle = await aside.elementHandle(), score = root.getByRole('spinbutton', { name: '本题分数' }), comment = root.getByRole('textbox', { name: '评分评语' });
  247 |   await score.fill('16'); await score.press('Tab'); await comment.fill('布局操作前未保存');
  248 |   await root.getByRole('button', { name: '显示批改队列', exact: true }).click();
  249 |   await region(root, 'grading-queue').getByRole('radio', { name: '卡片队列', exact: true }).click();
  250 |   await root.getByRole('button', { name: '隐藏批改队列', exact: true }).click();
  251 |   await root.getByRole('button', { name: '进入专注', exact: true }).click(); await expect(aside).toBeVisible();
  252 |   await root.getByRole('button', { name: '退出专注', exact: true }).click(); await expect(aside).toBeVisible();
  253 |   expect(await handle!.evaluate(element => element.isConnected)).toBe(true); expect(await aside.evaluate((element, original) => element === original, handle)).toBe(true);
  254 |   await expect(score).toHaveValue('16'); await expect(comment).toHaveValue('布局操作前未保存'); await expect(root.getByRole('status')).toHaveText('尚未保存到本地');
  255 |   await root.getByRole('button', { name: '保存本地草稿', exact: true }).click(); await expect(root.getByRole('status')).toHaveText('已保存到本地状态');
  256 | });
  257 | 
  258 | test('R02 E3 short 1343x600 scrolls only the answer while scoring stays in place', async ({ page }) => {
  259 |   const root = await open(page, 'E3', 1343, 600), main = root.getByTestId('grading-identity'), aside = root.getByRole('complementary', { name: '评分区' });
  260 |   const before = await aside.boundingBox(), scoreBefore = await root.getByRole('spinbutton', { name: '本题分数' }).boundingBox();
  261 |   await main.hover({ position: { x: 100, y: 150 } }); await page.mouse.wheel(0, 600);
  262 |   await expect.poll(() => main.evaluate(element => element.scrollTop)).toBeGreaterThan(0); await sameGeometry(aside, before); await sameGeometry(root.getByRole('spinbutton', { name: '本题分数' }), scoreBefore);
  263 |   await record('E3-short-score-bounds', { before, scoreBefore, scrollTop: await main.evaluate(element => element.scrollTop) }); await screenshot(page, 'E3-short-1343x600');
  264 | });
  265 | 
  266 | test('R02 protected E1 E4 E5 E6 lightweight state smoke', async ({ page }) => {
  267 |   let root = await open(page, 'E1'); await root.getByRole('textbox', { name: '资源说明草稿' }).fill('公共范围轻烟'); await expect(root.getByRole('tab', { name: '公共资源包', exact: true })).toHaveAttribute('aria-selected', 'true');
  268 |   root = await open(page, 'E4'); await root.getByRole('button', { name: '讲稿 02:10', exact: true }).click(); await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click(); await expect(root.getByTestId('playback-time')).toHaveText('02:10'); await page.keyboard.press('Escape');
  269 |   root = await open(page, 'E5'); const b = root.getByRole('region', { name: '实例 B', exact: true }); const bDraft = root.getByRole('textbox', { name: '实例 B 草稿', exact: true }); await bDraft.fill('实例B轻烟草稿'); const before = await b.boundingBox(); await root.getByRole('button', { name: '仅当前实例 A 使用紧凑目录', exact: true }).click(); await expect(bDraft).toHaveValue('实例B轻烟草稿'); await sameGeometry(b, before);
  270 |   root = await open(page, 'E6'); await root.getByRole('button', { name: '隐藏资源队列', exact: true }).click(); const restore = root.getByRole('button', { name: '展开资源队列', exact: true }); await expect(restore).toBeVisible(); await restore.click(); await expect(region(root, 'queue')).toHaveAttribute('data-mode', 'expanded');
  271 | });
  272 | 
```