# G1 迁移与共用文档壳独立审阅

日期：2026-10-07。审阅者：docs_g3_navigation；本次只读审阅他人编写的 G1 迁移与共用文档壳，未改实现，未重复已通过的 30 页浏览器检查。

结论：本范围内未发现 P1 / P2。

## 已核对范围

- `before/` 中的 App、CoreUiPage、UI index、Playground / UI styles 原文，与当前组件目录、路由、加载映射及显式出口比较。目录 30 项、已有 Alert / Breadcrumb 特殊路由、独立页标题与焦点目标一致；查询片段先规范化为已有页面路径。目录使用原生链接；共享候选、未发布的说明没有转写为系统已接受。
- Accordion、Collapsible、Resizable 的旧场景入口均直接从 `@rain-next/ui` 具名导出，与 Playground 使用同一共享实现；UI index 具名导出函数及必要类型，没有通过 wildcard 扩大出口。
- 逐项比较旧 G1 本地适配快照与共享三项源码：运行结构、受控 / 初始值处理、开放 Parts、Base UI / Resizable 引擎调用保持原状。差额为内部 import 路径、CSS 归属、共享候选追踪身份、公开类型。未增加另一套展开、拖动或持久化状态。
- 原 `page.css` / `next.css` 的颜色、尺寸、四种 variant、compact、展开高度、reduced motion、2px 分隔条与 forced colors 已拆入组件自主引入的 CSS。样例布局单独位于 `g1-component-pages.css`；新文档明确登记 Tailwind source。未发现组件脱离旧场景后缺少必要样式。
- G1 独立页常用 Props、默认值、组合结构与实际共享源码核对；Accordion `multiple=false` 与 Base UI 1.8.0 源码一致；Resizable 数字为像素、比例使用字符串、通过 `groupRef.setLayout` 恢复布局与 4.12.4 声明一致；Tooltip 的固定深色默认、100ms、12 方位、本地 / Portal、空文本行为与既有共享源码一致。Switch 页只改文档包装，使用既有共享 API。
- ComponentDoc 的主题与密度局限于当前演示宿主；复制失败有可见状态说明。API 表头、caption、标题 ID 与返回目录入口完整。未发现文档壳把业务状态推进组件 API 或改共享默认。

## 审阅中已修复的非阻塞项

- P3：`apps/playground/src/app.tsx:203` 的共用 Suspense 曾仍提示“正在打开图标库…”，如今也用于新的组件文档 lazy 加载。Root 已改为“正在打开页面…”和 `playground-loading`，本审阅再次读取该行确认；无剩余发现。审阅者未修改实现。

## 对比依据与限制

本轮公共文件快照：`before.json`、`before/`。旧来源锁与验收：`evidence/runtime/token-first-v12-g1/source-lock.json`、`adapted-source-sha256.json`，以及 `token-first-v12-g1-next` 对应来源锁、哈希、verification 与 Resizable 原颜色消费记录。旧本地源码另读取了 2026-10-04 全量检查快照 `/private/tmp/rain-nav-w7-full-e2e-20261004/apps/prototype/src/scenarios/token-first-g1/`；三项快照 SHA-256 如下（该临时快照仅为本次比对输入，不作为可长期访问的新发布附件）：

| 文件 | SHA-256 |
| --- | --- |
| accordion.tsx | d1ea4c72691fb87350bc182d4c32271df7c7923fc5eb5b54e0d657d2678beed5 |
| collapsible.tsx | 7f28e1de0d44be43f8f39c3fa89954fe01a28ffa5c4fd6adc6167f06da889e41 |
| resizable.tsx | d48bd028d550633bbf8df3cebe0c8f33996d0150a28bdd3901fc1aff0a71450b |

本次属于源代码与接口的独立审阅；不替代实际 Safari / VoiceOver、完整可访问性或新的 Human Gate。没有审阅自己编写的 G3 / 导航页、没有扩展到其他旧组件，也没有改动历史证据。

Root 收尾将上述三项旧源码及旧 page.css / next.css 原文保存到 [review-inputs/g1-old/](review-inputs/g1-old/)，校验散列保持相同；后续复查无需依赖临时目录。
