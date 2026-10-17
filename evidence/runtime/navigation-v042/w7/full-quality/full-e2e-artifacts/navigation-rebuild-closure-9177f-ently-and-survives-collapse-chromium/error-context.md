# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-rebuild-closure.spec.ts >> closure S06: inset clips rounded corners, scrolls independently and survives collapse
- Location: tests/e2e/navigation-rebuild-closure.spec.ts:22:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.boundingBox: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.nr-workspace')

```

# Page snapshot

```yaml
- main [ref=e3]:
  - region [ref=e4]:
    - paragraph [ref=e5]: Rain Classroom · Foundation Spike
    - heading "Rain Next Playground" [level=1] [ref=e6]
    - paragraph [ref=e7]: Day 3 Core UI 已完成本地实现和自动检查，现作为 B2 对照基线。 图标库继续复用；各组件人工验收与发布状态独立记录。
    - generic "当前阶段" [ref=e8]:
      - generic [ref=e10]: token-foundations-v1
      - strong [ref=e11]: 第 0/1 批 · 基础能力建设 · 视觉验收待确认
  - region [ref=e12]:
    - generic [ref=e13]:
      - generic [ref=e14]:
        - paragraph [ref=e15]: START HERE
        - heading "直接入口" [level=2] [ref=e16]
      - paragraph [ref=e17]: 使用普通链接进入当前可检查区域；本阶段不建立持久文档导航。
    - list [ref=e18]:
      - listitem [ref=e19]:
        - link "Foundations：查看 Token 目录、完整排版方案，以及字体、密度、Focus 与 Motion 使用规则。" [ref=e20] [cursor=pointer]:
          - /url: "#foundations"
          - generic [ref=e21]: 基础体系总入口
          - generic [ref=e22]: Foundations
          - generic [ref=e23]: 查看 Token 目录、完整排版方案，以及字体、密度、Focus 与 Motion 使用规则。
          - generic [ref=e24]: 查看范围
      - listitem [ref=e25]:
        - link "Components：检查 Button、Input、Select、Tabs、Dropdown/Popover、Tag/Badge 与 Surface/Card，查看完整组件用法。" [ref=e26] [cursor=pointer]:
          - /url: "#components"
          - generic [ref=e27]: 组件与组合入口
          - generic [ref=e28]: Components
          - generic [ref=e29]: 检查 Button、Input、Select、Tabs、Dropdown/Popover、Tag/Badge 与 Surface/Card，查看完整组件用法。
          - generic [ref=e30]: 查看范围
      - listitem [ref=e31]:
        - link "Benchmarks：四类真实业务切片已登记，目前仅提供验证入口。" [ref=e32] [cursor=pointer]:
          - /url: "#benchmarks"
          - generic [ref=e33]: 4 个已登记
          - generic [ref=e34]: Benchmarks
          - generic [ref=e35]: 四类真实业务切片已登记，目前仅提供验证入口。
          - generic [ref=e36]: 查看范围
      - listitem [ref=e37]:
        - link "Icons：按用途查找图标，查看默认选择、配色与使用示例。" [ref=e38] [cursor=pointer]:
          - /url: "#icons"
          - generic [ref=e39]: 雨课堂完整图标目录
          - generic [ref=e40]: Icons
          - generic [ref=e41]: 按用途查找图标，查看默认选择、配色与使用示例。
          - generic [ref=e42]: 查看范围
    - paragraph [ref=e43]:
      - link "Token 基础建设：颜色、排版、线条、圆角与间距" [ref=e44] [cursor=pointer]:
        - /url: "#token-foundations"
  - region [ref=e45]:
    - generic [ref=e46]:
      - generic [ref=e47]:
        - paragraph [ref=e48]: COMPONENTS
        - heading "组件范围" [level=2] [ref=e49]
      - paragraph [ref=e50]: 四个基础家族已完成本地实现和自动检查；点击 Components 可查看待人工验收的候选。
    - paragraph [ref=e51]:
      - link "Tree：基础、勾选与富内容的可运行候选" [ref=e52] [cursor=pointer]:
        - /url: "#tree"
      - link "ManageTree：草稿编辑与保存演示" [ref=e53] [cursor=pointer]:
        - /url: "#manage-tree"
  - region [ref=e54]:
    - generic [ref=e55]:
      - generic [ref=e56]:
        - paragraph [ref=e57]: 01 / 04
        - heading "Benchmark 入口" [level=2] [ref=e58]
      - paragraph [ref=e59]: 四类范围均已登记；实现、自动验证与 Human Gate 仍各自独立。
    - list [ref=e60]:
      - listitem [ref=e61]:
        - article [ref=e62]:
          - generic [ref=e63]: BM-A
          - generic [ref=e64]: Compact Data Management
          - generic [ref=e65]: 已完成
          - generic [ref=e66]: 2 条正式来源
      - listitem [ref=e67]:
        - article [ref=e68]:
          - generic [ref=e69]: BM-B
          - generic [ref=e70]: Default Large Form
          - generic [ref=e71]: 已完成
          - generic [ref=e72]: 1 条正式来源
      - listitem [ref=e73]:
        - article [ref=e74]:
          - generic [ref=e75]: BM-C
          - generic [ref=e76]: Complex Workbench
          - generic [ref=e77]: 已完成
          - generic [ref=e78]: 3 条正式来源
      - listitem [ref=e79]:
        - article [ref=e80]:
          - generic [ref=e81]: BM-D
          - generic [ref=e82]: Report / Key Data
          - generic [ref=e83]: 已完成
          - generic [ref=e84]: 2 条正式来源
