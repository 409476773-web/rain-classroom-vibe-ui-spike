# 趋势／面积交互与动效改造验证

日期：2026-10-07。状态：本地实现及最终独立检查完成，等待用户视觉验收。范围为已确认方案v0.5的一个完整趋势／面积样本，位于本地图表实验室。

**并行路线已保留：** 实施期间，“推进 Rain Next 验收计划 (2)”确认并开始Bklit原生＋Rain主题的独立接入。共享方案第10节v0.6未被本任务改写。本次完善的是既有G2对照实验，依据[已授权v0.5快照](before/design-v05.md)，不表述为新Bklit样本已经完成。

入口：[Rain 图表实验室](http://127.0.0.1:5387/chart-validation.html)。工作树为`card-v2`，分支`codex/card-v2`，起点HEAD为`321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。5387服务的工作目录已核对为本工作树的`apps/prototype`。

## 实现与边界

- 保留Plots／G2绘图；仅趋势样本增加页面私有反馈与材质层。G2的实时路径、世界变换、坐标与入场裁切作为几何依据，面积左右淡出、渐变及局部亮线复用该几何。实验室仍为七个Canvas实例。
- 首次约一秒向右揭示；后续数据连续morph。图内指示线与点环灵敏随动，提示框较慢跟随并避让边缘，读数即时更新。共享X身份连接时间浮标、提示与外部读数。
- 临时读取、点击固定／更换、空白／Esc释放；键盘方向键、Home／End、Enter／空格与读数选择提供等价操作。图例聚焦和隐藏同步读数，至少保留一个系列。
- 真实零值保留定位点；缺测保持断线，空隙不画伪点。Reduced Motion停用长揭示、缩放与位置缓冲。
- 保留Rain色组及P03材质；字体、圆角、浮层阴影沿用已有Rain Token。未新增依赖、公共Chart接口或公共Token。柱、迷你、组合、矩阵、桑基与网络继续用于回归。

本地代码为`trend-motion.tsx`／`trend-motion.css`，`cartesian.tsx`仅移出趋势实现；柱与迷你图的原JSX保持一致。Plots2.6.8、G2 5.4.8不变。原生节点属性的局部适配依赖该版本，升级绘图库需重跑几何和动画检查；尚未晋升公共资产。

## 检查证据

| 检查 | 本次结果与证据 |
| --- | --- |
| Chromium行为与回归 | 新6项＋旧4项全部通过，30.9秒，exit0：[最终日志](browser-test.log)。包括反馈状态不重绘原生、悬停联动、固定／更新／释放、键盘、图例3→2→3及颜色、390px零／缺测与Reduced Motion、逐帧贴线；原七实例及其他图型回归保留 |
| TypeScript | prototype类型检查exit0：[日志](typecheck.log)。新测试文件的独立类型检查也exit0：[日志](test-source-typecheck.log) |
| 独立入口构建 | exit0：[日志](build.log)。完整实验页JS约2379kB／gzip712kB，保留大于500kB的构建提示；该数字不是趋势组件或G2单独体积，未据此做性能结论 |
| 连续更新几何 | [保存采样](marker-native-morph-final.json)：固定第6周，110→117，91采样帧全部可见，21个路径版本，最大贴线误差0.022965px。用独立欧氏距离检查点环与当帧曲线，容差1.5px；原生曲线仍为几何依据 |
| 原生浏览器复核 | [操作事实](manual-browser-facts.json)：固定第6周更新82→89，隐藏后2线／2面积、恢复3段；在同一页面缩到390px，X与固定状态保留，指示线及点环与目标中心误差约0.006px，提示框在卡片内。已恢复默认浏览器尺寸 |

结果摘要见[最终记录](final-results.json)。实际图体：[悬停](hover.png)、[固定后更新](pinned-updated.png)、[窄屏Reduced Motion](narrow-reduced.png)、[全页回归](regression/full-page.png)。[交互视频](interaction-preview.webm)和[连续更新视频](update-preview.webm)保存真实浏览器操作。

本轮保留有效RED：旧页面缺少新交互区的[失败日志](red-hover.log)，更新后遗留六条亮线而应为三条的[几何失败日志](legend-red.log)，及[中间帧断线事实](marker-native-morph-first-failed.json)／[失败日志](marker-regression.log)。[修复前画面](retired-paths-before-fix.png)记录退出路径重置为单位变换后造成的残影。

独立源码复核与最终浏览器检查闭合了上述问题：原生Area增加memo边界，退出副本实际删除；G2动画期间的命令数组正确序列化；每帧同步原生几何后再投影点环。最后还修正局部图例被页面通用按钮样式覆盖的优先级，再运行完整10项与构建。

## 保护复查与证据覆盖

[保护结果](preservation-check.json)对应本轮新基线：2278个受保护源码／依赖文件保持一致，柱与迷你图原JSX保持一致；原阶段记录仅新增本轮局部记录。

**有五张首版截图在实现阶段的旧四项回归中被刷新。** 当次未设置截图目录环境变量，影响`chart-library-validation`下的`overview.png`、`full-page.png`、`mobile-full.png`、`sankey.png`、`network.png`。未找到可靠原字节备份，不将现图表述为首版原图。原23项哈希基线仍保留，其他18项不变；原日志、结果JSON和验证文字保持。最终回归显式写入本轮`regression/`，不再写旧目录。

## 尚未验收

本轮完成范围不等于全图型库、生产性能或跨浏览器认证。Safari／VoiceOver、完整对比度审计、大规模数据性能尚未实测；十二周集合固定，删除数据键策略未运行验证；其他六个实例的动效扩展及Bklit原生接入以各自确认方案推进。Figma、发布、业务迁移及Git操作不在本轮范围。
