# G2 操作分组与反馈

入口：`http://127.0.0.1:5372/#token-first-g2`

这是 Prototype Mode 的 `local-experiment`，不是公共 Registry 资产。页面消费五个本地适配入口：

- `button-group.tsx`：Button Group / Text / Separator，负责命令分组、边界合并和方向；
- `toggle.tsx`：独立 pressed 状态，沿用 Base UI Toggle 的键盘与 aria；
- `toggle-group.tsx`：单选与多选，沿用 Base UI Toggle Group 的 roving focus；
- `loading.tsx`：Spinner 复用 Rain `icon/button-loading`，Skeleton 默认装饰性隐藏；
- `toast.tsx`：Toast Provider / Parts / manager / queue，沿用 Base UI 的计时、暂停、F6 聚焦和关闭。

上游源码、Nova 样式、MIT 许可证和 SHA256 位于 `evidence/runtime/token-first-v12-g2/source-lock.json` 与 `upstream/`。改动只把上游视觉值换成 Rain 语义 Token，复用已有 Button、IconButton、Separator、Popup 主题桥和静态图标；没有新增运行依赖。

页面提供默认与紧凑密度、双主题、按钮组、独立 Toggle、单选/多选 Toggle Group、加载完成替换、成功/说明/失败 Toast。行为验证见 `tests/e2e/token-first-g2.spec.ts` 与 `adapters.test.tsx`；当前批次仍需用户视觉 Human Gate 和独立复核。
