import { expect, test } from "@playwright/test";

import { contrastRatio } from "./color-contrast";

const runtimeEnvironment = (
  globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }
).process?.env ?? {};

test("confirmed semantic colors share Category sources with separate action paints and theme resets", async ({ page }) => {
  await page.goto("/#foundations");
  const action = page.locator('[data-rain-id="foundation-token-action-primary"]');
  await expect(action.locator(".text-rain-action-primary")).toHaveCSS("color", "rgb(15, 85, 223)");
  await expect(action.locator(".token-swatch")).toHaveCSS("background-color", "rgb(21, 97, 248)");
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(242, 244, 255)");
  const field = page.locator(".fixture-field input").first();
  await expect(field).toHaveCSS("border-color", "rgba(16, 63, 183, 0.16)");
  const placeholder = () => field.evaluate((node) => getComputedStyle(node, "::placeholder").color);
  expect(await placeholder()).toBe("rgb(116, 133, 168)");
  // The requested weak placeholder remains an explicit open contrast result.
  expect(contrastRatio(await placeholder(), "rgb(255, 255, 255)")).toBeCloseTo(3.708, 3);

  const themes = await page.evaluate(() => {
    const outer = document.createElement("div");
    outer.dataset.rainTheme = "dark";
    const reset = document.createElement("div");
    reset.dataset.rainTheme = "light";
    const nested = document.createElement("div");
    nested.dataset.rainTheme = "dark";
    outer.append(reset); reset.append(nested); document.body.append(outer);
    const values = [outer, reset, nested].map((node) => {
      node.style.color = "var(--rain-color-text-secondary)";
      node.style.backgroundColor = "var(--rain-color-surface-page)";
      node.style.borderColor = "var(--rain-color-border-default)";
      const style = getComputedStyle(node);
      return { color: style.color, background: style.backgroundColor, border: style.borderColor };
    });
    outer.remove();
    document.documentElement.style.setProperty("--rain-category-text-neutral-5", "rgb(1 2 3)");
    return values;
  });
  expect(themes[0]).toMatchObject({ color: "rgb(183, 193, 224)", background: "rgb(21, 25, 43)" });
  expect(themes[1]).toEqual({ color: "rgb(73, 93, 135)", background: "rgb(242, 244, 255)", border: "rgba(16, 63, 183, 0.16)" });
  expect(themes[2]).toEqual(themes[0]);
  expect(await placeholder()).toBe("rgb(1, 2, 3)");
  await page.evaluate(() => document.documentElement.style.removeProperty("--rain-category-text-neutral-5"));

  await page.goto("/#input");
  const errorInput = page.locator('.rain-input[data-status="error"]').first();
  await expect(errorInput).toHaveCSS("background-color", "rgb(252, 237, 237)");
  await page.goto("/#components");
  const neutralSolid = page.locator('.rain-tag[data-appearance="solid"][data-tone="neutral"]').first();
  await expect(neutralSolid).toHaveCSS("background-color", "rgb(134, 153, 185)");
  await expect(neutralSolid).toHaveCSS("color", "rgb(255, 255, 255)");
  const link = page.locator("a.rain-link").first();
  await expect(link).toHaveCSS("color", "rgb(15, 85, 223)");
  await link.evaluate((node) => node.parentElement!.setAttribute("data-rain-theme", "dark"));
  await expect(link).toHaveCSS("color", "rgb(124, 165, 255)");
  await link.evaluate((node) => node.setAttribute("data-rain-theme", "light"));
  await expect(link).toHaveCSS("color", "rgb(15, 85, 223)");
});

