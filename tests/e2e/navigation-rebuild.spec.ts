import { chooseSelect } from './navigation-rebuild-select';
import { expect, test, type Page } from "@playwright/test";

const entries = [
  "考试管理", "课程建设", "资源中心", "教学工作台",
  "学习数据与教学质量分析", "团队协作", "消息中心", "设置",
];
const viewports = [
  { width: 1200, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 1200, height: 650 },
];

async function openCandidate(page: Page, recipe = "S01") {
  await page.goto(`/#token-first-g3?rebuild=1&scene=platform&recipe=${recipe}&view=page&page=exams`);
  await expect(page.locator('[data-rain-id="navigation-rebuild"]')).toBeVisible();
  return page.getByRole("navigation", { name: "全局导航", exact: true });
}

test("T01/T02: current follows navigation and survives refresh and browser history", async ({ page }) => {
  const nav = await openCandidate(page);
  const exams = nav.getByRole("link", { name: "考试管理", exact: true });
  const resources = nav.getByRole("link", { name: "资源中心", exact: true });
  await expect(exams).toHaveAttribute("aria-current", "page");
  await resources.click();
  await expect(page).toHaveURL(/page=resources(?:&|$)/);
  await expect(resources).toHaveAttribute("aria-current", "page");
  await expect(exams).not.toHaveAttribute("aria-current", "page");
  await page.reload();
  await expect(resources).toHaveAttribute("aria-current", "page");
  await page.goBack();
  await expect(exams).toHaveAttribute("aria-current", "page");
  await page.goForward();
  await expect(resources).toHaveAttribute("aria-current", "page");
});

test("T01/T02: S01 and S02 share destinations, current and independent parent disclosure", async ({ page }) => {
  const nav = await openCandidate(page);
  const linksBefore = await nav.getByRole("link").evaluateAll(links =>
    links.map(link => ({ name: link.getAttribute("aria-label") || link.textContent?.trim(), href: link.getAttribute("href") })),
  );
  await chooseSelect(page,'导航表面','浅色');
  await expect(nav.getByRole("link", { name: "考试管理", exact: true })).toHaveAttribute("aria-current", "page");
  expect(await nav.getByRole("link").evaluateAll(links =>
    links.map(link => ({ name: link.getAttribute("aria-label") || link.textContent?.trim(), href: link.getAttribute("href") })),
  )).toEqual(linksBefore);

  const routeBefore = page.url();
  const disclosure = nav.getByRole("button", { name: /^(展开|收起)课程建设$/ });
  const expandedBefore = await disclosure.getAttribute("aria-expanded");
  await disclosure.click();
  await expect(disclosure).toHaveAttribute("aria-expanded", expandedBefore === "true" ? "false" : "true");
  expect(page.url()).toBe(routeBefore);
  await nav.getByRole("link", { name: "课程建设", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/page=courses(?:&|$)/);
  await expect(nav.getByRole("link", { name: "课程建设", exact: true })).toHaveAttribute("aria-current", "page");
});

test("T02: S04 keeps all destinations named and restores hidden navigation", async ({ page }) => {
  const nav = await openCandidate(page);
  const expandedWidth = (await nav.boundingBox())!.width;
  const routeBefore = page.url();
  await page.getByRole("button", { name: "收起全局导航", exact: true }).click();
  for (const name of entries) await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
  await expect.poll(async () => (await nav.boundingBox())!.width).toBeLessThan(expandedWidth);
  expect(page.url()).toBe(routeBefore);
  await expect(nav.getByRole("link", { name: "考试管理", exact: true })).toHaveAttribute("aria-current", "page");
  await page.getByRole("button", { name: "隐藏全局导航", exact: true }).click();
  await expect(nav).toBeHidden();
  const restore = page.getByRole("button", { name: "恢复全局导航", exact: true });
  await expect(restore).toBeInViewport();
  await restore.focus();
  await page.keyboard.press("Enter");
  await expect(nav).toBeVisible();
  expect(page.url()).toBe(routeBefore);
  await expect(nav.getByRole("link", { name: "考试管理", exact: true })).toHaveAttribute("aria-current", "page");
});

for (const recipe of ["S01", "S02", "S04"]) {
  for (const viewport of viewports) {
    test(`T02: ${recipe} fits ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
      await page.setViewportSize(viewport);
      const nav = await openCandidate(page, recipe);
      for (const name of entries) await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
      await expect(nav.getByRole("link", { name: "考试管理", exact: true })).toHaveAttribute("aria-current", "page");
      const measurement = await page.evaluate(() => {
        const navElement = document.querySelector('nav[aria-label="全局导航"]')!;
        const rect = navElement.getBoundingClientRect();
        return {
          viewport: { width: innerWidth, height: innerHeight },
          documentWidth: document.documentElement.scrollWidth,
          navigation: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, right: rect.right, bottom: rect.bottom },
          scrollOwners: [...navElement.querySelectorAll("*")].filter(element => {
            const style = getComputedStyle(element);
            return /auto|scroll/.test(style.overflowY) && element.scrollHeight > element.clientHeight;
          }).map(element => ({ slot: element.getAttribute("data-slot"), height: element.clientHeight, scrollHeight: element.scrollHeight })),
        };
      });
      await testInfo.attach("layout-measurement", { body: JSON.stringify(measurement, null, 2), contentType: "application/json" });
      expect(measurement.documentWidth).toBeLessThanOrEqual(viewport.width + 1);
      expect(measurement.navigation.x).toBeGreaterThanOrEqual(0);
      expect(measurement.navigation.right).toBeLessThanOrEqual(viewport.width + 1);
      expect(measurement.navigation.bottom).toBeLessThanOrEqual(viewport.height + 1);
      await page.screenshot({ path: testInfo.outputPath(`${recipe}-${viewport.width}x${viewport.height}.png`) });
    });
  }
}
