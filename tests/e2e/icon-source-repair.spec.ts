import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const repairs = JSON.parse(readFileSync(resolve(root, "evidence/icons/source-repairs.json"), "utf8")) as {
  assets: Array<{ assetId: string; nodeId: string; original: { png: string }; before: { png: string }; after: { png: string; svg: string } }>;
};

for (const repair of repairs.assets) {
  test(`${repair.assetId} restores the original silhouette and inherits both normal and inverse host colors`, async ({ page }) => {
    expect(repair.after.svg).not.toMatch(/nan|infinity/i);
    await page.goto("/#icons");
    await page.getByRole("searchbox", { name: "搜索图标" }).fill(repair.assetId);
    const card = page.getByRole("list", { name: "图标列表" }).locator(`[data-asset-id="${repair.assetId}"]`);
    await expect(card).toHaveAttribute("data-availability", "available");
    const icon = card.locator('[data-slot="icon-preview"] [data-rain-id="icon"]');
    await expect(icon).toHaveCount(1);
    await expect(icon).toHaveAttribute("data-icon-color-mode", "host");

    for (const palette of [
      { foreground: [29, 33, 41], background: [255, 255, 255] },
      { foreground: [255, 255, 255], background: [21, 97, 248] },
    ]) {
      await icon.evaluate(async (element, colors) => {
        document.querySelector('[data-source-repair-stage]')?.remove();
        const host = document.createElement("div");
        host.setAttribute("data-source-repair-stage", "");
        Object.assign(host.style, { position: "fixed", left: "24px", top: "24px", width: "72px", height: "72px", zIndex: "2147483647", background: `rgb(${colors.background.join(",")})`, color: `rgb(${colors.foreground.join(",")})` });
        const copy = element.cloneNode(true) as HTMLElement;
        Object.assign(copy.style, { width: "72px", height: "72px", display: "block", margin: "0" });
        host.append(copy);
        document.body.append(host);
        const src = /^url\(["']?(.*?)["']?\)$/.exec(getComputedStyle(copy).maskImage)?.[1];
        if (!src) throw new Error("Formal icon has no mask source");
        const image = new Image();
        image.src = src;
        await image.decode();
      }, palette);
      const mounted = page.locator('[data-source-repair-stage] [data-rain-id="icon"]');
      await expect(mounted).toHaveCSS("background-color", `rgb(${palette.foreground.join(", ")})`);
      const actual = Array.from(await mounted.screenshot({ animations: "disabled", scale: "css" }));
      const stats = await page.evaluate(async ({ actual, reference, before, after, palette }) => {
        async function pixels(png: string | number[]) {
          const image = new Image();
          const url = typeof png === "string" ? undefined : URL.createObjectURL(new Blob([new Uint8Array(png)], { type: "image/png" }));
          image.src = url ?? `data:image/png;base64,${png as string}`;
          try { await image.decode(); } finally { if (url) URL.revokeObjectURL(url); }
          if (image.naturalWidth !== 72 || image.naturalHeight !== 72) throw new Error("Expected exact 3x source canvas");
          const canvas = document.createElement("canvas");
          canvas.width = canvas.height = 72;
          const context = canvas.getContext("2d")!;
          context.drawImage(image, 0, 0);
          return context.getImageData(0, 0, 72, 72).data;
        }
        const [rendered, original, broken, fixed] = await Promise.all([pixels(actual), pixels(reference), pixels(before), pixels(after)]);
        let beforeInk = 0, afterInk = 0, originalInk = 0, sourceAlphaError = 0, renderedError = 0;
        for (let i = 0; i < rendered.length; i += 4) {
          const alpha = original[i + 3]! / 255;
          if (broken[i + 3]! > 0) beforeInk++;
          if (fixed[i + 3]! > 20) afterInk++;
          if (original[i + 3]! > 20) originalInk++;
          sourceAlphaError += Math.abs(fixed[i + 3]! - original[i + 3]!);
          for (let channel = 0; channel < 3; channel++) {
            const expected = palette.background[channel]! * (1 - alpha) + palette.foreground[channel]! * alpha;
            renderedError += Math.abs(rendered[i + channel]! - expected);
          }
        }
        return { beforeInk, afterInk, originalInk, sourceAlphaError: sourceAlphaError / (72 * 72 * 255), renderedError: renderedError / (72 * 72 * 3 * 255) };
      }, { actual, reference: repair.original.png, before: repair.before.png, after: repair.after.png, palette });
      expect(stats.beforeInk).toBe(0);
      expect(stats.originalInk).toBeGreaterThan(500);
      expect(stats.afterInk / stats.originalInk).toBeGreaterThan(0.98);
      expect(stats.afterInk / stats.originalInk).toBeLessThan(1.02);
      expect(stats.sourceAlphaError).toBeLessThan(0.01);
      expect(stats.renderedError).toBeLessThan(0.01);
      await test.info().attach(`pixels-${palette.foreground.join("-")}`, { body: JSON.stringify(stats, null, 2), contentType: "application/json" });
      await page.locator('[data-source-repair-stage]').evaluate((element) => element.remove());
    }
  });
}
