import { expect, test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { contrastRatio } from "./color-contrast";

for (const theme of ["light", "dark"]) test(`Textarea real field matrix in ${theme}`, async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/#textarea");
  await page.getByRole("button", { name: theme === "light" ? "浅色" : "深色", exact: true }).click();
  const records = [];
  for (const density of ["default", "compact"]) {
    await page.getByRole("button", { name: density === "default" ? "常规" : "紧凑", exact: true }).click();
    for (const [label, appearance] of [["描边", "outlined"], ["填充", "filled"], ["底线", "underlined"]] as const) {
      await page.getByRole("button", { name: label, exact: true }).click();
      for (const name of ["课程说明", "常规说明", "待检查说明", "错误说明", "只读说明", "禁用说明"]) {
        const control = page.getByRole("textbox", { name, exact: true });
        const frame = control.locator("..");
        await expect(frame).toHaveAttribute("data-density", density);
        await expect(frame).toHaveAttribute("data-appearance", appearance);
        const paint = await control.evaluate(node => {
          const control = node as HTMLTextAreaElement, css = getComputedStyle(control), frame = getComputedStyle(node.parentElement!);
          const box = node.getBoundingClientRect(), outer = node.parentElement!.getBoundingClientRect();
          let parent = node.parentElement!.parentElement!;
          while (parent.parentElement && getComputedStyle(parent).backgroundColor === "rgba(0, 0, 0, 0)") parent = parent.parentElement;
          return { fontSize: css.fontSize, lineHeight: css.lineHeight, fontFamily: css.fontFamily, minHeight: css.minHeight,
            resize: css.resize, disabled: control.disabled, readOnly: control.readOnly, foreground: css.color,
            background: frame.backgroundColor, border: frame.borderBottomColor, placeholder: getComputedStyle(node, "::placeholder").color,
            parentBackground: getComputedStyle(parent).backgroundColor, padding: css.padding,
            rightInset: outer.right - box.right - parseFloat(frame.borderRightWidth), bottomInset: outer.bottom - box.bottom - parseFloat(frame.borderBottomWidth) };
        });
        expect(paint).toMatchObject({ fontSize: "14px", lineHeight: "24px", minHeight: "40px", resize: name === "禁用说明" ? "none" : "vertical", disabled: name === "禁用说明", readOnly: name === "只读说明" });
        expect(paint.fontFamily).toContain("PingFang SC");
        expect(paint.padding).toBe("8px 12px");
        expect(paint.rightInset).toBeCloseTo(0, 1);
        expect(paint.bottomInset).toBeCloseTo(0, 1);
        records.push({ theme, density, appearance, name, ...paint,
          textContrast: contrastRatio(paint.foreground, paint.background, paint.parentBackground),
          borderContrast: contrastRatio(paint.border, paint.background, paint.parentBackground),
          placeholderContrast: contrastRatio(paint.placeholder, paint.background, paint.parentBackground) });
      }
      const normal = page.getByRole("textbox", { name: "常规说明", exact: true });
      await page.getByText("常规说明", { exact: true }).click();
      await expect(normal).toBeFocused();
      for (const name of ["常规说明", "错误说明", "只读说明"]) {
        const control = page.getByRole("textbox", { name, exact: true });
        const previous = name === "常规说明" ? page.getByRole("button", { name: "取消修改", exact: true })
          : page.getByRole("textbox", { name: name === "错误说明" ? "待检查说明" : "错误说明", exact: true });
        await previous.focus(); await page.keyboard.press("Tab");
        await expect(control).toBeFocused();
        const focus = await control.evaluate(node => { const css = getComputedStyle(node.parentElement!); return { visible: node.matches(":focus-visible"), outline: css.outlineWidth, background: css.backgroundImage }; });
        expect(focus.visible).toBe(true);
        expect(focus.outline !== "0px" || focus.background !== "none").toBe(true);
      }
    }
  }
  await page.getByRole("button", { name: "描边", exact: true }).click();
  await page.getByRole("button", { name: "常规", exact: true }).click();
  await page.getByRole("textbox", { name: "课程说明", exact: true }).fill("本课程通过课堂讨论与实践项目，帮助你理解人工智能的基本方法。\n\n学习目标：掌握基础概念，理解技术应用中的机会与局限。\n学习建议：课前阅读材料，课后结合案例完成反思。");
  const directory = process.env.RAIN_TEXTAREA_EVIDENCE_DIR && `${process.env.RAIN_TEXTAREA_EVIDENCE_DIR}/${testInfo.project.name}`;
  if (directory) mkdirSync(directory, { recursive: true });
  const artifact = (name: string) => directory ? `${directory}/${name}` : testInfo.outputPath(name);
  await page.screenshot({ path: artifact(`${theme}.png`), fullPage: true, animations: "disabled" });
  writeFileSync(artifact(`${theme}.json`), JSON.stringify({ scope: "3 appearances x 2 densities x 6 real Textarea fields; inherited shared colors, no contrast acceptance", records }, null, 2));
});

