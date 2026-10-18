import { writeFileSync } from "node:fs";
import { expect, test, type Page, type TestInfo } from "@playwright/test";

async function attachJson(info: TestInfo, name: string, value: unknown) {
  const path = info.outputPath(`${name}.json`);
  writeFileSync(path, JSON.stringify(value, null, 2));
  await info.attach(name, { path, contentType: "application/json" });
}

const fixturePath = `/@fs${new URL("./runtime-state-remediation.fixture.tsx", import.meta.url).pathname}`;
async function mount(page: Page, fixture: "workspace" | "input" | "tree", options: { side?: "start" | "end" | "top"; controlled?: boolean; strict?: boolean } = {}) {
  await page.goto("/#input");
  await page.evaluate(async ({ path, fixture, options }) => {
    const module = await import(path);
    if (fixture === "workspace") module.mountWorkspaceRemediation(options.side ?? "start");
    if (fixture === "input") module.mountInputRemediation();
    if (fixture === "tree") module.mountTreeRemediation(options.controlled ?? false, options.strict ?? true);
  }, { path: fixturePath, fixture, options });
}
test.afterEach(async ({ page }) => expect((await page.pageErrors()).map(error => error.message)).toEqual([]));

for (const width of [1440, 900]) for (const side of ["start", "end"] as const) {
  test(`[B02] ${side} compact-only collapse preserves editor, draft, width and focus at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 }); await mount(page, "workspace", { side });
    const editor = page.getByRole("textbox", { name: "区域草稿" }), body = page.getByRole("textbox", { name: "正文草稿" });
    await editor.fill("此对象的未保存草稿"); await editor.evaluate(node => { node.dataset.testIdentity = "original"; });
    await body.fill("正文独立更新");
    const restore = page.locator('[data-workspace-action="restore"]');
    const controlledId = await restore.getAttribute("aria-controls");
    const splitter = page.getByRole("separator", { name: "调整复核区域宽度" });
    await splitter.focus(); await page.keyboard.press(side === "start" ? "ArrowRight" : "ArrowLeft");
    await expect(splitter).toHaveAttribute("aria-valuenow", "226");
    await page.keyboard.press("Enter"); await expect(restore).toHaveAttribute("data-mode", "compact"); await expect(restore).toBeFocused();
    await expect(page.getByRole("separator")).toHaveCount(0);
    await restore.press("Enter"); await expect(splitter).toHaveAttribute("aria-valuenow", "226");
    await expect(editor).toHaveAttribute("data-test-identity", "original"); await expect(editor).toHaveValue("此对象的未保存草稿");
    await expect(body).toHaveValue("正文独立更新"); await expect(restore).toHaveAttribute("aria-controls", controlledId!);
    await page.locator("#workspace-remediation").screenshot({ path: info.outputPath(`${side}-${width}-restored.png`) });
    await attachJson(info, "workspace-state", JSON.parse(await page.getByTestId("workspace-state").innerText()));
  });
}

for (const width of [1440, 900]) test(`[B02] full/hidden ribbon recovers with the same DOM and pin base at ${width}px`, async ({ page }, info) => {
  await page.setViewportSize({ width, height: 900 }); await mount(page, "workspace", { side: "top" });
  const editor = page.getByRole("textbox", { name: "区域草稿" }), restore = page.locator('[data-workspace-action="restore"]');
  await editor.fill("顶部草稿"); await editor.evaluate(node => { node.dataset.testIdentity = "original"; });
  await restore.click(); await expect(restore).toHaveAttribute("data-mode", "hidden"); await expect(restore).toBeFocused();
  await expect(editor).toBeHidden(); await restore.press("Enter"); await expect(editor).toBeVisible();
  await expect(editor).toHaveAttribute("data-test-identity", "original"); await expect(editor).toHaveValue("顶部草稿");
  await page.getByRole("button", { name: "固定当前区域" }).click(); await expect(restore).toHaveAttribute("data-mode", "full");
  await page.getByRole("button", { name: "取消固定区域" }).click();
  await expect(restore).toHaveAttribute("data-mode", "hidden"); await expect(editor).toBeVisible();
  await restore.focus(); await page.keyboard.press("Escape"); await expect(editor).toBeHidden(); await expect(restore).toBeFocused();
  await restore.press("Enter"); await expect(editor).toHaveValue("顶部草稿");
  await page.locator("#workspace-remediation").screenshot({ path: info.outputPath(`top-${width}-restored.png`) });
});

test("[B03] native reset keeps each owner, documented defaults, callbacks and controlled values distinct", async ({ page }, info) => {
  await mount(page, "input");
  const field = page.getByRole("textbox", { name: "默认字段", exact: true }), native = page.getByRole("textbox", { name: "原生默认字段" });
  await field.fill("编辑值"); await native.fill("编辑值"); await page.getByRole("textbox", { name: "外置字段" }).fill("外置草稿");
  await page.getByRole("textbox", { name: "查询字段" }).fill("查询草稿"); await page.getByRole("textbox", { name: "取消复位字段" }).fill("表单B草稿");
  await page.getByRole("button", { name: "更新默认值", exact: true }).click();
  await expect(field).toHaveValue("编辑值"); await expect(native).toHaveValue("编辑值");
  const callbacks = await page.getByTestId("input-callbacks").innerText();
  const immediate = await page.locator("#reset-a").evaluate(node => { const form = node as HTMLFormElement; form.reset(); return Object.fromEntries(new FormData(form)); });
  expect(immediate).toEqual({ rain: "挂载值", native: "更新默认值", query: "初始查询", ime: "AB", readonly: "只读", external: "外置值" });
  await expect(field).toHaveValue("挂载值"); await expect(field.locator("xpath=..").locator('[data-slot="count"]')).toHaveText("3");
  await expect(page.getByRole("textbox", { name: "取消复位字段" })).toHaveValue("表单B草稿");
  await expect(page.getByRole("textbox", { name: "查询字段" })).toHaveAccessibleDescription("宿主错误保留");
  await expect(page.getByTestId("input-callbacks")).toHaveText(callbacks);
  await page.getByRole("button", { name: "取消复位B" }).click(); await expect(page.getByRole("textbox", { name: "取消复位字段" })).toHaveValue("表单B草稿");
  await page.getByRole("button", { name: "宿主主动复位" }).click();
  await expect(page.getByRole("textbox", { name: "受控更新字段" })).toHaveValue("宿主重置值");
  await expect(page.getByRole("textbox", { name: "受控拒绝字段" })).toHaveValue("固定宿主值");
  await field.fill("再次编辑"); await page.getByRole("button", { name: "复位表单A", exact: true }).click(); await expect(field).toHaveValue("挂载值");
  await attachJson(info, "immediate-form-data", immediate);
  await page.locator("#input-remediation").screenshot({ path: info.outputPath("owner-reset.png") });
});

test("[B03] reset clears synthetic composition state before later input and clear", async ({ page }) => {
  await mount(page, "input");
  const field = page.getByRole("textbox", { name: "组字字段" });
  await field.dispatchEvent("compositionstart", { data: "" });
  await field.evaluate(node => {
    const input = node as HTMLInputElement;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, "A课程B");
    input.dispatchEvent(new InputEvent("input", { bubbles: true, data: "课程", inputType: "insertCompositionText", isComposing: true }));
  });
  await expect(field).toHaveValue("A课程B");
  await page.locator("#reset-a").evaluate(node => (node as HTMLFormElement).reset());
  await expect(field.locator("xpath=..").locator('[data-slot="count"]')).toHaveText("2/3");
  await expect(field).toHaveValue("AB"); await field.dispatchEvent("compositionend", { data: "" });
  await field.fill("AXB"); await expect(field).toHaveValue("AXB");
  await page.getByRole("button", { name: "清除组字字段" }).click(); await expect(field).toHaveValue("");
});

for (const controlled of [false, true]) test(`[B04] StrictMode ${controlled ? "controlled" : "default"} rejection is retryable while a parallel branch succeeds`, async ({ page }, info) => {
  await mount(page, "tree", { controlled });
  const host = page.locator("#tree-remediation");
  await expect.poll(async () => JSON.parse((await host.getAttribute("data-timeline"))!)).toEqual(expect.arrayContaining([expect.objectContaining({ type: "abort", key: "alpha" }), expect.objectContaining({ type: "abort", key: "beta" })]));
  await page.getByRole("button", { name: "拒绝已取消请求" }).click(); await expect(page.getByRole("button", { name: /加载失败，重试/ })).toHaveCount(0);
  await page.getByRole("button", { name: "拒绝甲分支" }).click(); await expect(page.getByRole("button", { name: /加载失败，重试/ })).toBeVisible();
  await page.getByRole("button", { name: "完成乙分支" }).click(); await expect(page.getByRole("treeitem", { name: "乙分支子节点" })).toBeVisible();
  await page.getByRole("button", { name: /加载失败，重试/ }).click(); await page.getByRole("button", { name: "完成甲分支" }).click();
  await expect(page.getByRole("treeitem", { name: "甲分支子节点" })).toBeVisible(); await expect(page.getByText("加载中…", { exact: true })).toHaveCount(0);
  const timeline = JSON.parse((await host.getAttribute("data-timeline"))!);
  expect(timeline.filter((item: { type: string }) => item.type === "delivered")).toHaveLength(2);
  await attachJson(info, "request-timeline", timeline);
  await host.screenshot({ path: info.outputPath(`strict-${controlled}-recovered.png`) });
});

test("[B04] revision changes, deleted branches and unmount invalidate pending results in a real root", async ({ page }, info) => {
  await mount(page, "tree", { controlled: false }); const host = page.locator("#tree-remediation");
  await page.getByRole("button", { name: "更换数据版本" }).click(); await page.getByRole("button", { name: "删除乙分支" }).click();
  await page.getByRole("button", { name: "拒绝已取消请求" }).click();
  await expect(page.getByRole("treeitem", { name: "乙分支", exact: true })).toHaveCount(0);
  await expect(page.getByText("加载中…", { exact: true })).toHaveCount(1);
  await page.getByRole("button", { name: "完成甲分支" }).click(); await expect(page.getByRole("treeitem", { name: "甲分支子节点" })).toBeVisible();
  const beforeUnmount = JSON.parse((await host.getAttribute("data-timeline"))!).filter((item: { type: string }) => item.type === "delivered");
  expect(beforeUnmount).toEqual([expect.objectContaining({ key: "alpha", revision: 2 })]);
  await page.getByRole("button", { name: "卸载树" }).click(); await page.getByRole("button", { name: "完成全部旧请求" }).click();
  await expect(page.getByRole("tree")).toHaveCount(0);
  const timeline = JSON.parse((await host.getAttribute("data-timeline"))!);
  expect(timeline.filter((item: { type: string }) => item.type === "delivered")).toEqual(beforeUnmount);
  await attachJson(info, "request-timeline", timeline);
});

test("[B04] non-StrictMode initial expansion remains a working control", async ({ page }) => {
  await mount(page, "tree", { strict: false });
  await page.getByRole("button", { name: "完成甲分支" }).click(); await page.getByRole("button", { name: "完成乙分支" }).click();
  await expect(page.getByRole("treeitem", { name: "甲分支子节点" })).toBeVisible(); await expect(page.getByRole("treeitem", { name: "乙分支子节点" })).toBeVisible();
  const timeline = JSON.parse((await page.locator("#tree-remediation").getAttribute("data-timeline"))!);
  expect(timeline.some((item: { type: string }) => item.type === "abort")).toBe(false);
});
