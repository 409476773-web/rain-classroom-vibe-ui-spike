import { expect, test, type JSHandle, type Locator, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";

const intakeSelector = '[data-rain-id="local-attachment-intake"]';
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aG7sAAAAASUVORK5CYII=", "base64");
const fixture = (name: string, text = "attachment intake actual local bytes") => ({ name, mimeType: "text/plain", buffer: Buffer.from(text) });
const scene = (page: Page, name: string) => page.getByTestId(`attachment-scenario-${name}`);
const summary = (page: Page, name: string) => page.getByTestId(`${name}-summary`);

async function choose(page: Page, scope: Locator, label: string, file: ReturnType<typeof fixture>) {
  const chooser = page.waitForEvent("filechooser");
  await scope.getByRole("button", { name: label, exact: true }).click();
  await (await chooser).setFiles(file);
}

async function transfer(page: Page, file: ReturnType<typeof fixture>): Promise<JSHandle<DataTransfer>> {
  return page.evaluateHandle(({ name, mimeType, bytes }) => {
    const data = new DataTransfer();
    data.items.add(new File([Uint8Array.from(atob(bytes), value => value.charCodeAt(0))], name, { type: mimeType }));
    return data;
  }, { ...file, bytes: file.buffer.toString("base64") });
}

async function assertNoHorizontalOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

test.beforeEach(async ({ page }) => { await page.goto("/#attachment"); });

test("populated scenes use light entries and the media entry occupies one card track", async ({ page }, info) => {
  const ordinary = scene(page, "ordinary"), composer = scene(page, "composer"), media = scene(page, "media");
  await expect(ordinary.locator(intakeSelector)).toHaveAttribute("data-variant", "list");
  await expect(composer.locator(intakeSelector)).toHaveAttribute("data-variant", "composer");
  await expect(media.locator(intakeSelector)).toHaveAttribute("data-variant", "media");
  const listEntry = ordinary.getByRole("button", { name: "添加课程附件", exact: true });
  const composerEntry = composer.getByRole("button", { name: "添加草稿附件", exact: true });
  const mediaEntry = media.getByRole("button", { name: "添加图片或视频", exact: true });
  await expect(listEntry).toHaveText("添加文件");
  await expect(composerEntry).toHaveText("添加附件");
  expect((await listEntry.boundingBox())!.height).toBeLessThanOrEqual(48);
  expect((await composerEntry.boundingBox())!.height).toBeLessThanOrEqual(48);
  await expect(ordinary.locator(".rain-attachment-list__item")).toHaveCount(6);
  await expect(media.locator(".rain-attachment-list__item")).toHaveCount(8);
  await expect(ordinary.getByText("拖拽文件到这里，或", { exact: true })).toBeHidden();
  await expect(media.getByText("拖入图片或视频，或", { exact: true })).toBeHidden();
  const card = await media.locator(".rain-attachment-list__card").first().boundingBox();
  const entry = await mediaEntry.boundingBox();
  expect(Math.abs(entry!.width - card!.width)).toBeLessThanOrEqual(1);
  const cardPositions = await media.locator(".rain-attachment-list__card").evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().x));
  expect(cardPositions.some(x => Math.abs(x - entry!.x) <= 1)).toBe(true);
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") await page.getByRole("button", { name: "深色", exact: true }).click();
    await assertNoHorizontalOverflow(page);
    await ordinary.screenshot({ path: info.outputPath(`${theme}-populated-list.png`) });
    await composer.screenshot({ path: info.outputPath(`${theme}-populated-composer.png`) });
    await media.screenshot({ path: info.outputPath(`${theme}-populated-media.png`) });
  }
});

test("first-add controls clear only their own attachments and preserve composer text", async ({ page }, info) => {
  const ordinary = scene(page, "ordinary"), composer = scene(page, "composer"), media = scene(page, "media");
  await ordinary.getByRole("button", { name: "查看首次添加", exact: true }).click();
  await expect(ordinary.locator(".rain-attachment-list__item")).toHaveCount(0);
  await expect(ordinary.getByText("拖拽文件到这里，或", { exact: true })).toBeVisible();
  await expect(ordinary.getByRole("button", { name: "添加课程附件", exact: true })).toHaveText("选择文件");
  await expect(summary(page, "composer")).toContainText("共 12 个");
  await expect(summary(page, "media")).toContainText("共 12 个");
  await ordinary.screenshot({ path: info.outputPath("empty-list.png") });
  await ordinary.getByRole("button", { name: "恢复普通列表示例", exact: true }).click();
  await expect(summary(page, "ordinary")).toContainText("24 个已上传");
  const message = composer.getByRole("textbox", { name: "课程消息", exact: true });
  await message.fill("首次添加只清空附件，保留这段正文。");
  await composer.getByRole("button", { name: "查看首次添加", exact: true }).click();
  await expect(summary(page, "composer")).toContainText("共 0 个");
  await expect(message).toHaveValue("首次添加只清空附件，保留这段正文。");
  await expect(composer.getByRole("button", { name: "添加草稿附件", exact: true })).toHaveText("添加附件");
  await expect(composer.getByText("拖拽文件到这里，或", { exact: true })).toBeHidden();
  await composer.screenshot({ path: info.outputPath("empty-composer.png") });
  await media.getByRole("button", { name: "查看首次添加", exact: true }).click();
  await expect(media.locator(".rain-attachment-list__item")).toHaveCount(0);
  await expect(media.getByText("拖入图片或视频，或", { exact: true })).toBeVisible();
  await expect(media.getByRole("button", { name: "添加图片或视频", exact: true })).toHaveText("选择文件");
  await media.screenshot({ path: info.outputPath("empty-media.png") });
  await media.getByRole("button", { name: "恢复媒体示例", exact: true }).click();
  await expect(summary(page, "media")).toContainText("12 个已上传");
  await assertNoHorizontalOverflow(page);
});

