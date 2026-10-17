import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

test.beforeEach(async ({ page }) => { await page.goto("/#attachment"); });

test("folding keeps full counts, failed-only retry and hidden uploads alive", async ({ page }, info) => {
  const scene = page.getByTestId("attachment-scenario-ordinary");
  const rows = scene.locator(".rain-attachment-list__item");
  await expect(rows).toHaveCount(6);
  await expect(page.getByTestId("ordinary-summary")).toContainText("24 个已上传");
  await scene.getByRole("button", { name: "演示上传", exact: true }).click();
  await expect(page.getByTestId("ordinary-summary")).toContainText("2 个失败");
  await expect(page.getByTestId("ordinary-summary")).toContainText("4 个上传中");
  const bar = scene.getByRole("progressbar").first();
  expect((await bar.boundingBox())!.width).toBe(64);
  expect((await bar.locator(".rain-progress-track").boundingBox())!.height).toBe(4);
  await scene.screenshot({ path: info.outputPath("ordinary-progress.png") });
  await scene.getByRole("button", { name: "查看 2 个失败附件", exact: true }).click();
  await expect(rows).toHaveCount(24);
  await expect(scene.getByRole("button", { name: /^重试上传 / }).first()).toBeFocused();
  await scene.getByRole("button", { name: "收起附件", exact: true }).click();
  await expect(rows).toHaveCount(6);
  await expect(page.getByTestId("ordinary-summary")).toContainText("22 个已上传");
  await scene.getByRole("button", { name: "重试失败项（2）", exact: true }).click();
  await expect(page.getByTestId("ordinary-summary")).toContainText("24 个已上传", { timeout: 10000 });
  await expect(page.getByTestId("composer-summary")).toContainText("12 个已上传");
});

