# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: table.spec.ts >> two toolbar rows keep the primary action fixed across views, filters and selection
- Location: tests/e2e/table.spec.ts:457:1

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - link "返回组件" [ref=e7] [cursor=pointer]:
        - /url: "#components"
      - heading "表格与数据管理" [level=1] [ref=e9]
      - paragraph [ref=e10]: 用表格扫描信息，用筛选缩小范围，再对选中的资料进行操作。
      - generic [ref=e11]: 待评审候选
    - generic "预览设置" [ref=e15]:
      - generic [ref=e16] [cursor=pointer]:
        - checkbox "深色主题" [ref=e17]
        - generic [ref=e20]: 深色主题
      - generic [ref=e22] [cursor=pointer]:
        - checkbox "紧凑密度" [ref=e23]
        - generic [ref=e26]: 紧凑密度
    - article [ref=e28]:
      - generic [ref=e29]:
        - heading "课程资料库" [level=2] [ref=e30]
        - paragraph [ref=e31]: 查找教学资料，查看发布状态，并对选中的资料批量操作。
      - generic [ref=e33]:
        - generic [ref=e34]:
          - group [ref=e35]:
            - generic [ref=e36]:
              - group "资料视图" [ref=e37]:
                - button "表格视图" [ref=e38] [cursor=pointer]:
                  - generic [ref=e41]: 表格
                - button "卡片视图" [pressed] [ref=e42] [cursor=pointer]:
                  - generic [ref=e45]: 卡片
              - generic [ref=e46]:
                - generic [ref=e50]:
                  - generic "查找资料" [ref=e51]
                  - textbox "查找资料" [ref=e55]:
                    - /placeholder: 输入资料名称
                    - text: 教学案例
                  - button "搜索" [ref=e58] [cursor=pointer]
                - generic [ref=e61]:
                  - generic [ref=e62]:
                    - generic [ref=e63]:
                      - generic "发布状态" [ref=e64]
                      - combobox "发布状态" [ref=e66] [cursor=pointer]:
                        - generic "全部状态" [ref=e68]
                    - generic [ref=e72]: 已选：全部状态
                  - textbox [ref=e73]: all
                - button "清空筛选" [ref=e74] [cursor=pointer]
          - group "资料操作" [ref=e78]:
            - generic [ref=e79]:
              - generic [ref=e80]:
                - generic [ref=e81] [cursor=pointer]:
                  - checkbox "选择当前页可操作资料" [checked] [ref=e82]
                  - generic [ref=e86]: 选择当前页
                - generic [ref=e88]: 筛选结果 1 份
                - button "选择规则说明" [ref=e89] [cursor=pointer]
              - generic [ref=e92]:
                - button "刷新资料" [ref=e94] [cursor=pointer]
                - button "按资料名称排序" [ref=e97] [cursor=pointer]:
                  - generic [ref=e100]: 默认顺序
            - generic [ref=e103]:
              - generic [ref=e104]: 已选 1 份资料
              - button "取消选择" [ref=e106] [cursor=pointer]
              - button "标为已发布" [ref=e108] [cursor=pointer]
        - generic [ref=e110]: 全选仅作用于当前页可操作资料。翻页或切换视图后，已选资料仍会保留。
        - status [ref=e111]
        - generic "课程资料卡片" [ref=e113]:
          - article [ref=e114]:
            - generic [ref=e115]:
              - checkbox "选择 教学案例研读" [checked] [active] [ref=e117]
              - heading "教学案例研读" [level=3] [ref=e121]
              - button "更多操作 教学案例研读" [ref=e123] [cursor=pointer]
            - generic [ref=e127]:
              - generic [ref=e128]:
                - generic [ref=e129]: 阅读材料
                - generic [ref=e132]: 草稿
              - time [ref=e135]: 更新于 2026-09-11
        - navigation "分页" [ref=e136]:
          - generic [ref=e137]: 共 1 条
          - generic [ref=e139]:
            - list [ref=e141]:
              - listitem [ref=e142]:
                - button "上一页" [disabled] [ref=e143]
              - listitem [ref=e146]:
                - button "第 1 页" [ref=e147] [cursor=pointer]: "1"
              - listitem [ref=e148]:
                - button "下一页" [disabled] [ref=e149]
            - button "分页设置" [ref=e152] [cursor=pointer]:
              - generic [ref=e153]: "5"
              - generic [ref=e154]: 条/页
        - group [ref=e157]:
          - generic "试用加载与空数据状态" [ref=e158] [cursor=pointer]
        - paragraph [ref=e159]: 数据均为虚构；批量操作只在本页生效，刷新页面后恢复。
    - group [ref=e160]:
      - generic "使用与组合边界" [ref=e161] [cursor=pointer]
```