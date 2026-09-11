import { expect, test, type Locator } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { contrastRatio } from "./color-contrast";

function root(control: Locator) { return control.locator("xpath=.."); }

for (const theme of ["light", "dark"] as const) test(`implemented Input placeholders preserve real permissions and shared search in ${theme}`, async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#input");
  await page.evaluate(async ({ theme, uiPath }) => {
    const reactPath = "/node_modules/.vite/deps/react.js", clientPath = "/node_modules/.vite/deps/react-dom_client.js";
    const { createElement: h } = (await import(reactPath)).default;
    const { createRoot } = (await import(clientPath)).default;
    const { Input, SearchInput, FormItem } = await import(uiPath);
    document.getElementById("root")!.style.display = "none";
    const host = document.createElement("section");
    host.id = "input-closure-fixture"; host.setAttribute("data-rain-theme", theme);
    host.style.cssText = "padding:24px;background:var(--rain-category-background-neutral-1);color:var(--rain-category-text-neutral-1);font-family:var(--rain-font-ui)";
    document.body.append(host);
    const cells = ["outlined", "filled", "underlined"].flatMap(appearance => [24, 28, 32, 36].map(size => h("section", { key: `${appearance}-${size}`, "data-closure-cell": `${appearance}-${size}`, style: { display: "grid", gap: "12px", alignContent: "start" } },
        h("h2", { style: { fontSize: "16px", margin: 0 } }, `${theme} · ${appearance} · ${size}px · 实施后`),
        ...["normal", "warning", "error", "readonly", "disabled", "inherited-disabled", "search", "search-loading"].map(state => {
          const label = `${appearance} ${size} ${state}`;
          const props = { appearance, size, placeholder: "输入课程名称", "aria-label": label, readOnly: state === "readonly", disabled: state === "disabled", status: ["warning", "error"].includes(state) ? state : "default" };
          const control = state.startsWith("search") ? h(SearchInput, { ...props, loading: state === "search-loading" }) : h(Input, props);
          return h("div", { key: state, "data-closure-input": state, style: { display: "grid", gap: "4px" } },
            state === "inherited-disabled" ? h(FormItem, { label, disabled: true }, control) : [h("span", { key: "label", style: { fontSize: "12px" } }, state), control]);
        }))));
    createRoot(host).render(h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" } }, ...cells));
  }, { theme, uiPath: `/@fs${new URL("../../packages/ui/src/index.ts", import.meta.url).pathname}` });
  const host = page.locator("#input-closure-fixture");
  await expect(host.locator("input")).toHaveCount(96);
  const foreground = theme === "light" ? "rgb(116, 133, 168)" : "rgb(136, 145, 173)";
  const disabledForeground = theme === "light" ? "rgb(160, 172, 197)" : "rgb(111, 122, 158)";
  const records: unknown[] = [];
  async function record(control: Locator, interaction: string) {
    const paint = await control.evaluate(node => {
      const input = node as HTMLInputElement, frame = input.closest('[data-rain-id="ui-input"]')!;
      const css = getComputedStyle(input), placeholder = getComputedStyle(input, "::placeholder"), frameCss = getComputedStyle(frame);
      return { appearance: frame.getAttribute("data-appearance"), size: frame.getAttribute("data-size"),
        state: input.closest("[data-closure-input]")!.getAttribute("data-closure-input"), permission: frame.getAttribute("data-permission"),
        disabled: input.disabled, readOnly: input.readOnly, value: input.value, shown: input.matches(":placeholder-shown"),
        focused: input === document.activeElement, focusVisible: input.matches(":focus-visible"), hover: input.matches(":hover"),
        placeholder: placeholder.color, placeholderOpacity: placeholder.opacity, foreground: css.color,
        background: frameCss.backgroundColor, parentBackground: getComputedStyle(document.getElementById("input-closure-fixture")!).backgroundColor,
        border: frameCss.borderColor, outline: frameCss.outlineColor, shadow: frameCss.boxShadow, fontSize: css.fontSize, lineHeight: css.lineHeight };
    });
    expect(paint.placeholder).toBe(paint.disabled ? disabledForeground : foreground);
    expect(paint.placeholderOpacity).toBe("1");
    expect(paint.shown).toBe(true);
    expect(paint.disabled).toBe(["disabled", "inherited-disabled"].includes(paint.state!));
    expect(paint.readOnly).toBe(paint.state === "readonly");
    expect(paint.permission).toBe(paint.disabled ? "disabled" : paint.readOnly ? "readonly" : "editable");
    const contrast = contrastRatio(paint.placeholder, paint.background, paint.parentBackground);
    records.push({ theme, interaction, ...paint, contrast, contrastRequired: paint.disabled ? null : 4.5, contrastPass: paint.disabled ? null : contrast >= 4.5 });
    return paint;
  }
  for (const control of await host.locator("input").all()) await record(control, "normal");
  const directory = process.env.RAIN_CLOSURE_EVIDENCE_DIR;
  if (directory) mkdirSync(directory, { recursive: true });
  const artifact = (name: string) => directory ? `${directory}/${name}` : testInfo.outputPath(name);
  await host.locator('[data-closure-cell="outlined-32"]').screenshot({ path: artifact(`implemented-input-${theme}.png`) });
  for (const appearance of ["outlined", "filled", "underlined"]) for (const size of [24, 28, 32, 36]) {
    const cell = host.locator(`[data-closure-cell="${appearance}-${size}"]`);
    const input = cell.locator('[data-closure-input="normal"] input');
    await input.hover(); expect((await record(input, "hover")).hover).toBe(true);
    await input.focus(); await input.press("Tab"); await page.keyboard.press("Shift+Tab");
    expect((await record(input, "keyboard-focus")).focusVisible).toBe(true);
    const readonly = cell.locator('[data-closure-input="readonly"] input');
    await readonly.focus(); await readonly.press("Tab"); await page.keyboard.press("Shift+Tab");
    expect((await record(readonly, "readonly-keyboard-focus")).focusVisible).toBe(true);
    await readonly.press("x"); await expect(readonly).toHaveValue("");
  }
  const restored = host.locator('[data-closure-cell="outlined-32"] [data-closure-input="normal"] input');
  await restored.fill("课程草稿"); await root(restored).getByRole("button", { name: "清除outlined 32 normal", exact: true }).click();
  await expect(restored).toBeFocused(); await record(restored, "after-clear");
  writeFileSync(artifact(`implemented-input-${theme}.json`), JSON.stringify({ scope: "Real Input/SearchInput/FormItem props; three appearances x four sizes; empty normal/warning/error/readonly/disabled/inherited-disabled/search/loading; native hover and keyboard focus. No manually assigned component state or color overrides.", theme, records }, null, 2));
});

