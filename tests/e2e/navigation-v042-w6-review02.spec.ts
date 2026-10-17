import { expect, test, type Locator, type Page } from '@playwright/test';

const widths = [1200, 1343, 1600] as const;
async function open(page: Page, scene: string, width = 1343, height = 747) {
  await page.setViewportSize({ width, height });
  await page.goto(`/navigation-v042-w6-consumer.html#${scene}`);
  const root = page.locator(`[data-scene="${scene}"]`);
  await expect(root).toBeVisible();
  await expect(page.locator('.w6-consumer')).toHaveAttribute('data-active-task', scene);
  return root;
}
const region = (root: Locator, id: string) => root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
async function record(name: string, value: unknown) {
  await test.info().attach(name, { body: JSON.stringify(value, null, 2), contentType: 'application/json' });
}
async function screenshot(page: Page, name: string) {
  await page.screenshot({ path: test.info().outputPath(`${name}-${test.info().project.name}.png`), fullPage: false });
}
async function sameGeometry(target: Locator, before: Awaited<ReturnType<Locator['boundingBox']>>) {
  const after = await target.boundingBox();
  expect(before).not.toBeNull(); expect(after).not.toBeNull();
  for (const axis of ['x', 'y', 'width', 'height'] as const) expect(Math.abs(before![axis] - after![axis]), axis).toBeLessThanOrEqual(1);
}
async function title16x22(title: Locator) {
  const facts = await title.evaluate(element => {
    const css = getComputedStyle(element), box = element.getBoundingClientRect();
    return { fontSize: css.fontSize, lineHeight: css.lineHeight, height: box.height, width: box.width };
  });
  expect(facts.fontSize).toBe('16px'); expect(facts.lineHeight).toBe('22px'); expect(facts.height).toBe(22);
  return facts;
}
async function filledPaint(field: Locator) {
  await expect(field).toHaveAttribute('data-appearance', 'filled');
  const paint = await field.evaluate(element => {
    const css = getComputedStyle(element);
    const pixels = (value: string) => {
      const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
      const context = canvas.getContext('2d')!; context.fillStyle = value.trim(); context.fillRect(0, 0, 1, 1);
      return [...context.getImageData(0, 0, 1, 1).data];
    };
    return { background: css.backgroundColor, token: css.getPropertyValue('--rain-category-fill-neutral-solid-6').trim(),
      actual: pixels(css.backgroundColor), expected: pixels(css.getPropertyValue('--rain-category-fill-neutral-solid-6')) };
  });
  expect(paint.token).not.toBe(''); expect(paint.actual).toEqual(paint.expected); expect(paint.actual).not.toEqual([255, 255, 255, 255]);
  return paint;
}
async function tabTo(page: Page, target: Locator) {
  // The restore toolbar precedes the final editor. Traverse backwards rather
  // than expecting native forward Tab to wrap from browser chrome into a page.
  // macOS WebKit's native all-controls traversal additionally uses Option.
  const key = test.info().project.name === 'webkit' ? 'Shift+Alt+Tab' : 'Shift+Tab';
  await page.bringToFront();
  await page.mouse.move(2, 2);
  if (await target.evaluate(element => element === document.activeElement)) return;
  const visited: string[] = [];
  for (let count = 0; count < 100; count++) {
    await page.keyboard.press(key);
    visited.push(await page.evaluate(() => `${document.activeElement?.tagName}: ${document.activeElement?.getAttribute('aria-label') ?? document.activeElement?.textContent?.trim().slice(0, 60)}`));
    if (await target.evaluate(element => element === document.activeElement)) return;
  }
  const context = await page.evaluate(() => ({ hasFocus: document.hasFocus(), userAgent: navigator.userAgent, url: location.href }));
  await record('native-keyboard-focus-traversal', { key, visited, context });
  throw new Error(`Native ${key} traversal did not reach ${await target.getAttribute('aria-label')}`);
}
async function surfaceProfile(surface: Locator) {
  return surface.evaluate(element => {
    const frame = element.getBoundingClientRect();
    const panel = element.querySelector('.rain-connected-surface__panel')!.getBoundingClientRect();
    const selected = element.querySelector('[role="tab"][aria-selected="true"]')!.getBoundingClientRect();
    const path = element.querySelector<SVGPathElement>('.rain-connected-surface__union')!;
    const seam = panel.top - frame.top, left = selected.left - frame.left, right = selected.right - frame.left;
    const shoulder = parseFloat(getComputedStyle(element).getPropertyValue('--rain-local-cs-shoulder'));
    const s = Number.isFinite(shoulder) ? shoulder : 4;
    const point = (x: number, y: number) => path.isPointInFill(new DOMPoint(x, y));
    return { d: path.getAttribute('d'), fill: getComputedStyle(path).fill, track: getComputedStyle(element).backgroundColor,
      frame: { width: frame.width, height: frame.height }, seam, selected: { left, right, top: selected.top - frame.top, bottom: selected.bottom - frame.top },
      points: { insideTab: point((left + right) / 2, selected.top - frame.top + selected.height / 2),
        insidePanel: point(frame.width / 2, seam + 8), rightShoulder: point(right + s / 2, seam - 0.2),
        aboveRightShoulder: point(right + s / 2, seam - s - 1) } };
  });
}
async function controlledPanel(main: Locator, label: string) {
  // sharedContent mounts exactly the active panel; inactive tabs cannot control
  // absent panels. Check the real selected relationship after every switch.
  const tab = main.getByRole('tab', { name: label, exact: true });
  const panel = main.getByRole('tabpanel', { name: label, exact: true });
  await expect(tab).toHaveAttribute('aria-selected', 'true'); await expect(panel).toBeVisible();
  await expect(main.getByRole('tabpanel')).toHaveCount(1);
  await expect(tab).toHaveAttribute('aria-controls', (await panel.getAttribute('id'))!);
  return panel;
}

