# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w6-review02.spec.ts >> R02 E3 score remains mounted through queue, appearance and focus actions without implicit save
- Location: tests/e2e/navigation-v042-w6-review02.spec.ts:254:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.click: Test timeout of 45000ms exceeded.
Call log:
  - waiting for locator('[data-scene="E3"]').locator('.rain-workspace__region[data-region-id="grading-queue"]').getByRole('radio', { name: '卡片队列', exact: true })
    - locator resolved to <input type="radio" value="cards" class="sr-only" data-slot="input" data-focus="control" name="grading-appearance" aria-labelledby="_r_19_-label"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span id="_r_19_-label" data-slot="label" class="rain-segmented-control__label">卡片队列</span> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span id="_r_19_-label" data-slot="label" class="rain-segmented-control__label">卡片队列</span> intercepts pointer events
    - retrying click action
      - waiting 100ms
    86 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span id="_r_19_-label" data-slot="label" class="rain-segmented-control__label">卡片队列</span> intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - strong [ref=e5]: Rain · 独立业务工作区
    - generic [ref=e6]: W6 消费试验 · 模拟数据与本地草稿
  - navigation "W6独立消费任务" [ref=e7]:
    - generic [ref=e8]:
      - link "课程资源" [ref=e9] [cursor=pointer]:
        - /url: "#E1"
      - link "课堂互动" [ref=e13] [cursor=pointer]:
        - /url: "#E2"
      - link "连续批改" [ref=e17] [cursor=pointer]:
        - /url: "#E3"
      - link "课堂回放" [ref=e21] [cursor=pointer]:
        - /url: "#E4"
      - link "实例隔离" [ref=e25] [cursor=pointer]:
        - /url: "#E5"
      - link "新建审阅台" [ref=e29] [cursor=pointer]:
        - /url: "#E6"
  - region "E3 连续批改" [ref=e33]:
    - generic [ref=e34]:
      - generic [ref=e35]:
        - strong [ref=e36]: 校园微气候实验报告 · 连续批改
        - generic [ref=e37]:
          - button "隐藏批改队列" [expanded] [active] [ref=e38] [cursor=pointer]
          - button "进入专注" [ref=e39] [cursor=pointer]
      - generic [ref=e41]:
        - generic "批改队列" [ref=e43]:
          - generic [ref=e44]:
            - heading "批改队列" [level=2] [ref=e45]
            - generic [ref=e46]: 3 位学生
          - generic [ref=e47]:
            - generic [ref=e48]: 批改顺序
            - radiogroup "批改方式" [ref=e50]:
              - generic [ref=e52]:
                - generic [ref=e53] [cursor=pointer]:
                  - radio "按人" [checked] [ref=e54]
                  - generic [ref=e55]: 按人
                - generic [ref=e56] [cursor=pointer]:
                  - radio "按题" [ref=e57]
                  - generic [ref=e58]: 按题
            - generic [ref=e59]: 显示方式
            - radiogroup "队列外观" [ref=e61]:
              - generic [ref=e63]:
                - generic [ref=e64] [cursor=pointer]:
                  - radio "列表队列" [checked] [ref=e65]
                  - generic [ref=e66]: 列表队列
                - generic [ref=e67] [cursor=pointer]:
                  - radio "卡片队列" [ref=e68]
                  - generic [ref=e69]: 卡片队列
          - paragraph [ref=e70]: 逐份批改学生的全部题目
          - group "当前批改对象" [ref=e71]:
            - group "当前学生选择" [ref=e72]:
              - list [ref=e73]:
                - listitem [ref=e74]:
                  - button "林宁" [pressed] [ref=e76] [cursor=pointer]:
                    - generic [ref=e77]:
                      - generic [ref=e78]: 林宁
                      - generic [ref=e79]: 学号 2026001
                      - generic [ref=e80]: 待批改
                    - generic [ref=e84]: 0/3
                - listitem [ref=e85]:
                  - button "陈安" [ref=e87] [cursor=pointer]:
                    - generic [ref=e88]:
                      - generic [ref=e89]: 陈安
                      - generic [ref=e90]: 学号 2026002
                      - generic [ref=e91]: 待批改
                    - generic [ref=e95]: 0/3
                - listitem [ref=e96]:
                  - button "周岚" [ref=e98] [cursor=pointer]:
                    - generic [ref=e99]:
                      - generic [ref=e100]: 周岚
                      - generic [ref=e101]: 学号 2026003
                      - generic [ref=e102]: 待批改
                    - generic [ref=e106]: 0/3
          - paragraph [ref=e107]: 右侧数量表示本页已保存 / 全部。
        - separator "调整批改队列宽度" [ref=e108]
        - article [ref=e109]:
          - generic [ref=e110]:
            - paragraph [ref=e111]: 按学生批改
            - generic [ref=e112]:
              - generic [ref=e113]:
                - heading "林宁的实验报告" [level=1] [ref=e114]
                - generic [ref=e115]: 待批改
              - paragraph [ref=e118]: 学号 2026001第1题
          - region "选择该学生的题目" [ref=e120]:
            - generic [ref=e122]:
              - generic "分区导航" [ref=e124]:
                - tablist "当前题目选择" [ref=e128]:
                  - tab "第1题" [selected] [ref=e129] [cursor=pointer]
                  - tab "第2题" [ref=e133] [cursor=pointer]
                  - tab "第3题" [ref=e137] [cursor=pointer]
              - tabpanel "第1题" [ref=e143]:
                - generic [ref=e144]:
                  - generic [ref=e145]:
                    - generic [ref=e146]:
                      - generic [ref=e147]: 第1题
                      - generic [ref=e150]: 满分 20 分
                    - heading "建立可检验假设" [level=2] [ref=e151]
                    - paragraph [ref=e152]: 根据校园广场与林荫道的温度差异，提出一个可通过实地测量验证的研究假设。说明自变量、因变量，以及预期的变化方向。
                  - region "当前学生答案" [ref=e153]:
                    - generic [ref=e154]:
                      - heading "学生答案" [level=2] [ref=e155]
                      - generic [ref=e156]: 模拟作答
                    - paragraph [ref=e159]: 我们的假设是：同一时段内，树冠遮阴覆盖率越高，地表温度越低。自变量是遮阴覆盖率，因变量是地表温度；我们将在广场、林荫道和建筑阴影下分别测量。
                  - generic [ref=e160]:
                    - heading "评分参考" [level=2] [ref=e161]
                    - list [ref=e162]:
                      - listitem [ref=e163]:
                        - generic [ref=e164]: "01"
                        - text: 研究问题明确
                      - listitem [ref=e165]:
                        - generic [ref=e166]: "02"
                        - text: 自变量与因变量对应
                      - listitem [ref=e167]:
                        - generic [ref=e168]: "03"
                        - text: 假设可通过测量验证
        - separator "调整评分区宽度" [ref=e169]
        - generic "评分区" [ref=e171]:
          - complementary "评分区" [ref=e172]:
            - generic [ref=e173]:
              - heading "评分区" [level=2] [ref=e174]
              - generic [ref=e175]: 第1题
            - paragraph [ref=e176]:
              - strong [ref=e177]: 林宁
              - generic [ref=e178]: 建立可检验假设
            - generic [ref=e179]:
              - text: 本题分数
              - generic [ref=e180]:
                - generic [ref=e181]:
                  - generic [ref=e182]:
                    - spinbutton "本题分数" [ref=e183]: "16"
                    - generic [ref=e184]: / 20 分
                  - generic:
                    - button "增加本题分数"
                    - button "减少本题分数"
                - generic [ref=e185]: 单位：/ 20 分
            - generic [ref=e186]:
              - text: 评分评语
              - textbox "评分评语" [ref=e188]:
                - /placeholder: 结合答案写下评价与改进建议
                - text: 布局操作前未保存
            - generic [ref=e189]:
              - button "保存本地草稿" [ref=e190] [cursor=pointer]
              - status [ref=e192]: 尚未保存到本地
              - generic [ref=e193]: 模拟批改 · 仅保留在当前页面，刷新清空。
