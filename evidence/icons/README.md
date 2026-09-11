# 图标来源与可用性

2026-09-03 从 [Figma「02 · Icons」](https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=1-3) 只读冻结。69 批返回数量与偏移闭合，共 897 个主组件，名称、Node ID、Component Key 均唯一，画布均为 24×24。

- 897 个资产已导出并生成静态引用；766 个随宿主供色，131 个按明确的原始配色说明保留颜色。
- 2 个原异常源已按用户要求恢复准确原版轮廓并重新导出；当前没有不可用资产。历史失败保留在 source-repairs.json。
- 已确认的语义身份、场景和配对以[图标选择规范](../../docs/ai/icon-selection.md)为准；2026-09-07 已补充用户确认的 9 组关系，其余资产不自动获得全局语义。
- 18 个 legacy-shape 资产保留原名，不猜测新语义，不自动废弃。

## 可追溯文件

`source-nodes.json` 保存完整身份、源描述、绘制属性、读取时间与批次。读取窗口为 2026-09-03 17:07:46–17:37:46（Asia/Shanghai）。工具未提供可冻结的文件版本号，明确记为 unavailable；不把 Component Key 当成版本或发布证明。

`source-exports/` 当前保存 897 份未经改色的 SVG 和 1 份 button-loading 原始 PNG。两个历史透明 PNG 已连同 SHA-256 和原失败结构归档到 source-repairs.json，避免在活动导出目录中混入无运行消费者的文件。SVG 使用 SVG_STRING、contentsOnly:true、svgIdAttribute:false；PNG 使用同节点、contentsOnly:true、useAbsoluteBounds:true、3 倍导出，得到 72×72。传输分段以无损压缩和逐段校验避免工具截断，解码后保存原始 SVG 字节。

`inventory.json` 记录每项来源、原始 SHA-256、颜色处理依据、运行路径和可用性。`source-lock.yaml` 锁定清单与元数据摘要。运行 SVG 与原始 SVG 字节相同；Loading 使用同节点 PNG alpha mask，无几何重绘。`color-decisions.json` 保存 131 项显式固有配色依据。`source-failures.json` 的活动异常列表为空，resolvedAssets 指向 source-repairs.json 中完整的修复前后证据。该修复证据的 SHA-256 也进入 source-lock.yaml。

## 两项源异常已修复

| 资产 | 节点 | 证据与处理 |
|---|---|---|
| icon/editor-redo | 84:35 | 原版 61:32325 的完整矢量轮廓已恢复到原子节点 84:34；重新导出正常，原名称与组件 Key 保持不变。 |
| icon/editor-undo | 84:32 | 原版 61:32323 的完整矢量轮廓已恢复到原子节点 84:31；重新导出正常，原名称与组件 Key 保持不变。 |

2026-09-03，用户明确“修复两个源图形异常”。原版文件 MbWg1ft5zk1JRQiQ6dS30e 仅作只读来源；目标文件仅更新上述两个矢量子节点。原版 PNG 与 vectorPaths 完整，但 SVG 导出在零长度圆角线段产生 Lnan nan，位置与目标开放路径截断点一致。修复直接恢复原版完整路径，移除不改变轮廓的零长度线段，保留目标蒙版、宿主色绑定及组件身份；没有改用普通 redo/undo 资产。18:22:21 完成独立回读。

两项仍未定义全局语义规则。当前 897 项均可用；用户在两项修复交付后于 2026-09-03 回复“确定”，本次两项修复的视觉 Gate 已单独记录为 accepted，原图标库已接受的 Gate 保留。未执行任何发布。

## 同形候选

对原始 SVG 仅在比较内存中统一局部 ID 后，有 22 组内容一致候选：add/add-alt；calendar/calendar-alt；chevron-down/chevron-down-alt；clear/clear-alt；close/error/error-close；copy/copy-alt；delete/delete-alt；download/download-alt；editor-image/image/image-alt；eye-hidden/eye-hidden-alt；eye-visible/eye-visible-alt；folder/folder-alt；link/link-relation；loading/loading-alt；minus/minus-alt；more-horizontal/more-horizontal-medium；more-vertical/more-vertical-medium；refresh/resend-refresh；save/save-alt；search/search-alt；upload/upload-alt；warning/warning-triangle。

比较未改动文件，不构成语义等价、别名、合并或删除决定。尤其 close/error 同形不改变用户已确认的失败结果使用 circle-close；refresh/resend-refresh 同形不把所有“重新”动作都变成刷新。

## 消费与更新

### 2026-09-08 题号批改圆环补充

用户接受 32px 题号预览并授权正式建设后，新增 `icon/grading-pending` 与 `icon/grading-reviewed`。来源为 Figma 文件 `MbWg1ft5zk1JRQiQ6dS30e` 的 `2761:19670`／`2761:19678`，前景分别为 `2761:19672`／`2761:19680`；它们不是 Component，不登记虚构的 Component Key。

`source-additions.json` 保存本次授权、来源与原始 SHA-256；`source-additions/*.source.svg` 保留未经修改的 12×12 导出。生成器仅移除白色底板并将前景改为宿主着色，圆环路径和画布保持不变；底板由题号组件提供。待批改为静态虚线圆，已批改为实线空心圆，不扩展为 Loading 或答案正确的全局规则。

原 897 项的来源数据和运行资产保持原样，新增后共 899 项。补充资产的生成与组件预览验收分别记录，不继承原 897 项的图标库 Human Gate，也未执行发布。

先读 `docs/ai/icon-selection.md`，按实际场景查规则，再从 `@rain-next/foundations/icons/catalog` 查可用性与导入路径。静态页面使用单图标入口；完整预览入口只供图库页面使用。目录地址为本地文档站 `#icons`。

`pnpm generate:icons` 从本次冻结来源和确认规则重新生成；`pnpm verify:icons` 检查生成漂移、目录闭合、来源与实际单图标生产构建。更新来源时需保留变化依据，不能仅把哈希改成新的数值。生成、代码验证、Human Gate、Figma 发布和包发布分别记录；本次没有任何发布。
