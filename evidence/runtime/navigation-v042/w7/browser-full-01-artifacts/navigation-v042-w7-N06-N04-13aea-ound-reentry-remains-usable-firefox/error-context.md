# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w7.spec.ts >> N06 N04 hover bridges the entry and panel, Escape suppresses rebound, reentry remains usable
- Location: tests/e2e/navigation-v042-w7.spec.ts:133:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('candidate-canvas').locator('.rain-workspace').first().locator('.rain-workspace__region[data-region-id="context"]')
Expected: "true"
Received: "false"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for getByTestId('candidate-canvas').locator('.rain-workspace').first().locator('.rain-workspace__region[data-region-id="context"]')
    13 × locator resolved to <div inert="" hidden="" aria-label="工作区" data-side="start" data-mode="hidden" data-forced="false" data-temporary="false" data-region-id="context" id="_r_2_-workspace-context" class="rain-workspace__region nv5-document-context">…</div>
       - unexpected value "false"

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
  - paragraph: W3–W5 人工视觉已通过 含 R3 补充调整
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
  - checkbox "深色外框"
  - text: 深色外框
  - link "打开认可原稿 ↗":
    - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#S3
  - button "展开平台导航"
  - button "显示工作区"
  - button "隐藏内部目录" [expanded]
  - button "隐藏编辑工具" [expanded]
  - strong: 课程教学协作空间
  - text: 学习反馈 / 反馈表单
  - button "专注内容"
  - button "布局设置": 布局
  - button "展开平台导航"
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
  - button "当前账户：林老师"
  - button "通知"
  - button "帮助"
  - strong: 课程教学协作空间
  - text: / 学习反馈 教学协作 / 2026 秋季学期 · 演示空间
  - button "分享"
  - button "更多工作区操作"
  - strong: 内部目录
  - button "取消固定内部目录"
  - button "隐藏内部目录"
  - text: 工作区内部
  - navigation "工作区页面":
    - list:
      - listitem:
        - link "课程任务":
          - /url: "#navigation-v042"
      - listitem:
        - link "学习反馈":
          - /url: "#navigation-v042"
      - listitem:
        - link "教研周报":
          - /url: "#navigation-v042"
      - listitem:
        - link "资源素材":
          - /url: "#navigation-v042"
  - heading "扩展内容" [level=5]
  - navigation "工作区扩展页面":
    - list:
      - listitem:
        - link "课程介绍":
          - /url: "#navigation-v042"
      - listitem:
        - link "参考资料":
          - /url: "#navigation-v042"
  - button "+ 新建页面"
  - separator "调整内部目录宽度"
  - tablist "页面内容视图":
    - tab "表格"
    - tab "状态分组"
    - tab "画册"
    - tab "反馈表单" [selected]
  - tabpanel "反馈表单":
    - radiogroup "反馈表单模式":
      - text: 反馈表单模式
      - radio "编辑表单" [checked]
      - text: 编辑表单
      - radio "填写预览"
      - text: 填写预览
    - button "筛选视图"
    - button "链接选项"
    - button "视图设置"
    - strong: 编辑工具
    - button "取消固定编辑工具"
    - button "隐藏编辑工具"
    - heading "表单内容" [level=4]
    - text: 课程信息 学习体验 建议与反馈
    - separator
    - heading "新增题目" [level=4]
    - button "新增文本题": 文本
    - button "新增单选题": 单选
    - button "新增评分题": 评分
    - button "新增附件题": 附件
    - paragraph: 新增内容只影响当前表单示例。
    - separator "调整编辑工具宽度"
    - text: COURSE FEEDBACK / 2026
    - heading "课程学习反馈" [level=2]
    - paragraph: 让每一次反馈，帮助我们一起改进课堂。 本地示例，反馈不会发送给教师。
    - text: 你正在学习的课程 *
    - textbox "课程名称":
      - /placeholder: 请输入课程名称
      - text: 高等数学 A
    - radiogroup "本阶段课程内容的理解程度":
      - text: 本阶段课程内容的理解程度
      - radio "能够理解并独立应用"
      - text: 能够理解并独立应用
      - radio "基本理解，需要更多练习" [checked]
      - text: 基本理解，需要更多练习
      - radio "希望获得进一步的讲解"
      - text: 希望获得进一步的讲解
    - text: 你希望补充哪些内容？
    - textbox "你希望我们改进的地方":
      - /placeholder: 写下你的具体建议…
    - button "本地保存示例"
  - text: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  50  |         await expect.poll(expanded).toBe(mode === 'expanded');
  51  |         expect((await shape(rail)).width).toBe(mode === 'expanded' ? 208 : 64);
  52  |         expect(await rail.evaluate(element => getComputedStyle(element).backgroundColor)).toBe(inverse ? 'rgb(37, 45, 67)' : 'rgb(232, 237, 248)');
  53  |         const links = rail.getByRole('link');
  54  |         expect(await links.count()).toBeGreaterThan(0);
  55  |         for (const link of await links.all()) {
  56  |           const glyph = link.locator('[data-rain-id="icon"]').first();
  57  |           const box = await shape(glyph);
  58  |           expect([box.width, box.height]).toEqual([18, 18]);
  59  |           if (mode === 'compact') {
  60  |             const row = await shape(link);
  61  |             expect(Math.abs(box.x + box.width / 2 - row.x - row.width / 2)).toBeLessThanOrEqual(1);
  62  |           }
  63  |         }
  64  |         const account = rail.getByRole('button', { name: '当前账户：林老师', exact: true });
  65  |         const notice = rail.getByRole('button', { name: '通知', exact: true });
  66  |         const help = rail.getByRole('button', { name: '帮助', exact: true });
  67  |         await expect(account.locator('[data-rain-id="ui-avatar"]')).toBeVisible();
  68  |         const a = await shape(account), n = await shape(notice), h = await shape(help);
  69  |         if (mode === 'expanded') {
  70  |           expect(a.x + a.width).toBeLessThanOrEqual(n.x + 1); expect(n.x + n.width).toBeLessThanOrEqual(h.x + 1);
  71  |           const toggle = await shape(rail.getByRole('button', { name: '收起平台导航', exact: true }));
  72  |           const brand = await shape(rail.locator('.nv42-brand,.nv43-brand,.nv5-brand,.nv44-brand').first());
  73  |           expect(toggle.x).toBeGreaterThan(brand.x);
  74  |           expect(toggle.x + toggle.width).toBeLessThanOrEqual((await shape(rail)).x + 208);
  75  |         }
  76  |         else { expect(n.y + n.height).toBeLessThanOrEqual(h.y + 1); expect(h.y + h.height).toBeLessThanOrEqual(a.y + 1); }
  77  |       }
  78  |     }
  79  |   });
  80  | }
  81  | 
  82  | test('N11 real wheel scroll in a constrained S2 host survives hide and restore', async ({ page }) => {
  83  |   const root = await open(page, 'S2');
  84  |   const pane = region(root, 'context');
  85  |   // Host sizing is a test fixture only; the user path and saved scroll state remain real.
  86  |   await page.addStyleTag({ content: '.nv43-workspace .rain-workspace__region[data-region-id="context"]{height:160px!important;min-height:0!important;overflow:auto!important}' });
  87  |   await pane.hover();
  88  |   await page.mouse.wheel(0, 260);
  89  |   await expect.poll(() => pane.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  90  |   const before = await pane.evaluate(element => element.scrollTop);
  91  |   const selected = await pane.getByRole('treeitem', { selected: true }).getAttribute('id');
  92  |   expect(selected).toBeTruthy();
  93  |   await restore(root, 'context').click();
  94  |   await expect(pane).toBeHidden();
  95  |   await restore(root, 'context').click();
  96  |   await expect(pane).toBeVisible();
  97  |   expect(await pane.evaluate(element => element.scrollTop)).toBe(before);
  98  |   expect(await pane.getByRole('treeitem', { selected: true }).getAttribute('id')).toBe(selected);
  99  | });
  100 | 
  101 | test('N15 A2 selected and hovered queue rows retain a shared zero-gap boundary', async ({ page }) => {
  102 |   await open(page, 'A2');
  103 |   const queue = page.getByTestId('candidate-A2').getByRole('group', { name: '当前学生队列' });
  104 |   const entries = queue.locator('[data-slot="entry"]');
  105 |   for (const index of [0, 1, 2]) {
  106 |     await entries.nth(index).click();
  107 |     await entries.nth((index + 1) % await entries.count()).hover();
  108 |     const rows = await queue.locator('.rain-navigation-family__row').evaluateAll(elements => elements.map(element => { const rect = element.getBoundingClientRect(); return { top: rect.top, bottom: rect.bottom, height: rect.height }; }));
  109 |     rows.forEach(row => expect(row.height).toBe(76));
  110 |     rows.slice(1).forEach((row, rowIndex) => expect(row.top).toBe(rows[rowIndex]!.bottom));
  111 |   }
  112 | });
  113 | 
  114 | for (const sample of ['R2', 'R4', 'S3', 'S5']) test(`N20 N24 ${sample} accepted pale splitter retains pointer and keyboard targets`, async ({ page }) => {
  115 |   const root = await open(page, sample, 1200);
  116 |   const splitter = root.locator('.rain-workspace__splitter:not([hidden])').first();
  117 |   await splitter.scrollIntoViewIfNeeded();
  118 |   const paint = () => splitter.evaluate(element => ({ line: getComputedStyle(element, '::before').opacity, handle: getComputedStyle(element, '::after').opacity, width: element.getBoundingClientRect().width, value: Number(element.getAttribute('aria-valuenow')) }));
  119 |   await page.mouse.move(1790, 1090);
  120 |   const before = await paint();
  121 |   expect(before.line).toBe('0.4'); expect(before.handle).toBe('0'); expect(before.width).toBeGreaterThanOrEqual(5);
  122 |   await splitter.hover(); expect((await paint()).line).toBe('1');
  123 |   const box = await splitter.boundingBox();
  124 |   await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  125 |   await page.mouse.down(); await page.mouse.move(box!.x + box!.width / 2 + 18, box!.y + box!.height / 2, { steps: 3 }); await page.mouse.up();
  126 |   await splitter.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
  127 |   await expect(splitter).toBeFocused(); expect((await paint()).line).toBe('1');
  128 |   const width = (await paint()).value;
  129 |   await page.keyboard.press('ArrowRight');
  130 |   expect((await paint()).value).not.toBe(width);
  131 | });
  132 | 
  133 | test('N06 N04 hover bridges the entry and panel, Escape suppresses rebound, reentry remains usable', async ({ page }) => {
  134 |   const root = await open(page, 'S3');
  135 |   await setHover(page, root);
  136 |   const entry = restore(root, 'context'), pane = region(root, 'context');
  137 |   const content = root.locator('.nv5-document-views');
  138 |   const before = await shape(content);
  139 |   await entry.hover();
  140 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
  141 |   expect(await shape(content)).toEqual(before);
  142 |   await pane.getByRole('textbox', { name: '搜索工作区' }).hover();
  143 |   await expect(pane).toBeVisible();
  144 |   await page.keyboard.press('Escape');
  145 |   await expect(pane).toBeHidden();
  146 |   await page.waitForTimeout(500); // Exceeds the documented 240ms open / 360ms close timers.
  147 |   await expect(pane).toBeHidden();
  148 |   await root.locator('.nv44-identity').hover();
  149 |   await entry.hover();
> 150 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
      |                      ^ Error: expect(locator).toHaveAttribute(expected) failed
  151 | });
  152 | 
  153 | test('N07 queued hover cannot open a panel after switching S3 to S6', async ({ page }) => {
  154 |   const root = await open(page, 'S3');
  155 |   await setHover(page, root);
  156 |   await restore(root, 'context').hover();
  157 |   await page.getByRole('navigation', { name: '导航候选样本' }).getByRole('button', { name: 'S6', exact: true }).click();
  158 |   const replay = page.locator('[data-recipe-id="recipe-navigation-r5"]');
  159 |   await expect(replay).toBeVisible();
  160 |   await page.waitForTimeout(600);
  161 |   await expect(replay.locator('[data-temporary="true"]')).toHaveCount(0);
  162 |   await expect(replay).toHaveAttribute('data-focused', 'false');
  163 | });
  164 | 
  165 | test('N18 inverse temporary platform retains the account, native links, focus and close recovery', async ({ page }) => {
  166 |   const root = await open(page, 'S3');
  167 |   await page.getByRole('checkbox', { name: '深色外框', exact: true }).check();
  168 |   await restore(root, 'global').click();
  169 |   const pane = region(root, 'global');
  170 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
  171 |   await expect(pane).toHaveAttribute('data-rain-theme', 'dark');
  172 |   const account = pane.getByRole('button', { name: '当前账户：林老师', exact: true });
  173 |   await expect(account).toBeVisible();
  174 |   await pane.getByRole('link', { name: '课程', exact: true }).focus();
  175 |   await expect(pane.getByRole('link', { name: '课程', exact: true })).toBeFocused();
  176 |   const palette = await pane.evaluate(element => ({ background: getComputedStyle(element).backgroundColor, color: getComputedStyle(element).color }));
  177 |   expect(palette.background).not.toBe('rgb(255, 255, 255)');
  178 |   expect(palette.color).not.toBe(palette.background);
  179 |   await page.keyboard.press('Escape');
  180 |   await expect(pane).not.toHaveAttribute('data-temporary', 'true');
  181 |   await expect(restore(root, 'global')).toBeFocused();
  182 | });
  183 | 
  184 | test('N19 searchable scope owns one visible focus ring and no inner input outline', async ({ page }) => {
  185 |   const root = await open(page, 'R2');
  186 |   await root.getByRole('button', { name: '更多班级', exact: true }).click();
  187 |   const input = page.getByRole('textbox', { name: '搜索范围', exact: true });
  188 |   await expect(input).toBeFocused();
  189 |   const facts = await input.evaluate(element => {
  190 |     const parent = element.closest('[data-rain-id="ui-input"]') ?? element.parentElement!;
  191 |     const inner = getComputedStyle(element), outer = getComputedStyle(parent);
  192 |     return { innerOutline: inner.outlineStyle, innerShadow: inner.boxShadow, outerShadow: outer.boxShadow, outerOutline: outer.outlineStyle };
  193 |   });
  194 |   expect(facts.innerOutline).toBe('none');
  195 |   expect(facts.innerShadow).toBe('none');
  196 |   expect(facts.outerShadow !== 'none' || facts.outerOutline !== 'none').toBe(true);
  197 |   await page.keyboard.press('Escape');
  198 |   await expect(root.getByRole('button', { name: '更多班级', exact: true })).toBeFocused();
  199 | });
  200 | 
  201 | test('N19 S3 temporary context search retains its single shared Input focus ring', async ({ page }) => {
  202 |   const root = await open(page, 'S3');
  203 |   await restore(root, 'context').click();
  204 |   const input = region(root, 'context').getByRole('textbox', { name: '搜索工作区', exact: true });
  205 |   await input.focus();
  206 |   await expect(input).toBeFocused();
  207 |   const styles = await input.evaluate(element => {
  208 |     const inner = getComputedStyle(element), outer = getComputedStyle(element.closest('[data-rain-id="ui-input"]')!);
  209 |     return { innerOutline: inner.outlineStyle, innerShadow: inner.boxShadow, outerOutline: outer.outlineStyle, outerShadow: outer.boxShadow };
  210 |   });
  211 |   expect(styles.innerOutline).toBe('none'); expect(styles.innerShadow).toBe('none');
  212 |   expect(styles.outerOutline !== 'none' || styles.outerShadow !== 'none').toBe(true);
  213 | });
  214 | 
  215 | test('N14 connected geometry remains finite after first middle last selection, resize and region recovery', async ({ page }) => {
  216 |   const root = await open(page, 'R2');
  217 |   const scope = root.locator('[data-rain-id="ui-scope-navigation"]');
  218 |   for (const label of ['公共资源包', '2026 秋 · 高等数学 1 班', '2026 秋 · 创新实验班']) {
  219 |     await scope.getByRole('tab', { name: label, exact: true }).click();
  220 |     await expect(scope.getByRole('tab', { name: label, exact: true })).toHaveAttribute('aria-selected', 'true');
  221 |     const paths = await scope.locator('svg path').evaluateAll(elements => elements.map(element => element.getAttribute('d')));
  222 |     expect(paths.length).toBeGreaterThan(0);
  223 |     expect(paths.every(path => Boolean(path) && !/NaN|Infinity|undefined/.test(path!))).toBe(true);
  224 |   }
  225 |   for (const width of [1200, 1600, 1440]) await page.getByRole('combobox', { name: '画板宽度' }).selectOption(String(width));
  226 |   await root.locator('.nv42-workspace-bar').getByRole('button', { name: '隐藏课程导航', exact: true }).click();
  227 |   await root.getByRole('button', { name: '恢复课程导航', exact: true }).click();
  228 |   await expect(scope.getByRole('tab', { name: '2026 秋 · 创新实验班', exact: true })).toHaveAttribute('aria-selected', 'true');
  229 |   expect(await scope.locator('svg path').evaluateAll(elements => elements.every(element => !/NaN|Infinity/.test(element.getAttribute('d') ?? '')))).toBe(true);
  230 | });
  231 | 
  232 | for (const width of [1200, 1440, 1600]) test(`N21 N23 W7 matrix scope caps and search 200 classes at ${width}`, async ({ page }) => {
  233 |   const root = await open(page, 'R2', width);
  234 |   const scope = root.locator('[data-rain-id="ui-scope-navigation"]');
  235 |   for (const cap of [3, 4, 5]) {
  236 |     await page.getByRole('combobox', { name: '可见范围' }).selectOption(String(cap));
  237 |     const tabs = scope.getByRole('tab');
  238 |     expect(await tabs.count()).toBeLessThanOrEqual(cap);
  239 |     await expect(tabs.first()).toHaveAccessibleName('公共资源包');
  240 |     await root.getByRole('button', { name: '更多班级', exact: true }).click();
  241 |     await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('高等数学 200 班');
  242 |     await page.getByRole('button', { name: /^2026 秋 · 高等数学 200 班/ }).click();
  243 |     await expect(tabs.last()).toHaveAccessibleName('2026 秋 · 高等数学 200 班');
  244 |     await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');
  245 |     await expect(tabs.first()).toHaveAccessibleName('公共资源包');
  246 |   }
  247 | });
  248 | 
  249 | for (const sample of ['R4', 'S4']) for (const width of [1200, 1440, 1600]) test(`N12 N28 W7 matrix ${sample} grading theme retains draft and input identity at ${width}`, async ({ page }) => {
  250 |   const root = await open(page, sample, width);
```