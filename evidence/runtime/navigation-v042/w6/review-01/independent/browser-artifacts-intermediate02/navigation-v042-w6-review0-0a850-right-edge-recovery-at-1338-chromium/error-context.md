# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w6-review01.spec.ts >> C01-C02-F01 E6 small semantic Tags and left/right edge recovery at 1338
- Location: tests/e2e/navigation-v042-w6-review01.spec.ts:287:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 53
Received:    21
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - strong [ref=e5]: Rain · 独立业务工作区
    - generic [ref=e6]: W6 消费试验 · 模拟数据与本地草稿
  - navigation "W6独立消费任务" [ref=e7]:
    - generic [ref=e8]:
      - link "课程资源" [ref=e9] [cursor=pointer]:
        - /url: "#E1"
      - link "课堂互动" [ref=e13] [cursor=pointer]:
        - /url: "#E2"
      - link "连续批改" [ref=e17] [cursor=pointer]:
        - /url: "#E3"
      - link "课堂回放" [ref=e21] [cursor=pointer]:
        - /url: "#E4"
      - link "实例隔离" [ref=e25] [cursor=pointer]:
        - /url: "#E5"
      - link "新建审阅台" [ref=e29] [cursor=pointer]:
        - /url: "#E6"
  - region "E6 新建审阅台" [ref=e33]:
    - region "学术资源评审工作台" [ref=e35]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e38]:
            - strong [ref=e39]: 学术资源评审
            - generic [ref=e40]: 演示数据 · Mock
          - generic [ref=e41]:
            - button "显示资源队列" [ref=e42] [cursor=pointer]
            - button "显示评审面板" [active] [ref=e43] [cursor=pointer]
            - button "专注阅读" [ref=e44] [cursor=pointer]
        - generic [ref=e46]:
          - button "展开资源队列" [ref=e47] [cursor=pointer]
          - button "展开评审面板" [ref=e50] [cursor=pointer]
          - main "当前资源预览" [ref=e53]:
            - generic [ref=e54]:
              - generic [ref=e55]: 文档预览 · Mock
              - generic [ref=e56]:
                - button "上一份" [disabled] [ref=e57]
                - generic [ref=e59]: 1 / 8
                - button "下一份" [ref=e60] [cursor=pointer]
            - article [ref=e63]:
              - generic [ref=e64]: R-042 · 研究工作论文
              - heading "数字人文研究中的多模态史料整理、版本校勘与长期开放获取方案（修订稿）" [level=1] [ref=e65]
              - generic [ref=e66]:
                - generic [ref=e67]:
                  - term [ref=e68]: 资料来源
                  - definition [ref=e69]: 开放研究文库
                - generic [ref=e70]:
                  - term [ref=e71]: 提交版本
                  - definition [ref=e72]: v2.1
                - generic [ref=e73]:
                  - term [ref=e74]: 文件范围
                  - definition [ref=e75]: 24 页 · 文字预览示例
              - generic [ref=e76]:
                - heading "摘要与评审范围" [level=2] [ref=e77]
                - paragraph [ref=e78]: 本文讨论文字、图像与口述史料共同进入研究档案时的整理路径。研究将原始载体、转写文本与校勘说明分层记录，并保留可追溯的版本关联，便于后续研究者核查引用依据。
                - paragraph [ref=e79]: 本轮评审关注方法说明是否完整、证据能否追溯，以及资料版本与引用范围是否一致。预览内容为 Mock 文本，不代表真实上传文件或正式研究结论。
              - generic [ref=e80]:
                - heading "01 资料组织与方法说明" [level=2] [ref=e81]
                - paragraph [ref=e82]: 研究资料按来源、处理步骤和使用条件组织。原始记录与整理后的内容分别保留，对影响判断的转换给出说明；有争议的条目进入复核记录，不在汇总时直接抹平差异。
                - blockquote [ref=e83]: 核查重点：读者能否从当前版本找到原始依据，并理解资料在何种条件下支持本文的解释？
              - generic [ref=e84]:
                - heading "02 证据记录与复核路径" [level=2] [ref=e85]
                - table [ref=e86]:
                  - caption [ref=e87]: 表 1 · 证据索引示例（Mock）
                  - rowgroup [ref=e88]:
                    - row [ref=e89]:
                      - columnheader "记录范围" [ref=e90]
                      - columnheader "可追溯依据" [ref=e91]
                      - columnheader "复核提示" [ref=e92]
                  - rowgroup [ref=e93]:
                    - row [ref=e94]:
                      - cell "核心方法" [ref=e95]
                      - cell "R-042-M01 / 方法附件" [ref=e96]
                      - cell "补充处理前后示例" [ref=e97]
                    - row [ref=e98]:
                      - cell "结果说明" [ref=e99]
                      - cell "R-042-E02 / 证据目录" [ref=e100]
                      - cell "确认版本与引用一致" [ref=e101]
                - paragraph [ref=e102]: 复核时应把具体证据位置写入右侧意见，方便作者定位。缺少材料与材料之间出现冲突分别记录，避免用概括性的评价替代核查结论。
              - generic [ref=e103]:
                - heading "03 解释边界与开放使用" [level=2] [ref=e104]
                - paragraph [ref=e105]: 示例资料仅用于讨论当前范围内的方法和组织方式。后续使用需重新确认来源许可、版本关系与适用条件；本工作台没有连接真实发布或审批服务。
              - generic [ref=e106]: Mock 文字预览 · R-042 · v2.1