test("Input preserves normal and error keyboard focus paints in its family page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#input");
  const input = page.getByRole("textbox", { name: "32 常规", exact: true });
  const error = page.getByRole("textbox", { name: "32 错误", exact: true });
  for (const theme of ["light", "dark"] as const) {
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    const background = await root(error).evaluate((node) => getComputedStyle(node).backgroundColor);
    for (const target of [input, error]) {
      await target.focus();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Shift+Tab");
      await expect(target).toBeFocused();
      const ring = await target.evaluate((node) => {
        const style = getComputedStyle(node.closest('[data-rain-id="ui-input"]')!);
        return { visible: node.matches(":focus-visible"), color: style.outlineColor, width: style.outlineWidth, offset: style.outlineOffset, shadow: style.boxShadow, opacity: style.opacity, background: style.backgroundColor, border: style.borderColor };
      });
      const color = target === error ? theme === "light" ? "rgb(243, 72, 72)" : "rgb(99, 41, 47)" : theme === "light" ? "rgb(61, 123, 255)" : "rgb(42, 93, 203)";
      const halo = target === error ? "rgba(243, 72, 72, 0.18)" : theme === "light" ? "rgba(61, 123, 255, 0.2)" : "rgba(56, 96, 255, 0.3)";
      expect(ring).toMatchObject({ visible: true, color, width: "1px", offset: "0px", opacity: "1", border: "rgba(0, 0, 0, 0)", shadow: `${halo} 0px 0px 0px 3px` });
      if (target === error) expect(ring.background).toBe(background);
    }
  }
  await page.emulateMedia({ forcedColors: "active" });
  for (const target of [input, error]) {
    await target.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(target).toBeFocused();
    await expect(root(target)).toHaveCSS("outline-width", "2px");
    await expect(root(target)).toHaveCSS("box-shadow", "none");
    await expect(root(target)).not.toHaveCSS("outline-color", "rgba(0, 0, 0, 0)");
  }
});

