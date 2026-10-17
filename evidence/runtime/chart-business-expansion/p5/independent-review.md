# P5 独立数据与实现审阅

初次审阅时间：2026-10-10 01:13；最终快速点击修复补审：2026-10-10 01:38（Asia/Shanghai）。审阅者：`/root/p5_sources`。

范围：T19 固定地区数据、来源记录，以及 `china-region-data.ts`、Choropleth 取景/地区激活、下载配置的实际逻辑。本轮除本证据文件外未修改任何代码或数据，未安装依赖、未提交或发布。

**结论：当前审阅版本未发现阻断项。** 该结论限于下述数据与实现审阅；不替代宿主真实浏览器交互、人工视觉或真实硬件验证。

## 399 项全量来源与身份

- 对照已取得的民政部2024年完整清单逐项核对，目标为34省级、333真实地级、32省直管县级，共399项，无遗漏、重复或未知ID。
- 每项名称、六位代码、真实层级、父省级ID、分支与目标清单一致；`hasChildren`与本配方实际可用下一地图层一致，不代表行政上没有更深下级。
- 三份实际GeoJSON分别为34省级、353个HDX子项、12个OSM直属县级；全部399项均有真实来源几何，未用名称、统计值或示意形状填补。
- 北京、天津、上海、重庆按省级同边界直接读取地区样本；港澳台固定来源未提供城市子层。未加入86个直辖区县或其他地级以下区县地图，未虚构同名地级节点。
- 最终非合并几何逐一与固定源转换结果精确比较一致；OSM源relation ID、version、timestamp及原始文件hash逐项核对一致。

## 实际源数据许可与取得记录

