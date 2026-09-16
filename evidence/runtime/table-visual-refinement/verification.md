# Table 视觉调整验证

后续更新：资料筛选栏已采用可选框内固定标题，尺寸与本批表格视觉要求保留。见 [框内固定标题验证](../inside-field-labels/verification.md)；以下为本批历史。

日期：2026-09-14。用户只读讨论后明确确认四项视觉要求；[方案](../../../docs/plans/2026-09-14-table-visual-refinement.md)。实施 completed / 自动验证 passed / 独立技术审阅 passed；运行视觉 awaiting_human，对比度与弱色适用性接受未授予。

## 最终变化与范围

- 行 hover 使用现有 Fill/Neutral/Alpha/5，浅色 rgba(85,119,244,0.1)，深色 rgba(86,106,181,0.1)。选中行继续使用 Fill/Brand/Alpha/4。
- 所有有文字的列标题为13px / 18px / 400，Text/Neutral/4；排序按钮采用现有 compact 文字规格，具名局部配方继承表头色，禁用与焦点行为保留。正文维持14px / 22px，Footer 保留 Text/Neutral/2。
- Table 直接子级单元格使用原生高度作为基础；多行自然增高，不以固定容器裁切内容。无新增 Foundation 尺寸。
- 资料本地配方显式组合现有完整尺寸，修正默认 Input / Select / Button 高度不同造成的顶边错位；公共控件的默认值与源码未变，Pagination 保持此前确认的六个文件逐字一致。

| 模式 | 表头实测 | 普通正文行实测 | 搜索 / Select / 两个视图按钮实测 |
| --- | --- | --- | --- |
| 常规 | 44px | 50px | 全部32px，顶边与底边一致 |
| 紧凑 | 32px | 44px | 全部28px，顶边与底边一致 |

三引擎 × Light/Dark × 两种密度均满足上表；两个表单标签也位于相同顶边。详见 [实际测量](browser-measurements.json)。内含每列实际字体、行高、字重、颜色，以及表头 hover 的底色层。

## 已运行检查

| 检查 | 结果 | 记录 |
| --- | --- | --- |
| 改动前视觉断言 | 预期失败：compact 表头40.375px，而目标32px | [red-browser.log](logs/red-browser.log) |
| 定向单元及历史保护 | 5文件248项通过，含既有235项验证助手检查 | [unit.log](logs/unit.log) |
| 最终受影响单元 | 4文件14项通过，包含新增颜色角色/背景负例 | [final-unit.log](logs/final-unit.log) |
| Chromium / Firefox / WebKit 全部表格场景 | 15/15通过，零重试，34.7s | [browser.log](logs/browser.log) |
| 审阅修正后的三引擎视觉场景 | 3/3通过，零重试，11.5s | [final-browser.log](logs/final-browser.log) |
| 类型检查 | passed，含测试源码 | [typecheck.log](logs/typecheck.log) |
| 生产构建 | passed，既有大 chunk 提示保留 | [build.log](logs/build.log) |
| 完整治理 | passed，待审色彩与历史例外仍逐项输出 | [governance.log](logs/governance.log) |
| 独立最终技术审阅 | passed，无剩余可复现P1/P2，定向8/8 | 见下文 |
| diff 空白检查 | passed | git diff --check |

上述重复运行存在重叠，不累加为独立用例。浏览器继续覆盖排序、查询、选择、分页/容量/跳页、表格与卡片同步、加载禁用、错误重试、空态及独立 prototype。最终视觉复跑额外检查18px表头行高、hover真实背景、320/390px局部横向滚动、键盘焦点与强制色彩；页面错误和控制台 error 会使检查失败。浏览器为 Vite 开发服务，生产构建另行检查，未作部署验证。

已目视检查 Chromium 浅色常规/紧凑、Firefox 深色常规及 WebKit 320px。截图留在 `/tmp/rain-table-visual-browser/{chromium,firefox,webkit}/`，不会覆盖此前批次。浅深主题切换曾在 Button 原有颜色过渡动画中采到中间色，测试现等待颜色稳定后再测量，未改组件动画。

## 色彩资格与独立审阅

排序文字保持真实 text / interactive / critical=true，阈值仍为4.5；未改成 decorative 或降低阈值。只允许本批已授权表头普通/hover状态登记待审资格，Token、角色、父背景被改动时检查拒绝。[四条原始资格测量](color-eligibility.json)：

| 表头状态 | Light | Dark | 底色 |
| --- | --- | --- | --- |
| 普通 | 5.288 | 5.985 | Background/Neutral/2 |
| hover | 4.724 | 5.431 | Fill/Neutral/Alpha/5 叠加 Background/Neutral/2 |

这四组实测高于4.5，但现有规则“弱色应为非关键、非交互内容”的适用性仍是 pending-review，acceptedException=false。治理通过表示登记真实、阈值未失守，并不代表该资格已接受或全库对比度通过。

独立审阅者 rn08_contract_review 首轮发现1项P2：Footer 复用表头 paint 会让页脚正文一起变浅；已分开 paint 并恢复原 Text/Neutral/2。另补齐表头 hover 的真实底色测量及18px行高断言。最终定向8项通过，审阅确认P2关闭，无剩余可复现P1/P2。其测试与主检查有重叠。

接续状态位于 `status/current-phase.yaml#componentRefinements.tableRn08.visualRefinement`；此前 RN-08、分页替换及其他阶段记录保持原样。运行视觉与色彩资格待人工验收。未提交/推送 Git、发布包/Registry、写 Figma 或迁移业务。
