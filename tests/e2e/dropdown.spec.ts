import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Locator, type Page } from "@playwright/test";
const saveEvidence = process.env.RAIN_UPDATE_DROPDOWN_EVIDENCE === "1";

test.beforeEach(async ({ page }) => { await page.goto("/#dropdown"); });

test("template composition supports search, native selection, favorite, failure and retry", async ({ page }) => {
  await page.getByRole("button", { name: "浏览模板", exact: true }).click();
  const panel = page.getByRole("dialog", { name: "选择学习模板" });
  await expect(panel.getByRole("tablist", { name: "模板分类" })).toBeVisible();
  await expect(panel.getByRole("tab", { name: "全部", exact: true })).toHaveCSS("height", "28px");
  await expect(panel.getByRole("textbox", { name: "搜索模板" }).locator("xpath=..")).toHaveCSS("height", "24px");
  await expect(panel.getByRole("button", { name: "创建学习单元", exact: true })).toHaveAttribute("data-size", "small");
  await expect(page.getByRole("button", { name: "浏览模板", exact: true })).toHaveAttribute("data-size", "medium");
  await panel.getByRole("tab", { name: "全部", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(panel.getByRole("tab", { name: "数学", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(panel.getByRole("radio")).toHaveCount(2);
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("Enter");
  await expect(panel.getByRole("tab", { name: "讨论", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(panel.getByRole("radio")).toHaveCount(1);
  await page.keyboard.press("Home");
  await page.keyboard.press("Enter");
  await expect(panel.getByRole("tab", { name: "全部", exact: true })).toHaveAttribute("aria-selected", "true");
  await panel.getByRole("textbox", { name: "搜索模板" }).fill("函数");
  await panel.getByText("函数图像练习", { exact: true }).click();
  await panel.getByRole("button", { name: "收藏 函数单元测验", exact: true }).click();
  await expect(panel.getByRole("radio", { name: "函数图像练习", exact: true })).toBeChecked();
  if (saveEvidence) await page.screenshot({ path: "evidence/runtime/dropdown/template.png" });
  await panel.getByRole("button", { name: "创建学习单元", exact: true }).click();
  await expect(panel.getByRole("radio", { name: "函数单元测验", exact: true })).toBeDisabled();
  await expect(panel.getByRole("tab", { name: "全部", exact: true })).toBeDisabled();
  await expect(panel.getByRole("tabpanel", { name: "全部", exact: true })).toBeVisible();
  await expect(panel.getByRole("alert")).toContainText("选择和搜索已保留");
  await expect(panel.getByRole("textbox", { name: "搜索模板" })).toHaveValue("函数");
  await expect(panel.getByRole("radio", { name: "函数图像练习", exact: true })).toBeChecked();
  await expect(panel.getByRole("button", { name: "取消收藏 函数单元测验", exact: true })).toHaveAttribute("aria-pressed", "true");
  await panel.getByRole("tab", { name: "数学", exact: true }).click();
  await expect(panel.getByRole("radio", { name: "函数图像练习", exact: true })).toBeChecked();
  await panel.getByRole("button", { name: "重试创建" }).click();
  await expect(panel).toBeHidden();
  await expect(page.getByTestId("dropdown-event")).toHaveText("已创建：函数图像练习");
});

test("menu keyboard navigation, submenu Escape and Tab preserve focus ownership", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "课程更多" });
  await trigger.focus(); await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem", { name: "查看课程", exact: true })).toBeFocused();
  await page.keyboard.press("End"); await expect(page.getByRole("menuitem", { name: "删除课程", exact: true })).toBeFocused();
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown");
  const submenuTrigger = page.getByRole("menuitem", { name: "导出", exact: true });
  await expect(submenuTrigger).toBeFocused(); await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toBeFocused();
  await page.keyboard.press("Escape"); await expect(submenuTrigger).toBeFocused();
  await expect(page.getByRole("menu")).toHaveCount(1);
  await page.keyboard.press("Tab"); await expect(page.getByRole("menu")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "视图设置", exact: true })).toBeFocused();
});

test("recipe and item close policies work for mouse, keyboard and native settings", async ({ page }) => {
  await page.getByText("操作后关闭", { exact: true }).click();
  await page.getByRole("button", { name: "课程更多" }).click();
  await page.getByRole("menuitem", { name: "复制课程", exact: true }).click();
  await expect(page.getByRole("menu")).toBeVisible();
  await page.keyboard.press("Enter"); await expect(page.getByRole("menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "视图设置", exact: true }).click();
  await page.getByRole("menuitemcheckbox", { name: "显示已归档", exact: true }).click();
  await expect(page.getByRole("menuitemcheckbox", { name: "显示已归档", exact: true })).toHaveAttribute("aria-checked", "true");
  await page.getByRole("menuitemradio", { name: "按名称排序", exact: true }).click();
  await expect(page.getByRole("menuitemradio", { name: "按名称排序", exact: true })).toHaveAttribute("aria-checked", "true");
  await page.getByRole("menuitem", { name: "完成设置" }).click(); await expect(page.getByRole("menu")).toHaveCount(0);
  await page.getByRole("button", { name: "视图设置面板版" }).click();
  const panel = page.getByRole("dialog", { name: "视图设置面板", exact: true });
  await expect(panel.getByRole("checkbox")).toBeChecked(); await expect(panel.getByRole("radio", { name: "按名称排序" })).toBeChecked();
  await page.getByRole("textbox", { name: "菜单外输入" }).click(); await expect(panel).toBeHidden();
  await expect(page.getByRole("textbox", { name: "菜单外输入" })).toBeFocused();
});

test("menu hands focus to Dialog and template panel, then returns to the originating trigger", async ({ page }) => {
  const course = page.getByRole("button", { name: "课程更多" });
  await course.click(); await page.getByRole("menuitem", { name: "删除课程", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "删除课程", exact: true });
  await expect(dialog).toBeVisible(); await expect(dialog.getByRole("button", { name: "取消" })).toBeFocused();
  await page.keyboard.press("Escape"); await expect(course).toBeFocused();
  const typeTrigger = page.getByRole("button", { name: "新建学习单元", exact: true });
  await typeTrigger.click(); await page.getByRole("menuitem", { name: "从模板新建", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "搜索模板" })).toBeFocused();
  await page.keyboard.press("Escape"); await expect(typeTrigger).toBeFocused();
});

test("pointer submenu works and pressed paints take priority over hover", async ({ page }) => {
  await page.getByRole("button", { name: "课程更多" }).click();
  const confirmation = page.getByRole("menuitem", { name: "查看组件说明", exact: true }).locator('[data-slot="confirmation"]');
  await expect(confirmation).toHaveCSS("width", "16px"); await expect(confirmation.locator('.rain-icon')).toHaveCSS("width", "10px");
  await page.getByRole("menuitem", { name: "导出", exact: true }).hover();
  await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toBeVisible();
  await page.getByRole("menuitem", { name: "查看课程", exact: true }).hover();
  await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toHaveCount(0);
  for (const name of ["查看课程", "删除课程"]) {
    const item = page.getByRole("menuitem", { name, exact: true });
    await item.hover(); const hover = await item.evaluate(el => getComputedStyle(el).backgroundColor);
    await page.mouse.down(); const pressed = await item.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(pressed).not.toBe(hover);
    await page.mouse.move(1, 1); await page.mouse.up();
  }
});

for (const theme of ["light", "dark"] as const) test(`${theme} retains selected disabled hierarchy and real compact density`, async ({ page }, testInfo) => {
  if (theme === "dark") await page.getByRole("button", { name: "深色", exact: true }).click();
  await page.getByRole("button", { name: "紧凑密度" }).click();
  await page.getByRole("button", { name: "视图设置", exact: true }).click();
  const item = page.getByRole("menuitemcheckbox", { name: "保留教师资料", exact: true });
  await expect(item).toHaveAttribute("aria-checked", "true"); await expect(item).toHaveAttribute("aria-disabled", "true");
  await expect(item).toHaveAccessibleDescription("管理员已锁定此项，当前设置仍然生效。");
  const styles = await item.evaluate(el => {
    const label = getComputedStyle(el.querySelector('[data-slot="label"]')!);
    const description = getComputedStyle(el.querySelector('[data-slot="description"]')!);
    const portal = el.closest('.rain-popup-positioner')!;
    return { labelColor: label.color, labelWeight: label.fontWeight, labelSize: label.fontSize, labelLine: label.lineHeight,
      descriptionColor: description.color, descriptionWeight: description.fontWeight, descriptionSize: description.fontSize, descriptionLine: description.lineHeight,
      theme: portal.getAttribute('data-rain-theme'), height: getComputedStyle(portal).getPropertyValue('--rain-density-control-height').trim() };
  });
  expect(styles).toMatchObject({ labelWeight: "600", labelSize: "15px", labelLine: "22px", descriptionWeight: "400", descriptionSize: "13px", descriptionLine: "18px", theme, height: "30px" });
  expect(styles.labelColor).toBe(styles.descriptionColor); // Critical reason uses the stronger selected text Token.
  if (saveEvidence) await page.screenshot({ path: `evidence/runtime/dropdown/menu-${theme}.png` });
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "紧凑密度" }).click();
  const trigger = page.getByRole("button", { name: "浏览模板", exact: true });
  await expect(trigger).toHaveAttribute("data-size", "medium");
  await trigger.click();
  const panel = page.getByRole("dialog", { name: "选择学习模板" });
  const input = panel.getByRole("textbox", { name: "搜索模板" });
  await expect(input.locator("xpath=..")).toHaveCSS("height", "24px");
  await expect(panel.getByRole("tab", { name: "全部", exact: true })).toHaveCSS("height", "28px");
  await expect(panel.getByRole("button", { name: "创建学习单元", exact: true })).toHaveAttribute("data-size", "small");
  const directory = process.env.RAIN_CLOSURE_EVIDENCE_DIR;
  if (directory) mkdirSync(directory, { recursive: true });
  const artifact = (name: string) => directory ? join(directory, name) : testInfo.outputPath(name);
  const facts = await panel.evaluate(element => {
    const box = (el: Element) => { const css = getComputedStyle(el); return { width: css.width, height: css.height, fontSize: css.fontSize, lineHeight: css.lineHeight }; };
    return { panel: box(element), density: element.querySelector('[data-density]')?.getAttribute('data-density'),
      input: box(element.querySelector('[data-rain-id="ui-input"]')!), tab: box(element.querySelector('[role="tab"]')!),
      button: box(element.querySelector('footer button')!), favorite: box(element.querySelector('.dropdown-template-row button')!),
      label: box(element.querySelector('.dropdown-template-radio [data-slot="label"]')!), description: box(element.querySelector('.dropdown-template-radio [data-slot="description"]')!),
      placeholder: getComputedStyle(element.querySelector('input')!, '::placeholder').color, horizontalOverflow: element.scrollWidth > element.clientWidth };
  });
  expect(facts).toMatchObject({ density: "compact", horizontalOverflow: false, label: { fontSize: "13px", lineHeight: "20px" }, description: { fontSize: "12px", lineHeight: "18px" } });
  await panel.screenshot({ path: artifact(`popover-compact-${theme}.png`) });
  writeFileSync(artifact(`popover-compact-${theme}.json`), JSON.stringify({ theme, pageDensity: "default", triggerSize: "medium", facts }, null, 2));
});

test("narrow template panel keeps its action visible and supports empty categories", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 480 });
  await page.getByRole("button", { name: "浏览模板", exact: true }).click();
  const panel = page.getByRole("dialog", { name: "选择学习模板" });
  const bounds = await panel.boundingBox(); expect(bounds!.x).toBeGreaterThanOrEqual(7); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(313);
  await panel.getByRole("button", { name: "收藏 课堂观点讨论", exact: true }).focus();
  await expect(panel.getByRole("button", { name: "收藏 课堂观点讨论", exact: true })).toBeInViewport();
  if (saveEvidence) await page.screenshot({ path: "evidence/runtime/dropdown/narrow.png" });
  await panel.getByRole("tab", { name: "讨论", exact: true }).click();
  await expect(panel.getByRole("radio")).toHaveCount(1);
  await panel.getByRole("textbox", { name: "搜索模板" }).fill("不存在的模板");
  await expect(panel.getByRole("status")).toContainText("没有匹配");
  await expect(panel.getByRole("button", { name: "创建学习单元", exact: true })).toBeInViewport();
  expect(await panel.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
});

