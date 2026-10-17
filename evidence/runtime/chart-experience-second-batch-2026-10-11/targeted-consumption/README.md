# 第二批真实下载定向消费：最终通过

本目录仅新增验证脚本与证据。生产脚本、运行组件、注册清单、来源锁和应用路由未修改。

## 当前结论

- 最终宿主：`/private/tmp/rain-chart-variants-consumer-Y4UR8j`，复用 root 当前 full170 成功后的隔离宿主；未重拷 UI/Foundations 源码。
- `run-05/facts.json`：18 组实际下载、19 Registry 项闭包、独立类型检查退出 0、18 HTML 构建入口通过。
- 2,223 个构建模块全部位于复制宿主内；别名为空，无外部依赖软链或模块路径。
- 唯一 35 个浏览器观察：17 组下载分别在 1440px/减少动态与 390px/普通动态验证；中国地图单独 390px。
- 页面错误、失败请求、HTTP 错误、外部浏览器请求来源均为空；35 页全局宽度不超过视口，路径无 NaN/Infinity/undefined。
- `summary.json` 另核对 24 个边界观察的初始表与切回 normal 后的表。预期来自实际下载数据函数；Pie/Ring 变体的数据直接捕获实际组件第一处 useMemo 的结果。
- 244 项合并运行源码冻结清单全部匹配。2,366 个 canonical 文件和 2,607 个复制包/下载文件最后哈希检查均无变化。

## 18 组实际下载与读数范围

| 导出入口 | 下载快照 | 核心验证 |
| --- | --- | --- |
| chartExampleFiles | Pie small/remove | 长名称和 1 人小类别、1000 总分母、移除类别、normal 恢复、图例 Escape 后 Enter/同按钮点击重新读取 |
| chartExampleFiles | Ring zero-goal/over | raw 当前值与目标分母、不适用/120%、停止不合法原生绘图、normal 恢复、图例重读 |
| chartExampleFiles | Funnel missing/growth/zero-entry/above-entry | 四阶段原始值、缺项、入口分母、增长仍保留、无分母或超入口拒绘、normal 恢复 |
| chartExampleFiles | Sankey thin/zero-link | 原始 8 条流向仍可查、只绘正值、两中间节点流量守恒、零边过滤后实际 Tooltip 索引/210 人次正确 |
| chartExampleFiles | Heatmap missing | raw -1 显示缺测、0 保持有效零、键盘按真实日期读取、更新数据保留同日期并展示新值 |
| chartExampleFiles | Matrix12 | 初始 12×12 / 144 格、键盘状态、更新保留 12×12、现有控件切回 4×4 |
| chartVariantFiles | Pie legend small、Ring legend zero-goal | 真正变体快照序列化、raw 表/分母、normal 恢复、Compound/ChartLegend Escape 后同按钮重读；无 NaN 或虚假进度 |
| chartVariantFiles | Heatmap gradient/horizontal/current-missing | 当前真实缺测和零级日期、等级 3 点击保留读取、Escape 清除再点击；梯度/横滚数据格透明度恢复；横滚末日键盘读数和窄屏本地滚动 |
| chartChinaFiles | 广东省/已选广州/normal/revision2 | 21 行按真实统计与 chinaReading 逐行核对，包括 0 人/无数据；更新至 revision3、选择广州保留、局部表格 ArrowRight/Left 滚动 |

原生 Pie/Ring/Funnel/Matrix 的等价读数采用中心、status、表与键盘入口；不要求不存在的 Tooltip。

## 分段证据与已保留失败

最终唯一观察由同一宿主、同一生产源码与同一实际下载哈希组成。已完成项未重复计数：run-02 保存 14 个完整成功观察，run-03 新增 1 个，run-04 新增 19 个，run-05 新增最后中国地图 1 个。每个记录的 `evidenceSource` 指向实际截图目录，最终汇总 `proofRuns` 保留各事实文件哈希。

| 历史运行 | 失败原因与证据修正 | 生产修改 |
| --- | --- | --- |
| run-01 | 检查脚本的 details 嵌套定位匹配不到实际精确表；按实际 details 类与文本定位。VM 数组比较统一转为普通 JSON 值，保留原始数值。 | 无 |
| run-02 | 全 rect 选择器包括 179 个 opacity=0 的加载占位层；改为真实 179 个数据格。`gradient-dom-diagnostic.json` 证明 click 后 [0.3,1]、Escape 后全 1、再点恢复 [0.3,1]。 | 无 |
| run-03 | 宽屏日历 region/content 均 832px，无溢出却被要求 scrollLeft>0；改为有溢出才要求局部滚动，并始终严格核对末日。`scroll-dom-diagnostic.json` 证明 390px 的 342px 区域/780px 内容跳至末日滚动 427px。 | 无 |
| run-04 | Number(tablecell) 错误拒绝带“人”单位及“无数据”的真实读数；改为运行实际下载统计、地区层级和 formatter，初始/更新各 21 行精确匹配。 | 无 |
| finalizer-01 | 离线复核实际 TSX 函数时，转换器注入 jsx-runtime require；VM 接入实际复制宿主 require，finalizer-02 成功。 | 无 |

所有失败日志、截图、事实和诊断文件均保留。不存在被忽略的生产失败。

## 哈希与复跑入口

最终结论见 `summary.json` 与 `run-05/facts.json`；源码、宿主及下载逐文件哈希在 `run-05/facts.json.freezeFiles`。

- 合并 244 项冻结清单 SHA-256：`b8c9f70fa9224672f1a036f45c7cfc97b3906ef63371a17b1d9740ab4b41301c`
- 默认/变体导出器 SHA-256：`e1f68dbc9c412b2ebff4a0956c6ccc3f80bafc213f3279b49eda6ccc5aac0701`
- 中国地图导出器 SHA-256：`30cb4c1687cb183d5079c975f48b534dde85830d33dbffb94752fdad04dde84d`

`run.mjs <current-full170-facts> <new-evidence-directory> [prior-targeted-facts]` 可从 prior 的已成功唯一观察续跑；续跑先严格比较宿主、导出器、注册项、下载文件和错误/冻结结果。未提供 prior 则完整执行 35 个观察。`finalize.mjs` 对本次最终事实、初始/normal 表与所有冻结文件作只读复核。

## 限定

使用复制的已安装依赖缓存和完整 UI/Foundations 源包，未证明 clean install 或 Registry 最小安装；未新增依赖。此次针对当前第二批快照，不重跑历史 78 业务案例。China 的当前 touch 行为由 B 的独立浏览器证据覆盖，本消费任务仅验证等价表与键盘。本结果不包含真实设备触摸、Safari/VoiceOver、主观视觉 Human Gate、发布或任意外部输入保证。