test.beforeEach(async ({ page }) => {
  const faults: string[] = [];
  page.on('pageerror', error => faults.push(`pageerror: ${error.message}`));
  page.on('response', response => { if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) faults.push(`HTTP ${response.status()}: ${response.url()}`); });
  (page as Page & { review02Faults?: string[] }).review02Faults = faults;
});
test.afterEach(async ({ page }) => {
  const faults = (page as Page & { review02Faults?: string[] }).review02Faults ?? [];
  await record('browser-faults', faults); expect(faults, 'no runtime exception or missing served asset').toEqual([]);
});

for (const width of widths) {
  test(`R02-C07-C08-C10-C11 E2 compact hierarchy and filled feedback at ${width}x747`, async ({ page }) => {
    const root = await open(page, 'E2', width), main = root.getByTestId('interaction-identity');
    const title = await title16x22(main.getByRole('heading', { level: 1 }));
    const summary = main.locator('.w6-interaction-summary');
    const summaryBox = (await summary.boundingBox())!;
    expect(summaryBox.height, 'summary leaves first screen for reading').toBeLessThanOrEqual(100);
    const activities = region(root, 'activities'), groups = region(root, 'groups');
    await expect(activities.getByRole('heading', { name: '课堂内', exact: true })).toBeVisible();
    await expect(activities.getByRole('heading', { name: '课后', exact: true })).toBeVisible();
    await expect(groups.getByRole('group', { name: '小组对象', exact: true })).toHaveAttribute('data-appearance', 'queue');
    const cards = activities.getByRole('group', { name: '课堂内活动', exact: true }).getByRole('button');
    const boxes = await Promise.all((await cards.all()).map(card => card.boundingBox()));
    const panelBox = (await activities.boundingBox())!;
    expect(boxes).toHaveLength(2); expect(Math.abs(boxes[0]!.x - boxes[1]!.x)).toBeLessThanOrEqual(1);
    expect(boxes[1]!.y).toBeGreaterThanOrEqual(boxes[0]!.y + boxes[0]!.height);
    for (const box of boxes) { expect(box!.x).toBeGreaterThanOrEqual(panelBox.x); expect(box!.x + box!.width).toBeLessThanOrEqual(panelBox.x + panelBox.width); }
    const content = main.getByRole('tabpanel', { name: '小组提交', exact: true });
    await expect(content).toBeVisible(); expect((await content.boundingBox())!.y).toBeLessThan(summaryBox.y + 180);
    const feedback = main.locator('[data-rain-id="ui-textarea"]');
    await page.mouse.move(2, 2); const paint = await filledPaint(feedback);
    await record('E2-density-and-paint', { title, summaryBox, boxes, panelBox, paint });
    await screenshot(page, `E2-submission-${width}x747`);
  });

  test(`R02-C09 E2 complete members 4-5-6 with loaded portraits and stable IDs at ${width}x747`, async ({ page }) => {
    const root = await open(page, 'E2', width), main = root.getByTestId('interaction-identity');
    await main.getByRole('tab', { name: '小组成员', exact: true }).click();
    const sets: { group: number; ids: string[]; numbers: string[]; sources: string[] }[] = [];
    for (const [index, label] of ['第一研究组', '第二研究组', '第三研究组'].entries()) {
      await region(root, 'groups').getByRole('button', { name: label, exact: true }).click();
      await expect(main).toHaveAttribute('data-group-id', `discussion-g${index + 1}`);
      const panel = main.getByRole('tabpanel', { name: '小组成员', exact: true });
      const rows = panel.locator('[data-member-id]');
      await expect(rows).toHaveCount(4 + index);
      await expect(panel.locator('[data-rain-id="ui-avatar"]')).toHaveCount(4 + index);
      await expect(panel.locator('img[data-slot="portrait"]')).toHaveCount(4 + index);
      await expect.poll(() => panel.locator('img[data-slot="portrait"]').evaluateAll(elements => elements.every(element => element.getAttribute('data-ready') === 'true'))).toBe(true);
      await expect.poll(() => rows.evaluateAll(elements => elements.every(element => [...element.querySelectorAll<HTMLImageElement>('img')].every(img => img.complete && img.naturalWidth > 0)))).toBe(true);
      const members = await rows.evaluateAll(elements => elements.map(element => {
        const text = element.textContent ?? '';
        const avatar = element.querySelector('[data-rain-id="ui-avatar"]')!;
        const portraits = [...element.querySelectorAll<HTMLImageElement>('img')];
        return { id: element.getAttribute('data-member-id')!, number: element.getAttribute('data-student-number') ?? '', text,
          role: element.querySelector('[data-member-role]')?.textContent?.trim() ?? '', name: element.querySelector('strong')?.textContent?.trim() ?? '',
          size: avatar.getAttribute('data-size'), source: portraits.at(-1)!.currentSrc,
          box: { width: avatar.getBoundingClientRect().width, height: avatar.getBoundingClientRect().height } };
      }));
      expect(new Set(members.map(member => member.id)).size).toBe(4 + index);
      expect(new Set(members.map(member => member.number)).size).toBe(4 + index);
      for (const member of members) {
        expect(member.number).toMatch(/^\d{7,}$/);
        expect(member.role.length).toBeGreaterThan(0); expect(member.name.length).toBeGreaterThan(0);
        expect(['32', '40']).toContain(member.size); expect(member.box.width).toBe(Number(member.size)); expect(member.box.height).toBe(Number(member.size));
      }
      sets.push({ group: index + 1, ids: members.map(member => member.id), numbers: members.map(member => member.number), sources: members.map(member => member.source) });
      await record(`E2-group-${index + 1}-members`, members);
      await screenshot(page, `E2-members-${index + 1}-${width}x747`);
    }
    expect(new Set(sets.flatMap(set => set.ids)).size).toBe(15); expect(new Set(sets.flatMap(set => set.numbers)).size).toBe(15);
    await region(root, 'activities').getByRole('button', { name: '课后反思', exact: true }).click();
    await main.getByRole('tab', { name: '小组成员', exact: true }).click();
    const again = await main.getByRole('tabpanel', { name: '小组成员', exact: true }).locator('[data-member-id]').evaluateAll(elements => elements.map(element => ({ id: element.getAttribute('data-member-id')!, number: element.getAttribute('data-student-number') ?? '', source: [...element.querySelectorAll<HTMLImageElement>('img')].at(-1)!.currentSrc })));
    expect(again.map(member => member.id)).toEqual(sets[0]!.ids); expect(again.map(member => member.number)).toEqual(sets[0]!.numbers); expect(again.map(member => member.source)).toEqual(sets[0]!.sources);
    await record('E2-member-set-stability', { sets, again });
  });

  test(`R02-C01-C02-C03-C04-C05-C06 E3 title identity, real connected panel and compact fields at ${width}x747`, async ({ page }) => {
    const root = await open(page, 'E3', width), main = root.getByTestId('grading-identity');
    const title = await title16x22(main.getByRole('heading', { level: 1 }));
    const titleBox = (await main.getByRole('heading', { level: 1 }).boundingBox())!, metadataBox = (await main.locator('.w6-grade-identity-meta').boundingBox())!;
    expect(Math.abs(titleBox.y + titleBox.height / 2 - metadataBox.y - metadataBox.height / 2)).toBeLessThanOrEqual(1);
    expect(metadataBox.x).toBeGreaterThan(titleBox.x + titleBox.width);
    await expect(main.getByText('这份报告的题目', { exact: true })).toHaveCount(0); await expect(main.getByText('选择题目后在右侧评分', { exact: true })).toHaveCount(0);
    const tabs = main.getByRole('tablist', { name: '当前题目选择', exact: true });
    await expect(tabs.getByRole('tab')).toHaveCount(3);
    await tabs.getByRole('tab', { name: '第2题', exact: true }).click();
    const panel = await controlledPanel(main, '第2题');
    await expect(panel.getByRole('heading', { name: '设计控制变量', exact: true })).toBeVisible();
    await expect(panel.getByRole('region', { name: '当前学生答案', exact: true })).toBeVisible(); await expect(panel.getByRole('heading', { name: '评分参考', exact: true })).toBeVisible();
    const surface = main.locator('.rain-connected-surface'); await expect(surface).toHaveAttribute('data-active-visible', 'true');
    const profile = await surfaceProfile(surface);
    expect(profile.fill).toBe('rgb(255, 255, 255)'); expect(profile.track).not.toBe(profile.fill); expect(profile.d).toContain(' Q '); expect(profile.d).not.toMatch(/NaN|Infinity/);
    expect(profile.points).toEqual({ insideTab: true, insidePanel: true, rightShoulder: true, aboveRightShoulder: false }); expect(profile.selected.bottom).toBeCloseTo(profile.seam, 1);
    const score = root.getByRole('spinbutton', { name: '本题分数', exact: true }), number = root.locator('[data-rain-id="ui-input-number"]'), aside = root.getByRole('complementary', { name: '评分区', exact: true });
    await expect(number).toHaveAttribute('data-full-width', 'false'); const numberBox = (await number.boundingBox())!, asideBox = (await aside.boundingBox())!;
    expect(numberBox.width).toBeLessThan(asideBox.width - 24); expect(numberBox.height).toBe(36);
    await expect(score).toHaveAttribute('aria-valuemin', '0'); await expect(score).toHaveAttribute('aria-valuemax', '20');
    await expect(score).toHaveAttribute('placeholder', '分数');
    const placeholder = await score.evaluate(element => {
      const css = getComputedStyle(element), canvas = document.createElement('canvas'), context = canvas.getContext('2d')!;
      context.font = `${css.fontSize} ${css.fontFamily}`;
      return { textWidth: context.measureText(element.getAttribute('placeholder')!).width, available: element.clientWidth - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight) };
    });
    expect(placeholder.textWidth).toBeLessThanOrEqual(placeholder.available);
    await page.mouse.move(2, 2); const numberPaint = await filledPaint(number.locator('[data-slot="frame"]')), commentPaint = await filledPaint(aside.locator('[data-rain-id="ui-textarea"]'));
    await record('E3-layout-profile-fields', { title, titleBox, metadataBox, profile, numberBox, asideBox, numberPaint, commentPaint, placeholder });
    await screenshot(page, `E3-${width}x747`);
  });
}