test("global Tab focus shares two rings across themes, nested Light and forced colors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#foundations");
  const preceding = page.locator('[data-rain-id="foundation-density-default"]').getByRole("button", { name: "保存草稿" });
  for (const scope of ["light", "dark", "nested-light"] as const) {
    await page.evaluate((theme) => {
      document.documentElement.dataset.rainTheme = theme === "light" ? "light" : "dark";
      const main = document.querySelector("main")!;
      if (theme === "nested-light") main.setAttribute("data-rain-theme", "light");
      else main.removeAttribute("data-rain-theme");
    }, scope);
    await preceding.focus();
    for (const id of ["focus-control", "focus-item", "focus-danger"]) {
      await page.keyboard.press("Tab");
      const target = page.getByTestId(id);
      await expect(target).toBeFocused();
      const ring = await target.evaluate((element) => {
        const style = getComputedStyle(element);
        return { visible: element.matches(":focus-visible"), color: style.outlineColor, width: style.outlineWidth, offset: style.outlineOffset, shadow: style.boxShadow };
      });
      expect(ring).toEqual({
        visible: true,
        color: scope === "dark" ? "rgb(42, 93, 203)" : "rgb(61, 123, 255)",
        width: "1px", offset: "0px",
        shadow: `${scope === "dark" ? "rgba(56, 96, 255, 0.3)" : "rgba(61, 123, 255, 0.2)"} 0px 0px 0px 3px`,
      });
    }
  }
  await page.emulateMedia({ forcedColors: "active" });
  await preceding.focus();
  for (const id of ["focus-control", "focus-item", "focus-danger"]) {
    await page.keyboard.press("Tab");
    const target = page.getByTestId(id);
    await expect(target).toBeFocused();
    await expect(target).toHaveCSS("outline-width", "2px");
    await expect(target).toHaveCSS("outline-style", "solid");
    await expect(target).toHaveCSS("box-shadow", "none");
    await expect(target).not.toHaveCSS("outline-color", "rgba(0, 0, 0, 0)");
  }
});

