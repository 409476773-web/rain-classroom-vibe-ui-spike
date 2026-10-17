# Message Scroller

会话滚动容器候选。完整保留 Provider、Root、Viewport、Content、Item、Button 六个 Parts，原样导出 `useMessageScroller`、`useMessageScrollerScrollable`、`useMessageScrollerVisibility`。滚动协调使用唯一 `@shadcn/react@0.3.1` 引擎，不建立第二套 controller。

```tsx
<MessageScrollerProvider autoScroll defaultScrollPosition="end">
  <MessageScroller>
    <MessageScrollerViewport aria-label="课程会话">
      <MessageScrollerContent aria-busy={streaming}>
        {messages.map(message => <MessageScrollerItem key={message.id} messageId={message.id} scrollAnchor={message.startsTurn}>
          {message.content}
        </MessageScrollerItem>)}
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
```

宿主保证容器有明确高度、每行 `messageId` 稳定且唯一。用户向上阅读会释放自动跟随；新内容、前插历史和 turn anchor 仍由原引擎协调。Provider 源码默认 `autoScroll=false`，示例按场景显式开启；`defaultScrollPosition` 支持 start/end/last-anchor，threshold/peek/margin 原值为8/64/0。Viewport默认保留前插阅读位置；Item默认 `scrollAnchor=false`，不要把每条消息都声明为新 turn。

Viewport 是带名称的键盘 region、默认 `tabIndex=0`；Content是 native log，只宣布新增内容。宿主按实际请求状态提供 `aria-busy`，选择适当实时播报策略；不要另建重复 live region。滚动按钮默认 direction=end、behavior=smooth；默认中文名称可覆盖，start方向图标翻转。inactive沿用引擎 inert、tabIndex=-1、data-active="false"，不要把其当 disabled 字符串态。

命令 `scrollToMessage(id, options)` 支持 start/center/end/nearest、behavior及scrollMargin，已挂载但找不到目标时返回false；start/end命令在0.3.1实现中只消费behavior。可滚动hook的 start/end表示该方向仍有溢出，不表示位于边缘；visibility hook按订阅启用跟踪，返回当前anchor和可见ID。在相同Provider内调用这些hooks。

Root可接 `MessageScrollerRecipe`，Parts为root/viewport/content/item/button；子Part可显式指定recipe，嵌套root建立新边界。原生props、Viewport/Content/Item/button refs和render接缝保留。固定0.3.1的Root ref会覆盖内部用于镜像data-scrollable/data-autoscrolling的ref；若需读滚动状态，使用公开hook或Viewport ref，不要依赖带外部Root ref的镜像属性。滚动请求/消息数据、分页加载、连接、业务动作由宿主拥有。

来源与差额：

- [固定作者源码](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/bases/base/ui/message-scroller.tsx)、[Nova](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/styles/style-nova.css)、[原引擎](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/packages/react/src/message-scroller/components.tsx)，MIT。
- 保留content gap24、上下按钮距16、content-visibility:auto/intrinsic auto 10rem。按钮按逻辑方向居中；边缘渐隐转录实际[shadcn共享helper](https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/packages/shadcn/src/tailwind.css)的min(12%,40px)/尾部96px，不依赖CLI。
- 普通paint/focus复用现有buttonRootRecipe并映射Rain背景/边框/文字。200ms进入、400ms退出及原easing保留为局部参数；单独CSS规则保护translate/scale/opacity，不被Button颜色utility覆盖。减弱动效关闭位移/缩放过渡，并在按钮实际激活时将smooth命令改为auto；显式非smooth行为不被改写。
- 默认文本中文；原React19引擎的native DOM语义、先调用caller onClick、preventDefault取消及方向能力保持。启用按钮点击后blur来自原引擎：减弱动效分支只保留同一次blur，不额外聚焦别处；caller取消时不blur。补齐aria-disabled=true/"true"的激活阻断，仍可聚焦，click/Enter/Space均不跳转或调用caller。自定义render时宿主也须保留合并的事件/ref与可访问名称。

差额测试已覆盖region/log/ID/ref、运行时reduced-motion与单次blur、caller取消保留焦点、aria-disabled激活阻断及缺失ID。前插/流式高度变化、拖动滚动、初始三种位置、滚动timeline尾端、最后一行不被mask遮住、RTL、主题/密度及长内容由真实浏览器验证；本组件候选未发布、用户视觉Gate独立。
