# 外层Card间距接入：续修验证

日期：2026-09-13。工作区`codex/card-v2`，HEAD仍为`321e1a0c1b5f9284e0fcb5167fa059d6174b1752`；本轮无提交/推送。

后续接受：本轮交付后用户再次回复“确定。没问题”，当前布局示例与外卡/面板三级间距试排已获限定人工视觉接受，见[决定记录](visual-acceptance.md)。下文保留实施和自动/独立验证时的范围。

用户在肯定前一版后继续指出：间距控制只影响“课程资料”内部两个面板，外层“课程设置”“课程资料”Card未响应。前一版反馈不外推为新增外卡功能的视觉接受。

## 原因与修复

原实现只有`panelSpacing`应用状态，`LayoutRecipes`的Card固定读取默认值；两Card根也未接入inset/section。此前24项验证证明面板试排通过，没有覆盖外卡可调整。新增回归在旧生产版本因缺少外卡控制入口而失败，见[复现日志](logs/reproduction.log)。

现有页面增加“调整外层卡片间距”→“应用卡片间距”，同时作用于两张外Card；“调整资料面板间距”→“应用面板间距”保留，只控制内部两Pane。两份局部表单共用同一实现，各有待选值、错误/成功状态和应用值，均使用既有`defineLayoutSpacing`；非法值不改变上次有效预览。

`LayoutRecipes`增加可选`cardSpacing`，默认仍20/16/12。两Card根通过原生style复用既有`--rain-card-spacing`与`--rain-card-section-gap`，协调上下留白、Header/Content左右缩进及Parts间距；正文Stack/Grid/Inline/Split消费对应section/item。Header细距上限4、动作组上限8，且均不超过card.item；信息值为0时不遗留4/8倒挂。第一版补接暴露了零值细距问题，对应[失败断言](logs/tight-spacing-reproduction.log)已修复并复测。

动作组空间足够时同排，装不下时允许组内换行并右对齐。只检测页面横向滚动不足以证明留白成立：320宽、外卡40px内距时旧nowrap按钮曾侵占内容右边线26px，但页面scrollWidth仍为320。现以真实按钮边界验证没有侵占留白。没有缩小公共按钮或限制合法Space值。

没有修改公共Card/布局原语API、UI/Foundation源码、默认20/sm12、业务状态所有者或加入新依赖。默认外卡20/16/12、面板16/12/8继续生效；Card与Pane分别比较，不是跨DOM深度自动应用。具体使用见[组合用法](../../../../docs/audits/2026-09-13-layouts-usage.md)。

## 实测结果

| 检查 | 结果 |
| --- | --- |
| 类型与构建 | 全工作区类型检查、两应用生产构建通过；原有大产物提示保留 |
| 专项单元 | 8/8通过：布局5、精确治理合同3 |
| 生产Chromium | **25/25通过（24.3s）**，重试0；Layout10 + Dialog9 + Card6 |
| 外卡新增回归 | 32/24/16、16全等、0全等、40全等；两卡四边、Header→Content、正文分区与信息gap实测一致 |
| 隔离与错误 | 外卡改变不改Pane值，Pane单独改变不改Card值；两个倒挂均提示并保留原值；课程与资料草稿DOM保留 |
| 窄屏 | 320宽、深色、compact、外卡40全等/Pane24px内距；Split堆叠，全部外卡动作按钮位于内容边线内 |
| 源码保护 | 1925份既有UI/Foundation及原Card/Dialog消费者哈希不变，见[preservation.json](preservation.json) |

日志见[logs](logs/)，运行几何与截图见[production](production/)，原始外卡测量见[outer-card-spacing.json](production/layouts-outer-cards-apply--ea398-anels-without-losing-drafts-chromium/outer-card-spacing.json)。实施前44份相关文件及哈希见[before](before/)、[baseline.json](baseline.json)；最终摘要见[source-sha256.json](source-sha256.json)。首轮24项及独立证据仍保留在父目录，没有覆盖成此次结果。

复跑沿用父目录所列流程，生产地址5195/5196；本轮配置归档为`production.config.mjs.txt`，复制到临时`.mjs`后执行三份E2E测试。新增断言位于`tests/e2e/layouts.spec.ts`的`outer cards`用例。

## 独立复核与边界

独立技术复核在新生产版本完成12条记录：6组外卡数值（额外含20/20/12与24/20/2）、两类倒挂、Card/Pane隔离、被动换值焦点与收起草稿、第二消费者。覆盖1280/375/320与明暗，零pageerror；两卡真实四边和分组距离、细距上限、极窄内容中的按钮边界均通过，未发现新增未修复P1/P2。临时别名探针仅作旧实现诊断，未算入完成证据。

报告与新运行结果见[independent-review](independent-review/)。本次为局部接入补全；人工视觉确认、既有深色Focus对比度、完整业务Benchmark、真实辅助技术、发布与迁移继续分别记录，不因技术检查通过而自动推进。
