import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const evidence = 'evidence/runtime/navigation-v042/w6/review-02/e2';
const url = 'http://127.0.0.1:5204/navigation-v042-w6-consumer.html#E2';
const browser = await chromium.launch({ headless: true });
const errors = [], measurements = [], allMembers = [];
let page;
try {
  for (const [width, height] of [[1343, 747], [1200, 747], [1600, 747], [996, 747], [1200, 420]]) {
    // A fresh document per geometry; mounted business selection is intentionally persistent.
    page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.getByRole('heading', { name: '第一研究组 · 证据分析讨论' }).waitFor();
    await page.mouse.move(0, 0);
    const geometry = await page.locator('.w6-interaction-workspace').evaluate(element => {
      const title = element.querySelector('h1'), summary = element.querySelector('.w6-interaction-summary');
      const activities = element.querySelector('.w6-activity-pane'), main = element.querySelector('.w6-interaction-main');
      const field = element.querySelector('[data-rain-id="ui-textarea"]');
      return {
        titleFont: getComputedStyle(title).fontSize, titleLine: getComputedStyle(title).lineHeight,
        summaryHeight: summary.getBoundingClientRect().height,
        groupRows: [...element.querySelectorAll('.w6-group-pane .rain-navigation-family__row')].map(row => row.getBoundingClientRect().height),
        fieldAppearance: field.dataset.appearance, fieldBackground: getComputedStyle(field).backgroundColor,
        activitiesOverflow: getComputedStyle(activities).overflowY,
        activitiesScrollHeight: activities.scrollHeight, activitiesClientHeight: activities.clientHeight,
        mainOverflow: getComputedStyle(main).overflowY,
        documentHorizontalOverflow: document.documentElement.scrollWidth > innerWidth,
        activityLabels: [...element.querySelectorAll('.w6-activity-pane .rain-navigation-family__label')].map(label => ({ label: label.textContent, clipped: label.scrollWidth > label.clientWidth + 1 })),
      };
    });
    assert.equal(geometry.titleFont, '16px'); assert.equal(geometry.titleLine, '22px');
    assert.equal(geometry.fieldAppearance, 'filled'); assert.equal(geometry.documentHorizontalOverflow, false);
    assert(geometry.activityLabels.every(label => !label.clipped));
    await page.screenshot({ path: `${evidence}/submission-${width}x${height}.png` });
    await page.getByRole('tab', { name: '小组成员' }).click();
    if (width === 1343) {
      for (const [groupName, count] of [['第一研究组', 4], ['第二研究组', 5], ['第三研究组', 6]]) {
        await page.getByRole('button', { name: groupName, exact: true }).click();
        await page.waitForFunction(() => [...document.querySelectorAll('.w6-member-list img[data-slot="portrait"]')].every(image => image.complete && image.naturalWidth === 240 && image.dataset.ready === 'true'));
        const members = await page.locator('.w6-member-list').evaluate(element => [...element.children].map(row => ({ id: row.dataset.memberId, studentNumber: row.dataset.studentNumber, name: row.querySelector('strong').textContent, role: row.querySelector('[data-member-role]').textContent, portrait: row.querySelector('img[data-slot="portrait"]').getAttribute('src') })));
        assert.equal(members.length, count);
        allMembers.push(...members.map(member => ({ groupName, ...member })));
      }
      assert.equal(new Set(allMembers.map(member => member.id)).size, 15);
      assert.equal(new Set(allMembers.map(member => member.studentNumber)).size, 15);
    }
    await page.getByRole('button', { name: '第三研究组', exact: true }).click();
    await page.mouse.move(0, 0);
    await page.waitForFunction(() => [...document.querySelectorAll('.w6-member-list img[data-slot="portrait"]')].every(image => image.complete && image.naturalWidth > 0 && image.dataset.ready === 'true'));
    const roster = await page.locator('.w6-member-list').evaluate(element => [...element.children].map(row => ({
      id: row.dataset.memberId, studentNumber: row.dataset.studentNumber, name: row.querySelector('strong').textContent,
      role: row.querySelector('[data-member-role]').textContent,
      portrait: row.querySelector('img[data-slot="portrait"]').getAttribute('src'),
      ready: row.querySelector('img[data-slot="portrait"]').dataset.ready,
      naturalWidth: row.querySelector('img[data-slot="portrait"]').naturalWidth,
    })));
    assert.equal(roster.length, 6); assert.equal(new Set(roster.map(member => member.studentNumber)).size, 6);
    await page.screenshot({ path: `${evidence}/members-${width}x${height}.png` });
    measurements.push({ width, height, ...geometry, roster });
  }
  const feedback = page.getByRole('textbox', { name: '课堂反馈草稿' });
  await feedback.fill('第三组讨论反馈');
  await page.getByRole('button', { name: '方案投票', exact: true }).click();
  await page.getByRole('button', { name: '第三研究组', exact: true }).click();
  assert.equal(await feedback.inputValue(), '');
  const voteRoster = await page.locator('.w6-member-list').evaluate(element => [...element.children].map(row => ({
    id: row.dataset.memberId, studentNumber: row.dataset.studentNumber, name: row.querySelector('strong').textContent,
    role: row.querySelector('[data-member-role]').textContent, portrait: row.querySelector('img[data-slot="portrait"]').getAttribute('src'),
  })));
  assert.deepEqual(voteRoster, measurements.at(-1).roster.map(({ ready, naturalWidth, ...member }) => member));
  await feedback.fill('第三组投票反馈');
  await page.getByRole('button', { name: '证据分析讨论', exact: true }).click();
  await page.getByRole('button', { name: '第三研究组', exact: true }).click();
  assert.equal(await feedback.inputValue(), '第三组讨论反馈');
  await page.setViewportSize({ width: 996, height: 747 });
  await feedback.scrollIntoViewIfNeeded();
  assert.equal(await feedback.inputValue(), '第三组讨论反馈');
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `${evidence}/members-996-scrolled-feedback.png` });
  await page.setViewportSize({ width: 1200, height: 420 });
  const reflection = page.getByRole('button', { name: '课后反思', exact: true });
  await reflection.scrollIntoViewIfNeeded(); await reflection.click();
  assert.equal(await page.getByTestId('interaction-identity').getAttribute('data-activity-id'), 'reflection');
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `${evidence}/short-activity-scrolled.png` });
  assert.equal(errors.length, 0);
  await fs.writeFile(`${evidence}/runtime-self-check.json`, JSON.stringify({
    capturedAt: new Date().toISOString(), browser: 'chromium headless', url, measurements, allMembers,
    checks: { title16x22: true, filledField: true, noHorizontalOverflow: true, activityLabelsNotClipped: true,
      all15LocalPortraitsDecoded: true, sixLocalPortraitsDecoded: true, memberIdentityStableThroughActivity: true, feedbackPerActivityGroup: true,
      narrowFeedbackReachableByScroll: true, shortAfterClassActivityReachableByScroll: true },
    pageErrors: errors, humanAcceptance: 'pending',
  }, null, 2) + '\n');
  console.log(JSON.stringify({ screenshots: 10, widths: measurements.map(measurement => `${measurement.width}x${measurement.height}`), title: '16/22', summaryHeights: measurements.map(measurement => measurement.summaryHeight), pageErrors: errors }));
} finally {
  await browser.close();
}
