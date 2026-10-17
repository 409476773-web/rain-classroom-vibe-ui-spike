# G4 标题、关键数字与图标反馈验证

本轮按用户明确反馈修改现有排版合同与实际调用：标题默认 16/24，少数需要区分层级时显式选择 17/18px；关键数字默认 28/36，Data 用途组合最大 28px。课程资料文件图形为 20×20，原灰色底块保持 40×40。整行导航使用正式 ArrowRight 线形资产与更浅的 Icon/Neutral/3。阅读与下载继续保持相同的 14/20、40×26。

实施在既有 `card-v2` 工作树中进行。19 档原子字号身份、Reading 默认、字体与回退、数字规则、浏览器缩放均保留。没有新增排版包装组件、字体分发、依赖或业务状态。

## 实现与直接调用

- `typography-contract.ts` 是字号预设与验证的单一来源。两种 Heading 命名预设默认 16px，显式字号限于 16/17/18；通用组合验证拒绝 Data 大于 28px。UI／Reading 的原始大字号仍可用于试用，不将原子 Token 删除或改名。
- TypographyPanel 复用现有 resolver 筛选可用字号，保留行高联动、Equal、恢复与数值／中文单位分离。通过现有生成器更新实际受影响的 `typography.css`、`tailwind-theme.css` 和 `token-foundations-v1.json` 三项输出。
- 共享 ComponentDoc H1/H2 统一 16/24，删除移动端 24/32 覆盖。Input、Select、InputNumber、Tag 四个直接使用 heading-page 的 H1 从旧 24/32 改为显式 16/24 Token。运行检查证明，仅删除声明会被应用未分层 H1 reset 放大，故保留准确的直接调用声明。
- Item 只修改文件内部图形尺寸，底块和布局不变。导航使用已有正式 `@rain-next/ui/icons/arrow-right` 资产，颜色位于 ItemMedia 宿主，强制颜色模式继承宿主。可复制片段使用同一个正式资产和真实的 `text-rain-category-icon-neutral-3` 类，避免图标自身的 color:inherit 压过颜色类。
- Typography Manifest 与 Registry 记录本轮确实修改了 Foundation 合同；旧 G4 能力、来源、状态与历史 Gate 保留，新反馈独立登记。

## 真实 RED 与修复过程

`typography-red.log` 保存用户新约束的真实 RED：两文件共 20 项检查中 5 项失败、15 项通过，涉及默认字号、Data 上限和试用选项。旧浏览器字号事实保存在 `browser/` 和 `browser-red-actual/`；这两份为中断前有限场景结果，不声称完整 RED 套件已跑完。

后续浏览器重启的两次失败分别来自 Chromium 沙盒启动和 5391 服务连接拒绝，保存在 `browser-red-actual.log`／`browser-red-confirmation/`，不作为功能 RED。预览已重新建立在用户原 5391 端口。

第一次 GREEN 检查为 16/20：两个视口发现四个旧调用页被全局 H1 reset 放大；另两个 Item 检查误将 Vite 内联 SVG mask 当成文件 URL。前者通过直接调用的 16/24 声明修复；后者改为解码实际 mask，比较正式 SVG 的原始 path，继续检查资产身份、渲染模式、颜色和剪影。第一次结果保留在 `browser-green/`，最终运行使用独立目录。

复制片段首次提取误将含常量声明的完整示例包进 JSX return；提取错误日志保留在 `copied-examples-extraction-error.log`。修正的是证据提取，不是产品示例源码。

## 完整性与保留边界

本轮实施前实际保存 81 份原件及 SHA，见 `baseline.json` 与 `before/`。本轮有限后继绑定 34 项当前源码、48 项保留记录；原 G4 的 38+10、前轮视觉修正的 18+7，以及前轮 58 个原件一起验证。没有重新采集基线、逆向重建本轮 before 或改写旧来源记录。五处标题 CSS 只允许本轮准确的字号声明变更，并有拒绝无关改动与重新签署的检查。

颜色验证保留原来的 meaningful-icon／critical／interactive 角色和 3:1 必要图标阈值，重算 350 项测量并增加浅／深主题下两项导航图标测量。有限颜色验证通过不等于人工或全库对比接受。

## 验证结果

最终源稿与元数据冻结后，8 个文件的 83 项专项检查全部通过；其中 29 项检查覆盖新反馈与两个前身的治理。实现 completed，自动验证与独立审阅 passed-scoped；用户视觉判断继续单独保留。

