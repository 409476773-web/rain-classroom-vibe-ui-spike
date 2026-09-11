# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dropdown-batch-one.spec.ts >> radix >> Tab leaves the non-modal menu for the next page control
- Location: tests/e2e/dropdown-batch-one.spec.ts:93:5

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
        - paragraph [ref=e118]: 已选主文字和解释都使用主题色；主文字 600，解释 400。不可用的已选项保留选中事实。
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
          - generic [ref=e126]:
            - checkbox "操作后关闭" [ref=e127]
            - text: 操作后关闭
          - generic [ref=e128]: “记录稍后处理”单独保持打开。
        - generic [ref=e130]:
          - button "课程操作" [expanded] [ref=e131] [cursor=pointer]
          - button "新建学习单元" [ref=e134] [cursor=pointer]
          - combobox "课程范围" [ref=e137]:
            - generic: 全部课程
        - status [ref=e140]: 选择一个操作，查看交互结果。
        - generic [ref=e142]:
          - text: 外部焦点目标
          - textbox "外部焦点目标" [ref=e144]:
            - /placeholder: 浮层打开时，点击这里
        - paragraph [ref=e146]: 模板首次创建会演示失败；重试后成功，用于检查选择与搜索是否保留。
      - region [ref=e147]:
        - generic [ref=e148]:
          - heading "长内容，也要读得完整" [level=2] [ref=e149]
          - paragraph [ref=e150]: 标题最多两行；关键范围和不可用原因完整放在说明中。
        - generic [ref=e151]:
          - generic [ref=e152]:
            - paragraph [ref=e153]: 220px 宽度样本
            - generic [ref=e154]:
              - button "将当前课程的完整教学资料复制到新的教学班级中" [ref=e155] [cursor=pointer]
              - button "选择教学模板 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。" [ref=e159] [cursor=pointer]:
                - generic [ref=e160]:
                  - generic [ref=e161]: 选择教学模板
                  - generic [ref=e162]: 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。
          - generic [ref=e163]:
            - paragraph [ref=e164]: 282px 宽度样本
            - generic [ref=e165]:
              - button "将当前课程的完整教学资料复制到新的教学班级中" [ref=e166] [cursor=pointer]
              - button "选择教学模板 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。" [ref=e170] [cursor=pointer]:
                - generic [ref=e171]:
                  - generic [ref=e172]: 选择教学模板
                  - generic [ref=e173]: 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。
          - generic [ref=e174]:
            - paragraph [ref=e175]: 340px 宽度样本
            - generic [ref=e176]:
              - button "将当前课程的完整教学资料复制到新的教学班级中" [ref=e177] [cursor=pointer]
              - button "选择教学模板 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。" [ref=e181] [cursor=pointer]:
                - generic [ref=e182]:
                  - generic [ref=e183]: 选择教学模板
                  - generic [ref=e184]: 按照教学目标组织预习、课堂练习与课后反馈，允许继续调整。
        - generic [ref=e185]:
          - button "清理已归档资料 操作范围：2026级工业设计专业全部教学班，以及这些教学班关联的课堂讨论、作业附件和教师批改记录。" [ref=e187] [cursor=pointer]:
            - generic [ref=e190]:
              - generic [ref=e191]: 清理已归档资料
              - generic [ref=e192]: 操作范围：2026级工业设计专业全部教学班，以及这些教学班关联的课堂讨论、作业附件和教师批改记录。
          - button "导出学生成绩 你目前是课程协作教师，尚未获得成绩导出权限。请联系课程负责人开启权限后再操作，已有成绩不会因此改变。" [disabled] [ref=e194]:
            - generic [ref=e195]:
              - generic [ref=e196]: 导出学生成绩
              - generic [ref=e197]: 你目前是课程协作教师，尚未获得成绩导出权限。请联系课程负责人开启权限后再操作，已有成绩不会因此改变。
      - generic [ref=e198]: 第一批局部样本 · 视觉对照与交互底座验证 · 公共组件尚未发布
  - menu "课程操作" [ref=e200]:
    - menuitem "查看课程" [active] [ref=e201] [cursor=pointer]
    - menuitem "记录稍后处理" [ref=e204] [cursor=pointer]:
      - generic [ref=e207]: 保持打开
    - separator [ref=e208]
    - group [ref=e209]:
      - generic [ref=e210]: 视图设置
      - menuitemcheckbox "显示已归档" [ref=e211] [cursor=pointer]
      - menuitemcheckbox "保留教师资料" [checked] [disabled] [ref=e215]:
        - generic [ref=e218]:
          - generic [ref=e219]: 保留教师资料
          - generic [ref=e220]: 管理员已锁定此项，当前设置仍然生效。
    - group [ref=e221]:
      - menuitemradio "按时间排序" [checked] [ref=e222] [cursor=pointer]
      - menuitemradio "按名称排序" [ref=e227] [cursor=pointer]
    - separator [ref=e231]
    - menuitem "导出" [ref=e232] [cursor=pointer]
    - menuitem "查看视觉对照" [ref=e236] [cursor=pointer]
    - menuitem "编辑课程" [ref=e239] [cursor=pointer]
    - menuitem "删除课程" [ref=e242] [cursor=pointer]
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
  48  |       test.fail(candidate === "radix", "Recorded native contract gap: Radix closes the complete menu tree on submenu Escape; Base UI must pass.");
  49  |       await openReview(page, candidate);
  50  |       await page.getByRole("button", { name: "课程操作", exact: true }).click();
  51  |       const sub = page.getByRole("menuitem", { name: "导出", exact: true });
  52  |       await sub.focus();
  53  |       await page.keyboard.press("ArrowRight");
  54  |       await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toBeVisible();
  55  |       await page.keyboard.press("Escape");
  56  |       await expect(page.getByRole("menuitem", { name: "导出当前视图", exact: true })).toHaveCount(0);
  57  |       await expect(sub).toBeFocused();
  58  |       await expect(page.getByRole("menu")).toHaveCount(1);
  59  |     });
  60  | 
  61  |     test("dialog receives focus from menu and contains long content", async ({ page }) => {
  62  |       await openReview(page, candidate);
  63  |       const trigger = page.getByRole("button", { name: "课程操作", exact: true });
  64  |       await trigger.click();
  65  |       await page.getByRole("menuitem", { name: "编辑课程", exact: true }).click();
  66  |       const dialog = page.getByRole("dialog", { name: "编辑课程" });
  67  |       await expect(dialog).toBeVisible();
  68  |       await expect(page.getByLabel("课程名称", { exact: true })).toBeFocused();
  69  |       await page.getByRole("button", { name: "保存课程", exact: true }).focus();
  70  |       await page.keyboard.press("Tab");
  71  |       await expect(page.getByLabel("课程名称", { exact: true })).toBeFocused();
  72  |       await page.keyboard.press("Escape");
  73  |       await expect(dialog).toHaveCount(0);
  74  |       await expect(trigger).toBeFocused();
  75  |     });
  76  | 
  77  |     test("select keeps controlled value and skips disabled options", async ({ page }) => {
  78  |       await openReview(page, candidate);
  79  |       const select = page.getByRole("combobox", { name: "课程范围" });
  80  |       await select.focus();
  81  |       await page.keyboard.press("ArrowDown");
  82  |       await expect(page.getByRole("listbox")).toBeVisible();
  83  |       await page.keyboard.press("End");
  84  |       await page.keyboard.press("Enter");
  85  |       await expect(select).toContainText("仅我创建");
  86  |       await expect(select).toBeFocused();
  87  |       await select.click();
  88  |       await expect(page.getByRole("option", { name: "已停用课程" })).toHaveAttribute("aria-disabled", "true");
  89  |       await page.keyboard.press("Escape");
  90  |       await expect(select).toContainText("仅我创建");
  91  |     });
  92  | 
  93  |     test("Tab leaves the non-modal menu for the next page control", async ({ page }) => {
  94  |       await openReview(page, candidate);
  95  |       const trigger = page.getByRole("button", { name: "课程操作", exact: true });
  96  |       await trigger.focus();
  97  |       await page.keyboard.press("ArrowDown");
  98  |       await page.keyboard.press("Tab");
> 99  |       await expect(page.getByRole("menu")).toHaveCount(0);
      |                                            ^ Error: expect(locator).toHaveCount(expected) failed
  100 |       await expect(page.getByRole("button", { name: "新建学习单元", exact: true })).toBeFocused();
  101 |     });
  102 | 
  103 |     test("dialog backdrop dismisses and restores its originating trigger", async ({ page }) => {
  104 |       await openReview(page, candidate);
  105 |       await page.getByRole("button", { name: "课程操作", exact: true }).click();
  106 |       await page.getByRole("menuitem", { name: "编辑课程", exact: true }).click();
  107 |       await expect(page.getByRole("dialog", { name: "编辑课程" })).toBeVisible();
  108 |       await page.mouse.click(10, 10);
  109 |       await expect(page.getByRole("dialog", { name: "编辑课程" })).toHaveCount(0);
  110 |       await expect(page.getByRole("button", { name: "课程操作", exact: true })).toBeFocused();
  111 |     });
  112 | 
  113 |     test("mixed panel permits keyboard access to independent controls and an empty result", async ({ page }) => {
  114 |       await openReview(page, candidate);
  115 |       await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
  116 |       const panel = page.getByRole("dialog", { name: "选择学习模板" });
  117 |       const search = panel.getByRole("textbox", { name: "搜索模板" });
  118 |       await page.keyboard.press("Tab");
  119 |       await expect(panel.getByRole("button", { name: "全部", exact: true })).toBeFocused();
  120 |       await search.fill("不存在的模板");
  121 |       await expect(panel.getByRole("status")).toContainText("没有匹配的模板");
  122 |       await expect(panel.getByRole("button", { name: "创建学习单元", exact: true })).toBeDisabled();
  123 |       await page.keyboard.press("Escape");
  124 |       await expect(page.getByRole("button", { name: "新建学习单元", exact: true })).toBeFocused();
  125 |     });
  126 | 
  127 |     test("mixed panel preserves search and selection on failure and permits retry", async ({ page }) => {
  128 |       await openReview(page, candidate);
  129 |       const trigger = page.getByRole("button", { name: "新建学习单元", exact: true });
  130 |       await trigger.click();
  131 |       const panel = page.getByRole("dialog", { name: "选择学习模板" });
  132 |       const search = panel.getByRole("textbox", { name: "搜索模板" });
  133 |       await expect(search).toBeFocused();
  134 |       await search.fill("函数");
  135 |       await panel.getByRole("button", { name: "选择 函数图像练习", exact: true }).click();
  136 |       await panel.getByRole("button", { name: "收藏 函数图像练习", exact: true }).click();
  137 |       await expect(panel.getByRole("button", { name: "选择 函数图像练习", exact: true })).toHaveAttribute("aria-pressed", "true");
  138 |       await panel.getByRole("button", { name: "创建学习单元", exact: true }).click();
  139 |       await expect(panel.getByRole("alert")).toContainText("请重试");
  140 |       await expect(search).toHaveValue("函数");
  141 |       await panel.getByRole("button", { name: "重试创建", exact: true }).click();
  142 |       await expect(panel).toHaveCount(0);
  143 |       await expect(trigger).toBeFocused();
  144 |     });
  145 | 
  146 |     test("outside click follows the destination without stealing focus", async ({ page }) => {
  147 |       await openReview(page, candidate);
  148 |       await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
  149 |       const destination = page.getByRole("textbox", { name: "外部焦点目标" });
  150 |       await destination.click();
  151 |       await expect(page.getByRole("dialog", { name: "选择学习模板" })).toHaveCount(0);
  152 |       await expect(destination).toBeFocused();
  153 |     });
  154 | 
  155 |     test("portals retain dark theme and avoid narrow viewport edges", async ({ page }) => {
  156 |       await page.setViewportSize({ width: 360, height: 800 });
  157 |       await openReview(page, candidate);
  158 |       await page.getByRole("button", { name: "深色", exact: true }).click();
  159 |       await page.getByRole("button", { name: "课程操作", exact: true }).click();
  160 |       const menu = page.getByRole("menu").first();
  161 |       const bounds = await menu.boundingBox();
  162 |       expect(bounds).not.toBeNull();
  163 |       expect(bounds!.x).toBeGreaterThanOrEqual(7);
  164 |       expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(353);
  165 |       await expect(menu).toHaveCSS("background-color", "rgb(30, 36, 59)");
  166 |       await page.keyboard.press("Escape");
  167 |       await page.getByRole("button", { name: "新建学习单元", exact: true }).click();
  168 |       const panel = page.getByRole("dialog", { name: "选择学习模板" });
  169 |       const panelBounds = await panel.boundingBox();
  170 |       expect(panelBounds!.x).toBeGreaterThanOrEqual(7);
  171 |       expect(panelBounds!.x + panelBounds!.width).toBeLessThanOrEqual(353);
  172 |       await expect(panel).toHaveCSS("background-color", "rgb(30, 36, 59)");
  173 |     });
  174 |   });
  175 | }
  176 | 
  177 | test("selected text and explanatory hierarchy follow the confirmed recipe", async ({ page }) => {
  178 |   await openReview(page);
  179 |   const selected = page.getByTestId("token-identity-selected");
  180 |   await expect(selected.locator("[data-slot=label]")).toHaveCSS("font-weight", "600");
  181 |   await expect(selected.locator("[data-slot=description]")).toHaveCSS("font-weight", "400");
  182 |   await expect(selected.locator("[data-slot=label]")).toHaveCSS("color", "rgb(15, 85, 223)");
  183 |   await expect(selected.locator("[data-slot=description]")).toHaveCSS("color", "rgb(15, 85, 223)");
  184 |   const disabled = page.getByTestId("token-selected-disabled");
  185 |   await expect(disabled.locator("[data-slot=label]")).toHaveCSS("color", "rgb(15, 85, 223)");
  186 |   await expect(page.getByTestId("token-description").locator("[data-slot=label]")).toHaveCSS("font-weight", "600");
  187 | });
  188 | 
  189 | test("critical descriptions grow and shared keyboard focus survives forced colors", async ({ page }) => {
  190 |   await openReview(page);
  191 |   const reason = page.getByTestId("token-critical-reason");
  192 |   await expect(reason.locator("[data-slot=description]")).toHaveCSS("-webkit-line-clamp", "none");
  193 |   await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  194 |   const item = page.getByTestId("token-identity-selected");
  195 |   await item.focus();
  196 |   await expect(item).toHaveCSS("outline-width", "2px");
  197 |   await expect(item).toHaveCSS("box-shadow", "none");
  198 | });
  199 | 
```