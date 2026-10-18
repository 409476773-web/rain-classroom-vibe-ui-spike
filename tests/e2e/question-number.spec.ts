import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test, type Locator } from "@playwright/test";

async function tokenColor(control: Locator, token: string) {
  return control.evaluate((element, name) => {
    if (!getComputedStyle(element).getPropertyValue(name).trim()) throw new Error(`Missing public token ${name}`);
    const probe = document.createElement("span");
    probe.style.color = `var(${name})`;
    element.append(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  }, token);
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto("/#question-number");
  await expect(page.getByRole("heading", { name: "题号按钮，定位与结果各自清楚", level: 1 })).toBeVisible();
});

test("32 px bodies and bottom library markers preserve the reference geometry", async ({ page }) => {
  for (const shape of ["square", "circle"]) {
    const matrix = page.getByTestId(`question-number-${shape}-matrix`);
    const buttons = matrix.locator('[data-rain-id="ui-question-number"]');
    await expect(buttons).toHaveCount(7);
    for (const button of await buttons.all()) {
      const body = button.locator('[data-slot="control"]');
      await expect(button).toHaveCSS("width", "44px");
      await expect(button).toHaveCSS("height", "44px");
      await expect(body).toHaveCSS("width", "32px");
      await expect(body).toHaveCSS("height", "32px");
      await expect(body).toHaveCSS("font-size", "15px");
      await expect(body).toHaveCSS("line-height", "22px");
      const box = await body.boundingBox();
      if (!box) throw new Error("Missing body geometry");
      const radius = await body.evaluate((node) => getComputedStyle(node).borderRadius);
      expect(shape === "square" ? radius === "6px" : parseFloat(radius) >= 16 || radius.includes("infinity")).toBe(true);
      const badge = button.locator('[data-slot="feedback"]');
      if (await badge.count()) {
        await expect(badge).toHaveCSS("width", "12px");
        await expect(badge).toHaveCSS("height", "12px");
        const marker = await badge.boundingBox();
        expect(marker?.x).toBeCloseTo(box.x + 10);
        expect(marker?.y).toBeCloseTo(box.y + 26);
        const ring = ["pending", "reviewed"].includes((await button.getAttribute("data-feedback"))!);
        await expect(badge.locator(".rain-icon")).toHaveCSS("width", ring ? "12px" : "8px");
        await expect(badge.locator(".rain-icon")).toHaveCSS("mask-image", /(?:\.svg|image\/svg\+xml)/);
        await expect(badge.locator(".rain-icon")).toHaveCSS("animation-name", "none");
      }
    }
  }
  const label = page.getByTestId("question-number-multi-digit").locator('[data-slot="label"]');
  await expect(label).toHaveText("108");
  const labelBox = await label.boundingBox();
  expect(labelBox?.width).toBeLessThanOrEqual(30);
});

for (const theme of ["light", "dark"]) {
  test(`${theme}: feedback uses public weak borders and same-family text; current remains border-free`, async ({ page }) => {
    await page.getByRole("group", { name: "预览主题" }).getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    const matrix = page.getByTestId("question-number-square-matrix");
    await matrix.locator('[data-rain-id="ui-question-number"][data-feedback="none"]').click();
    await page.mouse.move(0, 0);
    for (const [feedback, tone, border] of [
      ["answered", "brand", "3"], ["correct", "green", "2"], ["wrong", "red", "2"],
      ["unanswered", "orange", "2"], ["pending", "brand", "3"], ["reviewed", "brand", "3"],
    ]) {
      const button = matrix.locator(`[data-rain-id="ui-question-number"][data-feedback="${feedback}"]`);
      const body = button.locator('[data-slot="control"]');
      await expect(body).toHaveCSS("border-top-width", "1px");
      await expect(body).toHaveCSS("border-top-color", await tokenColor(body, `--rain-category-border-${tone}-${border}`));
      await expect(body).toHaveCSS("color", await tokenColor(body, `--rain-category-text-${tone}-2`));
      await expect(button.locator('[data-slot="label"]')).toHaveCSS("font-weight", "600");
    }
    const wrong = matrix.locator('[data-rain-id="ui-question-number"][data-feedback="wrong"]');
    await wrong.click();
    await page.mouse.move(0, 0);
    await expect(wrong).toHaveAttribute("aria-current", "step");
    await expect(wrong.locator('[data-slot="control"]')).toHaveCSS("border-top-width", "0px");
    await expect(wrong.locator('[data-slot="control"]')).toHaveCSS("background-color", await tokenColor(wrong, "--rain-category-fill-brand-solid-2"));
    await expect(wrong.locator('[data-slot="label"]')).toHaveCSS("font-weight", "700");
    await expect(wrong.locator('[data-icon="icon/close-bold"]')).toBeVisible();
    await expect(wrong).toHaveCSS("outline-style", "none");
    await page.screenshot({ path: evidenceOutputPath(`evidence/runtime/question-number/${theme}.png`), fullPage: true });
  });
}

