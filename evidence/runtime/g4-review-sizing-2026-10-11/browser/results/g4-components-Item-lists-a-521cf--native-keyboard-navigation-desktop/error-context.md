# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> Item lists aligned readable resources and keeps native keyboard navigation
- Location: tests/e2e/g4-components.spec.ts:213:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

  Object {
-   "height": 20,
-   "width": 20,
+   "height": 24,
+   "width": 24,
  }
```

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

  Object {
-   "height": 20,
-   "width": 20,
+   "height": 24,
+   "width": 24,
  }
```

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

  Object {
-   "height": 20,
-   "width": 20,
+   "height": 24,
+   "width": 24,
  }
```

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "icon/arrow-right"
Received: "icon/chevron-right"
```

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rgb(116, 133, 168)"
Received: "rgb(20, 35, 70)"
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Typography 文字排版" [active] [level=1] [ref=e9]
      - generic [ref=e10]: Foundations · 复用现有排版基础 · 用法待审阅
    - paragraph [ref=e11]: 用稳定的文字层级组织内容。界面文字帮助扫读，阅读文字保持连续，关键数字提供清楚的视觉锚点。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "从标题到正文的阅读层级" [level=2] [ref=e21]
      - paragraph [ref=e22]: 同一份课程导读，把标题、阅读目标、元信息与正文放在连续的阅读顺序中。
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]:
            - paragraph [ref=e26]: 人工智能导论 · 第 04 讲
            - heading "从问题到证据" [level=3] [ref=e27]
            - paragraph [ref=e28]: 学习如何观察问题、识别证据，并形成可解释的判断。
            - paragraph [ref=e29]: 林老师 · 10 月 11 日更新 · 约 5 分钟阅读
          - article "课程导读示例" [ref=e30]:
            - heading "先分清事实与判断" [level=4] [ref=e31]
            - paragraph [ref=e32]: 先描述你观察到的现象，再说明它能够支持什么判断。例如，学生完成了一次课堂讨论，这是可以记录的事实；学生是否理解了概念，还需要结合回答内容和后续表现。
            - paragraph [ref=e33]: 阅读案例时，可以圈出一条事实，写下你的解释，再问自己：还有没有其他可能？把依据与解释放在一起，能让交流更清楚，也让不同观点有机会被检验。
          - paragraph [ref=e34]: 阅读后，请带着一条证据参加课堂讨论。
        - group [ref=e35]:
          - generic "查看代码" [ref=e36] [cursor=pointer]
    - generic [ref=e37]:
      - heading "直接比较已有字阶" [level=2] [ref=e38]
      - paragraph [ref=e39]: 用同一段文字比较字号与行高。选择依据是内容角色；字体和尺寸沿用已登记方案。
      - generic [ref=e41]:
        - generic [ref=e42]:
          - generic [ref=e43]:
            - generic [ref=e44]: 界面正文
            - generic [ref=e45]: 14 / 22
          - paragraph [ref=e46]: 观察问题，整理证据，形成判断。
        - generic [ref=e47]:
          - generic [ref=e48]:
            - generic [ref=e49]: 紧凑文字
            - generic [ref=e50]: 13 / 18
          - paragraph [ref=e51]: 观察问题，整理证据，形成判断。
        - generic [ref=e52]:
          - generic [ref=e53]:
            - generic [ref=e54]: 元信息
            - generic [ref=e55]: 12 / 20
          - paragraph [ref=e56]: 观察问题，整理证据，形成判断。
        - generic [ref=e57]:
          - generic [ref=e58]:
            - generic [ref=e59]: 辅助说明
            - generic [ref=e60]: 13 / 20
          - paragraph [ref=e61]: 观察问题，整理证据，形成判断。
        - generic [ref=e62]:
          - generic [ref=e63]:
            - generic [ref=e64]: 区块标题
            - generic [ref=e65]: 16 / 24
          - paragraph [ref=e66]: 观察问题，整理证据，形成判断。
        - generic [ref=e67]:
          - generic [ref=e68]:
            - generic [ref=e69]: 页面标题
            - generic [ref=e70]: 24 / 32
          - paragraph [ref=e71]: 观察问题，整理证据，形成判断。
        - generic [ref=e72]:
          - generic [ref=e73]:
            - generic [ref=e74]: 紧凑阅读
            - generic [ref=e75]: 14 / 24
          - paragraph [ref=e76]: 观察问题，整理证据，形成判断。
        - generic [ref=e77]:
          - generic [ref=e78]:
            - generic [ref=e79]: 常规阅读
            - generic [ref=e80]: 15 / 26
          - paragraph [ref=e81]: 观察问题，整理证据，形成判断。
        - generic [ref=e82]:
          - generic [ref=e83]:
            - generic [ref=e84]: 大号阅读
            - generic [ref=e85]: 16 / 26
          - paragraph [ref=e86]: 观察问题，整理证据，形成判断。
    - generic [ref=e87]:
      - heading "关键数字与单位" [level=2] [ref=e88]
      - paragraph [ref=e89]: 数值承担视觉锚点，标签、中文单位和统计范围保持界面字体。以下为课程样例数据。
      - generic [ref=e90]:
        - generic [ref=e91]:
          - text: 平均得分
          - generic [ref=e92]:
            - generic [ref=e93]: "86.5"
            - generic [ref=e94]: 分
          - paragraph [ref=e95]: 共 24 份答卷 · 满分 100 分
        - group [ref=e96]:
          - generic "查看代码" [ref=e97] [cursor=pointer]
  - region [ref=e98]:
    - heading "使用边界" [level=2] [ref=e99]
    - generic [ref=e100]:
      - generic [ref=e101]:
        - heading "适合用在" [level=3] [ref=e102]
        - list [ref=e103]:
          - listitem [ref=e104]: 标题、控件说明、正文和元信息需要建立稳定层级。
          - listitem [ref=e105]: 答案解析、评语与报告结论需要连续阅读。
          - listitem [ref=e106]: 少量关键数值承担视觉锚点，数字与中文单位分开。
      - generic [ref=e107]:
        - heading "避免用在" [level=3] [ref=e108]
        - list [ref=e109]:
          - listitem [ref=e110]: 把普通日期、序号、表格数值或中文单位切换为关键数据字体。
          - listitem [ref=e111]: 为每段文案另建字号、字体或同义包装组件。
          - listitem [ref=e112]: 仅为增大字号选择更高的 HTML 标题层级。
  - generic [ref=e113]:
    - region [ref=e114]:
      - heading "API 与结构" [level=2] [ref=e115]
      - table [ref=e117]:
        - caption [ref=e118]: Typography 文字排版 常用接口
        - rowgroup [ref=e119]:
          - row [ref=e120]:
            - columnheader "名称" [ref=e121]
            - columnheader "类型" [ref=e122]
            - columnheader "默认" [ref=e123]
            - columnheader "说明" [ref=e124]
        - rowgroup [ref=e125]:
          - row [ref=e126]:
            - rowheader [ref=e127]:
              - code [ref=e128]: rain-type-ui-default
            - cell [ref=e129]:
              - code [ref=e130]: ui · 14px / 22px
            - cell "—" [ref=e131]
            - cell "普通界面文字、表格正文和常规标签" [ref=e132]
          - row [ref=e133]:
            - rowheader [ref=e134]:
              - code [ref=e135]: rain-type-ui-compact
            - cell [ref=e136]:
              - code [ref=e137]: ui · 13px / 18px
            - cell "—" [ref=e138]
            - cell "紧凑标签、短提示和辅助字段" [ref=e139]
          - row [ref=e140]:
            - rowheader [ref=e141]:
              - code [ref=e142]: rain-type-ui-caption
            - cell [ref=e143]:
              - code [ref=e144]: ui · 12px / 20px
            - cell "—" [ref=e145]
            - cell "次要元数据、图注与短辅助信息" [ref=e146]
          - row [ref=e147]:
            - rowheader [ref=e148]:
              - code [ref=e149]: rain-type-ui-supporting
            - cell [ref=e150]:
              - code [ref=e151]: ui · 13px / 20px
            - cell "—" [ref=e152]
            - cell "面板短说明和内容补充" [ref=e153]
          - row [ref=e154]:
            - rowheader [ref=e155]:
              - code [ref=e156]: rain-type-heading-section
            - cell [ref=e157]:
              - code [ref=e158]: ui · 16px / 24px
            - cell "—" [ref=e159]
            - cell "卡片、区块标题和页面主标题" [ref=e160]
          - row [ref=e161]:
            - rowheader [ref=e162]:
              - code [ref=e163]: rain-type-heading-page
            - cell [ref=e164]:
              - code [ref=e165]: ui · 24px / 32px
            - cell "—" [ref=e166]
            - cell "极少使用的页面主标题与重要数据" [ref=e167]
          - row [ref=e168]:
            - rowheader [ref=e169]:
              - code [ref=e170]: rain-type-reading-small
            - cell [ref=e171]:
              - code [ref=e172]: reading · 14px / 24px
            - cell "—" [ref=e173]
            - cell "较紧凑的长内容阅读区" [ref=e174]
          - row [ref=e175]:
            - rowheader [ref=e176]:
              - code [ref=e177]: rain-type-reading-default
            - cell [ref=e178]:
              - code [ref=e179]: reading · 15px / 26px
            - cell "—" [ref=e180]
            - cell "答案解析、评语和报告结论" [ref=e181]
          - row [ref=e182]:
            - rowheader [ref=e183]:
              - code [ref=e184]: rain-type-reading-large
            - cell [ref=e185]:
              - code [ref=e186]: reading · 16px / 26px
            - cell "—" [ref=e187]
            - cell "更大字号的阅读区" [ref=e188]
          - row [ref=e189]:
            - rowheader [ref=e190]:
              - code [ref=e191]: rain-type-data-default
            - cell [ref=e192]:
              - code [ref=e193]: data · 36px / 42px
            - cell "—" [ref=e194]
            - cell "极少使用、承担视觉锚点的关键数值。36px 为默认，可选其他已登记字号，并检查对应行高。" [ref=e195]
      - paragraph [ref=e196]: Parts / Slots：原生 heading / paragraph / article、关键数据 label / value / unit
    - region [ref=e197]:
      - heading "调用示例" [level=2] [ref=e198]
      - generic [ref=e199]:
        - generic [ref=e200]:
          - button "复制代码" [ref=e201] [cursor=pointer]
          - status
        - code [ref=e204]: <> <header> <p className="rain-type-ui-caption">人工智能导论 · 第 04 讲</p> <h3 className="rain-type-heading-page">从问题到证据</h3> <p className="rain-type-ui-default">学习如何观察问题、识别证据，并形成可解释的判断。</p> <p className="rain-type-ui-caption">林老师 · 10 月 11 日更新 · 约 5 分钟阅读</p> </header> <article className="rain-type-reading-default"> <h4 className="rain-type-heading-section">先分清事实与判断</h4> <p>先描述你观察到的现象，再说明它能够支持什么判断。</p> </article> <p className="rain-type-ui-supporting">阅读后，请带着一条证据参加课堂讨论。</p> </>
      - paragraph [ref=e205]:
        - text: 当前源码：
        - code [ref=e206]: packages/foundations/src/typography-contract.ts
