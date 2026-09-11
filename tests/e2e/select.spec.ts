import { expect, test, type Locator } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { contrastRatio } from "./color-contrast";

const frame = (control: Locator) => control.locator("xpath=..");
const widget = (control: Locator) => frame(control).locator("xpath=..");
const popup = (control: Locator) => control.page().locator('[data-rain-id="ui-select-popup"]:visible');

for (const theme of ["light", "dark"] as const) test(`implemented Select placeholders and option descriptions preserve real permissions in ${theme}`, async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#select");
  await page.evaluate(async ({ theme, uiPath }) => {
    const reactPath = "/node_modules/.vite/deps/react.js", clientPath = "/node_modules/.vite/deps/react-dom_client.js";
    const { createElement: h } = (await import(reactPath)).default;
    const { createRoot } = (await import(clientPath)).default;
    const { Select, FormItem } = await import(uiPath);
    document.getElementById("root")!.style.display = "none";
    const host = document.createElement("section");
    host.id = "select-closure-fixture"; host.setAttribute("data-rain-theme", theme);
    host.style.cssText = "padding:24px;background:var(--rain-category-background-neutral-1);color:var(--rain-category-text-neutral-1);font-family:var(--rain-font-ui)";
    document.body.append(host);
    const options = [{ value: "alpha", label: "可选课程", description: "普通未选说明" }, { value: "beta", label: "已有课程", description: "选中后保留品牌说明" }, { value: "blocked", label: "暂不可选", description: "禁用说明保留原色", disabled: true }];
    const cells = ["outlined", "filled", "underlined"].flatMap(appearance => [24, 28, 32, 36].map(size => h("section", { key: `${appearance}-${size}`, "data-closure-cell": `${appearance}-${size}`, style: { display: "grid", gap: "12px", alignContent: "start" } },
      h("h2", { style: { fontSize: "16px", margin: 0 } }, `${theme} · ${appearance} · ${size}px · 实施后`),
      ...["normal", "multiple", "searchable", "searchable-multiple", "warning", "error", "readonly", "disabled", "inherited-disabled", "loading"].map(state => {
        const label = `${appearance} ${size} ${state}`;
        const control = h(Select, { options, appearance, size, placeholder: "请选择课程", "aria-label": label,
          multiple: state.includes("multiple"), searchable: state.startsWith("searchable"), loading: state === "loading",
          readOnly: state === "readonly", disabled: state === "disabled", status: ["warning", "error"].includes(state) ? state : "default" });
        return h("div", { key: state, "data-closure-select": state, style: { display: "grid", gap: "4px" } },
          state === "inherited-disabled" ? h(FormItem, { label, disabled: true }, control) : [h("span", { key: "label", style: { fontSize: "12px" } }, state), control]);
      }))));
    cells.push(h("section", { key: "retained", "data-closure-retained": true, style: { display: "grid", gap: "12px" } },
      h(Select, { options, "aria-label": "保留计数", multiple: true, display: "count", defaultValue: ["alpha", "beta"] }),
      h(Select, { options, "aria-label": "保留标签", multiple: true, display: "tags", size: 32, defaultValue: ["beta"] })));
    createRoot(host).render(h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" } }, ...cells));
  }, { theme, uiPath: `/@fs${new URL("../../packages/ui/src/index.ts", import.meta.url).pathname}` });
  const host = page.locator("#select-closure-fixture");
  await expect(host.locator("[data-closure-select] [role=combobox]")).toHaveCount(120);
  const colors = theme === "light"
    ? { placeholder: "rgb(116, 133, 168)", strongText: "rgb(73, 93, 135)", disabled: "rgb(160, 172, 197)", arrow: "rgb(150, 163, 193)", disabledArrow: "rgb(184, 194, 216)", text: "rgb(20, 35, 70)", description: "rgb(86, 104, 143)", selected: "rgb(21, 97, 248)" }
    : { placeholder: "rgb(136, 145, 173)", strongText: "rgb(183, 193, 224)", disabled: "rgb(111, 122, 158)", arrow: "rgb(132, 144, 181)", disabledArrow: "rgb(85, 95, 128)", text: "rgb(239, 241, 245)", description: "rgb(148, 156, 184)", selected: "rgb(81, 136, 255)" };
  const records: unknown[] = [];
  async function record(control: Locator, interaction: string) {
    const paint = await control.evaluate(node => {
      const trigger = node as HTMLButtonElement, frame = trigger.closest('[data-slot="frame"]')!, owner = trigger.closest('[data-rain-id="ui-select"]')!;
      const value = getComputedStyle(trigger.querySelector('[data-slot="value"] > span')!), frameCss = getComputedStyle(frame);
      return { appearance: owner.getAttribute("data-appearance"), size: owner.getAttribute("data-size"),
        state: owner.closest("[data-closure-select]")!.getAttribute("data-closure-select"), permission: owner.getAttribute("data-permission"),
        disabled: trigger.disabled, ariaDisabled: trigger.getAttribute("aria-disabled"), open: trigger.getAttribute("aria-expanded"),
        focused: trigger === document.activeElement, focusVisible: trigger.matches(":focus-visible"), hover: trigger.matches(":hover"),
        placeholder: value.color, label: trigger.textContent, opacity: value.opacity,
        foreground: getComputedStyle(trigger).color, arrow: getComputedStyle(frame.querySelector('[data-slot="arrow"]')!).color,
        background: frameCss.backgroundColor, parentBackground: getComputedStyle(document.getElementById("select-closure-fixture")!).backgroundColor,
        border: frameCss.borderColor, outline: frameCss.outlineColor, shadow: frameCss.boxShadow };
    });
    expect(paint.placeholder).toBe(paint.disabled ? colors.disabled : colors.placeholder);
    expect(paint.label).toBe("请选择课程"); expect(paint.opacity).toBe("1");
    expect(paint.disabled).toBe(["disabled", "inherited-disabled"].includes(paint.state!));
    expect(paint.permission).toBe(paint.disabled ? "disabled" : paint.state === "readonly" ? "readonly" : "editable");
    expect(paint.arrow).toBe(paint.disabled ? colors.disabledArrow : colors.arrow);
    const contrast = contrastRatio(paint.placeholder, paint.background, paint.parentBackground);
    records.push({ theme, interaction, ...paint, contrast, contrastRequired: paint.disabled ? null : 4.5, contrastPass: paint.disabled ? null : contrast >= 4.5 });
    return paint;
  }
  for (const control of await host.locator("[data-closure-select] [role=combobox]").all()) await record(control, "closed");
  const directory = process.env.RAIN_CLOSURE_EVIDENCE_DIR;
  if (directory) mkdirSync(directory, { recursive: true });
  const artifact = (name: string) => directory ? `${directory}/${name}` : testInfo.outputPath(name);
  await host.locator('[data-closure-cell="outlined-32"]').screenshot({ path: artifact(`implemented-select-${theme}.png`) });
  for (const appearance of ["outlined", "filled", "underlined"]) for (const size of [24, 28, 32, 36]) {
    const cell = host.locator(`[data-closure-cell="${appearance}-${size}"]`);
    const readonly = cell.locator('[data-closure-select="readonly"] [role=combobox]');
    await readonly.focus(); await readonly.press("Tab"); await page.keyboard.press("Shift+Tab");
    expect((await record(readonly, "readonly-keyboard-focus")).focusVisible).toBe(true);
    await readonly.press("ArrowDown"); await expect(readonly).toHaveAttribute("aria-expanded", "false");
    for (const state of ["normal", "multiple", "searchable", "searchable-multiple"]) {
      const control = cell.locator(`[data-closure-select="${state}"] [role=combobox]`);
      await control.hover(); expect((await record(control, "hover")).hover).toBe(true);
      await control.focus(); await control.press("Tab"); await page.keyboard.press("Shift+Tab");
      expect((await record(control, "keyboard-focus")).focusVisible).toBe(true);
      await control.press("ArrowDown"); const panel = popup(control); await expect(panel).toBeVisible();
      expect((await record(control, "open-empty")).open).toBe("true");
      await expect(panel.locator("xpath=..")).toHaveAttribute("data-rain-theme", theme);
      if (state.startsWith("searchable")) {
        const search = panel.getByRole("combobox", { name: "搜索选项", exact: true });
        await expect(search).toBeFocused(); await expect(search).toHaveValue("");
        const paint = await search.evaluate(node => ({ placeholder: getComputedStyle(node, "::placeholder").color, status: node.closest('[data-rain-id="ui-input"]')!.getAttribute("data-status") }));
        expect(paint).toEqual({ placeholder: colors.placeholder, status: "default" });
        records.push({ theme, appearance, size, state, interaction: "popup-search", ...paint });
      }
      const ordinary = panel.getByRole("option", { name: "可选课程", exact: true });
      const selected = panel.getByRole("option", { name: "已有课程", exact: true });
      const disabled = panel.getByRole("option", { name: "暂不可选", exact: true });
      await expect(ordinary.locator('[data-slot="description"]')).toHaveCSS("color", colors.strongText);
      await expect(disabled).toHaveAttribute("aria-disabled", "true");
      await expect(disabled.locator('[data-slot="description"]')).toHaveCSS("color", colors.description);
      await selected.click();
      if (!state.includes("multiple")) await control.press("ArrowDown");
      await expect(selected).toHaveAttribute("aria-selected", "true");
      await expect(selected.locator('[data-slot="description"]')).toHaveCSS("color", colors.selected);
      records.push({ theme, appearance, size, state, interaction: "option-description", ordinary: await ordinary.locator('[data-slot="description"]').evaluate(node => getComputedStyle(node).color), selected: await selected.locator('[data-slot="description"]').evaluate(node => getComputedStyle(node).color), disabled: await disabled.locator('[data-slot="description"]').evaluate(node => getComputedStyle(node).color), note: "Selected Brand/2 and disabled Neutral/4 are preserved, not accepted contrast exceptions." });
      await page.keyboard.press("Escape"); await expect(control).toBeFocused();
      await expect(control.locator('[data-slot="value"]')).toHaveCSS("color", colors.text);
      await widget(control).getByRole("button", { name: `清除${appearance} ${size} ${state}`, exact: true }).click();
      await record(control, "after-clear");
    }
  }
  const retained = host.locator("[data-closure-retained]");
  await expect(retained.getByRole("combobox", { name: "保留计数" }).locator('[data-slot="value"]')).toHaveCSS("color", colors.text);
  await expect(retained.getByText("已选 2 项", { exact: true })).toHaveCSS("color", colors.strongText);
  await expect(retained.locator('[data-rain-id="ui-tag"] [data-slot="label"]')).toHaveCSS("color", colors.text);
  records.push({ interaction: "retained-count-and-tag", value: colors.text, count: colors.strongText, tag: colors.text });
  writeFileSync(artifact(`implemented-select-${theme}.json`), JSON.stringify({ scope: "Real Select/FormItem props; three appearances x four sizes; empty single/multiple/searchable/searchable-multiple/warning/error/readonly/disabled/inherited-disabled/loading. Actual keyboard opening, Portal search, selection and clear; ordinary option Neutral/3, selected Brand/2, disabled Neutral/4. No manually assigned component state or color overrides.", theme, records }, null, 2));
});

