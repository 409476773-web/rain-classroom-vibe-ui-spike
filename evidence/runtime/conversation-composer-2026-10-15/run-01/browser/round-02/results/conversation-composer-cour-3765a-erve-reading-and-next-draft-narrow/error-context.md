# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> course scroll, prepend, manual expansion and stop preserve reading and next draft
- Location: tests/e2e/conversation-composer.spec.ts:72:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('.g6-course-shell').getByRole('button', { name: '返回最新', exact: true })
Expected: "false"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('.g6-course-shell').getByRole('button', { name: '返回最新', exact: true })

```

```yaml
- main:
  - link "返回组件目录":
    - /url: "#components"
  - heading "Message Scroller 会话滚动" [level=1]
  - text: UI · 文档页试改 · 公共组件待评审
  - paragraph: 在新消息增长和阅读历史之间保持清楚的滚动控制。
  - button "浅色" [pressed]
  - button "深色"
  - button "紧凑密度"
  - paragraph:
    - text: 输入能力与状态见
    - link "ConversationComposer 对话输入":
      - /url: "#conversation-composer"
    - text: 。
  - heading "课程辅导对话" [level=2]
  - paragraph: 阅读、查看来源与继续提问连成一条主路径；请求与资料均为本地示例。
  - region "课程答疑样板":
    - text: 课堂观察 · 第 04 讲
    - heading "从事实出发，读懂课堂" [level=3]
    - text: 本地示例
    - region "课程答疑记录":
      - button "已显示本页全部记录" [disabled]
      - log:
        - strong: 我
        - paragraph: 为什么观察记录需要写清时间和场景？
        - group "课程助教回答":
          - strong: 课程助教
          - text: 课程辅导
          - heading "先记录看见的，再解释它" [level=4]
          - paragraph: 事实是可以被再次核对的观察记录；解释是你根据这些记录作出的判断。把两者分开写，并不是不允许解释，而是让读者知道：哪些内容已经发生，哪些仍需要证据支持。
          - heading "用三步完成一次课堂观察" [level=4]
          - list:
            - listitem: 写清时间、人物与行为。例如：教师提出问题后，三位同学举手，其中两位解释了自己的解题步骤。尽量记录原话与动作，暂时不用“积极”“理解了”等概括。
            - listitem: 单列自己的解释。例如：这些同学可能理解了这一方法。使用“可能”“我推测”让判断的性质更清楚，同时写出你的依据。
            - listitem: 补一条需要核对的问题。没有举手的同学是否也理解了？可以观察随后的独立练习，或请不同同学说明理由，而不是仅用举手人数得出结论。
          - heading "把判断留给更多证据" [level=4]
          - paragraph: 一次行为可能有不同原因。学生没有发言，可能正在思考，也可能没有听清问题。比较课堂发言、练习过程与课后反馈，才能逐步检验最初的解释。记录时保留不确定性，是让结论更可靠的一部分。
          - region "事实与解释对照":
            - table:
              - rowgroup:
                - row "记录类型 示例":
                  - columnheader "记录类型"
                  - columnheader "示例"
              - rowgroup:
                - row "事实 三位同学举手。":
                  - rowheader "事实"
                  - cell "三位同学举手。"
                - row "解释 他们可能理解了。":
                  - rowheader "解释"
                  - cell "他们可能理解了。"
                - row "待验证 其他同学能否独立完成练习？":
                  - rowheader "待验证"
                  - cell "其他同学能否独立完成练习？"
          - button "参考资料 · 2 份"
          - button "复制此回答": 复制
          - button "有帮助"
          - status
        - strong: 我
        - paragraph: 课堂观察中，怎样区分事实与解释？能用一个例子说明吗？
        - button "查看完整文件名：课堂观察记录与同伴反馈说明.pdf": 课堂观察记录与同伴反馈说明.pdf
        - text: 课程资料 · 仅本页使用
        - group "课程助教回答":
          - strong: 课程助教
          - text: 课程辅导
          - heading "先记录看见的，再解释它" [level=4]
          - paragraph: 事实是可以被再次核对的观察记录；解释是你根据这些记录作出的判断。把两者分开写，并不是不允许解释，而是让读者知道：哪些内容已经发生，哪些仍需要证据支持。
          - heading "用三步完成一次课堂观察" [level=4]
          - list:
            - listitem: 写清时间、人物与行为。例如：教师提出问题后，三位同学举手，其中两位解释了自己的解题步骤。尽量记录原话与动作，暂时不用“积极”“理解了”等概括。
            - listitem: 单列自己的解释。例如：这些同学可能理解了这一方法。使用“可能”“我推测”让判断的性质更清楚，同时写出你的依据。
            - listitem: 补一条需要核对的问题。没有举手的同学是否也理解了？可以观察随后的独立练习，或请不同同学说明理由，而不是仅用举手人数得出结论。
          - heading "把判断留给更多证据" [level=4]
          - paragraph: 一次行为可能有不同原因。学生没有发言，可能正在思考，也可能没有听清问题。比较课堂发言、练习过程与课后反馈，才能逐步检验最初的解释。记录时保留不确定性，是让结论更可靠的一部分。
          - region "事实与解释对照":
            - table:
              - rowgroup:
                - row "记录类型 示例":
                  - columnheader "记录类型"
                  - columnheader "示例"
              - rowgroup:
                - row "事实 三位同学举手。":
                  - rowheader "事实"
                  - cell "三位同学举手。"
                - row "解释 他们可能理解了。":
                  - rowheader "解释"
                  - cell "他们可能理解了。"
                - row "待验证 其他同学能否独立完成练习？":
                  - rowheader "待验证"
                  - cell "其他同学能否独立完成练习？"
          - button "参考资料 · 2 份"
          - button "复制此回答": 复制
          - button "有帮助"
          - status
        - strong: 我
        - paragraph: 解释一段新的课堂观察。
        - group "课程助教回答":
          - strong: 课程助教
          - text: 课程辅导 已停止生成，回答尚未完成
          - paragraph: 先记录看见的，再解释它 事实是可以被再次核对的观察记录；解释是你根据这些记录作出的判断。把两者分开写，并不是不允许解释，而是让读者知道：哪些内容已经发生，哪些仍需要证据支持。 用三步完成一次
          - button "复制此回答": 复制
          - button "重新生成此回答": 重新生成
          - status
    - form "课程提问":
      - textbox "输入课程问题":
        - /placeholder: 结合课程内容，写下你的问题…
        - text: 停止后保留的下一问
      - button "添加资料"
      - button "选择搜索范围": 全部课程资料
      - button "收起输入框" [expanded]
      - button "开始语音输入"
      - button "发送问题"
    - paragraph: 本地示例 · 上传、课程资料、转写与回答均为模拟。Enter 换行，点击发送。
  - group: 演示控制
  - heading "课堂讨论" [level=2]
  - paragraph: 作者分组、短引用与回复输入保持连续阅读；新内容不打断历史阅读。
  - region "课堂讨论样板":
    - text: 课堂观察 · 教学研讨班
    - heading "哪些是事实，哪些是解释？" [level=3]
    - text: 本地示例
    - region "课堂讨论记录":
      - button "加载更早讨论"
      - log:
        - text: 今天 · 课堂讨论
        - strong: 张老师
        - text: 教师
        - time: 10:24
        - paragraph: 请描述一个你在课堂上观察到的片段。先写事实，再说说你的解释，以及准备怎样验证。
        - button "回复张老师的消息": 回复
        - button "赞同张老师的消息": 赞同
        - strong: 李同学
        - time: 10:26
        - paragraph: 小组讨论开始后，有三位同学轮流解释各自的解题步骤，另一位同学在做记录。
        - button "回复李同学的消息": 回复
        - button "赞同李同学的消息": 赞同
        - paragraph: 我最初认为他们已经理解了，但还需要看看每个人能否独立完成下一题。
        - button "回复李同学的消息": 回复
        - button "赞同李同学的消息": 赞同
        - strong: 王同学
        - time: 10:28
        - button "李同学 另一位同学在做记录。":
          - strong: 李同学
          - text: 另一位同学在做记录。
        - paragraph: 我会把“做了记录”和“已经理解”分开写。记录本身不能证明理解，还需要听听他怎样解释。
        - button "回复王同学的消息": 回复
        - button "赞同王同学的消息": 赞同
    - form "发送课堂讨论":
      - textbox "输入讨论内容":
        - /placeholder: 写下你的观察与思考…
      - button "添加资料"
      - button "展开输入框"
      - button "开始语音输入"
      - button "发送讨论" [disabled]
      - status: 请先输入内容
    - status: 本地示例 · 上传、转写与发送均为模拟。Enter 换行，点击发送。
  - group: 演示控制
  - heading "空会话与定位 API" [level=2]
  - paragraph: 载入后以last-anchor打开，系统标记是锚点；四种align与缺失ID均调用真实引擎。autoScroll保留默认关闭。
  - button "载入锚点存档"
  - button "第 3 条：start" [disabled]
  - button "第 3 条：center" [disabled]
  - button "第 3 条：end" [disabled]
  - button "第 3 条：nearest" [disabled]
  - button "定位不存在的消息" [disabled]
  - status
  - paragraph: 可见消息：无 · 当前锚点：无
  - region "定位 API 会话":
    - log
  - status: 暂无消息，请载入示例存档。
  - button "滚动到开头"
  - button "滚动到最新"
  - region "使用边界":
    - heading "使用边界" [level=2]
    - heading "适合用在" [level=3]
    - list:
      - listitem: 消息增长、历史prepend或定位需要稳定阅读位置。
      - listitem: 使用显式autoScroll开启对话跟随。
    - heading "避免用在" [level=3]
    - list:
      - listitem: 只有普通文档阅读，无消息生命周期。
      - listitem: 将本地流演示当作真实模型服务。
  - region "API 与结构":
    - heading "API 与结构" [level=2]
    - table "Message Scroller 会话滚动 常用接口":
      - caption: Message Scroller 会话滚动 常用接口
      - rowgroup:
        - row "名称 类型 默认 说明":
          - columnheader "名称"
          - columnheader "类型"
          - columnheader "默认"
          - columnheader "说明"
      - rowgroup:
        - row "autoScroll boolean false 对话示例显式true；用户上滚后引擎尊重阅读位置。":
          - rowheader "autoScroll":
            - code: autoScroll
          - cell "boolean":
            - code: boolean
          - cell "false"
          - cell "对话示例显式true；用户上滚后引擎尊重阅读位置。"
        - row "messageId / scrollAnchor string / boolean — 稳定ID和宿主选定的锚点。":
          - rowheader "messageId / scrollAnchor":
            - code: messageId / scrollAnchor
          - cell "string / boolean":
            - code: string / boolean
          - cell "—"
          - cell "稳定ID和宿主选定的锚点。"
        - row "hooks commands / scrollable / visibility — 按ID、首尾导航与当前阅读状态。":
          - rowheader "hooks":
            - code: hooks
          - cell "commands / scrollable / visibility":
            - code: commands / scrollable / visibility
          - cell "—"
          - cell "按ID、首尾导航与当前阅读状态。"
    - paragraph: Parts / Slots：Provider、Root、Viewport、Content、Item、Button、3 hooks
  - region "调用示例":
    - heading "调用示例" [level=2]
    - button "复制代码"
    - status
    - code: "<MessageScrollerProvider autoScroll> <MessageScroller><MessageScrollerViewport><MessageScrollerContent> {messages.map(m=><MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role===\"student\"}>{m.content}</MessageScrollerItem>)} </MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton /></MessageScroller> </MessageScrollerProvider>"
    - paragraph:
      - text: 当前源码：
      - code: packages/ui/src/message-scroller/message-scroller.tsx
