# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: questionnaire-reuse.spec.ts >> baseline/current ordinary DOM-paint-geometry equality and questionnaire visual matrix
- Location: tests/e2e/questionnaire-reuse.spec.ts:270:1

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.screenshot: Test timeout of 120000ms exceeded.
Call log:
  - waiting for locator('[data-reuse-era="before"]').locator('[data-visual="ordinary"]')
    - waiting for "http://127.0.0.1:5477/?questionnaire-reuse-fixture=4" navigation to finish...
    - navigated to "http://127.0.0.1:5477/?questionnaire-reuse-fixture=4#questionnaire"

```

# Page snapshot

```yaml
- main [ref=f3e5]:
  - generic [ref=f3e6]:
    - link "返回组件目录" [ref=f3e7] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=f3e9]:
      - heading "Questionnaire 逐题问答" [level=1] [ref=f3e10]
      - generic [ref=f3e11]: UI · 文档页试改 · 公共组件待评审
    - paragraph [ref=f3e12]: 聚焦一题，允许返回修改；保留原生表单，提交后由宿主呈现结果。
    - generic "预览设置" [ref=f3e13]:
      - button "浅色" [pressed] [ref=f3e14] [cursor=pointer]
      - button "深色" [ref=f3e16] [cursor=pointer]
      - button "紧凑密度" [ref=f3e18] [cursor=pointer]
  - generic [ref=f3e20]:
    - generic [ref=f3e21]:
      - heading "课堂反馈" [level=2] [ref=f3e22]
      - paragraph [ref=f3e23]: 逐题作答、回改和条件补充；成功后切换到本次完成摘要。
      - generic [ref=f3e25]:
        - generic [ref=f3e26]:
          - generic [ref=f3e27]: 课堂观察与证据判断
          - generic [ref=f3e28]: 课后反馈 · 本地演示
        - form "课堂反馈" [ref=f3e29]:
          - progressbar "问答进度" [ref=f3e30]: 第 1 题 · 当前共 3 题
          - group "这节课，你最希望得到什么帮助？" [ref=f3e31]:
            - paragraph [ref=f3e33]: 选择最需要的一项，帮助老师安排后续学习。
            - generic [ref=f3e34]:
              - generic [ref=f3e35] [cursor=pointer]:
                - radio "希望多看示例 通过例子理解事实和解释。" [ref=f3e36]
                - generic [ref=f3e39]:
                  - generic [ref=f3e40]: 希望多看示例
                  - generic [ref=f3e41]: 通过例子理解事实和解释。
                - generic: A
              - generic [ref=f3e42] [cursor=pointer]:
                - radio "希望加强练习 练习记录与判断。" [ref=f3e43]
                - generic [ref=f3e46]:
                  - generic [ref=f3e47]: 希望加强练习
                  - generic [ref=f3e48]: 练习记录与判断。
                - generic: B
              - generic [ref=f3e49] [cursor=pointer]:
                - radio "其他目标 接下来需要补充说明。" [ref=f3e50]
                - generic [ref=f3e53]:
                  - generic [ref=f3e54]: 其他目标
                  - generic [ref=f3e55]: 接下来需要补充说明。
                - generic: C
          - button "下一题" [ref=f3e57] [cursor=pointer]
        - generic [ref=f3e58]:
          - generic [ref=f3e59]: 需要稍后继续？
          - button "保存本页草稿" [ref=f3e60] [cursor=pointer]
          - button "恢复草稿" [disabled] [ref=f3e62]
        - group [ref=f3e64]:
          - generic "演示控制" [ref=f3e65] [cursor=pointer]
    - generic [ref=f3e66]:
      - heading "默认、局改与未改兄弟" [level=2] [ref=f3e67]
      - paragraph [ref=f3e68]: 只改中间样板的Title；三个原生表单与答案分别独立。
      - generic [ref=f3e70]:
        - generic [ref=f3e71]:
          - form "默认偏好样板" [ref=f3e72]:
            - progressbar "问答进度" [ref=f3e73]: 第 1 题，共 1 题
            - group "回答长度" [ref=f3e74]:
              - generic [ref=f3e76]:
                - generic [ref=f3e77] [cursor=pointer]:
                  - radio "简短回答" [ref=f3e78]
                  - generic [ref=f3e81]: 简短回答
                - generic [ref=f3e82] [cursor=pointer]:
                  - radio "展开说明" [ref=f3e83]
                  - generic [ref=f3e86]: 展开说明
            - button "应用偏好" [ref=f3e88] [cursor=pointer]
          - status [ref=f3e89]: 默认偏好样板
        - generic [ref=f3e90]:
          - form "局改偏好样板" [ref=f3e91]:
            - progressbar "问答进度" [ref=f3e92]: 第 1 题，共 1 题
            - group "回答长度" [ref=f3e93]:
              - generic [ref=f3e95]:
                - generic [ref=f3e96] [cursor=pointer]:
                  - radio "简短回答" [ref=f3e97]
                  - generic [ref=f3e100]: 简短回答
                - generic [ref=f3e101] [cursor=pointer]:
                  - radio "展开说明" [ref=f3e102]
                  - generic [ref=f3e105]: 展开说明
            - button "应用偏好" [ref=f3e107] [cursor=pointer]
          - status [ref=f3e108]: 局改偏好样板
        - generic [ref=f3e109]:
          - form "未改兄弟偏好样板" [ref=f3e110]:
            - progressbar "问答进度" [ref=f3e111]: 第 1 题，共 1 题
            - group "回答长度" [ref=f3e112]:
              - generic [ref=f3e114]:
                - generic [ref=f3e115] [cursor=pointer]:
                  - radio "简短回答" [ref=f3e116]
                  - generic [ref=f3e119]: 简短回答
                - generic [ref=f3e120] [cursor=pointer]:
                  - radio "展开说明" [ref=f3e121]
                  - generic [ref=f3e124]: 展开说明
            - button "应用偏好" [ref=f3e126] [cursor=pointer]
          - status [ref=f3e127]: 未改兄弟偏好样板
    - generic [ref=f3e128]:
      - heading "持久化与消费边界" [level=2] [ref=f3e129]
      - paragraph [ref=f3e131]: 本页草稿仅保存在当前组件状态中。实际产品由宿主决定保存位置、恢复策略与隐私边界。题目集合使用稳定name，提交读取真实FormData与onStatusChange状态。恢复的是答案和上次跳过元信息；引擎没有默认skipped入口，因此恢复后须重新确认跳过。最后一题的Skip沿源码会自动提交，宿主明确显示“跳过并提交”。
  - region [ref=f3e132]:
    - heading "使用边界" [level=2] [ref=f3e133]
    - generic [ref=f3e134]:
      - generic [ref=f3e135]:
        - heading "适合用在" [level=3] [ref=f3e136]
        - list [ref=f3e137]:
          - listitem [ref=f3e138]: 短反馈与偏好问答需要单题节奏。
          - listitem [ref=f3e139]: 需要单选、多选、文本与条件题。
      - generic [ref=f3e140]:
        - heading "避免用在" [level=3] [ref=f3e141]
        - list [ref=f3e142]:
          - listitem [ref=f3e143]: 问卷编辑器、考试评分或复杂跳转系统。
          - listitem [ref=f3e144]: 把宿主摘要当作来源新增Summary Part。
  - generic [ref=f3e145]:
    - region [ref=f3e146]:
      - heading "API 与结构" [level=2] [ref=f3e147]
      - table [ref=f3e149]:
        - caption [ref=f3e150]: Questionnaire 逐题问答 常用接口
        - rowgroup [ref=f3e151]:
          - row [ref=f3e152]:
            - columnheader "名称" [ref=f3e153]
            - columnheader "类型" [ref=f3e154]
            - columnheader "默认" [ref=f3e155]
            - columnheader "说明" [ref=f3e156]
        - rowgroup [ref=f3e157]:
          - row [ref=f3e158]:
            - rowheader [ref=f3e159]:
              - code [ref=f3e160]: items / item / onItemChange
            - cell [ref=f3e161]:
              - code [ref=f3e162]: QuestionnaireItemDefinition[] / string / callback
            - cell "—" [ref=f3e163]
            - cell "明确集合支持SSR；宿主可控制当前题。" [ref=f3e164]
          - row [ref=f3e165]:
            - rowheader [ref=f3e166]:
              - code [ref=f3e167]: name / required / multiple
            - cell [ref=f3e168]:
              - code [ref=f3e169]: 原生fieldset语义
            - cell "—" [ref=f3e170]
            - cell "引擎维护答案；一个真实input对应一个choice。" [ref=f3e171]
          - row [ref=f3e172]:
            - rowheader [ref=f3e173]:
              - code [ref=f3e174]: shortcuts
            - cell [ref=f3e175]:
              - code [ref=f3e176]: letters / numbers
            - cell "—" [ref=f3e177]
            - cell "保留来源快捷键；输入组合期间不自动提交。" [ref=f3e178]
      - paragraph [ref=f3e179]: Parts / Slots：Root、Progress、Item、Title、Description、Choices、Choice、ChoiceDescription、Input、Error、Actions、Previous、Skip、Next、Submit
    - region [ref=f3e180]:
      - heading "调用示例" [level=2] [ref=f3e181]
      - generic [ref=f3e182]:
        - generic [ref=f3e183]:
          - button "复制代码" [ref=f3e184] [cursor=pointer]
          - status
        - code [ref=f3e187]: "const items=[{name:\"goal\",required:true,choices:[{value:\"review\"}]},{name:\"note\"}]; <Questionnaire items={items} onSubmit={e=>{e.preventDefault(); save(new FormData(e.currentTarget));}}> <QuestionnaireProgress /><QuestionnaireItem name=\"goal\" required><QuestionnaireTitle>学习目标</QuestionnaireTitle><QuestionnaireChoice value=\"review\">复习</QuestionnaireChoice><QuestionnaireError /></QuestionnaireItem> <QuestionnaireItem name=\"note\"><QuestionnaireTitle>补充</QuestionnaireTitle><QuestionnaireInput aria-label=\"补充说明\" /></QuestionnaireItem> <QuestionnaireActions><QuestionnairePrevious /><QuestionnaireSkip /><QuestionnaireNext /><QuestionnaireSubmit /></QuestionnaireActions> </Questionnaire>"
      - paragraph [ref=f3e188]:
        - text: 当前源码：
        - code [ref=f3e189]: packages/ui/src/questionnaire/questionnaire.tsx