test("long text saves, fails, retries and cancels at narrow width", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#textarea");
  const control = page.getByRole("textbox", { name: "课程说明", exact: true });
  const save = page.getByRole("button", { name: "保存说明", exact: true });
  await save.click();
  await expect(control).toBeFocused();
  await expect(control).toHaveAttribute("aria-invalid", "true");
  await control.fill("学习目标：理解人工智能的基本概念。");
  await control.press("End"); await control.press("Enter");
  await control.pressSequentially("学习建议：完成阅读与实践。");
  const draft = await control.inputValue();
  expect(draft).toContain("\n");
  await expect(page.getByRole("status")).not.toHaveText(/已保存到/);
  await page.getByText("模拟下次保存失败", { exact: true }).click();
  await expect(page.getByRole("checkbox", { name: "模拟下次保存失败" })).toBeChecked();
  await save.click(); await expect(control).toBeDisabled();
  await expect(page.getByRole("status")).toHaveText("保存失败，草稿已保留，请重试");
  await expect(control).toHaveValue(draft);
  await expect(page.getByRole("region", { name: "已保存的说明" })).toContainText("尚未保存");
  await save.click();
  await expect(page.getByRole("status")).toHaveText("已保存到本地样例");
  await control.fill("尚未保存的修改");
  await page.getByRole("button", { name: "取消修改" }).click();
  await expect(control).toHaveValue(draft);
  await control.scrollIntoViewIfNeeded();
  const box = await control.boundingBox();
  await page.mouse.move(box!.x + box!.width - 3, box!.y + box!.height - 3);
  await page.mouse.down(); await page.mouse.move(box!.x + box!.width - 3, box!.y + box!.height + 65, { steps: 10 }); await page.mouse.up();
  expect((await control.boundingBox())!.height).toBeGreaterThan(box!.height);
  await expect(page.getByRole("textbox", { name: "禁用说明", exact: true })).toBeDisabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const directory = process.env.RAIN_TEXTAREA_EVIDENCE_DIR && `${process.env.RAIN_TEXTAREA_EVIDENCE_DIR}/${testInfo.project.name}`;
  if (directory) mkdirSync(directory, { recursive: true });
  await page.screenshot({ path: directory ? `${directory}/narrow.png` : testInfo.outputPath("narrow.png"), fullPage: true, animations: "disabled" });
  expect(errors).toEqual([]);
});

test("native required, maximum length, readonly and form serialization", async ({ page }) => {
  await page.goto("/#textarea");
  const control = page.getByRole("textbox", { name: "课程说明", exact: true });
  expect(await control.evaluate(node => (node as HTMLTextAreaElement).validity.valueMissing)).toBe(true);
  await control.fill(" \n ");
  await page.getByRole("button", { name: "保存说明", exact: true }).click();
  await expect(control).toHaveAttribute("aria-invalid", "true");
  await control.fill("");
  await control.focus();
  await page.keyboard.insertText("课".repeat(1001));
  await expect(control).toHaveValue("课".repeat(1000));
  expect(await control.evaluate(node => new FormData((node as HTMLTextAreaElement).form!).get("description"))).toBe("课".repeat(1000));
  const readonly = page.getByRole("textbox", { name: "只读说明", exact: true });
  const value = await readonly.inputValue();
  await readonly.focus();
  await page.keyboard.insertText("不应写入");
  await expect(readonly).toHaveValue(value);
});

test("forced-colors keyboard focus", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.goto("/#textarea");
  test.skip(!await page.evaluate(() => matchMedia("(forced-colors: active)").matches), "Browser does not expose forced-colors emulation");
  const control = page.getByRole("textbox", { name: "课程说明", exact: true });
  await control.focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
  await expect(control).toBeFocused();
  expect(await control.locator("..").evaluate(node => getComputedStyle(node).outlineWidth)).toBe("2px");
});
