import { expect, test, type Locator, type Page } from "@playwright/test";
import { writeFileSync } from "node:fs";

const modal = (page: Page) => page.locator('.rain-dialog[data-rain-id="ui-dialog"]');
async function settled(popup: Locator) {
  await expect(popup).not.toHaveAttribute("data-starting-style", "");
  await expect(popup).toHaveCSS("opacity", "1");
  await expect.poll(() => popup.evaluate(el => el.getAnimations().length)).toBe(0);
}
async function toggle(page: Page, name: string) { await page.getByRole("checkbox", { name, exact: true }).focus(); await page.keyboard.press("Space"); }
async function visibleMasks(page: Page) { return page.locator('.rain-dialog-backdrop').evaluateAll(elements => elements.filter(el => getComputedStyle(el).visibility === "visible" && Number(getComputedStyle(el).opacity) > 0).length); }

test("confirmed mask paints, one effective layer and weak-mask dismissal in both themes", async ({ page }, info) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const facts = [];
  for (const theme of ["light", "dark"]) {
    await page.goto("/#dialog"); if (theme === "dark") await toggle(page, "深色主题");
    for (const [name, value, light, dark] of [
      ["无蒙层", "none", "", ""], ["视觉区分", "separation", "rgba(34, 48, 81, 0.06)", "rgba(5, 9, 26, 0.15)"],
      ["轻度聚焦", "focus", "rgba(34, 48, 81, 0.15)", "rgba(5, 9, 26, 0.7)"],
      ["模态任务", "modal", "rgba(34, 48, 81, 0.5)", "rgba(3, 5, 16, 0.9)"],
      ["特殊沉浸", "immersive", "rgba(27, 35, 56, 0.8)", "rgba(5, 9, 26, 0.9)"],
    ]) {
      await page.getByRole("combobox", { name: "预览蒙层" }).click(); await page.getByRole("option", { name, exact: true }).click();
      await page.getByRole("button", { name: "416px", exact: true }).click(); await settled(modal(page));
      if (value === "none") await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(0);
      else {
        await expect(page.locator('.rain-dialog-backdrop')).toHaveCSS("background-color", theme === "light" ? light! : dark!);
        expect(await visibleMasks(page)).toBe(1);
      }
      facts.push({ theme, value, background: await page.locator('.dialog-review').evaluate(el => getComputedStyle(el).backgroundColor) });
      await page.screenshot({ path: info.outputPath(`mask-${theme}-${value}.png`) });
      await page.mouse.click(5, 5);
      if (value === "separation" || value === "focus") await expect(modal(page)).toHaveCount(0);
      else { await expect(modal(page)).toBeVisible(); await page.keyboard.press("Escape"); await expect(modal(page)).toHaveCount(0); }
    }
  }
  writeFileSync(info.outputPath("mask-facts.json"), JSON.stringify(facts, null, 2));
});

