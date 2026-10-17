# Toast 文字操作与顶部位置修正 · Verification

日期：2026-10-08。用户明确要求撤回改为弱色文字按钮，与关闭 IconButton 接近；Toast 移到页面顶部并留出距离。

## 实现

- 共享 Toast 默认 Action 使用现有 `Button variant="text"`，通过 Base UI render callback 正确接收 manager 的动态 children/onClick；反色前景采用 Toast 局部 Recipe，动作与关闭共享 .72 强度，默认无描边且保留可见键盘焦点。
- Viewport 顶部居中，24px 加安全区、400px 上限和两侧 16px 保留。队列向下叠放/展开，入场从顶部进入，既有各向手势退出样式保留。
- 现有 Toast 文档和 Manifest 更新。原 G2 兼容出口自动消费共享实现；Registry 已有 Button/Core UI 依赖，不改冻结 Registry JSON。
- 无新公共 Props/位置选项/Token/依赖/计时机制。

## 验证

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 相关单测 | 3 文件 / 16 项通过 | `unit-final.log` |
| 浏览器 | 3 场景通过，含浅色桌面、深色紧凑390px、队列/F6/指定关闭 | `browser-final.log`、`browser/` |
| 应用与包类型 | 五个 workspace 项目通过 | `typecheck.log` |
| 专项测试类型 | 通过 | `scoped-typecheck.log`、`tsconfig.scoped-tests.json` |
| Playground 构建 | 通过，built in 1.07s；既有大包提示保留 | `build.log` |
| Asset Index | 引用/导出/生成内容通过 | `asset-index.log` |
| 实际浏览器 | 1280×720 浅/深，撤回与关闭实操；顶边24px，宽400px，操作和关闭均 opacity=.72 | `browser/light-iab.jpg`、`browser/dark-iab.jpg` |
| 控制台 | 实看页 warn/error 为空 | `browser/iab-console.json` |
| 来源治理 | 精确 Toast 授权、1文档+2共享文件后继、原JSON和旧Gate保留，篡改拒绝测试通过 | `source-bindings.json`、治理单测 |

修改前的文字按钮、顶部位置/队列断言以及精确授权均记录真实失败：`unit-red.log`、`browser-red.log`、`queue-red.log`、`governance-red.log`。

第一次绿色浏览器检查发现键盘测试使用程序聚焦却期待 focus-visible；最终改为真实 F6、Tab、Enter。同时发现下述已有计时限制，最终通过用例不宣称覆盖该失败组合。没有删除旧失败日志或改写前批绑定/颜色清单。

## 已有计时限制

Base UI 1.8.0 的 ToastViewport 在“悬停 → F6 聚焦 → 鼠标移出”路径可能恢复计时，仍聚焦的通知随后消失。实际失败保留在 `browser-green.log`。安装源码 `packages/ui/node_modules/@base-ui/react/toast/viewport/ToastViewport.mjs` 的 `flushMouseLeave` 只检查 window focus，不检查 Toast focused，因而调用 resumeTimers；这一逻辑在本轮前后未变化。未修改 node_modules、添加补丁依赖或独立定时引擎。

正常“鼠标先移出 → F6 聚焦”暂停超过4秒与关闭已验证；它不关闭混合输入路径限制。该限制另留待处理，不能以此次3场景通过推定所有计时/辅助技术组合通过。

## 状态与边界

实现 completed，自动检查 passed-scoped，视觉自查 passed，用户实际视觉 awaiting-user-review。未执行 Safari/VoiceOver/完整对比度或整库验证；前批整库图表配置/阶段问题未作为本轮重新验证结果。

旧右下位置由本次用户明确默认修正替代；此前 G2/G3 Gate 保留为历史来源，不自动授予本轮 Gate。源图与真实浅/深、窄屏已共同查看，五类视觉检查见根 `design-qa.md`。

发布、迁移、Figma 写入、Git commit/push/PR 未执行。分支/HEAD及修改前副本见 `baseline.json`；当前来源、记录与范围格式检查见 `final-file-check.json`。