test('R02 E3 controlled browser tabs use native keyboard and preserve correct saved drafts across both axes', async ({ page }) => {
  const root = await open(page, 'E3'), main = root.getByTestId('grading-identity'), score = root.getByRole('spinbutton', { name: '本题分数' }), comment = root.getByRole('textbox', { name: '评分评语' });
  const tabs = main.getByRole('tablist', { name: '当前题目选择', exact: true });
  await tabs.getByRole('tab', { name: '第1题', exact: true }).click();
  await page.keyboard.press('ArrowRight'); await expect(tabs.getByRole('tab', { name: '第2题', exact: true })).toBeFocused(); await page.keyboard.press('Enter');
  await expect(main).toHaveAttribute('data-draft-key', 'paper-microclimate/q2/lin-ning');
  await score.fill('17'); await score.press('Tab'); await comment.fill('林宁第二题独立评语');
  await root.getByRole('button', { name: '保存本地草稿', exact: true }).click(); await expect(root.getByRole('status')).toHaveText('已保存到本地状态');
  await tabs.getByRole('tab', { name: '第2题', exact: true }).click(); await page.keyboard.press('End'); await page.keyboard.press('Enter');
  await expect(main).toHaveAttribute('data-question-id', 'q3'); await expect(score).toHaveValue(''); await expect(comment).toHaveValue('');
  await score.fill('12'); await score.press('Tab'); await comment.fill('林宁第三题尚未保存');
  await tabs.getByRole('tab', { name: '第3题', exact: true }).click(); await page.keyboard.press('Home'); await page.keyboard.press('Enter'); await expect(main).toHaveAttribute('data-question-id', 'q1');
  await tabs.getByRole('tab', { name: '第2题', exact: true }).click(); await expect(score).toHaveValue('17'); await expect(comment).toHaveValue('林宁第二题独立评语'); await expect(root.getByRole('status')).toHaveText('已保存到本地状态');
  await root.getByRole('button', { name: '显示批改队列', exact: true }).click();
  const queue = region(root, 'grading-queue'); await queue.getByText('按题', { exact: true }).click(); await expect(queue.getByRole('radio', { name: '按题', exact: true })).toBeChecked();
  const studentTabs = main.getByRole('tablist', { name: '当前学生选择', exact: true });
  await expect(studentTabs.getByRole('tab')).toHaveCount(3); await studentTabs.getByRole('tab', { name: '陈安', exact: true }).click();
  await expect(main).toHaveAttribute('data-draft-key', 'paper-microclimate/q2/chen-an'); await expect(score).toHaveValue(''); await expect(comment).toHaveValue('');
  await controlledPanel(main, '陈安');
  await studentTabs.getByRole('tab', { name: '林宁', exact: true }).click(); await expect(score).toHaveValue('17'); await expect(comment).toHaveValue('林宁第二题独立评语');
  const surface = main.locator('.rain-connected-surface'); await studentTabs.getByRole('tab', { name: '陈安', exact: true }).click();
  const profile = await surfaceProfile(surface); expect(profile.points.rightShoulder).toBe(true); expect(profile.fill).toBe('rgb(255, 255, 255)');
  await record('E3-alternate-axis-profile', profile); await screenshot(page, 'E3-question-mode-1343x747');
});