test("compact template keeps coarse pointer targets inside a narrow panel", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 320, height: 480 }, hasTouch: true, isMobile: true });
  try {
    const page = await context.newPage();
    await page.goto("/#dropdown");
    await page.getByRole("button", { name: "浏览模板", exact: true }).tap();
    const panel = page.getByRole("dialog", { name: "选择学习模板" });
    const favorite = panel.getByRole("button", { name: "收藏 函数图像练习", exact: true });
    await expect(favorite).toHaveCSS("min-width", "44px");
    await expect(favorite).toHaveCSS("min-height", "44px");
    await favorite.tap();
    await expect(panel.getByRole("button", { name: "取消收藏 函数图像练习", exact: true })).toHaveAttribute("aria-pressed", "true");
    await panel.getByRole("tab", { name: "讨论", exact: true }).tap();
    await expect(panel.getByRole("radio")).toHaveCount(1);
    await expect(panel.getByRole("button", { name: "创建学习单元", exact: true })).toBeInViewport();
    expect(await panel.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  } finally { await context.close(); }
});

test("forced colors preserve a visible selected marker and focus", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active" });
  await page.getByRole("button", { name: "视图设置", exact: true }).focus(); await page.keyboard.press("ArrowDown");
  const checked = page.getByRole("menuitemcheckbox", { name: "保留教师资料", exact: true });
  await expect(checked.locator('[data-slot="indicator"] .rain-icon')).toHaveCSS("visibility", "visible");
  const paints = await checked.evaluate(el => ({ surface: getComputedStyle(el.closest('[role="menu"]')!).backgroundColor,
    mark: getComputedStyle(el.querySelector('[data-slot="control"]')!).color }));
  expect(paints.mark).not.toBe(paints.surface);
  const focused = page.getByRole("menuitemcheckbox", { name: "显示已归档", exact: true });
  await expect(focused).toBeFocused(); await expect(focused).not.toHaveCSS("outline-style", "none");
});

