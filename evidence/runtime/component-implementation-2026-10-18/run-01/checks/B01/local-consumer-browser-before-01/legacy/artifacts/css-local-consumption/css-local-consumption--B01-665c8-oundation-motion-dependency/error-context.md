# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: css-local-consumption.spec.ts >> [B01-entry] bklit-validation loads its declared Foundation motion dependency
- Location: tests/e2e/css-local-consumption.spec.ts:63:4

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - paragraph [ref=e6]: RAIN NEXT / CHART STUDY 02
      - heading "Bklit × Rain" [level=1] [ref=e7]
      - paragraph [ref=e8]: 同一组数据，两种视觉语言。移动指针，感受原生交互与 Rain 配色。
    - link "查看 G2 实验 ↗" [ref=e9] [cursor=pointer]:
      - /url: /chart-validation.html
  - generic [ref=e10]:
    - navigation "图表样本" [ref=e11]:
      - link "趋势" [ref=e12] [cursor=pointer]:
        - /url: "#area"
      - link "组合" [ref=e13] [cursor=pointer]:
        - /url: "#composed"
      - link "流向" [ref=e14] [cursor=pointer]:
        - /url: "#sankey"
      - link "迷你图" [ref=e15] [cursor=pointer]:
        - /url: "#mini"
    - generic [ref=e16]:
      - generic [ref=e17]:
        - text: Rain 配色
        - combobox "Rain 配色" [ref=e18]:
          - option "蓝紫近邻" [selected]
          - option "多色类别"
          - option "蓝紫青实色"
      - button "更新数据" [ref=e19] [cursor=pointer]
      - button "重播入场" [ref=e21] [cursor=pointer]
  - status [ref=e23]: 示例数据 · 2026年9月 · 初始值
  - region [ref=e24]:
    - generic [ref=e25]:
      - generic [ref=e26]: "01"
      - generic [ref=e27]:
        - heading "趋势与面积" [level=2] [ref=e28]
        - paragraph [ref=e29]: 描边、渐变与聚焦层次；两条曲线使用同一人数尺度。
    - generic [ref=e30]:
      - article [ref=e31]:
        - generic [ref=e32]:
          - heading "Bklit 原生" [level=3] [ref=e34]
          - generic [ref=e35]: 原生配色与图形
        - group "Bklit 原生趋势与面积" [ref=e36]:
          - generic [ref=e37]:
            - generic:
              - generic:
                - generic: "0"
                - generic: "100"
                - generic: "200"
                - generic: "300"
                - generic: "400"
            - generic:
              - generic: Sep 1
              - generic: Sep 11
              - generic: Sep 21
              - generic: Sep 30
          - generic [ref=e53]:
            - generic [ref=e54] [cursor=pointer]: 参与人数
            - generic [ref=e58] [cursor=pointer]: 完成人数
      - article [ref=e62]:
        - generic [ref=e63]:
          - heading "Rain 主题" [level=3] [ref=e65]
          - generic [ref=e66]: Rain 配色与字体
        - group "Rain 主题趋势与面积" [ref=e67]:
          - generic [ref=e68]:
            - generic:
              - generic:
                - generic: "0"
                - generic: "100"
                - generic: "200"
                - generic: "300"
                - generic: "400"
            - generic:
              - generic: Sep 1
              - generic: Sep 11
              - generic: Sep 21
              - generic: Sep 30
          - generic [ref=e84]:
            - button "参与人数" [ref=e85] [cursor=pointer]
            - button "完成人数" [ref=e89] [cursor=pointer]
    - group [ref=e93]:
      - generic "查看精确数据" [ref=e94] [cursor=pointer]
  - region [ref=e95]:
    - generic [ref=e96]:
      - generic [ref=e97]: "02"
      - generic [ref=e98]:
        - heading "柱、线与面积组合" [level=2] [ref=e99]
        - paragraph [ref=e100]: 左轴为人数，右轴为完成率。面积、柱与曲线共享日期定位。
    - generic [ref=e101]:
      - article [ref=e102]:
        - generic [ref=e103]:
          - heading "Bklit 原生" [level=3] [ref=e105]
          - generic [ref=e106]: 原生配色与图形
        - group "Bklit 原生柱、线与面积组合" [ref=e107]:
          - generic [ref=e108]:
            - generic:
              - generic:
                - generic: "0"
                - generic: "100"
                - generic: "200"
                - generic: "300"
                - generic: "400"
            - generic:
              - generic:
                - generic: 0%
                - generic: 20%
                - generic: 40%
                - generic: 60%
                - generic: 80%
                - generic: 100%
            - generic:
              - generic: Sep 1
              - generic: Sep 11
              - generic: Sep 21
              - generic: Sep 30
          - generic [ref=e134]:
            - generic [ref=e135] [cursor=pointer]: 参与人数 · 人
            - generic [ref=e139] [cursor=pointer]: 完成人数 · 人
            - generic [ref=e143] [cursor=pointer]: 完成率 · %
      - article [ref=e147]:
        - generic [ref=e148]:
          - heading "Rain 主题" [level=3] [ref=e150]
          - generic [ref=e151]: Rain 配色与字体
        - group "Rain 主题柱、线与面积组合" [ref=e152]:
          - generic [ref=e153]:
            - generic:
              - generic:
                - generic: "0"
                - generic: "100"
                - generic: "200"
                - generic: "300"
                - generic: "400"
            - generic:
              - generic:
                - generic: 0%
                - generic: 20%
                - generic: 40%
                - generic: 60%
                - generic: 80%
                - generic: 100%
            - generic:
              - generic: Sep 1
              - generic: Sep 11
              - generic: Sep 21
              - generic: Sep 30
          - generic [ref=e179]:
            - button "参与人数 · 人" [ref=e180] [cursor=pointer]
            - button "完成人数 · 人" [ref=e184] [cursor=pointer]
            - button "完成率 · %" [ref=e188] [cursor=pointer]
    - group [ref=e192]:
      - generic "查看精确数据" [ref=e193] [cursor=pointer]
  - region [ref=e194]:
    - generic [ref=e195]:
      - generic [ref=e196]: "03"
      - generic [ref=e197]:
        - heading "学习流向" [level=2] [ref=e198]
        - paragraph [ref=e199]: 路径宽度表示人次；悬停节点或路径，查看来源与去向。
    - generic [ref=e200]:
      - article [ref=e201]:
        - generic [ref=e202]:
          - heading "Bklit 原生" [level=3] [ref=e204]
          - generic [ref=e205]: 原生配色与图形
        - group "Bklit 原生学习流向" [ref=e206]:
          - img [ref=e210]:
            - generic [ref=e211]:
              - generic [ref=e212]:
                - generic [ref=e213] [cursor=pointer]
                - generic [ref=e214] [cursor=pointer]
                - generic [ref=e215] [cursor=pointer]
                - generic [ref=e216] [cursor=pointer]
              - generic [ref=e217]:
                - generic [ref=e218] [cursor=pointer]: 课程入口
                - generic [ref=e222] [cursor=pointer]: 学习提醒
                - generic [ref=e226] [cursor=pointer]: 观看视频
                - generic [ref=e230] [cursor=pointer]: 阅读资料
                - generic [ref=e234] [cursor=pointer]: 完成学习
                - generic [ref=e237] [cursor=pointer]: 继续学习
      - article [ref=e240]:
        - generic [ref=e241]:
          - heading "Rain 主题" [level=3] [ref=e243]
          - generic [ref=e244]: Rain 配色与字体
        - group "Rain 主题学习流向" [ref=e245]:
          - img [ref=e249]:
            - generic [ref=e250]:
              - generic [ref=e251]:
                - generic [ref=e252] [cursor=pointer]
                - generic [ref=e253] [cursor=pointer]
                - generic [ref=e254] [cursor=pointer]
                - generic [ref=e255] [cursor=pointer]
              - generic [ref=e256]:
                - generic [ref=e257] [cursor=pointer]: 课程入口
                - generic [ref=e261] [cursor=pointer]: 学习提醒
                - generic [ref=e265] [cursor=pointer]: 观看视频
                - generic [ref=e269] [cursor=pointer]: 阅读资料
                - generic [ref=e273] [cursor=pointer]: 完成学习
                - generic [ref=e276] [cursor=pointer]: 继续学习
    - group [ref=e279]:
      - generic "查看精确数据" [ref=e280] [cursor=pointer]
  - region [ref=e281]:
    - generic [ref=e282]:
      - generic [ref=e283]: "04"
      - generic [ref=e284]:
        - heading "指标中的迷你趋势" [level=2] [ref=e285]
        - paragraph [ref=e286]: 96 × 40 的紧凑图形，保留细线、轻面积和精确读取。
    - generic [ref=e287]:
      - article [ref=e288]:
        - generic [ref=e289]:
          - heading "Bklit 原生" [level=3] [ref=e291]
          - generic [ref=e292]: 原生配色与图形
        - group "Bklit 原生指标中的迷你趋势" [ref=e293]:
          - generic [ref=e294]:
            - generic [ref=e295]:
              - text: 今日参与
              - paragraph [ref=e296]:
                - strong [ref=e297]: "378"
                - generic [ref=e298]: 人
            - generic "近30天参与人数迷你趋势" [ref=e299]
      - article [ref=e310]:
        - generic [ref=e311]:
          - heading "Rain 主题" [level=3] [ref=e313]
          - generic [ref=e314]: Rain 配色与字体
        - group "Rain 主题指标中的迷你趋势" [ref=e315]:
          - generic [ref=e316]:
            - generic [ref=e317]:
              - text: 今日参与
              - paragraph [ref=e318]:
                - strong [ref=e319]: "378"
                - generic [ref=e320]: 人
            - generic "近30天参与人数迷你趋势" [ref=e321]
    - group [ref=e332]:
      - generic "查看精确数据" [ref=e333] [cursor=pointer]
  - generic [ref=e334]: 本地验证样本 · 原生列沿用 Bklit 中性色主题，Geist 不可用时使用系统字体回退。当前验证主题与原生行为；点击固定、图例点击隐藏、密集矩阵与关系网络另行验证。
