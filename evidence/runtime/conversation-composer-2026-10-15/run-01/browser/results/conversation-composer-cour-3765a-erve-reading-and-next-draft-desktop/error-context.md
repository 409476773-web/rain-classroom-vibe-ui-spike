# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> course scroll, prepend, manual expansion and stop preserve reading and next draft
- Location: tests/e2e/conversation-composer.spec.ts:72:1

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 853
Received:    855
```

# Page snapshot

```yaml
- main [ref=e5]:
  - generic [ref=e6]:
    - link "返回组件目录" [ref=e7] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e9]:
      - heading "Message Scroller 会话滚动" [level=1] [ref=e10]
      - generic [ref=e11]: UI · 文档页试改 · 公共组件待评审
    - paragraph [ref=e12]: 在新消息增长和阅读历史之间保持清楚的滚动控制。
    - generic "预览设置" [ref=e13]:
      - button "浅色" [pressed] [ref=e14] [cursor=pointer]
      - button "深色" [ref=e16] [cursor=pointer]
      - button "紧凑密度" [ref=e18] [cursor=pointer]
  - generic [ref=e20]:
    - paragraph [ref=e21]:
      - text: 输入能力与状态见
      - link "ConversationComposer 对话输入" [ref=e22] [cursor=pointer]:
        - /url: "#conversation-composer"
      - text: 。
    - generic [ref=e23]:
      - heading "课程辅导对话" [level=2] [ref=e24]
      - paragraph [ref=e25]: 阅读、查看来源与继续提问连成一条主路径；请求与资料均为本地示例。
      - generic [ref=e27]:
        - region "课程答疑样板" [ref=e28]:
          - generic [ref=e29]:
            - generic [ref=e30]:
              - text: 课堂观察 · 第 04 讲
              - heading "从事实出发，读懂课堂" [level=3] [ref=e31]
            - generic [ref=e32]: 本地示例
          - region "课程答疑记录" [ref=e34]:
            - button "加载更早记录" [ref=e36] [cursor=pointer]
            - log [ref=e38]:
              - generic [ref=e39]:
                - generic [ref=e41]:
                  - strong [ref=e43]: 我
                  - generic [ref=e45]:
                    - paragraph [ref=e46]: 课堂观察中，怎样区分事实与解释？能用一个例子说明吗？
                    - generic [ref=e49]:
                      - button "查看完整文件名：课堂观察记录与同伴反馈说明.pdf" [ref=e51] [cursor=pointer]: 课堂观察记录与同伴反馈说明.pdf
                      - generic [ref=e52]: 课程资料 · 仅本页使用
                - group "课程助教回答" [ref=e53]:
                  - generic [ref=e57]:
                    - generic [ref=e58]:
                      - strong [ref=e59]: 课程助教
                      - generic [ref=e60]: 课程辅导
                    - generic [ref=e62]:
                      - generic [ref=e63]:
                        - heading "先记录看见的，再解释它" [level=4] [ref=e64]
                        - paragraph [ref=e65]: 事实是可以被再次核对的观察记录；解释是你根据这些记录作出的判断。把两者分开写，并不是不允许解释，而是让读者知道：哪些内容已经发生，哪些仍需要证据支持。
                      - generic [ref=e66]:
                        - heading "用三步完成一次课堂观察" [level=4] [ref=e67]
                        - list [ref=e68]:
                          - listitem [ref=e69]: 写清时间、人物与行为。例如：教师提出问题后，三位同学举手，其中两位解释了自己的解题步骤。尽量记录原话与动作，暂时不用“积极”“理解了”等概括。
                          - listitem [ref=e70]: 单列自己的解释。例如：这些同学可能理解了这一方法。使用“可能”“我推测”让判断的性质更清楚，同时写出你的依据。
                          - listitem [ref=e71]: 补一条需要核对的问题。没有举手的同学是否也理解了？可以观察随后的独立练习，或请不同同学说明理由，而不是仅用举手人数得出结论。
                      - generic [ref=e72]:
                        - heading "把判断留给更多证据" [level=4] [ref=e73]
                        - paragraph [ref=e74]: 一次行为可能有不同原因。学生没有发言，可能正在思考，也可能没有听清问题。比较课堂发言、练习过程与课后反馈，才能逐步检验最初的解释。记录时保留不确定性，是让结论更可靠的一部分。
                      - region "事实与解释对照" [ref=e75]:
                        - table [ref=e76]:
                          - rowgroup [ref=e77]:
                            - row [ref=e78]:
                              - columnheader "记录类型" [ref=e79]
                              - columnheader "示例" [ref=e80]
                          - rowgroup [ref=e81]:
                            - row [ref=e82]:
                              - rowheader "事实" [ref=e83]
                              - cell "三位同学举手。" [ref=e84]
                            - row [ref=e85]:
                              - rowheader "解释" [ref=e86]
                              - cell "他们可能理解了。" [ref=e87]
                            - row [ref=e88]:
                              - rowheader "待验证" [ref=e89]
                              - cell "其他同学能否独立完成练习？" [ref=e90]
                    - generic [ref=e91]:
                      - button "参考资料 · 2 份" [ref=e93] [cursor=pointer]
                      - button "复制此回答" [ref=e95] [cursor=pointer]:
                        - generic [ref=e96]: 复制
                      - button "有帮助" [ref=e97] [cursor=pointer]
                      - status
              - generic [ref=e99]:
                - generic [ref=e101]:
                  - strong [ref=e103]: 我
                  - paragraph [ref=e106]: 解释一段新的课堂观察。
                - group "课程助教回答" [ref=e107]:
                  - generic [ref=e111]:
                    - generic [ref=e112]:
                      - strong [ref=e113]: 课程助教
                      - generic [ref=e114]: 课程辅导
                    - generic [ref=e115]: 正在生成…
                    - paragraph [ref=e121]: 先记录看见的，再解释它 事实是可以被再次核对的观察记录；解释是你根据这些记录作出的判断。把两者分开写，并不是不允许解释，而是让读者知道：哪些内容
          - generic [ref=e123]:
            - form "课程提问" [ref=e124]:
              - textbox "输入课程问题" [ref=e125]:
                - /placeholder: 结合课程内容，写下你的问题…
              - generic [ref=e126]:
                - generic [ref=e127]:
                  - button "添加资料" [ref=e128] [cursor=pointer]
                  - button "选择搜索范围" [ref=e131] [cursor=pointer]:
                    - generic [ref=e133]: 全部课程资料
                - generic [ref=e135]:
                  - button "展开输入框" [ref=e136] [cursor=pointer]
                  - button "开始语音输入" [disabled] [ref=e139]
                  - button "停止生成" [ref=e142] [cursor=pointer]
              - generic [ref=e145]: 回答期间可先输入文字，结束后再使用语音。
              - status [ref=e146]: 请先等待回答完成，或停止当前回答。
            - paragraph [ref=e147]: 本地示例 · 上传、课程资料、转写与回答均为模拟。生成期间可准备下一问。
        - group [ref=e148]:
          - generic "演示控制" [ref=e149] [cursor=pointer]
    - generic [ref=e150]:
      - heading "课堂讨论" [level=2] [ref=e151]
      - paragraph [ref=e152]: 作者分组、短引用与回复输入保持连续阅读；新内容不打断历史阅读。
      - generic [ref=e154]:
        - region "课堂讨论样板" [ref=e155]:
          - generic [ref=e156]:
            - generic [ref=e157]:
              - text: 课堂观察 · 教学研讨班
              - heading "哪些是事实，哪些是解释？" [level=3] [ref=e158]
            - generic [ref=e159]: 本地示例
          - region "课堂讨论记录" [ref=e161]:
            - button "加载更早讨论" [ref=e163] [cursor=pointer]
            - log [ref=e165]:
              - generic [ref=e166]:
                - generic [ref=e167]: 今天 · 课堂讨论
                - generic [ref=e173]:
                  - generic [ref=e174]:
                    - strong [ref=e175]: 张老师
                    - generic [ref=e176]: 教师
                    - time [ref=e177]: 10:24
                  - paragraph [ref=e180]: 请描述一个你在课堂上观察到的片段。先写事实，再说说你的解释，以及准备怎样验证。
                  - generic [ref=e181]:
                    - button "回复张老师的消息":
                      - generic: 回复
                    - button "赞同张老师的消息":
                      - generic: 赞同
              - generic [ref=e187]:
                - generic [ref=e188]:
                  - strong [ref=e189]: 李同学
                  - time [ref=e190]: 10:26
                - paragraph [ref=e193]: 小组讨论开始后，有三位同学轮流解释各自的解题步骤，另一位同学在做记录。
                - generic [ref=e194]:
                  - button "回复李同学的消息":
                    - generic: 回复
                  - button "赞同李同学的消息":
                    - generic: 赞同
              - generic [ref=e197]:
                - paragraph [ref=e200]: 我最初认为他们已经理解了，但还需要看看每个人能否独立完成下一题。
                - generic [ref=e201]:
                  - button "回复李同学的消息":
                    - generic: 回复
                  - button "赞同李同学的消息":
                    - generic: 赞同
              - generic [ref=e207]:
                - generic [ref=e208]:
                  - strong [ref=e209]: 王同学
                  - time [ref=e210]: 10:28
                - button "李同学 另一位同学在做记录。" [ref=e211] [cursor=pointer]:
                  - strong [ref=e212]: 李同学
                  - generic [ref=e213]: 另一位同学在做记录。
                - paragraph [ref=e216]: 我会把“做了记录”和“已经理解”分开写。记录本身不能证明理解，还需要听听他怎样解释。
                - generic [ref=e217]:
                  - button "回复王同学的消息":
                    - generic: 回复
                  - button "赞同王同学的消息":
                    - generic: 赞同
          - generic [ref=e219]:
            - form "发送课堂讨论" [ref=e220]:
              - textbox "输入讨论内容" [ref=e221]:
                - /placeholder: 写下你的观察与思考…
              - generic [ref=e222]:
                - button "添加资料" [ref=e224] [cursor=pointer]
                - generic [ref=e227]:
                  - button "展开输入框" [ref=e228] [cursor=pointer]
                  - button "开始语音输入" [ref=e231] [cursor=pointer]
                  - button "发送讨论" [disabled] [ref=e234]
              - status [ref=e237]: 请先输入内容
            - status [ref=e238]: 本地示例 · 上传、转写与发送均为模拟。Enter 换行，点击发送。
        - group [ref=e239]:
          - generic "演示控制" [ref=e240] [cursor=pointer]
    - generic [ref=e241]:
      - heading "空会话与定位 API" [level=2] [ref=e242]
      - paragraph [ref=e243]: 载入后以last-anchor打开，系统标记是锚点；四种align与缺失ID均调用真实引擎。autoScroll保留默认关闭。
      - generic [ref=e245]:
        - generic [ref=e246]:
          - button "载入锚点存档" [ref=e247] [cursor=pointer]
          - button "第 3 条：start" [disabled] [ref=e249]
          - button "第 3 条：center" [disabled] [ref=e251]
          - button "第 3 条：end" [disabled] [ref=e253]
          - button "第 3 条：nearest" [disabled] [ref=e255]
          - button "定位不存在的消息" [disabled] [ref=e257]
        - status
        - paragraph [ref=e259]: 可见消息：无 · 当前锚点：无
        - generic [ref=e260]:
          - region "定位 API 会话" [ref=e261]:
            - log [ref=e262]
          - status: 暂无消息，请载入示例存档。
          - button "滚动到开头"
          - button "滚动到最新"
  - region [ref=e263]:
    - heading "使用边界" [level=2] [ref=e264]
    - generic [ref=e265]:
      - generic [ref=e266]:
        - heading "适合用在" [level=3] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]: 消息增长、历史prepend或定位需要稳定阅读位置。
          - listitem [ref=e270]: 使用显式autoScroll开启对话跟随。
      - generic [ref=e271]:
        - heading "避免用在" [level=3] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]: 只有普通文档阅读，无消息生命周期。
          - listitem [ref=e275]: 将本地流演示当作真实模型服务。
  - generic [ref=e276]:
    - region [ref=e277]:
      - heading "API 与结构" [level=2] [ref=e278]
      - table [ref=e280]:
        - caption [ref=e281]: Message Scroller 会话滚动 常用接口
        - rowgroup [ref=e282]:
          - row [ref=e283]:
            - columnheader "名称" [ref=e284]
            - columnheader "类型" [ref=e285]
            - columnheader "默认" [ref=e286]
            - columnheader "说明" [ref=e287]
        - rowgroup [ref=e288]:
          - row [ref=e289]:
            - rowheader [ref=e290]:
              - code [ref=e291]: autoScroll
            - cell [ref=e292]:
              - code [ref=e293]: boolean
            - cell "false" [ref=e294]
            - cell "对话示例显式true；用户上滚后引擎尊重阅读位置。" [ref=e295]
          - row [ref=e296]:
            - rowheader [ref=e297]:
              - code [ref=e298]: messageId / scrollAnchor
            - cell [ref=e299]:
              - code [ref=e300]: string / boolean
            - cell "—" [ref=e301]
            - cell "稳定ID和宿主选定的锚点。" [ref=e302]
          - row [ref=e303]:
            - rowheader [ref=e304]:
              - code [ref=e305]: hooks
            - cell [ref=e306]:
              - code [ref=e307]: commands / scrollable / visibility
            - cell "—" [ref=e308]
            - cell "按ID、首尾导航与当前阅读状态。" [ref=e309]
      - paragraph [ref=e310]: Parts / Slots：Provider、Root、Viewport、Content、Item、Button、3 hooks
    - region [ref=e311]:
      - heading "调用示例" [level=2] [ref=e312]
      - generic [ref=e313]:
        - generic [ref=e314]:
          - button "复制代码" [ref=e315] [cursor=pointer]
          - status
        - code [ref=e318]: "<MessageScrollerProvider autoScroll> <MessageScroller><MessageScrollerViewport><MessageScrollerContent> {messages.map(m=><MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role===\"student\"}>{m.content}</MessageScrollerItem>)} </MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton /></MessageScroller> </MessageScrollerProvider>"
      - paragraph [ref=e319]:
        - text: 当前源码：
        - code [ref=e320]: packages/ui/src/message-scroller/message-scroller.tsx
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
  11 |   await viewport.evaluate(node=>{node.scrollTop=80;node.dispatchEvent(new Event('scroll'));});
  12 |   const before=await viewport.evaluate(node=>node.scrollTop);
  13 |   await page.waitForTimeout(250);
