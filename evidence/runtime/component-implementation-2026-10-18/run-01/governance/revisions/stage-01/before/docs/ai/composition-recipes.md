# 可复制的三种小组合

这三份源码是可复制、可修改的本地组合示例，不是新增公共组件或已经验收的页面模板。先判断对象与操作范围，再选用；设计入口见[本库原型接入说明](prototype-design.md)。每份导出都没有必填 props，包含明确的模拟数据和页面内状态；复制后把宿主数据与保存适配替换成自己的业务实现。

| 组合 | 唯一代码来源与导出 | 适用 | 不适用 |
| --- | --- | --- | --- |
| 筛选工具栏 | [filter-toolbar.tsx](../../apps/playground/src/docs/examples/filter-toolbar.tsx) · `FilterToolbarExample` | 多个条件共同作用于一份结果，明确点击查询生效 | 多区域各自筛选；需实时反馈却仍强制点查询；后端分页却只过滤当前页 |
| 分区大表单 | [sectioned-form.tsx](../../apps/playground/src/docs/examples/sectioned-form.tsx) · `SectionedFormExample` | 短字段成组、长说明独占一行、整表统一保存；也是 Field 页的完整复制例子 | 有独立保存权限或生命周期的不同对象；必须逐步完成的复杂流程 |
| 连续批改操作区 | [grading-actions.tsx](../../apps/playground/src/docs/examples/grading-actions.tsx) · `GradingActionsExample` | 明确当前学生与题目，保留逐份草稿，显式保存后继续 | 批量自动改分；共享并发编辑；把布局收起/导航事件当成保存 |

三个文件都从 React 与 `@rain-next/*` 公共入口导入，没有额外依赖。沿用项目的完整样式入口、字体与 Token；不要只复制某个内部 CSS。导出 Starter 的 #compositions 页面提供同源预览；原工作区在实际文档使用同一 TSX。复用时可以直接导入，也可复制到页面自有目录并保留来源和本地修改记录。

## 同排尺寸要显式对应

分区表单继承宿主的 Density（独立使用默认为 default），不会覆盖 Playground 的密度预览；筛选与批改示例分别显式展示 compact/default 场景。Density 表示场景上下文，不保证不同家族的默认高度相同。不要仅给父级设置 compact 就认定 Button 与字段等高。以下是这三种组合的选择，不扩展全局高度轴：

| 行用途 | Input / Select / InputNumber | 普通 Button | 组合选择 |
| --- | --- | --- | --- |
| 紧凑筛选 | `size={32}` | `size="small"` → 32px | 筛选工具栏显式设置；标签上对齐，按钮与控件底边对齐，窄处整组换行 |
| 表单与批改操作 | `size={36}` | `size="medium"` → 36px | 短字段与保存动作按同档配置，说明和错误保留在字段附近 |

Button 的 mini/small/medium/large/xl 对应 28/32/36/40/48；Input、Select、InputNumber 的尺寸轴为 24/28/32/36，名字和默认密度不能互换。文本按钮有独立尺寸语义，不把它强行拉成普通按钮同高；Textarea 由阅读内容决定高度，不纳入单行 32/36px 对齐。

间距使用已有 [Space 合同](../../packages/foundations/src/composition-contract.ts)；字体用 [Typography 合同](../../packages/foundations/src/typography-contract.ts)；线、圆角、颜色看 [Token 合同](../../packages/foundations/src/token-contract.ts)。本地字段宽度/阅读宽度是布局决定，不能为了一个 240px 宽度新增 Space Token。

## 状态由谁负责

| 层 | 负责 | 示例中的位置 |
| --- | --- | --- |
| 宿主页面或业务适配器 | 稳定对象 ID、查询条件、请求、权限、校验规则、草稿、保存、失败重试、导航后是否保留 | 三个 `*Example` 函数组件；接真实业务时可上移至页面状态或显式 adapter |
| 组合与 Layout | 字段分组、行列、换行、留白、阅读顺序 | 本地 form/fieldset，以及公共 Grid/Stack；不请求数据、不自动保存 |
| 共享 UI | 输入/选择、菜单、标签关联、错误呈现、键盘与焦点基础 | FormItem 与公共控件，保持 API、行为、Tokens 和扩展点 |

筛选例子把 `draft` 与 `applied` 分开：输入不改变已展示的查询范围，查询才提交条件；重置同时恢复条件和结果。真实异步接入要在宿主保留请求状态、过期响应处理与分页含义，不能把这些塞入 Input 或 Select。

分区表单每个错误属于对应字段，`FormItem.status/message` 产生错误外观和 `aria-describedby` 关联。提交时按可见阅读顺序定位首错：名称 → 课程 → 满分；课程用公开 `SelectHandle.focus()`，数字用原生 input ref。编辑一个字段只清理该字段的提交错误，保留其他错误与所有值。InputNumber 的格式/范围反馈会自动注入 FormItem；业务 message 应表达额外的保存约束，避免重复同一条数字错误。示例的提交范围说明与控件的具体格式反馈可同时出现。InputNumber 还可能有未提交的输入草稿，因此保存同时检查数值范围和当前输入 `validity`；不能只看上一次合法 number 状态。示例范围 1–200 为本地演示规则，不代表全业务限制。

批改例子以 `studentId:questionId` 为草稿/保存记录的键，显示顺序与当前索引不是身份。上一份、下一份只导航，草稿保留；保存并继续先捕获当前 ID 和 payload，再写入该对象的记录并推进。接异步服务时使用所捕获的 ID 关联结果，是否等待保存完成才导航、失败如何重试、跨页离开和并发版本冲突由业务明确决定。示例只实现同步本地模拟，不具备服务器落库、刷新恢复或生产并发保证。

## 可以改哪里

可直接改：三份页面局部 TSX 的字段、顺序、标签、候选数据、分区、宽度、窄屏换行与主次按钮；在宿主增加真实校验/请求/任务切换策略。保持可访问名称、控件与标签/错误关联、稳定对象键和明确保存范围。若需求不再匹配上表，退回公共 UI/Layout 重新组合，不为套示例改变业务。

需要通过公共扩展点改：使用 Props/Variant、已有 Part/Slot、具名 Local Recipe；必要时明确建立页面 Local Fork 并记录来源。不要在业务页覆盖全局 Token、改共享组件默认尺寸/交互、重写焦点或选择引擎、让 FormItem 决定业务有效性。

对应真实合同：[Button](../../manifests/ui/button.yaml)、[Input](../../manifests/ui/input.yaml)、[Select](../../manifests/ui/select.yaml)、[InputNumber](../../manifests/ui/input-number.yaml)、[Textarea](../../manifests/ui/textarea.yaml)、[FormItem](../../manifests/ui/form-item.yaml)。可复制来源保持为上面三份完整 TSX，文档不另维护会漂移的删节代码块。类型与本地行为验证不代表人工视觉验收、对比度、Safari、触屏或生产接入已完成。
