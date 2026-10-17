# G3 导航重建 v0.3

本地候选，设计 `pending-review`。实际工作树 `card-v2`，分支 `codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`，包含原有未提交修改。沿用 React、Base UI 1.8.0、Rain Token 和既有 Layout，没有新增依赖或修改公共默认。

## 打开和复现

- [C01 完整课程页](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=course&recipe=C01&page=course-content&view=focus)
- [S01 平台考试页](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=platform&recipe=S01&page=exams&view=focus)
- [十二组合目录](http://127.0.0.1:4174/#token-first-g3?rebuild=1&view=catalog)、[共同状态板](http://127.0.0.1:4174/#token-first-g3?rebuild=1&view=states)、[A/B 实例隔离](http://127.0.0.1:4174/#token-first-g3?rebuild=1&view=isolation)
- [设备预约](http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=lab&view=focus)、[原 G3](http://127.0.0.1:4174/#token-first-g3)

4174 是已核验的既有服务，本轮没有重启或停止它。服务不在时，从本工作树执行 `pnpm --filter @rain-next/prototype exec vite --host 127.0.0.1 --port 4174 --strictPort`；端口占用先核验，不终止其他服务。

## 选型和实际源码

| 用途 / 原 ID | 实际实现 | 保持的关系 / 局部可变部分 |
| --- | --- | --- |
| S01/S02/S04，平台导航 | [parts.tsx](parts.tsx)、[rebuild.css](rebuild.css) | 同一导航行和数据；深浅、完整/图标、当前表达可变，链接与展开分开 |
| S05/S06/S08，范围与布局 | [course.tsx](course.tsx)、[course.css](course.css)、[page.tsx](page.tsx) | 全局与课程范围分开；上下文抬头可替换；布局由宿主和现有 Split 负责 |
| N01—N04，直接链接/展开链接 | [top-navigation.tsx](top-navigation.tsx)、[top-navigation.css](top-navigation.css) | 同目的地；指示线/弱填充、紧凑/丰富面板可变，current 不等于 open |
| M01/M02，文档命令 | [commands.tsx](commands.tsx)、[commands.css](commands.css) | 同一 Menubar 底座和命令模型；无框/细框可变，保留四列和键盘模型 |
| E12，陌生业务组合 | [lab.tsx](lab.tsx)、[lab.css](lab.css) | 独立代理按 S05/S08 选型；换为设备预约，复用 NavRow/Sidebar Parts，无课程字段 |

S03 是当前项指示；S07 是同数据的浮动关系对照；C01 是顶部与课程导航组合；短文字轨是 S05 的局部呈现。均没有新增公共基础组件。

先读命中的 1—2 张原卡，再读实际实现。目录中的研究图片标注为 v0.2 研究示意，不能当作运行截图。原包和执行记录在主工作区 `rain-classroom-vibe-ui-spike/docs/rain_navigation_rebuild_v0.3/`，不是复制到本工作树的第二份工作包。

## 局部消费合同

以下为同目录内已存在的候选出口；不是 `@rain-next/ui` 的新增导出：

```tsx
import { NavRow, NavigationRail, type NavEntry } from './parts';
import { TopNavigation } from './top-navigation';
import { CommandWorkbench } from './commands';
import { LabWorkbench } from './lab';

const entries: NavEntry[] = [{ id: 'inventory', label: '设备清单', href: '#equipment' }];
// 宿主必须提供自己真实、可恢复的 href/current；不要照抄这个目的地到 G3。
<NavigationRail entries={entries} current="inventory" surface="light"
  header={<strong>实验室</strong>} footer={<span>开放时间 08:00—20:00</span>} />;
```

`NavigationRail` 接收 `entries/current/surface/mode/onModeChange/header/footer/label/indicator`；`NavRow` 接收明确的 `entry/current/expanded/onExpandedChange`。NavEntry 支持图标、标签、徽标、短标签和子入口。全局数据适配器 `globalEntries(route)` 与本地 Hash 示例一起使用，不属于通用业务规则。

`TopNavigation` 接收 `route/variant/panel/portalHover/label`，使用同一目的地记录。`CommandWorkbench` 接收 `appearance/instance`，其余命令状态保留在该实例。菜单只复用已安装 Base UI；导航链接不伪装成 Tabs 或命令菜单。门户 hover 的当前 300/150ms 来自既有 Popover 默认，已实测，不提升为全站新规范。

基础加载沿用 [prototype 主入口](../../../main.tsx) 的 Foundations/UI/CSS 关系，不能只复制 TSX 后声称独立可用。不要修改公共 Token、替换底座、增加课程权限分支或把本候选直接发布。

## 状态与模拟范围

- Hash 保留 `#token-first-g3?rebuild=1`，承载 scene、recipe、page、course、scope、unit、count。刷新和历史恢复当前位置；宽度/面层等演示控制不承诺刷新持久化。
- 课程位置按 instance/course/scope 隔离：筛选、选中、目录展开和滚动。进入单元后保留原全局框架，移除课程栏、班级条和目录；返回按同一范围恢复。草稿按范围和单元隔离，仅存在本次挂载期间，不表示已保存。
- 班级 fixture 为 0/1/4/12/200；直达项按容器容量计算，“全部班级”按 20 项查询分页。未选中搜索结果前不改变范围。同步模拟加载/失败/空结果和不可访问班级，不伪装后端请求或无限数据性能证明。
- 单元保留原 fixture 的稳定 ID；示例文案调整为高等数学。资源包可编辑；班级中的继承单元仅查看，本班新增单元可编辑；不推断同步、删除或覆盖规则。
- 实验室 A/B 使用独立 `labA*` / `labB*` Hash 参数与本地预约状态，修改 A 不覆盖 B。预约仅演示固定时段，不实现后端排程或权限。
- M01/M02 的插入、撤销、重做、复选、单选和子菜单会改变本地文档；键位明确仅展示。没有保存、发布或全局快捷键注册。

## 验证与证据

证据在本工作树 `evidence/runtime/navigation-rebuild-v03/`；最终来源见 `final-source-lock.json`，60 项工作包检查见 canonical `acceptance/results.json`。所有视觉状态保留 `pending-review`。

```sh
pnpm --filter @rain-next/prototype typecheck
pnpm --filter @rain-next/prototype build
pnpm exec vitest run apps/prototype/src/scenarios/token-first-g3/rebuild/*.test.ts* packages/ui/src/{scroll-area,sheet,breadcrumb,command,context-menu,hover-card,kbd}/*.test.tsx apps/prototype/src/scenarios/token-first-g3/page.test.tsx
pnpm exec playwright test -c playwright.navigation-rebuild.config.ts
pnpm exec playwright test -c playwright.g3.config.ts
```

四组视口为 1200×800、1440×900、1920×1080、1200×650，另测 390px 回退、文字 200%、forced-colors、键盘、Portal 和范围恢复。抽测文字对比度和命中区不等于完整无障碍接受；真实屏幕阅读器、物理触屏、另一台机器字体为 `not-run`。

`pnpm verify:boundaries` 仍失败：现有 Chart 路径、冻结 Token 历史、旧组件治理证据和阶段策略问题；没有借本轮修改这些公共范围。保护快照内 2072 个文件及锁文件未改变。旧 G3 的测试会刷新其原截图输出，不把这些截图声称为逐字节保留。

旧 G3 是组件能力展示页，缺少与新完整课程/设备业务相同的数据基线；旧页截图用于结构对照，不能宣称相同业务内容下完成了旧新版性能或审美优劣验证。后续只需评审候选视觉与具体修订；公共晋升、发布、迁移、Figma、Git 均未执行。
