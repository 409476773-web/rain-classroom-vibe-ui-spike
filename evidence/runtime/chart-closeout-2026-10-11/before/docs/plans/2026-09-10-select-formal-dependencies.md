# Select 正式依赖接入

2026-09-10，用户在完成占位审核后明确要求“继续”。System Mode；范围是当前 Select 的临时浮层、选项呈现与私有已选标签。

1. 复用已安装 Base UI 1.8.0 的 Select / Combobox，使用已有 PopupProvider、浮层样式和 DropdownMenu.ItemContent。移除临时页面内面板及并行的文档事件、选项键盘控制器。
2. 复用正式 Tag，通过 Select Local Recipe 保留现有 Alpha/4、24/28 标签高度、字体、删除操作和触屏目标；保留公共 Select Parts 和所有值、查询、开关、FormItem、加载、错误合同。
3. 更新本轮授权、Manifest、Registry、页面说明与精确校验，记录本轮证据；原始视觉接受、颜色发现及其他组件的阶段不变。

验证：先增加 Portal 组合与正式 Tag 回归，观察旧实现失败；随后运行相关单测、类型检查、治理检查、构建和浏览器矩阵。覆盖普通/搜索 × 单/多选、键盘/焦点、受控拒绝、异步候选、中文输入、三种外观、深浅主题与触屏尺寸。实际浏览器已核对底座标准焦点模型：普通选择由选项持有焦点，搜索由输入持有焦点；键盘动作、受控状态和组件焦点通知保持原合同。

自动验证、独立审阅、人工视觉验收分别记录。本轮不包含发布、Figma、业务迁移或 Git 操作。

本批 `formalDependencies` 是独立追加授权：在 Select 这一来源内，取代首次建设暂缓 headless selection 的约束；不扩展其他组件或全局底座迁移。技术接入、原字段颜色治理、人工视觉验收的状态独立登记。结果与发现见[本轮验证](../../evidence/runtime/select/formal-dependencies.md)。
