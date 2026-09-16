# ADR 提案｜Card 采用 shadcn 基线并适配 Rain

**状态：proposed；尚未在仓库实现或经过新视觉 Gate。**

此文提供 Codex 可以落实的目标合同，不是新的无限配置 Card 设计，也不替代仓库现行的 AGENTS／Token／生命周期规范。

## 1. 决策

推荐 `adapt-shadcn`：采用固定上游 Card 的部件组织与有价值的样式规则，替换 `packages/ui/src/card/card.tsx` 及其旧配方；保持现有 Rain 公共导入与有效语义。

不推荐：继续在旧固定 CSS 上零散叠加；长期并行第二套 Card；重新发明无头卡片引擎；把复制上游全部默认值当作品牌适配。

依据：当前 Card 已有七部件与语义，但缺少统一尺寸／间距与 Local Recipe，仍有旧配方和登记欠项。[R15][R17][R18] 上游作者源码与 Nova 样式提供可追踪的结构和配方参考。[U01][U02]

## 2. 采用与不继承

| 对象 | 决策 |
| --- | --- |
| 七部件及可选组合 | 采用并保持当前 Rain 名称 |
| 统一区域间距 | 采用思路，转为 Rain Token 支撑的组件变量 |
| 有无 Action／Description 的布局 | 采用意图，转译为 Rain 标记并限制所属作用域 |
| 图片与通栏内容 | 提供可改造示例；不要求新增公共 CardImage |
| 上游默认 div 标题 | 不照搬，保留当前 CardTitle.as 和有效标题级别 |
| 上游全部颜色、默认圆角、字重 | 不照搬，映射 Rain 规范 |
| 根部统一裁切 | 不照搬为硬规则；优先让媒体局部裁切 |
| Footer 默认底色和边界 | 不照搬为所有卡片的必选视觉；通过局部配方表达 |
| 整卡选择／点击／拖放 | 不纳入基础 Card；复用专门控件或业务 Recipe |

Nova 在此仅是已审阅的上游样式来源，不是选定一个新的雨课堂品牌主题。可以直接以“作者 Card＋Nova Card 样式段”为参考完成 Rain 转译，不必构建上游全站；必须记录两份来源，不能只抄含 `cn-*` 的模板。

## 3. 兼容优先的最小 API

| 公共项 | 当前 | 目标提案 |
| --- | --- | --- |
| 导出 | Card＋六个部件 | 保持原名和 `@rain-next/ui` 导入 |
| Card 根 | article | 本批默认继续 article，不增加万能 polymorphic/render API |
| Card `variant` | panel／raised | 保留两值作兼容；raised 不承诺有阴影，不改成整卡操作态 |
| Card `size` | 无 | 增加 `default`／`sm`，表示 Card 自己的留白，不表示内容或控件缩放 |
| size 省略 | 无 | 初版建议为 default，不自动将父密度变成新的 Card 尺寸行为；场景 Recipe 可显式从密度选 size |
| `localRecipe` | 无 | 增加既有 `RainLocalRecipe<CardPart, "ui-card">` 入口，沿用已有记录模型 |
| `className` | 原生属性入口 | 保留；用于布局。品牌视觉调整走显式尺寸或具名 Recipe，不能绕过规则 |
| CardTitle `as` | h2–h6／p，默认 h3 | 保留；业务页选择正确层级，不退化为无标题语义的 div |
| Description | p | 保留原生属性与文本语义；块级复杂内容放 Content，不硬塞到 p |
| Footer | footer | 保留在 article 内的语义和 ref；本批不做全局站点页脚 |
| 原生事件、aria、ref | 转发 | 继续转发，不拦截已有 Button／Select 的业务事件 |

**size 与 Density：** 本批先采取不隐式影响旧调用的方案。Card 不创建 DensityProvider，不因 `size=sm` 自动让内部按钮、输入框一起变小。需要整个区域 compact 时由外层既有 DensityProvider 决定。未来若要让 Card 默认随密度变化，单独记录并回归旧消费者。

