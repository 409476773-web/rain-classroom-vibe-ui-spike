import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const evidence = resolve(process.env.RAIN_CHECKBOX_EVIDENCE_DIR ?? "evidence/runtime/checkbox");
test.beforeEach(async ({ page }) => {
  await page.goto("/#checkbox");
  await expect(page.getByRole("heading", { name: "Checkbox 多选框" })).toBeVisible();
});
test("interaction paints cover selection, pointer, Space, disabled and both themes", async ({ page }) => {
  const directory = resolve(evidence, "interactions");
  mkdirSync(directory, { recursive: true });
  await page.setViewportSize({ width: 1600, height: 1000 });
  const facts = [];
  for (const theme of ["light", "dark"] as const) {
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    for (const name of ["接收课程通知", "部分项目已选", "作业提醒", "不可选择", "已选择且锁定"]) {
      const input = page.getByRole("checkbox", { name, exact: true });
      const label = input.locator("..");
      const control = label.locator('[data-slot="control"]');
      const paint = () => control.evaluate((node) => {
        const css = getComputedStyle(node), title = getComputedStyle(node.closest("label")!.querySelector('[data-slot="label"]')!);
        const canvas = getComputedStyle(node.parentElement!), highlight = getComputedStyle(node.parentElement!, "::before");
        return { background: css.backgroundColor, border: css.borderColor, color: css.color, width: css.width, height: css.height,
          outline: css.outline, shadow: css.boxShadow, title: title.color, canvasBackground: highlight.backgroundColor,
          canvasWidth: canvas.width, canvasHeight: canvas.height, highlightWidth: highlight.width,
          highlightHeight: highlight.height, highlightRadius: highlight.borderRadius, highlightInset: highlight.top };
      });
      await page.mouse.move(0, 0);
      const normal = await paint(), disabled = await input.isDisabled(), state = await label.getAttribute("data-state");
      await label.locator('[data-slot="content"]').hover();
      const hover = await paint();
      if (disabled) expect(hover).toEqual(normal);
      else {
        expect(hover.canvasBackground).not.toBe(normal.canvasBackground);
        if (state === "unchecked") {
          expect(hover.border).not.toBe(normal.border);
          expect(hover.background).toBe("rgba(0, 0, 0, 0)");
        } else {
          expect(hover.background).toBe(normal.background);
          expect(hover.color).toBe(normal.color);
        }
      }
      await page.mouse.down();
      const pressed = await paint();
      if (disabled) expect(pressed).toEqual(normal);
      else {
        expect(pressed.background).not.toBe(normal.background);
        expect(pressed.canvasBackground).not.toBe(hover.canvasBackground);
      }
      for (const value of [hover, pressed]) {
        expect([value.width, value.height, value.title, value.canvasWidth, value.canvasHeight])
          .toEqual([normal.width, normal.height, normal.title, "24px", "24px"]);
        expect([value.highlightWidth, value.highlightHeight, value.highlightRadius, value.highlightInset])
          .toEqual(["21px", "21px", "4px", "1.5px"]);
      }
      await page.mouse.move(0, 0); await page.mouse.up();
      expect(await label.getAttribute("data-state")).toBe(state);
      expect((await paint()).background).toBe(normal.background);
      expect((await paint()).border).toBe(normal.border);
      expect((await paint()).canvasBackground).toBe(normal.canvasBackground);
      if (!disabled) {
        await input.focus(); await page.keyboard.down("Space");
        const keyboard = await paint();
        expect(keyboard.background).toBe(pressed.background);
        expect(keyboard.canvasBackground).toBe(pressed.canvasBackground);
        expect(keyboard.outline).not.toContain("none");
        await page.keyboard.up("Space");
        if (state !== "mixed") await page.keyboard.press("Space");
      }
      facts.push({ theme, name, state, disabled, normal, hover, pressed });
    }
    await page.reload();
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    const first = page.getByRole("checkbox", { name: "接收课程通知", exact: true }).locator("..");
    await first.locator('[data-slot="description"]').hover();
    await page.locator('section[aria-labelledby="checkbox-basic-title"]').screenshot({ path: resolve(directory, `${theme}-hover.png`) });
    await page.mouse.down();
    await page.locator('section[aria-labelledby="checkbox-basic-title"]').screenshot({ path: resolve(directory, `${theme}-pressed.png`) });
    await page.mouse.move(0, 0); await page.mouse.up();
    // Reload restores the mixed sample for the second theme without introducing a demo-only state API.
    await page.reload();
  }
  const group = page.getByRole("group", { name: "通知偏好", exact: true });
  await group.evaluate((node) => { (node as HTMLFieldSetElement).disabled = true; });
  const locked = group.getByRole("checkbox", { name: "课堂提醒", exact: true }).locator("..");
  const disabledBorder = await locked.locator('[data-slot="control"]').evaluate((node) => getComputedStyle(node).borderColor);
  await locked.hover(); await page.mouse.down();
  expect(await locked.locator('[data-slot="control"]').evaluate((node) => getComputedStyle(node).borderColor)).toBe(disabledBorder);
  await page.mouse.up();
  await expect(locked.getByRole("checkbox")).not.toBeChecked();
  writeFileSync(resolve(directory, "browser-facts.json"), JSON.stringify(facts, null, 2));
});

