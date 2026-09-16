import { expect, test } from "@playwright/test";

import { contrastRatio } from "./color-contrast";

const expectedBenchmarks = [
  "Compact Data Management",
  "Default Large Form",
  "Complex Workbench",
  "Report / Key Data",
] as const;

test("the Playground shell exposes a flat, inspectable overview", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Rain Next Playground", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Foundations/i }),
  ).toHaveAttribute("href", "#foundations");
  await expect(page.getByRole("link", { name: /Components/i })).toHaveAttribute(
    "href",
    "#components",
  );
  await expect(page.getByRole("link", { name: /^Benchmarks/i })).toHaveAttribute(
    "href",
    "#benchmarks",
  );

  for (const title of expectedBenchmarks) {
    const benchmarkTitle = page.getByText(title);
    await expect(benchmarkTitle).toBeVisible();
    await expect(benchmarkTitle.locator("xpath=ancestor::a")).toHaveCount(0);
    await expect(benchmarkTitle.locator("xpath=ancestor::article")).toHaveAttribute(
      "data-state",
      "completed",
    );
  }

  await expect(page.getByText("尚未实现")).toHaveCount(0);
  await expect(page.getByLabel("当前阶段")).toContainText(
    "第 0/1 批 · 基础能力建设 · 视觉验收待确认",
  );
  await expect(page.getByLabel("当前阶段")).toContainText("token-foundations-v1");
  await expect(page.getByLabel("历史基线")).toContainText("Day 3 Core UI 已完成本地实现和自动检查");
  await expect(page.locator("nav, aside")).toHaveCount(0);

  const foundationsEntry = page.getByRole("link", { name: /Foundations/i });
  const componentsEntry = page.getByRole("link", { name: /^Components/i });
  await page.keyboard.press("Tab");
  await expect(foundationsEntry).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(componentsEntry).toBeFocused();

  const focusStyles = await componentsEntry.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      outlineColor: styles.outlineColor,
      outlineOffset: Number.parseFloat(styles.outlineOffset),
      outlineWidth: Number.parseFloat(styles.outlineWidth),
      boxShadow: styles.boxShadow,
    };
  });
  expect(focusStyles).toEqual({
    outlineColor: "rgb(61, 123, 255)",
    outlineOffset: 0,
    outlineWidth: 1,
    boxShadow: "rgba(61, 123, 255, 0.2) 0px 0px 0px 3px",
  });
  const pageSurface = await page.locator("html").evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  expect(
    contrastRatio(focusStyles.outlineColor, pageSurface),
  ).toBeGreaterThanOrEqual(3);

  const introTextStyles = await page.locator(".intro-copy").evaluate((element) => {
    const styles = getComputedStyle(element);
    const parentStyles = getComputedStyle(element.parentElement as HTMLElement);
    return {
      backgroundColor: parentStyles.backgroundColor,
      color: styles.color,
    };
  });
  expect(
    contrastRatio(introTextStyles.color, introTextStyles.backgroundColor),
  ).toBeGreaterThanOrEqual(4.5);

  const statusTextStyles = await page
    .locator(".benchmark-status")
    .first()
    .evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      };
    });
  expect(
    contrastRatio(statusTextStyles.color, statusTextStyles.backgroundColor),
  ).toBeGreaterThanOrEqual(4.5);

  await componentsEntry.hover();
  await expect(componentsEntry).toHaveCSS("transform", "none");
});