test("border-box widths, 40/60/16 insets and short-view action access", async ({ page }, info) => {
  const facts = [];
  for (const viewport of [{ width: 1440, height: 900 }, { width: 375, height: 667 }, { width: 320, height: 568 }]) {
    await page.setViewportSize(viewport); await page.goto("/#dialog");
    for (const inset of [40, 60]) {
      if (inset === 60) await toggle(page, "桌面边距 60px");
      for (const width of [416, 616, 1116, "viewport"] as const) {
        await page.getByRole("button", { name: width === "viewport" ? "随视口扩展" : `${width}px`, exact: true }).click();
        const popup = modal(page); await settled(popup);
        const rect = (await popup.boundingBox())!, margin = viewport.width <= 640 ? 16 : inset;
        const expected = width === "viewport" ? viewport.width - margin * 2 : Math.min(width, viewport.width - margin * 2);
        expect(rect.width).toBeCloseTo(expected, 1); expect(rect.x).toBeCloseTo((viewport.width - expected) / 2, 1);
        expect(rect.height).toBeGreaterThanOrEqual(128); expect(rect.y).toBeGreaterThanOrEqual(margin - 1);
        expect(rect.y + rect.height).toBeLessThanOrEqual(viewport.height - margin + 1);
        expect(await popup.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
        facts.push({ viewport, inset, width, rect });
        await page.keyboard.press("Escape"); await expect(popup).toHaveCount(0);
      }
    }
  }
  await page.setViewportSize({ width: 375, height: 180 }); await page.goto("/#dialog");
  await page.getByRole("button", { name: "编辑课程资料", exact: true }).click();
  await settled(modal(page));
  await page.getByRole("button", { name: "取消", exact: true }).scrollIntoViewIfNeeded();
  const button = (await page.getByRole("button", { name: "取消", exact: true }).boundingBox())!;
  expect(button.y).toBeGreaterThanOrEqual(16); expect(button.y + button.height).toBeLessThanOrEqual(164);
  await page.screenshot({ path: info.outputPath("short-viewport.png") });
  await page.getByRole("button", { name: "取消", exact: true }).click(); await expect(modal(page)).toHaveCount(0);
  writeFileSync(info.outputPath("geometry.json"), JSON.stringify(facts, null, 2));
});

for (const theme of ["light", "dark"]) test(`nested confirmation preserves draft, scroll and safe focus: ${theme}`, async ({ page }, info) => {
  await page.goto("/#dialog"); if (theme === "dark") await toggle(page, "深色主题"); await toggle(page, "长内容");
  const trigger = page.getByRole("button", { name: "编辑课程资料", exact: true }); await trigger.click();
  const popup = modal(page), body = popup.locator('[data-slot="body"]'); await settled(popup);
  await popup.getByRole("textbox", { name: "课程名称" }).fill("保留草稿与滚动位置");
  await body.evaluate(el => { el.scrollTop = 280; }); const scroll = await body.evaluate(el => el.scrollTop);
  const backgroundScroll = await page.evaluate(() => window.scrollY);
  await popup.getByRole("button", { name: "取消", exact: true }).click();
  const alert = page.getByRole("alertdialog", { name: "放弃课程修改？" }); await settled(alert);
  await expect(alert.getByRole("button", { name: "继续编辑" })).toBeFocused();
  await expect(alert).toHaveAttribute("data-rain-theme", theme); expect(await visibleMasks(page)).toBe(1);
  await expect(popup).toHaveAttribute("data-nested-dialog-open", "");
  await expect(alert).not.toHaveAttribute("data-local-recipe");
  await page.mouse.click(5, 5); await expect(alert).toBeVisible();
  await page.mouse.wheel(0, 600); expect(await page.evaluate(() => window.scrollY)).toBe(backgroundScroll);
  await page.screenshot({ path: info.outputPath(`nested-${theme}.png`) });
  await page.keyboard.press("Escape"); await expect(alert).toHaveCount(0);
  await expect(popup.getByRole("button", { name: "取消", exact: true })).toBeFocused();
  expect(await body.evaluate(el => el.scrollTop)).toBe(scroll);
  await expect(popup.getByRole("textbox", { name: "课程名称" })).toHaveValue("保留草稿与滚动位置");
  expect(await visibleMasks(page)).toBe(1);
  await popup.getByRole("button", { name: "关闭编辑" }).click(); await settled(alert);
  await alert.getByRole("button", { name: "放弃修改" }).click();
  await expect(page.locator('.rain-dialog-portal .rain-dialog-portal > .rain-dialog-backdrop')).toHaveCSS("transition-duration", "0.18s");
  await expect(popup).toHaveCount(0); await expect(alert).toHaveCount(0); await expect(trigger).toBeFocused();
  await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(0);
  await trigger.click(); await expect(popup.getByRole("textbox", { name: "课程名称" })).toHaveValue("设计方法与实践");
});

test("actual action groups use 8 or 12px and one primary action", async ({ page }) => {
  for (const gap of [8, 12]) {
    await page.goto("/#dialog"); if (gap === 12) await toggle(page, "按钮间距 12px");
    await page.getByRole("button", { name: "编辑课程资料", exact: true }).click(); await settled(modal(page));
    const actions = modal(page).locator('.course-dialog-actions'); await expect(actions).toHaveCSS("gap", `${gap}px`);
    await expect(actions.locator('[data-variant="primary"]')).toHaveCount(1);
    const boxes = await actions.getByRole("button").evaluateAll(buttons => buttons.map(b => { const r = b.getBoundingClientRect(); return { x: r.x, right: r.right }; }));
    expect(boxes[1]!.x - boxes[0]!.right).toBeCloseTo(gap, 1);
    await page.keyboard.press("Escape"); await expect(modal(page)).toHaveCount(0);
  }
});

test("footer shares the popup surface with dividers only on long forms", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  async function checkFooter(popup: Locator, divider: boolean) {
    const paint = await popup.evaluate(el => {
      const footer = el.querySelector('[data-slot="footer"]')!, surface = getComputedStyle(el).backgroundColor;
      const background = getComputedStyle(footer).backgroundColor;
      return { surface, footer: background === "rgba(0, 0, 0, 0)" ? surface : background };
    });
    expect(paint.footer).toBe(paint.surface);
    await expect(popup.locator('[data-slot="footer"]').first()).toHaveCSS("border-top-width", divider ? "1px" : "0px");
    expect(await popup.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  }
  for (const theme of ["light", "dark"]) for (const width of [1440, 375]) for (const longContent of [false, true]) {
    await page.setViewportSize({ width, height: width === 375 ? 667 : 900 });
    await page.goto("about:blank"); await page.goto("/#dialog"); if (theme === "dark") await toggle(page, "深色主题");
    if (longContent) await toggle(page, "长内容");
    await page.getByRole("button", { name: "编辑课程资料", exact: true }).click();
    const popup = modal(page); await settled(popup);
    await checkFooter(popup, longContent);
    await page.screenshot({ path: info.outputPath(`footer-${theme}-${width}-${longContent ? "long" : "short"}.png`) });
    await popup.getByRole("textbox", { name: "课程名称" }).fill("设计方法与实践（修改）");
    await popup.getByRole("button", { name: "取消", exact: true }).click();
    const alert = page.getByRole("alertdialog", { name: "放弃课程修改？" }); await settled(alert);
    await checkFooter(alert, false);
    await page.screenshot({ path: info.outputPath(`footer-${theme}-${width}-${longContent ? "long" : "short"}-confirmation.png`) });
  }
  expect(errors).toEqual([]);
});

test("180ms centered transitions, reversible paint and reduced motion", async ({ page }, info) => {
  await page.goto("/#dialog"); await page.getByRole("button", { name: "616px", exact: true }).click();
  const popup = modal(page); await settled(popup);
  await expect(popup).toHaveCSS("transition-duration", "0.18s, 0.18s");
  const samples = await popup.evaluate(async el => {
    // Exercise the CSS transition's reversal using the same public lifecycle attributes as Base UI.
    const frame = () => new Promise(resolve => requestAnimationFrame(resolve));
    const sample = () => { const r = el.getBoundingClientRect(); return { opacity: Number(getComputedStyle(el).opacity), x: r.x + r.width / 2, y: r.y + r.height / 2 }; };
    const before = sample(); el.setAttribute("data-ending-style", ""); await frame(); await frame(); await frame();
    const closing = sample(); el.removeAttribute("data-ending-style"); await frame(); const reversed = sample();
    return { before, closing, reversed };
  });
  expect(samples.closing.opacity).toBeLessThan(1); expect(samples.closing.opacity).toBeGreaterThan(0);
  expect(Math.abs(samples.reversed.opacity - samples.closing.opacity)).toBeLessThan(.5);
  for (const sample of Object.values(samples)) { expect(sample.x).toBeCloseTo(640, 1); expect(sample.y).toBeCloseTo(360, 1); }
  await settled(popup);
  await page.keyboard.press("Escape");
  // The painted backdrop must keep intercepting background pointer input until unmount.
  const exitTarget = await page.evaluate(() => document.elementFromPoint(5, 5)?.className);
  expect(exitTarget).toContain("rain-dialog-backdrop"); await expect(popup).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.getByRole("button", { name: "随视口扩展" }).click();
  await expect(popup).toHaveCSS("transition-duration", "0s, 0s"); await settled(popup);
  await expect(popup).toHaveCSS("opacity", "1");
  writeFileSync(info.outputPath("motion.json"), JSON.stringify(samples, null, 2));
});


test("no-mask modal blocks background clicks throughout exit without painting a mask", async ({ page }) => {
  await page.goto("/#dialog");
  await page.getByRole("combobox", { name: "预览蒙层" }).click(); await page.getByRole("option", { name: "无蒙层", exact: true }).click();
  const trigger = page.getByRole("button", { name: "616px", exact: true }); await trigger.scrollIntoViewIfNeeded();
  const box = (await trigger.boundingBox())!, point = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await trigger.evaluate(el => { el.dataset.clicks = "0"; el.addEventListener("click", () => { el.dataset.clicks = String(Number(el.dataset.clicks) + 1); }); });
  await trigger.click(); await settled(modal(page)); await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(0);
  await page.keyboard.press("Escape");
  expect(await page.evaluate(p => document.elementFromPoint(p.x, p.y)?.className, point)).toContain("rain-dialog-portal");
  await page.mouse.click(point.x, point.y); await expect(modal(page)).toHaveCount(0); await expect(trigger).toHaveAttribute("data-clicks", "1");
});


test("visual viewport shrink and pan keep actions reachable without changing the layout viewport", async ({ page }, info) => {
  await page.setViewportSize({ width: 1280, height: 900 }); await page.goto("/#dialog");
  await page.getByRole("button", { name: "编辑课程资料", exact: true }).click(); await settled(modal(page));
  const before = await page.evaluate(() => ({ width: innerWidth, height: innerHeight }));
  await page.evaluate(() => {
    const viewport = window.visualViewport!;
    for (const [key, value] of Object.entries({ width: 375, height: 320, offsetLeft: 30, offsetTop: 80 })) Object.defineProperty(viewport, key, { configurable: true, get: () => value });
    viewport.dispatchEvent(new Event("resize")); viewport.dispatchEvent(new Event("scroll"));
  });
  const popup = modal(page), box = (await popup.boundingBox())!;
  expect(await page.evaluate(() => ({ width: innerWidth, height: innerHeight }))).toEqual(before);
  expect(box.width).toBeCloseTo(343, 1); expect(box.x).toBeCloseTo(46, 1);
  expect(box.y).toBeGreaterThanOrEqual(96); expect(box.y + box.height).toBeLessThanOrEqual(384);
  const cancel = popup.getByRole("button", { name: "取消", exact: true }); await cancel.scrollIntoViewIfNeeded();
  const action = (await cancel.boundingBox())!; expect(action.y).toBeGreaterThanOrEqual(96); expect(action.y + action.height).toBeLessThanOrEqual(384);
  await page.screenshot({ path: info.outputPath("visual-viewport.png") });
  await cancel.click(); await expect(popup).toHaveCount(0);
});


test("long titles and action labels retain typography and wrap safely on a narrow screen", async ({ page }, info) => {
  await page.setViewportSize({ width: 320, height: 568 }); await page.goto("/#dialog");
  await page.getByRole("button", { name: "编辑课程资料", exact: true }).click(); const popup = modal(page); await settled(popup);
  await popup.evaluate(el => {
    // Stress the public parts with longer content while retaining the real Button label/size structure.
    el.querySelector('[data-slot="title"]')!.textContent = "调整《设计方法与实践》课程资料及本学期教学安排";
    const labels = el.querySelectorAll('.course-dialog-actions [data-slot="label"]');
    labels[0]!.textContent = "返回继续检查课程资料"; labels[1]!.textContent = "确认并保存本次课程修改";
  });
  const facts = await popup.evaluate(el => {
    const rect = el.getBoundingClientRect(), title = el.querySelector('[data-slot="title"]')!, close = el.querySelector('[aria-label="关闭编辑"]')!;
    return { overflow: el.scrollWidth > el.clientWidth, titleTop: title.getBoundingClientRect().y, lineHeight: parseFloat(getComputedStyle(title).lineHeight), close: close.getBoundingClientRect().toJSON(),
      actions: [...el.querySelectorAll('.course-dialog-actions button')].map(button => ({ box: button.getBoundingClientRect().toJSON(), font: getComputedStyle(button.querySelector('[data-slot="label"]')!).fontSize })), rect: rect.toJSON() };
  });
  expect(facts.overflow).toBe(false); expect(facts.close.y + facts.close.height / 2).toBeCloseTo(facts.titleTop + facts.lineHeight / 2, 1);
  expect(facts.actions[1]!.box.y).toBeGreaterThan(facts.actions[0]!.box.y);
  for (const action of facts.actions) { expect(action.font).toBe("14px"); expect(action.box.x).toBeGreaterThanOrEqual(facts.rect.x + 24); expect(action.box.right).toBeLessThanOrEqual(facts.rect.right - 24); }
  await page.screenshot({ path: info.outputPath("long-labels-narrow.png") });
});

test("reopening through the real trigger reverses an in-flight exit without remounting", async ({ page }, info) => {
  await page.goto("/#dialog"); const trigger = page.getByRole("button", { name: "616px", exact: true }), triggerNode = (await trigger.elementHandle())!;
  await trigger.click(); const popup = modal(page); await settled(popup); const original = (await popup.elementHandle())!;
  await page.keyboard.press("Escape");
  const closing = await original.evaluate(async el => { await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); return Number(getComputedStyle(el).opacity); });
  // Programmatic retrigger exercises an interrupted lifecycle; user pointer input is still shielded separately.
  await triggerNode.evaluate(el => (el as HTMLButtonElement).click());
  await expect(popup).toHaveAttribute("data-open", ""); await expect(popup).not.toHaveAttribute("data-ending-style", "");
  expect(await popup.evaluate((el, old) => el === old, original)).toBe(true);
  const reversed = await popup.evaluate(el => Number(getComputedStyle(el).opacity));
  expect(closing).toBeGreaterThan(0); expect(closing).toBeLessThan(1); expect(reversed).toBeGreaterThan(0);
  await settled(popup); await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(1);
  writeFileSync(info.outputPath("lifecycle-reversal.json"), JSON.stringify({ closing, reversed, remounted: false }, null, 2));
});
