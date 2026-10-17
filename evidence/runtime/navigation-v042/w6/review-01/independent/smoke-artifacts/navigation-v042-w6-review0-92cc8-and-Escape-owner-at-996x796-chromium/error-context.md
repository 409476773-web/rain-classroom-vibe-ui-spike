# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w6-review01.spec.ts >> F01 E6 edge keyboard recovery and Escape owner at 996x796
- Location: tests/e2e/navigation-v042-w6-review01.spec.ts:348:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-scene="E6"]').locator('[data-ai-task="E6"]').locator('.rain-workspace__region[data-region-id="queue"]')
Expected: "hidden"
Received: "expanded"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-scene="E6"]').locator('[data-ai-task="E6"]').locator('.rain-workspace__region[data-region-id="queue"]')
    14 × locator resolved to <div data-side="start" aria-label="资源队列" data-forced="false" data-mode="expanded" data-region-id="queue" data-temporary="false" id="_r_1k_-workspace-queue" class="rain-workspace__region w6-review-side">…</div>
       - unexpected value "expanded"

```

```yaml
- heading "资源队列" [level=2]
- text: 8 份
- textbox "筛选资源":
  - /placeholder: 筛选名称、编号或类型
- group "待评审学术资源":
  - list
- paragraph: 资源与评审记录均为脱敏示例。
```

# Test source

```ts
  255 |     }));
  256 |     const before = await facts();
  257 |     await root.getByRole('button', { name: '仅当前实例 A 使用紧凑目录', exact: true }).click();
  258 |     await expect(root.getByRole('region', { name: '实例 A', exact: true })).toHaveAttribute('data-directory-density', 'compact');
  259 |     expect(await facts()).toEqual(before);
  260 |     await expect(b.getByRole('textbox', { name: '实例 B 草稿', exact: true })).toHaveValue('B 的独立说明与尺寸保持');
  261 |     await screenshot(page, `E5-${width}x796`);
  262 |   });
  263 | 
  264 |   test(`C01-C02-F01 E6 small semantic Tags and left/right edge recovery at ${width}`, async ({ page }) => {
  265 |     const root = await open(page, 'E6', width);
  266 |     const work = root.locator('[data-ai-task="E6"]');
  267 |     const queue = work.getByRole('group', { name: '待评审学术资源', exact: true });
  268 |     const first = queue.getByRole('button', { name: firstResource, exact: true });
  269 |     const type = first.locator('[data-rain-id="ui-tag"]').filter({ hasText: '研究工作论文' });
  270 |     const status = first.locator('[data-rain-id="ui-tag"]').filter({ hasText: '待评审' });
  271 |     await expect(type).toHaveAttribute('data-size', '20');
  272 |     await expect(type).toHaveAttribute('data-color', 'neutral');
  273 |     await expect(status).toHaveAttribute('data-size', '20');
  274 |     await expect(status).toHaveAttribute('data-color', 'gold');
  275 |     const typeBox = await type.boundingBox();
  276 |     const statusBox = await status.boundingBox();
  277 |     expect(Math.abs(typeBox!.y - statusBox!.y)).toBeLessThanOrEqual(1);
  278 |     expect(typeBox!.height).toBe(20);
  279 |     expect(statusBox!.height).toBe(20);
  280 |     const details = first.locator('.w6-review-resource-details');
  281 |     expect((await details.boundingBox())!.y).toBeGreaterThan(typeBox!.y);
  282 |     const separators = await details.locator('span + span').evaluateAll(elements => elements.map(element => ({ width: getComputedStyle(element, '::before').width, content: getComputedStyle(element, '::before').content, border: getComputedStyle(element, '::before').borderInlineStartWidth })));
  283 |     expect(separators.length).toBeGreaterThanOrEqual(2);
  284 |     expect(separators.every(separator => parseFloat(separator.width) > 0 || parseFloat(separator.border) > 0 || /\|/.test(separator.content))).toBe(true);
  285 |     const draft = work.getByRole('textbox', { name: '审核意见', exact: true });
  286 |     await draft.fill('第一份资料的未保存意见');
  287 |     await work.getByRole('button', { name: '隐藏资源队列', exact: true }).click();
  288 |     await work.getByRole('button', { name: '隐藏评审面板', exact: true }).click();
  289 |     const left = work.getByRole('button', { name: '展开资源队列', exact: true });
  290 |     const right = work.getByRole('button', { name: '展开评审面板', exact: true });
  291 |     await expect(left).toBeVisible();
  292 |     await expect(right).toBeVisible();
  293 |     const workBody = work.locator('.rain-workspace__flow');
  294 |     const bodyBox = await workBody.boundingBox();
  295 |     const leftBox = await left.boundingBox();
  296 |     const rightBox = await right.boundingBox();
  297 |     expect(leftBox!.width).toBe(32);
  298 |     expect(leftBox!.height).toBe(32);
  299 |     expect(rightBox!.width).toBe(32);
  300 |     expect(rightBox!.height).toBe(32);
  301 |     expect(leftBox!.x - bodyBox!.x).toBeLessThanOrEqual(12);
  302 |     expect(bodyBox!.x + bodyBox!.width - rightBox!.x - rightBox!.width).toBeLessThanOrEqual(12);
  303 |     await screenshot(page, `E6-edges-${width}x796`);
  304 |     const preview = work.getByRole('main', { name: '当前资源预览', exact: true });
  305 |     const hiddenWidth = (await preview.boundingBox())!.width;
  306 |     await left.click();
  307 |     await expect(region(work, 'queue')).toHaveAttribute('data-mode', 'expanded');
  308 |     await expect(region(work, 'queue')).toHaveAttribute('data-temporary', 'false');
  309 |     expect((await preview.boundingBox())!.width).toBeLessThan(hiddenWidth - 200);
  310 |     await right.click();
  311 |     await expect(region(work, 'comments')).toHaveAttribute('data-mode', 'expanded');
  312 |     await expect(region(work, 'comments')).toHaveAttribute('data-temporary', 'false');
  313 |     await expect(draft).toHaveValue('第一份资料的未保存意见');
  314 |     await expect(work.getByRole('status', { name: '本地保存状态' })).toHaveText('未保存');
  315 |     await work.getByRole('button', { name: '保存本地评审', exact: true }).click();
  316 |     await expect(work.getByRole('status', { name: '本地保存状态' })).toHaveText('本页已保存');
  317 |     const savedTag = first.locator('[data-rain-id="ui-tag"]').filter({ hasText: '本页已评审' });
  318 |     await expect(savedTag).toHaveAttribute('data-color', 'olive');
  319 |     expect(Math.abs((await type.boundingBox())!.y - (await savedTag.boundingBox())!.y)).toBeLessThanOrEqual(1);
  320 |     await queue.getByRole('button', { name: secondResource, exact: true }).click();
  321 |     await expect(draft).toHaveValue('');
  322 |     await expect(work.getByRole('main', { name: '当前资源预览' })).toHaveAttribute('data-resource-id', 'resource-climate-057');
  323 |     await expect(work.getByRole('region', { name: '当前资源评审' })).toHaveAttribute('data-resource-id', 'resource-climate-057');
  324 |     await first.click();
  325 |     await expect(draft).toHaveValue('第一份资料的未保存意见');
  326 |     await screenshot(page, `E6-${width}x796`);
  327 |   });
  328 | 
  329 |   test(`C03 E6 own-scroll sticky review heading at ${width}`, async ({ page }) => {
  330 |     const root = await open(page, 'E6', width);
  331 |     const comments = region(root, 'comments');
  332 |     const header = comments.locator('.w6-review-comments > .w6-review-pane-head');
  333 |     const before = await header.boundingBox();
  334 |     await comments.hover({ position: { x: 100, y: 250 } });
  335 |     await page.mouse.wheel(0, 1000);
  336 |     await expect.poll(() => comments.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  337 |     const after = await header.boundingBox();
  338 |     expect(Math.abs(after!.y - before!.y)).toBeLessThanOrEqual(1);
  339 |     const facts = await header.evaluate(element => ({ position: getComputedStyle(element).position, top: getComputedStyle(element).top, background: getComputedStyle(element).backgroundColor, y: element.getBoundingClientRect().y }));
  340 |     expect(facts.position).toBe('sticky');
  341 |     expect(facts.top).toBe('0px');
  342 |     await expect(comments.getByRole('heading', { name: '评审面板', exact: true })).toBeVisible();
  343 |     await record('E6-sticky-geometry', { before, after, facts });
  344 |     await screenshot(page, `E6-sticky-${width}x796`);
  345 |   });
  346 | }
  347 | 
  348 | test('F01 E6 edge keyboard recovery and Escape owner at 996x796', async ({ page }) => {
  349 |   const root = await open(page, 'E6', 996);
  350 |   const work = root.locator('[data-ai-task="E6"]');
  351 |   const main = work.getByRole('main', { name: '当前资源预览', exact: true });
  352 |   const queue = region(work, 'queue');
  353 |   const comments = region(work, 'comments');
  354 |   // With both-side minimum widths, the start queue is space-forced at this width.
> 355 |   await expect(queue).toHaveAttribute('data-mode', 'hidden');
      |                       ^ Error: expect(locator).toHaveAttribute(expected) failed
  356 |   await expect(comments).toHaveAttribute('data-mode', 'expanded');
  357 |   const edge = work.getByRole('button', { name: '展开资源队列', exact: true });
  358 |   const before = await main.boundingBox();
  359 |   await tabTo(page, edge);
  360 |   await expect(edge).toBeFocused();
  361 |   await page.keyboard.press('Enter');
  362 |   await expect(queue).toHaveAttribute('data-temporary', 'true');
  363 |   await compareGeometry(main, before);
  364 |   await expect(work.getByRole('button', { name: '展开资源队列', exact: true })).toHaveCount(0);
  365 |   await expect(work.getByRole('button', { name: '关闭临时资源队列', exact: true })).toBeVisible();
  366 |   await page.keyboard.press('Escape');
  367 |   await expect(queue).toHaveAttribute('data-temporary', 'false');
  368 |   await expect(edge).toBeFocused();
  369 |   await edge.click();
  370 |   await expect(queue).toHaveAttribute('data-temporary', 'true');
  371 |   await compareGeometry(main, before);
  372 |   await screenshot(page, 'E6-temporary-996x796');
  373 |   await page.keyboard.press('Escape');
  374 |   await work.getByRole('button', { name: '隐藏评审面板', exact: true }).click();
  375 |   const right = work.getByRole('button', { name: '展开评审面板', exact: true });
  376 |   await tabTo(page, right);
  377 |   await page.keyboard.press('Space');
  378 |   await expect(comments).toHaveAttribute('data-mode', 'expanded');
  379 |   await expect(comments).toHaveAttribute('data-temporary', 'false');
  380 |   await screenshot(page, 'E6-recovered-996x796');
  381 | });
  382 | 
  383 | test('F03 E3 scoring panel and dedicated number input stay available at 996x796', async ({ page }) => {
  384 |   const root = await open(page, 'E3', 996);
  385 |   const score = root.getByRole('spinbutton', { name: '本题分数', exact: true });
  386 |   await expect(score).toBeVisible();
  387 |   await score.fill('18');
  388 |   await score.press('ArrowUp');
  389 |   await expect(score).toHaveValue('19');
  390 |   await score.press('ArrowDown');
  391 |   await expect(score).toHaveValue('18');
  392 |   await root.getByRole('textbox', { name: '评分评语', exact: true }).fill('窄屏意见保持');
  393 |   await root.getByRole('button', { name: '进入专注', exact: true }).click();
  394 |   await expect(root.getByRole('complementary', { name: '评分区', exact: true })).toBeVisible();
  395 |   await expect(score).toHaveValue('18');
  396 |   await expect(root.getByText('尚未保存到本地', { exact: true })).toBeVisible();
  397 |   await root.getByRole('button', { name: '退出专注', exact: true }).click();
  398 |   await expect(root.getByRole('textbox', { name: '评分评语', exact: true })).toHaveValue('窄屏意见保持');
  399 |   await screenshot(page, 'E3-996x796');
  400 | });
  401 | 
```