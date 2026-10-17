# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g123-playground.spec.ts >> dark portaled Scope results use readable theme text and restore trigger focus
- Location: tests/e2e/g123-playground.spec.ts:293:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rgb(239, 241, 245)"
Received: "rgb(38, 107, 255)"
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "ScopeNavigation 范围导航" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 导航 · 共享候选 · A4/R2 局部视觉已确认 · 未发布
    - paragraph [ref=e11]: 固定公共资源入口，并通过可见槽与完整搜索选择课程范围。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [ref=e13] [cursor=pointer]
      - button "深色" [pressed] [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "推荐场景" [level=2] [ref=e21]
      - paragraph [ref=e22]: 使用少量真实内容演示组件用途。局部配方复用已有组件；本次运行视觉待审阅。
      - region "课程范围内容" [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - heading "高等数学 A" [level=3] [ref=e28]
            - paragraph [ref=e29]: 课程资料 · 2026 秋季学期
          - link "完整建设页 ↗" [ref=e30] [cursor=pointer]:
            - /url: "?sample=R2#navigation-v042"
        - generic [ref=e33]:
          - generic "分区导航" [ref=e35]:
            - generic [ref=e36]:
              - tablist "课程资料范围" [ref=e39]:
                - tab "公共资源包" [selected] [ref=e40] [cursor=pointer]:
                  - generic [ref=e44]:
                    - generic [ref=e45]: 课程内容 · 班级共用
                    - generic [ref=e46]: 公共资源包
                - tab "高等数学 1 班" [ref=e48] [cursor=pointer]:
                  - generic [ref=e52]:
                    - generic [ref=e53]: 教学班 · 2026 秋
                    - generic [ref=e54]: 高等数学 1 班
                - tab "高等数学 2 班" [ref=e56] [cursor=pointer]:
                  - generic [ref=e60]:
                    - generic [ref=e61]: 教学班 · 2026 秋
                    - generic [ref=e62]: 高等数学 2 班
              - generic [ref=e64]:
                - button "更多班级" [expanded] [ref=e66] [cursor=pointer]:
                  - generic [ref=e68]: "8"
                - dialog [ref=e73]:
                  - generic [ref=e74]:
                    - generic [ref=e75]:
                      - heading "选择课程内容范围" [level=2] [ref=e76]
                      - button "关闭范围选择" [ref=e77]
                    - textbox "搜索范围" [active] [ref=e83]:
                      - /placeholder: 搜索班级名称或序号
                    - generic "范围搜索结果" [ref=e85]:
                      - button "公共资源包 课程内容 · 班级共用" [pressed] [ref=e86]:
                        - generic [ref=e89]:
                          - strong [ref=e90]: 公共资源包
                          - generic [ref=e91]: 课程内容 · 班级共用
                      - button "高等数学 1 班 教学班 · 2026 秋" [ref=e93]:
                        - generic [ref=e96]:
                          - strong [ref=e97]: 高等数学 1 班
                          - generic [ref=e98]: 教学班 · 2026 秋
                      - button "高等数学 2 班 教学班 · 2026 秋" [ref=e99]:
                        - generic [ref=e102]:
                          - strong [ref=e103]: 高等数学 2 班
                          - generic [ref=e104]: 教学班 · 2026 秋
                      - button "高等数学 3 班 教学班 · 2026 秋" [ref=e105]:
                        - generic [ref=e108]:
                          - strong [ref=e109]: 高等数学 3 班
                          - generic [ref=e110]: 教学班 · 2026 秋
                      - button "高等数学 4 班 教学班 · 2026 秋" [ref=e111]:
                        - generic [ref=e114]:
                          - strong [ref=e115]: 高等数学 4 班
                          - generic [ref=e116]: 教学班 · 2026 秋
                      - button "高等数学 5 班 教学班 · 2026 秋" [ref=e117]:
                        - generic [ref=e120]:
                          - strong [ref=e121]: 高等数学 5 班
                          - generic [ref=e122]: 教学班 · 2026 秋
                      - button "高等数学 6 班 教学班 · 2026 秋" [ref=e123]:
                        - generic [ref=e126]:
                          - strong [ref=e127]: 高等数学 6 班
                          - generic [ref=e128]: 教学班 · 2026 秋
                      - button "高等数学 7 班 教学班 · 2026 秋" [ref=e129]:
                        - generic [ref=e132]:
                          - strong [ref=e133]: 高等数学 7 班
                          - generic [ref=e134]: 教学班 · 2026 秋
                      - button "高等数学 8 班 教学班 · 2026 秋" [ref=e135]:
                        - generic [ref=e138]:
                          - strong [ref=e139]: 高等数学 8 班
                          - generic [ref=e140]: 教学班 · 2026 秋
                      - button "高等数学 9 班 教学班 · 2026 秋" [ref=e141]:
                        - generic [ref=e144]:
                          - strong [ref=e145]: 高等数学 9 班
                          - generic [ref=e146]: 教学班 · 2026 秋
                      - button "高等数学 10 班 教学班 · 2026 秋" [ref=e147]:
                        - generic [ref=e150]:
                          - strong [ref=e151]: 高等数学 10 班
                          - generic [ref=e152]: 教学班 · 2026 秋
          - tabpanel "公共资源包" [ref=e157]:
            - generic [ref=e158]:
              - generic [ref=e159]: 课程资料 / 公共资源包
              - generic [ref=e160]:
                - generic [ref=e161]:
                  - heading "第一章 函数、极限与连续" [level=3] [ref=e162]
                  - paragraph [ref=e163]: 3 项资料 · 供关联班级复用
                - button "添加资料" [ref=e164] [cursor=pointer]
              - list "本章资料" [ref=e168]:
                - listitem [ref=e169]:
                  - generic [ref=e172]:
                    - strong [ref=e173]: 函数的定义与表示
                    - generic [ref=e174]: 讲义 · PDF · 8 页
                  - generic [ref=e175]: 课程共用
                - listitem [ref=e176]:
                  - generic [ref=e179]:
                    - strong [ref=e180]: 极限的直观理解
                    - generic [ref=e181]: 视频 · 18 分钟
                  - generic [ref=e182]: 课程共用
                - listitem [ref=e183]:
                  - generic [ref=e186]:
                    - strong [ref=e187]: 第一章随堂练习
                    - generic [ref=e188]: 练习 · 3 道题
                  - generic [ref=e189]: 课程共用
              - generic [ref=e191]:
                - generic [ref=e192]: 范围教学备注
                - textbox "范围教学备注" [ref=e194]:
                  - /placeholder: 记录本范围的教学安排
              - generic [ref=e195]:
                - generic [ref=e196]:
                  - text: 公共资源可供班级复用
                  - status [ref=e197]: · 仅本地演示
                - button "保存草稿" [ref=e198] [cursor=pointer]
      - generic [ref=e200]:
        - generic [ref=e201]:
          - button "复制代码" [ref=e202] [cursor=pointer]
          - status
        - code [ref=e205]: "import { ScopeNavigationRecommendedScene } from \"./recipes/navigation-v042/scope-connected-recipes\"; // 同时携带该文件声明的配方 CSS 与本地依赖。 <ScopeNavigationRecommendedScene />"
    - button "高级组合与异常状态" [ref=e207] [cursor=pointer]
  - region [ref=e209]:
    - heading "使用边界" [level=2] [ref=e210]
    - generic [ref=e211]:
      - generic [ref=e212]:
        - heading "适合用在" [level=3] [ref=e213]
        - list [ref=e214]:
          - listitem [ref=e215]: 公共资源包与多个班级范围，需要更多范围搜索和当前项稳定可见。
      - generic [ref=e216]:
        - heading "避免用在" [level=3] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]: 不负责保存、同步、发布或业务身份服务；不要按标签或数组下标保存草稿。
  - generic [ref=e220]:
    - region [ref=e221]:
      - heading "API 与结构" [level=2] [ref=e222]
      - table [ref=e224]:
        - caption [ref=e225]: ScopeNavigation 范围导航 常用接口
        - rowgroup [ref=e226]:
          - row [ref=e227]:
            - columnheader "名称" [ref=e228]
            - columnheader "类型" [ref=e229]
            - columnheader "默认" [ref=e230]
            - columnheader "说明" [ref=e231]
        - rowgroup [ref=e232]:
          - row [ref=e233]:
            - rowheader [ref=e234]:
              - code [ref=e235]: items
            - cell [ref=e236]:
              - code [ref=e237]: readonly ScopeNavigationItem[]
            - cell "—" [ref=e238]
            - cell "首项必须是公共资源范围；每项 id、label 必填，可带 description、icon、disabled。" [ref=e239]
          - row [ref=e240]:
            - rowheader [ref=e241]:
              - code [ref=e242]: value / onValueChange
            - cell [ref=e243]:
              - code [ref=e244]: string | null / (id) => void
            - cell "—" [ref=e245]
            - cell "范围选择请求由宿主接受；当前项不存在时提示，不自动换范围。" [ref=e246]
          - row [ref=e247]:
            - rowheader [ref=e248]:
              - code [ref=e249]: visibleLimit
            - cell [ref=e250]:
              - code [ref=e251]: 3 | 4 | 5
            - cell "4" [ref=e252]
            - cell "受真实宽度预算限制，当前溢出项替换最后可见槽。" [ref=e253]
          - row [ref=e254]:
            - rowheader [ref=e255]:
              - code [ref=e256]: loading / error
            - cell [ref=e257]:
              - code [ref=e258]: boolean / string
            - cell "—" [ref=e259]
            - cell "宿主提供状态；组件不取数。" [ref=e260]
          - row [ref=e261]:
            - rowheader [ref=e262]:
              - code [ref=e263]: children / renderSurface
            - cell [ref=e264]:
              - code [ref=e265]: ReactNode / renderer
            - cell "—" [ref=e266]
            - cell "共享编辑器内容保持实例；可组合 ConnectedSurface。" [ref=e267]
      - paragraph [ref=e268]: Parts / Slots：Root → navigation track + More Popover/search/results + sharedContent panels；renderSurface 可提供联合工作面。
    - region [ref=e269]:
      - heading "调用示例" [level=2] [ref=e270]
      - generic [ref=e271]:
        - generic [ref=e272]:
          - button "复制代码" [ref=e273] [cursor=pointer]
          - status
        - code [ref=e276]: "<ScopeNavigation items={scopes} value={scopeId} onValueChange={setScopeId} visibleLimit={3} aria-label=\"课程内容范围\" renderSurface={({ track, panels }) => <ConnectedSurface instanceId=\"course-resources\" activeKey={scopeId} track={track}> {panels} </ConnectedSurface>}> <ScopeEditor scopeId={scopeId} drafts={draftsByScopeId} /> </ScopeNavigation>"
      - paragraph [ref=e277]:
        - text: 当前源码：
        - code [ref=e278]: packages/ui/src/navigation/navigation.tsx
```

# Test source

```ts
  213 |   await expect(scene.getByRole("radio", { name: "按题", exact: true })).toBeChecked();
  214 |   await expect.poll(() => tray.evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el, '::before').transform).m41)).toBeGreaterThan(70);
  215 |   await expect(note).toHaveValue("欧阳小明第 3 题未保存备注"); await expect(score).toHaveValue("7");
  216 |   await scene.getByRole("button", { name: "第 1 题 · 函数的概念", exact: true }).click();
  217 |   await expect(score).toHaveValue(""); await expect(scene.getByRole("button", { name: "保存评分", exact: true })).toBeDisabled();
  218 |   await score.fill("9"); await note.fill("欧阳小明第 1 题备注");
  219 |   await scene.getByRole("radio", { name: "按题", exact: true }).focus(); await page.keyboard.press("ArrowLeft");
  220 |   await expect(scene.getByRole("button", { name: "欧阳小明", exact: true })).toHaveAttribute("aria-pressed", "true");
  221 |   await scene.getByRole("button", { name: "李梦", exact: true }).click(); await expect(score).toHaveValue("");
  222 |   await scene.getByRole("button", { name: "欧阳小明", exact: true }).click(); await expect(score).toHaveValue("9"); await expect(note).toHaveValue("欧阳小明第 1 题备注");
  223 |   await scene.getByRole("button", { name: "保存评分", exact: true }).click(); await expect(scene.getByRole("status")).toHaveText("评分已在本地保存");
  224 |   await page.emulateMedia({ reducedMotion: 'reduce' });
  225 |   expect(await tray.evaluate(el => getComputedStyle(el, '::before').transitionDuration)).toBe('0s');
  226 |   await page.screenshot({ path: `${captures}/segmented-after-traversal.png`, fullPage: true });
  227 | });
  228 | 
  229 | test("exercise marker stays in the selected label at 200 percent CSS zoom", async ({ page }) => {
  230 |   await page.setViewportSize({ width: 780, height: 1100 });
  231 |   await page.goto("/#navigation-tabs");
  232 |   await page.evaluate(() => { document.body.style.zoom = "2"; });
  233 |   const scene = page.getByRole("region", { name: "第一章随堂练习", exact: true });
  234 |   const alignment = () => scene.evaluate(el => {
  235 |     const marker = el.querySelector(".switching-recipe__tab-marker")!.getBoundingClientRect(), label = el.querySelector('.rain-tabs__tab[aria-selected="true"] .rain-tabs__label')!.getBoundingClientRect();
  236 |     return { centerError: Math.abs(marker.x + marker.width / 2 - label.x - label.width / 2), bottomError: Math.abs(marker.bottom - label.bottom), width: marker.width };
  237 |   });
  238 |   for (const name of ["批阅记录", "题目内容", "提交情况"]) {
  239 |     await scene.getByRole("tab", { name, exact: true }).click();
  240 |     await expect.poll(async () => (await alignment()).centerError).toBeLessThan(1);
  241 |     await expect.poll(async () => (await alignment()).bottomError).toBeLessThan(2);
  242 |   }
  243 |   const facts = await alignment(); expect(facts.width).toBe(48);
  244 |   writeFileSync(`${captures}/tabs-zoom-marker-facts.json`, JSON.stringify(facts, null, 2));
  245 |   await page.screenshot({ path: `${captures}/tabs-zoom-200-selected.png`, fullPage: true });
  246 | });
  247 | 
  248 | test("all eight recommended scenes fit dark narrow and 200 percent zoom layouts", async ({ page }) => {
  249 |   const ids = ["object-navigator", "scope-navigation", "connected-surface", "navigation-list", "workspace", "navigation-tabs", "navigation-bar", "segmented-control"];
  250 |   const facts = [];
  251 |   await page.setViewportSize({ width: 390, height: 844 });
  252 |   for (const id of ids) {
  253 |     await page.goto(`/#${id}`); await page.getByRole("button", { name: "深色", exact: true }).click();
  254 |     await expect(page.locator(`[data-demo-component="${id}"]`)).toBeVisible();
  255 |     expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(391);
  256 |     await page.screenshot({ path: `${captures}/${id}-dark-narrow.png`, fullPage: true });
  257 |     await page.setViewportSize({ width: 780, height: 1100 });
  258 |     await page.evaluate(() => { document.body.style.zoom = "2"; });
  259 |     await page.waitForTimeout(250);
  260 |     const width = await page.evaluate(() => document.documentElement.scrollWidth);
  261 |     expect(width, `${id} at 200%`).toBeLessThanOrEqual(781);
  262 |     facts.push({ id, viewport: 780, zoom: 2, documentWidth: width });
  263 |     await page.screenshot({ path: `${captures}/${id}-dark-zoom-200.png`, fullPage: true });
  264 |     await page.evaluate(() => { document.body.style.zoom = ""; }); await page.setViewportSize({ width: 390, height: 844 });
  265 |   }
  266 |   writeFileSync(`${captures}/dark-zoom-facts.json`, JSON.stringify(facts, null, 2));
  267 | });
  268 | 
  269 | test("context menu keyboard access follows the same engine and returns focus", async ({ page }) => {
  270 |   await page.goto("/#context-menu");
  271 |   const trigger = page.locator('[data-demo-component="context-menu"] [data-rain-id="ui-context-menu"][data-slot="trigger"]');
  272 |   await trigger.focus();
  273 |   await page.keyboard.press("Shift+F10");
  274 |   await expect(page.getByRole("menuitem").first()).toBeVisible();
  275 |   await page.keyboard.press("Escape");
  276 |   await expect(trigger).toBeFocused();
  277 | });
  278 | 
  279 | test("dark portaled Sheet preserves its theme and the trigger receives focus on closing", async ({ page }) => {
  280 |   await page.goto("/#sheet");
  281 |   await page.getByRole("button", { name: "深色", exact: true }).click();
  282 |   const trigger = page.getByRole("button", { name: "打开资料详情", exact: true });
  283 |   await trigger.click();
  284 |   const popup = page.locator('[data-rain-id="ui-sheet"][data-slot="content"]');
  285 |   await expect(popup).toBeVisible();
  286 |   expect(await popup.evaluate(el => el.closest<HTMLElement>("[data-rain-theme]")?.dataset.rainTheme)).toBe("dark");
  287 |   expect(await popup.evaluate(el => getComputedStyle(el).backgroundColor)).toBe("rgb(30, 36, 59)");
  288 |   await page.screenshot({ path: `${captures}/sheet-dark-open.png`, fullPage: true });
  289 |   await page.keyboard.press("Escape");
  290 |   await expect(trigger).toBeFocused();
  291 | });
  292 | 
  293 | test("dark portaled Scope results use readable theme text and restore trigger focus", async ({ page }) => {
  294 |   await page.goto("/#scope-navigation");
  295 |   await page.getByRole("button", { name: "深色", exact: true }).click();
  296 |   const scene = page.getByRole("region", { name: "课程范围内容", exact: true });
  297 |   const trigger = scene.getByRole("button", { name: /更多/ });
  298 |   await trigger.click();
  299 |   const popup = page.locator(".rain-navigation-scope-dropdown");
  300 |   await expect(popup).toBeVisible();
  301 |   expect(await popup.evaluate(el => el.closest<HTMLElement>("[data-rain-theme]")?.dataset.rainTheme)).toBe("dark");
  302 |   const paint = await popup.locator(".rain-scope-navigation__result:not([aria-pressed='true'])").first().evaluate(el => {
  303 |     const style = getComputedStyle(el);
  304 |     const probe = document.createElement("span");
  305 |     probe.style.color = "var(--rain-category-text-neutral-1)";
  306 |     el.append(probe);
  307 |     const expected = getComputedStyle(probe).color;
  308 |     probe.remove();
  309 |     return { current: style.color, expected };
  310 |   });
  311 |   expect(paint.current).toBe(paint.expected);
  312 |   const current = popup.getByRole("button", { name: /公共资源包/ });
> 313 |   expect(await current.evaluate(el => getComputedStyle(el).color)).toBe(paint.expected);
      |                                                                    ^ Error: expect(received).toBe(expected) // Object.is equality
  314 |   const hovered = popup.getByRole("button", { name: /高等数学 1 班/ });
  315 |   await hovered.hover();
  316 |   expect(await hovered.evaluate(el => getComputedStyle(el).color)).toBe(paint.expected);
  317 |   await page.screenshot({ path: `${captures}/scope-dark-popup.png`, fullPage: true });
  318 |   await page.keyboard.press("Escape");
  319 |   await expect(trigger).toBeFocused();
  320 | });
  321 | 
```