# Questionnaire 复用改造：浏览器验证

- 日期：2026-10-16；工作区 `card-v2`；本轮为 System Mode 的有限复用改造验证。
- 浏览器：本机 Playwright Chromium；Vite dev 使用本轮专用 `5477 --strictPort`，未复用或停止其他服务。
- 本浏览器验证子任务仅新增 `tests/e2e/questionnaire-reuse.config.ts`、`questionnaire-reuse.spec.ts` 和本轮证据，保留原有浏览器测试；发现的生产样式问题交由主任务修正。

## 运行结果

| 运行 | 结果 | 证据 |
| --- | --- | --- |
| 原有 Radio 6、Checkbox 7、选择卡片 7、Input 11，加问答桌面/390 各 6 | 43/43 通过，exit 0；无 skipped/flaky | `full.log`、`report.json` |
| 扩展最终问答专项：补 enabled Choice 属性、原生 emoji/minLength/pattern、错误选项及 Select/Textarea 焦点 | 12/12 通过，exit 0；无 skipped/flaky | `specialized-final.log`、`specialized-final-report.json` |
| 目视发现错误边框问题后：已选错误边框 + 自定义 function/element 外框合同 + 完整前后视觉矩阵复核 | 4/4 通过，exit 0；无 skipped/flaky | `affected-final.log`、`affected-final-report.json` |
| 最终测试 TypeScript | exit 0 | `test-typecheck-final.log` |

完整运行命令：

```sh
pnpm exec playwright test --config=tests/e2e/questionnaire-reuse.config.ts
```

最终专项命令（从工作区根执行）：

```sh
RAIN_QUESTIONNAIRE_REUSE_REPORT_FILE=evidence/runtime/questionnaire-reuse-2026-10-16/browser/specialized-final-report.json pnpm exec playwright test questionnaire-reuse.spec.ts --config=tests/e2e/questionnaire-reuse.config.ts --output=evidence/runtime/questionnaire-reuse-2026-10-16/browser/specialized-final-results
pnpm exec tsc --noEmit --project tsconfig.tests.json
```

`initial-specialized.log`、`specialized-desktop.log` 和 `specialized.log` 保留夹具开发过程的失败，分别来自仅测试模块路径解析、React 预构建文件的无版本 query 导入，以及同 hash 导航未重建页面；最终夹具已分别使用实际扩展名、同源静态 runtime 模块和独立 query 解决。

随后的目视对照发现，错误题目内已选 Choice 的蓝色边框覆盖错误红色边框。原因是共享卡片 checked 规则的 `:has()` 最大优先级高于错误规则。已补浏览器断言并保存红灯：`invalid-selected-red.log`、`invalid-selected-red-report.json`。主任务修正错误选择器优先级，并补全自定义 Choice render 的基础卡片类；受影响场景最终4例通过。`comparison-viewer-invalid-before-fix.png` 保留发现时的画面，`comparison-viewer.png` 与矩阵截图已刷新为修正后结果。

`affected-reload-interruption.log` 与同名报告保留一次验证干扰：前三例通过，最后390矩阵在证据HTML编辑触发的页面重新导航后失去注入夹具而超时；没有改动实现或断言。停止编辑HTML后，同4例独立重跑20.6秒全部通过，日志为 `affected-final.log`。

## 实际覆盖

- 真实课堂反馈页面：条件题、必填及长度校验、保存/恢复草稿、向前/返回编辑、宿主受控回答、自定义 textarea render、提交失败保留及重试、完成标题焦点。
- 原始 Primitive 与 Rain 对照：字母及数字快捷键；单一 label/直接子 input；disabled 不可选；enabled Choice 不出现 data-disabled；skip 后返回和回选；文本与选项互斥；输入期间快捷键不误触发；FormData 与状态一致。
- 原生输入：size=20、maxLength=120；真实键入 121 个 ASCII 字符保留120个，61个 emoji 保留60个，保留UTF-16原生长度约束；minLength 与 pattern 的原生 validity 生效。
- 六条 reset 路径：当前文本、改选后的旧文本、默认文本后改选、skip 后、取消 reset、宿主受控 reset；逐一比较原始 Primitive 与 Rain 的 DOM 值、checked、name/form、FormData、status 和焦点。
- 问答 normal/error/readonly/disabled 外框、错误选择卡片边框、选择指示器焦点；普通 Select、Textarea 的原 data-slot=control 路径焦点及 forced colors。
- 自定义 function/element label：与默认 render 在未选常规、已选错误两组状态下的边框、背景、文字、圆角、padding、宽高逐项相等；各自保持唯一 label 与 input，已选错误边框为错误色。
- 390px 下真实 input 高度为44px，上部和下部有效区域分别点击均聚焦；无页面横向溢出。此项采用 Chromium 鼠标点击；原有控件的 Chromium touch 模拟也通过。
- light/dark × default/compact × 1440/390：每个组合都有普通控件与问答的 before/after 截图。普通控件的标签/类/slot/state、文本及 input 状态、相对几何和所列计算样式逐项相等；不把生成 id 字节相同作为要求。

## 前后对照方法

`baseline-modules/` 是本轮冻结 Radio、Checkbox、选择卡片、Questionnaire TSX 的仅测试副本。相对辅助依赖改指当前同源文件；行为包仍为当前固定版本。旧全局 CSS 用原生 `@scope` 限于 before；旧问答 CSS 与类名一起重命名，避免覆盖 after。未建立公共演示接口，也未复制问答状态机。

可直接打开 [视觉对照页](index.html)。`before-after-{desktop,narrow}.json` 包含普通控件的逐节点计算结果；`native-reset-*.json`、`shortcuts-*.json`、`focus-hit-area-*.json` 保存对应行为事实。

本次截图准备与 AI 目视检查只支持当前局部改造验证。人工视觉/对比度验收、Safari、VoiceOver、真实触摸设备、发布及业务迁移尚未验证；Human Gate 保持等待人工。