test('R02 E2 feedback belongs to the stable group across activities and detail tabs', async ({ page }) => {
  const root = await open(page, 'E2'), main = root.getByTestId('interaction-identity'), feedback = root.getByRole('textbox', { name: '课堂反馈草稿' });
  await feedback.fill('讨论第一组反馈'); await region(root, 'groups').getByRole('button', { name: '第二研究组', exact: true }).click(); await expect(feedback).toHaveValue(''); await feedback.fill('讨论第二组反馈');
  await main.getByRole('tab', { name: '小组成员', exact: true }).click(); await expect(feedback).toHaveValue('讨论第二组反馈'); await main.getByRole('tab', { name: '小组提交', exact: true }).click();
  await region(root, 'activities').getByRole('button', { name: '课后反思', exact: true }).click(); await expect(main).toHaveAttribute('data-group-id', 'reflection-g1'); await expect(feedback).toHaveValue(''); await feedback.fill('反思第一组反馈');
  await region(root, 'activities').getByRole('button', { name: '证据分析讨论', exact: true }).click(); await expect(feedback).toHaveValue('讨论第一组反馈'); await region(root, 'groups').getByRole('button', { name: '第二研究组', exact: true }).click(); await expect(feedback).toHaveValue('讨论第二组反馈');
});

test('R02 E2 996 hide and native keyboard recovery retain width, draft and focus', async ({ page }) => {
  const root = await open(page, 'E2', 996), main = root.getByTestId('interaction-identity');
  const before = await main.boundingBox();
  await root.getByRole('textbox', { name: '课堂反馈草稿' }).fill('996恢复前的反馈');
  await root.getByRole('button', { name: '隐藏课堂活动', exact: true }).click();
  const restore = root.getByRole('button', { name: '显示课堂活动', exact: true });
  expect((await main.boundingBox())!.width).toBeGreaterThan(before!.width + 190);
  await tabTo(page, restore); await page.keyboard.press('Enter');
  await expect(region(root, 'activities')).toHaveAttribute('data-mode', 'expanded');
  await expect(region(root, 'activities')).toHaveAttribute('data-temporary', 'false');
  await expect(root.getByRole('button', { name: '隐藏课堂活动', exact: true })).toBeFocused();
  await sameGeometry(main, before); await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('996恢复前的反馈');
  await record('E2-narrow-restored-bounds', before); await screenshot(page, 'E2-narrow-996x747');
});

