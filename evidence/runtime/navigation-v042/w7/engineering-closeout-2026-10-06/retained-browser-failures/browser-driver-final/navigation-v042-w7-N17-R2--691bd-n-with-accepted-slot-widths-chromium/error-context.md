# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w7.spec.ts >> N17 R2 brand stays mounted through real expand collapse motion with accepted slot widths
- Location: tests/e2e/navigation-v042-w7.spec.ts:83:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 64
Received: 63.96875
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
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | 
  3   | async function open(page: Page, sample: string, width = 1440) {
  4   |   await page.goto(`/?sample=${sample}#navigation-v042`);
  5   |   await expect(page.getByRole('heading', { name: '导航组件 · v0.4.2' })).toBeVisible();
  6   |   await page.getByRole('combobox', { name: '画板宽度' }).selectOption(String(width));
  7   |   return page.getByTestId('candidate-canvas').locator('.rain-workspace').first();
  8   | }
  9   | const region = (root: Locator, id: string) => root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
  10  | const restore = (root: Locator, id: string) => root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`).first();
  11  | const shape = (locator: Locator) => locator.evaluate(element => {
  12  |   const rect = element.getBoundingClientRect();
  13  |   return { x: rect.x + window.scrollX, y: rect.y + window.scrollY, width: rect.width, height: rect.height };
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
  33  |   const checkbox = page.getByRole('checkbox', { name: '悬停临时查看', exact: true });
  34  |   await checkbox.locator('..').click();
  35  |   await expect(checkbox).toBeChecked();
  36  |   await page.keyboard.press('Escape');
  37  | }
  38  | 
  39  | for (const sample of ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6']) {
  40  |   test(`N16 N17 N18 W7 matrix ${sample} accepted platform glyphs, palettes and account layout`, async ({ page }) => {
  41  |     const root = await open(page, sample, 1600);
  42  |     const rail = region(root, 'global');
  43  |     const expanded = async () => await rail.getAttribute('data-mode') === 'expanded' || await rail.getAttribute('data-temporary') === 'true';
  44  |     for (const inverse of [false, true]) {
  45  |       await page.getByRole('checkbox', { name: '深色外框', exact: true }).setChecked(inverse);
  46  |       for (const mode of ['expanded', 'compact']) {
  47  |         if (await expanded() !== (mode === 'expanded')) {
  48  |           await rail.getByRole('button', { name: mode === 'expanded' ? '展开平台导航' : await rail.getAttribute('data-temporary') === 'true' ? '关闭临时平台导航' : '收起平台导航', exact: true }).click();
  49  |         }
  50  |         await expect.poll(expanded).toBe(mode === 'expanded');
  51  |         await expect.poll(async () => (await shape(rail)).width).toBe(mode === 'expanded' ? 208 : 64);
  52  |         expect((await shape(rail)).width).toBe(mode === 'expanded' ? 208 : 64);
  53  |         expect(await rail.evaluate(element => getComputedStyle(element).backgroundColor)).toBe(inverse ? 'rgb(37, 45, 67)' : 'rgb(232, 237, 248)');
  54  |         const links = rail.getByRole('link');
  55  |         expect(await links.count()).toBeGreaterThan(0);
  56  |         for (const link of await links.all()) {
  57  |           const glyph = link.locator('[data-rain-id="icon"]').first();
  58  |           const box = await shape(glyph);
  59  |           expect([box.width, box.height]).toEqual([18, 18]);
  60  |           if (mode === 'compact') {
  61  |             const row = await shape(link);
  62  |             expect(Math.abs(box.x + box.width / 2 - row.x - row.width / 2)).toBeLessThanOrEqual(1);
  63  |           }
  64  |         }
  65  |         const account = rail.getByRole('button', { name: '当前账户：林老师', exact: true });
  66  |         const notice = rail.getByRole('button', { name: '通知', exact: true });
  67  |         const help = rail.getByRole('button', { name: '帮助', exact: true });
  68  |         await expect(account.locator('[data-rain-id="ui-avatar"]')).toBeVisible();
  69  |         const a = await shape(account), n = await shape(notice), h = await shape(help);
  70  |         if (mode === 'expanded') {
  71  |           expect(a.x + a.width).toBeLessThanOrEqual(n.x + 1); expect(n.x + n.width).toBeLessThanOrEqual(h.x + 1);
  72  |           const toggle = await shape(rail.getByRole('button', { name: '收起平台导航', exact: true }));
  73  |           const brand = await shape(rail.locator('.nv42-brand,.nv43-brand,.nv5-brand,.nv44-brand').first());
  74  |           expect(toggle.x).toBeGreaterThan(brand.x);
  75  |           expect(toggle.x + toggle.width).toBeLessThanOrEqual((await shape(rail)).x + 208);
  76  |         }
  77  |         else { expect(n.y + n.height).toBeLessThanOrEqual(h.y + 1); expect(h.y + h.height).toBeLessThanOrEqual(a.y + 1); }
  78  |       }
  79  |     }
  80  |   });
  81  | }
  82  | 
  83  | test('N17 R2 brand stays mounted through real expand collapse motion with accepted slot widths', async ({ page }) => {
  84  |   const root = await open(page, 'R2');
  85  |   await page.emulateMedia({ reducedMotion: 'no-preference' });
  86  |   const rail = region(root, 'global'), slot = root.locator('[data-region-slot="global"]');
  87  |   const brand = rail.locator('.nv42-brand strong');
  88  |   const original = await brand.elementHandle();
> 89  |   expect((await shape(slot)).width).toBe(64);
      |                                     ^ Error: expect(received).toBe(expected) // Object.is equality
  90  |   await rail.getByRole('button', { name: '展开平台导航', exact: true }).click();
  91  |   const widths = await slot.evaluate(async element => {
  92  |     const values: number[] = [], start = performance.now();
  93  |     while (performance.now() - start < 350) { await new Promise(requestAnimationFrame); values.push(element.getBoundingClientRect().width); }
  94  |     return values;
  95  |   });
  96  |   await expect.poll(async () => (await shape(slot)).width).toBe(208);
  97  |   expect(widths.filter(width => width > 64 && width < 208).length).toBeGreaterThan(2);
  98  |   expect(await brand.evaluate((element, previous) => element === previous, original)).toBe(true);
  99  |   await rail.getByRole('button', { name: '收起平台导航', exact: true }).click();
  100 |   await expect.poll(async () => (await shape(slot)).width).toBe(64);
  101 |   expect(await brand.evaluate((element, previous) => element === previous, original)).toBe(true);
  102 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  103 |   await expect(slot).toHaveCSS('transition-duration', '0s');
  104 | });
  105 | 
  106 | test('N11 real wheel scroll in a constrained S2 host survives hide and restore', async ({ page }) => {
  107 |   const root = await open(page, 'S2');
  108 |   const pane = region(root, 'context');
  109 |   // Host sizing is a test fixture only; the user path and saved scroll state remain real.
  110 |   await page.addStyleTag({ content: '.nv43-workspace .rain-workspace__region[data-region-id="context"]{height:160px!important;min-height:0!important;overflow:auto!important}' });
  111 |   await pane.hover();
  112 |   await page.mouse.wheel(0, 260);
  113 |   await expect.poll(() => pane.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  114 |   const before = await pane.evaluate(element => element.scrollTop);
  115 |   const selected = await pane.getByRole('treeitem', { selected: true }).getAttribute('id');
  116 |   expect(selected).toBeTruthy();
  117 |   await restore(root, 'context').click();
  118 |   await expect(pane).toBeHidden();
  119 |   await restore(root, 'context').click();
  120 |   await expect(pane).toBeVisible();
  121 |   expect(await pane.evaluate(element => element.scrollTop)).toBe(before);
  122 |   expect(await pane.getByRole('treeitem', { selected: true }).getAttribute('id')).toBe(selected);
  123 | });
  124 | 
  125 | test('N15 A2 selected and hovered queue rows retain a shared zero-gap boundary', async ({ page }) => {
  126 |   await open(page, 'A2');
  127 |   const queue = page.getByTestId('candidate-A2').getByRole('group', { name: '当前学生队列' });
  128 |   const entries = queue.locator('[data-slot="entry"]');
  129 |   for (const index of [0, 1, 2]) {
  130 |     await entries.nth(index).click();
  131 |     await entries.nth((index + 1) % await entries.count()).hover();
  132 |     const rows = await queue.locator('.rain-navigation-family__row').evaluateAll(elements => elements.map(element => { const rect = element.getBoundingClientRect(); return { top: rect.top, bottom: rect.bottom, height: rect.height }; }));
  133 |     rows.forEach(row => expect(row.height).toBe(76));
  134 |     rows.slice(1).forEach((row, rowIndex) => expect(row.top).toBe(rows[rowIndex]!.bottom));
  135 |   }
  136 | });
  137 | 
  138 | for (const sample of ['R2', 'R4', 'S3', 'S5']) test(`N20 N24 ${sample} accepted pale splitter retains pointer and keyboard targets`, async ({ page }) => {
  139 |   const root = await open(page, sample, 1200);
  140 |   const splitter = root.locator('.rain-workspace__splitter:not([hidden])').first();
  141 |   await splitter.scrollIntoViewIfNeeded();
  142 |   const paint = () => splitter.evaluate(element => ({ line: getComputedStyle(element, '::before').opacity, handle: getComputedStyle(element, '::after').opacity, width: element.getBoundingClientRect().width, value: Number(element.getAttribute('aria-valuenow')) }));
  143 |   await page.mouse.move(1790, 1090);
  144 |   const before = await paint();
  145 |   expect(before.line).toBe('0.4'); expect(before.handle).toBe('0'); expect(before.width).toBeGreaterThanOrEqual(5);
  146 |   await splitter.hover(); expect((await paint()).line).toBe('1');
  147 |   const box = await splitter.boundingBox();
  148 |   await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  149 |   await page.mouse.down(); await page.mouse.move(box!.x + box!.width / 2 + 18, box!.y + box!.height / 2, { steps: 3 }); await page.mouse.up();
  150 |   await splitter.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
  151 |   await expect(splitter).toBeFocused(); expect((await paint()).line).toBe('1');
  152 |   const width = (await paint()).value;
  153 |   await page.keyboard.press('ArrowRight');
  154 |   expect((await paint()).value).not.toBe(width);
  155 | });
  156 | 
  157 | test('N06 N04 hover bridges the entry and panel, Escape suppresses rebound, reentry remains usable', async ({ page }) => {
  158 |   const root = await open(page, 'S3');
  159 |   await setHover(page, root);
  160 |   const entry = restore(root, 'context'), pane = region(root, 'context');
  161 |   const content = root.locator('.nv5-document-views');
  162 |   const before = await shape(content);
  163 |   await entry.hover();
  164 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
  165 |   expect(await shape(content)).toEqual(before);
  166 |   await pane.getByRole('textbox', { name: '搜索工作区' }).hover();
  167 |   await expect(pane).toBeVisible();
  168 |   await page.keyboard.press('Escape');
  169 |   await expect(pane).toBeHidden();
  170 |   await page.waitForTimeout(500); // Exceeds the documented 240ms open / 360ms close timers.
  171 |   await expect(pane).toBeHidden();
  172 |   await root.locator('.nv44-identity').hover();
  173 |   await entry.hover();
  174 |   await expect(pane).toHaveAttribute('data-temporary', 'true');
  175 | });
  176 | 
  177 | test('N07 queued hover cannot open a panel after switching S3 to S6', async ({ page }) => {
  178 |   const root = await open(page, 'S3');
  179 |   await setHover(page, root);
  180 |   await restore(root, 'context').hover();
  181 |   await page.getByRole('navigation', { name: '导航候选样本' }).getByRole('button', { name: 'S6', exact: true }).click();
  182 |   const replay = page.locator('[data-recipe-id="recipe-navigation-r5"]');
  183 |   await expect(replay).toBeVisible();
  184 |   await page.waitForTimeout(600);
  185 |   await expect(replay.locator('[data-temporary="true"]')).toHaveCount(0);
  186 |   await expect(replay).toHaveAttribute('data-focused', 'false');
  187 | });
  188 | 
  189 | test('N18 inverse temporary platform retains the account, native links, focus and close recovery', async ({ page }) => {
```