const selectionPaint = (row: Locator) => row.locator('[data-slot="control"]').evaluate(control => {
  const css = getComputedStyle(control), canvas = getComputedStyle(control.parentElement!), halo = getComputedStyle(control.parentElement!, "::before");
  const mark = control.firstElementChild, marker = mark && getComputedStyle(mark);
  return { width: css.width, height: css.height, radius: css.borderRadius, borderWidth: css.borderWidth,
    background: css.backgroundColor, border: css.borderColor, color: css.color,
    canvas: [canvas.width, canvas.height], halo: [halo.width, halo.height, halo.borderRadius, halo.backgroundColor],
    mark: marker ? [marker.width, marker.height, marker.backgroundColor, marker.color] : null };
});
const selectionBackgrounds = (row: Locator) => row.evaluate(element => {
  const paints: string[] = [];
  for (let node: Element | null = element; node; node = node.parentElement) paints.push(getComputedStyle(node).backgroundColor);
  return paints;
});
async function selectionStates(page: Page, row: Locator, backgrounds?: Record<string, string[]>) {
  const normal = await selectionPaint(row);
  if (backgrounds) backgrounds.normal = await selectionBackgrounds(row);
  await row.hover(); const hover = await selectionPaint(row);
  if (backgrounds) backgrounds.hover = await selectionBackgrounds(row);
  await page.mouse.down(); const pressed = await selectionPaint(row);
  if (backgrounds) backgrounds.pressed = await selectionBackgrounds(row);
  await page.mouse.move(0, 0); await page.mouse.up();
  return { normal, hover, pressed };
}

