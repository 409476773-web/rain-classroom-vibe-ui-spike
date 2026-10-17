# B2 历史与整库治理收口

日期：2026-10-13—2026-10-14。当前状态：本轮本地治理收口完成。整库单元回归 2917 项通过；随后第 13 轮共享文档的有限后继经 99 项来源定向回归、正式治理及类型复验通过。图标、构建和 Select 浏览器专项通过。本记录不授予颜色、无障碍、发布或业务采用验收。

用户范围：继续解决剩余的 B2 历史和整库校验问题，保持已经确认的 Select 样式不变。工作区为现有 `card-v2`，分支 `codex/card-v2`。

## 改动与原因

1. B2 原历史本身正确。共享验证器补认现有导航、S3 和图表的精确后继；原冻结 B2、阶段记录及 Gate 保持不变，未知记录仍拒绝。
2. 通过本轮 37 个明确来源的 before/after 绑定续接原证明。所有 intake 均在对应修改前保存，原证明不重签。导航和图表沿用已有固定来源及每个包的固定依赖记录，没有安装或升级依赖。
3. 两份反向引用 Playground 的公共库测试移至应用消费者目录，保留全部 40 项用例和数据行为。三个已声明构建输出目录按各自配置识别，未添加泛化目录跳过。
4. Tailwind 检查采用实际 CSS 选择器解析，覆盖 `:is`/`:where` 的嵌套主体；只按结构区分 group/peer 关系节点。保留未知工具类、未经声明来源和擅改原阈值的拒绝测试。
5. 历史测试从锁定原件构造一致的历史夹具，当前测试从已验证的完整来源链构造夹具；旧阶段、额外路径、第三份源码、伪造 before 和扩大验收范围的断言均保留。
6. 并行设计执行任务新增的一段接入文档由一个固定观察记录续接。两份固定观察依次覆盖第 12/13 轮，各自的文档、原 `before` 和五份归属记录逐字节校验；第一份观察不改写。原文档快照仍完整，C4/C5 仍未采用，新段落不承袭人工验收。
7. 颜色登记补全实际声明、角色、原阈值和未知父背景/状态的观察；真实低于阈值和资格问题保留为待处理发现，原视觉值和原阈值保持不变。

## 原件和视觉保护

最终字节核对记录见 [protected-source-check.json](protected-source-check.json)。16 个 Select/公共 Foundation 等受保护源、6 份既有证明及 `status/current-phase.yaml` 保持原字节。冻结 B2 哈希仍为 `fb9b518f55944a74c8081d88a83d2385c8615e95887efe0cd1eae9b16ae186fe`。本轮未修改 Select 运行实现或样式。

本轮来源为 [source-bindings.json](source-bindings.json)；原始及逐轮新增 intake、原 `before` 快照均保留。共享文档后继见 [concurrent-document-observation.json](concurrent-document-observation.json)，及 [concurrent-document-observation-02.json](concurrent-document-observation-02.json)，只覆盖同一份接入文档。

## 实际验证

最终结构化结果见 [checks.json](checks.json)。

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 初始五项治理入口 | 全部 exit 1，保留失败原日志 | [before-checks.json](before-checks.json) |
| 正式治理：锁文件及 workspace/evidence/boundaries/B2/tokens | exit 0 | [governance-document-successor-02.log](governance-document-successor-02.log) |
| 图标 | exit 0；899/899 available、0 blocked、1806 文件完整；单图标消费不包含全目录 | [icons-closeout-final.log](icons-closeout-final.log) |
| 全部工作区包及测试类型检查 | exit 0 | [typecheck-document-successor-02.log](typecheck-document-successor-02.log) |
| 整库单元测试（第二次文档观察调整前） | exit 0；270 文件、2917 项通过，0 failed、0 skipped，729.29 秒 | [full-tests-verified.log](full-tests-verified.log) |
| 第 13 轮文档衔接后的来源回归 | exit 0；13 文件、99 项通过，0 failed、0 skipped，102.90 秒 | [document-successor-02-tests.log](document-successor-02-tests.log) |
| 两份历史日期夹具及来源链回归 | 4 文件、25 项通过 | [historical-date-fixtures-regression.log](historical-date-fixtures-regression.log) |
| CSS 选择器补漏专项 | 通过；专项名称筛选的其余用例未执行不计入整库结果 | [selector-ast-regression.log](selector-ast-regression.log) |
| 工作区构建 | exit 0；保留既有大分块警告 | [build-final.log](build-final.log) |
| Chromium/Firefox/WebKit Select 专项 | 6 项通过；含 1440/390 宽度、Light/Dark、表单、必填反馈和键盘 | [browser.log](browser.log)、[浏览器报告](browser/report.json) |
| 独立源码审查 | 最后两轮未发现新增 P1/P2；发现的 CSS 解析盲点已修复并复验 | 最终审查与相关专项日志 |

全量回归通过后，共享文档又更新到第 13 轮。最后修改仅为固定文档来源的第二次衔接、对应复制器和来源负向断言；UI 运行源未改。该调整后复跑全部受影响的 13 份来源测试、正式治理及完整类型检查，未把此前全量回归当作最新字节的再次全量运行。

较早的整库回归实际为 270 文件中的 268 个通过、2 个失败，2917 项中的 2912 项通过、5 项失败、0 skipped；失败仅为两份日期历史夹具混入现行 G4 测试源，已经修复。该失败日志保留为 [full-tests-complete.log](full-tests-complete.log)。共享文档变更打断的更早回归也保留原日志，不计为通过。

## 颜色与验收边界

完整未加工结果见 [final-color-check-results.json](final-color-check-results.json)。注册/source 失败为 0，验证了 109 个 consumer files；颜色结论仍为 `failed-with-unproved`：3223 个低于原阈值的组合、558 个资格发现和 2161 个未证明观察。这些数字包含主题/父背景/状态组合，不代表相同数量的独立组件缺陷。

2161 个观察为 1321 个 paint observations 加 840 个 Navigation uses；保留 1375 个 `actual: null`，没有编造真实渲染结论。17 个 Navigation authored-role 冲突仍待独立处理。8 个历史文本对比度例外和 102 个组件例外保留原实测值与阈值，不转写为可读性通过；8 个 scoped eligibility decisions 不扩展到其他来源。

真实 Safari、VoiceOver/其他屏幕阅读器、实体触控、生产数据和性能未在本轮验收。WebKit 自动检查不等同真实 Safari 验收。原人工视觉确认保持各自范围；未执行提交、推送、发布、Figma 写入或业务迁移。
