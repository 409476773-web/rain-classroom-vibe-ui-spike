# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dropdown-batch-one.spec.ts >> radix >> Tab leaves the non-modal menu for the next page control
- Location: tests/e2e/dropdown-batch-one.spec.ts:94:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('menu')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for getByRole('menu')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "Rain Next" [ref=e6] [cursor=pointer]:
          - /url: /
        - heading "下拉菜单 · 第一批" [level=1] [ref=e8]
        - paragraph [ref=e9]: 先看清每一条内容，再体验菜单与自由组合面板。
        - generic [ref=e10]: 文字规则已确认 · 留白、背景与阴影待检查
      - region "样本设置" [ref=e11]:
        - group "预览主题" [ref=e12]:
          - button "浅色" [pressed] [ref=e13] [cursor=pointer]
          - button "深色" [ref=e15] [cursor=pointer]
        - generic [ref=e17]:
          - text: 行间留白
          - combobox "行间留白" [ref=e18]:
            - option "保留原稿 · 36 / 60" [selected]
            - option "现有间距 · 34 / 58"
        - generic [ref=e19]:
          - text: 状态背景
          - combobox "状态背景" [ref=e20]:
            - option "中性浅蓝" [selected]
            - option "品牌浅蓝"
        - generic [ref=e21]:
          - text: 浮层阴影
          - combobox "浮层阴影" [ref=e22]:
            - option "原稿低阴影" [selected]
            - option "现有浮层阴影"
      - region [ref=e23]:
        - generic [ref=e24]:
          - heading "相同内容，并排比较" [level=2] [ref=e25]
          - paragraph [ref=e26]: 两列使用正式字体与已确认的 600／400 层次。点击条目可查看选中样式，Tab 可检查键盘焦点。
        - generic [ref=e27]:
          - generic [ref=e28]:
            - heading "原稿外观" [level=3] [ref=e29]
            - paragraph [ref=e30]: 浅色原稿＋已确认文字规则
            - generic [ref=e31]:
              - paragraph [ref=e32]: 内容与状态
              - button "分享课程" [ref=e33] [cursor=pointer]
              - button "新建课堂讨论 从一个问题开始，收集不同观点" [ref=e38] [cursor=pointer]:
                - generic [ref=e41]:
                  - generic [ref=e42]: 新建课堂讨论
                  - generic [ref=e43]: 从一个问题开始，收集不同观点
              - button "王老师 工业设计系 · 教师账号" [pressed] [ref=e44] [cursor=pointer]:
                - generic [ref=e45]: 王
                - generic [ref=e47]:
                  - generic [ref=e48]: 王老师
                  - generic [ref=e49]: 工业设计系 · 教师账号
              - button "显示已归档" [pressed] [ref=e52] [cursor=pointer]
              - button "保留教师资料 管理员已锁定此项，当前设置仍然生效。" [disabled] [pressed] [ref=e57]:
                - generic [ref=e60]:
                  - generic [ref=e61]: 保留教师资料
                  - generic [ref=e62]: 管理员已锁定此项，当前设置仍然生效。
              - button "默认教学班 2026级工业设计专业 · 实验教学班" [ref=e63] [cursor=pointer]:
                - generic [ref=e64]:
                  - generic [ref=e65]: 默认教学班
                  - generic [ref=e66]: 2026级工业设计专业 · 实验教学班
              - button "删除课程" [ref=e68] [cursor=pointer]
          - generic [ref=e73]:
            - heading "Rain Token 对照" [level=3] [ref=e74]
            - paragraph [ref=e75]: 切换上方设置，比较当前方案
            - generic [ref=e76]:
              - paragraph [ref=e77]: 内容与状态
              - button "分享课程" [ref=e78] [cursor=pointer]
              - button "新建课堂讨论 从一个问题开始，收集不同观点" [ref=e83] [cursor=pointer]:
                - generic [ref=e86]:
                  - generic [ref=e87]: 新建课堂讨论
                  - generic [ref=e88]: 从一个问题开始，收集不同观点
              - button "王老师 工业设计系 · 教师账号" [pressed] [ref=e89] [cursor=pointer]:
                - generic [ref=e90]: 王
                - generic [ref=e92]:
                  - generic [ref=e93]: 王老师
                  - generic [ref=e94]: 工业设计系 · 教师账号
              - button "显示已归档" [pressed] [ref=e97] [cursor=pointer]
              - button "保留教师资料 管理员已锁定此项，当前设置仍然生效。" [disabled] [pressed] [ref=e102]:
                - generic [ref=e105]:
                  - generic [ref=e106]: 保留教师资料
                  - generic [ref=e107]: 管理员已锁定此项，当前设置仍然生效。
              - button "默认教学班 2026级工业设计专业 · 实验教学班" [ref=e108] [cursor=pointer]:
                - generic [ref=e109]:
                  - generic [ref=e110]: 默认教学班
                  - generic [ref=e111]: 2026级工业设计专业 · 实验教学班
              - button "删除课程" [ref=e113] [cursor=pointer]
        - paragraph [ref=e118]: 选中时文字与图标都使用主题色；说明颜色浅一档，主文字 600、说明 400。关键限制与不可用原因保持清晰。
      - region [ref=e119]:
        - generic [ref=e120]:
          - heading "真实点击，真实键盘" [level=2] [ref=e121]
          - paragraph [ref=e122]: 课程操作包含复选、单选、子菜单与弹窗；新建面板包含搜索、分类、预览和独立收藏。
        - generic [ref=e123]:
          - generic [ref=e124]:
            - text: 交互底座
            - combobox "交互底座" [ref=e125]:
              - option "Base UI"
              - option "Radix" [selected]
          - generic [ref=e126] [cursor=pointer]:
            - checkbox "操作后关闭" [ref=e127]
            - generic [ref=e130]: 操作后关闭
          - generic [ref=e132]: “记录稍后处理”单独保持打开。
        - generic [ref=e134]:
          - button "课程操作" [expanded] [ref=e135] [cursor=pointer]
          - button "新建学习单元" [ref=e138] [cursor=pointer]
          - combobox "课程范围" [ref=e141]:
            - generic: 全部课程
        - status [ref=e144]: 选择一个操作，查看交互结果。
        - generic [ref=e146]:
          - text: 外部焦点目标
          - textbox "外部焦点目标" [ref=e148]:
            - /placeholder: 浮层打开时，点击这里
        - paragraph [ref=e150]: 模板首次创建会演示失败；重试后成功，用于检查选择与搜索是否保留。
      - region [ref=e151]:
        - generic [ref=e152]:
          - heading "长内容，也要读得完整" [level=2] [ref=e153]
          - paragraph [ref=e154]: 标题最多两行；关键范围和不可用原因完整放在说明中。
        - generic [ref=e155]:
          - generic [ref=e156]:
            - paragraph [ref=e157]: 220px 宽度样本
            - generic [ref=e158]:
              - button "将当前课程的完整教学资料复制到新的教学班级中" [ref=e159] [cursor=pointer]
              - button "选择教学模板 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。" [ref=e163] [cursor=pointer]:
                - generic [ref=e164]:
                  - generic [ref=e165]: 选择教学模板
                  - generic [ref=e166]: 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。
          - generic [ref=e167]:
            - paragraph [ref=e168]: 282px 宽度样本
            - generic [ref=e169]:
              - button "将当前课程的完整教学资料复制到新的教学班级中" [ref=e170] [cursor=pointer]
              - button "选择教学模板 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。" [ref=e174] [cursor=pointer]:
                - generic [ref=e175]:
                  - generic [ref=e176]: 选择教学模板
                  - generic [ref=e177]: 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。
          - generic [ref=e178]:
            - paragraph [ref=e179]: 340px 宽度样本
            - generic [ref=e180]:
              - button "将当前课程的完整教学资料复制到新的教学班级中" [ref=e181] [cursor=pointer]
              - button "选择教学模板 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。" [ref=e185] [cursor=pointer]:
                - generic [ref=e186]:
                  - generic [ref=e187]: 选择教学模板
                  - generic [ref=e188]: 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。
        - generic [ref=e189]:
          - button "清理已归档资料 操作范围：2026级工业设计专业全部教学班，以及这些教学班关联的课堂讨论、作业附件和教师批改记录。" [ref=e191] [cursor=pointer]:
            - generic [ref=e194]:
              - generic [ref=e195]: 清理已归档资料
              - generic [ref=e196]: 操作范围：2026级工业设计专业全部教学班，以及这些教学班关联的课堂讨论、作业附件和教师批改记录。
          - button "导出学生成绩 你目前是课程协作教师，尚未获得成绩导出权限。请联系课程负责人开启权限后再操作，已有成绩不会因此改变。" [disabled] [ref=e198]:
            - generic [ref=e199]:
              - generic [ref=e200]: 导出学生成绩
              - generic [ref=e201]: 你目前是课程协作教师，尚未获得成绩导出权限。请联系课程负责人开启权限后再操作，已有成绩不会因此改变。
      - generic [ref=e202]: 第一批局部样本 · 视觉对照与交互底座验证 · 公共组件尚未发布
  - menu "课程操作" [ref=e204]:
    - menuitem "查看课程" [active] [ref=e205] [cursor=pointer]
    - menuitem "记录稍后处理" [ref=e208] [cursor=pointer]:
      - generic [ref=e211]: 保持打开
    - separator [ref=e212]
    - group [ref=e213]:
      - generic [ref=e214]: 视图设置
      - menuitemcheckbox "显示已归档" [ref=e215] [cursor=pointer]
      - menuitemcheckbox "保留教师资料" [checked] [disabled] [ref=e219]:
        - generic [ref=e222]:
          - generic [ref=e223]: 保留教师资料
          - generic [ref=e224]: 管理员已锁定此项，当前设置仍然生效。
    - group [ref=e225]:
      - menuitemradio "按时间排序" [checked] [ref=e226] [cursor=pointer]
      - menuitemradio "按名称排序" [ref=e231] [cursor=pointer]
    - separator [ref=e235]
    - menuitem "导出" [ref=e236] [cursor=pointer]
    - menuitem "查看视觉对照" [ref=e240] [cursor=pointer]
    - menuitem "编辑课程" [ref=e243] [cursor=pointer]
    - menuitem "删除课程" [ref=e246] [cursor=pointer]
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
  34  |       await page.getByText("操作后关闭", { exact: true }).click();
  35  |       await expect(page.getByRole("checkbox", { name: "操作后关闭", exact: true })).toBeChecked();
  36  |       await trigger.click();
  37  |       await page.getByRole("menuitemcheckbox", { name: "显示已归档", exact: true }).click();
  38  |       await expect(page.getByRole("menu")).toHaveCount(0);
  39  |       await trigger.focus();
  40  |       await page.keyboard.press("ArrowDown");
  41  |       await page.keyboard.press("Enter");
  42  |       await expect(page.getByRole("menu")).toHaveCount(0);
  43  |       await trigger.click();
  44  |       await page.getByRole("menuitem", { name: "记录稍后处理", exact: true }).click();
  45  |       await expect(page.getByRole("menu")).toBeVisible();
  46  |     });
  47  | 
  48  |     test("submenu escape closes one level and preserves its parent", async ({ page }) => {
  49  |       test.fail(candidate === "radix", "Recorded native contract gap: Radix closes the complete menu tree on submenu Escape; Base UI must pass.");
  50  |       await openReview(page, candidate);
  51  |       await page.getByRole("button", { name: "课程操作", exact: true }).click();
  52  |       const sub = page.getByRole("menuitem", { name: "导出", exact: true });
  53  |       await sub.focus();
  54  |       await page.keyboard.press("ArrowRight");
  55  |       await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toBeVisible();
  56  |       await page.keyboard.press("Escape");
  57  |       await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toHaveCount(0);
  58  |       await expect(sub).toBeFocused();
  59  |       await expect(page.getByRole("menu")).toHaveCount(1);
  60  |     });
  61  | 
  62  |     test("dialog receives focus from menu and contains long content", async ({ page }) => {
  63  |       await openReview(page, candidate);
  64  |       const trigger = page.getByRole("button", { name: "课程操作", exact: true });
  65  |       await trigger.click();
  66  |       await page.getByRole("menuitem", { name: "编辑课程", exact: true }).click();
  67  |       const dialog = page.getByRole("dialog", { name: "编辑课程" });
  68  |       await expect(dialog).toBeVisible();
  69  |       await expect(page.getByLabel("课程名称", { exact: true })).toBeFocused();
  70  |       await page.getByRole("button", { name: "保存课程", exact: true }).focus();
  71  |       await page.keyboard.press("Tab");
  72  |       await expect(page.getByLabel("课程名称", { exact: true })).toBeFocused();
  73  |       await page.keyboard.press("Escape");
  74  |       await expect(dialog).toHaveCount(0);
  75  |       await expect(trigger).toBeFocused();
  76  |     });
  77  | 
  78  |     test("select keeps controlled value and skips disabled options", async ({ page }) => {
  79  |       await openReview(page, candidate);
  80  |       const select = page.getByRole("combobox", { name: "课程范围" });
  81  |       await select.focus();
  82  |       await page.keyboard.press("ArrowDown");
  83  |       await expect(page.getByRole("listbox")).toBeVisible();
  84  |       await page.keyboard.press("End");
  85  |       await page.keyboard.press("Enter");
  86  |       await expect(select).toContainText("仅我创建");
  87  |       await expect(select).toBeFocused();
  88  |       await select.click();
  89  |       await expect(page.getByRole("option", { name: "已停用课程" })).toHaveAttribute("aria-disabled", "true");
  90  |       await page.keyboard.press("Escape");
  91  |       await expect(select).toContainText("仅我创建");
  92  |     });
  93  | 
  94  |     test("Tab leaves the non-modal menu for the next page control", async ({ page }) => {
  95  |       test.fail(candidate === "radix", "Recorded native contract gap: Radix prevents Tab in menu content even when non-modal; Base UI must pass.");
  96  |       await openReview(page, candidate);
  97  |       const trigger = page.getByRole("button", { name: "课程操作", exact: true });
  98  |       await trigger.focus();
  99  |       await page.keyboard.press("ArrowDown");
  100 |       await page.keyboard.press("Tab");
> 101 |       await expect(page.getByRole("menu")).toHaveCount(0);
      |                                            ^ Error: expect(locator).toHaveCount(expected) failed
  102 |       await expect(page.getByRole("button", { name: "新建学习单元", exact: true })).toBeFocused();
  103 |     });
  104 | 
  105 |     test("dialog backdrop dismisses and restores its originating trigger", async ({ page }) => {
  106 |       await openReview(page, candidate);
  107 |       await page.getByRole("button", { name: "课程操作", exact: true }).click();
  108 |       await page.getByRole("menuitem", { name: "编辑课程", exact: true }).click();
  109 |       await expect(page.getByRole("dialog", { name: "编辑课程" })).toBeVisible();
  110 |       await page.mouse.click(10, 10);
  111 |       await expect(page.getByRole("dialog", { name: "编辑课程" })).toHaveCount(0);
  112 |       await expect(page.getByRole("button", { name: "课程操作", exact: true })).toBeFocused();
  113 |     });
  114 | 
  115 |     test("mixed panel permits keyboard access to independent controls and an empty result", async ({ page }) => {
  116 |       await openReview(page, candidate);
  117 |       await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
  118 |       const panel = page.getByRole("dialog", { name: "选择学习模板" });
  119 |       const search = panel.getByRole("textbox", { name: "搜索模板" });
  120 |       await page.keyboard.press("Tab");
  121 |       await expect(panel.getByRole("button", { name: "全部", exact: true })).toBeFocused();
  122 |       await search.fill("不存在的模板");
  123 |       await expect(panel.getByRole("status")).toContainText("没有匹配的模板");
  124 |       await expect(panel.getByRole("button", { name: "创建学习单元", exact: true })).toBeDisabled();
  125 |       await page.keyboard.press("Escape");
  126 |       await expect(page.getByRole("button", { name: "新建学习单元", exact: true })).toBeFocused();
  127 |     });
  128 | 
  129 |     test("mixed panel preserves search and selection on failure and permits retry", async ({ page }) => {
  130 |       await openReview(page, candidate);
  131 |       const trigger = page.getByRole("button", { name: "新建学习单元", exact: true });
  132 |       await trigger.click();
  133 |       const panel = page.getByRole("dialog", { name: "选择学习模板" });
  134 |       const search = panel.getByRole("textbox", { name: "搜索模板" });
  135 |       await expect(search).toBeFocused();
  136 |       await search.fill("函数");
  137 |       await panel.getByRole("button", { name: "选择 函数图像练习", exact: true }).click();
  138 |       await panel.getByRole("button", { name: "收藏 函数图像练习", exact: true }).click();
  139 |       await expect(panel.getByRole("button", { name: "选择 函数图像练习", exact: true })).toHaveAttribute("aria-pressed", "true");
  140 |       await panel.getByRole("button", { name: "创建学习单元", exact: true }).click();
  141 |       await expect(panel.getByRole("button", { name: "选择 函数图像练习", exact: true })).toBeDisabled();
  142 |       await expect(panel.getByRole("button", { name: "选择 函数单元测验", exact: true })).toBeDisabled();
  143 |       await expect(panel.getByRole("alert")).toContainText("请重试");
  144 |       await expect(search).toHaveValue("函数");
  145 |       await panel.getByRole("button", { name: "重试创建", exact: true }).click();
  146 |       await expect(panel).toHaveCount(0);
  147 |       await expect(trigger).toBeFocused();
  148 |     });
  149 | 
  150 |     test("navigation has the same explicit close policy for pointer and keyboard", async ({ page }) => {
  151 |       await openReview(page, candidate);
  152 |       const trigger = page.getByRole("button", { name: "课程操作", exact: true });
  153 |       await trigger.click();
  154 |       await page.getByRole("menuitem", { name: "查看视觉对照", exact: true }).click();
  155 |       await expect(page.getByRole("menu")).toHaveCount(0);
  156 |       await expect(page).toHaveURL(/#visual-review$/);
  157 |       await trigger.focus();
  158 |       await page.keyboard.press("ArrowDown");
  159 |       const link = page.getByRole("menuitem", { name: "查看视觉对照", exact: true });
  160 |       await link.focus();
  161 |       await page.keyboard.press("Enter");
  162 |       await expect(page.getByRole("menu")).toHaveCount(0);
  163 |     });
  164 | 
  165 |     test("outside click follows the destination without stealing focus", async ({ page }) => {
  166 |       await openReview(page, candidate);
  167 |       await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
  168 |       const destination = page.getByRole("textbox", { name: "外部焦点目标" });
  169 |       await destination.click();
  170 |       await expect(page.getByRole("dialog", { name: "选择学习模板" })).toHaveCount(0);
  171 |       await expect(destination).toBeFocused();
  172 |     });
  173 | 
  174 |     test("portals retain dark theme and avoid narrow viewport edges", async ({ page }) => {
  175 |       await page.setViewportSize({ width: 360, height: 800 });
  176 |       await openReview(page, candidate);
  177 |       await page.getByRole("button", { name: "深色", exact: true }).click();
  178 |       await page.getByRole("button", { name: "课程操作", exact: true }).click();
  179 |       const menu = page.getByRole("menu").first();
  180 |       const bounds = await menu.boundingBox();
  181 |       expect(bounds).not.toBeNull();
  182 |       expect(bounds!.x).toBeGreaterThanOrEqual(7);
  183 |       expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(353);
  184 |       await expect(menu).toHaveCSS("background-color", "rgb(30, 36, 59)");
  185 |       await page.keyboard.press("Escape");
  186 |       await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
  187 |       const panel = page.getByRole("dialog", { name: "选择学习模板" });
  188 |       const panelBounds = await panel.boundingBox();
  189 |       expect(panelBounds!.x).toBeGreaterThanOrEqual(7);
  190 |       expect(panelBounds!.x + panelBounds!.width).toBeLessThanOrEqual(353);
  191 |       await expect(panel).toHaveCSS("background-color", "rgb(30, 36, 59)");
  192 |       await page.screenshot({ path: `evidence/runtime/dropdown-batch-one/${candidate}-dark-narrow-panel.png` });
  193 |     });
  194 |   });
  195 | }
  196 | 
  197 | test("selected text and explanatory hierarchy follow the confirmed recipe", async ({ page }) => {
  198 |   await openReview(page);
  199 |   const selected = page.getByTestId("token-identity-selected");
  200 |   for (const [theme, color, descriptionColor, neutralDescription] of [["浅色", "rgb(15, 85, 223)", "rgb(21, 97, 248)", "rgb(86, 104, 143)"], ["深色", "rgb(124, 165, 255)", "rgb(81, 136, 255)", "rgb(148, 156, 184)"]] as const) {
  201 |     await page.getByRole("button", { name: theme, exact: true }).click();
```