for (const theme of ["light", "dark"] as const) test(`menu reuses native choice geometry and state paints in ${theme}`, async ({ page }) => {
  const native = await page.context().newPage();
  const facts: unknown[] = [];
  try {
    if (theme === "dark") await page.getByRole("button", { name: "深色", exact: true }).click();
    await page.getByRole("button", { name: "视图设置", exact: true }).click();
    const finish = page.getByRole("menuitem", { name: "完成设置", exact: true });
    for (const kind of ["checkbox", "radio"] as const) {
      await native.goto(`/#${kind}`);
      if (theme === "dark") await native.getByRole("button", { name: "深色", exact: true }).click();
      for (const checked of [false, true]) {
        const nativeInput = native.getByRole(kind, { name: kind === "checkbox" ? "接收课程通知" : checked ? "仅展示标题" : "展示标题和简介", exact: true });
        if (kind === "checkbox" && checked) await nativeInput.locator("..").click();
        await native.mouse.move(0, 0);
        const original = await selectionStates(native, nativeInput.locator(".."));
        const item = page.getByRole(`menuitem${kind}`, { name: kind === "checkbox" ? "显示已归档" : checked ? "按时间排序" : "按名称排序", exact: true });
        if (kind === "checkbox" && checked) await item.click();
        await finish.hover();
        const menuBackgrounds: Record<string, string[]> = {};
        const menu = await selectionStates(page, item, menuBackgrounds);
        expect(menu).toEqual(original);
        expect(menu.normal.canvas).toEqual(["24px", "24px"]);
        expect([menu.normal.width, menu.normal.height]).toEqual(kind === "checkbox" ? ["16px", "16px"] : ["18px", "18px"]);
        expect(menu.normal.mark?.slice(0, 2) ?? null).toEqual(checked ? kind === "checkbox" ? ["10px", "10px"] : ["6px", "6px"] : null);
        await expect(item).toHaveAttribute("aria-checked", String(checked));
        await expect(item.locator("input, label, button, [tabindex]")).toHaveCount(0);
        facts.push({ theme, kind, checked, original, menu, menuBackgrounds });
      }
      if (kind === "checkbox") {
        await finish.hover(); await native.mouse.move(0, 0);
        const original = await selectionStates(native, native.getByRole("checkbox", { name: "已选择且锁定", exact: true }).locator(".."));
        const item = page.getByRole("menuitemcheckbox", { name: "保留教师资料", exact: true });
        const menuBackgrounds: Record<string, string[]> = {};
        const menu = await selectionStates(page, item, menuBackgrounds);
        expect(menu).toEqual(original); expect(menu.hover).toEqual(menu.normal); expect(menu.pressed).toEqual(menu.normal);
        facts.push({ theme, kind, checked: true, disabled: true, original, menu, menuBackgrounds });
      }
      await page.emulateMedia({ forcedColors: "active" }); await native.emulateMedia({ forcedColors: "active" });
      await finish.hover(); await native.mouse.move(0, 0);
      const originalForced = await selectionPaint(native.getByRole(kind, { name: kind === "checkbox" ? "接收课程通知" : "仅展示标题", exact: true }).locator(".."));
      const menuForced = await selectionPaint(page.getByRole(`menuitem${kind}`, { name: kind === "checkbox" ? "显示已归档" : "按时间排序", exact: true }));
      expect(menuForced).toEqual(originalForced); expect(menuForced.color).not.toBe(menuForced.background);
      facts.push({ theme, kind, forcedColors: true, original: originalForced, menu: menuForced });
      await page.emulateMedia({ forcedColors: "none" }); await native.emulateMedia({ forcedColors: "none" });
    }
    await finish.hover(); await page.mouse.move(0, 0);
    if (process.env.RAIN_UPDATE_DROPDOWN_SELECTION_EVIDENCE === "1") {
      await page.getByRole("menu").screenshot({ path: `evidence/runtime/dropdown/selection-${theme}.png` });
      writeFileSync(`evidence/runtime/dropdown/selection-${theme}.json`, JSON.stringify(facts, null, 2) + "\n");
    }
  } finally { await native.close(); }
});

