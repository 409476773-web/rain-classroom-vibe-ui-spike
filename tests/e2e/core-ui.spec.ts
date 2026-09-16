import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buttonColorRecipes, validateButtonColorRecipe } from "../../packages/foundations/src/button-token-contract";
import { contrastRatio } from "./color-contrast";

test("Button Token recipes paint their real surfaces and preserve loading readability", async ({ page }) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#button-tokens");
  const region = page.locator('[aria-labelledby="button-token-appearances-title"]');
  let lightLoading: { background: string; label: string; icon: string } | undefined;
  for (const theme of ["light", "dark"] as const) {
    await page.getByRole("combobox", { name: "主题", exact: true }).selectOption(theme, { timeout: 5000 });
    for (const [surface, parent] of [["task", "Background/Neutral/1"], ["page", "Background/Neutral/3"]] as const) {
      await page.getByRole("combobox", { name: "按钮所在底色", exact: true }).selectOption(surface, { timeout: 5000 });
      for (const recipe of buttonColorRecipes) {
        const state = recipe.state === "hover" || recipe.state === "pressed" ? "default" : recipe.state;
        const button = region.locator(`button[data-variant="${recipe.variant}"][data-tone="${recipe.tone}"][data-state="${state}"]`);
        await page.mouse.move(0, 0);
        if (recipe.state === "hover" || recipe.state === "pressed") await button.hover();
        if (recipe.state === "pressed") await page.mouse.down();
        const actual = await button.evaluate((element) => {
          const style = getComputedStyle(element);
          const canvas = document.createElement("canvas");
          canvas.width = canvas.height = 1;
          const ctx = canvas.getContext("2d")!;
          function color(value: string) {
            ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = value; ctx.fillRect(0, 0, 1, 1);
            const values = Array.from(ctx.getImageData(0, 0, 1, 1).data);
            return { rgb: values.slice(0, 3), alpha: values[3]! / 255 };
          }
          function over(top: { rgb: number[]; alpha: number }, bottom: number[]) {
            return top.rgb.map((channel, i) => channel * top.alpha + bottom[i]! * (1 - top.alpha));
          }
          const base = color(getComputedStyle(element.closest(".button-token-review__samples")!).backgroundColor).rgb;
          const inner = over(color(style.backgroundColor), base);
          const opacity = Number(style.opacity);
          const background = over({ rgb: inner, alpha: opacity }, base);
          const label = getComputedStyle(element.querySelector('[data-slot="label"]')!);
          const labelColor = color(label.color);
          labelColor.alpha *= Number(label.opacity);
          const foreground = over({ rgb: over(labelColor, inner), alpha: opacity }, base);
          const indicator = element.querySelector('[data-slot="loading-indicator"]');
          const icon = indicator ? getComputedStyle(indicator) : undefined;
          const iconColor = icon ? color(icon.color) : undefined;
          if (iconColor) iconColor.alpha *= Number(icon!.opacity);
          const iconForeground = iconColor ? over({ rgb: over(iconColor, inner), alpha: opacity }, base) : undefined;
          return { background, foreground, iconForeground, opacity, css: { background: style.backgroundColor, label: label.color, icon: icon?.color ?? "" } };
        });
        if (recipe.state === "pressed") await page.mouse.up();
        const expected = validateButtonColorRecipe(recipe, theme, parent);
        expect(actual.opacity, recipe.id).toBe(recipe.opacity);
        for (let channel = 0; channel < 3; channel++) expect(Math.abs(actual.background[channel]! - expected.paintedBackground.rgb[channel]!), `${recipe.id}/${theme}/${surface} background`).toBeLessThan(1.2);
        if (recipe.state !== "disabled") {
          const textContrast = contrastRatio(`rgb(${actual.foreground.join(",")})`, `rgb(${actual.background.join(",")})`);
          if (expected.acceptedTextContrastException) {
            expect([recipe.variant, recipe.tone]).toEqual(["primary", "danger"]);
            expect(textContrast).toBeLessThan(4.5);
            expect(Math.abs(textContrast - expected.textContrast)).toBeLessThan(0.05);
          } else expect(textContrast, `${recipe.id}/${theme}/${surface}`).toBeGreaterThanOrEqual(4.5);
        }
        if (actual.iconForeground) expect(contrastRatio(`rgb(${actual.iconForeground.join(",")})`, `rgb(${actual.background.join(",")})`), `${recipe.id}/${theme}/${surface} loading icon`).toBeGreaterThanOrEqual(3);
        if (theme === "light" && surface === "task" && recipe.variant === "primary" && recipe.tone === "default" && recipe.state === "loading") lightLoading = actual.css;
      }
      // Tab must show two token-backed rings for every active and loading appearance.
      await page.mouse.move(0, 0);
      await page.getByRole("combobox", { name: "默认密度", exact: true }).focus();
      for (const button of await region.locator('button:not([disabled])').all()) {
        await page.keyboard.press("Tab");
        await expect(button).toBeFocused();
        const ring = await button.evaluate((element) => {
          const css = getComputedStyle(element);
          return { outline: css.outlineColor, width: css.outlineWidth, offset: css.outlineOffset, shadow: css.boxShadow };
        });
        expect(ring.outline).toBe(theme === "light" ? "rgb(61, 123, 255)" : "rgb(42, 93, 203)");
        expect(ring.width).toBe("1px");
        expect(ring.offset).toBe("0px");
        expect(ring.shadow).toContain(theme === "light" ? "rgba(61, 123, 255, 0.2)" : "rgba(56, 96, 255, 0.3)");
        expect(ring.shadow).toContain(await button.getAttribute("data-variant") === "primary" ? "0px 0px 0px 4px" : "0px 0px 0px 3px");
      }
      await region.locator("button").last().evaluate((button) => (button as HTMLElement).blur());
      const iconPairs = await page.locator('[aria-labelledby="button-token-sizes-title"] tbody button').evaluateAll((buttons) => buttons.map((button) => ({
        leading: getComputedStyle(button.querySelector('[data-slot="leading-icon"]')!).color,
        trailing: getComputedStyle(button.querySelector('[data-slot="trailing-icon"]')!).color,
      })));
      expect(iconPairs).toHaveLength(8);
      for (const pair of iconPairs) expect(pair.trailing, `${theme}/${surface} secondary icon`).not.toBe(pair.leading);
    }
  }
  const measured = await page.locator('[aria-labelledby="button-token-sizes-title"]').locator("tbody button").evaluateAll((buttons) => buttons.map((button) => {
    const css = getComputedStyle(button);
    return [parseFloat(css.height), parseFloat(css.paddingInlineStart), parseFloat(css.gap), parseFloat(css.paddingBlockStart)];
  }));
  expect(measured).toEqual([[28,12,4,0],[32,20,4,0],[36,20,4,0],[40,24,4,0],[48,28,6,0],[20,6,4,3],[24,6,4,3],[26,6,4,3]]);
  // Use the real rendered Button to check that a Light island restores aliases inside Dark.
  const nestedLight = await region.locator('button[data-variant="primary"][data-tone="default"][data-state="loading"]').evaluate((button) => {
    const scope = document.createElement("div");
    scope.dataset.rainTheme = "light";
    const clone = button.cloneNode(true) as HTMLButtonElement;
    scope.append(clone);
    button.parentElement!.append(scope);
    const result = { background: getComputedStyle(clone).backgroundColor, label: getComputedStyle(clone.querySelector('[data-slot="label"]')!).color, icon: getComputedStyle(clone.querySelector('[data-slot="loading-indicator"]')!).color };
    scope.remove();
    return result;
  });
  expect(nestedLight).toEqual(lightLoading);
});

