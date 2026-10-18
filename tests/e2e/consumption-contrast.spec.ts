import { writeFileSync } from "node:fs";
import { expect, test, type Locator, type TestInfo } from "@playwright/test";

async function json(info: TestInfo, name: string, value: unknown) {
  const path = info.outputPath(`${name}.json`);
  writeFileSync(path, JSON.stringify(value, null, 2));
  await info.attach(name, { path, contentType: "application/json" });
}

async function colors(scope: Locator, state: string) {
  return scope.evaluate((root, state) => {
    type RGBA = [number, number, number, number];
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true })!;
    function rgba(value: string): RGBA {
      context.clearRect(0, 0, 1, 1); context.fillStyle = value; context.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
      return [r!, g!, b!, a! / 255];
    }
    const over = (front: RGBA, back: RGBA): RGBA => [front[0] * front[3] + back[0] * (1 - front[3]), front[1] * front[3] + back[1] * (1 - front[3]), front[2] * front[3] + back[2] * (1 - front[3]), 1];
    const lum = (color: RGBA) => color.slice(0, 3).map(value => { const n = value / 255; return n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4; }).reduce((sum, value, i) => sum + value * [.2126, .7152, .0722][i]!, 0);
    const contrast = (a: RGBA, b: RGBA) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
    const descriptor = (node: Element) => `${node.tagName.toLowerCase()}${node.id ? `#${node.id}` : ""}${node.getAttribute("data-slot") ? `[data-slot=${node.getAttribute("data-slot")}]` : ""}`;
    const rows: unknown[] = [];
    for (const node of [root, ...root.querySelectorAll("*")]) {
      const style = getComputedStyle(node), box = node.getBoundingClientRect();
      if (!box.width || !box.height || style.visibility === "hidden" || node.closest('[aria-hidden="true"],.sr-only')) continue;
      const ownText = [...node.childNodes].filter(child => child.nodeType === Node.TEXT_NODE).map(child => child.textContent?.trim()).filter(Boolean).join(" ");
      const field = node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement;
      const text = field ? node.value || node.getAttribute("placeholder") || "" : ownText;
      if (!text) continue;
      const isPlaceholder = field && !node.value && !!node.getAttribute("placeholder");
      const selectPlaceholder = !!node.closest('[data-slot="control"][data-placeholder]');
      const foregroundStyle = isPlaceholder ? getComputedStyle(node, "::placeholder") : style;
      const ancestors = [];
      for (let parent: Element | null = node; parent; parent = parent.parentElement) {
        const computed = getComputedStyle(parent);
        ancestors.push({ node: descriptor(parent), background: computed.backgroundColor, rgba: rgba(computed.backgroundColor), image: computed.backgroundImage, opacity: Number(computed.opacity) });
      }
      let background: RGBA = [255, 255, 255, 1];
      for (const layer of [...ancestors].reverse()) background = over(layer.rgba, background);
      const foreground = rgba(foregroundStyle.color); foreground[3] *= Number(foregroundStyle.opacity);
      const painted = over(foreground, background), ratio = contrast(painted, background);
      const disabled = !!node.closest(':disabled,[aria-disabled="true"],[data-permission="disabled"],[data-state="disabled"]');
      const groupOpacity = ancestors.some(layer => layer.opacity !== 1), image = ancestors.some(layer => layer.image !== "none");
      const size = parseFloat(style.fontSize), weight = parseInt(style.fontWeight, 10);
      const minimum = size >= 24 || (size >= 18.667 && weight >= 700) ? 3 : 4.5;
      const role = disabled ? "inactive-control" : isPlaceholder || selectPlaceholder ? "placeholder" : node.closest('[role="alert"]') ? "error-or-failure" : /suffix|unit/.test(node.getAttribute("class") || "") || node.getAttribute("data-slot") === "suffix-text" ? "unit" : "necessary-text";
      const candidateProbe = document.createElement("span"); candidateProbe.style.color = "var(--rain-category-text-neutral-3)"; node.parentElement!.append(candidateProbe);
      const candidate = rgba(getComputedStyle(candidateProbe).color); candidateProbe.remove();
      rows.push({ state, node: descriptor(node), classes: node.getAttribute("class"), text, role, fontSize: style.fontSize, fontWeight: style.fontWeight, theme: node.closest("[data-rain-theme]")?.getAttribute("data-rain-theme"), color: foregroundStyle.color, foreground, ancestors, background, painted, ratio, minimum,
        result: disabled ? "explicit-inactive-exception" : groupOpacity || image ? "pending-compositing-review" : ratio >= minimum ? "passed-pair" : "pending-design",
        acceptedException: false, candidateNeutral3: { foreground: candidate, ratio: contrast(over(candidate, background), background), proposedOnly: true },
        limitations: groupOpacity ? ["Ancestor group opacity: numeric ratio excludes isolated-group compositing; inactive classification only."] : image ? ["Background image requires pixel sampling."] : [],
      });
    }
    return rows;
  }, state);
}
async function focusPaint(control: Locator) {
  return control.evaluate(node => {
    const chain = [];
    for (let current: Element | null = node; current && !current.classList.contains("component-doc__preview"); current = current.parentElement) {
      const s = getComputedStyle(current), rect = current.getBoundingClientRect();
      chain.push({ tag: current.tagName, id: current.id, slot: current.getAttribute("data-slot"), className: current.getAttribute("class"), focused: current === document.activeElement, focusVisible: current.matches(":focus-visible"), background: s.backgroundColor, outlineColor: s.outlineColor, outlineWidth: s.outlineWidth, outlineStyle: s.outlineStyle, outlineOffset: s.outlineOffset, boxShadow: s.boxShadow, borderColor: s.borderColor, borderWidth: s.borderWidth, overflow: s.overflow, rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } });
    }
    const host = node.closest(".component-doc__preview")!;
    return { chain, adjacentSurface: getComputedStyle(host).backgroundColor, forcedColors: matchMedia("(forced-colors: active)").matches };
  });
}