test("empty-state selection accepts a real file and restores the populated entry", async ({ page }) => {
  const ordinary = scene(page, "ordinary"), file = fixture("首次选择的资料.txt", "actual file selected from the empty intake");
  await ordinary.getByRole("button", { name: "查看首次添加", exact: true }).click();
  await choose(page, ordinary, "添加课程附件", file);
  await expect(summary(page, "ordinary")).toContainText("1 个已上传", { timeout: 10000 });
  await expect(ordinary.locator(".rain-attachment-list__item")).toHaveCount(1);
  await expect(ordinary.getByRole("button", { name: "添加课程附件", exact: true })).toHaveText("添加文件");
  await expect(ordinary.getByText("拖拽文件到这里，或", { exact: true })).toBeHidden();
  const downloading = page.waitForEvent("download");
  await ordinary.getByRole("button", { name: `下载 ${file.name}`, exact: true }).click();
  const downloaded = await downloading;
  expect(downloaded.suggestedFilename()).toBe(file.name);
  expect(readFileSync((await downloaded.path())!)).toEqual(file.buffer);
  await expect(summary(page, "composer")).toContainText("共 12 个");
  await expect(summary(page, "media")).toContainText("共 12 个");
});

test("file drag enters and leaves, then adds actual files only to the targeted scene", async ({ page }, info) => {
  const targets = [
    { name: "ordinary", file: fixture("拖入课程资料.txt"), count: 25 },
    { name: "composer", file: fixture("拖入草稿资料.txt"), count: 13 },
    { name: "media", file: { name: "拖入图片.png", mimeType: "image/png", buffer: png }, count: 13 },
  ];
  for (const target of targets) {
    const scope = scene(page, target.name), intake = scope.locator(intakeSelector);
    const data = await transfer(page, target.file);
    await intake.dispatchEvent("dragenter", { dataTransfer: data });
    await intake.dispatchEvent("dragover", { dataTransfer: data });
    await expect(intake).toHaveAttribute("data-state", "dragging");
    await scope.screenshot({ path: info.outputPath(`drag-${target.name}.png`) });
    await intake.dispatchEvent("dragleave", { dataTransfer: data });
    await expect(intake).toHaveAttribute("data-state", "idle");
    await intake.dispatchEvent("dragenter", { dataTransfer: data });
    await intake.dispatchEvent("drop", { dataTransfer: data });
    await expect(intake).toHaveAttribute("data-state", "idle");
    await expect(summary(page, target.name)).toContainText(`共 ${target.count} 个`);
    await data.dispose();
  }
  for (const target of targets) await expect(summary(page, target.name)).toContainText(`${target.count} 个已上传`, { timeout: 10000 });
  await expect(summary(page, "ordinary")).toContainText("共 25 个");
  await expect(summary(page, "composer")).toContainText("共 13 个");
  await expect(summary(page, "media")).toContainText("共 13 个");
  const media = scene(page, "media");
  await media.getByRole("button", { name: "展开全部 13 个", exact: true }).click();
  await expect.poll(() => media.getByRole("img", { name: "缩略图 拖入图片.png", exact: true }).evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const rejected = await transfer(page, fixture("图片区不接受.txt"));
  await media.locator(intakeSelector).dispatchEvent("drop", { dataTransfer: rejected });
  await expect(media.getByRole("alert")).toContainText("图片区不接受.txt");
  await expect(summary(page, "media")).toContainText("共 13 个");
  await rejected.dispose();
  await assertNoHorizontalOverflow(page);
});

test("text drags are not canceled or treated as file intake", async ({ page }) => {
  for (const name of ["ordinary", "composer", "media"]) {
    const intake = scene(page, name).locator(intakeSelector);
    const canceled = await intake.evaluate(node => {
      const data = new DataTransfer(); data.setData("text/plain", "ordinary text drag");
      return ["dragenter", "dragover", "drop"].map(type => {
        const event = new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: data });
        node.dispatchEvent(event);
        return event.defaultPrevented;
      });
    });
    expect(canceled).toEqual([false, false, false]);
    await expect(intake).toHaveAttribute("data-state", "idle");
  }
  await expect(summary(page, "ordinary")).toContainText("共 24 个");
  await expect(summary(page, "composer")).toContainText("共 12 个");
  await expect(summary(page, "media")).toContainText("共 12 个");
});

