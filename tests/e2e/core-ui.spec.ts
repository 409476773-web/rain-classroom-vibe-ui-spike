import { expect, test } from "@playwright/test";

const runtimeEnvironment = (
  globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  }
).process?.env ?? {};

test("the Day 3 Core UI matrix is reachable, traceable and interactive", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto("/");
  await page.getByRole("link", { name: /Components/i }).click();

  await expect(page).toHaveURL(/#components$/);
  const title = page.getByRole("heading", {
    level: 1,
    name: "Core UI，先把高频动作做准",
  });
  await expect(title).toBeFocused();
  await expect(page.locator('[data-rain-id="core-ui-page"]')).toHaveAttribute(
    "data-asset-identity",
    "local-experiment",
  );
  await expect(page.locator('[data-slot="family-contract"]')).toHaveCount(4);
  await expect(page.getByRole("navigation")).toHaveCount(0);
  await expect(page.getByRole("complementary")).toHaveCount(0);

  const buttonMatrix = page.locator('[data-rain-id="core-ui-button"]');
  for (const variant of ["primary", "secondary", "ghost", "danger"] as const) {
    expect(
      await buttonMatrix
        .locator(`[data-rain-id="ui-button"][data-variant="${variant}"]`)
      .count(),
    ).toBeGreaterThanOrEqual(1);
  }
  const dangerButton = buttonMatrix.getByRole("button", {
    name: "删除课程",
  });
  await dangerButton.hover();
  await expect(dangerButton).toHaveCSS("background-color", "rgb(181, 42, 54)");
  await page.mouse.down();
  await expect(dangerButton).not.toHaveCSS("transform", "none");
  await page.mouse.up();
  const compactButton = buttonMatrix.getByRole("button", {
    name: "紧凑筛选",
  });
  const defaultButton = buttonMatrix.getByRole("button", {
    name: "默认筛选",
  });
  await expect(compactButton).toHaveCSS("height", "30px");
  await expect(defaultButton).toHaveCSS("height", "36px");
  const loadingButton = page.getByRole("button", { name: "正在保存" });
  await expect(loadingButton).toBeDisabled();
  await expect(loadingButton).toHaveAttribute("aria-busy", "true");
  const loadingGeometry = await loadingButton.evaluate((button) => {
    const idleClone = button.cloneNode(true) as HTMLButtonElement;
    idleClone.dataset.state = "default";
    idleClone.disabled = false;
    idleClone.removeAttribute("aria-busy");
    idleClone.style.position = "fixed";
    idleClone.style.visibility = "hidden";
    document.body.append(idleClone);
    const metrics = {
      idleWidth: idleClone.getBoundingClientRect().width,
      loadingWidth: button.getBoundingClientRect().width,
      spinnerPosition: getComputedStyle(button, "::before").position,
    };
    idleClone.remove();
    return metrics;
  });
  expect(loadingGeometry.loadingWidth).toBe(loadingGeometry.idleWidth);
  expect(loadingGeometry.spinnerPosition).toBe("absolute");

  const courseInput = page.getByRole("textbox", { name: "课程名称" });
  await courseInput.fill("设计思维导论");
  await page.getByRole("button", { name: "清除课程名称" }).click();
  await expect(courseInput).toHaveValue("");
  const errorInput = page.getByRole("textbox", { name: "教材编号" });
  await expect(errorInput).toHaveAttribute("aria-invalid", "true");
  const errorMessage = page.getByRole("alert");
  await expect(errorMessage).toBeVisible();
  const errorMessageId = await errorMessage.getAttribute("id");
  const describedBy = await errorInput.getAttribute("aria-describedby");
  expect(errorMessageId).toBeTruthy();
  expect(describedBy?.split(/\s+/)).toContain(errorMessageId);
  await courseInput.focus();
  const inputControl = courseInput.locator("xpath=..");
  await expect(inputControl).toHaveCSS("border-color", "rgb(21, 97, 248)");
  await expect
    .poll(() =>
      inputControl.evaluate((node) => getComputedStyle(node).boxShadow),
    )
    .not.toBe("none");

  const removableTag = page.getByTestId("removable-tag-fixture");
  const staticTag = page.getByTestId("static-tag-fixture");
  const compactTag = page.getByTestId("compact-tag-fixture");
  const removableTagRoot = removableTag.locator('[data-rain-id="ui-tag"]');
  await expect(removableTagRoot).toHaveCSS(
    "height",
    "24px",
  );
  await removableTagRoot.evaluate((tag) =>
    tag.setAttribute("data-density", "compact"),
  );
  await expect(removableTagRoot).toHaveCSS("height", "20px");
  await expect(staticTag).toHaveCSS("height", "24px");
  await expect(compactTag).toHaveCSS("height", "20px");
  await removableTag.getByRole("button", { name: "移除标签 专业必修" }).press("Enter");
  await expect(removableTag).toHaveCount(0);

  const standardCard = page.locator('[data-rain-id="ui-card"]').first();
  await expect(standardCard).toHaveCSS("box-shadow", "none");
  await expect(standardCard.locator('[data-slot="card-title"]')).toHaveText(
    "课程资源包",
  );

  if (runtimeEnvironment.RAIN_UPDATE_DAY_3_EVIDENCE === "1") {
    await page.screenshot({
      fullPage: true,
      path: testInfo.outputPath("core-ui-page.png"),
    });
  }
});

test("Core UI preserves visible keyboard focus and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#components");

  const primaryButton = page.getByRole("button", { name: "创建课程" });
  expect(await page.evaluate(() => document.activeElement === document.body)).toBe(
    true,
  );
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "返回 Playground" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(primaryButton).toBeFocused();
  const focusStyle = await primaryButton.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      outlineColor: style.outlineColor,
      outlineOffset: Number.parseFloat(style.outlineOffset),
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
      transitionDuration: style.transitionDuration,
    };
  });
  expect(focusStyle).toEqual({
    outlineColor: "rgb(21, 97, 248)",
    outlineOffset: 1,
    outlineStyle: "solid",
    outlineWidth: 2,
    transitionDuration: "0s",
  });
});
