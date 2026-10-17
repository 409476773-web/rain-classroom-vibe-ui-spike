# Bubble

会话内容表面候选；身份、姓名、时间和消息动作使用 Message，滚动使用 Message Scroller。请求、流式内容和反应状态由宿主拥有。

保留固定 shadcn Base UI 的 Bubble、BubbleGroup、BubbleContent、BubbleReactions，以及 default / secondary / muted / tinted / outline / ghost / destructive 七种 variant。Bubble `align` 为 start/end；Reactions `side` 为 top/bottom，`align` 为 start/end。原生 className/style、Content 的元素或函数 render 及 refs/事件合并保留。Group 只提供纵向编排，不按消息数据自动分组。

```tsx
<Bubble variant="secondary">
  <BubbleContent>先复习本节的两个关键概念。</BubbleContent>
  <BubbleReactions role="img" aria-label="反应：一个赞">
    <span>👍</span>
  </BubbleReactions>
</Bubble>
```

交互内容使用真实 button/a，例如 `render={<button type="button" />}`；禁用动作通过原生 disabled 表达。交互反应使用有名称的 Rain Button/IconButton。危险气泡要有错误文字；不要只用颜色区分发送者或成功失败。

Root 可接 `BubbleRecipe`，Parts 为 root/group/content/reactions；Content/Reactions 可单独指定局部 recipe。嵌套气泡重新建立本实例边界，不继承外层局改。className/style 保留源码组合入口，视觉修改仍使用 Rain Token 或具名 Local Recipe。

来源与差额：

- [固定作者源码](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/bases/base/ui/bubble.tsx)、[同版 Nova](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/styles/style-nova.css)，MIT。
- 80% 内容宽度与 ghost 解除上限、反应外叠75%保留；reaction physical left/right 转为逻辑 inset。
- Nova rounded-xl 固定默认约14px映射已存在 Rain Radius/12；正文采用 Reading 14/24，compact仅把竖内边距8缩到6，不改变阅读字号。
- 七种表面与hover/focus由Rain Token提供；tinted使用已有品牌浅填充，不自行重算品牌色。默认实心交互hover用已有 Brand Alpha/1；其透明混合后的对比度由所在表面实际验证。
- CSS放在components层，局部Token utility可覆盖Part；不引入新动效/消息数据引擎。

自有测试覆盖真实渲染button、键盘、disabled、ref/事件、局改隔离与动态recipe切换。Reactions外叠空间、主题/密度、长内容、RTL和对比度须在实际组合里浏览器验证；候选未发布、用户视觉Gate独立。