test('R02 E2 800 forced temporary navigation keeps main geometry and native restore focus', async ({ page }) => {
  const root = await open(page, 'E2', 800), main = root.getByTestId('interaction-identity');
  const hidden = root.locator('.rain-workspace__region[data-mode="hidden"][data-side="start"]').first();
  const id = await hidden.getAttribute('data-region-id'); expect(id).toBeTruthy();
  const restore = root.getByRole('button', { name: `显示${id === 'activities' ? '课堂活动' : '小组列表'}`, exact: true });
  await root.getByRole('textbox', { name: '课堂反馈草稿' }).fill('窄屏恢复前的反馈');
  const before = await main.boundingBox(); await tabTo(page, restore); await page.keyboard.press('Enter');
  await expect(hidden).toHaveAttribute('data-temporary', 'true'); await sameGeometry(main, before);
  await page.keyboard.press('Escape'); await expect(restore).toBeFocused(); await expect(hidden).toHaveAttribute('data-temporary', 'false');
  await sameGeometry(main, before); await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('窄屏恢复前的反馈');
  await record('E2-temporary-main-bounds', before); await screenshot(page, 'E2-temporary-800x747');
});

test('R02 E3 996 header wraps within the article and fields fit without losing score', async ({ page }) => {
  const root = await open(page, 'E3', 996), main = root.getByTestId('grading-identity');
  const title = await title16x22(main.getByRole('heading', { level: 1 })), titleBox = (await main.getByRole('heading', { level: 1 }).boundingBox())!, meta = (await main.locator('.w6-grade-identity-meta').boundingBox())!, box = (await main.boundingBox())!;
  expect(meta.x).toBeGreaterThanOrEqual(box.x); expect(meta.x + meta.width).toBeLessThanOrEqual(box.x + box.width);
  const separated = meta.y >= titleBox.y + titleBox.height || meta.x >= titleBox.x + titleBox.width;
  expect(separated, 'identity either sits to the right or wraps below without overlap').toBe(true);
  const number = root.locator('[data-rain-id="ui-input-number"]'); expect((await number.boundingBox())!.width).toBeLessThan((await region(root, 'score').boundingBox())!.width - 24);
  await expect(root.getByRole('complementary', { name: '评分区' })).toBeVisible();
  const scroll = await main.evaluate(element => ({ scrollWidth: element.scrollWidth, clientWidth: element.clientWidth })); expect(scroll.scrollWidth).toBeLessThanOrEqual(scroll.clientWidth + 1);
  await record('E3-narrow-title-fit', { title, titleBox, meta, box, scroll }); await screenshot(page, 'E3-narrow-996x747');
});