任何提议改变根元素或删去 variant 的实现，都必须给出消费者迁移依据；不因上游默认不同就静默破坏当前合同。

## 4. 部件合同

`CardPart = root | header | title | description | action | content | footer`。

Card 是容器，不强制出现全套部件；允许只有 Content、没有 Description、没有 Action、没有 Footer。Header 内 Action 是可选，不应为缺失 Action 永久保留明显空白列。

推荐结构：

```text
Card
  ├─ 可选媒体包装层（Recipe 自有）
  ├─ 可选 CardHeader
  │    ├─ CardTitle
  │    ├─ 可选 CardDescription
  │    └─ 可选 CardAction
  ├─ CardContent / 其他明确业务结构
  └─ 可选 CardFooter
```

此结构是默认范式，不是拒绝其他合法包装层的 runtime schema。水平媒体卡可以调整布局。需要特殊包装时用局部 Recipe 显式处理，不递归检查所有后代并强迫一种版式。

## 5. 追踪与关联选择器

根保持 `data-rain-id="ui-card"`、`data-slot="root"`、`data-variant`，新增可观察的 `data-size`；部件保持现有简短 slot 值。具名 Recipe 显示自己的稳定 ID，不保存课程或学生私有内容。

上游对照必须成组转换：

| 上游 | Rain |
| --- | --- |
| card | ui-card 根的 root |
| card-header | header |
| card-title | title |
| card-description | description |
| card-action | action |
| card-content | content |
| card-footer | footer |

不能把 slot 写成 `"content card-content"`，因为等值选择器不会匹配两种值。也不要在所有后代上仅用 `[data-slot=content]` 判断“属于这张 Card”。

优先选择局部类或直接所属部件的关系；如果结构有额外包装，用明确 Recipe 处理。嵌套 Card 中内层 Footer／Action 不应触发外层 Header／Footer 判断。

## 6. Token 与样式配方

### 6.1 唯一间距来源

建议组件变量 `--rain-card-spacing`。它是现有 Space Token 的组件级别名，不另建一套基础间距。

初始试作候选：default → Space/20，sm → Space/16；表面 Radius/8、Shadow/none，标题与正文使用当前可用的 Rain 排版角色。**这些是本轮计划候选，待视觉评审；不是上游默认值，也不是已批准新 Token。**

主区域间距与水平 inset 使用这份变量。标题和说明间的细间距可以使用独立已有 Space Token；统一不等于把每一个间隙都变成 20px。

优先检查变量和工具类是否已经存在；不足时只按当前生成器增加所需映射。禁止手工改生成区、重开 Tailwind 默认主题、任意添加全部 Card 专属 Token。

### 6.2 优先级与隔离

推荐把能表达的视觉规则放到 Card 样式配方与受控工具类中。剩余的 CSS 规则只在 Card 专属、可覆盖的明确层级内出现；现有全局 styles.css 只删除或迁移 Card 的具体旧声明。

不要保留 `.rain-card__content {padding:…}` 后期待追加工具类生效。不要为此给局部所有样式加 important，也不要全局移动旧样式层级。

使用 `rainCn`，但把“字符串冲突合并”与“浏览器 CSS 优先级”分开测试。自定义类名或变量赋值需要额外冲突组时，最小增量并为既有 Button／Input 等补非目标回归。

每张 Card 根都建立自己的 spacing 默认，避免嵌套 Card 意外继承父 Card 的局部改造。

### 6.3 局部变量合法使用

普通局部变更只消费既有 Token。非常规视觉候选仍按现有 `--rain-local-<feature>-<role>` 与作用域规则登记；不直接写进 :root。

如组件变量覆写采用 utility／Recipe，明确其层级和组合优先级。`localRecipe` 类型本身不提供自动 CSS 沙箱，必须实际证明目标与非目标隔离。

## 7. Local Recipe 传递

优先复用既有模型，不另建 CardRecipe 平台。根接收一次 Recipe，各部件读取对应 classes。实现可用很薄的 React Context 传递配方；它只是部件配置，不是 Headless 状态机，也不创建额外 DOM 容器。

