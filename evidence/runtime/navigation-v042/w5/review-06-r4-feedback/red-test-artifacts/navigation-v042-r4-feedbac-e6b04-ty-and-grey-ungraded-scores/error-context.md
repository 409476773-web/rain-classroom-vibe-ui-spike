# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-r4-feedback.spec.ts >> R4 feedback contracts >> group filter, search and activity selection preserve identity and grey ungraded scores
- Location: tests/e2e/navigation-v042-r4-feedback.spec.ts:89:3

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 8
Received:    48
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
    - paragraph [ref=e9]: A1 · A4 · R2 人工视觉已通过 W3–W5 组合建设 · G2 待评审
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
    - generic [ref=e40]:
      - text: 业务子场景
      - combobox "业务子场景" [ref=e41]:
        - option "课堂互动" [selected]
        - option "教师批改"
    - link "打开认可原稿 ↗" [ref=e42] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R4
  - generic "R4 工作区" [ref=e45]:
    - generic [ref=e46]:
      - button "展开平台导航" [ref=e47] [cursor=pointer]:
        - generic [ref=e49]: 平台导航
      - button "隐藏课堂功能" [expanded] [ref=e50] [cursor=pointer]:
        - generic [ref=e52]: 课堂功能
      - button "隐藏小组列表" [expanded] [ref=e53] [cursor=pointer]:
        - generic [ref=e55]: 小组列表
      - generic [ref=e57]:
        - strong [ref=e58]: 小组汇报：从概念到真实应用
        - generic "知行合一 · 智能汇报" [ref=e59]
      - button "布局" [ref=e60] [cursor=pointer]
      - button "专注内容" [ref=e62] [cursor=pointer]
    - generic [ref=e64]:
      - generic "平台导航" [ref=e66]:
        - generic [ref=e67]:
          - button "展开平台导航" [ref=e71] [cursor=pointer]
          - navigation "平台功能" [ref=e73]:
            - list [ref=e74]:
              - listitem [ref=e75]:
                - link "工作台" [ref=e77] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e80]:
                - link "课程" [ref=e82] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e85]:
                - link "资源" [ref=e87] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e90]:
                - link "专业" [ref=e92] [cursor=pointer]:
                  - /url: "#navigation-v042"
          - generic [ref=e95]:
            - button "通知" [ref=e96] [cursor=pointer]
            - button "帮助" [ref=e98] [cursor=pointer]
            - generic [ref=e100]: 林
      - generic [ref=e102]:
        - generic [ref=e103]:
          - strong [ref=e104]: 大学物理 · 第九章课堂回顾
          - generic [ref=e105]: 2026-09-24 11:21
          - button "导出数据" [ref=e106] [cursor=pointer]
        - generic [ref=e110]:
          - generic "课堂功能" [ref=e112]:
            - generic [ref=e113]:
              - strong [ref=e114]: 课堂功能
              - button "取消固定课堂功能" [ref=e115] [cursor=pointer]
              - button "隐藏课堂功能" [ref=e117] [cursor=pointer]
            - heading "课堂数据" [level=4] [ref=e119]
            - navigation "课堂功能" [ref=e120]:
              - list [ref=e121]:
                - listitem [ref=e122]:
                  - link "综合数据" [ref=e124] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e129]:
                  - link "学生表现" [ref=e131] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e136]:
                  - link "课堂习题" [ref=e138] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e143]:
                  - link "课堂互动" [ref=e145] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e150]:
                  - link "教学内容" [ref=e152] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - generic [ref=e157]: 课堂范围内的功能导航
          - separator "调整课堂功能宽度" [ref=e158]
          - main [ref=e159]:
            - generic [ref=e160]:
              - generic "分区导航" [ref=e161]:
                - tablist "课堂互动内容" [ref=e165]:
                  - tab "投稿" [ref=e166] [cursor=pointer]
                  - tab "随机点名" [ref=e170] [cursor=pointer]
                  - tab "分组讨论" [ref=e174] [cursor=pointer]
                  - tab "智能汇报" [selected] [ref=e178] [cursor=pointer]
              - tabpanel "智能汇报" [ref=e183]:
                - generic [ref=e184]:
                  - group "课堂活动" [ref=e185]:
                    - list [ref=e186]:
                      - listitem [ref=e187]:
                        - button "辩论赛：大学校园是否应该免费开放" [ref=e189] [cursor=pointer]:
                          - generic [ref=e190]:
                            - generic [ref=e191]: 辩论赛：大学校园是否应该免费开放
                            - generic [ref=e192]:
                              - generic [ref=e193]: "6"
                              - text: 组已完成
                              - generic [ref=e194]: ·
                              - text: 21 分钟
                            - progressbar "辩论赛：大学校园是否应该免费开放完成进度" [ref=e195]:
                              - generic [ref=e197]: 完成 75%
                      - listitem [ref=e198]:
                        - button "小组汇报：从概念到真实应用" [pressed] [ref=e200] [cursor=pointer]:
                          - generic [ref=e201]:
                            - generic [ref=e202]: 小组汇报：从概念到真实应用
                            - generic [ref=e203]:
                              - generic [ref=e204]: "8"
                              - text: 组已完成
                              - generic [ref=e205]: ·
                              - text: 36 分钟
                            - progressbar "小组汇报：从概念到真实应用完成进度" [ref=e206]:
                              - generic [ref=e208]: 完成 100%
                  - generic [ref=e209]:
                    - generic "小组列表" [ref=e211]:
                      - generic [ref=e212]:
                        - strong [ref=e213]: 小组列表
                        - button "取消固定小组列表" [ref=e214] [cursor=pointer]
                        - button "隐藏小组列表" [ref=e216] [cursor=pointer]
                      - generic [ref=e218]:
                        - generic [ref=e219]:
                          - heading "小组结果" [level=4] [ref=e220]
                          - generic [ref=e221]: 6 组
                        - radiogroup "小组提交状态" [ref=e223]:
                          - generic [ref=e225]:
                            - generic [ref=e226] [cursor=pointer]:
                              - radio "全部" [ref=e227]
                              - generic [ref=e228]: 全部
                            - generic [ref=e229] [cursor=pointer]:
                              - radio "已提交" [ref=e230]
                              - generic [ref=e231]: 已提交
                            - generic [ref=e232] [cursor=pointer]:
                              - radio "未评分" [checked] [ref=e233]
                              - generic [ref=e234]: 未评分
                        - textbox "搜索小组" [ref=e238]:
                          - /placeholder: 搜索小组名称
                          - text: 知行
                      - group "小组结果" [ref=e240]:
                        - list [ref=e241]:
                          - listitem [ref=e242]:
                            - button "知行合一" [active] [pressed] [ref=e244] [cursor=pointer]:
                              - generic [ref=e245]:
                                - generic [ref=e246]: 知行合一
                                - generic [ref=e247]: 未评分 · 待教师反馈
                                - generic [ref=e249]:
                                  - generic [ref=e250]: 林
                                  - generic [ref=e252]: 王
                                  - generic [ref=e254]: 陈
                                  - generic [ref=e256]: 周
                              - generic [ref=e258]: —
                      - generic [ref=e259]: 展示 6 组演示对象 · 选择后结果同步更新
                    - separator "调整小组列表宽度" [ref=e260]
                    - article [ref=e261]:
                      - generic [ref=e262]:
                        - generic [ref=e263]: 知
                        - generic [ref=e265]:
                          - heading "知行合一" [level=3] [ref=e266]
                          - paragraph [ref=e267]: 小组汇报：从概念到真实应用 · 未评分
                        - generic "当前小组得分" [ref=e268]: — / 10
                      - generic [ref=e269]:
                        - heading "讨论摘要 示例" [level=4] [ref=e270]:
                          - text: 讨论摘要
                          - generic [ref=e272]: 示例
                        - paragraph [ref=e275]: 本组已经整理讨论结果，等待教师对论证过程与证据的补充建议。
                        - generic [ref=e276]:
                          - generic [ref=e277]: 待教师反馈
                          - generic [ref=e280]: 观点组织
                      - generic [ref=e283]:
                        - heading "最终结论" [level=4] [ref=e284]
                        - paragraph [ref=e285]: 本组已经整理讨论结果，等待教师对论证过程与证据的补充建议。
                      - heading "讨论过程 3 条示例" [level=4] [ref=e286]
                      - generic [ref=e287]:
                        - generic [ref=e288]:
                          - generic [ref=e289]: 林
                          - generic [ref=e291]:
                            - generic [ref=e292]:
                              - generic [ref=e293]: 林可
                              - generic [ref=e294]: 11:32
                            - paragraph [ref=e295]: 我们先把问题分为几个独立的方面，再分别寻找依据。
                        - generic [ref=e296]:
                          - generic [ref=e297]: 陈
                          - generic [ref=e299]:
                            - generic [ref=e300]:
                              - generic [ref=e301]: 陈宁
                              - generic [ref=e302]: 11:35
                            - paragraph [ref=e303]: 这份结论需要明确实施条件与适用的边界。
                        - generic [ref=e304]:
                          - generic [ref=e305]: 周
                          - generic [ref=e307]:
                            - generic [ref=e308]:
                              - generic [ref=e309]: 周晓
                              - generic [ref=e310]: 11:38
                            - paragraph [ref=e311]: 可以将上述分析整理为可执行的方案，再与其他组比较。
  - generic [ref=e312]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
  3   | import { resolve } from 'node:path';
  4   | 
  5   | const evidence = resolve('evidence/runtime/navigation-v042/review-06');
  6   | const capture = process.env.R4_FEEDBACK_CAPTURE;
  7   | const open = async (page: Page, width = 1440) => {
  8   |   await page.goto(`/?sample=R4&feedbackWidth=${width}#navigation-v042`);
  9   |   await expect(page.getByRole('heading', { name: '导航组件 · v0.4.2' })).toBeVisible();
  10  |   await page.getByRole('combobox', { name: '业务子场景' }).selectOption('interaction');
  11  |   await page.getByRole('combobox', { name: '画板宽度' }).selectOption(String(width));
  12  |   const root = page.locator('[data-recipe-id="recipe-navigation-r4"]');
  13  |   await expect(root).toBeVisible();
  14  |   return root;
  15  | };
  16  | const region = (root: Locator, id: string) => root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
  17  | const restore = (root: Locator, id: string) => root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`).first();
  18  | const shape = async (locator: Locator) => locator.evaluate(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  19  | const metrics = async (root: Locator) => root.evaluate(e => {
  20  |   const rect = (el: Element) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
  21  |   const one = (selector: string) => {
  22  |     const el = e.querySelector(selector); if (!el) return null;
  23  |     const css = getComputedStyle(el);
  24  |     return { ...rect(el), color: css.color, background: css.backgroundColor, fontSize: css.fontSize, lineHeight: css.lineHeight, padding: css.padding, gap: css.gap, overflowX: css.overflowX, scrollWidth: (el as HTMLElement).scrollWidth, clientWidth: (el as HTMLElement).clientWidth };
  25  |   };
  26  |   const rootRect = rect(e);
  27  |   const footer = Array.from(e.querySelectorAll('.nv5-platform-content>footer>*')).map(rect);
  28  |   return { root: rootRect, recovery: one('.nv5-recovery'), module: one('.nv5-module-header'), activityTrack: one('.nv5-activities .rain-navigation-family__track'), activities: Array.from(e.querySelectorAll('.nv5-activities .rain-navigation-family__entry')).map(rect), progress: one('.nv5-activities [role="progressbar"]'), activityMetadata: one('.nv5-activities .rain-navigation-family__metadata'), queueHead: one('.nv5-queue-head'), queueRegionHead: one('.nv5-queue>.nv5-region-head'), queueList: one('.nv5-group-objects'), groupLabel: one('.nv5-group-objects .rain-navigation-family__label'), detailTitle: one('.nv5-group-title h3'), context: one('.nv5-class-context'), contextEntry: one('.nv5-class-context .rain-navigation-family__entry'), contextSplitter: one('.rain-workspace__splitter[aria-label="调整课堂功能宽度"]'), contextFooter: one('.nv5-class-context>.nv5-context-footer'), footer, avatarGroups: e.querySelectorAll('[data-rain-id="ui-avatar-group"]').length, nestedButtons: e.querySelectorAll('button button').length, horizontalRegions: Array.from(e.querySelectorAll('.nv5-interaction-main,.nv5-interaction-detail,.nv5-group-detail')).map(el => ({ ...rect(el), scrollWidth: (el as HTMLElement).scrollWidth, clientWidth: (el as HTMLElement).clientWidth })), selectedScore: one('.nv5-group-objects button[aria-pressed="true"] .nv5-score'), platformMode: e.querySelector('[data-region-id="global"]')?.getAttribute('data-mode') };
  29  | });
  30  | const settle = async (page: Page) => {
  31  |   await page.locator('[data-recipe-id="recipe-navigation-r4"] img').evaluateAll(async images => { await Promise.all(images.map(async node => { const img = node as HTMLImageElement; try { await img.decode(); } catch {} })); });
  32  |   await page.mouse.move(1790, 1090);
  33  |   await page.evaluate(() => document.fonts.ready);
  34  | };
  35  | 
  36  | test('capture immutable R4 feedback snapshots', async ({ page }) => {
  37  |   test.setTimeout(120000);
  38  |   test.skip(!capture, 'Evidence capture is a separate operation from contract verification.');
  39  |   const dir = resolve(evidence, capture!); mkdirSync(dir, { recursive: true });
  40  |   const results: Record<string, unknown> = {}; const errors: string[] = [];
  41  |   page.on('pageerror', error => errors.push(error.message));
  42  |   for (const width of [1200, 1440, 1600]) {
  43  |     const root = await open(page, width);
  44  |     for (const mode of ['compact', 'expanded', 'ungraded']) {
  45  |       if (mode === 'expanded') await region(root, 'global').getByRole('button', { name: '展开平台导航', exact: true }).click();
  46  |       if (mode === 'ungraded') await root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '知行合一', exact: true }).click();
  47  |       await settle(page);
  48  |       const key = `R4-interaction-${width}-${mode}`;
  49  |       results[key] = await metrics(root);
  50  |       await root.screenshot({ path: resolve(dir, `${key}.png`) });
  51  |       writeFileSync(resolve(dir, 'measurements.json'), JSON.stringify({ createdAt: new Date().toISOString(), phase: capture, scope: 'R4 interaction, DPR1 Chromium; approved HTML remains historical baseline', pageErrors: errors, cases: results }, null, 2));
  52  |     }
  53  |   }
  54  |   writeFileSync(resolve(dir, 'measurements.json'), JSON.stringify({ createdAt: new Date().toISOString(), phase: capture, scope: 'R4 interaction, DPR1 Chromium; approved HTML remains historical baseline', pageErrors: errors, cases: results }, null, 2));
  55  |   expect(errors).toEqual([]);
  56  | });
  57  | 
  58  | test.describe('R4 feedback contracts', () => {
  59  |   test.skip(Boolean(capture), 'Contract assertions run separately from immutable before/after capture.');
  60  |   test('existing AvatarGroup portraits remain visible and do not nest actions inside group selectors', async ({ page }) => {
  61  |     const root = await open(page), row = root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '第一小分队', exact: true });
  62  |     const avatars = row.locator('[data-rain-id="ui-avatar-group"] [data-rain-id="ui-avatar"]');
  63  |     await expect(avatars).toHaveCount(4);
  64  |     await settle(page);
  65  |     for (const avatar of await avatars.all()) {
  66  |       const portrait = avatar.locator('img[data-slot="portrait"]');
  67  |       await expect(portrait).toBeVisible();
  68  |       expect(await portrait.evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
  69  |     }
  70  |     expect(await root.locator('button button').count()).toBe(0);
  71  |   });
  72  |   test('compact activity cards reserve more room for details across every supported canvas width', async ({ page }) => {
  73  |     const before = JSON.parse(readFileSync(resolve(evidence, 'before-v2/measurements.json'), 'utf8'));
  74  |     for (const width of [1200, 1440, 1600]) {
  75  |       const root = await open(page, width), now = await metrics(root), prior = before.cases[`R4-interaction-${width}-compact`];
  76  |       expect(now.recovery?.height).toBe(56); expect(now.module?.height).toBe(44);
  77  |       expect(now.activityTrack?.padding).toBe('12px');
  78  |       expect(now.activityTrack!.height).toBeLessThan(prior.activityTrack.height);
  79  |       expect(now.queueHead!.height).toBeLessThan(prior.queueHead.height);
  80  |       expect(now.queueList!.height).toBeGreaterThan(prior.queueList.height);
  81  |       for (const card of now.activities) expect(card.height).toBeLessThan(prior.activities[0].height);
  82  |       expect(now.progress?.height).toBe(4); expect(now.activityMetadata?.gap).toBe('4px');
  83  |       expect(now.queueRegionHead?.height).toBe(36); expect(now.groupLabel?.fontSize).toBe('14px');
  84  |       expect(now.detailTitle?.fontSize).toBe('16px'); expect(now.detailTitle?.height).toBe(22);
  85  |       expect(now.contextFooter?.fontSize).toBe('12px');
  86  |       for (const pane of now.horizontalRegions) expect(pane.scrollWidth).toBeLessThanOrEqual(pane.clientWidth + 1);
  87  |     }
  88  |   });
  89  |   test('group filter, search and activity selection preserve identity and grey ungraded scores', async ({ page }) => {
  90  |     const root = await open(page);
  91  |     await root.getByRole('group', { name: '课堂活动', exact: true }).getByRole('button', { name: '小组汇报：从概念到真实应用', exact: true }).click();
  92  |     await root.getByRole('radio', { name: '未评分', exact: true }).locator('..').click();
  93  |     await root.getByRole('textbox', { name: '搜索小组', exact: true }).fill('知行');
  94  |     const row = root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '知行合一', exact: true });
  95  |     await row.click();
  96  |     await expect(root.getByRole('heading', { name: '知行合一', exact: true })).toBeVisible();
  97  |     await expect(root.locator('.nv5-recovery-identity')).toContainText('知行合一');
  98  |     await expect(root.locator('.nv5-group-title')).toContainText('小组汇报：从概念到真实应用');
  99  |     await expect(root.getByLabel('当前小组得分')).toContainText('—');
  100 |     const color = await row.locator('.nv5-score').evaluate(el => getComputedStyle(el).color);
> 101 |     const [r, g, b] = color.match(/\d+/g)!.map(Number); expect(Math.max(r!, g!, b!) - Math.min(r!, g!, b!)).toBeLessThanOrEqual(8);
      |                                                                                                             ^ Error: expect(received).toBeLessThanOrEqual(expected)
  102 |     await region(root, 'queue').getByRole('button', { name: '隐藏小组列表', exact: true }).click();
  103 |     await restore(root, 'queue').click(); await expect(row).toHaveAttribute('aria-pressed', 'true');
  104 |     await expect(root.getByRole('textbox', { name: '搜索小组', exact: true })).toHaveValue('知行');
  105 |   });
  106 |   test('context boundary moves closer while keyboard, pointer resizing and temporary restoration retain the selected object', async ({ page }) => {
  107 |     const root = await open(page), splitter = root.getByRole('separator', { name: '调整课堂功能宽度', exact: true });
  108 |     const nav = region(root, 'context').getByRole('navigation', { name: '课堂功能', exact: true });
  109 |     const last = await shape(nav.locator('.rain-navigation-family__entry').first()), boundary = await shape(splitter);
  110 |     expect(boundary.x - (last.x + last.width)).toBeLessThanOrEqual(8);
  111 |     const original = Number(await splitter.getAttribute('aria-valuenow'));
  112 |     await splitter.focus(); await page.keyboard.press('ArrowRight'); expect(Number(await splitter.getAttribute('aria-valuenow'))).toBeGreaterThan(original);
  113 |     const box = await shape(splitter); await page.mouse.move(box.x + box.width / 2, box.y + 80); await page.mouse.down(); await page.mouse.move(box.x + 28, box.y + 80, { steps: 8 }); await page.mouse.up();
  114 |     expect(Number(await splitter.getAttribute('aria-valuenow'))).toBeGreaterThan(original + 10);
  115 |     await region(root, 'context').getByRole('button', { name: '隐藏课堂功能', exact: true }).click(); await expect(region(root, 'context')).toBeHidden();
  116 |     await restore(root, 'context').click(); await expect(region(root, 'context')).toBeVisible();
  117 |     await expect(root.getByRole('heading', { name: '第一小分队', exact: true })).toBeVisible();
  118 |   });
  119 |   test('platform brand and footer keep sensible alignment in compact and expanded modes', async ({ page }) => {
  120 |     const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  121 |     const root = await open(page), footer = root.locator('.nv5-platform-content>footer'), global = region(root, 'global');
  122 |     const compact = await footer.locator(':scope>*').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }));
  123 |     expect(compact).toHaveLength(3); expect(Math.max(...compact.map(r => r.x)) - Math.min(...compact.map(r => r.x))).toBeLessThanOrEqual(1);
  124 |     await global.getByRole('button', { name: '展开平台导航', exact: true }).click();
  125 |     await expect(global).toHaveAttribute('data-mode', 'expanded');
  126 |     const expanded = await footer.locator(':scope>*').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }));
  127 |     expect(Math.max(...expanded.map(r => r.y)) - Math.min(...expanded.map(r => r.y))).toBeLessThanOrEqual(1);
  128 |     const brand = await shape(root.locator('.nv5-brand')), platform = await shape(global);
  129 |     expect(brand.x - platform.x).toBeLessThanOrEqual(20);
  130 |     await expect(root.locator('.nv5-platform-content>footer [data-rain-id="ui-avatar"] .rain-avatar__picture')).toBeVisible();
  131 |     expect(errors).toEqual([]);
  132 |   });
  133 | });
  134 | 
```