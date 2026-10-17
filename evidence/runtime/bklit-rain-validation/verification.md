# Bklit × Rain 四样本验证

日期：2026-10-07。用户“开始实施”授权后的本地实验；四组对照已实现，视觉验收待用户审阅。

后续修订：[反馈01：纵轴间距与浅色标注](feedback-01/verification.md)。本文件其余部分保留首轮实现与检查快照；最新局部变化和截图以反馈记录为准。

入口：<http://127.0.0.1:5387/bklit-validation.html>。工作区为 `.worktrees/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。

## 实现范围

| 样本 | 原生能力与 Rain 适配 | 当前验证结果 |
| --- | --- | --- |
| 趋势／面积 | 原生曲线、描边、渐变、入场、定位与提示；Rain 蓝紫系列和填充透明度 | 两列同一点读数一致，更新路径与指标改变；原实例保留 |
| 柱＋线＋面积 | 原生组合与共享日期读取；人数左轴、完成率右轴；Rain 双色柱渐变 | 三系列数值、单位、色标及双轴对应；多色配方切换生效 |
| 桑基 | 原生布局、节点／路径聚焦与来源到目标渐变 | 节点悬停精确读取400人次；两列渐变引用互不串色 |
| 96×40迷你趋势 | 原生 AreaChart 在小尺寸运行，精简坐标；Rain 轻面积与关键数值字体 | 实测96×40，悬停提示可读；两列指标更新一致 |

所有数据为本地构造的2026年9月示例数据。两列共享数据、图表尺寸和更新操作。页面提供蓝紫近邻、多色类别、蓝紫青实色三种候选配方，尚未登记公共 Token。

Rain UI字体使用现有 `--rain-font-ui`；迷你指标数字使用 `--rain-font-data`。文字、网格、背景和提示颜色映射现有 Rain Token。图形配方采用 v0.6 的 P01／P03／P04／P07参考，曲线形状、入场时长、跟随弹簧与提示结构沿用上游。

## 源码与差异

- 上游：[bklit/bklit-ui](https://github.com/bklit/bklit-ui/tree/5d699897b2dde26374cf15501dbaadbc52cea982)，固定 commit `5d699897b2dde26374cf15501dbaadbc52cea982`。2026-10-07从官方仓库取得 `packages/ui/src` 内四样本所需的74个源文件，未复制 Studio 应用。
- 源码放在页面私有 `vendor` 目录；[source-lock.json](../../../apps/prototype/src/scenarios/bklit-validation/vendor/source-lock.json) 记录每个文件的上游／本地 SHA-256；[MIT LICENSE](../../../apps/prototype/src/scenarios/bklit-validation/vendor/LICENSE) 保留版权声明。
- 常规改动仅将上游 `@/` 引用改为相对路径。唯一组件行为修正为 `sankey-link.tsx` 使用 React `useId` 隔离渐变 ID，解决两张桑基同页时的重复 ID；路径、颜色计算和动画保留。测试先检出40个ID只有32个唯一值，修正后全部唯一。
- 依赖只添加到 prototype及原锁文件；Motion `12.27.0`，Visx `4.0.1-alpha.0`，d3及类型版本见 prototype/package.json。没有全局 shadcn 初始化、共享图表封装或统一双库接口。
- 独立 HTML 和构建配置隔离原生 Tailwind 样式；公共 Rain Token、组件和 G2 实验源码未由本任务修改。

## 实测

| 检查 | 命令／证据 | 结果 |
| --- | --- | --- |
| Bklit 浏览器测试 | `pnpm exec playwright test --config tests/e2e/bklit-rain-validation.config.ts`；[日志](playwright.log) | 6通过，exit 0 |
| 原 G2 回归 | `RAIN_CHART_EVIDENCE_DIR=evidence/runtime/bklit-rain-validation/g2-regression pnpm exec playwright test --config tests/e2e/chart-library-validation.config.ts --output evidence/runtime/bklit-rain-validation/g2-test-results`；[日志](g2-regression.log) | 4通过，exit 0；截图写入本轮独立目录 |
| TypeScript | `pnpm --filter @rain-next/prototype typecheck`；[日志](typecheck.log) | exit 0 |
| 独立构建 | `pnpm --filter @rain-next/prototype exec vite build --config vite.bklit-validation.config.ts`；[日志](build.log) | exit 0；保留大chunk提示 |
| 来源与保护 | [preservation-final.json](preservation-final.json) | 74文件上游／本地哈希一致；13项基线中仅prototype依赖清单与锁文件变化 |

浏览器测试覆盖真实SVG、控制台错误、两列精确读取、数据更新时实例保留、主题切换、组合提示、桑基聚焦、迷你提示、键盘展开数据表、渐变隔离、390px窄屏和系统减少动效状态。

重播实测剪裁宽度从0逐渐展开至526px，中间记录114.30px，见[motion-facts.json](motion-facts.json)。实现使用原生 `revealSignature`，未重写动画。自动检查曾将含 `px` 的宽度直接转数字而误报，最终以 `parseFloat` 正确读取。

已查看[桌面对照](desktop.png)、[组合悬停](composed-hover.png)、[桑基聚焦](sankey-hover.png)、[迷你提示](mini-hover.png)和[窄屏减少动效](narrow-reduced.png)。内置浏览器实际点击更新，两列关键指标同时从378变为427。

## 实际限制与后续边界

- 原生列使用官网中性色主题和 Geist 字体声明；未打包 Geist 字体，缺失时回退。Rain 数据字体同样依赖本机字体可用性，因此本轮不是字体像素级一致性验收。
- 轴与日期浮标仍保留上游英文日期；中文提示正文和表格已由原生配置提供。桑基通过 `showValueLabels={false}` 关闭上游固定英文单位的行，精确值保留在提示及数据表中。
- 减少动效时已关闭主入场／系列动画与面积Y域补间，并使用原生 MotionConfig；部分上游指示器仍直接使用弹簧，不据此声称所有细节静止或无障碍验收通过。键盘可读数据表，但没有宣布悬停交互具备完整键盘等效操作。
- Visx为上游采用的alpha版本；本次React19渲染与构建已通过，升级兼容性和生产依赖策略另行评估。构建JS约1.19MB、gzip约372KB，复用现有UI入口还会输出未在本页显示的静态资源；没有进行发布体积优化。
- 点击固定读数、图例点击隐藏、读取位置保留、通用矩阵与关系网络继续列为独立验证项。此次仅四样本，不等于完整目录接入或公共图表库交付。
- 没有Figma写入、发布、业务迁移或Git提交；旧G2页面与历史运行证据保留。下一步是审阅当前实际动效和Rain配方，再确定目录接入范围。
