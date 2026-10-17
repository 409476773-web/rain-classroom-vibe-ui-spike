# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w7.spec.ts >> N06 N04 hover bridges the entry and panel, Escape suppresses rebound, reentry remains usable
- Location: tests/e2e/navigation-v042-w7.spec.ts:131:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.check: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('checkbox', { name: '悬停临时查看', exact: true })
    - locator resolved to <input value="on" class="sr-only" type="checkbox" data-slot="input" aria-label="悬停临时查看" aria-checked="false" data-focus="control"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
      - waiting 100ms
    57 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件库" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - heading "导航组件 · v0.4.2" [level=1] [ref=e6]
    - link "R2 独立消费样本 ↗" [ref=e7] [cursor=pointer]:
      - /url: /navigation-v042-consumer.html
    - link "W3 独立消费样本 ↗" [ref=e8] [cursor=pointer]:
      - /url: /navigation-v042-w3-consumer.html
    - paragraph [ref=e9]: W3–W5 人工视觉已通过 含 R3 补充调整
  - generic [ref=e10]:
    - navigation "导航候选样本" [ref=e11]:
      - button "A1" [ref=e12]
      - button "A2" [ref=e13]
      - button "A3" [ref=e14]
      - button "A4" [ref=e15]
      - button "A5" [ref=e16]
      - button "Contents" [ref=e17]
      - button "White" [ref=e18]
      - button "Connections" [ref=e19]
      - button "R1" [ref=e20]
      - button "R2" [ref=e21]
      - button "R3" [ref=e22]
      - button "R4" [ref=e23]
      - button "R5" [ref=e24]
      - button "R6" [ref=e25]
      - button "S1" [ref=e26]
      - button "S2" [ref=e27]
      - button "S3" [ref=e28]
      - button "S4" [ref=e29]
      - button "S5" [ref=e30]
      - button "S6" [ref=e31]
    - generic [ref=e32]:
      - text: 画板宽度
      - combobox "画板宽度" [ref=e33]:
        - option "1200"
        - option "1440" [selected]
        - option "1600"
    - generic [ref=e34]:
      - text: 连接
      - combobox "连接" [ref=e35]:
        - option "内缩 inset" [selected]
        - option "贴边 merged"
    - generic [ref=e36]:
      - text: 表面
      - combobox "表面" [ref=e37]:
        - option "中性底" [selected]
        - option "白底轮廓"
    - generic [ref=e38]:
      - text: 可见范围
      - combobox "可见范围" [ref=e39]:
        - option "3"
        - option "4" [selected]
        - option "5"
    - generic [ref=e40]: 轻品牌
    - generic "未勾选时使用轻品牌外框" [ref=e41]:
      - checkbox "深色外框" [ref=e42]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e43] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#S3
  - generic "R6 工作区" [ref=e47]:
    - generic "当前工作区与区域恢复" [ref=e48]:
      - generic "显示与隐藏区域" [ref=e49]:
        - button "展开平台导航" [ref=e50] [cursor=pointer]
        - button "显示工作区" [ref=e52] [cursor=pointer]
        - button "隐藏内部目录" [expanded] [ref=e55] [cursor=pointer]
        - button "隐藏编辑工具" [expanded] [ref=e57] [cursor=pointer]
      - generic [ref=e60]:
        - strong [ref=e61]: 课程教学协作空间
        - generic [ref=e62]: 学习反馈 / 反馈表单
      - button "专注内容" [ref=e63] [cursor=pointer]
      - button "布局设置" [expanded] [ref=e68] [cursor=pointer]:
        - generic [ref=e70]: 布局
      - dialog [ref=e74]:
        - generic [ref=e75]:
          - heading "布局与显示" [level=2] [ref=e76]
          - paragraph [ref=e77]: 按当前任务保留常用区域。
          - generic [ref=e78]:
            - generic [ref=e79]: 平台导航
            - combobox "平台导航显示模式" [active] [ref=e80]:
              - option "展开"
              - option "图标" [selected]
              - option "隐藏"
          - generic [ref=e81]:
            - generic [ref=e82]: 工作区
            - combobox "工作区显示模式" [ref=e83]:
              - option "展开"
              - option "隐藏" [selected]
          - generic [ref=e84]:
            - generic [ref=e85]: 内部目录
            - combobox "内部目录显示模式" [ref=e86]:
              - option "展开" [selected]
              - option "隐藏"
          - generic [ref=e87]:
            - generic [ref=e88]: 编辑工具
            - combobox "编辑工具显示模式" [ref=e89]:
              - option "展开" [selected]
              - option "隐藏"
          - generic [ref=e90]:
            - generic [ref=e91]: 悬停临时查看
            - checkbox "悬停临时查看" [ref=e93]
          - contentinfo [ref=e96]:
            - button "恢复默认" [ref=e97] [cursor=pointer]
            - button "隐藏全部区域" [ref=e99] [cursor=pointer]
          - generic [ref=e101]: 工作区可用宽度 1440
    - generic [ref=e104]:
      - generic "平台导航" [ref=e106]:
        - generic [ref=e107]:
          - button "展开平台导航" [ref=e111] [cursor=pointer]
          - navigation "平台功能" [ref=e113]:
            - list [ref=e114]:
              - listitem [ref=e115]:
                - link "工作台" [ref=e117] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e120]:
                - link "课程" [ref=e122] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e125]:
                - link "资源" [ref=e127] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e130]:
                - link "专业" [ref=e132] [cursor=pointer]:
                  - /url: "#navigation-v042"
          - generic [ref=e135]:
            - button "当前账户：林老师" [ref=e136] [cursor=pointer]
            - button "通知" [ref=e139] [cursor=pointer]
            - button "帮助" [ref=e142] [cursor=pointer]
      - generic [ref=e145]:
        - generic [ref=e146]:
          - generic [ref=e147]:
            - generic [ref=e148]:
              - strong [ref=e151]: 课程教学协作空间
              - generic [ref=e152]: / 学习反馈
            - generic [ref=e154]: 教学协作 / 2026 秋季学期 · 演示空间
          - button "分享" [ref=e155] [cursor=pointer]
          - button "更多工作区操作" [ref=e159] [cursor=pointer]
        - generic [ref=e161]:
          - generic "内部目录" [ref=e163]:
            - generic [ref=e164]:
              - strong [ref=e165]: 内部目录
              - button "取消固定内部目录" [ref=e166] [cursor=pointer]
              - button "隐藏内部目录" [ref=e169] [cursor=pointer]
            - generic [ref=e172]: 工作区内部
            - navigation "工作区页面" [ref=e173]:
              - list [ref=e174]:
                - listitem [ref=e175]:
                  - link "课程任务" [ref=e177] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e182]:
                  - link "学习反馈" [ref=e184] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e189]:
                  - link "教研周报" [ref=e191] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e196]:
                  - link "资源素材" [ref=e198] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - heading "扩展内容" [level=5] [ref=e203]
            - navigation "工作区扩展页面" [ref=e204]:
              - list [ref=e205]:
                - listitem [ref=e206]:
                  - link "课程介绍" [ref=e208] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e213]:
                  - link "参考资料" [ref=e215] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - button "+ 新建页面" [ref=e221] [cursor=pointer]
          - separator "调整内部目录宽度" [ref=e223]
          - generic [ref=e225]:
            - generic "分区导航" [ref=e227]:
              - tablist "页面内容视图" [ref=e231]:
                - tab "表格" [ref=e232] [cursor=pointer]
                - tab "状态分组" [ref=e238] [cursor=pointer]
                - tab "画册" [ref=e244] [cursor=pointer]
                - tab "反馈表单" [selected] [ref=e250] [cursor=pointer]
            - tabpanel "反馈表单" [ref=e258]:
              - generic [ref=e259]:
                - generic [ref=e260]:
                  - radiogroup "反馈表单模式" [ref=e262]:
                    - generic [ref=e264]:
                      - generic [ref=e265] [cursor=pointer]:
                        - radio "编辑表单" [checked] [ref=e266]
                        - generic [ref=e267]: 编辑表单
                      - generic [ref=e268] [cursor=pointer]:
                        - radio "填写预览" [ref=e269]
                        - generic [ref=e270]: 填写预览
                  - button "筛选视图" [ref=e271] [cursor=pointer]
                  - button "链接选项" [ref=e273] [cursor=pointer]
                  - button "视图设置" [ref=e275] [cursor=pointer]
                - generic [ref=e277]:
                  - generic "编辑工具" [ref=e279]:
                    - generic [ref=e280]:
                      - strong [ref=e281]: 编辑工具
                      - button "取消固定编辑工具" [ref=e282] [cursor=pointer]
                      - button "隐藏编辑工具" [ref=e285] [cursor=pointer]
                    - heading "表单内容" [level=4] [ref=e288]
                    - generic [ref=e289]: 课程信息
                    - generic [ref=e291]: 学习体验
                    - generic [ref=e293]: 建议与反馈
                    - separator [ref=e295]
                    - heading "新增题目" [level=4] [ref=e296]
                    - button "新增文本题" [ref=e297] [cursor=pointer]:
                      - text: 文本
                      - generic [ref=e299]: +
                    - button "新增单选题" [ref=e300] [cursor=pointer]:
                      - text: 单选
                      - generic [ref=e302]: +
                    - button "新增评分题" [ref=e303] [cursor=pointer]:
                      - text: 评分
                      - generic [ref=e305]: +
                    - button "新增附件题" [ref=e306] [cursor=pointer]:
                      - text: 附件
                      - generic [ref=e308]: +
                    - paragraph [ref=e309]: 新增内容只影响当前表单示例。
                  - separator "调整编辑工具宽度" [ref=e310]
                  - generic [ref=e312]:
                    - generic [ref=e313]: COURSE FEEDBACK / 2026
                    - generic [ref=e316]:
                      - heading "课程学习反馈" [level=2] [ref=e317]
                      - paragraph [ref=e318]: 让每一次反馈，帮助我们一起改进课堂。本地示例，反馈不会发送给教师。
                      - generic [ref=e319]:
                        - generic [ref=e320]: 你正在学习的课程 *
                        - textbox "课程名称" [ref=e322]:
                          - /placeholder: 请输入课程名称
                          - text: 高等数学 A
                      - radiogroup "本阶段课程内容的理解程度" [ref=e325]:
                        - generic [ref=e327]:
                          - generic [ref=e328] [cursor=pointer]:
                            - radio "能够理解并独立应用" [ref=e329]
                            - generic [ref=e332]: 能够理解并独立应用
                          - generic [ref=e334] [cursor=pointer]:
                            - radio "基本理解，需要更多练习" [checked] [ref=e335]
                            - generic [ref=e339]: 基本理解，需要更多练习
                          - generic [ref=e341] [cursor=pointer]:
                            - radio "希望获得进一步的讲解" [ref=e342]
                            - generic [ref=e345]: 希望获得进一步的讲解
                      - generic [ref=e347]:
                        - generic [ref=e348]: 你希望补充哪些内容？
                        - textbox "你希望我们改进的地方" [ref=e350]:
                          - /placeholder: 写下你的具体建议…
                      - button "本地保存示例" [ref=e352] [cursor=pointer]
  - generic [ref=e354]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | 
  3   | async function open(page: Page, sample: string, width = 1440) {
  4   |   await page.goto(`/?sample=${sample}#navigation-v042`);
  5   |   await expect(page.getByRole('heading', { name: '导航组件 · v0.4.2' })).toBeVisible();
  6   |   await page.getByRole('combobox', { name: '画板宽度' }).selectOption(String(width));
  7   |   return page.getByTestId('candidate-canvas').locator('.rain-workspace').first();
  8   | }
  9   | const region = (root: Locator, id: string) => root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
  10  | const restore = (root: Locator, id: string) => root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`);
  11  | const shape = (locator: Locator) => locator.evaluate(element => {
  12  |   const rect = element.getBoundingClientRect();
  13  |   return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  14  | });
  15  | test('N01 S1 hides all regions and restores each once with keyboard-reachable focus', async ({ page }) => {
  16  |   const root = await open(page, 'S1');
  17  |   await root.getByRole('button', { name: '布局设置', exact: true }).click();
  18  |   await page.getByRole('dialog').getByRole('button', { name: '隐藏全部区域', exact: true }).click();
  19  |   await page.keyboard.press('Escape');
  20  |   for (const pane of await root.locator('.rain-workspace__region').all()) await expect(pane).toBeHidden();
  21  |   for (const entry of await root.locator('.rain-workspace__restore').all()) {
  22  |     const id = await entry.getAttribute('aria-controls');
  23  |     expect(id).toBeTruthy();
  24  |     await entry.focus(); await page.keyboard.press('Enter');
  25  |     await expect(root.locator(`[id="${id}"]`)).toBeVisible();
  26  |     await page.keyboard.press('Escape');
  27  |     await expect(entry).toBeFocused();
  28  |     expect(await root.evaluate(element => [...element.querySelectorAll('[hidden]')].some(hidden => hidden.contains(document.activeElement)))).toBe(false);
  29  |   }
  30  | });
  31  | async function setHover(page: Page, root: Locator) {
  32  |   await root.getByRole('button', { name: '布局设置', exact: true }).click();
> 33  |   await page.getByRole('checkbox', { name: '悬停临时查看', exact: true }).check();
      |                                                                     ^ Error: locator.check: Test timeout of 30000ms exceeded.
  34  |   await page.keyboard.press('Escape');
  35  | }
  36  | 
  37  | for (const sample of ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6']) {
  38  |   test(`N16 N17 N18 W7 matrix ${sample} accepted platform glyphs, palettes and account layout`, async ({ page }) => {
  39  |     const root = await open(page, sample, 1600);
  40  |     const rail = region(root, 'global');
  41  |     const expanded = async () => await rail.getAttribute('data-mode') === 'expanded' || await rail.getAttribute('data-temporary') === 'true';
  42  |     for (const inverse of [false, true]) {
  43  |       await page.getByRole('checkbox', { name: '深色外框', exact: true }).setChecked(inverse);
  44  |       for (const mode of ['expanded', 'compact']) {
  45  |         if (await expanded() !== (mode === 'expanded')) {
  46  |           await rail.getByRole('button', { name: mode === 'expanded' ? '展开平台导航' : await rail.getAttribute('data-temporary') === 'true' ? '关闭临时平台导航' : '收起平台导航', exact: true }).click();
  47  |         }
  48  |         await expect.poll(expanded).toBe(mode === 'expanded');
  49  |         expect((await shape(rail)).width).toBe(mode === 'expanded' ? 208 : 64);
  50  |         expect(await rail.evaluate(element => getComputedStyle(element).backgroundColor)).toBe(inverse ? 'rgb(37, 45, 67)' : 'rgb(232, 237, 248)');
  51  |         const links = rail.getByRole('link');
  52  |         expect(await links.count()).toBeGreaterThan(0);
  53  |         for (const link of await links.all()) {
  54  |           const glyph = link.locator('[data-rain-id="icon"]').first();
  55  |           const box = await shape(glyph);
  56  |           expect([box.width, box.height]).toEqual([18, 18]);
  57  |           if (mode === 'compact') {
  58  |             const row = await shape(link);
  59  |             expect(Math.abs(box.x + box.width / 2 - row.x - row.width / 2)).toBeLessThanOrEqual(1);
  60  |           }
  61  |         }
  62  |         const account = rail.getByRole('button', { name: '当前账户：林老师', exact: true });
  63  |         const notice = rail.getByRole('button', { name: '通知', exact: true });
  64  |         const help = rail.getByRole('button', { name: '帮助', exact: true });
  65  |         await expect(account.locator('[data-rain-id="ui-avatar"]')).toBeVisible();
  66  |         const a = await shape(account), n = await shape(notice), h = await shape(help);
  67  |         if (mode === 'expanded') {
  68  |           expect(a.x + a.width).toBeLessThanOrEqual(n.x + 1); expect(n.x + n.width).toBeLessThanOrEqual(h.x + 1);
  69  |           const toggle = await shape(rail.getByRole('button', { name: '收起平台导航', exact: true }));
  70  |           const brand = await shape(rail.locator('.nv42-brand,.nv43-brand,.nv5-brand,.nv44-brand').first());
  71  |           expect(toggle.x).toBeGreaterThan(brand.x);
  72  |           expect(toggle.x + toggle.width).toBeLessThanOrEqual((await shape(rail)).x + 208);
  73  |         }
  74  |         else { expect(n.y + n.height).toBeLessThanOrEqual(h.y + 1); expect(h.y + h.height).toBeLessThanOrEqual(a.y + 1); }
  75  |       }
  76  |     }
  77  |   });
  78  | }
  79  | 
  80  | test('N11 real wheel scroll in a constrained S2 host survives hide and restore', async ({ page }) => {
  81  |   const root = await open(page, 'S2');
  82  |   const pane = region(root, 'context');
  83  |   // Host sizing is a test fixture only; the user path and saved scroll state remain real.
  84  |   await page.addStyleTag({ content: '.nv43-workspace .rain-workspace__region[data-region-id="context"]{height:160px!important;min-height:0!important;overflow:auto!important}' });
  85  |   await pane.hover();
  86  |   await page.mouse.wheel(0, 260);
  87  |   await expect.poll(() => pane.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  88  |   const before = await pane.evaluate(element => element.scrollTop);
  89  |   const selected = await pane.locator('[aria-selected="true"]').getAttribute('id');
  90  |   expect(selected).toBeTruthy();
  91  |   await restore(root, 'context').click();
  92  |   await expect(pane).toBeHidden();
  93  |   await restore(root, 'context').click();
  94  |   await expect(pane).toBeVisible();
  95  |   expect(await pane.evaluate(element => element.scrollTop)).toBe(before);
  96  |   expect(await pane.locator('[aria-selected="true"]').getAttribute('id')).toBe(selected);
  97  | });
  98  | 
  99  | test('N15 A2 selected and hovered queue rows retain a shared zero-gap boundary', async ({ page }) => {
  100 |   await open(page, 'A2');
  101 |   const queue = page.getByTestId('candidate-A2').getByRole('group', { name: '当前学生队列' });
  102 |   const entries = queue.locator('[data-slot="entry"]');
  103 |   for (const index of [0, 1, 2]) {
  104 |     await entries.nth(index).click();
  105 |     await entries.nth((index + 1) % await entries.count()).hover();
  106 |     const rows = await queue.locator('.rain-navigation-family__row').evaluateAll(elements => elements.map(element => { const rect = element.getBoundingClientRect(); return { top: rect.top, bottom: rect.bottom, height: rect.height }; }));
  107 |     rows.forEach(row => expect(row.height).toBe(76));
  108 |     rows.slice(1).forEach((row, rowIndex) => expect(row.top).toBe(rows[rowIndex]!.bottom));
  109 |   }
  110 | });
  111 | 
  112 | for (const sample of ['R2', 'R4', 'S3', 'S5']) test(`N20 N24 ${sample} accepted pale splitter retains pointer and keyboard targets`, async ({ page }) => {
  113 |   const root = await open(page, sample, 1200);
  114 |   const splitter = root.locator('.rain-workspace__splitter:not([hidden])').first();
  115 |   await splitter.scrollIntoViewIfNeeded();
  116 |   const paint = () => splitter.evaluate(element => ({ line: getComputedStyle(element, '::before').opacity, handle: getComputedStyle(element, '::after').opacity, width: element.getBoundingClientRect().width, value: Number(element.getAttribute('aria-valuenow')) }));
  117 |   await page.mouse.move(1790, 1090);
  118 |   const before = await paint();
  119 |   expect(before.line).toBe('0.4'); expect(before.handle).toBe('0'); expect(before.width).toBeGreaterThanOrEqual(5);
  120 |   await splitter.hover(); expect((await paint()).line).toBe('1');
  121 |   const box = await splitter.boundingBox();
  122 |   await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  123 |   await page.mouse.down(); await page.mouse.move(box!.x + box!.width / 2 + 18, box!.y + box!.height / 2, { steps: 3 }); await page.mouse.up();
  124 |   await splitter.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
  125 |   await expect(splitter).toBeFocused(); expect((await paint()).line).toBe('1');
  126 |   const width = (await paint()).value;
  127 |   await page.keyboard.press('ArrowRight');
  128 |   expect((await paint()).value).not.toBe(width);
  129 | });
  130 | 
  131 | test('N06 N04 hover bridges the entry and panel, Escape suppresses rebound, reentry remains usable', async ({ page }) => {
  132 |   const root = await open(page, 'S3');
  133 |   await setHover(page, root);
```