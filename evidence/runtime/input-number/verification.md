# InputNumber 实施与验证

日期：2026-09-16。工作区：`.worktrees/card-v2`。用户“开始实施”授权本批建设；随后要求默认较窄、不撑满，已纳入实现。当前运行视觉已获用户“视觉确认”，详见末节验收记录。

当前最新规则：数值区固定5ch，整体按实际附加内容确定宽度；表格/筛选示例32px，与同排按钮对齐；评分后缀支持“/10分”；清空按钮仅hover或focus时显示。下文80/120/160px为前序方案记录，已被末节最新补充覆盖。

## 已交付

- 独立 InputNumber，复用现有 fieldFrameRecipe、Input 尺寸/附加文案和 FormItem；未增加依赖。
- 左减／中央数值与单位／右加。outlined、filled 保留弱分隔线；underlined 沿用 Input 的连续底线、透明侧边结构。
- 默认宽度 160px，max-width 100%；`fullWidth` 显式撑满。160px 是 Rain 对左右完整按钮、单位与可选清空位的选择，不是成熟库统一标准。参考 [Ant Design InputNumber](https://ant.design/components/input-number/) 的独立 controlWidth（文档默认90）、[shadcn InputGroup](https://ui.shadcn.com/docs/components/base/input-group) 的附加内容组合、[MUI Number Field](https://mui.com/material-ui/react-number-field/)。
- 保留手输范围/精度错误；120 超过上限100时，减少到119、增加禁用。未完成或不安全草稿不会使用旧数值提交或步进。
- 空值 null；可选清空；精确十进制步进；受控/非受控、外部回填、输入法事件、原生重置、单位描述和表单验证。
- `1.` 编辑时已同步数值1，显示尾点到结束编辑；提交只整理显示，避免受控宿主与 FormData 不一致。`-`、`.`、`-.` 始终为无效草稿。
- 原生 `requestSubmit()`、点击提交与 Enter 使用相同当前值；浏览器标准 `noValidate` / `form.submit()` 会绕过原生验证，不能由此推断组件阻止任意业务保存函数。自定义保存应使用 validity 或 valid commit。
- 组件总览、`#input-number` 页面、Manifest、未发布本地 Registry、资产索引和精确治理登记。

## 自动验证范围

| 检查 | 结果 |
| --- | --- |
| InputNumber、既有 Input/FormItem、组件总览、数字颜色与授权专项 | 4文件48项通过 |
| RN-06 / RN-08 / RN-15 / Dialog 历史记录兼容 | 定向回归通过；旧校验和保留，FormItem 使用有授权且精确匹配字节的后继登记 |
| Chromium + WebKit | 6项通过：当前草稿提交、范围/精度阻止、尾点、重置、清空、步进、权限、三外观、深色、焦点、强制颜色及375px页面布局 |
| 类型检查 | `pnpm typecheck` 通过 |
| 构建 | `pnpm build` 通过，保留既有大 chunk 提醒 |
| Tailwind B2 | `pnpm verify:tailwind-b2` 通过 |
| 资产索引 | `node scripts/asset-index.mjs --check` 通过 |
| 全库治理 | 未全绿：其他原型页面的文件/颜色登记缺项，见下文；本批新增颜色与授权专项通过 |

`geometry.json` / `webkit-geometry.json`：三种外观默认均160×32；与对照 Input 的32px高度一致。描边/填充圆角6，底线圆角0、无竖分隔。默认按钮可见盒32×30，命中区域覆盖边框高度；24px示例的命中区域实测至少24×24，并在按钮边缘实际点击验证。

`color-facts.json`：新增按钮/清空图标、页面文字在已登记静态表面上的36组浅深色配对均达到对应3:1或4.5:1阈值。这不覆盖既有字段弱边界、单位文字、警告文字及全部动态叠色，不代表全组件对比度验收。

## 独立审阅

核心实现独立审阅通过；审阅者在独立临时测试中复跑8条复现全部通过。发现并修复：受控拒绝候选却触发commit、原生提交与宿主状态不同步、Enter重复commit、IME期间外部回填被消费、无效草稿清空漏报null。新增单元回归保留这些行为。

## 视觉检查与验收边界

已查看本批实际浅色、深色、窄屏及强制颜色截图。深色标题继承修复；根据用户反馈改为160px默认宽度，新增紧凑／撑满对照。

截图：`light.png`、`dark.png`、`focus.png`、`forced-colors.png`、`narrow.png`，以及对应 `webkit-` 版本。默认宽度修改后已重新采集。

- 运行视觉 Human Gate：awaiting_human。
- 对比度接受：not-granted；沿用 Input 的待复核弱颜色不自动关闭。
- IME 自动事件已验证，真实中文输入法、读屏、实体触屏未完成人工验收。
- 未发布包或 Registry，未迁移业务，未写入 Figma，未执行 Git 提交/推送。

## 全库检查中保留的其他问题

`verify:boundaries` 仍报告 `apps/prototype/src/scenarios/teacher-grading/` 的三个源码未登记；`verify:tokens` 报告该页与 `scenarios/list-composition/list.css` 未登记颜色消费者。这些路径不属于本批修改。

完整单元检查首轮为113文件、1435项，其中21项失败；本批引起的组件总览数量、授权投影、FormItem历史字节和扫描来源登记已修复并定向重跑。不能把首轮的全库失败数量当作最终本组件失败数量；其余治理夹具失败及M2原型入口冻结检查仍需对应任务处理。

最终定向复跑：历史兼容4文件15项通过；涉及新增授权的治理回归422项中415项通过、7项失败。剩余失败仅涉及M2既有原型入口字节，以及teacher-grading文件登记／list-composition和teacher-grading颜色登记，未扩大这些任务范围修复。专项48项与浏览器6项均为160px默认宽度版本的结果。

## 增补：Classic 紧凑形态与重要数字（2026-09-16）

用户追加要求保留旧 Vue 数字输入框，并让重要数字使用特殊数字字体、始终粗体且不改字号。已记录两个独立增量授权；没有扩大视觉/颜色接受范围。

- 新增 `controlsLayout="stacked"`，左对齐数值、右侧上下箭头；既有 `split` 仍为默认。两个布局共用同一输入节点、草稿与数值校验。
- 传统版基础80px；单位/前缀或清空位120px；清空与附加文案同时出现，或带框内标题160px。fullWidth显式撑满。箭头显隐不改变宽度与文字位置，键盘聚焦可见，无hover设备常显。
- 三外观同页对照，表格单元格与筛选栏布局示例。框内标题初始120px会把“最低分／最高分”截成相同前缀，已实测修为160px，并留下完整文字断言。
- 新增 `keyData`，默认关闭。仅数值使用 `--rain-font-data`、`--rain-font-weight-bold`、`--rain-font-numeric-data`；四档尺寸保留既有字号/行高。24px高度使用13px字号，其余三档14px；单位、标签、placeholder仍为UI字体。错误、只读、禁用状态保持数字700字重。
- 浏览器实测 `key-data-rendered-fonts.json`：本机 Chromium 数字实际使用 `LINESeedJPApp_OTF-Bold`，普通数字使用 `PingFangSC-Regular`，不是仅检查CSS声明。字体文件仍遵循Foundations的本机字体与回退策略，未新增分发。
- 触摸回归发现 WebKit 中 `pointerdown.preventDefault()` 会抑制click；原生按钮独立对照可复现。step与clear改为 `mousedown.preventDefault()`，保留输入焦点并让触摸click正常产生，两种布局及清空均验证一次tap生效。
- WebKit默认键盘偏好下Tab跳过原生button，Option+Tab可进入；与独立普通input/button对照一致。测试按平台原生导航验证，不增加自定义Tab拦截。

本轮专项52项、Chromium/WebKit浏览器10项、类型检查及Tailwind B2通过；构建、资产索引与最终独立复核结果见 `checks.json`。浏览器覆盖三外观、两布局、四尺寸、浅深色、强制颜色、375px宽度、嵌入、重要数字排版、当前草稿提交及模拟触摸。`stacked-*.png` 与 `webkit-stacked-*.png` 为本轮实际截图，已人工查看；`*-key-data-typography.json` 为两引擎排版事实。

增量独立审阅通过，无剩余可复现P1/P2。审阅者单独验证了形态切换保持DOM、焦点、光标和草稿，检查三外观/四尺寸/长数字/隐藏按钮键盘入口，并复验了标题截断修复。最后独立以Chromium与WebKit复跑两布局单次触摸增减/清空，以及keyData的字体、字重、尺寸和单位/占位分离。独立复现材料位于 `/tmp/rain-input-number-review/`；旧数字引擎本轮未重复独立审查，沿用上文已有审阅及本轮回归。

全库Token检查仍因list-composition与teacher-grading的已有颜色消费者登记缺项失败，本轮InputNumber新增消费者专项通过。历史全库检查结果保留于上文，不声称本轮重跑了完整单元库或全部治理检查。运行视觉仍 awaiting_human；真实触屏、读屏与全量颜色接受未在本轮完成。

## 最新增补：评分后缀、宽度、32px嵌入与清空显隐

- 打分组合复用现有 `suffixText` 与 `max`，从同一宿主满分生成“/10分”和上限10；空值保留后缀，超限11保留错误，步长0.5时先减到10.5再到10.0。只强调可编辑得分，固定满分说明保持UI字体与400字重。原来的“满分设置”字段仍仅显示单位“分”。
- 默认数值区域固定5ch，整体使用固有宽度，不随草稿长度变化；单位、内置标签、清空位、按钮各占实际空间，不再套用固定80/120/160档位。五位数可见；更长数值仍可输入并在输入区内滚动，fullWidth仍为显式选项。独立错误说明不撑宽字段。
- 用户将嵌入高度从28修正为32：表格与筛选栏显式32px、重置按钮也为32px。筛选错误出现时保持顶边对齐；表格题目与输入首行居中对齐，不受下方错误文案增高影响。改动仅在展示页组合内，不改Table默认样式。
- Chromium实测普通左右按钮版约124px（此前160），传统版带“分”约102px（此前120）；含框内标题的筛选字段134px。字体不同会造成正常的小幅宽度差异。完整测量见 `chromium-embedded-geometry.json`、`webkit-embedded-geometry.json`。
- 清空按钮普通状态opacity0且不接收鼠标事件，字段hover/focus-within时显示；保留槽位，不挤动数字。键盘可进入、激活，触摸先点字段再清空；未引入另一套交互状态。

最新Chromium/WebKit 12项浏览器测试通过；专项52项与最终颜色/授权专项、类型、构建、B2与资产索引结果见 `checks.json`。新增浏览器断言覆盖五位可见、短值/空值/错误宽度稳定、32px同排/报错行对齐、满分后缀，以及清空hover/focus/keyboard/touch。最新通用截图与 `*-grading-*.png` 已更新。

独立复核通过：两引擎检查长短值、空值、独立错误、fullWidth、普通/Data字体、32px同排对齐、清空显隐与操作。发现的表格错误态标题下移现象已按局部组合修正并复验。独立脚本位于 `/tmp/rain-input-number-review/`：`five-digit-width-review.mjs`、`standalone-error-width-review.mjs`、`clear-reveal-and-table-final.mjs`。

本节不重复宣称全仓检查已通过，也不代替用户视觉、颜色或实体辅助技术验收。

## 用户视觉确认（2026-09-16）

用户在当前 `http://127.0.0.1:5196/#input-number` 页面明确回复“视觉确认”，当前运行版本的视觉验收记为 accepted。范围包含左右加减与旧版上下箭头两种结构、三种外观、重要数字字体、评分“/10分”、5ch数值区、表格/筛选栏32px及同排对齐，以及清空按钮仅在hover或focus时显示。

本次仅登记视觉验收，不修改组件实现。此前“待用户复核”属于历史状态，以本条为准；contrastAcceptance仍为not-granted，仍未发布，其他组件验收、Figma、业务迁移和Git状态不变。

验收登记复核：授权与颜色专项2项通过，Tailwind B2和资产索引检查通过；本次未修改运行实现，沿用上轮浏览器与构建证据。
