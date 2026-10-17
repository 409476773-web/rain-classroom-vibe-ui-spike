# v1.2 依据、版本与验证边界

## 1. 本轮实际使用的输入

1. `rain-next-two-week-codex-workpack-v1.1-source-first.zip`：实际解压并读取00—05及64项JSON。
2. `雨课堂-两周开发与验收进度表.xlsx`：实际读取原G0—G6顺序、64项及页面P1—P6；上传版本开发反馈均待核对，页面均待开始，没有收到用户另行填写的进度副本。
3. `雨课堂-基础Token审阅与前置建设清单.md`：实际读取，作为本轮新增基础任务的主要来源；全文保留在references。
4. `雨课堂-vibe coding组件库改造计划.md`及当前对话的明确要求：原型优先、AI组合与改造、分类Playground、两条线并进、默认多方向/快速一版。

v1.2只是整合计划与重新生成个人表；未再次审计实时GitHub、未重新统计官网、未运行本机项目。原64项保持2026-09-18冻结口径，不称为2026-09-19官网当前完整目录。其他计划数值/分组/时间盒是实施建议，不冒充既有确认事实。

## 2. 事实分层

- 已由用户明确：优先工作台、报告；5—10轮修改为用户自述；常规尺寸和克制字号；辅助信息退后；需要自主创造局部组合；快速补规模与源码适配优先。
- 历史源码审阅：主审`cf911c86078783df1fcd4228707873cfd6df2066`；补充分支`f5ffe5084c3d8105c587ac460af5b995a3380a83`；早期`055e47bb4bb9bbe5f98a39f2404fc77e7e977e80`。
- Token审阅结论：269颜色身份、20组Tag、19字号/15固定行高、16间距等均限定上述快照；不是本机当前数量或达标数。具体见references原文。
- 尚未验证：当前开发路径、未提交源码、最新依赖、实际已完成组件、自动加载规则/Skill、用户本机字体、完整可访问性及跨机器运行。
- 本包新增实施规划：F01—F08、基础前置时间盒、样板检查、来源映射模板、个人表新公式。它们不是现有代码API。

## 3. 历史官方依据（本次未重新联网核查）

| 用途 | 原资料 |
|---|---|
| 冻结目录来源 | https://ui.shadcn.com/docs/components |
| 源码持有方式 | https://ui.shadcn.com/docs |
| CLI与变更 | https://ui.shadcn.com/docs/cli |
| 语义主题 | https://ui.shadcn.com/docs/theming |
| 组合示例 | https://ui.shadcn.com/blocks |
| 图表接入 | https://ui.shadcn.com/docs/components/base/chart |
| 数据表组合 | https://ui.shadcn.com/docs/components/base/data-table |
| 上游许可入口 | https://raw.githubusercontent.com/shadcn-ui/ui/main/LICENSE.md |
| Tailwind主题机制 | https://tailwindcss.com/docs/theme |
| Ant主题分层 | https://ant.design/docs/react/customize-theme/ |
| Material主题/空间/层级 | https://mui.com/material-ui/customization/theming/ |
| 间距 | https://mui.com/material-ui/customization/spacing/ |
| 响应式 | https://mui.com/material-ui/customization/breakpoints/ |
| 叠放 | https://mui.com/material-ui/customization/z-index/ |
| 动效 | https://mui.com/material-ui/customization/transitions/ |
| 颜色用途分档 | https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale |
| 文字/非文字可读性 | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html |
| 非文字对比 | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html |

执行时核对所取源码的具体版本/许可/依赖，不假定当前上游示例匹配旧Rain锁文件。03中`catalogKey`不是安装ID。官方目录变化记后续，不默改64分母。
本包不会下载或分发这些库的源码，也不包含任何字体文件。

## 4. Figma 与当前测试入口

用户文件：`MbWg1ft5zk1JRQiQ6dS30e`。
- 批改：2817:82063
- 报告：2817:82831、2572:68083、2572:61528、2572:63974
- 卡片/列表/表格：2817:83796、2572:63140、2572:77172、2673:63540
- 表单：2817:84304

链接形式：`https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e/?node-id=2817-82063`，其他节点替换node-id。
前轮实际看过静态图；本轮没有重新读图层、变量、交互。Codex按已授权连接读取指定节点；无法访问就标记，不伪造。
用户原型`http://127.0.0.1:5326/#teacher-grading`只能在对应本机定位。历史`#bm-c`不等于该页面；本包未打开这个服务。

## 5. 状态与版本不混淆

原Token审阅中的“建议先做”不等于已建设；旧Human Gate不自动覆盖新组件；个人表状态不替代仓库身份/成熟度/发布字段。
复制旧包执行中的记录时，以当前工程证据为准。本包JSON保留旧`not-verified`作为历史规划字段，不能回写覆盖真实完成状态。
本次工作包/表格结构自检，只说明文件可读、64项未丢、任务关联一致、表格公式可用；不是工程构建、浏览器回归或设计验收。
