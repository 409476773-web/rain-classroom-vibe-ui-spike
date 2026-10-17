# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w7.spec.ts >> N18 inverse temporary platform retains the account, native links, focus and close recovery
- Location: tests/e2e/navigation-v042-w7.spec.ts:163:1

# Error details

```
Error: locator.click: Error: strict mode violation: getByTestId('candidate-canvas').locator('.rain-workspace').first().locator('.rain-workspace__restore[aria-controls$="-workspace-global"]') resolved to 2 elements:
    1) <button type="button" title="展开平台导航" data-mode="compact" data-active="false" aria-label="展开平台导航" aria-expanded="false" data-workspace-action="restore" aria-controls="_r_2_-workspace-global" class="rain-workspace__restore nv44-restore-control">…</button> aka getByRole('button', { name: '展开平台导航', description: '展开平台导航' })
    2) <button aria-label="展开平台导航" aria-expanded="false" data-workspace-action="restore" aria-controls="_r_2_-workspace-global" class="nv5-platform-expand rain-workspace__restore">…</button> aka getByLabel('平台导航', { exact: true }).getByRole('button', { name: '展开平台导航' })

Call log:
  - waiting for getByTestId('candidate-canvas').locator('.rain-workspace').first().locator('.rain-workspace__restore[aria-controls$="-workspace-global"]')

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
      - checkbox "深色外框" [checked] [active] [ref=e42]
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
      - button "布局设置" [ref=e67] [cursor=pointer]:
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
      - generic [ref=e111]:
        - generic [ref=e112]:
          - generic [ref=e113]:
            - generic [ref=e114]:
              - strong [ref=e117]: 课程教学协作空间
              - generic [ref=e118]: / 学习反馈
            - generic [ref=e120]: 教学协作 / 2026 秋季学期 · 演示空间
          - button "分享" [ref=e121] [cursor=pointer]
          - button "更多工作区操作" [ref=e125] [cursor=pointer]
        - generic [ref=e127]:
          - generic "内部目录" [ref=e129]:
            - generic [ref=e130]:
              - strong [ref=e131]: 内部目录
              - button "取消固定内部目录" [ref=e132] [cursor=pointer]
              - button "隐藏内部目录" [ref=e135] [cursor=pointer]
            - generic [ref=e138]: 工作区内部
            - navigation "工作区页面" [ref=e139]:
              - list [ref=e140]:
                - listitem [ref=e141]:
                  - link "课程任务" [ref=e143] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e148]:
                  - link "学习反馈" [ref=e150] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e155]:
                  - link "教研周报" [ref=e157] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e162]:
                  - link "资源素材" [ref=e164] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - heading "扩展内容" [level=5] [ref=e169]
            - navigation "工作区扩展页面" [ref=e170]:
              - list [ref=e171]:
                - listitem [ref=e172]:
                  - link "课程介绍" [ref=e174] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e179]:
                  - link "参考资料" [ref=e181] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - button "+ 新建页面" [ref=e187] [cursor=pointer]
          - separator "调整内部目录宽度" [ref=e189]
          - generic [ref=e191]:
            - generic "分区导航" [ref=e193]:
              - tablist "页面内容视图" [ref=e197]:
                - tab "表格" [ref=e198] [cursor=pointer]
                - tab "状态分组" [ref=e204] [cursor=pointer]
                - tab "画册" [ref=e210] [cursor=pointer]
                - tab "反馈表单" [selected] [ref=e216] [cursor=pointer]
            - tabpanel "反馈表单" [ref=e224]:
              - generic [ref=e225]:
                - generic [ref=e226]:
                  - radiogroup "反馈表单模式" [ref=e228]:
                    - generic [ref=e230]:
                      - generic [ref=e231] [cursor=pointer]:
                        - radio "编辑表单" [checked] [ref=e232]
                        - generic [ref=e233]: 编辑表单
                      - generic [ref=e234] [cursor=pointer]:
                        - radio "填写预览" [ref=e235]
                        - generic [ref=e236]: 填写预览
                  - button "筛选视图" [ref=e237] [cursor=pointer]
                  - button "链接选项" [ref=e239] [cursor=pointer]
                  - button "视图设置" [ref=e241] [cursor=pointer]
                - generic [ref=e243]:
                  - generic "编辑工具" [ref=e245]:
                    - generic [ref=e246]:
                      - strong [ref=e247]: 编辑工具
                      - button "取消固定编辑工具" [ref=e248] [cursor=pointer]
                      - button "隐藏编辑工具" [ref=e251] [cursor=pointer]
                    - heading "表单内容" [level=4] [ref=e254]
                    - generic [ref=e255]: 课程信息
                    - generic [ref=e257]: 学习体验
                    - generic [ref=e259]: 建议与反馈
                    - separator [ref=e261]
                    - heading "新增题目" [level=4] [ref=e262]
                    - button "新增文本题" [ref=e263] [cursor=pointer]:
                      - text: 文本
                      - generic [ref=e265]: +
                    - button "新增单选题" [ref=e266] [cursor=pointer]:
                      - text: 单选
                      - generic [ref=e268]: +
                    - button "新增评分题" [ref=e269] [cursor=pointer]:
                      - text: 评分
                      - generic [ref=e271]: +
                    - button "新增附件题" [ref=e272] [cursor=pointer]:
                      - text: 附件
                      - generic [ref=e274]: +
                    - paragraph [ref=e275]: 新增内容只影响当前表单示例。
                  - separator "调整编辑工具宽度" [ref=e276]
                  - generic [ref=e278]:
                    - generic [ref=e279]: COURSE FEEDBACK / 2026
                    - generic [ref=e282]:
                      - heading "课程学习反馈" [level=2] [ref=e283]
                      - paragraph [ref=e284]: 让每一次反馈，帮助我们一起改进课堂。本地示例，反馈不会发送给教师。
                      - generic [ref=e285]:
                        - generic [ref=e286]: 你正在学习的课程 *
                        - textbox "课程名称" [ref=e288]:
                          - /placeholder: 请输入课程名称
                          - text: 高等数学 A
                      - radiogroup "本阶段课程内容的理解程度" [ref=e291]:
                        - generic [ref=e293]:
                          - generic [ref=e294] [cursor=pointer]:
                            - radio "能够理解并独立应用" [ref=e295]
                            - generic [ref=e298]: 能够理解并独立应用
                          - generic [ref=e300] [cursor=pointer]:
                            - radio "基本理解，需要更多练习" [checked] [ref=e301]
                            - generic [ref=e305]: 基本理解，需要更多练习
                          - generic [ref=e307] [cursor=pointer]:
                            - radio "希望获得进一步的讲解" [ref=e308]
                            - generic [ref=e311]: 希望获得进一步的讲解
                      - generic [ref=e313]:
                        - generic [ref=e314]: 你希望补充哪些内容？
                        - textbox "你希望我们改进的地方" [ref=e316]:
                          - /placeholder: 写下你的具体建议…
                      - button "本地保存示例" [ref=e318] [cursor=pointer]
  - generic [ref=e320]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
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
  134 |   const entry = restore(root, 'context'), pane = region(root, 'context');
  135 |   const content = root.locator('.nv5-document-views');
  136 |   const before = await shape(content);
  137 |   await entry.hover();
  138 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
  139 |   expect(await shape(content)).toEqual(before);
  140 |   await pane.getByRole('textbox', { name: '搜索工作区' }).hover();
  141 |   await expect(pane).toBeVisible();
  142 |   await page.keyboard.press('Escape');
  143 |   await expect(pane).toBeHidden();
  144 |   await page.waitForTimeout(500); // Exceeds the documented 240ms open / 360ms close timers.
  145 |   await expect(pane).toBeHidden();
  146 |   await root.locator('.nv44-identity').hover();
  147 |   await entry.hover();
  148 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
  149 | });
  150 | 
  151 | test('N07 queued hover cannot open a panel after switching S3 to S6', async ({ page }) => {
  152 |   const root = await open(page, 'S3');
  153 |   await setHover(page, root);
  154 |   await restore(root, 'context').hover();
  155 |   await page.getByRole('navigation', { name: '导航候选样本' }).getByRole('button', { name: 'S6', exact: true }).click();
  156 |   const replay = page.locator('[data-recipe-id="recipe-navigation-r5"]');
  157 |   await expect(replay).toBeVisible();
  158 |   await page.waitForTimeout(600);
  159 |   await expect(replay.locator('[data-temporary="true"]')).toHaveCount(0);
  160 |   await expect(replay).toHaveAttribute('data-focused', 'false');
  161 | });
  162 | 
  163 | test('N18 inverse temporary platform retains the account, native links, focus and close recovery', async ({ page }) => {
  164 |   const root = await open(page, 'S3');
  165 |   await page.getByRole('checkbox', { name: '深色外框', exact: true }).check();
> 166 |   await restore(root, 'global').click();
      |                                 ^ Error: locator.click: Error: strict mode violation: getByTestId('candidate-canvas').locator('.rain-workspace').first().locator('.rain-workspace__restore[aria-controls$="-workspace-global"]') resolved to 2 elements:
  167 |   const pane = region(root, 'global');
  168 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
  169 |   await expect(pane).toHaveAttribute('data-rain-theme', 'dark');
  170 |   const account = pane.getByRole('button', { name: '当前账户：林老师', exact: true });
  171 |   await expect(account).toBeVisible();
  172 |   await pane.getByRole('link', { name: '课程', exact: true }).focus();
  173 |   await expect(pane.getByRole('link', { name: '课程', exact: true })).toBeFocused();
  174 |   const palette = await pane.evaluate(element => ({ background: getComputedStyle(element).backgroundColor, color: getComputedStyle(element).color }));
  175 |   expect(palette.background).not.toBe('rgb(255, 255, 255)');
  176 |   expect(palette.color).not.toBe(palette.background);
  177 |   await page.keyboard.press('Escape');
  178 |   await expect(pane).not.toHaveAttribute('data-temporary', 'true');
  179 |   await expect(restore(root, 'global')).toBeFocused();
  180 | });
  181 | 
  182 | test('N19 searchable scope owns one visible focus ring and no inner input outline', async ({ page }) => {
  183 |   const root = await open(page, 'R2');
  184 |   await root.getByRole('button', { name: '更多班级', exact: true }).click();
  185 |   const input = page.getByRole('textbox', { name: '搜索范围', exact: true });
  186 |   await expect(input).toBeFocused();
  187 |   const facts = await input.evaluate(element => {
  188 |     const parent = element.closest('[data-rain-id="ui-input"]') ?? element.parentElement!;
  189 |     const inner = getComputedStyle(element), outer = getComputedStyle(parent);
  190 |     return { innerOutline: inner.outlineStyle, innerShadow: inner.boxShadow, outerShadow: outer.boxShadow, outerOutline: outer.outlineStyle };
  191 |   });
  192 |   expect(facts.innerOutline).toBe('none');
  193 |   expect(facts.innerShadow).toBe('none');
  194 |   expect(facts.outerShadow !== 'none' || facts.outerOutline !== 'none').toBe(true);
  195 |   await page.keyboard.press('Escape');
  196 |   await expect(root.getByRole('button', { name: '更多班级', exact: true })).toBeFocused();
  197 | });
  198 | 
  199 | test('N19 S3 temporary context search retains its single shared Input focus ring', async ({ page }) => {
  200 |   const root = await open(page, 'S3');
  201 |   await restore(root, 'context').click();
  202 |   const input = region(root, 'context').getByRole('textbox', { name: '搜索工作区', exact: true });
  203 |   await input.focus();
  204 |   await expect(input).toBeFocused();
  205 |   const styles = await input.evaluate(element => {
  206 |     const inner = getComputedStyle(element), outer = getComputedStyle(element.closest('[data-rain-id="ui-input"]')!);
  207 |     return { innerOutline: inner.outlineStyle, innerShadow: inner.boxShadow, outerOutline: outer.outlineStyle, outerShadow: outer.boxShadow };
  208 |   });
  209 |   expect(styles.innerOutline).toBe('none'); expect(styles.innerShadow).toBe('none');
  210 |   expect(styles.outerOutline !== 'none' || styles.outerShadow !== 'none').toBe(true);
  211 | });
  212 | 
  213 | test('N14 connected geometry remains finite after first middle last selection, resize and region recovery', async ({ page }) => {
  214 |   const root = await open(page, 'R2');
  215 |   const scope = root.locator('[data-rain-id="ui-scope-navigation"]');
  216 |   for (const label of ['公共资源包', '2026 秋 · 高等数学 1 班', '2026 秋 · 创新实验班']) {
  217 |     await scope.getByRole('tab', { name: label, exact: true }).click();
  218 |     await expect(scope.getByRole('tab', { name: label, exact: true })).toHaveAttribute('aria-selected', 'true');
  219 |     const paths = await scope.locator('svg path').evaluateAll(elements => elements.map(element => element.getAttribute('d')));
  220 |     expect(paths.length).toBeGreaterThan(0);
  221 |     expect(paths.every(path => Boolean(path) && !/NaN|Infinity|undefined/.test(path!))).toBe(true);
  222 |   }
  223 |   for (const width of [1200, 1600, 1440]) await page.getByRole('combobox', { name: '画板宽度' }).selectOption(String(width));
  224 |   await root.locator('.nv42-workspace-bar').getByRole('button', { name: '隐藏课程导航', exact: true }).click();
  225 |   await root.getByRole('button', { name: '恢复课程导航', exact: true }).click();
  226 |   await expect(scope.getByRole('tab', { name: '2026 秋 · 创新实验班', exact: true })).toHaveAttribute('aria-selected', 'true');
  227 |   expect(await scope.locator('svg path').evaluateAll(elements => elements.every(element => !/NaN|Infinity/.test(element.getAttribute('d') ?? '')))).toBe(true);
  228 | });
  229 | 
  230 | for (const width of [1200, 1440, 1600]) test(`N21 N23 W7 matrix scope caps and search 200 classes at ${width}`, async ({ page }) => {
  231 |   const root = await open(page, 'R2', width);
  232 |   const scope = root.locator('[data-rain-id="ui-scope-navigation"]');
  233 |   for (const cap of [3, 4, 5]) {
  234 |     await page.getByRole('combobox', { name: '可见范围' }).selectOption(String(cap));
  235 |     const tabs = scope.getByRole('tab');
  236 |     expect(await tabs.count()).toBeLessThanOrEqual(cap);
  237 |     await expect(tabs.first()).toHaveAccessibleName('公共资源包');
  238 |     await root.getByRole('button', { name: '更多班级', exact: true }).click();
  239 |     await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('高等数学 200 班');
  240 |     await page.getByRole('button', { name: '2026 秋 · 高等数学 200 班', exact: true }).click();
  241 |     await expect(tabs.last()).toHaveAccessibleName('2026 秋 · 高等数学 200 班');
  242 |     await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');
  243 |     await expect(tabs.first()).toHaveAccessibleName('公共资源包');
  244 |   }
  245 | });
  246 | 
  247 | for (const sample of ['R4', 'S4']) for (const width of [1200, 1440, 1600]) test(`N12 N28 W7 matrix ${sample} grading theme retains draft and input identity at ${width}`, async ({ page }) => {
  248 |   const root = await open(page, sample, width);
  249 |   await page.getByRole('combobox', { name: '业务子场景' }).selectOption('grading');
  250 |   const draft = root.getByRole('textbox', { name: '给当前作答的反馈', exact: true });
  251 |   await draft.fill('W7 同一作答的未保存草稿');
  252 |   await draft.evaluate(element => element.setAttribute('data-w7-original-input', 'true'));
  253 |   const selected = await root.getByRole('group', { name: '学生队列' }).locator('[aria-pressed="true"]').getAttribute('aria-label');
  254 |   for (const inverse of [true, false]) {
  255 |     await page.getByRole('checkbox', { name: '深色外框', exact: true }).setChecked(inverse);
  256 |     await expect(draft).toHaveValue('W7 同一作答的未保存草稿');
  257 |     await expect(draft).toHaveAttribute('data-w7-original-input', 'true');
  258 |     expect(await root.getByRole('group', { name: '学生队列' }).locator('[aria-pressed="true"]').getAttribute('aria-label')).toBe(selected);
  259 |   }
  260 |   await root.getByRole('radio', { name: '大', exact: true }).locator('..').click();
  261 |   await expect(draft).toHaveValue('W7 同一作答的未保存草稿');
  262 |   await expect(draft).toHaveAttribute('data-w7-original-input', 'true');
  263 |   await expect(root.locator('.nv5-demo-note')).toContainText('未提交成绩');
  264 | });
  265 | 
  266 | test('N31 StrictMode standalone repeatedly mounts workspaces without stale temporary state', async ({ page }) => {
```