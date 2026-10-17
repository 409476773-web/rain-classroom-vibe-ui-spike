# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> Item lists aligned readable resources and keeps native keyboard navigation
- Location: tests/e2e/g4-components.spec.ts:219:1

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "arrow-right"
Received string:    "url(\"data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask0_52_60'%20style='mask-type:alpha'%20maskUnits='userSpaceOnUse'%20x='7'%20y='2'%20width='11'%20height='20'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M17.2069%2012.707C17.5975%2012.3165%2017.5975%2011.6833%2017.2069%2011.2928L8.72168%202.80752C8.33108%202.41702%207.69798%202.41702%207.30748%202.80752C6.91688%203.19802%206.91688%203.83122%207.30748%204.22172L15.0856%2011.9999L7.30748%2019.7781C6.91688%2020.1686%206.91688%2020.8018%207.30748%2021.1923C7.69798%2021.5828%208.33108%2021.5828%208.72168%2021.1923L17.2069%2012.707Z'%20fill='%231D2129'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_52_60)'%3e%3crect%20width='24'%20height='24'%20fill='%231D2129'/%3e%3c/g%3e%3c/svg%3e\")"
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Item 内容条目" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 共享候选 · 尚未发布
    - paragraph [ref=e11]: 把对象名称、属性、状态与操作组织成清楚的内容条目。连续列表保持稳定的对齐，独立动作靠近它们作用的对象。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [active] [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [pressed] [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "课程资料列表" [level=2] [ref=e21]
      - paragraph [ref=e22]: 围绕查找、阅读和下载组织资料。样例材料可实际打开，下载为对应的 Markdown 文本；已读状态仅保留在本页。
      - generic [ref=e23]:
        - region "课程资料示例" [ref=e24]:
          - generic [ref=e25]:
            - generic [ref=e26]:
              - paragraph [ref=e27]: 人工智能导论 · 第 04 讲
              - heading "从问题到证据" [level=3] [ref=e28]
            - generic [ref=e29]: 3 份资料
          - list "本讲课程资料" [ref=e30]:
            - listitem [ref=e31]:
              - generic [ref=e32]:
                - generic [ref=e35]:
                  - generic [ref=e36]:
                    - generic [ref=e37]: 课程导读：从问题到证据
                    - generic [ref=e38]: 课前必读
                  - paragraph [ref=e41]: 阅读材料 · 约 5 分钟 · 林老师
                  - generic [ref=e42]: 未读
                - generic [ref=e43]:
                  - button "阅读课程导读" [ref=e44] [cursor=pointer]:
                    - generic [ref=e45]: 阅读
                  - link "下载课程导读" [ref=e46] [cursor=pointer]:
                    - /url: data:text/markdown;charset=utf-8,…
                    - generic [ref=e47]: 下载
            - listitem [ref=e48]:
              - generic [ref=e50]:
                - generic [ref=e53]:
                  - generic [ref=e54]:
                    - generic [ref=e55]: 案例阅读：如何识别一条可靠的学习证据
                    - generic [ref=e56]: 拓展阅读
                  - paragraph [ref=e59]: 案例材料 · 约 8 分钟 · 林老师
                  - generic [ref=e60]: 未读
                - generic [ref=e61]:
                  - button "阅读案例阅读" [ref=e62] [cursor=pointer]:
                    - generic [ref=e63]: 阅读
                  - link "下载案例阅读" [ref=e64] [cursor=pointer]:
                    - /url: data:text/markdown;charset=utf-8,…
                    - generic [ref=e65]: 下载
            - listitem [ref=e66]:
              - generic [ref=e68]:
                - generic [ref=e71]:
                  - generic [ref=e72]:
                    - generic [ref=e73]: 课堂讨论任务与提交说明
                    - generic [ref=e74]: 课堂活动
                  - paragraph [ref=e77]: 讨论任务 · 10 月 16 日 09:00 开放
                  - generic [ref=e78]: 尚未开放
                - button "课堂讨论任务尚未开放" [disabled] [ref=e80]:
                  - generic [ref=e81]: 未开放
          - generic [ref=e82]:
            - generic [ref=e83]: 课前完成阅读，课堂一起讨论
            - status [ref=e84]: 已读 0 / 2 份
        - group [ref=e85]:
          - generic "查看代码" [ref=e86] [cursor=pointer]
    - generic [ref=e87]:
      - heading "整行链接" [level=2] [ref=e88]
      - paragraph [ref=e89]: 整条内容作为一个入口时，只保留展示信息和一个导航目标。
      - generic [ref=e90]:
        - link "文字排版规范 查看标题、正文和关键数字的使用方式。" [ref=e92] [cursor=pointer]:
          - /url: "#typography"
          - generic [ref=e93]:
            - generic [ref=e94]: 文字排版规范
            - paragraph [ref=e95]: 查看标题、正文和关键数字的使用方式。
        - group [ref=e98]:
          - generic "查看代码" [ref=e99] [cursor=pointer]
  - region [ref=e100]:
    - heading "使用边界" [level=2] [ref=e101]
    - generic [ref=e102]:
      - generic [ref=e103]:
        - heading "适合用在" [level=3] [ref=e104]
        - list [ref=e105]:
          - listitem [ref=e106]: 资料、通知、成员或任务摘要需要稳定的内容与动作排列。
          - listitem [ref=e107]: 普通列表需要清晰的分组与长内容换行。
      - generic [ref=e108]:
        - heading "避免用在" [level=3] [ref=e109]
        - list [ref=e110]:
          - listitem [ref=e111]: 表单字段使用 FormItem；导航选择使用 NavigationList 或 ObjectNavigator。
          - listitem [ref=e112]: 把含按钮、输入或其他链接的整条内容再包成链接或按钮。
          - listitem [ref=e113]: 为静态信息添加伪点击、tabIndex 或选择状态。
  - generic [ref=e114]:
    - region [ref=e115]:
      - heading "API 与结构" [level=2] [ref=e116]
      - table [ref=e118]:
        - caption [ref=e119]: Item 内容条目 常用接口
        - rowgroup [ref=e120]:
          - row [ref=e121]:
            - columnheader "名称" [ref=e122]
            - columnheader "类型" [ref=e123]
            - columnheader "默认" [ref=e124]
            - columnheader "说明" [ref=e125]
        - rowgroup [ref=e126]:
          - row [ref=e127]:
            - rowheader [ref=e128]:
              - code [ref=e129]: variant
            - cell [ref=e130]:
              - code [ref=e131]: "\"default\" | \"outline\" | \"muted\""
            - cell "\"default\"" [ref=e132]
            - cell "透明内容、轻边界与浅底承载。" [ref=e133]
          - row [ref=e134]:
            - rowheader [ref=e135]:
              - code [ref=e136]: size
            - cell [ref=e137]:
              - code [ref=e138]: "\"default\" | \"sm\" | \"xs\""
            - cell "—" [ref=e139]
            - cell "未指定时跟随父级 Density；显式尺寸只影响当前条目。" [ref=e140]
          - row [ref=e141]:
            - rowheader [ref=e142]:
              - code [ref=e143]: render
            - cell [ref=e144]:
              - code [ref=e145]: ReactElement / render function
            - cell "—" [ref=e146]
            - cell "复用原生链接等语义；整行链接内部只放非交互内容。" [ref=e147]
          - row [ref=e148]:
            - rowheader [ref=e149]:
              - code [ref=e150]: children / className / ref
            - cell [ref=e151]:
              - code [ref=e152]: React / native props
            - cell "—" [ref=e153]
            - cell "开放 Parts 组合和宿主布局，不内置业务状态。" [ref=e154]
      - paragraph [ref=e155]: Parts / Slots：ItemGroup、ItemMedia、ItemContent、ItemTitle、ItemDescription、ItemActions、ItemHeader、ItemFooter、ItemSeparator（复用 Separator）
    - region [ref=e156]:
      - heading "调用示例" [level=2] [ref=e157]
      - generic [ref=e158]:
        - generic [ref=e159]:
          - button "复制代码" [ref=e160] [cursor=pointer]
          - status
        - code [ref=e163]: "import { useState } from \"react\"; import { Button, Dialog, Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle, Link, Tag } from \"@rain-next/ui\"; import { FileIcon } from \"@rain-next/ui/icons/file\"; const resources = [ { id: \"guide\", label: \"课程导读\", title: \"课程导读：从问题到证据\", category: \"课前必读\", meta: \"阅读材料 · 约 5 分钟 · 林老师\", available: true, body: \"先描述你观察到的现象，再说明它能够支持什么判断。\" }, { id: \"evidence\", label: \"案例阅读\", title: \"案例阅读：如何识别一条可靠的学习证据\", category: \"拓展阅读\", meta: \"案例材料 · 约 8 分钟 · 林老师\", available: true, body: \"比较两份学习记录，找出支持判断的具体依据。\" }, { id: \"discussion\", label: \"课堂讨论任务\", title: \"课堂讨论任务与提交说明\", category: \"课堂活动\", meta: \"讨论任务 · 10 月 16 日 09:00 开放\", available: false, body: \"\" }, ]; export function CourseResources() { const [readIds, setReadIds] = useState<string[]>([]); return <section aria-label=\"课程资料示例\"> <h3 className=\"rain-type-heading-section\">从问题到证据</h3> <ItemGroup aria-label=\"本讲课程资料\"> {resources.map((resource, index) => <div role=\"listitem\" key={resource.id}> {index > 0 && <ItemSeparator decorative />} <Dialog.Root> <Item> <ItemMedia><FileIcon aria-hidden=\"true\" /></ItemMedia> <ItemContent> <ItemTitle>{resource.title}</ItemTitle> <Tag size={20} color={index === 0 ? \"brand\" : \"neutral\"}>{resource.category}</Tag> <ItemDescription>{resource.meta}</ItemDescription> <span className=\"rain-type-ui-caption\">{resource.available ? readIds.includes(resource.id) ? \"已读\" : \"未读\" : \"尚未开放\"}</span> </ItemContent> <ItemActions> {resource.available ? <> <Dialog.Trigger render={<Button variant=\"text\" size=\"regular\" tone=\"brand\" aria-label={\"阅读\" + resource.label}>阅读</Button>} /> <Link href={\"data:text/markdown;charset=utf-8,\" + encodeURIComponent(\"# \" + resource.title + \"\\n\\n\" + resource.body)} download={resource.label + \".md\"} aria-label={\"下载\" + resource.label}>下载</Link> </> : <Button variant=\"text\" size=\"regular\" disabled>未开放</Button>} </ItemActions> </Item> {resource.available && <Dialog.Content> <Dialog.Header><Dialog.Title>{resource.title}</Dialog.Title><Dialog.Description>{resource.meta}</Dialog.Description></Dialog.Header> <Dialog.Body><article className=\"rain-type-reading-default\"><p>{resource.body}</p></article></Dialog.Body> <Dialog.Footer> <Dialog.Close render={<Button variant=\"text\">返回列表</Button>} /> <Dialog.Close render={<Button variant=\"primary\" onClick={() => setReadIds(ids => ids.includes(resource.id) ? ids : [...ids, resource.id])}> {readIds.includes(resource.id) ? \"完成阅读\" : \"标记已读\"}</Button>} /> </Dialog.Footer> </Dialog.Content>} </Dialog.Root> </div>)} </ItemGroup> <p role=\"status\" className=\"rain-type-ui-caption\">已读 {readIds.length} / 2 份</p> </section>; }"
      - paragraph [ref=e164]:
        - text: 当前源码：
        - code [ref=e165]: packages/ui/src/item/item.tsx
```

# Test source

```ts
  205 |   for (const excluded of [32, 36, 40]) expect(dataSizes).not.toContain(excluded);
  206 |   await size.selectOption("24");
  207 |   await line.selectOption("32");
  208 |   await expect(value).toHaveCSS("font-size", "24px");
  209 |   await expect(value).toHaveCSS("line-height", "32px");
  210 |   await panel.getByRole("button", { name: "恢复完整方案", exact: true }).click();
  211 |   await expect(value).toHaveCSS("font-size", "28px");
  212 |   await expect(value).toHaveCSS("line-height", "36px");
  213 |   await preset.selectOption("reading-default");
  214 |   await size.selectOption("40");
  215 |   await expect(sample).toHaveCSS("font-size", "40px");
  216 |   await panel.screenshot({ path: `${evidence}/typography-panel-${info.project.name}.png` });
  217 | });
  218 | 
  219 | test("Item lists aligned readable resources and keeps native keyboard navigation", async ({ page }, info) => {
  220 |   await page.goto("/#item");
  221 |   const list = page.getByRole("list", { name: "本讲课程资料", exact: true });
  222 |   await expect(list.getByRole("listitem")).toHaveCount(3);
  223 |   await expect(list.getByRole("button", { name: "课堂讨论任务尚未开放", exact: true })).toBeDisabled();
  224 |   const rows = list.locator('[data-rain-id="ui-item"][data-slot="root"]');
  225 |   await expect(rows).toHaveCount(3);
  226 |   const mediaSizes = await rows.evaluateAll(nodes => nodes.map(root => {
  227 |     const media = root.querySelector('[data-slot="media"]')!, icon = media.querySelector('[data-rain-id="icon"]')!;
  228 |     const box = media.getBoundingClientRect(), glyph = icon.getBoundingClientRect();
  229 |     const probe = document.createElement("span");
  230 |     probe.style.backgroundColor = "var(--rain-category-background-neutral-2)";
  231 |     media.append(probe);
  232 |     const expectedBackground = getComputedStyle(probe).backgroundColor;
  233 |     probe.remove();
  234 |     return { box: { width: box.width, height: box.height }, icon: { width: glyph.width, height: glyph.height }, asset: icon.getAttribute("data-icon"), hidden: icon.getAttribute("aria-hidden"), background: getComputedStyle(media).backgroundColor, expectedBackground };
  235 |   }));
  236 |   writeFileSync(`${evidence}/item-${info.project.name}-media-sizes.json`, JSON.stringify(mediaSizes, null, 2));
  237 |   for (const media of mediaSizes) {
  238 |     expect.soft(media.box).toEqual({ width: 40, height: 40 });
  239 |     expect.soft(media.icon).toEqual({ width: 20, height: 20 });
  240 |     expect(media.asset).toBe("icon/file");
  241 |     expect(media.hidden).toBe("true");
  242 |     expect(media.background).toBe(media.expectedBackground);
  243 |   }
  244 |   const actionSizes = await rows.evaluateAll(nodes => nodes.flatMap(root => {
  245 |     const actions = root.querySelector('[data-slot="actions"]')!;
  246 |     const read = actions.querySelector("button"), download = actions.querySelector("a[download]");
  247 |     if (!read || !download) return [];
  248 |     const measure = (node: Element) => {
  249 |       const style = getComputedStyle(node), bounds = node.getBoundingClientRect();
  250 |       return { fontSize: style.fontSize, lineHeight: style.lineHeight, height: bounds.height, width: bounds.width };
  251 |     };
  252 |     return [{ title: root.querySelector('[data-slot="title"]')!.textContent, read: measure(read), download: measure(download) }];
  253 |   }));
  254 |   writeFileSync(`${evidence}/item-${info.project.name}-action-sizes.json`, JSON.stringify(actionSizes, null, 2));
  255 |   await page.getByRole("region", { name: "课程资料示例", exact: true }).screenshot({ path: `${evidence}/item-${info.project.name}-scene.png` });
  256 |   expect(actionSizes).toHaveLength(2);
  257 |   for (const row of actionSizes) {
  258 |     for (const key of ["fontSize", "lineHeight"] as const) expect.soft(row.read[key], `${row.title}: ${key}`).toBe(row.download[key]);
  259 |     for (const key of ["height", "width"] as const) expect.soft(row.read[key], `${row.title}: ${key}`).toBeCloseTo(row.download[key], 1);
  260 |     expect.soft(row.read.fontSize).toBe("14px");
  261 |     expect.soft(row.read.lineHeight).toBe("20px");
  262 |     expect.soft(row.read.height).toBe(26);
  263 |     expect.soft(row.read.width).toBe(40);
  264 |   }
  265 |   const first = rows.first();
  266 |   const layout = await rows.evaluateAll(nodes => nodes.map(root => {
  267 |     const content = root.querySelector('[data-slot="content"]')!;
  268 |     const title = root.querySelector('[data-slot="title"]')!;
  269 |     const bounds = root.getBoundingClientRect(), contentBounds = content.getBoundingClientRect();
  270 |     const style = getComputedStyle(title);
  271 |     return { rowWidth: bounds.width, contentLeft: contentBounds.left, contentWidth: contentBounds.width,
  272 |       titleWidth: title.clientWidth, titleScrollWidth: title.scrollWidth, clamp: style.webkitLineClamp,
  273 |       wrap: style.overflowWrap, text: title.textContent };
  274 |   }));
  275 |   for (const row of layout) {
  276 |     expect(row.rowWidth).toBeCloseTo(layout[0]!.rowWidth, 0);
  277 |     expect(row.contentLeft).toBeCloseTo(layout[0]!.contentLeft, 0);
  278 |     expect(row.contentWidth).toBeGreaterThanOrEqual(120);
  279 |     expect(row.titleScrollWidth).toBeLessThanOrEqual(row.titleWidth + 1);
  280 |     expect(row.clamp).toBe("none");
  281 |     expect(row.wrap).toBe("anywhere");
  282 |   }
  283 |   writeFileSync(`${evidence}/item-${info.project.name}-layout.json`, JSON.stringify(layout, null, 2));
  284 |   const padding = await first.evaluate(node => getComputedStyle(node).paddingTop);
  285 |   expect(padding).toBe("16px");
  286 |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  287 |   expect(await first.evaluate(node => getComputedStyle(node).paddingTop)).toBe("12px");
  288 |   const link = page.getByRole("link", { name: /文字排版规范/ });
  289 |   const navigationIcon = link.locator('[data-slot="media"] > [data-rain-id="icon"]');
  290 |   const iconFacts = [];
  291 |   for (const [theme, label] of [["light", "浅色"], ["dark", "深色"]] as const) {
  292 |     await page.getByRole("button", { name: label, exact: true }).click();
  293 |     const measured = await navigationIcon.evaluate(icon => {
  294 |       const probe = document.createElement("span");
  295 |       probe.style.color = "var(--rain-category-icon-neutral-3)";
  296 |       icon.parentElement!.append(probe);
  297 |       const expectedColor = getComputedStyle(probe).color;
  298 |       probe.remove();
  299 |       return { asset: icon.getAttribute("data-icon"), hidden: icon.getAttribute("aria-hidden"), color: getComputedStyle(icon).color, expectedColor, mask: getComputedStyle(icon).maskImage };
  300 |     });
  301 |     iconFacts.push({ theme, ...measured });
  302 |     expect.soft(measured.asset).toBe("icon/arrow-right");
  303 |     expect.soft(measured.color).toBe(measured.expectedColor);
  304 |     expect(measured.hidden).toBe("true");
> 305 |     expect(measured.mask).toContain("arrow-right");
      |                           ^ Error: expect(received).toContain(expected) // indexOf
  306 |     await link.screenshot({ path: `${evidence}/item-${info.project.name}-navigation-${theme}.png` });
  307 |     await navigationIcon.screenshot({ path: `${evidence}/item-${info.project.name}-arrow-right-${theme}.png` });
  308 |   }
  309 |   writeFileSync(`${evidence}/item-${info.project.name}-navigation-icon.json`, JSON.stringify(iconFacts, null, 2));
  310 |   await page.getByRole("button", { name: "浅色", exact: true }).click();
  311 |   await link.focus();
  312 |   await page.keyboard.press("Tab");
  313 |   await page.keyboard.press("Shift+Tab");
  314 |   await expect(link).toBeFocused();
  315 |   expect(await link.evaluate(node => getComputedStyle(node).outlineStyle)).toBe("solid");
  316 |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-focused-link.png`, fullPage: true });
  317 |   await page.keyboard.press("Enter");
  318 |   await expect(page).toHaveURL(/#typography$/);
  319 |   await expect(page.locator("#typography-title")).toBeFocused();
  320 | });
  321 | 
  322 | test("Item reading dialogs return focus and native downloads match the readable document", async ({ page }, info) => {
  323 |   await page.goto("/#item");
  324 |   const list = page.getByRole("list", { name: "本讲课程资料", exact: true });
  325 |   const first = list.getByRole("listitem").first();
  326 |   const trigger = first.getByRole("button", { name: "阅读课程导读", exact: true });
  327 |   await trigger.click();
  328 |   const dialog = page.getByRole("dialog", { name: "课程导读：从问题到证据", exact: true });
  329 |   await expect(dialog).toBeVisible();
  330 |   expect(await dialog.evaluate(root => root.contains(document.activeElement))).toBe(true);
  331 |   await page.keyboard.press("Tab");
  332 |   expect(await dialog.evaluate(root => root.contains(document.activeElement))).toBe(true);
  333 |   await page.keyboard.press("Escape");
  334 |   await expect(dialog).not.toBeVisible();
  335 |   await expect(trigger).toBeFocused();
  336 |   await page.keyboard.press("Enter");
  337 |   await expect(dialog).toBeVisible();
  338 |   const paragraphs = await dialog.locator("article p").allTextContents();
  339 |   expect(paragraphs).toHaveLength(3);
  340 |   await expect(dialog.locator("article p").first()).toHaveCSS("line-height", "26px");
  341 |   await dialog.screenshot({ path: `${evidence}/item-${info.project.name}-reading-dialog.png` });
  342 |   await dialog.getByRole("button", { name: "标记已读", exact: true }).click();
  343 |   await expect(dialog).not.toBeVisible();
  344 |   await expect(trigger).toBeFocused();
  345 |   await expect(first.getByText("已读", { exact: true })).toBeVisible();
  346 |   await expect(page.getByRole("status").filter({ hasText: "已读 1 / 2 份" })).toBeVisible();
  347 |   const downloadEvent = page.waitForEvent("download");
  348 |   await first.getByRole("link", { name: "下载课程导读", exact: true }).click();
  349 |   const download = await downloadEvent;
  350 |   expect(download.suggestedFilename()).toBe("课程导读.md");
  351 |   const savedPath = `${evidence}/course-guide-${info.project.name}.md`;
  352 |   await download.saveAs(savedPath);
  353 |   expect(readFileSync(savedPath, "utf8")).toBe(`# 课程导读：从问题到证据\n\n${paragraphs.join("\n\n")}\n`);
  354 |   await expect(page).toHaveURL(/#item$/);
  355 | });
  356 | 
  357 | test("Progress keeps actual quantities and external pause/error states", async ({ page }, info) => {
  358 |   await page.goto("/#progress");
  359 |   const task = page.getByRole("region", { name: "资料同步任务", exact: true });
  360 |   const controls = page.getByRole("group", { name: "演示控制", exact: true });
  361 |   const bar = task.getByRole("progressbar", { name: "资料同步", exact: true });
  362 |   expect((await task.boundingBox())!.width).toBeLessThanOrEqual(561);
  363 |   await expect(task.getByRole("button")).toHaveCount(1);
  364 |   await expect(task.getByRole("button", { name: "暂停同步", exact: true })).toBeVisible();
  365 |   await expect(bar).toHaveAttribute("aria-valuenow", "40");
  366 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  367 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  368 |   await task.getByRole("button", { name: "暂停同步", exact: true }).click();
  369 |   await expect(controls.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  370 |   await expect(task.getByRole("status")).toContainText("同步已暂停");
  371 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  372 |   await task.getByRole("button", { name: "继续同步", exact: true }).click();
  373 |   await controls.getByRole("button", { name: "模拟失败", exact: true }).click();
  374 |   await expect(task.getByRole("status")).toContainText("同步中断，请重试");
  375 |   await expect(task.getByRole("status")).toContainText("已完成 60 份");
  376 |   await expect(controls.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  377 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  378 |   await task.screenshot({ path: `${evidence}/progress-${info.project.name}-error.png` });
  379 |   await task.getByRole("button", { name: "重试同步", exact: true }).click();
  380 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  381 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  382 |   await expect(bar).toHaveAttribute("aria-valuenow", "100");
  383 |   await expect(bar).toHaveAttribute("data-state", "complete");
  384 |   await expect(task.getByRole("status")).toContainText("全部资料已同步");
  385 |   await expect(task.getByRole("button")).toHaveCount(0);
  386 |   await expect(task.getByRole("link", { name: "查看课程资料", exact: true })).toHaveAttribute("href", "#item");
  387 |   await task.screenshot({ path: `${evidence}/progress-${info.project.name}-complete.png` });
  388 |   await controls.getByRole("button", { name: "重新开始", exact: true }).click();
  389 |   await expect(bar).toHaveAttribute("aria-valuenow", "0");
  390 |   const unknown = page.getByRole("progressbar", { name: "正在解析资料", exact: true });
  391 |   await expect(unknown).not.toHaveAttribute("aria-valuenow");
  392 |   await expect(unknown).toHaveAttribute("data-state", "indeterminate");
  393 |   await expect(unknown.locator('[data-slot="progress-value"]')).toHaveCount(0);
  394 |   await expect(unknown.locator('[data-slot="progress-track"]')).toBeHidden();
  395 |   await expect(unknown.locator('[data-rain-id="ui-spinner"]')).toBeVisible();
  396 |   await expect(unknown.locator('[data-rain-id="ui-spinner"]')).toHaveAttribute("aria-hidden", "true");
  397 |   expect(await unknown.textContent()).not.toMatch(/\d+%/);
  398 |   await expect(page.getByRole("region", { name: "资料解析任务", exact: true })).toContainText("正在识别资料目录");
  399 |   const quantity = page.getByRole("progressbar", { name: "批改任务", exact: true });
  400 |   await expect(quantity).toHaveAttribute("aria-valuenow", "6");
  401 |   await expect(quantity).toHaveAttribute("aria-valuemax", "24");
  402 |   await expect(quantity.locator('[data-slot="progress-value"]')).toHaveText("25%");
  403 |   const facts = await quantity.evaluate(root => {
  404 |     const track = root.querySelector('[data-slot="progress-track"]')!;
  405 |     const indicator = root.querySelector('[data-slot="progress-indicator"]')!;
```