test("formal popups escape clipping, inherit themes and retain keyboard focus within viewport bounds", async ({ page }) => {
  await page.goto("/#select");
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    for (const name of ["普通单选", "普通多选", "搜索单选", "搜索多选"]) {
      const control = page.getByRole("combobox", { name, exact: true });
      await control.evaluate((node) => {
        const root = node.closest('[data-rain-id="ui-select"]') as HTMLElement;
        root.style.overflow = "hidden";
      });
      await control.press("ArrowDown");
      const panel = popup(control);
      await expect(panel).toBeVisible();
      expect(await control.evaluate((node) => node.closest('[data-rain-id="ui-select"]')!.contains(document.querySelector('[data-rain-id="ui-select-popup"]')))).toBe(false);
      await expect(panel.locator("xpath=..")).toHaveAttribute("data-rain-theme", theme === "浅色" ? "light" : "dark");
      const anchor = (await frame(control).boundingBox())!, box = (await panel.boundingBox())!;
      expect(Math.abs(anchor.width - box.width)).toBeLessThanOrEqual(1);
      expect(box.x).toBeGreaterThanOrEqual(8);
      expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width - 8);
      expect(box.y + box.height).toBeLessThanOrEqual(page.viewportSize()!.height - 8);
      if (name === "普通单选") {
        const first = panel.getByRole("option", { name: "视传 2401", exact: true });
        await expect(first).toBeFocused();
        await expect(first).toHaveCSS("outline-style", "solid");
      }
      await page.keyboard.press("Escape");
      await expect(control).toBeFocused();
    }
  }
});

