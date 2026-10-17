# G5 本地验证

2026-10-12，已完成获授权的本地候选建设与专项验证。工作区 `.worktrees/card-v2`，分支 `codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。未提交、未发布；G5 Human Gate 为 `awaiting_human`，对比度接受未授予。

## 最新六条反馈修正

按用户 2026-10-12 的六条浏览器标注，翻月改为线性左右图标，移除常驻确认提示并保留按需校验，取消用三级按钮，两个完成按钮用一级按钮，重试文字按钮增加 refresh 图标。

本次 [77 项专项回归、28 项浏览器检查、908×797 截图及独立源码复验通过](feedback-01/verification.md)，工作区类型检查和 Playground 构建通过，源码 ZIP 与当前版本一致。下方 215 项等首次建设记录属于前一源码快照；最新结果见反馈记录。G5 人眼和对比度接受仍待确认。

## 实际交付

| 能力 | 当前结果 | Playground |
| --- | --- | --- |
| Label | FormItem 与控件自有标签收口，关联和点击聚焦 | `#label` |
| Field | 沿 FormItem、布局和宿主校验，作业发布设置可保存 | `#field` |
| Input Group | 行内沿 Input 系列；Textarea 增加上下附加区与权限控制 | `#input-group` |
| Native Select | 原生单选、option / optgroup、原生表单提交 | `#native-select` |
| Combobox | 输入式单值选择、可选显式自定义项、异步状态和清空 | `#combobox` |
| Slider | 连续值与双端范围、键盘和指针、操作结束提交、精确输入组合 | `#slider` |
| Calendar | 中文周一、单日与区间、禁用日期、年月和网格键盘、翻月动效 | `#calendar` |
| Date Picker | 单日 / 日期时间 / 日期区间 / 日期时间区间，全部确定后提交 | `#date-picker` |

八项文档入口对应五项新增 UI 资产。Label / Field 没有新增同义组件；Input Group 是[组合合同](../../../manifests/recipes/input-group.yaml)。[按用途使用](../../../docs/ai/g5-components.md)、[Registry](../../../registry/g5-assets.json)、[固定来源与许可证](source-lock.json)已接入。NativeSelect、Combobox、Slider、Calendar、DatePicker 及其公开类型从 `@rain-next/ui` 导出；Textarea 扩展保留既有合同。

每页包括 API、使用说明、来源与可复制例子。作业设置完成校验和本地保存；教学筛选的课程、成绩即时生效，统计日期在确定后生效。文档和样板的结果均为页面本地数据。

## 最终检查

| 检查 | 结果与证据 |
| --- | --- |
| 组件、相关旧字段及治理回归 | [16 文件、215 项通过](scoped-unit.log)：173 项组件与样板检查，42 项治理、颜色与 G4 证明链检查 |
| 工作区及测试代码类型检查 | `pnpm typecheck` 通过；[记录](typecheck.log) |
| 全部工作区构建 | `pnpm -r build` 通过；[记录](build-workspace.log)。最终文案与教学筛选用例补充后 Playground 再构建通过：[记录](playground-final-build.log) |
| 锁文件 | 离线 frozen-lockfile 检查通过；[记录](lockfile.log) |
| G5 来源、导出、登记和颜色消费 | 专项检查通过；[结果](scoped-governance.json)、[执行记录](scoped-governance.log) |
| AI 索引 | [引用与生成内容检查通过](asset-index-check.log)；[Combobox 实际命中](ai-combobox.txt)、[日期实际命中](ai-date.txt)。五项新资产逐一断言非空 |
| 综合 Chromium | [14 / 14 通过](browser/report.json)，1440×1000 与 390×844；[日志](browser-main.log) |
| 日期 Chromium | [14 / 14 通过](browser-dates/report.json)，同样两种宽度；[日志](browser-dates.log)、[专项说明与截图](browser-dates/README.md) |
| 独立源码包 | [140 份登记源码、87 份 UI 文件](consumer-validation.json)；仓库外临时宿主检查 1078 个类型文件和 1791 个构建模块，零越界；ZIP 完整性通过 |
| 独立消费 Chromium | [两个宽度、四种日期模式均通过](consumer-browser.json)，含自定义项、键盘滑块、Textarea 操作及只读复制；无浏览器异常或水平溢出 |
| 既有共享源码 | [71 份受保护源无变化](protected-source-check.json)；旧 G4 接受、来源和确认记录保留原字节 |

浏览器检查覆盖页面导航焦点和复制、标签关联、原生表单、样板操作、浅深主题和双密度、浮层宽度与主题、键盘选择和焦点恢复、确定草稿、嵌套 Dialog / Sheet 关闭层级、区间重排与窄屏保留草稿、时分无效与逆序、正常和 reduced-motion、快速翻月后的动画清理。未保存的中间失败与诊断日志保留，最终结论只采用上表的通过记录。

动态检查测得 Combobox / DatePicker 局部开闭过渡 180ms，Calendar 翻月 220ms；减少动态效果后关闭相关过渡和日历动画。日期按钮的选中数字使用白色并继承状态前景，窄屏的底部确定操作可滚动到达。最终截图已经代理查看；这不等同于用户人眼接受。

## 独立审阅和历史兼容

[审阅与修正汇总](review-summary.md)、[Combobox / Slider 详细审阅](review-b.md)记录实际发现和修复。包括组件样式导入、重试焦点、日期按钮前景、日期和时分边界、索引状态词以及独立包公开入口。

[当前来源绑定](source-bindings.json)只含 66 个有限路径。G4 原证据没有重写；新候选通过不可变启动基线和固定前态快照接回原证明链。四个 G4 证明入口通过，非法授权、旧 Gate 篡改、当前源码失配与前态快照重签被拒绝。G4 扫描只额外接受获授权的准确 G5 页面路径；重复、额外目录、缩进或同行追加均拒绝。以前的视觉接受和其他权限没有转移到 G5。

## 完整工作区与剩余边界

完整工作区的 workspace / evidence / boundaries / Tailwind B2 / Token 检查仍有失败：[检查清单](global-checks.json)。冻结 B2 历史失败在本轮启动时的原 helper 与原 phase 中同样存在：[启动时复核](baseline-history-check.json)。其他报告仍包含既有命令集、图表测试反向依赖、旧全量文件清单及其他组件颜色登记和适用性问题。本轮修复新候选接入造成的 G4 来源和扫描兼容问题，没有把旧全库失败当作通过，也没有扩展旧阶段权限。

G5 新颜色已登记：46 项 Category 消费、24 项继承 / 系统消费。专项数值结果中没有新增低于阈值的文本对比或状态对比发现；仍有 20 项 Weak Neutral 色彩适用性待审。继承的 Field / Button / Select 仍保留各自既有问题。上述数值和源码检查不授予对比度或颜色适用性接受。

尚未验证实体中文 IME、Safari / VoiceOver、触屏、完整 forced-colors、生产数据与性能。NativeSelect 首版验收单选；秒、复杂时区、独立 disabledTimes、排班、多字段共框和完整表单系统不在本轮范围。

[源码 ZIP](g5-source-consumer.zip)包含源码闭包、同版样式、运行说明、固定直接依赖和 MIT 许可证；不包含安装缓存或构建结果。验证使用已安装依赖的完整本地副本，未做清洁联网 `npm install`，不将本机隔离构建当作该结论。人眼接受、无障碍设备接受、发布、Figma 写入、业务迁移和 Git 操作仍分别处理。
