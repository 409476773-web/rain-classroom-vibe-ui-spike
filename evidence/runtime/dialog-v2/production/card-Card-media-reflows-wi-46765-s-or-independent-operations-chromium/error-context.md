# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: card.spec.ts >> Card media reflows without clipping content, focus or independent operations
- Location: tests/e2e/card.spec.ts:208:1

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 757.375
Received:    586.375
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - heading "Card 卡片" [level=1] [ref=e8]
    - paragraph [ref=e9]: 用卡片呈现独立内容，并围绕阅读、查看或提交组织操作。
    - generic [ref=e10]: 间距已确认 · 组件候选
  - region "预览设置" [ref=e13]:
    - generic [ref=e14]:
      - generic [ref=e15]: 主题
      - generic [ref=e16]:
        - combobox "主题" [ref=e18] [cursor=pointer]:
          - generic "浅色" [ref=e20]
        - generic [ref=e24]: 已选：浅色
      - textbox [ref=e25]: light
    - generic [ref=e26]:
      - generic [ref=e27]: 卡片内边距
      - generic [ref=e28]:
        - combobox "卡片内边距" [ref=e30] [cursor=pointer]:
          - generic "20px" [ref=e32]
        - generic [ref=e36]: 已选：20px
      - textbox [ref=e37]: "20"
    - generic [ref=e38]:
      - generic [ref=e39]: 课程卡布局
      - generic [ref=e40]:
        - combobox "课程卡布局" [active] [ref=e42] [cursor=pointer]:
          - generic "左图右文" [ref=e44]
        - generic [ref=e48]: 已选：左图右文
      - textbox [ref=e49]: side
    - generic [ref=e50] [cursor=pointer]:
      - checkbox "紧凑控件" [ref=e51]
      - generic [ref=e54]: 紧凑控件
  - group [ref=e56]:
    - generic "更多预览条件" [ref=e57] [cursor=pointer]
  - paragraph [ref=e58]: 四种卡片同步调整内边距，内容与宽度保持一致。默认内边距为 20px。以下内容使用虚构数据，操作仅在当前页面演示。
  - generic [ref=e59]:
    - region "简单信息卡" [ref=e60]:
      - paragraph [ref=e61]: 课程公告
      - article "课程公告" [ref=e62]:
        - generic [ref=e63]:
          - heading "课程公告" [level=2] [ref=e64]
          - paragraph [ref=e65]: 今天 09:30 · 教学团队
        - generic [ref=e66]: 请在周五前完成第三单元学习。遇到问题时，可以先回看课堂案例，再整理到讨论区。
    - region "课程媒体卡" [ref=e67]:
      - paragraph [ref=e68]: 课程介绍
      - article "统计学基础课程" [ref=e69]:
        - generic [ref=e70]:
          - img "课程缺省封面" [ref=e71]:
            - generic [ref=e72]: 课程封面
          - generic [ref=e73]:
            - generic [ref=e74]:
              - heading "统计学基础" [level=2] [ref=e75]
              - paragraph [ref=e76]: 从课堂案例出发，理解数据背后的规律。
            - generic [ref=e77]:
              - generic [ref=e78]: 专业基础
              - generic [ref=e81]: 8 个单元 · 24 份资料
            - generic [ref=e82]:
              - generic [ref=e83]: 本学期教学资料
              - button "查看课程" [ref=e84] [cursor=pointer]
            - status [ref=e86]
    - region "报表片段卡" [ref=e87]:
      - paragraph [ref=e88]: 学习进展
      - article "学习完成率" [ref=e89]:
        - generic [ref=e90]:
          - heading "学习完成率" [level=2] [ref=e91]
          - paragraph [ref=e92]: 第三单元
        - generic [ref=e93]:
          - generic [ref=e94]: "83"
          - generic [ref=e95]: "%"
        - generic [ref=e96]: 按全部学习任务统计
    - region "含操作卡" [ref=e98]:
      - paragraph [ref=e99]: 学习提醒
      - article "学习提醒" [ref=e100]:
        - generic [ref=e101]:
          - heading "学习提醒" [level=2] [ref=e102]
          - paragraph [ref=e103]: 为学生准备一条清晰的学习提示。
          - button "更多操作" [ref=e105] [cursor=pointer]
        - generic [ref=e108]:
          - generic [ref=e109]:
            - text: 提醒标题
            - textbox "提醒标题" [ref=e111]: 本周学习提醒
          - generic [ref=e113]:
            - generic [ref=e114]: 提醒对象
            - generic [ref=e115]:
              - generic [ref=e116]:
                - combobox "提醒对象" [ref=e117] [cursor=pointer]:
                  - generic "全部学生" [ref=e119]
                - button "清除选中内容" [ref=e121] [cursor=pointer]
              - generic [ref=e127]: 已选：全部学生
            - textbox [ref=e128]: all
          - status [ref=e129]
        - button "保存提醒" [ref=e131] [cursor=pointer]
  - group [ref=e133]:
    - generic "开发验证" [ref=e134] [cursor=pointer]
  - generic [ref=e135]:
    - heading "使用约定" [level=2] [ref=e136]
    - paragraph [ref=e137]: 卡片四周留白不小于内容分组间距；相关内容靠近，主要区块间距最多 16px。卡片留白与控件密度分别设置。课程封面可贴边，正文沿用同一留白规则。操作区默认与卡片同色；浅底色仅作为可选样式参考。
    - generic [ref=e138]: "import { Card, CardHeader, CardTitle, CardContent } from \"@rain-next/ui\"; <Card size=\"default\"> <CardHeader><CardTitle>课程公告</CardTitle></CardHeader> <CardContent>公告内容</CardContent> </Card>"
