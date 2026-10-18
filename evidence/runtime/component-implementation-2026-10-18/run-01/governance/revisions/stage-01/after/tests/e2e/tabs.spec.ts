import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getTabsColorConsumers } from "../../scripts/token-foundation-outputs.mjs";
import { resolveColor, measureColorContrast } from "../../packages/foundations/src/color-registry";
import { expect, test, type Locator } from "@playwright/test";
test.beforeEach(async ({ page }) => { await page.setViewportSize({ width: 1280, height: 1000 }); await page.goto('/#tabs'); await page.locator('[data-tabs-verification] > summary').click(); await page.keyboard.press('Tab'); });
test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));

test("public More follows the complete order, waits for activation, preserves input and resolves every ARIA target", async ({ page }) => {
  const scope = page.locator('[data-public-tabs="overflow"]');
  const first = scope.locator('[role="tab"][aria-label="概览"]');
  await expect(scope.getByRole('button', { name: '更多分区' })).toBeVisible();
  await first.focus(); await page.keyboard.press('End');
  const discussion = scope.getByRole('tab', { name: '讨论', exact: true });
  await expect(discussion).toBeFocused(); await expect(first).toHaveAttribute('aria-selected', 'true');
  await expect(scope.getByRole('textbox', { name: '讨论草稿', includeHidden: true })).toHaveCount(0);
  await page.keyboard.press('Enter'); await scope.getByRole('textbox', { name: '讨论草稿' }).fill('保留内容');
  await scope.getByRole('button', { name: '更多分区' }).click();
  await expect(page.getByRole('menuitemradio', { name: '学生', exact: true })).toHaveAccessibleDescription('数量 0');
  await page.getByRole('menuitemradio', { name: '学生', exact: true }).click();
  await expect(scope.getByRole('tab', { name: '学生', exact: true })).toBeFocused();
  await expect(scope.getByRole('tab', { name: '学生', exact: true })).toHaveAttribute('aria-selected', 'true');
  await scope.getByRole('tab', { name: '学生', exact: true }).focus(); await page.keyboard.press('End'); await page.keyboard.press('Enter');
  await expect(scope.getByRole('textbox', { name: '讨论草稿' })).toHaveValue('保留内容');
  expect(await scope.evaluate(root => [...root.querySelectorAll('[role="tab"]')].every(tab => {
    const panel = document.getElementById(tab.getAttribute('aria-controls')!);
    return panel?.getAttribute('aria-labelledby') === tab.id && document.querySelectorAll(`[id="${tab.id}"]`).length === 1;
  }))).toBe(true);
});

test("public width measurement grows and shrinks the interval, freezes an open menu and uses scroll only when necessary", async ({ page }) => {
  const scope = page.locator('[data-public-tabs="overflow"]');
  const visible = scope.getByRole('tab');
  await expect(scope.getByRole('button', { name: '更多分区' })).toBeVisible();
  const before = await visible.count();
  await scope.getByRole('button', { name: '加宽导航' }).click();
  await expect.poll(() => visible.count()).toBeGreaterThan(before);
  await scope.getByRole('button', { name: '收窄导航' }).click();
  await scope.getByRole('button', { name: '更多分区' }).click();
  const collection = await page.getByRole('menuitemradio').allTextContents();
  await scope.evaluate(root => { (root.querySelector('[data-public-width]') as HTMLElement).style.width = '550px'; });
  await expect(page.getByRole('menu')).toBeVisible(); expect(await page.getByRole('menuitemradio').allTextContents()).toEqual(collection);
  await page.keyboard.press('Escape'); await expect(scope.getByRole('button', { name: '更多分区' })).toBeFocused();
  await scope.getByRole('button', { name: '极窄导航' }).click();
  await expect(scope.locator('[data-mode="scroll"]')).toBeVisible(); await expect(scope.getByRole('button', { name: '更多分区' })).toHaveCount(0);
});

test("manual arrows skip disabled without mounting content; activation retains the same input", async ({ page }) => {
  const scope = page.locator('[data-public-case="manual"]');
  const overview = scope.getByRole("tab", { name: "概览", exact: true });
  const students = scope.getByRole("tab", { name: "学生", exact: true });
  await expect(scope.getByRole("tab", { name: "已归档的历史课程和完整资料", exact: true })).toBeDisabled();
  await overview.focus(); await page.keyboard.press("ArrowRight");
  await expect(students).toBeFocused();
  await expect(students).toHaveAccessibleDescription("数量 0");
  await expect(overview).toHaveAttribute("aria-selected", "true");
  await expect(scope.getByRole("textbox", { name: "学生草稿", includeHidden: true })).toHaveCount(0);
  await page.keyboard.press("Enter");
  const input = scope.getByRole("textbox", { name: "学生草稿" });
  await input.fill("未保存的草稿");
  await input.evaluate(node => node.setAttribute("data-retained", "yes"));
  await overview.click(); await expect(input).toBeHidden();
  await students.click(); await expect(input).toHaveValue("未保存的草稿");
  await expect(input).toHaveAttribute("data-retained", "yes");
  await students.focus(); await page.keyboard.press("End");
  await expect(scope.getByRole("tab", { name: "讨论", exact: true })).toBeFocused();
  await page.keyboard.press("ArrowRight"); await expect(overview).toBeFocused();
});

test("automatic activation and vertical direction use the same disabled skipping", async ({ page }) => {
  for (const name of ["automatic", "vertical"] as const) {
    const scope = page.locator(`[data-public-case="${name}"]`);
    const overview = scope.getByRole("tab", { name: "概览", exact: true });
    await overview.focus();
    if (name === "vertical") {
      await page.keyboard.press("ArrowRight"); await expect(overview).toBeFocused();
      await page.keyboard.press("ArrowDown");
      await expect(overview).toHaveAttribute("aria-selected", "true");
      await page.keyboard.press("Space");
    } else await page.keyboard.press("ArrowRight");
    await expect(scope.getByRole("tab", { name: "学生", exact: true })).toHaveAttribute("aria-selected", "true");
  }
});

