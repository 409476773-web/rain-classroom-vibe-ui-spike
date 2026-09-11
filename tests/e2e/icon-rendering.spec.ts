import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test, type Locator, type Page } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const stageSelector = "[data-icon-pixel-stage]";
type PngSource = string | number[];
type Reference = { assetId: string; nodeId: string; png: string };

function references() {
  const source = JSON.parse(readFileSync(resolve(root, "evidence/runtime/icon-migration/visual-references.json"), "utf8")) as {
    scale: number;
    assets: Reference[];
  };
  expect(source.scale).toBe(3);
  expect(source.assets.map((asset) => asset.assetId).sort()).toEqual([
    "icon/arrow-down", "icon/arrow-up", "icon/check-bold", "icon/chevron-down", "icon/chevron-up",
    "icon/double-arrow-down", "icon/double-arrow-up", "icon/edit-pencil", "icon/edit-pencil-filled",
  ]);
  for (const asset of source.assets) {
    expect(asset.nodeId).toMatch(/^\d+:\d+$/);
    expect(asset.png).toMatch(/^iVBOR/);
  }
  return source.assets;
}

function loadingReference(): PngSource {
  return Array.from(readFileSync(resolve(root, "evidence/icons/source-exports/button-loading.png")));
}

async function clearStage(page: Page) {
  await page.locator(stageSelector).evaluateAll((elements) => elements.forEach((element) => element.remove()));
}

async function galleryIcon(page: Page, assetId: string) {
  await clearStage(page);
  await page.getByRole("searchbox", { name: "搜索图标" }).fill(assetId);
  const icon = page.getByRole("list", { name: "图标列表" })
    .locator(`[data-asset-id="${assetId}"] [data-slot="icon-preview"] [data-rain-id="icon"]`);
  await expect(icon).toHaveCount(1);
  await expect(icon).toHaveAttribute("data-icon", assetId);
  await expect(icon).toHaveAttribute("data-icon-color-mode", "host");
  await expect(icon).toHaveCSS("mask-size", "contain");
  await icon.evaluate(async (element) => {
    const mask = getComputedStyle(element).maskImage;
    const src = /^url\(["']?(.*?)["']?\)$/.exec(mask)?.[1];
    if (!src) throw new Error(`The real renderer has no mask source: ${mask}`);
    const image = new Image();
    image.src = src;
    await image.decode();
  });
  return icon;
}

// Clone the actual rendered component into an opaque, pixel-aligned host. The
// fixture supplies only geometry and host colors; its mask/rendering stays intact.
async function mountIconHosts(page: Page, icon: Locator, colors?: Array<{ foreground: string; background: string }>) {
  await clearStage(page);
  await icon.evaluate((element, palettes) => {
    const originalHost = getComputedStyle(element.parentElement!);
    const hosts = palettes ?? [{ foreground: originalHost.color, background: originalHost.backgroundColor }];
    const stage = document.createElement("div");
    stage.setAttribute("data-icon-pixel-stage", "");
    Object.assign(stage.style, { position: "fixed", left: "16px", top: "16px", zIndex: "2147483647", display: "flex", gap: "16px", background: "white" });
    for (const [index, palette] of hosts.entries()) {
      const host = document.createElement("div");
      Object.assign(host.style, { display: "flex", width: "72px", height: "72px", color: palette.foreground, background: palette.background });
      const copy = element.cloneNode(true) as HTMLElement;
      copy.setAttribute("data-icon-pixel-copy", String(index));
      Object.assign(copy.style, { width: "72px", height: "72px", display: "block", margin: "0" });
      host.append(copy);
      stage.append(host);
    }
    document.body.append(stage);
  }, colors);
  return page.locator(`${stageSelector} [data-icon-pixel-copy]`);
}

async function mountButtonHost(page: Page, button: Locator) {
  await clearStage(page);
  await button.evaluate((element) => {
    const stage = document.createElement("div");
    stage.setAttribute("data-icon-pixel-stage", "");
    Object.assign(stage.style, { position: "fixed", left: "16px", top: "16px", padding: "16px", zIndex: "2147483647", display: "flex", background: "white" });
    stage.append(element.cloneNode(true));
    document.body.append(stage);
  });
  return page.locator(`${stageSelector} button`);
}

// Compute both endpoints after ancestor background/opacity composition. This
// includes Button's disabled opacity and TextButton's disabled slot opacity.
async function paintEndpoints(icon: Locator) {
  return icon.evaluate((element) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d")!;
    function rgba(value: string) {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = value;
      context.fillRect(0, 0, 1, 1);
      return Array.from(context.getImageData(0, 0, 1, 1).data);
    }
    const ownStyle = getComputedStyle(element);
    const ink = rgba(ownStyle.color);
    const layers: Array<{ color: number[]; opacity: number }> = [];
    for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
      const style = getComputedStyle(ancestor);
      layers.push({ color: rgba(style.backgroundColor), opacity: Number(style.opacity) });
      if (ancestor.hasAttribute("data-icon-pixel-stage")) break;
    }
    function composed(maskAlpha: number) {
      let alpha = maskAlpha * Number(ownStyle.opacity) * ink[3]! / 255;
      let premultiplied = ink.slice(0, 3).map((channel) => channel * alpha);
      for (const layer of layers) {
        const backgroundAlpha = layer.color[3]! / 255;
        premultiplied = premultiplied.map((channel, index) => (channel + layer.color[index]! * backgroundAlpha * (1 - alpha)) * layer.opacity);
        alpha = (alpha + backgroundAlpha * (1 - alpha)) * layer.opacity;
      }
      return premultiplied.map((channel) => channel + 255 * (1 - alpha));
    }
    return { foreground: composed(1), background: composed(0), color: ownStyle.color, maskSize: ownStyle.maskSize, maskPosition: ownStyle.maskPosition };
  });
}

