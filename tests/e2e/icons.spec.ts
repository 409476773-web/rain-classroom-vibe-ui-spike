import { expect, test, type Page } from "@playwright/test";

import { iconCatalog } from "../../packages/foundations/src/icons/catalog.generated";

function gallery(page: Page) {
  return page.getByRole("list", { name: "图标列表" });
}

function card(page: Page, assetId: string) {
  return gallery(page).locator(`[data-asset-id="${assetId}"]`);
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto("/#icons");
});

test("the directory has discoverable entry points and restores route heading focus", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1, name: "Icons 图标库" })).toBeVisible();
  await expect(page.getByText("899 个来源图标")).toBeVisible();
  await expect(page.getByText("899 个可预览 · 0 个源图形待修复")).toBeVisible();
  await expect(page.getByText("原有图标视觉已验收")).toBeVisible();
  await expect(page.getByText("2 枚新增批改图标待视觉验收")).toBeVisible();
  await page.getByRole("link", { name: "返回总览", exact: true }).click();
  await page.getByRole("link", { name: /^Icons：/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Icons 图标库" })).toBeFocused();
  await page.getByRole("link", { name: "体验文字按钮", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: "TextButton 文字按钮" })).toBeFocused();
  await page.getByRole("link", { name: "查看完整图标库", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Icons 图标库" })).toBeFocused();
});

test("the overview defers the full directory module until its route is opened", async ({ page }) => {
  await page.goto("about:blank");
  const requests: string[] = [];
  const isDirectoryModule = (url: string) => /\/(?:docs\/icons-page\.tsx|assets\/icons-page-[\w-]+\.js)$/.test(new URL(url).pathname);
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/#overview");
  await expect(page.getByRole("heading", { level: 1, name: "Rain Next Playground" })).toBeVisible();
  expect(requests.some(isDirectoryModule)).toBe(false);
  await page.getByRole("link", { name: /^Icons：/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Icons 图标库" })).toBeFocused();
  expect(requests.some(isDirectoryModule)).toBe(true);
});

test("all frozen identities are reachable exactly once and every available preview decodes in the browser", async ({ page }) => {
  test.setTimeout(120_000);
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  const expected = new Map(iconCatalog.map((asset) => [asset.assetId, asset]));
  expect(expected.size).toBe(899);
  expect(iconCatalog.filter((asset) => asset.source.kind !== "non-component")).toHaveLength(897);
  expect(iconCatalog.filter((asset) => asset.source.kind === "non-component").map((asset) => asset.assetId)).toEqual([
    "icon/grading-pending", "icon/grading-reviewed",
  ]);
  expect(iconCatalog.filter((asset) => asset.availability === "source-unavailable")).toEqual([]);

  const seen = new Set<string>();
  let pageNumber = 0;
  let decodedCount = 0;
  for (;;) {
    const cards = gallery(page).locator(":scope > li");
    await expect(cards).toHaveCount(Math.min(60, expected.size - pageNumber * 60));
    const rows = await cards.evaluateAll(async (elements) => Promise.all(elements.map(async (element) => {
      const assetId = element.getAttribute("data-asset-id");
      const preview = element.querySelector('[data-slot="icon-preview"]');
      const icon = preview?.querySelector<HTMLElement>('[data-rain-id="icon"]');
      const result = { assetId, iconId: icon?.getAttribute("data-icon") ?? null, availability: element.getAttribute("data-availability"), src: "", decoded: false, visiblePixels: 0, failure: "" };
      if (!icon) return result;
      const image = icon.querySelector("img");
      const mask = getComputedStyle(icon).maskImage;
      const src = image?.currentSrc || image?.src || /^url\(["']?(.*?)["']?\)$/.exec(mask)?.[1] || "";
      result.src = src;
      if (!src) { result.failure = "No image or mask source"; return result; }
      try {
        const decoded = new Image();
        decoded.src = src;
        await decoded.decode();
        result.decoded = decoded.naturalWidth > 0 && decoded.naturalHeight > 0;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 48;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas alpha inspection is unavailable");
        context.drawImage(decoded, 0, 0, 48, 48);
        const pixels = context.getImageData(0, 0, 48, 48).data;
        for (let index = 3; index < pixels.length; index += 4) {
          if (pixels[index]! > 0) result.visiblePixels += 1;
        }
      } catch (error) {
        result.failure = error instanceof Error ? error.message : String(error);
      }
      return result;
    })));

    for (const row of rows) {
      expect(row.assetId).not.toBeNull();
      const asset = expected.get(row.assetId!);
      expect(asset, `Unexpected catalog identity ${row.assetId}`).toBeDefined();
      expect(seen.has(row.assetId!), `Duplicate page entry ${row.assetId}`).toBe(false);
      seen.add(row.assetId!);
      expect(row.availability).toBe(asset!.availability);
      if (asset!.source.kind === "non-component") {
        await expect(card(page, row.assetId!).getByText("新增批改图标 · 待视觉验收")).toBeVisible();
      }
      if (asset!.availability === "source-unavailable") {
        expect(row.iconId).toBeNull();
        expect(row.src).toBe("");
      } else {
        expect(row.iconId).toBe(row.assetId);
        expect(row.failure, row.assetId!).toBe("");
        expect(row.decoded, `${row.assetId} must decode from its own asset`).toBe(true);
        expect(row.visiblePixels, `${row.assetId} must contain visible source pixels`).toBeGreaterThan(0);
        // Vite inlines small originals and adds content hashes to production asset URLs.
        if (!row.src.startsWith("data:image/")) {
          const filename = new URL(row.src).pathname.split("/").at(-1);
          expect(filename, row.assetId!).toMatch(new RegExp(`^${asset!.slug}(?:-[\\w-]+)?\\.(?:svg|png)$`));
        }
        decodedCount += 1;
      }
    }

    const next = page.getByRole("button", { name: "下一页", exact: true });
    if (await next.isDisabled()) break;
    const firstId = rows[0]!.assetId;
    await next.click();
    await expect(cards.first()).not.toHaveAttribute("data-asset-id", firstId!);
    pageNumber += 1;
  }

  expect(pageNumber + 1).toBe(15);
  expect([...seen].sort()).toEqual([...expected.keys()].sort());
  expect(decodedCount).toBe(899);
  expect(pageErrors).toEqual([]);
});

test("Chinese semantics and English names remain searchable without turning exceptions into defaults", async ({ page }) => {
  const search = page.getByRole("searchbox", { name: "搜索图标" });
  await search.fill("编辑");
  await expect(card(page, "icon/edit-pencil")).toBeVisible();
  await expect(card(page, "icon/edit-pencil-filled")).toBeVisible();
  await expect(card(page, "icon/edit-pencil-filled").getByText("按要求使用", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "默认用途", exact: true }).click();
  await expect(card(page, "icon/edit-pencil")).toBeVisible();
  await expect(card(page, "icon/edit-pencil-filled")).toHaveCount(0);
  await page.getByRole("button", { name: "全部图标", exact: true }).click();
  await search.fill("EDITPENCILICON");
  await expect(gallery(page).locator(":scope > li")).toHaveCount(1);
  await expect(card(page, "icon/edit-pencil")).toBeVisible();
  await search.fill("普通提示");
  await expect(card(page, "icon/info")).toBeVisible();
  await search.fill("普通题型");
  await expect(card(page, "icon/info")).toHaveCount(0);
  await search.fill("分享");
  await expect(card(page, "icon/share-alt")).toHaveCount(0);
  await search.fill("没有这个图标xyz");
  await expect(page.getByRole("heading", { name: "没有找到匹配的图标" })).toBeVisible();
  await page.getByRole("button", { name: "清除搜索与筛选", exact: true }).click();
  await expect(search).toHaveValue("");
  await expect(gallery(page).locator(":scope > li")).toHaveCount(60);
});

test("repaired graphics remain available without inventing confirmed semantics", async ({ page }) => {
  await page.getByRole("button", { name: "用途待确认", exact: true }).click();
  await expect(gallery(page).locator(':scope > li:not([data-usage="unconfirmed"])')).toHaveCount(0);
  await page.getByRole("searchbox", { name: "搜索图标" }).fill("icon/edit");
  const legacyEdit = card(page, "icon/edit");
  await expect(legacyEdit).toBeVisible();
  await legacyEdit.locator("summary").click();
  await expect(legacyEdit.getByText("尚未登记固定用途。请根据具体场景核对，不作为全局默认。", { exact: true })).toBeVisible();
  await expect(legacyEdit.locator("pre")).toContainText('import { EditIcon } from "@rain-next/ui/icons/edit";');

  for (const [assetId, exportName, nodeId] of [
    ["icon/editor-redo", "EditorRedoIcon", "84-35"],
    ["icon/editor-undo", "EditorUndoIcon", "84-32"],
  ] as const) {
    await page.getByRole("searchbox", { name: "搜索图标" }).fill(assetId);
    const repaired = card(page, assetId);
    await expect(repaired).toHaveAttribute("data-availability", "available");
    await expect(repaired).toHaveAttribute("data-usage", "unconfirmed");
    await expect(repaired.locator('[data-slot="icon-preview"] [data-rain-id="icon"]')).toHaveAttribute("data-icon", assetId);
    await repaired.locator("summary").click();
    await expect(repaired.getByRole("button", { name: "复制引用", exact: true })).toBeVisible();
    await expect(repaired.locator("pre")).toContainText(`import { ${exportName} } from "@rain-next/ui/icons/${assetId.replace("icon/", "")}";`);
    await expect(repaired.getByRole("link", { name: /查看 Figma 来源/ })).toHaveAttribute("href", new RegExp(`node-id=${nodeId}$`));
  }
  await page.getByRole("searchbox", { name: "搜索图标" }).fill("");
  await page.getByRole("button", { name: "待修复", exact: true }).click();
  await expect(gallery(page)).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "没有找到匹配的图标" })).toBeVisible();
});

test("preview controls change the host color and size while retaining the same asset", async ({ page }) => {
  await page.getByRole("searchbox", { name: "搜索图标" }).fill("icon/edit-pencil");
  const preview = card(page, "icon/edit-pencil").locator('[data-slot="icon-preview"]');
  const icon = preview.locator('[data-rain-id="icon"]');
  const initialSource = await icon.evaluate((element) => getComputedStyle(element).maskImage);
  const colors = new Set<string>();
  for (const [label, value] of [["默认", "default"], ["主题蓝", "brand"], ["危险红", "danger"], ["深色底", "inverse"]]) {
    await page.getByRole("radio", { name: label, exact: true }).check();
    await expect(gallery(page)).toHaveAttribute("data-preview-color", value!);
    const foreground = await preview.evaluate((element) => getComputedStyle(element).color);
    colors.add(foreground);
    await expect(icon).toHaveCSS("background-color", foreground);
    await expect(icon).toHaveCSS("mask-image", initialSource);
  }
  expect(colors.size).toBe(4);
  for (const size of [16, 20, 24, 32]) {
    await page.getByRole("radio", { name: `${size}px`, exact: true }).check();
    await expect(icon).toHaveCSS("width", `${size}px`);
    await expect(icon).toHaveCSS("height", `${size}px`);
  }
  await expect(icon).toHaveAttribute("aria-hidden", "true");
  await expect(icon).not.toHaveAttribute("tabindex");
});

test("details retain keyboard behavior and formal arrows, and copy a usable static import", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("searchbox", { name: "搜索图标" }).fill("icon/edit-pencil");
  const edit = card(page, "icon/edit-pencil");
  const summary = edit.locator("summary");
  await expect(summary).toHaveCSS("list-style-type", "none");
  await expect(summary.locator('[data-icon="icon/arrow-down"]')).toBeVisible();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(summary).toBeFocused();
  await expect(edit.locator("details")).toHaveAttribute("open", "");
  await expect(summary.locator('[data-icon="icon/arrow-up"]')).toBeVisible();
  await expect(edit.getByRole("link", { name: /查看 Figma 来源/ })).toHaveAttribute("href", /node-id=183-574$/);
  await edit.getByRole("button", { name: "复制引用", exact: true }).click();
  await expect(edit.getByRole("status")).toHaveText("已复制引用");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";\n\n<EditPencilIcon />');
  await summary.focus();
  await page.keyboard.press("Space");
  await expect(edit.locator("details")).not.toHaveAttribute("open");
  await expect(summary.locator('[data-icon="icon/arrow-down"]')).toBeVisible();
});

test("scenario examples preserve the confirmed semantics and real local interactions", async ({ page, context }) => {
  const examples = page.getByRole("region", { name: "放进真实场景" });
  const edit = examples.getByRole("button", { name: "编辑课程", exact: true });
  await expect(edit.locator('[data-icon="icon/edit-pencil"]')).toBeVisible();
  await edit.click();
  await expect(examples.getByText("已体验 1 次编辑操作。", { exact: true })).toBeVisible();
  const disclosure = examples.getByRole("button", { name: /^(展开更多|收起)$/ });
  await disclosure.focus();
  await page.keyboard.press("Enter");
  await expect(disclosure).toHaveAccessibleName("收起");
  await expect(disclosure.locator('[data-icon="icon/double-arrow-up"]')).toBeVisible();
  await expect(page.locator("#icons-expanded-example")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(disclosure.locator('[data-icon="icon/double-arrow-down"]')).toBeVisible();
  await expect(page.locator("#icons-expanded-example")).toBeHidden();
  for (const name of ["清空值示意", "失败提示示意"]) {
    await expect(examples.getByRole("group", { name, exact: true }).locator('[data-icon="icon/circle-close"]')).toBeVisible();
  }
  const publish = examples.getByRole("button", { name: "发布课程", exact: true });
  await expect(publish.locator('[data-icon="icon/publish"]')).toBeVisible();
  await publish.click();
  await expect(examples.getByText("已体验 1 次发布操作，仅本地演示。", { exact: true })).toBeVisible();
  await expect(examples.getByRole("group", { name: "成功结果示意" }).locator('[data-icon="icon/circle-check"]')).toBeVisible();
  await expect(examples.getByRole("group", { name: "当前已发布示意" }).locator('[data-icon="icon/published"]')).toBeVisible();
  const pagesBeforeNavigation = context.pages().length;
  const detail = examples.getByRole("button", { name: "查看详情", exact: true });
  await expect(detail.locator('[data-icon="icon/share-alt"]')).toBeVisible();
  await detail.click();
  await expect(page).toHaveURL(/#text-button-help$/);
  await expect(page.getByRole("heading", { level: 1, name: "TextButton 演示帮助" })).toBeFocused();
  expect(context.pages()).toHaveLength(pagesBeforeNavigation);
});

test("the directory and expanded asset details remain usable on narrow screens", async ({ page }) => {
  for (const width of [375, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.getByRole("searchbox", { name: "搜索图标" }).fill("icon/edit-pencil");
    const edit = card(page, "icon/edit-pencil");
    if (await edit.locator("details").getAttribute("open") === null) {
      await edit.locator("summary").click();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const code = edit.locator("pre");
    const geometry = await code.evaluate((element) => ({ width: element.clientWidth, scroll: element.scrollWidth }));
    expect(geometry.scroll).toBeLessThanOrEqual(geometry.width + 1);
    await expect(edit.getByRole("button", { name: "复制引用", exact: true })).toBeVisible();
  }
});