```

# Test source

```ts
  1   | import { expect, test } from '@playwright/test';
  2   | 
  3   | const url = '/#token-first-g3?rebuild=1';
  4   | const evidence = 'evidence/runtime/navigation-rebuild-v03';
  5   | 
  6   | test('closure S04: keyboard and pointer follow the icon child destination', async ({ page }) => {
  7   |   for (const method of ['keyboard', 'pointer']) {
  8   |     await page.goto(`${url}&recipe=S04&page=exams`);
  9   |     const disclosure = page.getByRole('navigation', { name: '全局导航', exact: true }).getByRole('button', { name: '展开课程建设', exact: true });
  10  |     if (method === 'keyboard') { await disclosure.focus(); await page.keyboard.press('Enter'); }
  11  |     else await disclosure.click();
  12  |     const child = page.getByRole('navigation', { name: '课程建设子入口' }).getByRole('link', { name: '课程内容', exact: true });
  13  |     if (method === 'keyboard') { await child.focus(); await page.keyboard.press('Enter'); }
  14  |     else await child.click();
  15  |     await expect(page).toHaveURL(/scene=course/);
  16  |     await expect(page).toHaveURL(/page=course-content/);
  17  |     await expect(page.getByRole('heading', { name: '课程内容', exact: true })).toBeVisible();
  18  |   }
  19  |   await page.screenshot({ path: `${evidence}/closure-S04-child-destination.png` });
  20  | });
  21  | 
  22  | test('closure S06: inset clips rounded corners, scrolls independently and survives collapse', async ({ page }) => {
  23  |   await page.setViewportSize({ width: 1200, height: 650 });
  24  |   await page.goto(`${url}&recipe=S06&page=exams`);
  25  |   const workspace = page.locator('.nr-workspace');
  26  |   const main = page.locator('.nr-main-scroll');
  27  |   const head = page.locator('.nr-workspace-head');
> 28  |   const before = (await workspace.boundingBox())!;
      |                                   ^ Error: locator.boundingBox: Test timeout of 30000ms exceeded.
  29  |   const headBefore = (await head.boundingBox())!;
  30  |   await expect(page.locator('.nr-shell')).toHaveAttribute('data-relation', 'inset');
  31  |   const clip = await workspace.evaluate(el => {
  32  |     const rect = el.getBoundingClientRect();
  33  |     const style = getComputedStyle(el);
  34  |     return { radius: parseFloat(style.borderTopLeftRadius), overflow: style.overflow,
  35  |       topCornerClips: !el.contains(document.elementFromPoint(rect.left + 1, rect.top + 1)),
  36  |       bottomCornerClips: !el.contains(document.elementFromPoint(rect.right - 1, rect.bottom - 1)) };
  37  |   });
  38  |   expect(clip.radius).toBeGreaterThan(0); expect(clip.overflow).toBe('hidden');
  39  |   expect(clip.topCornerClips).toBe(true); expect(clip.bottomCornerClips).toBe(true);
  40  |   await main.evaluate(el => { el.scrollTop = el.scrollHeight; });
  41  |   expect(await main.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  42  |   expect(await head.boundingBox()).toEqual(headBefore);
  43  |   const scrollBox = (await main.boundingBox())!;
  44  |   expect(scrollBox.y).toBeGreaterThanOrEqual(headBefore.y + headBefore.height);
  45  |   expect(scrollBox.y + scrollBox.height).toBeLessThanOrEqual(before.y + before.height);
  46  |   await page.getByRole('button', { name: '收起全局导航', exact: true }).click();
  47  |   await expect(page.locator('.nr-shell')).toHaveAttribute('data-relation', 'inset');
  48  |   const collapsed = (await workspace.boundingBox())!;
  49  |   expect(collapsed.width).toBeGreaterThan(before.width); expect(collapsed.y).toBe(before.y);
  50  |   expect(collapsed.x + collapsed.width).toBeCloseTo(before.x + before.width);
  51  |   expect(await workspace.evaluate(el => getComputedStyle(el).overflow)).toBe('hidden');
  52  |   await page.getByRole('button', { name: '展开全局导航', exact: true }).click();
  53  |   expect(await workspace.boundingBox()).toEqual(before);
  54  |   await test.info().attach('inset-measurements', { body: JSON.stringify({ clip, before, collapsed, scrollBox }), contentType: 'application/json' });
  55  |   await page.screenshot({ path: `${evidence}/closure-S06-inset-scroll.png` });
  56  | });
  57  | 
  58  | test('closure E10: direct editor uses explicit fallback and directory expansion stays per scope', async ({ page }) => {
  59  |   await page.goto(`${url}&scene=course&recipe=C01&scope=package&count=1&unit=unit-source-01`);
  60  |   await expect(page.getByRole('textbox', { name: '单元内容' })).toBeEditable();
  61  |   const back = page.getByRole('link', { name: '返回课程内容', exact: true });
  62  |   const href = await back.getAttribute('href');
  63  |   expect(href).toContain('page=course-content'); expect(href).not.toContain('unit=unit-source');
  64  |   await back.click();
  65  |   await expect(page.getByRole('heading', { name: '课程内容', exact: true })).toBeVisible();
  66  |   await expect(page.getByLabel('当前教学范围')).toContainText('公共资源包');
  67  |   const group = page.getByRole('button', { name: /第一章\s+函数、极限与连续/ });
  68  |   await group.click(); await expect(group).toHaveAttribute('aria-expanded', 'false');
  69  |   await page.getByRole('button', { name: '高等数学 1 班 · 2026 秋季', exact: true }).click();
  70  |   await expect(group).toHaveAttribute('aria-expanded', 'true');
  71  |   await page.getByRole('button', { name: '编辑 本班拓展练习', exact: true }).click();
  72  |   await page.getByRole('textbox', { name: '单元内容' }).fill('本班本地草稿');
  73  |   await page.getByRole('link', { name: '返回课程内容', exact: true }).click();
  74  |   await expect(group).toHaveAttribute('aria-expanded', 'true');
  75  |   await expect(page.locator('.nr-unit-row[data-selected]')).toContainText('本班拓展练习');
  76  |   await page.getByRole('button', { name: '公共资源包', exact: true }).click();
  77  |   await expect(group).toHaveAttribute('aria-expanded', 'false');
  78  |   await expect(page.locator('.nr-unit-list')).toHaveCount(0);
  79  |   await group.click();
  80  |   await page.getByRole('button', { name: '编辑 极限的概念与计算', exact: true }).click();
  81  |   await page.getByRole('link', { name: '返回课程内容', exact: true }).click();
  82  |   await expect(group).toHaveAttribute('aria-expanded', 'true');
  83  |   await page.screenshot({ path: `${evidence}/closure-E10-fallback-expansion.png` });
  84  | });
  85  | 
  86  | test('closure S02: long-label stress fixture and trailing disclosure keep separate hit areas', async ({ page }) => {
  87  |   await page.setViewportSize({ width: 1200, height: 650 });
  88  |   await page.goto(`${url}&recipe=S02&page=exams`);
  89  |   const nav = page.getByRole('navigation', { name: '全局导航', exact: true });
  90  |   const parent = nav.getByRole('link', { name: '课程建设', exact: true });
  91  |   const row = parent.locator('..');
  92  |   // Text-only stress fixture on the rendered shared NavRow; styles, structure,
  93  |   // hit areas and handlers remain the actual candidate implementation.
  94  |   await parent.locator('.nr-label').evaluate(el => { el.textContent = '跨学院联合课程建设与教学资源质量管理的超长导航名称'; });
  95  |   const label = parent.locator('.nr-label');
  96  |   const action = row.locator('.nr-disclosure');
  97  |   const labelBox = (await label.boundingBox())!;
  98  |   const actionBox = (await action.boundingBox())!;
  99  |   const linkBox = (await parent.boundingBox())!;
  100 |   expect(labelBox.x + labelBox.width).toBeLessThanOrEqual(actionBox.x);
  101 |   expect(linkBox.x + linkBox.width).toBeLessThanOrEqual(actionBox.x);
  102 |   expect(actionBox.width).toBeGreaterThanOrEqual(24); expect(actionBox.height).toBeGreaterThanOrEqual(24);
  103 |   expect(await label.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
  104 |   const before = page.url(); const initial = await action.getAttribute('aria-expanded');
  105 |   await action.click(); expect(page.url()).toBe(before);
  106 |   await expect(action).toHaveAttribute('aria-expanded', initial === 'true' ? 'false' : 'true');
  107 |   await page.screenshot({ path: `${evidence}/closure-S02-long-action.png` });
  108 |   await parent.focus(); await page.keyboard.press('Enter'); await expect(page).toHaveURL(/page=courses/);
  109 | });
  110 | 
```