test("hover capability and forced colors retain native interaction feedback", async ({ page, browser }) => {
  const touch = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  try {
    const mobile = await touch.newPage();
    await mobile.goto("/#checkbox");
    expect(await mobile.evaluate(() => matchMedia("(hover: hover)").matches)).toBe(false);
    const label = mobile.getByRole("checkbox", { name: "接收课程通知", exact: true }).locator("..");
    const control = label.locator('[data-slot="control"]');
    const normal = await control.evaluate((node) => getComputedStyle(node).borderColor);
    const canvas = () => label.locator('[data-slot="canvas"]').evaluate((node) => getComputedStyle(node, "::before").backgroundColor);
    const normalCanvas = await canvas();
    await label.hover();
    expect(await control.evaluate((node) => getComputedStyle(node).borderColor)).toBe(normal);
    expect(await canvas()).toBe(normalCanvas);
    await label.tap();
    await expect(label.getByRole("checkbox")).toBeChecked();
    await label.tap();
    expect(await control.evaluate((node) => getComputedStyle(node).borderColor)).toBe(normal);
    expect(await canvas()).toBe(normalCanvas);
  } finally { await touch.close(); }
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  for (const name of ["接收课程通知", "部分项目已选", "作业提醒", "已选择且锁定"]) {
    const label = page.getByRole("checkbox", { name, exact: true }).locator("..");
    const paint = () => label.locator('[data-slot="control"]').evaluate((node) => {
      const css = getComputedStyle(node); return [css.backgroundColor, css.borderColor, css.color];
    });
    await page.mouse.move(0, 0); const normal = await paint();
    await label.hover(); expect(await paint()).toEqual(normal);
    await page.mouse.down(); expect(await paint()).toEqual(normal);
    await page.mouse.move(0, 0); await page.mouse.up();
  }
});
test("native label, Space, marks and one change per action", async ({ page }) => {
  const input = page.getByRole("checkbox", { name: "接收课程通知" });
  await page.getByText("仅在有新内容时通知，不会重复发送。").click();
  await expect(input).toBeChecked();
  await page.keyboard.press("Space");
  await expect(input).not.toBeChecked();
  await expect(page.getByTestId("callback-count")).toHaveText("选择变化：2 次");
  await expect(page.locator('[data-state="mixed"] [data-icon="icon/minus-bold"]')).toBeVisible();
  await page.getByText("部分项目已选", { exact: true }).click();
  await expect(page.locator('[data-state="mixed"]')).toHaveCount(0);
  await expect(page.getByRole("checkbox", { name: "部分项目已选" })).toBeChecked();
});
test("default reset, canceled reset, locked values and native FormData", async ({ page }) => {
  const form = page.getByRole("form", { name: "通知偏好表单" });
  await form.getByText("课堂提醒", { exact: true }).click();
  await expect(page.getByTestId("draft-values")).toContainText("locked、outside、homework、class");
  await form.getByRole("button", { name: "读取表单值" }).click();
  await expect(page.getByTestId("submitted-values")).toHaveText("本次表单值：homework、class");
  const canceled = await form.evaluate((node) => {
    const form = node as HTMLFormElement;
    form.addEventListener("reset", (event) => event.preventDefault(), { once: true });
    form.reset(); return new FormData(form).getAll("notice");
  });
  expect(canceled).toEqual(["homework", "class"]);
  await expect(form.getByRole("checkbox", { name: "课堂提醒" })).toBeChecked();
  await expect(page.getByTestId("draft-values")).toContainText("locked、outside、homework、class");
  const immediate = await form.evaluate((node) => {
    const form = node as HTMLFormElement;
    form.reset(); return new FormData(form).getAll("notice");
  });
  expect(immediate).toEqual(["homework"]);
  await expect(form.getByRole("checkbox", { name: "课堂提醒" })).not.toBeChecked();
  await expect(form.getByRole("checkbox", { name: "接收安全通知" })).toBeChecked();
  await expect(form.getByRole("checkbox", { name: "接收安全通知" })).toBeDisabled();
});
test("host validates at least one selection and restores controlled reset", async ({ page }) => {
  const form = page.getByRole("form", { name: "分组校验表单" });
  await form.getByRole("button", { name: "保存学习偏好" }).click();
  await expect(form.getByText("请至少选择一项学习内容。")).toBeVisible();
  const input = form.getByRole("checkbox", { name: "课程内容" });
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  expect(await input.getAttribute("required")).toBeNull();
  await page.keyboard.press("Space");
  await form.getByRole("button", { name: "保存学习偏好" }).click();
  await expect(form.getByRole("status")).toHaveText("学习偏好已保存。");
  await form.evaluate((node) => {
    node.addEventListener("reset", (event) => event.preventDefault(), { once: true });
    (node as HTMLFormElement).reset();
  });
  await expect(input).toBeChecked();
  await expect(form.getByRole("status")).toHaveText("学习偏好已保存。");
  await form.getByRole("button", { name: "清空学习偏好" }).click();
  await expect(input).not.toBeChecked();
  expect(await form.evaluate((node) => new FormData(node as HTMLFormElement).getAll("learning"))).toEqual([]);
});
test("real themes retain Token geometry, fonts, contrast inputs and loaded glyph assets", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  mkdirSync(evidence, { recursive: true });
  const facts = [];
  for (const [button, theme] of [["浅色", "light"], ["深色", "dark"]] as const) {
    await page.getByRole("button", { name: button, exact: true }).click();
    const input = page.getByRole("checkbox", { name: "接收课程通知" });
    await input.focus(); await page.keyboard.press("Space"); await page.keyboard.press("Space");
    const fact = await input.evaluate((node) => {
      const label = node.closest("label")!, canvas = label.querySelector('[data-slot="canvas"]')!, control = label.querySelector('[data-slot="control"]')!;
      const title = label.querySelector('[data-slot="label"]')!, description = label.querySelector('[data-slot="description"]')!;
      const pick = (element: Element) => {
        const css = getComputedStyle(element), box = element.getBoundingClientRect();
        return { width: box.width, height: box.height, color: css.color, background: css.backgroundColor, border: css.borderColor,
          font: css.fontFamily, fontSize: css.fontSize, lineHeight: css.lineHeight, weight: css.fontWeight, outline: css.outline, shadow: css.boxShadow };
      };
      return { theme: node.closest("[data-rain-theme]")?.getAttribute("data-rain-theme"), surface: pick(node.closest(".core-family")!),
        selectedControl: pick(node.ownerDocument.querySelector('[data-rain-id="checkbox-page"] .rain-checkbox[data-state="checked"]:not(:has(input:disabled)) [data-slot="control"]')!),
        canvas: pick(canvas), control: pick(control), title: pick(title), description: pick(description) };
    });
    facts.push(fact);
    expect(fact.canvas.width).toBe(24); expect(fact.control.width).toBe(16);
    expect(fact.surface.background).toBe(theme === "light" ? "rgb(255, 255, 255)" : "rgb(30, 36, 59)");
    expect(fact.title.fontSize).toBe("15px"); expect(fact.title.lineHeight).toBe("24px"); expect(fact.title.weight).toBe("600");
    expect(fact.description.fontSize).toBe("13px"); expect(fact.control.outline).not.toContain("none");
    await page.screenshot({ path: resolve(evidence, `${theme}.png`), fullPage: true });
  }
  const assets = await page.locator('[data-rain-id="checkbox-page"] [data-icon]').evaluateAll(async (nodes) => Promise.all(nodes.map(async (node) => {
    const mask = getComputedStyle(node).maskImage, url = mask.slice(5, -2);
    const response = await fetch(url); return { icon: node.getAttribute("data-icon"), ok: response.ok, width: node.getBoundingClientRect().width };
  })));
  expect(assets.length).toBeGreaterThan(0); expect(assets.every((asset) => asset.ok)).toBe(true);
  const session = await page.context().newCDPSession(page);
  await session.send("DOM.enable"); await session.send("CSS.enable");
  const document = await session.send("DOM.getDocument");
  const node = await session.send("DOM.querySelector", { nodeId: document.root.nodeId, selector: '[data-rain-id="ui-checkbox"] [data-slot="label"]' });
  const platformFonts = await session.send("CSS.getPlatformFontsForNode", { nodeId: node.nodeId });
  writeFileSync(resolve(evidence, "browser-facts.json"), JSON.stringify({ facts, assets, platformFonts }, null, 2));
  await session.detach();
});
test("320px, density, forced colors and reduced motion keep the same working control", async ({ page }) => {
  mkdirSync(evidence, { recursive: true });
  await page.setViewportSize({ width: 320, height: 900 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(await page.locator('[data-rain-id="ui-checkbox"]').evaluateAll((labels) => labels.every((label) => {
    const content = label.querySelector('[data-slot="content"]') as HTMLElement | null;
    return label.getBoundingClientRect().width <= label.parentElement!.getBoundingClientRect().width
      && (!content || content.scrollWidth <= content.clientWidth + 1);
  }))).toBe(true);
  await page.screenshot({ path: resolve(evidence, "narrow.png"), fullPage: true });
  await page.getByRole("button", { name: "紧凑密度" }).click();
  await expect(page.locator('[data-rain-id="ui-checkbox"]').first()).toHaveAttribute("data-density", "compact");
  await page.screenshot({ path: resolve(evidence, "compact.png"), fullPage: true });
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const input = page.getByRole("checkbox", { name: "接收课程通知" });
  await input.focus(); await page.keyboard.press("Space");
  await expect(input).toBeChecked();
  const control = page.locator('[data-rain-id="ui-checkbox"]').first().locator('[data-slot="control"]');
  expect(await control.evaluate((node) => getComputedStyle(node).outlineWidth)).toBe("2px");
  await expect(control.locator('[data-icon="icon/check-bold"]')).toBeVisible();
  await page.screenshot({ path: resolve(evidence, "forced-colors.png"), fullPage: true });
});