```

# Test source

```ts
  1  | import { expect, type Page } from "@playwright/test";
  2  | 
  3  | /** The real course flow, shared by the original G6 check and Composer regression. */
  4  | export async function verifyConversationReading(page: Page) {
  5  |   await page.goto('/#message-scroller');
  6  |   await expect(page.locator('#message-scroller-title')).toBeVisible();
  7  |   const scene=page.locator('.g6-course-shell'), viewport=scene.getByRole('region',{name:'课程答疑记录',exact:true});
  8  |   await scene.getByRole('textbox',{name:'输入课程问题',exact:true}).fill('解释一段新的课堂观察。');
  9  |   await scene.getByRole('button',{name:'发送问题',exact:true}).click();
  10 |   await expect(scene.getByRole('button',{name:'停止生成',exact:true})).toBeVisible();
  11 |   await viewport.hover();
  12 |   await page.mouse.wheel(0,-1500);
  13 |   await expect.poll(()=>viewport.evaluate(node=>node.scrollTop)).toBeLessThan(100);
  14 |   await page.waitForTimeout(100);
  15 |   const before=await viewport.evaluate(node=>node.scrollTop);
  16 |   await page.waitForTimeout(250);
  17 |   expect(await viewport.evaluate(node=>node.scrollTop)).toBeLessThanOrEqual(before+2);
  18 |   await scene.getByRole('button',{name:'展开输入框',exact:true}).click();
  19 |   expect(await viewport.evaluate(node=>node.scrollTop)).toBeLessThanOrEqual(before+2);
  20 |   await scene.getByRole('textbox',{name:'输入课程问题',exact:true}).fill('停止后保留的下一问');
  21 |   await scene.getByRole('button',{name:'停止生成',exact:true}).click();
  22 |   await expect(scene.getByRole('textbox',{name:'输入课程问题',exact:true})).toHaveValue('停止后保留的下一问');
  23 |   const anchor=scene.locator('[data-message-id="question-example"]');
  24 |   const old=await anchor.boundingBox();
  25 |   await scene.getByRole('button',{name:'加载更早记录',exact:true}).click();
  26 |   const after=await anchor.boundingBox();
  27 |   expect(Math.abs((old?.y??0)-(after?.y??0))).toBeLessThan(3);
  28 |   await scene.getByRole('button',{name:'返回最新',exact:true}).click();
  29 |   await expect.poll(()=>viewport.evaluate(node=>node.scrollHeight-node.clientHeight-node.scrollTop)).toBeLessThan(3);
> 30 |   await expect(scene.getByRole('button',{name:'返回最新',exact:true})).toHaveAttribute('data-active','false');
     |                                                                    ^ Error: expect(locator).toHaveAttribute(expected) failed
  31 | }
  32 | 
```