| 检查 | 实际结果与证据 |
| --- | --- |
| 专项单元与治理 | 83/83、8 文件：[最终日志](scoped-unit-final.log)。 |
| 类型检查 | 5 个工作区包及测试配置通过：[最终日志](workspace-typecheck-final.log)。 |
| Playground 构建 | 通过：[最终日志](playground-build-final.log)。既有图表大包告警保留。 |
| 生成输出 | 现有生成器一致性检查通过：[日志](generator-check-final.log)。实际变更仅三项排版输出。 |
| G4 浏览器 | 20/20、0 skipped、0 flaky；1440×1000 与 390×844：[日志](browser-green-final/run.log)、[报告](browser-green-final/report.json)。20 份 console/pageerror 记录全部为空。 |
| 受影响 Token 浏览器 | 4/4、0 skipped、0 flaky：[日志](token-browser-final/run.log)、[报告](token-browser-final/report.json)。 |
| 可复制代码 | 7 个页面片段及 3 个指南片段对真实 UI 类型编译通过：[页面日志](copied-examples-typecheck.log)、[指南日志](copied-guides-typecheck.log)。提取原文保存在对应目录。 |
| 有限颜色 | 350 项测量、0 失败，实际源 paint 与指定复制文字校验通过：[记录](color-verification.json)。复制模板只是展示的代码文字，仅该唯一正式 class 独立校验；实际 JSX paint 不被豁免。 |
| 独立审阅与完整性 | 两项发现均已修复，新增复制文字守卫无泛化 paint 逃逸，三条来源链实际通过：[审阅](independent-review.md)、[完整性](source-integrity.json)、[元数据冻结](final-metadata-freeze.json)。 |

浏览器直接测量了 H1/H2、课程标题与页面标题预设的 16/24；四个旧调用页在两个视口下也为 16/24。Data 数值为 28/36/700，中文单位为 UI 14px；Heading 可选项为 16/17/18。三行文件图形均为 20×20，底块均为 40×40；两对阅读／下载均为 14/20、40×26。浅／深主题下正式导航 SVG mask 解码后与源资产 path 一致，图标为 Icon/Neutral/3；Tab／Enter、forced-colors、阅读关闭焦点、下载正文、已读和进度场景均通过。

![课程资料当前尺寸](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/g4-review-sizing-2026-10-11/browser-green-final/item-desktop-scene.png)

导航截图中原 `*-dark.png` 曾截取到主题过渡的中间颜色，原件保留，不能作为稳定深色视觉证据。补拍关闭截图动画且未 hover 的稳定状态，实际父背景与图标颜色见 [稳定事实](browser-green-final/navigation-stable-facts.json)；交付优先参考 [浅色导航](browser-green-final/item-desktop-navigation-light-stable.png)、[深色导航](browser-green-final/item-desktop-navigation-dark-stable.png)、[深色课程资料](browser-green-final/item-desktop-dark-compact-scene-stable.png)。根任务查看了当前 Typography、课程资料和两主题稳定导航，未发现新增视觉问题；这不是用户视觉接受。

## 保留的全局失败

五项全局验证的 before view 每次都核对 81 个真实原件 SHA。未映射依赖读取当前文件，因此这是有限的实际前身视图，不能称为完整历史工作区快照。所有原始诊断保留于 `*-before-view.log` 与 `*-global-current.log`，比较见 `global-before-current-comparison.json`，不通过过滤错误或放宽旧门槛使结果变绿。

Token、Workspace、Boundary、Evidence 的原始诊断与 before 逐字相同。Tailwind 的两条既有 Data 别名诊断仍期待原 Task 4 的 36/42；本轮别名真实改为指向 28/36，两条诊断文本随之改变，完整差异已经登记。五项全局检查仍各自 exit 1，诊断数量为 229／1685／7／46／2。额外 asset-index 检查也仍有 2/4 因既有 Token history 失败，不能算作全局通过。

## 状态与未验证

用户视觉 Human Gate 保持 awaiting_human，对比接受 not-granted，候选 unpublished。未进行 Git、Figma、发布或生产业务迁移。未运行全库单元／浏览器回归，未实测 Safari、移动设备、VoiceOver 或完整无障碍流程；本机字体事实不能保证其他机器有相同字体。

入口：[Typography](http://127.0.0.1:5391/#typography)、[Item](http://127.0.0.1:5391/#item)、[Progress](http://127.0.0.1:5391/#progress)。