async function rasterStats(page: Page, icon: Locator, reference: PngSource) {
  await icon.evaluate(async (element) => {
    const src = /^url\(["']?(.*?)["']?\)$/.exec(getComputedStyle(element).maskImage)?.[1];
    if (!src) throw new Error("A decodable image mask is required for pixel comparison");
    const image = new Image();
    image.src = src;
    await image.decode();
  });
  const endpoints = await paintEndpoints(icon);
  const screenshot = Array.from(await icon.screenshot({ animations: "disabled", scale: "css" }));
  return page.evaluate(async ({ actual, reference, endpoints }) => {
    async function decode(source: PngSource) {
      const objectUrl = typeof source === "string" ? undefined : URL.createObjectURL(new Blob([new Uint8Array(source)], { type: "image/png" }));
      const image = new Image();
      image.src = objectUrl ?? `data:image/png;base64,${source as string}`;
      try { await image.decode(); } finally { if (objectUrl) URL.revokeObjectURL(objectUrl); }
      return image;
    }
    const [rendered, original] = await Promise.all([decode(actual), decode(reference)]);
    const canvas = document.createElement("canvas");
    canvas.width = rendered.naturalWidth;
    canvas.height = rendered.naturalHeight;
    const context = canvas.getContext("2d")!;
    let maskWidth: number;
    let maskHeight: number;
    if (endpoints.maskSize === "contain") {
      const scale = Math.min(canvas.width / original.naturalWidth, canvas.height / original.naturalHeight);
      maskWidth = original.naturalWidth * scale;
      maskHeight = original.naturalHeight * scale;
    } else if (/^\d+(?:\.\d+)?%$/.test(endpoints.maskSize)) {
      // Button deliberately crops the canonical 24px canvas to its 20px ring.
      maskWidth = canvas.width * Number.parseFloat(endpoints.maskSize) / 100;
      maskHeight = maskWidth * original.naturalHeight / original.naturalWidth;
    } else {
      throw new Error(`Unverified mask-size geometry: ${endpoints.maskSize}`);
    }
    if (endpoints.maskPosition !== "50% 50%") throw new Error(`Unverified mask-position geometry: ${endpoints.maskPosition}`);
    context.drawImage(original, (canvas.width - maskWidth) / 2, (canvas.height - maskHeight) / 2, maskWidth, maskHeight);
    const expected = context.getImageData(0, 0, canvas.width, canvas.height).data;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(rendered, 0, 0);
    const actualPixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const delta = endpoints.foreground.map((channel, index) => channel - endpoints.background[index]!);
    const magnitude = delta.reduce((sum, channel) => sum + channel ** 2, 0);
    if (magnitude < 100) throw new Error("The mask foreground is indistinguishable from its host background");
    let error = 0;
    let referenceInk = 0;
    let renderedInk = 0;
    const referenceFadeBins = [0, 0, 0, 0];
    const renderedFadeBins = [0, 0, 0, 0];
    for (let offset = 0; offset < expected.length; offset += 4) {
      const alpha = expected[offset + 3]! / 255;
      const renderedAlpha = delta.reduce((sum, channel, index) => sum + (actualPixels[offset + index]! - endpoints.background[index]!) * channel, 0) / magnitude;
      if (alpha > 0.08) referenceInk += 1;
      if (renderedAlpha > 0.08) renderedInk += 1;
      if (alpha > 0.05 && alpha < 0.95) referenceFadeBins[Math.min(3, Math.floor(alpha * 4))]! += 1;
      if (renderedAlpha > 0.05 && renderedAlpha < 0.95) renderedFadeBins[Math.min(3, Math.floor(renderedAlpha * 4))]! += 1;
      for (let channel = 0; channel < 3; channel += 1) {
        error += Math.abs(actualPixels[offset + channel]! - (endpoints.background[channel]! + delta[channel]! * alpha));
      }
    }
    return {
      width: canvas.width,
      height: canvas.height,
      referenceWidth: original.naturalWidth,
      referenceHeight: original.naturalHeight,
      meanRgbError: error / (canvas.width * canvas.height * 3),
      referenceInk,
      renderedInk,
      referenceFadeBins,
      renderedFadeBins,
    };
  }, { actual: screenshot, reference, endpoints });
}

async function expectRaster(page: Page, icon: Locator, png: PngSource, label: string, maxError = 4) {
  const stats = await rasterStats(page, icon, png);
  expect(stats.referenceInk, `${label}: source must have visible pixels`).toBeGreaterThan(8);
  expect(stats.renderedInk / stats.referenceInk, `${label}: visible shape coverage`).toBeGreaterThan(0.7);
  expect(stats.renderedInk / stats.referenceInk, `${label}: mask must not turn into a rectangle`).toBeLessThan(1.3);
  expect(stats.meanRgbError, `${label}: screenshot versus source alpha`).toBeLessThan(maxError);
  return stats;
}

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.goto("/#icons");
  await expect(page.getByRole("heading", { name: "Icons 图标库", level: 1 })).toBeVisible();
});

