# Message

会话消息行候选。保留MessageGroup、Message、MessageAvatar、MessageContent、MessageHeader、MessageFooter；只提供布局，不拥有消息发送、权限、头像数据或复制/重试的业务状态。

```tsx
<Message align="start">
  <MessageAvatar><Avatar alt="" /></MessageAvatar>
  <MessageContent>
    <MessageHeader>课程助手</MessageHeader>
    <Bubble variant="ghost"><BubbleContent>可以先从章节总结开始复习。</BubbleContent></Bubble>
    <MessageFooter><Button variant="text">复制</Button></MessageFooter>
  </MessageContent>
</Message>
```

Message只有源码的align=start/end，没有sender/user/assistant自动映射prop。姓名/时间在Header，已读/失败/动作在Footer；MessageAvatar放已有Avatar，连续同发送者Group的早先消息可放空Avatar占位。Content组合Bubble、Marker或Attachment；不要把整行变成点击区域后又嵌套一组按钮。

Root可接 `MessageRecipe`，Parts为root/group/avatar/content/header/footer；Part可显式指定recipe。局改仅在本Message生效。原生div的className/style/refs保留，业务动作由真实Rain Button/IconButton承担且须有名称；复制成功/失败、重试等待等反馈留宿主。

来源与差额：

- [固定作者源码](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/bases/base/ui/message.tsx)及同版Nova，MIT。
- align=end整行反向、Avatar最小32、Content间隔10、Header/Footer内边距12、ghost取消元数据内边距保留。
- 正文UI14/22，元数据12/20并用Rain600字重替换来源500；Bubble长内容独立消费Reading。compact行间隔8→6、Content10→8，Avatar保持32。
- 元数据允许换行；Footer跟随消息侧。现保留源码Footer存在时Avatar上移32px的基线，未加测量引擎。多行Footer和不同Button尺寸的光学对齐应在实际样板确认；若有问题，按同Parts做CSS差额并记录证据。

共享局改隔离由Bubble组合测试覆盖；薄Parts未建立机械断言。浏览器需检查长内容/两行Footer/不同头像有无、主题/密度/RTL及动作焦点；候选未发布、用户视觉Gate独立。
