# G1–G6 收尾：冻结64项目录结构映射

日期：2026-10-17。工作树：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。

**结构映射 64/64；本文件不声明运行验证或人工验收 64/64。** 仅核对冻结能力键与现存源码、Registry、Manifest、公开出口和已有展示路径。最低能力行为与各次人工接受范围仍取原计划、Manifest、阶段记录及各批证据。

机器可读完整映射、实际全部出口及当前源码 SHA-256 见 [coverage.json](coverage.json)。

| 分组 | 冻结目录条目 |
| --- | ---: |
| G0 | 18 |
| G1 | 6 |
| G2 | 6 |
| G3 | 10 |
| G4 | 4 |
| G5 | 8 |
| G6 | 12 |
| 合计 | 64 |

G0 为18项既有能力；G1–G6 共46项。一次目录能力可以映射多个已有资产，也可以复用同一资产；不按 Parts、入口或变体累加分母。层级栏表示源码/能力归属，`assetIdentity` 和成熟度逐资产原样保存在 JSON，不能从 shared UI 的可导入性推导 system-approved。

## 核对方法与范围

- 使用当前 `scripts/asset-index.mjs` 导出的 `validateAsset`，逐一核对本表涉及的 88 份唯一 Manifest；返回 `passed`。
- 检查真实 Registry 条目与源码列表、Manifest/source 文件、当前 package export、源码具名出口、局部 Registry 依赖和已登记证据路径；没有运行组件测试、浏览器或新的视觉验收。
- 展示路径来自当前目录/路由及既有组合页，只表示可发现入口映射；此次未操作页面。
- G1/G2 Registry 的初始验证字段属于冻结创建快照；保持旧字节和 SHA，当前结果沿10月7日报告、Manifest及阶段后继节点读取。
- 既有 G4 三页、Carousel、Attachment 等局部接受继续保留；不将这些接受转移给全库或整批 Human Gate。

## G0