test("one Input family keeps complete Parts, editing and search across appearances", async ({ page }) => {
  await page.clock.install();
  await page.goto("/#input");
  const anatomy = page.getByRole("textbox", { name: "全部附加内容", exact: true });
  const query = page.getByTestId("input-query");
  await anatomy.fill("123456");
  await query.getByRole("textbox").fill("课程草稿");
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    for (const [label, appearance] of [["描边", "outlined"], ["填充", "filled"], ["底线", "underlined"]]) {
      await page.getByRole("group", { name: "输入框外观", exact: true }).getByRole("button", { name: label, exact: true }).click();
      await expect(root(anatomy)).toHaveAttribute("data-appearance", appearance!);
      await expect(anatomy).toHaveValue("123456");
      expect(await root(anatomy).locator(':scope > [data-slot]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-slot"))))
        .toEqual(["leading-icon", "prefix", "prefix-text", "control", "clear-slot", "suffix-text", "suffix", "trailing-icon", "count", "trailing-action"]);
      await expect(root(anatomy).locator('[data-slot="prefix-text"]')).toHaveText("￥");
      await expect(root(anatomy).locator('[data-slot="suffix-text"]')).toHaveText("元");
      await expect(root(anatomy).locator('[data-slot="suffix"]')).toHaveText("含税");
      await expect(root(anatomy).locator('[data-slot="count"]')).toHaveText("6/6");
      await expect(root(anatomy).getByRole("button", { name: "查看价格", exact: true })).toBeEnabled();
      await expect(root(anatomy).locator('[data-slot="clear-slot"]')).toHaveCSS("height", "24px");
      await expect(root(page.getByRole("textbox", { name: "课程学分", exact: true })).getByRole("button", { name: "换算", exact: true })).toHaveCSS("height", "26px");
      const readonly = page.getByRole("textbox", { name: "只读课程编号", exact: true });
      await root(readonly).getByRole("button", { name: "查看", exact: true }).click();
      await expect(page.getByText("已读取：AI-2026", { exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "更新", exact: true })).toBeDisabled();
      const search = query.getByRole("textbox");
      await expect(root(search)).toHaveAttribute("data-appearance", appearance!);
      await expect(search).toHaveValue("课程草稿");
      await expect(root(search)).toHaveCSS("height", "28px");
      await expect(root(page.getByRole("textbox", { name: "紧凑搜索", exact: true }))).toHaveCSS("height", "24px");
      await search.press("Enter");
      await expect(page.getByTestId("input-query-submitted")).toHaveText("最近提交：课程草稿 · enter");
      await query.getByRole("button", { name: "清除课程搜索", exact: true }).click();
      await expect(search).toHaveValue("");
      await expect(search).toBeFocused();
      await expect(page.getByTestId("input-query-submitted")).toHaveText("最近提交：全部课程 · clear");
      await page.clock.runFor(1000);
      await search.fill("课程草稿");
    }
  }
});

test("Input complete sizes, states and actions follow public Tokens in both themes", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1600, height: 1100 });
  await page.goto("/#input");
  for (const theme of ["light", "dark"] as const) {
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    const foreground = await page.locator('[data-rain-id="input-page"]').evaluate((node) => getComputedStyle(node).color);
    await expect(page.getByRole("heading", { name: "Input 输入框", exact: true })).toHaveCSS("color", foreground);
    for (const size of [24, 28, 32, 36]) {
      const control = page.getByRole("textbox", { name: `${size} 已填写`, exact: true });
      const empty = page.getByRole("textbox", { name: `${size} 常规`, exact: true });
      await expect.poll(() => empty.evaluate((node) => getComputedStyle(node, "::placeholder").color)).toBe(theme === "light" ? "rgb(116, 133, 168)" : "rgb(136, 145, 173)");
      await expect(root(control)).toHaveCSS("height", `${size}px`);
      await expect(root(control)).toHaveCSS("column-gap", "4px");
      await expect(root(control)).toHaveCSS("padding-left", size === 24 ? "8px" : "12px");
      await expect(root(control)).toHaveCSS("border-radius", size === 24 ? "4px" : "6px");
      await expect(control).toHaveCSS("font-size", size === 24 ? "13px" : "14px");
      await expect(control).toHaveCSS("line-height", size === 24 ? "18px" : "22px");
      await root(control).hover();
      const clear = root(control).getByRole("button", { name: `清除${size} 已填写` });
      await expect(clear).toHaveCSS("width", "24px");
      await expect(clear).toHaveCSS("height", "24px");
      await expect(clear.locator(".rain-icon")).toHaveCSS("width", "14px");
      await expect(clear.locator(".rain-icon")).toHaveAttribute("data-icon", "icon/circle-close-filled");
      const frame = (await root(control).boundingBox())!;
      const target = (await clear.boundingBox())!;
      const icon = (await clear.locator(".rain-icon").boundingBox())!;
      expect(Math.abs(target.y + target.height / 2 - frame.y - frame.height / 2)).toBeLessThan(0.1);
      expect(Math.abs(icon.y + icon.height / 2 - target.y - target.height / 2)).toBeLessThan(0.1);
      expect(Math.abs(icon.x + icon.width / 2 - target.x - target.width / 2)).toBeLessThan(0.1);
      await control.click();
      await expect(root(control)).toHaveCSS("border-top-width", "1px");
      await expect(root(control)).toHaveCSS("outline-width", "1px");
      await expect(root(control)).toHaveCSS("outline-offset", "0px");
    }
    const error = root(page.getByRole("textbox", { name: "32 错误", exact: true }));
    const expected = await error.evaluate((node) => {
      const css = getComputedStyle(node);
      return { border: css.getPropertyValue("--rain-category-border-red-1").trim(), fill: css.getPropertyValue("--rain-category-fill-red-solid-3").trim() };
    });
    const paint = await error.evaluate((node, tokens) => {
      const probe = document.createElement("span"); node.append(probe);
      probe.style.color = tokens.border; const border = getComputedStyle(probe).color;
      probe.style.color = tokens.fill; const fill = getComputedStyle(probe).color; probe.remove();
      return { border, fill };
    }, expected);
    await expect(error).toHaveCSS("border-color", paint.border);
    await expect(error).toHaveCSS("background-color", paint.fill);
    await page.screenshot({ path: testInfo.outputPath(`${theme}.png`), fullPage: true });
  }
  const compact = page.getByRole("textbox", { name: "紧凑搜索", exact: true });
  await expect(root(compact)).toHaveCSS("height", "24px");
  await expect(root(compact).getByRole("button", { name: "搜索", exact: true })).toHaveCSS("height", "24px");
});