const runtimeEnvironment = (
  globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }
).process?.env ?? {};

test("the Day 3 Core UI page exposes truthful families and real interaction", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.getByRole("link", { name: /Components/i }).click();
  await expect(page).toHaveURL(/#components$/);

  const title = page.getByRole("heading", {
    level: 1,
    name: "Core UI，把高频动作先做准",
  });
  await expect(title).toBeFocused();
  await expect(page.locator('[data-rain-id="core-ui-page"]')).toHaveAttribute(
    "data-maturity",
    "prototype-ready",
  );
  await expect(page.locator('[data-slot="component-family"]')).toHaveCount(6);
  await expect(page.getByRole('link', { name: '查看 Tabs 全部用法' })).toHaveAttribute('href', '#tabs');
  await expect(page.getByText("prototype-ready")).toHaveCount(4);
  await expect(page.getByText("分批验收")).toBeVisible();
  await expect(
    page.getByText(/Input \/ Select 及 Dropdown \/ Popover 已完成各自视觉验收/),
  ).toBeVisible();

  const actionOutput = page.getByTestId("button-action-count");
  const primaryButton = page.getByRole("button", { name: "创建课程" });
  await primaryButton.click();
  await expect(actionOutput).toContainText("1 次");

  await primaryButton.focus();
  await page.keyboard.press("Enter");
  await expect(actionOutput).toContainText("2 次");
  await page.keyboard.press("Space");
  await expect(actionOutput).toContainText("3 次");

  const loadingButton = page.getByRole("button", {
    name: "保存课程，正在处理",
  });
  await expect(loadingButton).toHaveAttribute("aria-busy", "true");
  await expect(loadingButton).toHaveAttribute("aria-disabled", "true");
  await expect(loadingButton).not.toHaveAttribute("disabled");
  await loadingButton.focus();
  await page.keyboard.press("Enter");
  await expect(actionOutput).toContainText("3 次");

  await primaryButton.focus();
  const focusStyle = await primaryButton.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      boxShadow: style.boxShadow,
      outlineStyle: style.outlineStyle,
    };
  });
  expect(focusStyle.boxShadow).toContain("rgba(61, 123, 255, 0.2)");
  expect(focusStyle.boxShadow).toMatch(
    /rgb\(255, 255, 255\) 0px 0px 0px 1px/,
  );
  expect(focusStyle.boxShadow).toMatch(
    /rgba\(61, 123, 255, 0\.2\) 0px 0px 0px 4px/,
  );
  expect(focusStyle.outlineStyle).not.toBe("none");

  for (const name of ["继续编辑", "保存草稿"]) {
    const outlinedButton = page.getByRole("button", { name });
    await outlinedButton.focus();
    const outlinedFocus = await outlinedButton.evaluate((element) => {
      const style = getComputedStyle(element);
      return { borderColor: style.borderColor, boxShadow: style.boxShadow };
    });
    expect(outlinedFocus.borderColor).toBe("rgb(61, 123, 255)");
    expect(outlinedFocus.boxShadow).toMatch(
      /rgba\(61, 123, 255, 0\.2\) 0px 0px 0px 3px/,
    );
  }

  await primaryButton.evaluate((element) => element.blur());
  await primaryButton.hover();
  await expect(primaryButton).toHaveCSS("background-color", "rgba(0, 58, 173, 0.85)");
  await expect(primaryButton).toHaveCSS("box-shadow", "none");
  const primaryBox = await primaryButton.boundingBox();
  expect(primaryBox).not.toBeNull();
  if (primaryBox) {
    await page.mouse.move(
      primaryBox.x + primaryBox.width / 2,
      primaryBox.y + primaryBox.height / 2,
    );
    await page.mouse.down();
    await expect(primaryButton).toHaveCSS("background-color", "rgba(0, 58, 173, 0.85)");
    await expect(primaryButton).toHaveCSS("border-color", "rgb(61, 123, 255)");
    await expect(primaryButton).toHaveCSS("transform", "none");
    await page.mouse.up();
    await expect(actionOutput).toContainText("4 次");
  }

  const primaryDisabled = page.getByRole("button", { name: "主按钮停用" });
  const secondaryDisabled = page.getByRole("button", { name: "次按钮停用" });
  const tertiaryDisabled = page.getByRole("button", { name: "三级按钮停用" });
  await expect(primaryDisabled).toBeDisabled();
  await expect(secondaryDisabled).toBeDisabled();
  await expect(tertiaryDisabled).toBeDisabled();
  await expect(primaryDisabled).toHaveCSS("opacity", "0.3");
  await expect(secondaryDisabled).toHaveCSS("opacity", "0.4");
  await expect(tertiaryDisabled).toHaveCSS("opacity", "0.4");
  const disabledAppearance = await Promise.all(
    [primaryDisabled, secondaryDisabled, tertiaryDisabled].map((button) =>
      button.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
          transform: style.transform,
        };
      }),
    ),
  );
  for (const [index, button] of [
    primaryDisabled,
    secondaryDisabled,
    tertiaryDisabled,
  ].entries()) {
    await button.hover({ force: true });
    const box = await button.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      expect(
        await button.evaluate((element) => {
          const style = getComputedStyle(element);
          return {
            backgroundColor: style.backgroundColor,
            borderColor: style.borderColor,
            transform: style.transform,
          };
        }),
      ).toEqual(disabledAppearance[index]);
      await page.mouse.up();
    }
  }

  const dangerButton = page.getByRole("button", { name: "删除课程" });
  await expect(dangerButton).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(dangerButton).toHaveCSS("color", "rgb(202, 39, 50)");
  await expect(dangerButton).toHaveCSS("border-color", "rgb(245, 186, 188)");
  const solidDangerButton = page.getByRole("button", { name: "确认永久删除" });
  await expect(solidDangerButton).toHaveCSS("background-color", "rgb(243, 72, 72)");
  await expect(solidDangerButton).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(solidDangerButton).toHaveCSS("border-color", "rgba(0, 0, 0, 0)");
  await dangerButton.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(solidDangerButton).toBeFocused();
  const dangerFocus = await solidDangerButton.evaluate(
    (element) => getComputedStyle(element).boxShadow,
  );
  expect(dangerFocus).toMatch(/rgb\(255, 255, 255\) 0px 0px 0px 1px/);
  expect(dangerFocus).toMatch(
    /rgba\(61, 123, 255, 0\.2\) 0px 0px 0px 4px/,
  );
  await solidDangerButton.evaluate((element) => element.blur());
  await solidDangerButton.hover();
  await expect(solidDangerButton).toHaveCSS("filter", "none");
  await expect(solidDangerButton).toHaveCSS("box-shadow", "none");

  const secondaryButton = page.getByRole("button", { name: "继续编辑" });
  await expect(secondaryButton).toHaveCSS("background-color", "rgb(224, 234, 255)");
  await expect(secondaryButton).toHaveCSS("border-color", "rgb(100, 149, 255)");
  await expect(secondaryButton).toHaveCSS("color", "rgb(15, 85, 223)");
  await expect(page.getByRole("button", { name: "保存草稿" })).toHaveCSS(
    "color",
    "rgb(73, 93, 135)",
  );

  for (const [name, height, fontSize, minWidth, radius] of [
    ["28 · Mini", "28px", "13px", "64px", "6px"],
    ["32 · Small", "32px", "14px", "64px", "6px"],
    ["36 · Medium", "36px", "14px", "64px", "6px"],
    ["40 · Large", "40px", "14px", "80px", "6px"],
    ["48 · XL", "48px", "16px", "160px", "8px"],
  ] as const) {
    const sizeButton = page.getByRole("button", { name });
    await expect(sizeButton).toHaveCSS("height", height);
    await expect(sizeButton).toHaveCSS("font-size", fontSize);
    await expect(sizeButton).toHaveCSS("min-width", minWidth);
    await expect(sizeButton).toHaveCSS("border-radius", radius);
  }
  await expect(page.getByRole("button", { name: "40 · Large" })).toHaveCSS(
    "padding-left",
    "24px",
  );

  await expect(page.getByRole("button", { name: "紧凑筛选" })).toHaveCSS(
    "height",
    "32px",
  );

  const loadingIndicator = loadingButton.locator('[data-slot="loading-indicator"]');
  await expect(loadingIndicator).toHaveCSS("width", "16px");
  await expect(loadingIndicator).toHaveCSS("animation-name", "rain-button-loading-spin");
  const maskImage = await loadingIndicator.evaluate((element) => getComputedStyle(element).maskImage);
  if (maskImage.includes("data:image/png;base64,")) {
    const loadingAsset = readFileSync(fileURLToPath(new URL("../../packages/ui/src/icons/assets/button-loading.png", import.meta.url))).toString("base64");
    expect(maskImage).toContain("data:image/png;base64," + loadingAsset);
  } else {
    expect(maskImage).toContain("button-loading");
  }
  await expect(loadingButton).toHaveCSS("opacity", "1");
  await expect(loadingButton.locator('[data-slot="loading-overlay"]')).toHaveCount(0);

  const blockHost = page.locator('[data-testid="button-block-host"]');
  const blockButton = page.getByRole("button", { name: "窄栏中的整行主要操作" });
  const [hostBox, blockBox] = await Promise.all([
    blockHost.boundingBox(),
    blockButton.boundingBox(),
  ]);
  expect(hostBox).not.toBeNull();
  expect(blockBox).not.toBeNull();
  expect(blockBox?.width).toBeCloseTo(hostBox?.width ?? 0, 0);

  const longLabelButton = page.getByRole("button", {
    name: "为本课程批量生成全部章节的课堂练习",
  });
  await expect(longLabelButton).toHaveAttribute(
    "title",
    "为本课程批量生成全部章节的课堂练习",
  );
  const longLabelStyle = await longLabelButton.locator('[data-slot="label"]').evaluate(
    (element) => {
      const style = getComputedStyle(element);
      return {
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        textOverflow: style.textOverflow,
        whiteSpace: style.whiteSpace,
      };
    },
  );
  expect(longLabelStyle.whiteSpace).toBe("nowrap");
  expect(longLabelStyle.textOverflow).toBe("ellipsis");
  expect(longLabelStyle.scrollWidth).toBeGreaterThan(longLabelStyle.clientWidth);

  const naturalLabelStyle = await page
    .getByRole("button", { name: "为本课程批量生成课堂练习" })
    .locator('[data-slot="label"]')
    .evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
  expect(naturalLabelStyle.scrollWidth).toBe(naturalLabelStyle.clientWidth);

  const courseName = page.getByRole("textbox", { name: "课程名称" });
  await courseName.fill("人工智能导论");
  const clear = page.getByRole("button", { name: "清除课程名称" });
  await clear.click();
  await expect(courseName).toHaveValue("");
  await expect(courseName).toBeFocused();

  await page.getByRole("link", { name: "查看 Input 全部用法", exact: true }).click();
  await expect(page).toHaveURL(/#input$/);
  await expect(page.getByRole("heading", { name: "Input 输入框", exact: true })).toBeFocused();
  await page.getByRole("link", { name: "返回组件总览", exact: true }).click();
  await page.getByRole("link", { name: "查看 Select 全部用法", exact: true }).click();
  await expect(page).toHaveURL(/#select$/);
  await expect(page.getByRole("heading", { name: "Select 选择器", exact: true })).toBeFocused();
  await page.getByRole("link", { name: "返回组件总览", exact: true }).click();
  await expect(page.getByRole("button", { name: "查看", exact: true })).toHaveCSS(
    "height",
    "28px",
  );

  const removeTag = page.getByRole("button", { name: "移除标签 重点" });
  await removeTag.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("removable-tag-fixture")).toHaveCount(0);
  await expect(page.locator('[data-rain-id="ui-badge"]')).toHaveCount(4);
  await expect(page.locator('[data-rain-id="ui-badge"][tabindex]')).toHaveCount(0);
  await expect(page.locator('[data-rain-id="ui-badge"] button')).toHaveCount(0);
  await expect(page.getByLabel("资源更新，3 条更新")).toBeVisible();

  const pageSurface = page.locator('[data-rain-id="ui-surface"][data-variant="page"]');
  const panelSurface = page.locator('[data-rain-id="ui-surface"][data-variant="panel"]');
  const raisedSurface = page.locator('[data-rain-id="ui-surface"][data-variant="raised"]');
  await expect(pageSurface).toHaveCSS("border-top-width", "0px");
  await expect(pageSurface).toHaveCSS("border-radius", "0px");
  await expect(panelSurface).toHaveCSS("border-top-width", "1px");
  await expect(panelSurface).toHaveCSS("border-radius", "8px");
  await expect(raisedSurface).toHaveCSS("box-shadow", "none");
  await expect(page.locator('[data-rain-id="ui-card"]')).toHaveCount(2);
  await expect(page.locator('[data-rain-id="ui-card"][role="button"]')).toHaveCount(0);
  await expect(page.locator("nav, aside")).toHaveCount(0);

  const screenshotPath =
    runtimeEnvironment.RAIN_UPDATE_DAY_3_EVIDENCE === "1"
      ? "evidence/runtime/day-3/core-ui-page.png"
      : testInfo.outputPath("core-ui-page.png");
  await page.reload();
  const freshPrimaryButton = page.getByRole("button", { name: "创建课程" });
  await freshPrimaryButton.focus();
  await page.screenshot({ fullPage: true, path: screenshotPath });
});

