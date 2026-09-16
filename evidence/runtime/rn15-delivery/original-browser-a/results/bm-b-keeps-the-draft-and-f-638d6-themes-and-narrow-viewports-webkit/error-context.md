# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bm-b.spec.ts >> keeps the draft and fixed actions across layouts, themes and narrow viewports
- Location: tests/e2e/bm-b.spec.ts:142:1

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  getByRole('dialog').getByRole('button', { name: '关闭教材编辑' })
Expected: focused
Received: inactive
Timeout:  5000ms

Call log:
  - Expect "toBeFocused" with timeout 5000ms
  - waiting for getByRole('dialog').getByRole('button', { name: '关闭教材编辑' })
    14 × locator resolved to <button tabindex="0" type="button" data-slot="root" data-size="28/20" aria-label="关闭教材编辑" data-variant="fill" data-tone="default" data-focus="control" data-state="default" data-highlight="none" data-density="default" data-rain-state="default" data-feedback="interactive" data-rain-id="ui-icon-button" class="rain-icon-button box-border relative inline-flex flex-none items-center justify-center p-rain-0 border-none overflow-visible align-middle appearance-none select-none isolate transition-colors durati…>…</button>
       - unexpected value "inactive"

```

```yaml
- button "关闭教材编辑"
```

# Test source

```ts
  98  |   await page.getByRole("option", { name: "教育学", exact: true }).click();
  99  |   await page.getByRole("button", { name: "保存教材" }).click();
  100 |   await expect(title).toBeDisabled(); await page.keyboard.press("Escape");
  101 |   await expect(page.getByRole("dialog")).toBeVisible();
  102 |   await expect(page.getByRole("alert")).toHaveText("保存失败，填写内容已保留。请重试。");
  103 |   await expect(page.getByRole("alert")).toBeFocused(); await expect(title).toHaveValue("新教材 · 课堂实践");
  104 |   await page.getByRole("button", { name: "重试保存" }).click();
  105 |   await expect(page.getByRole("dialog")).toBeHidden(); await expect(trigger).toBeFocused();
  106 |   await expect(page.getByRole("heading", { name: "新教材 · 课堂实践" })).toBeVisible();
  107 |   await expect(page.locator('[data-slot="saved-description"]')).toHaveText("第一段：学习目标\n第二段：实践与反思");
  108 |   await trigger.click(); await title.fill("应该丢弃"); await page.keyboard.press("Escape");
  109 |   await page.getByRole("button", { name: "放弃修改" }).click();
  110 |   await expect(trigger).toBeFocused(); await trigger.click(); await expect(title).toHaveValue("新教材 · 课堂实践");
  111 |   await page.getByRole("button", { name: "关闭教材编辑" }).click();
  112 |   await expect(trigger).toBeFocused(); await trigger.click();
  113 |   await page.mouse.click(2, 2); await expect(page.getByRole("dialog")).toBeVisible();
  114 |   await page.keyboard.press("Escape");
  115 |   expect(errors).toEqual([]);
  116 | });
  117 | 
  118 | test("handles file validation, upload failure, retry, removal and commit", async ({ page }) => {
  119 |   await page.getByText("演示选项", { exact: true }).click();
  120 |   await page.getByText("模拟下次上传失败", { exact: true }).click();
  121 |   await page.getByRole("button", { name: "编辑教材", exact: true }).click();
  122 |   const upload = page.getByLabel("添加教材附件", { exact: true });
  123 |   const chooserReady = page.waitForEvent("filechooser");
  124 |   await page.getByRole("button", { name: "添加教材附件", exact: true }).click();
  125 |   const chooser = await chooserReady;
  126 |   await chooser.setFiles({ name: "bad.exe", mimeType: "application/octet-stream", buffer: Buffer.from("invalid") });
  127 |   await expect(page.getByRole("alert")).toContainText("请选择 PDF");
  128 |   await upload.setInputFiles({ name: "课堂实践.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7 mock") });
  129 |   await page.getByRole("button", { name: "保存教材" }).click();
  130 |   await expect(page.getByRole("button", { name: "添加教材附件", exact: true })).toBeFocused();
  131 |   await expect(page.getByText(/上传失败，请重试/)).toBeVisible();
  132 |   await page.getByRole("button", { name: "重试上传 课堂实践.pdf" }).click();
  133 |   await expect(page.getByText(/模拟上传成功/)).toBeVisible();
  134 |   await upload.setInputFiles({ name: "remove.png", mimeType: "image/png", buffer: Buffer.from("mock") });
  135 |   await page.getByRole("button", { name: "移除附件 remove.png" }).click();
  136 |   await expect(page.getByText("remove.png", { exact: true })).toBeHidden();
  137 |   await page.getByRole("button", { name: "保存教材" }).click();
  138 |   await expect(page.getByRole("dialog")).toBeHidden();
  139 |   await expect(page.locator('[data-slot="saved-attachments"]')).toHaveText("已保存附件：课堂实践.pdf");
  140 | });
  141 | 
  142 | test("keeps the draft and fixed actions across layouts, themes and narrow viewports", async ({ page }, testInfo) => {
  143 |   const evidence = `${process.env.RAIN_BM_B_EVIDENCE ?? "/tmp/rain-bm-b-rn10"}/${testInfo.project.name}`;
  144 |   const consoleErrors: string[] = [];
  145 |   page.on("pageerror", error => consoleErrors.push(error.message));
  146 |   page.on("console", message => { if (message.type() === "error") consoleErrors.push(message.text()); });
  147 |   await page.reload();
  148 |   await expect(page.getByRole("heading", { level: 1, name: "教材资料" })).toBeVisible();
  149 |   const measurements = [];
  150 |   for (const theme of ["light", "dark"]) {
  151 |     if (theme === "dark") await page.getByRole("button", { name: "切换深色" }).click();
  152 |     await page.getByRole("button", { name: "编辑教材", exact: true }).click();
  153 |     const dialog = page.getByRole("dialog");
  154 |     await expect.poll(() => dialog.evaluate(el => el.getAnimations().length)).toBe(0);
  155 |     const description = page.getByRole("textbox", { name: "内容简介", exact: true });
  156 |     await description.fill("布局变化保留这段长文本。\n多行内容正常阅读与编辑。");
  157 |     for (const width of [1440, 768, 390, 320]) {
  158 |       await page.setViewportSize({ width, height: width <= 390 ? 740 : 900 });
  159 |       await expect(dialog).toHaveAttribute("data-rain-theme", theme);
  160 |       await expect(dialog).toHaveAttribute("data-density", "default");
  161 |       await expect.poll(() => dialog.evaluate(el => getComputedStyle(el).getPropertyValue("--rain-dialog-viewport-width").trim())).toBe(`${width}px`);
  162 |       const geometry = await dialog.evaluate(element => {
  163 |         const body = element.querySelector<HTMLElement>('[data-slot="body"]')!;
  164 |         const footer = element.querySelector<HTMLElement>('[data-slot="footer"]')!;
  165 |         const grid = element.querySelector<HTMLElement>('[data-rain-id="layout-grid"]')!;
  166 |         const rect = element.getBoundingClientRect(), before = footer.getBoundingClientRect();
  167 |         body.scrollTop = body.scrollHeight;
  168 |         const after = footer.getBoundingClientRect();
  169 |         return { left: rect.left, right: rect.right, bottom: rect.bottom, footerBefore: before.top, footerAfter: after.top,
  170 |           scrollable: body.scrollHeight > body.clientHeight, scrolled: body.scrollTop, bodyBottom: body.getBoundingClientRect().bottom,
  171 |           overflow: element.scrollWidth > element.clientWidth, columns: getComputedStyle(grid).gridTemplateColumns.split(" ").length,
  172 |           actions: [...footer.querySelectorAll('button')].map(button => { const box = button.getBoundingClientRect(); return { left: box.left, right: box.right, bottom: box.bottom }; }) };
  173 |       });
  174 |       expect(geometry.left).toBeGreaterThanOrEqual(15); expect(geometry.right).toBeLessThanOrEqual(width - 15);
  175 |       expect(geometry.bottom).toBeLessThanOrEqual(width <= 390 ? 725 : 885); expect(geometry.overflow).toBe(false);
  176 |       expect(geometry.scrollable).toBe(true); expect(geometry.scrolled).toBeGreaterThan(0);
  177 |       expect(geometry.footerAfter).toBe(geometry.footerBefore); expect(geometry.bodyBottom).toBeLessThanOrEqual(geometry.footerAfter + 1);
  178 |       for (const action of geometry.actions) { expect(action.left - geometry.left).toBeGreaterThanOrEqual(20); expect(geometry.right - action.right).toBeGreaterThanOrEqual(20); expect(action.bottom).toBeLessThan(geometry.bottom); }
  179 |       expect(geometry.columns).toBe(width <= 390 ? 1 : 2);
  180 |       await expect(description).toHaveValue("布局变化保留这段长文本。\n多行内容正常阅读与编辑。");
  181 |       measurements.push({ theme, width, ...geometry });
  182 |       if (testInfo.project.name === "chromium" && [1440, 390].includes(width)) {
  183 |         mkdirSync(evidence, { recursive: true });
  184 |         await page.screenshot({ path: `${evidence}/${theme}-${width}-footer.png` });
  185 |         await dialog.locator('[data-slot="body"]').evaluate(element => { element.scrollTop = 0; });
  186 |         await page.screenshot({ path: `${evidence}/${theme}-${width}-top.png` });
  187 |       }
  188 |     }
  189 |     await page.setViewportSize({ width: 1440, height: 900 });
  190 |     await page.getByText("双列布局", { exact: true }).click();
  191 |     await expect(dialog.locator('[data-rain-id="layout-grid"]').first()).toHaveAttribute("data-columns", "1");
  192 |     await page.getByText("宽版容器", { exact: true }).click();
  193 |     await expect(description).toHaveValue("布局变化保留这段长文本。\n多行内容正常阅读与编辑。");
  194 |     await page.getByText("宽版容器", { exact: true }).click(); await page.getByText("双列布局", { exact: true }).click();
  195 |     const tabKey = testInfo.project.name === "webkit" ? "Alt+Tab" : "Tab";
  196 |     await page.getByRole("button", { name: "取消", exact: true }).focus();
  197 |     await page.keyboard.press(tabKey); await expect(page.getByRole("button", { name: "保存教材" })).toBeFocused();
> 198 |     await page.keyboard.press(tabKey); await expect(dialog.getByRole("button", { name: "关闭教材编辑" })).toBeFocused();
      |                                                                                                     ^ Error: expect(locator).toBeFocused() failed
  199 |     await page.getByRole("button", { name: "取消", exact: true }).click();
  200 |     await page.getByRole("button", { name: "放弃修改" }).click();
  201 |   }
  202 |   expect(consoleErrors).toEqual([]);
  203 |   writeFileSync(`${evidence}/${testInfo.project.name}-geometry.json`, JSON.stringify(measurements, null, 2));
  204 | });
  205 | 
```