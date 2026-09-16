import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const evidence = "evidence/runtime/avatar";
test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/#avatar");
  await expect(page.getByRole("heading", { name: "头像与成员", exact: true })).toBeVisible();
  await expect.poll(() => page.locator('[data-asset-id] img').evaluateAll(images =>
    images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth === 240))).toBe(true);
  mkdirSync(evidence, { recursive: true });
});

test("Avatar geometry, 51 assets, image failure and keyboard More", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await expect(page.locator("[data-asset-id]")).toHaveCount(51);
  const sizes = await page.locator(".avatar-review-matrix .rain-avatar").evaluateAll(nodes => nodes.map(node => ({
    size: node.getAttribute("data-size"), width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height,
  })));
  for (const entry of sizes) { expect(entry.width).toBe(Number(entry.size)); expect(entry.height).toBe(Number(entry.size)); }
  await expect(page.locator('img[src="data:image/png;base64,invalid"]')).toHaveAttribute("data-ready", "false");
  await expect(page.locator('img[src="data:image/png;base64,invalid"]')).toBeHidden();
  const grids = await page.locator('[data-rain-id="ui-avatar-grid"]').evaluateAll(nodes => nodes.map(node => ({
    width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height,
    count: Number(node.getAttribute("data-count")), portraits: node.querySelectorAll('[data-rain-id="ui-avatar"]').length,
  })));
  for (const grid of grids) { expect(grid.width).toBe(40); expect(grid.height).toBe(40); expect(grid.portraits).toBe(grid.count); }
  await expect(page.getByText("暂无", { exact: true })).toBeVisible();
  const group = page.locator('.rain-avatar-group[data-size="40"]').first();
  await expect(group.locator(".rain-avatar")).toHaveCount(8);
  const more = group.getByRole("button", { name: "查看其余4位成员" });
  await more.focus(); await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "40px 课程成员 · 其余 4 位" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("吴桐")).toBeVisible(); await expect(dialog.getByText("方可")).toBeVisible();
  await page.screenshot({ path: `${evidence}/more-open.png` });
  await page.keyboard.press("Escape"); await expect(dialog).toBeHidden(); await expect(more).toBeFocused();
  await expect(page.locator("button button, a button")).toHaveCount(0);
  await page.screenshot({ path: `${evidence}/light.png`, fullPage: true });
  writeFileSync(`${evidence}/geometry.json`, JSON.stringify({ sizes, grids, pageErrors: errors }, null, 2));
  expect(errors).toEqual([]);
});

test("Avatar status priority restores state, reduced motion and native offline action", async ({ page }) => {
  const live = page.getByTestId("live-avatar"), edge = live.locator(".rain-status-indicator-group");
  await expect(edge).toBeHidden();
  await expect(live.getByRole("img", { name: "赵宁正在发言" })).toBeVisible();
  await page.getByRole("button", { name: "结束发言", exact: true }).click();
  await expect(edge).toBeVisible();
  await expect(live.getByRole("img", { name: "手机加入" })).toBeVisible();
  await expect(live.getByRole("img", { name: "摄像头关闭" })).toBeVisible();
  await page.getByRole("button", { name: "开始发言", exact: true }).click();
  await expect(edge).toBeHidden();
  await page.emulateMedia({ reducedMotion: "reduce" });
  const animations = await page.locator(".rain-activity-overlay").evaluateAll(nodes => nodes.map(node => ({
    icon: getComputedStyle(node.querySelector('[data-rain-id="icon"]')!).animationName,
    ring: getComputedStyle(node, "::after").animationName,
  })));
  expect(animations.every(entry => entry.icon === "none" && entry.ring === "none")).toBe(true);
  const offline = page.getByRole("button", { name: "查看周明（离线）" });
  await offline.focus(); await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "周明", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.locator(".avatar-review-section").nth(3).screenshot({ path: `${evidence}/status.png` });
  writeFileSync(`${evidence}/motion.json`, JSON.stringify(animations, null, 2));
});

