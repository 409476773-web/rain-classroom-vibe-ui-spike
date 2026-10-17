# F01—F07 · 本批映射与边界

当前追加9条反馈：新增Text/Neutral/4用于作答标题、Icon/Neutral/4用于折叠箭头；箭头是有意义图标，亮色实测2.38<3仍为待审阅发现。三卡共用Background/Neutral/1，移除中卡局部底色但保留菜单局部背景。字号/间距复用15、13、24、16；评分细则复用regular文字按钮，说明按钮复用tertiary mini及icon/article-filled。局部颜色58项、静态测量862组、去重发现28条，以browser-annotations3实际主题测量为准。此前同名结论以此更新为准。

最新浏览器标注覆盖首版部分映射：Tabs采用现有38常规档且固有宽度；摘要标签12/20；摘要Second、关键数字Brand/1；辅助描述Neutral/5、演示说明Neutral/6。浅底在既有Alpha白名单内6%→5%，输入边界恢复共享外观。部分弱辅助字与输入边界有未通过的对比度测量，不能继续引用下方首版全通过数字代表现状。具体源改动、主题及响应决策见 [最新设计记录](design-notes.md)，测量见 `browser-annotations2/rendered-contrast.json` 和 `annotation-color-findings.json`。

来源为 shadcn 官方仓库固定提交 `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` 的 Base UI 作者源码及同提交 Nova 样式。沿用已有 Card 的来源版本，保留 MIT 许可。每份原文的 SHA-256、路径、取得方式见 [source-lock.json](source-lock.json)。未执行 CLI，因此不声称锁定了 CLI 安装产物。

本机事实见 [facts.json](facts.json)：Node 24.13.0、pnpm 10.28.1、React 19.2.8、Tailwind 4.3.3、Vite 8.2.2、Base UI 1.8.0、CVA 0.7.1。Prototype 增加 Base UI/CVA 两项直接依赖声明，离线复用工作区已锁定的版本，未引入新的依赖版本。269 个颜色 ID、17 个语义映射、19 档字号、15 档固定行高加 equal、10 套排版、20 个具名 Tag 配置已从当前事实源重新计算。Tag 配置和其展开后的 Category profiles 不是同一个计数。

没有新增共享 Token、公共断点、公共阴影、全局默认字号或密度。没有手改生成 CSS/清单，也没有迁移旧别名。现行文档的 14→17 映射数、14→15 固定行高数已修正；历史记录保持原样。

