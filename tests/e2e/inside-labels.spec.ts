import { expect, test, type Locator } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const frame = (field: Locator) => field.locator('[data-rain-id="ui-input"], [data-rain-id="ui-select"] > [data-slot="frame"]');
const label = (field: Locator) => field.locator('label[data-label-position="inside"]');

for (const theme of ["light", "dark"] as const) test(`inside labels retain geometry, native naming and actions in ${theme}`, async ({ page, browserName }, info) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.setViewportSize({ width: 1200, height: 1000 });
  await page.goto("/#table");
  await expect(page).toHaveURL(/\/#table$/);
  await expect(page).toHaveTitle("Rain Next Foundation Spike");
  await expect(page.getByRole("heading", { name: "表格与数据管理", exact: true })).toBeVisible();
  await expect(page.locator("vite-error-overlay")).toHaveCount(0);
  await page.evaluate(async ({ theme, uiPath }) => {
    const reactPath = "/node_modules/.vite/deps/react.js", clientPath = "/node_modules/.vite/deps/react-dom_client.js";
    const { createElement: h } = (await import(reactPath)).default;
    const { createRoot } = (await import(clientPath)).default;
    const { Input, SearchInput, Select, FormItem } = await import(uiPath);
    document.getElementById("root")!.style.display = "none";
    const host = document.createElement("section");
    host.id = "inside-label-fixture"; host.setAttribute("data-rain-theme", theme);
    host.style.cssText = "padding:16px;background:var(--rain-category-background-neutral-1);color:var(--rain-category-text-neutral-1);font-family:var(--rain-font-ui)";
    document.body.append(host);
    const options = [{ value: "a", label: "设计课" }, { value: "b", label: "观察课" }, { value: "c", label: "实践课" }];
    const names = { input: "资料名称", search: "查找资料", single: "发布状态", summary: "教学班名称", count: "计数班级" };
    const field = (kind: keyof typeof names, appearance: string, size: number, extra: Record<string, unknown> = {}) => {
      const props = { appearance, size, ...extra };
      const component = kind === "input" ? h(Input, { ...props, clearable: true, defaultValue: "已有资料", placeholder: "输入资料名称" })
        : kind === "search" ? h(SearchInput, { ...props, placeholder: "输入资料名称", onSearch: (value: string, meta: { source: string }) => {
          host.setAttribute("data-last-search", JSON.stringify({ value, source: meta.source }));
        } }) : h(Select, { ...props, options, searchable: kind === "single", multiple: kind !== "single", display: kind === "single" ? undefined : kind === "count" ? "count" : "summary",
          defaultValue: kind === "single" ? "a" : ["a", "b", "c"] });
      return h("div", { key: kind, "data-field": kind }, h(FormItem, { label: names[kind], labelPosition: "inside" }, component));
    };
    const cells = ["outlined", "filled", "underlined"].flatMap(appearance => [28, 32].map(size => h("section", {
      key: `${appearance}-${size}`, "data-cell": `${appearance}-${size}`, style: { display: "grid", gap: "12px", alignContent: "start", minWidth: 0 },
    }, h("h2", { style: { fontSize: "14px", margin: 0 } }, `${appearance} ${size}px`), ...Object.keys(names).map(kind => field(kind as keyof typeof names, appearance, size)))));
    cells.push(h("section", { key: "retained", "data-retained": true, style: { display: "grid", gap: "12px", minWidth: 0, alignContent: "start" } },
      h(FormItem, { label: "普通表单" }, h(Input, { size: 32, defaultValue: "保留上方标题" })),
      h(FormItem, { label: "原有标签" }, h(Select, { options, multiple: true, display: "tags", size: 32, defaultValue: ["a", "b"] })),
      ...["readOnly", "disabled"].flatMap(permission => ["input", "single"].map(kind => h("div", { key: `${permission}-${kind}`, "data-permission-case": `${permission}-${kind}` }, field(kind as keyof typeof names, "outlined", 32, { [permission]: true }))))));
    cells.push(h("section", { key: "long", "data-long": true, style: { display: "grid", gap: "12px", minWidth: 0, alignContent: "start" } },
      ...[24, 36].flatMap(size => [Input, Select].map((Component, index) => h("div", { key: `${size}-${index}`, "data-long-field": `${size}-${index}` },
        h(FormItem, { label: "特别长的课程资料筛选字段标题", labelPosition: "inside", required: true }, h(Component, index === 0
          ? { size, defaultValue: "值仍然可见" } : { options, size, multiple: true, defaultValue: ["a", "b", "c"] })))))));
    createRoot(host, { identifierPrefix: "inside-label-fixture-" }).render(h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "24px" } }, ...cells));
  }, { theme, uiPath: `/@fs${new URL("../../packages/ui/src/index.ts", import.meta.url).pathname}` });
  const host = page.locator("#inside-label-fixture");
  await expect(host.locator("[data-cell]")).toHaveCount(6);
  const directory = resolve(process.env.RAIN_INSIDE_LABEL_EVIDENCE_DIR ?? "/tmp/rain-inside-label-browser", info.project.name);
  mkdirSync(directory, { recursive: true });
  const measurements = [];
  for (const cell of await host.locator("[data-cell]").all()) {
    const size = Number((await cell.getAttribute("data-cell"))!.split("-")[1]);
    for (const field of await cell.locator("[data-field]").all()) {
      await expect(label(field)).toHaveCount(1);
      const control = field.locator('input:not([aria-hidden="true"]), button[role="combobox"]');
      await expect(control).toHaveAccessibleName((await label(field).innerText()).trim());
      await expect(frame(field)).toHaveCSS("height", `${size}px`);
      await expect(label(field)).toHaveCSS("color", theme === "light" ? "rgb(86, 104, 143)" : "rgb(148, 156, 184)");
      await expect(control).toHaveCSS("color", theme === "light" ? "rgb(20, 35, 70)" : "rgb(239, 241, 245)");
      const box = await frame(field).boundingBox(), title = await label(field).boundingBox(), value = await control.boundingBox();
      expect(title!.x).toBeGreaterThan(box!.x);
      expect(title!.y).toBeGreaterThanOrEqual(box!.y);
      expect(title!.y + title!.height).toBeLessThanOrEqual(box!.y + box!.height);
      expect(title!.x + title!.width).toBeLessThanOrEqual(value!.x);
      expect(value!.width).toBeGreaterThan(25);
      measurements.push({ cell: await cell.getAttribute("data-cell"), field: await field.getAttribute("data-field"), frame: box, label: title, value });
    }
  }
  await host.screenshot({ path: resolve(directory, `${theme}-matrix.png`), animations: "disabled" });

  const representative = host.locator('[data-cell="outlined-32"]');
  const input = representative.locator('[data-field="input"]');
  await label(input).click();
  await expect(input.getByRole("textbox", { name: "资料名称", exact: true })).toBeFocused();
  await page.keyboard.type("补充");
  // Safari uses Option+Tab to include buttons when system full keyboard access is off.
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  await expect(input.getByRole("button", { name: "清除资料名称", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(input.getByRole("textbox")).toHaveValue("");
  await expect(input.getByRole("textbox")).toBeFocused();
  await expect(label(input)).toHaveText("资料名称");
  const search = representative.locator('[data-field="search"]');
  await label(search).click();
  await expect(search.getByRole("textbox")).toBeFocused();
  await search.getByRole("textbox").fill("设计");
  await search.getByRole("textbox").press("Enter");
  await expect(host).toHaveAttribute("data-last-search", JSON.stringify({ value: "设计", source: "enter" }));
  await search.getByRole("button", { name: "搜索", exact: true }).click();
  await expect(host).toHaveAttribute("data-last-search", JSON.stringify({ value: "设计", source: "button" }));
  await search.getByRole("button", { name: "清除查找资料", exact: true }).click();
  await expect(host).toHaveAttribute("data-last-search", JSON.stringify({ value: "", source: "clear" }));
  await expect(label(search)).toHaveText("查找资料");
  const single = representative.locator('[data-field="single"]');
  await label(single).click();
  await expect(single.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
  const popup = page.locator('[data-rain-id="ui-select-popup"]');
  await expect(popup.getByRole("combobox", { name: "搜索选项", exact: true })).toBeFocused();
  await popup.getByRole("combobox", { name: "搜索选项", exact: true }).fill("观察");
  await page.keyboard.press("Enter");
  await expect(single.getByRole("combobox")).toBeFocused();
  await expect(single.getByRole("combobox")).toContainText("观察课");
  await single.getByRole("button", { name: "清除发布状态", exact: true }).click();
  await expect(single.getByRole("combobox")).toContainText("请选择");
  await expect(label(single)).toHaveText("发布状态");
  const summary = representative.locator('[data-field="summary"]');
  await expect(summary.getByRole("combobox")).toHaveAccessibleDescription("已选：设计课、观察课、实践课");
  await expect(summary.getByRole("combobox").locator('[data-slot="value"]')).toContainText(/\+\d|已选 3 项/);
  await expect(representative.locator('[data-field="count"]').getByRole("combobox")).toContainText("已选 3 项");
  await label(summary).click();
  await page.keyboard.press("Escape");
  await expect(summary.getByRole("combobox")).toBeFocused();
  await summary.getByRole("button", { name: "清除教学班名称", exact: true }).click();
  await expect(frame(summary)).toHaveCSS("height", "32px");
  await expect(label(summary)).toHaveText("教学班名称");

  const retained = host.locator("[data-retained]");
  const top = retained.getByRole("textbox", { name: "普通表单", exact: true });
  expect(await top.evaluate(node => node.closest('[data-rain-id="ui-input"]')!.querySelector("label"))).toBeNull();
  await expect(retained.locator('[data-rain-id="ui-tag"]')).toHaveCount(2);
  for (const permission of ["readOnly", "disabled"]) for (const kind of ["input", "single"]) {
    const field = retained.locator(`[data-permission-case="${permission}-${kind}"]`), control = field.locator('input:not([aria-hidden="true"]), button[role="combobox"]');
    // Exercise the actual ignored/native click even when Playwright retargets the label to an aria-disabled control.
    await label(field).click({ force: true });
    if (permission === "disabled") {
      await expect(control).toBeDisabled();
      await expect(label(field)).toHaveCSS("color", theme === "light" ? "rgb(160, 172, 197)" : "rgb(111, 122, 158)");
    } else {
      await expect(control).toBeFocused();
      await control.press(kind === "input" ? "x" : "ArrowDown");
    }
    if (kind === "input") await expect(control).toHaveValue("已有资料");
    else { await expect(control).toHaveAttribute("aria-expanded", "false"); await expect(control).toContainText("设计课"); }
    await expect(field.locator('[data-slot="clear-action"]')).toHaveCount(0);
  }
  await page.setViewportSize({ width: 320, height: 844 });
  const long = host.locator("[data-long]");
  for (const field of await long.locator("[data-long-field]").all()) {
    const size = Number((await field.getAttribute("data-long-field"))!.split("-")[0]);
    await expect(frame(field)).toHaveCSS("height", `${size}px`);
    const bounds = await frame(field).boundingBox(), title = await label(field).boundingBox(), value = await field.locator('input:not([aria-hidden="true"]), button[role="combobox"]').boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(16); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(304);
    expect(title!.width).toBeLessThanOrEqual(bounds!.width / 2);
    expect(title!.x + title!.width).toBeLessThanOrEqual(value!.x);
    expect(value!.width).toBeGreaterThan(24);
    await expect(field.locator('input:not([aria-hidden="true"]), button[role="combobox"]')).toHaveAccessibleName("特别长的课程资料筛选字段标题");
    measurements.push({ narrow: true, field: await field.getAttribute("data-long-field"), frame: bounds, label: title, value });
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await long.screenshot({ path: resolve(directory, `${theme}-narrow-320.png`), animations: "disabled" });
  await expect(page.locator("vite-error-overlay")).toHaveCount(0);
  expect(errors).toEqual([]);
  writeFileSync(resolve(directory, `${theme}-measurements.json`), JSON.stringify(measurements, null, 2));
});
