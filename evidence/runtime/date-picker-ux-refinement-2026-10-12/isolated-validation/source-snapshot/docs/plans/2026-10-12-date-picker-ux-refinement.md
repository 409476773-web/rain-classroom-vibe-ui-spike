# DatePicker 交互与布局修复 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 落地用户确认的截止时刻、日期范围、日期时间范围三种面板，修复前轮发现的交互问题并验证窄屏和键盘。

**Architecture:** 沿用 DatePicker 的提交/草稿模型、Calendar、Popover/Sheet 和日期校验。用 FormItem inside、Input、IconButton、Button 组合字段；单一 HH:mm 入口，显式日历端点操作，时长为折叠的次要路径。

**Tech Stack:** 现有 React/TypeScript、Rain Tokens、Base UI、react-day-picker、Vitest；无新增依赖。

---

- 授权：2026-10-12 用户“可以，按这版方案落地到组件库，复用现有组件和样式，把前面发现的交互问题一起修掉，再检查窄屏和键盘操作。”
- 模式：System Mode；既有 registry-candidate、managed UI 后继修复。设计认可仅到已展示的方案；本轮实现仍待用户验收。
- 设计来源：`evidence/runtime/date-time-ux-review-2026-10-12/README.md` 与本轮已确认三种交互预览。
- 方法：V04 降低重复文字；V05 联动内容、状态与行为；D01 以设置时间为主路径；D02 两个起止行和主次分区；D05 窄屏单月/输入可读/焦点留白。
- 不变项：公开 Date/DateRange 与约束接口、确认才提交、取消/外点/Escape丢弃草稿、IME与禁用/只读/越界防护、Rain Classic与旧证据。
- 未验证假设：真实组件尺寸仍需浏览器校验；本机键盘检查不代表读屏或真实触屏设备验收。

### Task 1: 回归测试与既有源码基线

- 读取共享组件所有调用者、tests、manifest、registry 与治理约束。
- 在新证据目录保留本轮前的文件基线，不改旧证据。
- 编写并运行失败用例：输入焦点不锁定区间选择、单次显式端点编辑、错误只显示一次、时长折叠、完整清空、分钟限制按分钟计算。

### Task 2: 共享面板和单一时间输入

- 修改 `packages/ui/src/date-picker/date-picker.tsx`、`date-picker.css`、`date-picker-time-field.tsx`。
- 日期范围：默认两次点击；显式日历按钮编辑一个端点后退出。日期时间范围：两行日期+时间，显式按钮切换端点，一月。
- 复用 FormItem 内置标题和 Input trailingAction；清空用 regular 图标文字按钮，移除原始日期、时间与时长草稿。
- 只显示一次真实错误；正常选择过程用字段状态和辅助技术提示，不增加可见提示行。
- 时长默认折叠；原因不在每个预设下重复；保留一次计算、校验及恢复。
- 内容滚动区保留至少4px焦点空间；不移除焦点指示。
- 更新相关单元测试并运行绿色验证。

### Task 3: 场景与消费合同

- 修改 `apps/playground/src/docs/components/date-time-examples.tsx` 及测试：考试窗口和作答时长独立；演示数据切换移出时间面板。
- 同步 `manifests/ui/date-picker.yaml`、Registry 依赖、README/当前后继治理证据。
- 保持公开 API 与既有来源追踪；状态不推导发布或生产采用。

### Task 4: 浏览器与交付

- 运行相关日期组件单元、类型和构建检查，既有日期回归与独立源码消费检查。
- 独立浏览器页检查320/390/桌面、Popover/Sheet、浅/深色必要状态；复核输入和日历焦点halo、时长展开、操作区可达。
- 键盘完整路径：打开、Tab/Shift+Tab、端点切换、日历箭头、输入Enter、嵌套年月Escape、取消/确定/Escape恢复。
- 保存真实截图和当前源码绑定，独立审查后交付；读屏/真机另记未验证。
