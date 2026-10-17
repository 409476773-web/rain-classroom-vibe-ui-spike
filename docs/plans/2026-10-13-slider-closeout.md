# Slider Governance Closeout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 保持已经确认的 Slider 视觉，恢复本轮治理来源链与负向校验，完成有限组件收口。

**Architecture:** 沿用既有 DatePicker 的独立有限后继验证。新 Slider closeout 先验证当前来源、冻结前态、既有验收和完整阶段，再只为明确拥有者／文件／旧哈希提供回溯；当前真实阶段与所有旧记录保留。测试使用完整当前闭包或明确的历史夹具，不混合两种阶段。

**Tech Stack:** 既有 Node 验证 helper、Vitest、Rain Manifest/Registry、源码消费验证。

---

## 授权与边界

2026-10-13 用户：“保持已经确认的视觉样式，继续解决 Slider 的治理校验问题，完成本轮组件收口。”按 System Mode 执行。此前视觉决定为“确定。完成视觉检验”，原接受记录和六份已接受呈现源码冻结。本轮不修改视觉、数值行为、依赖或公共 API，不放宽未知阶段、未知文件、旧 Gate、对比度或发布限制，不执行 Git 操作。

修改范围锁在本轮 [baseline](../../evidence/runtime/slider-closeout-2026-10-13/baseline.json) 的14个来源路径：验证 helper、共享夹具、相关治理测试、Slider Manifest、G5指南、阶段和本计划。六个呈现源码及17份原记录/拥有者证据保持字节。随后发现 Select 已授权确认续查更新资产索引；[补充 intake](../../evidence/runtime/slider-closeout-2026-10-13/supplemental-intake.json) 单独冻结一个必要调用者 `docs/ai/asset-index.md` 和三份原确认证明，原 baseline 保持字节。G5真实颜色检查随后暴露 DatePicker已存在的时长按钮本地配方未登记；必要回归 `g5-color-consumers.test.ts` 纳入第16个有限来源，其前态来自已冻结DatePicker原证明的 `after`，副本在编辑前保存。DatePicker呈现源码保持原字节，按事实补齐有限登记，不修改正确的CSS账本合并。

## Task 1：复现与失败回归

既有三份治理测试17项中11项失败，实时 G5 校验在 Select 旧阶段比较失败。增加 `scripts/slider-closeout.test.ts`，先验证新有限后继缺失；负例覆盖未知授权/阶段、旧Gate、额外路径、错误owner、第三哈希、伪造before/原证据，以及修改并重签已接受视觉源码。

## Task 2：精确后继

在 `scripts/verification-helpers.mjs` 添加不调用旧读者的 `getSliderCloseoutSourceBindings` 和纯授权判断；固定 baseline 哈希、有限路径、完整 current/before、原证据和已接受源码。阶段只允许新增 closeout 槽及原 Slider 的三个技术完成字段；Manifest 仅允许验证记录变化。

保留 S3 完整已授权记录和 owning-task 证据，仅在旧before不含该条目时对比较副本回溯；不改变其待人工/未发布状态。明确五处来源转换：Select 的 G5指南、Select/DatePickerVisual 的阶段、Slider 的颜色验证脚本、Select确认后的资产索引；其旧哈希由冻结拥有者记录支持，当前端由本次基线或补充 intake 支持。旧 reader 仅在后继通过后使用精确回溯，不重签任何原记录。

完整 G4 前链还暴露 S3 已授权更新的 `prototype-design.md`。固定[单文件观察](../../evidence/runtime/slider-closeout-2026-10-13/retained-source-observation.json) 保存原始前态、当前字节、两个 Starter 原锁、standalone检查与 owning-task 修改记录；仅为 G4 比较桥接这个文件的旧哈希，不增加文档写授权。第三哈希、篡改证明或重签观察均拒绝。

颜色登记的2项真实回归先失败后修复。复用既有 `prepareG5NativePaints` 的有限源码预处理：只有新收口证明验证后，DatePicker完整既有时长配方、相对工厂import和唯一tertiary/mini调用者才可登记三个Neutral Fill；来源从冻结DatePicker原前态读取，CSS账本合并不改。新颜色验证脚本固定SHA，任何额外未知脚本改动，即便重签本轮after仍拒绝；声明外新增palette仍拒绝。

## Task 3：夹具和阶段回溯

修复 `scripts/select-unification-test-fixture.ts` 完整复制 DatePicker及本轮后继闭包。当前 Slider/G5/Select 夹具使用完整当前链；DatePicker visual 历史夹具显式移除后继槽并保留历史证明。G4回溯只移除已验证的具体槽与S3观察。DatePicker“合法当前链永远失败”的旧测试改为有证明时通过、无证明或观察改动时拒绝。

## Task 4：检查与收口

依次运行新后继负例、六份关联治理测试、G4/日期/来源/颜色相关治理、G5完整组件与独立消费校验、类型与构建。源码保持由验收哈希证明，不重复视觉改造或增加新验收。记录五项全局入口的实际结果，把无关 B2 历史、命令集合、资产索引等失败与 Slider 有限治理分开。

独立复核通过后，原 Slider 实施与本次 closeout 仅在专项自动/审查通过时标 completed/passed-scoped。当前页面视觉接受保留原范围；对比度、Safari、VoiceOver、真实触控、Figma、发布和业务迁移仍独立。证据保存本轮目录，旧技术交付和验收不覆盖。