test("compact draft removes directly and sends a local reply with real added bytes", async ({ page }, info) => {
  const scene = page.getByTestId("attachment-scenario-composer");
  const row = scene.locator(".rain-attachment-list__item").first();
  const height = (await row.boundingBox())!.height;
  expect(height).toBe(40);
  const sizeText = row.getByText("965 B", { exact: true });
  if (info.project.name === "narrow") await expect(sizeText).toBeHidden();
  else await expect(sizeText).toBeVisible();
  const visibleCount = await scene.locator(".rain-attachment-list__item:visible").count();
  expect(visibleCount).toBe(info.project.name === "narrow" ? 2 : 4);
  await scene.getByRole("button", { name: "移除 课程导读.pdf", exact: true }).click();
  await expect(page.getByTestId("composer-summary")).toContainText("共 11 个");
  await expect(scene.getByRole("button", { name: "预览 课堂讲义.txt", exact: true })).toBeFocused();
  const fileName = "长文件名用于检查紧凑附件保留扩展名与操作空间".repeat(3) + ".txt";
  await scene.locator('.rain-attachment-picker input[type="file"]').setInputFiles({ name: fileName, mimeType: "text/plain", buffer: Buffer.from("scene draft actual bytes") });
  await expect(page.getByTestId("composer-summary")).toContainText("12 个已上传", { timeout: 10000 });
  await scene.getByRole("textbox", { name: "课程消息", exact: true }).fill("请阅读课堂资料后记录一个问题。");
  await scene.getByRole("button", { name: "发送到本页", exact: true }).click();
  await expect(scene.getByRole("article", { name: "本页消息 1", exact: true })).toContainText("请阅读课堂资料后记录一个问题。");
  await expect(scene.getByRole("textbox", { name: "课程消息", exact: true })).toHaveValue("");
  await expect(page.getByTestId("ordinary-summary")).toContainText("24 个已上传");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("modal body scrolls independently and closing preserves uploads and focus", async ({ page }, info) => {
  const trigger = page.getByRole("button", { name: "打开附件弹窗", exact: true });
  await trigger.click();
  const modal = page.getByRole("dialog", { name: "本次附件", exact: true });
  await expect(modal.locator(".rain-attachment-list__item")).toHaveCount(24);
  await modal.evaluate(async node => { await Promise.all(node.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {}))); });
  const body = modal.locator(".rain-dialog-body");
  const before = await modal.locator(".rain-dialog-footer").boundingBox();
  await body.evaluate(node => { node.scrollTop = node.scrollHeight; });
  const after = await modal.locator(".rain-dialog-footer").boundingBox();
  expect(after!.y).toBe(before!.y);
  expect(await body.evaluate(node => node.scrollHeight > node.clientHeight && node.scrollTop > 0)).toBe(true);
  await modal.screenshot({ path: info.outputPath("modal.png") });
  await modal.getByRole("button", { name: "演示上传", exact: true }).click();
  await modal.getByRole("button", { name: "关闭附件弹窗", exact: true }).click();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(page.getByTestId("dialog-summary")).toContainText("2 个失败", { timeout: 10000 });
  await expect(page.getByTestId("dialog-summary")).toContainText("22 个已上传", { timeout: 10000 });
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("media fills grid tracks, has no format badges and plays actual video", async ({ page }, info) => {
  const scene = page.getByTestId("attachment-scenario-media");
  const rows = scene.locator(".rain-attachment-list__item");
  await expect(rows).toHaveCount(8);
  for (const img of await scene.getByRole("img").all()) {
    await expect.poll(() => img.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await expect(scene.locator('[data-icon^="icon/file-format-"]')).toHaveCount(0);
  const track = await rows.first().boundingBox(), card = await rows.first().locator(".rain-attachment-list__card").boundingBox();
  expect(Math.abs(track!.width - card!.width)).toBeLessThan(1);
  await scene.screenshot({ path: info.outputPath("media.png") });
  await scene.getByRole("button", { name: "预览 课堂演示.mp4", exact: true }).click();
  const modal = page.getByRole("dialog", { name: "课堂演示.mp4", exact: true });
  const video = modal.locator("video");
  await expect(video).toBeVisible();
  await expect.poll(() => video.evaluate(node => (node as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(2);
  await video.press("Space");
  await expect.poll(() => video.evaluate(node => (node as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
  await modal.screenshot({ path: info.outputPath("video.png") });
  await page.keyboard.press("Escape");
  await expect(scene.getByRole("button", { name: "预览 课堂演示.mp4", exact: true })).toBeFocused();
  const event = page.waitForEvent("download");
  await scene.getByRole("button", { name: "下载 课堂演示.mp4", exact: true }).click();
  const download = await event;
  expect(download.suggestedFilename()).toBe("课堂演示.mp4");
  expect(readFileSync((await download.path())!)).toEqual(readFileSync("apps/playground/public/attachment-demo/scenario-video.mp4"));
  await scene.getByRole("button", { name: "展开全部 12 个", exact: true }).click();
  await expect(rows).toHaveCount(12);
});

test("both themes retain narrow layout and broken thumbnail identity", async ({ page }, info) => {
  const media = page.getByTestId("attachment-scenario-media");
  await page.route("**/attachment-demo/scenario-classroom.png", route => route.abort());
  await page.reload();
  await expect(media.getByRole("img", { name: "缩略图 课堂板书.png", exact: true })).toHaveCount(0);
  await expect(media.locator('[data-attachment-id="media-image-classroom"] [data-icon="icon/file-format-image-png"]')).toBeVisible();
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") await page.getByRole("button", { name: "深色", exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByTestId("attachment-scenario-ordinary").screenshot({ path: info.outputPath(theme + "-ordinary.png") });
    await page.getByTestId("attachment-scenario-composer").screenshot({ path: info.outputPath(theme + "-composer.png") });
    await media.screenshot({ path: info.outputPath(theme + "-media-fallback.png") });
  }
});

test("three and four draft attachments remain accessible after folding", async ({ page }, info) => {
  const scene = page.getByTestId("attachment-scenario-composer");
  await scene.getByRole("button", { name: "查看全部 12 个", exact: true }).click();
  for (let i = 0; i < 8; i++) await scene.getByRole("button", { name: /^移除 / }).first().click();
  await expect(page.getByTestId("composer-summary")).toContainText("共 4 个");
  if (info.project.name === "narrow") {
    await scene.getByRole("button", { name: "收起附件", exact: true }).click();
    await expect(scene.locator(".rain-attachment-list__item:visible")).toHaveCount(2);
    await scene.getByRole("button", { name: "查看全部 4 个", exact: true }).click();
  }
  await expect(scene.locator(".rain-attachment-list__item:visible")).toHaveCount(4);
  await scene.getByRole("button", { name: /^移除 / }).first().click();
  if (info.project.name === "narrow") {
    await scene.getByRole("button", { name: "收起附件", exact: true }).click();
    await expect(scene.locator(".rain-attachment-list__item:visible")).toHaveCount(2);
    await scene.getByRole("button", { name: "查看全部 3 个", exact: true }).click();
  }
  await expect(scene.locator(".rain-attachment-list__item:visible")).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await scene.screenshot({ path: info.outputPath("draft-three-files.png") });
});
