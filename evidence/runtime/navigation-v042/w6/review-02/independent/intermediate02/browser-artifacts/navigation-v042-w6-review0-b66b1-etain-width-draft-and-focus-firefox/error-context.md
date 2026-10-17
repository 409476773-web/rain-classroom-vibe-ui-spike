# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w6-review02.spec.ts >> R02 E2 996 hide and native keyboard recovery retain width, draft and focus
- Location: tests/e2e/navigation-v042-w6-review02.spec.ts:223:1

# Error details

```
Error: Native Tab traversal did not reach 显示课堂活动
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
  - region "E2 课堂互动" [ref=e33]:
    - generic [ref=e34]:
      - generic [ref=e35]:
        - strong [ref=e36]: 校园微气候项目 · 课堂互动
        - generic [ref=e37]:
          - button "显示课堂活动" [ref=e38] [cursor=pointer]
          - button "隐藏小组列表" [expanded] [ref=e39] [cursor=pointer]
          - button "进入专注" [ref=e40] [cursor=pointer]
      - generic [ref=e42]:
        - generic "小组列表" [ref=e44]:
          - generic [ref=e45]:
            - text: 查看提交
            - generic [ref=e46]:
              - heading "参与小组" [level=2] [ref=e47]
              - generic [ref=e48]: 3组
            - paragraph [ref=e49]: 证据分析讨论
          - group "小组对象" [ref=e50]:
            - list [ref=e51]:
              - listitem [ref=e52]:
                - button "第一研究组" [pressed] [ref=e54] [cursor=pointer]:
                  - generic [ref=e55]:
                    - generic [ref=e56]: 第一研究组
                    - generic [ref=e57]: 4位成员
                  - generic [ref=e58]: 8/10
                  - generic [ref=e59]: 已提交
              - listitem [ref=e63]:
                - button "第二研究组" [ref=e65] [cursor=pointer]:
                  - generic [ref=e66]:
                    - generic [ref=e67]: 第二研究组
                    - generic [ref=e68]: 5位成员
                  - generic [ref=e69]: 7/10
                  - generic [ref=e70]: 已提交
              - listitem [ref=e74]:
                - button "第三研究组" [ref=e76] [cursor=pointer]:
                  - generic [ref=e77]:
                    - generic [ref=e78]: 第三研究组
                    - generic [ref=e79]: 6位成员
                  - generic [ref=e80]: 6/10
                  - generic [ref=e81]: 已提交
        - separator "调整小组列表宽度" [ref=e85]
        - article [ref=e86]:
          - generic [ref=e87]:
            - generic [ref=e88]:
              - heading "第一研究组 · 证据分析讨论" [level=1] [ref=e89]
              - generic [ref=e90]: 已提交
            - generic [ref=e93]:
              - generic [ref=e94]: 课堂内活动
              - generic [ref=e97]:
                - generic [ref=e98]: 4位成员
                - generic [ref=e99]: 当前成绩 8/10
                - generic [ref=e100]: 模拟记录
          - generic [ref=e101]:
            - generic "分区导航" [ref=e102]:
              - tablist "小组详情内容" [ref=e106]:
                - tab "小组提交" [selected] [ref=e107] [cursor=pointer]
                - tab "小组成员" [ref=e111] [cursor=pointer]
            - tabpanel "小组提交" [ref=e116]:
              - generic [ref=e117]:
                - generic [ref=e118]:
                  - text: 小组观点
                  - heading "为什么广场午后更热？" [level=2] [ref=e119]
                  - paragraph [ref=e120]: 遮阴与地面材质共同影响局部微气候，增加树冠覆盖是值得验证的改善方向。
                - generic [ref=e121]:
                  - generic [ref=e122]:
                    - term [ref=e123]: 观察依据
                    - definition [ref=e124]: 我们比较了广场、林荫道与建筑阴影下的地表温度。三处样本在相同时间、相同高度采集，广场的地表温度持续较高。
                  - generic [ref=e125]:
                    - term [ref=e126]: 下一步验证
                    - definition [ref=e127]: 统一测量时间，补充风速与湿度记录，区分天气变化和场地本身的影响。
          - generic [ref=e128]:
            - generic [ref=e129]:
              - strong [ref=e130]: 教师反馈草稿
              - generic [ref=e131]: 仅当前小组
            - textbox "课堂反馈草稿" [active] [ref=e133]:
              - /placeholder: 结合小组提交与分工，记录具体的反馈建议
              - text: 996恢复前的反馈
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | 
  3   | const widths = [1200, 1343, 1600] as const;
  4   | async function open(page: Page, scene: string, width = 1343, height = 747) {
  5   |   await page.setViewportSize({ width, height });
  6   |   await page.goto(`/navigation-v042-w6-consumer.html#${scene}`);
  7   |   const root = page.locator(`[data-scene="${scene}"]`);
  8   |   await expect(root).toBeVisible();
  9   |   await expect(page.locator('.w6-consumer')).toHaveAttribute('data-active-task', scene);
  10  |   return root;
  11  | }
  12  | const region = (root: Locator, id: string) => root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
  13  | async function record(name: string, value: unknown) {
  14  |   await test.info().attach(name, { body: JSON.stringify(value, null, 2), contentType: 'application/json' });
  15  | }
  16  | async function screenshot(page: Page, name: string) {
  17  |   await page.screenshot({ path: test.info().outputPath(`${name}-${test.info().project.name}.png`), fullPage: false });
  18  | }
  19  | async function sameGeometry(target: Locator, before: Awaited<ReturnType<Locator['boundingBox']>>) {
  20  |   const after = await target.boundingBox();
  21  |   expect(before).not.toBeNull(); expect(after).not.toBeNull();
  22  |   for (const axis of ['x', 'y', 'width', 'height'] as const) expect(Math.abs(before![axis] - after![axis]), axis).toBeLessThanOrEqual(1);
  23  | }
  24  | async function title16x22(title: Locator) {
  25  |   const facts = await title.evaluate(element => {
  26  |     const css = getComputedStyle(element), box = element.getBoundingClientRect();
  27  |     return { fontSize: css.fontSize, lineHeight: css.lineHeight, height: box.height, width: box.width };
  28  |   });
  29  |   expect(facts.fontSize).toBe('16px'); expect(facts.lineHeight).toBe('22px'); expect(facts.height).toBe(22);
  30  |   return facts;
  31  | }
  32  | async function filledPaint(field: Locator) {
  33  |   await expect(field).toHaveAttribute('data-appearance', 'filled');
  34  |   const paint = await field.evaluate(element => {
  35  |     const css = getComputedStyle(element);
  36  |     const pixels = (value: string) => {
  37  |       const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
  38  |       const context = canvas.getContext('2d')!; context.fillStyle = value.trim(); context.fillRect(0, 0, 1, 1);
  39  |       return [...context.getImageData(0, 0, 1, 1).data];
  40  |     };
  41  |     return { background: css.backgroundColor, token: css.getPropertyValue('--rain-category-fill-neutral-solid-6').trim(),
  42  |       actual: pixels(css.backgroundColor), expected: pixels(css.getPropertyValue('--rain-category-fill-neutral-solid-6')) };
  43  |   });
  44  |   expect(paint.token).not.toBe(''); expect(paint.actual).toEqual(paint.expected); expect(paint.actual).not.toEqual([255, 255, 255, 255]);
  45  |   return paint;
  46  | }
  47  | async function tabTo(page: Page, target: Locator) {
  48  |   // Native all-controls traversal uses Option+Tab in macOS WebKit.
  49  |   const key = test.info().project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  50  |   await page.mouse.move(2, 2);
  51  |   for (let count = 0; count < 100; count++) {
  52  |     await page.keyboard.press(key);
  53  |     if (await target.evaluate(element => element === document.activeElement)) return;
  54  |   }
> 55  |   throw new Error(`Native ${key} traversal did not reach ${await target.getAttribute('aria-label')}`);
      |         ^ Error: Native Tab traversal did not reach 显示课堂活动
  56  | }
  57  | async function surfaceProfile(surface: Locator) {
  58  |   return surface.evaluate(element => {
  59  |     const frame = element.getBoundingClientRect();
  60  |     const panel = element.querySelector('.rain-connected-surface__panel')!.getBoundingClientRect();
  61  |     const selected = element.querySelector('[role="tab"][aria-selected="true"]')!.getBoundingClientRect();
  62  |     const path = element.querySelector<SVGPathElement>('.rain-connected-surface__union')!;
  63  |     const seam = panel.top - frame.top, left = selected.left - frame.left, right = selected.right - frame.left;
  64  |     const shoulder = parseFloat(getComputedStyle(element).getPropertyValue('--rain-local-cs-shoulder'));
  65  |     const s = Number.isFinite(shoulder) ? shoulder : 4;
  66  |     const point = (x: number, y: number) => path.isPointInFill(new DOMPoint(x, y));
  67  |     return { d: path.getAttribute('d'), fill: getComputedStyle(path).fill, track: getComputedStyle(element).backgroundColor,
  68  |       frame: { width: frame.width, height: frame.height }, seam, selected: { left, right, top: selected.top - frame.top, bottom: selected.bottom - frame.top },
  69  |       points: { insideTab: point((left + right) / 2, selected.top - frame.top + selected.height / 2),
  70  |         insidePanel: point(frame.width / 2, seam + 8), rightShoulder: point(right + s / 2, seam - 0.2),
  71  |         aboveRightShoulder: point(right + s / 2, seam - s - 1) } };
  72  |   });
  73  | }
  74  | async function controlledPanel(main: Locator, label: string) {
  75  |   // sharedContent mounts exactly the active panel; inactive tabs cannot control
  76  |   // absent panels. Check the real selected relationship after every switch.
  77  |   const tab = main.getByRole('tab', { name: label, exact: true });
  78  |   const panel = main.getByRole('tabpanel', { name: label, exact: true });
  79  |   await expect(tab).toHaveAttribute('aria-selected', 'true'); await expect(panel).toBeVisible();
  80  |   await expect(main.getByRole('tabpanel')).toHaveCount(1);
  81  |   await expect(tab).toHaveAttribute('aria-controls', (await panel.getAttribute('id'))!);
  82  |   return panel;
  83  | }
  84  | 
  85  | test.beforeEach(async ({ page }) => {
  86  |   const faults: string[] = [];
  87  |   page.on('pageerror', error => faults.push(`pageerror: ${error.message}`));
  88  |   page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) faults.push(`HTTP ${response.status()}: ${response.url()}`); });
  89  |   (page as Page & { review02Faults?: string[] }).review02Faults = faults;
  90  | });
  91  | test.afterEach(async ({ page }) => {
  92  |   const faults = (page as Page & { review02Faults?: string[] }).review02Faults ?? [];
  93  |   await record('browser-faults', faults); expect(faults, 'no runtime exception or missing served asset').toEqual([]);
  94  | });
  95  | 
  96  | for (const width of widths) {
  97  |   test(`R02-C07-C08-C10-C11 E2 compact hierarchy and filled feedback at ${width}x747`, async ({ page }) => {
  98  |     const root = await open(page, 'E2', width), main = root.getByTestId('interaction-identity');
  99  |     const title = await title16x22(main.getByRole('heading', { level: 1 }));
  100 |     const summary = main.locator('.w6-interaction-summary');
  101 |     const summaryBox = (await summary.boundingBox())!;
  102 |     expect(summaryBox.height, 'summary leaves first screen for reading').toBeLessThanOrEqual(100);
  103 |     const activities = region(root, 'activities'), groups = region(root, 'groups');
  104 |     await expect(activities.getByRole('heading', { name: '课堂内', exact: true })).toBeVisible();
  105 |     await expect(activities.getByRole('heading', { name: '课后', exact: true })).toBeVisible();
  106 |     await expect(groups.getByRole('group', { name: '小组对象', exact: true })).toHaveAttribute('data-appearance', 'queue');
  107 |     const cards = activities.getByRole('group', { name: '课堂内活动', exact: true }).getByRole('button');
  108 |     const boxes = await Promise.all((await cards.all()).map(card => card.boundingBox()));
  109 |     const panelBox = (await activities.boundingBox())!;
  110 |     expect(boxes).toHaveLength(2); expect(Math.abs(boxes[0]!.x - boxes[1]!.x)).toBeLessThanOrEqual(1);
  111 |     expect(boxes[1]!.y).toBeGreaterThanOrEqual(boxes[0]!.y + boxes[0]!.height);
  112 |     for (const box of boxes) { expect(box!.x).toBeGreaterThanOrEqual(panelBox.x); expect(box!.x + box!.width).toBeLessThanOrEqual(panelBox.x + panelBox.width); }
  113 |     const content = main.getByRole('tabpanel', { name: '小组提交', exact: true });
  114 |     await expect(content).toBeVisible(); expect((await content.boundingBox())!.y).toBeLessThan(summaryBox.y + 180);
  115 |     const feedback = main.locator('[data-rain-id="ui-textarea"]');
  116 |     await page.mouse.move(2, 2); const paint = await filledPaint(feedback);
  117 |     await record('E2-density-and-paint', { title, summaryBox, boxes, panelBox, paint });
  118 |     await screenshot(page, `E2-submission-${width}x747`);
  119 |   });
  120 | 
  121 |   test(`R02-C09 E2 complete members 4-5-6 with loaded portraits and stable IDs at ${width}x747`, async ({ page }) => {
  122 |     const root = await open(page, 'E2', width), main = root.getByTestId('interaction-identity');
  123 |     await main.getByRole('tab', { name: '小组成员', exact: true }).click();
  124 |     const sets: { group: number; ids: string[]; numbers: string[]; sources: string[] }[] = [];
  125 |     for (const [index, label] of ['第一研究组', '第二研究组', '第三研究组'].entries()) {
  126 |       await region(root, 'groups').getByRole('button', { name: label, exact: true }).click();
  127 |       await expect(main).toHaveAttribute('data-group-id', `discussion-g${index + 1}`);
  128 |       const panel = main.getByRole('tabpanel', { name: '小组成员', exact: true });
  129 |       const rows = panel.locator('[data-member-id]');
  130 |       await expect(rows).toHaveCount(4 + index);
  131 |       await expect(panel.locator('[data-rain-id="ui-avatar"]')).toHaveCount(4 + index);
  132 |       await expect(panel.locator('img[data-slot="portrait"]')).toHaveCount(4 + index);
  133 |       await expect.poll(() => panel.locator('img[data-slot="portrait"]').evaluateAll(elements => elements.every(element => element.getAttribute('data-ready') === 'true'))).toBe(true);
  134 |       await expect.poll(() => rows.evaluateAll(elements => elements.every(element => [...element.querySelectorAll<HTMLImageElement>('img')].every(img => img.complete && img.naturalWidth > 0)))).toBe(true);
  135 |       const members = await rows.evaluateAll(elements => elements.map(element => {
  136 |         const text = element.textContent ?? '';
  137 |         const avatar = element.querySelector('[data-rain-id="ui-avatar"]')!;
  138 |         const portraits = [...element.querySelectorAll<HTMLImageElement>('img')];
  139 |         return { id: element.getAttribute('data-member-id')!, number: element.getAttribute('data-student-number') ?? '', text,
  140 |           role: element.querySelector('[data-member-role]')?.textContent?.trim() ?? '', name: element.querySelector('strong')?.textContent?.trim() ?? '',
  141 |           size: avatar.getAttribute('data-size'), source: portraits.at(-1)!.currentSrc,
  142 |           box: { width: avatar.getBoundingClientRect().width, height: avatar.getBoundingClientRect().height } };
  143 |       }));
  144 |       expect(new Set(members.map(member => member.id)).size).toBe(4 + index);
  145 |       expect(new Set(members.map(member => member.number)).size).toBe(4 + index);
  146 |       for (const member of members) {
  147 |         expect(member.number).toMatch(/^\d{7,}$/);
  148 |         expect(member.role.length).toBeGreaterThan(0); expect(member.name.length).toBeGreaterThan(0);
  149 |         expect(['32', '40']).toContain(member.size); expect(member.box.width).toBe(Number(member.size)); expect(member.box.height).toBe(Number(member.size));
  150 |       }
  151 |       sets.push({ group: index + 1, ids: members.map(member => member.id), numbers: members.map(member => member.number), sources: members.map(member => member.source) });
  152 |       await record(`E2-group-${index + 1}-members`, members);
  153 |       await screenshot(page, `E2-members-${index + 1}-${width}x747`);
  154 |     }
  155 |     expect(new Set(sets.flatMap(set => set.ids)).size).toBe(15); expect(new Set(sets.flatMap(set => set.numbers)).size).toBe(15);
```