```

# Test source

```ts
  228 |     expect(transcript!.x).toBeGreaterThan(chapters!.x + chapters!.width + 16);
  229 |     expect(hierarchy.excerpt).not.toBe(hierarchy.detail);
  230 |     expect(hierarchy.excerptWeight).not.toBe(hierarchy.detailWeight);
  231 |     await expect(root.getByRole('button', { name: '讲稿 00:00', exact: true })).toBeInViewport();
  232 |     await expect(root.locator('.w6-replay-transcript blockquote')).toBeInViewport();
  233 |     await record('E4-information-hierarchy', { chapters, transcript, hierarchy });
  234 |     await screenshot(page, `E4-initial-${width}x796`);
  235 |     await root.getByRole('textbox', { name: '回放笔记', exact: true }).fill('控制变量需要核对测量高度');
  236 |     await root.getByRole('button', { name: '讲稿 02:10', exact: true }).click();
  237 |     await expect(root.getByTestId('playback-time')).toHaveText('02:10');
  238 |     const before = await main.boundingBox();
  239 |     await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click();
  240 |     await expect(region(root, 'knowledge-index')).toHaveAttribute('data-temporary', 'true');
  241 |     await compareGeometry(main, before);
  242 |     await expect(root.getByTestId('playback-time')).toHaveText('02:10');
  243 |     await expect(root.getByRole('textbox', { name: '回放笔记', exact: true })).toHaveValue('控制变量需要核对测量高度');
  244 |     await page.keyboard.press('Escape');
  245 |     await expect(root.getByRole('button', { name: '临时查看知识索引', exact: true })).toBeFocused();
  246 |     await expect(region(root, 'knowledge-index')).toBeHidden();
  247 |     await root.getByRole('button', { name: '进入专注', exact: true }).click();
  248 |     await root.getByRole('button', { name: '退出专注', exact: true }).click();
  249 |     await compareGeometry(main, before);
  250 |     await expect(root.getByTestId('playback-time')).toHaveText('02:10');
  251 |     await expect(root.getByRole('textbox', { name: '回放笔记', exact: true })).toHaveValue('控制变量需要核对测量高度');
  252 |     await root.getByRole('button', { name: '播放回放', exact: true }).click();
  253 |     await expect(root.getByRole('button', { name: '暂停回放', exact: true })).toBeVisible();
  254 |     await expect.poll(async () => root.getByTestId('playback-time').textContent(), { timeout: 3500 }).not.toBe('02:10');
  255 |     await root.getByRole('button', { name: '暂停回放', exact: true }).click();
  256 |     const paused = await root.getByTestId('playback-time').textContent();
  257 |     await page.waitForTimeout(1200);
  258 |     await expect(root.getByTestId('playback-time')).toHaveText(paused!);
  259 |     const slider = root.getByRole('slider', { name: '回放进度', exact: true });
  260 |     await slider.click();
  261 |     await slider.press('Home');
  262 |     await slider.press('ArrowRight');
  263 |     await expect(root.getByTestId('playback-time')).toHaveText('00:01');
  264 |     await expect(root.getByRole('textbox', { name: '回放笔记', exact: true })).toHaveValue('控制变量需要核对测量高度');
  265 |     await record('E4-preserved-geometry', before);
  266 |     await screenshot(page, `E4-${width}x796`);
  267 |   });
  268 | 
  269 |   test(`F02 E5 existing instance isolation survives A-only local patch at ${width}`, async ({ page }) => {
  270 |     const root = await open(page, 'E5', width);
  271 |     const b = root.getByRole('region', { name: '实例 B', exact: true });
  272 |     await b.getByRole('button', { name: '实验方法', exact: true }).click();
  273 |     await b.getByRole('textbox', { name: '实例 B 草稿', exact: true }).fill('B 的独立说明与尺寸保持');
  274 |     const facts = () => b.evaluate(element => ({
  275 |       html: element.innerHTML,
  276 |       rect: { width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height },
  277 |       rows: [...element.querySelectorAll('.rain-navigation-family__row')].map(row => ({ height: getComputedStyle(row).height, padding: getComputedStyle(row).padding, font: getComputedStyle(row).fontSize })),
  278 |     }));
  279 |     const before = await facts();
  280 |     await root.getByRole('button', { name: '仅当前实例 A 使用紧凑目录', exact: true }).click();
  281 |     await expect(root.getByRole('region', { name: '实例 A', exact: true })).toHaveAttribute('data-directory-density', 'compact');
  282 |     expect(await facts()).toEqual(before);
  283 |     await expect(b.getByRole('textbox', { name: '实例 B 草稿', exact: true })).toHaveValue('B 的独立说明与尺寸保持');
  284 |     await screenshot(page, `E5-${width}x796`);
  285 |   });
  286 | 
  287 |   test(`C01-C02-F01 E6 small semantic Tags and left/right edge recovery at ${width}`, async ({ page }) => {
  288 |     const root = await open(page, 'E6', width);
  289 |     const work = root.locator('[data-ai-task="E6"]');
  290 |     const queue = work.getByRole('group', { name: '待评审学术资源', exact: true });
  291 |     const first = queue.getByRole('button', { name: firstResource, exact: true });
  292 |     const type = first.locator('[data-rain-id="ui-tag"]').filter({ hasText: '研究工作论文' });
  293 |     const status = first.locator('[data-rain-id="ui-tag"]').filter({ hasText: '待评审' });
  294 |     await expect(type).toHaveAttribute('data-size', '20');
  295 |     await expect(type).toHaveAttribute('data-color', 'neutral');
  296 |     await expect(status).toHaveAttribute('data-size', '20');
  297 |     await expect(status).toHaveAttribute('data-color', 'gold');
  298 |     const typeBox = await type.boundingBox();
  299 |     const statusBox = await status.boundingBox();
  300 |     expect(Math.abs(typeBox!.y - statusBox!.y)).toBeLessThanOrEqual(1);
  301 |     expect(typeBox!.height).toBe(20);
  302 |     expect(statusBox!.height).toBe(20);
  303 |     const details = first.locator('.w6-review-resource-details');
  304 |     expect((await details.boundingBox())!.y).toBeGreaterThan(typeBox!.y);
  305 |     const separators = await details.locator('span + span').evaluateAll(elements => elements.map(element => ({ width: getComputedStyle(element, '::before').width, content: getComputedStyle(element, '::before').content, border: getComputedStyle(element, '::before').borderInlineStartWidth })));
  306 |     expect(separators.length).toBeGreaterThanOrEqual(2);
  307 |     expect(separators.every(separator => parseFloat(separator.width) > 0 || parseFloat(separator.border) > 0 || /\|/.test(separator.content))).toBe(true);
  308 |     const draft = work.getByRole('textbox', { name: '审核意见', exact: true });
  309 |     await draft.fill('第一份资料的未保存意见');
  310 |     await work.getByRole('button', { name: '隐藏资源队列', exact: true }).click();
  311 |     await work.getByRole('button', { name: '隐藏评审面板', exact: true }).click();
  312 |     const left = work.getByRole('button', { name: '展开资源队列', exact: true });
  313 |     const right = work.getByRole('button', { name: '展开评审面板', exact: true });
  314 |     await expect(left).toBeVisible();
  315 |     await expect(right).toBeVisible();
  316 |     const workBody = work.locator('.rain-workspace__flow');
  317 |     const bodyBox = await workBody.boundingBox();
  318 |     const leftBox = await left.boundingBox();
  319 |     const rightBox = await right.boundingBox();
  320 |     expect(leftBox!.width).toBe(32);
  321 |     expect(leftBox!.height).toBe(32);
  322 |     expect(rightBox!.width).toBe(32);
  323 |     expect(rightBox!.height).toBe(32);
  324 |     expect(leftBox!.x - bodyBox!.x).toBeLessThanOrEqual(12);
  325 |     expect(bodyBox!.x + bodyBox!.width - rightBox!.x - rightBox!.width).toBeLessThanOrEqual(12);
  326 |     const barIdentity = await work.locator('.w6-review-preview-bar > span').boundingBox();
  327 |     const nextButton = await work.getByRole('button', { name: '下一份', exact: true }).boundingBox();
> 328 |     expect(barIdentity!.x).toBeGreaterThanOrEqual(leftBox!.x + leftBox!.width);
      |                            ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  329 |     expect(nextButton!.x + nextButton!.width).toBeLessThanOrEqual(rightBox!.x);
  330 |     await record('E6-edge-controls-do-not-cover-preview-bar', { leftBox, rightBox, barIdentity, nextButton });
  331 |     await screenshot(page, `E6-edges-${width}x796`);
  332 |     const preview = work.getByRole('main', { name: '当前资源预览', exact: true });
  333 |     const hiddenWidth = (await preview.boundingBox())!.width;
  334 |     await left.click();
  335 |     await expect(region(work, 'queue')).toHaveAttribute('data-mode', 'expanded');
  336 |     await expect(region(work, 'queue')).toHaveAttribute('data-temporary', 'false');
  337 |     expect((await preview.boundingBox())!.width).toBeLessThan(hiddenWidth - 200);
  338 |     await right.click();
  339 |     await expect(region(work, 'comments')).toHaveAttribute('data-mode', 'expanded');
  340 |     await expect(region(work, 'comments')).toHaveAttribute('data-temporary', 'false');
  341 |     await expect(draft).toHaveValue('第一份资料的未保存意见');
  342 |     await expect(work.getByRole('status', { name: '本地保存状态' })).toHaveText('未保存');
  343 |     await work.getByRole('button', { name: '保存本地评审', exact: true }).click();
  344 |     await expect(work.getByRole('status', { name: '本地保存状态' })).toHaveText('本页已保存');
  345 |     const savedTag = first.locator('[data-rain-id="ui-tag"]').filter({ hasText: '本页已评审' });
  346 |     await expect(savedTag).toHaveAttribute('data-color', 'olive');
  347 |     expect(Math.abs((await type.boundingBox())!.y - (await savedTag.boundingBox())!.y)).toBeLessThanOrEqual(1);
  348 |     await queue.getByRole('button', { name: secondResource, exact: true }).click();
  349 |     await expect(draft).toHaveValue('');
  350 |     await expect(work.getByRole('main', { name: '当前资源预览' })).toHaveAttribute('data-resource-id', 'resource-climate-057');
  351 |     await expect(work.getByRole('region', { name: '当前资源评审' })).toHaveAttribute('data-resource-id', 'resource-climate-057');
  352 |     await first.click();
  353 |     await expect(draft).toHaveValue('第一份资料的未保存意见');
  354 |     await screenshot(page, `E6-${width}x796`);
  355 |   });
  356 | 
  357 |   test(`C03 E6 own-scroll sticky review heading at ${width}`, async ({ page }) => {
  358 |     const root = await open(page, 'E6', width);
  359 |     const comments = region(root, 'comments');
  360 |     const header = comments.locator('.w6-review-comments > .w6-review-pane-head');
  361 |     const before = await header.boundingBox();
  362 |     await comments.hover({ position: { x: 100, y: 250 } });
  363 |     await page.mouse.wheel(0, 1000);
  364 |     await expect.poll(() => comments.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
  365 |     const after = await header.boundingBox();
  366 |     expect(Math.abs(after!.y - before!.y)).toBeLessThanOrEqual(1);
  367 |     const facts = await header.evaluate(element => ({ position: getComputedStyle(element).position, top: getComputedStyle(element).top, background: getComputedStyle(element).backgroundColor, y: element.getBoundingClientRect().y }));
  368 |     expect(facts.position).toBe('sticky');
  369 |     expect(facts.top).toBe('0px');
  370 |     await expect(comments.getByRole('heading', { name: '评审面板', exact: true })).toBeVisible();
  371 |     await record('E6-sticky-geometry', { before, after, facts });
  372 |     await screenshot(page, `E6-sticky-${width}x796`);
  373 |   });
  374 | }
  375 | 
  376 | test('F01 E6 edge keyboard recovery and Escape owner at 996x796', async ({ page }) => {
  377 |   const root = await open(page, 'E6', 996);
  378 |   const work = root.locator('[data-ai-task="E6"]');
  379 |   const main = work.getByRole('main', { name: '当前资源预览', exact: true });
  380 |   const queue = region(work, 'queue');
  381 |   const comments = region(work, 'comments');
  382 |   // The existing adaptation contract hides lower-priority comments first.
  383 |   await expect(queue).toHaveAttribute('data-mode', 'expanded');
  384 |   await expect(comments).toHaveAttribute('data-mode', 'hidden');
  385 |   await expect(comments).toHaveAttribute('data-forced', 'true');
  386 |   const edge = work.getByRole('button', { name: '展开评审面板', exact: true });
  387 |   const before = await main.boundingBox();
  388 |   await tabTo(page, edge);
  389 |   await expect(edge).toBeFocused();
  390 |   await page.keyboard.press('Enter');
  391 |   await expect(comments).toHaveAttribute('data-temporary', 'true');
  392 |   await compareGeometry(main, before);
  393 |   await expect(work.getByRole('button', { name: '展开评审面板', exact: true })).toHaveCount(0);
  394 |   await expect(work.getByRole('button', { name: '关闭临时评审面板', exact: true })).toBeVisible();
  395 |   await page.keyboard.press('Escape');
  396 |   await expect(comments).toHaveAttribute('data-temporary', 'false');
  397 |   await expect(edge).toBeFocused();
  398 |   await edge.click();
  399 |   await expect(comments).toHaveAttribute('data-temporary', 'true');
  400 |   await compareGeometry(main, before);
  401 |   await screenshot(page, 'E6-temporary-996x796');
  402 |   await page.keyboard.press('Escape');
  403 |   await work.getByRole('button', { name: '隐藏资源队列', exact: true }).click();
  404 |   await expect(comments).toHaveAttribute('data-mode', 'expanded');
  405 |   const left = work.getByRole('button', { name: '展开资源队列', exact: true });
  406 |   await tabTo(page, left);
  407 |   await page.keyboard.press('Space');
  408 |   await expect(queue).toHaveAttribute('data-mode', 'expanded');
  409 |   await expect(queue).toHaveAttribute('data-temporary', 'false');
  410 |   await expect(comments).toHaveAttribute('data-mode', 'hidden');
  411 |   await screenshot(page, 'E6-recovered-996x796');
  412 | });
  413 | 
  414 | test('F03 E3 scoring panel and dedicated number input stay available at 996x796', async ({ page }) => {
  415 |   const root = await open(page, 'E3', 996);
  416 |   const score = root.getByRole('spinbutton', { name: '本题分数', exact: true });
  417 |   await expect(score).toBeVisible();
  418 |   await score.fill('18');
  419 |   await score.press('ArrowUp');
  420 |   await expect(score).toHaveValue('19');
  421 |   await score.press('ArrowDown');
  422 |   await expect(score).toHaveValue('18');
  423 |   await root.getByRole('textbox', { name: '评分评语', exact: true }).fill('窄屏意见保持');
  424 |   await root.getByRole('button', { name: '进入专注', exact: true }).click();
  425 |   await expect(root.getByRole('complementary', { name: '评分区', exact: true })).toBeVisible();
  426 |   await expect(score).toHaveValue('18');
  427 |   await expect(root.getByText('尚未保存到本地', { exact: true })).toBeVisible();
  428 |   await root.getByRole('button', { name: '退出专注', exact: true }).click();
```