test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));
for (const theme of ["light", "dark"] as const) for (const surface of [1, 3]) {
  test(`[C02] ${theme} Background/${surface} actual recipe colors and focus matrix`, async ({ page }, info) => {
    await page.goto("/#compositions");
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    const filter = page.getByRole("region", { name: "资源筛选组合" });
    const form = page.getByRole("form", { name: "分区作业设置" });
    const grading = page.getByRole("region", { name: "连续批改操作组合" });
    const scopes = { filter, form, grading };
    await expect(form).toBeVisible();
    // Controlled host-surface matrix; the three real recipe sources and component paints stay unchanged.
    if (surface === 3) await page.locator('.component-doc__preview').evaluateAll(nodes => nodes.forEach(node => (node as HTMLElement).style.backgroundColor = "var(--rain-category-background-neutral-3)"));
    const audit: Record<string, unknown> = { theme, surface, surfaceMode: surface === 1 ? "unchanged real document" : "real recipe with test host surface substitution only", rows: {}, focus: [] };
    const rows = audit.rows as Record<string, unknown>;
    for (const [name, scope] of Object.entries(scopes)) rows[`${name}:default`] = await colors(scope, "default");
    await json(info, "initial-colors", audit);
    const targets = [
      { name: "filter-input", control: filter.getByRole("textbox", { name: "资源名称" }), scope: filter },
      { name: "form-select", control: form.getByRole("combobox", { name: "所属课程" }), scope: form },
      { name: "grading-number", control: grading.getByRole("spinbutton", { name: "得分" }), scope: grading },
      { name: "form-primary", control: form.getByRole("button", { name: "保存设置" }), scope: form },
    ];
    for (const forced of [false, true]) {
      await page.emulateMedia({ forcedColors: forced ? "active" : "none" });
      for (const target of targets) {
        await page.getByRole("heading", { name: "三种常用组合", exact: true }).focus();
        const before = await focusPaint(target.control);
        await target.control.focus();
        const tabPath = [{ phase: "programmatic", active: await page.evaluate(() => ({ tag: document.activeElement?.tagName, id: document.activeElement?.id })) }];
        await page.keyboard.press("Shift+Tab");
        tabPath.push({ phase: "reverse", active: await page.evaluate(() => ({ tag: document.activeElement?.tagName, id: document.activeElement?.id })) });
        for (let step = 0; step < 6 && !await target.control.evaluate(node => node === document.activeElement); step++) {
          await page.keyboard.press("Tab");
          tabPath.push({ phase: `forward-${step}`, active: await page.evaluate(() => ({ tag: document.activeElement?.tagName, id: document.activeElement?.id, slot: document.activeElement?.getAttribute("data-slot") })) });
        }
        await json(info, `${target.name}-${forced}-tab-path`, tabPath);
        await expect(target.control).toBeFocused();
        const after = await focusPaint(target.control);
        expect(after.chain.some(node => node.focusVisible)).toBe(true);
        expect(after.chain.some(node => node.outlineStyle !== "none" && parseFloat(node.outlineWidth) > 0 || node.boxShadow !== "none")).toBe(true);
        (audit.focus as unknown[]).push({ name: target.name, forced, tabPath, before, after, result: "focus-rendering-observed", contrastAcceptance: "pending-composite-review" });
        await target.scope.screenshot({ path: info.outputPath(`${target.name}-${forced ? "forced" : "normal"}.png`) });
        await json(info, "focus-progress", audit);
      }
    }
    await page.emulateMedia({ forcedColors: "none" });
    await form.getByRole("button", { name: "保存设置" }).click();
    await grading.getByRole("button", { name: "保存并继续" }).click();
    for (const [name, scope] of Object.entries(scopes)) rows[`${name}:error`] = await colors(scope, "validation-error");
    await form.screenshot({ path: info.outputPath("form-errors.png") });
    await grading.screenshot({ path: info.outputPath("grading-errors.png") });
    await page.getByRole("button", { name: "模拟请求失败：关" }).click();
    await form.getByRole("combobox", { name: "所属课程" }).click();
    await page.getByRole("option", { name: "人工智能导论", exact: true }).click();
    await form.getByRole("spinbutton", { name: "满分" }).fill("100");
    await grading.getByRole("spinbutton", { name: "得分" }).fill("12");
    for (const [name, scope, submitName] of [["filter", filter, "查询"], ["form", form, "保存设置"], ["grading", grading, "保存并继续"]] as const) {
      await scope.getByRole("button", { name: submitName, exact: true }).click();
      await expect(scope.locator('[aria-busy="true"]')).toHaveCount(1);
      rows[`${name}:loading`] = await colors(scope, "loading");
      await expect(scope.getByRole("alert")).toBeVisible();
      rows[`${name}:failure`] = await colors(scope, "request-failure");
    }
    await page.getByRole("button", { name: "禁用操作：关" }).click();
    for (const [name, scope] of Object.entries(scopes)) rows[`${name}:disabled`] = await colors(scope, "disabled");
    await json(info, "computed-consumption", audit);
    await page.getByRole("button", { name: "禁用操作：开" }).click();
    await form.getByRole("button", { name: "清除所属课程" }).click();
    await form.getByRole("button", { name: "保存设置" }).click();
    await filter.screenshot({ path: info.outputPath("placeholder-before-filter.png") });
    await form.screenshot({ path: info.outputPath("placeholder-before-form-error.png") });
    await page.addStyleTag({ content: '[aria-label="资源筛选组合"] [data-rain-id="ui-input"] > [data-slot="control"]:not(:disabled)::placeholder { color:var(--rain-category-text-neutral-3); } [aria-label="分区作业设置"] [data-rain-id="ui-select"]:not([data-permission="disabled"]) [data-slot="control"][data-placeholder] [data-slot="value"] > span { color:var(--rain-category-text-neutral-3); }' });
    await json(info, "candidate-placeholder-pairs", { proposedOnly: true, filter: await colors(filter, "candidate-neutral3"), form: await colors(form, "candidate-neutral3-error") });
    await filter.screenshot({ path: info.outputPath("placeholder-candidate-filter.png") });
    await form.screenshot({ path: info.outputPath("placeholder-candidate-form-error.png") });
    expect(Object.keys(rows)).toHaveLength(15);
  });
}
