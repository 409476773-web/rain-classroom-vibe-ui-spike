# 图表质量限定验证

当前事实与每个入口的唯一来源见 [summary.json](summary.json)。本目录的私有检查独立于既有业务测试，不覆盖旧证据目录。

- 19 个默认 Registry 入口 × Chromium／Firefox／WebKit × 1440／390，共 114 个唯一入口观察。采用 cross-02 中 111 项与 cross-05 中补齐的 Network 窄屏 3 项；源码前后静止、无页面异常，检查有限几何、精确表可读、文档横向边界及实际文字颜色。Network 窄屏按既有完整关系列表／节点详情／精确表读取，绘图隐藏是当前正确合同。
- 原 114 张截图是普通入场的当帧入口观察。最初私有配置的顶层 `reducedMotion` 不属于当前合法 UseOptions，不能由这个配置字段声称减少动效；原执行文件和失败保留。后续终态检查显式调用 `page.emulateMedia`，同时核对 `matchMedia` 与实际宿主状态。
- terminal-01 中 Scatter 两尺寸的 72 个实际点，以及 Matrix 两尺寸各 5 个绘图区域，逐个入视口、确认 revealed 和稳定几何后拍摄。Line 原 clip 谓词对空集合成立，不能作为完整绘制证明；terminal-03 在最终 native 源上，以每尺寸非空三个真实 series path 的完整宽度证明替代。共 6 个终态 case / 14 个实际 plot，与普通动效当帧 114 张入口观察分开。
- 真实必要文字 RED 为 red-03：Line／Composed 共 29 个轴标签与普通图例标签，白底比值 3.7083。运行样式只将公共 `--chart-label` 从已有 Neutral5 改为 Neutral4，green-01 同样 29 项比值为 5.5667，4.5 阈值保留。系列颜色、原生几何与其余 CSS 字节保持，见 [唯一文字色变更](style-change-proof.json)。颜色登记 4 项目标检查及私有类型检查通过。
- settled Sunburst 原测量独立保存：三个顶层白字／不透明扇区比值约 3.9748、4.2252、3.2970；九个子级 alpha 表面另列条件项。主任务采用现有深色 token 的 2px 描边后，sunburst-outline-03 的 default / interactive × 1440 / 390 四项，及 sunburst-dark-01 的同页两调用一项均通过。实际白字对不透明描边的比值为 7.921，paint-order 为 stroke、opacity 为 1，原图色保留。下钻和返回保持完整精确表、原命令与配色；坐标最大浮点差约 9.24e-14。默认蓝灰单色两宽度仍保留原深字、无描边。此限定修复不授全图形对比度验收。

已有每次真实失败都保留并在 summary 分类：沙箱启动、宿主或图例选择器、生成期间导航销毁、误将窄屏 Network 强求为 SVG、保存的检查副本被误发现、Line 空集谓词、Sunburst 三叶下钻误要求超过三条和懒加载入视口顺序，以及将约 1e-13 的原生浮点变化强求为 path 字符串完全相同。这些脚本／执行问题不冒充运行源码修复。Brush 六个真实 pointer RED 则由主任务修复原生实际 extent 反解，见 [独立只读复核](native-brush-review.md)。

原入口和 terminal-01 使用 [原安装身份](dependency-before.json)。终态 Line 和受影响 Brush 追加使用 [新安装身份](dependency-after.json)，不把早先结果说成新依赖下的全量执行。统一范围与当前新 Brush 12 项 / 四项主题替换见 [quality verification](../verification.md)。WebKit 自动化不代替 Safari 实机；浏览器键盘／原生日期控件不授 VoiceOver 或实体触摸验收。完整系列／渐变／纹理／淡化／强制颜色对比度、任意大数据、真实实时接口、发布／迁移／Figma／Git仍保留各自边界。
