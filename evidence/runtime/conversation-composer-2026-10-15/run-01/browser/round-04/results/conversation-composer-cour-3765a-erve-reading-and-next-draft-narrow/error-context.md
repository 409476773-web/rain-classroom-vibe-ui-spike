# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: conversation-composer.spec.ts >> course scroll, prepend, manual expansion and stop preserve reading and next draft
- Location: tests/e2e/conversation-composer.spec.ts:75:1

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 3
Received:   455
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
          - generic [ref=e33]:
            - region "课程答疑记录" [ref=e34]:
              - button "已显示本页全部记录" [disabled] [ref=e36]
              - log [ref=e38]:
                - generic [ref=e39]:
                  - generic [ref=e41]:
                    - strong [ref=e43]: 我
                    - paragraph [ref=e46]: 为什么观察记录需要写清时间和场景？
                  - group "课程助教回答" [ref=e47]:
                    - generic [ref=e51]:
                      - generic [ref=e52]:
                        - strong [ref=e53]: 课程助教
                        - generic [ref=e54]: 课程辅导
                      - generic [ref=e56]:
                        - generic [ref=e57]:
                          - heading "先记录看见的，再解释它" [level=4] [ref=e58]
                          - paragraph [ref=e59]: 事实是可以被再次核对的观察记录；解释是你根据这些记录作出的判断。把两者分开写，并不是不允许解释，而是让读者知道：哪些内容已经发生，哪些仍需要证据支持。
                        - generic [ref=e60]:
                          - heading "用三步完成一次课堂观察" [level=4] [ref=e61]
                          - list [ref=e62]:
                            - listitem [ref=e63]: 写清时间、人物与行为。例如：教师提出问题后，三位同学举手，其中两位解释了自己的解题步骤。尽量记录原话与动作，暂时不用“积极”“理解了”等概括。
                            - listitem [ref=e64]: 单列自己的解释。例如：这些同学可能理解了这一方法。使用“可能”“我推测”让判断的性质更清楚，同时写出你的依据。
                            - listitem [ref=e65]: 补一条需要核对的问题。没有举手的同学是否也理解了？可以观察随后的独立练习，或请不同同学说明理由，而不是仅用举手人数得出结论。
                        - generic [ref=e66]:
                          - heading "把判断留给更多证据" [level=4] [ref=e67]
                          - paragraph [ref=e68]: 一次行为可能有不同原因。学生没有发言，可能正在思考，也可能没有听清问题。比较课堂发言、练习过程与课后反馈，才能逐步检验最初的解释。记录时保留不确定性，是让结论更可靠的一部分。
                        - region "事实与解释对照" [ref=e69]:
                          - table [ref=e70]:
                            - rowgroup [ref=e71]:
                              - row [ref=e72]:
                                - columnheader "记录类型" [ref=e73]
                                - columnheader "示例" [ref=e74]
                            - rowgroup [ref=e75]:
                              - row [ref=e76]:
                                - rowheader "事实" [ref=e77]
                                - cell "三位同学举手。" [ref=e78]
                              - row [ref=e79]:
                                - rowheader "解释" [ref=e80]
                                - cell "他们可能理解了。" [ref=e81]
                              - row [ref=e82]:
                                - rowheader "待验证" [ref=e83]
                                - cell "其他同学能否独立完成练习？" [ref=e84]
                      - generic [ref=e85]:
                        - button "参考资料 · 2 份" [ref=e87] [cursor=pointer]
                        - button "复制此回答" [ref=e89] [cursor=pointer]:
                          - generic [ref=e90]: 复制
                        - button "有帮助" [ref=e91] [cursor=pointer]
                        - status
                - generic [ref=e93]:
                  - generic [ref=e95]:
                    - strong [ref=e97]: 我
                    - generic [ref=e99]:
                      - paragraph [ref=e100]: 课堂观察中，怎样区分事实与解释？能用一个例子说明吗？
                      - generic [ref=e103]:
                        - button "查看完整文件名：课堂观察记录与同伴反馈说明.pdf" [ref=e105] [cursor=pointer]: 课堂观察记录与同伴反馈说明.pdf
                        - generic [ref=e106]: 课程资料 · 仅本页使用
                  - group "课程助教回答" [ref=e107]:
                    - generic [ref=e111]:
                      - generic [ref=e112]:
                        - strong [ref=e113]: 课程助教
                        - generic [ref=e114]: 课程辅导
                      - generic [ref=e116]:
                        - generic [ref=e117]:
                          - heading "先记录看见的，再解释它" [level=4] [ref=e118]
                          - paragraph [ref=e119]: 事实是可以被再次核对的观察记录；解释是你根据这些记录作出的判断。把两者分开写，并不是不允许解释，而是让读者知道：哪些内容已经发生，哪些仍需要证据支持。
                        - generic [ref=e120]:
                          - heading "用三步完成一次课堂观察" [level=4] [ref=e121]
                          - list [ref=e122]:
                            - listitem [ref=e123]: 写清时间、人物与行为。例如：教师提出问题后，三位同学举手，其中两位解释了自己的解题步骤。尽量记录原话与动作，暂时不用“积极”“理解了”等概括。
                            - listitem [ref=e124]: 单列自己的解释。例如：这些同学可能理解了这一方法。使用“可能”“我推测”让判断的性质更清楚，同时写出你的依据。
                            - listitem [ref=e125]: 补一条需要核对的问题。没有举手的同学是否也理解了？可以观察随后的独立练习，或请不同同学说明理由，而不是仅用举手人数得出结论。
                        - generic [ref=e126]:
                          - heading "把判断留给更多证据" [level=4] [ref=e127]
                          - paragraph [ref=e128]: 一次行为可能有不同原因。学生没有发言，可能正在思考，也可能没有听清问题。比较课堂发言、练习过程与课后反馈，才能逐步检验最初的解释。记录时保留不确定性，是让结论更可靠的一部分。
                        - region "事实与解释对照" [ref=e129]:
                          - table [ref=e130]:
                            - rowgroup [ref=e131]:
                              - row [ref=e132]:
                                - columnheader "记录类型" [ref=e133]
                                - columnheader "示例" [ref=e134]
                            - rowgroup [ref=e135]:
                              - row [ref=e136]:
                                - rowheader "事实" [ref=e137]
                                - cell "三位同学举手。" [ref=e138]
                              - row [ref=e139]:
                                - rowheader "解释" [ref=e140]
                                - cell "他们可能理解了。" [ref=e141]
                              - row [ref=e142]:
                                - rowheader "待验证" [ref=e143]
                                - cell "其他同学能否独立完成练习？" [ref=e144]
                      - generic [ref=e145]:
                        - button "参考资料 · 2 份" [ref=e147] [cursor=pointer]
                        - button "复制此回答" [ref=e149] [cursor=pointer]:
                          - generic [ref=e150]: 复制
                        - button "有帮助" [ref=e151] [cursor=pointer]
                        - status
                - generic [ref=e153]:
                  - generic [ref=e155]:
                    - strong [ref=e157]: 我
                    - paragraph [ref=e160]: 解释一段新的课堂观察。
                  - group "课程助教回答" [ref=e161]:
                    - generic [ref=e165]:
                      - generic [ref=e166]:
                        - strong [ref=e167]: 课程助教
                        - generic [ref=e168]: 课程辅导
                      - generic [ref=e169]: 已停止生成，回答尚未完成
                      - paragraph [ref=e173]: 先记录看见的，再解释它 事实是可以被再次核对的观察记录；解释是你根据这些记录作出的判断。把两者分开写，并不是不允许解释，而是让读者知道：哪些内容已经发生，哪些仍需要证据支持。 用三步完成一次
                      - generic [ref=e174]:
                        - button "复制此回答" [ref=e175] [cursor=pointer]:
                          - generic [ref=e176]: 复制
                        - button "重新生成此回答" [ref=e177] [cursor=pointer]:
                          - generic [ref=e178]: 重新生成
                        - status
            - button "返回最新" [ref=e180] [cursor=pointer]
          - generic [ref=e181]:
            - form "课程提问" [ref=e182]:
              - generic [ref=e183]:
                - textbox "输入课程问题" [ref=e184]:
                  - /placeholder: 结合课程内容，写下你的问题…
                  - text: 停止后保留的下一问
                - generic [ref=e185]:
                  - generic [ref=e186]:
                    - button "添加资料" [ref=e187] [cursor=pointer]
                    - button "选择搜索范围" [ref=e190] [cursor=pointer]:
                      - generic [ref=e192]: 全部课程资料
                  - generic [ref=e194]:
                    - button "开始语音输入" [ref=e195] [cursor=pointer]
                    - button "收起输入框" [expanded] [ref=e198] [cursor=pointer]
                    - button "发送问题" [ref=e201] [cursor=pointer]
            - paragraph [ref=e204]: 本地示例 · 上传、课程资料、转写与回答均为模拟。Enter 换行，点击发送。
        - group [ref=e205]:
          - generic "演示控制" [ref=e206] [cursor=pointer]
    - generic [ref=e207]:
      - heading "课堂讨论" [level=2] [ref=e208]
      - paragraph [ref=e209]: 作者分组、短引用与回复输入保持连续阅读；新内容不打断历史阅读。
      - generic [ref=e211]:
        - region "课堂讨论样板" [ref=e212]:
          - generic [ref=e213]:
            - generic [ref=e214]:
              - text: 课堂观察 · 教学研讨班
              - heading "哪些是事实，哪些是解释？" [level=3] [ref=e215]
            - generic [ref=e216]: 本地示例
          - region "课堂讨论记录" [ref=e218]:
            - button "加载更早讨论" [ref=e220] [cursor=pointer]
            - log [ref=e222]:
              - generic [ref=e223]:
                - generic [ref=e224]: 今天 · 课堂讨论
                - generic [ref=e230]:
                  - generic [ref=e231]:
                    - strong [ref=e232]: 张老师
                    - generic [ref=e233]: 教师
                    - time [ref=e234]: 10:24
                  - paragraph [ref=e237]: 请描述一个你在课堂上观察到的片段。先写事实，再说说你的解释，以及准备怎样验证。
                  - generic [ref=e238]:
                    - button "回复张老师的消息" [ref=e239] [cursor=pointer]:
                      - generic [ref=e240]: 回复
                    - button "赞同张老师的消息" [ref=e241] [cursor=pointer]:
                      - generic [ref=e242]: 赞同
              - generic [ref=e248]:
                - generic [ref=e249]:
                  - strong [ref=e250]: 李同学
                  - time [ref=e251]: 10:26
                - paragraph [ref=e254]: 小组讨论开始后，有三位同学轮流解释各自的解题步骤，另一位同学在做记录。
                - generic [ref=e255]:
                  - button "回复李同学的消息" [ref=e256] [cursor=pointer]:
                    - generic [ref=e257]: 回复
                  - button "赞同李同学的消息" [ref=e258] [cursor=pointer]:
                    - generic [ref=e259]: 赞同
              - generic [ref=e262]:
                - paragraph [ref=e265]: 我最初认为他们已经理解了，但还需要看看每个人能否独立完成下一题。
                - generic [ref=e266]:
                  - button "回复李同学的消息" [ref=e267] [cursor=pointer]:
                    - generic [ref=e268]: 回复
                  - button "赞同李同学的消息" [ref=e269] [cursor=pointer]:
                    - generic [ref=e270]: 赞同
              - generic [ref=e276]:
                - generic [ref=e277]:
                  - strong [ref=e278]: 王同学
                  - time [ref=e279]: 10:28
                - button "李同学 另一位同学在做记录。" [ref=e280] [cursor=pointer]:
                  - strong [ref=e281]: 李同学
                  - generic [ref=e282]: 另一位同学在做记录。
                - paragraph [ref=e285]: 我会把“做了记录”和“已经理解”分开写。记录本身不能证明理解，还需要听听他怎样解释。
                - generic [ref=e286]:
                  - button "回复王同学的消息" [ref=e287] [cursor=pointer]:
                    - generic [ref=e288]: 回复
                  - button "赞同王同学的消息" [ref=e289] [cursor=pointer]:
                    - generic [ref=e290]: 赞同
          - generic [ref=e292]:
            - form "发送课堂讨论" [ref=e293]:
              - generic [ref=e294]:
                - textbox "输入讨论内容" [ref=e295]:
                  - /placeholder: 写下你的观察与思考…
                - generic [ref=e296]:
                  - button "添加资料" [ref=e298] [cursor=pointer]
                  - generic [ref=e301]:
                    - button "开始语音输入" [ref=e302] [cursor=pointer]
                    - button "展开输入框" [ref=e305] [cursor=pointer]
                    - button "发送讨论" [disabled] [ref=e308]
              - status [ref=e311]: 请先输入内容
            - status [ref=e312]: 本地示例 · 上传、转写与发送均为模拟。Enter 换行，点击发送。
        - group [ref=e313]:
          - generic "演示控制" [ref=e314] [cursor=pointer]
    - generic [ref=e315]:
      - heading "空会话与定位 API" [level=2] [ref=e316]
      - paragraph [ref=e317]: 载入后以last-anchor打开，系统标记是锚点；四种align与缺失ID均调用真实引擎。autoScroll保留默认关闭。
      - generic [ref=e319]:
        - generic [ref=e320]:
          - button "载入锚点存档" [ref=e321] [cursor=pointer]
          - button "第 3 条：start" [disabled] [ref=e323]
          - button "第 3 条：center" [disabled] [ref=e325]
          - button "第 3 条：end" [disabled] [ref=e327]
          - button "第 3 条：nearest" [disabled] [ref=e329]
          - button "定位不存在的消息" [disabled] [ref=e331]
        - status
        - paragraph [ref=e333]: 可见消息：无 · 当前锚点：无
        - generic [ref=e334]:
          - region "定位 API 会话" [ref=e335]:
            - log [ref=e336]
          - status: 暂无消息，请载入示例存档。
          - button "滚动到开头"
          - button "滚动到最新"
  - region [ref=e337]:
    - heading "使用边界" [level=2] [ref=e338]
    - generic [ref=e339]:
      - generic [ref=e340]:
        - heading "适合用在" [level=3] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]: 消息增长、历史prepend或定位需要稳定阅读位置。
          - listitem [ref=e344]: 使用显式autoScroll开启对话跟随。
      - generic [ref=e345]:
        - heading "避免用在" [level=3] [ref=e346]
        - list [ref=e347]:
          - listitem [ref=e348]: 只有普通文档阅读，无消息生命周期。
          - listitem [ref=e349]: 将本地流演示当作真实模型服务。
  - generic [ref=e350]:
    - region [ref=e351]:
      - heading "API 与结构" [level=2] [ref=e352]
      - table [ref=e354]:
        - caption [ref=e355]: Message Scroller 会话滚动 常用接口
        - rowgroup [ref=e356]:
          - row [ref=e357]:
            - columnheader "名称" [ref=e358]
            - columnheader "类型" [ref=e359]
            - columnheader "默认" [ref=e360]
            - columnheader "说明" [ref=e361]
        - rowgroup [ref=e362]:
          - row [ref=e363]:
            - rowheader [ref=e364]:
              - code [ref=e365]: autoScroll
            - cell [ref=e366]:
              - code [ref=e367]: boolean
            - cell "false" [ref=e368]
            - cell "对话示例显式true；用户上滚后引擎尊重阅读位置。" [ref=e369]
          - row [ref=e370]:
            - rowheader [ref=e371]:
              - code [ref=e372]: messageId / scrollAnchor
            - cell [ref=e373]:
              - code [ref=e374]: string / boolean
            - cell "—" [ref=e375]
            - cell "稳定ID和宿主选定的锚点。" [ref=e376]
          - row [ref=e377]:
            - rowheader [ref=e378]:
              - code [ref=e379]: hooks
            - cell [ref=e380]:
              - code [ref=e381]: commands / scrollable / visibility
            - cell "—" [ref=e382]
            - cell "按ID、首尾导航与当前阅读状态。" [ref=e383]
      - paragraph [ref=e384]: Parts / Slots：Provider、Root、Viewport、Content、Item、Button、3 hooks
    - region [ref=e385]:
      - heading "调用示例" [level=2] [ref=e386]
      - generic [ref=e387]:
        - generic [ref=e388]:
          - button "复制代码" [ref=e389] [cursor=pointer]
          - status
        - code [ref=e392]: "<MessageScrollerProvider autoScroll> <MessageScroller><MessageScrollerViewport><MessageScrollerContent> {messages.map(m=><MessageScrollerItem key={m.id} messageId={m.id} scrollAnchor={m.role===\"student\"}>{m.content}</MessageScrollerItem>)} </MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton /></MessageScroller> </MessageScrollerProvider>"
      - paragraph [ref=e393]:
        - text: 当前源码：
        - code [ref=e394]: packages/ui/src/message-scroller/message-scroller.tsx
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
> 27 |   expect(Math.abs((old?.y??0)-(after?.y??0))).toBeLessThan(3);
     |                                               ^ Error: expect(received).toBeLessThan(expected)
  28 |   await scene.getByRole('button',{name:'返回最新',exact:true}).click();
  29 |   await expect.poll(()=>viewport.evaluate(node=>node.scrollHeight-node.clientHeight-node.scrollTop)).toBeLessThan(3);
  30 |   await expect(scene.locator('.g6-course-latest')).toHaveAttribute('data-active','false');
  31 |   await expect(scene.locator('.g6-course-latest')).toBeHidden();
  32 | }
  33 | 
```