# P5 国内省市地图 · 本地技术交付

用户“继续下一阶段”对应T19—T21。唯一工作区card-v2 / codex/card-v2；交付入口 `http://127.0.0.1:5173/#chart-china`。继续授权没有关闭P4/P5的人工视觉Gate。本批完成本地实现及专项验证，T22全批收口仍单列，不把本批写成全库/发布通过。

## 实际实现

- 固定399项真实几何：34省级、333实际地级、32省直管县级。27个应有省内图层的省份全部覆盖并逐层加载检查；不是只用广东代表全国。直辖市直接同级Mock详情，港澳台按固定源无子图层分支，不虚构地级市。未扩展区县地图。
- MCA2024固定清单与HDX387项、OSM12项分别保存。保留原始坐标、岛、昌吉1孔及昆玉5孔；济南真实合并包含原莱芜，只移除10条双份共享边，168条外边完整保留、面积守恒。完整来源、取得日期、转换及SHA见 `apps/playground/src/docs/components/chart-business/data/china/`，三份GeoJSON共8,112,192 bytes。
- 共享Choropleth增加可选fitToData、稳定ID激活和受控选择。默认世界投影保持；App将RFC环方向转换成独立d3内存副本，不改许可源文件。固定hit路径位置与节点身份，hover使用不可命中的视觉层，避免按压中移除/插入而丢原生click。
- 全国→省内地级/直属县级→本地Mock详情，返回保留必要状态/更新次数/配色；鼠标与地区Button键盘路径等价。0、null、缺行、无效统计、未匹配ID与加载失败/重试分别表达；全缺测不冒充0量程。各层独立量程，统计与详情均为Mock。
- 增加业务入口、目录/原地图/本地prototype链接、Manifest、指南与实际源码下载。维持19图型、170官网参考ID；中国配方不是第20种图型。11文件下载含3真实GeoJSON、清单和来源许可，按需展开才加载8MB源码包，不进入UI/Registry几何依赖。

## 最终验证

| 范围 | 最新证据 | 结果 |
| --- | --- | --- |
| 图表/业务/下载/固定源/Token登记单元 | chart-unit-final-frozen.log | 44文件、489项通过 |
| 399几何、父级、绕向/孔洞、0/null、无效/重复/未匹配、真实fetch失败重试 | china-region-data-green.log及最终单元 | 21项通过；399项逐一d3局部面积/全部27可用省内层通过 |
| 共享激活、fit、selection、pressed node/sibling稳定、纯视觉overlay | choropleth-pointer-order-green.log | 24新Choro+12旧structure，共36项通过 |
| UI类型 | choropleth-pointer-order-ui-typecheck.log | 通过 |
| Playground/Prototype类型和构建 | *-typecheck-frozen.log、*-build-frozen.log | 两包类型、两构建通过；页面范围控件修复后Playground补验type/build见*-scope-final.log；有既有大chunk提示 |
| 专项真实页面 | map-browser-final-frozen.log、browser/host/ | normal/reduce、390px、键盘/回返/零缺测/重试、鼠标/触摸/pinch、tooltip、5原世界变体，共8项通过 |
| drag→reset→零delay click | browser/host/drag-reset-fixed-hit-green.json | down/up/click均同一广东path，移除/插入=[]，真实下钻；三份失败取证保留 |
| normal/reduce静态终态截图 | map-static-snapshots-final.log、browser/host/ | 2项通过；34/21/26实际hit路径opacity=.85且无enter父层后才截图，初态白图已替换 |
| 全27省范围控件/真实城市层 | map-scope-green.log | 1项通过；27省逐一地图加载、城市条目数/范围value及返回全国一致；修复只列3省导致山东下钻后误显示全国 |
| 旧默认世界地图 | world-default-browser.log | 1280/880/390三项通过 |
| 旧world离屏缩放/返回/重置 | world-offscreen-frozen.log | 1项最终通过 |
| 原17文档入口、导航focus、配方、独立样式及15单色prototype | playground-browser.log、playground-monochrome-browser-final.log | 初次5通过、1因5387未启动失败；启动同工作树prototype后该项补跑通过，总6项，不隐去初次失败 |
| 170官网实际下载 | consumption-host-frozen-final/official-variants/ | 独立类型/构建170入口通过；本证据不含170项浏览器，不声称340浏览器通过 |
| 实际业务下载 | consumption-host-frozen-final/facts.json | 66配置（含16 China）类型/构建/浏览器通过；0/null ARIA、1440/390控制bbox、选中/更新/返回/重试覆盖，pageErrors=[] |
| 验证快照 | consumption-host-frozen-final/freeze-current.json | 当前2326 UI/Foundations源文件及31下载源文件与验证快照一致，canonicalChanges=[] |
| 源码及数据独立审阅 | independent-review.md | 当前12文件指纹核验；399数据与共享实现无新增阻断项 |
| 图表生成样式、资产索引 | chart-styles-frozen.log、asset-index-check.log | 通过；资产索引按实际Manifest生成 |

独立消费复用已安装依赖缓存，复制当前完整UI/Foundations源码；不是干净安装，也不是19个最小Registry项各自安装成功的证明。最小Registry依赖/文件闭包由scripts/charts.test.ts检查。用户现有5173服务未重启；独立5186消费及本批临时5387 prototype验证服务已清理。

## 修复及证据边界

全缺测图例/ARIA误写零量程、固定aspect内控件溢出40px、原始鼠标press目标在hover时替换、同节点重排导致浏览器remove/insert后丢click，都有失败→修复→最终通过证据。最终使用固定命中层与不可命中hover绘制层；没有新增手势引擎或依赖。

人工视觉、完整对比度/弱色资格、物理触屏、Safari/VoiceOver、暗色/强制颜色仍未验收。固定HDX历史与OSM不同快照可能未精确接边，不适合最新权威边界或面积统计声明。公开再分发保留CC BY3.0 IGO与ODbL各自归属、许可及修改说明。

全tests类型仍报4处范围外错误（Toast exact两处、旧feedback reducedMotion两处）；全仓Token/evidence验证仍报历史冻结、Tree/导航/ConnectedSurface等问题。本批新增图表Token登记专项通过；不将专项绿写成全仓绿，不擅自修其他任务。

视觉终态截图另按实际静态opacity等待采集，自动通过不等同视觉接受。未提交/推送/建PR、发布、写Figma、正式业务迁移或system-approved晋升。
