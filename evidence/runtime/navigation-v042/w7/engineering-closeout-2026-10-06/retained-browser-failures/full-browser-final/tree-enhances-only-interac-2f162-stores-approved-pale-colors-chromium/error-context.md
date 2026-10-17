# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tree.spec.ts >> enhances only interacting Tree rows and restores approved pale colors
- Location: tests/e2e/tree.spec.ts:492:1

# Error details

```
Error: ENOENT: no such file or directory, open 'evidence/runtime/tree/readability-facts.json'
```

# Test source

```ts
  395 |   await page.goto("/#tree");
  396 |   await page.getByText("06　节点内容随状态变化", { exact: true }).click();
  397 |   const tree = page.getByRole("tree", { name: "自定义状态与空态示例" });
  398 |   const video = tree.getByRole("treeitem", { name: "课前视频", exact: true });
  399 |   await expect(video.locator('[data-slot="meta"]')).toHaveText("未加入");
  400 |   await expect(video.getByRole("button", { name: "加入清单：课前视频" })).toBeVisible();
  401 |   await expect(tree.getByRole("treeitem", { name: "指定阅读", exact: true }).locator('[data-slot="meta"]')).toHaveText("不可勾选");
  402 |   await video.focus();
  403 |   await video.press("F6");
  404 |   await expect(video.getByRole("checkbox")).toBeFocused();
  405 |   await page.keyboard.press("Tab");
  406 |   await expect(video.getByRole("button", { name: "加入清单：课前视频" })).toBeFocused();
  407 |   await page.keyboard.press("Enter");
  408 |   await expect(video.getByRole("checkbox")).toBeChecked();
  409 |   await expect(video).toHaveAttribute("aria-selected", "false");
  410 |   await expect(tree.getByRole("treeitem", { name: "课程材料", exact: true }).locator('[data-slot="meta"]')).toHaveText("部分加入");
  411 |   await expect(tree.getByRole("button", { name: "加入清单：指定阅读" })).toBeDisabled();
  412 |   await video.locator('[data-slot="title"]').click();
  413 |   await expect(video).toHaveAttribute("aria-selected", "true");
  414 |   await expect(video.getByText("当前行选中", { exact: true })).toBeVisible();
  415 |   await expect(video.getByRole("checkbox")).toBeChecked();
  416 |   await video.getByRole("button", { name: "移出清单：课前视频" }).click();
  417 |   await expect(video.getByRole("checkbox")).not.toBeChecked();
  418 |   await expect(video).toHaveAttribute("aria-selected", "true");
  419 |   await expect(video.locator('[data-slot="meta"]')).toHaveText("未加入");
  420 |   await video.getByRole("button", { name: "加入清单：课前视频" }).click();
  421 |   const example = page.locator("details").filter({ has: page.getByText("06　节点内容随状态变化", { exact: true }) });
  422 |   await example.screenshot({ path: "evidence/runtime/tree/custom-state-v2-wide.png" });
  423 |   await page.setViewportSize({ width: 320, height: 740 });
  424 |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  425 |   await example.screenshot({ path: "evidence/runtime/tree/custom-state-v2-narrow.png" });
  426 |   await page.setViewportSize({ width: 1280, height: 900 });
  427 |   await page.emulateMedia({ forcedColors: "active" });
  428 |   await video.getByRole("button").press("Escape");
  429 |   await expect(video).toBeFocused();
  430 |   await video.press("ArrowDown");
  431 |   await page.keyboard.press("ArrowRight");
  432 |   await page.keyboard.press("Space");
  433 |   await expect(tree.getByRole("checkbox", { name: "勾选延伸阅读" })).toBeChecked();
  434 |   await page.emulateMedia({ forcedColors: "none" });
  435 |   await tree.screenshot({ path: "evidence/runtime/tree/custom-state-v2-checked.png" });
  436 |   const search = page.getByRole("textbox", { name: "搜索自定义示例" });
  437 |   await search.fill("没有的材料");
  438 |   await expect(tree.getByRole("treeitem")).toHaveCount(0);
  439 |   await expect(tree.getByText("未找到匹配的材料")).toBeVisible();
  440 |   await tree.getByRole("button", { name: "清空搜索" }).focus();
  441 |   await page.keyboard.press("Enter");
  442 |   await expect(search).toBeFocused();
  443 |   await expect(tree.getByRole("treeitem")).toHaveCount(4);
  444 |   await page.getByRole("button", { name: "清空材料" }).click();
  445 |   await expect(tree.getByText("还没有课程材料")).toBeVisible();
  446 |   await tree.screenshot({ path: "evidence/runtime/tree/custom-empty-v2.png" });
  447 |   await tree.getByRole("button", { name: "恢复课程材料" }).click();
  448 |   await expect(search).toBeFocused();
  449 |   await expect(tree.getByRole("treeitem", { name: "课程材料", exact: true })).toBeVisible();
  450 | });
  451 | 
  452 | test("repeated subtree moves preserve five-level geometry and last-sibling clearance", async ({ page }) => {
  453 |   await page.goto("/#manage-tree");
  454 |   const tree = page.getByRole("tree");
  455 |   const move = async (source: string, target: string, placement: "inside" | "after", level: number) => {
  456 |     const names = await tree.getByRole("treeitem").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("aria-label")));
  457 |     await tree.getByRole("button", { name: `移动${source}`, exact: true }).focus();
  458 |     await page.keyboard.press("Space");
  459 |     const delta = names.indexOf(target) - names.indexOf(source);
  460 |     for (let i = 0; i < Math.abs(delta); i++) await page.keyboard.press(delta > 0 ? "ArrowDown" : "ArrowUp");
  461 |     if (placement === "inside") await page.keyboard.press("ArrowLeft");
  462 |     await page.keyboard.press("Enter");
  463 |     const row = tree.getByRole("treeitem", { name: source, exact: true });
  464 |     await expect(row).toHaveAttribute("aria-level", String(level));
  465 |     await expect(row).toBeFocused();
  466 |     await expect(tree.locator('[data-slot="drop-indicator"]')).toHaveCount(0);
  467 |     const geometry = await tree.getByRole("treeitem").evaluateAll((nodes) => nodes.map((node) => {
  468 |       const row = node.querySelector<HTMLElement>('[data-slot="row"]')!;
  469 |       const connector = row.querySelector<HTMLElement>('[data-slot="connector"]');
  470 |       const arm = connector && getComputedStyle(connector, "::after");
  471 |       const first = row.querySelector<HTMLElement>('.rain-tree-expander, .rain-tree-drag-handle')!;
  472 |       const lines = [...row.querySelectorAll<HTMLElement>('[data-slot="connector"], [data-slot="ancestor-line"]')];
  473 |       const positions = lines.map((line) => line.getBoundingClientRect().left);
  474 |       return { arm: arm ? parseFloat(arm.width) : 12,
  475 |         gap: connector ? first.getBoundingClientRect().left - connector.getBoundingClientRect().left - parseFloat(arm!.width) : 4,
  476 |         uniqueAxes: new Set(positions).size === positions.length,
  477 |         continuous: lines.every((line) => line.classList.contains("is-last") || Math.abs(line.getBoundingClientRect().height - row.getBoundingClientRect().height) < 1) };
  478 |     }));
  479 |     expect(geometry.every((item) => item.arm === 12 && item.gap === 4 && item.uniqueAxes && item.continuous)).toBe(true);
  480 |   };
  481 |   await move("第一章　随机事件与概率", "第二章　随机变量", "inside", 2);
  482 |   await move("课后练习", "课前学习", "inside", 4);
  483 |   await expect(tree.getByRole("treeitem", { name: "古典概型练习" })).toHaveAttribute("aria-level", "5");
  484 |   await tree.screenshot({ path: "evidence/runtime/tree/repeated-deep-move.png" });
  485 |   await move("课后练习", "课前学习", "after", 3);
  486 |   await move("课后练习", "课前学习", "inside", 4);
  487 |   await move("课后练习", "课前学习", "after", 3);
  488 |   await move("第一章　随机事件与概率", "第二章　随机变量", "after", 1);
  489 |   await expect(tree.getByRole("treeitem", { name: "古典概型练习" })).toHaveAttribute("aria-level", "3");
  490 | });
  491 | 
  492 | test("enhances only interacting Tree rows and restores approved pale colors", async ({ page }) => {
  493 |   test.setTimeout(60_000);
  494 |   const { contrastRatio } = await import("./color-contrast");
> 495 |   const approved = JSON.parse(readFileSync("evidence/runtime/tree/readability-facts.json", "utf8")).findings;
      |                               ^ Error: ENOENT: no such file or directory, open 'evidence/runtime/tree/readability-facts.json'
  496 |   const findings: { theme: string; surface: number; state: string; part: string; color: string; background: string; contrast: number }[] = [];
  497 |   for (const theme of ["light", "dark"]) for (const surface of [1, 2]) {
  498 |     await page.goto("/#tree");
  499 |     await page.evaluate((value) => document.documentElement.setAttribute("data-rain-theme", value), theme);
  500 |     // Only vary the host surface; all foreground/state styles come from the component.
  501 |     const style = await page.addStyleTag({ content: `.tree-page__panel { background: var(--rain-category-background-neutral-${surface}); }` });
  502 |     const panel = page.locator(".tree-page__panel--wide");
  503 |     const branch = panel.getByRole("treeitem", { name: "3.1　离散型随机变量", exact: true });
  504 |     const measure = async (row: typeof branch, state: string) => {
  505 |       const colors = await row.evaluate((node) => {
  506 |         const panel = node.closest('.tree-page__panel')!;
  507 |         const row = node.querySelector('[data-slot="row"]')!;
  508 |         const indicator = node.querySelector('[data-slot="drop-indicator"][data-placement="inside"]');
  509 |         const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
  510 |         const context = canvas.getContext('2d')!;
  511 |         return [...node.querySelectorAll<HTMLElement>('[data-slot="description"], [data-slot="meta"], [data-slot="meta-mobile"], .rain-tree-expander, .rain-tree-drag-handle')].filter(part => part.getBoundingClientRect().height > 0).map(part => {
  512 |           context.clearRect(0, 0, 1, 1);
  513 |           const layers = [getComputedStyle(panel).backgroundColor, getComputedStyle(row).backgroundColor, getComputedStyle(row, '::before').backgroundColor, ...(indicator ? [getComputedStyle(indicator).backgroundColor] : []), getComputedStyle(part).backgroundColor];
  514 |           for (const color of layers) { context.fillStyle = color; context.fillRect(0, 0, 1, 1); }
  515 |           const pixel = context.getImageData(0, 0, 1, 1).data;
  516 |           return { part: part.dataset.slot ?? (part.classList.contains('rain-tree-expander') ? 'arrow' : 'handle'), color: getComputedStyle(part).color, background: `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})` };
  517 |         });
  518 |       });
  519 |       findings.push(...colors.map(color => ({ theme, surface, state, ...color, contrast: contrastRatio(color.color, color.background) })));
  520 |     };
  521 |     const leaf = panel.getByRole("treeitem", { name: "分布律巩固练习", exact: true });
  522 |     await page.mouse.move(0, 0);
  523 |     await measure(branch, "normal");
  524 |     await measure(leaf, "normal-meta");
  525 |     if (surface === 1) await panel.screenshot({ path: `evidence/runtime/tree/closeout/interaction-${theme}-idle.png` });
  526 |     await branch.focus(); await measure(branch, "keyboard-focus");
  527 |     await page.getByRole("textbox", { name: "搜索节点" }).focus();
  528 |     await branch.hover(); await measure(branch, "row-hover");
  529 |     await measure(leaf, "normal-other-row");
  530 |     await branch.getByRole("button").hover(); await measure(branch, "control-hover");
  531 |     await branch.locator('[data-slot="title"]').click(); await measure(branch, "selected");
  532 |     await branch.getByRole("button").hover(); await measure(branch, "selected-control-hover");
  533 |     if (surface === 1) await panel.screenshot({ path: `evidence/runtime/tree/closeout/interaction-${theme}-active.png` });
  534 |     await page.getByRole("textbox", { name: "搜索节点" }).focus();
  535 |     await leaf.hover(); await measure(leaf, "meta-hover");
  536 |     await measure(branch, "normal-restored-selected");
  537 |     await page.setViewportSize({ width: 320, height: 740 });
  538 |     await leaf.hover(); await measure(leaf, "narrow-meta-hover");
  539 |     await page.setViewportSize({ width: 1280, height: 900 });
  540 |     await page.goto("/#manage-tree");
  541 |     const target = page.getByRole("treeitem", { name: "课前学习", exact: true });
  542 |     const handle = page.getByRole("button", { name: "移动课后练习", exact: true });
  543 |     await handle.focus(); await handle.press("Space");
  544 |     // The visible preceding branch is a valid destination. Keyboard navigation owns the drop proposal.
  545 |     for (let i = 0; i < 3; i++) await page.keyboard.press("ArrowUp");
  546 |     await page.keyboard.press("ArrowLeft");
  547 |     await expect(target.locator('[data-slot="drop-indicator"][data-placement="inside"]')).toBeVisible();
  548 |     await measure(target, "drop-inside");
  549 |     if (surface === 1) await page.getByRole("tree").screenshot({ path: `evidence/runtime/tree/closeout/interaction-${theme}-drop.png` });
  550 |     await page.keyboard.press("Escape");
  551 |     await expect(target.locator('[data-slot="drop-indicator"]')).toHaveCount(0);
  552 |     await page.mouse.move(0, 0);
  553 |     await measure(target, "normal-after-drop-cancel");
  554 |     await style.evaluate(node => (node as HTMLElement).remove());
  555 |   }
  556 |   writeFileSync("evidence/runtime/tree/interaction-readability-facts.json", JSON.stringify({ scope: "actual shared Tree CSS; light/dark and two surfaces; idle colors retained; active and restored states", findings }, null, 2));
  557 |   for (const finding of findings.filter(entry => !entry.state.startsWith("normal"))) expect(finding.contrast, JSON.stringify(finding)).toBeGreaterThanOrEqual(["arrow", "handle", "expander", "drag-handle"].includes(finding.part) ? 3 : 4.5);
  558 |   for (const finding of findings.filter(entry => entry.state.startsWith("normal"))) {
  559 |     const original = approved.find((entry: typeof finding & { candidate: boolean }) => entry.candidate === false && entry.theme === finding.theme && entry.surface === finding.surface && entry.state.startsWith("normal") && (entry.part === finding.part || entry.part === "expander" && finding.part === "drag-handle"))!;
  560 |     expect(finding.color, JSON.stringify(finding)).toBe(original.color);
  561 |   }
  562 | });
  563 | 
```