需满足：内层 Card 拥有自己的配置作用域；缺失 Recipe 时使用默认；外层 Recipe 的 content 改造不能改到内部 CardContent。不得为了传配方递归克隆所有 children。

允许自由调整：布局方向、媒体位置、内容层级、允许的 Token、已登记部件。

需要系统评审：新增全局变体、新 Token、改变所有 Card 的默认视觉、扩展基础行为。

禁止默认行为：根自动获得 button 角色、焦点圈或 selected/open 状态；所有 Card 自动加入整卡点击；为一个页面污染全局 API。

## 8. 四个最低 Recipe

| ID | 例子 | 验证目的 |
| --- | --- | --- |
| CR-01 | 标题＋正文的信息卡，无 Action／Footer | 可选部件与基础疏密 |
| CR-02 | 课程媒体卡；相同内容在上图下文和左图右文间切换 | 结构改造与通栏裁切，未变化业务数据 |
| CR-03 | 指标／报告片段；Value／Unit／Label 分开 | 排版角色、关键数值与单位，不把整卡切成数字字体 |
| CR-04 | 操作卡；现有 Button、Tag、DropdownMenu 和可选 Footer | 长标题、操作折行、焦点与事件独立 |

示例先作为带来源的局部配方，不强制全部晋升公共 Block。Card 本批不阻塞于尚未建设的 Chart、Avatar 或完整 Layout。

可选卡片继续用已有 CheckboxCard／RadioCard；Hover Card 是另一个浮层语义，不是普通 Card 增加 hover 外观；整卡导航与内部按钮并存需要单独的无障碍组合方案。

## 9. 三种关系图的最小合同

| 图 | Card 的关系 |
| --- | --- |
| 能力依赖 | React＋rainCn＋Rain Foundations／样式＋轻量 Recipe 传递；不直接需要 Base UI 行为。业务控件作为 children 组合 |
| 界面组合 | 七部件与 Recipe 媒体／业务区域；部件可选，允许布局变化，约束所属关系 |
| 状态与事件 | 基础 Card 无业务状态；size／variant／Recipe 是配置。数据、选择、编辑、保存、展开由相应控件或业务宿主拥有 |

这三种关系应写入现有 Manifest 可支持的字段，不必另建复杂图数据库。

## 10. 迁移与可逆性

先记录全部当前调用、重导出、CSS、测试和机器追踪。修改公共实现后，更新真实消费者与当前文档；保留旧日志和截图。临时比较版本只放实验区域，不进公共默认索引。

兼容入口与语义降低迁移代价；新的视觉不强求与旧版逐像素一致。发现未覆盖消费者时给出明确映射，不扩建永久双版本平台。

回滚采用只撤销本批已记录文件改动的方式。不得 `reset --hard`／`git clean`，不得撤销共享工具函数中其他任务的后续改动。具体规则见 [05](05_验收矩阵与回滚V2.md)。

## 11. 首批非目标

不做 Card 专属 Headless、不做二十种公共 Variant、不做万能 layout/data/chart props、不同时重写 Surface/Badge/Link、不安装完整 shadcn、不改全局 Focus、不修改 Classic、不分发字体、不自动写入 Figma 或发布。

<!-- 可核对来源 -->
[R15]: https://github.com/409476773-web/rain-classroom-vibe-ui-spike/blob/321e1a0c1b5f9284e0fcb5167fa059d6174b1752/docs/audits/2026-09-12-core-ui-contracts.md
[R17]: https://github.com/409476773-web/rain-classroom-vibe-ui-spike/blob/321e1a0c1b5f9284e0fcb5167fa059d6174b1752/packages/ui/src/card/card.tsx
[R18]: https://github.com/409476773-web/rain-classroom-vibe-ui-spike/blob/321e1a0c1b5f9284e0fcb5167fa059d6174b1752/packages/ui/src/styles.css
[U01]: https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/bases/base/ui/card.tsx
[U02]: https://github.com/shadcn-ui/ui/blob/3ba91b1cc83e1bbe4ab35a422ff2a694849c5048/apps/v4/registry/styles/style-nova.css
