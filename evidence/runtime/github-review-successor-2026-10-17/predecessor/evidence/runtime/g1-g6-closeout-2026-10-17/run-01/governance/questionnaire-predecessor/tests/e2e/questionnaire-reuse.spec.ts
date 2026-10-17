import { expect, test, type Locator, type Page } from "@playwright/test";
import { existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const run = resolve(root, "evidence/runtime/questionnaire-reuse-2026-10-16");
const evidence = resolve(run, "browser");
const fixtures = resolve(evidence, "baseline-modules");
const originals = ["radio/radio.tsx", "checkbox/checkbox.tsx", "selection-card/selection-card.tsx", "questionnaire/questionnaire.tsx"];
const baselineModules = new Map(originals.map(path => [resolve(root, "packages/ui/src", path), resolve(fixtures, path)]));
mkdirSync(evidence, { recursive: true });
mkdirSync(fixtures, { recursive: true });
if (!existsSync(resolve(fixtures, "node_modules"))) symlinkSync(resolve(root, "packages/ui/node_modules"), resolve(fixtures, "node_modules"), "dir");
for (const path of originals) {
  const original = resolve(root, "packages/ui/src", path), destination = baselineModules.get(original)!;
  let source = readFileSync(resolve(run, "baseline/packages/ui/src", path), "utf8");
  source = source.replace(/^import "\.\/questionnaire\.css";\n/m, "");
  source = source.replace(/(from\s+["'])(\.[^"']+)(["'])/g, (_match, start, specifier, end) => {
    const absolute = resolve(dirname(original), specifier);
    const baseline = baselineModules.get(`${absolute}.tsx`) ?? baselineModules.get(`${absolute}.ts`);
    const live = [absolute, `${absolute}.tsx`, `${absolute}.ts`, resolve(absolute, "index.ts")].find(path => existsSync(path))!;
    return `${start}/@fs${baseline ?? live}${end}`;
  });
  if (path.startsWith("questionnaire/")) source = source.replaceAll("rain-questionnaire", "reuse-before-questionnaire");
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, source);
}
writeFileSync(resolve(fixtures, "primitive.ts"), 'export { Questionnaire } from "@shadcn/react/questionnaire";\n');
writeFileSync(resolve(fixtures, "runtime.ts"), 'import * as React from "react"; export { React }; export { createRoot } from "react-dom/client";\n');
const beforeCss = readFileSync(resolve(run, "baseline/packages/ui/src/styles.css"), "utf8").replace(/^@import[^;]+;\s*$/gm, "");
const beforeQuestionnaireCss = readFileSync(resolve(run, "baseline/packages/ui/src/questionnaire/questionnaire.css"), "utf8").replaceAll("rain-questionnaire", "reuse-before-questionnaire");
const paths = {
  ui: `/@fs${resolve(root, "packages/ui/src/index.ts")}`,
  foundations: `/@fs${resolve(root, "packages/foundations/src/index.ts")}`,
  primitive: `/@fs${resolve(fixtures, "primitive.ts")}`,
  runtime: `/@fs${resolve(fixtures, "runtime.ts")}`,
  beforeRadio: `/@fs${resolve(fixtures, "radio/radio.tsx")}`,
  beforeCheckbox: `/@fs${resolve(fixtures, "checkbox/checkbox.tsx")}`,
  beforeCards: `/@fs${resolve(fixtures, "selection-card/selection-card.tsx")}`,
  beforeQuestionnaire: `/@fs${resolve(fixtures, "questionnaire/questionnaire.tsx")}`,
};