```

# Test source

```ts
  190 |       const form = page.getByRole("form", { name: `Comparison ${era}`, exact: true });
  191 |       const input = form.getByRole("textbox", { name: "Free answer", exact: true });
  192 |       await input.fill("new text");
  193 |       if (reset === "current") {
  194 |         await input.fill(""); await input.pressSequentially("x".repeat(121)); await expect(input).toHaveValue("x".repeat(120));
  195 |         expect(await input.evaluate(node => ({ min: (node as HTMLInputElement).minLength, pattern: (node as HTMLInputElement).pattern, size: (node as HTMLInputElement).size }))).toEqual({ min: 2, pattern: ".{2,}", size: 20 });
  196 |         await input.fill(""); await input.pressSequentially("😀".repeat(61)); await expect(input).toHaveValue("😀".repeat(60));
  197 |         await input.fill(""); await input.pressSequentially("x");
  198 |         expect(await input.evaluate(node => (node as HTMLInputElement).validity.tooShort)).toBe(true);
  199 |         expect(await input.evaluate(node => (node as HTMLInputElement).validity.patternMismatch)).toBe(true);
  200 |       }
  201 |       if (reset === "old-text" || reset === "default-old-text") await form.getByRole("radio", { name: "Alpha", exact: true }).locator("..").click();
  202 |       if (reset === "skip") { await form.getByRole("button", { name: "Skip", exact: true }).click(); await form.getByRole("button", { name: "Previous", exact: true }).click(); }
  203 |       const before = await facts(form);
  204 |       await form.getByRole("button", { name: "Reset", exact: true }).click();
  205 |       records.push({ era, before, after: await facts(form) });
  206 |     }
  207 |     expect(records[0]!.before, reset).toEqual(records[1]!.before);
  208 |     expect(records[0]!.after, reset).toEqual(records[1]!.after);
  209 |     report.push({ reset, records });
  210 |   }
  211 |   writeFileSync(resolve(evidence, `native-reset-${info.project.name}.json`), JSON.stringify(report, null, 2));
  212 | });
  213 | 
  214 | test("shared field focus/permissions, forced colors, and actual 390px input hit area", async ({ page }, info) => {
  215 |   await mount(page, { mode: "visual" });
  216 |   const after = page.locator('[data-reuse-era="after"]'), normal = after.getByRole("textbox", { name: "normal answer", exact: true });
  217 |   const invalid = after.getByRole("textbox", { name: "invalid answer", exact: true }), disabled = after.getByRole("textbox", { name: "disabled answer", exact: true }), readonly = after.getByRole("textbox", { name: "readonly answer", exact: true });
  218 |   await expect(disabled).toBeDisabled(); await expect(disabled.locator("..")).toHaveAttribute("data-state", "disabled");
  219 |   await expect(readonly).toHaveAttribute("readonly", ""); await expect(readonly.locator("..")).toHaveAttribute("data-permission", "readonly");
  220 |   await expect(invalid.locator("..")).toHaveAttribute("data-status", "error");
  221 |   const normalForm = after.getByRole("form", { name: "after normal", exact: true });
  222 |   const choice = normalForm.getByRole("radio", { name: "未选项", exact: true }), shape = choice.locator("..").locator('[data-slot="control"]');
  223 |   await choice.focus(); await choice.press("Space"); await expect(choice).toBeChecked();
  224 |   await expect(shape).toHaveCSS("outline-style", "solid");
  225 |   const invalidChoice = after.getByRole("form", { name: "after invalid", exact: true }).getByRole("radio", { name: "未选项", exact: true }).locator("..");
  226 |   await expect(invalidChoice).toHaveAttribute("data-invalid");
  227 |   const invalidBorder = await invalidChoice.evaluate(node => { const probe = document.createElement("span"); node.append(probe); probe.style.color = "var(--rain-category-border-red-1)"; const expected = getComputedStyle(probe).color; probe.remove(); return expected; });
  228 |   await expect(invalidChoice).toHaveCSS("border-color", invalidBorder);
  229 |   await expect(after.getByRole("form", { name: "after invalid", exact: true }).getByRole("radio", { name: "选中项", exact: true }).locator("..")).toHaveCSS("border-color", invalidBorder);
  230 |   const report = [];
  231 |   for (const name of ["custom-normal", "custom-invalid"]) {
  232 |     const form = after.getByRole("form", { name, exact: true }), labels = form.locator('label[data-slot="choice"]');
  233 |     await expect(labels).toHaveCount(3);
  234 |     const paints = await labels.evaluateAll(nodes => nodes.map(node => {
  235 |       const css = getComputedStyle(node), box = node.getBoundingClientRect();
  236 |       return { tag: node.tagName, nestedLabels: node.querySelectorAll("label").length, inputs: node.querySelectorAll("input").length, sharedCard: node.classList.contains("rain-selection-card"), border: css.border, color: css.color, background: css.backgroundColor, backgroundImage: css.backgroundImage, radius: css.borderRadius, padding: css.padding, width: box.width, height: box.height };
  237 |     }));
  238 |     expect(paints[0]).toMatchObject({ tag: "LABEL", nestedLabels: 0, inputs: 1, sharedCard: true });
  239 |     expect(paints[1], `${name} function`).toEqual(paints[0]); expect(paints[2], `${name} element`).toEqual(paints[0]);
  240 |     if (name === "custom-invalid") for (const label of await labels.all()) await expect(label).toHaveCSS("border-color", invalidBorder);
  241 |     report.push({ name, paints });
  242 |   }
  243 |   const select = after.getByRole("combobox", { name: "Select sibling", exact: true }), textarea = after.getByRole("textbox", { name: "Textarea sibling", exact: true });
  244 |   for (const target of [normal, invalid, readonly, select, textarea]) {
  245 |     await target.focus(); await target.press("Tab"); await page.keyboard.press("Shift+Tab");
  246 |     await expect(target).toBeFocused(); await expect(target.locator("..")).toHaveCSS("outline-width", "1px");
  247 |     report.push(await target.evaluate(node => { const css = getComputedStyle(node.parentElement!); return { label: node.getAttribute("aria-label"), outline: css.outline, shadow: css.boxShadow }; }));
  248 |   }
  249 |   if (info.project.name === "narrow") {
  250 |     await normal.scrollIntoViewIfNeeded();
  251 |     const box = (await normal.boundingBox())!; expect(box.height).toBeGreaterThanOrEqual(44);
  252 |     for (const y of [box.y + 2, box.y + box.height - 2]) {
  253 |       await normal.evaluate(node => (node as HTMLInputElement).blur()); await page.mouse.click(box.x + box.width / 2, y); await expect(normal).toBeFocused();
  254 |     }
  255 |     expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  256 |     report.push({ actualInputHeight: box.height, topAndBottomClicksFocus: true });
  257 |   }
  258 |   await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  259 |   for (const target of [normal, select, textarea]) {
  260 |     await target.focus(); await target.press("Tab"); await page.keyboard.press("Shift+Tab");
  261 |     await expect(target.locator("..")).toHaveCSS("outline-width", "2px"); await expect(target.locator("..")).toHaveCSS("box-shadow", "none");
  262 |   }
  263 |   await choice.focus(); await expect(shape).toHaveCSS("outline-width", "2px");
  264 |   const placeholder = await normal.evaluate(node => getComputedStyle(node, "::placeholder").color);
  265 |   expect(placeholder).not.toBe("rgba(0, 0, 0, 0)");
  266 |   await after.screenshot({ path: resolve(evidence, `forced-colors-${info.project.name}.png`) });
  267 |   writeFileSync(resolve(evidence, `focus-hit-area-${info.project.name}.json`), JSON.stringify({ report, placeholder }, null, 2));
  268 | });
  269 | 
  270 | test("baseline/current ordinary DOM-paint-geometry equality and questionnaire visual matrix", async ({ page }, info) => {
  271 |   test.setTimeout(120_000);
  272 |   const report = [];
  273 |   for (const theme of ["light", "dark"] as const) for (const density of ["default", "compact"] as const) {
  274 |     await mount(page, { mode: "visual", theme, density });
  275 |     const records = [];
  276 |     for (const era of ["before", "after"]) {
  277 |       const panel = page.locator(`[data-reuse-era="${era}"]`), ordinary = panel.locator('[data-visual="ordinary"]');
  278 |       const facts = await ordinary.evaluate(host => {
  279 |         const origin = host.getBoundingClientRect();
  280 |         return [...host.querySelectorAll("*")].map(node => {
  281 |           const css = getComputedStyle(node), r = node.getBoundingClientRect();
  282 |           const round = (n: number) => Math.round(n * 100) / 100;
  283 |           return { tag: node.tagName, classes: [...node.classList].sort(), slot: node.getAttribute("data-slot"), state: node.getAttribute("data-state"), text: node.childElementCount ? null : node.textContent,
  284 |             input: node instanceof HTMLInputElement ? { type: node.type, checked: node.checked, disabled: node.disabled, mixed: node.indeterminate } : null,
  285 |             box: { x: round(r.x - origin.x), y: round(r.y - origin.y), width: round(r.width), height: round(r.height) },
  286 |             css: { color: css.color, background: css.backgroundColor, backgroundImage: css.backgroundImage, border: css.border, radius: css.borderRadius, padding: css.padding, gap: css.gap, font: css.font, opacity: css.opacity, outline: css.outline, shadow: css.boxShadow } };
  287 |         });
  288 |       });
  289 |       records.push({ era, facts });
> 290 |       await ordinary.screenshot({ path: resolve(evidence, `ordinary-${era}-${theme}-${density}-${info.project.name}.png`) });
      |                      ^ Error: locator.screenshot: Test timeout of 120000ms exceeded.
  291 |       await panel.locator('[data-visual="questionnaire"]').screenshot({ path: resolve(evidence, `questionnaire-${era}-${theme}-${density}-${info.project.name}.png`) });
  292 |     }
  293 |     expect(records[0]!.facts).toEqual(records[1]!.facts);
  294 |     report.push({ theme, density, records });
  295 |   }
  296 |   writeFileSync(resolve(evidence, `before-after-${info.project.name}.json`), JSON.stringify({ note: "Before TSX is copied from the frozen task baseline; relative behavior dependencies resolve to unchanged live helpers. Before global CSS is scoped with native @scope; before questionnaire class names and CSS are renamed together. Original controls must match DOM/paint/geometry. Questionnaire screenshots document the intentional visual change and await human acceptance.", report }, null, 2));
  297 | });
  298 | 
```