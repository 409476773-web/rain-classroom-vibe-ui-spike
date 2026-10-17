# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bklit-catalog.spec.ts >> [P0] Rain chart catalog is a usable independent entry
- Location: tests/e2e/bklit-catalog.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Rain 图表库', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Rain 图表库', exact: true })

```

```yaml
- main:
  - paragraph: 雨课堂 · 教学示例
  - heading "课程空间" [level=1]
  - paragraph: 查看课程、学习进展与课堂提醒。
  - button "切换深色"
  - region "简单信息卡":
    - paragraph: 课程公告
    - article "课程公告":
      - heading "课程公告" [level=2]
      - paragraph: 今天 09:30 · 教学团队
      - text: 请在周五前完成第三单元学习。遇到问题时，可以先回看课堂案例，再整理到讨论区。
  - region "课程媒体卡":
    - paragraph: 课程介绍
    - article "统计学基础课程":
      - img "课程缺省封面"
      - heading "统计学基础" [level=2]
      - paragraph: 从课堂案例出发，理解数据背后的规律。
      - text: 专业基础 8 个单元 · 24 份资料 本学期教学资料
      - button "查看课程"
      - status
  - region "报表片段卡":
    - paragraph: 学习进展
    - article "学习完成率":
      - heading "学习完成率" [level=2]
      - paragraph: 第三单元
      - text: 83 % 按全部学习任务统计
  - region "含操作卡":
    - paragraph: 学习提醒
    - article "学习提醒":
      - heading "学习提醒" [level=2]
      - paragraph: 为学生准备一条清晰的学习提示。
      - button "更多操作"
      - text: 提醒标题
      - textbox "提醒标题": 本周学习提醒
      - text: 提醒对象
      - combobox "提醒对象": 全部学生
      - button "清除选中内容"
      - text: 已选：全部学生
      - status
      - button "保存提醒"
  - region "课程资料编辑":
    - heading "课程资料" [level=2]
    - paragraph: 设计方法与实践
    - paragraph: 研讨课
    - button "编辑课程资料"
    - status
    - paragraph: 虚构课程演示：每次打开后首次保存会模拟失败，重试可成功。有未保存修改时，取消会先请求确认。
  - article:
    - heading "课程设置" [level=2]
    - paragraph: 相关字段成组排列，窄容器中自然转为单列。
    - text: 课程名称
    - textbox "课程名称": 设计方法与实践
    - text: 主要教学方式
    - combobox "主要教学方式": 研讨课
    - text: 已选：研讨课 根据本学期的主要活动选择，详细安排可以在后续教学任务中调整。
    - status: 设置仅作用于本页的虚构课程。
    - button "重置"
    - button "保存设置"
  - article:
    - heading "课程资料" [level=2]
    - paragraph: 查找资料、查看内容，并在侧区保留正在编辑的草稿。
    - text: 查找资料
    - textbox "查找资料":
      - /placeholder: 输入资料名称
    - text: 资料类型
    - combobox "资料类型": 全部资料
    - button "清空筛选"
    - button "收起资料详情" [expanded]
    - region "资料列表":
      - heading "全部资料" [level=3]
      - text: 6 份资料
      - article:
        - heading "从观察开始：发现真实的学习问题" [level=4]
        - paragraph: 第 1 周 · 阅读与课堂讨论
        - paragraph: 从真实的学习场景出发，记录观察、交流和实践中的发现，整理值得继续讨论的问题。
        - button "查看《从观察开始：发现真实的学习问题》": 查看资料
      - article:
        - heading "课堂讨论与小组协作" [level=4]
        - paragraph: 第 2 周 · 阅读与课堂讨论
        - paragraph: 从真实的学习场景出发，记录观察、交流和实践中的发现，整理值得继续讨论的问题。
        - button "查看《课堂讨论与小组协作》": 查看资料
      - article:
        - heading "访谈记录与研究方法" [level=4]
        - paragraph: 第 3 周 · 阅读与课堂讨论
        - paragraph: 从真实的学习场景出发，记录观察、交流和实践中的发现，整理值得继续讨论的问题。
        - button "查看《访谈记录与研究方法》": 查看资料
      - article:
        - heading "把想法转化为可验证的方案" [level=4]
        - paragraph: 第 4 周 · 阅读与课堂讨论
        - paragraph: 从真实的学习场景出发，记录观察、交流和实践中的发现，整理值得继续讨论的问题。
        - button "查看《把想法转化为可验证的方案》": 查看资料
      - article:
        - heading "学习作品与同伴反馈" [level=4]
        - paragraph: 第 5 周 · 阅读与课堂讨论
        - paragraph: 从真实的学习场景出发，记录观察、交流和实践中的发现，整理值得继续讨论的问题。
        - button "查看《学习作品与同伴反馈》": 查看资料
      - article:
        - heading "阶段回顾与课程总结" [level=4]
        - paragraph: 第 6 周 · 阅读与课堂讨论
        - paragraph: 从真实的学习场景出发，记录观察、交流和实践中的发现，整理值得继续讨论的问题。
        - button "查看《阶段回顾与课程总结》": 查看资料
    - region "资料详情":
      - heading "资料详情" [level=3]
      - button "收起当前详情"
      - text: 资料标题
      - textbox "资料标题": 从观察开始：发现真实的学习问题
      - text: 收起详情后，尚未保存的内容仍会保留。 关联教学方式
      - combobox "关联教学方式": 研讨课
      - text: 已选：研讨课
      - heading "内容摘要" [level=4]
      - paragraph: 先观察课堂中发生了什么，再把记录转化为可以交流的材料。描述具体的情境、行动和变化，保留不同的观察角度。
      - paragraph: 完成阅读后，选择一项发现带入课堂讨论。可以用文字、图片或作品说明自己的判断依据。
      - heading "学习建议" [level=4]
      - paragraph: 将观察与解释分开记录，留意同伴的不同观点。课后回看自己的草稿，补充需要继续验证的问题。
      - button "保存资料草稿"
  - paragraph: 本页使用虚构数据，所有操作仅保留在当前页面。
```

# Test source

```ts
  1 | import { expect, test } from "@playwright/test";
  2 | 
  3 | test("[P0] Rain chart catalog is a usable independent entry", async ({ page }) => {
  4 |   await page.goto("/bklit-catalog.html");
> 5 |   await expect(page.getByRole("heading", { name: "Rain 图表库", exact: true })).toBeVisible({ timeout: 5000 });
    |                                                                              ^ Error: expect(locator).toBeVisible() failed
  6 |   await expect(page.getByRole("navigation", { name: "图型目录" }).getByRole("link")).toHaveCount(17);
  7 |   await expect(page.locator('[data-rain-id="chart-area"] svg').first()).toBeVisible();
  8 | });
  9 | 
```