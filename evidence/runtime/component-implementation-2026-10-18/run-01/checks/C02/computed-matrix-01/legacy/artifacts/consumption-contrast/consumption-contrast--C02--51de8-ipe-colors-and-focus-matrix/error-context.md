# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: consumption-contrast.spec.ts >> [C02] light Background/1 actual recipe colors and focus matrix
- Location: tests/e2e/consumption-contrast.spec.ts:73:3

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  getByRole('form', { name: '分区作业设置' }).getByRole('combobox', { name: '所属课程' })
Expected: focused
Received: inactive
Timeout:  5000ms

Call log:
  - Expect "toBeFocused" with timeout 5000ms
  - waiting for getByRole('form', { name: '分区作业设置' }).getByRole('combobox', { name: '所属课程' })
    14 × locator resolved to <button tabindex="0" type="button" role="combobox" data-placeholder="" data-slot="control" aria-required="true" id="rain-field-_r_b_" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="rain-field-_r_b_-label" class="rain-select__control flex min-w-0 flex-1 items-center gap-rain-4 border-none bg-transparent p-rain-0 text-left text-inherit outline-none cursor-pointer disabled:cursor-not-allowed">…</button>
       - unexpected value "inactive"

```

```yaml
- combobox "所属课程": 请选择课程
```

# Test source

```ts
  1   | import { writeFileSync } from "node:fs";
  2   | import { expect, test, type Locator, type TestInfo } from "@playwright/test";
  3   | 
  4   | async function json(info: TestInfo, name: string, value: unknown) {
  5   |   const path = info.outputPath(`${name}.json`);
  6   |   writeFileSync(path, JSON.stringify(value, null, 2));
  7   |   await info.attach(name, { path, contentType: "application/json" });
  8   | }
  9   | 
  10  | async function colors(scope: Locator, state: string) {
  11  |   return scope.evaluate((root, state) => {
  12  |     type RGBA = [number, number, number, number];
  13  |     const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1;
  14  |     const context = canvas.getContext("2d", { willReadFrequently: true })!;
  15  |     function rgba(value: string): RGBA {
  16  |       context.clearRect(0, 0, 1, 1); context.fillStyle = value; context.fillRect(0, 0, 1, 1);
  17  |       const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
  18  |       return [r!, g!, b!, a! / 255];
  19  |     }
  20  |     const over = (front: RGBA, back: RGBA): RGBA => [front[0] * front[3] + back[0] * (1 - front[3]), front[1] * front[3] + back[1] * (1 - front[3]), front[2] * front[3] + back[2] * (1 - front[3]), 1];
  21  |     const lum = (color: RGBA) => color.slice(0, 3).map(value => { const n = value / 255; return n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4; }).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i]!, 0);
  22  |     const contrast = (a: RGBA, b: RGBA) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
  23  |     const descriptor = (node: Element) => `${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : ""}${node.getAttribute("data-slot") ? `[data-slot=${node.getAttribute("data-slot")}]` : ""}`;
  24  |     const rows: unknown[] = [];
  25  |     for (const node of [root, ...root.querySelectorAll("*")]) {
  26  |       const style = getComputedStyle(node), box = node.getBoundingClientRect();
  27  |       if (!box.width || !box.height || style.visibility === "hidden" || node.closest('[aria-hidden="true"]')) continue;
  28  |       const ownText = [...node.childNodes].filter(child => child.nodeType === Node.TEXT_NODE).map(child => child.textContent?.trim()).filter(Boolean).join(" ");
  29  |       const field = node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement;
  30  |       const text = field ? node.value || node.getAttribute("placeholder") || "" : ownText;
  31  |       if (!text) continue;
  32  |       const isPlaceholder = field && !node.value && !!node.getAttribute("placeholder");
  33  |       const foregroundStyle = isPlaceholder ? getComputedStyle(node, "::placeholder") : style;
  34  |       const ancestors = [];
  35  |       for (let parent: Element | null = node; parent; parent = parent.parentElement) {
  36  |         const computed = getComputedStyle(parent);
  37  |         ancestors.push({ node: descriptor(parent), background: computed.backgroundColor, rgba: rgba(computed.backgroundColor), image: computed.backgroundImage, opacity: Number(computed.opacity) });
  38  |       }
  39  |       let background: RGBA = [255, 255, 255, 1];
  40  |       for (const layer of ancestors.toReversed()) background = over(layer.rgba, background);
  41  |       const foreground = rgba(foregroundStyle.color); foreground[3] *= Number(foregroundStyle.opacity);
  42  |       const painted = over(foreground, background), ratio = contrast(painted, background);
  43  |       const disabled = !!node.closest(':disabled,[aria-disabled="true"],[data-permission="disabled"],[data-state="disabled"]');
  44  |       const groupOpacity = ancestors.some(layer => layer.opacity !== 1), image = ancestors.some(layer => layer.image !== "none");
  45  |       const size = parseFloat(style.fontSize), weight = parseInt(style.fontWeight, 10);
  46  |       const minimum = size >= 24 || (size >= 18.667 && weight >= 700) ? 3 : 4.5;
  47  |       const role = disabled ? "inactive-control" : isPlaceholder ? "placeholder" : node.closest('[role="alert"]') ? "error-or-failure" : /suffix|unit/.test(node.getAttribute("class") || "") || node.getAttribute("data-slot") === "suffix-text" ? "unit" : "necessary-text";
  48  |       const candidateProbe = document.createElement("span"); candidateProbe.style.color = "var(--rain-category-text-neutral-3)"; node.append(candidateProbe);
  49  |       const candidate = rgba(getComputedStyle(candidateProbe).color); candidateProbe.remove();
  50  |       rows.push({ state, node: descriptor(node), classes: node.getAttribute("class"), text, role, fontSize: style.fontSize, fontWeight: style.fontWeight, theme: node.closest("[data-rain-theme]")?.getAttribute("data-rain-theme"), color: foregroundStyle.color, foreground, ancestors, background, painted, ratio, minimum,
  51  |         result: disabled ? "explicit-inactive-exception" : groupOpacity || image ? "pending-compositing-review" : ratio >= minimum ? "passed-pair" : "pending-design",
  52  |         acceptedException: false, candidateNeutral3: { foreground: candidate, ratio: contrast(over(candidate, background), background), proposedOnly: true },
  53  |         limitations: groupOpacity ? ["Ancestor group opacity: numeric ratio excludes isolated-group compositing; inactive classification only."] : image ? ["Background image requires pixel sampling."] : [],
  54  |       });
  55  |     }
  56  |     return rows;
  57  |   }, state);
  58  | }
  59  | async function focusPaint(control: Locator) {
  60  |   return control.evaluate(node => {
  61  |     const chain = [];
  62  |     for (let current: Element | null = node; current && !current.classList.contains("component-doc__preview"); current = current.parentElement) {
  63  |       const s = getComputedStyle(current), rect = current.getBoundingClientRect();
  64  |       chain.push({ tag: current.tagName, id: current.id, slot: current.getAttribute("data-slot"), className: current.getAttribute("class"), focused: current === document.activeElement, focusVisible: current.matches(":focus-visible"), background: s.backgroundColor, outlineColor: s.outlineColor, outlineWidth: s.outlineWidth, outlineStyle: s.outlineStyle, outlineOffset: s.outlineOffset, boxShadow: s.boxShadow, borderColor: s.borderColor, borderWidth: s.borderWidth, overflow: s.overflow, rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } });
  65  |     }
  66  |     const host = node.closest(".component-doc__preview")!;
  67  |     return { chain, adjacentSurface: getComputedStyle(host).backgroundColor, forcedColors: matchMedia("(forced-colors: active)").matches };
  68  |   });
  69  | }
  70  | 
  71  | test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));
  72  | for (const theme of ["light", "dark"] as const) for (const surface of [1, 3]) {
  73  |   test(`[C02] ${theme} Background/${surface} actual recipe colors and focus matrix`, async ({ page }, info) => {
  74  |     await page.goto("/#compositions");
  75  |     await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
  76  |     const filter = page.getByRole("region", { name: "资源筛选组合" });
  77  |     const form = page.getByRole("form", { name: "分区作业设置" });
  78  |     const grading = page.getByRole("region", { name: "连续批改操作组合" });
  79  |     const scopes = { filter, form, grading };
  80  |     await expect(form).toBeVisible();
  81  |     // Controlled host-surface matrix; the three real recipe sources and component paints stay unchanged.
  82  |     if (surface === 3) await page.locator('.component-doc__preview').evaluateAll(nodes => nodes.forEach(node => (node as HTMLElement).style.backgroundColor = "var(--rain-category-background-neutral-3)"));
  83  |     const audit: Record<string, unknown> = { theme, surface, surfaceMode: surface === 1 ? "unchanged real document" : "real recipe with test host surface substitution only", rows: {}, focus: [] };
  84  |     const rows = audit.rows as Record<string, unknown>;
  85  |     for (const [name, scope] of Object.entries(scopes)) rows[`${name}:default`] = await colors(scope, "default");
  86  |     const targets = [
  87  |       { name: "filter-input", control: filter.getByRole("textbox", { name: "资源名称" }), scope: filter },
  88  |       { name: "form-select", control: form.getByRole("combobox", { name: "所属课程" }), scope: form },
  89  |       { name: "grading-number", control: grading.getByRole("spinbutton", { name: "得分" }), scope: grading },
  90  |       { name: "form-primary", control: form.getByRole("button", { name: "保存设置" }), scope: form },
  91  |     ];
  92  |     for (const forced of [false, true]) {
  93  |       await page.emulateMedia({ forcedColors: forced ? "active" : "none" });
  94  |       for (const target of targets) {
  95  |         await page.getByRole("heading", { name: "三种常用组合", exact: true }).focus();
  96  |         const before = await focusPaint(target.control);
  97  |         await target.control.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab");
> 98  |         await expect(target.control).toBeFocused();
      |                                      ^ Error: expect(locator).toBeFocused() failed
  99  |         const after = await focusPaint(target.control);
  100 |         expect(after.chain.some(node => node.focusVisible)).toBe(true);
  101 |         expect(after.chain.some(node => node.outlineStyle !== "none" && parseFloat(node.outlineWidth) > 0 || node.boxShadow !== "none")).toBe(true);
  102 |         (audit.focus as unknown[]).push({ name: target.name, forced, before, after, result: "focus-rendering-observed", contrastAcceptance: "pending-composite-review" });
  103 |         await target.scope.screenshot({ path: info.outputPath(`${target.name}-${forced ? "forced" : "normal"}.png`) });
  104 |       }
  105 |     }
  106 |     await page.emulateMedia({ forcedColors: "none" });
  107 |     await form.getByRole("button", { name: "保存设置" }).click();
  108 |     await grading.getByRole("button", { name: "保存并继续" }).click();
  109 |     for (const [name, scope] of Object.entries(scopes)) rows[`${name}:error`] = await colors(scope, "validation-error");
  110 |     await form.screenshot({ path: info.outputPath("form-errors.png") });
  111 |     await grading.screenshot({ path: info.outputPath("grading-errors.png") });
  112 |     await page.getByRole("button", { name: "模拟请求失败：关" }).click();
  113 |     await form.getByRole("combobox", { name: "所属课程" }).click();
  114 |     await page.getByRole("option", { name: "人工智能导论", exact: true }).click();
  115 |     await form.getByRole("spinbutton", { name: "满分" }).fill("100");
  116 |     await grading.getByRole("spinbutton", { name: "得分" }).fill("12");
  117 |     for (const [name, scope, submitName] of [["filter", filter, "查询"], ["form", form, "保存设置"], ["grading", grading, "保存并继续"]] as const) {
  118 |       await scope.getByRole("button", { name: submitName, exact: true }).click();
  119 |       await expect(scope.locator('[aria-busy="true"]')).toHaveCount(1);
  120 |       rows[`${name}:loading`] = await colors(scope, "loading");
  121 |       await expect(scope.getByRole("alert")).toBeVisible();
  122 |       rows[`${name}:failure`] = await colors(scope, "request-failure");
  123 |     }
  124 |     await page.getByRole("button", { name: "禁用操作：关" }).click();
  125 |     for (const [name, scope] of Object.entries(scopes)) rows[`${name}:disabled`] = await colors(scope, "disabled");
  126 |     await json(info, "computed-consumption", audit);
  127 |     expect(Object.keys(rows)).toHaveLength(15);
  128 |   });
  129 | }
  130 | 
```