type MountOptions = { mode?: "flow" | "visual"; theme?: "light" | "dark"; density?: "default" | "compact"; shortcuts?: "letters" | "numbers"; reset?: string };
let mountNumber = 0;
async function mount(page: Page, options: MountOptions = {}) {
  await page.goto(`/?questionnaire-reuse-fixture=${++mountNumber}#questionnaire`);
  await expect(page.locator("#questionnaire-title")).toBeVisible();
  await page.addStyleTag({ content: `@scope ([data-reuse-era="before"]) { ${beforeCss} }\n${beforeQuestionnaireCss}` });
  await page.evaluate(async ({ paths, options }) => {
    const { React, createRoot } = await import(paths.runtime);
    const { createElement: h, useState } = React;
    const ui = await import(paths.ui), { DensityProvider } = await import(paths.foundations);
    const raw = (await import(paths.primitive)).Questionnaire;
    const before = { ...(await import(paths.beforeRadio)), ...(await import(paths.beforeCheckbox)), ...(await import(paths.beforeCards)), ...(await import(paths.beforeQuestionnaire)) };
    const afterParts = { Root: ui.Questionnaire, Progress: ui.QuestionnaireProgress, Item: ui.QuestionnaireItem, Title: ui.QuestionnaireTitle, Description: ui.QuestionnaireDescription, Choices: ui.QuestionnaireChoices, Choice: ui.QuestionnaireChoice, Input: ui.QuestionnaireInput, Previous: ui.QuestionnairePrevious, Next: ui.QuestionnaireNext, Skip: ui.QuestionnaireSkip, Submit: ui.QuestionnaireSubmit, Error: ui.QuestionnaireError };
    function choice(P: any, value: string, text: string, props: any = {}, rawChoice = false) {
      return rawChoice ? h(P.Choice, { value, ...props }, h(raw.ChoiceInput), h(raw.ChoiceLabel, null, text)) : h(P.Choice, { value, ...props }, text);
    }
    function Comparison({ era }: { era: string }) {
      const P = era === "raw" ? raw : afterParts, mode = options.reset;
      const defaultValue = mode === "default-old-text" || mode === "controlled" ? "default" : undefined;
      const [value, setValue] = useState(defaultValue ?? ""), [changes, setChanges] = useState(0);
      const nativeInput = { "aria-label": "Free answer", placeholder: "Native free answer", size: 20, maxLength: 120, minLength: 2, pattern: ".{2,}", ...(mode === "controlled" ? { value, onChange: (event: any) => setValue(event.currentTarget.value) } : { defaultValue }) };
      return h(P.Root, { "aria-label": `Comparison ${era}`, shortcuts: options.shortcuts ?? "letters", items: [{ name: "goal", choices: [{ value: "a" }, { value: "b" }, { value: "c", disabled: true }] }, { name: "last" }],
        onSubmit: (e: any) => e.preventDefault(), onReset: (e: any) => { if (mode === "cancel") e.preventDefault(); else if (mode === "controlled") setValue(defaultValue ?? ""); } },
        h(P.Item, { name: "goal" }, h(P.Title, null, "Goal"), h(P.Choices, null,
          choice(P, "a", "Alpha", { onChange: () => setChanges((n: number) => n + 1) }, era === "raw"),
          choice(P, "b", "Beta", { onChange: () => setChanges((n: number) => n + 1) }, era === "raw"),
          choice(P, "c", "Disabled", { disabled: true }, era === "raw")), h(P.Input, nativeInput), h(P.Error, null, "Answer required")),
        h(P.Item, { name: "last" }, h(P.Title, null, "Last"), h(P.Input, { "aria-label": "Last answer" })),
        h(P.Previous, null, "Previous"), h(P.Next, null, "Next"), h(P.Skip, null, "Skip"), h(P.Submit, null, "Submit"), h("button", { type: "reset" }, "Reset"), h("output", { "data-reuse-changes": true }, changes));
    }
    function Ordinary({ U }: { U: any }) {
      return h("form", { "data-reuse-ordinary": true, style: { display: "grid", gap: "16px" } },
        h(U.Radio, { name: "ordinary-radio", value: "r", label: "普通单选", description: "原有控件呈现", checked: true, onCheckedChange: () => {} }),
        h(U.Radio, { name: "ordinary-disabled", value: "r", label: "禁用单选", disabled: true, checked: false, onCheckedChange: () => {} }),
        h(U.Checkbox, { name: "ordinary-checkbox", label: "普通复选", description: "独立勾选行为", defaultChecked: true }),
        h(U.Checkbox, { name: "ordinary-mixed", label: "半选复选", indeterminate: true }),
        h(U.RadioCard, { name: "ordinary-card-radio", value: "r", label: "普通单选卡片", description: "描述与操作区", checked: true, onCheckedChange: () => {}, actions: h("button", { type: "button" }, "查看预览") }),
        h(U.CheckboxCard, { name: "ordinary-card-checkbox", label: "普通复选卡片", description: "描述与操作区", defaultChecked: true, actions: h("button", { type: "button" }, "查看详情") }));
    }
    function VisualQuestionnaire({ U, era, state }: { U: any; era: string; state: string }) {
      const hasChoices = state === "normal" || state === "invalid";
      return h(U.Questionnaire, { "aria-label": `${era} ${state}`, items: [{ name: state, ...(hasChoices ? { choices: [{ value: "a" }, { value: "b" }, { value: "c", disabled: true }] } : {}) }], shortcuts: "letters" },
        h(U.QuestionnaireItem, { name: state, invalid: state === "invalid" }, h(U.QuestionnaireTitle, null, `${state} · 逐题回答`), h(U.QuestionnaireDescription, null, "共享选择与原生单行输入"),
          hasChoices ? h(U.QuestionnaireChoices, null, ...["a", "b", "c"].map((value: string) => h(U.QuestionnaireChoice, { key: value, value, defaultChecked: value === "a", disabled: value === "c" }, value === "a" ? "选中项" : value === "b" ? "未选项" : "禁用项"))) : null,
          h(U.QuestionnaireInput, { "aria-label": `${state} answer`, placeholder: "请输入课程反馈", disabled: state === "disabled", readOnly: state === "readonly", defaultValue: state === "readonly" ? "只读答案" : undefined }), h(U.QuestionnaireError, null, "请完成当前回答")));
    }
    function CustomChoices({ invalid }: { invalid: boolean }) {
      const name = invalid ? "custom-invalid" : "custom-normal";
      return h(ui.Questionnaire, { "aria-label": name, items: [{ name, choices: ["default", "function", "element"].map(value => ({ value })) }] },
        h(ui.QuestionnaireItem, { name, multiple: true, invalid }, h(ui.QuestionnaireTitle, null, invalid ? "已选错误 · render 对照" : "常规 · render 对照"),
          h(ui.QuestionnaireChoices, null, ...["default", "function", "element"].map(mode => h(ui.QuestionnaireChoice, { key: mode, value: mode, defaultChecked: invalid,
            ...(mode === "function" ? { render: (props: any) => h("label", { ...props, "data-custom-render": mode }) } : mode === "element" ? { render: h("label", { "data-custom-render": mode }) } : {}) }, "同一选项内容")))));
    }
    document.getElementById("root")!.style.display = "none";
    const host = document.createElement("section"); host.id = "questionnaire-reuse-fixture"; host.setAttribute("data-rain-theme", options.theme ?? "light");
    host.style.cssText = "padding:16px;background:var(--rain-category-background-neutral-1);color:var(--rain-category-text-neutral-1);font-family:var(--rain-font-ui);min-width:0";
    document.body.append(host);
    const eras = options.mode === "visual" ? ["before", "after"] : ["rain", "raw"];
    createRoot(host).render(h(DensityProvider, { density: options.density ?? "default" }, h("div", { style: { display: "grid", gridTemplateColumns: innerWidth < 640 ? "minmax(0,1fr)" : "repeat(2,minmax(0,1fr))", gap: "24px" } }, ...eras.map(era => h("section", { key: era, "data-reuse-era": era, style: { minWidth: 0, display: "grid", alignContent: "start", gap: "24px" } },
      options.mode === "visual" ? [h("div", { key: "ordinary", "data-visual": "ordinary" }, h(Ordinary, { U: era === "before" ? before : ui })), h("div", { key: "questionnaire", "data-visual": "questionnaire", style: { display: "grid", gap: "24px" } }, ...["normal", "invalid", "disabled", "readonly"].map(state => h(VisualQuestionnaire, { key: state, U: era === "before" ? before : ui, era, state }))),
        era === "after" ? h("div", { key: "field-siblings", "data-visual": "field-siblings", style: { display: "grid", gap: "16px" } }, h(ui.Select, { "aria-label": "Select sibling", options: [{ value: "a", label: "选择器原路径" }], defaultValue: "a" }), h(ui.Textarea, { "aria-label": "Textarea sibling", placeholder: "多行输入原路径" }), h(CustomChoices, { invalid: false }), h(CustomChoices, { invalid: true })) : null] : h(Comparison, { era }))))));
  }, { paths, options });
  await expect(page.locator("#questionnaire-reuse-fixture form").first()).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function facts(form: Locator) {
  return form.evaluate(node => {
    const input = node.querySelector<HTMLInputElement>('input[aria-label="Free answer"]')!, choice = node.querySelector<HTMLInputElement>('input[value="a"]')!;
    return { value: input.value, checked: choice.checked, name: input.getAttribute("name"), form: input.getAttribute("form"), data: [...new FormData(node as HTMLFormElement).entries()], status: choice.closest("fieldset")!.getAttribute("data-status"), active: node.querySelector("fieldset[data-active]")?.getAttribute("name"), focused: document.activeElement === input ? "text" : document.activeElement === choice ? "choice" : document.activeElement?.tagName };
  });
}

test("conditional page validation, draft restore, backward editing and failed-submit retry", async ({ page }) => {
  await page.goto("/#questionnaire");
  const form = page.getByRole("form", { name: "课堂反馈", exact: true });
  await form.getByRole("button", { name: "下一题", exact: true }).click();
  await expect(form.getByRole("alert")).toBeVisible();
  await form.getByRole("radio", { name: /其他目标/ }).locator("..").click();
  await form.getByRole("button", { name: "下一题", exact: true }).click();
  const detail = form.getByRole("textbox", { name: "具体学习目标", exact: true });
  await detail.fill("一");
  await page.getByRole("button", { name: "保存本页草稿", exact: true }).click();
  await page.getByRole("button", { name: "恢复草稿", exact: true }).click();
  await form.getByRole("button", { name: "下一题", exact: true }).click();
  await expect(form.getByRole("progressbar")).toContainText("第 2 题");
  await detail.fill("希望理解证据");
  await form.getByRole("button", { name: "下一题", exact: true }).click();
  await form.getByRole("checkbox", { name: /观察记录/ }).locator("..").click();
  await form.getByRole("button", { name: "上一题", exact: true }).click();
  await expect(detail).toHaveValue("希望理解证据");
  await form.getByRole("button", { name: "下一题", exact: true }).click();
  await form.getByRole("button", { name: "下一题", exact: true }).click();
  const note = form.getByRole("textbox", { name: "给老师的补充", exact: true });
  await note.fill("原生自定义 render 仍可输入\n第二行");
  await expect(note).toHaveValue("原生自定义 render 仍可输入\n第二行");
  await expect(note).toHaveAttribute("maxlength", "120");
  await page.getByText("演示控制", { exact: true }).click();
  await page.getByRole("button", { name: "模拟提交失败：关", exact: true }).click();
  await form.getByRole("button", { name: "提交反馈", exact: true }).click();
  await expect(form.getByRole("alert")).toContainText("提交失败");
  await expect(note).toHaveValue("原生自定义 render 仍可输入\n第二行");
  await page.getByRole("button", { name: "模拟提交失败：开", exact: true }).click();
  await form.getByRole("button", { name: "提交反馈", exact: true }).click();
  await expect(page.getByRole("region", { name: "反馈摘要", exact: true })).toContainText("希望理解证据");
  await expect(page.getByRole("heading", { name: "反馈已提交", exact: true })).toBeFocused();
});

for (const shortcuts of ["letters", "numbers"] as const) test(`${shortcuts} shortcuts, sole native labels/inputs and skip re-selection match Primitive`, async ({ page }, info) => {
  await mount(page, { shortcuts });
  const report = [];
  for (const era of ["rain", "raw"]) {
    const form = page.getByRole("form", { name: `Comparison ${era}`, exact: true });
    const goal = form.getByRole("group", { name: "Goal", exact: true });
    await expect(goal.locator('input[type="radio"]')).toHaveCount(3);
    if (era === "rain") expect(await goal.locator('input[type="radio"]').evaluateAll(inputs => inputs.every(input => input.parentElement?.tagName === "LABEL" && input.parentElement.querySelectorAll("input").length === 1 && input.parentElement.querySelectorAll("label").length === 0 && input.nextElementSibling?.getAttribute("data-slot") === "canvas"))).toBe(true);
    await expect(form.getByRole("radio", { name: "Alpha", exact: true }).locator("..")).not.toHaveAttribute("data-disabled");
    await expect(form.getByRole("radio", { name: "Disabled", exact: true }).locator("..")).toHaveAttribute("data-disabled");
    await goal.focus(); await goal.press(shortcuts === "letters" ? "b" : "2");
    await expect(form.getByRole("radio", { name: "Beta", exact: true })).toBeChecked();
    await expect(form.locator("[data-reuse-changes]")).toHaveText("1");
    await expect(goal).toBeVisible();
    await goal.press(shortcuts === "letters" ? "c" : "3");
    await expect(form.getByRole("radio", { name: "Disabled", exact: true })).not.toBeChecked();
    await form.getByRole("button", { name: "Skip", exact: true }).click();
    await form.getByRole("button", { name: "Previous", exact: true }).click();
    expect((await facts(form)).data).toEqual([]);
    await form.getByRole("radio", { name: "Alpha", exact: true }).locator("..").click();
    expect((await facts(form)).data).toEqual([["goal", "a"]]);
    const input = form.getByRole("textbox", { name: "Free answer", exact: true });
    await expect(input).toHaveAttribute("size", "20"); await expect(input).toHaveAttribute("maxlength", "120");
    await input.fill("native answer"); await expect(form.getByRole("radio", { name: "Alpha", exact: true })).not.toBeChecked();
    await input.press("a"); expect((await facts(form)).data).toEqual([["goal", "native answera"]]);
    report.push({ era, facts: await facts(form) });
  }
  expect(report[0]!.facts).toEqual(report[1]!.facts);
  writeFileSync(resolve(evidence, `shortcuts-${shortcuts}-${info.project.name}.json`), JSON.stringify(report, null, 2));
});

test("native constraints and six reset paths retain raw-engine DOM values and FormData", async ({ page }, info) => {
  test.setTimeout(120_000);
  const report = [];
  for (const reset of ["current", "old-text", "default-old-text", "skip", "cancel", "controlled"]) {
    await mount(page, { reset });
    const records = [];
    for (const era of ["rain", "raw"]) {
      const form = page.getByRole("form", { name: `Comparison ${era}`, exact: true });
      const input = form.getByRole("textbox", { name: "Free answer", exact: true });
      await input.fill("new text");
      if (reset === "current") {
        await input.fill(""); await input.pressSequentially("x".repeat(121)); await expect(input).toHaveValue("x".repeat(120));
        expect(await input.evaluate(node => ({ min: (node as HTMLInputElement).minLength, pattern: (node as HTMLInputElement).pattern, size: (node as HTMLInputElement).size }))).toEqual({ min: 2, pattern: ".{2,}", size: 20 });
        await input.fill(""); await input.pressSequentially("😀".repeat(61)); await expect(input).toHaveValue("😀".repeat(60));
        await input.fill(""); await input.pressSequentially("x");
        expect(await input.evaluate(node => (node as HTMLInputElement).validity.tooShort)).toBe(true);
        expect(await input.evaluate(node => (node as HTMLInputElement).validity.patternMismatch)).toBe(true);
      }
      if (reset === "old-text" || reset === "default-old-text") await form.getByRole("radio", { name: "Alpha", exact: true }).locator("..").click();
      if (reset === "skip") { await form.getByRole("button", { name: "Skip", exact: true }).click(); await form.getByRole("button", { name: "Previous", exact: true }).click(); }
      const before = await facts(form);
      await form.getByRole("button", { name: "Reset", exact: true }).click();
      records.push({ era, before, after: await facts(form) });
    }
    expect(records[0]!.before, reset).toEqual(records[1]!.before);
    expect(records[0]!.after, reset).toEqual(records[1]!.after);
    report.push({ reset, records });
  }
  writeFileSync(resolve(evidence, `native-reset-${info.project.name}.json`), JSON.stringify(report, null, 2));
});

test("shared field focus/permissions, forced colors, and actual 390px input hit area", async ({ page }, info) => {
  await mount(page, { mode: "visual" });
  const after = page.locator('[data-reuse-era="after"]'), normal = after.getByRole("textbox", { name: "normal answer", exact: true });
  const invalid = after.getByRole("textbox", { name: "invalid answer", exact: true }), disabled = after.getByRole("textbox", { name: "disabled answer", exact: true }), readonly = after.getByRole("textbox", { name: "readonly answer", exact: true });
  await expect(disabled).toBeDisabled(); await expect(disabled.locator("..")).toHaveAttribute("data-state", "disabled");
  await expect(readonly).toHaveAttribute("readonly", ""); await expect(readonly.locator("..")).toHaveAttribute("data-permission", "readonly");
  await expect(invalid.locator("..")).toHaveAttribute("data-status", "error");
  const normalForm = after.getByRole("form", { name: "after normal", exact: true });
  const choice = normalForm.getByRole("radio", { name: "未选项", exact: true }), shape = choice.locator("..").locator('[data-slot="control"]');
  await choice.focus(); await choice.press("Space"); await expect(choice).toBeChecked();
  await expect(shape).toHaveCSS("outline-style", "solid");
  const invalidChoice = after.getByRole("form", { name: "after invalid", exact: true }).getByRole("radio", { name: "未选项", exact: true }).locator("..");
  await expect(invalidChoice).toHaveAttribute("data-invalid");
  const invalidBorder = await invalidChoice.evaluate(node => { const probe = document.createElement("span"); node.append(probe); probe.style.color = "var(--rain-category-border-red-1)"; const expected = getComputedStyle(probe).color; probe.remove(); return expected; });
  await expect(invalidChoice).toHaveCSS("border-color", invalidBorder);
  await expect(after.getByRole("form", { name: "after invalid", exact: true }).getByRole("radio", { name: "选中项", exact: true }).locator("..")).toHaveCSS("border-color", invalidBorder);
  const report = [];
  for (const name of ["custom-normal", "custom-invalid"]) {
    const form = after.getByRole("form", { name, exact: true }), labels = form.locator('label[data-slot="choice"]');
    await expect(labels).toHaveCount(3);
    const paints = await labels.evaluateAll(nodes => nodes.map(node => {
      const css = getComputedStyle(node), box = node.getBoundingClientRect();
      return { tag: node.tagName, nestedLabels: node.querySelectorAll("label").length, inputs: node.querySelectorAll("input").length, sharedCard: node.classList.contains("rain-selection-card"), border: css.border, color: css.color, background: css.backgroundColor, backgroundImage: css.backgroundImage, radius: css.borderRadius, padding: css.padding, width: box.width, height: box.height };
    }));
    expect(paints[0]).toMatchObject({ tag: "LABEL", nestedLabels: 0, inputs: 1, sharedCard: true });
    expect(paints[1], `${name} function`).toEqual(paints[0]); expect(paints[2], `${name} element`).toEqual(paints[0]);
    if (name === "custom-invalid") for (const label of await labels.all()) await expect(label).toHaveCSS("border-color", invalidBorder);
    report.push({ name, paints });
  }
  const select = after.getByRole("combobox", { name: "Select sibling", exact: true }), textarea = after.getByRole("textbox", { name: "Textarea sibling", exact: true });
  for (const target of [normal, invalid, readonly, select, textarea]) {
    await target.focus(); await target.press("Tab"); await page.keyboard.press("Shift+Tab");
    await expect(target).toBeFocused(); await expect(target.locator("..")).toHaveCSS("outline-width", "1px");
    report.push(await target.evaluate(node => { const css = getComputedStyle(node.parentElement!); return { label: node.getAttribute("aria-label"), outline: css.outline, shadow: css.boxShadow }; }));
  }
  if (info.project.name === "narrow") {
    await normal.scrollIntoViewIfNeeded();
    const box = (await normal.boundingBox())!; expect(box.height).toBeGreaterThanOrEqual(44);
    for (const y of [box.y + 2, box.y + box.height - 2]) {
      await normal.evaluate(node => (node as HTMLInputElement).blur()); await page.mouse.click(box.x + box.width / 2, y); await expect(normal).toBeFocused();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    report.push({ actualInputHeight: box.height, topAndBottomClicksFocus: true });
  }
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  for (const target of [normal, select, textarea]) {
    await target.focus(); await target.press("Tab"); await page.keyboard.press("Shift+Tab");
    await expect(target.locator("..")).toHaveCSS("outline-width", "2px"); await expect(target.locator("..")).toHaveCSS("box-shadow", "none");
  }
  await choice.focus(); await expect(shape).toHaveCSS("outline-width", "2px");
  const placeholder = await normal.evaluate(node => getComputedStyle(node, "::placeholder").color);
  expect(placeholder).not.toBe("rgba(0, 0, 0, 0)");
  await after.screenshot({ path: resolve(evidence, `forced-colors-${info.project.name}.png`) });
  writeFileSync(resolve(evidence, `focus-hit-area-${info.project.name}.json`), JSON.stringify({ report, placeholder }, null, 2));
});

test("baseline/current ordinary DOM-paint-geometry equality and questionnaire visual matrix", async ({ page }, info) => {
  test.setTimeout(120_000);
  const report = [];
  for (const theme of ["light", "dark"] as const) for (const density of ["default", "compact"] as const) {
    await mount(page, { mode: "visual", theme, density });
    const records = [];
    for (const era of ["before", "after"]) {
      const panel = page.locator(`[data-reuse-era="${era}"]`), ordinary = panel.locator('[data-visual="ordinary"]');
      const facts = await ordinary.evaluate(host => {
        const origin = host.getBoundingClientRect();
        return [...host.querySelectorAll("*")].map(node => {
          const css = getComputedStyle(node), r = node.getBoundingClientRect();
          const round = (n: number) => Math.round(n * 100) / 100;
          return { tag: node.tagName, classes: [...node.classList].sort(), slot: node.getAttribute("data-slot"), state: node.getAttribute("data-state"), text: node.childElementCount ? null : node.textContent,
            input: node instanceof HTMLInputElement ? { type: node.type, checked: node.checked, disabled: node.disabled, mixed: node.indeterminate } : null,
            box: { x: round(r.x - origin.x), y: round(r.y - origin.y), width: round(r.width), height: round(r.height) },
            css: { color: css.color, background: css.backgroundColor, backgroundImage: css.backgroundImage, border: css.border, radius: css.borderRadius, padding: css.padding, gap: css.gap, font: css.font, opacity: css.opacity, outline: css.outline, shadow: css.boxShadow } };
        });
      });
      records.push({ era, facts });
      await ordinary.screenshot({ path: resolve(evidence, `ordinary-${era}-${theme}-${density}-${info.project.name}.png`) });
      await panel.locator('[data-visual="questionnaire"]').screenshot({ path: resolve(evidence, `questionnaire-${era}-${theme}-${density}-${info.project.name}.png`) });
    }
    expect(records[0]!.facts).toEqual(records[1]!.facts);
    report.push({ theme, density, records });
  }
  writeFileSync(resolve(evidence, `before-after-${info.project.name}.json`), JSON.stringify({ note: "Before TSX is copied from the frozen task baseline; relative behavior dependencies resolve to unchanged live helpers. Before global CSS is scoped with native @scope; before questionnaire class names and CSS are renamed together. Original controls must match DOM/paint/geometry. Questionnaire screenshots document the intentional visual change and await human acceptance.", report }, null, 2));
});
