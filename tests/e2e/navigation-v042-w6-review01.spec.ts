import { expect, test, type Locator, type Page } from '@playwright/test';

const widths = [1200, 1338, 1600] as const;
const firstResource = '数字人文研究中的多模态史料整理、版本校勘与长期开放获取方案（修订稿）';
const secondResource = '城市微气候观测数据的跨尺度校验、缺测处理与可复现分析流程说明';

async function open(page: Page, scene: string, width = 1338) {
  await page.setViewportSize({ width, height: 796 });
  await page.goto(`/navigation-v042-w6-consumer.html#${scene}`);
  const root = page.locator(`[data-scene="${scene}"]`);
  await expect(root).toBeVisible();
  await expect(page.locator('.w6-consumer')).toHaveAttribute('data-active-task', scene);
  return root;
}

function region(root: Locator, id: string) {
  return root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
}

async function screenshot(page: Page, name: string) {
  await page.screenshot({ path: test.info().outputPath(`${name}-${test.info().project.name}.png`), fullPage: false });
}

async function record(name: string, value: unknown) {
  await test.info().attach(name, { body: JSON.stringify(value, null, 2), contentType: 'application/json' });
}

async function compareGeometry(first: Locator, before: Awaited<ReturnType<Locator['boundingBox']>>) {
  const after = await first.boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  for (const axis of ['x', 'y', 'width', 'height'] as const) {
    expect(Math.abs(after![axis] - before![axis]), axis).toBeLessThanOrEqual(1);
  }
}

async function tabTo(page: Page, target: Locator) {
  // Real Tab traversal; no element.focus() or DOM dispatch substitutes.
  // macOS WebKit's native all-controls traversal uses Option+Tab.
  const key = test.info().project.name === 'webkit' ? 'Alt+Tab' : 'Tab';
  await page.mouse.move(2, 2);
  const visited: string[] = [];
  for (let step = 0; step < 100; step += 1) {
    await page.keyboard.press(key);
    visited.push(await page.evaluate(() => {
      const element = document.activeElement;
      return `${element?.tagName}: ${element?.getAttribute('aria-label') ?? element?.textContent?.trim().slice(0, 60)}`;
    }));
    if (await target.evaluate(element => element === element.ownerDocument.activeElement)) return;
  }
  await record('keyboard-traversal-failure', { key, visited });
  throw new Error(`Could not reach ${await target.getAttribute('aria-label')} with ${key}`);
}

test.beforeEach(async ({ page }) => {
  const faults: string[] = [];
  page.on('pageerror', error => faults.push(`pageerror: ${error.message}`));
  page.on('response', response => {
    if (response.status() >= 400 && !response.url().endsWith('/favicon.ico')) faults.push(`HTTP ${response.status()}: ${response.url()}`);
  });
  // Attach observed faults after the assertion so a real failure retains its evidence.
  (page as Page & { review01Faults?: string[] }).review01Faults = faults;
});

test.afterEach(async ({ page }) => {
  const faults = (page as Page & { review01Faults?: string[] }).review01Faults ?? [];
  await record('browser-faults', faults);
  expect(faults, 'no runtime exception or missing served asset').toEqual([]);
});

