# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dropdown.spec.ts >> light menu description closure preserves protected state priorities
- Location: tests/e2e/dropdown.spec.ts:281:49

# Error details

```
Error: page.evaluate: Error: Cannot resolve the playground's React and public UI modules.
    at eval (eval at evaluate (:311:30), <anonymous>:10:50)
    at async <anonymous>:337:30
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - heading "Dropdown 下拉菜单" [level=1] [ref=e8]
    - paragraph [ref=e9]: 选择一份完整用法，再按任务替换内容。以下操作使用演示数据。
    - generic "预览设置" [ref=e10]:
      - button "浅色" [pressed] [ref=e11] [cursor=pointer]
      - button "深色" [ref=e13] [cursor=pointer]
      - button "紧凑密度" [ref=e15] [cursor=pointer]
      - generic [ref=e17] [cursor=pointer]:
        - checkbox "操作后关闭" [checked] [ref=e18]
        - generic [ref=e22]: 操作后关闭
  - region [ref=e24]:
    - heading "课程卡片 · 更多操作" [level=2] [ref=e25]
    - generic [ref=e26]:
      - generic [ref=e27]:
        - heading "设计方法与实践" [level=3] [ref=e28]
        - paragraph [ref=e29]: 12 个学习单元 · 36 名学习者 · 演示课程
      - button "课程更多" [ref=e30] [cursor=pointer]
  - region [ref=e33]:
    - heading "表格 · 视图设置" [level=2] [ref=e34]
    - paragraph [ref=e35]: 连续调整时保持打开；“完成设置”单独关闭。
    - generic [ref=e36]:
      - button "视图设置" [ref=e37] [cursor=pointer]
      - button "视图设置面板版" [ref=e40] [cursor=pointer]
    - status [ref=e42]: 隐藏已归档 · 按时间排序
  - region [ref=e43]:
    - heading "新建学习单元 · 类型与模板" [level=2] [ref=e44]
    - paragraph [ref=e45]: 常规操作从菜单开始；模板选择在独立面板里完成。
    - generic [ref=e46]:
      - button "新建学习单元" [ref=e47] [cursor=pointer]
      - button "浏览模板" [ref=e50] [cursor=pointer]
  - generic [ref=e52]:
    - status [ref=e53]: 尚未操作
    - textbox "菜单外输入" [ref=e55]:
      - /placeholder: 可点击此处离开菜单
  - region [ref=e57]:
    - heading "使用与改造边界" [level=2] [ref=e58]
    - paragraph [ref=e59]: 操作、链接和单选/复选设置使用 DropdownMenu；有搜索、预览或独立按钮的内容使用 Popover。默认使用完整示例，需要时替换触发器、条目内容或面板区域。
    - paragraph [ref=e60]: 菜单建议从 200/280px 开始，内容面板从 320/360px 开始；宽度可按内容调整。Escape、Tab 与外部点击各自保留退出规则。
    - paragraph [ref=e61]: 当前为未发布候选，运行视觉已完成人工验收。颜色用途问题独立保留；演示首次创建会失败，重试后成功。
```