test('R02 E3 score remains mounted through queue, appearance and focus actions without implicit save', async ({ page }) => {
  const root = await open(page, 'E3'), aside = root.getByRole('complementary', { name: '评分区' }), handle = await aside.elementHandle(), score = root.getByRole('spinbutton', { name: '本题分数' }), comment = root.getByRole('textbox', { name: '评分评语' });
  await score.fill('16'); await score.press('Tab'); await comment.fill('布局操作前未保存');
  await root.getByRole('button', { name: '显示批改队列', exact: true }).click();
  await region(root, 'grading-queue').getByText('卡片队列', { exact: true }).click(); await expect(region(root, 'grading-queue').getByRole('radio', { name: '卡片队列', exact: true })).toBeChecked();
  await root.getByRole('button', { name: '隐藏批改队列', exact: true }).click();
  await root.getByRole('button', { name: '进入专注', exact: true }).click(); await expect(aside).toBeVisible();
  await root.getByRole('button', { name: '退出专注', exact: true }).click(); await expect(aside).toBeVisible();
  expect(await handle!.evaluate(element => element.isConnected)).toBe(true); expect(await aside.evaluate((element, original) => element === original, handle)).toBe(true);
  await expect(score).toHaveValue('16'); await expect(comment).toHaveValue('布局操作前未保存'); await expect(root.getByRole('status')).toHaveText('尚未保存到本地');
  await root.getByRole('button', { name: '保存本地草稿', exact: true }).click(); await expect(root.getByRole('status')).toHaveText('已保存到本地状态');
});