test("reviewed supporting Parts keep their order, tight count and distinct colors", async ({ page }) => {
  await page.goto("/#input");
  for (const theme of ["light", "dark"] as const) {
    await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
    const control = page.getByRole("textbox", { name: "课程学分", exact: true });
    const frame = root(control);
    const unit = frame.locator('[data-slot="suffix-text"]');
    const count = frame.locator('[data-slot="count"]');
    const clear = frame.locator('[data-slot="clear-action"]');
    await control.fill("50");
    await expect(count).toHaveText("2/3");
    await expect(frame).toHaveCSS("column-gap", "4px");
    expect(await frame.locator(':scope > [data-slot]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-slot"))))
      .toEqual(["control", "clear-slot", "suffix-text", "count", "trailing-action"]);
    const colors = await frame.evaluate((node) => {
      const probe = document.createElement("span"); node.append(probe);
      const roles = ["text-neutral-1", "text-neutral-4", "text-neutral-5", "text-orange-1", "text-red-1"] as const;
      const result = {} as Record<(typeof roles)[number], string>;
      for (const role of roles) {
        probe.style.color = `var(--rain-category-${role})`; result[role] = getComputedStyle(probe).color;
      }
      probe.remove(); return result;
    });
    await expect(control).toHaveCSS("color", colors["text-neutral-1"]);
    await expect(unit).toHaveCSS("color", colors["text-neutral-5"]);
    await expect(count).toHaveCSS("color", colors["text-neutral-5"]);
    await expect(frame.getByRole("button", { name: "换算", exact: true })).toHaveAttribute("data-tone", "brand");
    const fixedPositions = await Promise.all([unit.boundingBox(), count.boundingBox()]);
    await page.getByRole("heading", { name: "常用组合", exact: true }).click();
    await page.mouse.move(0, 0);
    await expect(clear).toBeHidden();
    expect(await Promise.all([unit.boundingBox(), count.boundingBox()])).toEqual(fixedPositions);
    const readonly = root(page.getByRole("textbox", { name: "只读课程编号", exact: true }));
    await expect(readonly.getByRole("button", { name: "查看", exact: true })).toHaveAttribute("data-tone", "brand");
    const anatomy = root(page.getByRole("textbox", { name: "全部附加内容", exact: true }));
    await expect(anatomy.locator('[data-slot="prefix-text"]')).toHaveCSS("color", colors["text-neutral-4"]);
    await expect(anatomy.locator('[data-slot="suffix"]')).toHaveCSS("color", colors["text-neutral-4"]);
    for (const size of [24, 28, 32, 36]) {
      for (const [status, color] of [["警告", "text-orange-1"], ["错误", "text-red-1"]] as const) {
        const field = page.getByRole("textbox", { name: `${size} ${status}`, exact: true });
        await expect(root(field).locator('[data-slot="feedback"]')).toHaveCount(0);
        await expect(root(field).locator('xpath=..').locator('[data-slot="message"]')).toHaveCSS("color", colors[color]);
      }
    }
    await expect(root(page.getByRole("textbox", { name: "软限制", exact: true })).locator('[data-slot="count"]')).toHaveCSS("color", colors["text-red-1"]);
  }
});

test("readonly pointer selection has no editing ring while Tab and inner actions retain focus", async ({ page }) => {
  await page.goto("/#input");
  const paddingControl = page.getByRole("textbox", { name: "32 只读", exact: true });
  await root(paddingControl).click({ position: { x: 3, y: 16 } });
  await expect(paddingControl).not.toBeFocused();
  await page.keyboard.press("Tab");
  await expect(paddingControl).toBeFocused();
  await expect(root(paddingControl)).toHaveCSS("outline-width", "1px");
  await page.getByRole("button", { name: "浅色", exact: true }).click();
  await paddingControl.evaluate((node) => node.addEventListener("pointerdown", (event) => event.preventDefault(), { once: true }));
  await paddingControl.click();
  await expect(paddingControl).not.toBeFocused();
  await expect(root(paddingControl)).not.toHaveAttribute("data-pointer-focus");
  await paddingControl.focus();
  await expect(root(paddingControl)).toHaveCSS("outline-width", "1px");
  for (const size of [24, 28, 32, 36]) {
    const control = page.getByRole("textbox", { name: `${size} 只读`, exact: true });
    const before = await root(control).evaluate((node) => ({ border: getComputedStyle(node).borderColor, fill: getComputedStyle(node).backgroundColor }));
    await control.click();
    await expect(control).toBeFocused();
    await expect(root(control)).toHaveCSS("outline-style", "none");
    await expect(root(control)).toHaveCSS("box-shadow", "none");
    await expect(root(control)).toHaveCSS("border-color", before.border);
    await expect(root(control)).toHaveCSS("background-color", before.fill);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(control).toBeFocused();
    await expect(root(control)).toHaveCSS("outline-width", "1px");
    await expect(root(control)).toHaveCSS("background-color", before.fill);
    await control.press("ControlOrMeta+A");
    expect(await control.evaluate((node: HTMLInputElement) => node.selectionEnd! - node.selectionStart!)).toBe("教务系统同步".length);
    await control.press("X");
    await expect(control).toHaveValue("教务系统同步");
  }
  const control = page.getByRole("textbox", { name: "只读课程编号", exact: true });
  await page.getByText("只读课程编号", { exact: true }).click();
  await expect(root(control)).toHaveCSS("outline-style", "none");
  const view = root(control).getByRole("button", { name: "查看", exact: true });
  await control.press("Tab");
  await expect(view).toBeFocused();
  await expect(view).toHaveCSS("outline-width", "1px");
  await view.press("Enter");
  await expect(page.getByText("已读取：AI-2026", { exact: true })).toBeVisible();
  await view.click();
  await expect(root(control)).toHaveCSS("outline-style", "none");
});

test("clear visibility, reserved slot, keyboard focus and forced colors remain usable", async ({ page }) => {
  await page.goto("/#input");
  const control = page.getByRole("textbox", { name: "24 已填写", exact: true });
  const clear = root(control).locator('[data-slot="clear-action"]');
  await page.mouse.move(0, 0);
  await expect(clear).toBeHidden();
  await control.focus();
  await page.keyboard.press("Tab");
  await expect(clear).toBeFocused();
  await expect(clear).toBeVisible();
  const before = await root(control).boundingBox();
  await page.keyboard.press("Enter");
  await expect(control).toHaveValue("");
  await expect(control).toBeFocused();
  expect(await root(control).boundingBox()).toEqual(before);
  await expect(root(control).locator('[data-slot="clear-slot"]')).toHaveCSS("width", "24px");
  await page.emulateMedia({ forcedColors: "active" });
  await expect(root(control)).toHaveCSS("outline-width", "2px");
  await expect(root(control)).toHaveCSS("box-shadow", "none");
  await expect(root(control)).toHaveCSS("border-top-width", "1px");
  await expect(page.getByRole("textbox", { name: "24 禁用", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "更新", exact: true })).toBeDisabled();
});

test("hard editing protects backfilled tails, selection and graphemes in the browser", async ({ page }) => {
  await page.goto("/#input");
  const imeLimit = page.getByRole("textbox", { name: "硬限制", exact: true });
  await imeLimit.focus();
  await imeLimit.evaluate((element, composedValue) => {
    const input = element as HTMLInputElement;
    const valueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )?.set;
    if (!valueSetter) throw new Error("Native input value setter is unavailable");
    input.dispatchEvent(
      new CompositionEvent("compositionstart", { bubbles: true }),
    );
    valueSetter.call(input, composedValue);
    input.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
        data: composedValue,
        inputType: "insertCompositionText",
        isComposing: true,
      }),
    );
    input.dispatchEvent(
      new CompositionEvent("compositionend", {
        bubbles: true,
        data: composedValue,
      }),
    );
    input.dispatchEvent(
      new InputEvent("input", {
        bubbles: true,
        inputType: "insertText",
        isComposing: false,
      }),
    );
  }, "一二三四五六七八九十甲乙丙丁");
  await expect(imeLimit).toHaveValue("一二三四五六");
  await expect(root(imeLimit).locator('[data-slot="count"]')).toHaveText("6/6");
  await page.getByRole("button", { name: "清除硬限制" }).click();
  await expect(imeLimit).toHaveValue("");

  const control = page.getByRole("textbox", { name: "超限回填", exact: true });
  await expect(control).toHaveValue("abcdef");
  await control.focus();
  await control.evaluate((node: HTMLInputElement) => node.setSelectionRange(2, 2));
  await page.keyboard.type("X");
  await expect(control).toHaveValue("abcdef");
  expect(await control.evaluate((node: HTMLInputElement) => node.selectionStart)).toBe(2);
  await control.evaluate((node: HTMLInputElement) => node.setSelectionRange(2, 4));
  await page.keyboard.insertText("XYZ");
  await expect(control).toHaveValue("abXYef");
  await control.evaluate((node: HTMLInputElement) => node.setSelectionRange(node.value.length, node.value.length));
  await control.press("Backspace");
  await expect(control).toHaveValue("abXYe");
  const emoji = page.getByRole("textbox", { name: "硬限制", exact: true });
  await emoji.fill("A👨‍👩‍👧‍👦éBCD!");
  await expect(emoji).toHaveValue("A👨‍👩‍👧‍👦éBCD");
  await emoji.fill("AB");
  await emoji.evaluate((node: HTMLInputElement) => {
    node.dispatchEvent(new CompositionEvent("compositionstart", { bubbles: true }));
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(node, "A课程名称导论B");
    node.dispatchEvent(new InputEvent("input", { bubbles: true, isComposing: true }));
    node.setSelectionRange(7, 7);
  });
  await expect(emoji).toHaveValue("A课程名称导论B");
  await emoji.evaluate((node) => node.dispatchEvent(new CompositionEvent("compositionend", { bubbles: true })));
  await expect(emoji).toHaveValue("A课程名称B");
  expect(await emoji.evaluate((node: HTMLInputElement) => node.selectionStart)).toBe(5);
});

