import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const captures = evidenceOutputPath("evidence/runtime/g2-g3-remaining-families-2026-10-08/browser");
mkdirSync(captures, { recursive: true });

test("navigation opens below its trigger without resizing the toolbar and retains current destination", async ({ page }) => {
  await page.goto("/#navigation-menu");
  const root = page.locator('[data-rain-id="ui-navigation-menu"][data-slot="root"]');
  const trigger = page.getByRole("button", { name: "教学空间", exact: true });
  const height = (await root.boundingBox())!.height;
  await trigger.click();
  const content = page.locator(".rain-navigation-menu-content");
  await expect(content).toBeVisible();
  expect((await root.boundingBox())!.height).toBe(height);
  const triggerBox = (await trigger.boundingBox())!, contentBox = (await content.boundingBox())!;
  expect(contentBox.width).toBeGreaterThanOrEqual(192);
  expect(contentBox.y).toBeGreaterThanOrEqual(triggerBox.y + triggerBox.height);
  expect(contentBox.x).toBeLessThanOrEqual(triggerBox.x + 1);
  const current = page.getByRole("link", { name: "课程总览", exact: true });
  await expect(current).toHaveCSS("color", "rgb(15, 85, 223)");
  await page.screenshot({ path: `${captures}/navigation-menu-open.png` });
  await page.getByRole("link", { name: "课程资料", exact: true }).click();
  await expect(page.getByRole("region", { name: "目的地内容" })).toContainText("课程资料");
});

test("context menus have readable disabled states, restrained separators and bounded rows", async ({ page }) => {
  await page.goto("/#context-menu");
  await page.getByLabel("第一讲资料，可打开上下文菜单", { exact: true }).press("Shift+F10");
  const popup = page.locator('[data-rain-id="ui-context-menu"][data-slot="popup"]');
  await expect(popup).toBeVisible();
  expect((await popup.boundingBox())!.width).toBeGreaterThanOrEqual(160);
  const disabled = page.getByRole("menuitem", { name: /删除/ });
  await expect(disabled).toHaveCSS("color", "rgb(160, 172, 197)");
  await expect(disabled).toHaveCSS("font-size", "14px");
  await page.screenshot({ path: `${captures}/context-menu-open.png` });
  await page.getByRole("menuitem", { name: "标记为重点", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: "资料已标记" })).toBeVisible();
});

test("menubar uses neutral open feedback and muted disabled commands", async ({ page }) => {
  await page.goto("/#menubar");
  const trigger = page.getByRole("menuitem", { name: "文件", exact: true });
  await trigger.click();
  await expect(page.getByRole("menuitem", { name: "发布到真实课程", exact: true })).toHaveCSS("color", "rgb(160, 172, 197)");
  const surface = await trigger.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(surface).not.toBe("rgba(61, 123, 255, 0.65)");
  const separator = page.getByRole("separator");
  await expect(separator).toHaveCSS("border-top-color", "rgba(16, 63, 183, 0.16)");
  await page.screenshot({ path: `${captures}/menubar-open.png` });
  await page.getByRole("menuitem", { name: "新建资料", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: "新建数量 1" })).toBeVisible();
});

test("hover card has a real content width limit and a usable linked object", async ({ page }) => {
  await page.goto("/#hover-card");
  const link = page.getByRole("link", { name: "林老师", exact: true });
  await link.focus();
  const popup = page.locator('[data-rain-id="ui-hover-card"][data-slot="popup"]');
  await expect(popup).toBeVisible();
  await expect(popup).toHaveCSS("max-width", "320px");
  expect((await popup.boundingBox())!.width).toBeLessThanOrEqual(320);
  await page.screenshot({ path: `${captures}/hover-card-open.png` });
  await link.click();
  await expect(page.getByRole("heading", { name: "林老师", exact: true })).toBeVisible();
});

test("skeletons remain visible on their surface and stop motion for reduced-motion", async ({ page }) => {
  await page.goto("/#skeleton");
  const skeleton = page.locator('[data-rain-id="ui-skeleton"]').first();
  const background = await skeleton.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(background).not.toBe("rgba(0, 0, 0, 0)");
  await page.screenshot({ path: `${captures}/skeleton-light.png` });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(skeleton).toHaveCSS("animation-name", "none");
  const rowHeight = (await page.locator(".skeleton-doc-record").boundingBox())!.height;
  const rowWidth = (await page.locator(".skeleton-doc-record").boundingBox())!.width;
  const listHeight = (await page.locator(".skeleton-doc-list").boundingBox())!.height;
  await page.getByRole("button", { name: "显示课程内容", exact: true }).click();
  await expect(page.getByText("教学设计导论", { exact: true })).toBeVisible();
  expect((await page.locator(".skeleton-doc-record").boundingBox())!.height).toBe(rowHeight);
  expect((await page.locator(".skeleton-doc-record").boundingBox())!.width).toBe(rowWidth);
  expect((await page.locator(".skeleton-doc-list").boundingBox())!.height).toBe(listHeight);
});

