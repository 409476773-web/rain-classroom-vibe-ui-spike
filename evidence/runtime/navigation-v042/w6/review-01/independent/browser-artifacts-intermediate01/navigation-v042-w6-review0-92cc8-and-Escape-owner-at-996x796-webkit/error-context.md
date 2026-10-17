# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w6-review01.spec.ts >> F01 E6 edge keyboard recovery and Escape owner at 996x796
- Location: tests/e2e/navigation-v042-w6-review01.spec.ts:348:1

# Error details

```
Error: Could not reach 展开评审面板 with Tab
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - strong [ref=e5]: Rain · 独立业务工作区
    - generic [ref=e6]: W6 消费试验 · 模拟数据与本地草稿
  - navigation "W6独立消费任务" [ref=e7]:
    - generic [ref=e8]:
      - link "课程资源" [ref=e9] [cursor=pointer]:
        - /url: "#E1"
      - link "课堂互动" [ref=e13] [cursor=pointer]:
        - /url: "#E2"
      - link "连续批改" [ref=e17] [cursor=pointer]:
        - /url: "#E3"
      - link "课堂回放" [ref=e21] [cursor=pointer]:
        - /url: "#E4"
      - link "实例隔离" [ref=e25] [cursor=pointer]:
        - /url: "#E5"
      - link "新建审阅台" [ref=e29] [cursor=pointer]:
        - /url: "#E6"
  - region "E6 新建审阅台" [ref=e33]:
    - region "学术资源评审工作台" [ref=e35]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e38]:
            - strong [ref=e39]: 学术资源评审
            - generic [ref=e40]: 演示数据 · Mock
          - generic [ref=e41]:
            - button "隐藏资源队列" [expanded] [ref=e42] [cursor=pointer]
            - button "显示评审面板" [ref=e43] [cursor=pointer]
            - button "专注阅读" [ref=e44] [cursor=pointer]
        - generic [ref=e46]:
          - button "展开评审面板" [ref=e47] [cursor=pointer]
          - generic "资源队列" [ref=e51]:
            - generic [ref=e52]:
              - heading "资源队列" [level=2] [ref=e53]
              - generic [ref=e54]: 8 份
            - textbox "筛选资源" [active] [ref=e57]:
              - /placeholder: 筛选名称、编号或类型
            - group "待评审学术资源" [ref=e59]:
              - list [ref=e60]:
                - listitem [ref=e61]:
                  - button "数字人文研究中的多模态史料整理、版本校勘与长期开放获取方案（修订稿）" [pressed] [ref=e63] [cursor=pointer]:
                    - generic [ref=e64]:
                      - generic [ref=e65]: 数字人文研究中的多模态史料整理、版本校勘与长期开放获取方案（修订稿）
                      - generic [ref=e66]:
                        - generic [ref=e67]:
                          - generic [ref=e68]: 研究工作论文
                          - generic [ref=e71]: 待评审
                        - generic [ref=e74]:
                          - generic [ref=e75]: R-042
                          - generic [ref=e76]: v2.1
                          - generic [ref=e77]: 24 页
                - listitem [ref=e78]:
                  - button "城市微气候观测数据的跨尺度校验、缺测处理与可复现分析流程说明" [ref=e80] [cursor=pointer]:
                    - generic [ref=e81]:
                      - generic [ref=e82]: 城市微气候观测数据的跨尺度校验、缺测处理与可复现分析流程说明
                      - generic [ref=e83]:
                        - generic [ref=e84]:
                          - generic [ref=e85]: 数据方法说明
                          - generic [ref=e88]: 待评审
                        - generic [ref=e91]:
                          - generic [ref=e92]: R-057
                          - generic [ref=e93]: v1.4
                          - generic [ref=e94]: 18 页
                - listitem [ref=e95]:
                  - button "地方档案开放利用中的元数据互操作规范与跨馆检索质量评估报告" [ref=e97] [cursor=pointer]:
                    - generic [ref=e98]:
                      - generic [ref=e99]: 地方档案开放利用中的元数据互操作规范与跨馆检索质量评估报告
                      - generic [ref=e100]:
                        - generic [ref=e101]:
                          - generic [ref=e102]: 评估报告
                          - generic [ref=e105]: 待评审
                        - generic [ref=e108]:
                          - generic [ref=e109]: R-063
                          - generic [ref=e110]: v3.0
                          - generic [ref=e111]: 36 页
                - listitem [ref=e112]:
                  - button "湿地生物多样性长期监测样线设计、样本标注与观测偏差控制手册" [ref=e114] [cursor=pointer]:
                    - generic [ref=e115]:
                      - generic [ref=e116]: 湿地生物多样性长期监测样线设计、样本标注与观测偏差控制手册
                      - generic [ref=e117]:
                        - generic [ref=e118]:
                          - generic [ref=e119]: 研究操作手册
                          - generic [ref=e122]: 待评审
                        - generic [ref=e125]:
                          - generic [ref=e126]: R-071
                          - generic [ref=e127]: v1.8
                          - generic [ref=e128]: 42 页
                - listitem [ref=e129]:
                  - button "面向低资源语言的语料清洗、标注一致性检验与公开发布伦理说明" [ref=e131] [cursor=pointer]:
                    - generic [ref=e132]:
                      - generic [ref=e133]: 面向低资源语言的语料清洗、标注一致性检验与公开发布伦理说明
                      - generic [ref=e134]:
                        - generic [ref=e135]:
                          - generic [ref=e136]: 语料规范
                          - generic [ref=e139]: 待评审
                        - generic [ref=e142]:
                          - generic [ref=e143]: R-086
                          - generic [ref=e144]: v2.3
                          - generic [ref=e145]: 27 页
                - listitem [ref=e146]:
                  - button "新型储能材料循环寿命实验的测试条件对齐与结果复核记录汇编" [ref=e148] [cursor=pointer]:
                    - generic [ref=e149]:
                      - generic [ref=e150]: 新型储能材料循环寿命实验的测试条件对齐与结果复核记录汇编
                      - generic [ref=e151]:
                        - generic [ref=e152]:
                          - generic [ref=e153]: 实验记录汇编
                          - generic [ref=e156]: 待评审
                        - generic [ref=e159]:
                          - generic [ref=e160]: R-092
                          - generic [ref=e161]: v1.2
                          - generic [ref=e162]: 33 页
                - listitem [ref=e163]:
                  - button "公共文化服务可达性研究：空间测量方法、调查口径与证据解释边界" [ref=e165] [cursor=pointer]:
                    - generic [ref=e166]:
                      - generic [ref=e167]: 公共文化服务可达性研究：空间测量方法、调查口径与证据解释边界
                      - generic [ref=e168]:
                        - generic [ref=e169]:
                          - generic [ref=e170]: 政策研究附件
                          - generic [ref=e173]: 待评审
                        - generic [ref=e176]:
                          - generic [ref=e177]: R-108
                          - generic [ref=e178]: v2.0
                          - generic [ref=e179]: 31 页
                - listitem [ref=e180]:
                  - button "科研软件环境依赖锁定、计算结果再现与长期维护交接清单（完整附录）" [ref=e182] [cursor=pointer]:
                    - generic [ref=e183]:
                      - generic [ref=e184]: 科研软件环境依赖锁定、计算结果再现与长期维护交接清单（完整附录）
                      - generic [ref=e185]:
                        - generic [ref=e186]:
                          - generic [ref=e187]: 技术附录
                          - generic [ref=e190]: 待评审
                        - generic [ref=e193]:
                          - generic [ref=e194]: R-119
                          - generic [ref=e195]: v4.1
                          - generic [ref=e196]: 22 页
            - paragraph [ref=e197]: 资源与评审记录均为脱敏示例。
          - separator "调整资源队列宽度" [ref=e198]
          - main "当前资源预览" [ref=e199]:
            - generic [ref=e200]:
              - generic [ref=e201]: 文档预览 · Mock
              - generic [ref=e202]:
                - button "上一份" [disabled] [ref=e203]
                - generic [ref=e205]: 1 / 8
                - button "下一份" [ref=e206] [cursor=pointer]
            - article [ref=e209]:
              - generic [ref=e210]: R-042 · 研究工作论文
              - heading "数字人文研究中的多模态史料整理、版本校勘与长期开放获取方案（修订稿）" [level=1] [ref=e211]
              - generic [ref=e212]:
                - generic [ref=e213]:
                  - term [ref=e214]: 资料来源
                  - definition [ref=e215]: 开放研究文库
                - generic [ref=e216]:
                  - term [ref=e217]: 提交版本
                  - definition [ref=e218]: v2.1
                - generic [ref=e219]:
                  - term [ref=e220]: 文件范围
                  - definition [ref=e221]: 24 页 · 文字预览示例
              - generic [ref=e222]:
                - heading "摘要与评审范围" [level=2] [ref=e223]
                - paragraph [ref=e224]: 本文讨论文字、图像与口述史料共同进入研究档案时的整理路径。研究将原始载体、转写文本与校勘说明分层记录，并保留可追溯的版本关联，便于后续研究者核查引用依据。
                - paragraph [ref=e225]: 本轮评审关注方法说明是否完整、证据能否追溯，以及资料版本与引用范围是否一致。预览内容为 Mock 文本，不代表真实上传文件或正式研究结论。
              - generic [ref=e226]:
                - heading "01 资料组织与方法说明" [level=2] [ref=e227]
                - paragraph [ref=e228]: 研究资料按来源、处理步骤和使用条件组织。原始记录与整理后的内容分别保留，对影响判断的转换给出说明；有争议的条目进入复核记录，不在汇总时直接抹平差异。
                - blockquote [ref=e229]: 核查重点：读者能否从当前版本找到原始依据，并理解资料在何种条件下支持本文的解释？
              - generic [ref=e230]:
                - heading "02 证据记录与复核路径" [level=2] [ref=e231]
                - table [ref=e232]:
                  - caption [ref=e233]: 表 1 · 证据索引示例（Mock）
                  - rowgroup [ref=e234]:
                    - row [ref=e235]:
                      - columnheader "记录范围" [ref=e236]
                      - columnheader "可追溯依据" [ref=e237]
                      - columnheader "复核提示" [ref=e238]
                  - rowgroup [ref=e239]:
                    - row [ref=e240]:
                      - cell "核心方法" [ref=e241]
                      - cell "R-042-M01 / 方法附件" [ref=e242]
                      - cell "补充处理前后示例" [ref=e243]
                    - row [ref=e244]:
                      - cell "结果说明" [ref=e245]
                      - cell "R-042-E02 / 证据目录" [ref=e246]
                      - cell "确认版本与引用一致" [ref=e247]
                - paragraph [ref=e248]: 复核时应把具体证据位置写入右侧意见，方便作者定位。缺少材料与材料之间出现冲突分别记录，避免用概括性的评价替代核查结论。
              - generic [ref=e249]:
                - heading "03 解释边界与开放使用" [level=2] [ref=e250]
                - paragraph [ref=e251]: 示例资料仅用于讨论当前范围内的方法和组织方式。后续使用需重新确认来源许可、版本关系与适用条件；本工作台没有连接真实发布或审批服务。
              - generic [ref=e252]: Mock 文字预览 · R-042 · v2.1
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | 
  3   | const widths = [1200, 1338, 1600] as const;
  4   | const firstResource = '数字人文研究中的多模态史料整理、版本校勘与长期开放获取方案（修订稿）';
  5   | const secondResource = '城市微气候观测数据的跨尺度校验、缺测处理与可复现分析流程说明';
  6   | 
  7   | async function open(page: Page, scene: string, width = 1338) {
  8   |   await page.setViewportSize({ width, height: 796 });
  9   |   await page.goto(`/navigation-v042-w6-consumer.html#${scene}`);
  10  |   const root = page.locator(`[data-scene="${scene}"]`);
  11  |   await expect(root).toBeVisible();
  12  |   await expect(page.locator('.w6-consumer')).toHaveAttribute('data-active-task', scene);
  13  |   return root;
  14  | }
  15  | 
  16  | function region(root: Locator, id: string) {
  17  |   return root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
  18  | }
  19  | 
  20  | async function screenshot(page: Page, name: string) {
  21  |   await page.screenshot({ path: test.info().outputPath(`${name}-${test.info().project.name}.png`), fullPage: false });
  22  | }
  23  | 
  24  | async function record(name: string, value: unknown) {
  25  |   await test.info().attach(name, { body: JSON.stringify(value, null, 2), contentType: 'application/json' });
  26  | }
  27  | 
  28  | async function compareGeometry(first: Locator, before: Awaited<ReturnType<Locator['boundingBox']>>) {
  29  |   const after = await first.boundingBox();
  30  |   expect(before).not.toBeNull();
  31  |   expect(after).not.toBeNull();
  32  |   for (const axis of ['x', 'y', 'width', 'height'] as const) {
  33  |     expect(Math.abs(after![axis] - before![axis]), axis).toBeLessThanOrEqual(1);
  34  |   }
  35  | }
  36  | 
  37  | async function tabTo(page: Page, target: Locator) {
  38  |   // Real Tab traversal; no element.focus() or DOM dispatch substitutes.
  39  |   await page.mouse.move(2, 2);
  40  |   for (let step = 0; step < 100; step += 1) {
  41  |     await page.keyboard.press('Tab');
  42  |     if (await target.evaluate(element => element === element.ownerDocument.activeElement)) return;
  43  |   }
> 44  |   throw new Error(`Could not reach ${await target.getAttribute('aria-label')} with Tab`);
      |         ^ Error: Could not reach 展开评审面板 with Tab
  45  | }
  46  | 
  47  | test.beforeEach(async ({ page }) => {
  48  |   const faults: string[] = [];
  49  |   page.on('pageerror', error => faults.push(`pageerror: ${error.message}`));
  50  |   page.on('response', response => {
  51  |     if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) faults.push(`HTTP ${response.status()}: ${response.url()}`);
  52  |   });
  53  |   // Attach observed faults after the assertion so a real failure retains its evidence.
  54  |   (page as Page & { review01Faults?: string[] }).review01Faults = faults;
  55  | });
  56  | 
  57  | test.afterEach(async ({ page }) => {
  58  |   const faults = (page as Page & { review01Faults?: string[] }).review01Faults ?? [];
  59  |   await record('browser-faults', faults);
  60  |   expect(faults, 'no runtime exception or missing served asset').toEqual([]);
  61  | });
  62  | 
  63  | for (const width of widths) {
  64  |   test(`C05-C06 E1 Token rail, pale metadata and vertical separators at ${width}`, async ({ page }) => {
  65  |     const root = await open(page, 'E1', width);
  66  |     // The nav row is transparent; its ConnectedSurface paints the visible rail.
  67  |     const track = root.locator('.rain-connected-surface').first();
  68  |     const descriptions = root.locator('.rain-navigation__description');
  69  |     await expect(descriptions.first()).toHaveText('所有教学班共享 | 12项资料');
  70  |     expect(await descriptions.allTextContents()).toEqual(expect.arrayContaining([expect.stringContaining(' | ')]));
  71  |     const facts = await track.evaluate(element => {
  72  |       const color = (value: string) => {
  73  |         const canvas = document.createElement('canvas');
  74  |         canvas.width = canvas.height = 1;
  75  |         const context = canvas.getContext('2d')!;
  76  |         context.fillStyle = value.trim();
  77  |         context.fillRect(0, 0, 1, 1);
  78  |         return [...context.getImageData(0, 0, 1, 1).data];
  79  |       };
  80  |       const css = getComputedStyle(element);
  81  |       const description = element.querySelector('.rain-navigation__description')!;
  82  |       return {
  83  |         background: css.backgroundColor,
  84  |         tokenBackground: css.getPropertyValue('--rain-category-background-neutral-2').trim(),
  85  |         backgroundPixels: color(css.backgroundColor),
  86  |         tokenBackgroundPixels: color(css.getPropertyValue('--rain-category-background-neutral-2')),
  87  |         metadata: getComputedStyle(description).color,
  88  |         tokenMetadata: css.getPropertyValue('--rain-category-text-neutral-6').trim(),
  89  |         metadataPixels: color(getComputedStyle(description).color),
  90  |         tokenMetadataPixels: color(css.getPropertyValue('--rain-category-text-neutral-6')),
  91  |         descriptionText: description.textContent,
  92  |       };
  93  |     });
  94  |     expect(facts.backgroundPixels).toEqual(facts.tokenBackgroundPixels);
  95  |     expect(facts.metadataPixels).toEqual(facts.tokenMetadataPixels);
  96  |     const types = root.locator('.w6-table [data-rain-id="ui-tag"]');
  97  |     await expect(types).toHaveCount(3);
  98  |     for (const tag of await types.all()) await expect(tag).toHaveAttribute('data-size', '20');
  99  |     const draft = root.getByRole('textbox', { name: '资源说明草稿' });
  100 |     await draft.fill('公共范围的复核草稿');
  101 |     await root.getByRole('button', { name: '更多班级', exact: true }).click();
  102 |     await page.getByRole('textbox', { name: '搜索范围' }).fill('237');
  103 |     await page.getByRole('button', { name: /跨学科项目课程.*237班/ }).click();
  104 |     await expect(root.getByRole('heading', { name: /237班资源/ })).toBeVisible();
  105 |     await draft.fill('237班的复核草稿');
  106 |     await root.getByRole('tab', { name: '公共资源包', exact: true }).click();
  107 |     await expect(draft).toHaveValue('公共范围的复核草稿');
  108 |     await record('E1-Token-facts', facts);
  109 |     await screenshot(page, `E1-${width}x796`);
  110 |   });
  111 | 
  112 |   test(`F06 E2 activity hierarchy differs from groups and selected ownership follows at ${width}`, async ({ page }) => {
  113 |     const root = await open(page, 'E2', width);
  114 |     const activities = region(root, 'activities');
  115 |     const groups = region(root, 'groups');
  116 |     await expect(activities.getByRole('heading', { name: '课堂内', exact: true })).toBeVisible();
  117 |     await expect(activities.getByRole('heading', { name: '课后', exact: true })).toBeVisible();
  118 |     const activityCards = activities.locator('[data-rain-id="ui-object-navigator"]');
  119 |     expect(await activityCards.count()).toBeGreaterThanOrEqual(2);
  120 |     for (const group of await activityCards.all()) await expect(group).toHaveAttribute('data-appearance', 'cards');
  121 |     await expect(groups.getByRole('group', { name: '小组对象', exact: true })).toHaveAttribute('data-appearance', 'queue');
  122 |     await activities.getByRole('button', { name: '课后反思', exact: true }).click();
  123 |     await groups.getByRole('button', { name: '第二研究组', exact: true }).click();
  124 |     await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-activity-id', 'reflection');
  125 |     await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-group-id', 'reflection-g2');
  126 |     await expect(root.getByRole('heading', { name: '第二研究组 · 课后反思' })).toBeVisible();
  127 |     await root.getByRole('textbox', { name: '课堂反馈草稿' }).fill('反思第二组独立反馈');
  128 |     await activities.getByRole('button', { name: '方案投票', exact: true }).click();
  129 |     await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-group-id', 'vote-g1');
  130 |     await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('');
  131 |     await activities.getByRole('button', { name: '课后反思', exact: true }).click();
  132 |     await groups.getByRole('button', { name: '第二研究组', exact: true }).click();
  133 |     await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('反思第二组独立反馈');
  134 |     const facts = await root.evaluate(element => {
  135 |       const style = (selector: string) => {
  136 |         const row = element.querySelector(selector)!;
  137 |         const css = getComputedStyle(row);
  138 |         return { borderRadius: css.borderRadius, padding: css.padding, background: css.backgroundColor, height: row.getBoundingClientRect().height };
  139 |       };
  140 |       return { activity: style('[data-region-id="activities"] .rain-navigation-family__row'), group: style('[data-region-id="groups"] .rain-navigation-family__row') };
  141 |     });
  142 |     expect(facts.activity).not.toEqual(facts.group);
  143 |     await record('E2-hierarchy-facts', facts);
  144 |     await screenshot(page, `E2-${width}x796`);
```