- HDX/OCHA ROAP官方数据集的许可字段为 `cc-by-igo`，链接 [CC BY 3.0 IGO](https://creativecommons.org/licenses/by/3.0/igo/)。这是源数据许可，不是下载程序的代码许可。来源归属、许可链接、转换及名称/合并修改说明已保留。
- HDX为2020-09-10发布快照，具体原始边界建成年代未知；2026-10-09取得（上海时间）。元数据的公开来源/非官方说明不被改写为最新权威勘界。
- OSM补充文件独立保留 [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/)及 [© OpenStreetMap contributors](https://www.openstreetmap.org/copyright)；README说明数据再分发、公开使用和派生数据条件，与UI代码许可分开。
- OSM批次实际取得时间跨上海时间2026-10-09至10日。每项原始OSM完整关系文件、版本、更新时间和hash可追溯；输出未附带贡献者用户信息。
- `sources.json`已补行政清单、HDX和OSM的取得日期；README包含范围、双数据许可、修改说明、不同快照限制、d3适配及下载目录使用方式。
- HDX原ZIP的SHA256为 `f6a1f0fd969dbcc830e395c8211746730a80e8429585e045c6b0da92cd6e0ec9`，与实际已取得文件一致；民政部原HTML的SHA256与来源记录一致。

## 济南合并与孔洞证据

只读复核 `work/prepare_china_geometry.py` 的自检及实际源SHP转换；在内存中重读原ZIP，没有重新生成或覆盖源文件。

- 济南 `CN037050` 与旧莱芜 `CN037070` 有10条坐标精确相同的共有边。独立比较合并前后边集合，证明仅移除10条双份内部共有边，168条外部边完整保留，最终形成一个闭合外环；没有直接删除旧莱芜面积。
- 合并前平面面积为 `1.0073336956251835`，合并后为 `1.0073336956251833` 平方度，差值在浮点容差内。该数仅用于转换守恒检查，不作为地理面积统计。
- HDX昌吉的1个孔洞、OSM昆玉的5个孔洞均保留；最终全量共6孔洞。
- 所有399项坐标有限、经纬度范围有效、边界环闭合；源文件遵循RFC7946外环逆时针/内环顺时针。运行时d3适配复制并反向全部环，保持孔洞数量，不改变源文件及其hash。

## 当前实现逻辑

- `validateChinaGeometry`先按固定expected清单检查全量长度及唯一字符串ID，再比对顶层feature.id、名称、父级、层级和来源；不匹配或缺少几何时拒绝数据，不靠过滤静默丢弃。
- 统计按稳定ID连接；0保留，null/缺行显示无数据，非法数值或重复ID拒绝，未匹配统计ID明确返回给宿主。几何数据不用于生成业务统计。
- 几何加载失败、JSON解析失败或身份校验失败均删除该失败Promise的缓存键；再次请求可重试，成功源缓存与d3内存副本分开。
- `fitToData`仅显式开启时启用，已安装visx的fitExtent在scale/translate/center后应用。默认世界地图没有被套用国内绕向转换或新增取景参数。
- 地区激活与选中以真实ID决定，保留有效数字0和字符串ID，不退回数组索引；SVG继续隐藏于辅助技术，宿主地区按钮提供等价键盘操作。
- 快速点击修复后的静态命中path保持固定DOM顺序和稳定ID key，hover不再替换或抬升实际命中节点；抬升显示由独立的 `pointerEvents="none"` 视觉path完成，不截获按下、释放或点击。视觉层不带地区命中标识，原命中path保持绘制属性，透明度为0时仍可接收SVG命中；源数据、加载器及许可未改动。该实现解决hover更新期间原生按压目标变化导致快速点击失效的逻辑风险。
- 下载的11份实际文件保留当前范围、选择、状态、更新次数、配方；路径与data模块的new URL及相对导入一致，含全部真实geometry、README、来源许可和清单。
- 宿主最新缺测图例区分“暂无有效数值”“有效值均为0”和“全部为0”；本审阅没有重复宿主浏览器测试，读取到的最终交互证据见下节。

## 最终宿主浏览器交互证据

已只读查看宿主最终日志 [map-browser-fixed-hit-final.log](/Users/wenchengkai/Documents/Codex/2026-10-09/new-chat/work/p5-region-research/map-browser-fixed-hit-final.log)，记录为8项通过（31.0秒），SHA256为 `56b1bba1fde65031af842161441ffbeab2a11dc0076fcbf8a8b559938cc06672`。覆盖正常与减少动效下的全国/省级取景、读数及返回身份，390px长名称/缺测/加载重试，实际填充polygon点击及触摸下钻，拖动和双指缩放不激活地区，连续快速点击及拖动/重置后快速点击，以及五个原世界地图变体保留177地区和原生缩放/重置。

这是Chrome浏览器中真实坐标输入与原生事件链路的宿主验证结果，触摸与双指操作为Chrome模拟输入；不代表真实触摸硬件或人工视觉验收。本补审没有重新执行这8项测试。`source-lock.json`的本地Feature指纹已核对与实际文件一致。

## 固定审阅版本

下列SHA256于记录时重新读取。后续修改相关文件需要明确新的验证版本。

| 文件（仓库相对路径） | SHA256 |
| --- | --- |
| `apps/playground/src/docs/components/chart-business/china-region-data.ts` | `e573831d6b9a5b0b2e174bfe6dca7ffd1d4b33c8e7e64b0bf5afb91c1d5948b3` |
| `packages/ui/src/charts/vendor/charts/choropleth/choropleth-chart.tsx` | `c46beda63dda91302cce222b1548c15b6d262f3011f4aa5e5cda899c0d402a3d` |
| `packages/ui/src/charts/vendor/charts/choropleth/choropleth-feature.tsx` | `f10886e12a2096cf55c58886b2b20960eaeceeefc2f79100df9a9e95b6344ef3` |
| `packages/ui/src/charts/vendor/source-lock.json` | `abe0424236f3fe20ed05f2ed98d77dab26bf4ee7ab45d271e83945a6ffe9e359` |
| `apps/playground/src/docs/components/chart-china-source.tsx` | `58b8e92fef81b7bedce4bab3fe5a73e8f165765821597f5794f7b3160986f4e2` |
| `apps/playground/src/docs/components/chart-business/china-region-examples.tsx` | `57858aef2327bf4ae5c309524e8e9092c1d98b56c113ce622ddc5696c6f5caad` |
| `apps/playground/src/docs/components/chart-business/data/china/sources.json` | `da7a313d407f52242f650f8449aa1ac0b19c8e1adefd16f848c332a0e9aa7623` |
| `apps/playground/src/docs/components/chart-business/data/china/README.md` | `dbfb35007cf3b4886b55ff1c70c7e7f102720b3ba8572061ef83a953f14becf0` |

四份固定数据文件的bytes及SHA256已重新比对 `sources.json`，全部一致：

| 数据文件 | bytes | SHA256 |
| --- | ---: | --- |
| `provinces.geojson` | 2687805 | `73fb3b1301bcf09188d3231a29c823e63cb0ee91d7bc4493703dc2d22a1aee0f` |
| `cities-hdx.geojson` | 4529691 | `8efbc5de92fbef21c488946784e6e3b671c561bf43b50ffba094f55cee4db8b3` |
| `counties-osm.geojson` | 894696 | `2f36ff9c93f40b1dcf45cb6e01b5394dc91fcc4f613ba3140fc63924babce307` |
| `regions.json` | 76512 | `b3514b278982fb8c0362ae0ed904c0ce4a5bcf40e378b3aebfa6dc94d2d2ee00` |

## 验证边界

浏览器中的鼠标点击、模拟触摸手势、缩放/返回、交互动效与独立下载消费由宿主专项验证负责；本审阅读取了上述8项最终浏览器日志，未重复运行完整测试，也未把它扩展为独立下载消费的通过证据。未覆盖真实触摸硬件、Safari/VoiceOver人工使用、人工视觉确认，也未做HDX与OSM跨快照精确接边。混合边界不用于测绘或面积统计；当前记录不表示Git、发布、Figma或真实业务接入已完成。

后续范围控件修正：私有ChinaRegionPage原来只有三省选项，进入山东后scope不一致；现在按已核验清单列全部27个可下钻省级地区。见map-scope-red/green.log，27省实际浏览器逐一通过。此后Page的最终SHA见final-source.json；原数据、共享Feature/锁及下载源码未变，前述12份源/数据审阅指纹保持匹配。该后续页面检查由root执行，不冒称独立审阅者重跑全部流程。
