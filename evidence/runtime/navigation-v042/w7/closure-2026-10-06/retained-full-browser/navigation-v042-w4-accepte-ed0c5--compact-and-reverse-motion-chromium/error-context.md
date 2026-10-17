# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w4.spec.ts >> accepted R2 brand remains mounted through full, compact and reverse motion
- Location: tests/e2e/navigation-v042-w4.spec.ts:57:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 208
Received: 207.734375
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
                - tab "2026 秋 · 高等数学 3 班" [ref=e192] [cursor=pointer]:
                  - generic [ref=e196]:
                    - generic [ref=e197]: 教学班 · 2026 秋季学期
                    - generic [ref=e198]: 2026 秋 · 高等数学 3 班
              - button "更多班级" [ref=e201] [cursor=pointer]:
                - generic [ref=e203]: "197"
          - tabpanel "公共资源包" [ref=e207]:
            - generic [ref=e208]:
              - generic [ref=e209]:
                - navigation "面包屑" [ref=e211]:
                  - list [ref=e212]:
                    - listitem [ref=e213]:
                      - generic [ref=e214]: 课程内容
                    - listitem [ref=e215]:
                      - generic [ref=e216]: /
                      - generic [ref=e217]: 公共资源包
                - generic [ref=e218]:
                  - generic [ref=e219]:
                    - heading "知识点总览" [level=3] [ref=e220]
                    - paragraph [ref=e221]: 以知识点组织公共资源，在班级中安排教学。
                  - button "预览学生端" [ref=e223] [cursor=pointer]
              - generic [ref=e227]:
                - generic [ref=e228]:
                  - generic "已保存内容统计" [ref=e229]:
                    - generic [ref=e230]: 7 级结构
                    - generic [ref=e231]: 16 个内容节点
                    - generic [ref=e232]: 36 个学习单元
                  - radiogroup "内容类型" [ref=e234]:
                    - generic [ref=e236]:
                      - generic [ref=e237] [cursor=pointer]:
                        - radio "全部" [checked] [ref=e238]
                        - generic [ref=e239]: 全部
                      - generic [ref=e240] [cursor=pointer]:
                        - radio "作业" [ref=e241]
                        - generic [ref=e242]: 作业
                      - generic [ref=e243] [cursor=pointer]:
                        - radio "考试" [ref=e244]
                        - generic [ref=e245]: 考试
                - generic [ref=e246]:
                  - generic [ref=e247]:
                    - generic [ref=e248]: 编辑后请保存
                    - button "内容编辑说明" [ref=e249] [cursor=pointer]
                  - generic [ref=e252]:
                    - generic [ref=e253]:
                      - button "退出编辑" [ref=e254] [cursor=pointer]
                      - button "添加根节点" [ref=e256] [cursor=pointer]
                      - button "保存草稿" [ref=e258] [cursor=pointer]
                    - tree "课程内容编辑树" [ref=e260]:
                      - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e261]:
                        - generic [ref=e262]:
                          - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e263] [cursor=pointer]
                          - button "移动第一章 · 函数、极限与连续" [ref=e265] [cursor=pointer]
                          - generic "第一章 · 函数、极限与连续" [ref=e270]
                          - generic [ref=e272]:
                            - generic [ref=e273]: 20 个学习单元
                            - generic [ref=e274]: 09-24 更新
                      - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e275]:
                        - generic [ref=e276]:
                          - button "收起1.1 函数的基本概念" [expanded] [ref=e277] [cursor=pointer]
                          - button "移动1.1 函数的基本概念" [ref=e279] [cursor=pointer]
                          - generic "1.1 函数的基本概念" [ref=e284]
                          - generic [ref=e286]:
                            - generic [ref=e287]: 6 个学习单元
                            - generic [ref=e288]: 09-24 更新
                      - treeitem "函数的定义与表示" [level=3] [ref=e289]:
                        - generic [ref=e290]:
                          - button "移动函数的定义与表示" [ref=e291] [cursor=pointer]
                          - generic [ref=e293]: 讲义
                          - generic "函数的定义与表示" [ref=e300]
                          - generic [ref=e302]:
                            - generic [ref=e303]: 已发布
                            - generic [ref=e304]: 09-24 更新
                      - treeitem "函数的性质" [level=3] [ref=e305]:
                        - generic [ref=e306]:
                          - button "移动函数的性质" [ref=e307] [cursor=pointer]
                          - generic [ref=e309]: 视频
                          - generic "函数的性质" [ref=e316]
                          - generic [ref=e318]:
                            - generic [ref=e319]: 已发布
                            - generic [ref=e320]: 09-24 更新
                      - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e321]:
                        - generic [ref=e322]:
                          - button "收起1.2 极限与连续" [expanded] [ref=e323] [cursor=pointer]
                          - button "移动1.2 极限与连续" [ref=e325] [cursor=pointer]
                          - generic "1.2 极限与连续" [ref=e330]
                          - generic [ref=e332]:
                            - generic [ref=e333]: 8 个学习单元
                            - generic [ref=e334]: 09-24 更新
                      - treeitem "数列极限" [expanded] [level=3] [ref=e335]:
                        - generic [ref=e336]:
                          - button "收起数列极限" [expanded] [ref=e337] [cursor=pointer]
                          - button "移动数列极限" [ref=e339] [cursor=pointer]
                          - generic "数列极限" [ref=e344]
                          - generic [ref=e346]:
                            - generic [ref=e347]: 3 个学习单元
                            - generic [ref=e348]: 09-24 更新
                      - treeitem "极限的定义" [level=4] [ref=e349]:
                        - generic [ref=e350]:
                          - button "移动极限的定义" [ref=e351] [cursor=pointer]
                          - generic [ref=e353]: 讲义
                          - generic "极限的定义" [ref=e360]
                          - generic [ref=e362]:
                            - generic [ref=e363]: 已发布
                            - generic [ref=e364]: 09-24 更新
                      - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e365]:
                        - generic [ref=e366]:
                          - button "收起收敛性与极限运算" [expanded] [ref=e367] [cursor=pointer]
                          - button "移动收敛性与极限运算" [ref=e369] [cursor=pointer]
                          - generic "收敛性与极限运算" [ref=e374]
                          - generic [ref=e376]:
                            - generic [ref=e377]: 2 个学习单元
                            - generic [ref=e378]: 09-24 更新
                      - treeitem "两个重要极限" [expanded] [level=5] [ref=e379]:
                        - generic [ref=e380]:
                          - button "收起两个重要极限" [expanded] [ref=e381] [cursor=pointer]
                          - button "移动两个重要极限" [ref=e383] [cursor=pointer]
                          - generic "两个重要极限" [ref=e388]
                          - generic [ref=e390]:
                            - generic [ref=e391]: 2 个学习单元
                            - generic [ref=e392]: 09-24 更新
                      - treeitem "常见题型与方法" [expanded] [level=6] [ref=e393]:
                        - generic [ref=e394]:
                          - button "收起常见题型与方法" [expanded] [ref=e395] [cursor=pointer]
                          - button "移动常见题型与方法" [ref=e397] [cursor=pointer]
                          - generic "常见题型与方法" [ref=e402]
                          - generic [ref=e404]:
                            - generic [ref=e405]: 2 个学习单元
                            - generic [ref=e406]: 09-24 更新
                      - treeitem "例题与拓展练习" [level=7] [ref=e407]:
                        - generic [ref=e408]:
                          - button "移动例题与拓展练习" [ref=e409] [cursor=pointer]
                          - generic [ref=e411]: 作业
                          - generic "例题与拓展练习" [ref=e418]
                          - generic [ref=e420]:
                            - generic [ref=e421]: 已发布
                            - generic [ref=e422]: 09-24 更新
                      - treeitem "函数的连续性" [level=3] [ref=e423]:
                        - generic [ref=e424]:
                          - button "移动函数的连续性" [ref=e425] [cursor=pointer]
                          - generic [ref=e427]: 讲义
                          - generic "函数的连续性" [ref=e434]
                          - generic [ref=e436]:
                            - generic [ref=e437]: 已发布
                            - generic [ref=e438]: 09-24 更新
                      - treeitem "1.3 习题与应用" [level=2] [ref=e439]:
                        - generic [ref=e440]:
                          - button "移动1.3 习题与应用" [ref=e441] [cursor=pointer]
                          - generic [ref=e443]: 作业
                          - generic "1.3 习题与应用" [ref=e450]
                          - generic [ref=e452]:
                            - generic [ref=e453]: 已发布
                            - generic [ref=e454]: 09-24 更新
                      - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e455]:
                        - generic [ref=e456]:
                          - button "收起第二章 · 导数与微分" [expanded] [ref=e457] [cursor=pointer]
                          - button "移动第二章 · 导数与微分" [ref=e459] [cursor=pointer]
                          - generic "第二章 · 导数与微分" [ref=e464]
                          - generic [ref=e466]:
                            - generic [ref=e467]: 16 个学习单元
                            - generic [ref=e468]: 09-24 更新
                      - treeitem "2.1 导数的概念" [level=2] [ref=e469]:
                        - generic [ref=e470]:
                          - button "移动2.1 导数的概念" [ref=e471] [cursor=pointer]
                          - generic [ref=e473]: 讲义
                          - generic "2.1 导数的概念" [ref=e480]
                          - generic [ref=e482]:
                            - generic [ref=e483]: 已发布
                            - generic [ref=e484]: 09-24 更新
                      - treeitem "2.2 导数的应用" [level=2] [ref=e485]:
                        - generic [ref=e486]:
                          - button "移动2.2 导数的应用" [ref=e487] [cursor=pointer]
                          - generic [ref=e489]: 考试
                          - generic "2.2 导数的应用" [ref=e496]
                          - generic [ref=e498]:
                            - generic [ref=e499]: 已发布
                            - generic [ref=e500]: 09-24 更新
                      - generic [ref=e501]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                      - status [ref=e502]
              - generic [ref=e503]:
                - generic [ref=e504]: 公共资源的内容可供关联班级复用。
                - generic [ref=e505]: 模拟数据 · 未执行发布
  - generic [ref=e506]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import { expect, test, type Page } from '@playwright/test';
  2  | const open=async(page:Page,sample='R2')=>{await page.goto(`/?sample=${sample}#navigation-v042`);await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();};
  3  | const box=async(page:Page,selector:string)=>page.locator(selector).evaluate(element=>{const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
  4  | 
  5  | test('N01 all-hidden R2 has stable named keyboard recovery and untouched scope',async({page})=>{
  6  |   await open(page);const root=page.locator('.nv42-r2');
  7  |   await root.getByRole('button',{name:'布局',exact:true}).click();
  8  |   const menu=page.getByRole('dialog',{name:'R2 布局'});
  9  |   await menu.getByRole('checkbox',{name:'显示平台导航',exact:true}).uncheck();
  10 |   await menu.getByRole('checkbox',{name:'显示课程导航',exact:true}).uncheck();
  11 |   await page.keyboard.press('Escape');
  12 |   await expect(root.locator('.rain-workspace__region[data-region-id="global"]')).toBeHidden();await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();
  13 |   const restore=root.getByRole('button',{name:'恢复课程导航',exact:true});const controlled=await restore.getAttribute('aria-controls');
  14 |   await expect(page.locator(`[id="${controlled}"]`)).toHaveCount(1);
  15 |   await restore.focus();await page.keyboard.press('Enter');await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeVisible();
  16 |   await expect(root.getByRole('tab',{name:'公共资源包',exact:true})).toHaveAttribute('aria-selected','true');
  17 | });
  18 | test('N02 N03 temporary dismiss and the next controller complete on the first click',async({page})=>{
  19 |   await open(page);const root=page.locator('.nv42-r2');
  20 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  21 |   await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  22 |   await root.locator('.nv42-workspace-bar').getByRole('button',{name:'展开平台导航',exact:true}).click();
  23 |   await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();await expect(root.locator('.rain-workspace__region[data-region-id="global"]')).toHaveAttribute('data-mode','expanded');
  24 |   await root.getByRole('button',{name:'恢复课程导航',exact:true}).click();await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeVisible();
  25 | });
  26 | test('N05 temporary pin, unpin and outside preserve one region instance',async({page})=>{
  27 |   await open(page);const root=page.locator('.nv42-r2');const initial=await root.locator('.rain-workspace__region[data-region-id="context"]').getAttribute('id');
  28 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  29 |   const overlay=await box(page,'.nv42-main');
  30 |   await root.getByRole('button',{name:'固定课程导航',exact:true}).click();await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','false');
  31 |   expect((await box(page,'.nv42-main')).x-overlay.x).toBe(221);
  32 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  33 |   await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  34 |   await root.getByRole('button',{name:'预览学生端',exact:true}).click();
  35 |   await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();expect(await box(page,'.nv42-main')).toEqual(overlay);
  36 |   expect(await root.locator('.rain-workspace__region[data-region-id="context"]').getAttribute('id')).toBe(initial);
  37 | });
  38 | test('N26 nested semester popup consumes Escape before the temporary panel',async({page})=>{
  39 |   await open(page);const root=page.locator('.nv42-r2');
  40 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  41 |   await root.locator('.nv42-term').click();await expect(page.getByRole('menu')).toBeVisible();
  42 |   await page.keyboard.press('Escape');await expect(page.getByRole('menu')).toHaveCount(0);await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  43 |   await page.keyboard.press('Escape');await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();await expect(root.getByRole('button',{name:'恢复课程导航',exact:true})).toBeFocused();
  44 | });
  45 | test('N08 focus restores the hidden layout and an independent editor draft',async({page})=>{
  46 |   await page.goto('/navigation-v042-consumer.html');const text='布局切换保留的当前课程草稿';const draft=page.getByRole('textbox',{name:'教学目标草稿'});await draft.fill(text);
  47 |   await page.getByRole('button',{name:'隐藏课程导航',exact:true}).first().click();await page.getByRole('button',{name:'专注内容',exact:true}).click();await page.getByRole('button',{name:'退出专注',exact:true}).click();
  48 |   await expect(page.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();await expect(page.locator('.rain-workspace__region[data-region-id="global"]')).toHaveAttribute('data-mode','compact');await expect(draft).toHaveValue(text);
  49 | });
  50 | test('N24 splitter keys clamp width, Enter hides and keyboard restores',async({page})=>{
  51 |   await open(page,'R3');const root=page.locator('[data-rain-id="recipe-navigation-r3"]');const splitter=root.getByRole('separator',{name:'调整资源目录宽度'});
  52 |   await splitter.focus();await page.keyboard.press('Shift+ArrowRight');await expect(splitter).toHaveAttribute('aria-valuenow','248');
  53 |   await page.keyboard.press('Home');await expect(splitter).toHaveAttribute('aria-valuenow','180');await page.keyboard.press('End');await expect(splitter).toHaveAttribute('aria-valuenow','420');
  54 |   await page.keyboard.press('Enter');await expect(splitter).toBeHidden();await expect(root.getByRole('button',{name:'显示资源目录',exact:true})).toBeFocused();
  55 |   await page.keyboard.press('Enter');await expect(splitter).toBeVisible();await expect(splitter).toHaveAttribute('aria-valuenow','420');
  56 | });
  57 | test('accepted R2 brand remains mounted through full, compact and reverse motion',async({page})=>{
  58 |   await open(page);await page.emulateMedia({reducedMotion:'no-preference'});const rail=page.locator('.nv42-rail');
  59 |   const facts=await rail.evaluate(async element=>{const owner=element.closest('[data-region-id="global"]')!;const brand=element.querySelector('.nv42-brand strong')!;const control=()=>element.querySelector<HTMLButtonElement>('.nv42-rail-head button')!;const widths:number[]=[];control().click();const start=performance.now();while(performance.now()-start<350){await new Promise(requestAnimationFrame);widths.push(owner.getBoundingClientRect().width);}control().click();await new Promise(resolve=>setTimeout(resolve,350));return {same:brand===element.querySelector('.nv42-brand strong'),widths,final:owner.getBoundingClientRect().width};});
> 60 |   expect(facts.same).toBe(true);expect(facts.widths.at(-1)).toBe(208);expect(facts.widths.filter(width=>width>64&&width<208).length).toBeGreaterThan(2);expect(facts.final).toBe(64);
     |                                                             ^ Error: expect(received).toBe(expected) // Object.is equality
  61 |   await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.nv42-r2 [data-region-slot="global"]')).toHaveCSS('transition-duration','0s');
  62 | });
  63 | 
```