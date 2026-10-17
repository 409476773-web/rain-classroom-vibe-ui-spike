# P4 关系网络图 · 本地技术交付 · 2026-10-09

用户“确定。继续按计划推进”授权继续既有计划；本批完成T16—T18。工作区为card-v2 / codex/card-v2，复用已有依赖，没有提交、推送、发布、业务迁移或Figma写入。P3仅CH-060/049/112三例视觉已获本次确认；新网络视觉保持待审，整体计划仍在实施。

预览：<http://127.0.0.1:5173/#chart-network>。四组Mock为CH-065教学元素与知识点、CH-070知识点关联、CH-083课程先修与能力支撑、CH-086理论实践联动。Network为Rain本地第19个入口，原17 Bklit、Matrix及170官网变体映射保持。

## 已交付

- 公共NetworkChart与layoutNetwork：稳定ID、成对有限坐标、确定性环形回退、未知端点及自环拒绝、独立节点类别与关系类型、方向箭头、平行/反向边分弧；权重0与未提供分开，权重不控制圆面积、距离或线宽。
- 图形指向与列表聚焦强调相邻关系；鼠标点击、列表按钮和Enter选择同一详情；清除或筛选移除节点时回传null。几何沿稳定ID短过渡，reduce即时终态；实例marker/gradient互不冲突。
- 四组fixture、关系筛选、正常/空/单节点/长名/非法状态、更新与三种配方；局部横滚、完整列表名称、节点/边精确Table和当前配置的真实源码下载。
- 目录、原型、公共导出、Manifest、Registry实际TS/CSS/资产依赖闭包和AI指南；新增组件位于vendor外，没有重写上游来源锁。

## 最终验证

| 范围 | 结果 | 证据 |
| --- | --- | --- |
| 受影响图表/业务/登记/消费脚本单元 | 34文件、362项通过，含Network布局25、组件9、fixture4、宿主7，共45项 | `unit-verified.log` |
| Network真实浏览器 | 5项通过：四场景、正常/reduce、指向与焦点切换、键盘选择、持续更新及中间帧、关系过滤、实例ID、390px长名、空/单节点/非法与正常白底配方测量 | `network-browser-verified.log`、`network-browser-verified/`、`browser/` |
| P3分类回归 | 4项通过；与旧Network4项同次运行的总数8，最终Network修正后另外5项通过，不重复累计 | `network-and-category-browser-final.log`、`category-regression/` |
| UI / Playground / Prototype | 三包类型检查通过；Playground及Prototype构建通过 | `ui-typecheck-verified.log`、`playground-build-last.log`、`prototype-build-verified.log` |
| 19项Manifest、公有导出及Registry相对TS/CSS/资产闭包 | 通过；统一导出所需Button/Table及其实际样式、图片资源已登记 | `unit-verified.log`、`registration-final.log` |
| 原170官网变体独立消费 | 170份真实下载类型检查及构建通过，未在本次逐个运行全部170浏览器 | `consumption-verified/official-variants/facts.json` |
| 44份业务下载独立消费 | 7宿主状态＋14mini＋13分类＋10网络；类型、构建、浏览器渲染/相关操作/局部窄屏全部通过，运行错误为空 | `consumption-verified/facts.json`、`consumption-verified.log` |
| 当前源码一致性 | 所有运行源码与最后消费快照一致；随后仅更新Network README证据链接和Registry单项证据字段 | `final-source.json` |
| 局部颜色登记、生成输出、图表样式 | 专项通过；登记category/network消费者，未增加全局Token或配色值 | `color-unit-final.log`、`token-generate-final.log`、`chart-styles-check.log`、`registration-final.log` |

消费验证复制当前UI/Foundations源码及已安装依赖缓存，使用实际导出函数及Tailwind源码扫描；没有执行干净安装，不据此宣称已发布包或线上安装可用。19项Registry最小依赖闭包另行静态验证。

正常白底测量三种配方的节点中心文字最低5.14:1、节点边界15.46:1。将原渐变中心不透明度0.8减到0.65，边界使用继承文字色；失败前最低3.73:1的真实测量保留在`contrast-browser-red.log`，最终测量见`browser/network-contrast-facts.json`。这仅覆盖正常白底样本，不授予淡化状态、所有边/图例、暗色、forced-colors或总体对比度验收。

## 审阅与修复

布局/组件、业务宿主和登记闭包分别独立审阅，最终只读复查未发现T16—T18遗漏。发现的问题以失败用例修复：悬停与列表焦点切换的优先级、非法空/null线型、下载求值遗漏Network导出、空图误提示可选节点，以及正常白底节点文字对比。CH-083仅调整两个fixture坐标，消除边穿过无关节点；原节点ID/边拓扑保持。相关失败日志保留，最终362单元及5项Network浏览器覆盖修复。

全资产索引生成被另一模块Sheet单值内联数组阻塞，`modifiedParts: ["root-fill"]`仅等价改为多行列表，使当前YAML子集可读取；未改Sheet行为。此工作区起点已有645项修改/新增，其他工作保持原状。

## 尚未通过的全仓检查与边界

- 测试项目类型检查仍有P3基线相同4条诊断：Toast两条`exact`选项、旧图表反馈Playwright配置两条`reducedMotion`选项；当前P4没有新增诊断。见`tests-typecheck-verified.log`。
- 全仓Token校验仍失败，包括既有阶段字段合同、树/导航/原型文字对比、连接布局消费者登记等；当前category/network专项已通过。见`token-verify-verified.log`。不能把本批通过表述为全仓通过。
- 新网络视觉仍待用户审阅；Safari/VoiceOver、物理触屏、forced-colors、暗色及完整对比度未验收。当前密度仅各8节点、至多11边，无碰撞自动避让、编辑器、力导模拟或千节点承诺。
- P5只完成来源预调查，尚未取得并核验全国省级及所需城市层geometry、父子引用和再分发条件；未实施T19—T21。T22整体收口仍未完成。

视觉记录见[human-review.md](human-review.md)。最终源文件记录在[final-source.json](final-source.json)，本批源文件新增与验证不等于Git提交或发布。
