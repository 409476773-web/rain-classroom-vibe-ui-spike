# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g4-components.spec.ts >> shared documentation retains adjacent Button Group, Spinner and Chart paragraph roles
- Location: tests/e2e/g4-components.spec.ts:435:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5391/#button-group
Call log:
  - navigating to "http://127.0.0.1:5391/#button-group", waiting until "load"

```

# Test source

```ts
  342 |   await expect(dialog).not.toBeVisible();
  343 |   await expect(trigger).toBeFocused();
  344 |   await expect(first.getByText("已读", { exact: true })).toBeVisible();
  345 |   await expect(page.getByRole("status").filter({ hasText: "已读 1 / 2 份" })).toBeVisible();
  346 |   const downloadEvent = page.waitForEvent("download");
  347 |   await first.getByRole("link", { name: "下载课程导读", exact: true }).click();
  348 |   const download = await downloadEvent;
  349 |   expect(download.suggestedFilename()).toBe("课程导读.md");
  350 |   const savedPath = `${evidence}/course-guide-${info.project.name}.md`;
  351 |   await download.saveAs(savedPath);
  352 |   expect(readFileSync(savedPath, "utf8")).toBe(`# 课程导读：从问题到证据\n\n${paragraphs.join("\n\n")}\n`);
  353 |   await expect(page).toHaveURL(/#item$/);
  354 | });
  355 | 
  356 | test("Progress keeps actual quantities and external pause/error states", async ({ page }, info) => {
  357 |   await page.goto("/#progress");
  358 |   const task = page.getByRole("region", { name: "资料同步任务", exact: true });
  359 |   const controls = page.getByRole("group", { name: "演示控制", exact: true });
  360 |   const bar = task.getByRole("progressbar", { name: "资料同步", exact: true });
  361 |   expect((await task.boundingBox())!.width).toBeLessThanOrEqual(561);
  362 |   await expect(task.getByRole("button")).toHaveCount(1);
  363 |   await expect(task.getByRole("button", { name: "暂停同步", exact: true })).toBeVisible();
  364 |   await expect(bar).toHaveAttribute("aria-valuenow", "40");
  365 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  366 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  367 |   await task.getByRole("button", { name: "暂停同步", exact: true }).click();
  368 |   await expect(controls.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  369 |   await expect(task.getByRole("status")).toContainText("同步已暂停");
  370 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  371 |   await task.getByRole("button", { name: "继续同步", exact: true }).click();
  372 |   await controls.getByRole("button", { name: "模拟失败", exact: true }).click();
  373 |   await expect(task.getByRole("status")).toContainText("同步中断，请重试");
  374 |   await expect(task.getByRole("status")).toContainText("已完成 60 份");
  375 |   await expect(controls.getByRole("button", { name: "完成下一批", exact: true })).toBeDisabled();
  376 |   await expect(bar).toHaveAttribute("aria-valuenow", "60");
  377 |   await task.screenshot({ path: `${evidence}/progress-${info.project.name}-error.png` });
  378 |   await task.getByRole("button", { name: "重试同步", exact: true }).click();
  379 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  380 |   await controls.getByRole("button", { name: "完成下一批", exact: true }).click();
  381 |   await expect(bar).toHaveAttribute("aria-valuenow", "100");
  382 |   await expect(bar).toHaveAttribute("data-state", "complete");
  383 |   await expect(task.getByRole("status")).toContainText("全部资料已同步");
  384 |   await expect(task.getByRole("button")).toHaveCount(0);
  385 |   await expect(task.getByRole("link", { name: "查看课程资料", exact: true })).toHaveAttribute("href", "#item");
  386 |   await task.screenshot({ path: `${evidence}/progress-${info.project.name}-complete.png` });
  387 |   await controls.getByRole("button", { name: "重新开始", exact: true }).click();
  388 |   await expect(bar).toHaveAttribute("aria-valuenow", "0");
  389 |   const unknown = page.getByRole("progressbar", { name: "正在解析资料", exact: true });
  390 |   await expect(unknown).not.toHaveAttribute("aria-valuenow");
  391 |   await expect(unknown).toHaveAttribute("data-state", "indeterminate");
  392 |   await expect(unknown.locator('[data-slot="progress-value"]')).toHaveCount(0);
  393 |   await expect(unknown.locator('[data-slot="progress-track"]')).toBeHidden();
  394 |   await expect(unknown.locator('[data-rain-id="ui-spinner"]')).toBeVisible();
  395 |   await expect(unknown.locator('[data-rain-id="ui-spinner"]')).toHaveAttribute("aria-hidden", "true");
  396 |   expect(await unknown.textContent()).not.toMatch(/\d+%/);
  397 |   await expect(page.getByRole("region", { name: "资料解析任务", exact: true })).toContainText("正在识别资料目录");
  398 |   const quantity = page.getByRole("progressbar", { name: "批改任务", exact: true });
  399 |   await expect(quantity).toHaveAttribute("aria-valuenow", "6");
  400 |   await expect(quantity).toHaveAttribute("aria-valuemax", "24");
  401 |   await expect(quantity.locator('[data-slot="progress-value"]')).toHaveText("25%");
  402 |   const facts = await quantity.evaluate(root => {
  403 |     const track = root.querySelector('[data-slot="progress-track"]')!;
  404 |     const indicator = root.querySelector('[data-slot="progress-indicator"]')!;
  405 |     return { trackWidth: track.getBoundingClientRect().width, indicatorWidth: indicator.getBoundingClientRect().width, trackHeight: track.getBoundingClientRect().height };
  406 |   });
  407 |   expect(facts.indicatorWidth / facts.trackWidth).toBeCloseTo(0.25, 2);
  408 |   expect(facts.trackHeight).toBe(8);
  409 |   await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  410 |   expect(await quantity.locator('[data-slot="progress-track"]').evaluate(node => node.getBoundingClientRect().height)).toBe(6);
  411 |   writeFileSync(`${evidence}/progress-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  412 | });
  413 | 
  414 | test("reduced motion and forced colors retain progress and native-link meaning", async ({ page }, info) => {
  415 |   await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  416 |   await page.goto("/#progress");
  417 |   const bar = page.getByRole("progressbar", { name: "资料同步", exact: true });
  418 |   const indicator = bar.locator('[data-slot="progress-indicator"]');
  419 |   expect(await indicator.evaluate(node => getComputedStyle(node).transitionDuration)).toBe("0s");
  420 |   const paint = await indicator.evaluate(node => getComputedStyle(node).backgroundColor);
  421 |   const trackPaint = await bar.locator('[data-slot="progress-track"]').evaluate(node => getComputedStyle(node).backgroundColor);
  422 |   expect(paint).not.toBe(trackPaint);
  423 |   await page.screenshot({ path: `${evidence}/progress-${info.project.name}-forced-colors.png`, fullPage: true });
  424 |   await page.goto("/#item");
  425 |   const link = page.getByRole("link", { name: /文字排版规范/ });
  426 |   await link.focus();
  427 |   const colors = await link.evaluate(root => ({ root: getComputedStyle(root).color, title: getComputedStyle(root.querySelector('[data-slot="title"]')!).color, icon: getComputedStyle(root.querySelector('[data-rain-id="icon"]')!).color, outline: getComputedStyle(root).outlineStyle }));
  428 |   writeFileSync(`${evidence}/item-${info.project.name}-forced-colors.json`, JSON.stringify(colors, null, 2));
  429 |   expect(colors.title).toBe(colors.root);
  430 |   expect(colors.icon).toBe(colors.root);
  431 |   expect(colors.outline).toBe("solid");
  432 |   await page.screenshot({ path: `${evidence}/item-${info.project.name}-forced-colors.png`, fullPage: true });
  433 | });
  434 | 
  435 | test("shared documentation retains adjacent Button Group, Spinner and Chart paragraph roles", async ({ page }, info) => {
  436 |   const facts = [];
  437 |   for (const [id, selector, size, line] of [
  438 |     ["button-group", '[role="status"][aria-label="尺寸对照反馈"]', "13px", "20px"],
  439 |     ["spinner", ".component-doc__loading-result > p", "13px", "20px"],
  440 |     ["chart-line", "[data-chart-default-controls] + p.rain-chart-note", "13px", "20px"],
  441 |   ] as const) {
> 442 |     await page.goto(`/#${id}`);
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:5391/#button-group
  443 |     await expect(page.locator(`#${id}-title`)).toBeVisible();
  444 |     await expect(page.locator(`#${id}-title`)).toHaveCSS("font-size", "16px");
  445 |     await expect(page.locator(`#${id}-title`)).toHaveCSS("line-height", "24px");
  446 |     const description = page.locator(".component-doc__example > p").first();
  447 |     await expect(description).toHaveCSS("line-height", "20px");
  448 |     await expect(page.locator(".component-doc__header > p")).toHaveCSS("line-height", "24px");
  449 |     if (id === "button-group") {
  450 |       await page.getByRole("group", { name: "mini 横向按钮组", exact: true }).getByRole("button", { name: "撤销", exact: true }).click();
  451 |       await expect(page.locator(selector)).toContainText("已撤销");
  452 |     } else if (id === "spinner") {
  453 |       await page.getByRole("button", { name: "完成加载", exact: true }).click();
  454 |       await expect(page.locator(selector)).toContainText("已载入 18 份资料");
  455 |     } else {
  456 |       await page.locator("[data-chart-default-controls]").getByRole("button", { name: "更新数据", exact: true }).click();
  457 |       await expect(page.locator(selector)).toContainText("已更新 1 次");
  458 |     }
  459 |     await expect(page.locator(selector)).toHaveCSS("font-size", size);
  460 |     await expect(page.locator(selector)).toHaveCSS("line-height", line);
  461 |     const measured = await page.locator(selector).evaluate(node => ({
  462 |       size: getComputedStyle(node).fontSize, line: getComputedStyle(node).lineHeight, text: node.textContent,
  463 |     }));
  464 |     facts.push({ id, selector, expectedSize: size, expectedLine: line, measured });
  465 |   }
  466 |   writeFileSync(`${evidence}/adjacent-docs-${info.project.name}-facts.json`, JSON.stringify(facts, null, 2));
  467 | });
  468 | 
```