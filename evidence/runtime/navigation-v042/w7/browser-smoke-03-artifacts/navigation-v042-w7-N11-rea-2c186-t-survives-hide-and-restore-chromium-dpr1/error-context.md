# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w7.spec.ts >> N11 real wheel scroll in a constrained S2 host survives hide and restore
- Location: tests/e2e/navigation-v042-w7.spec.ts:80:1

# Error details

```
Error: locator.getAttribute: Error: strict mode violation: getByTestId('candidate-canvas').locator('.rain-workspace').first().locator('.rain-workspace__region[data-region-id="context"]').locator('[aria-selected="true"]') resolved to 2 elements:
    1) <button role="tab" tabindex="0" type="button" data-active="" data-slot="tab" data-part="tab" aria-label="学习目录" data-focus="item" id="base-ui-_r_m_" data-position="top" aria-selected="true" data-selected="true" aria-disabled="false" data-disabled="false" data-item-align="center" data-trigger-disabled="" data-orientation="horizontal" data-composite-item-active="" data-indicator-size="content" aria-controls="base-ui-_r_t_" data-activation-direction="none" class="rain-tabs__tab group/tabs h-rain-tabs-38">…</button> aka getByRole('tab', { name: '学习目录' })
    2) <div tabindex="0" aria-level="2" data-depth="1" role="treeitem" aria-setsize="3" data-slot="node" aria-posinset="2" aria-expanded="true" aria-selected="true" data-selected="true" aria-label="1.2 极限与连续" class="rain-tree-node" id="_r_u_-node-%5B%22string%22%2C%22limits%22%5D">…</div> aka getByRole('treeitem', { name: '1.2 极限与连续' })

Call log:
  - waiting for getByTestId('candidate-canvas').locator('.rain-workspace').first().locator('.rain-workspace__region[data-region-id="context"]').locator('[aria-selected="true"]')

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
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#S2
  - generic "R3 工作区" [ref=e47]:
    - generic "当前工作区与区域恢复" [ref=e48]:
      - generic "显示与隐藏区域" [ref=e49]:
        - button "展开平台导航" [ref=e50] [cursor=pointer]
        - button "隐藏资源目录" [expanded] [ref=e52] [cursor=pointer]
      - generic [ref=e55]:
        - strong [ref=e56]: 错题集 · 1.2 极限与连续
        - generic [ref=e57]: 当前范围不随目录隐藏改变
      - button "专注内容" [ref=e58] [cursor=pointer]
      - button "布局设置" [ref=e62] [cursor=pointer]:
        - generic [ref=e64]: 布局
    - generic [ref=e67]:
      - generic "平台导航" [ref=e69]:
        - generic [ref=e70]:
          - generic [ref=e71]:
            - strong [ref=e72]
            - button "展开平台导航" [ref=e74] [cursor=pointer]
          - navigation "平台功能" [ref=e77]:
            - list [ref=e78]:
              - listitem [ref=e79]:
                - link "工作台" [ref=e81] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e84]:
                - link "课程" [ref=e86] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e89]:
                - link "资源" [ref=e91] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e94]:
                - link "专业" [ref=e96] [cursor=pointer]:
                  - /url: "#navigation-v042"
          - generic [ref=e99]:
            - button "当前账户：林老师" [ref=e100] [cursor=pointer]
            - button "通知" [ref=e103] [cursor=pointer]
            - button "帮助" [ref=e105] [cursor=pointer]
      - generic [ref=e107]:
        - generic [ref=e108]:
          - generic [ref=e109]:
            - strong [ref=e112]: 我的资源
            - button "切换资源空间" [ref=e113] [cursor=pointer]
          - navigation "资源功能" [ref=e116]:
            - generic [ref=e117]:
              - link "云盘" [ref=e118] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "题库" [ref=e122] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "课件库" [ref=e126] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "试卷库" [ref=e130] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "问卷库" [ref=e134] [cursor=pointer]:
                - /url: "#navigation-v042"
          - button "成员" [ref=e139] [cursor=pointer]
        - generic [ref=e145]:
          - generic "资源目录" [ref=e147]:
            - heading [level=3] [ref=e148]:
              - text: 资源目录
              - generic [ref=e149]:
                - button "取消固定资源目录" [ref=e150] [cursor=pointer]
                - button "隐藏资源目录" [ref=e153] [cursor=pointer]
            - generic [ref=e156]:
              - heading "错题集" [level=4] [ref=e157]
              - paragraph [ref=e158]: 练习结果不影响原始成绩
            - generic [ref=e159]:
              - generic "分区导航" [ref=e160]:
                - tablist "目录内容" [ref=e164]:
                  - tab "学习目录" [selected] [ref=e165] [cursor=pointer]
                  - tab "学习日志" [ref=e169] [cursor=pointer]
              - tabpanel "学习目录" [ref=e174]:
                - tree "学习目录导航" [ref=e175]:
                  - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e176]:
                    - generic [ref=e177]:
                      - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e178] [cursor=pointer]
                      - generic "第一章 · 函数、极限与连续" [ref=e183]
                      - generic [ref=e184]: "20"
                  - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e185]:
                    - generic [ref=e186]:
                      - button "收起1.1 函数的基本概念" [expanded] [ref=e187] [cursor=pointer]
                      - generic "1.1 函数的基本概念" [ref=e192]
                      - generic [ref=e193]: "6"
                  - treeitem "函数的定义与表示" [level=3] [ref=e194]:
                    - generic [ref=e195]:
                      - generic [ref=e196]: 讲义
                      - generic "函数的定义与表示" [ref=e203]
                      - generic [ref=e204]: "2"
                  - treeitem "函数的性质" [level=3] [ref=e205]:
                    - generic [ref=e206]:
                      - generic [ref=e207]: 视频
                      - generic "函数的性质" [ref=e214]
                      - generic [ref=e215]: "4"
                  - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e216]:
                    - generic [ref=e217]:
                      - button "收起1.2 极限与连续" [expanded] [ref=e218] [cursor=pointer]
                      - generic "1.2 极限与连续" [ref=e223]
                      - generic [ref=e224]: "8"
                  - treeitem "数列极限" [expanded] [level=3] [ref=e225]:
                    - generic [ref=e226]:
                      - button "收起数列极限" [expanded] [ref=e227] [cursor=pointer]
                      - generic "数列极限" [ref=e232]
                      - generic [ref=e233]: "3"
                  - treeitem "极限的定义" [level=4] [ref=e234]:
                    - generic [ref=e235]:
                      - generic [ref=e236]: 讲义
                      - generic "极限的定义" [ref=e243]
                      - generic [ref=e244]: "1"
                  - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e245]:
                    - generic [ref=e246]:
                      - button "收起收敛性与极限运算" [expanded] [ref=e247] [cursor=pointer]
                      - generic "收敛性与极限运算" [ref=e252]
                      - generic [ref=e253]: "2"
                  - treeitem "两个重要极限" [expanded] [level=5] [ref=e254]:
                    - generic [ref=e255]:
                      - button "收起两个重要极限" [expanded] [ref=e256] [cursor=pointer]
                      - generic "两个重要极限" [ref=e261]
                      - generic [ref=e262]: "2"
                  - treeitem "常见题型与方法" [expanded] [level=6] [ref=e263]:
                    - generic [ref=e264]:
                      - button "收起常见题型与方法" [expanded] [ref=e265] [cursor=pointer]
                      - generic "常见题型与方法" [ref=e270]
                      - generic [ref=e271]: "2"
                  - treeitem "例题与拓展练习" [level=7] [ref=e272]:
                    - generic [ref=e273]:
                      - generic [ref=e274]: 作业
                      - generic "例题与拓展练习" [ref=e281]
                      - generic [ref=e282]: "2"
                  - treeitem "函数的连续性" [level=3] [ref=e283]:
                    - generic [ref=e284]:
                      - generic [ref=e285]: 讲义
                      - generic "函数的连续性" [ref=e292]
                      - generic [ref=e293]: "5"
                  - treeitem "1.3 习题与应用" [level=2] [ref=e294]:
                    - generic [ref=e295]:
                      - generic [ref=e296]: 作业
                      - generic "1.3 习题与应用" [ref=e303]
                      - generic [ref=e304]: "6"
                  - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e305]:
                    - generic [ref=e306]:
                      - button "收起第二章 · 导数与微分" [expanded] [ref=e307] [cursor=pointer]
                      - generic "第二章 · 导数与微分" [ref=e312]
                      - generic [ref=e313]: "16"
                  - treeitem "2.1 导数的概念" [level=2] [ref=e314]:
                    - generic [ref=e315]:
                      - generic [ref=e316]: 讲义
                      - generic "2.1 导数的概念" [ref=e323]
                      - generic [ref=e324]: "8"
                  - treeitem "2.2 导数的应用" [level=2] [ref=e325]:
                    - generic [ref=e326]:
                      - generic [ref=e327]: 考试
                      - generic "2.2 导数的应用" [ref=e334]
                      - generic [ref=e335]: "8"
                  - generic [ref=e336]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                  - status [ref=e337]
          - separator "调整资源目录宽度" [ref=e338]
          - generic [ref=e340]:
            - generic [ref=e341]:
              - generic "资源路径" [ref=e342]:
                - navigation "面包屑" [ref=e343]:
                  - list [ref=e344]:
                    - listitem [ref=e345]:
                      - generic [ref=e346]: 学习目录
                    - listitem [ref=e347]:
                      - generic [ref=e348]: /
                      - generic [ref=e349]: 第一章 · 函数、极限与连续
                    - listitem [ref=e350]:
                      - generic [ref=e351]: /
                      - generic [ref=e352]: 1.2 极限与连续
              - generic [ref=e353]:
                - generic [ref=e354]:
                  - heading "1.2 极限与连续" [level=3] [ref=e355]
                  - paragraph [ref=e356]: 基于当前知识范围整理练习状态。
                - button "开始练习" [ref=e357] [cursor=pointer]
            - generic [ref=e359]:
              - radiogroup "习题练习状态" [ref=e361]:
                - generic [ref=e363]:
                  - generic [ref=e364] [cursor=pointer]:
                    - radio "全部" [checked] [ref=e365]
                    - generic [ref=e366]: 全部
                    - generic [ref=e367]: "6"
                  - generic [ref=e368] [cursor=pointer]:
                    - radio "未练对" [ref=e369]
                    - generic [ref=e370]: 未练对
                    - generic [ref=e371]: "4"
                  - generic [ref=e372] [cursor=pointer]:
                    - radio "已练对" [ref=e373]
                    - generic [ref=e374]: 已练对
                    - generic [ref=e375]: "2"
                  - generic [ref=e376] [cursor=pointer]:
                    - radio "加星" [ref=e377]
                    - generic [ref=e378]: 加星
                    - generic [ref=e379]: "3"
              - generic [ref=e380]:
                - generic [ref=e381]: 当前范围 · 6 道示例习题
                - textbox "搜索习题内容" [ref=e385]
              - table "当前范围习题" [ref=e387]:
                - rowgroup [ref=e388]:
                  - row [ref=e389]:
                    - columnheader "序号" [ref=e390]
                    - columnheader "题型" [ref=e391]
                    - columnheader "习题内容" [ref=e392]
                    - columnheader "难度" [ref=e393]
                    - columnheader "来源" [ref=e394]
                    - columnheader "加星" [ref=e395]
                - rowgroup [ref=e396]:
                  - row [ref=e397]:
                    - cell "1" [ref=e398]
                    - cell "单选" [ref=e399]
                    - cell "若函数在某点可导，以下关于该点连续性的结论正确的是？" [ref=e403]
                    - cell "基础" [ref=e404]
                    - cell "试卷" [ref=e405]
                    - cell [ref=e409]:
                      - button "取消加星 · 第 1 题" [pressed] [ref=e410] [cursor=pointer]
                  - row [ref=e412]:
                    - cell "2" [ref=e413]
                    - cell "多选" [ref=e414]
                    - cell "下列关于极限运算法则的表述中，哪些条件是必要的？" [ref=e418]
                    - cell "中等" [ref=e419]
                    - cell "作业" [ref=e420]
                    - cell [ref=e424]:
                      - button "添加加星 · 第 2 题" [ref=e425] [cursor=pointer]
                  - row [ref=e427]:
                    - cell "3" [ref=e428]
                    - cell "判断" [ref=e429]
                    - cell "函数在某一点连续，则该函数在该点一定可导。" [ref=e433]
                    - cell "基础" [ref=e434]
                    - cell "课堂" [ref=e435]
                    - cell [ref=e439]:
                      - button "添加加星 · 第 3 题" [ref=e440] [cursor=pointer]
                  - row [ref=e442]:
                    - cell "4" [ref=e443]
                    - cell "单选" [ref=e444]
                    - cell "在下列区间中，函数满足闭区间上连续函数性质的是？" [ref=e448]
                    - cell "中等" [ref=e449]
                    - cell "试卷" [ref=e450]
                    - cell [ref=e454]:
                      - button "取消加星 · 第 4 题" [pressed] [ref=e455] [cursor=pointer]
                  - row [ref=e457]:
                    - cell "5" [ref=e458]
                    - cell "填空" [ref=e459]
                    - cell "根据导数的定义，写出给定函数在指定点的导数表达式。" [ref=e463]
                    - cell "提升" [ref=e464]
                    - cell "作业" [ref=e465]
                    - cell [ref=e469]:
                      - button "取消加星 · 第 5 题" [pressed] [ref=e470] [cursor=pointer]
                  - row [ref=e472]:
                    - cell "6" [ref=e473]
                    - cell "多选" [ref=e474]
                    - cell "以下哪些情形可以使用洛必达法则计算函数的极限？" [ref=e478]
                    - cell "中等" [ref=e479]
                    - cell "课堂" [ref=e480]
                    - cell [ref=e484]:
                      - button "添加加星 · 第 6 题" [ref=e485] [cursor=pointer]
              - generic [ref=e487]:
                - generic [ref=e488]: 状态筛选不等于内容页面层级
                - generic [ref=e489]: 1 · 单页演示数据
              - status [ref=e490]
  - generic [ref=e491]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
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
  10  | const restore = (root: Locator, id: string) => root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`);
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
  33  |   await page.getByRole('checkbox', { name: '悬停临时查看', exact: true }).check();
  34  |   await page.keyboard.press('Escape');
  35  | }
  36  | 
  37  | for (const sample of ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6']) {
  38  |   test(`N16 N17 N18 W7 matrix ${sample} accepted platform glyphs, palettes and account layout`, async ({ page }) => {
  39  |     const root = await open(page, sample, 1600);
  40  |     const rail = region(root, 'global');
  41  |     const expanded = async () => await rail.getAttribute('data-mode') === 'expanded' || await rail.getAttribute('data-temporary') === 'true';
  42  |     for (const inverse of [false, true]) {
  43  |       await page.getByRole('checkbox', { name: '深色外框', exact: true }).setChecked(inverse);
  44  |       for (const mode of ['expanded', 'compact']) {
  45  |         if (await expanded() !== (mode === 'expanded')) {
  46  |           await rail.getByRole('button', { name: mode === 'expanded' ? '展开平台导航' : await rail.getAttribute('data-temporary') === 'true' ? '关闭临时平台导航' : '收起平台导航', exact: true }).click();
  47  |         }
  48  |         await expect.poll(expanded).toBe(mode === 'expanded');
  49  |         expect((await shape(rail)).width).toBe(mode === 'expanded' ? 208 : 64);
  50  |         expect(await rail.evaluate(element => getComputedStyle(element).backgroundColor)).toBe(inverse ? 'rgb(37, 45, 67)' : 'rgb(232, 237, 248)');
  51  |         const links = rail.getByRole('link');
  52  |         expect(await links.count()).toBeGreaterThan(0);
  53  |         for (const link of await links.all()) {
  54  |           const glyph = link.locator('[data-rain-id="icon"]').first();
  55  |           const box = await shape(glyph);
  56  |           expect([box.width, box.height]).toEqual([18, 18]);
  57  |           if (mode === 'compact') {
  58  |             const row = await shape(link);
  59  |             expect(Math.abs(box.x + box.width / 2 - row.x - row.width / 2)).toBeLessThanOrEqual(1);
  60  |           }
  61  |         }
  62  |         const account = rail.getByRole('button', { name: '当前账户：林老师', exact: true });
  63  |         const notice = rail.getByRole('button', { name: '通知', exact: true });
  64  |         const help = rail.getByRole('button', { name: '帮助', exact: true });
  65  |         await expect(account.locator('[data-rain-id="ui-avatar"]')).toBeVisible();
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
> 89  |   const selected = await pane.locator('[aria-selected="true"]').getAttribute('id');
      |                                                                 ^ Error: locator.getAttribute: Error: strict mode violation: getByTestId('candidate-canvas').locator('.rain-workspace').first().locator('.rain-workspace__region[data-region-id="context"]').locator('[aria-selected="true"]') resolved to 2 elements:
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
```