| 冻结能力键 | 实际层级 | Registry / 组合合同 | Manifest / source | 消费入口 |
| --- | --- | --- | --- | --- |
| button | UI 源码（各自身份见JSON） | [registry/core-ui.json#button](../../../../registry/core-ui.json)<br>[registry/icon-button.json#icon-button](../../../../registry/icon-button.json) | [button](../../../../manifests/ui/button.yaml) / [source](../../../../packages/ui/src/button/button.tsx)<br>[icon-button](../../../../manifests/ui/icon-button.yaml) / [source](../../../../packages/ui/src/icon-button/icon-button.tsx) | `@rain-next/ui`: `Button`<br>`@rain-next/ui`: `IconButton` |
| input | UI 源码（各自身份见JSON） | [registry/core-ui.json#input](../../../../registry/core-ui.json)<br>[registry/core-ui.json#search-input](../../../../registry/core-ui.json) | [input](../../../../manifests/ui/input.yaml) / [source](../../../../packages/ui/src/input/input.tsx)<br>[search-input](../../../../manifests/ui/search-input.yaml) / [source](../../../../packages/ui/src/input/search-input.tsx) | `@rain-next/ui`: `Input`<br>`@rain-next/ui`: `SearchInput` |
| checkbox | UI 源码（各自身份见JSON） | [registry/checkbox.json#checkbox](../../../../registry/checkbox.json)<br>[registry/checkbox.json#checkbox-group](../../../../registry/checkbox.json) | [checkbox](../../../../manifests/ui/checkbox.yaml) / [source](../../../../packages/ui/src/checkbox/checkbox.tsx)<br>[checkbox-group](../../../../manifests/ui/checkbox-group.yaml) / [source](../../../../packages/ui/src/checkbox/checkbox.tsx) | `@rain-next/ui`: `Checkbox`<br>`@rain-next/ui`: `CheckboxGroup` |
| radio-group | UI 源码（各自身份见JSON） | [registry/radio.json#radio-group](../../../../registry/radio.json)<br>[registry/radio.json#radio](../../../../registry/radio.json) | [radio-group](../../../../manifests/ui/radio-group.yaml) / [source](../../../../packages/ui/src/radio/radio.tsx)<br>[radio](../../../../manifests/ui/radio.yaml) / [source](../../../../packages/ui/src/radio/radio.tsx) | `@rain-next/ui`: `RadioGroup`<br>`@rain-next/ui`: `Radio` |
| select | UI 源码（各自身份见JSON） | [registry/select.json#select](../../../../registry/select.json) | [select](../../../../manifests/ui/select.yaml) / [source](../../../../packages/ui/src/select/select.tsx) | `@rain-next/ui`: `Select` |
| textarea | UI 源码（各自身份见JSON） | [registry/textarea.json#textarea](../../../../registry/textarea.json) | [textarea](../../../../manifests/ui/textarea.yaml) / [source](../../../../packages/ui/src/textarea/textarea.tsx) | `@rain-next/ui`: `Textarea` |
| card | UI 源码（各自身份见JSON） | [registry/card.json#card](../../../../registry/card.json) | [card](../../../../manifests/ui/card.yaml) / [source](../../../../packages/ui/src/card/card.tsx) | `@rain-next/ui`: `Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter` |
| dialog | UI 源码（各自身份见JSON） | [registry/dialog.json#dialog](../../../../registry/dialog.json) | [dialog](../../../../manifests/ui/dialog.yaml) / [source](../../../../packages/ui/src/dialog/dialog.tsx) | `@rain-next/ui`: `Dialog` |
| alert-dialog | UI 源码（各自身份见JSON） | [registry/dialog.json#alert-dialog](../../../../registry/dialog.json) | [alert-dialog](../../../../manifests/ui/alert-dialog.yaml) / [source](../../../../packages/ui/src/dialog/dialog.tsx) | `@rain-next/ui`: `AlertDialog` |
| popover | UI 源码（各自身份见JSON） | [registry/dropdown-family.json#popover](../../../../registry/dropdown-family.json) | [popover](../../../../manifests/ui/popover.yaml) / [source](../../../../packages/ui/src/popover/popover.tsx) | `@rain-next/ui`: `Popover` |
| dropdown-menu | UI 源码（各自身份见JSON） | [registry/dropdown-family.json#dropdown-menu](../../../../registry/dropdown-family.json) | [dropdown-menu](../../../../manifests/ui/dropdown-menu.yaml) / [source](../../../../packages/ui/src/dropdown-menu/dropdown-menu.tsx) | `@rain-next/ui`: `DropdownMenu` |
| tabs | UI 源码（各自身份见JSON） | [registry/tabs.json#tabs](../../../../registry/tabs.json) | [tabs](../../../../manifests/ui/tabs.yaml) / [source](../../../../packages/ui/src/tabs/tabs.tsx) | `@rain-next/ui`: `Tabs` |
| table | UI 源码（各自身份见JSON） | [registry/table.json#table](../../../../registry/table.json) | [table](../../../../manifests/ui/table.yaml) / [source](../../../../packages/ui/src/table/table.tsx) | `@rain-next/ui`: `Table, TableScrollArea, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption` |
| pagination | UI 源码（各自身份见JSON） | [registry/table.json#pagination](../../../../registry/table.json) | [pagination](../../../../manifests/ui/pagination.yaml) / [source](../../../../packages/ui/src/pagination/pagination.tsx) | `@rain-next/ui`: `Pagination` |
| empty | UI 源码（各自身份见JSON） | [registry/table.json#empty](../../../../registry/table.json) | [empty](../../../../manifests/ui/empty.yaml) / [source](../../../../packages/ui/src/empty/empty.tsx) | `@rain-next/ui`: `Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions` |
| avatar | UI 源码（各自身份见JSON） | [registry/avatar.json#avatar](../../../../registry/avatar.json)<br>[registry/avatar.json#avatar-group](../../../../registry/avatar.json)<br>[registry/avatar.json#avatar-grid](../../../../registry/avatar.json) | [avatar](../../../../manifests/ui/avatar.yaml) / [source](../../../../packages/ui/src/avatar/avatar.tsx)<br>[avatar-group](../../../../manifests/ui/avatar-group.yaml) / [source](../../../../packages/ui/src/avatar/avatar-group.tsx)<br>[avatar-grid](../../../../manifests/ui/avatar-grid.yaml) / [source](../../../../packages/ui/src/avatar/avatar-grid.tsx) | `@rain-next/ui`: `Avatar`<br>`@rain-next/ui`: `AvatarGroup`<br>`@rain-next/ui`: `AvatarGrid` |
| badge | UI 源码（各自身份见JSON） | [registry/core-ui.json#badge](../../../../registry/core-ui.json) | [badge](../../../../manifests/ui/badge.yaml) / [source](../../../../packages/ui/src/badge/badge.tsx) | `@rain-next/ui`: `Badge` |
| separator | UI 源码（各自身份见JSON） | [registry/dialog.json#separator](../../../../registry/dialog.json) | [separator](../../../../manifests/ui/separator.yaml) / [source](../../../../packages/ui/src/separator/separator.tsx) | `@rain-next/ui`: `Separator` |

**button**：Button 与 IconButton 为独立既有资产；不以变体或 Parts 数量增加冻结目录分母。

**input**：Input 与 SearchInput 分别保留输入和明确提交搜索语义。

**radio-group**：主映射为实际 radio-group 条目与 RadioGroup 导出；Radio 为其相关独立资产。

**badge**：映射 Badge；Tag 是不同信息角色，不以 Tag 替代 Badge 计数。

## G1

| 冻结能力键 | 实际层级 | Registry / 组合合同 | Manifest / source | 消费入口 |
| --- | --- | --- | --- | --- |
| alert | UI 源码（各自身份见JSON） | [registry/alert.json#alert](../../../../registry/alert.json) | [alert](../../../../manifests/ui/alert.yaml) / [source](../../../../packages/ui/src/alert/alert.tsx) | `@rain-next/ui`: `Alert, AlertTitle, AlertDescription, AlertActions` |
| switch | UI 源码（各自身份见JSON） | [registry/switch.json#switch](../../../../registry/switch.json) | [switch](../../../../manifests/ui/switch.yaml) / [source](../../../../packages/ui/src/switch/switch.tsx) | `@rain-next/ui`: `Switch` |
| collapsible | UI 源码（各自身份见JSON） | [registry/g1-assets.json#collapsible](../../../../registry/g1-assets.json) | [collapsible](../../../../manifests/ui/collapsible.yaml) / [source](../../../../packages/ui/src/collapsible/collapsible.tsx) | `@rain-next/ui`: `Collapsible, CollapsibleTrigger, CollapsibleContent` |
| accordion | UI 源码（各自身份见JSON） | [registry/g1-assets.json#accordion](../../../../registry/g1-assets.json) | [accordion](../../../../manifests/ui/accordion.yaml) / [source](../../../../packages/ui/src/accordion/accordion.tsx) | `@rain-next/ui`: `Accordion, AccordionItem, AccordionTrigger, AccordionContent` |
| tooltip | UI 源码（各自身份见JSON） | [registry/tooltip.json#tooltip](../../../../registry/tooltip.json) | [tooltip](../../../../manifests/ui/tooltip.yaml) / [source](../../../../packages/ui/src/tooltip/tooltip.tsx) | `@rain-next/ui`: `Tooltip` |
| resizable | UI 源码（各自身份见JSON） | [registry/g1-assets.json#resizable](../../../../registry/g1-assets.json) | [resizable](../../../../manifests/ui/resizable.yaml) / [source](../../../../packages/ui/src/resizable/resizable.tsx) | `@rain-next/ui`: `ResizablePanelGroup, ResizablePanel, ResizableHandle` |

## G2

| 冻结能力键 | 实际层级 | Registry / 组合合同 | Manifest / source | 消费入口 |
| --- | --- | --- | --- | --- |
| button-group | UI 源码（各自身份见JSON） | [registry/g2-assets.json#button-group](../../../../registry/g2-assets.json) | [button-group](../../../../manifests/ui/button-group.yaml) / [source](../../../../packages/ui/src/button-group/button-group.tsx) | `@rain-next/ui`: `ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants` |
| toggle | UI 源码（各自身份见JSON） | [registry/g2-assets.json#toggle](../../../../registry/g2-assets.json) | [toggle](../../../../manifests/ui/toggle.yaml) / [source](../../../../packages/ui/src/toggle/toggle.tsx) | `@rain-next/ui`: `Toggle, toggleVariants` |
| toggle-group | UI 源码（各自身份见JSON） | [registry/g2-assets.json#toggle-group](../../../../registry/g2-assets.json) | [toggle-group](../../../../manifests/ui/toggle-group.yaml) / [source](../../../../packages/ui/src/toggle-group/toggle-group.tsx) | `@rain-next/ui`: `ToggleGroup, ToggleGroupItem` |
| spinner | UI 源码（各自身份见JSON） | [registry/g2-assets.json#spinner](../../../../registry/g2-assets.json) | [spinner](../../../../manifests/ui/spinner.yaml) / [source](../../../../packages/ui/src/loading/loading.tsx) | `@rain-next/ui`: `Spinner` |
| skeleton | UI 源码（各自身份见JSON） | [registry/g2-assets.json#skeleton](../../../../registry/g2-assets.json) | [skeleton](../../../../manifests/ui/skeleton.yaml) / [source](../../../../packages/ui/src/loading/loading.tsx) | `@rain-next/ui`: `Skeleton` |
| toast | UI 源码（各自身份见JSON） | [registry/g2-assets.json#toast](../../../../registry/g2-assets.json) | [toast](../../../../manifests/ui/toast.yaml) / [source](../../../../packages/ui/src/toast/toast.tsx) | `@rain-next/ui`: `Toaster, Toast, ToastAction, ToastClose, ToastContent, ToastDescription, ToastPortal, ToastProvider, ToastTitle, ToastViewport, createToastManager, toast, useToastManager` |

## G3

| 冻结能力键 | 实际层级 | Registry / 组合合同 | Manifest / source | 消费入口 |
| --- | --- | --- | --- | --- |
| scroll-area | UI 源码（各自身份见JSON） | [registry/token-first-g3.json#scroll-area](../../../../registry/token-first-g3.json) | [scroll-area](../../../../manifests/ui/scroll-area.yaml) / [source](../../../../packages/ui/src/scroll-area/scroll-area.tsx) | `@rain-next/ui`: `ScrollArea` |
| sheet | UI 源码（各自身份见JSON） | [registry/token-first-g3.json#sheet](../../../../registry/token-first-g3.json) | [sheet](../../../../manifests/ui/sheet.yaml) / [source](../../../../packages/ui/src/sheet/sheet.tsx) | `@rain-next/ui`: `Sheet` |
| sidebar | UI 源码（各自身份见JSON） | [registry/token-first-g3.json#sidebar](../../../../registry/token-first-g3.json) | [sidebar](../../../../manifests/ui/sidebar.yaml) / [source](../../../../packages/ui/src/sidebar/sidebar.tsx) | `@rain-next/ui`: `Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarSection, SidebarItem, SidebarTrigger` |
| breadcrumb | UI 源码（各自身份见JSON） | [registry/breadcrumb.json#breadcrumb](../../../../registry/breadcrumb.json) | [breadcrumb](../../../../manifests/ui/breadcrumb.yaml) / [source](../../../../packages/ui/src/breadcrumb/breadcrumb.tsx) | `@rain-next/ui`: `Breadcrumb` |
| command | UI 源码（各自身份见JSON） | [registry/token-first-g3.json#command](../../../../registry/token-first-g3.json) | [command](../../../../manifests/ui/command.yaml) / [source](../../../../packages/ui/src/command/command.tsx) | `@rain-next/ui`: `CommandInput, CommandList, CommandGroup, CommandGroupLabel, CommandCollection, CommandItem, CommandEmpty, Command` |
| kbd | UI 源码（各自身份见JSON） | [registry/token-first-g3.json#kbd](../../../../registry/token-first-g3.json) | [kbd](../../../../manifests/ui/kbd.yaml) / [source](../../../../packages/ui/src/kbd/kbd.tsx) | `@rain-next/ui`: `Kbd` |
| context-menu | UI 源码（各自身份见JSON） | [registry/token-first-g3.json#context-menu](../../../../registry/token-first-g3.json) | [context-menu](../../../../manifests/ui/context-menu.yaml) / [source](../../../../packages/ui/src/context-menu/context-menu.tsx) | `@rain-next/ui`: `ContextMenu` |
| hover-card | UI 源码（各自身份见JSON） | [registry/token-first-g3.json#hover-card](../../../../registry/token-first-g3.json) | [hover-card](../../../../manifests/ui/hover-card.yaml) / [source](../../../../packages/ui/src/hover-card/hover-card.tsx) | `@rain-next/ui`: `HoverCard` |
| menubar | UI 源码（各自身份见JSON） | [registry/token-first-g3.json#menubar](../../../../registry/token-first-g3.json) | [menubar](../../../../manifests/ui/menubar.yaml) / [source](../../../../packages/ui/src/menubar/menubar.tsx) | `@rain-next/ui`: `Menubar` |
| navigation-menu | UI 源码（各自身份见JSON） | [registry/token-first-g3.json#navigation-menu](../../../../registry/token-first-g3.json) | [navigation-menu](../../../../manifests/ui/navigation-menu.yaml) / [source](../../../../packages/ui/src/navigation-menu/navigation-menu.tsx) | `@rain-next/ui`: `NavigationMenu` |

## G4

| 冻结能力键 | 实际层级 | Registry / 组合合同 | Manifest / source | 消费入口 |
| --- | --- | --- | --- | --- |
| typography | Foundation复用 | [registry/g4-assets.json#typography](../../../../registry/g4-assets.json) | [typography](../../../../manifests/ui/typography.yaml) / [source](../../../../packages/foundations/src/typography-contract.ts) | `@rain-next/foundations`: `typographyPresets, typographyUtilityClassNames, resolveTypographyPreset, validateTypographyComposition, validateDataFontUsage` |
| item | UI 源码（各自身份见JSON） | [registry/g4-assets.json#item](../../../../registry/g4-assets.json) | [item](../../../../manifests/ui/item.yaml) / [source](../../../../packages/ui/src/item/item.tsx) | `@rain-next/ui`: `Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle` |
| progress | UI 源码（各自身份见JSON） | [registry/g4-assets.json#progress](../../../../registry/g4-assets.json) | [progress](../../../../manifests/ui/progress.yaml) / [source](../../../../packages/ui/src/progress/progress.tsx) | `@rain-next/ui`: `Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue` |
| chart | UI 源码（各自身份见JSON） | [charts：19项](../../../../registry/charts.json) | 19份真实图表合同及源码，见下表 | `@rain-next/ui/charts` |

**typography**：复用 Foundations 的排版合同与函数，不存在或新增名为 Typography 的 UI 包组件。

**chart**：一个冻结目录能力映射现有19个图表候选及 @rain-next/ui/charts；不声明与上游 Chart 完整对等，不把19个入口重复加入64项分母。

## G5

| 冻结能力键 | 实际层级 | Registry / 组合合同 | Manifest / source | 消费入口 |
| --- | --- | --- | --- | --- |
| label | UI 源码（各自身份见JSON） | [registry/core-ui.json#form-item](../../../../registry/core-ui.json) | [form-item](../../../../manifests/ui/form-item.yaml) / [source](../../../../packages/ui/src/input/form-item.tsx) | `@rain-next/ui`: `FormItem` |
| field | UI 源码（各自身份见JSON） | [registry/core-ui.json#form-item](../../../../registry/core-ui.json) | [form-item](../../../../manifests/ui/form-item.yaml) / [source](../../../../packages/ui/src/input/form-item.tsx) | `@rain-next/ui`: `FormItem` |
| input-group | Recipe / 本地组合 | [本地 Input Group 合同；无独立 Registry](../../../../manifests/recipes/input-group.yaml)<br>[registry/core-ui.json#input](../../../../registry/core-ui.json)<br>[registry/core-ui.json#search-input](../../../../registry/core-ui.json)<br>[registry/input-number.json#input-number](../../../../registry/input-number.json)<br>[registry/textarea.json#textarea](../../../../registry/textarea.json)<br>[registry/core-ui.json#form-item](../../../../registry/core-ui.json) | [input-group](../../../../manifests/recipes/input-group.yaml) / [组合示例](../../../../apps/playground/src/docs/components/g5-component-pages.tsx)<br>[input](../../../../manifests/ui/input.yaml) / [source](../../../../packages/ui/src/input/input.tsx)<br>[search-input](../../../../manifests/ui/search-input.yaml) / [source](../../../../packages/ui/src/input/search-input.tsx)<br>[input-number](../../../../manifests/ui/input-number.yaml) / [source](../../../../packages/ui/src/input-number/input-number.tsx)<br>[textarea](../../../../manifests/ui/textarea.yaml) / [source](../../../../packages/ui/src/textarea/textarea.tsx)<br>[form-item](../../../../manifests/ui/form-item.yaml) / [source](../../../../packages/ui/src/input/form-item.tsx) | `@rain-next/ui`: `Input`<br>`@rain-next/ui`: `SearchInput`<br>`@rain-next/ui`: `InputNumber`<br>`@rain-next/ui`: `Textarea`<br>`@rain-next/ui`: `FormItem` |
| native-select | UI 源码（各自身份见JSON） | [registry/g5-assets.json#native-select](../../../../registry/g5-assets.json) | [native-select](../../../../manifests/ui/native-select.yaml) / [source](../../../../packages/ui/src/native-select/native-select.tsx) | `@rain-next/ui`: `NativeSelect, NativeSelectOption, NativeSelectOptGroup` |
| combobox | UI 源码（各自身份见JSON） | [registry/g5-assets.json#combobox](../../../../registry/g5-assets.json) | [combobox](../../../../manifests/ui/combobox.yaml) / [source](../../../../packages/ui/src/combobox/combobox.tsx) | `@rain-next/ui`: `Combobox` |
| slider | UI 源码（各自身份见JSON） | [registry/g5-assets.json#slider](../../../../registry/g5-assets.json) | [slider](../../../../manifests/ui/slider.yaml) / [source](../../../../packages/ui/src/slider/slider.tsx) | `@rain-next/ui`: `Slider` |
| calendar | UI 源码（各自身份见JSON） | [registry/g5-assets.json#calendar](../../../../registry/g5-assets.json) | [calendar](../../../../manifests/ui/calendar.yaml) / [source](../../../../packages/ui/src/calendar/calendar.tsx) | `@rain-next/ui`: `Calendar` |
| date-picker | UI 源码（各自身份见JSON） | [registry/g5-assets.json#date-picker](../../../../registry/g5-assets.json) | [date-picker](../../../../manifests/ui/date-picker.yaml) / [source](../../../../packages/ui/src/date-picker/date-picker.tsx) | `@rain-next/ui`: `DatePicker` |

**label**：复用 FormItem 的标签、必填说明与控件关联；没有新增独立 Label 导出，与 Field 共用同一资产。

**field**：复用 FormItem 与现有字段组合；没有新增通用 Field 状态引擎，与 Label 共用同一资产。

**input-group**：本地组合 Recipe 合同；行内复用 Input/SearchInput/InputNumber，多行复用 Textarea blockStart/blockEnd。没有 InputGroup 公开导出或可安装 Registry 条目；不支持多个独立字段共框。

**native-select**：NativeSelect 源码与公开 API 保留兼容；2026-10-13 按用户决策把目录及新业务示例合并到 Select，旧 #native-select 打开 Select。不能因没有独立目录卡片判为缺项。

## G6

| 冻结能力键 | 实际层级 | Registry / 组合合同 | Manifest / source | 消费入口 |
| --- | --- | --- | --- | --- |
| data-table | Recipe / 本地组合 | [registry/g6-assets.json#data-table](../../../../registry/g6-assets.json) | [data-table](../../../../manifests/recipes/data-table.yaml) / [source](../../../../apps/prototype/src/data-table-recipe.tsx) | `复制 Recipe 源码`: `DataTableRecipe` |
| aspect-ratio | UI 源码（各自身份见JSON） | [registry/g6-assets.json#aspect-ratio](../../../../registry/g6-assets.json) | [aspect-ratio](../../../../manifests/ui/aspect-ratio.yaml) / [source](../../../../packages/ui/src/aspect-ratio/aspect-ratio.tsx) | `@rain-next/ui`: `AspectRatio` |
| attachment | UI 源码（各自身份见JSON） | [registry/g6-assets.json#attachment](../../../../registry/g6-assets.json) | [attachment](../../../../manifests/ui/attachment.yaml) / [source](../../../../packages/ui/src/attachment/attachment.tsx) | `@rain-next/ui`: `Attachment, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction, AttachmentTrigger, AttachmentGroup` |
| drawer | UI 源码（各自身份见JSON） | [registry/g6-assets.json#drawer](../../../../registry/g6-assets.json) | [drawer](../../../../manifests/ui/drawer.yaml) / [source](../../../../packages/ui/src/drawer/drawer.tsx) | `@rain-next/ui`: `Drawer, DrawerPortal, DrawerOverlay, DrawerSwipeHandle, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerDescription` |
| input-otp | UI 源码（各自身份见JSON） | [registry/g6-assets.json#input-otp](../../../../registry/g6-assets.json) | [input-otp](../../../../manifests/ui/input-otp.yaml) / [source](../../../../packages/ui/src/input-otp/input-otp.tsx) | `@rain-next/ui`: `InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator` |
| carousel | UI 源码（各自身份见JSON） | [registry/g6-assets.json#carousel](../../../../registry/g6-assets.json) | [carousel](../../../../manifests/ui/carousel.yaml) / [source](../../../../packages/ui/src/carousel/carousel.tsx) | `@rain-next/ui`: `Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel, CarouselControls, CarouselIndicators, CarouselPlaybackControl` |
| direction | UI 源码（各自身份见JSON） | [registry/g6-assets.json#direction](../../../../registry/g6-assets.json) | [direction](../../../../manifests/ui/direction.yaml) / [source](../../../../packages/ui/src/direction/direction.ts) | `@rain-next/ui`: `DirectionProvider, useDirection` |
| bubble | UI 源码（各自身份见JSON） | [registry/g6-assets.json#bubble](../../../../registry/g6-assets.json) | [bubble](../../../../manifests/ui/bubble.yaml) / [source](../../../../packages/ui/src/bubble/bubble.tsx) | `@rain-next/ui`: `Bubble, BubbleGroup, BubbleContent, BubbleReactions` |
| marker | UI 源码（各自身份见JSON） | [registry/g6-assets.json#marker](../../../../registry/g6-assets.json) | [marker](../../../../manifests/ui/marker.yaml) / [source](../../../../packages/ui/src/marker/marker.tsx) | `@rain-next/ui`: `Marker, MarkerIcon, MarkerContent, markerVariants` |
| message | UI 源码（各自身份见JSON） | [registry/g6-assets.json#message](../../../../registry/g6-assets.json) | [message](../../../../manifests/ui/message.yaml) / [source](../../../../packages/ui/src/message/message.tsx) | `@rain-next/ui`: `Message, MessageGroup, MessageAvatar, MessageContent, MessageHeader, MessageFooter` |
| message-scroller | UI 源码（各自身份见JSON） | [registry/g6-assets.json#message-scroller](../../../../registry/g6-assets.json) | [message-scroller](../../../../manifests/ui/message-scroller.yaml) / [source](../../../../packages/ui/src/message-scroller/message-scroller.tsx) | `@rain-next/ui`: `MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility` |
| questionnaire | UI 源码（各自身份见JSON） | [registry/g6-assets.json#questionnaire](../../../../registry/g6-assets.json) | [questionnaire](../../../../manifests/ui/questionnaire.yaml) / [source](../../../../packages/ui/src/questionnaire/questionnaire.tsx) | `@rain-next/ui`: `Questionnaire, QuestionnaireProgress, QuestionnaireItem, QuestionnaireTitle, QuestionnaireDescription, QuestionnaireChoices, QuestionnaireChoice, QuestionnaireChoiceDescription, QuestionnaireInput, QuestionnaireError, QuestionnaireActions, QuestionnairePrevious, QuestionnaireSkip, QuestionnaireNext, QuestionnaireSubmit` |

**data-table**：已有 Prototype DataTableRecipe 作为可复制 Recipe 登记，不是 @rain-next/ui 的 DataTable 或高级 DataGrid 导出。保持 TanStack 8.21.3，固定上游研究文档已使用 v9；旧 Recipe 或页面验收不转移为新候选整体验收。

**attachment**：附件 UI 与后继工作流、局部预览视觉接受分开；不从该局部接受推导 G6 整组通过。

**drawer**：独立 Drawer 的手势与吸附能力，不把 Sheet 别名作为第二项完成。

**carousel**：保留本组件后继局部视觉/交互接受范围；不转移给 G6 整组或对比度。

**questionnaire**：2026-10-16 控件复用后继的专项检查独立登记；该后继 Human Gate 仍待人工审阅。

## Chart 单项对应的19个候选

| Registry条目 | Manifest / source | 公开入口 |
| --- | --- | --- |
| registry/charts.json#chart-area | [chart-area](../../../../manifests/ui/chart-area.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/area-chart.tsx) | `@rain-next/ui/charts`: `AreaChart` |
| registry/charts.json#chart-line | [chart-line](../../../../manifests/ui/chart-line.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/line-chart.tsx) | `@rain-next/ui/charts`: `LineChart` |
| registry/charts.json#chart-bar | [chart-bar](../../../../manifests/ui/chart-bar.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/bar-chart.tsx) | `@rain-next/ui/charts`: `BarChart` |
| registry/charts.json#chart-composed | [chart-composed](../../../../manifests/ui/chart-composed.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/composed-chart.tsx) | `@rain-next/ui/charts`: `ComposedChart` |
| registry/charts.json#chart-pie | [chart-pie](../../../../manifests/ui/chart-pie.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/pie-chart.tsx) | `@rain-next/ui/charts`: `PieChart` |
| registry/charts.json#chart-ring | [chart-ring](../../../../manifests/ui/chart-ring.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/ring-chart.tsx) | `@rain-next/ui/charts`: `RingChart` |
| registry/charts.json#chart-radar | [chart-radar](../../../../manifests/ui/chart-radar.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/radar-chart.tsx) | `@rain-next/ui/charts`: `RadarChart` |
| registry/charts.json#chart-scatter | [chart-scatter](../../../../manifests/ui/chart-scatter.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/scatter-chart.tsx) | `@rain-next/ui/charts`: `ScatterChart` |
| registry/charts.json#chart-funnel | [chart-funnel](../../../../manifests/ui/chart-funnel.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/funnel-chart.tsx) | `@rain-next/ui/charts`: `FunnelChart` |
| registry/charts.json#chart-gauge | [chart-gauge](../../../../manifests/ui/chart-gauge.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/gauge.tsx) | `@rain-next/ui/charts`: `Gauge` |
| registry/charts.json#chart-sankey | [chart-sankey](../../../../manifests/ui/chart-sankey.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/sankey/sankey-chart.tsx) | `@rain-next/ui/charts`: `SankeyChart` |
| registry/charts.json#chart-sunburst | [chart-sunburst](../../../../manifests/ui/chart-sunburst.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/sunburst-chart.tsx) | `@rain-next/ui/charts`: `SunburstChart` |
| registry/charts.json#chart-heatmap | [chart-heatmap](../../../../manifests/ui/chart-heatmap.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/heatmap/heatmap-chart.tsx) | `@rain-next/ui/charts`: `HeatmapChart` |
| registry/charts.json#chart-choropleth | [chart-choropleth](../../../../manifests/ui/chart-choropleth.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/choropleth/choropleth-chart.tsx) | `@rain-next/ui/charts`: `ChoroplethChart` |
| registry/charts.json#chart-candlestick | [chart-candlestick](../../../../manifests/ui/chart-candlestick.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/candlestick-chart.tsx) | `@rain-next/ui/charts`: `CandlestickChart` |
| registry/charts.json#chart-profit-loss | [chart-profit-loss](../../../../manifests/ui/chart-profit-loss.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/profit-loss-line.tsx) | `@rain-next/ui/charts`: `ProfitLossLine` |
| registry/charts.json#chart-live-line | [chart-live-line](../../../../manifests/ui/chart-live-line.yaml) / [source](../../../../packages/ui/src/charts/vendor/charts/live-line-chart.tsx) | `@rain-next/ui/charts`: `LiveLineChart` |
| registry/charts.json#chart-matrix | [chart-matrix](../../../../manifests/ui/chart-matrix.yaml) / [source](../../../../packages/ui/src/charts/matrix/matrix-chart.tsx) | `@rain-next/ui/charts`: `MatrixChart` |
| registry/charts.json#chart-network | [chart-network](../../../../manifests/ui/chart-network.yaml) / [source](../../../../packages/ui/src/charts/network/network-chart.tsx) | `@rain-next/ui/charts`: `NetworkChart` |

## 特别边界

- NativeSelect 兼容 API 保留，但旧 `#native-select` 打开 `#select`，由已授权的统一选择改造决定；不重建独立目录卡片。
- Label / Field 共用 FormItem；Input Group 没有新增公开组件；Typography 不改写成 UI 组件。
- Data Table 保留 Prototype Recipe 层级及 TanStack版本差异，不当作公共高级 DataGrid。
- 冻结规划输入、旧 Registry、Manifest、阶段文件及旧证据没有因本结构映射被改写。
- 发布、业务迁移、对比度、屏幕阅读器、真实设备和全库 Human Gate 不由此文件关闭。
