# Tabs runtime verification

日期：2026-09-11（Asia/Shanghai）。范围：TB-00～TB-09，当前工作区的 `registry-candidate`。技术实现 **completed**，完整自动验证 **passed**，独立审阅 **passed**。Human Gate `not-evaluated`，contrast acceptance `not-granted`，Registry `not-published`。

## 实现与专项证据

- 公共 `Tabs` / `Tabs.Root` / `Tabs.Nav` / `Tabs.Panels`；Line / Contained / Soft × 28 / 32 / 38 × 四向，36 合法配方。More、Scroll、受控/非受控、manual/automatic、动态项目与三种面板挂载政策使用同一身份模型。
- 正式路由 `/#tabs` 展示课程分区、完整外观选择、局部面板、纵向设置和具名 Local Recipe；“交互与状态检查”展开后提供自动化的实际组件实例。
- 技术小样已在正式用例通过后退役，保留 [预验证](preflight.md) 和 [实施前基线](source-baseline.json)。没有更改 Classic、安装新依赖、发布、Figma 或 Git 操作。
- 修复独立审阅指出的 CSS 缩放宽度二次放大、水平 stretch 指示线缺少 8px 内缩、CSS 等价选择器漏检；额外修复全文提示的旧浅色语义值，复用已有 Popup 主题表面。
- 修复后 30 项真实 Chromium 行为检查通过（`pnpm exec playwright test tests/e2e/tabs.spec.ts --project=chromium --grep-invert '72 complete'`，1.1m）。4 文件 / 30 项 Tabs 结构、分配算法、颜色与治理检查通过（2.02s）。随后新增 More 实际颜色检查（两主题普通/Focus 的 N3）及绘制路由治理检查均通过；最终全仓命令再次覆盖 Tabs 全部 32 项浏览器测试，结果 **32/32**。

## 浏览器矩阵与颜色口径

[browser-facts.json](browser-facts.json) 保存 72 组（两主题 × 三外观 × 三尺寸 × 四向）× 十二态的真实计算样式、几何、祖先表面、交互状态与 Token 身份。普通、Hover、Pressed、Selected、Focus、Focus+Hover、Focus+Pressed、Selected+Hover、Selected+Pressed、Selected+Focus、Disabled、Selected+Disabled 均由实际 React 属性与浏览器输入触发，记录后确认状态。最终全仓执行的完整矩阵 **864/864** 通过（5.8m），水平 stretch 按两侧各 8px 检查；数据、18 张导航截图及[浅色/深色对照图](contact-sheet.png)于 **2026-09-11 01:56:19 +08:00** 刷新。

启用态 Label / Count 门槛为 **4.5**，实际 Icon 与必要 Line 标记为 **3.0**。修复后完整矩阵最低值分别为 **5.180798 / 3.383291 / 3.377446**。颜色按真实 CSS 前景、Alpha 绘制层与可见祖先底面合成，不称为像素取样。几何按 CSS 像素精确比较；颜色通道仅容许 Chromium 输出的序列化舍入。

Soft 普通/Focus 的 Text/Neutral/4 仅对本次 Label/Count、Background/Neutral/1 底面成立，见 [限定用途裁决](soft-text-eligibility.md)。未修改全局弱中性色规则，未降低 4.5。

[color-findings.json](color-findings.json) 保留 **108 条** Soft 辅助浅边低于必要边界 3.0 的记录。普通选中边 Light 对填充/外底面为 **1.436 / 1.614**，Dark 为 **1.296 / 1.412**。它们仍是辅助装饰，不是必要边界或对比度例外；当前项还通过文字颜色、600 字重和选中填充表达，Forced Colors 另有 2px 系统色边界。实际视觉可识别性由后续 Human Gate 判定，不能从这些数字推导整组件 WCAG 或可读性通过。

## 其他实际检查及限制

More 的完整原序键盘、连续显露、开菜单冻结、动态删除、受控拒绝/延迟、不抢外部焦点、隐藏期间名称/数量更新、同身份内容保留、真实图标及数量 0、嵌套实例、长名称全文、较高独立操作、默认与 content 指示线、四向对齐均有浏览器断言。

