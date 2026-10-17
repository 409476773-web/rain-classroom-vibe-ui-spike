import { expect, test } from "@playwright/test";

test("the detailed workflow uses the same entry and preserves read-only drop protection", async ({ page }) => {
  await page.goto("/#attachment");
  const form = page.getByRole("form", { name: "课程附件", exact: true });
  const intake = form.locator('[data-rain-id="local-attachment-intake"]');
  const button = form.getByRole("button", { name: "添加附件", exact: true });
  await expect(button).toHaveText("添加文件");
  await expect(form.getByText(/最多 8 个/)).toBeVisible();
  const options = page.locator('.attachment-workflow-demo__options');
  await options.getByText("演示选项", { exact: true }).click();
  await options.getByText("只读查看", { exact: true }).click();
  await expect(button).toBeDisabled();
  const input = intake.locator('input[type="file"][aria-label="添加附件"]');
  await expect(input).toBeDisabled();
  const prevented = await intake.evaluate(node => {
    const transfer = new DataTransfer(); transfer.items.add(new File(["must not enter"], "只读文件.txt", { type: "text/plain" }));
    const enter = new DragEvent("dragenter", { bubbles: true, cancelable: true, dataTransfer: transfer }); node.dispatchEvent(enter);
    const event = new DragEvent("drop", { bubbles: true, cancelable: true, dataTransfer: transfer }); node.dispatchEvent(event);
    return event.defaultPrevented;
  });
  expect(prevented).toBe(true);
  await expect(intake).toHaveAttribute("data-state", "idle");
  await expect(form.locator("[data-attachment-id]")).toHaveCount(3);
  await expect(form.getByRole("button", { name: "下载 课程导读：从问题到证据.pdf", exact: true })).toBeEnabled();
});

test("keyboard selection returns focus to the replacement entry after the first file is added", async ({ page }) => {
  await page.goto("/#attachment");
  const scope = page.getByTestId("attachment-scenario-ordinary");
  await scope.getByRole("button", { name: "查看首次添加", exact: true }).click();
  const entry = scope.getByRole("button", { name: "添加课程附件", exact: true });
  const choosing = page.waitForEvent("filechooser");
  await entry.press("Enter");
  await (await choosing).setFiles({ name: "键盘选择.txt", mimeType: "text/plain", buffer: Buffer.from("keyboard file bytes") });
  await expect(entry).toHaveText("添加文件");
  await expect(entry).toBeFocused();
});
