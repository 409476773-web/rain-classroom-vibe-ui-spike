# G4 图库运行验证实施计划

> 执行方式：使用 executing-plans 分批推进，当前会话继续实施与验证。

状态：首版本地实验已完成，4项浏览器检查、类型检查与独立构建通过。运行入口与适配限制见[验证记录](../../evidence/runtime/chart-library-validation/verification.md)；视觉效果待用户评阅。

**目标：** 用可运行的 Plots／G2 样本验证 Bklit 现代表现与 Rain 配色配方的适配，记录原生能力、实际定制和未解决项。

**架构：** Prototype Mode / local-experiment。复用 card-v2 工作树，建立独立 HTML 入口与页面私有文件；常规统计样本使用 Plots，矩阵与关系使用同版本 G2。既有报告与导航入口保持原实现。

**技术：** React 19、TypeScript、Vite、Rain Foundations／UI、@ant-design/plots 2.6.8、@antv/g2 5.4.8；版本已在安装前核对官方包登记。

**授权：** 用户在确认方案 v0.3 后明确“确定。开始验证”。范围包含独立运行样本和必要的局部依赖；不包含公共组件、全局 Token、Figma、发布、业务迁移或 Git 提交。

## 1. 建立可重复的检查与依赖记录

- 保存现有 prototype package、锁文件、阶段状态及受保护源码哈希。
- 先建立浏览器验证，确认独立入口尚未实现时检查失败。
- 仅向 prototype 安装两个锁定版本，检查锁文件变更与 G2 实际版本一致性。
- 建立最小页面私有的 G2 生命周期承载；不建立通用 Chart API 或跨引擎层。

## 2. 三个代表样本

- 趋势／面积：Plots Area、独立描边与渐变面、端点、迷你图、零与缺测。
- 分组柱：Plots Column、圆角与渐变、不同系列、短柱／零／负值。
- 组合：Plots DualAxes 或 G2 标记组合，柱／线／面积、双轴、共享读数与范围控制。
- 页面提供实色／渐变、配色与样本更新，并为触摸／键盘提供等价读数。

## 3. 延伸与证据

- 6×6／12×12 数字热力、气泡矩阵；连续色阶、面积映射及缺测。
- 桑基与节点网络；路径聚焦、节点径向材质与边类型。
- 覆盖默认、悬停／聚焦、选中、数据更新、窄容器与 reduced-motion；记录实际画面与控制台。
- 区分原生配置、页面定制及仍未验证的 Bklit 曲线、边缘遮罩、弹簧跟随和连续轴域动效。

## 修改范围与命令

- 创建：`apps/prototype/chart-validation.html`、`apps/prototype/vite.chart-validation.config.ts`、`apps/prototype/src/scenarios/chart-validation/**`。
- 创建：`tests/e2e/chart-library-validation.config.ts`、`tests/e2e/chart-library-validation.spec.ts`、`evidence/runtime/chart-library-validation/**`。
- 修改：prototype package、pnpm-lock、本任务两份方案；阶段文件仅新增局部授权／验证记录。
- 基线：`pnpm --filter @rain-next/prototype typecheck`，本轮修改前已通过。
- 运行：`pnpm --filter @rain-next/prototype exec vite --host 127.0.0.1 --port 5387 --strictPort`。
- 类型与构建：`pnpm --filter @rain-next/prototype typecheck`；独立配置构建。
- 行为：`pnpm exec playwright test --config tests/e2e/chart-library-validation.config.ts`。
- 收尾：核对受保护哈希、实际依赖、源码差异、截图与验证记录。

## 尚未验证的假设

渐变与圆角是否保留参考细节；双轴／提示／选择是否一致；G2 Canvas 下网络径向材质和方向边是否可读；密集矩阵在窄屏的读数方式；Bklit 精细动效能否以合理成本适配。自动化与截图只作为本轮证据，视觉验收等待用户检查。