test("Tag retains its global Tab ring in both themes and forced colors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#components");
  const remove = page.getByRole("button", { name: "移除标签 重点", exact: true });
  for (const theme of ["light", "dark"] as const) {
    await page.evaluate((value) => { document.documentElement.dataset.rainTheme = value; }, theme);
    await remove.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(remove).toBeFocused();
    const ring = await remove.evaluate((element) => {
      const style = getComputedStyle(element);
      return { visible: element.matches(":focus-visible"), color: style.outlineColor, width: style.outlineWidth, offset: style.outlineOffset, shadow: style.boxShadow, opacity: style.opacity };
    });
    const color = theme === "light" ? "rgb(61, 123, 255)" : "rgb(42, 93, 203)";
    const halo = theme === "light" ? "rgba(61, 123, 255, 0.2)" : "rgba(56, 96, 255, 0.3)";
    expect(ring).toEqual({ visible: true, color, width: "1px", offset: "0px", opacity: "1", shadow: `${halo} 0px 0px 0px 3px` });
  }
  await page.emulateMedia({ forcedColors: "active" });
  await remove.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(remove).toBeFocused();
  await expect(remove).toHaveCSS("outline-width", "2px");
  await expect(remove).toHaveCSS("box-shadow", "none");
  await expect(remove).not.toHaveCSS("outline-color", "rgba(0, 0, 0, 0)");
});

test("Core UI keeps focus visible and motion optional in user preference modes", async ({
  page,
}) => {
  await page.goto("/#components");
  const loadingIndicator = page.locator('[data-slot="loading-indicator"]').first();
  await expect(loadingIndicator).not.toHaveCSS("animation-name", "none");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(loadingIndicator).toHaveCSS("animation-name", "none");

  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const primaryButton = page.getByRole("button", { name: "创建课程" });
  await primaryButton.focus();
  await expect(primaryButton).toBeFocused();
  await expect(primaryButton).not.toHaveCSS("outline-style", "none");
});