| 来源与用途 | 本批 Rain 对应及策略 | 消费者／核验 |
|---|---|---|
| `bg-card / text-card-foreground / text-muted-foreground` | 独立任务面 Background/Neutral/1；辅助面 /2；页面 /3；必要文字 Text/Neutral/1、辅助正文 /3；根据用户反馈将样板的非关键说明降为 /4。卡片两组浅底用 Fill/Neutral/Alpha/6 | Alert、组合页、局部 Card/Menu；51 条固定 CSS paint 登记及 852 个主题/父面组合验证 |
| destructive / warning 提示 | 保留红/橙 Alpha/2 承载面，正文改 Text/Neutral/1。原尝试 Red/1、Orange/1 的低对比结果未作为通过 | Alert 的长提示文本；实际浅深主题正文对比检查 |
| Switch `bg-primary / bg-input / bg-background` | 开启 Fill/Brand/Solid/1 + OnColor/1 滑块；关闭 Fill/Neutral/Solid/3 + Icon/Neutral/1 滑块。含义同时由位置、标签和 aria-checked 表达 | Switch；键盘切换、禁用、浅深主题和强制颜色检查 |
| Border、ring、aria-invalid 的来源视觉 | 本批必要边界/焦点局部采用现有 Border/Neutral/1 并显式替换 Alpha 为白名单 65%；保留原 Focus 的键盘触发与光晕，局部 2px 轮廓。未增加色值、未更改全库焦点 | 工具栏输入/Tab/开关、局部浮层。未制作 Switch 专用错误态配方；不声称完整上游状态对等 |
| Nova `text-sm / font-medium` | 默认正文14/22，长说明14/24，局部标题16/24；强调字重映到既有 semibold。未增加 medium 字重 | page.css、Alert、Accordion；构建后标题16px检查；本机实际字体 PingFang SC |
| 数字字体 | 卡片分数沿用现有 Data 角色，20/28；中文单位留在 UI 字体 | 实际平台字体为 LINE Seed JP App_OTF。报告方向稿暂用 UI 数字，正负号资格与 F08 一起处理 |
| Nova Alert `gap-0.5 / px-2.5 / py-2` | gap→Rain2；10×8 内边距有意改成 Rain12×12，配合常规提示密度，非按同名数字替换 | alert.tsx 与 page.css |
| Nova Accordion `py-2.5 / pb-2.5 / size-4` | 上下/底部间距采用 Rain12；图标盒16；箭头使用单个 Rain ArrowDown 按展开态旋转 | accordion.tsx；浏览器验证只有一个可见箭头且展开方向正确 |
| Nova Switch `32×18.4 / 24×14` | 本批只做常规36×20轨道、16滑块、16位移；上下/左右扩展8的命中区域。未提供 sm | switch.tsx；不假装完整保留所有 size 变体 |
| `rounded-lg / rounded-full / border` | 提示和主内容8；开关 full；常规边线1；当前导航选中线2 | 复用现有 radius/line 事实源，未新增2px圆角 |
| `transition-transform / animate-accordion-*` | Switch 用现有 feedback 140ms/ease-out；减少动画时停用。折叠保留原生展开行为，本批不引入折叠动画依赖 | Base UI 管理状态与可访问语义；无新增动画库 |
| `dark:*` 与 Portal | Rain `data-rain-theme`，沿用已有 PopupProvider 的动态主题传递 | 打开 Dialog 后切换深色，再打开内部菜单；Escape 逐层关闭并归还焦点 |
| Nova `md:text-pretty` | 本批长内容使用14/24与自然换行，无需恢复全套默认断点。组合布局仅使用局部1100/700视口阈值 | 1440/900/390 三宽度；未将局部视口规则称为容器断点 |
| 局部覆盖与层叠 | `.g1-local-surface` 在 utilities 层使用 Background/Neutral/2；共享 `.rain-popup` 默认 paint 移到 base 层，尺寸和交互规则仍保持原位置 | 修改一例的 Card/Menu 背景，默认与兄弟例保持一致；菜单构建前失败、修复后通过 |
| 扫描与生成 | 保留 Tailwind `--*: initial`，使用完整 Rain 类名和已登记局部规则 | 原型构建、Tailwind bridge 检查、实际浏览器样式均核验；DOM 有类名不作为生效证据 |

颜色登记只覆盖 `apps/prototype/src/scenarios/token-first-g1/page.css`，接入已有 Token 校验器；没有新建运行 Token Schema。登记内容包含真实文字、图标和必要边界角色，没有把低对比内容改称装饰来通过检查。静态检查使用当前 Token 值，反馈修订后的浏览器检查见 `browser-feedback2/rendered-contrast.json`。辅助文字采用更浅层级，仍实测其文字角色对比度，没有降低原门槛。

2026-09-19 用户明确调整样板用途：两个固定卷别改用已有 Tabs，按 A/B 内容面板组织真实过滤结果；立即搜索复用 Input + SearchIcon，不加可见字段标题，也不新增提交搜索动作。普通输入/恢复按钮仍36px，Tabs 用已有常规32px；小卡片按用户明确要求用28px mini实体按钮、24px compact文字按钮，未改共享默认。示例作答初始收起，在同一个浅底块内展开，按钮文字与正文左边线一致；评分细则用文字按钮打开已有 Dialog。Accordion 的补充说明放在细则弹层内部。Switch 本体按用户要求暂留，标签与开关间距12→6，Text/Neutral/1→3。

F06：现有 16 档间距满足本批；布局大分组用20/24/32，Card 不加重阴影；浮层复用 overlay/dialog。48/64和轻阴影没有真实缺口，本批不新增。

F07：保留 Dialog portal/backdrop 30、内容31、嵌套 Dialog portal50、Popup positioner40 的既有叠放上下文。已测窄窗口 Dialog 内菜单的可见、关闭顺序和焦点恢复；没有通过增加 z-index 解决问题。未覆盖全部 Dialog-in-Dialog、Tooltip、物理触摸与所有浏览器组合。

F08：仍在 G4。当前报告复用 BM-D 的真实汇总与 TrendChart，不将其认定为公共 Chart 合同。分类系列、轴/网格/提示、变化正负号、缺测/零值的完整验收留到报告首版。
