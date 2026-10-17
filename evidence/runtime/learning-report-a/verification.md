# P4 · 报告 A 精细版

## 最新：9条浏览器反馈（2026-09-19）

本轮按用户9条明确批注修订，作用于 `#learning-report` 的局部呈现。旧入口、共享默认和数据计算保持原行为；以下首版记录与 `browser/` 保留为历史，最新证据为 `browser-feedback/`。

| 批注 | 落地 |
| --- | --- |
| 1 | KPI分割线改为内容区域内的伪元素，上下各收16px；实测58px，与两行文字区域一致 |
| 2 | 统计范围移入筛选栏，在刷新左侧；Text/Neutral/6。1159/1369宽时单行；沿用1000px响应点，在窄容器换行并继续与刷新成组 |
| 3 | 满分、提交率公式与两图同指标说明移入已有“趋势说明”Popover；正文不再占一行 |
| 4 | 本页图例、曲线、点和对照条统一采用Icon/Brand/2及Icon/Neutral/3；实线圆点、虚线方点和文字数值继续区分两班 |
| 5–7 | 观察与建议之间增加Border/Neutral/4浅线，640px以下上下布局隐藏竖线；标题到段落及段落间距从12px收为8px |
| 8 | 改为“已交 **123** / 156 份”，仅已交数值加重；分母与统计口径保留 |
| 9 | 固定趋势读数使用Text/Neutral/5，保留status语义与完整数值 |

构建、完整类型检查、5项报告状态检查、2项配色/Gate隔离检查、2项浏览器检查通过：`build-feedback.log`、`typecheck-feedback.log`、`unit-feedback.log`、`color-test-feedback.log`、`browser-feedback.log`。本轮实际查看[1159px](browser-feedback/1159.png)和[390px](browser-feedback/390.png)整页截图；1369/1159/900/390均无整页横向溢出，尺寸见[geometry.json](browser-feedback/geometry.json)。统计范围高20px（390宽时40px），KPI分割线58px。

局部配色声明从8增至13；品牌色按用户明确偏好登记为brand-emphasis。未降低阈值：极浅统计范围实测浅色2.08、深色4.11，浅色固定读数3.71，仍低于文字4.5要求。[运行时发现](browser-feedback/contrast-findings.json)及[静态检查的6个配对发现](feedback-color-findings.json)均保留为pending-review / acceptedException=false。图形系列及其他已测文字配对达到原检查阈值；不据此授予完整对比度验收。

本轮之前源码与配色元数据在 `before-feedback/*.txt`；当前散列为 `source-sha256-feedback.json`。整页视觉仍待用户确认。

## 首版记录（以下为本轮反馈前）

2026-09-19，接续用户选定 A 和“按计划继续下一步”。交付 `http://127.0.0.1:5369/#learning-report`，方向页入口可进入；本地 Prototype Mode / local-experiment，整页视觉 awaiting_human，无独立审阅、无发布或 Git 操作。此前批改页16项视觉确认和 G1/F05 状态保持独立。

## 实现与复用

- 原 BM-D 宿主新增 `presentation="comparison"`，保留原入口；复用 `reportData`、`summarize`、可取消 `simulateTask`、Recharts 3.10.1 与既有 Rain 控件。没有新依赖，没有公共组件或 Token 默认变更。
- 平均分/提交率/已交/应交 → 趋势和班级对照 → 观察/建议 → 完整明细。班级与周期筛选作用于全部数据区域；指标切换同时作用于两张图；固定周次与键盘临时提示不会修改整期 KPI。
- 全期：已交252 / 应交312，平均80.9，提交率80.8%。最近三周一班66 / 78，平均84.1，提交率84.6%；二班69 / 78，提交率88.5%。以已交作业份数加权，未提交不作零分。数据仍为既有虚构样例。
- 标题16px、重点数字20px，单位保持 UI 字体；辅助13px。桌面使用320px对照栏；≤1000px改为上下排列，以免挤压趋势；≤640px单列比较和观察，表格保留内部横向滚动。没有全局断点或字体默认变更。
- 此前读取的 frontend-design / 执行计划 / TDD / 完成前验证继续用于本批；本次又读取 brainstorming 并复核已选方向与信息分组，不重复请求已有设计决策。

## 实际验证

| 检查 | 本次结果与证据 |
| --- | --- |
| 原型构建 | 通过，[build.log](build.log)；保留既有大体积主包提示（约1.37MB），没有据此改造打包架构 |
| 完整类型检查 | 通过，[typecheck.log](typecheck.log)，含各包/应用和测试类型 |
| 报告状态/数学/缺测回归 | 5通过，[unit.log](unit.log)；新增范围与对照检查先失败再实现，[test-red.log](test-red.log) |
| 本批配色登记及 G1 Gate 隔离 | 2通过/239未选，[color-test.log](color-test.log)；篡改弱文字或把系统色移出 forced-colors 均被拒绝 |
| 构建产物浏览器 | 2通过，[browser.log](browser.log)：入口、筛选、键盘、固定读数、统计弹层/Escape焦点恢复、失败聚焦/重试、空集恢复和原 BM-D 保持原呈现 |
| 布局 | [geometry.json](browser/geometry.json)：1369/900/390，整页无横向溢出；桌面并列、窄屏堆叠，标题/数字/字体角色实测 |
| 实际看图 | 已查看 [1369](browser/1369.png)、[900](browser/900.png)、[390](browser/390.png) 和 [深色弹层](browser/dark-popover.png)；趋势为主要阅读区，对照邻接，观察退后；窄屏明细保留局部滚动 |

首轮浏览器检查1过1失败：[browser-first.log](browser-first.log)。原因是测试直接点击共享 Checkbox 隐藏的原生 input，被可视包装遮挡；改用 Space 并验证选中，保留真实键盘行为，没有强制点击或修改组件。再次运行2项通过。

## 配色与边界

[color-consumers.json](color-consumers.json) 登记8项本页新增声明，沿用现有 M2 消费登记器并锁定文件哈希和本批授权；只补1个应用样式文件和2个检查入口的边界清单。辅助文字仍归类真实文本，比较条是有文字数值的图形；没有降低阈值、装饰化真实内容或改共享 Token。

[contrast.json](browser/contrast.json) 含浅深主题18个运行时配对。正文/数字最低13.55；辅助文字最低5.08；趋势系列最低4.46（图形阈值3）；坐标最低6.56。只代表已测配对，未据此接受所有共享输入边界或授予完整无障碍验收。强制颜色/减少动态模式和深色 Portal 另有截图。

全局 `verify:tokens` 仍失败：[tokens.log](tokens.log)，G1原有弱文字/图标发现，以及 exam-editor、list-composition、teacher-grading 的4项未登记消费者仍保留；本页新增声明检查通过。全局 `verify:boundaries` 仍有23条既有登记/快照路径发现：[boundaries.log](boundaries.log)，本页新增文件已限域登记。不将全局检查写成通过。

未做真实读屏、物理触摸、跨机器字体或独立审阅；未运行完整单元套件。F08通用图表基础仍归G4，本次只检查实际复用角色。下一检查点：报告 A 整页视觉；G1/F05限定确认后再扩 Tooltip/Resizable 同类源码。

基线文件保留在 `before/*.txt`，当前变更文件散列见 `source-sha256.json`。既有5368服务及5369预览保留。共享阈值、历史 Gates、发布状态没有变化。
