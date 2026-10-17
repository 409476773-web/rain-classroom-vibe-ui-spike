# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bm-b.spec.ts >> visual: Dialog spacing and surfaces across form presentations
- Location: tests/e2e/bm-b.spec.ts:10:1

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=f12e1]:
  - main [ref=f12e4]:
    - generic [ref=f12e5]:
      - generic [ref=f12e6]:
        - heading [level=1] [ref=f12e7]: 教材资料
        - paragraph [ref=f12e8]: 组织教材信息，为课程准备阅读材料。
      - button [ref=f12e9] [cursor=pointer]:
        - generic [ref=f12e10]: 切换浅色
    - region [ref=f12e11]:
      - article [ref=f12e12]:
        - heading [level=2] [ref=f12e14]: 设计方法与实践
        - generic [ref=f12e16]:
          - paragraph [ref=f12e17]: 设计学 · 教学示例编写组 · 示例出版社
          - paragraph [ref=f12e18]: 从观察真实问题开始，学习调研、构思与原型验证。 结合课堂讨论和实践项目，形成有依据的设计判断。
          - paragraph [ref=f12e19]: 尚未添加附件
          - button [expanded] [ref=f12e20] [cursor=pointer]:
            - generic [ref=f12e21]: 编辑教材
      - group [ref=f12e22]:
        - generic [ref=f12e23] [cursor=pointer]: 演示选项
      - paragraph [ref=f12e24]: 虚构教材示例。保存与上传均为本地模拟，刷新页面后恢复初始内容。
  - dialog [ref=f12e28]:
    - generic [ref=f12e29]:
      - generic [ref=f12e30]:
        - generic [ref=f12e31]:
          - generic [ref=f12e32]:
            - heading "编辑教材" [level=2] [ref=f12e33]
            - generic "表单布局" [ref=f12e34]:
              - generic [ref=f12e35] [cursor=pointer]:
                - checkbox "宽版容器" [ref=f12e36]
                - generic [ref=f12e39]: 宽版容器
              - generic [ref=f12e41] [cursor=pointer]:
                - checkbox "双列布局" [active] [ref=f12e42]
                - generic [ref=f12e45]: 双列布局
          - button "关闭教材编辑" [ref=f12e47] [cursor=pointer]
        - paragraph [ref=f12e50]: 完善教材信息与阅读材料，保存后更新课程教材。
      - form "教材表单" [ref=f12e52]:
        - generic [ref=f12e53]:
          - region [ref=f12e54]:
            - heading "基本信息" [level=3] [ref=f12e55]
            - generic [ref=f12e56]:
              - generic [ref=f12e57]:
                - generic [ref=f12e58]:
                  - text: 教材标题
                  - generic [ref=f12e59]: "*"
                - generic [ref=f12e60]:
                  - textbox "教材标题" [ref=f12e61]:
                    - /placeholder: 请输入教材标题
                    - text: 设计方法与实践
                  - generic [ref=f12e63]: 7/80
              - generic [ref=f12e64]:
                - generic [ref=f12e65]:
                  - generic [ref=f12e66]: 作者
                  - generic [ref=f12e67]:
                    - textbox "作者" [ref=f12e68]: 教学示例编写组
                    - generic [ref=f12e70]: 7/80
                - generic [ref=f12e71]:
                  - generic [ref=f12e72]: 出版社
                  - generic [ref=f12e73]:
                    - textbox "出版社" [ref=f12e74]: 示例出版社
                    - generic [ref=f12e76]: 5/80
                - generic [ref=f12e77]:
                  - generic [ref=f12e78]:
                    - text: 所属学科
                    - generic [ref=f12e79]: "*"
                  - generic [ref=f12e80]:
                    - generic [ref=f12e81]:
                      - combobox "所属学科" [ref=f12e82] [cursor=pointer]:
                        - generic "设计学" [ref=f12e84]
                      - button "清除所属学科" [ref=f12e86] [cursor=pointer]
                    - generic [ref=f12e92]: 已选：设计学
                  - textbox [ref=f12e93]: design
          - region [ref=f12e94]:
            - heading "简介" [level=3] [ref=f12e95]
            - generic [ref=f12e96]:
              - generic [ref=f12e97]:
                - generic [ref=f12e98]:
                  - text: 内容简介
                  - generic [ref=f12e99]: "*"
                - textbox "内容简介" [ref=f12e101]: 从观察真实问题开始，学习调研、构思与原型验证。 结合课堂讨论和实践项目，形成有依据的设计判断。
                - generic [ref=f12e102]: 介绍主要内容与学习目标，最多 2000 个字符。
              - generic [ref=f12e103]:
                - generic [ref=f12e104]:
                  - generic [ref=f12e105]: 作者简介
                  - textbox "作者简介" [ref=f12e107]: 由课程教学团队共同编写，供教学演示使用。
                - generic [ref=f12e108]:
                  - generic [ref=f12e109]: 本书特色
                  - textbox "本书特色" [ref=f12e111]: 以真实任务组织学习，连接方法、案例与课堂实践。
          - region [ref=f12e112]:
            - heading "目录" [level=3] [ref=f12e113]
            - generic [ref=f12e114]:
              - generic [ref=f12e115]: 目录内容
              - textbox "目录内容" [ref=f12e117]: 第一章 观察与提问 第二章 理解使用者 第三章 构思与表达 第四章 原型与验证
              - generic [ref=f12e118]: 按章节分行填写，最多 4000 个字符。
          - region [ref=f12e119]:
            - heading "教材内容 / 附件" [level=3] [ref=f12e120]
            - generic [ref=f12e121]:
              - paragraph [ref=f12e122]: 支持 PDF、PNG、JPEG，最多 10 个，每个不超过 20 MB。本演示仅模拟上传，不传输文件内容。
              - button "添加教材附件" [ref=f12e123] [cursor=pointer]
              - list "附件列表"
      - generic [ref=f12e125]:
        - status [ref=f12e127]: 修改将在保存后生效
        - generic [ref=f12e128]:
          - button "取消" [ref=f12e129] [cursor=pointer]
          - button "保存教材" [ref=f12e131] [cursor=pointer]
```