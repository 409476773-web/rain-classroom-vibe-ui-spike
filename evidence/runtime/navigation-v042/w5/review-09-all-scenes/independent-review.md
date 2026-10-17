# Review09 独立只读审查

共享导航、R4–R6 和 S1–S6 的本轮改动未发现阻塞问题。此结论不把审查者自己实现的 R1–R3 修复计入独立审查。

- NavigationList 的紧凑 Tooltip 仍使用原生链接，保留 href、修饰键激活、禁用、当前页和既有描述。Rain Tooltip 的右侧呈现、悬停、键盘焦点和 Escape 现场通过。
- 平台居中规则限定到三类局部平台区域的单图标入口；实测目标 40px、图标 18px、中心偏差 0px。
- R4 搜索空态与匹配计数、R6 单一 Empty 与部分匹配分组均与实际结果一致，清除搜索保留当前对象及草稿。
- S1/S2/S6 恢复栏跟随实际内容身份；S5 版本记录、通知和帮助给出本地反馈，恢复默认关闭悬停预览并保留草稿。

独立抽查 7/7，通过后零 pageerror。已核对 owner 报告：R4–R6 的 29 个场景加 9 个空态检查，63 个配色节点变化、0 个几何变化；S1–S6 的 27 个矩阵案例、7 个 hover 案例、425 项检查，14 个单测，报告与当前源 SHA 一致。R6 没有 GUI inverse 开关的范围限制正确保留，未冒称运行。

[结构化结论与源 SHA](independent-review.json) · [独立运行事实](independent-runtime-final/facts.json)

最终冻结后 metadata/Gate/源码闭包/保护快照补核通过，378 项独立登记核对无错误。四 Registry 的 67 个哈希记录对应 41 个实际源文件；10 份更新的候选 Manifest 与两份未改 Layout Manifest 共 12 份均核验。122 个局部别名引用现有 Token，71 个接受组件与 Foundation 文件保持字节一致。

三种 UI family 的物理源码与既有依赖闭包各 14 文件；业务本地 14、R2 本地 9 加既有 Pattern 4、可选 Gallery 4 闭包存在且无遗漏。Tooltip、Empty、SegmentedControl 等登记依赖、实际源哈希与对应 Manifest 路径均核验。旧 Registry/Manifest 历史字段、G1 sourceSnapshot/验收及 Review08 历史保持。

独立对保护快照的 17,919 个仓库旧文件与 254 个工作包旧文件逐一重新计算 SHA：修改及新增与根代理授权清单完全一致，零删除，旧证据和冻结原稿不变，分支与 HEAD 不变。详见 [独立登记核对](independent-metadata-check.json)、[独立保护核对](independent-protection-check.json)。

根代理最终技术结果为 117 项单测、113 个浏览器合同通过，另有 2 个截图专用 case 跳过；首次 3 个定位/呈现判定错误修正驱动后通过且无 production 改动。Playground 类型检查及构建通过；完整测试类型项目仍有 7 项既有诊断、零新增。此审查复核报告与事实，不重复广泛测试。

人工 G2/G3、跨浏览器、完整对比度与 VoiceOver 仍独立；W6 只做部分准备，W7/W8 未完成。
