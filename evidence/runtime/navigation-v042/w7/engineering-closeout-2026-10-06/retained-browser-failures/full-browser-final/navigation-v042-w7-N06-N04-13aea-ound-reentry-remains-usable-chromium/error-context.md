# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w7.spec.ts >> N06 N04 hover bridges the entry and panel, Escape suppresses rebound, reentry remains usable
- Location: tests/e2e/navigation-v042-w7.spec.ts:156:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "height": 688,
    "width": 1181,
-   "x": 74,
+   "x": 284,
    "y": 375.1875,
  }
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
        - button "关闭临时工作区" [expanded] [ref=e52] [cursor=pointer]:
          - generic [ref=e54]: 关闭工作区
        - button "隐藏内部目录" [expanded] [ref=e55] [cursor=pointer]
        - button "隐藏编辑工具" [expanded] [ref=e57] [cursor=pointer]
      - generic [ref=e60]:
        - strong [ref=e61]: 课程教学协作空间
        - generic [ref=e62]: 学习反馈 / 反馈表单
      - button "专注内容" [ref=e63] [cursor=pointer]
      - button "布局设置" [active] [ref=e67] [cursor=pointer]:
        - generic [ref=e69]: 布局
    - generic [ref=e70]:
      - generic "平台导航" [ref=e72]:
        - generic [ref=e73]:
          - button "展开平台导航" [ref=e77] [cursor=pointer]
          - navigation "平台功能" [ref=e79]:
            - list [ref=e80]:
              - listitem [ref=e81]:
                - link "工作台" [ref=e83] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e86]:
                - link "课程" [ref=e88] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e91]:
                - link "资源" [ref=e93] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e96]:
                - link "专业" [ref=e98] [cursor=pointer]:
                  - /url: "#navigation-v042"
          - generic [ref=e101]:
            - button "当前账户：林老师" [ref=e102] [cursor=pointer]
            - button "通知" [ref=e105] [cursor=pointer]
            - button "帮助" [ref=e108] [cursor=pointer]
      - generic "工作区" [ref=e111]:
        - generic [ref=e112]:
          - strong [ref=e113]: 工作区
          - generic [ref=e114]: 临时
          - button "固定工作区" [ref=e115] [cursor=pointer]
          - button "隐藏工作区" [ref=e118] [cursor=pointer]
        - strong [ref=e123]: 云文档
        - textbox "搜索工作区" [ref=e127]
        - navigation "云文档功能" [ref=e129]:
          - list [ref=e130]:
            - listitem [ref=e131]:
              - link "主页" [ref=e133] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e138]:
              - link "云盘" [ref=e140] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e145]:
              - link "知识库" [ref=e147] [cursor=pointer]:
                - /url: "#navigation-v042"
        - heading "置顶工作区" [level=5] [ref=e152]
        - navigation "置顶工作区" [ref=e153]:
          - list [ref=e154]:
            - listitem [ref=e155]:
              - link "课程教学协作空间" [ref=e157] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e162]:
              - link "教学设计与教研" [ref=e164] [cursor=pointer]:
                - /url: "#navigation-v042"
        - heading "我的文档" [level=5] [ref=e169]
        - navigation "我的文档" [ref=e170]:
          - list [ref=e171]:
            - listitem [ref=e172]:
              - link "2026 学期工作计划" [ref=e174] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e179]:
              - link "课程目标与评价方案" [ref=e181] [cursor=pointer]:
                - /url: "#navigation-v042"
        - generic [ref=e186]: 个人空间 · 本地示例
      - generic [ref=e187]:
        - generic [ref=e188]:
          - generic [ref=e189]:
            - generic [ref=e190]:
              - strong [ref=e193]: 课程教学协作空间
              - generic [ref=e194]: / 学习反馈
            - generic [ref=e196]: 教学协作 / 2026 秋季学期 · 演示空间
          - button "分享" [ref=e197] [cursor=pointer]
          - button "更多工作区操作" [ref=e201] [cursor=pointer]
        - generic [ref=e203]:
          - generic "内部目录" [ref=e205]:
            - generic [ref=e206]:
              - strong [ref=e207]: 内部目录
              - button "取消固定内部目录" [ref=e208] [cursor=pointer]
              - button "隐藏内部目录" [ref=e211] [cursor=pointer]
            - generic [ref=e214]: 工作区内部
            - navigation "工作区页面" [ref=e215]:
              - list [ref=e216]:
                - listitem [ref=e217]:
                  - link "课程任务" [ref=e219] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e224]:
                  - link "学习反馈" [ref=e226] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e231]:
                  - link "教研周报" [ref=e233] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e238]:
                  - link "资源素材" [ref=e240] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - heading "扩展内容" [level=5] [ref=e245]
            - navigation "工作区扩展页面" [ref=e246]:
              - list [ref=e247]:
                - listitem [ref=e248]:
                  - link "课程介绍" [ref=e250] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e255]:
                  - link "参考资料" [ref=e257] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - button "+ 新建页面" [ref=e263] [cursor=pointer]
          - separator "调整内部目录宽度" [ref=e265]
          - generic [ref=e267]:
            - generic "分区导航" [ref=e269]:
              - tablist "页面内容视图" [ref=e273]:
                - tab "表格" [ref=e274] [cursor=pointer]
                - tab "状态分组" [ref=e280] [cursor=pointer]
                - tab "画册" [ref=e286] [cursor=pointer]
                - tab "反馈表单" [selected] [ref=e292] [cursor=pointer]
            - tabpanel "反馈表单" [ref=e300]:
              - generic [ref=e301]:
                - generic [ref=e302]:
                  - radiogroup "反馈表单模式" [ref=e304]:
                    - generic [ref=e306]:
                      - generic [ref=e307] [cursor=pointer]:
                        - radio "编辑表单" [checked] [ref=e308]
                        - generic [ref=e309]: 编辑表单
                      - generic [ref=e310] [cursor=pointer]:
                        - radio "填写预览" [ref=e311]
                        - generic [ref=e312]: 填写预览
                  - button "筛选视图" [ref=e313] [cursor=pointer]
                  - button "链接选项" [ref=e315] [cursor=pointer]
                  - button "视图设置" [ref=e317] [cursor=pointer]
                - generic [ref=e319]:
                  - generic "编辑工具" [ref=e321]:
                    - generic [ref=e322]:
                      - strong [ref=e323]: 编辑工具
                      - button "取消固定编辑工具" [ref=e324] [cursor=pointer]
                      - button "隐藏编辑工具" [ref=e327] [cursor=pointer]
                    - heading "表单内容" [level=4] [ref=e330]
                    - generic [ref=e331]: 课程信息
                    - generic [ref=e333]: 学习体验
                    - generic [ref=e335]: 建议与反馈
                    - separator [ref=e337]
                    - heading "新增题目" [level=4] [ref=e338]
                    - button "新增文本题" [ref=e339] [cursor=pointer]:
                      - text: 文本
                      - generic [ref=e341]: +
                    - button "新增单选题" [ref=e342] [cursor=pointer]:
                      - text: 单选
                      - generic [ref=e344]: +
                    - button "新增评分题" [ref=e345] [cursor=pointer]:
                      - text: 评分
                      - generic [ref=e347]: +
                    - button "新增附件题" [ref=e348] [cursor=pointer]:
                      - text: 附件
                      - generic [ref=e350]: +
                    - paragraph [ref=e351]: 新增内容只影响当前表单示例。
                  - separator "调整编辑工具宽度" [ref=e352]
                  - generic [ref=e354]:
                    - generic [ref=e355]: COURSE FEEDBACK / 2026
                    - generic [ref=e358]:
                      - heading "课程学习反馈" [level=2] [ref=e359]
                      - paragraph [ref=e360]: 让每一次反馈，帮助我们一起改进课堂。本地示例，反馈不会发送给教师。
                      - generic [ref=e361]:
                        - generic [ref=e362]: 你正在学习的课程 *
                        - textbox "课程名称" [ref=e364]:
                          - /placeholder: 请输入课程名称
                          - text: 高等数学 A
                      - radiogroup "本阶段课程内容的理解程度" [ref=e367]:
                        - generic [ref=e369]:
                          - generic [ref=e370] [cursor=pointer]:
                            - radio "能够理解并独立应用" [ref=e371]
                            - generic [ref=e374]: 能够理解并独立应用
                          - generic [ref=e376] [cursor=pointer]:
                            - radio "基本理解，需要更多练习" [checked] [ref=e377]
                            - generic [ref=e381]: 基本理解，需要更多练习
                          - generic [ref=e383] [cursor=pointer]:
                            - radio "希望获得进一步的讲解" [ref=e384]
                            - generic [ref=e387]: 希望获得进一步的讲解
                      - generic [ref=e389]:
                        - generic [ref=e390]: 你希望补充哪些内容？
                        - textbox "你希望我们改进的地方" [ref=e392]:
                          - /placeholder: 写下你的具体建议…
                      - button "本地保存示例" [ref=e394] [cursor=pointer]
  - generic [ref=e396]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
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
  82  | test('N17 R2 brand stays mounted through real expand collapse motion with accepted slot widths', async ({ page }) => {
  83  |   const root = await open(page, 'R2');
  84  |   await page.emulateMedia({ reducedMotion: 'no-preference' });
  85  |   const rail = region(root, 'global'), slot = root.locator('[data-region-slot="global"]');
  86  |   const brand = rail.locator('.nv42-brand strong');
  87  |   const original = await brand.elementHandle();
  88  |   expect((await shape(slot)).width).toBe(64);
  89  |   await rail.getByRole('button', { name: '展开平台导航', exact: true }).click();
  90  |   const widths = await slot.evaluate(async element => {
  91  |     const values: number[] = [], start = performance.now();
  92  |     while (performance.now() - start < 350) { await new Promise(requestAnimationFrame); values.push(element.getBoundingClientRect().width); }
  93  |     return values;
  94  |   });
  95  |   await expect.poll(async () => (await shape(slot)).width).toBe(208);
  96  |   expect(widths.filter(width => width > 64 && width < 208).length).toBeGreaterThan(2);
  97  |   expect(await brand.evaluate((element, previous) => element === previous, original)).toBe(true);
  98  |   await rail.getByRole('button', { name: '收起平台导航', exact: true }).click();
  99  |   await expect.poll(async () => (await shape(slot)).width).toBe(64);
  100 |   expect(await brand.evaluate((element, previous) => element === previous, original)).toBe(true);
  101 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  102 |   await expect(slot).toHaveCSS('transition-duration', '0s');
  103 | });
  104 | 
  105 | test('N11 real wheel scroll in a constrained S2 host survives hide and restore', async ({ page }) => {
  106 |   const root = await open(page, 'S2');
  107 |   const pane = region(root, 'context');
  108 |   // Host sizing is a test fixture only; the user path and saved scroll state remain real.
  109 |   await page.addStyleTag({ content: '.nv43-workspace .rain-workspace__region[data-region-id="context"]{height:160px!important;min-height:0!important;overflow:auto!important}' });
  110 |   await pane.hover();
  111 |   await page.mouse.wheel(0, 260);
  112 |   await expect.poll(() => pane.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  113 |   const before = await pane.evaluate(element => element.scrollTop);
  114 |   const selected = await pane.getByRole('treeitem', { selected: true }).getAttribute('id');
  115 |   expect(selected).toBeTruthy();
  116 |   await restore(root, 'context').click();
  117 |   await expect(pane).toBeHidden();
  118 |   await restore(root, 'context').click();
  119 |   await expect(pane).toBeVisible();
  120 |   expect(await pane.evaluate(element => element.scrollTop)).toBe(before);
  121 |   expect(await pane.getByRole('treeitem', { selected: true }).getAttribute('id')).toBe(selected);
  122 | });
  123 | 
  124 | test('N15 A2 selected and hovered queue rows retain a shared zero-gap boundary', async ({ page }) => {
  125 |   await open(page, 'A2');
  126 |   const queue = page.getByTestId('candidate-A2').getByRole('group', { name: '当前学生队列' });
  127 |   const entries = queue.locator('[data-slot="entry"]');
  128 |   for (const index of [0, 1, 2]) {
  129 |     await entries.nth(index).click();
  130 |     await entries.nth((index + 1) % await entries.count()).hover();
  131 |     const rows = await queue.locator('.rain-navigation-family__row').evaluateAll(elements => elements.map(element => { const rect = element.getBoundingClientRect(); return { top: rect.top, bottom: rect.bottom, height: rect.height }; }));
  132 |     rows.forEach(row => expect(row.height).toBe(76));
  133 |     rows.slice(1).forEach((row, rowIndex) => expect(row.top).toBe(rows[rowIndex]!.bottom));
  134 |   }
  135 | });
  136 | 
  137 | for (const sample of ['R2', 'R4', 'S3', 'S5']) test(`N20 N24 ${sample} accepted pale splitter retains pointer and keyboard targets`, async ({ page }) => {
  138 |   const root = await open(page, sample, 1200);
  139 |   const splitter = root.locator('.rain-workspace__splitter:not([hidden])').first();
  140 |   await splitter.scrollIntoViewIfNeeded();
  141 |   const paint = () => splitter.evaluate(element => ({ line: getComputedStyle(element, '::before').opacity, handle: getComputedStyle(element, '::after').opacity, width: element.getBoundingClientRect().width, value: Number(element.getAttribute('aria-valuenow')) }));
  142 |   await page.mouse.move(1790, 1090);
  143 |   const before = await paint();
  144 |   expect(before.line).toBe('0.4'); expect(before.handle).toBe('0'); expect(before.width).toBeGreaterThanOrEqual(5);
  145 |   await splitter.hover(); expect((await paint()).line).toBe('1');
  146 |   const box = await splitter.boundingBox();
  147 |   await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  148 |   await page.mouse.down(); await page.mouse.move(box!.x + box!.width / 2 + 18, box!.y + box!.height / 2, { steps: 3 }); await page.mouse.up();
  149 |   await splitter.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
  150 |   await expect(splitter).toBeFocused(); expect((await paint()).line).toBe('1');
  151 |   const width = (await paint()).value;
  152 |   await page.keyboard.press('ArrowRight');
  153 |   expect((await paint()).value).not.toBe(width);
  154 | });
  155 | 
  156 | test('N06 N04 hover bridges the entry and panel, Escape suppresses rebound, reentry remains usable', async ({ page }) => {
  157 |   const root = await open(page, 'S3');
  158 |   await setHover(page, root);
  159 |   const entry = restore(root, 'context'), pane = region(root, 'context');
  160 |   const content = root.locator('.nv5-document-views');
  161 |   const before = await shape(content);
  162 |   await entry.hover();
  163 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
> 164 |   expect(await shape(content)).toEqual(before);
      |                                ^ Error: expect(received).toEqual(expected) // deep equality
  165 |   await pane.getByRole('textbox', { name: '搜索工作区' }).hover();
  166 |   await expect(pane).toBeVisible();
  167 |   await page.keyboard.press('Escape');
  168 |   await expect(pane).toBeHidden();
  169 |   await page.waitForTimeout(500); // Exceeds the documented 240ms open / 360ms close timers.
  170 |   await expect(pane).toBeHidden();
  171 |   await root.locator('.nv44-identity').hover();
  172 |   await entry.hover();
  173 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
  174 | });
  175 | 
  176 | test('N07 queued hover cannot open a panel after switching S3 to S6', async ({ page }) => {
  177 |   const root = await open(page, 'S3');
  178 |   await setHover(page, root);
  179 |   await restore(root, 'context').hover();
  180 |   await page.getByRole('navigation', { name: '导航候选样本' }).getByRole('button', { name: 'S6', exact: true }).click();
  181 |   const replay = page.locator('[data-recipe-id="recipe-navigation-r5"]');
  182 |   await expect(replay).toBeVisible();
  183 |   await page.waitForTimeout(600);
  184 |   await expect(replay.locator('[data-temporary="true"]')).toHaveCount(0);
  185 |   await expect(replay).toHaveAttribute('data-focused', 'false');
  186 | });
  187 | 
  188 | test('N18 inverse temporary platform retains the account, native links, focus and close recovery', async ({ page }) => {
  189 |   const root = await open(page, 'S3');
  190 |   await page.getByRole('checkbox', { name: '深色外框', exact: true }).check();
  191 |   await restore(root, 'global').click();
  192 |   const pane = region(root, 'global');
  193 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
  194 |   await expect(pane).toHaveAttribute('data-rain-theme', 'dark');
  195 |   const account = pane.getByRole('button', { name: '当前账户：林老师', exact: true });
  196 |   await expect(account).toBeVisible();
  197 |   await pane.getByRole('link', { name: '课程', exact: true }).focus();
  198 |   await expect(pane.getByRole('link', { name: '课程', exact: true })).toBeFocused();
  199 |   const palette = await pane.evaluate(element => ({ background: getComputedStyle(element).backgroundColor, color: getComputedStyle(element).color }));
  200 |   expect(palette.background).not.toBe('rgb(255, 255, 255)');
  201 |   expect(palette.color).not.toBe(palette.background);
  202 |   await page.keyboard.press('Escape');
  203 |   await expect(pane).not.toHaveAttribute('data-temporary', 'true');
  204 |   await expect(restore(root, 'global')).toBeFocused();
  205 | });
  206 | 
  207 | test('N19 searchable scope owns one visible focus ring and no inner input outline', async ({ page }) => {
  208 |   const root = await open(page, 'R2');
  209 |   await root.getByRole('button', { name: '更多班级', exact: true }).click();
  210 |   const input = page.getByRole('textbox', { name: '搜索范围', exact: true });
  211 |   await expect(input).toBeFocused();
  212 |   const facts = await input.evaluate(element => {
  213 |     const parent = element.closest('[data-rain-id="ui-input"]') ?? element.parentElement!;
  214 |     const inner = getComputedStyle(element), outer = getComputedStyle(parent);
  215 |     return { innerOutline: inner.outlineStyle, innerShadow: inner.boxShadow, outerShadow: outer.boxShadow, outerOutline: outer.outlineStyle };
  216 |   });
  217 |   expect(facts.innerOutline).toBe('none');
  218 |   expect(facts.innerShadow).toBe('none');
  219 |   expect(facts.outerShadow !== 'none' || facts.outerOutline !== 'none').toBe(true);
  220 |   await page.keyboard.press('Escape');
  221 |   await expect(root.getByRole('button', { name: '更多班级', exact: true })).toBeFocused();
  222 | });
  223 | 
  224 | test('N19 S3 temporary context search retains its single shared Input focus ring', async ({ page }) => {
  225 |   const root = await open(page, 'S3');
  226 |   await restore(root, 'context').click();
  227 |   const input = region(root, 'context').getByRole('textbox', { name: '搜索工作区', exact: true });
  228 |   await input.focus();
  229 |   await expect(input).toBeFocused();
  230 |   const styles = await input.evaluate(element => {
  231 |     const inner = getComputedStyle(element), outer = getComputedStyle(element.closest('[data-rain-id="ui-input"]')!);
  232 |     return { innerOutline: inner.outlineStyle, innerShadow: inner.boxShadow, outerOutline: outer.outlineStyle, outerShadow: outer.boxShadow };
  233 |   });
  234 |   expect(styles.innerOutline).toBe('none'); expect(styles.innerShadow).toBe('none');
  235 |   expect(styles.outerOutline !== 'none' || styles.outerShadow !== 'none').toBe(true);
  236 | });
  237 | 
  238 | test('N14 connected geometry remains finite after first middle last selection, resize and region recovery', async ({ page }) => {
  239 |   const root = await open(page, 'R2');
  240 |   const scope = root.locator('[data-rain-id="ui-scope-navigation"]');
  241 |   for (const label of ['公共资源包', '2026 秋 · 高等数学 1 班', '2026 秋 · 创新实验班']) {
  242 |     await scope.getByRole('tab', { name: label, exact: true }).click();
  243 |     await expect(scope.getByRole('tab', { name: label, exact: true })).toHaveAttribute('aria-selected', 'true');
  244 |     const paths = await scope.locator('svg path').evaluateAll(elements => elements.map(element => element.getAttribute('d')));
  245 |     expect(paths.length).toBeGreaterThan(0);
  246 |     expect(paths.every(path => Boolean(path) && !/NaN|Infinity|undefined/.test(path!))).toBe(true);
  247 |   }
  248 |   for (const width of [1200, 1600, 1440]) await page.getByRole('combobox', { name: '画板宽度' }).selectOption(String(width));
  249 |   await root.locator('.nv42-workspace-bar').getByRole('button', { name: '隐藏课程导航', exact: true }).click();
  250 |   await root.getByRole('button', { name: '恢复课程导航', exact: true }).click();
  251 |   await expect(scope.getByRole('tab', { name: '2026 秋 · 创新实验班', exact: true })).toHaveAttribute('aria-selected', 'true');
  252 |   expect(await scope.locator('svg path').evaluateAll(elements => elements.every(element => !/NaN|Infinity/.test(element.getAttribute('d') ?? '')))).toBe(true);
  253 | });
  254 | 
  255 | for (const width of [1200, 1440, 1600]) test(`N21 N23 W7 matrix scope caps and search 200 classes at ${width}`, async ({ page }) => {
  256 |   const root = await open(page, 'R2', width);
  257 |   const scope = root.locator('[data-rain-id="ui-scope-navigation"]');
  258 |   for (const cap of [3, 4, 5]) {
  259 |     await page.getByRole('combobox', { name: '可见范围' }).selectOption(String(cap));
  260 |     const tabs = scope.getByRole('tab');
  261 |     expect(await tabs.count()).toBeLessThanOrEqual(cap);
  262 |     await expect(tabs.first()).toHaveAccessibleName('公共资源包');
  263 |     await root.getByRole('button', { name: '更多班级', exact: true }).click();
  264 |     await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('高等数学 200 班');
```