test("existing previews and draft removal still work, and new draft files wait before sending", async ({ page }) => {
  const ordinary = scene(page, "ordinary"), composer = scene(page, "composer");
  const preview = ordinary.getByRole("button", { name: "预览 课程导读.pdf", exact: true });
  await preview.click();
  await expect(page.getByRole("dialog", { name: "课程导读.pdf", exact: true }).locator("iframe")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(preview).toBeFocused();
  await composer.getByRole("button", { name: "移除 课程导读.pdf", exact: true }).click();
  await expect(summary(page, "composer")).toContainText("共 11 个");
  await expect(composer.getByRole("button", { name: "预览 课堂讲义.txt", exact: true })).toBeFocused();
  await composer.getByRole("button", { name: "查看首次添加", exact: true }).click();
  await choose(page, composer, "添加草稿附件", fixture("发送前添加.txt"));
  await expect(composer.getByRole("button", { name: "发送到本页", exact: true })).toBeDisabled();
  await expect(summary(page, "composer")).toContainText("1 个已上传", { timeout: 10000 });
  await composer.getByRole("textbox", { name: "课程消息", exact: true }).fill("带新附件的本页消息。");
  await composer.getByRole("button", { name: "发送到本页", exact: true }).click();
  await expect(composer.getByRole("article", { name: "本页消息 1", exact: true })).toContainText("带新附件的本页消息。");
  await expect(summary(page, "composer")).toContainText("共 0 个");
  await expect(composer.getByRole("textbox", { name: "课程消息", exact: true })).toHaveValue("");
  await expect(summary(page, "ordinary")).toContainText("共 24 个");
});

test("dialog first-add selection persists across closing while transient drag state clears", async ({ page }, info) => {
  const trigger = page.getByRole("button", { name: "打开附件弹窗", exact: true });
  await trigger.click();
  const modal = page.getByRole("dialog", { name: "本次附件", exact: true });
  const intake = modal.locator(intakeSelector);
  await expect(intake).toHaveAttribute("data-variant", "list");
  await expect(modal.locator(".rain-attachment-list__item")).toHaveCount(24);
  await modal.evaluate(async node => { await Promise.all(node.getAnimations({ subtree: true }).map(animation => animation.finished.catch(() => {}))); });
  const body = modal.locator(".rain-dialog-body"), footer = modal.locator(".rain-dialog-footer");
  const footerBefore = await footer.boundingBox();
  expect(footerBefore!.y).toBeGreaterThanOrEqual(0);
  expect(footerBefore!.y + footerBefore!.height).toBeLessThanOrEqual(page.viewportSize()!.height);
  expect(await body.evaluate(node => node.scrollHeight > node.clientHeight)).toBe(true);
  await body.evaluate(node => { node.scrollTop = node.scrollHeight; });
  expect(await body.evaluate(node => node.scrollTop)).toBeGreaterThan(0);
  expect(Math.abs((await footer.boundingBox())!.y - footerBefore!.y)).toBeLessThanOrEqual(1);
  await modal.screenshot({ path: info.outputPath("populated-dialog-scrolled.png") });
  await modal.getByRole("button", { name: "查看首次添加", exact: true }).click();
  await expect(summary(page, "dialog")).toContainText("共 0 个");
  await expect(modal.getByText("拖拽文件到这里，或", { exact: true })).toBeVisible();
  await modal.screenshot({ path: info.outputPath("empty-dialog.png") });
  await choose(page, modal, "添加弹窗附件", fixture("关闭弹窗仍保留.txt"));
  await expect(summary(page, "dialog")).toContainText("共 1 个");
  await modal.getByRole("button", { name: "关闭附件弹窗", exact: true }).click();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(summary(page, "dialog")).toContainText("1 个已上传", { timeout: 10000 });
  await expect(modal.getByRole("button", { name: "添加弹窗附件", exact: true })).toHaveText("添加文件");
  const data = await transfer(page, fixture("退出拖入.txt"));
  await intake.dispatchEvent("dragenter", { dataTransfer: data });
  await expect(intake).toHaveAttribute("data-state", "dragging");
  await modal.screenshot({ path: info.outputPath("drag-dialog.png") });
  await page.keyboard.press("Escape");
  await expect(modal).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(intake).toHaveAttribute("data-state", "idle");
  await expect(summary(page, "dialog")).toContainText("共 1 个");
  await expect(modal.locator(".rain-attachment-list__item")).toHaveCount(1);
  await expect(summary(page, "ordinary")).toContainText("共 24 个");
  await data.dispose();
  await modal.screenshot({ path: info.outputPath("populated-dialog.png") });
  await assertNoHorizontalOverflow(page);
});
