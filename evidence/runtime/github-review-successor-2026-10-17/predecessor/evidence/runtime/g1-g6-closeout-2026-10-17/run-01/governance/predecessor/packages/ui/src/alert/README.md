# Alert

页面内持续提示。单段文字默认使用对应状态色正文、不显示图标；标题、说明或操作等复合内容显示对应状态色的面状图标与浅色底。`tone` 为 info / success / warning / error；`presentation` 为 page / banner，两者独立。四种状态都不会自动消失。

```tsx
<Alert tone="warning">
  <AlertTitle>还有 3 道题未设置分值</AlertTitle>
  <AlertDescription>补全分值后再发布作业。</AlertDescription>
  <AlertActions><Button onClick={openQuestions}>检查题目</Button></AlertActions>
</Alert>
```

支持纯文本、标题、说明、操作区；说明可放段落、列表和 Link。窄容器中操作区下移，长单词换行。Alert 内操作按钮应使用对应状态色的文字或小尺寸三级按钮，按钮文字和描边跟随提示色系。Banner 只改变边框与圆角，定位留给宿主布局。

`onClose` 存在时显示原生关闭按钮，默认名称「关闭提示」，可通过 `closeLabel` 改为场景化文案。回调只请求关闭；宿主决定是否移除、取消任务、保存状态，以及移除焦点元素后把焦点移到哪里。关闭后应保留查看问题和重试的入口。不要把关闭等同于问题解决。

静态内容默认没有 live-region。动态非紧急反馈可由宿主设置 `role="status"`，确需立即播报才使用 `role="alert"`。含操作时优先单独播报简短状态，避免整段交互内容被重复播报。组件不主动聚焦，不设置标题 ID。

旧版 A 短提示配方保留为显式兼容标识，可设置 `localRecipe={alertClassicShortRecipe}` 与 `icon={false}`；当前单段文字默认已经不显示图标，并使用 4px 上下内边距让单行提示保持紧凑。DensityProvider 的 compact 仅缩小水平间距。同色正文的颜色对比度独立记录，不能绕过必要文字可读性检查；关键任务需结合实际背景确认。

先通过 Props 与组合调整；根部样式使用既有 Local Recipe 合同。Ref 指向实际 div。自定义图标必须为非交互的正式 Rain 图标，状态含义还应由正文表达。不要在图标槽放按钮或其他焦点元素。

预览：Playground `#alert`。来源、状态、Token 和安装依赖见 `manifests/ui/alert.yaml` 与 `registry/alert.json`。当前为未发布候选，视觉与对比度均未获得用户验收。