test("keyboard hash navigation focuses the active page title in both directions", async ({
  page,
}) => {
  await page.goto("/");

  const foundationsEntry = page.getByRole("link", { name: /Foundations/i });
  await page.keyboard.press("Tab");
  await expect(foundationsEntry).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/#foundations$/);
  const foundationsTitle = page.getByRole("heading", {
    level: 1,
    name: "Foundations，先让系统说同一种语言",
  });
  await expect(foundationsTitle).toBeFocused();
  await expect(page.locator('h1[tabindex="-1"]')).toHaveCount(1);

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "查看 Token 目录与完整排版方案" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#token-foundations$/);
  await expect(page.getByRole("heading", { level: 1, name: "Token 基础建设" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("link", { name: "返回 Foundations" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#foundations$/);
  await expect(foundationsTitle).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  const returnLink = page.getByRole("link", { name: "返回 Playground" });
  await expect(returnLink).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/#overview$/);
  const overviewTitle = page.getByRole("heading", {
    level: 1,
    name: "Rain Next Playground",
  });
  await expect(overviewTitle).toBeFocused();
  await expect(page.locator('h1[tabindex="-1"]')).toHaveCount(1);
});

for (const historyCase of [
  {
    hash: "",
    title: "Rain Next Playground",
    titleLevel: 1,
  },
  {
    hash: "#benchmarks",
    title: "Benchmark 入口",
    titleLevel: 2,
  },
] as const) {
  test(`browser Back restores ${historyCase.hash || "the empty hash"} and its focus target`, async ({
    page,
  }) => {
    await page.goto(`/${historyCase.hash}`);
    expect(
      await page.evaluate(() => document.activeElement === document.body),
    ).toBe(true);

    await page.getByRole("link", { name: /Foundations/i }).click();
    await expect(page).toHaveURL(/#foundations$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Foundations，先让系统说同一种语言",
      }),
    ).toBeFocused();

    await page.goBack();
    if (historyCase.hash) {
      await expect(page).toHaveURL(new RegExp(`${historyCase.hash}$`));
    } else {
      await expect(page).not.toHaveURL(/#.+$/);
    }
    const target = page.getByRole("heading", {
      level: historyCase.titleLevel,
      name: historyCase.title,
    });
    await expect(target).toBeVisible();
    await expect(target).toHaveAttribute("tabindex", "-1");
    await expect(target).toBeFocused();
  });
}

test("browser Back restores the Core UI page and its focus target", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Components/i }).click();
  await expect(page).toHaveURL(/#components$/);
  const coreTitle = page.getByRole("heading", {
    level: 1,
    name: "Core UI，把高频动作先做准",
  });
  await expect(coreTitle).toBeFocused();

  await page.getByRole("link", { name: "返回 Playground" }).click();
  await expect(page).toHaveURL(/#overview$/);
  await page.goBack();
  await expect(page).toHaveURL(/#components$/);
  await expect(coreTitle).toBeFocused();
});

test("the Day 2 Foundations contract is reachable and inspectable", async (
  { page },
  testInfo,
) => {
  const requireLineSeedEvidence =
    runtimeEnvironment.RAIN_REQUIRE_LINE_SEED === "1" ||
    runtimeEnvironment.RAIN_UPDATE_DAY_2_EVIDENCE === "1";

  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const foundationsEntry = page.getByRole("link", { name: /Foundations/i });
  await expect(foundationsEntry).toHaveAttribute("href", "#foundations");
  await foundationsEntry.click();
  await expect(page).toHaveURL(/#foundations$/);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Foundations，先让系统说同一种语言",
    }),
  ).toBeFocused();
  await expect(page.locator('[data-rain-id="foundations-page"]')).toHaveAttribute(
    "data-slot",
    "foundations-document",
  );
  await expect(page.locator('[data-slot="semantic-token"]')).toHaveCount(42);
  await expect(page.locator('[data-slot="color-layer"]')).toHaveCount(3);
  await expect(
    page.locator('[data-rain-id="foundation-token-text-placeholder"]'),
  ).toContainText("#7485A8");

  const brandPrimary = page.locator(
    '[data-rain-id="foundation-token-brand-primary"]',
  );
  await expect(brandPrimary).toContainText("#1561F8");

  const primaryActionSwatch = page.locator(
    '[data-rain-id="foundation-token-action-primary"] .token-swatch',
  );
  const intelligenceSwatch = page.locator(
    '[data-rain-id="foundation-token-intelligence-gradient"] .token-swatch',
  );
  await expect(primaryActionSwatch).toHaveCSS(
    "background-color",
    "rgb(21, 97, 248)",
  );
  await expect(primaryActionSwatch).toHaveCSS("background-image", "none");
  expect(await intelligenceSwatch.evaluate((node) => getComputedStyle(node).backgroundImage))
    .toContain("linear-gradient");

  const compactContext = page.locator(
    '[data-rain-id="foundation-density-compact"]',
  );
  const defaultContext = page.locator(
    '[data-rain-id="foundation-density-default"]',
  );
  await expect(compactContext).toHaveAttribute("data-density", "compact");
  await expect(defaultContext).toHaveAttribute("data-density", "default");
  await expect(compactContext.getByRole("button", { name: "保存草稿" })).toHaveCSS(
    "height",
    "30px",
  );
  await expect(compactContext.getByRole("button", { name: "保存草稿" })).toHaveCSS(
    "padding-left",
    "10px",
  );
  await expect(compactContext).toHaveCSS("column-gap", "6px");
  await expect(defaultContext.getByRole("button", { name: "保存草稿" })).toHaveCSS(
    "height",
    "36px",
  );
  await expect(defaultContext.getByRole("button", { name: "保存草稿" })).toHaveCSS(
    "padding-left",
    "14px",
  );
  await expect(defaultContext).toHaveCSS("column-gap", "10px");
  const rootDensity = await page.locator(":root").evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      controlHeight: style.getPropertyValue("--rain-density-control-height").trim(),
      controlPaddingInline: style
        .getPropertyValue("--rain-density-control-padding-inline")
        .trim(),
      itemGap: style.getPropertyValue("--rain-density-item-gap").trim(),
    };
  });
  expect(rootDensity).toEqual({
    controlHeight: "36px",
    controlPaddingInline: "14px",
    itemGap: "10px",
  });

  const compactInput = compactContext.getByRole("textbox", {
    name: "Compact 课程名称",
  });
  await expect(compactInput).toHaveAttribute(
    "data-asset-identity",
    "fixture-only",
  );
  await expect(compactInput).toHaveAttribute(
    "aria-describedby",
    "foundation-native-fixture-boundary",
  );
  await expect(
    page.getByText(
      "原生示例用于比较 Density 与 Focus；实际 Input / Button 的外观见组件目录。",
    ),
  ).toBeVisible();
  await compactInput.focus();
  const inputFocusStyle = await compactInput.evaluate((node) => {
    const style = getComputedStyle(node);
    const fixtureStyle = getComputedStyle(
      node.closest(".density-fixture") as HTMLElement,
    );
    return {
      adjacentSurface: fixtureStyle.backgroundColor,
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      boxShadow: style.boxShadow,
      outlineColor: style.outlineColor,
      outlineOffset: Number.parseFloat(style.outlineOffset),
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
    };
  });
  expect(inputFocusStyle).toEqual({
    adjacentSurface: "rgb(255, 255, 255)",
    backgroundColor: "rgb(234, 242, 255)",
    borderColor: "rgb(61, 123, 255)",
    boxShadow: "rgba(61, 123, 255, 0.2) 0px 0px 0px 3px",
    outlineColor: "rgb(61, 123, 255)",
    outlineOffset: 0,
    outlineStyle: "solid",
    outlineWidth: 1,
  });
  expect(
    contrastRatio(
      inputFocusStyle.borderColor,
      inputFocusStyle.adjacentSurface,
    ),
  ).toBeGreaterThanOrEqual(3);

  const dataValue = page.locator('[data-slot="statistic-value"]');
  const dataUnit = page.locator('[data-slot="statistic-unit"]');
  await expect(dataValue).toHaveText("98.6");
  await expect(dataUnit).toHaveText("分");
  await expect(dataValue).toHaveClass(/rain-type-data/);
  await expect(dataUnit).toHaveClass(/rain-type-ui/);
  const dataValueFont = await dataValue.evaluate((node) => {
    const style = getComputedStyle(node);
    return { family: style.fontFamily, weight: style.fontWeight };
  });
  expect(
    dataValueFont.family
      .split(",")
      .map((family) => family.replaceAll('"', "").trim()),
  ).toEqual([
    "LINE Seed JP App_OTF",
    "SF Pro Rounded",
    "ui-rounded",
    "sans-serif",
  ]);
  expect(dataValueFont.weight).toBe("700");
  expect(await dataUnit.evaluate((node) => getComputedStyle(node).fontFamily)).toContain(
    "PingFang SC",
  );

  const focusControl = page.getByTestId("focus-control");
  const focusItem = page.getByTestId("focus-item");
  const focusDanger = page.getByTestId("focus-danger");
  await focusControl.focus();
  await expect(focusControl).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(focusItem).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(focusDanger).toBeFocused();
  const pageSurface = await page.locator("html").evaluate(
    (node) => getComputedStyle(node).backgroundColor,
  );
  for (const fixture of [focusControl, focusItem, focusDanger] as const) {
    await fixture.focus();
    await expect(fixture).toBeFocused();
    const focusStyle = await fixture.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        outlineColor: style.outlineColor,
        outlineOffset: Number.parseFloat(style.outlineOffset),
        outlineStyle: style.outlineStyle,
        outlineWidth: Number.parseFloat(style.outlineWidth),
        boxShadow: style.boxShadow,
      };
    });
    expect(focusStyle.outlineColor).toBe("rgb(61, 123, 255)");
    expect(focusStyle.outlineStyle).toBe("solid");
    expect(focusStyle.outlineWidth).toBe(1);
    expect(focusStyle.outlineOffset).toBe(0);
    expect(focusStyle.boxShadow).toBe("rgba(61, 123, 255, 0.2) 0px 0px 0px 3px");
    expect(
      contrastRatio(focusStyle.outlineColor, pageSurface),
    ).toBeGreaterThanOrEqual(3);
  }

  const regionMotion = page.getByTestId("motion-region");
  const feedbackMotion = page.getByTestId("motion-feedback");
  const overlayMotion = page.getByTestId("motion-overlay");
  const reducedMotion = page.getByTestId("motion-reduced");
  const normalMotionStyle = await regionMotion.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      animationDirection: style.animationDirection,
      animationDuration: style.animationDuration,
      animationFillMode: style.animationFillMode,
      animationIterationCount: style.animationIterationCount,
      animationName: style.animationName,
    };
  });
  expect(normalMotionStyle).toEqual({
    animationDirection: "normal",
    animationDuration: "0.22s",
    animationFillMode: "both",
    animationIterationCount: "1",
    animationName: "rain-region-transition",
  });
  const feedbackDuration = await feedbackMotion.evaluate((node) =>
    Number.parseFloat(getComputedStyle(node).transitionDuration),
  );
  expect(feedbackDuration).toBeGreaterThan(0);
  const feedbackBefore = await feedbackMotion.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      borderColor: style.borderColor,
      transform: style.transform,
    };
  });
  await feedbackMotion.hover();
  await expect
    .poll(() =>
      feedbackMotion.evaluate((node) => getComputedStyle(node).transform),
    )
    .not.toBe(feedbackBefore.transform);
  await expect
    .poll(() =>
      feedbackMotion.evaluate((node) => getComputedStyle(node).borderColor),
    )
    .not.toBe(feedbackBefore.borderColor);
  await page.mouse.move(0, 0);
  await expect
    .poll(() =>
      feedbackMotion.evaluate((node) => getComputedStyle(node).transform),
    )
    .toBe(feedbackBefore.transform);
  await expect(overlayMotion).toHaveCSS(
    "animation-name",
    "rain-overlay-transition",
  );
  const overlayDuration = await overlayMotion.evaluate((node) =>
    Number.parseFloat(getComputedStyle(node).animationDuration),
  );
  expect(overlayDuration).toBeGreaterThan(0);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(regionMotion).toHaveCSS("animation-name", "none");
  await expect(regionMotion).toHaveCSS("animation-duration", "0s");
  await expect(feedbackMotion).toHaveCSS("transition-duration", "0s");
  await expect(overlayMotion).toHaveCSS("animation-name", "none");
  await expect(overlayMotion).toHaveCSS("animation-duration", "0s");
  await expect(reducedMotion).toHaveCSS("animation-name", "none");
  await expect(reducedMotion).toHaveCSS("animation-duration", "0s");
  await expect(page.locator("nav, aside")).toHaveCount(0);

  const fontAvailability = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const sample = "雨课堂平均成绩mmmmWWWW0123456789";
    const fallbacks = ["monospace", "serif", "sans-serif"];

    function hasDistinctMetrics(fontFamily: string, weight: 400 | 700) {
      if (!context) return false;
      return fallbacks.some((fallback) => {
        context.font = `${weight} 48px ${fallback}`;
        const fallbackWidth = context.measureText(sample).width;
        context.font = `${weight} 48px "${fontFamily}", ${fallback}`;
        return context.measureText(sample).width !== fallbackWidth;
      });
    }

    return {
      lineSeedCheck: document.fonts.check(
        '700 48px "LINE Seed JP App_OTF"',
      ),
      lineSeedDistinctMetrics: hasDistinctMetrics(
        "LINE Seed JP App_OTF",
        700,
      ),
      pingFangCheck: document.fonts.check('400 48px "PingFang SC"'),
      pingFangDistinctMetrics: hasDistinctMetrics("PingFang SC", 400),
    };
  });
  const lineSeedStatus =
    fontAvailability.lineSeedCheck && fontAvailability.lineSeedDistinctMetrics
      ? "target-hit"
      : "fallback-hit";
  console.log(
    `Font availability (browser): PingFang SC check=${fontAvailability.pingFangCheck}, distinct-metrics=${fontAvailability.pingFangDistinctMetrics}; LINE Seed JP App_OTF weight 700 status=${lineSeedStatus}, check=${fontAvailability.lineSeedCheck}, distinct-metrics=${fontAvailability.lineSeedDistinctMetrics}, evidence-required=${requireLineSeedEvidence}`,
  );
  if (requireLineSeedEvidence) {
    expect(fontAvailability.lineSeedCheck).toBe(true);
    expect(fontAvailability.lineSeedDistinctMetrics).toBe(true);
  }

  const screenshotPath =
    runtimeEnvironment.RAIN_UPDATE_DAY_2_EVIDENCE === "1"
      ? "evidence/runtime/day-2/foundations-page.png"
      : testInfo.outputPath("foundations-page.png");
  await compactInput.focus();
  await expect(compactInput).toBeFocused();
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });
});
