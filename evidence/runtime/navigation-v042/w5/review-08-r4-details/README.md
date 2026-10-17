# G2 review08 · R4互动细节反馈

四条新批注已落实在R4课堂互动及S4的相同Recipe复用中；G2仍待人工视觉判断。

| 批注 | 修改 | 现有组件／Token |
|---|---|---|
| 小组列表标题栏图标过大 | pin/close图标18→14px，点击区域保持32×32 | IconButton 32/14 |
| 课堂功能标题栏图标过大 | 同上；临时恢复和固定状态均使用相同规格 | IconButton 32/14 |
| 课堂数据过重、过深 | weight500→400，TextNeutral3→TextNeutral6 | font-weight-regular / TextNeutral6 |
| 选中小组需要主题色半透明底 | current及已选hover均消费BrandAlpha3；不设置整行opacity | FillBrandAlpha3，Light alpha20% |

采用Existing Variant及功能内Token别名映射，无新Token和组件变体。32/14只在ClassInteraction的context/queue两处传入，共享RegionHead默认仍32/18；已实际检查R4批改、R5、R6保持18px。S4互动通过R4Recipe自然复用。现有1200/1440/1600画板与容器适配保持，不添加1176×771专属断点，区域宽度／高度／业务处理器不变。深色外框只改变原有平台与恢复条，课堂内容区仍沿用既有Light边界；本轮不宣称新增全页Dark支持。

23项组件检查、11项浏览器检查（另外2个截图专用case跳过）及Playground类型检查／构建通过。浏览器覆盖三宽度选中/hover与键盘换组、S4临时恢复/固定/隐藏、三个其它场景图标尺寸，以及此前R4反馈与inverse回归。4张修前与4张修后图独立保存。首次检查的两个错误分别是定位同时匹配区域和分隔条、误把S4临时恢复当作常驻；仅修正检查流程，失败日志保留。完整测试项目类型检查仍有7项既有诊断，本轮无新增诊断。

Metadata仅更新2 Registry及3份R4/R5/R6 manifest的当前共享源锁；67当前源哈希和14/9/4/4复制闭包通过，G1及Review07历史保留。独立源码审查确认只存在上述局部production差异。

[当前预览](http://127.0.0.1:5198/?sample=R4#navigation-v042) · [证据索引](review-evidence-index.json)

冻结原稿未修改；此前证据保留。人工G2/G3、完整对比度、读屏与跨浏览器独立未验收；未执行Git、发布、迁移、Classic/Figma写入或全局Token修改。


修前：[1440](before/R4-1440.png)；修后：[1440](after/R4-1440.png)。其它宽度及S4见before/after目录及measurements.json。
