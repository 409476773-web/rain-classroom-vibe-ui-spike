import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const captures = "evidence/runtime/toast-action-position-2026-10-08/browser";
mkdirSync(captures, { recursive: true });

for (const settings of [
  { name: "light-desktop", width: 1440, height: 1000, dark: false },
  { name: "dark-narrow", width: 390, height: 844, dark: true },
]) {
  test(`toast is top-centered with a subdued text action: ${settings.name}`, async ({ page }) => {
    await page.setViewportSize(settings);
    await page.goto("/#toast");
    if (settings.dark) await page.getByRole("button", { name: "深色", exact: true }).click();
    if (settings.dark) await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
    await page.getByRole("button", { name: "成功提示", exact: true }).click();
    const toast = page.locator('[data-rain-id="ui-toast"]').filter({ hasText: "设置已保存" });
    await expect.poll(async () => (await toast.boundingBox())?.y).toBeCloseTo(24, 0);
    const box = (await toast.boundingBox())!;
    expect(box.x + box.width / 2).toBeCloseTo(settings.width / 2, 0);
    expect(box.x).toBeGreaterThanOrEqual(16);
    expect(box.x + box.width).toBeLessThanOrEqual(settings.width - 16);
    const action = page.getByRole("button", { name: "撤回", exact: true });
    await expect(action).toHaveAttribute("data-variant", "text");
    await expect(action).toHaveCSS("border-top-width", "0px");
    const paints = await toast.evaluate(el => {
      const action = el.querySelector('.rain-g2-toast-action')!, close = el.querySelector('.rain-g2-toast-close')!;
      const a = getComputedStyle(action), c = getComputedStyle(close);
      return { actionColor: a.color, closeColor: c.color, actionOpacity: a.opacity, closeOpacity: c.opacity, labelColor: getComputedStyle(action.querySelector('[data-slot="label"]')!).color };
    });
    expect(paints.actionColor).toBe(paints.closeColor);
    expect(paints.labelColor).toBe(paints.actionColor);
    expect(paints.actionOpacity).toBe(paints.closeOpacity);
    expect(Number(paints.actionOpacity)).toBeLessThan(1);
    await page.keyboard.press("F6");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(action).toBeFocused();
    await expect(action).toHaveCSS("outline-style", "solid");
    await page.screenshot({ path: `${captures}/${settings.name}.png` });
    await action.press("Enter");
    await expect(page.getByRole("status").filter({ hasText: "已撤回当前示例设置" })).toBeVisible();
  });
}

test("top queue expands downward, pauses on focus and closes only the selected toast", async ({ page }) => {
  await page.goto("/#toast");
  await page.getByRole("button", { name: "连续添加 4 条", exact: true }).click();
  const front = page.locator('[data-rain-id="ui-toast"]').filter({ hasText: "队列通知 4" });
  await front.hover();
  const expanded = page.locator('[data-rain-id="ui-toast"][data-expanded]:not([data-limited])');
  await expect(expanded).toHaveCount(3);
  await expect.poll(async () => {
    const boxes = await expanded.evaluateAll(els => els.map(el => ({ top: el.getBoundingClientRect().top, bottom: el.getBoundingClientRect().bottom })).sort((a, b) => a.top - b.top));
    return Math.abs((boxes[0]?.top ?? 0) - 24) < 1 && boxes.every((box, index) => !index || box.top >= boxes[index - 1]!.bottom + 11);
  }).toBe(true);
  await page.mouse.move(1, 1);
  await page.keyboard.press("F6");
  await expect.poll(() => page.locator('.rain-g2-toast-viewport').evaluate(el => el.contains(document.activeElement))).toBe(true);
  await page.waitForTimeout(4200);
  await expect(page.getByText("队列通知 4", { exact: true })).toBeVisible();
  await page.screenshot({ path: `${captures}/expanded-queue.png` });
  await front.getByRole("button", { name: "关闭通知", exact: true }).click();
  await expect(page.getByText("队列通知 4", { exact: true })).not.toBeVisible();
  await expect(page.getByText("队列通知 3", { exact: true })).toBeVisible();
});
