# Day 2 字体环境说明

检查日期：2026-09-01

## 合同声明

- UI / Reading 目标字体：`PingFang SC`，声明系统回退链。
- Data 目标字体：CSS family 为 `LINE Seed JP App_OTF`、`font-weight: 700`，对应 Bold face；仅用于关键数据数值及紧邻的西文符号。
- 中文单位仍使用 UI 字体；运行夹具将 `98.6` 与“分”拆为不同 DOM 节点。

## 文件存在与授权

- 仓库字体文件：0。未纳入 `.ttf`、`.ttc`、`.otf`、`.woff` 或 `.woff2`。
- 本机文件存在：用户字体目录存在 `LINESeedJP_A_OTF_Bd.otf`；文件内部 family 为 `LINE Seed JP App_OTF`，face/fullname 为 Bold。
- 字体分发授权：本任务未完成可分发授权复核，因此没有复制、转换、提交、打包或发布字体文件。
- macOS 字体环境：PingFang 家族可用；LINE Seed 文件存在于用户字体目录。文件存在、授权、CSS family 声明与浏览器实际命中分开记录。

## 浏览器运行探针

默认 Chromium E2E 只强制可移植合同：首选 family 为 `LINE Seed JP App_OTF`、computed weight 为 700、回退链为 `SF Pro Rounded / ui-rounded / sans-serif`，且 Value / Unit 为不同节点。它记录 `target-hit` 或 `fallback-hit`，不要求 CI 必须安装本机字体。本轮没有在缺少 LINE Seed 的独立机器上运行。

严格证据模式由 `RAIN_REQUIRE_LINE_SEED=1` 或 `RAIN_UPDATE_DAY_2_EVIDENCE=1` 启用。Chromium 的 `document.fonts.check()` 可能由回退字形满足，不能单独证明目标字体实际命中；因此证据模式同时要求 `700 48px` font check 和 Canvas distinct metrics，且目标/回退两侧均使用同一 700 字重：

- `PingFang SC`：与回退字体产生不同度量，结合系统字体清单，表明当前机器存在并可用于浏览器渲染。
- `LINE Seed JP App_OTF` + `font-weight: 700`：computed family 为目标 family；当前机器的严格证据模式记录为 `target-hit`，`document.fonts.check()` 为 `true`，且相对同为 700-weight 的回退字体探针产生不同度量。

结论：PingFang SC 与 LINE Seed Bold 的当前本机可用性均有运行证据；回退链仍保留。这只验证本机渲染，不代表仓库已包含字体，也不代表已完成分发授权复核或获得打包/发布授权。