for (const width of widths) {
  test(`C05-C06 E1 Token rail, pale metadata and vertical separators at ${width}`, async ({ page }) => {
    const root = await open(page, 'E1', width);
    // The nav row is transparent; its ConnectedSurface paints the visible rail.
    const track = root.locator('.rain-connected-surface').first();
    const descriptions = root.locator('.rain-navigation__description');
    await expect(descriptions.first()).toHaveText('所有教学班共享 | 12项资料');
    expect(await descriptions.allTextContents()).toEqual(expect.arrayContaining([expect.stringContaining(' | ')]));
    const facts = await track.evaluate(element => {
      const color = (value: string) => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        const context = canvas.getContext('2d')!;
        context.fillStyle = value.trim();
        context.fillRect(0, 0, 1, 1);
        return [...context.getImageData(0, 0, 1, 1).data];
      };
      const css = getComputedStyle(element);
      const description = element.querySelector('.rain-navigation__description')!;
      return {
        background: css.backgroundColor,
        tokenBackground: css.getPropertyValue('--rain-category-background-neutral-2').trim(),
        backgroundPixels: color(css.backgroundColor),
        tokenBackgroundPixels: color(css.getPropertyValue('--rain-category-background-neutral-2')),
        metadata: getComputedStyle(description).color,
        tokenMetadata: css.getPropertyValue('--rain-category-text-neutral-6').trim(),
        metadataPixels: color(getComputedStyle(description).color),
        tokenMetadataPixels: color(css.getPropertyValue('--rain-category-text-neutral-6')),
        descriptionText: description.textContent,
      };
    });
    expect(facts.backgroundPixels).toEqual(facts.tokenBackgroundPixels);
    expect(facts.metadataPixels).toEqual(facts.tokenMetadataPixels);
    const types = root.locator('.w6-table [data-rain-id="ui-tag"]');
    await expect(types).toHaveCount(3);
    for (const tag of await types.all()) await expect(tag).toHaveAttribute('data-size', '20');
    const draft = root.getByRole('textbox', { name: '资源说明草稿' });
    await draft.fill('公共范围的复核草稿');
    await root.getByRole('button', { name: '更多班级', exact: true }).click();
    await page.getByRole('textbox', { name: '搜索范围' }).fill('237');
    await page.getByRole('button', { name: /跨学科项目课程.*237班/ }).click();
    await expect(root.getByRole('heading', { name: /237班资源/ })).toBeVisible();
    await draft.fill('237班的复核草稿');
    await root.getByRole('tab', { name: '公共资源包', exact: true }).click();
    await expect(draft).toHaveValue('公共范围的复核草稿');
    await record('E1-Token-facts', facts);
    await screenshot(page, `E1-${width}x796`);
  });

  test(`F06 E2 activity hierarchy differs from groups and selected ownership follows at ${width}`, async ({ page }) => {
    const root = await open(page, 'E2', width);
    const activities = region(root, 'activities');
    const groups = region(root, 'groups');
    await expect(activities.getByRole('heading', { name: '课堂内', exact: true })).toBeVisible();
    await expect(activities.getByRole('heading', { name: '课后', exact: true })).toBeVisible();
    const activityCards = activities.locator('[data-rain-id="ui-object-navigator"]');
    expect(await activityCards.count()).toBeGreaterThanOrEqual(2);
    for (const group of await activityCards.all()) await expect(group).toHaveAttribute('data-appearance', 'cards');
    const classroomButtons = activities.getByRole('group', { name: '课堂内活动', exact: true }).getByRole('button');
    await expect(classroomButtons).toHaveCount(2);
    const activityBox = await activities.boundingBox();
    const cardBoxes = await Promise.all((await classroomButtons.all()).map(button => button.boundingBox()));
    expect(Math.abs(cardBoxes[0]!.x - cardBoxes[1]!.x)).toBeLessThanOrEqual(1);
    expect(cardBoxes[1]!.y).toBeGreaterThanOrEqual(cardBoxes[0]!.y + cardBoxes[0]!.height);
    for (const box of cardBoxes) {
      expect(box!.x).toBeGreaterThanOrEqual(activityBox!.x);
      expect(box!.x + box!.width).toBeLessThanOrEqual(activityBox!.x + activityBox!.width);
    }
    await record('E2-complete-vertical-activity-cards', { activityBox, cardBoxes });
    await expect(groups.getByRole('group', { name: '小组对象', exact: true })).toHaveAttribute('data-appearance', 'queue');
    await activities.getByRole('button', { name: '课后反思', exact: true }).click();
    await groups.getByRole('button', { name: '第二研究组', exact: true }).click();
    await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-activity-id', 'reflection');
    await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-group-id', 'reflection-g2');
    await expect(root.getByRole('heading', { name: '第二研究组 · 课后反思' })).toBeVisible();
    await root.getByRole('textbox', { name: '课堂反馈草稿' }).fill('反思第二组独立反馈');
    await activities.getByRole('button', { name: '方案投票', exact: true }).click();
    await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-group-id', 'vote-g1');
    await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('');
    await activities.getByRole('button', { name: '课后反思', exact: true }).click();
    await groups.getByRole('button', { name: '第二研究组', exact: true }).click();
    await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('反思第二组独立反馈');
    const facts = await root.evaluate(element => {
      const style = (selector: string) => {
        const row = element.querySelector(selector)!;
        const css = getComputedStyle(row);
        return { borderRadius: css.borderRadius, padding: css.padding, background: css.backgroundColor, height: row.getBoundingClientRect().height };
      };
      return { activity: style('[data-region-id="activities"] .rain-navigation-family__row'), group: style('[data-region-id="groups"] .rain-navigation-family__row') };
    });
    expect(facts.activity).not.toEqual(facts.group);
    await record('E2-hierarchy-facts', facts);
    await screenshot(page, `E2-${width}x796`);
  });

  test(`C04-F03 E3 single complementary dimension, public number field and keyed drafts at ${width}`, async ({ page }) => {
    const root = await open(page, 'E3', width);
    const scorePane = root.getByRole('complementary', { name: '评分区', exact: true });
    await expect(scorePane).toBeVisible();
    await root.getByRole('button', { name: '显示批改队列', exact: true }).click();
    const queue = region(root, 'grading-queue');
    await queue.getByRole('button', { name: '陈安', exact: true }).click();
    const answer = root.getByTestId('grading-identity');
    await expect(answer.getByRole('tablist', { name: '当前学生选择', exact: true })).toHaveCount(0);
    // Review02 acceptance supersedes the old 36px ObjectNavigator shortcuts:
    // w6/review-02/README.md and final-source.json bind the real browser Tabs/panel.
    const shortcuts = answer.locator('.w6-grade-shortcuts');
    await expect(shortcuts).toHaveAttribute('data-rain-id', 'ui-tabs');
    await expect(shortcuts).toHaveAttribute('data-visual-preset', 'navigation-browser');
    await expect(shortcuts).toHaveAttribute('data-density', 'default');
    await expect(shortcuts).toHaveAttribute('data-size', '38');
    const questionTabs = answer.getByRole('tablist', { name: '当前题目选择', exact: true });
    await expect(questionTabs.getByRole('tab')).toHaveCount(3);
    const tabHeights = await questionTabs.getByRole('tab').evaluateAll(elements => elements.map(element => getComputedStyle(element).getPropertyValue('--tabs-height').trim()));
    expect(tabHeights).toEqual(['38px', '38px', '38px']);
    // E3 leaves size unset: default density resolves the existing 38px Tabs recipe.
    // Browser geometry keeps its own 44px minimum
    // in packages/ui/src/navigation/navigation.css, independently of that token size.
    const tabGeometry = await questionTabs.getByRole('tab').evaluateAll(elements => elements.map(element => ({ minimum: getComputedStyle(element).minHeight, height: element.getBoundingClientRect().height })));
    expect(tabGeometry.map(tab => tab.minimum)).toEqual(['44px', '44px', '44px']);
    for (const tab of tabGeometry) expect(tab.height).toBeGreaterThanOrEqual(44);
    await answer.getByRole('tablist', { name: '当前题目选择', exact: true }).getByRole('tab', { name: '第2题', exact: true }).click();
    const selectedQuestion = questionTabs.getByRole('tab', { name: '第2题', exact: true });
    await expect(selectedQuestion).toHaveAttribute('aria-selected', 'true');
    const panel = answer.getByRole('tabpanel', { name: '第2题', exact: true });
    await expect(panel).toBeVisible();
    expect(await selectedQuestion.getAttribute('aria-controls')).toBe(await panel.getAttribute('id'));
    const score = root.getByRole('spinbutton', { name: '本题分数', exact: true });
    await expect(score.locator('xpath=ancestor::*[@data-rain-id="ui-input-number"]')).toHaveCount(1);
    await expect(score).toHaveAttribute('aria-valuemin', '0');
    await expect(score).toHaveAttribute('aria-valuemax', '20');
    const draft = root.getByRole('textbox', { name: '评分评语', exact: true });
    await score.fill('17');
    await score.press('Tab');
    await draft.fill('第2题陈安：请补充依据');
    await queue.getByText('按题', { exact: true }).click();
    await expect(root.getByRole('radio', { name: '按题', exact: true })).toBeChecked();
    await expect(answer.getByRole('tablist', { name: '当前题目选择', exact: true })).toHaveCount(0);
    await expect(answer.getByRole('tablist', { name: '当前学生选择', exact: true })).toBeVisible();
    await queue.getByText('卡片队列', { exact: true }).click();
    await expect(root.getByRole('radio', { name: '卡片队列', exact: true })).toBeChecked();
    await expect(answer).toHaveAttribute('data-student-id', 'chen-an');
    await expect(answer).toHaveAttribute('data-question-id', 'q2');
    await expect(score).toHaveValue('17');
    await expect(draft).toHaveValue('第2题陈安：请补充依据');
    await root.getByRole('button', { name: '隐藏批改队列', exact: true }).click();
    await root.getByRole('button', { name: '进入专注', exact: true }).click();
    await expect(scorePane).toBeVisible();
    await expect(root.getByText('尚未保存到本地', { exact: true })).toBeVisible();
    await root.getByRole('button', { name: '退出专注', exact: true }).click();
    await root.getByRole('button', { name: '保存本地草稿', exact: true }).click();
    await expect(root.getByText('已保存到本地状态', { exact: true })).toBeVisible();
    await answer.getByRole('tablist', { name: '当前学生选择', exact: true }).getByRole('tab', { name: '林宁', exact: true }).click();
    await expect(score).toHaveValue('');
    await expect(draft).toHaveValue('');
    await answer.getByRole('tablist', { name: '当前学生选择', exact: true }).getByRole('tab', { name: '陈安', exact: true }).click();
    await expect(score).toHaveValue('17');
    await expect(draft).toHaveValue('第2题陈安：请补充依据');
    await screenshot(page, `E3-${width}x796`);
  });

  test(`F04 E4 structured chapter and transcript, playback and nonmodal knowledge at ${width}`, async ({ page }) => {
    const root = await open(page, 'E4', width);
    const main = root.locator('.w6-replay-main');
    await expect(root.getByRole('group', { name: '课堂讲稿定位', exact: true })).toBeVisible();
    await expect(root.getByRole('heading', { name: /课堂讲稿|章节与讲稿/ })).toBeVisible();
    await expect(root.getByRole('heading', { name: '章节目录', exact: true })).toBeVisible();
    await expect(root.getByRole('heading', { name: '我的回放笔记', exact: true })).toBeVisible();
    await expect(root.getByRole('slider', { name: '回放进度', exact: true })).toHaveAttribute('aria-valuetext', '00:00 / 05:00');
    const chapters = await root.locator('.w6-replay-chapters').boundingBox();
    const transcript = await root.locator('.w6-replay-transcript').boundingBox();
    const hierarchy = await root.locator('.w6-replay-transcript').evaluate(element => ({
      excerpt: getComputedStyle(element.querySelector('blockquote')!).fontSize,
      detail: getComputedStyle(element.querySelector('.w6-replay-transcript-detail')!).fontSize,
      excerptWeight: getComputedStyle(element.querySelector('blockquote')!).fontWeight,
      detailWeight: getComputedStyle(element.querySelector('.w6-replay-transcript-detail')!).fontWeight,
    }));
    expect(transcript!.x).toBeGreaterThan(chapters!.x + chapters!.width + 16);
    expect(hierarchy.excerpt).not.toBe(hierarchy.detail);
    expect(hierarchy.excerptWeight).not.toBe(hierarchy.detailWeight);
    await expect(root.getByRole('button', { name: '讲稿 00:00', exact: true })).toBeInViewport();
    await expect(root.locator('.w6-replay-transcript blockquote')).toBeInViewport();
    await record('E4-information-hierarchy', { chapters, transcript, hierarchy });
    await screenshot(page, `E4-initial-${width}x796`);
    await root.getByRole('textbox', { name: '回放笔记', exact: true }).fill('控制变量需要核对测量高度');
    await root.getByRole('button', { name: '讲稿 02:10', exact: true }).click();
    await expect(root.getByTestId('playback-time')).toHaveText('02:10');
    const before = await main.boundingBox();
    await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click();
    await expect(region(root, 'knowledge-index')).toHaveAttribute('data-temporary', 'true');
    await compareGeometry(main, before);
    await expect(root.getByTestId('playback-time')).toHaveText('02:10');
    await expect(root.getByRole('textbox', { name: '回放笔记', exact: true })).toHaveValue('控制变量需要核对测量高度');
    await page.keyboard.press('Escape');
    await expect(root.getByRole('button', { name: '临时查看知识索引', exact: true })).toBeFocused();
    await expect(region(root, 'knowledge-index')).toBeHidden();
    await root.getByRole('button', { name: '进入专注', exact: true }).click();
    await root.getByRole('button', { name: '退出专注', exact: true }).click();
    await compareGeometry(main, before);
    await expect(root.getByTestId('playback-time')).toHaveText('02:10');
    await expect(root.getByRole('textbox', { name: '回放笔记', exact: true })).toHaveValue('控制变量需要核对测量高度');
    await root.getByRole('button', { name: '播放回放', exact: true }).click();
    await expect(root.getByRole('button', { name: '暂停回放', exact: true })).toBeVisible();
    await expect.poll(async () => root.getByTestId('playback-time').textContent(), { timeout: 3500 }).not.toBe('02:10');
    await root.getByRole('button', { name: '暂停回放', exact: true }).click();
    const paused = await root.getByTestId('playback-time').textContent();
    await page.waitForTimeout(1200);
    await expect(root.getByTestId('playback-time')).toHaveText(paused!);
    const slider = root.getByRole('slider', { name: '回放进度', exact: true });
    await slider.click();
    await slider.press('Home');
    await slider.press('ArrowRight');
    await expect(root.getByTestId('playback-time')).toHaveText('00:01');
    await expect(root.getByRole('textbox', { name: '回放笔记', exact: true })).toHaveValue('控制变量需要核对测量高度');
    await record('E4-preserved-geometry', before);
    await screenshot(page, `E4-${width}x796`);
  });

  test(`F02 E5 existing instance isolation survives A-only local patch at ${width}`, async ({ page }) => {
    const root = await open(page, 'E5', width);
    const b = root.getByRole('region', { name: '实例 B', exact: true });
    await b.getByRole('button', { name: '实验方法', exact: true }).click();
    await b.getByRole('textbox', { name: '实例 B 草稿', exact: true }).fill('B 的独立说明与尺寸保持');
    const facts = () => b.evaluate(element => ({
      html: element.innerHTML,
      rect: { width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height },
      rows: [...element.querySelectorAll('.rain-navigation-family__row')].map(row => ({ height: getComputedStyle(row).height, padding: getComputedStyle(row).padding, font: getComputedStyle(row).fontSize })),
    }));
    const before = await facts();
    await root.getByRole('button', { name: '仅当前实例 A 使用紧凑目录', exact: true }).click();
    await expect(root.getByRole('region', { name: '实例 A', exact: true })).toHaveAttribute('data-directory-density', 'compact');
    expect(await facts()).toEqual(before);
    await expect(b.getByRole('textbox', { name: '实例 B 草稿', exact: true })).toHaveValue('B 的独立说明与尺寸保持');
    await screenshot(page, `E5-${width}x796`);
  });

  test(`C01-C02-F01 E6 small semantic Tags and left/right edge recovery at ${width}`, async ({ page }) => {
    const root = await open(page, 'E6', width);
    const work = root.locator('[data-ai-task="E6"]');
    const queue = work.getByRole('group', { name: '待评审学术资源', exact: true });
    const first = queue.getByRole('button', { name: firstResource, exact: true });
    const type = first.locator('[data-rain-id="ui-tag"]').filter({ hasText: '研究工作论文' });
    const status = first.locator('[data-rain-id="ui-tag"]').filter({ hasText: '待评审' });
    await expect(type).toHaveAttribute('data-size', '20');
    await expect(type).toHaveAttribute('data-color', 'neutral');
    await expect(status).toHaveAttribute('data-size', '20');
    await expect(status).toHaveAttribute('data-color', 'gold');
    const typeBox = await type.boundingBox();
    const statusBox = await status.boundingBox();
    expect(Math.abs(typeBox!.y - statusBox!.y)).toBeLessThanOrEqual(1);
    expect(typeBox!.height).toBe(20);
    expect(statusBox!.height).toBe(20);
    const details = first.locator('.w6-review-resource-details');
    expect((await details.boundingBox())!.y).toBeGreaterThan(typeBox!.y);
    const separators = await details.locator('span + span').evaluateAll(elements => elements.map(element => ({ width: getComputedStyle(element, '::before').width, content: getComputedStyle(element, '::before').content, border: getComputedStyle(element, '::before').borderInlineStartWidth })));
    expect(separators.length).toBeGreaterThanOrEqual(2);
    expect(separators.every(separator => parseFloat(separator.width) > 0 || parseFloat(separator.border) > 0 || /\|/.test(separator.content))).toBe(true);
    const draft = work.getByRole('textbox', { name: '审核意见', exact: true });
    await draft.fill('第一份资料的未保存意见');
    await work.getByRole('button', { name: '隐藏资源队列', exact: true }).click();
    await work.getByRole('button', { name: '隐藏评审面板', exact: true }).click();
    const left = work.getByRole('button', { name: '展开资源队列', exact: true });
    const right = work.getByRole('button', { name: '展开评审面板', exact: true });
    await expect(left).toBeVisible();
    await expect(right).toBeVisible();
    const workBody = work.locator('.rain-workspace__flow');
    const bodyBox = await workBody.boundingBox();
    const leftBox = await left.boundingBox();
    const rightBox = await right.boundingBox();
    expect(leftBox!.width).toBe(32);
    expect(leftBox!.height).toBe(32);
    expect(rightBox!.width).toBe(32);
    expect(rightBox!.height).toBe(32);
    expect(leftBox!.x - bodyBox!.x).toBeLessThanOrEqual(12);
    expect(bodyBox!.x + bodyBox!.width - rightBox!.x - rightBox!.width).toBeLessThanOrEqual(12);
    const barIdentity = await work.locator('.w6-review-preview-bar > span').boundingBox();
    const nextButton = await work.getByRole('button', { name: '下一份', exact: true }).boundingBox();
    expect(barIdentity!.x).toBeGreaterThanOrEqual(leftBox!.x + leftBox!.width);
    expect(nextButton!.x + nextButton!.width).toBeLessThanOrEqual(rightBox!.x);
    await record('E6-edge-controls-do-not-cover-preview-bar', { leftBox, rightBox, barIdentity, nextButton });
    await screenshot(page, `E6-edges-${width}x796`);
    const preview = work.getByRole('main', { name: '当前资源预览', exact: true });
    const hiddenWidth = (await preview.boundingBox())!.width;
    await left.click();
    await expect(region(work, 'queue')).toHaveAttribute('data-mode', 'expanded');
    await expect(region(work, 'queue')).toHaveAttribute('data-temporary', 'false');
    expect((await preview.boundingBox())!.width).toBeLessThan(hiddenWidth - 200);
    await right.click();
    await expect(region(work, 'comments')).toHaveAttribute('data-mode', 'expanded');
    await expect(region(work, 'comments')).toHaveAttribute('data-temporary', 'false');
    await expect(draft).toHaveValue('第一份资料的未保存意见');
    await expect(work.getByRole('status', { name: '本地保存状态' })).toHaveText('未保存');
    await work.getByRole('button', { name: '保存本地评审', exact: true }).click();
    await expect(work.getByRole('status', { name: '本地保存状态' })).toHaveText('本页已保存');
    const savedTag = first.locator('[data-rain-id="ui-tag"]').filter({ hasText: '本页已评审' });
    await expect(savedTag).toHaveAttribute('data-color', 'olive');
    expect(Math.abs((await type.boundingBox())!.y - (await savedTag.boundingBox())!.y)).toBeLessThanOrEqual(1);
    await queue.getByRole('button', { name: secondResource, exact: true }).click();
    await expect(draft).toHaveValue('');
    await expect(work.getByRole('main', { name: '当前资源预览' })).toHaveAttribute('data-resource-id', 'resource-climate-057');
    await expect(work.getByRole('region', { name: '当前资源评审' })).toHaveAttribute('data-resource-id', 'resource-climate-057');
    await first.click();
    await expect(draft).toHaveValue('第一份资料的未保存意见');
    await screenshot(page, `E6-${width}x796`);
  });

  test(`C03 E6 own-scroll sticky review heading at ${width}`, async ({ page }) => {
    const root = await open(page, 'E6', width);
    const comments = region(root, 'comments');
    const header = comments.locator('.w6-review-comments > .w6-review-pane-head');
    const before = await header.boundingBox();
    await comments.hover({ position: { x: 100, y: 250 } });
    await page.mouse.wheel(0, 1000);
    await expect.poll(() => comments.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
    const after = await header.boundingBox();
    expect(Math.abs(after!.y - before!.y)).toBeLessThanOrEqual(1);
    const facts = await header.evaluate(element => ({ position: getComputedStyle(element).position, top: getComputedStyle(element).top, background: getComputedStyle(element).backgroundColor, y: element.getBoundingClientRect().y }));
    expect(facts.position).toBe('sticky');
    expect(facts.top).toBe('0px');
    await expect(comments.getByRole('heading', { name: '评审面板', exact: true })).toBeVisible();
    await record('E6-sticky-geometry', { before, after, facts });
    await screenshot(page, `E6-sticky-${width}x796`);
  });
}

