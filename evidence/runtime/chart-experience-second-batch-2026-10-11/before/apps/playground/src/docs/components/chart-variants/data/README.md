# 世界地图示例数据

`world.geojson` 是默认地图和地图变体共用的固定底图。展示的学习强度、参与量由页面生成，均为模拟数据，不是统计资料。`chart-data.ts` 统一读取该本地文件，源码下载应同时保留本文件与底图。

- 原始来源：[Natural Earth 1:110m Admin 0 Countries](https://github.com/nvkelso/natural-earth-vector/blob/f1890d9f152c896d250a77557a5751a93d494776/geojson/ne_110m_admin_0_countries.geojson)。
- 版本：`v5.1.2`；固定提交 `f1890d9f152c896d250a77557a5751a93d494776`，2026-10-08 核对标签与提交。
- 下载地址：[固定提交的原始 GeoJSON](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/f1890d9f152c896d250a77557a5751a93d494776/geojson/ne_110m_admin_0_countries.geojson)。运行时不请求远端。
- 许可：[Natural Earth Terms of Use](https://www.naturalearthdata.com/about/terms-of-use/) 明确所有版本的矢量与栅格数据属于公共领域，允许修改与再分发。
- 原始文件：838,726 字节；SHA-256 `6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f`。
- 本地文件：261,432 字节；SHA-256 `0bdfa8e40fd6f48b31b754b9344f8b3b18d053d2771ce50287fd8812991bed80`。
- 177 个地区，所有 Polygon／MultiPolygon 坐标按原数据保留；不重新绘制、不简化几何、不改变顺序。
- 唯一稳定 ID：原数据 `NE_ID` 转成字符串，同时作为 Feature `id` 与 `properties.id`，不使用有缺失或重复的 ISO 代码。
- 保留属性：`NAME_EN → name`、`CONTINENT → region`；删除与演示无关的其余属性。
- 计量规则：缺测为 `null`；有效零值为 `0`；分析配色与精确表始终区分二者。

该底图仅用于演示世界地图的交互与视觉编码；采用上游地区范围和名称，不提供行政边界服务。