test("More boundaries reveal the original next tab and preserve panel associations", async ({ page }) => {
  const scope = page.locator('[data-public-case="more"]');
  await scope.getByRole("tab", { name: "学生", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  const records = scope.getByRole("tab", { name: "完整课堂记录与课后练习资料", exact: true });
  await expect(records).toBeFocused();
  await expect(scope.getByRole("tabpanel")).toContainText("概览");
  await page.keyboard.press("Enter");
  await expect(scope.getByRole("tabpanel")).toContainText("完整课堂记录");
  await page.keyboard.press("End");
  await expect(scope.getByRole("tab", { name: "讨论", exact: true })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(scope.getByRole("tab", { name: "概览", exact: true })).toBeFocused();
  const associations = await page.locator('[data-public-case] [role="tab"]').evaluateAll(nodes => nodes.every(node => {
    const panel = document.getElementById(node.getAttribute("aria-controls") ?? "");
    return panel?.getAttribute("aria-labelledby") === node.id;
  }));
  expect(associations).toBe(true);
  const ids = await page.locator("[id]").evaluateAll(nodes => nodes.map(node => node.id));
  expect(new Set(ids).size).toBe(ids.length);
});

test("More browse is not activation; accepted selection focuses the revealed tab and Escape returns", async ({ page }) => {
  const scope = page.locator('[data-public-case="more"]');
  const more = scope.getByRole("button", { name: "更多分区", exact: true });
  await more.click();
  await expect(page.getByRole("menuitemradio", { name: "讨论", exact: true })).toBeVisible();
  await page.getByRole("menuitemradio", { name: "讨论", exact: true }).focus();
  await expect(scope.getByRole("textbox", { name: "讨论草稿", includeHidden: true })).toHaveCount(0);
  await page.keyboard.press("Enter");
  await expect(scope.getByRole("tab", { name: "讨论", exact: true })).toBeFocused();
  await expect(scope.getByRole("tabpanel")).toContainText("讨论");
  await more.click();
  await expect(page.getByRole("menuitemradio", { name: "学生", exact: true })).toHaveAccessibleDescription("数量 0");
  await page.keyboard.press("Escape"); await expect(more).toBeFocused();
  await more.click(); await expect(page.getByRole("menu")).toBeVisible();
  await page.getByRole("menuitemradio", { name: "概览", exact: true }).focus(); await page.keyboard.press("Tab");
  await expect(page.getByRole("menu")).toBeHidden();
  await expect(more).not.toBeFocused();
});

test("controlled rejection and delayed acceptance do not mount early or steal external focus", async ({ page }) => {
  const scope = page.locator('[data-public-case="controlled"]');
  const students = scope.getByRole("tab", { name: "学生", exact: true });
  await students.click();
  await expect(scope.getByRole("tab", { name: "概览", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(scope.getByRole("textbox", { name: "学生草稿", includeHidden: true })).toHaveCount(0);
  await scope.getByRole("button", { name: "接受待处理选择" }).click();
  await expect(students).toHaveAttribute("aria-selected", "true");
  await expect(scope.getByRole("button", { name: "接受待处理选择" })).toBeFocused();
  await scope.getByRole("button", { name: "更多分区", exact: true }).click();
  await page.getByRole("menuitemradio", { name: "讨论", exact: true }).click();
  await expect(students).toHaveAttribute("aria-selected", "true");
  await scope.getByRole("button", { name: "接受待处理选择" }).click();
  await expect(scope.getByRole("tab", { name: "讨论", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(scope.getByRole("button", { name: "接受待处理选择" })).toBeFocused();
});

test("Tooltip composes one tab and disabled full names are reachable without More", async ({ page }) => {
  const scope = page.locator('[data-public-case="vertical"]');
  const records = scope.getByRole("tab", { name: "完整课堂记录与课后练习资料", exact: true });
  await records.focus(); await expect(page.getByRole("tooltip")).toContainText("完整课堂记录与课后练习资料");
  expect(await records.evaluate(node => node.tagName)).toBe("BUTTON");
  await expect(scope.locator('[role="tab"] button')).toHaveCount(0);
  await page.keyboard.press("Escape"); await expect(page.getByRole("tooltip")).toBeHidden();
  await scope.locator("summary").focus(); await page.keyboard.press("Enter");
  await expect(scope.locator("details")).toContainText("已归档的历史课程和完整资料");
  await expect(scope.locator("details")).toContainText("课程已归档");
});

test("pointer press cancellation never activates in manual mode", async ({ page }) => {
  const scope = page.locator('[data-public-case="manual"]');
  const students = scope.getByRole("tab", { name: "学生", exact: true });
  await students.dispatchEvent("pointerdown", { pointerId: 1, button: 0, pointerType: "mouse" });
  await students.dispatchEvent("pointercancel", { pointerId: 1 });
  await expect(scope.getByRole("tab", { name: "概览", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(scope.getByRole("textbox", { name: "学生草稿", includeHidden: true })).toHaveCount(0);
});

test("contained drawing stays inside all three complete hit boxes", async ({ page }) => {
  for (const height of [28, 32, 38]) {
    const scope = page.locator(`[data-public-case="geometry-${height}"]`);
    const tab = scope.getByRole("tab", { name: "学生", exact: true });
    await tab.scrollIntoViewIfNeeded();
    const box = await tab.boundingBox(); expect(box!.height).toBe(height);
    const inner = await tab.locator('[data-part="paint"]').boundingBox(); expect(inner!.height).toBe(height - 6);
    await page.mouse.click(box!.x + box!.width / 2, box!.y + 1);
    await expect(tab).toHaveAttribute("aria-selected", "true");
  }
});


test("disabled selected values and dynamic disabling retain an enabled keyboard entry", async ({ page }) => {
  const initial = page.locator('[data-public-case="initial-disabled"]');
  await initial.getByRole("button", { name: "列表前操作", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(initial.getByRole("tab", { name: "概览", exact: true })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(initial.getByRole("tab", { name: "学生", exact: true })).toBeFocused();
  await expect(initial.locator('[role="tab"][tabindex="0"]:not(:disabled)')).toHaveCount(1);
  const controls = page.locator('[data-public-dynamic="true"]');
  const scope = controls.locator('[data-public-case="dynamic-disabled"]');
  await controls.getByRole("button", { name: "禁用当前分区", exact: true }).click();
  await scope.getByRole("button", { name: "列表前操作", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(scope.getByRole("tab", { name: "学生", exact: true })).toBeFocused();
  await controls.getByRole("button", { name: "禁用全部分区", exact: true }).click();
  await scope.getByRole("button", { name: "列表前操作", exact: true }).focus();
  await page.keyboard.press("Tab"); await expect(scope.locator("summary")).toBeFocused();
  await controls.getByRole("button", { name: "恢复可用分区", exact: true }).click();
  await scope.getByRole("button", { name: "列表前操作", exact: true }).focus();
  await page.keyboard.press("Tab"); await expect(scope.getByRole("tab", { name: "概览", exact: true })).toBeFocused();
});


test("menu remains stable during viewport resize and outside dismissal preserves its target", async ({ page }) => {
  const scope = page.locator('[data-public-case="more"]');
  await scope.getByRole("button", { name: "更多分区", exact: true }).click();
  const item = page.getByRole("menuitemradio", { name: "讨论", exact: true });
  await item.focus(); await page.setViewportSize({ width: 1000, height: 900 });
  await expect(item).toBeFocused();
  await scope.getByRole("button", { name: "列表后操作", exact: true }).click();
  await expect(page.getByRole("menu")).toBeHidden();
  await expect(scope.getByRole("button", { name: "列表后操作", exact: true })).toBeFocused();
});

test("soft selected fill has no persistent border and shared Focus is visible on all four edges", async ({ page }) => {
  for (const position of ["top", "bottom", "start", "end"]) {
    const scope = page.locator(`[data-public-case="focus-${position}"]`);
    const tab = scope.getByRole("tab", { name: "学生", exact: true });
    await tab.scrollIntoViewIfNeeded();
    const before = await tab.boundingBox();
    await tab.focus();
    const focus = await tab.evaluate(node => {
      const style = getComputedStyle(node);
      let parent = node.parentElement;
      const clipping = [];
      while (parent && parent.tagName !== "SECTION") {
        const css = getComputedStyle(parent);
        if ([css.overflowX, css.overflowY].some(value => value !== "visible")) {
          const rect = parent.getBoundingClientRect(), tab = node.getBoundingClientRect();
          if (rect.left > tab.left - 3 || rect.right < tab.right + 3 || rect.top > tab.top - 3 || rect.bottom < tab.bottom + 3) clipping.push(parent.tagName);
        }
        parent = parent.parentElement;
      }
      return { border: style.borderTopWidth, outline: style.outlineWidth, shadow: style.boxShadow, clipping };
    });
    expect(focus.border).toBe("0px"); expect(focus.outline).toBe("1px");
    expect(focus.shadow).not.toBe("none"); expect(focus.clipping).toEqual([]);
    await page.keyboard.press("Enter"); expect(await tab.boundingBox()).toEqual(before);
  }
});

test("truncated title supports hover and hides when its tab is collected into More", async ({ page }) => {
  const scope = page.locator('[data-public-case="more"]');
  const overview = scope.getByRole("tab", { name: "概览", exact: true });
  await overview.focus(); await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  const records = scope.getByRole("tab", { name: "完整课堂记录与课后练习资料", exact: true });
  await expect(records).toBeFocused(); await expect(page.getByRole("tooltip")).toBeVisible();
  await page.keyboard.press("End"); await expect(page.getByRole("tooltip")).toBeHidden();
  const vertical = page.locator('[data-public-case="vertical"]').getByRole("tab", { name: "完整课堂记录与课后练习资料", exact: true });
  await vertical.hover(); await expect(page.getByRole("tooltip")).toContainText("完整课堂记录与课后练习资料");
  await page.keyboard.press("Escape"); await expect(page.getByRole("tooltip")).toBeHidden();
});


test("restoring a selected item removes the fallback entry without stealing external focus", async ({ page }) => {
  const controls = page.locator('[data-public-dynamic="true"]');
  const scope = controls.locator('[data-public-case="dynamic-disabled"]');
  await scope.getByRole("tab", { name: "资源", exact: true }).click();
  await scope.getByRole("tab", { name: "概览", exact: true }).focus();
  await controls.getByRole("button", { name: "禁用全部分区", exact: true }).click();
  const restore = controls.getByRole("button", { name: "禁用当前分区", exact: true });
  await restore.click(); await expect(restore).toBeFocused();
  await expect(scope.locator('[role="tab"][tabindex="0"]:not(:disabled)')).toHaveCount(1);
  await scope.getByRole("button", { name: "列表前操作", exact: true }).focus();
  await page.keyboard.press("Tab"); await expect(scope.getByRole("tab", { name: "资源", exact: true })).toBeFocused();
});


test("a disabled More-window entry is repaired to a visible tab", async ({ page }) => {
  const controls = page.locator('[data-public-dynamic="more"]');
  const scope = controls.locator('[data-public-case="dynamic-more"]');
  await scope.getByRole("button", { name: "更多分区", exact: true }).click();
  await page.getByRole("menuitemradio", { name: "讨论", exact: true }).click();
  await expect(scope.getByRole("tab", { name: "讨论", exact: true })).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(scope.getByRole("tab", { name: "资源", exact: true })).toBeFocused();
  await controls.getByRole("button", { name: "禁用资源分区", exact: true }).click();
  await scope.getByRole("button", { name: "列表前操作", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(scope.getByRole("tab", { name: "完整课堂记录与课后练习资料", exact: true })).toBeFocused();
  await expect(scope.locator('[role="tab"][tabindex="0"]:not(:disabled):not([hidden])')).toHaveCount(1);
});

test("all 36 public recipes share exact heights, typography, count weight, paints and panel-facing indicators", async ({ page }) => {
  for (const appearance of ['line', 'contained', 'soft']) for (const size of [28, 32, 38] as const) for (const position of ['top', 'bottom', 'start', 'end']) {
    const scope = page.locator(`[data-public-case="${appearance}-${size}-${position}"]`);
    const tab = scope.getByRole('tab', { name: '学生', exact: true });
    await tab.scrollIntoViewIfNeeded();
    const before = await tab.boundingBox(); expect(before!.height).toBe(size);
    await tab.click();
    const fact = await tab.evaluate(node => {
      const read = (selector: string) => { const part = node.querySelector(selector)!; return { style: getComputedStyle(part), rect: part.getBoundingClientRect() }; };
      const label = read('[data-part="label"]'), count = read('[data-part="count"]'), icon = read('[data-part="icon"]'), paint = read('[data-part="paint"]');
      const line = node.querySelector('[data-part="indicator"]')?.getBoundingClientRect();
      const box = node.getBoundingClientRect();
      return { font: label.style.fontSize, leading: label.style.lineHeight, labelWeight: label.style.fontWeight, countFont: count.style.fontSize,
        countLeading: count.style.lineHeight, countWeight: count.style.fontWeight, icon: icon.rect.width, paintHeight: paint.rect.height,
        border: getComputedStyle(node).borderTopWidth, line: line ? { x: line.x - box.x, y: line.y - box.y, width: line.width, height: line.height } : null, width: box.width, height: box.height };
    });
    expect(fact.font).toBe(({ 28: '13px', 32: '14px', 38: '15px' })[size]);
    expect(fact.leading).toBe(({ 28: '18px', 32: '20px', 38: '22px' })[size]);
    expect(fact.labelWeight).toBe('600'); expect(fact.countFont).toBe('12px'); expect(fact.countLeading).toBe('14px'); expect(fact.countWeight).toBe('400');
    expect(fact.icon).toBe(size === 38 ? 16 : 14); expect(fact.height).toBe(size);
    if (appearance === 'contained') expect(fact.paintHeight).toBe(size - 6);
    if (appearance === 'soft') { expect(fact.border).toBe('0px'); expect(fact.width).toBe(before!.width); }
    if (appearance === 'line') {
      const thickness = size === 38 ? 3 : 2;
      if (position === 'top' || position === 'bottom') { expect(fact.line!.height).toBe(thickness); expect(fact.line!.y).toBe(position === 'top' ? size - thickness : 0); }
      else { expect(fact.line!.width).toBe(thickness); expect(fact.line!.x).toBe(position === 'start' ? fact.width - thickness : 0); }
    }
  }
});


test("a long selected label keeps More until even two characters cannot fit", async ({ page }) => {
  const scope = page.locator('[data-public-tabs="overflow"]');
  await scope.getByRole('button', { name: '更多分区' }).click();
  const records = page.getByRole('menuitemradio', { name: '完整课堂记录与课后练习资料', exact: true });
  await expect(records.locator('[data-slot="leading"] [data-icon="icon/search"]')).toBeVisible();
  await records.click();
  const tab = scope.getByRole('tab', { name: '完整课堂记录与课后练习资料', exact: true });
  await expect(tab).toBeFocused();
  await expect(scope.getByRole('button', { name: '更多分区' })).toBeVisible();
  const label = await tab.locator('[data-part="label"]').evaluate(node => ({ width: node.getBoundingClientRect().width, minimum: 2 * parseFloat(getComputedStyle(node).fontSize), truncated: node.scrollWidth > node.clientWidth }));
  expect(label.width).toBeGreaterThanOrEqual(label.minimum); expect(label.truncated).toBe(true);
  await scope.getByRole('button', { name: '极窄导航' }).click();
  await expect(scope.locator('[data-mode="scroll"]')).toBeVisible();
  await expect(tab).toHaveAttribute('aria-selected', 'true');
});

test("deleting an opened menu collection closes it and recovers a valid focus target", async ({ page }) => {
  const scope = page.locator('[data-public-tabs="overflow"]');
  await scope.getByRole('button', { name: '更多分区' }).click();
  await page.getByRole('menuitemradio', { name: '讨论', exact: true }).focus();
  await scope.getByRole('button', { name: '仅保留概览' }).evaluate(node => (node as HTMLElement).click());
  await expect(page.getByRole('menu')).toBeHidden();
  await expect(scope.getByRole('tab', { name: '概览', exact: true })).toBeFocused();
  await scope.getByRole('button', { name: '恢复全部分区' }).click();
  await scope.getByRole('button', { name: '更多分区' }).click();
  await scope.getByRole('button', { name: '仅保留概览' }).click();
  await expect(scope.getByRole('button', { name: '仅保留概览' })).toBeFocused();
});

test("a removed pending keyboard target cannot steal focus after restoration", async ({ page }) => {
  const scope = page.locator('[data-public-tabs="overflow"]');
  await scope.getByRole('button', { name: '动态删除末项' }).click();
  await scope.getByRole('tab', { name: '概览', exact: true }).focus();
  await page.keyboard.press('End');
  await expect(scope.getByRole('tab', { name: '讨论', exact: true, includeHidden: true })).toHaveCount(0);
  const restore = scope.getByRole('button', { name: '恢复全部分区' });
  await restore.click(); await expect(restore).toBeFocused();
  await expect(scope.getByRole('tab', { name: '讨论', exact: true, includeHidden: true })).toHaveCount(1);
  await expect(restore).toBeFocused();
});

test("a focused More button hands focus to its accepted tab when all items fit", async ({ page }) => {
  const scope = page.locator('[data-public-tabs="overflow"]');
  await scope.getByRole('button', { name: '更多分区' }).focus();
  await scope.locator('[data-public-width]').evaluate(node => { (node as HTMLElement).style.width = '2000px'; });
  await expect(scope.getByRole('button', { name: '更多分区' })).toHaveCount(0);
  await expect(scope.getByRole('tab', { name: '概览', exact: true })).toBeFocused();
});

test("menu deletion after a frozen shrink restores a tab in the newly measured interval", async ({ page }) => {
  const scope = page.locator('[data-public-tabs="overflow"]');
  await scope.getByRole('button', { name: '加宽导航' }).click();
  await scope.getByRole('tab', { name: '学生', exact: true }).click();
  await scope.getByRole('button', { name: '更多分区' }).click();
  await page.getByRole('menuitemradio', { name: '讨论', exact: true }).focus();
  await scope.locator('[data-public-width]').evaluate(node => { (node as HTMLElement).style.width = '200px'; });
  await scope.getByRole('button', { name: '保留前三分区' }).evaluate(node => (node as HTMLElement).click());
  await expect(page.getByRole('menu')).toBeHidden();
  await expect(scope.getByRole('tab', { name: '学生', exact: true })).toBeFocused();
  await expect(scope.getByRole('tab', { name: '学生', exact: true })).toHaveAttribute('aria-selected', 'true');
});

const tabsStates = ['ordinary', 'hover', 'pressed', 'selected', 'focus', 'focus-hover', 'focus-pressed', 'selected-hover', 'selected-pressed', 'selected-focus', 'disabled', 'selected-disabled'] as const;
const tabsColor = (value: string) => {
  const values = value.match(/[\d.]+/g)!.map(Number), scale = value.startsWith('color(srgb') ? 255 : 1;
  return { rgb: [values[0]! * scale, values[1]! * scale, values[2]! * scale] as const, alpha: values[3] ?? 1 };
};
const tabsOver = (foreground: ReturnType<typeof tabsColor>, background: ReturnType<typeof tabsColor>): ReturnType<typeof tabsColor> => ({ rgb: foreground.rgb.map((value, index) => value * foreground.alpha + background.rgb[index]! * (1 - foreground.alpha)) as unknown as readonly [number, number, number], alpha: 1 });
async function readTabsFacts(tab: Locator) {
  return tab.evaluate(node => {
    const box = node.getBoundingClientRect(), css = getComputedStyle(node);
    const rect = (element: Element) => { const r = element.getBoundingClientRect(); return { x: r.x - box.x, y: r.y - box.y, width: r.width, height: r.height }; };
    const part = (name: string) => {
      const el = node.querySelector(`[data-part="${name}"]`); if (!el) return null;
      const style = getComputedStyle(el);
      return { ...rect(el), color: style.color, background: style.backgroundColor, border: style.borderColor, borderWidth: style.borderTopWidth, radius: style.borderTopLeftRadius,
        font: style.fontFamily, size: style.fontSize, line: style.lineHeight, weight: style.fontWeight, opacity: style.opacity, image: style.backgroundImage, classes: el.getAttribute('class') };
    };
    const ancestors = [];
    for (let el: Element | null = node; el; el = el.parentElement) { const style = getComputedStyle(el); ancestors.push({ tag: el.tagName, className: el.getAttribute('class'), background: style.backgroundColor, opacity: style.opacity, image: style.backgroundImage }); }
    const icon = node.querySelector('[data-icon]');
    return { width: box.width, height: box.height, selected: node.getAttribute('aria-selected') === 'true', disabled: node.matches(':disabled'), hover: node.matches(':hover'), pressed: node.matches(':active'), focus: node.matches(':focus-visible'),
      border: css.borderTopWidth, radius: css.borderTopLeftRadius, padding: css.paddingLeft, gap: getComputedStyle(node.querySelector('[data-part="content"]')!).gap,
      outline: { width: css.outlineWidth, style: css.outlineStyle, color: css.outlineColor, offset: css.outlineOffset, shadow: css.boxShadow },
      label: part('label')!, count: part('count')!, icon: part('icon')!, paint: part('paint')!, indicator: part('indicator'),
      renderedIcon: icon ? { ...rect(icon), color: getComputedStyle(icon).color, mask: getComputedStyle(icon).maskImage !== "none", asset: icon.getAttribute("data-icon") } : null,
      ancestors, panelGap: getComputedStyle(node.closest('.rain-tabs')!).gap };
  });
}

test('72 complete recipes expose twelve real browser states with measured color and geometry', async ({ page }) => {
  test.setTimeout(600_000);
  const pilot = process.env.RAIN_TABS_MATRIX_PILOT === '1';
  const output = evidenceOutputPath(process.env.RAIN_TABS_EVIDENCE_DIR || 'evidence/runtime/tabs-visual-refinement'); mkdirSync(output, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  const recipes = getTabsColorConsumers()[0]!.recipes;
  const samples: object[] = [], findings: object[] = [], screenshots: string[] = [];
  const themes = pilot ? ['light'] as const : ['light', 'dark'] as const;
  const appearances = pilot ? ['soft'] as const : ['line', 'contained', 'soft'] as const;
  const sizes = pilot ? [32] as const : [28, 32, 38] as const;
  const positions = pilot ? ['top'] as const : ['top', 'bottom', 'start', 'end'] as const;
  for (const theme of themes) {
    await page.getByRole('button', { name: theme === 'light' ? '浅色主题' : '深色主题', exact: true }).click();
    for (const appearance of appearances) for (const size of sizes) for (const position of positions) {
      const scope = page.locator(`[data-public-case="${appearance}-${size}-${position}"]`);
      const target = scope.getByRole('tab', { name: '学生', exact: true }), first = scope.getByRole('tab', { name: '概览', exact: true });
      const before = scope.getByRole('button', { name: '列表前操作', exact: true }), toggle = scope.locator('[data-matrix-toggle]');
      for (const state of tabsStates) {
        await page.mouse.move(0, 0); await page.mouse.up();
        if (await toggle.getAttribute('aria-pressed') === 'true') await toggle.evaluate(node => (node as HTMLElement).click());
        await expect(target).toBeEnabled(); await before.focus(); await first.evaluate(node => (node as HTMLElement).click());
        const selected = state.startsWith('selected'), disabled = state.includes('disabled'), focused = state.includes('focus'), pressed = state.includes('pressed'), hover = state.includes('hover') || pressed;
        if (selected) await target.evaluate(node => (node as HTMLElement).click());
        if (disabled) { await toggle.evaluate(node => (node as HTMLElement).click()); await expect(target).toBeDisabled(); }
        await target.scrollIntoViewIfNeeded();
        if (focused) { await before.focus(); await page.keyboard.press('Tab'); await target.focus(); }
        if (hover) await target.hover();
        if (pressed) await page.mouse.down();
        const fact = await readTabsFacts(target), context = { theme, appearance, size, position, state };
        expect(fact.selected, JSON.stringify(context)).toBe(selected); expect(fact.disabled).toBe(disabled);
        expect(fact.hover).toBe(hover); expect(fact.pressed).toBe(pressed); expect(fact.focus, JSON.stringify({ ...context, fact })).toBe(focused);
        expect(fact.height).toBe(size); expect(fact.label.size).toBe(({ 28: '13px', 32: '14px', 38: '15px' })[size]);
        expect(fact.label.line).toBe(({ 28: '18px', 32: '20px', 38: '22px' })[size]); expect(fact.label.font).toContain('PingFang SC');
        expect(fact.label.weight).toBe(selected ? '600' : '400'); expect(fact.count.size).toBe('12px'); expect(fact.count.line).toBe('14px'); expect(fact.count.weight).toBe('400');
        expect(fact.icon.width).toBe(size === 38 ? 16 : 14); expect(fact.renderedIcon!.width).toBe(fact.icon.width); expect(fact.renderedIcon!.height).toBe(fact.icon.height); expect(fact.renderedIcon!.mask).toBe(true); expect(fact.renderedIcon!.asset).toBe('icon/search');
        expect(fact.gap).toBe('2px'); expect(fact.panelGap).toBe('16px'); expect(fact.radius).toBe(appearance === 'line' ? '4px' : '6px');
        expect(fact.border).toBe('0px'); expect(fact.paint.height).toBe(appearance === 'contained' ? size - 6 : size);
        expect(fact.ancestors.every(item => item.opacity === '1'), JSON.stringify(fact.ancestors)).toBe(true);
        const opaque = fact.ancestors.findIndex(item => tabsColor(item.background).alpha === 1);
        expect(opaque).toBeGreaterThanOrEqual(0);
        expect(fact.ancestors.slice(0, opaque + 1).every(item => item.image === 'none'), JSON.stringify(fact.ancestors)).toBe(true);
        if (focused) { expect(fact.outline.width).toBe('1px'); expect(fact.outline.style).toBe('solid'); expect(fact.outline.shadow).not.toBe('none'); }
        if (appearance === 'line' && selected) {
          const line = fact.indicator!, thickness = size === 38 ? 3 : 2, maximum = ({ 28: 24, 32: 28, 38: 32 })[size];
          if (position === 'top' || position === 'bottom') { expect(line.height).toBe(thickness); expect(line.width).toBe(maximum); expect(line.x).toBeCloseTo((fact.width - maximum) / 2, 1); expect(line.y).toBe(position === 'top' ? size - thickness : 0); }
          else { expect(line.width).toBe(thickness); expect(line.height).toBe(maximum); expect(line.y).toBe((size - maximum) / 2); expect(line.x).toBe(position === 'start' ? fact.width - thickness : 0); }
        }
        const underlay = fact.ancestors.reduceRight((base, item) => tabsOver(tabsColor(item.background), base), tabsColor('rgb(255, 255, 255)'));
        const background = tabsOver(tabsColor(fact.paint.background), underlay);
        const colors = [];
        for (const part of ['label', 'count', 'icon', 'paint', 'border', 'indicator'] as const) {
          const recipe = recipes.find(recipe => recipe.appearance === appearance && recipe.state === state && recipe.part === part);
          if (!recipe) continue;
          const css = part === 'paint' ? fact.paint.background : part === 'border' ? fact.paint.border : part === 'indicator' ? fact.indicator!.background : fact[part].color;
          const actual = tabsColor(css), expected = resolveColor(recipe.foreground.tokenId, theme);
          actual.rgb.forEach((value, index) => expect(value, JSON.stringify({ ...context, part })).toBeCloseTo(expected.rgb[index]!, 0));
          expect(actual.alpha).toBeCloseTo(expected.alpha, 3);
          const role = recipe.foreground.content, threshold = part === 'indicator' || part === 'icon' ? 3 : 4.5;
          const ratio = measureColorContrast(actual, part === 'paint' || part === 'indicator' ? underlay : background);
          colors.push({ part, tokenId: recipe.foreground.tokenId, css, role, background, ratio, threshold: part === 'paint' ? null : part === 'border' ? 3 : threshold });
          if (part === 'border') {
            const outerRatio = measureColorContrast(actual, underlay);
            if (ratio < 3 || outerRatio < 3) findings.push({ ...context, part, tokenId: recipe.foreground.tokenId, role: 'decorative', againstFill: ratio, againstOuterSurface: outerRatio, threshold: 3, classification: 'below-essential-boundary-threshold', contrastException: false });
          } else if (part !== 'paint' && !disabled) expect(ratio, JSON.stringify({ ...context, part, ratio })).toBeGreaterThanOrEqual(threshold);
        }
        samples.push({ ...context, trigger: 'actual-react-props-and-browser-input', ...fact, underlay, compositedBackground: background, colors });
        if (!pilot && position === 'top' && state === 'selected') {
          const name = `${theme}-${appearance}-${size}-top.png`;
          await scope.locator('.rain-tabs__nav').screenshot({ path: resolve(output, name) }); screenshots.push(name);
        }
        await page.mouse.move(0, 0); await page.mouse.up();
      }
    }
  }
  const groups = themes.length * appearances.length * sizes.length * positions.length;
  expect(samples).toHaveLength(groups * 12);
  writeFileSync(resolve(output, 'browser-facts.json'), JSON.stringify({ capturedAt: new Date().toISOString(), browser: test.info().project.name, complete: !pilot, groups, executedStates: samples.length, plannedGroups: 72, plannedStates: 864, surface: 'Background/Neutral/1', measurement: 'computed styles and geometry of actual public Tabs; pointer and keyboard states verified before capture', geometryTolerance: 'exact CSS pixels; token channels allow Chromium serialization rounding', screenshots, samples }, null, 2) + '\n');
  writeFileSync(resolve(output, 'color-findings.json'), JSON.stringify({ capturedAt: new Date().toISOString(), complete: !pilot, stateCount: samples.length, textThreshold: 4.5, essentialBoundaryThreshold: 3, contrastAcceptance: 'not-granted', scopedEligibility: 'Soft ordinary/focus Label/Count on Background/Neutral/1 only; not a contrast exception', findings }, null, 2) + '\n');
  if (!pilot) {
    const paired = screenshots.slice(0, 9).flatMap((name, index) => [name, screenshots[index + 9]!]);
    const cards = paired.map(name => `<figure><figcaption>${name.replace('-top.png', '')}</figcaption><img src="data:image/png;base64,${readFileSync(resolve(output, name)).toString('base64')}"></figure>`).join('');
    const html = `<!doctype html><meta charset="utf-8"><title>Tabs 实际导航截图</title><style>body{margin:24px;background:#e8e9ed;font:14px system-ui}h1{font-size:24px}main{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}figure{margin:0;min-width:0;background:white;padding:12px}figcaption{margin-bottom:8px}img{max-width:100%;display:block}</style><h1>Tabs · 18 份实际导航截图</h1><p>浅色 / 深色逐行对照 · 三种外观 · 28 / 32 / 38。完整 72 组、864 态见 browser-facts.json。</p><main>${cards}</main>`;
    await page.setViewportSize({ width: 2400, height: 1400 });
    await page.setContent(html); await page.screenshot({ path: resolve(output, 'contact-sheet.png'), fullPage: true });
  }
});

test('hidden content remeasures changed names, counts and font events without replacing its retained input', async ({ page }) => {
  const scope = page.locator('[data-tabs-edge="hidden"]');
  const input = scope.getByRole('textbox', { name: '动态草稿' }); await input.fill('未提交记录');
  await input.evaluate(node => node.setAttribute('data-retained', 'yes'));
  await scope.getByRole('button', { name: '隐藏示例' }).click();
  await scope.getByRole('button', { name: '更新名称与数量' }).click();
  await page.evaluate(() => document.fonts.dispatchEvent(new Event('loadingdone')));
  await scope.getByRole('button', { name: '显示示例' }).click();
  const updated = scope.getByRole('tab', { name: '更新后的完整课堂记录与课后练习和拓展阅读资料', exact: true });
  await expect(updated).toBeVisible(); await expect(updated).toHaveAttribute('aria-selected', 'true');
  await expect(updated).toHaveAccessibleDescription('数量 123456789');
  await expect(input).toHaveValue('未提交记录'); await expect(input).toHaveAttribute('data-retained', 'yes');
  await expect(scope.locator('.rain-tabs__viewport')).toHaveAttribute('data-mode', 'more');
  const overflow = await scope.locator('.rain-tabs__viewport').evaluate(node => node.scrollWidth - node.clientWidth); expect(overflow).toBeLessThanOrEqual(1);
  await page.keyboard.press('Tab'); await updated.focus(); await expect(page.getByRole('tooltip')).toContainText('更新后的完整课堂记录');
});

test('nested tabs retain independent direction, selected value, geometry and content', async ({ page }) => {
  const scope = page.locator('[data-tabs-edge="nested"]');
  const outer = scope.getByRole('tab', { name: '外层一', exact: true }), inner = scope.getByRole('tab', { name: '内层一', exact: true });
  await inner.focus(); await page.keyboard.press('ArrowRight');
  const second = scope.getByRole('tab', { name: '内层二', exact: true });
  await expect(second).toBeFocused(); await expect(outer).toHaveAttribute('aria-selected', 'true'); await expect(inner).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Enter'); await expect(second).toHaveAttribute('aria-selected', 'true');
  expect((await inner.boundingBox())!.height).toBe(28); expect((await outer.boundingBox())!.height).toBe(38);
  await outer.focus(); await page.keyboard.press('ArrowDown'); await expect(scope.getByRole('tab', { name: '外层二', exact: true })).toBeFocused();
  await expect(second).toHaveAttribute('aria-selected', 'true');
});

test('tall independent actions share the panel-facing edge, content indicator and single panel gap', async ({ page }) => {
  for (const position of ['top', 'bottom']) {
    const scope = page.locator(`[data-tabs-extra="${position}"]`);
    const selected = scope.getByRole('tab', { name: '概览', exact: true }); await selected.scrollIntoViewIfNeeded();
    const facts = await scope.evaluate(root => {
      const tab = root.querySelector('[role="tab"][aria-selected="true"]')!, nav = root.querySelector('.rain-tabs__nav-row')!, divider = root.querySelector('[data-part="divider"]')!, line = tab.querySelector('[data-part="indicator"]')!, content = tab.querySelector('[data-part="content"]')!;
      const box = (element: Element) => { const r = element.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, width: r.width, height: r.height }; };
      return { tab: box(tab), nav: box(nav), divider: box(divider), line: box(line), content: box(content), tray: box(root.querySelector('.rain-tabs__tray')!), viewport: box(root.querySelector('.rain-tabs__viewport')!) };
    });
    expect(facts.tab.height).toBe(32); expect(facts.nav.height).toBeGreaterThan(32);
    if (position === 'top') { expect(facts.tab.bottom).toBe(facts.nav.bottom); expect(facts.line.bottom).toBe(facts.divider.bottom); }
    else { expect(facts.tab.top).toBe(facts.nav.top); expect(facts.line.top).toBe(facts.divider.top); }
    expect(facts.line.width).toBe(Math.min(28, facts.content.width));
    expect((facts.tray.left + facts.tray.right) / 2).toBeCloseTo((facts.viewport.left + facts.viewport.right) / 2, 0);
  }
  const positions = [];
  for (const align of ['left', 'center', 'right']) {
    const tab = page.locator(`[data-tabs-item-align="${align}"]`).getByRole('tab', { name: '设置', exact: true });
    positions.push(await tab.evaluate(node => node.querySelector('[data-part="content"]')!.getBoundingClientRect().left - node.getBoundingClientRect().left));
  }
  expect(positions[0]!).toBeLessThan(positions[1]!); expect(positions[1]!).toBeLessThan(positions[2]!);
});

test('coarse-pointer targets reach 44px without overlapping or changing the 36 visual recipes', async ({ browser }) => {
  test.setTimeout(120_000);
  const context = await browser.newContext({ viewport: { width: 1280, height: 1000 }, hasTouch: true });
  const page = await context.newPage(); await page.goto('/#tabs'); await page.locator('[data-tabs-verification] > summary').click();
  expect(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)).toBe(true);
  for (const appearance of ['line', 'contained', 'soft']) for (const size of [28, 32, 38] as const) for (const position of ['top', 'bottom', 'start', 'end']) {
    const scope = page.locator(`[data-public-case="${appearance}-${size}-${position}"]`), target = scope.getByRole('tab', { name: '学生', exact: true });
    await target.scrollIntoViewIfNeeded();
    const facts = await target.evaluate(node => {
      const css = getComputedStyle(node), hit = getComputedStyle(node, '::after'), box = node.getBoundingClientRect();
      const siblings = [...node.closest('[role="tablist"]')!.querySelectorAll<HTMLElement>('[role="tab"]')].filter(tab => !tab.hidden).map(tab => {
        const r = tab.getBoundingClientRect(), pseudo = getComputedStyle(tab, '::after');
        return { x: r.x, right: r.right, top: r.top + parseFloat(pseudo.top), bottom: r.bottom - parseFloat(pseudo.bottom) };
      });
      return { x: box.x, y: box.y, height: box.height, width: box.width, topExtension: parseFloat(hit.top), hitHeight: box.height - parseFloat(hit.top) - parseFloat(hit.bottom), font: getComputedStyle(node.querySelector('[data-part="label"]')!).fontSize, margin: css.marginTop, siblings };
    });
    expect(facts.height).toBe(size); expect(facts.width).toBeGreaterThanOrEqual(44); expect(facts.hitHeight).toBe(44);
    expect(facts.font).toBe(({ 28: '13px', 32: '14px', 38: '15px' })[size]);
    for (let index = 1; index < facts.siblings.length; index++) {
      const a = facts.siblings[index - 1]!, b = facts.siblings[index]!;
      if (position === 'top' || position === 'bottom') expect(a.right).toBeLessThanOrEqual(b.x);
      else expect(a.bottom).toBeLessThanOrEqual(b.top);
    }
    await page.touchscreen.tap(facts.x + facts.width / 2, facts.y + facts.topExtension / 2);
    await expect(target).toHaveAttribute('aria-selected', 'true');
  }
  await page.locator('[data-tabs-refinement] > summary').click();
  for (const appearance of ['line', 'contained', 'soft']) for (const size of [28, 32, 38] as const) for (const position of ['start', 'end']) {
    const scope = page.locator(`[data-public-case="layout-${appearance}-${size}-${position}"]`), target = scope.getByRole('tab', { name: '学生', exact: true });
    await target.scrollIntoViewIfNeeded();
    const facts = await target.evaluate(node => {
      const box = node.getBoundingClientRect(), hit = getComputedStyle(node, '::after');
      return { x: box.x, y: box.y, width: box.width, height: box.height, extension: hit.top, margin: getComputedStyle(node).marginTop,
        siblings: [...node.closest('[role="tablist"]')!.querySelectorAll('[role="tab"]')].map(tab => { const rect = tab.getBoundingClientRect(); return { top: rect.top, bottom: rect.bottom }; }) };
    });
    expect(facts.height).toBe(({ 28: 46, 32: 52, 38: 60 })[size]); expect(facts.extension).toBe('0px'); expect(facts.margin).toBe('0px');
    for (let index = 1; index < facts.siblings.length; index++) expect(facts.siblings[index - 1]!.bottom).toBeLessThanOrEqual(facts.siblings[index]!.top);
    await page.touchscreen.tap(facts.x + facts.width / 2, facts.y + facts.height / 2); await expect(target).toHaveAttribute('aria-selected', 'true');
  }
  const more = page.locator('[data-public-tabs="overflow"]').getByRole('button', { name: '更多分区' }); await more.scrollIntoViewIfNeeded();
  const box = await more.boundingBox(); await page.touchscreen.tap(box!.x + box!.width / 2, box!.y - 2);
  await expect(page.getByRole('menu')).toBeVisible();
  await page.screenshot({ path: evidenceOutputPath('evidence/runtime/tabs-visual-refinement/coarse-pointer.png') });
  expect((await page.pageErrors()).map(error => error.message)).toEqual([]); await context.close();
});

test('forced colors keep selected boundaries and global Focus separately visible in every direction', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  for (const appearance of ['line', 'contained', 'soft']) for (const position of ['top', 'bottom', 'start', 'end']) {
    const scope = page.locator(`[data-public-case="${appearance}-32-${position}"]`), target = scope.getByRole('tab', { name: '学生', exact: true });
    await target.evaluate(node => (node as HTMLElement).click());
    await page.keyboard.press('Tab'); await target.focus(); await target.scrollIntoViewIfNeeded();
    const fact = await readTabsFacts(target);
    expect(fact.selected).toBe(true); expect(fact.focus).toBe(true); expect(fact.paint.borderWidth).toBe('2px');
    expect(fact.outline.width).toBe('2px'); expect(fact.outline.offset).toBe('2px'); expect(fact.outline.style).toBe('solid');
    const clipping = await target.evaluate(node => {
      const r = node.getBoundingClientRect();
      for (let parent = node.parentElement; parent && parent.tagName !== "SECTION"; parent = parent.parentElement) {
        const style = getComputedStyle(parent), p = parent.getBoundingClientRect();
        if ([style.overflowX, style.overflowY].some(value => value !== 'visible') && (p.left > r.left - 4 || p.top > r.top - 4 || p.right < r.right + 4 || p.bottom < r.bottom + 4)) return true;
      }
      return false;
    });
    expect(clipping).toBe(false);
    expect(await target.evaluate(node => getComputedStyle(node).transitionDuration)).toBe('0s');
  }
  await page.screenshot({ path: evidenceOutputPath('evidence/runtime/tabs-visual-refinement/forced-colors.png') });
});

test('360px layout separates operations from More and 200 percent zoom preserves the recipe', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 900 });
  const course = page.getByRole('region', { name: '课程分区', exact: true });
  await expect(course.getByRole('button', { name: '导出课程摘要', exact: true })).toBeVisible();
  await expect(course.getByRole('button', { name: '导出', exact: true })).toHaveCount(0);
  await course.getByRole('button', { name: '更多分区', exact: true }).click();
  expect((await page.getByRole('menuitemradio').allTextContents()).some(label => label.includes('导出'))).toBe(false);
  await page.keyboard.press('Escape');
  await page.locator('[data-tabs-verification] > summary').click();
  await course.scrollIntoViewIfNeeded(); await page.screenshot({ path: evidenceOutputPath('evidence/runtime/tabs-visual-refinement/narrow-360.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.evaluate(() => { document.body.style.zoom = '2'; });
  const tab = course.getByRole('tab', { name: '课程概览', exact: true }); await tab.scrollIntoViewIfNeeded();
  const fact = await tab.evaluate(node => ({ height: node.getBoundingClientRect().height, font: getComputedStyle(node.querySelector('[data-part="label"]')!).fontSize }));
  expect(fact.height).toBe(76); expect(fact.font).toBe('15px');
  await page.keyboard.press('Tab'); await tab.focus(); await page.keyboard.press('ArrowRight');
  await expect(course.getByRole('tab', { name: '待评作业', exact: true })).toBeFocused();
  await page.keyboard.press('Enter'); await expect(course.getByRole('tabpanel')).toContainText('待评作业');
  const overflow = await course.locator('.rain-tabs__viewport').evaluate(node => node.scrollWidth - node.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  const nav = course.locator('.rain-tabs__nav-row');
  const extraBox = await nav.getByRole('button', { name: '导出', exact: true }).boundingBox();
  expect(extraBox).not.toBeNull();
  for (const target of await nav.locator('.rain-tabs__tab:not([hidden]), .rain-tabs__more').all()) {
    const box = await target.boundingBox(); expect(box!.x + box!.width).toBeLessThanOrEqual(extraBox!.x);
  }
  await page.screenshot({ path: evidenceOutputPath('evidence/runtime/tabs-visual-refinement/zoom-200.png') });
  await page.evaluate(() => document.body.style.removeProperty('zoom'));
});

test('real More screenshots preserve counts, the full selected name and retained content', async ({ page }) => {
  const scope = page.locator('[data-public-tabs="overflow"]');
  await scope.getByRole('button', { name: '更多分区' }).click();
  await expect(page.getByRole('menuitemradio', { name: '学生', exact: true })).toHaveAccessibleDescription('数量 0');
  await page.screenshot({ path: evidenceOutputPath('evidence/runtime/tabs-visual-refinement/more-open.png') });
  await page.getByRole('menuitemradio', { name: '完整课堂记录与课后练习资料', exact: true }).click();
  await expect(scope.getByRole('tab', { name: '完整课堂记录与课后练习资料', exact: true })).toBeFocused();
  await scope.getByRole('textbox').fill('切换后保留的课程记录');
  await page.screenshot({ path: evidenceOutputPath('evidence/runtime/tabs-visual-refinement/more-selected.png') });
});

test('local dark theme reaches the full-name portal and the four content combinations retain their real fonts', async ({ page }) => {
  await page.getByRole('button', { name: '深色主题', exact: true }).click();
  const course = page.getByRole('tablist', { name: '课程内容', exact: true });
  for (const [label, icons, counts] of [['课程概览', 0, 0], ['待评作业', 0, 1], ['课程资料', 1, 0], ['学生', 1, 1]] as const) {
    const tab = course.getByRole('tab', { name: label, exact: true });
    await expect(tab.locator('[data-part="icon"]')).toHaveCount(icons); await expect(tab.locator('[data-part="count"]')).toHaveCount(counts);
  }
  await expect(course.getByRole('tab', { name: '待评作业', exact: true })).toHaveAccessibleDescription('数量 0');
  const long = page.locator('[data-public-case="vertical"]').getByRole('tab', { name: '完整课堂记录与课后练习资料', exact: true });
  await page.keyboard.press('Tab'); await long.focus();
  const tooltip = page.getByRole('tooltip'); await expect(tooltip).toBeVisible();
  await expect(tooltip.locator('..')).toHaveAttribute('data-rain-theme', 'dark');
  const colors = await tooltip.evaluate(node => ({ foreground: getComputedStyle(node).color, background: getComputedStyle(node).backgroundColor }));
  expect(colors).toEqual({ foreground: 'rgb(183, 193, 224)', background: 'rgb(30, 36, 59)' });
  const session = await page.context().newCDPSession(page); await session.send('DOM.enable'); await session.send('CSS.enable');
  const { root } = await session.send('DOM.getDocument');
  const { nodeId } = await session.send('DOM.querySelector', { nodeId: root.nodeId, selector: '[aria-label="课程内容"] [role="tab"][aria-label="学生"] [data-part="count"]' });
  const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId });
  expect(fonts.some(font => font.glyphCount > 0 && font.familyName.includes('PingFang'))).toBe(true);
  writeFileSync(evidenceOutputPath('evidence/runtime/tabs-visual-refinement/supplemental-facts.json'), JSON.stringify({ capturedAt: new Date().toISOString(), scope: 'local dark Tooltip and actual Count platform font', colors, fonts, fontEventCheck: 'synthetic loadingdone; real document.fonts.ready awaited in matrix', zoomCheck: 'CSS zoom=2 in Chromium; not operating-system zoom or browser UI zoom' }, null, 2) + '\n');
  await page.keyboard.press('Escape'); await expect(tooltip).toHaveCount(0); await session.detach();
});

test('Soft More keeps its own neutral text and icon in both themes without borrowing weak Tab text', async ({ page }) => {
  await page.getByRole('combobox', { name: '示例外观', exact: true }).click();
  await page.getByRole('option', { name: '浅底', exact: true }).click();
  await page.setViewportSize({ width: 360, height: 900 });
  const more = page.getByRole('region', { name: '选择一套完整外观', exact: true }).getByRole('button', { name: '更多分区', exact: true });
  const facts = [];
  for (const theme of ['light', 'dark'] as const) {
    await page.getByRole('button', { name: theme === 'light' ? '浅色主题' : '深色主题', exact: true }).click();
    for (const focus of [false, true]) {
      await page.mouse.move(0, 0);
      if (focus) { await page.keyboard.press('Tab'); await more.focus(); }
      const sample = await more.evaluate(node => ({ focus: node.matches(':focus-visible'), label: getComputedStyle(node.querySelector('[data-part="label"]')!).color, icon: getComputedStyle(node.querySelector('[data-part="icon"]')!).color }));
      expect(sample.focus).toBe(focus);
      expect(tabsColor(sample.label).rgb).toEqual(resolveColor('Text/Neutral/3', theme).rgb);
      expect(tabsColor(sample.icon).rgb).toEqual(resolveColor('Icon/Neutral/3', theme).rgb);
      facts.push({ theme, ...sample, labelToken: 'Text/Neutral/3', iconToken: 'Icon/Neutral/3' });
    }
  }
  const path = evidenceOutputPath('evidence/runtime/tabs-visual-refinement/supplemental-facts.json');
  const previous = JSON.parse(readFileSync(path, 'utf8'));
  writeFileSync(path, JSON.stringify({ ...previous, more: facts }, null, 2) + '\n');
});
