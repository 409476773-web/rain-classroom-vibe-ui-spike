# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: attachment-intake-regression.spec.ts >> keyboard selection returns focus to the replacement entry after the first file is added
- Location: tests/e2e/attachment-intake-regression.spec.ts:28:1

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  getByTestId('attachment-scenario-ordinary').getByRole('button', { name: '添加课程附件', exact: true })
Expected: focused
Received: inactive
Timeout:  5000ms

Call log:
  - Expect "toBeFocused" with timeout 5000ms
  - waiting for getByTestId('attachment-scenario-ordinary').getByRole('button', { name: '添加课程附件', exact: true })
    14 × locator resolved to <button type="button" data-slot="root" data-size="medium" aria-label="添加课程附件" data-tone="default" data-focus="control" data-state="default" data-density="default" data-variant="tertiary" data-rain-id="ui-button" data-intake-trigger="true" aria-describedby="_r_3_-hint" class="rain-button box-border relative inline-flex flex-none items-center justify-center py-rain-0 overflow-visible whitespace-nowrap text-center align-middle appearance-none select-none isolate border-solid border-rain-button font-rain-…>…</button>
       - unexpected value "inactive"

```

```yaml
- button "添加课程附件": 添加文件
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("the detailed workflow uses the same entry and preserves read-only drop protection", async ({ page }) => {
  4  |   await page.goto("/#attachment");
  5  |   const form = page.getByRole("form", { name: "课程附件", exact: true });
  6  |   const intake = form.locator('[data-rain-id="local-attachment-intake"]');
  7  |   const button = form.getByRole("button", { name: "添加附件", exact: true });
  8  |   await expect(button).toHaveText("添加文件");
  9  |   await expect(form.getByText(/最多 8 个/)).toBeVisible();
  10 |   const options = page.locator('.attachment-workflow-demo__options');
  11 |   await options.getByText("演示选项", { exact: true }).click();
  12 |   await options.getByText("只读查看", { exact: true }).click();
  13 |   await expect(button).toBeDisabled();
  14 |   const input = intake.locator('input[type="file"][aria-label="添加附件"]');
  15 |   await expect(input).toBeDisabled();
  16 |   const prevented = await intake.evaluate(node => {
  17 |     const transfer = new DataTransfer(); transfer.items.add(new File(["must not enter"], "只读文件.txt", { type: "text/plain" }));
  18 |     const enter = new DragEvent("dragenter", { bubbles: true, cancelable: true, dataTransfer: transfer }); node.dispatchEvent(enter);
  19 |     const event = new DragEvent("drop", { bubbles: true, cancelable: true, dataTransfer: transfer }); node.dispatchEvent(event);
  20 |     return event.defaultPrevented;
  21 |   });
  22 |   expect(prevented).toBe(true);
  23 |   await expect(intake).toHaveAttribute("data-state", "idle");
  24 |   await expect(form.locator("[data-attachment-id]")).toHaveCount(3);
  25 |   await expect(form.getByRole("button", { name: "下载 课程导读：从问题到证据.pdf", exact: true })).toBeEnabled();
  26 | });
  27 | 
  28 | test("keyboard selection returns focus to the replacement entry after the first file is added", async ({ page }) => {
  29 |   await page.goto("/#attachment");
  30 |   const scope = page.getByTestId("attachment-scenario-ordinary");
  31 |   await scope.getByRole("button", { name: "查看首次添加", exact: true }).click();
  32 |   const entry = scope.getByRole("button", { name: "添加课程附件", exact: true });
  33 |   const choosing = page.waitForEvent("filechooser");
  34 |   await entry.press("Enter");
  35 |   await (await choosing).setFiles({ name: "键盘选择.txt", mimeType: "text/plain", buffer: Buffer.from("keyboard file bytes") });
  36 |   await expect(entry).toHaveText("添加文件");
> 37 |   await expect(entry).toBeFocused();
     |                       ^ Error: expect(locator).toBeFocused() failed
  38 | });
  39 | 
```