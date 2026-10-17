# 图表收尾技术记录 · 2026-10-11

本轮可执行的本地代码、工程检查、安装消费、限定质量验证与文档收尾已完成。按用户“接下来，完成所有图表相关的收尾工作”，覆盖既有19入口、170变体、10配方与5类业务样本；未扩建图型。当前可查看[统一审阅入口](human-review.md)，实际范围见[执行计划](../../../docs/plans/2026-10-11-chart-closeout.md)。

2026-10-11，用户回复“确定。”，当前已呈现的本地交付获确认，范围见[确认台账](human-review.md#本轮确认)。此次只补确认登记，运行源码与包内容保持；下方检查仍是上一技术交付的实际结果，没有重复运行或扩大验收范围。本次文档／phase登记的范围核对见[确认记录](user-confirmation-2026-10-11.json)。

实际工作区为`.worktrees/card-v2`，分支`codex/card-v2`，HEAD仍为`321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。783文件改前快照见[基线](baseline-files.json)，当前保护与245运行源码见[最终核对](protection-final.json)及[运行源码冻结](runtime-source-freeze-final.json)。5173实际进程目录与服务中的Brush4已核对，见[预览身份](preview-brush-identity-final.json)。

## 实际修正

| 触发与原表现 | 当前行为及证据 |
| --- | --- |
| Line／Composed的坐标和普通图例在白底使用Neutral5，实际29处普通文字最低3.708:1 | 复用现有Text/Neutral/4，最低5.567:1；只改一个图表角色及对应生成消费登记。系列颜色、几何、字号保持。[质量记录](quality/verification.md) |
| 旭日白字直接落在浅蓝紫扇区，根层实测最低3.297:1 | 默认及interactive示例用原生描边和现有深色色阶，白字对实际描边7.921:1，2px居中描边形成约1px外缘；默认蓝灰仍是深色无描边，原无标签变体不新增标签。两目标单测先失败后通过；明暗主题、根层／下钻／返回的有限读数与截图见[质量记录](quality/verification.md)。描边测量采用[W3C G18的文字外缘方法](https://www.w3.org/WAI/WCAG22/Techniques/general/G18)，不授予全图／全库对比度通过。当前已呈现交付获用户确认，具体范围见[台账](human-review.md#本轮确认) |
| Brush3及旧子依赖的peer声明不接受React19，真正空store严格安装失败 | 仅将Brush固定到与现有Visx同代的4.0.1-alpha.0，同步Registry和lock；两处native类型从公共入口读取，保留MIT与上游来源，更新本地源码锁。[安装记录](install-consumption/verification.md) |
| 真实拖选结束后，上游命中容差的时间域被受控回写；平移让窗口两侧各扩2px | 用实际像素选区反解时间回传，保留正在拖动的指针锚点与null／重置行为。单测先1失败／2通过，再13项目标通过；浏览器6项pointer真实失败后，同一spec最终12／12通过，平移宽度断言保持。[Brush复验](quality/themes/brush-next/README.md) |

修复覆盖调用方、来源锁、类型出口、依赖锁、Registry、生成消费登记、相关测试及使用说明。未新增图表API、框架、主题或全局Token。

## 当前检查

| 项目 | 实际结果与范围 |
| --- | --- |
| 当前图表单元／合同 | 63文件761项通过，[最终日志](unit-final-02.log)及[目标文件](unit-files-final.json)。新增2个旭日读数用例，Brush已有用例补commit精确范围断言；中国地图测试等待实际异步搜索入口，保留原操作与读取断言 |
| 工作区与测试类型 | 全部现有工作区及测试工程通过，[工作区日志](typecheck-final.log)、[最终测试类型](tests-typecheck-final.log) |
| 标准宿主构建 | Playground与Prototype均通过，[构建日志](build-final.log)；既有大包体积提示保留，不等于生产性能验收 |
| 生成与依赖一致性 | [Token](token-generation-check-final.log)、[图表utility](chart-style-check-final.log)、[资产索引](asset-index-check-final.log)、[冻结lock](lockfile-check-final.log)均通过 |
| 全170来源下载 | 最终全部类型与生产构建通过，16家族170真实文件集、19 Registry闭包、181 native来源锁；完整UI／Foundations复制已安装缓存，alias和依赖路径外逃为0。[最终facts](consumption-all-170-final/facts.json)。此项不称为干净安装 |
| 真正完整打包／安装 | 实际两包tarball含2299＋36份源码、MIT及905＋9项export文件；新空store严格peer联网下载安装126包、reused0、warning0。20套真实下载类型／构建、19 Registry闭包及40宽窄浏览器通过。[安装消费记录](install-consumption/verification.md) |
| 浏览器与质量 | Chromium／Firefox／WebKit×1440／390的19默认入口共114次入口检查；Line／Scatter／Matrix补非空、入视野、明确减少动效的终态检查。36条代表性深色／强制颜色键盘路径按实际源码及补验登记；Brush当前三引擎宽窄12项、旭日明暗读数另列。[质量范围与原始失败](quality/verification.md)。不将这些观察相加成新图型或全170跨浏览器验收 |

当前SSR边界已经实测并写入使用说明：无DOM Node中公共DataBar输出语义读数，公共Line／Live为未测量shell，默认Line示例保留原始表；默认Live示例因读取`document.hidden`真实拒绝。整份下载示例支持浏览器CSR，未实现或承诺完整SSR／hydration。[有限SSR复验](install-consumption/verification.md#ssr边界)。

## 原始失败与保护范围

首次完整消费真实暴露Brush4封装阻止旧深层类型导入；修复后重新打包、使用新空store重验。首次170类型失败见[原始日志](consumption-all-170/typecheck.log)，最终成功使用新的宿主。首次拖选失败与单测见[精确范围RED](brush-extent-red.log)，真实浏览器原spec及最终结果保留于[Brush记录](quality/themes/brush-next/README.md)。

首轮64文件检查包含资产索引治理用例，2项因既有冻结B2历史错误失败；63份图表目标在该轮通过。之后全图表一轮因中国地图测试在异步弹层出现前取搜索框失败，[原日志](unit-final.log)与[独立19项通过](china-test-isolation.log)保留；仅补等待真实入口，最终63／761全部通过。没有放宽业务断言或修改共享Select行为。

[全仓Token治理验证](token-global-final.log)仍exit1，冻结B2在本轮改前／改后返回同一错误；[phase范围证明](phase-scope-proof-final.json)保留历史Gate。未扩大政策、修改旧冻结断言或将治理失败算作图表通过。全仓治理仍有独立未完成项。

本轮只改变783改前文件中的明确授权范围；CSS除辅助文字Token引用外逐字节保持，数据、系列／强度配色、字体、Foundations、政策与非图表内容保持。原数据源文件逐字节保持，31个函数（含27个正常数据函数）未改；两个示例工厂仅增加已有标签配置。181 native中只有两处Brush入口与范围补丁，全部哈希符合来源锁；上游commit与其他179项未改。[保护证据](protection-final.json)与[依赖锁范围](dependency-lock-scope-final.json)保留。

## 文档与交接状态

能力清单、选图／开发指南、共享README、各批确认指针、T22方法回流和当前phase已同步。普通图例的临时读数与旭日导航、地图选择、Network固定详情分别沿用已确认的实际职责，不新增全库默认。局部曲线和第二批确认保留原范围，旧计划的当时“待确认”文字作为历史保存并加当前指针。

人工视觉审阅、Safari／VoiceOver实机、实体触屏、完整图形／主题对比度、目标数据规模性能、真实数据宿主及实时断流／重连／过期均在[统一条件台账](human-review.md#条件项)列出。用户此前选择“先复核现有演示”，实时仍是Mock；推进指令不代替视觉确认。

当前为本地技术收尾完成、候选未发布；未写Figma、未发布包／Registry、未做业务迁移、未Git提交／推送。既有明确人工确认保留，未授予新的全目录Human Gate或完整对比度验收。
