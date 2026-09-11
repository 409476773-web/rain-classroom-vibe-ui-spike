# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dropdown-batch-one.spec.ts >> radix >> submenu escape closes one level and preserves its parent
- Location: tests/e2e/dropdown-batch-one.spec.ts:47:5

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator: getByRole('menuitem', { name: '导出', exact: true })
Expected: focused
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeFocused" with timeout 5000ms
  - waiting for getByRole('menuitem', { name: '导出', exact: true })

```

```yaml
- main:
  - link "Rain Next":
    - /url: /
  - heading "下拉菜单 · 第一批" [level=1]
  - paragraph: 先看清每一条内容，再体验菜单与自由组合面板。
  - text: 文字规则已确认 · 留白、背景与阴影待检查
  - region "样本设置":
    - group "预览主题":
      - button "浅色" [pressed]
      - button "深色"
    - text: 行间留白
    - combobox "行间留白":
      - option "保留原稿 · 36 / 60" [selected]
      - option "现有间距 · 34 / 58"
    - text: 状态背景
    - combobox "状态背景":
      - option "中性浅蓝" [selected]
      - option "品牌浅蓝"
    - text: 浮层阴影
    - combobox "浮层阴影":
      - option "原稿低阴影" [selected]
      - option "现有浮层阴影"
  - region "相同内容，并排比较":
    - heading "相同内容，并排比较" [level=2]
    - paragraph: 两列使用正式字体与已确认的 600／400 层次。点击条目可查看选中样式，Tab 可检查键盘焦点。
    - heading "原稿外观" [level=3]
    - paragraph: 浅色原稿＋已确认文字规则
    - paragraph: 内容与状态
    - button "分享课程"
    - button "新建课堂讨论 从一个问题开始，收集不同观点"
    - button "王老师 工业设计系 · 教师账号" [pressed]
    - button "显示已归档" [pressed]
    - button "保留教师资料 管理员已锁定此项，当前设置仍然生效。" [disabled] [pressed]
    - button "默认教学班 2026级工业设计专业 · 实验教学班"
    - button "删除课程"
    - heading "Rain Token 对照" [level=3]
    - paragraph: 切换上方设置，比较当前方案
    - paragraph: 内容与状态
    - button "分享课程"
    - button "新建课堂讨论 从一个问题开始，收集不同观点"
    - button "王老师 工业设计系 · 教师账号" [pressed]
    - button "显示已归档" [pressed]
    - button "保留教师资料 管理员已锁定此项，当前设置仍然生效。" [disabled] [pressed]
    - button "默认教学班 2026级工业设计专业 · 实验教学班"
    - button "删除课程"
    - paragraph: 已选主文字和解释都使用主题色；主文字 600，解释 400。不可用的已选项保留选中事实。
  - region "真实点击，真实键盘":
    - heading "真实点击，真实键盘" [level=2]
    - paragraph: 课程操作包含复选、单选、子菜单与弹窗；新建面板包含搜索、分类、预览和独立收藏。
    - text: 交互底座
    - combobox "交互底座":
      - option "Base UI"
      - option "Radix" [selected]
    - checkbox "操作后关闭"
    - text: 操作后关闭 “记录稍后处理”单独保持打开。
    - button "课程操作"
    - button "新建学习单元"
    - combobox "课程范围": 全部课程
    - status: 选择一个操作，查看交互结果。
    - text: 外部焦点目标
    - textbox "外部焦点目标":
      - /placeholder: 浮层打开时，点击这里
    - paragraph: 模板首次创建会演示失败；重试后成功，用于检查选择与搜索是否保留。
  - region "长内容，也要读得完整":
    - heading "长内容，也要读得完整" [level=2]
    - paragraph: 标题最多两行；关键范围和不可用原因完整放在说明中。
    - paragraph: 220px 宽度样本
    - button "将当前课程的完整教学资料复制到新的教学班级中"
    - button "选择教学模板 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。"
    - paragraph: 282px 宽度样本
    - button "将当前课程的完整教学资料复制到新的教学班级中"
    - button "选择教学模板 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。"
    - paragraph: 340px 宽度样本
    - button "将当前课程的完整教学资料复制到新的教学班级中"
    - button "选择教学模板 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。"
    - button "清理已归档资料 操作范围：2026级工业设计专业全部教学班，以及这些教学班关联的课堂讨论、作业附件和教师批改记录。"
    - button "导出学生成绩 你目前是课程协作教师，尚未获得成绩导出权限。请联系课程负责人开启权限后再操作，已有成绩不会因此改变。" [disabled]
  - text: 第一批局部样本 · 视觉对照与交互底座验证 · 公共组件尚未发布
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | 
  3   | async function openReview(page: Page, candidate: "base" | "radix" = "base") {
  4   |   await page.goto(`/dropdown-review.html?candidate=${candidate}`);
  5   |   await expect(page.getByRole("heading", { name: "下拉菜单 · 第一批" })).toBeVisible({ timeout: 3000 });
  6   | }
  7   | 
  8   | for (const candidate of ["base", "radix"] as const) {
  9   |   test.describe(candidate, () => {
  10  |     test("keyboard menu opens, navigates, and returns focus", async ({ page }) => {
  11  |       await openReview(page, candidate);
  12  |       const trigger = page.getByRole("button", { name: "课程操作", exact: true });
  13  |       await trigger.focus();
  14  |       await page.keyboard.press("ArrowDown");
  15  |       await expect(page.getByRole("menuitem", { name: "查看课程", exact: true })).toBeFocused();
  16  |       await page.keyboard.press("End");
  17  |       await expect(page.getByRole("menuitem", { name: "删除课程", exact: true })).toBeFocused();
  18  |       await page.keyboard.press("Home");
  19  |       await expect(page.getByRole("menuitem", { name: "查看课程", exact: true })).toBeFocused();
  20  |       await page.keyboard.press("Escape");
  21  |       await expect(page.getByRole("menu")).toHaveCount(0);
  22  |       await expect(trigger).toBeFocused();
  23  |     });
  24  | 
  25  |     test("business policy controls actions and checked items for mouse and keyboard", async ({ page }) => {
  26  |       await openReview(page, candidate);
  27  |       const trigger = page.getByRole("button", { name: "课程操作", exact: true });
  28  |       await trigger.click();
  29  |       await page.getByRole("menuitem", { name: "查看课程", exact: true }).click();
  30  |       await expect(page.getByRole("menu")).toBeVisible();
  31  |       await page.getByRole("menuitemcheckbox", { name: "显示已归档", exact: true }).click();
  32  |       await expect(page.getByRole("menuitemcheckbox", { name: "显示已归档", exact: true })).toBeChecked();
  33  |       await page.keyboard.press("Escape");
  34  |       await page.getByLabel("操作后关闭").check();
  35  |       await trigger.click();
  36  |       await page.getByRole("menuitemcheckbox", { name: "显示已归档", exact: true }).click();
  37  |       await expect(page.getByRole("menu")).toHaveCount(0);
  38  |       await trigger.focus();
  39  |       await page.keyboard.press("ArrowDown");
  40  |       await page.keyboard.press("Enter");
  41  |       await expect(page.getByRole("menu")).toHaveCount(0);
  42  |       await trigger.click();
  43  |       await page.getByRole("menuitem", { name: "记录稍后处理", exact: true }).click();
  44  |       await expect(page.getByRole("menu")).toBeVisible();
  45  |     });
  46  | 
  47  |     test("submenu escape closes one level and preserves its parent", async ({ page }) => {
  48  |       await openReview(page, candidate);
  49  |       await page.getByRole("button", { name: "课程操作", exact: true }).click();
  50  |       const sub = page.getByRole("menuitem", { name: "导出", exact: true });
  51  |       await sub.focus();
  52  |       await page.keyboard.press("ArrowRight");
  53  |       await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toBeVisible();
  54  |       await page.keyboard.press("Escape");
  55  |       await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toHaveCount(0);
> 56  |       await expect(sub).toBeFocused();
      |                         ^ Error: expect(locator).toBeFocused() failed
  57  |       await expect(page.getByRole("menu")).toHaveCount(1);
  58  |     });
  59  | 
  60  |     test("dialog receives focus from menu and contains long content", async ({ page }) => {
  61  |       await openReview(page, candidate);
  62  |       const trigger = page.getByRole("button", { name: "课程操作", exact: true });
  63  |       await trigger.click();
  64  |       await page.getByRole("menuitem", { name: "编辑课程", exact: true }).click();
  65  |       const dialog = page.getByRole("dialog", { name: "编辑课程" });
  66  |       await expect(dialog).toBeVisible();
  67  |       await expect(page.getByLabel("课程名称", { exact: true })).toBeFocused();
  68  |       await page.getByRole("button", { name: "保存课程", exact: true }).focus();
  69  |       await page.keyboard.press("Tab");
  70  |       await expect(page.getByLabel("课程名称", { exact: true })).toBeFocused();
  71  |       await page.keyboard.press("Escape");
  72  |       await expect(dialog).toHaveCount(0);
  73  |       await expect(trigger).toBeFocused();
  74  |     });
  75  | 
  76  |     test("select keeps controlled value and skips disabled options", async ({ page }) => {
  77  |       await openReview(page, candidate);
  78  |       const select = page.getByRole("combobox", { name: "课程范围" });
  79  |       await select.focus();
  80  |       await page.keyboard.press("ArrowDown");
  81  |       await expect(page.getByRole("listbox")).toBeVisible();
  82  |       await page.keyboard.press("End");
  83  |       await page.keyboard.press("Enter");
  84  |       await expect(select).toContainText("仅我创建");
  85  |       await expect(select).toBeFocused();
  86  |       await select.click();
  87  |       await expect(page.getByRole("option", { name: "已停用课程" })).toHaveAttribute("aria-disabled", "true");
  88  |       await page.keyboard.press("Escape");
  89  |       await expect(select).toContainText("仅我创建");
  90  |     });
  91  | 
  92  |     test("mixed panel preserves search and selection on failure and permits retry", async ({ page }) => {
  93  |       await openReview(page, candidate);
  94  |       const trigger = page.getByRole("button", { name: "新建学习单元", exact: true });
  95  |       await trigger.click();
  96  |       const panel = page.getByRole("dialog", { name: "选择学习模板" });
  97  |       const search = panel.getByRole("textbox", { name: "搜索模板" });
  98  |       await expect(search).toBeFocused();
  99  |       await search.fill("函数");
  100 |       await panel.getByRole("button", { name: "选择 函数图像练习", exact: true }).click();
  101 |       await panel.getByRole("button", { name: "收藏 函数图像练习", exact: true }).click();
  102 |       await expect(panel.getByRole("button", { name: "选择 函数图像练习", exact: true })).toHaveAttribute("aria-pressed", "true");
  103 |       await panel.getByRole("button", { name: "创建学习单元", exact: true }).click();
  104 |       await expect(panel.getByRole("alert")).toContainText("请重试");
  105 |       await expect(search).toHaveValue("函数");
  106 |       await panel.getByRole("button", { name: "重试创建", exact: true }).click();
  107 |       await expect(panel).toHaveCount(0);
  108 |       await expect(trigger).toBeFocused();
  109 |     });
  110 | 
  111 |     test("outside click follows the destination without stealing focus", async ({ page }) => {
  112 |       await openReview(page, candidate);
  113 |       await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
  114 |       const destination = page.getByRole("textbox", { name: "外部焦点目标" });
  115 |       await destination.click();
  116 |       await expect(page.getByRole("dialog", { name: "选择学习模板" })).toHaveCount(0);
  117 |       await expect(destination).toBeFocused();
  118 |     });
  119 | 
  120 |     test("portals retain dark theme and avoid narrow viewport edges", async ({ page }) => {
  121 |       await page.setViewportSize({ width: 360, height: 800 });
  122 |       await openReview(page, candidate);
  123 |       await page.getByRole("button", { name: "深色", exact: true }).click();
  124 |       await page.getByRole("button", { name: "课程操作", exact: true }).click();
  125 |       const menu = page.getByRole("menu").first();
  126 |       const bounds = await menu.boundingBox();
  127 |       expect(bounds).not.toBeNull();
  128 |       expect(bounds!.x).toBeGreaterThanOrEqual(7);
  129 |       expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(353);
  130 |       await expect(menu).toHaveCSS("background-color", "rgb(30, 36, 59)");
  131 |       await page.keyboard.press("Escape");
  132 |       await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
  133 |       const panel = page.getByRole("dialog", { name: "选择学习模板" });
  134 |       const panelBounds = await panel.boundingBox();
  135 |       expect(panelBounds!.x).toBeGreaterThanOrEqual(7);
  136 |       expect(panelBounds!.x + panelBounds!.width).toBeLessThanOrEqual(353);
  137 |       await expect(panel).toHaveCSS("background-color", "rgb(30, 36, 59)");
  138 |     });
  139 |   });
  140 | }
  141 | 
  142 | test("selected text and explanatory hierarchy follow the confirmed recipe", async ({ page }) => {
  143 |   await openReview(page);
  144 |   const selected = page.getByTestId("token-identity-selected");
  145 |   await expect(selected.locator("[data-slot=label]")).toHaveCSS("font-weight", "600");
  146 |   await expect(selected.locator("[data-slot=description]")).toHaveCSS("font-weight", "400");
  147 |   await expect(selected.locator("[data-slot=label]")).toHaveCSS("color", "rgb(15, 85, 223)");
  148 |   await expect(selected.locator("[data-slot=description]")).toHaveCSS("color", "rgb(15, 85, 223)");
  149 |   const disabled = page.getByTestId("token-selected-disabled");
  150 |   await expect(disabled.locator("[data-slot=label]")).toHaveCSS("color", "rgb(15, 85, 223)");
  151 |   await expect(page.getByTestId("token-description").locator("[data-slot=label]")).toHaveCSS("font-weight", "600");
  152 | });
  153 | 
  154 | test("critical descriptions grow and shared keyboard focus survives forced colors", async ({ page }) => {
  155 |   await openReview(page);
  156 |   const reason = page.getByTestId("token-critical-reason");
```