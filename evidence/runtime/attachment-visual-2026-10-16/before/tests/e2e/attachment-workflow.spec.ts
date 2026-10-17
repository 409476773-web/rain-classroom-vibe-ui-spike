import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

test.beforeEach(async ({ page }) => { await page.goto("/attachment-workflow-consumer.html"); });
const picker = (page: import("@playwright/test").Page) => page.locator('.rain-attachment-picker input[type="file"]');

test("real multipart bytes, server failure, retry and actual download filename/content", async ({ page }, testInfo) => {
  const name = `retry-${testInfo.project.name}.txt`, bytes = Buffer.from("课堂观察：真实上传与下载\n" + testInfo.project.name);
  await picker(page).setInputFiles({ name, mimeType: "text/plain", buffer: bytes });
  await expect(page.getByRole("alert")).toContainText("HTTP 503");
  await expect(page.getByRole("button", { name: "提交表单", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "重试上传 " + name, exact: true }).click();
  await expect(page.getByRole("button", { name: "提交表单", exact: true })).toBeEnabled();
  const event = page.waitForEvent("download");
  await page.getByRole("button", { name: "下载 " + name, exact: true }).click();
  const download = await event;
  expect(download.suggestedFilename()).toBe(name);
  expect(readFileSync((await download.path())!)).toEqual(bytes);
  await expect(page.getByText("已发起下载")).toBeVisible();
});

test("cancel prevents late success; replacement keeps original until successful", async ({ page }, testInfo) => {
  const slow = `slow-${testInfo.project.name}.txt`;
  await picker(page).setInputFiles({ name: slow, mimeType: "text/plain", buffer: Buffer.from("cancel me") });
  await page.getByRole("button", { name: "取消上传 " + slow, exact: true }).click();
  await expect(page.getByText(/已取消上传/)).toBeVisible();
  await page.getByRole("button", { name: "移除 " + slow, exact: true }).click();
  const replacement = `slow-replacement-${testInfo.project.name}.txt`;
  await page.getByLabel("选择替换文件 原始资料.txt", { exact: true }).setInputFiles({ name: replacement, mimeType: "text/plain", buffer: Buffer.from("replacement content") });
  await expect(page.getByRole("button", { name: "预览 原始资料.txt", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "取消替换 原始资料.txt", exact: true }).click();
  await expect(page.getByText(/正在替换为/)).toHaveCount(0);
  const event = page.waitForEvent("download");
  await page.getByRole("button", { name: "下载 原始资料.txt", exact: true }).click();
  expect(readFileSync((await (await event).path())!).toString()).toBe("original content");
  await page.getByLabel("选择替换文件 原始资料.txt", { exact: true }).setInputFiles({ name: "final.txt", mimeType: "text/plain", buffer: Buffer.from("final bytes") });
  await expect(page.getByRole("button", { name: "预览 final.txt", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "预览 原始资料.txt", exact: true })).toHaveCount(0);
});

test("drop shares type and count validation; read-only preserves downloads", async ({ page }) => {
  const transfer = await page.evaluateHandle(() => { const data = new DataTransfer(); data.items.add(new File(["x"], "invalid.exe")); return data; });
  await page.getByRole("group", { name: "添加附件", exact: true }).dispatchEvent("drop", { dataTransfer: transfer });
  await expect(page.getByRole("alert")).toContainText("invalid.exe");
  await picker(page).setInputFiles(["a", "b", "c", "d"].map(value => ({ name: value + ".txt", mimeType: "text/plain", buffer: Buffer.from(value) })));
  await expect(page.getByRole("alert")).toContainText("d.txt");
  await expect(page.getByRole("button", { name: "提交表单", exact: true })).toBeEnabled();
  await page.getByRole("button", { name: "只读模式", exact: true }).click();
  await expect(page.getByRole("button", { name: /^移除 / })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "添加附件", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "下载 原始资料.txt", exact: true })).toBeEnabled();
});