test("toast follows the selected documentation theme and keeps its undo action", async ({ page }) => {
  await page.goto("/#toast");
  await page.getByRole("button", { name: "深色", exact: true }).click();
  await page.getByRole("button", { name: "成功提示", exact: true }).click();
  await expect(page.locator('[data-slot="toast-portal"]')).toHaveAttribute("data-rain-theme", "dark");
  await page.screenshot({ path: `${captures}/toast-dark.png` });
  await page.getByRole("button", { name: "撤回", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: "已撤回当前示例设置" })).toBeVisible();
});

test("dark compact popups remain inside a narrow viewport and inherit their trigger theme", async ({ page }) => {
  await page.setViewportSize({ width:390, height:844 });
  for (const id of ["context-menu", "menubar", "hover-card", "navigation-menu"]) {
    await page.goto(`/#${id}`);
    await page.getByRole("button", { name:"深色", exact:true }).click();
    await page.getByRole("button", { name:"紧凑密度", exact:true }).click();
    if (id === "context-menu") await page.getByLabel("第一讲资料，可打开上下文菜单", { exact:true }).press("Shift+F10");
    if (id === "menubar") await page.getByRole("menuitem", { name:"文件", exact:true }).click();
    if (id === "hover-card") {
      await page.getByRole("button", { name:"紧凑密度", exact:true }).press("Tab");
      await expect(page.getByRole("link", { name:"林老师", exact:true })).toBeFocused();
    }
    if (id === "navigation-menu") await page.getByRole("button", { name:"教学空间", exact:true }).click();
    const popup = id === "navigation-menu" ? page.locator(".rain-navigation-menu-content") : id === "menubar" ? page.locator(".rain-g3-menu-popup") : page.locator(`[data-rain-id="ui-${id}"][data-slot="popup"]`);
    await expect(popup).toBeVisible();
    const box = (await popup.boundingBox())!;
    expect(box.x, id).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width, id).toBeLessThanOrEqual(391);
    expect(await popup.evaluate(el => el.closest('[data-rain-theme]')?.getAttribute("data-rain-theme")), id).toBe("dark");
    if (id === "context-menu" || id === "menubar") {
      await expect(popup.locator('[data-slot="item"]').first()).toHaveCSS("min-height", "30px");
      await expect(popup.locator('[data-disabled]')).toHaveCSS("color", "rgb(111, 122, 158)");
    }
    await page.screenshot({ path:`${captures}/${id}-dark-compact-narrow.png` });
  }
});

test("resource scrolling and the displayed keyboard shortcut perform their real actions", async ({ page }) => {
  await page.goto("/#scroll-area");
  const viewport = page.getByLabel("课程资源滚动区", { exact:true });
  await viewport.focus();
  await page.keyboard.press("PageDown");
  await expect.poll(() => viewport.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  await page.getByRole("button", { name:"切换横向溢出", exact:true }).click();
  expect(await viewport.evaluate(el => el.scrollWidth - el.clientWidth)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);
  await page.screenshot({ path:`${captures}/scroll-area-wide.png` });
  await page.goto("/#kbd");
  await page.getByLabel("快捷键演示区", { exact:true }).press("Alt+k");
  await expect(page.getByRole("textbox", { name:"资料搜索", exact:true })).toBeFocused();
  await expect(page.getByRole("status").filter({ hasText:"已触发快捷键 1 次" })).toBeVisible();
});

test("sheet supports all four sides with a scrollable body and a visible footer", async ({ page }) => {
  await page.goto("/#sheet");
  await page.getByRole("button", { name:"深色", exact:true }).click();
  for (const side of ["左侧", "右侧", "顶部", "底部"]) {
    await page.getByRole("button", { name:side, exact:true }).click();
    const trigger = page.getByRole("button", { name:"打开资料详情", exact:true });
    await trigger.click();
    const body = page.locator(".g3-doc-sheet-body"), footer = page.locator(".g3-doc-sheet-footer");
    await expect(page.getByRole("dialog", { name:"课程资料详情", exact:true })).toBeVisible();
    expect(await body.evaluate(el => el.scrollHeight)).toBeGreaterThan(await body.evaluate(el => el.clientHeight));
    const box = (await footer.boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.y + box.height).toBeLessThanOrEqual(1000);
    await page.screenshot({ path:`${captures}/sheet-${side}-dark.png` });
    await page.getByRole("button", { name:"关闭资料详情", exact:true }).click();
    await expect(trigger).toBeFocused();
  }
});

test("all remaining pages fit narrow screens and sheet retains draft and focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ["button-group", "toggle", "spinner", "skeleton", "toast", "breadcrumb", "scroll-area", "sheet", "kbd", "context-menu", "hover-card", "menubar", "navigation-menu"]) {
    await page.goto(`/#${id}`);
    await expect(page.locator(`#${id}-title`)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth), id).toBeLessThanOrEqual(391);
  }
  await page.goto("/#sheet");
  const trigger = page.getByRole("button", { name: "打开资料详情", exact: true });
  await trigger.click();
  await page.getByRole("textbox", { name: "资料备注", exact: true }).fill("保留这一份备注");
  await page.screenshot({ path: `${captures}/sheet-narrow.png` });
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(page.getByRole("textbox", { name: "资料备注", exact: true })).toHaveValue("保留这一份备注");
});