test('F01 E6 edge keyboard recovery and Escape owner at 996x796', async ({ page }) => {
  const root = await open(page, 'E6', 996);
  const work = root.locator('[data-ai-task="E6"]');
  const main = work.getByRole('main', { name: '当前资源预览', exact: true });
  const queue = region(work, 'queue');
  const comments = region(work, 'comments');
  // The existing adaptation contract hides lower-priority comments first.
  await expect(queue).toHaveAttribute('data-mode', 'expanded');
  await expect(comments).toHaveAttribute('data-mode', 'hidden');
  await expect(comments).toHaveAttribute('data-forced', 'true');
  const edge = work.getByRole('button', { name: '展开评审面板', exact: true });
  const before = await main.boundingBox();
  await tabTo(page, edge);
  await expect(edge).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(comments).toHaveAttribute('data-temporary', 'true');
  await compareGeometry(main, before);
  await expect(work.getByRole('button', { name: '展开评审面板', exact: true })).toHaveCount(0);
  await expect(work.getByRole('button', { name: '关闭临时评审面板', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(comments).toHaveAttribute('data-temporary', 'false');
  await expect(edge).toBeFocused();
  await edge.click();
  await expect(comments).toHaveAttribute('data-temporary', 'true');
  await compareGeometry(main, before);
  await screenshot(page, 'E6-temporary-996x796');
  await page.keyboard.press('Escape');
  await work.getByRole('button', { name: '隐藏资源队列', exact: true }).click();
  await expect(comments).toHaveAttribute('data-mode', 'expanded');
  const left = work.getByRole('button', { name: '展开资源队列', exact: true });
  await tabTo(page, left);
  await page.keyboard.press('Space');
  await expect(queue).toHaveAttribute('data-mode', 'expanded');
  await expect(queue).toHaveAttribute('data-temporary', 'false');
  await expect(comments).toHaveAttribute('data-mode', 'hidden');
  await screenshot(page, 'E6-recovered-996x796');
});

test('F03 E3 scoring panel and dedicated number input stay available at 996x796', async ({ page }) => {
  const root = await open(page, 'E3', 996);
  const score = root.getByRole('spinbutton', { name: '本题分数', exact: true });
  await expect(score).toBeVisible();
  await score.fill('18');
  await score.press('ArrowUp');
  await expect(score).toHaveValue('19');
  await score.press('ArrowDown');
  await expect(score).toHaveValue('18');
  await root.getByRole('textbox', { name: '评分评语', exact: true }).fill('窄屏意见保持');
  await root.getByRole('button', { name: '进入专注', exact: true }).click();
  await expect(root.getByRole('complementary', { name: '评分区', exact: true })).toBeVisible();
  await expect(score).toHaveValue('18');
  await expect(root.getByText('尚未保存到本地', { exact: true })).toBeVisible();
  await root.getByRole('button', { name: '退出专注', exact: true }).click();
  await expect(root.getByRole('textbox', { name: '评分评语', exact: true })).toHaveValue('窄屏意见保持');
  await screenshot(page, 'E3-996x796');
});
