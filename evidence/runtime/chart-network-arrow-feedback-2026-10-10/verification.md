# 网络关系图箭头反馈 · 2026-10-10

本轮仅修正两种呈现样式共用的箭头。当前为未发布的 Registry candidate；柔光已确认的布局和节点材质保持，本次箭头与结构化视图仍待用户审阅。实际工作区为 `.worktrees/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`；共享工作区其他修改保留。

## 原稿与最小修正

用户反馈：“现在‘网络关系图’里的箭头样式都不如原设计稿”。用户截图保存为 `user-before.png`。

只读检查 Figma CH-083 `MbWg1ft5zk1JRQiQ6dS30e / 2905:47096`：关系 Vector 4516/4517 以及图例向量 `2905:47150` 使用 `ARROW_EQUILATERAL`。图例向量线宽 1.5px，导出实心三角头长 7.5px、高 8.66021px，即长度 5×线宽、高度 5.7735×线宽。原稿整图见 `figma-ch083-reference.png`，节点事实和真实 SVG 见 `figma-vector-reference.json`、`figma-arrow-reference.json`、`figma-arrow-reference.svg`。未写入 Figma。

共享 SVG marker 从固定大小的空心折线改为此实心等边三角形，使用 `markerUnits="strokeWidth"` 与 `orient="auto"`。普通 1.15 线宽对应头长 5.75、高约 6.64；邻接高亮 1.55 对应头长 7.75、高约 8.95。沿曲线末端切向，尖端保持既有路径端点，继承关系颜色与路径透明度。无向边仍无箭头，实/虚/点线及关系身份保持。

运行代码只改 marker 一处；同步已有 marker 单位断言及浏览器证据目录。未新增 API、依赖、抽象、数据或路径算法。几何、布局、业务宿主和四组数据源码的 SHA-256 与修改前一致，见 `baseline.json`、`protected-geometry-check.json`。本轮相对快照的差异见 `increment.diff`、`source-changes.json`。

## 当前检查

| 检查 | 结果与范围 |
| --- | --- |
| Network 单元 | 7 文件、83 项通过，10.99s；含数据、私有几何、组件、业务宿主、下载工具与目录检查。`network-scoped-unit.log`。没有为此次可逆样式修改新增实现镜像测试。 |
| 更大范围单元 | 9 文件、95 项中 93 通过、2 失败；失败为 China CSS 颜色登记与 China 导出缺少 `./china-region-map`。`unit.log`。首次旧 marker 单位断言失败保存于 `unit-initial.log`，该已有断言更新后 Network 检查通过。 |
| Chromium 页面 | 7 项通过，33.4s；四场景、配色、两样式、选择/筛选/更新、normal/reduce、长名/空/单节点/非法状态和 390px。`browser.log`。 |
| 实际连线与文字 | 两份 `browser/network-real-geometry-*.json` 各含 12 个图形审计：normal 结构化四图、long/revision2 两样式四图，每边 401 点相对实际 SVG 文字及卡片内部检查。它验证连线路径，不是箭头填充区域的完整几何审计。对应实际截图已查看，实心箭头沿末端贴合。 |
| 类型与构建 | UI typecheck 与 Prototype 标准构建通过。Playground 标准构建因 `china-region-examples.test.tsx` 三处 `ByRoleOptions.exact` 类型错误失败；另行运行 Playground 运行源码类型检查及 Vite 构建通过。这两个补充结果不等于标准构建通过。四类结果分别保存在对应日志。 |
| 独立消费 | 19 Registry 源码闭包、170 官网变体类型/构建通过；16 个 Network 下载配置闭包检查及文件准备完成。全业务独立消费在 China 导出闭包处失败，后续业务类型/构建/浏览器未执行，不能引用上一轮的 66 项通过作为本次结果。`consumption.log`、`consumption/facts.json`、`consumption/official-variants/facts.json`。使用已有依赖缓存，不是全新安装。 |

实际预览地址：`http://127.0.0.1:5173/#chart-network`。本次页面截图示例为 `browser/network-elements-structured-normal-no-preference.png`；两样式及 normal/reduce 的更多截图在 `browser/`。此前结构化独立审阅保持历史记录，本轮没有将其改记为箭头独立审阅。

## 验收边界

修正实现、局部检查和浏览器证据已完成；更大范围失败保留并明确登记。用户确认仅到此前柔光布局与节点材质，新箭头与结构化视图待审阅。完整对比度、真实 Safari/VoiceOver、物理触屏、深色及 forced-colors 未在本轮补齐；没有全仓库验收、发布、迁移、Figma 写入、Git 提交或推送。没有新确认的跨组件经验，本次比例只记在 Network 合同与任务记录。