test("shared field paints, sizes, selected values and focus follow the accepted geometry in both themes", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1600, height: 1100 });
  await page.goto("/#select");
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    const placeholderColor = theme === "浅色" ? "rgb(116, 133, 168)" : "rgb(136, 145, 173)";
    const arrowColor = theme === "浅色" ? "rgb(150, 163, 193)" : "rgb(132, 144, 181)";
    for (const size of [24, 28, 32, 36]) {
      const control = page.getByRole("combobox", { name: `${size}px 摘要`, exact: true });
      await expect(frame(control)).toHaveCSS("height", `${size}px`);
      await expect(frame(control)).toHaveCSS("padding-left", size === 24 ? "8px" : "12px");
      await expect(control).toHaveCSS("font-size", size === 24 ? "13px" : "14px");
      await expect(frame(control).locator('[data-slot="arrow"] .rain-icon')).toHaveCSS("width", size === 24 ? "12px" : "14px");
      await expect(frame(control).locator('[data-slot="clear-slot"]')).toHaveCSS("width", "24px");
      await expect(control).toHaveAccessibleDescription(/视传 2401、数媒 2401、工业设计 2401/);
    }
    for (const size of [32, 36]) {
      const control = page.getByRole("combobox", { name: `${size}px 标签`, exact: true });
      await expect(frame(control)).toHaveCSS("height", `${size + 2}px`);
      const tags = frame(control).locator('[data-rain-id="ui-tag"]');
      await expect(tags.first()).toHaveCSS("height", `${size - 8}px`);
      await expect(tags.first()).toHaveCSS("border-radius", "4px");
      await expect(tags.first()).toHaveCSS("font-size", "14px");
      await expect(tags.first()).toHaveCSS("line-height", "20px");
      await expect(tags.first()).toHaveCSS("padding-left", "6px");
      await expect(tags.first().locator('[data-slot="remove-action"]')).toHaveCSS("width", "24px");
    }
    await expect(frame(page.getByRole("combobox", { name: "紧凑区域默认", exact: true }))).toHaveCSS("height", "24px");
    for (const appearance of ["描边", "填充", "底线"]) {
      const input = page.getByRole("textbox", { name: appearance + "输入", exact: true });
      const control = page.getByRole("combobox", { name: appearance + "选择", exact: true });
      const empty = page.getByRole("combobox", { name: appearance + "空值", exact: true });
      await expect(empty.locator('[data-slot="value"] > span')).toHaveCSS("color", placeholderColor);
      await expect(frame(control).locator('[data-slot="arrow"]')).toHaveCSS("color", arrowColor);
      await page.mouse.move(0, 0);
      for (const property of ["height", "padding-left", "background-color", "border-color", "border-radius"]) {
        const value = await frame(input).evaluate((node, key) => getComputedStyle(node).getPropertyValue(key), property);
        await expect(frame(control)).toHaveCSS(property, value);
      }
      await control.focus();
      await control.press("Tab");
      await page.keyboard.press("Shift+Tab");
      await expect(control).toBeFocused();
      if (appearance === "底线") {
        await expect(frame(control)).toHaveCSS("outline-style", "none");
        await expect(frame(control)).toHaveCSS("box-shadow", "none");
        await expect(frame(control)).toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
      } else {
        await expect(frame(control)).toHaveCSS("outline-width", "1px");
        await expect(frame(control)).toHaveCSS("outline-offset", "0px");
      }
      const warning = page.getByRole("combobox", { name: appearance + "警告", exact: true });
      await warning.click();
      const search = popup(warning).getByRole("combobox", { name: "搜索选项", exact: true });
      await expect(search).toBeFocused();
      await expect.poll(() => search.evaluate((node) => getComputedStyle(node, "::placeholder").color)).toBe(placeholderColor);
      await expect(frame(warning).locator('[data-slot="arrow"]')).toHaveCSS("color", arrowColor);
      await expect(frame(search)).toHaveAttribute("data-status", "default");
      await expect(frame(warning)).toHaveAttribute("data-status", "warning");
      await search.press("Escape");
      const readonly = page.getByRole("combobox", { name: appearance + "只读", exact: true });
      await readonly.focus();
      await readonly.press("ArrowDown");
      await expect(readonly).toBeFocused();
      await expect(readonly).toHaveAttribute("aria-expanded", "false");
      await expect(page.getByRole("combobox", { name: appearance + "禁用", exact: true })).toBeDisabled();
    }
    await page.getByRole("heading", { name: "Select 选择器", exact: true }).click();
    await page.screenshot({ path: testInfo.outputPath(theme === "浅色" ? "light.png" : "dark.png"), fullPage: true });
  }
  const underlined = page.getByRole("combobox", { name: "底线选择", exact: true });
  await underlined.focus();
  await underlined.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await expect(frame(underlined)).toHaveCSS("border-bottom-width", "2px");
  await expect(frame(underlined)).toHaveCSS("outline-style", "none");
  const outlined = page.getByRole("combobox", { name: "描边选择", exact: true });
  await outlined.focus();
  await expect(frame(outlined)).toHaveCSS("outline-width", "2px");
  await expect(frame(outlined)).toHaveCSS("box-shadow", "none");
});