```

# Test source

```ts
  121 |       await page.getByText("更多预览条件", { exact: true }).click();
  122 |       for (const label of ["长内容", "窄容器"]) {
  123 |         const checkbox = page.getByRole("checkbox", { name: label, exact: true });
  124 |         if (await checkbox.isChecked() !== long) { await checkbox.focus(); await page.keyboard.press("Space"); }
  125 |       }
  126 |       await page.getByText("更多预览条件", { exact: true }).click();
  127 |       if (long) {
  128 |         await page.getByRole("button", { name: "保存提醒", exact: true }).click();
  129 |         await page.getByRole("button", { name: "查看课程", exact: true }).click();
  130 |       }
  131 |       for (const inset of [12, 16, 20, 24, 32]) {
  132 |         await choose(page, "卡片内边距", `${inset}px`);
  133 |         const geometry = await page.locator(".card-gallery").evaluate(gallery => {
  134 |           const box = (el: Element) => el.getBoundingClientRect();
  135 |           return Array.from(gallery.querySelectorAll<HTMLElement>('[data-rain-id="ui-card"]')).map(root => {
  136 |             const header = root.querySelector('[data-slot="header"]')!, content = root.querySelector('[data-slot="content"]')!;
  137 |             const footer = root.querySelector('[data-slot="footer"]'), body = root.querySelector(".course-card-body") ?? root;
  138 |             const first = content.children[0], second = content.children[1];
  139 |             const save = root.querySelector('.rain-button[data-variant="primary"]');
  140 |             const feedback = root.querySelector(".course-card-feedback");
  141 |             const last = feedback ?? footer?.lastElementChild ?? content;
  142 |             return {
  143 |               id: root.dataset.example, width: box(root).width,
  144 |               insetLeft: Number.parseFloat(getComputedStyle(content).paddingLeft),
  145 |               insetRight: Number.parseFloat(getComputedStyle(content).paddingRight),
  146 |               insetTop: box(header).top - box(body).top - (body === root ? 1 : 0),
  147 |               insetBottom: box(body).bottom - box(last!).bottom - (body === root ? 1 : 0),
  148 |               headerContent: box(content).top - box(header).bottom,
  149 |               contentFooter: footer ? box(save ?? footer).top - box(content).bottom : null,
  150 |               footerFeedback: feedback && footer ? box(feedback).top - box(footer).bottom : null,
  151 |               fieldGap: root.dataset.example === "cr-04" ? box(second!).top - box(first!).bottom : null,
  152 |               fieldInnerGap: root.dataset.example === "cr-04" ? Number.parseFloat(getComputedStyle(first!).rowGap) : null,
  153 |               controlHeight: root.querySelector('[data-rain-id="ui-input"]')?.getBoundingClientRect().height,
  154 |               buttonHeight: save ? box(save).height : null,
  155 |               titleSize: getComputedStyle(header.querySelector('[data-slot="title"]')!).fontSize,
  156 |               overflow: root.scrollWidth > root.clientWidth + 1,
  157 |             };
  158 |           });
  159 |         });
  160 |         for (const card of geometry) {
  161 |           expect(card.insetLeft).toBe(inset); expect(card.insetRight).toBe(inset);
  162 |           expect(card.insetTop).toBe(inset);
  163 |           expect(card.insetBottom).toBe(inset);
  164 |           expect(card.headerContent).toBe(Math.min(inset, 16));
  165 |           if (card.contentFooter !== null) expect(card.contentFooter).toBe(Math.min(inset, 16));
  166 |           if (card.footerFeedback !== null) expect(card.footerFeedback).toBe(Math.min(inset, 16));
  167 |           if (card.fieldGap !== null) {
  168 |             expect(card.fieldGap).toBeLessThanOrEqual(inset);
  169 |             expect(card.fieldGap).toBe(12); expect(card.fieldInnerGap).toBe(8);
  170 |             expect(card.controlHeight).toBe(32); expect(card.buttonHeight).toBe(32);
  171 |           }
  172 |           expect(card.titleSize).toBe("16px"); expect(card.overflow).toBe(false);
  173 |           expect(card.width).toBe(long ? 300 : 384);
  174 |         }
  175 |         await expect(input).toHaveValue("五档切换保留草稿");
  176 |         measurements.push({ theme, long, inset, cards: geometry });
  177 |         if (!long && theme === "浅色") {
  178 |           await page.locator(".card-gallery").screenshot({ path: testInfo.outputPath(`gallery-${inset}.png`) });
  179 |           await page.locator('[data-example="cr-04"]').screenshot({ path: testInfo.outputPath(`reminder-${inset}.png`) });
  180 |         }
  181 |         await page.getByText("更多预览条件", { exact: true }).click();
  182 |         const reminder = page.locator('[data-example="cr-04"]');
  183 |         const save = reminder.getByRole("button", { name: "保存提醒", exact: true });
  184 |         const beforeTint = { card: await reminder.boundingBox(), button: await save.boundingBox() };
  185 |         const tint = page.getByRole("checkbox", { name: "浅底操作区（样式参考）" });
  186 |         await tint.focus(); await page.keyboard.press("Space");
  187 |         expect({ card: await reminder.boundingBox(), button: await save.boundingBox() }).toEqual(beforeTint);
  188 |         await expect(reminder.locator('[data-slot="footer"]')).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  189 |         await tint.focus(); await page.keyboard.press("Space");
  190 |         const headerToggle = page.getByRole("checkbox", { name: "显示 Header" });
  191 |         const footerToggle = page.getByRole("checkbox", { name: "显示 Footer" });
  192 |         await headerToggle.focus(); await page.keyboard.press("Space");
  193 |         await expect(reminder.locator('[data-slot="header"]')).toHaveCount(0);
  194 |         expect(await reminder.evaluate(root => root.querySelector('[data-slot="content"]')!.getBoundingClientRect().top - root.getBoundingClientRect().top - 1)).toBe(inset);
  195 |         await footerToggle.focus(); await page.keyboard.press("Space");
  196 |         await expect(reminder.locator('[data-slot="footer"]')).toHaveCount(0);
  197 |         expect(await reminder.evaluate(root => root.getBoundingClientRect().bottom - root.querySelector('[data-slot="content"]')!.getBoundingClientRect().bottom - 1)).toBe(inset);
  198 |         await headerToggle.focus(); await page.keyboard.press("Space");
  199 |         await footerToggle.focus(); await page.keyboard.press("Space");
  200 |         await page.getByText("更多预览条件", { exact: true }).click();
  201 |         await expect(input).toHaveValue("五档切换保留草稿");
  202 |       }
  203 |     }
  204 |   }
  205 |   writeFileSync(testInfo.outputPath("spacing-matrix.json"), JSON.stringify(measurements, null, 2));
  206 | });
  207 | 
  208 | test("Card media reflows without clipping content, focus or independent operations", async ({ page }) => {
  209 |   await page.setViewportSize({ width: 1440, height: 1200 });
  210 |   await page.goto("/#card");
  211 |   const course = page.locator('[data-example="cr-02"]');
  212 |   const media = course.locator(".course-card-cover"), body = course.locator(".course-card-body");
  213 |   await choose(page, "课程卡布局", "上图下文");
  214 |   const before = await media.boundingBox();
  215 |   expect((await body.boundingBox())!.y).toBeGreaterThan(before!.y + before!.height - 1);
  216 |   await choose(page, "课程卡布局", "左图右文");
  217 |   expect((await body.boundingBox())!.x).toBeGreaterThan((await media.boundingBox())!.x + (await media.boundingBox())!.width - 1);
  218 |   for (const contentWidth of [479, 480, 481]) {
  219 |     await course.evaluate((el, value) => { el.style.width = `${value + 2}px`; }, contentWidth);
  220 |     const m = (await media.boundingBox())!, b = (await body.boundingBox())!;
> 221 |     if (contentWidth < 480) expect(b.y).toBeGreaterThanOrEqual(m.y + m.height - 1);
      |                                         ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  222 |     else expect(b.x).toBeGreaterThanOrEqual(m.x + m.width - 1);
  223 |   }
  224 |   await course.evaluate(el => el.style.removeProperty("width"));
  225 |   await expect(course).toHaveCSS("overflow", "visible");
  226 |   await page.getByRole("button", { name: "查看课程", exact: true }).click();
  227 |   await expect(course.getByRole("status")).toContainText("查看课程");
  228 |   await page.getByRole("textbox", { name: "提醒标题" }).fill("复习第三单元");
  229 |   await choose(page, "提醒对象", "尚未完成的学生");
  230 |   await page.getByRole("button", { name: "保存提醒", exact: true }).click();
  231 |   await expect(page.locator('[data-example="cr-04"]').getByRole("status")).toContainText("复习第三单元");
  232 |   const reminderCard = page.locator('[data-example="cr-04"]');
  233 |   await expect(reminderCard.getByRole("status")).toContainText("尚未完成的学生");
  234 |   await expect(course.getByRole("status")).toContainText("查看课程");
  235 |   await page.getByRole("textbox", { name: "提醒标题" }).fill("   ");
  236 |   await reminderCard.getByRole("button", { name: "保存提醒" }).click();
  237 |   await expect(page.getByRole("textbox", { name: "提醒标题" })).toHaveAttribute("aria-invalid", "true");
  238 |   await expect(page.getByRole("textbox", { name: "提醒标题" })).toHaveAccessibleDescription("请填写提醒标题。");
  239 |   await expect(reminderCard.getByRole("status")).toBeEmpty();
  240 |   await page.getByRole("textbox", { name: "提醒标题" }).fill("复习第三单元");
  241 |   await reminderCard.getByRole("button", { name: "清除选中内容" }).click();
  242 |   await reminderCard.getByRole("button", { name: "保存提醒" }).click();
  243 |   await expect(page.getByRole("combobox", { name: "提醒对象" })).toHaveAccessibleDescription("请选择提醒对象。");
  244 |   await expect(reminderCard.getByRole("status")).toBeEmpty();
  245 |   await choose(page, "提醒对象", "全部学生");
  246 |   await reminderCard.getByRole("button", { name: "保存提醒" }).click();
  247 |   await expect(reminderCard.getByRole("status")).toContainText("复习第三单元");
  248 |   await expect(reminderCard.getByRole("status")).toContainText("全部学生");
  249 |   const footer = reminderCard.locator('[data-slot="footer"]');
  250 |   await expect(footer).toHaveCSS("border-top-width", "0px");
  251 |   const footerBox = (await footer.boundingBox())!, buttonBox = (await reminderCard.getByRole("button", { name: "保存提醒" }).boundingBox())!;
  252 |   expect(Math.abs(footerBox.x + footerBox.width - buttonBox.x - buttonBox.width - 20)).toBeLessThan(1);
  253 |   const metric = page.locator('[data-example="cr-03"] [data-slot="value"]');
  254 |   expect(await metric.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeLessThanOrEqual(24);
  255 |   await expect(metric).toHaveCSS("font-size", "22px");
  256 |   await page.getByRole("button", { name: "更多操作", exact: true }).focus();
  257 |   await page.keyboard.press("Enter");
  258 |   await expect(page.getByRole("menuitem", { name: "复制提醒", exact: true })).toBeVisible();
  259 |   await page.keyboard.press("Escape");
  260 |   await expect(page.getByRole("button", { name: "更多操作", exact: true })).toBeFocused();
  261 |   await page.keyboard.press("Enter");
  262 |   await page.getByRole("menuitem", { name: "复制提醒", exact: true }).click();
  263 |   await expect(page.locator('[data-example="cr-04"]').getByRole("status")).toContainText("未写入剪贴板");
  264 |   await page.getByText("更多预览条件", { exact: true }).click();
  265 |   await page.getByRole("checkbox", { name: "长内容" }).focus(); await page.keyboard.press("Space");
  266 |   await page.getByRole("checkbox", { name: "窄容器" }).focus(); await page.keyboard.press("Space");
  267 |   const reminder = page.locator('[data-example="cr-04"]');
  268 |   for (const width of [300, 360, 361, 384]) {
  269 |     await reminder.evaluate((el, value) => { el.style.width = `${value}px`; }, width);
  270 |     for (const titleText of ["学习提醒", "第三单元学习提醒与后续课堂安排、材料准备和学习任务说明", "UninterruptedEnglishTitle".repeat(5)]) {
  271 |       await reminder.locator('[data-slot="title"]').evaluate((el, text) => { el.textContent = text; }, titleText);
  272 |       const title = (await reminder.locator('[data-slot="title"]').boundingBox())!;
  273 |       const action = (await reminder.getByRole("button", { name: "更多操作" }).boundingBox())!;
  274 |       expect(action.x).toBeGreaterThanOrEqual(title.x + title.width);
  275 |       expect(Math.abs(action.y - title.y)).toBeLessThan(2);
  276 |       expect(await reminder.evaluate(el => el.scrollWidth <= el.clientWidth + 2)).toBe(true);
  277 |     }
  278 |   }
  279 |   await reminder.evaluate(el => el.style.removeProperty("width"));
  280 |   expect((await body.boundingBox())!.y).toBeGreaterThan((await media.boundingBox())!.y + (await media.boundingBox())!.height - 1);
  281 |   const metricCard = page.locator('[data-example="cr-03"]');
  282 |   await metricCard.locator('[data-slot="value"]').evaluate(el => { el.textContent = "12345678901234567890"; });
  283 |   expect(await metricCard.evaluate(el => el.scrollWidth <= el.clientWidth + 2)).toBe(true);
  284 |   await expect(metricCard.locator('[data-slot="value"]')).toHaveCSS("font-size", "22px");
  285 |   await course.locator('[data-slot="title"]').evaluate(el => { el.textContent += "AnUninterruptedEnglishCourseTitle".repeat(5); });
  286 |   for (const element of await page.locator(".card-gallery .rain-card").all()) {
  287 |     expect(await element.evaluate(el => el.scrollWidth <= el.clientWidth + 2)).toBe(true);
  288 |   }
  289 | });
  290 | 
  291 | test("Card themes and preference emulation retain visible content", async ({ page }, testInfo) => {
  292 |   await page.setViewportSize({ width: 1440, height: 1200 });
  293 |   await page.goto("/#card");
  294 |   async function checkFooterReference(theme: string) {
  295 |     const reminder = page.locator('[data-example="cr-04"]');
  296 |     const footer = reminder.locator('[data-slot="footer"]');
  297 |     await expect(footer).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  298 |     await expect(footer).toHaveCSS("border-top-width", "0px");
  299 |     const height = (await reminder.boundingBox())!.height;
  300 |     await reminder.screenshot({ path: testInfo.outputPath(`${theme}-reminder-default.png`) });
  301 |     await page.getByText("更多预览条件", { exact: true }).click();
  302 |     const reference = page.getByRole("checkbox", { name: "浅底操作区（样式参考）" });
  303 |     await expect(reference).not.toBeChecked();
  304 |     await page.getByRole("textbox", { name: "提醒标题" }).fill("保留样式切换草稿");
  305 |     await reference.focus(); await page.keyboard.press("Space");
  306 |     await expect(footer).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  307 |     await expect(footer).not.toHaveCSS("background-color", await reminder.evaluate(el => getComputedStyle(el).backgroundColor));
  308 |     expect((await reminder.boundingBox())!.height).toBe(height);
  309 |     await reminder.screenshot({ path: testInfo.outputPath(`${theme}-reminder-reference.png`) });
  310 |     await reference.focus(); await page.keyboard.press("Space");
  311 |     await expect(footer).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  312 |     await expect(page.getByRole("textbox", { name: "提醒标题" })).toHaveValue("保留样式切换草稿");
  313 |     await page.getByText("更多预览条件", { exact: true }).click();
  314 |   }
  315 |   await checkFooterReference("light");
  316 |   const target = page.locator('[data-example="cr-01"]');
  317 |   const light = await target.evaluate(el => getComputedStyle(el).backgroundColor);
  318 |   await page.screenshot({ path: testInfo.outputPath("card-light.png"), fullPage: true });
  319 |   await recordCardAppearance(page, testInfo, "light");
  320 |   await choose(page, "主题", "深色");
  321 |   await expect(page.getByRole("heading", { level: 1 })).toHaveCSS("color", await page.locator(".card-review").evaluate(el => getComputedStyle(el).color));
```