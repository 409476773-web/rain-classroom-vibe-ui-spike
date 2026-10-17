# 中国地区下钻示例的固定边界

本地业务配方；统计、参与人数和详情为 Mock。边界是真实来源的固定数据，不是示意形状。2026-10-09至10取得资料（上海时间）；HDX于9日取得，OSM批次于10日完成；未连接实时边界或业务服务。

## 范围与身份

按民政部2024年县以上行政区划代码固定为34省级、333地级、32省直管县级，共399个目标地区。每项保留六位代码、真实层级和父级。regions.json中的hasChildren只表示本配方存在可用的下一地图层，不表示该地区没有其他行政下级。

- 全国层34个省级区域；27个具有本配方省内图层的省份均有完整目标几何。
- 北京、天津、上海、重庆直接查看同级地区详情，不虚构同名地级市；未加入86个直辖市区县地图。
- 港、澳、台固定来源只有省级面；直接显示省级读数和来源说明，不虚构城市下钻。
- 省内包括真实地级及省直管县级单元，不把直属县级市改称地级市。不扩展地级以下区县地图。

行政清单：[民政部2024年行政区划代码](https://www.mca.gov.cn/mzsj/xzqh/2025/202401xzqh.html)。2020与2024清单核对34省和333地级一致；直属县级采用2024的32项。

## 两份几何数据及许可

provinces.geojson（34项）和cities-hdx.geojson（353项）来自 [HDX/OCHA ROAP China administrative boundaries](https://data.humdata.org/dataset/cod-ab-chn)，数据许可 [CC BY 3.0 IGO](https://creativecommons.org/licenses/by/3.0/igo/)。归属：OCHA Regional Office for Asia and the Pacific (ROAP)。数据发布快照2020-09-10，具体边界建成年代未知；源含历史字段，并非最新权威勘界。修改：SHP转GeoJSON、对应固定行政代码、三处名称校正、济南与旧莱芜真实共享边合并；全部原始坐标保留。名称和合并证据、源ID、原始中文名称见sources.json与feature.properties。

counties-osm.geojson（12项）来自 © OpenStreetMap contributors，补文昌和新疆11个省直管县级单元，许可 [Open Database License 1.0](https://opendatacommons.org/licenses/odbl/1-0/)，[来源与署名](https://www.openstreetmap.org/copyright)。固定OSM行政关系下载后，按真实outer/inner成员拼接，全部边、岛和孔洞保留。每项源relation ID、版本和更新时间保留在属性，原下载hash见sources.json。该文件作为独立ODbL数据附带；其原文署名和许可请随再分发保留，公开使用或发布修改版时遵守ODbL条件。

两份不同许可的数据分别存放，不把几何数据纳入UI组件包。组合仅在App内按地区ID加载。请在发布时保留两份数据的归属、许可链接和修改说明；UI代码自身的许可不能替代数据许可。HDX与OSM固定快照可能未精确接边，不适合测绘、面积统计或证明当前行政边界。

## 校验与使用

三份GeoJSON合计8,112,192 bytes（约8.1 MB）。sources.json记录来源URL、固定版本、原始资料hash，以及4份实际数据文件的bytes/SHA-256。所有399项覆盖、唯一身份、名称/父级/层级一致、有限经纬度、闭环均有自动检查。济南合并只移除10条双份共享边，外边保留；保留昌吉1个、昆玉5个孔洞。

文件遵循RFC 7946（外环逆时针、内环顺时针）。App为d3投影创建环方向相反的内存副本，源文件及hash不变；不可直接省略这个适配步骤。

china-region-data.ts使用new URL取得本目录文件。下载后保留完整目录结构，在已有Rain React/Vite工作区使用。生产发布时确认相同来源说明和数据许可可被访问。本示例不会把缺测补零；未匹配统计ID会显式列出；边界校验失败停止绘制并可重试加载。