test("the nine Figma PNG references retain their shapes in actual CSS masks", async ({ page }) => {
  test.setTimeout(90_000);
  for (const reference of references()) {
    const original = await galleryIcon(page, reference.assetId);
    const icon = await mountIconHosts(page, original, [{ foreground: "rgb(29, 33, 41)", background: "white" }]);
    const stats = await expectRaster(page, icon, reference.png, reference.assetId);
    expect([stats.referenceWidth, stats.referenceHeight, stats.width, stats.height]).toEqual([72, 72, 72, 72]);
  }
});

test("the same icon paints the actual default, blue, red and inverse host colors", async ({ page }) => {
  const reference = references().find((item) => item.assetId === "icon/edit-pencil")!;
  const original = await galleryIcon(page, reference.assetId);
  const source = await original.evaluate((element) => getComputedStyle(element).maskImage);
  const seenColors = new Set<string>();
  for (const name of ["默认", "主题蓝", "危险红", "深色底"]) {
    await clearStage(page);
    await page.getByRole("radio", { name, exact: true }).check();
    await expect(original).toHaveCSS("mask-image", source);
    const copy = await mountIconHosts(page, original);
    const color = await copy.evaluate((element) => getComputedStyle(element.parentElement!).color);
    seenColors.add(color);
    await expect(copy).toHaveCSS("color", color);
    await expect(copy).toHaveCSS("background-color", color);
    await expectRaster(page, copy, reference.png, `edit / ${name}`);
  }
  expect(seenColors.size).toBe(4);
});

