# 可恢复工作区 · v0.4.2 候选消费

G1 只接受 A1/A4/R2 的既有视觉。W3–W5 candidate13 的运行视觉与组合已获限定 G2 接受，G3/完整质量仍独立；[状态合同](../../packages/layouts/src/README-workspace.md)与[Manifest](../../manifests/layouts/workspace.yaml)是当前 API 来源。使用公共 `@rain-next/layouts` 导出并加载其 `styles.css`，不复制 HTML 全局状态机。

固定双栏用既有 Split。需要多个区域分别隐藏、临时查看、固定、调宽或专注时用 WorkspaceLayout；NavigationList 表示页面目的地，ObjectNavigator 表示当前对象，SegmentedControl 表示条件。工作区仅管理布局，学生、题目、文件、评语与播放位置由业务方持有。

每个 `spec` 提供稳定 `workspaceKey`、`minMainWidth`、regions 与 `stableRestoreOwnerIds`。每个可隐藏 region 的 `restoreOwnerId` 必须指向外部稳定控制区；真正的 RegionRestoreTrigger 放在 toolbar 或另一个始终可达的位置。全局导航才支持 compact 图标模式。主区空间不足会派生 effective 模式，保留 preference，恢复宽度后回到请求布局。

```tsx
import {WorkspaceLayout, RecoverableRegion, RegionRestoreTrigger, PaneSplitter} from '@rain-next/layouts';
import '@rain-next/layouts/styles.css';

<WorkspaceLayout spec={spec} storage={layoutStorage}
  toolbar={<header><RegionRestoreTrigger regionId="queue"/></header>}>
  <RecoverableRegion regionId="queue">{queue}</RecoverableRegion>
  <PaneSplitter regionId="queue"/>
  <main>{preview}</main>
</WorkspaceLayout>
```

temporary 使用同一 mounted region，compact/hidden 占位保留，固定后才参与布局。hover 默认关闭，显式启用后具有延迟、Esc 抑制与场景清理。既有 Popover/DropdownMenu 的 portal 操作保留逻辑归属，Esc 先关闭它们，随后关闭工作区临时层，最后退出专注。不要创建第二套 document popup 管理器。

`preferences`/`onPreferencesChange` 受控时父方仍是权威；拒绝同步会显示 pending，不由内部状态伪装成功。存储只接受 version2 的区域 mode/expandedWidth，明确支持 version1 width 迁移；损坏、拒绝、未知版本回退默认。session、focus、hover、评语和正文不写入偏好。

R1/R3 的局部 `workspace` 参数允许注入 spec/toolbar/inverse/hoverPreview/storage，供 S 样本复用正文；不依赖评审台 DOM，也不靠换 key 重建。R2 当前配方直接消费同一公共控制器。所有局部 Recipe 仍为 local-experiment，源码分发不表示发布或系统审批。

改造需记 source/version/hash、instanceId、modifiedParts、理由与验证。至少检查全部隐藏恢复、首击原子性、非零滚动、草稿保留、临时层不推动正文、专注精确退出、420px 高菜单以及相邻分隔边只绘制一次。VoiceOver、完整对比度和多浏览器需单独登记，自动测试不代替人审。