```

# Test source

```ts
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
> 258 |   await region(root, 'grading-queue').getByRole('radio', { name: '卡片队列', exact: true }).click();
      |                                                                                         ^ Error: locator.click: Test timeout of 45000ms exceeded.
  259 |   await root.getByRole('button', { name: '隐藏批改队列', exact: true }).click();
  260 |   await root.getByRole('button', { name: '进入专注', exact: true }).click(); await expect(aside).toBeVisible();
  261 |   await root.getByRole('button', { name: '退出专注', exact: true }).click(); await expect(aside).toBeVisible();
  262 |   expect(await handle!.evaluate(element => element.isConnected)).toBe(true); expect(await aside.evaluate((element, original) => element === original, handle)).toBe(true);
  263 |   await expect(score).toHaveValue('16'); await expect(comment).toHaveValue('布局操作前未保存'); await expect(root.getByRole('status')).toHaveText('尚未保存到本地');
  264 |   await root.getByRole('button', { name: '保存本地草稿', exact: true }).click(); await expect(root.getByRole('status')).toHaveText('已保存到本地状态');
  265 | });
  266 | 
  267 | test('R02 E3 compact question queue shows all three full entries and ordinary full-score metadata', async ({ page }) => {
  268 |   const root = await open(page, 'E3'); await root.getByRole('button', { name: '显示批改队列', exact: true }).click();
  269 |   const queue = region(root, 'grading-queue'); await queue.getByRole('radio', { name: '按题', exact: true }).click();
  270 |   const rows = queue.getByRole('group', { name: '当前题目选择', exact: true }).getByRole('button'); await expect(rows).toHaveCount(3);
  271 |   const box = (await queue.boundingBox())!, entries = await Promise.all((await rows.all()).map(row => row.boundingBox()));
  272 |   for (const [index, row] of (await rows.all()).entries()) {
  273 |     const entry = entries[index]!; expect(entry.y).toBeGreaterThanOrEqual(box.y); expect(entry.y + entry.height).toBeLessThanOrEqual(box.y + box.height);
  274 |     expect(entry.height, 'compact queue entry instead of the old 96px default').toBeLessThan(96);
  275 |     const fullScore = row.getByText('满分 20 分', { exact: true }); await expect(fullScore).toBeVisible();
  276 |     expect(await fullScore.evaluate(element => element.closest('[data-rain-id="ui-tag"]'))).toBeNull();
  277 |     const style = await fullScore.evaluate(element => ({ fontSize: getComputedStyle(element).fontSize, color: getComputedStyle(element).color })); expect(parseFloat(style.fontSize)).toBeLessThanOrEqual(12);
  278 |   }
  279 |   await record('E3-compact-queue', { box, entries }); await screenshot(page, 'E3-compact-question-queue-1343x747');
  280 | });
  281 | 
  282 | test('R02 E3 short 1343x600 scrolls only the answer while scoring stays in place', async ({ page }) => {
  283 |   const root = await open(page, 'E3', 1343, 600), main = root.getByTestId('grading-identity'), aside = root.getByRole('complementary', { name: '评分区' });
  284 |   const before = await aside.boundingBox(), scoreBefore = await root.getByRole('spinbutton', { name: '本题分数' }).boundingBox();
  285 |   await main.hover({ position: { x: 100, y: 150 } }); await page.mouse.wheel(0, 600);
  286 |   await expect.poll(() => main.evaluate(element => element.scrollTop)).toBeGreaterThan(0); await sameGeometry(aside, before); await sameGeometry(root.getByRole('spinbutton', { name: '本题分数' }), scoreBefore);
  287 |   await record('E3-short-score-bounds', { before, scoreBefore, scrollTop: await main.evaluate(element => element.scrollTop) }); await screenshot(page, 'E3-short-1343x600');
  288 | });
  289 | 
  290 | test('R02 E4 actual pointer pin expands the pane and preserves playback, notes and focus mode', async ({ page }) => {
  291 |   const root = await open(page, 'E4'), main = root.locator('.w6-replay-main'), pane = region(root, 'knowledge-index'), workspace = root.locator('.rain-workspace');
  292 |   const notes = root.getByRole('textbox', { name: '回放笔记' }); await notes.fill('固定知识索引前的笔记');
  293 |   await root.getByRole('button', { name: '讲稿 02:10', exact: true }).click();
  294 |   const before = await main.boundingBox(); await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click();
  295 |   await expect(pane).toHaveAttribute('data-temporary', 'true'); await sameGeometry(main, before);
  296 |   await root.getByRole('button', { name: '固定知识索引', exact: true }).click();
  297 |   await expect(pane).toHaveAttribute('data-mode', 'expanded'); await expect(pane).toHaveAttribute('data-temporary', 'false'); await expect(pane).toBeVisible();
  298 |   expect((await main.boundingBox())!.width).toBeLessThan(before!.width - 200);
  299 |   await expect(root.getByTestId('playback-time')).toHaveText('02:10'); await expect(notes).toHaveValue('固定知识索引前的笔记'); await expect(workspace).toHaveAttribute('data-focused', 'false');
  300 |   await screenshot(page, 'E4-pinned-1343x747');
  301 |   await root.getByRole('button', { name: '进入专注', exact: true }).click(); await expect(workspace).toHaveAttribute('data-focused', 'true');
  302 |   await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click(); await root.getByRole('button', { name: '固定知识索引', exact: true }).click();
  303 |   await expect(pane).toHaveAttribute('data-mode', 'expanded'); await expect(workspace).toHaveAttribute('data-focused', 'true');
  304 |   await expect(root.getByTestId('playback-time')).toHaveText('02:10'); await expect(notes).toHaveValue('固定知识索引前的笔记');
  305 |   await root.getByRole('button', { name: '退出专注', exact: true }).click(); await expect(workspace).toHaveAttribute('data-focused', 'false'); await expect(pane).toHaveAttribute('data-mode', 'expanded');
  306 |   await record('E4-wide-pin-result', { before, after: await main.boundingBox(), pane: await pane.boundingBox() });
  307 | });
  308 | 
  309 | test('R02 E4 600 pointer pin keeps an unfit pane temporary and visible with its state', async ({ page }) => {
  310 |   const root = await open(page, 'E4', 600), pane = region(root, 'knowledge-index'), main = root.locator('.w6-replay-main');
  311 |   const notes = root.getByRole('textbox', { name: '回放笔记' }); await notes.fill('600窄屏固定笔记'); await root.getByRole('button', { name: '讲稿 02:10', exact: true }).click();
  312 |   const before = await main.boundingBox(); await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click(); await expect(pane).toHaveAttribute('data-temporary', 'true');
  313 |   await root.getByRole('button', { name: '固定知识索引', exact: true }).click();
  314 |   await expect(pane).toHaveAttribute('data-temporary', 'true'); await expect(pane).toHaveAttribute('data-mode', 'hidden'); await expect(pane).toBeVisible(); await sameGeometry(main, before);
  315 |   await expect(root.getByTestId('playback-time')).toHaveText('02:10'); await expect(notes).toHaveValue('600窄屏固定笔记');
  316 |   await screenshot(page, 'E4-unfit-pin-600x747'); await record('E4-narrow-pin-result', { before, pane: await pane.boundingBox() });
  317 |   await page.keyboard.press('Escape'); await expect(pane).toBeHidden(); await expect(root.getByRole('button', { name: '临时查看知识索引', exact: true })).toBeFocused();
  318 | });
  319 | 
  320 | test('R02 protected E1 E4 E5 E6 lightweight state smoke', async ({ page }) => {
  321 |   let root = await open(page, 'E1'); await root.getByRole('textbox', { name: '资源说明草稿' }).fill('公共范围轻烟'); await expect(root.getByRole('tab', { name: '公共资源包', exact: true })).toHaveAttribute('aria-selected', 'true');
  322 |   root = await open(page, 'E4'); await root.getByRole('button', { name: '讲稿 02:10', exact: true }).click(); await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click(); await expect(root.getByTestId('playback-time')).toHaveText('02:10'); await page.keyboard.press('Escape');
  323 |   root = await open(page, 'E5'); const b = root.getByRole('region', { name: '实例 B', exact: true }); const bDraft = root.getByRole('textbox', { name: '实例 B 草稿', exact: true }); await bDraft.fill('实例B轻烟草稿'); const before = await b.boundingBox(); await root.getByRole('button', { name: '仅当前实例 A 使用紧凑目录', exact: true }).click(); await expect(bDraft).toHaveValue('实例B轻烟草稿'); await sameGeometry(b, before);
  324 |   root = await open(page, 'E6'); await root.getByRole('button', { name: '隐藏资源队列', exact: true }).click(); const restore = root.getByRole('button', { name: '展开资源队列', exact: true }); await expect(restore).toBeVisible(); await restore.click(); await expect(region(root, 'queue')).toHaveAttribute('data-mode', 'expanded');
  325 | });
  326 | 
```