test("native keyboard navigation changes the host current item without clearing the result", async ({ page }) => {
  const matrix = page.getByTestId("question-number-square-matrix");
  const pending = matrix.locator('[data-rain-id="ui-question-number"][data-feedback="pending"]');
  await pending.focus();
  await pending.press("Enter");
  await expect(pending).toHaveAttribute("aria-current", "step");
  await expect(pending).toBeFocused();
  await expect(pending).toHaveCSS("outline-style", "solid");
  await pending.press("Space");
  await expect(pending).toHaveAttribute("aria-current", "step");
  await expect(pending.locator('[data-icon="icon/grading-pending"]')).toBeVisible();
  await expect(matrix.locator('[aria-current="step"]')).toHaveCount(1);
  const disabled = page.getByTestId("question-number-disabled");
  await expect(disabled).toBeDisabled();
  await disabled.evaluate((node) => (node as HTMLButtonElement).focus());
  await expect(disabled).not.toBeFocused();
});

test("hover follows the supplied feedback family while disabled remains unchanged", async ({ page }) => {
  const matrix = page.getByTestId("question-number-square-matrix");
  for (const [feedback, family, shade] of [
    ["none", "neutral", "4"], ["answered", "brand", "3"], ["correct", "green", "1"],
    ["unanswered", "orange", "1"], ["pending", "brand", "3"], ["reviewed", "brand", "3"],
  ]) {
    const button = matrix.locator(`[data-rain-id="ui-question-number"][data-feedback="${feedback}"]`);
    await button.hover();
    await expect(button.locator('[data-slot="control"]')).toHaveCSS("background-color", await tokenColor(button, `--rain-category-fill-${family}-alpha-${shade}`));
  }
  const disabled = page.getByTestId("question-number-disabled");
  const before = await disabled.locator('[data-slot="control"]').evaluate((node) => getComputedStyle(node).backgroundColor);
  await disabled.hover({ force: true });
  await expect(disabled.locator('[data-slot="control"]')).toHaveCSS("background-color", before);
});

test("compact viewport keeps child markers and forced-color state cues visible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  const child = page.getByTestId("question-number-circle-matrix").locator('[data-rain-id="ui-question-number"][data-feedback="correct"]');
  await child.click();
  await expect(child).toHaveAttribute("aria-current", "step");
  await expect(child.locator('[data-slot="feedback"]')).toBeVisible();
  await page.screenshot({ path: evidenceOutputPath("evidence/runtime/question-number/compact.png"), fullPage: true });
  await page.emulateMedia({ forcedColors: "active" });
  await page.keyboard.press("Tab");
  await child.focus();
  await expect(child).toHaveCSS("outline-style", "solid");
  await expect(child.locator('[data-slot="control"]')).toHaveCSS("border-top-width", "0px");
  for (const part of ["control", "feedback"]) await expect(child.locator(`[data-slot="${part}"]`)).toHaveCSS("forced-color-adjust", "none");
  await expect(child.locator('[data-slot="feedback"] .rain-icon')).toHaveAttribute("data-icon", "icon/check-bold");
  await expect(child.locator('[data-slot="feedback"] .rain-icon')).toHaveCSS("mask-image", /(?:\.svg|image\/svg\+xml)/);
});
