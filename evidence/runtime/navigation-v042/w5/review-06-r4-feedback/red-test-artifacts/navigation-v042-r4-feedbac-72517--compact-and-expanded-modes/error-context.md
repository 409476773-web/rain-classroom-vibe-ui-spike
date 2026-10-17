# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-r4-feedback.spec.ts >> R4 feedback contracts >> platform brand and footer keep sensible alignment in compact and expanded modes
- Location: tests/e2e/navigation-v042-r4-feedback.spec.ts:119:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('[data-recipe-id="recipe-navigation-r4"]').locator('.nv5-platform-content>footer [data-rain-id="ui-avatar"] .rain-avatar__picture')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-recipe-id="recipe-navigation-r4"]').locator('.nv5-platform-content>footer [data-rain-id="ui-avatar"] .rain-avatar__picture')
    14 × locator resolved to <span aria-hidden="true" class="rain-avatar__picture">…</span>
       - unexpected value "hidden"

```

```yaml
- main:
  - link "返回组件库":
    - /url: "#components"
  - heading "导航组件 · v0.4.2" [level=1]
  - link "R2 独立消费样本 ↗":
    - /url: /navigation-v042-consumer.html
  - link "W3 独立消费样本 ↗":
    - /url: /navigation-v042-w3-consumer.html
  - paragraph: A1 · A4 · R2 人工视觉已通过 W3–W5 组合建设 · G2 待评审
  - navigation "导航候选样本":
    - button "A1"
    - button "A2"
    - button "A3"
    - button "A4"
    - button "A5"
    - button "Contents"
    - button "White"
    - button "Connections"
    - button "R1"
    - button "R2"
    - button "R3"
    - button "R4"
    - button "R5"
    - button "R6"
    - button "S1"
    - button "S2"
    - button "S3"
    - button "S4"
    - button "S5"
    - button "S6"
  - text: 画板宽度
  - combobox "画板宽度":
    - option "1200"
    - option "1440" [selected]
    - option "1600"
  - text: 连接
  - combobox "连接":
    - option "内缩 inset" [selected]
    - option "贴边 merged"
  - text: 表面
  - combobox "表面":
    - option "中性底" [selected]
    - option "白底轮廓"
  - text: 可见范围
  - combobox "可见范围":
    - option "3"
    - option "4" [selected]
    - option "5"
  - text: 业务子场景
  - combobox "业务子场景":
    - option "课堂互动" [selected]
    - option "教师批改"
  - link "打开认可原稿 ↗":
    - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R4
  - button "收起平台导航" [expanded]: 平台导航
  - button "隐藏课堂功能" [expanded]: 课堂功能
  - button "隐藏小组列表" [expanded]: 小组列表
  - strong: 辩论赛：大学校园是否应该免费开放
  - text: 第一小分队 · 智能汇报
  - button "布局"
  - button "专注内容"
  - strong: 雨课堂
  - button "收起平台导航" [expanded]
  - navigation "平台功能":
    - list:
      - listitem:
        - link "工作台":
          - /url: "#navigation-v042"
      - listitem:
        - link "课程":
          - /url: "#navigation-v042"
      - listitem:
        - link "资源":
          - /url: "#navigation-v042"
      - listitem:
        - link "专业":
          - /url: "#navigation-v042"
  - button "通知"
  - button "帮助"
  - strong: 大学物理 · 第九章课堂回顾
  - text: 2026-09-24 11:21
  - button "导出数据"
  - strong: 课堂功能
  - button "取消固定课堂功能"
  - button "隐藏课堂功能"
  - heading "课堂数据" [level=4]
  - navigation "课堂功能":
    - list:
      - listitem:
        - link "综合数据":
          - /url: "#navigation-v042"
      - listitem:
        - link "学生表现":
          - /url: "#navigation-v042"
      - listitem:
        - link "课堂习题":
          - /url: "#navigation-v042"
      - listitem:
        - link "课堂互动":
          - /url: "#navigation-v042"
      - listitem:
        - link "教学内容":
          - /url: "#navigation-v042"
  - text: 课堂范围内的功能导航
  - separator "调整课堂功能宽度"
  - main:
    - tablist "课堂互动内容":
      - tab "投稿"
      - tab "随机点名"
      - tab "分组讨论"
      - tab "智能汇报" [selected]
    - tabpanel "智能汇报":
      - group "课堂活动":
        - list:
          - listitem:
            - button "辩论赛：大学校园是否应该免费开放" [pressed]:
              - text: 辩论赛：大学校园是否应该免费开放 6 组已完成 · 21 分钟
              - progressbar "辩论赛：大学校园是否应该免费开放完成进度": 完成 75%
          - listitem:
            - button "小组汇报：从概念到真实应用":
              - text: 小组汇报：从概念到真实应用 8 组已完成 · 36 分钟
              - progressbar "小组汇报：从概念到真实应用完成进度": 完成 100%
      - strong: 小组列表
      - button "取消固定小组列表"
      - button "隐藏小组列表"
      - heading "小组结果" [level=4]
      - text: 6 组
      - radiogroup "小组提交状态":
        - text: 小组提交状态
        - radio "全部" [checked]
        - text: 全部
        - radio "已提交"
        - text: 已提交
        - radio "未评分"
        - text: 未评分
      - textbox "搜索小组":
        - /placeholder: 搜索小组名称
      - group "小组结果":
        - list:
          - listitem:
            - button "第一小分队" [pressed]: 第一小分队 已提交 · 思维碰撞 9.0
          - listitem:
            - button "探索者小组": 探索者小组 已提交 · 论据充分 8.5
          - listitem:
            - button "向量研究组": 向量研究组 已提交 · 观点清晰 9.5
          - listitem:
            - button "第四学习小组": 第四学习小组 已提交 · 积极参与 8.0
          - listitem:
            - button "知行合一": 知行合一 未评分 · 待教师反馈 —
          - listitem:
            - button "未进组": 未进组 未评分 · 待教师反馈 —
      - text: 展示 6 组演示对象 · 选择后结果同步更新
      - separator "调整小组列表宽度"
      - article:
        - heading "第一小分队" [level=3]
        - paragraph: 辩论赛：大学校园是否应该免费开放 · 已提交
        - text: 9.0 / 10
        - heading "讨论摘要 示例" [level=4]
        - paragraph: 我们认为校园开放需要兼顾公共资源共享与教学秩序。建议采取分区、分时段预约，让社会公众更有序地使用校园资源。
        - text: 思维碰撞 观点组织
        - heading "最终结论" [level=4]
        - paragraph: 我们认为校园开放需要兼顾公共资源共享与教学秩序。建议采取分区、分时段预约，让社会公众更有序地使用校园资源。
        - heading "讨论过程 3 条示例" [level=4]
        - text: 林可 11:32
        - paragraph: 我们先把问题分为几个独立的方面，再分别寻找依据。
        - text: 陈宁 11:35
        - paragraph: 这份结论需要明确实施条件与适用的边界。
        - text: 周晓 11:38
        - paragraph: 可以将上述分析整理为可执行的方案，再与其他组比较。
  - text: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
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
  101 |     const [r, g, b] = color.match(/\d+/g)!.map(Number); expect(Math.max(r!, g!, b!) - Math.min(r!, g!, b!)).toBeLessThanOrEqual(8);
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
> 130 |     await expect(root.locator('.nv5-platform-content>footer [data-rain-id="ui-avatar"] .rain-avatar__picture')).toBeVisible();
      |                                                                                                                 ^ Error: expect(locator).toBeVisible() failed
  131 |     expect(errors).toEqual([]);
  132 |   });
  133 | });
  134 | 
```