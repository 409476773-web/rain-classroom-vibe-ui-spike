# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g123-playground.spec.ts >> exercise marker stays in the selected label at 200 percent CSS zoom
- Location: tests/e2e/g123-playground.spec.ts:213:1

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 1
Received:   418.390625

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "NavigationTabs 导航页签" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 导航 · 共享候选 · A1/A4/R2 局部视觉已确认 · 未发布
    - paragraph [ref=e11]: 对象内部的内容面切换，复用 Tabs 选择、键盘与面板生命周期，并显式选择导航外观。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "推荐场景" [level=2] [ref=e21]
      - paragraph [ref=e22]: 使用少量真实内容演示组件用途。局部配方复用已有组件；本次运行视觉待审阅。
      - region "第一章随堂练习" [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - paragraph [ref=e28]: 高等数学 A · 2026 秋季学期
            - heading "第一章随堂练习" [level=3] [ref=e29]
          - link "完整建设页 ↗" [ref=e30] [cursor=pointer]:
            - /url: "?sample=A1#navigation-v042"
        - generic [ref=e32]:
          - generic "分区导航" [ref=e33]:
            - tablist "练习内容面" [ref=e37]:
              - tab "题目内容" [ref=e38] [cursor=pointer]
              - tab "提交情况" [ref=e42] [cursor=pointer]:
                - generic [ref=e43]:
                  - generic [ref=e44]: 提交情况
                  - generic [ref=e46]: "3"
                - generic [ref=e47]: 数量 3
              - tab "批阅记录" [active] [selected] [ref=e48] [cursor=pointer]
          - tabpanel "批阅记录" [ref=e53]:
            - generic [ref=e54]:
              - list [ref=e55]:
                - listitem [ref=e56]:
                  - strong [ref=e57]: 10-09 11:05
                  - paragraph [ref=e58]: 林老师批阅了李梦的第 3 题。
                  - text: 评分 8.5 / 10 · 已在本地记录
                - listitem [ref=e59]:
                  - strong [ref=e60]: 10-09 10:35
                  - paragraph [ref=e61]: 全部 3 份提交已收齐。
              - generic [ref=e62]:
                - generic [ref=e63]: 内容面备注
                - textbox "内容面备注" [ref=e65]:
                  - /placeholder: 按练习与内容面保留的本地备注
      - generic [ref=e66]:
        - generic [ref=e67]:
          - button "复制代码" [ref=e68] [cursor=pointer]
          - status
        - code [ref=e71]: "import { NavigationTabsRecommendedScene } from \"./recipes/navigation-v042/navigation-switching-recipes\"; // 同时携带该文件声明的配方 CSS 与本地依赖。 <NavigationTabsRecommendedScene />"
    - button "高级组合与异常状态" [ref=e73] [cursor=pointer]
  - region [ref=e75]:
    - heading "使用边界" [level=2] [ref=e76]
    - generic [ref=e77]:
      - generic [ref=e78]:
        - heading "适合用在" [level=3] [ref=e79]
        - list [ref=e80]:
          - listitem [ref=e81]: 同一个对象或范围内切换真实内容面；需要下划线或连接工作面。
      - generic [ref=e82]:
        - heading "避免用在" [level=3] [ref=e83]
        - list [ref=e84]:
          - listitem [ref=e85]: 页面目的地用 NavigationBar；少量互斥设置用 SegmentedControl；不提供空面板。
  - generic [ref=e86]:
    - region [ref=e87]:
      - heading "API 与结构" [level=2] [ref=e88]
      - table [ref=e90]:
        - caption [ref=e91]: NavigationTabs 导航页签 常用接口
        - rowgroup [ref=e92]:
          - row [ref=e93]:
            - columnheader "名称" [ref=e94]
            - columnheader "类型" [ref=e95]
            - columnheader "默认" [ref=e96]
            - columnheader "说明" [ref=e97]
        - rowgroup [ref=e98]:
          - row [ref=e99]:
            - rowheader [ref=e100]:
              - code [ref=e101]: items
            - cell [ref=e102]:
              - code [ref=e103]: readonly TabsItem[]
            - cell "—" [ref=e104]
            - cell "value 稳定，label 纯文本，content 是真实面板；可选 count、description、disabledReason。" [ref=e105]
          - row [ref=e106]:
            - rowheader [ref=e107]:
              - code [ref=e108]: value / onValueChange
            - cell [ref=e109]:
              - code [ref=e110]: string | number | null / (value, details) => void
            - cell "—" [ref=e111]
            - cell "受控协议沿用 Tabs；支持 defaultValue 的非受控实例。" [ref=e112]
          - row [ref=e113]:
            - rowheader [ref=e114]:
              - code [ref=e115]: visualPreset
            - cell [ref=e116]:
              - code [ref=e117]: navigation-line | navigation-browser
            - cell "navigation-line" [ref=e118]
            - cell "只支持 top；browser 默认 scroll。" [ref=e119]
          - row [ref=e120]:
            - rowheader [ref=e121]:
              - code [ref=e122]: panelMount
            - cell [ref=e123]:
              - code [ref=e124]: lazy-retain | eager-retain | unmount
            - cell "lazy-retain" [ref=e125]
            - cell "面板生命周期来自 Tabs；业务草稿仍应有明确宿主 owner。" [ref=e126]
          - row [ref=e127]:
            - rowheader [ref=e128]:
              - code [ref=e129]: renderSurface
            - cell [ref=e130]:
              - code [ref=e131]: "({track, panels}) => ReactNode"
            - cell "—" [ref=e132]
            - cell "UI 保持不依赖 Layout；由消费层组合连接工作面。" [ref=e133]
      - paragraph [ref=e134]: "Parts / Slots：完整 NavigationTabs，或 Root / Nav / Panels；renderSurface({track,panels}) 可注入 ConnectedSurface。"
    - region [ref=e135]:
      - heading "调用示例" [level=2] [ref=e136]
      - generic [ref=e137]:
        - generic [ref=e138]:
          - button "复制代码" [ref=e139] [cursor=pointer]
          - status
        - code [ref=e142]: "<NavigationTabs items={[ { value: \"resources\", label: \"资料\", content: <ResourcePanel /> }, { value: \"tasks\", label: \"任务\", content: <TaskPanel /> }, ]} value={value} onValueChange={setValue} aria-label=\"课程内内容\" visualPreset=\"navigation-line\" />"
      - paragraph [ref=e143]:
        - text: 当前源码：
        - code [ref=e144]: packages/ui/src/navigation/navigation.tsx
```

# Test source

```ts
  124 |   await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  125 |   await page.setViewportSize({ width: 390, height: 844 });
  126 |   const directory = scene.locator('[data-region-id="directory"][data-side="start"]'), main = scene.locator(".workspace-recipe__main");
  127 |   await expect(directory).toBeHidden();
  128 |   await main.evaluate(el => { el.scrollTop = Math.min(120, el.scrollHeight - el.clientHeight); });
  129 |   const geometry = () => main.evaluate(el => { const rect = el.getBoundingClientRect(); return { x: rect.x, width: rect.width, scroll: el.scrollTop }; });
  130 |   const before = await geometry();
  131 |   const restore = scene.locator('[data-workspace-action="restore"][aria-controls$="-workspace-directory"]');
  132 |   await restore.click();
  133 |   await expect(directory).toHaveAttribute("data-temporary", "true");
  134 |   await directory.getByRole("button", { name: "固定课程目录", exact: true }).click();
  135 |   await expect(directory).toHaveAttribute("data-temporary", "true");
  136 |   await expect(directory).toHaveAttribute("data-mode", "hidden");
  137 |   const during = await geometry();
  138 |   expect(during).toEqual(before);
  139 |   await page.screenshot({ path: `${captures}/workspace-narrow-peek.png`, fullPage: true });
  140 |   await page.keyboard.press("Escape");
  141 |   await expect(directory).toBeHidden();
  142 |   await expect(restore).toBeFocused();
  143 |   await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  144 |   await page.setViewportSize({ width: 1390, height: 900 });
  145 |   await expect(directory).toBeVisible();
  146 |   expect(await editor!.evaluate(element => element.isConnected)).toBe(true);
  147 |   await expect(note).toHaveValue("按资料 ID 保留的函数讲义备注");
  148 |   writeFileSync(`${captures}/workspace-peek-geometry.json`, JSON.stringify({ before, during }, null, 2));
  149 | });
  150 | 
  151 | test("native course and work-area destinations follow history and keep query focus in their scenes", async ({ page, context }) => {
  152 |   for (const destination of [{ id: "navigation-bar", scene: "课程目的地演示", initial: "resources", first: "课程总览", firstId: "overview", second: "学习报告", secondId: "report", defaultLabel: "教学内容" }, { id: "navigation-list", scene: "教师课程导航", initial: "courses", first: "工作台", firstId: "overview", second: "资源库", secondId: "resources", defaultLabel: "我的课程" }]) {
  153 |     await page.goto(`/#${destination.id}?view=${destination.initial}`);
  154 |     const scene = page.getByRole("region", { name: destination.scene, exact: true });
  155 |     const first = scene.getByRole("link", { name: destination.first, exact: true }), second = scene.getByRole("link", { name: destination.second, exact: true });
  156 |     await first.click(); await expect(page).toHaveURL(new RegExp(`view=${destination.firstId}$`));
  157 |     await expect(first).toHaveAttribute("aria-current", "page"); await expect(first).toBeFocused();
  158 |     await second.click(); await expect(page).toHaveURL(new RegExp(`view=${destination.secondId}$`));
  159 |     await page.goBack(); await expect(first).toHaveAttribute("aria-current", "page");
  160 |     await page.goForward(); await expect(second).toHaveAttribute("aria-current", "page");
  161 |     await page.reload(); await expect(second).toHaveAttribute("aria-current", "page");
  162 |     const popupEvent = context.waitForEvent("page");
  163 |     await first.click({ modifiers: [process.platform === "darwin" ? "Meta" : "Control"] });
  164 |     const popup = await popupEvent; await popup.waitForLoadState();
  165 |     await expect(popup).toHaveURL(new RegExp(`view=${destination.firstId}$`));
  166 |     await expect(page).toHaveURL(new RegExp(`view=${destination.secondId}$`)); await popup.close();
  167 |     await page.goto(`/#${destination.id}?view=invalid`);
  168 |     await expect(scene.getByRole("link", { name: destination.defaultLabel, exact: true })).toHaveAttribute("aria-current", "page");
  169 |   }
  170 | });
  171 | 
  172 | test("exercise Tabs keep manual activation while their single marker moves and respects reduced motion", async ({ page }) => {
  173 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  174 |   await page.goto("/#navigation-tabs");
  175 |   const scene = page.getByRole("region", { name: "第一章随堂练习", exact: true }), current = scene.getByRole("tab", { name: "提交情况", exact: true }), history = scene.getByRole("tab", { name: "批阅记录", exact: true });
  176 |   await current.focus(); await page.keyboard.press("ArrowRight");
  177 |   await expect(history).toBeFocused(); await expect(current).toHaveAttribute("aria-selected", "true");
  178 |   await page.keyboard.press("Enter"); await expect(history).toHaveAttribute("aria-selected", "true");
  179 |   const marker = scene.locator(".switching-recipe__tab-marker");
  180 |   const alignment = () => scene.evaluate(el => { const line = el.querySelector(".switching-recipe__tab-marker")!.getBoundingClientRect(), label = el.querySelector('.rain-tabs__tab[aria-selected="true"] .rain-tabs__label')!.getBoundingClientRect(); return Math.abs(line.x + line.width / 2 - label.x - label.width / 2); });
  181 |   await expect.poll(alignment).toBeLessThan(1); await expect(marker).toHaveCount(1);
  182 |   await current.click();
  183 |   const animations = await marker.evaluate(async el => { await new Promise<void>(resolve => requestAnimationFrame(() => resolve())); return el.getAnimations().map(animation => ({ type: animation.constructor.name, duration: animation.effect?.getTiming().duration })); });
  184 |   expect(animations.some(animation => animation.type === "CSSTransition" && Number(animation.duration) > 0)).toBe(true);
  185 |   await scene.getByRole("tab", { name: "题目内容", exact: true }).click(); await history.click(); await current.click();
  186 |   await expect.poll(alignment).toBeLessThan(1);
  187 |   await page.setViewportSize({ width: 390, height: 844 }); await expect.poll(alignment).toBeLessThan(1);
  188 |   await page.emulateMedia({ reducedMotion: "reduce" }); await history.click(); await expect.poll(alignment).toBeLessThan(1);
  189 |   expect(await marker.evaluate(el => getComputedStyle(el).transitionDuration)).toBe("0s");
  190 |   expect(await history.locator(".rain-tabs__label").evaluate(el => getComputedStyle(el, "::after").display)).toBe("none");
  191 |   writeFileSync(`${captures}/tabs-motion-facts.json`, JSON.stringify({ animations, reducedDuration: "0s", markerCount: await marker.count() }, null, 2));
  192 |   await page.screenshot({ path: `${captures}/tabs-selected-focused.png`, fullPage: true });
  193 | });
  194 | 
  195 | test("native segmented arrows preserve the current grading identity and score across traversal axes", async ({ page }) => {
  196 |   await page.goto("/#segmented-control");
  197 |   const scene = page.getByRole("region", { name: "批阅顺序演示", exact: true }), note = scene.getByRole("textbox", { name: "批阅备注", exact: true }), score = scene.getByRole("spinbutton", { name: "得分", exact: true });
  198 |   await note.fill("欧阳小明第 3 题未保存备注");
  199 |   await scene.getByRole("radio", { name: "按人", exact: true }).focus(); await page.keyboard.press("ArrowRight");
  200 |   await expect(scene.getByRole("radio", { name: "按题", exact: true })).toBeChecked();
  201 |   await expect(note).toHaveValue("欧阳小明第 3 题未保存备注"); await expect(score).toHaveValue("7");
  202 |   await scene.getByRole("button", { name: "第 1 题 · 函数的概念", exact: true }).click();
  203 |   await expect(score).toHaveValue(""); await expect(scene.getByRole("button", { name: "保存评分", exact: true })).toBeDisabled();
  204 |   await score.fill("9"); await note.fill("欧阳小明第 1 题备注");
  205 |   await scene.getByRole("radio", { name: "按题", exact: true }).focus(); await page.keyboard.press("ArrowLeft");
  206 |   await expect(scene.getByRole("button", { name: "欧阳小明", exact: true })).toHaveAttribute("aria-pressed", "true");
  207 |   await scene.getByRole("button", { name: "李梦", exact: true }).click(); await expect(score).toHaveValue("");
  208 |   await scene.getByRole("button", { name: "欧阳小明", exact: true }).click(); await expect(score).toHaveValue("9"); await expect(note).toHaveValue("欧阳小明第 1 题备注");
  209 |   await scene.getByRole("button", { name: "保存评分", exact: true }).click(); await expect(scene.getByRole("status")).toHaveText("评分已在本地保存");
  210 |   await page.screenshot({ path: `${captures}/segmented-after-traversal.png`, fullPage: true });
  211 | });
  212 | 
  213 | test("exercise marker stays in the selected label at 200 percent CSS zoom", async ({ page }) => {
  214 |   await page.setViewportSize({ width: 780, height: 1100 });
  215 |   await page.goto("/#navigation-tabs");
  216 |   await page.evaluate(() => { document.body.style.zoom = "2"; });
  217 |   const scene = page.getByRole("region", { name: "第一章随堂练习", exact: true });
  218 |   const alignment = () => scene.evaluate(el => {
  219 |     const marker = el.querySelector(".switching-recipe__tab-marker")!.getBoundingClientRect(), label = el.querySelector('.rain-tabs__tab[aria-selected="true"] .rain-tabs__label')!.getBoundingClientRect();
  220 |     return { centerError: Math.abs(marker.x + marker.width / 2 - label.x - label.width / 2), bottomError: Math.abs(marker.bottom - label.bottom), width: marker.width };
  221 |   });
  222 |   for (const name of ["批阅记录", "题目内容", "提交情况"]) {
  223 |     await scene.getByRole("tab", { name, exact: true }).click();
> 224 |     await expect.poll(async () => (await alignment()).centerError).toBeLessThan(1);
      |                                                                    ^ Error: expect(received).toBeLessThan(expected)
  225 |     await expect.poll(async () => (await alignment()).bottomError).toBeLessThan(2);
  226 |   }
  227 |   const facts = await alignment(); expect(facts.width).toBe(48);
  228 |   writeFileSync(`${captures}/tabs-zoom-marker-facts.json`, JSON.stringify(facts, null, 2));
  229 |   await page.screenshot({ path: `${captures}/tabs-zoom-200-selected.png`, fullPage: true });
  230 | });
  231 | 
  232 | test("all eight recommended scenes fit dark narrow and 200 percent zoom layouts", async ({ page }) => {
  233 |   const ids = ["object-navigator", "scope-navigation", "connected-surface", "navigation-list", "workspace", "navigation-tabs", "navigation-bar", "segmented-control"];
  234 |   const facts = [];
  235 |   await page.setViewportSize({ width: 390, height: 844 });
  236 |   for (const id of ids) {
  237 |     await page.goto(`/#${id}`); await page.getByRole("button", { name: "深色", exact: true }).click();
  238 |     await expect(page.locator(`[data-demo-component="${id}"]`)).toBeVisible();
  239 |     expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(391);
  240 |     await page.screenshot({ path: `${captures}/${id}-dark-narrow.png`, fullPage: true });
  241 |     await page.setViewportSize({ width: 780, height: 1100 });
  242 |     await page.evaluate(() => { document.body.style.zoom = "2"; });
  243 |     await page.waitForTimeout(250);
  244 |     const width = await page.evaluate(() => document.documentElement.scrollWidth);
  245 |     expect(width, `${id} at 200%`).toBeLessThanOrEqual(781);
  246 |     facts.push({ id, viewport: 780, zoom: 2, documentWidth: width });
  247 |     await page.screenshot({ path: `${captures}/${id}-dark-zoom-200.png`, fullPage: true });
  248 |     await page.evaluate(() => { document.body.style.zoom = ""; }); await page.setViewportSize({ width: 390, height: 844 });
  249 |   }
  250 |   writeFileSync(`${captures}/dark-zoom-facts.json`, JSON.stringify(facts, null, 2));
  251 | });
  252 | 
  253 | test("context menu keyboard access follows the same engine and returns focus", async ({ page }) => {
  254 |   await page.goto("/#context-menu");
  255 |   const trigger = page.locator('[data-demo-component="context-menu"] [data-rain-id="ui-context-menu"][data-slot="trigger"]');
  256 |   await trigger.focus();
  257 |   await page.keyboard.press("Shift+F10");
  258 |   await expect(page.getByRole("menuitem").first()).toBeVisible();
  259 |   await page.keyboard.press("Escape");
  260 |   await expect(trigger).toBeFocused();
  261 | });
  262 | 
  263 | test("dark portaled Sheet preserves its theme and the trigger receives focus on closing", async ({ page }) => {
  264 |   await page.goto("/#sheet");
  265 |   await page.getByRole("button", { name: "深色", exact: true }).click();
  266 |   const trigger = page.getByRole("button", { name: "打开资料详情", exact: true });
  267 |   await trigger.click();
  268 |   const popup = page.locator('[data-rain-id="ui-sheet"][data-slot="content"]');
  269 |   await expect(popup).toBeVisible();
  270 |   expect(await popup.evaluate(el => el.closest<HTMLElement>("[data-rain-theme]")?.dataset.rainTheme)).toBe("dark");
  271 |   expect(await popup.evaluate(el => getComputedStyle(el).backgroundColor)).toBe("rgb(30, 36, 59)");
  272 |   await page.screenshot({ path: `${captures}/sheet-dark-open.png`, fullPage: true });
  273 |   await page.keyboard.press("Escape");
  274 |   await expect(trigger).toBeFocused();
  275 | });
  276 | 
  277 | test("dark portaled Scope results use readable theme text and restore trigger focus", async ({ page }) => {
  278 |   await page.goto("/#scope-navigation");
  279 |   await page.getByRole("button", { name: "深色", exact: true }).click();
  280 |   const scene = page.getByRole("region", { name: "课程范围内容", exact: true });
  281 |   const trigger = scene.getByRole("button", { name: /更多/ });
  282 |   await trigger.click();
  283 |   const popup = page.locator(".rain-navigation-scope-dropdown");
  284 |   await expect(popup).toBeVisible();
  285 |   expect(await popup.evaluate(el => el.closest<HTMLElement>("[data-rain-theme]")?.dataset.rainTheme)).toBe("dark");
  286 |   const paint = await popup.locator(".rain-scope-navigation__result:not([aria-pressed='true'])").first().evaluate(el => {
  287 |     const style = getComputedStyle(el);
  288 |     const probe = document.createElement("span");
  289 |     probe.style.color = "var(--rain-category-text-neutral-1)";
  290 |     el.append(probe);
  291 |     const expected = getComputedStyle(probe).color;
  292 |     probe.remove();
  293 |     return { current: style.color, expected };
  294 |   });
  295 |   expect(paint.current).toBe(paint.expected);
  296 |   await page.screenshot({ path: `${captures}/scope-dark-popup.png`, fullPage: true });
  297 |   await page.keyboard.press("Escape");
  298 |   await expect(trigger).toBeFocused();
  299 | });
  300 | 
```