for (const theme of ["light", "dark"] as const) test(`${theme} menu description closure preserves protected state priorities`, async ({ page }) => {
  test.setTimeout(60_000);
  const variants = ["default", "danger"].flatMap(tone => [false, true].flatMap(disabled =>
    [false, true].flatMap(critical => ["none", "selected", "checked"].map(selection => ({
      tone, disabled, critical, selection, name: `${tone}-${disabled}-${critical}-${selection}`,
    })))));
  // Mount public React components with actual props; no synthetic state attributes or color overrides.
  await page.evaluate(async ({ theme, variants }) => {
    const main = await fetch("/src/main.tsx").then(response => response.text());
    const reactUrl = main.match(/from "([^"]+\/react\.js[^"]*)"/)?.[1];
    const domUrl = main.match(/from "([^"]+\/react-dom_client\.js[^"]*)"/)?.[1];
    const uiSource = main.match(/"([^"]+\/packages\/ui\/src\/)styles\.css[^"]*"/)?.[1];
    if (!reactUrl || !domUrl || !uiSource) throw new Error("Cannot resolve the playground's React and public UI modules.");
    const [{ default: React }, { default: ReactDOM }, { DropdownMenu: Menu }, { ArrowRightIcon }] = await Promise.all([
      import(reactUrl), import(domUrl), import(`${uiSource}index.ts`), import(`${uiSource}icons/arrow-right.tsx`),
    ]);
    document.getElementById("root")!.style.display = "none";
    const host = document.createElement("div");
    host.dataset.rainTheme = theme;
    host.style.cssText = "position:fixed;inset:24px;display:flex;flex-wrap:wrap;align-content:flex-start;gap:8px";
    document.body.append(host);
    const h = React.createElement;
    ReactDOM.createRoot(host).render(h(React.Fragment, null, ...variants.map(({ name, selection, ...appearance }) =>
      h(Menu.Root, { key: name, closeOnAction: false },
        h(Menu.Trigger, null, `Open ${name}`),
        h(Menu.Content, null,
          h(Menu.Item, { label: "State parking" }),
          h(selection === "checked" ? Menu.CheckboxItem : Menu.Item, {
            ...appearance, label: name, description: "说明文字保持相应语义层级。", leading: h(ArrowRightIcon),
            ...(selection === "checked" ? { checked: true } : { selected: selection === "selected" }),
          }),
        ),
      ),
    )));
  }, { theme, variants });
  const facts: unknown[] = [];
  const evidenceDir = process.env.RAIN_CLOSURE_EVIDENCE_DIR;
  if (evidenceDir) mkdirSync(evidenceDir, { recursive: true });
  for (const variant of variants) {
    const { name, tone, disabled, critical, selection } = variant;
    const trigger = page.getByRole("button", { name: `Open ${name}`, exact: true });
    await trigger.focus(); await page.keyboard.press("ArrowDown");
    const menu = page.getByRole("menu", { name: `Open ${name}`, exact: true });
    const row = menu.getByRole(selection === "checked" ? "menuitemcheckbox" : "menuitem", { name, exact: true });
    await expect(menu).toBeVisible();
    await expect(menu.locator("..")).toHaveAttribute("data-rain-theme", theme);
    await expect(menu.getByRole("menuitem", { name: "State parking", exact: true })).toBeFocused();
    const palette = await row.evaluate(element => {
      const probe = document.createElement("span");
      probe.hidden = true; element.append(probe);
      const paints = Object.fromEntries([
        "text-neutral-3", "text-neutral-4", "text-neutral-6", "text-brand-1", "text-brand-2", "text-red-1",
        "icon-neutral-2", "icon-neutral-5", "icon-brand-1", "icon-red-1",
        "fill-neutral-alpha-5", "fill-neutral-alpha-6", "fill-red-alpha-1", "fill-red-alpha-2",
      ].map(token => { probe.style.color = `var(--rain-category-${token})`; return [token, getComputedStyle(probe).color]; }));
      probe.remove(); return paints;
    });
    const chosen = selection !== "none";
    const expected = {
      label: palette[chosen ? "text-brand-1" : disabled ? "text-neutral-6" : tone === "danger" ? "text-red-1" : "text-neutral-3"],
      icon: palette[chosen ? "icon-brand-1" : disabled ? "icon-neutral-5" : tone === "danger" ? "icon-red-1" : "icon-neutral-2"],
      description: palette[chosen ? critical ? "text-brand-1" : "text-brand-2" : critical ? "text-neutral-3" : disabled || tone === "danger" ? "text-neutral-4" : "text-neutral-3"],
    };
    const readPaint = () => row.evaluate(element => ({
      label: getComputedStyle(element.querySelector('[data-slot="label"]')!).color,
      icon: getComputedStyle(element.querySelector('[data-slot="leading"]')!).color,
      description: getComputedStyle(element.querySelector('[data-slot="description"]')!).color,
      background: getComputedStyle(element).backgroundColor,
    }));
    const states: Record<string, Awaited<ReturnType<typeof readPaint>>> = {};
    await page.mouse.move(0, 0);
    states.normal = await readPaint();
    expect(states.normal, `${name}: normal`).toEqual({ ...expected, background: "rgba(0, 0, 0, 0)" });
    if (!disabled) {
      await page.keyboard.press("ArrowDown");
      await expect(row).toBeFocused(); await expect(row).toHaveAttribute("data-highlighted", "");
      states.highlighted = await readPaint();
    } else {
      await expect(row).toHaveAttribute("aria-disabled", "true");
    }
    if (selection === "checked") await expect(row).toHaveAttribute("aria-checked", "true");
    if (selection === "selected") await expect(row).toHaveAttribute("data-selected", "true");
    await row.hover(); states.hover = await readPaint();
    await page.mouse.down(); states.pressed = await readPaint();
    await page.mouse.move(0, 0); await page.mouse.up();
    for (const [state, paint] of Object.entries(states).filter(([state]) => state !== "normal")) {
      const fill = tone === "danger" ? state === "pressed" ? "fill-red-alpha-1" : "fill-red-alpha-2"
        : state === "pressed" ? "fill-neutral-alpha-5" : "fill-neutral-alpha-6";
      expect(paint, `${name}: ${state}`).toEqual({ ...expected, background: disabled ? "rgba(0, 0, 0, 0)" : palette[fill] });
    }
    facts.push({ theme, ...variant, expected, states });
    if (evidenceDir && !disabled && !critical && selection === "none") {
      await row.hover();
      await menu.screenshot({ path: join(evidenceDir, `implemented-dropdown-${theme}-${tone}.png`) });
    }
    await page.keyboard.press("Escape"); await expect(menu).toBeHidden();
  }
  if (evidenceDir) writeFileSync(join(evidenceDir, `implemented-dropdown-${theme}.json`), JSON.stringify(facts, null, 2) + "\n");
});