test("luminance masks remain isolated across repeated blue and red icons", async ({ page }) => {
  for (const assetId of ["icon/arrow-down", "icon/arrow-up", "icon/check-bold"]) {
    const reference = references().find((item) => item.assetId === assetId)!;
    const original = await galleryIcon(page, assetId);
    const copies = await mountIconHosts(page, original, [
      { foreground: "rgb(21, 97, 248)", background: "white" },
      { foreground: "rgb(201, 52, 63)", background: "white" },
    ]);
    await expect(copies).toHaveCount(2);
    const duplicateIds = await page.locator(stageSelector).evaluate((element) => {
      const ids = Array.from(element.querySelectorAll("[id]"), (node) => node.id);
      return ids.filter((id, index) => ids.indexOf(id) !== index);
    });
    expect(duplicateIds, `${assetId}: repeated instances must not share local defs IDs`).toEqual([]);
    await expectRaster(page, copies.nth(0), reference.png, `${assetId} / blue`);
    await expectRaster(page, copies.nth(1), reference.png, `${assetId} / red`);
  }
});

test("primary-button icon pixels follow the host through hover, pressed and disabled states", async ({ page }) => {
  await page.goto("/#components");
  const disabledClassName = await page
    .getByRole("button", { name: "主按钮停用", exact: true })
    .getAttribute("class");
  expect(disabledClassName).toContain("opacity-rain-button-disabled-primary");
  await page.goto("/#icons");
  await expect(page.getByRole("heading", { name: "Icons 图标库", level: 1 })).toBeVisible();

  const reference = references().find((item) => item.assetId === "icon/edit-pencil")!;
  const button = await mountButtonHost(page, page.getByRole("button", { name: "编辑课程", exact: true }));
  const icon = button.locator('[data-icon="icon/edit-pencil"]');
  const source = await icon.evaluate((element) => getComputedStyle(element).maskImage);
  await expect(button).toHaveCSS("color", "rgb(255, 255, 255)");
  const normalBackground = await button.evaluate((element) => getComputedStyle(element).backgroundColor);
  await expectRaster(page, icon, reference.png, "primary / normal", 10);

  await button.hover();
  await expect(button).toHaveCSS("background-color", "rgba(0, 58, 173, 0.85)");
  expect(await button.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(normalBackground);
  const hoveredBorder = await button.evaluate((element) => getComputedStyle(element).borderColor);
  await expectRaster(page, icon, reference.png, "primary / hover", 10);
  await page.mouse.down();
  try {
    await expect(button).toHaveCSS("background-color", "rgba(0, 58, 173, 0.85)");
    await expect(button).toHaveCSS("border-color", "rgb(61, 123, 255)");
    expect(await button.evaluate((element) => getComputedStyle(element).borderColor)).not.toBe(hoveredBorder);
    await expect(icon).toHaveCSS("color", "rgb(255, 255, 255)");
    await expectRaster(page, icon, reference.png, "primary / pressed", 10);
  } finally {
    await page.mouse.up();
  }

  // This clone is detached from React, so mirror native/data state and the
  // class recipe read from a real disabled primary Button on the review page.
  await button.evaluate((element: HTMLButtonElement, className) => {
    element.disabled = true;
    element.dataset.state = "disabled";
    element.className = className!;
  }, disabledClassName);
  await expect(button).toHaveCSS("opacity", "0.3");
  await expect(icon).toHaveCSS("opacity", "1");
  await expect(icon).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(icon).toHaveCSS("mask-image", source);
  await expectRaster(page, icon, reference.png, "primary / disabled", 10);
});

test("Loading retains the source alpha fade and stops rotation under reduced motion", async ({ page }) => {
  const png = loadingReference();
  const original = await galleryIcon(page, "icon/button-loading");
  const copies = await mountIconHosts(page, original, [
    { foreground: "rgb(21, 97, 248)", background: "white" },
    { foreground: "white", background: "rgb(29, 33, 41)" },
  ]);
  for (const [index, name] of ["blue", "inverse"].entries()) {
    const stats = await expectRaster(page, copies.nth(index), png, `Loading / ${name}`);
    for (let bin = 0; bin < 4; bin += 1) {
      expect(stats.referenceFadeBins[bin], `source fade bucket ${bin}`).toBeGreaterThan(10);
      expect(stats.renderedFadeBins[bin], `rendered fade bucket ${bin}`).toBeGreaterThan(stats.referenceFadeBins[bin]! * 0.6);
    }
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#text-button");
  const loading = page.getByRole("region", { name: "颜色与状态" })
    .getByRole("group", { name: "普通灰蓝", exact: true }).locator('button[data-state="loading"]');
  const button = await mountButtonHost(page, loading);
  const indicator = button.locator('[data-slot="loading-indicator"]');
  const actualSource = await indicator.evaluate(async (element) => {
    const mask = getComputedStyle(element).maskImage;
    const url = /^url\(["']?(.*?)["']?\)$/.exec(mask)?.[1];
    if (!url) throw new Error("Loading mask has no image source");
    return Array.from(new Uint8Array(await (await fetch(url)).arrayBuffer()));
  });
  expect(actualSource).toEqual(png);
  await expect(indicator).toHaveCSS("mask-size", "120%");
  await expect(indicator).toHaveCSS("animation-duration", "0.8s");
  await expect(indicator).not.toHaveCSS("animation-name", "none");
  const source = await indicator.evaluate((element) => getComputedStyle(element).maskImage);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(indicator).toHaveCSS("animation-name", "none");
  await expect(indicator).toHaveCSS("transform", "none");
  await expect(indicator).toHaveCSS("mask-image", source);
  await expectRaster(page, indicator, png, "Loading / reduced motion", 10);
});

test("forced colors retain visible arrow, check and loading masks against Canvas", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  for (const assetId of ["icon/arrow-down", "icon/check-bold", "icon/button-loading"]) {
    const original = await galleryIcon(page, assetId);
    const icon = await mountIconHosts(page, original, [{ foreground: "CanvasText", background: "Canvas" }]);
    await expect(icon).not.toHaveCSS("mask-image", "none");
    const png = assetId === "icon/button-loading" ? loadingReference() : references().find((item) => item.assetId === assetId)!.png;
    await expectRaster(page, icon, png, `${assetId} / forced colors`);
  }
});

test("forced colors retain the text-button loading indicator", async ({ page }) => {
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.goto("/#text-button");
  const loading = page.getByRole("region", { name: "颜色与状态" })
    .getByRole("group", { name: "普通灰蓝", exact: true }).locator('button[data-state="loading"]');
  await expect(loading).toHaveAttribute("aria-busy", "true");
  const button = await mountButtonHost(page, loading);
  const indicator = button.locator('[data-slot="loading-indicator"]');
  await expect(indicator).toHaveCSS("mask-size", "120%");
  await expect(indicator).toHaveCSS("animation-name", "none");
  await expectRaster(page, indicator, loadingReference(), "TextButton Loading / forced colors", 10);
});
