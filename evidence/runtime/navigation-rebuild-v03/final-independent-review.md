# v0.3 最终源码与运行画面复核

2026-09-23；真实工作树 `/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`；既有服务 `http://127.0.0.1:4174`。本轮只读实现和 canonical 文件，写入本记录及五张补充截图；未重跑全套测试、未停止服务。

## 发现

在下述范围内**未发现新增 P0/P1**：导航不可达、课程/班级编辑范围混淆、原全局导航丢失、返回丢失本地上下文、A 修改污染 B 或公共默认变化。这个结论仅覆盖实际读取、观看和点查的状态。

| 检查 | 源码与运行证据 | 结论 |
| --- | --- | --- |
| 全局和当前范围导航 | `rebuild/model.ts`、`parts.tsx`、`top-navigation.tsx`、`page.tsx`；`C01-focus-1440.png`、`S01-focus-1440.png` | 入口用真实 hash 目的地；父级链接与展开按钮分开；平台/课程 current 的解释明确。两张整页中入口可辨，未见内容覆盖导航 |
| 课程范围与编辑返回 | `rebuild/course.tsx`；实际从 C01 的 `class-0001` 搜索“本班”进入新增单元，填写临时草稿，再返回、重进 | 编辑页只留下原顶部全局导航；课程侧栏和班级条退出；班级范围、搜索词和本地草稿恢复。新增单元与资源包提示明确，继承单元按源码只读 |
| 实验室四视口 | `rebuild/lab.tsx`、`lab.css`；观看 `lab-1200x800.png`、`lab-1440x900.png`、`lab-1920x1080.png`、`lab-1200x650.png` | 范围栏和主区对齐；选择状态、详情和预约动作归属清楚。650 高度的按钮在详情滚动区内，额外实际点击成功，并读到“已预约”反馈 |
| A/B 外观和 Popup | `page.tsx` 的 `IsolationPage`、`lab.tsx`；观看原三张 isolation 图并新增分实例截图 | 仅切 A 的面层和密度后，A 图像改变；B 前后 PNG 字节 SHA-256 完全相同。实际打开 A/B Popup，分别为 dark/compact 与 light/default |
| 公共默认和旧 G3 | 将 `protected-before.json` 的 **2072** 条文件 SHA-256 与当前文件逐一重新比较 | `missing=[]`、`changed=[]`。工作区仍有大量旧 dirty/untracked 内容，不能把它误报为本轮修改公共默认 |

本轮有限交互点查与截图是单独 Chromium 页面，未消费或干扰正在运行的最终 61 项浏览器测试；没有将该运行尚未返回的结果写成已通过。

## 已观看图片

以下路径都在本目录，已核对文件存在并实际打开图片：

- `C01-focus-1440.png`、`S01-focus-1440.png`。
- `lab-1200x800.png`、`lab-1440x900.png`、`lab-1920x1080.png`、`lab-1200x650.png`。
- `isolation-before.png`、`isolation-after.png`、`isolation-a-popup.png`。这些整屏图不能单独证明 B 的完整前后外观，因此补拍下一组。
- 新增 `final-review-a-before.png`、`final-review-a-after.png`：实际 A region locator 截图，显示 light/default → dark/compact。
- 新增 `final-review-b-before.png`、`final-review-b-after.png`：实际 B region locator 截图，B 两图 SHA-256 均为 `dee52fc660371697842043239ed3ab64e6828fe58d950d80cbebf4ff05bfe8df`。
- 未找到先前以 editor 命名的现成截图，因此新增并观看 `final-review-editor.png`：C01 本班新增单元编辑，原全局顶部导航、返回路径、范围说明与本地草稿同时可见。

## 当前源快照

源码根：`apps/prototype/src/scenarios/token-first-g3/rebuild/`。读取 `model.ts`、`page.tsx`、`parts.tsx`、`top-navigation.tsx`、`course.tsx`，并复核本轮先前实现的 `lab.tsx/lab.css`；相关样式来源 `rebuild.css/course.css` 已核对。

| 文件 | SHA-256 |
| --- | --- |
| `page.tsx` | `83a55603ac15baf456b17a901ccb5e3ef83ec4466b575ff500f82c386f559ae2` |
| `course.tsx` | `f805c6540267520ae4959e1c6cc5e112b074bdd00a6a4e49664b52df8b8439d0` |
| `parts.tsx` | `7475e6f2b9f928739821070a8be1ed19d977abfa3738533a58a972d8dd6c824d` |
| `lab.tsx` | `5e7175ae4ff7310d41c20d2ad3bd78b185abacd9dbc623b78021d46336c2c6ce` |
| `lab.css` | `1e1e9a32ecb332900dd91a37314abf5177dc9209eeb06afbad9305fc533ee2a9` |

## 限制

- 复核者参与过 E12 实现，因此课程/导航检查是另一次源码和运行复核；E12 部分属于作者复核，**不能标为全量独立于作者的审核**。
- 没有完成全量辅助技术、完整对比度、所有键盘路径或移动端视觉审核；M01/M02 的命令细节未在本次复核中重审。自动断言和截图均不替代人类视觉验收。
- 650px 的 A/B locator 图显示固定实例窗口，内部仍有可滚动内容；B 图像相同只证明本次面层/密度操作的可见区域没有改变，Popup 隔离另由实际面层/密度读数支持。
- 本地预约与编辑草稿不做生产持久化；编辑页已显式提示刷新清空。此行为不推导发布、迁移或生产保存已完成。
- 设计状态仍为 `pending-review`，本记录没有授予 Human Gate、公共 API 或发布批准。
