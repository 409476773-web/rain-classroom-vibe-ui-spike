# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w7.spec.ts >> N16 N17 N18 W7 matrix R2 accepted platform glyphs, palettes and account layout
- Location: tests/e2e/navigation-v042-w7.spec.ts:40:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 208
Received: 206.265625
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
      - button "收起平台导航" [expanded] [ref=e50] [cursor=pointer]
      - button "隐藏课程导航" [expanded] [ref=e52] [cursor=pointer]
      - generic [ref=e54]:
        - strong [ref=e55]: 高等数学 A · 课程内容
        - generic [ref=e56]: 公共资源包
      - button "布局" [ref=e57] [cursor=pointer]
      - button "专注内容" [ref=e59] [cursor=pointer]
    - generic [ref=e63]:
      - generic "平台导航" [ref=e65]:
        - navigation "平台导航" [ref=e66]:
          - generic [ref=e67]:
            - button "收起平台导航" [expanded] [active] [ref=e68] [cursor=pointer]
            - strong [ref=e73]: 雨课堂
          - generic [ref=e74]:
            - link "工作台" [ref=e75] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "课程" [ref=e79] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "资源" [ref=e83] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "专业" [ref=e87] [cursor=pointer]:
              - /url: "#navigation-v042"
          - generic [ref=e91]:
            - button "当前账户：林老师" [ref=e92] [cursor=pointer]:
              - generic [ref=e95]:
                - strong [ref=e96]: 林老师
                - generic [ref=e97]: 教师工作区
            - generic [ref=e98]:
              - button "通知" [ref=e99] [cursor=pointer]
              - button "帮助" [ref=e102] [cursor=pointer]
      - generic [ref=e105]:
        - generic "课程导航" [ref=e107]:
          - generic [ref=e108]:
            - strong [ref=e109]: 课程导航
            - button "取消固定，改为临时课程导航" [ref=e110] [cursor=pointer]
            - button "隐藏课程导航" [ref=e113] [cursor=pointer]
          - generic [ref=e116]:
            - button "返回我的课程" [ref=e117] [cursor=pointer]
            - generic [ref=e119]:
              - text: MATHEMATICS / 2026
              - strong [ref=e120]: 高等数学 A
              - generic [ref=e121]: ∫
            - heading "高等数学 A" [level=4] [ref=e122]
            - button "2026 秋季学期" [ref=e123] [cursor=pointer]
          - generic [ref=e125]: 教学空间
          - navigation "课程导航" [ref=e126]:
            - link "课程内容" [ref=e127] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "考核方案" [ref=e131] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "课程信息" [ref=e135] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "数据面板" [ref=e139] [cursor=pointer]:
              - /url: "#navigation-v042"
            - separator [ref=e143]
            - link "使用的班级 200" [ref=e144] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e147]:
                - generic [ref=e148]: 使用的班级
                - generic [ref=e149]: "200"
            - link "关联的 AI 课 2" [ref=e150] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e153]:
                - generic [ref=e154]: 关联的 AI 课
                - generic [ref=e155]: "2"
            - link "成员 12" [ref=e156] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e159]:
                - generic [ref=e160]: 成员
                - generic [ref=e161]: "12"
          - button "课程建设记录" [ref=e162] [cursor=pointer]
        - separator "调整课程导航宽度" [ref=e165]
        - generic [ref=e169]:
          - generic "分区导航" [ref=e171]:
            - generic [ref=e172]:
              - tablist "课程内容范围" [ref=e175]:
                - tab "公共资源包" [selected] [ref=e176] [cursor=pointer]:
                  - generic [ref=e180]:
                    - generic [ref=e181]: 公共内容 · 班级共用
                    - generic [ref=e182]: 公共资源包
                - tab "2026 秋 · 高等数学 1 班" [ref=e184] [cursor=pointer]:
                  - generic [ref=e188]:
                    - generic [ref=e189]: 教学班 · 2026 秋季学期
                    - generic [ref=e190]: 2026 秋 · 高等数学 1 班
                - tab "2026 秋 · 创新实验班" [ref=e192] [cursor=pointer]:
                  - generic [ref=e196]:
                    - generic [ref=e197]: 教学班 · 2026 秋季学期
                    - generic [ref=e198]: 2026 秋 · 创新实验班
                - tab "2026 秋 · 高等数学 3 班" [ref=e200] [cursor=pointer]:
                  - generic [ref=e204]:
                    - generic [ref=e205]: 教学班 · 2026 秋季学期
                    - generic [ref=e206]: 2026 秋 · 高等数学 3 班
              - button "更多班级" [ref=e209] [cursor=pointer]:
                - generic [ref=e211]: "197"
          - tabpanel "公共资源包" [ref=e215]:
            - generic [ref=e216]:
              - generic [ref=e217]:
                - navigation "面包屑" [ref=e219]:
                  - list [ref=e220]:
                    - listitem [ref=e221]:
                      - generic [ref=e222]: 课程内容
                    - listitem [ref=e223]:
                      - generic [ref=e224]: /
                      - generic [ref=e225]: 公共资源包
                - generic [ref=e226]:
                  - generic [ref=e227]:
                    - heading "知识点总览" [level=3] [ref=e228]
                    - paragraph [ref=e229]: 以知识点组织公共资源，在班级中安排教学。
                  - button "预览学生端" [ref=e231] [cursor=pointer]
              - generic [ref=e235]:
                - generic [ref=e236]:
                  - generic "已保存内容统计" [ref=e237]:
                    - generic [ref=e238]: 7 级结构
                    - generic [ref=e239]: 16 个内容节点
                    - generic [ref=e240]: 36 个学习单元
                  - radiogroup "内容类型" [ref=e242]:
                    - generic [ref=e244]:
                      - generic [ref=e245] [cursor=pointer]:
                        - radio "全部" [checked] [ref=e246]
                        - generic [ref=e247]: 全部
                      - generic [ref=e248] [cursor=pointer]:
                        - radio "作业" [ref=e249]
                        - generic [ref=e250]: 作业
                      - generic [ref=e251] [cursor=pointer]:
                        - radio "考试" [ref=e252]
                        - generic [ref=e253]: 考试
                - generic [ref=e254]:
                  - generic [ref=e255]:
                    - generic [ref=e256]: 编辑后请保存
                    - button "内容编辑说明" [ref=e257] [cursor=pointer]
                  - generic [ref=e260]:
                    - generic [ref=e261]:
                      - button "退出编辑" [ref=e262] [cursor=pointer]
                      - button "添加根节点" [ref=e264] [cursor=pointer]
                      - button "保存草稿" [ref=e266] [cursor=pointer]
                    - tree "课程内容编辑树" [ref=e268]:
                      - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e269]:
                        - generic [ref=e270]:
                          - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e271] [cursor=pointer]
                          - button "移动第一章 · 函数、极限与连续" [ref=e273] [cursor=pointer]
                          - generic "第一章 · 函数、极限与连续" [ref=e278]
                          - generic [ref=e280]:
                            - generic [ref=e281]: 20 个学习单元
                            - generic [ref=e282]: 09-24 更新
                      - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e283]:
                        - generic [ref=e284]:
                          - button "收起1.1 函数的基本概念" [expanded] [ref=e285] [cursor=pointer]
                          - button "移动1.1 函数的基本概念" [ref=e287] [cursor=pointer]
                          - generic "1.1 函数的基本概念" [ref=e292]
                          - generic [ref=e294]:
                            - generic [ref=e295]: 6 个学习单元
                            - generic [ref=e296]: 09-24 更新
                      - treeitem "函数的定义与表示" [level=3] [ref=e297]:
                        - generic [ref=e298]:
                          - button "移动函数的定义与表示" [ref=e299] [cursor=pointer]
                          - generic [ref=e301]: 讲义
                          - generic "函数的定义与表示" [ref=e308]
                          - generic [ref=e310]:
                            - generic [ref=e311]: 已发布
                            - generic [ref=e312]: 09-24 更新
                      - treeitem "函数的性质" [level=3] [ref=e313]:
                        - generic [ref=e314]:
                          - button "移动函数的性质" [ref=e315] [cursor=pointer]
                          - generic [ref=e317]: 视频
                          - generic "函数的性质" [ref=e324]
                          - generic [ref=e326]:
                            - generic [ref=e327]: 已发布
                            - generic [ref=e328]: 09-24 更新
                      - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e329]:
                        - generic [ref=e330]:
                          - button "收起1.2 极限与连续" [expanded] [ref=e331] [cursor=pointer]
                          - button "移动1.2 极限与连续" [ref=e333] [cursor=pointer]
                          - generic "1.2 极限与连续" [ref=e338]
                          - generic [ref=e340]:
                            - generic [ref=e341]: 8 个学习单元
                            - generic [ref=e342]: 09-24 更新
                      - treeitem "数列极限" [expanded] [level=3] [ref=e343]:
                        - generic [ref=e344]:
                          - button "收起数列极限" [expanded] [ref=e345] [cursor=pointer]
                          - button "移动数列极限" [ref=e347] [cursor=pointer]
                          - generic "数列极限" [ref=e352]
                          - generic [ref=e354]:
                            - generic [ref=e355]: 3 个学习单元
                            - generic [ref=e356]: 09-24 更新
                      - treeitem "极限的定义" [level=4] [ref=e357]:
                        - generic [ref=e358]:
                          - button "移动极限的定义" [ref=e359] [cursor=pointer]
                          - generic [ref=e361]: 讲义
                          - generic "极限的定义" [ref=e368]
                          - generic [ref=e370]:
                            - generic [ref=e371]: 已发布
                            - generic [ref=e372]: 09-24 更新
                      - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e373]:
                        - generic [ref=e374]:
                          - button "收起收敛性与极限运算" [expanded] [ref=e375] [cursor=pointer]
                          - button "移动收敛性与极限运算" [ref=e377] [cursor=pointer]
                          - generic "收敛性与极限运算" [ref=e382]
                          - generic [ref=e384]:
                            - generic [ref=e385]: 2 个学习单元
                            - generic [ref=e386]: 09-24 更新
                      - treeitem "两个重要极限" [expanded] [level=5] [ref=e387]:
                        - generic [ref=e388]:
                          - button "收起两个重要极限" [expanded] [ref=e389] [cursor=pointer]
                          - button "移动两个重要极限" [ref=e391] [cursor=pointer]
                          - generic "两个重要极限" [ref=e396]
                          - generic [ref=e398]:
                            - generic [ref=e399]: 2 个学习单元
                            - generic [ref=e400]: 09-24 更新
                      - treeitem "常见题型与方法" [expanded] [level=6] [ref=e401]:
                        - generic [ref=e402]:
                          - button "收起常见题型与方法" [expanded] [ref=e403] [cursor=pointer]
                          - button "移动常见题型与方法" [ref=e405] [cursor=pointer]
                          - generic "常见题型与方法" [ref=e410]
                          - generic [ref=e412]:
                            - generic [ref=e413]: 2 个学习单元
                            - generic [ref=e414]: 09-24 更新
                      - treeitem "例题与拓展练习" [level=7] [ref=e415]:
                        - generic [ref=e416]:
                          - button "移动例题与拓展练习" [ref=e417] [cursor=pointer]
                          - generic [ref=e419]: 作业
                          - generic "例题与拓展练习" [ref=e426]
                          - generic [ref=e428]:
                            - generic [ref=e429]: 已发布
                            - generic [ref=e430]: 09-24 更新
                      - treeitem "函数的连续性" [level=3] [ref=e431]:
                        - generic [ref=e432]:
                          - button "移动函数的连续性" [ref=e433] [cursor=pointer]
                          - generic [ref=e435]: 讲义
                          - generic "函数的连续性" [ref=e442]
                          - generic [ref=e444]:
                            - generic [ref=e445]: 已发布
                            - generic [ref=e446]: 09-24 更新
                      - treeitem "1.3 习题与应用" [level=2] [ref=e447]:
                        - generic [ref=e448]:
                          - button "移动1.3 习题与应用" [ref=e449] [cursor=pointer]
                          - generic [ref=e451]: 作业
                          - generic "1.3 习题与应用" [ref=e458]
                          - generic [ref=e460]:
                            - generic [ref=e461]: 已发布
                            - generic [ref=e462]: 09-24 更新
                      - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e463]:
                        - generic [ref=e464]:
                          - button "收起第二章 · 导数与微分" [expanded] [ref=e465] [cursor=pointer]
                          - button "移动第二章 · 导数与微分" [ref=e467] [cursor=pointer]
                          - generic "第二章 · 导数与微分" [ref=e472]
                          - generic [ref=e474]:
                            - generic [ref=e475]: 16 个学习单元
                            - generic [ref=e476]: 09-24 更新
                      - treeitem "2.1 导数的概念" [level=2] [ref=e477]:
                        - generic [ref=e478]:
                          - button "移动2.1 导数的概念" [ref=e479] [cursor=pointer]
                          - generic [ref=e481]: 讲义
                          - generic "2.1 导数的概念" [ref=e488]
                          - generic [ref=e490]:
                            - generic [ref=e491]: 已发布
                            - generic [ref=e492]: 09-24 更新
                      - treeitem "2.2 导数的应用" [level=2] [ref=e493]:
                        - generic [ref=e494]:
                          - button "移动2.2 导数的应用" [ref=e495] [cursor=pointer]
                          - generic [ref=e497]: 考试
                          - generic "2.2 导数的应用" [ref=e504]
                          - generic [ref=e506]:
                            - generic [ref=e507]: 已发布
                            - generic [ref=e508]: 09-24 更新
                      - generic [ref=e509]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                      - status [ref=e510]
              - generic [ref=e511]:
                - generic [ref=e512]: 公共资源的内容可供关联班级复用。
                - generic [ref=e513]: 模拟数据 · 未执行发布
  - generic [ref=e514]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
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
> 51  |         expect((await shape(rail)).width).toBe(mode === 'expanded' ? 208 : 64);
      |                                           ^ Error: expect(received).toBe(expected) // Object.is equality
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
```