- `hasTouch: true` 的 Chromium coarse-pointer 环境验证全部 36 配方：视觉 H/字体不变、有效操作区 44px、不重叠，并实际点击视觉盒外扩展区域。它不等于真实触屏设备验收。
- `forcedColors: active` 与 `reducedMotion: reduce` 检查三外观四向的选择标记和共享 Focus 独立可见、滚动边缘不裁切；未新增面板过渡动画。
- 360px 视口验证页面无横向溢出、独立操作另起一行且不进入 More。200% 使用 Chromium **CSS `zoom=2`**，验证尺寸、键盘、导航不溢出以及与独立操作不重叠；不是操作系统或浏览器 UI 的原生缩放验收。
- 矩阵等待真实 `document.fonts.ready`；隐藏更新另触发合成的 `loadingdone` 检查重测。CDP 读取实际 Count 字形使用 `PingFang SC / PingFangSC-Regular`，见 [补充事实](supplemental-facts.json)。局部 Dark 全文 Portal 的真实文字/表面为 Text/Neutral/3 与 Background/Neutral/1。
- 当前只运行已配置的 Chromium。Safari / Firefox、真实屏幕阅读器、真实触屏与原生浏览器缩放仍未执行。保留 DOM 不代表停止隐藏媒体/请求、离页持久化或自动保存。

## 最终全仓验证

最终运行使用 `VITEST_MAX_WORKERS=2 pnpm verify`，仅限制本次单元测试并发；不跳过用例、不修改超时或仓库配置。命令于 **2026-09-11 01:56 +08:00** 完成，**退出 0**：治理、图标、类型、构建均通过，**85 文件 / 1256 项单元测试**通过（98.53s），**211 项 Chromium 测试**通过（7.7m），包含现有 Dropdown / Input / Select / Tag / Focus 回归。浏览器报告中的两条 Radix 红色标记是既有 `test.fail` 登记的预期合同差异，最终计入符合预期的 211 项，不是新增回归或被忽略的失败。稳定 [源文件 hash](source-hashes.json)记录最终 44 项源文件与治理文件。

此前完整尝试如实保留为失败：缺少尚未生成的审阅产物；联系表 HTML 被严格源码清单拒绝（最终只保留 PNG）；CSS 选择器列表解析误纳其他组件（修正解析，未放宽指纹）；旧总览与历史夹具/扫描路径断言未更新；局部变量名被 Tailwind 扫成 `fixed` utility（改名，不新增许可）。首次高并发全套还触发既有 FIFO 检查的 1s 子进程时限；保留原时限，以两 worker 重跑相关两文件 **185/185** 通过（92.43s）。随后一轮全仓单元 1256/1256 通过、浏览器 210/211 通过，唯一失败是总览浏览器仍按五家族断言；已同步为六家族并检查 Tabs 链接，定向复跑通过（3.6s）。这些修复已由上述最终完整命令全部重新验证。

Token 主扫描接入实际绘制路由后，相关 5 文件 / **444 项** 治理回归再次通过（93.52s），单独 `pnpm verify:tokens` 也通过；未增加 N4 资格或其他文件许可。

最终技术状态写回 phase / Manifest 后，于 **2026-09-11 01:59 +08:00** 再执行 `pnpm verify:governance`，退出 0；`pnpm exec vitest run scripts/tabs-governance.test.ts --maxWorkers=2` **10/10** 通过（975ms）。44 项源文件 hash 全部读回一致。此次仅同步文档和技术状态，组件源、样式和浏览器测试保持上述完整验证时的内容。

实际预览：`pnpm --filter @rain-next/playground exec vite --host 127.0.0.1 --port 5181 --strictPort`，页面 `http://127.0.0.1:5181/#tabs`。测试仍使用独立的 4173，不共享用户交互状态。

独立审阅见 [independent-review.md](independent-review.md)。下一步是依据实际运行页面与截图进行 Tabs 运行视觉 Human Gate；当前候选登记不代表发布授权。
