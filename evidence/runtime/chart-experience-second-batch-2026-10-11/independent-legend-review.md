# 图例独立只读复核

复核覆盖共享ChartLegend、compound Legend／LegendItem、私有交互辅助文件及当前宿主调用者。没有修改运行时。

发现并关闭的阻断：自定义／compound按钮先聚焦、按Escape清除后，再点击同一仍聚焦按钮不会恢复读取；旧测试自有onClick掩盖此事。root已按[失败用例](legend-click-capture-red.log)在共享capture读取当前项，修后[11项单测](legend-click-capture-green.log)通过。独立复核在5173实际Pie／Ring／Funnel／Scatter原页验证Escape→Enter与原位Click：Pie恢复研讨课142人／28.4%，Ring恢复练习4/12／33.3%，其余两图恢复相同第二项。当前[5项浏览器回归](legend-browser-current.log)另记录混合输入与重复读取。

其余复核未发现阻断：键盘A→指向B→离开恢复A；数值更新保留相同按钮DOM焦点与当前值；重排跟随同标签、移除清除；外部点按清除；没有过滤／隐藏数据。三个公开Props接口与本轮755文件基线逐字一致，辅助文件hash为 `00fd7ad74a5da89722c599780055c432f202feb2679ffb4d9245fd09e86f5abe`。

调用者覆盖默认趋势／Bar／径向／方向图例、TrendLegend、Candlestick与盈亏宿主、Scatter／Funnel、Pie／compound Ring／Radar／Sunburst、分类静态key及Prototype RainTheme默认图例。原生对照fork属于独立来源；本次不修改它。未用于当前页面的原生ProfitLossLegend仅div模板保留原接口。

身份依赖现有稳定且唯一label；自定义／compound的键盘入口仍由宿主button提供。只读复核和技术通过不授予新的视觉、设备、发布或迁移Gate。