test("search keeps draft separate and applies only the latest response after loading clear", async ({ page }) => {
  await page.goto("/#input");
  await page.clock.install();
  const query = page.getByTestId("input-query");
  const control = query.getByRole("textbox");
  await control.fill("人工智能");
  await control.press("Enter");
  await expect(query.getByRole("button", { name: "搜索", exact: true })).toHaveAttribute("aria-busy", "true");
  await control.fill("正在编辑");
  await control.press("Enter");
  await expect(page.getByTestId("input-query-submitted")).toHaveText("最近提交：人工智能 · enter");
  await query.getByRole("button", { name: "清除课程搜索", exact: true }).click();
  await expect(page.getByTestId("input-query-submitted")).toHaveText("最近提交：全部课程 · clear");
  await page.clock.runFor(200);
  await expect(page.getByTestId("input-query-result")).toHaveText("最新结果：全部课程（必修课）");
  await control.fill("新草稿");
  await page.clock.runFor(1000);
  await expect(page.getByTestId("input-query-result")).toHaveText("最新结果：全部课程（必修课）");
  await expect(control).toHaveValue("新草稿");
});

test("touch exposes clear without hover and the compact page has no horizontal overflow", async ({ browser, baseURL }, testInfo) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/#input");
  const control = page.getByRole("textbox", { name: "24 已填写", exact: true });
  const clear = root(control).getByRole("button", { name: "清除24 已填写", exact: true });
  await expect(clear).toBeVisible();
  await clear.tap();
  await expect(control).toBeFocused();
  await expect(control).toHaveValue("");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.setViewportSize({ width: 320, height: 844 });
  const anatomy = page.getByRole("textbox", { name: "全部附加内容", exact: true });
  expect((await anatomy.boundingBox())!.width).toBeGreaterThanOrEqual(64);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("compact.png"), fullPage: true });
  await context.close();
});
