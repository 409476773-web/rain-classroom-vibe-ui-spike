import { expect, test } from "@playwright/test";

import { contrastRatio } from "./color-contrast";

const runtimeEnvironment = (
  globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }
).process?.env ?? {};

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
    hash: "#components",
    title: "Core UI，先把高频动作做准",
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

    await page.evaluate(() => {
      window.location.hash = "#foundations";
    });
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
  ).toContainText("#69778D");

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
      "原生夹具，仅验证 Density 与 Focus；不代表 Day 3 Input / Button 最终外观。",
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
    borderColor: "rgb(21, 97, 248)",
    boxShadow: expect.not.stringMatching(/^none$/),
    outlineColor: "rgba(0, 0, 0, 0)",
    outlineOffset: 1,
    outlineStyle: "solid",
    outlineWidth: 2,
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
      };
    });
    expect(focusStyle.outlineColor).toBe("rgb(21, 97, 248)");
    expect(focusStyle.outlineStyle).toBe("solid");
    expect(focusStyle.outlineWidth).toBe(2);
    expect(focusStyle.outlineOffset).toBe(1);
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
