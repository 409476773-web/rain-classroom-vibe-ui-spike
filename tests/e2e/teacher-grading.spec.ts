import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { contrastRatio } from "./color-contrast";

const url = `${process.env.RAIN_TEACHER_URL ?? "http://127.0.0.1:5369"}/#teacher-grading`;
const evidence = evidenceOutputPath("evidence/runtime/teacher-grading-annotations/browser-followup");
test.beforeAll(() => mkdirSync(evidence, { recursive: true }));

test("paper and order tabs preserve drafts; disclosures and rubric support keyboard use", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(url);
  const number = page.getByRole("button", { name: "第 2 题目录", exact: true });
  await expect(number).toHaveAttribute("data-rain-id", "ui-question-number");
  await expect(number).toHaveAttribute("data-current", "true");
  await number.click();
  await expect(number).toHaveAttribute("data-current", "false");
  await expect(page.getByRole("button", { name: "选择 林知夏 第 2 题" })).toHaveCount(0);
  await number.press("Enter");
  await expect(number).toHaveAttribute("data-current", "true");
  await expect(page.getByRole("button", { name: "选择 林知夏 第 2 题" }).locator('.rain-tag')).toHaveAttribute("data-size", "20");
  await expect(page.locator('.tg-directory-foot')).toHaveCount(0);
  await expect(page.locator('button button')).toHaveCount(0);
  const question = page.locator(".tg-question");
  await expect(question).not.toHaveAttribute("open");
  await expect(question.locator(":scope > p")).toBeHidden();
  await question.locator(":scope > summary").press("Enter");
  await expect(question).toHaveAttribute("open");
  await page.getByText("查看参考答案", { exact: true }).click();
  await expect(page.locator(".tg-reference-inline ol")).toBeVisible();
  await question.locator(":scope > summary").press("Space");
  await expect(question).not.toHaveAttribute("open");
  await page.getByRole("button", { name: "评分细则", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "评分细则" })).toBeVisible();
  await expect(page.locator(".tg-criterion")).toHaveCount(3);
  await page.screenshot({ path: `${evidence}/rubric.png` });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "评分细则", exact: true })).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveCount(0);

  const score = page.getByRole("textbox", { name: "本题得分" });
  const comment = page.getByRole("textbox", { name: "评语", exact: true });
  await score.fill("11.5");
  await comment.fill("请补充守恒条件。");
  await page.getByRole("button", { name: "下一位", exact: true }).click();
  await page.getByRole("button", { name: "上一位", exact: true }).click();
  await expect(score).toHaveValue("11.5");
  await page.getByRole("tab", { name: "按题批改" }).press("ArrowRight");
  await page.getByRole("tab", { name: "按人批改" }).press("Enter");
  await expect(page.getByRole("tab", { name: "按人批改" })).toHaveAttribute("aria-selected", "true");
  await expect(comment).toHaveValue("请补充守恒条件。");
  await page.getByRole("tab", { name: "B 卷", exact: true }).click();
  await expect(score).toHaveValue("");
  await page.getByRole("tab", { name: "A 卷", exact: true }).click();
  await page.getByRole("button", { name: "选择 林知夏 第 2 题", exact: true }).click();
  await expect(score).toHaveValue("11.5");
  await expect(comment).toHaveValue("请补充守恒条件。");
  await page.getByRole("button", { name: "保存并下一题" }).click();
  await expect(page.getByRole("tab", { name: "B 卷", exact: true })).toBeDisabled();
  await expect(page.getByRole("heading", { name: /第 3 题.*实验与误差/ })).toBeVisible();
  await expect(question).not.toHaveAttribute("open");
  await page.getByRole("button", { name: "上一题", exact: true }).click();
  await expect(score).toHaveValue("11.5");
  await page.getByRole("button", { name: "专注阅卷" }).click();
  await expect(page.getByRole("complementary", { name: "批改目录" })).toBeHidden();
  await page.getByRole("button", { name: "展开目录" }).click();
  await expect(page.getByRole("tab", { name: "按人批改" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("annotated sizes and responsive composition retain reading space", async ({ page }) => {
  await page.goto(url);
  const geometries = [];
  for (const width of [1369, 1058, 900, 390]) {
    await page.setViewportSize({ width, height: 807 });
    await page.evaluate(() => document.fonts.ready);
    const geometry = await page.evaluate(() => {
      const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
      const style = (selector: string) => getComputedStyle(document.querySelector(selector)!);
      return {
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        gap: rect(".tg-review").x - rect(".tg-directory").right,
        inspectorHeading: rect(".tg-inspector-heading").height,
        inspectorBorder: style(".tg-inspector-heading").borderBottomWidth,
        readerFooter: rect(".tg-reader-footer").height,
        footerPadding: style(".tg-reader-footer").paddingTop,
        saveButton: rect(".tg-submit-buttons button").height,
        saveGap: style(".tg-submit-buttons").columnGap,
        directoryFill: style(".tg-directory").backgroundColor,
        answerCount: style(".tg-directory-filter > span").fontSize,
        question: rect(".tg-question").height,
        paperTab: rect('.tg-paper-nav [role="tab"]').height,
        orderTab: rect('.tg-order-tabs [role="tab"]').height,
        heading: style(".tg h1").fontSize,
        studentName: style(".tg-reader-head h2").fontSize,
        answerTitle: style(".tg-answer-label h3").fontSize,
        scoreLabel: style(".tg-score-section label").fontSize,
        commentLabel: style(".tg-feedback label").fontSize,
        readerPadding: style(".tg-reader-head").paddingTop,
        scoreBorder: style(".tg-score-section").borderTopWidth,
        textarea: document.querySelector(".tg-feedback .rain-textarea")!.getAttribute("data-appearance"),
        quickFill: style(".tg-quick-score-button").backgroundColor,
      };
    });
    geometries.push(geometry);
    expect(geometry.scrollWidth).toBe(width);
    expect(geometry.inspectorHeading).toBe(48);
    expect(geometry.inspectorBorder).toBe("0px");
    expect(geometry.readerFooter).toBe(56);
    expect(geometry.footerPadding).toBe("8px");
    expect(geometry.saveButton).toBe(36);
    expect(geometry.saveGap).toBe("12px");
    expect(geometry.directoryFill).toBe("rgb(255, 255, 255)");
    expect(geometry.answerCount).toBe("13px");
    expect(geometry.question).toBeLessThanOrEqual(60);
    expect(geometry.paperTab).toBe(32);
    expect(geometry.orderTab).toBe(32);
    expect([geometry.heading, geometry.studentName, geometry.answerTitle]).toEqual(["16px", "16px", "16px"]);
    expect([geometry.scoreLabel, geometry.commentLabel]).toEqual(["15px", "15px"]);
    expect(geometry.readerPadding).toBe("12px");
    expect(geometry.scoreBorder).toBe("0px");
    expect(geometry.textarea).toBe("filled");
    expect(geometry.quickFill).toBe("rgb(255, 255, 255)");
    if (width > 950) expect(geometry.gap).toBeGreaterThanOrEqual(12);
    await page.screenshot({ path: `${evidence}/${width}.png`, fullPage: width <= 950 });
  }
  await page.getByRole("combobox", { name: "选择批改对象" }).click();
  await page.getByRole("option", { name: "第 2 题 · 陈一鸣 · 待批改" }).click();
  await expect(page.getByRole("heading", { name: "陈一鸣的作答" })).toBeVisible();
  writeFileSync(`${evidence}/geometry.json`, JSON.stringify(geometries, null, 2));

  await page.setViewportSize({ width: 1411, height: 807 });
  const readings = await page.evaluate(() => {
    const style = (selector: string) => getComputedStyle(document.querySelector(selector)!);
    const white = style(".tg-review").backgroundColor;
    return [
      ...[".tg-paper p", ".tg-reader-head h2", ".tg-feedback label", ".tg-quick-score-button", ".tg-reader-footer strong"].map(selector => ({ selector, foreground: style(selector).color, background: white, reviewOnly: false })),
      { selector: ".tg-score-section label", foreground: style(".tg-score-section label").color, background: style(".tg-score-section").backgroundColor, reviewOnly: false },
      { selector: ".tg-list-score", foreground: style(".tg-list-score").color, background: style(".tg-directory").backgroundColor, reviewOnly: true, reason: "Requested orange score uses existing Text/Orange/1; measured contrast remains below 4.5, pending review." },
      ...[".tg-reader-head h2 span", ".tg-reader-head p", ".tg-save-status > span", ".tg-reader-footer > span", ".tg-answer-tools > span"].map(selector => ({ selector, foreground: style(selector).color, background: white, reviewOnly: true })),
      { selector: ".tg-group-trigger > .rain-icon", foreground: style(".tg-group-trigger > .rain-icon").color, background: white, reviewOnly: true, minimum: 3 },
      { selector: ".tg-hint", foreground: style(".tg-hint").color, background: style(".tg-score-section").backgroundColor, reviewOnly: true },
    ];
  });
  const measurements = readings.map(reading => {
    const minimum = ("minimum" in reading ? reading.minimum : undefined) ?? 4.5;
    const ratio = contrastRatio(reading.foreground, reading.background);
    return { ...reading, ratio, minimum, acceptedException: false, status: ratio >= minimum ? "pass" : "finding-pending-review" };
  });
  writeFileSync(`${evidence}/contrast.json`, JSON.stringify(measurements, null, 2));
  for (const measurement of measurements.filter(item => !item.reviewOnly)) expect(measurement.ratio, measurement.selector).toBeGreaterThanOrEqual(4.5);
});
