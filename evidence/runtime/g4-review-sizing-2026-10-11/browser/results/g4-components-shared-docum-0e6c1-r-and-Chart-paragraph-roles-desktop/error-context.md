# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> shared documentation retains adjacent Button Group, Spinner and Chart paragraph roles
- Location: tests/e2e/g4-components.spec.ts:418:1

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  locator('#button-group-title')
Expected: "16px"
Received: "28px"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" with timeout 5000ms
  - waiting for locator('#button-group-title')
    14 × locator resolved to <h1 tabindex="-1" id="button-group-title">Button Group 按钮组</h1>
       - unexpected value "28px"

```

```yaml
- heading "Button Group 按钮组" [level=1]
```

# Test source

```ts
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
  392 |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  393 |   expect(await quantity.locator('[data-slot="progress-track"]').evaluate(node => node.getBoundingClientRect().height)).toBe(6);
  394 |   writeFileSync(`${evidence}/progress-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  395 | });
  396 | 
  397 | test("reduced motion and forced colors retain progress and native-link meaning", async ({ page }, info) => {
  398 |   await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  399 |   await page.goto("/#progress");
  400 |   const bar = page.getByRole("progressbar", { name: "资料同步", exact: true });
  401 |   const indicator = bar.locator('[data-slot="progress-indicator"]');
  402 |   expect(await indicator.evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  403 |   const paint = await indicator.evaluate(node => getComputedStyle(node).backgroundColor);
  404 |   const trackPaint = await bar.locator('[data-slot="progress-track"]').evaluate(node => getComputedStyle(node).backgroundColor);
  405 |   expect(paint).not.toBe(trackPaint);
  406 |   await page.screenshot({ path: `${evidence}/progress-${info.project.name}-forced-colors.png`, fullPage: true });
  407 |   await page.goto("/#item");
  408 |   const link = page.getByRole("link", { name: /文字排版规范/ });
  409 |   await link.focus();
  410 |   const colors = await link.evaluate(root => ({ root: getComputedStyle(root).color, title: getComputedStyle(root.querySelector('[data-slot="title"]')!).color, icon: getComputedStyle(root.querySelector('[data-rain-id="icon"]')!).color, outline: getComputedStyle(root).outlineStyle }));
  411 |   writeFileSync(`${evidence}/item-${info.project.name}-forced-colors.json`, JSON.stringify(colors, null, 2));
  412 |   expect(colors.title).toBe(colors.root);
  413 |   expect(colors.icon).toBe(colors.root);
  414 |   expect(colors.outline).toBe("solid");
  415 |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-forced-colors.png`, fullPage: true });
  416 | });
  417 | 
  418 | test("shared documentation retains adjacent Button Group, Spinner and Chart paragraph roles", async ({ page }, info) => {
  419 |   const facts = [];
  420 |   for (const [id, selector, size, line] of [
  421 |     ["button-group", '[role="status"][aria-label="尺寸对照反馈"]', "13px", "20px"],
  422 |     ["spinner", ".component-doc__loading-result > p", "13px", "20px"],
  423 |     ["chart-line", "[data-chart-default-controls] + p.rain-chart-note", "13px", "20px"],
  424 |   ] as const) {
  425 |     await page.goto(`/#${id}`);
  426 |     await expect(page.locator(`#${id}-title`)).toBeVisible();
> 427 |     await expect(page.locator(`#${id}-title`)).toHaveCSS("font-size", "16px");
      |                                                ^ Error: expect(locator).toHaveCSS(expected) failed
  428 |     await expect(page.locator(`#${id}-title`)).toHaveCSS("line-height", "24px");
  429 |     const description = page.locator(".component-doc__example > p").first();
  430 |     await expect(description).toHaveCSS("line-height", "20px");
  431 |     await expect(page.locator(".component-doc__header > p")).toHaveCSS("line-height", "24px");
  432 |     if (id === "button-group") {
  433 |       await page.getByRole("group", { name: "mini 横向按钮组", exact: true }).getByRole("button", { name: "撤销", exact: true }).click();
  434 |       await expect(page.locator(selector)).toContainText("已撤销");
  435 |     } else if (id === "spinner") {
  436 |       await page.getByRole("button", { name: "完成加载", exact: true }).click();
  437 |       await expect(page.locator(selector)).toContainText("已载入 18 份资料");
  438 |     } else {
  439 |       await page.locator("[data-chart-default-controls]").getByRole("button", { name: "更新数据", exact: true }).click();
  440 |       await expect(page.locator(selector)).toContainText("已更新 1 次");
  441 |     }
  442 |     await expect(page.locator(selector)).toHaveCSS("font-size", size);
  443 |     await expect(page.locator(selector)).toHaveCSS("line-height", line);
  444 |     const measured = await page.locator(selector).evaluate(node => ({
  445 |       size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight, text: node.textContent,
  446 |     }));
  447 |     facts.push({ id, selector, expectedSize: size, expectedLine: line, measured });
  448 |   }
  449 |   writeFileSync(`${evidence}/adjacent-docs-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  450 | });
  451 | 
```