```

# Test source

```ts
  191 |   }
  192 |   await preset.selectOption("data-default");
  193 |   const dataSizes = await size.locator("option").evaluateAll(nodes => nodes.map(node => Number((node as HTMLOptionElement).value)));
  194 |   const value = sample.locator('[data-slot="statistic-value"]');
  195 |   const measured = await value.evaluate(node => ({ size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight, weight: getComputedStyle(node).fontWeight }));
  196 |   facts.push({ id: "data-default", choices: dataSizes, measured });
  197 |   writeFileSync(`${evidence}/typography-consumers-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  198 |   expect.soft(Math.max(...dataSizes)).toBe(28);
  199 |   expect.soft(dataSizes.every(candidate => candidate <= 28)).toBe(true);
  200 |   expect.soft(measured.size).toBe("28px");
  201 |   expect.soft(measured.line).toBe("36px");
  202 |   expect(measured.weight).toBe("700");
  203 |   await size.selectOption("24");
  204 |   await line.selectOption("32");
  205 |   await expect(value).toHaveCSS("font-size", "24px");
  206 |   await expect(value).toHaveCSS("line-height", "32px");
  207 |   await panel.getByRole("button", { name: "恢复完整方案", exact: true }).click();
  208 |   await expect(value).toHaveCSS("font-size", "28px");
  209 |   await expect(value).toHaveCSS("line-height", "36px");
  210 |   await panel.screenshot({ path: `${evidence}/typography-panel-${info.project.name}.png` });
  211 | });
  212 | 
  213 | test("Item lists aligned readable resources and keeps native keyboard navigation", async ({ page }, info) => {
  214 |   await page.goto("/#item");
  215 |   const list = page.getByRole("list", { name: "本讲课程资料", exact: true });
  216 |   await expect(list.getByRole("listitem")).toHaveCount(3);
  217 |   await expect(list.getByRole("button", { name: "课堂讨论任务尚未开放", exact: true })).toBeDisabled();
  218 |   const rows = list.locator('[data-rain-id="ui-item"][data-slot="root"]');
  219 |   await expect(rows).toHaveCount(3);
  220 |   const mediaSizes = await rows.evaluateAll(nodes => nodes.map(root => {
  221 |     const media = root.querySelector('[data-slot="media"]')!, icon = media.querySelector('[data-rain-id="icon"]')!;
  222 |     const box = media.getBoundingClientRect(), glyph = icon.getBoundingClientRect();
  223 |     const probe = document.createElement("span");
  224 |     probe.style.backgroundColor = "var(--rain-category-background-neutral-2)";
  225 |     media.append(probe);
  226 |     const expectedBackground = getComputedStyle(probe).backgroundColor;
  227 |     probe.remove();
  228 |     return { box: { width: box.width, height: box.height }, icon: { width: glyph.width, height: glyph.height }, background: getComputedStyle(media).backgroundColor, expectedBackground };
  229 |   }));
  230 |   writeFileSync(`${evidence}/item-${info.project.name}-media-sizes.json`, JSON.stringify(mediaSizes, null, 2));
  231 |   for (const media of mediaSizes) {
  232 |     expect.soft(media.box).toEqual({ width: 40, height: 40 });
  233 |     expect.soft(media.icon).toEqual({ width: 20, height: 20 });
  234 |     expect(media.background).toBe(media.expectedBackground);
  235 |   }
  236 |   const actionSizes = await rows.evaluateAll(nodes => nodes.flatMap(root => {
  237 |     const actions = root.querySelector('[data-slot="actions"]')!;
  238 |     const read = actions.querySelector("button"), download = actions.querySelector("a[download]");
  239 |     if (!read || !download) return [];
  240 |     const measure = (node: Element) => {
  241 |       const style = getComputedStyle(node), bounds = node.getBoundingClientRect();
  242 |       return { fontSize: style.fontSize, lineHeight: style.lineHeight, height: bounds.height, width: bounds.width };
  243 |     };
  244 |     return [{ title: root.querySelector('[data-slot="title"]')!.textContent, read: measure(read), download: measure(download) }];
  245 |   }));
  246 |   writeFileSync(`${evidence}/item-${info.project.name}-action-sizes.json`, JSON.stringify(actionSizes, null, 2));
  247 |   await page.getByRole("region", { name: "课程资料示例", exact: true }).screenshot({ path: `${evidence}/item-${info.project.name}-scene.png` });
  248 |   expect(actionSizes).toHaveLength(2);
  249 |   for (const row of actionSizes) {
  250 |     for (const key of ["fontSize", "lineHeight"] as const) expect.soft(row.read[key], `${row.title}: ${key}`).toBe(row.download[key]);
  251 |     for (const key of ["height", "width"] as const) expect.soft(row.read[key], `${row.title}: ${key}`).toBeCloseTo(row.download[key], 1);
  252 |     expect.soft(row.read.fontSize).toBe("14px");
  253 |     expect.soft(row.read.lineHeight).toBe("20px");
  254 |     expect.soft(row.read.height).toBe(26);
  255 |   }
  256 |   const first = rows.first();
  257 |   const layout = await rows.evaluateAll(nodes => nodes.map(root => {
  258 |     const content = root.querySelector('[data-slot="content"]')!;
  259 |     const title = root.querySelector('[data-slot="title"]')!;
  260 |     const bounds = root.getBoundingClientRect(), contentBounds = content.getBoundingClientRect();
  261 |     const style = getComputedStyle(title);
  262 |     return { rowWidth: bounds.width, contentLeft: contentBounds.left, contentWidth: contentBounds.width,
  263 |       titleWidth: title.clientWidth, titleScrollWidth: title.scrollWidth, clamp: style.webkitLineClamp,
  264 |       wrap: style.overflowWrap, text: title.textContent };
  265 |   }));
  266 |   for (const row of layout) {
  267 |     expect(row.rowWidth).toBeCloseTo(layout[0]!.rowWidth, 0);
  268 |     expect(row.contentLeft).toBeCloseTo(layout[0]!.contentLeft, 0);
  269 |     expect(row.contentWidth).toBeGreaterThanOrEqual(120);
  270 |     expect(row.titleScrollWidth).toBeLessThanOrEqual(row.titleWidth + 1);
  271 |     expect(row.clamp).toBe("none");
  272 |     expect(row.wrap).toBe("anywhere");
  273 |   }
  274 |   writeFileSync(`${evidence}/item-${info.project.name}-layout.json`, JSON.stringify(layout, null, 2));
  275 |   const padding = await first.evaluate(node => getComputedStyle(node).paddingTop);
  276 |   expect(padding).toBe("16px");
  277 |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  278 |   expect(await first.evaluate(node => getComputedStyle(node).paddingTop)).toBe("12px");
  279 |   const link = page.getByRole("link", { name: /文字排版规范/ });
  280 |   const navigationIcon = link.locator('[data-slot="media"] > [data-rain-id="icon"]');
  281 |   const iconFacts = await navigationIcon.evaluate(icon => {
  282 |     const probe = document.createElement("span");
  283 |     probe.style.color = "var(--rain-category-icon-neutral-3)";
  284 |     icon.parentElement!.append(probe);
  285 |     const expectedColor = getComputedStyle(probe).color;
  286 |     probe.remove();
  287 |     return { asset: icon.getAttribute("data-icon"), hidden: icon.getAttribute("aria-hidden"), color: getComputedStyle(icon).color, expectedColor };
  288 |   });
  289 |   writeFileSync(`${evidence}/item-${info.project.name}-navigation-icon.json`, JSON.stringify(iconFacts, null, 2));
  290 |   expect.soft(iconFacts.asset).toBe("icon/arrow-right");
> 291 |   expect.soft(iconFacts.color).toBe(iconFacts.expectedColor);
      |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  292 |   expect(iconFacts.hidden).toBe("true");
  293 |   await link.focus();
  294 |   await page.keyboard.press("Tab");
  295 |   await page.keyboard.press("Shift+Tab");
  296 |   await expect(link).toBeFocused();
  297 |   expect(await link.evaluate(node => getComputedStyle(node).outlineStyle)).toBe("solid");
  298 |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-focused-link.png`, fullPage: true });
  299 |   await page.keyboard.press("Enter");
  300 |   await expect(page).toHaveURL(/#typography$/);
  301 |   await expect(page.locator("#typography-title")).toBeFocused();
  302 | });
  303 | 
  304 | test("Item reading dialogs return focus and native downloads match the readable document", async ({ page }, info) => {
  305 |   await page.goto("/#item");
  306 |   const list = page.getByRole("list", { name: "本讲课程资料", exact: true });
  307 |   const first = list.getByRole("listitem").first();
  308 |   const trigger = first.getByRole("button", { name: "阅读课程导读", exact: true });
  309 |   await trigger.click();
  310 |   const dialog = page.getByRole("dialog", { name: "课程导读：从问题到证据", exact: true });
  311 |   await expect(dialog).toBeVisible();
  312 |   expect(await dialog.evaluate(root => root.contains(document.activeElement))).toBe(true);
  313 |   await page.keyboard.press("Tab");
  314 |   expect(await dialog.evaluate(root => root.contains(document.activeElement))).toBe(true);
  315 |   await page.keyboard.press("Escape");
  316 |   await expect(dialog).not.toBeVisible();
  317 |   await expect(trigger).toBeFocused();
  318 |   await page.keyboard.press("Enter");
  319 |   await expect(dialog).toBeVisible();
  320 |   const paragraphs = await dialog.locator("article p").allTextContents();
  321 |   expect(paragraphs).toHaveLength(3);
  322 |   await expect(dialog.locator("article p").first()).toHaveCSS("line-height", "26px");
  323 |   await dialog.screenshot({ path: `${evidence}/item-${info.project.name}-reading-dialog.png` });
  324 |   await dialog.getByRole("button", { name: "标记已读", exact: true }).click();
  325 |   await expect(dialog).not.toBeVisible();
  326 |   await expect(trigger).toBeFocused();
  327 |   await expect(first.getByText("已读", { exact: true })).toBeVisible();
  328 |   await expect(page.getByRole("status").filter({ hasText: "已读 1 / 2 份" })).toBeVisible();
  329 |   const downloadEvent = page.waitForEvent("download");
  330 |   await first.getByRole("link", { name: "下载课程导读", exact: true }).click();
  331 |   const download = await downloadEvent;
  332 |   expect(download.suggestedFilename()).toBe("课程导读.md");
  333 |   const savedPath = `${evidence}/course-guide-${info.project.name}.md`;
  334 |   await download.saveAs(savedPath);
  335 |   expect(readFileSync(savedPath, "utf8")).toBe(`# 课程导读：从问题到证据\n\n${paragraphs.join("\n\n")}\n`);
  336 |   await expect(page).toHaveURL(/#item$/);
  337 | });
  338 | 
  339 | test("Progress keeps actual quantities and external pause/error states", async ({ page }, info) => {
  340 |   await page.goto("/#progress");
  341 |   const task = page.getByRole("region", { name: "资料同步任务", exact: true });
  342 |   const controls = page.getByRole("group", { name: "演示控制", exact: true });
  343 |   const bar = task.getByRole("progressbar", { name: "资料同步", exact: true });
  344 |   expect((await task.boundingBox())!.width).toBeLessThanOrEqual(561);
  345 |   await expect(task.getByRole("button")).toHaveCount(1);
  346 |   await expect(task.getByRole("button", { name: "暂停同步", exact: true })).toBeVisible();
  347 |   await expect(bar).toHaveAttribute("aria-valuenow", "40");
  348 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  349 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  350 |   await task.getByRole("button", { name: "暂停同步", exact: true }).click();
  351 |   await expect(controls.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  352 |   await expect(task.getByRole("status")).toContainText("同步已暂停");
  353 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  354 |   await task.getByRole("button", { name: "继续同步", exact: true }).click();
  355 |   await controls.getByRole("button", { name: "模拟失败", exact: true }).click();
  356 |   await expect(task.getByRole("status")).toContainText("同步中断，请重试");
  357 |   await expect(task.getByRole("status")).toContainText("已完成 60 份");
  358 |   await expect(controls.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  359 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  360 |   await task.screenshot({ path: `${evidence}/progress-${info.project.name}-error.png` });
  361 |   await task.getByRole("button", { name: "重试同步", exact: true }).click();
  362 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  363 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  364 |   await expect(bar).toHaveAttribute("aria-valuenow", "100");
  365 |   await expect(bar).toHaveAttribute("data-state", "complete");
  366 |   await expect(task.getByRole("status")).toContainText("全部资料已同步");
  367 |   await expect(task.getByRole("button")).toHaveCount(0);
  368 |   await expect(task.getByRole("link", { name: "查看课程资料", exact: true })).toHaveAttribute("href", "#item");
  369 |   await task.screenshot({ path: `${evidence}/progress-${info.project.name}-complete.png` });
  370 |   await controls.getByRole("button", { name: "重新开始", exact: true }).click();
  371 |   await expect(bar).toHaveAttribute("aria-valuenow", "0");
  372 |   const unknown = page.getByRole("progressbar", { name: "正在解析资料", exact: true });
  373 |   await expect(unknown).not.toHaveAttribute("aria-valuenow");
  374 |   await expect(unknown).toHaveAttribute("data-state", "indeterminate");
  375 |   await expect(unknown.locator('[data-slot="progress-value"]')).toHaveCount(0);
  376 |   await expect(unknown.locator('[data-slot="progress-track"]')).toBeHidden();
  377 |   await expect(unknown.locator('[data-rain-id="ui-spinner"]')).toBeVisible();
  378 |   await expect(unknown.locator('[data-rain-id="ui-spinner"]')).toHaveAttribute("aria-hidden", "true");
  379 |   expect(await unknown.textContent()).not.toMatch(/\d+%/);
  380 |   await expect(page.getByRole("region", { name: "资料解析任务", exact: true })).toContainText("正在识别资料目录");
  381 |   const quantity = page.getByRole("progressbar", { name: "批改任务", exact: true });
  382 |   await expect(quantity).toHaveAttribute("aria-valuenow", "6");
  383 |   await expect(quantity).toHaveAttribute("aria-valuemax", "24");
  384 |   await expect(quantity.locator('[data-slot="progress-value"]')).toHaveText("25%");
  385 |   const facts = await quantity.evaluate(root => {
  386 |     const track = root.querySelector('[data-slot="progress-track"]')!;
  387 |     const indicator = root.querySelector('[data-slot="progress-indicator"]')!;
  388 |     return { trackWidth: track.getBoundingClientRect().width, indicatorWidth: indicator.getBoundingClientRect().width, trackHeight: track.getBoundingClientRect().height };
  389 |   });
  390 |   expect(facts.indicatorWidth / facts.trackWidth).toBeCloseTo(0.25, 2);
  391 |   expect(facts.trackHeight).toBe(8);
```