```

# Test source

```ts
  1  | import { writeFileSync } from "node:fs";
  2  | import { expect, test, type Locator, type TestInfo } from "@playwright/test";
  3  | 
  4  | async function attachJson(info: TestInfo, name: string, value: unknown) {
  5  |   const path = info.outputPath(`${name}.json`);
  6  |   writeFileSync(path, JSON.stringify(value, null, 2));
  7  |   await info.attach(name, { path, contentType: "application/json" });
  8  | }
  9  | const playground = "http://127.0.0.1:5392", prototype = "http://127.0.0.1:5393";
  10 | async function tokenConsumption(locator: Locator, property: string, variable: string) {
  11 |   await expect(locator).toBeVisible();
  12 |   const result = await locator.evaluate((node, { property, variable }) => {
  13 |     const current = getComputedStyle(node), probe = document.createElement("span");
  14 |     probe.style.cssText = "position:fixed;visibility:hidden;pointer-events:none";
  15 |     probe.style.setProperty(property, `var(${variable})`); node.append(probe);
  16 |     const result = { property, variable, actual: current.getPropertyValue(property), token: current.getPropertyValue(variable).trim(), resolved: getComputedStyle(probe).getPropertyValue(property) };
  17 |     probe.remove(); return result;
  18 |   }, { property, variable });
  19 |   expect(result.token).not.toBe(""); expect(result.actual).toBe(result.resolved); return result;
  20 | }
  21 | test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));
  22 | 
  23 | test("[B01-local] spinner and menu labels use the registered semibold role", async ({ page }, info) => {
  24 |   await page.goto(`${playground}/#spinner`);
  25 |   const spinner = await tokenConsumption(page.locator(".component-doc__loading-result strong"), "font-weight", "--rain-font-weight-semibold");
  26 |   await page.locator(".component-doc__loading-result").screenshot({ path: info.outputPath("spinner-role.png") });
  27 |   await page.goto(`${playground}/#navigation-menu`); await page.getByRole("button", { name: "教学空间", exact: true }).click();
  28 |   const menu = await tokenConsumption(page.locator(".g3-doc-nav-link strong").first(), "font-weight", "--rain-font-weight-semibold");
  29 |   await page.locator(".rain-navigation-menu-content").screenshot({ path: info.outputPath("navigation-label.png") });
  30 |   await attachJson(info, "computed-typography", { spinner, menu });
  31 | });
  32 | 
  33 | test("[B01-local] slider label and output roles and task pagination width are computed", async ({ page }, info) => {
  34 |   await page.goto(`${playground}/#slider`);
  35 |   const label = await tokenConsumption(page.locator(".slider-example__heading > label").first(), "font-weight", "--rain-font-weight-semibold");
  36 |   const output = await tokenConsumption(page.locator(".slider-example__heading > output").first(), "font-weight", "--rain-font-weight-semibold");
  37 |   await page.locator(".slider-example__heading").first().screenshot({ path: info.outputPath("slider-label-output.png") });
  38 |   await page.goto(`${playground}/#drawer`); await page.getByRole("button", { name: /^查看任务：/ }).first().click();
  39 |   const position = page.locator(".g6-task-details-position"); await expect(position).toBeVisible(); await expect(position).toHaveCSS("min-width", "48px");
  40 |   const width = (await position.boundingBox())!.width; expect(width).toBeGreaterThanOrEqual(48);
  41 |   await page.locator(".g6-task-details-footer").screenshot({ path: info.outputPath("task-pagination.png") });
  42 |   await attachJson(info, "computed-local-roles", { label, output, pagination: { minWidth: "48px", width } });
  43 | });
  44 | 
  45 | test("[B01-local] exam display-mode width remains local and its selection works", async ({ page }, info) => {
  46 |   await page.goto(`${prototype}/#exam-editor`); await page.getByRole("button", { name: "移动到", exact: true }).first().click();
  47 |   const modes = page.locator(".em-display-modes"); await expect(modes).toBeVisible(); await expect(modes).toHaveCSS("width", "240px");
  48 |   await modes.getByRole("tab", { name: "紧凑", exact: true }).click(); await expect(modes.getByRole("tab", { name: "紧凑", exact: true })).toHaveAttribute("aria-selected", "true");
  49 |   await expect(modes).toHaveCSS("width", "240px"); await page.locator(".em-target-toolbar").screenshot({ path: info.outputPath("exam-display-modes.png") });
  50 | });
  51 | 
  52 | test("[B01-local] Bklit real link and both focus surfaces resolve semantic roles", async ({ page }, info) => {
  53 |   await page.goto(`${prototype}/bklit-validation.html`);
  54 |   const link = page.getByRole("link", { name: "查看 G2 实验 ↗" });
  55 |   const linkColor = await tokenConsumption(link, "color", "--rain-color-text-link");
  56 |   await page.keyboard.press("Tab"); await link.focus(); await expect(link).toHaveCSS("outline-width", "2px");
  57 |   const linkFocus = await tokenConsumption(link, "outline-color", "--rain-color-focus-control");
  58 |   await page.locator(".bklit-page-heading").screenshot({ path: info.outputPath("bklit-link-focus.png") });
  59 |   const summary = page.locator(".rain-chart summary").first(); await summary.focus(); await expect(summary).toHaveCSS("outline-width", "2px");
  60 |   const chartFocus = await tokenConsumption(summary, "outline-color", "--rain-color-focus-control");
  61 |   await summary.screenshot({ path: info.outputPath("bklit-chart-focus.png") });
  62 |   await attachJson(info, "computed-color-roles", { linkColor, linkFocus, chartFocus });
  63 | });
  64 | 
  65 | for (const entry of [
  66 |   { name: "drawer", url: `${playground}/drawer-refinement-consumer.html`, selector: "button" },
  67 |   { name: "bklit-validation", url: `${prototype}/bklit-validation.html`, selector: ".bklit-lab" },
> 68 |   { name: "bklit-catalog", url: `${prototype}/bklit-catalog.html`, selector: ".rain-chart-catalog" },
     |                             ^ Error: expect(received).not.toBe(expected) // Object.is equality
  69 | ]) test(`[B01-entry] ${entry.name} loads its declared Foundation motion dependency`, async ({ page }, info) => {
  70 |   await page.goto(entry.url); const consumer = page.locator(entry.selector).first(); await expect(consumer).toBeVisible();
  71 |   const fact = await consumer.evaluate(node => ({ feedback: getComputedStyle(node).getPropertyValue("--rain-motion-feedback-duration").trim(), overlay: getComputedStyle(node).getPropertyValue("--rain-motion-overlay-duration").trim(), region: getComputedStyle(node).getPropertyValue("--rain-motion-region-duration").trim(), ease: getComputedStyle(node).getPropertyValue("--rain-motion-ease-out").trim(), uiButtonCount: document.querySelectorAll(".rain-button").length, inputNumberCount: document.querySelectorAll('[data-rain-id="ui-input-number"]').length }));
  72 |   await attachJson(info, "entry-computed-dependencies", fact);
  73 |   await page.screenshot({ path: info.outputPath(`${entry.name}-entry.png`), fullPage: false });
  74 |   expect(fact.feedback).not.toBe(""); expect(fact.overlay).not.toBe(""); expect(fact.region).not.toBe(""); expect(fact.ease).not.toBe("");
  75 | });
  76 | 
```