test("unsupported preview, keyboard dismissal and final removal restore focus", async ({ page }) => {
  await page.getByRole("button", { name: "预览 原始资料.txt", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText(/暂不支持|不支持/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "预览 原始资料.txt", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "移除 原始资料.txt", exact: true }).click();
  await expect(page.getByText("暂无附件")).toBeVisible();
  await expect(page.getByRole("button", { name: "添加附件", exact: true })).toBeFocused();
});

test("long filename and wrapped actions fit both themes", async ({ page }, testInfo) => {
  const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  const name = "需要完整查看的课堂观察记录与反馈说明".repeat(4) + ".txt";
  await picker(page).setInputFiles({ name, mimeType: "text/plain", buffer: Buffer.from("long name") });
  await expect(page.getByRole("button", { name: "提交表单", exact: true })).toBeEnabled();
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") await page.getByRole("button", { name: "切换主题", exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(theme + ".png"), fullPage: true });
  }
  await page.getByRole("button", { name: "查看文件信息 " + name, exact: true }).click();
  await expect(page.getByText(name, { exact: true }).last()).toBeVisible();
  expect(errors).toEqual([]);
});

test("Playground image, verified PDF bytes, unsupported and independent permissions", async ({ page }, testInfo) => {
  await page.goto("/#attachment");
  await expect(page.locator("#attachment-title")).toBeVisible();
  await page.getByRole("button", { name: "预览 高等数学课程封面.png", exact: true }).click();
  const picture = page.getByRole("dialog").getByRole("img", { name: "高等数学课程封面.png", exact: true });
  await expect(picture).toBeVisible();
  await expect.poll(() => picture.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(100);
  await page.screenshot({ path: testInfo.outputPath("image-preview.png"), fullPage: true });
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "预览 课程导读：从问题到证据.pdf", exact: true }).click();
  const pdf = page.getByRole("dialog").locator("iframe");
  await expect(pdf).toBeVisible();
  const source = await pdf.getAttribute("src");
  expect(source).toMatch(/^blob:/);
  const content = await page.evaluate(async value => { const blob = await (await fetch(value!)).blob(); return { type: blob.type, text: await blob.text() }; }, source);
  expect(content.type).toBe("application/pdf"); expect(content.text).toContain("%PDF-"); expect(content.text).toContain("From Questions to Evidence");
  await page.screenshot({ path: testInfo.outputPath("pdf-preview.png"), fullPage: true });
  await page.keyboard.press("Escape");
  await page.getByText("权限与失效示例", { exact: true }).click();
  await expect(page.getByRole("button", { name: "下载 仅可预览的课程封面.png", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "预览 仅可预览的课程封面.png", exact: true })).toBeEnabled();
  await expect(page.getByRole("button", { name: "预览 已失效的课程讲义.pdf", exact: true })).toBeDisabled();
  await expect(page.getByRole("button", { name: "下载 受限的课堂记录.txt", exact: true })).toBeDisabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("playground.png"), fullPage: true });
});

test("invalid PDF is rejected and missing native viewer gets a usable fallback", async ({ page }) => {
  await picker(page).setInputFiles({ name: "invalid.pdf", mimeType: "application/pdf", buffer: Buffer.from("not a PDF") });
  await expect(page.getByRole("button", { name: "提交表单", exact: true })).toBeEnabled();
  await page.getByRole("button", { name: "预览 invalid.pdf", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText("不是有效的 PDF");
  await expect(page.getByRole("dialog").locator("iframe")).toHaveCount(0);
  await expect(page.getByRole("dialog").getByRole("button", { name: "下载 invalid.pdf", exact: true })).toBeEnabled();
  await page.addInitScript(() => Object.defineProperty(navigator, "pdfViewerEnabled", { value: false }));
  await page.goto("/#attachment");
  await page.getByRole("button", { name: "预览 课程导读：从问题到证据.pdf", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("当前浏览器不支持 PDF 预览");
  await expect(page.getByRole("dialog").getByRole("button", { name: "下载 课程导读：从问题到证据.pdf", exact: true })).toBeEnabled();
});