test('R02 E3 compact question queue shows all three full entries and ordinary full-score metadata', async ({ page }) => {
  const root = await open(page, 'E3'); await root.getByRole('button', { name: '显示批改队列', exact: true }).click();
  const queue = region(root, 'grading-queue'); await queue.getByText('按题', { exact: true }).click(); await expect(queue.getByRole('radio', { name: '按题', exact: true })).toBeChecked();
  const rows = queue.getByRole('group', { name: '当前题目选择', exact: true }).getByRole('button'); await expect(rows).toHaveCount(3);
  const box = (await queue.boundingBox())!, entries = await Promise.all((await rows.all()).map(row => row.boundingBox()));
  for (const [index, row] of (await rows.all()).entries()) {
    const entry = entries[index]!; expect(entry.y).toBeGreaterThanOrEqual(box.y); expect(entry.y + entry.height).toBeLessThanOrEqual(box.y + box.height);
    expect(entry.height, 'compact queue entry instead of the old 96px default').toBeLessThan(96);
    const fullScore = row.getByText('满分 20 分', { exact: true }); await expect(fullScore).toBeVisible();
    expect(await fullScore.evaluate(element => element.closest('[data-rain-id="ui-tag"]'))).toBeNull();
    const style = await fullScore.evaluate(element => ({ fontSize: getComputedStyle(element).fontSize, color: getComputedStyle(element).color })); expect(parseFloat(style.fontSize)).toBeLessThanOrEqual(12);
  }
  await record('E3-compact-queue', { box, entries }); await screenshot(page, 'E3-compact-question-queue-1343x747');
});

test('R02 E3 short 1343x600 scrolls only the answer while scoring stays in place', async ({ page }) => {
  const root = await open(page, 'E3', 1343, 600), main = root.getByTestId('grading-identity'), aside = root.getByRole('complementary', { name: '评分区' });
  const before = await aside.boundingBox(), scoreBefore = await root.getByRole('spinbutton', { name: '本题分数' }).boundingBox();
  await main.hover({ position: { x: 100, y: 150 } }); await page.mouse.wheel(0, 600);
  await expect.poll(() => main.evaluate(element => element.scrollTop)).toBeGreaterThan(0); await sameGeometry(aside, before); await sameGeometry(root.getByRole('spinbutton', { name: '本题分数' }), scoreBefore);
  await record('E3-short-score-bounds', { before, scoreBefore, scrollTop: await main.evaluate(element => element.scrollTop) }); await screenshot(page, 'E3-short-1343x600');
});

