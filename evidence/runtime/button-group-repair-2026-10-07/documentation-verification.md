# Button Group 独立示例修复

日期：2026-10-07。来源：用户授权“继续修复”，Root 指定的 Button Group 文档页子任务。

模式：文档局部示例修复。只改 `apps/playground/src/docs/components/button-group-page.tsx` 及同目录 `button-group-page.test.tsx`；未修改组件、共用文档壳、CSS、Token 或资产身份。既有主题 / 密度预览控件保留。

应用 D02：将横向基准、显式分隔线、竖向、文字与保存按组合关系拆为四个独立 DocExample，各自的代码和操作反馈就近出现。应用 V05：保留既有 Parts、尺寸和独立 Tab 顺序，使用示例本地 `canRedo` 表示撤销 / 重做能力，不新增公共 API 或通用状态架构。本轮没有足以改写全局方法的新增经验。

## 实际改动

- 基准组 `aria-label="编辑操作"` 直接连接按钮，无额外 Separator。
- 显式分隔线组 `aria-label="带分隔线的编辑操作"` 独立演示既有 Separator。
- 竖向组 `aria-label="章节操作"`，Separator 为 `horizontal`；移动反馈不再覆盖横向组状态。
- 文字组 `aria-label="提交操作"`，展示 ButtonGroupText 与保存，提供完整对应代码。
- 每个示例具有具名 `role="status"`；两个横向组的状态互不影响，可以撤销 → 重做 → 撤销 → 恢复 → 再次撤销。代码包含 imports、本地状态、回调和可见组合；文档说明同组按钮采用同尺寸，每个可用按钮仍独立进入 Tab 顺序。

## 实际验证

| 检查 | 结果 | 输出 |
| --- | --- | --- |
| 初始定向 Vitest | 4 失败，按预期复现上移覆盖撤销反馈、重做仍禁用、基准多余分隔线、独立组合缺失 | documentation-test-red.log |
| 增加反馈可访问名称后的红灯 | 4 失败；实现尚未修改 | documentation-test-labeled-red.log |
| 修复后定向 Vitest | 4 通过，exit 0 | documentation-test-green.log |
| 测试索引的严格类型修正后定向 Vitest | 4 通过，exit 0 | documentation-test-green-final.log |
| Playground typecheck | 通过，exit 0 | documentation-typecheck.log |
| tests TypeScript project | 通过，exit 0 | documentation-tests-typecheck.log |

首次两个类型检查发现本测试中的数组索引可能为 undefined，改为从具名示例获取元素；初始失败输出保留在 `documentation-typecheck-initial.log`、`documentation-tests-typecheck-initial.log`，最终检查已通过。

本子任务未运行浏览器检查；实际外观、默认 / 紧凑密度、键盘 Tab 和窄屏由 Root 的本轮真实浏览器验证记录补充。通过以上检查不代表新的 Human Gate、发布或业务迁移。

## 本子任务最终源码 SHA-256

| 文件 | SHA-256 |
| --- | --- |
| button-group-page.tsx | 8669d6da29decdc8ed08f71fc4e7fe3c515f739481e74301ae6635aa9bb61c04 |
| button-group-page.test.tsx | b6bee4bcf4437a81ad1c75659d42f2dd6488f8279da61f79cb4df1293326b96b |