test("Avatar dark compact, narrow layout, forced colors and accessible focus", async ({ page }) => {
  for (const name of ["深色主题", "紧凑密度"]) {
    await page.getByRole("checkbox", { name, exact: true }).focus();
    await page.keyboard.press("Space");
    await expect(page.getByRole("checkbox", { name, exact: true })).toBeChecked();
  }
  await expect(page.getByRole("img", { name: "正在连接", exact: true })).toHaveCSS("background-color", "rgba(5, 9, 26, 0.7)");
  await page.screenshot({ path: `${evidence}/dark-compact.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `${evidence}/narrow.png`, fullPage: true });
  await page.emulateMedia({ forcedColors: "active" });
  const action = page.getByRole("button", { name: "查看周明（离线）" });
  await action.focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
  await expect(action).toBeFocused();
  const focus = await action.evaluate(node => ({
    outline: getComputedStyle(node).outlineStyle, width: getComputedStyle(node).outlineWidth,
  }));
  expect(focus.outline).toBe("solid"); expect(focus.width).toBe("2px");
  await page.screenshot({ path: `${evidence}/forced-colors.png` });
});

test("Avatar gallery copies stable source references", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "复制 teacher-01 引用", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("已复制 teacher-01 的引用");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('avatarAssets["teacher-01"]');
});

test("Classic status geometry and solid icon surfaces", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const status = page.getByRole("img", { name: "neutral 示例状态", exact: true });
  const visual = await status.evaluate(node => ({
    fill: getComputedStyle(node).backgroundColor, ink: getComputedStyle(node).color,
    outline: getComputedStyle(node).outlineStyle,
    icon: node.querySelector('[data-rain-id="icon"]')!.getBoundingClientRect().width,
  }));
  expect(visual).toEqual({ fill: "rgb(134, 153, 185)", ink: "rgb(255, 255, 255)", outline: "none", icon: 16 });
  const activity = page.getByRole("img", { name: "正在连接", exact: true });
  await expect(activity).toHaveCSS("background-color", "rgba(34, 48, 81, 0.15)");
  const ring = await activity.evaluate(node => ({
    inset: getComputedStyle(node, "::after").top, width: getComputedStyle(node, "::after").borderTopWidth,
    blur: getComputedStyle(node).backdropFilter,
    icon: node.querySelector('[data-rain-id="icon"]')!.getBoundingClientRect().width,
  }));
  expect(ring).toEqual({ inset: "-4px", width: "2px", blur: "blur(2px)", icon: 14 });
});

test("Member and group details are anchored nonmodal popovers with top-right icon close", async ({ page }) => {
  for (const [name, title] of [["查看周明（离线）", "周明"], ["查看资料", "林雨"], ["查看全部课程成员", "全部课程成员"], ["查看第三组", "第三组"]]) {
    const trigger = page.getByRole("button", { name, exact: true });
    await trigger.click();
    const popup = page.getByRole("dialog", { name: title, exact: true });
    await expect(popup).toHaveAttribute("data-rain-id", "ui-popover");
    await expect(page.locator('[data-slot="backdrop"]')).toHaveCount(0);
    await expect(page.locator('main')).not.toHaveAttribute("inert");
    const close = popup.getByRole("button", { name: "关闭", exact: true });
    await expect(close).toHaveAttribute("data-rain-id", "ui-icon-button");
    const bounds = await popup.boundingBox(), button = await close.boundingBox();
    expect(button!.x).toBeGreaterThan(bounds!.x + bounds!.width / 2);
    expect(button!.y - bounds!.y).toBeLessThan(20);
    if (title === "林雨") await popup.screenshot({ path: `${evidence}/member-details.png` });
    await close.click();
    await expect(popup).toBeHidden(); await expect(trigger).toBeFocused();
  }
  const group = page.locator(".rain-avatar-group").filter({ has: page.getByRole("button", { name: "查看全部课程成员", exact: true }) });
  const more = group.getByRole("button", { name: "查看其余4位成员", exact: true });
  await more.click();
  const popup = page.getByRole("dialog", { name: "查看全部课程成员 · 其余 4 位", exact: true });
  await expect(page.getByRole("dialog", { name: "全部课程成员", exact: true })).toHaveCount(0);
  await expect(popup.getByRole("button", { name: "关闭", exact: true })).toHaveAttribute("data-rain-id", "ui-icon-button");
  await page.keyboard.press("Escape"); await expect(more).toBeFocused();
});


test("Grid retains Classic 1px gutters and uses filled device/status icons", async ({ page }) => {
  const grid = page.locator('.rain-avatar-grid[data-count="4"]').first();
  const geometry = await grid.evaluate(node => {
    const root = node.getBoundingClientRect(), cells = [...node.querySelectorAll('.rain-avatar')].map(cell => cell.getBoundingClientRect());
    return { outer: cells[0]!.x - root.x, horizontal: cells[1]!.x - cells[0]!.right, vertical: cells[2]!.y - cells[0]!.bottom };
  });
  expect(geometry).toEqual({ outer: 1, horizontal: 1, vertical: 1 });
  const corners = await page.locator('.rain-avatar-grid').evaluateAll(nodes => nodes.map(node => {
    const content = node.querySelector('.rain-avatar-grid__content');
    return { count: Number(node.getAttribute('data-count')), outer: getComputedStyle(node).borderRadius,
      inner: content && getComputedStyle(content).borderRadius, clip: content && getComputedStyle(content).overflow,
      cells: [...node.querySelectorAll('.rain-avatar__picture')].map(cell => getComputedStyle(cell).borderRadius) };
  }));
  for (const corner of corners) {
    expect(corner.outer).toBe('5px'); expect(corner.inner).toBe('4px'); expect(corner.clip).toBe('hidden');
    expect(corner.cells.every(radius => radius === `${corner.count === 1 ? 4 : corner.count <= 4 ? 2 : 1}px`)).toBe(true);
  }
  await page.locator('.avatar-review-section').nth(2).screenshot({ path: `${evidence}/grid-corners.png` });
  writeFileSync(`${evidence}/grid-corners.json`, JSON.stringify({ geometry, corners }, null, 2));
  for (const id of ["computer-filled", "mobile-filled", "volume-filled"]) await expect(page.locator(`[data-icon="icon/${id}"]`).first()).toBeAttached();
  for (const id of ["computer", "phone", "volume"]) await expect(page.locator(`[data-icon="icon/${id}"]`)).toHaveCount(0);
});


test("Classic interaction frames preserve full-size portraits and front-to-back group stacking", async ({ page }) => {
  const avatar = page.getByRole('button', { name: '查看周明（离线）', exact: true });
  const picture = avatar.locator('.rain-avatar__picture');
  const image = picture.locator('[data-slot="portrait"]');
  const size = (await avatar.boundingBox())!.width;
  expect((await image.boundingBox())!.width).toBe(size);
  await expect(picture.locator('[data-slot="fallback"]')).toBeHidden();
  await expect(page.locator('img[src="data:image/png;base64,invalid"]').locator("..").locator('[data-slot="fallback"]')).toBeVisible();
  await avatar.hover();
  expect((await image.boundingBox())!.width).toBe(size);
  await expect(picture).toHaveCSS('background-color', 'rgb(227, 233, 253)');
  await page.mouse.down();
  await expect(picture).toHaveCSS('outline-color', 'rgb(100, 149, 255)');
  expect((await image.boundingBox())!.width).toBe(size);
  await page.mouse.up(); await page.keyboard.press('Escape');
  const stack = await page.locator('.rain-avatar-group').first().locator('.rain-avatar-group__strip > .rain-avatar').evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).zIndex)));
  expect(stack).toEqual([8, 7, 6, 5, 4, 3, 2, 1]);
  const more = page.locator('.rain-avatar-group[data-size="24"]').first().locator('.rain-avatar-group__more');
  await expect(more.locator('[data-rain-id="icon"]')).toHaveCSS('width', '14px');
  const ring = page.getByRole('img', { name: '正在发言', exact: true });
  expect(await ring.evaluate(node => getComputedStyle(node, '::after').borderRadius)).toBe('8px');
});
