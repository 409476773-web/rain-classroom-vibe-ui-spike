# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-r4-feedback.spec.ts >> R4 feedback contracts >> platform brand and footer keep sensible alignment in compact and expanded modes
- Location: tests/e2e/navigation-v042-r4-feedback.spec.ts:129:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rgb(235, 239, 255)"
Received: "rgb(255, 255, 255)"
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
        - option "1200" [selected]
        - option "1440"
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
      - button "关闭临时平台导航" [expanded] [ref=e47] [cursor=pointer]:
        - generic [ref=e49]: 平台导航
      - button "隐藏课堂功能" [expanded] [ref=e50] [cursor=pointer]:
        - generic [ref=e52]: 课堂功能
      - button "隐藏小组列表" [expanded] [ref=e53] [cursor=pointer]:
        - generic [ref=e55]: 小组列表
      - generic [ref=e57]:
        - strong [ref=e58]: 辩论赛：大学校园是否应该免费开放
        - generic "第一小分队 · 智能汇报" [ref=e59]
      - button "布局" [ref=e60] [cursor=pointer]
      - button "专注内容" [ref=e62] [cursor=pointer]
    - status [ref=e64]: 为保留主内容空间，平台导航暂时采用紧凑／按需显示。你的展开偏好未被覆盖。
    - generic [ref=e66]:
      - generic "平台导航" [ref=e68]:
        - generic [ref=e69]:
          - generic [ref=e70]:
            - strong [ref=e73]: 雨课堂
            - button "关闭临时平台导航" [expanded] [active] [ref=e74] [cursor=pointer]
          - navigation "平台功能" [ref=e76]:
            - list [ref=e77]:
              - listitem [ref=e78]:
                - link "工作台" [ref=e80] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e85]:
                - link "课程" [ref=e87] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e92]:
                - link "资源" [ref=e94] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e99]:
                - link "专业" [ref=e101] [cursor=pointer]:
                  - /url: "#navigation-v042"
          - generic [ref=e106]:
            - button "通知" [ref=e107] [cursor=pointer]
            - button "帮助" [ref=e110] [cursor=pointer]
            - button "当前账户：林老师" [ref=e113] [cursor=pointer]
        - status [ref=e115]: 空间不足，已保留展开偏好，可临时查看
      - generic [ref=e116]:
        - generic [ref=e117]:
          - strong [ref=e118]: 大学物理 · 第九章课堂回顾
          - generic [ref=e119]: 2026-09-24 11:21
          - button "导出数据" [ref=e120] [cursor=pointer]
        - generic [ref=e124]:
          - generic "课堂功能" [ref=e126]:
            - generic [ref=e127]:
              - strong [ref=e128]: 课堂功能
              - button "取消固定课堂功能" [ref=e129] [cursor=pointer]
              - button "隐藏课堂功能" [ref=e132] [cursor=pointer]
            - heading "课堂数据" [level=4] [ref=e135]
            - navigation "课堂功能" [ref=e136]:
              - list [ref=e137]:
                - listitem [ref=e138]:
                  - link "综合数据" [ref=e140] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e145]:
                  - link "学生表现" [ref=e147] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e152]:
                  - link "课堂习题" [ref=e154] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e159]:
                  - link "课堂互动" [ref=e161] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e166]:
                  - link "教学内容" [ref=e168] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - generic [ref=e173]: 课堂范围内的功能导航
          - separator "调整课堂功能宽度" [ref=e174]
          - main [ref=e175]:
            - generic [ref=e176]:
              - generic "分区导航" [ref=e177]:
                - tablist "课堂互动内容" [ref=e181]:
                  - tab "投稿" [ref=e182] [cursor=pointer]
                  - tab "随机点名" [ref=e186] [cursor=pointer]
                  - tab "分组讨论" [ref=e190] [cursor=pointer]
                  - tab "智能汇报" [selected] [ref=e194] [cursor=pointer]
              - tabpanel "智能汇报" [ref=e199]:
                - generic [ref=e200]:
                  - group "课堂活动" [ref=e201]:
                    - list [ref=e202]:
                      - listitem [ref=e203]:
                        - button "辩论赛：大学校园是否应该免费开放" [pressed] [ref=e205] [cursor=pointer]:
                          - generic [ref=e206]:
                            - generic [ref=e207]: 辩论赛：大学校园是否应该免费开放
                            - generic [ref=e208]:
                              - generic [ref=e209]: "6"
                              - text: 组已完成
                              - generic [ref=e210]: ·
                              - text: 21 分钟
                            - progressbar "辩论赛：大学校园是否应该免费开放完成进度" [ref=e211]:
                              - generic [ref=e213]: 完成 75%
                      - listitem [ref=e214]:
                        - button "小组汇报：从概念到真实应用" [ref=e216] [cursor=pointer]:
                          - generic [ref=e217]:
                            - generic [ref=e218]: 小组汇报：从概念到真实应用
                            - generic [ref=e219]:
                              - generic [ref=e220]: "8"
                              - text: 组已完成
                              - generic [ref=e221]: ·
                              - text: 36 分钟
                            - progressbar "小组汇报：从概念到真实应用完成进度" [ref=e222]:
                              - generic [ref=e224]: 完成 100%
                  - generic [ref=e225]:
                    - generic "小组列表" [ref=e227]:
                      - generic [ref=e228]:
                        - strong [ref=e229]: 小组列表
                        - button "取消固定小组列表" [ref=e230] [cursor=pointer]
                        - button "隐藏小组列表" [ref=e233] [cursor=pointer]
                      - generic [ref=e236]:
                        - generic [ref=e237]:
                          - radiogroup "小组提交状态" [ref=e239]:
                            - generic [ref=e241]:
                              - generic [ref=e242] [cursor=pointer]:
                                - radio "全部" [checked] [ref=e243]
                                - generic [ref=e244]: 全部
                              - generic [ref=e245] [cursor=pointer]:
                                - radio "已提交" [ref=e246]
                                - generic [ref=e247]: 已提交
                              - generic [ref=e248] [cursor=pointer]:
                                - radio "未评分" [ref=e249]
                                - generic [ref=e250]: 未评分
                          - generic [ref=e251]: 6 组
                        - textbox "搜索小组" [ref=e255]:
                          - /placeholder: 搜索小组名称
                      - group "小组结果" [ref=e257]:
                        - list [ref=e258]:
                          - listitem [ref=e259]:
                            - button "第一小分队" [pressed] [ref=e261] [cursor=pointer]:
                              - generic [ref=e262]:
                                - generic [ref=e263]: 第一小分队
                                - generic [ref=e264]: 已提交 · 思维碰撞
                                - group "第一小分队成员" [ref=e267]:
                                  - img "林可" [ref=e269]
                                  - img "王思齐" [ref=e271]
                                  - img "陈宁" [ref=e273]
                                  - img "周晓" [ref=e275]
                              - generic [ref=e276]: "9.0"
                          - listitem [ref=e277]:
                            - button "探索者小组" [ref=e279] [cursor=pointer]:
                              - generic [ref=e280]:
                                - generic [ref=e281]: 探索者小组
                                - generic [ref=e282]: 已提交 · 论据充分
                                - group "探索者小组成员" [ref=e285]:
                                  - img "林可" [ref=e287]
                                  - img "王思齐" [ref=e289]
                                  - img "陈宁" [ref=e291]
                                  - img "周晓" [ref=e293]
                              - generic [ref=e294]: "8.5"
                          - listitem [ref=e295]:
                            - button "向量研究组" [ref=e297] [cursor=pointer]:
                              - generic [ref=e298]:
                                - generic [ref=e299]: 向量研究组
                                - generic [ref=e300]: 已提交 · 观点清晰
                                - group "向量研究组成员" [ref=e303]:
                                  - img "林可" [ref=e305]
                                  - img "王思齐" [ref=e307]
                                  - img "陈宁" [ref=e309]
                                  - img "周晓" [ref=e311]
                              - generic [ref=e312]: "9.5"
                          - listitem [ref=e313]:
                            - button "第四学习小组" [ref=e315] [cursor=pointer]:
                              - generic [ref=e316]:
                                - generic [ref=e317]: 第四学习小组
                                - generic [ref=e318]: 已提交 · 积极参与
                                - group "第四学习小组成员" [ref=e321]:
                                  - img "林可" [ref=e323]
                                  - img "王思齐" [ref=e325]
                                  - img "陈宁" [ref=e327]
                                  - img "周晓" [ref=e329]
                              - generic [ref=e330]: "8.0"
                          - listitem [ref=e331]:
                            - button "知行合一" [ref=e333] [cursor=pointer]:
                              - generic [ref=e334]:
                                - generic [ref=e335]: 知行合一
                                - generic [ref=e336]: 未评分 · 待教师反馈
                                - group "知行合一成员" [ref=e339]:
                                  - img "林可" [ref=e341]
                                  - img "王思齐" [ref=e343]
                                  - img "陈宁" [ref=e345]
                                  - img "周晓" [ref=e347]
                              - generic [ref=e348]: —
                          - listitem [ref=e349]:
                            - button "未进组" [ref=e351] [cursor=pointer]:
                              - generic [ref=e352]:
                                - generic [ref=e353]: 未进组
                                - generic [ref=e354]: 未评分 · 待教师反馈
                                - group "未进组成员" [ref=e357]:
                                  - img "林可" [ref=e359]
                                  - img "王思齐" [ref=e361]
                                  - img "陈宁" [ref=e363]
                                  - img "周晓" [ref=e365]
                              - generic [ref=e366]: —
                      - generic [ref=e367]: 展示 6 组演示对象 · 选择后结果同步更新
                    - separator "调整小组列表宽度" [ref=e368]
                    - article [ref=e369]:
                      - generic [ref=e370]:
                        - img "第一小分队成员" [ref=e371]
                        - generic [ref=e383]:
                          - heading "第一小分队" [level=3] [ref=e384]
                          - paragraph [ref=e385]: 辩论赛：大学校园是否应该免费开放 · 已提交
                        - generic "当前小组得分" [ref=e386]: 9.0 / 10
                      - generic [ref=e387]:
                        - heading "讨论摘要 示例" [level=4] [ref=e388]:
                          - text: 讨论摘要
                          - generic [ref=e390]: 示例
                        - paragraph [ref=e393]: 我们认为校园开放需要兼顾公共资源共享与教学秩序。建议采取分区、分时段预约，让社会公众更有序地使用校园资源。
                        - generic [ref=e394]:
                          - generic [ref=e395]: 思维碰撞
                          - generic [ref=e398]: 观点组织
                      - generic [ref=e401]:
                        - heading "最终结论" [level=4] [ref=e402]
                        - paragraph [ref=e403]: 我们认为校园开放需要兼顾公共资源共享与教学秩序。建议采取分区、分时段预约，让社会公众更有序地使用校园资源。
                      - heading "讨论过程 3 条示例" [level=4] [ref=e404]
                      - generic [ref=e405]:
                        - generic [ref=e409]:
                          - generic [ref=e410]:
                            - generic [ref=e411]: 林可
                            - generic [ref=e412]: 11:32
                          - paragraph [ref=e413]: 我们先把问题分为几个独立的方面，再分别寻找依据。
                        - generic [ref=e417]:
                          - generic [ref=e418]:
                            - generic [ref=e419]: 陈宁
                            - generic [ref=e420]: 11:35
                          - paragraph [ref=e421]: 这份结论需要明确实施条件与适用的边界。
                        - generic [ref=e425]:
                          - generic [ref=e426]:
                            - generic [ref=e427]: 周晓
                            - generic [ref=e428]: 11:38
                          - paragraph [ref=e429]: 可以将上述分析整理为可执行的方案，再与其他组比较。
  - generic [ref=e430]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  39  | };
  40  | 
  41  | test('capture immutable R4 feedback snapshots', async ({ page }) => {
  42  |   test.setTimeout(120000);
  43  |   test.skip(!capture, 'Evidence capture is a separate operation from contract verification.');
  44  |   const dir = resolve(evidence, capture!); mkdirSync(dir, { recursive: true });
  45  |   const results: Record<string, unknown> = {}; const errors: string[] = [];
  46  |   page.on('pageerror', error => errors.push(error.message));
  47  |   for (const width of [1200, 1440, 1600]) {
  48  |     const root = await open(page, width);
  49  |     for (const mode of ['compact', 'expanded', 'ungraded']) {
  50  |       if (mode === 'expanded') await region(root, 'global').getByRole('button', { name: '展开平台导航', exact: true }).click();
  51  |       if (mode === 'ungraded') await root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '知行合一', exact: true }).click();
  52  |       await settle(page);
  53  |       const key = `R4-interaction-${width}-${mode}`;
  54  |       results[key] = await metrics(root);
  55  |       await root.screenshot({ path: resolve(dir, `${key}.png`) });
  56  |       writeFileSync(resolve(dir, 'measurements.json'), JSON.stringify({ createdAt: new Date().toISOString(), phase: capture, scope: 'R4 interaction, DPR1 Chromium; approved HTML remains historical baseline', pageErrors: errors, cases: results }, null, 2));
  57  |     }
  58  |   }
  59  |   writeFileSync(resolve(dir, 'measurements.json'), JSON.stringify({ createdAt: new Date().toISOString(), phase: capture, scope: 'R4 interaction, DPR1 Chromium; approved HTML remains historical baseline', pageErrors: errors, cases: results }, null, 2));
  60  |   expect(errors).toEqual([]);
  61  | });
  62  | 
  63  | test.describe('R4 feedback contracts', () => {
  64  |   test.skip(Boolean(capture), 'Contract assertions run separately from immutable before/after capture.');
  65  |   test('existing AvatarGroup portraits remain visible and do not nest actions inside group selectors', async ({ page }) => {
  66  |     const root = await open(page), row = root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '第一小分队', exact: true });
  67  |     const avatars = row.locator('[data-rain-id="ui-avatar-group"] [data-rain-id="ui-avatar"]');
  68  |     await expect(avatars).toHaveCount(4);
  69  |     await settle(page);
  70  |     for (const avatar of await avatars.all()) {
  71  |       const portrait = avatar.locator('img[data-slot="portrait"]');
  72  |       await expect(portrait).toBeVisible();
  73  |       expect(await portrait.evaluate(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0)).toBe(true);
  74  |     }
  75  |     expect(await root.locator('button button').count()).toBe(0);
  76  |   });
  77  |   test('compact activity cards reserve more room for details across every supported canvas width', async ({ page }) => {
  78  |     const before = JSON.parse(readFileSync(resolve(evidence, 'before-v2/measurements.json'), 'utf8'));
  79  |     for (const width of [1200, 1440, 1600]) {
  80  |       const root = await open(page, width), now = await metrics(root), prior = before.cases[`R4-interaction-${width}-compact`];
  81  |       expect(now.recovery?.height).toBe(56); expect(now.module?.height).toBe(44);
  82  |       expect(now.activityTrack?.padding).toBe('12px');
  83  |       expect(now.activityTrack!.height).toBeLessThan(prior.activityTrack.height);
  84  |       expect(now.queueHead!.height).toBeLessThan(prior.queueHead.height);
  85  |       expect(now.queueList!.height).toBeGreaterThan(prior.queueList.height);
  86  |       for (const card of now.activities) expect(card.height).toBeLessThan(prior.activities[0].height);
  87  |       expect(now.progress?.height).toBe(4); expect(now.activityMetadata?.gap).toBe('4px');
  88  |       expect(now.activityTrack?.background).toBe(await tokenColor(root, '--rain-category-background-neutral-2'));
  89  |       const progress = root.locator('.nv5-activities [role="progressbar"]').first();
  90  |       expect(await progress.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-neutral-solid-3'));
  91  |       expect(await root.locator('.nv5-activities [data-active="true"] [data-slot="progress-fill"]').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-brand-solid-3'));
  92  |       expect(await root.locator('.nv5-activities [data-active="false"] [data-slot="progress-fill"]').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-neutral-solid-1'));
  93  |       expect(now.queueRegionHead?.height).toBe(36); expect(now.groupLabel?.fontSize).toBe('14px');
  94  |       expect(now.detailTitle?.fontSize).toBe('16px'); expect(now.detailTitle?.height).toBe(22);
  95  |       expect(now.contextFooter?.fontSize).toBe('12px');
  96  |       for (const pane of now.horizontalRegions) expect(pane.scrollWidth).toBeLessThanOrEqual(pane.clientWidth + 1);
  97  |     }
  98  |   });
  99  |   test('group filter, search and activity selection preserve identity and grey ungraded scores', async ({ page }) => {
  100 |     const root = await open(page);
  101 |     await root.getByRole('group', { name: '课堂活动', exact: true }).getByRole('button', { name: '小组汇报：从概念到真实应用', exact: true }).click();
  102 |     await root.getByRole('radio', { name: '未评分', exact: true }).locator('..').click();
  103 |     await root.getByRole('textbox', { name: '搜索小组', exact: true }).fill('知行');
  104 |     const row = root.getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '知行合一', exact: true });
  105 |     await row.click();
  106 |     await expect(root.getByRole('heading', { name: '知行合一', exact: true })).toBeVisible();
  107 |     await expect(root.locator('.nv5-recovery-identity')).toContainText('知行合一');
  108 |     await expect(root.locator('.nv5-group-title')).toContainText('小组汇报：从概念到真实应用');
  109 |     await expect(root.getByLabel('当前小组得分')).toContainText('—');
  110 |     const color = await row.locator('.nv5-score').evaluate(el => getComputedStyle(el).color);
  111 |     expect(color).toBe(await tokenColor(root, '--rain-category-text-neutral-3'));
  112 |     await region(root, 'queue').getByRole('button', { name: '隐藏小组列表', exact: true }).click();
  113 |     await restore(root, 'queue').click(); await expect(row).toHaveAttribute('aria-pressed', 'true');
  114 |     await expect(root.getByRole('textbox', { name: '搜索小组', exact: true })).toHaveValue('知行');
  115 |   });
  116 |   test('context boundary moves closer while keyboard, pointer resizing and temporary restoration retain the selected object', async ({ page }) => {
  117 |     const root = await open(page), splitter = root.getByRole('separator', { name: '调整课堂功能宽度', exact: true });
  118 |     const nav = region(root, 'context').getByRole('navigation', { name: '课堂功能', exact: true });
  119 |     const last = await shape(nav.locator('.rain-navigation-family__entry').first()), boundary = await shape(splitter);
  120 |     expect(boundary.x - (last.x + last.width)).toBeLessThanOrEqual(8);
  121 |     const original = Number(await splitter.getAttribute('aria-valuenow'));
  122 |     await splitter.focus(); await page.keyboard.press('ArrowRight'); expect(Number(await splitter.getAttribute('aria-valuenow'))).toBeGreaterThan(original);
  123 |     const box = await shape(splitter); await page.mouse.move(box.x + box.width / 2, box.y + 80); await page.mouse.down(); await page.mouse.move(box.x + 28, box.y + 80, { steps: 8 }); await page.mouse.up();
  124 |     expect(Number(await splitter.getAttribute('aria-valuenow'))).toBeGreaterThan(original + 10);
  125 |     await region(root, 'context').getByRole('button', { name: '隐藏课堂功能', exact: true }).click(); await expect(region(root, 'context')).toBeHidden();
  126 |     await restore(root, 'context').click(); await expect(region(root, 'context')).toBeVisible();
  127 |     await expect(root.getByRole('heading', { name: '第一小分队', exact: true })).toBeVisible();
  128 |   });
  129 |   test('platform brand and footer keep sensible alignment in compact and expanded modes', async ({ page }) => {
  130 |     const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  131 |     for (const width of [1200, 1440, 1600]) {
  132 |       const root = await open(page, width), footer = root.locator('.nv5-platform-content>footer'), global = region(root, 'global');
  133 |       const compact = await footer.locator(':scope>*').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }));
  134 |       expect(compact).toHaveLength(3); expect(Math.max(...compact.map(r => r.x)) - Math.min(...compact.map(r => r.x))).toBeLessThanOrEqual(1);
  135 |       await global.getByRole('button', { name: '展开平台导航', exact: true }).click();
  136 |       if (width === 1200) await expect(global).toHaveAttribute('data-temporary', 'true');
  137 |       else await expect(global).toHaveAttribute('data-mode', 'expanded');
  138 |       expect(await root.locator('.nv5-platform .rain-navigation-family__item[data-active="true"] .rain-navigation-family__row').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-fill-brand-solid-3'));
> 139 |       expect(await global.evaluate(el => getComputedStyle(el).backgroundColor)).toBe(await tokenColor(root, '--rain-category-background-neutral-4'));
      |                                                                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  140 |       const expanded = await footer.locator(':scope>*').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }));
  141 |       const brand = await shape(root.locator('.nv5-brand')), platform = await shape(global);
  142 |       expect(Math.max(...expanded.map(r => r.y)) - Math.min(...expanded.map(r => r.y))).toBeLessThanOrEqual(1);
  143 |       for (const control of expanded) { expect(control.width).toBe(32); expect(control.height).toBe(32); expect(control.x).toBeGreaterThanOrEqual(platform.x); expect(control.x + control.width).toBeLessThanOrEqual(platform.x + platform.width); }
  144 |       expect(brand.x - platform.x).toBeLessThanOrEqual(20);
  145 |       await expect(root.locator('.nv5-platform-content>footer [data-rain-id="ui-avatar"] .rain-avatar__picture')).toBeVisible();
  146 |     }
  147 |     expect(errors).toEqual([]);
  148 |   });
  149 | });
  150 | 
```