test('R02 E4 actual pointer pin expands the pane and preserves playback, notes and focus mode', async ({ page }) => {
  const root = await open(page, 'E4'), main = root.locator('.w6-replay-main'), pane = region(root, 'knowledge-index'), workspace = root.locator('.rain-workspace');
  const notes = root.getByRole('textbox', { name: '回放笔记' }); await notes.fill('固定知识索引前的笔记');
  await root.getByRole('button', { name: '讲稿 02:10', exact: true }).click();
  const before = await main.boundingBox(); await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click();
  await expect(pane).toHaveAttribute('data-temporary', 'true'); await sameGeometry(main, before);
  await root.getByRole('button', { name: '固定知识索引', exact: true }).click();
  await expect(pane).toHaveAttribute('data-mode', 'expanded'); await expect(pane).toHaveAttribute('data-temporary', 'false'); await expect(pane).toBeVisible();
  expect((await main.boundingBox())!.width).toBeLessThan(before!.width - 200);
  await expect(root.getByTestId('playback-time')).toHaveText('02:10'); await expect(notes).toHaveValue('固定知识索引前的笔记'); await expect(workspace).toHaveAttribute('data-focused', 'false');
  await screenshot(page, 'E4-pinned-1343x747');
  await root.getByRole('button', { name: '进入专注', exact: true }).click(); await expect(workspace).toHaveAttribute('data-focused', 'true');
  await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click(); await root.getByRole('button', { name: '固定知识索引', exact: true }).click();
  await expect(pane).toHaveAttribute('data-mode', 'expanded'); await expect(workspace).toHaveAttribute('data-focused', 'true');
  await expect(root.getByTestId('playback-time')).toHaveText('02:10'); await expect(notes).toHaveValue('固定知识索引前的笔记');
  await root.getByRole('button', { name: '退出专注', exact: true }).click(); await expect(workspace).toHaveAttribute('data-focused', 'false'); await expect(pane).toHaveAttribute('data-mode', 'expanded');
  await record('E4-wide-pin-result', { before, after: await main.boundingBox(), pane: await pane.boundingBox() });
});

test('R02 E4 600 pointer pin keeps an unfit pane temporary and visible with its state', async ({ page }) => {
  const root = await open(page, 'E4', 600), pane = region(root, 'knowledge-index'), main = root.locator('.w6-replay-main');
  const notes = root.getByRole('textbox', { name: '回放笔记' }); await notes.fill('600窄屏固定笔记'); await root.getByRole('button', { name: '讲稿 02:10', exact: true }).click();
  const before = await main.boundingBox(); await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click(); await expect(pane).toHaveAttribute('data-temporary', 'true');
  await root.getByRole('button', { name: '固定知识索引', exact: true }).click();
  await expect(pane).toHaveAttribute('data-temporary', 'true'); await expect(pane).toHaveAttribute('data-mode', 'hidden'); await expect(pane).toBeVisible(); await sameGeometry(main, before);
  await expect(root.getByTestId('playback-time')).toHaveText('02:10'); await expect(notes).toHaveValue('600窄屏固定笔记');
  await screenshot(page, 'E4-unfit-pin-600x747'); await record('E4-narrow-pin-result', { before, pane: await pane.boundingBox() });
  await page.keyboard.press('Escape'); await expect(pane).toBeHidden(); await expect(root.getByRole('button', { name: '临时查看知识索引', exact: true })).toBeFocused();
});

test('R02 protected E1 E4 E5 E6 lightweight state smoke', async ({ page }) => {
  let root = await open(page, 'E1'); await root.getByRole('textbox', { name: '资源说明草稿' }).fill('公共范围轻烟'); await expect(root.getByRole('tab', { name: '公共资源包', exact: true })).toHaveAttribute('aria-selected', 'true');
  root = await open(page, 'E4'); await root.getByRole('button', { name: '讲稿 02:10', exact: true }).click(); await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click(); await expect(root.getByTestId('playback-time')).toHaveText('02:10'); await page.keyboard.press('Escape');
  root = await open(page, 'E5'); const b = root.getByRole('region', { name: '实例 B', exact: true }); const bDraft = root.getByRole('textbox', { name: '实例 B 草稿', exact: true }); await bDraft.fill('实例B轻烟草稿'); const before = await b.boundingBox(); await root.getByRole('button', { name: '仅当前实例 A 使用紧凑目录', exact: true }).click(); await expect(bDraft).toHaveValue('实例B轻烟草稿'); await sameGeometry(b, before);
  root = await open(page, 'E6'); await root.getByRole('button', { name: '隐藏资源队列', exact: true }).click(); const restore = root.getByRole('button', { name: '展开资源队列', exact: true }); await expect(restore).toBeVisible(); await restore.click(); await expect(region(root, 'queue')).toHaveAttribute('data-mode', 'expanded');
});
