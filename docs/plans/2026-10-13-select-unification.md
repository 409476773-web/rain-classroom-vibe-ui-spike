# Rain Select 统一展开面板实施记录

**Goal:** 按用户“所有目标浏览器里，展开后都要保持同样的雨课堂视觉”以及“直接落实最小范围的修改”的授权，将原生选择的业务示例与目录入口合并到现有 Select。

**Architecture:** 复用已有 Rain Select 和 Base UI 1.8.0 的面板、键盘、表单输入与验证机制。保留 NativeSelect 公共 API 兼容旧调用，但不再作为新业务示例或独立目录入口；旧 `#native-select` 链接打开 Select 页面。不创建第三个选择组件，不修改 Token、全局视觉或现有浮层控制器。

**Tech Stack:** React / TypeScript / Base UI / Rain Tokens / Vitest / Playwright。

## 范围与设计依据

- 工作模式：System Mode，现有候选的最小增量，不授予新的系统或生产验收。
- V05：外观、行为和表单能力一起迁移，不能只替换触发框而丢失提交与必填约束。
- D05：检查窄屏、浅深主题、禁用与键盘状态；沿现有 Select 的布局和 Token。
- Select 增加 `name` / `form` 透传；有 `name` 时接通底层 `required`。未命名字段继续由宿主校验，避免改变现有调用合同。
- 将原来的任务类型表单搬入 Select 页，保留分组、禁用项、FormData 提交、空值必填与结果反馈；作业发布设置的任务类型也复用 Select。
- 同步目录、路由、G5 说明、Select / NativeSelect 合同及独立消费示例。保留旧源码与导出，不修改冻结历史证据。
- 本轮浏览器检查采用可用的 Chromium、Firefox、WebKit；实际 Safari / iOS、读屏及字体栅格的像素等同不由引擎检查推导。

## 执行步骤

1. 保存限定文件修改前快照，补表单取值、必填、清空、禁用和旧路由回归用例；先确认失败。
2. 以最少共享代码接通 Base UI 已有表单能力；合并示例与路由，更新消费说明。
3. 运行 Select、NativeSelect 与相关页面测试、类型检查和 Playground 构建；用三个浏览器引擎检查真实展开与表单行为，保存截图和结果。
4. 生成检索索引并复核相对快照的差异，记录当前结果、未验证项及用户视觉检查入口。

## 状态

实施、自动检查和人工视觉验收分别记录在 `evidence/runtime/select-unification-2026-10-13/verification.md`。未获授权的 Git 提交、发布、Figma 写入和业务迁移不执行。
