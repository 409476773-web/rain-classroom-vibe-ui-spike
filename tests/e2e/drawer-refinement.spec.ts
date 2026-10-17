import { test, expect, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
const evidence = "evidence/runtime/drawer-refinement-2026-10-14/browser";
mkdirSync(evidence, { recursive: true });
async function settle(page: Page) {
  await page.locator('[data-slot="drawer-popup"]').evaluate(async node => {
    await Promise.all([node, node.querySelector('[data-slot="drawer-content"]')!].flatMap(el => el.getAnimations()).map(animation => animation.finished.catch(() => {})));
  });
}
async function openTask(page: Page) {
  await page.goto("/#drawer");
  await page.getByRole("button", { name: "编辑课前任务", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "编辑课前任务", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog).not.toHaveAttribute("data-starting-style", "");
  await settle(page);
  return dialog;
}
test.beforeEach(({ page }) => page.on("pageerror", error => { throw error; }));

test("aligned surface, fixed actions and single-layer preview preserve the draft", async ({ page }, info) => {
  const dialog = await openTask(page);
  await dialog.getByRole("textbox", { name: "任务标题", exact: true }).fill("同层预览的课堂任务");
  await dialog.getByRole("radio", { name: "小组讨论", exact: true }).press("Space");
  const before = await dialog.locator('[data-slot="drawer-header"]').boundingBox();
  const footer = await dialog.locator('[data-slot="drawer-footer"]').boundingBox();
  expect(before!.y).toBeGreaterThanOrEqual(0);
  expect(footer!.y + footer!.height).toBeLessThanOrEqual(page.viewportSize()!.height + 1);
  const box = await dialog.boundingBox();
  expect(box!.width).toBeCloseTo(Math.min(680, page.viewportSize()!.width), 0);
  expect(box!.x).toBeCloseTo((page.viewportSize()!.width - box!.width) / 2, 0);
  await page.screenshot({ path: `${evidence}/edit-${info.project.name}.png` });
  await dialog.getByRole("button", { name: "预览任务", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(1);
  await expect(page.getByRole("dialog")).toHaveAccessibleName("同层预览的课堂任务");
  await expect(page.locator('[data-slot="drawer-overlay"]')).toHaveCSS("opacity", "1");
  await expect(page.getByRole("dialog").getByText("课前准备 · 小组讨论", { exact: true })).toBeVisible();
  await page.screenshot({ path: `${evidence}/preview-${info.project.name}.png` });
  await page.getByRole("button", { name: "返回编辑", exact: true }).click();
  await expect(page.getByRole("button", { name: "预览任务", exact: true })).toBeFocused();
  await expect(page.getByRole("textbox", { name: "任务标题", exact: true })).toHaveValue("同层预览的课堂任务");
  await expect(page.getByRole("radio", { name: "小组讨论", exact: true })).toBeChecked();
  writeFileSync(`${evidence}/geometry-${info.project.name}.json`, JSON.stringify({ before, footer, box, viewport: page.viewportSize() }, null, 2));
});

test("long titles and short-preview body cannot scroll the fixed heading away", async ({ page }) => {
  await openTask(page);
  await page.getByRole("textbox", { name: "任务标题", exact: true }).fill("通过比较不同的课程材料来提出一个具有明确证据支持的问题".repeat(5));
  await page.getByRole("textbox", { name: "任务要求", exact: true }).fill("这是需要完整阅读并逐步完成的任务要求。".repeat(80));
  await page.getByRole("button", { name: "预览任务", exact: true }).click();
  await settle(page);
  const header = await page.locator('.g6-task-header').boundingBox();
  expect(header!.y).toBeGreaterThanOrEqual(-1);
  await expect(page.getByRole("button", { name: "返回编辑", exact: true })).toBeInViewport();
  await expect(page.getByRole("button", { name: "关闭预览", exact: true })).toBeInViewport();
});

test("all close requests protect dirty input and restore safe focus", async ({ page }, info) => {
  const dialog = await openTask(page);
  await dialog.getByRole("textbox", { name: "任务标题", exact: true }).fill("不要直接丢弃");
  for (const action of ["cancel", "header", "escape", "outside"]) {
    if (action === "cancel") await dialog.getByRole("button", { name: "取消", exact: true }).click();
    if (action === "header") await dialog.getByRole("button", { name: "关闭编辑", exact: true }).click();
    if (action === "escape") await page.keyboard.press("Escape");
    if (action === "outside") await page.mouse.click(8, 8);
    const guard = page.getByRole("alertdialog", { name: "放弃未保存的修改？", exact: true });
    await expect(guard).toBeVisible();
    await expect(guard.getByRole("button", { name: "继续编辑", exact: true })).toBeFocused();
    await page.screenshot({ path: `${evidence}/discard-${info.project.name}.png` });
    await guard.getByRole("button", { name: "继续编辑", exact: true }).click();
    await expect(guard).toHaveCount(0);
    await expect(dialog.getByRole("textbox", { name: "任务标题", exact: true })).toHaveValue("不要直接丢弃");
  }
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "放弃修改", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "编辑课前任务", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "编辑课前任务", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "任务标题", exact: true })).toHaveValue("找一个值得追问的问题");
});

test("field validation and failed-save retry keep the submitted draft", async ({ page }, info) => {
  await page.goto("/#drawer");
  await page.getByRole("radio", { name: "首次保存失败", exact: true }).press("Space");
  await page.getByRole("button", { name: "编辑课前任务", exact: true }).click();
  const field = page.getByRole("textbox", { name: "任务标题", exact: true });
  await field.fill(""); await page.getByRole("button", { name: "保存草稿", exact: true }).click();
  await expect(field).toHaveAttribute("aria-invalid", "true"); await expect(field).toBeFocused();
  await field.fill("保留失败后的任务");
  await page.getByRole("button", { name: "保存草稿", exact: true }).click();
  await expect(field).toBeDisabled(); await page.keyboard.press("Escape");
  await expect(page.getByRole("alertdialog")).toHaveCount(0);
  await expect(page.getByRole("alert")).toContainText("保存失败");
  await expect(field).toHaveValue("保留失败后的任务");
  await page.screenshot({ path: `${evidence}/failure-${info.project.name}.png` });
  await field.fill("重试后的任务"); await page.getByRole("button", { name: "重试保存", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByTestId("drawer-saved-title")).toHaveText("重试后的任务");
});

test("long reading scrolls while the heading and return control stay visible", async ({ page }, info) => {
  await page.goto("/#drawer"); await page.getByRole("radio", { name: "长内容", exact: true }).press("Space");
  await page.getByRole("button", { name: "编辑课前任务", exact: true }).click();
  await page.getByRole("button", { name: "预览任务", exact: true }).click();
  const body = page.locator('.g6-task-body');
  const header = page.locator('.g6-task-header');
  await settle(page);
  const top = (await header.boundingBox())!.y;
  await body.hover(); await page.mouse.wheel(0, 1000);
  await expect.poll(() => body.evaluate(node => node.scrollTop)).toBeGreaterThan(0);
  expect((await header.boundingBox())!.y).toBeCloseTo(top, 0);
  await expect(page.getByText("课程导读.pdf", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "返回编辑", exact: true })).toBeVisible();
  await page.screenshot({ path: `${evidence}/long-scrolled-${info.project.name}.png` });
});

test("top and bottom snap regions align with and without handles", async ({ page }) => {
  await page.goto("/drawer-refinement-consumer.html");
  for (const label of ["顶部带把手", "顶部无把手", "底部带把手", "底部无把手"]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await settle(page);
    const dialog = page.getByRole("dialog", { name: label, exact: true });
    for (let index = 0; index < 2; index++) {
      const header = await dialog.locator('[data-slot="drawer-header"]').boundingBox();
      const footer = await dialog.locator('[data-slot="drawer-footer"]').boundingBox();
      expect(header!.y).toBeGreaterThanOrEqual(-1);
      expect(footer!.y + footer!.height).toBeLessThanOrEqual(page.viewportSize()!.height + 2);
      await dialog.getByRole("button", { name: "切换吸附位置", exact: true }).click();
      const samples = await dialog.evaluate(async node => {
        const rows = [];
        for (let frame = 0; frame < 24; frame++) {
          await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
          rows.push(node.querySelector('[data-slot="drawer-footer"]')!.getBoundingClientRect().bottom);
        }
        return rows;
      });
      expect(Math.max(...samples)).toBeLessThanOrEqual(page.viewportSize()!.height + 2);
      await settle(page);
    }
    await page.getByRole("button", { name: "关闭测试抽屉", exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
});

test("four directions and non-modal pointer interaction still operate", async ({ page }) => {
  await page.goto("/#drawer");
  for (const side of ["底部", "顶部", "左侧", "右侧"]) {
    await page.getByRole("button", { name: `从${side}打开`, exact: true }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog").locator('[data-slot="drawer-header"]').getByRole("button", { name: `关闭${side}抽屉`, exact: true })).toHaveAttribute("data-rain-id", "ui-icon-button");
    await expect(page.getByRole("dialog").locator('[data-slot="drawer-footer"]')).toHaveCount(0);
    await page.getByRole("button", { name: `关闭${side}抽屉`, exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
  await page.getByRole("button", { name: "打开非模态记录", exact: true }).click();
  await page.getByRole("button", { name: "记录一次观察", exact: true }).click();
  await expect(page.getByTestId("drawer-observation-count")).toContainText("1次");
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("reading example closes from the header while its carousel stays interactive", async ({ page }, info) => {
  await page.goto("/#carousel");
  await page.getByRole("button", { name: "在抽屉中阅读资料", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "课堂资料阅读", exact: true });
  const close = dialog.locator('[data-slot="drawer-header"]').getByRole("button", { name: "关闭资料阅读", exact: true });
  await expect(close).toHaveAttribute("data-rain-id", "ui-icon-button");
  await expect(dialog.locator('[data-slot="drawer-footer"]')).toHaveCount(0);
  await dialog.getByRole("button", { name: "抽屉内下一份资料", exact: true }).click();
  await expect(dialog.getByTestId("drawer-carousel-position")).toContainText("第2份 / 共3份");
  await settle(page);
  await page.screenshot({ path: `${evidence}/reading-header-close-${info.project.name}.png` });
  await close.click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("320px-high failure actions remain reachable and continuous text wraps", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 320 });
  await page.goto("/#drawer"); await page.getByRole("radio", { name: "首次保存失败", exact: true }).press("Space");
  await page.getByRole("button", { name: "编辑课前任务", exact: true }).click();
  await page.getByRole("textbox", { name: "任务标题", exact: true }).fill("短屏失败");
  await page.getByRole("button", { name: "保存草稿", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("保存失败");
  const footer = await page.locator('.g6-task-footer').boundingBox();
  expect(footer!.y + footer!.height).toBeLessThanOrEqual(321);
  await page.getByRole("button", { name: "预览任务", exact: true }).click();
  await page.getByRole("button", { name: "返回编辑", exact: true }).click();
  await page.getByRole("textbox", { name: "任务要求", exact: true }).fill("https://example.com/" + "longcontinuouscontent".repeat(25));
  await page.getByRole("button", { name: "预览任务", exact: true }).click();
  const widths = await page.locator('.g6-task-body').evaluate(el => ({ client: el.clientWidth, scroll: el.scrollWidth }));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client + 1);
});
