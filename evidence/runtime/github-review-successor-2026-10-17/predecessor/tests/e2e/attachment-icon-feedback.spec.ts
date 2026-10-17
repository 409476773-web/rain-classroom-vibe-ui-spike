import { expect, test } from "@playwright/test";

test("registered format icons stay small in both surfaces and themes", async ({ page }, testInfo) => {
  await page.goto("/#attachment");
  await expect(page.getByRole("heading", { name: "Attachment 文件附件", exact: true })).toBeVisible();
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") await page.getByRole("button", { name: "深色", exact: true }).click();
    for (const surface of ["白底 · 浅描边", "浅灰底"]) {
      const column = page.getByRole("region", { name: surface, exact: true });
      for (const [name, slug] of [["课程导读：从问题到证据.pdf", "file-format-pdf"], ["课堂录像.mp4", "file-format-video-mp4"], ["课堂录音.mp3", "file-format-audio-mp3"]]) {
        const row = column.getByRole("group", { name: name + " 示例", exact: true });
        const icon = row.locator(`.attachment-states-demo__media > [data-icon="icon/${slug}"]`);
        await expect(icon).toHaveAttribute("data-icon-color-mode", "intrinsic");
        await expect.poll(() => icon.locator("img").evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        const glyph = await icon.boundingBox(), media = await row.locator(".attachment-states-demo__media").boundingBox();
        expect(glyph?.width).toBe(24); expect(glyph?.height).toBe(24);
        expect(media?.width).toBe(32); expect(media?.height).toBe(32);
      }
      const positions = await column.locator('.attachment-states-demo__actions [aria-haspopup="menu"]').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().x));
      expect(Math.max(...positions) - Math.min(...positions)).toBeLessThan(1);
      const video = column.getByRole("group", { name: "授课录像.mp4 示例", exact: true });
      const title = await video.locator(".attachment-states-demo__title").boundingBox();
      const subtitle = await video.locator(".attachment-states-demo__subtitle-copy").boundingBox();
      expect(Math.abs(title!.x - subtitle!.x)).toBeLessThan(1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(theme + ".png") });
  }
});

test("workflow preserves thumbnail size and uses the exact color format on image failure", async ({ page }, testInfo) => {
  await page.goto("/#attachment");
  const form = page.getByRole("form", { name: "课程附件", exact: true });
  const picture = form.getByRole("img", { name: "缩略图 高等数学课程封面.png", exact: true });
  await expect(picture).toBeVisible();
  expect((await picture.boundingBox())?.width).toBe(40);
  const pdf = form.locator('[data-icon="icon/file-format-pdf"]');
  expect((await pdf.boundingBox())?.width).toBe(24);
  await page.route("**/attachment-demo/course-cover.png", route => route.abort());
  await page.reload();
  await expect(form.getByRole("img", { name: "缩略图 高等数学课程封面.png", exact: true })).toHaveCount(0);
  const png = form.locator('[data-icon="icon/file-format-image-png"]');
  await expect(png).toHaveAttribute("data-icon-color-mode", "intrinsic");
  expect((await png.boundingBox())?.width).toBe(24);
  await page.getByText("演示选项", { exact: true }).click();
  await page.getByText("浅灰填充", { exact: true }).click();
  await expect(form.locator('.rain-attachment-list__card').first()).toHaveAttribute("data-surface", "filled");
  const more = form.getByRole("button", { name: "更多操作 课程导读：从问题到证据.pdf", exact: true });
  await more.click();
  await page.getByRole("menuitem", { name: "文件信息", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "文件信息", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(more).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("workflow-filled.png") });
});