test("keyboard selection, search, max count, clearing and tag removal preserve real focus", async ({ page }) => {
  await page.goto("/#select");
  const single = page.getByRole("combobox", { name: "普通单选", exact: true });
  await single.press("ArrowDown");
  const list = popup(single).getByRole("listbox");
  await expect(popup(single).getByRole("option", { name: "视传 2401", exact: true })).toBeFocused();
  await page.keyboard.press("End");
  await expect(popup(single).getByRole("option", { name: "跨学院人工智能与数字媒体设计联合实验教学班", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(single).toBeFocused();
  await expect(single).toHaveText("跨学院人工智能与数字媒体设计联合实验教学班");
  const before = await frame(single).boundingBox();
  await single.press("Tab");
  const clear = widget(single).getByRole("button", { name: "清除普通单选", exact: true });
  await expect(clear).toBeFocused();
  await clear.press("Enter");
  await expect(single).toBeFocused();
  expect(await frame(single).boundingBox()).toEqual(before);
  const searchable = page.getByRole("combobox", { name: "搜索多选", exact: true });
  await searchable.click();
  const search = popup(searchable).getByRole("combobox", { name: "搜索选项", exact: true });
  await search.fill("数字媒体");
  await expect(popup(searchable).getByRole("option")).toHaveCount(2);
  await search.press("Home");
  await search.press("Enter");
  await expect(popup(searchable).getByRole("option").first()).toHaveAttribute("aria-selected", "true");
  await search.press("Escape");
  await expect(searchable).toBeFocused();
  await searchable.click();
  await expect(search).toHaveValue("");
  await search.press("Escape");
  const max = page.getByRole("combobox", { name: "最多选择两项", exact: true });
  await max.click();
  const menu = popup(max);
  await expect(menu.getByRole("option", { name: "工业设计 2401", exact: true })).toHaveAttribute("aria-disabled", "true");
  await menu.getByRole("option", { name: "视传 2401", exact: true }).click();
  await expect(menu.getByRole("option", { name: "工业设计 2401", exact: true })).not.toHaveAttribute("aria-disabled", "true");
  await menu.getByRole("listbox").press("Escape");
  const tags = widget(page.getByRole("combobox", { name: "32px 标签", exact: true }));
  const remove = tags.getByRole("button", { name: "移除 视传 2401", exact: true });
  await remove.focus();
  await remove.press("Enter");
  await expect(tags.getByRole("button", { name: "移除 数媒 2401", exact: true })).toBeFocused();
  await tags.getByRole("button", { name: "移除 数媒 2401", exact: true }).press("Enter");
  await expect(tags.getByRole("combobox", { name: "32px 标签", exact: true })).toBeFocused();
  const empty = page.getByRole("combobox", { name: "暂无选项", exact: true });
  await empty.click();
  await expect(popup(empty).getByText("暂无选项", { exact: true })).toBeVisible();
  await page.getByRole("heading", { name: "Select 选择器", exact: true }).click();
  await expect(empty).toHaveAttribute("aria-expanded", "false");
});

test("remote results, retry and form drafts keep selected metadata and pending edits separate", async ({ page }) => {
  await page.clock.install();
  await page.goto("/#select");
  const remote = page.getByRole("combobox", { name: "远程教学班", exact: true });
  await remote.click();
  const search = popup(remote).getByRole("combobox", { name: "搜索选项", exact: true });
  await search.fill("A");
  await page.clock.runFor(50);
  await search.fill("B");
  await page.clock.runFor(200);
  await expect(popup(remote).getByRole("option", { name: "B 班", exact: true })).toBeVisible();
  await page.clock.runFor(1000);
  await expect(popup(remote).getByRole("option")).toHaveCount(1);
  await expect(remote).toHaveAccessibleDescription(/视传 2401/);
  await search.fill("失败");
  await page.clock.runFor(200);
  await expect(popup(remote).getByText("加载失败，请重试", { exact: true })).toBeVisible();
  await popup(remote).getByRole("button", { name: "重试", exact: true }).click();
  await page.clock.runFor(200);
  await expect(popup(remote).getByRole("option", { name: "恢复后的班级", exact: true })).toBeVisible();
  await search.press("Escape");
  const draft = page.getByTestId("select-draft");
  const control = draft.getByRole("combobox", { name: "课程教学班", exact: true });
  await control.click();
  await popup(control).getByRole("option", { name: /数媒 2401/ }).click();
  await popup(control).getByRole("listbox").press("Escape");
  await expect(page.getByTestId("select-saved")).toHaveText("已保存：视传 2401");
  await draft.getByRole("button", { name: "取消修改", exact: true }).click();
  await expect(control).toHaveAccessibleDescription(/已选：视传 2401$/);
  await control.click();
  await popup(control).getByRole("option", { name: /数媒 2401/ }).click();
  await popup(control).getByRole("listbox").press("Escape");
  await draft.getByRole("button", { name: "保存修改", exact: true }).click();
  await expect(page.getByTestId("select-saved")).toHaveText("已保存：视传 2401、数媒 2401");
});

test("narrow viewports wrap tags, retain summaries and expose non-overlapping touch targets", async ({ browser, baseURL }, testInfo) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 360, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/#select");
  for (const width of [320, 360, 736]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => innerWidth)).toBe(width);
    const long = page.getByRole("combobox", { name: "长名称摘要", exact: true });
    await expect(long).toHaveAccessibleDescription(/跨学院人工智能与数字媒体设计联合实验教学班/);
    const control = page.getByRole("combobox", { name: "长名称标签", exact: true });
    const targets = frame(control).locator("button");
    const boxes = await targets.evaluateAll((nodes) => nodes.map((node) => { const { x, y, width, height } = node.getBoundingClientRect(); return { x, y, width, height }; }));
    for (let i = 0; i < boxes.length; i++) {
      const a = boxes[i]!;
      expect(a.width).toBeGreaterThanOrEqual(44); expect(a.height).toBeGreaterThanOrEqual(44);
      for (const b of boxes.slice(i + 1)) expect(Math.min(a.x + a.width, b.x + b.width) <= Math.max(a.x, b.x) || Math.min(a.y + a.height, b.y + b.height) <= Math.max(a.y, b.y)).toBe(true);
    }
    await expect(widget(control).getByRole("button", { name: "清除长名称标签", exact: true })).toHaveCSS("opacity", "1");
    const searchable = page.getByRole("combobox", { name: "搜索多选", exact: true });
    await searchable.tap();
    const search = popup(searchable).getByRole("combobox", { name: "搜索选项", exact: true });
    await search.fill("视传");
    expect((await popup(searchable).getByRole("option").first().boundingBox())!.height).toBeGreaterThanOrEqual(44);
    const clearSearch = frame(search).getByRole("button", { name: "清除搜索选项", exact: true });
    await expect(frame(search)).toHaveCSS("height", "32px");
    await expect(clearSearch).toHaveCSS("width", "24px");
    await expect(clearSearch).toHaveCSS("height", "24px");
    const searchBox = (await frame(search).boundingBox())!, clearBox = (await clearSearch.boundingBox())!;
    expect(clearBox.y).toBeGreaterThanOrEqual(searchBox.y);
    expect(clearBox.y + clearBox.height).toBeLessThanOrEqual(searchBox.y + searchBox.height);
    await clearSearch.tap();
    await expect(search).toHaveValue("");
    await expect(search).toBeFocused();
    await expect(searchable).toHaveAccessibleDescription(/视传 2401/);
    await search.press("Escape");
  }
  await page.setViewportSize({ width: 360, height: 844 });
  await page.screenshot({ path: testInfo.outputPath("compact.png"), fullPage: true });
  await context.close();
});