> 14 |   expect(await viewport.evaluate(node=>node.scrollTop)).toBeLessThanOrEqual(before+2);
     |                                                         ^ Error: expect(received).toBeLessThanOrEqual(expected)
  15 |   await scene.getByRole('button',{name:'展开输入框',exact:true}).click();
  16 |   expect(await viewport.evaluate(node=>node.scrollTop)).toBeLessThanOrEqual(before+2);
  17 |   await scene.getByRole('textbox',{name:'输入课程问题',exact:true}).fill('停止后保留的下一问');
  18 |   await scene.getByRole('button',{name:'停止生成',exact:true}).click();
  19 |   await expect(scene.getByRole('textbox',{name:'输入课程问题',exact:true})).toHaveValue('停止后保留的下一问');
  20 |   const anchor=scene.locator('[data-message-id="question-example"]');
  21 |   const old=await anchor.boundingBox();
  22 |   await scene.getByRole('button',{name:'加载更早记录',exact:true}).click();
  23 |   const after=await anchor.boundingBox();
  24 |   expect(Math.abs((old?.y??0)-(after?.y??0))).toBeLessThan(3);
  25 |   await scene.getByRole('button',{name:'返回最新',exact:true}).click();
  26 |   await expect.poll(()=>viewport.evaluate(node=>node.scrollHeight-node.clientHeight-node.scrollTop)).toBeLessThan(3);
  27 |   await expect(scene.getByRole('button',{name:'返回最新',exact:true})).toHaveAttribute('data-active','false');
  28 | }
  29 | 
```