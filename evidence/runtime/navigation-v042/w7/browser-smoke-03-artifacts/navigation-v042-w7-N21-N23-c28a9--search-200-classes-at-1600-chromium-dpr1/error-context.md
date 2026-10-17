# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w7.spec.ts >> N21 N23 W7 matrix scope caps and search 200 classes at 1600
- Location: tests/e2e/navigation-v042-w7.spec.ts:230:41

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '2026 秋 · 高等数学 200 班', exact: true })

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
        - option "1440"
        - option "1600" [selected]
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
        - option "3" [selected]
        - option "4"
        - option "5"
    - generic [ref=e40]: 轻品牌
    - generic "未勾选时使用轻品牌外框" [ref=e41]:
      - checkbox "深色外框" [ref=e42]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e43] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R2
  - generic [ref=e48]:
    - generic [ref=e49]:
      - button "展开平台导航" [ref=e50] [cursor=pointer]
      - button "隐藏课程导航" [expanded] [ref=e52] [cursor=pointer]
      - generic [ref=e54]:
        - strong [ref=e55]: 高等数学 A · 课程内容
        - generic [ref=e56]: 公共资源包
      - button "布局" [ref=e57] [cursor=pointer]
      - button "专注内容" [ref=e59] [cursor=pointer]
    - generic [ref=e63]:
      - generic "平台导航" [ref=e65]:
        - navigation "平台导航" [ref=e66]:
          - button "展开平台导航" [ref=e68] [cursor=pointer]
          - generic [ref=e73]:
            - link "工作台" [ref=e74] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "课程" [ref=e77] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "资源" [ref=e80] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "专业" [ref=e83] [cursor=pointer]:
              - /url: "#navigation-v042"
          - generic [ref=e86]:
            - button "当前账户：林老师" [ref=e87] [cursor=pointer]
            - generic [ref=e90]:
              - button "通知" [ref=e91] [cursor=pointer]
              - button "帮助" [ref=e94] [cursor=pointer]
      - generic [ref=e97]:
        - generic "课程导航" [ref=e99]:
          - generic [ref=e100]:
            - strong [ref=e101]: 课程导航
            - button "取消固定，改为临时课程导航" [ref=e102] [cursor=pointer]
            - button "隐藏课程导航" [ref=e105] [cursor=pointer]
          - generic [ref=e108]:
            - button "返回我的课程" [ref=e109] [cursor=pointer]
            - generic [ref=e111]:
              - text: MATHEMATICS / 2026
              - strong [ref=e112]: 高等数学 A
              - generic [ref=e113]: ∫
            - heading "高等数学 A" [level=4] [ref=e114]
            - button "2026 秋季学期" [ref=e115] [cursor=pointer]
          - generic [ref=e117]: 教学空间
          - navigation "课程导航" [ref=e118]:
            - link "课程内容" [ref=e119] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "考核方案" [ref=e123] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "课程信息" [ref=e127] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "数据面板" [ref=e131] [cursor=pointer]:
              - /url: "#navigation-v042"
            - separator [ref=e135]
            - link "使用的班级 200" [ref=e136] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e139]:
                - generic [ref=e140]: 使用的班级
                - generic [ref=e141]: "200"
            - link "关联的 AI 课 2" [ref=e142] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e145]:
                - generic [ref=e146]: 关联的 AI 课
                - generic [ref=e147]: "2"
            - link "成员 12" [ref=e148] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e151]:
                - generic [ref=e152]: 成员
                - generic [ref=e153]: "12"
          - button "课程建设记录" [ref=e154] [cursor=pointer]
        - separator "调整课程导航宽度" [ref=e157]
        - generic [ref=e161]:
          - generic "分区导航" [ref=e163]:
            - generic [ref=e164]:
              - tablist "课程内容范围" [ref=e167]:
                - tab "公共资源包" [selected] [ref=e168] [cursor=pointer]:
                  - generic [ref=e172]:
                    - generic [ref=e173]: 公共内容 · 班级共用
                    - generic [ref=e174]: 公共资源包
                - tab "2026 秋 · 高等数学 1 班" [ref=e176] [cursor=pointer]:
                  - generic [ref=e180]:
                    - generic [ref=e181]: 教学班 · 2026 秋季学期
                    - generic [ref=e182]: 2026 秋 · 高等数学 1 班
                - tab "2026 秋 · 创新实验班" [ref=e184] [cursor=pointer]:
                  - generic [ref=e188]:
                    - generic [ref=e189]: 教学班 · 2026 秋季学期
                    - generic [ref=e190]: 2026 秋 · 创新实验班
              - generic [ref=e192]:
                - button "更多班级" [expanded] [ref=e194] [cursor=pointer]:
                  - generic [ref=e196]: "198"
                - dialog [ref=e201]:
                  - generic [ref=e202]:
                    - generic [ref=e203]:
                      - heading "选择课程内容范围" [level=2] [ref=e204]
                      - button "关闭范围选择" [ref=e205]
                    - generic [ref=e208]:
                      - textbox "搜索范围" [active] [ref=e211]:
                        - /placeholder: 搜索班级名称或序号
                        - text: 高等数学 200 班
                      - button "清除搜索范围" [ref=e213] [cursor=pointer]
                    - generic "范围搜索结果" [ref=e216]:
                      - button "2026 秋 · 高等数学 200 班 教学班 · 2026 秋季学期" [ref=e217]:
                        - generic [ref=e220]:
                          - strong [ref=e221]: 2026 秋 · 高等数学 200 班
                          - generic [ref=e222]: 教学班 · 2026 秋季学期
          - tabpanel "公共资源包" [ref=e227]:
            - generic [ref=e228]:
              - generic [ref=e229]:
                - navigation "面包屑" [ref=e231]:
                  - list [ref=e232]:
                    - listitem [ref=e233]:
                      - generic [ref=e234]: 课程内容
                    - listitem [ref=e235]:
                      - generic [ref=e236]: /
                      - generic [ref=e237]: 公共资源包
                - generic [ref=e238]:
                  - generic [ref=e239]:
                    - heading "知识点总览" [level=3] [ref=e240]
                    - paragraph [ref=e241]: 以知识点组织公共资源，在班级中安排教学。
                  - button "预览学生端" [ref=e243] [cursor=pointer]
              - generic [ref=e247]:
                - generic [ref=e248]:
                  - generic "已保存内容统计" [ref=e249]:
                    - generic [ref=e250]: 7 级结构
                    - generic [ref=e251]: 16 个内容节点
                    - generic [ref=e252]: 36 个学习单元
                  - radiogroup "内容类型" [ref=e254]:
                    - generic [ref=e256]:
                      - generic [ref=e257] [cursor=pointer]:
                        - radio "全部" [checked] [ref=e258]
                        - generic [ref=e259]: 全部
                      - generic [ref=e260] [cursor=pointer]:
                        - radio "作业" [ref=e261]
                        - generic [ref=e262]: 作业
                      - generic [ref=e263] [cursor=pointer]:
                        - radio "考试" [ref=e264]
                        - generic [ref=e265]: 考试
                - generic [ref=e266]:
                  - generic [ref=e267]:
                    - generic [ref=e268]: 编辑后请保存
                    - button "内容编辑说明" [ref=e269] [cursor=pointer]
                  - generic [ref=e272]:
                    - generic [ref=e273]:
                      - button "退出编辑" [ref=e274] [cursor=pointer]
                      - button "添加根节点" [ref=e276] [cursor=pointer]
                      - button "保存草稿" [ref=e278] [cursor=pointer]
                    - tree "课程内容编辑树" [ref=e280]:
                      - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e281]:
                        - generic [ref=e282]:
                          - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e283] [cursor=pointer]
                          - button "移动第一章 · 函数、极限与连续" [ref=e285] [cursor=pointer]
                          - generic "第一章 · 函数、极限与连续" [ref=e290]
                          - generic [ref=e292]:
                            - generic [ref=e293]: 20 个学习单元
                            - generic [ref=e294]: 09-24 更新
                      - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e295]:
                        - generic [ref=e296]:
                          - button "收起1.1 函数的基本概念" [expanded] [ref=e297] [cursor=pointer]
                          - button "移动1.1 函数的基本概念" [ref=e299] [cursor=pointer]
                          - generic "1.1 函数的基本概念" [ref=e304]
                          - generic [ref=e306]:
                            - generic [ref=e307]: 6 个学习单元
                            - generic [ref=e308]: 09-24 更新
                      - treeitem "函数的定义与表示" [level=3] [ref=e309]:
                        - generic [ref=e310]:
                          - button "移动函数的定义与表示" [ref=e311] [cursor=pointer]
                          - generic [ref=e313]: 讲义
                          - generic "函数的定义与表示" [ref=e320]
                          - generic [ref=e322]:
                            - generic [ref=e323]: 已发布
                            - generic [ref=e324]: 09-24 更新
                      - treeitem "函数的性质" [level=3] [ref=e325]:
                        - generic [ref=e326]:
                          - button "移动函数的性质" [ref=e327] [cursor=pointer]
                          - generic [ref=e329]: 视频
                          - generic "函数的性质" [ref=e336]
                          - generic [ref=e338]:
                            - generic [ref=e339]: 已发布
                            - generic [ref=e340]: 09-24 更新
                      - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e341]:
                        - generic [ref=e342]:
                          - button "收起1.2 极限与连续" [expanded] [ref=e343] [cursor=pointer]
                          - button "移动1.2 极限与连续" [ref=e345] [cursor=pointer]
                          - generic "1.2 极限与连续" [ref=e350]
                          - generic [ref=e352]:
                            - generic [ref=e353]: 8 个学习单元
                            - generic [ref=e354]: 09-24 更新
                      - treeitem "数列极限" [expanded] [level=3] [ref=e355]:
                        - generic [ref=e356]:
                          - button "收起数列极限" [expanded] [ref=e357] [cursor=pointer]
                          - button "移动数列极限" [ref=e359] [cursor=pointer]
                          - generic "数列极限" [ref=e364]
                          - generic [ref=e366]:
                            - generic [ref=e367]: 3 个学习单元
                            - generic [ref=e368]: 09-24 更新
                      - treeitem "极限的定义" [level=4] [ref=e369]:
                        - generic [ref=e370]:
                          - button "移动极限的定义" [ref=e371] [cursor=pointer]
                          - generic [ref=e373]: 讲义
                          - generic "极限的定义" [ref=e380]
                          - generic [ref=e382]:
                            - generic [ref=e383]: 已发布
                            - generic [ref=e384]: 09-24 更新
                      - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e385]:
                        - generic [ref=e386]:
                          - button "收起收敛性与极限运算" [expanded] [ref=e387] [cursor=pointer]
                          - button "移动收敛性与极限运算" [ref=e389] [cursor=pointer]
                          - generic "收敛性与极限运算" [ref=e394]
                          - generic [ref=e396]:
                            - generic [ref=e397]: 2 个学习单元
                            - generic [ref=e398]: 09-24 更新
                      - treeitem "两个重要极限" [expanded] [level=5] [ref=e399]:
                        - generic [ref=e400]:
                          - button "收起两个重要极限" [expanded] [ref=e401] [cursor=pointer]
                          - button "移动两个重要极限" [ref=e403] [cursor=pointer]
                          - generic "两个重要极限" [ref=e408]
                          - generic [ref=e410]:
                            - generic [ref=e411]: 2 个学习单元
                            - generic [ref=e412]: 09-24 更新
                      - treeitem "常见题型与方法" [expanded] [level=6] [ref=e413]:
                        - generic [ref=e414]:
                          - button "收起常见题型与方法" [expanded] [ref=e415] [cursor=pointer]
                          - button "移动常见题型与方法" [ref=e417] [cursor=pointer]
                          - generic "常见题型与方法" [ref=e422]
                          - generic [ref=e424]:
                            - generic [ref=e425]: 2 个学习单元
                            - generic [ref=e426]: 09-24 更新
                      - treeitem "例题与拓展练习" [level=7] [ref=e427]:
                        - generic [ref=e428]:
                          - button "移动例题与拓展练习" [ref=e429] [cursor=pointer]
                          - generic [ref=e431]: 作业
                          - generic "例题与拓展练习" [ref=e438]
                          - generic [ref=e440]:
                            - generic [ref=e441]: 已发布
                            - generic [ref=e442]: 09-24 更新
                      - treeitem "函数的连续性" [level=3] [ref=e443]:
                        - generic [ref=e444]:
                          - button "移动函数的连续性" [ref=e445] [cursor=pointer]
                          - generic [ref=e447]: 讲义
                          - generic "函数的连续性" [ref=e454]
                          - generic [ref=e456]:
                            - generic [ref=e457]: 已发布
                            - generic [ref=e458]: 09-24 更新
                      - treeitem "1.3 习题与应用" [level=2] [ref=e459]:
                        - generic [ref=e460]:
                          - button "移动1.3 习题与应用" [ref=e461] [cursor=pointer]
                          - generic [ref=e463]: 作业
                          - generic "1.3 习题与应用" [ref=e470]
                          - generic [ref=e472]:
                            - generic [ref=e473]: 已发布
                            - generic [ref=e474]: 09-24 更新
                      - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e475]:
                        - generic [ref=e476]:
                          - button "收起第二章 · 导数与微分" [expanded] [ref=e477] [cursor=pointer]
                          - button "移动第二章 · 导数与微分" [ref=e479] [cursor=pointer]
                          - generic "第二章 · 导数与微分" [ref=e484]
                          - generic [ref=e486]:
                            - generic [ref=e487]: 16 个学习单元
                            - generic [ref=e488]: 09-24 更新
                      - treeitem "2.1 导数的概念" [level=2] [ref=e489]:
                        - generic [ref=e490]:
                          - button "移动2.1 导数的概念" [ref=e491] [cursor=pointer]
                          - generic [ref=e493]: 讲义
                          - generic "2.1 导数的概念" [ref=e500]
                          - generic [ref=e502]:
                            - generic [ref=e503]: 已发布
                            - generic [ref=e504]: 09-24 更新
                      - treeitem "2.2 导数的应用" [level=2] [ref=e505]:
                        - generic [ref=e506]:
                          - button "移动2.2 导数的应用" [ref=e507] [cursor=pointer]
                          - generic [ref=e509]: 考试
                          - generic "2.2 导数的应用" [ref=e516]
                          - generic [ref=e518]:
                            - generic [ref=e519]: 已发布
                            - generic [ref=e520]: 09-24 更新
                      - generic [ref=e521]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                      - status [ref=e522]
              - generic [ref=e523]:
                - generic [ref=e524]: 公共资源的内容可供关联班级复用。
                - generic [ref=e525]: 模拟数据 · 未执行发布
  - generic [ref=e526]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
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
  166 |   await restore(root, 'global').click();
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
> 240 |     await page.getByRole('button', { name: '2026 秋 · 高等数学 200 班', exact: true }).click();
      |                                                                                  ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  267 |   const errors: string[] = [];
  268 |   page.on('pageerror', error => errors.push(error.message));
  269 |   await page.goto('/navigation-v042-w3-consumer.html');
  270 |   for (let cycle = 0; cycle < 3; cycle++) {
  271 |     await page.getByRole('radio', { name: '协作空间', exact: true }).locator('..').click();
  272 |     const root = page.locator('[data-recipe-id="recipe-navigation-r6"]');
  273 |     await restore(root, 'context').click();
  274 |     await restore(root, 'context').click();
  275 |     await page.getByRole('radio', { name: '课堂回放', exact: true }).locator('..').click();
  276 |     const replay = page.locator('[data-recipe-id="recipe-navigation-r5"]');
  277 |     await replay.getByRole('button', { name: '播放回放', exact: true }).click();
  278 |     await page.getByRole('radio', { name: '云盘', exact: true }).locator('..').click();
  279 |     await expect(page.locator('[data-rain-id="recipe-navigation-r3"]').first()).toBeVisible();
  280 |     await expect(page.locator('.rain-workspace__region[data-temporary="true"]')).toHaveCount(0);
  281 |   }
  282 |   expect(errors).toEqual([]);
  283 | });
  284 | 
  285 | test('N29 N27 same-label scopes retain separate IDs and drafts through removal, restoration and disabled results', async ({ page }) => {
  286 |   await page.goto('/navigation-v042-w6-consumer.html#E1');
  287 |   const root = page.locator('[data-rain-id="local-navigation-w6-e1"]');
  288 |   const more = root.getByRole('button', { name: '更多班级', exact: true });
  289 |   const choose = async (index: number, id: string) => {
  290 |     await more.click();
  291 |     await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('同名跨学院联合班');
  292 |     const results = page.getByRole('button', { name: '同名跨学院联合班', exact: true });
  293 |     await expect(results).toHaveCount(2);
  294 |     await results.nth(index).click();
  295 |     await expect(root).toHaveAttribute('data-scope-id', id);
  296 |   };
  297 |   await choose(0, 'class-199');
  298 |   const draft = root.getByRole('textbox', { name: '资源说明草稿', exact: true });
  299 |   await draft.fill('只属于199的说明');
  300 |   await choose(1, 'class-200'); await expect(draft).toHaveValue(''); await draft.fill('只属于200的说明');
  301 |   await choose(0, 'class-199'); await expect(draft).toHaveValue('只属于199的说明');
  302 |   await choose(1, 'class-200'); await expect(draft).toHaveValue('只属于200的说明');
  303 |   await more.click();
  304 |   await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('238班');
  305 |   await expect(page.getByRole('button', { name: /238班/, exact: false })).toBeDisabled();
  306 |   await page.keyboard.press('Escape'); await expect(root).toHaveAttribute('data-scope-id', 'class-200');
  307 |   await root.getByRole('button', { name: '移除当前班级', exact: true }).click();
  308 |   await expect(root.getByText('当前范围已不可用，请重新选择。', { exact: true })).toBeVisible();
  309 |   await expect(root.locator('[role="tab"][aria-selected="true"]')).toHaveCount(0);
  310 |   await expect(root).toHaveAttribute('data-scope-id', 'class-200');
  311 |   await root.getByRole('button', { name: '恢复刚移除的班级', exact: true }).click();
  312 |   await expect(root.locator('[role="tab"][aria-selected="true"]')).toHaveCount(1);
  313 |   await expect(draft).toHaveValue('只属于200的说明');
  314 | });
  315 | 
  316 | test('N32 N28 R6 wide narrow wide derives layout without losing draft, region instance or font size', async ({ page }) => {
  317 |   const root = await open(page, 'R6', 1600);
  318 |   const fields = region(root, 'fields');
  319 |   const draft = root.getByRole('textbox', { name: '你希望我们改进的地方', exact: true });
  320 |   await draft.fill('宽度只改变可用布局');
  321 |   await draft.evaluate(element => element.setAttribute('data-w7-original-input', 'true'));
  322 |   const originalId = await fields.getAttribute('id');
  323 |   const font = await draft.evaluate(element => getComputedStyle(element).fontSize);
  324 |   await expect(fields).toBeVisible();
  325 |   await page.getByRole('combobox', { name: '画板宽度' }).selectOption('1200');
  326 |   await expect(fields).toBeHidden();
  327 |   await expect(root.locator('.nv5-adaptation')).toContainText('你的展开偏好未被覆盖');
  328 |   await page.getByRole('combobox', { name: '画板宽度' }).selectOption('1600');
  329 |   await expect(fields).toHaveAttribute('data-mode', 'expanded');
  330 |   await expect(fields).toBeVisible();
  331 |   expect(await fields.getAttribute('id')).toBe(originalId);
  332 |   await expect(draft).toHaveAttribute('data-w7-original-input', 'true');
  333 |   await expect(draft).toHaveValue('宽度只改变可用布局');
  334 |   expect(await draft.evaluate(element => getComputedStyle(element).fontSize)).toBe(font);
  335 | });
  336 | 
  337 | test('N36 accepted Review11 W3 exception retains gradient without a top accent for first middle last', async ({ page }) => {
  338 |   await open(page, 'White');
  339 |   const root = page.getByTestId('candidate-White');
  340 |   const tabs = root.getByRole('tab');
```