# M04 当前覆盖矩阵

本矩阵是本次检查的只读证据快照，不是生产 inventory。生产数据只从 Manifest/Registry/源码导出与唯一路由生成。

快照 sourceDigest：`4f1c889423b066f75300810fdbcfa88b96207b501a4fca1d9dac3ea39e382cc9`。140 项、26 家族、9 任务；统计反映此输入集合，不限制后续新增。

## 附件与附件流程

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| recipe-attachment-workflow | recipe / public-import | AttachmentPicker, AttachmentList, AttachmentPreview, useAttachmentUpload, createAttachmentXhrUploader, useAttachmentObjectUrl, downloadAttachment, getAttachmentKind, attachmentTypeLabel, formatAttachmentSize, isSafeAttachmentUrl, validateAttachmentFiles | fill-validate, read-communicate | #attachment | fb312479b977f32076d57f6864e995a812ae722ab73d13e3061b7c01ae8e2ac0 |
| ui-attachment | root / public-import | Attachment, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction, AttachmentTrigger, AttachmentGroup | read-communicate, identify | #attachment | abc2d923b1b0810c74b3ed654b7fbe9f0dfeb64013ce86d66618b2d572ff342e |
## 人物与群体头像

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-avatar-grid | composition / public-import | AvatarGrid | identify | #avatar | cad0ccb526aa3e3d8476c0840e5e685b5ca1f6f8d366bc547ad7732f1041f9f4 |
| ui-avatar-group | composition / public-import | AvatarGroup | identify | #avatar | 007f6908996c4c13a5048a68e29c9f2cc888a83d8e03cc98debaadae07874b5b |
| ui-avatar | root / public-import | Avatar | identify | #avatar | d25862067685b944bb68890044f064705cbdc4b20ea28d2879f1c982c2cdddb8 |
## 动作与工具状态

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-button-group | composition / public-import | ButtonGroup, ButtonGroupText, ButtonGroupSeparator, buttonGroupVariants | act-feedback, organize | #button-group | 89c70b9a5a8fa1698872af380049ff0e2a71ec5bae186a4c1bd759c2d31f6f9d |
| ui-button | root / public-import | Button | act-feedback | #button-tokens, #text-button, #text-button-help | 549935029b8c7f86d27ac91316f4e7eb06c3ab7574c17116c8da2b4b5f93a11f |
| ui-icon-button | root / public-import | IconButton | act-feedback | #icon-button, #icon-sizes | 90e8cbe1cc0f4630e8b4d7b14bd90aa4aea4304351836f5b1f84300bc1cbe1e4 |
| ui-link | root / public-import | Link | navigate | manifests/ui/link.yaml + packages/ui/src/link/link.tsx | 0d77be8c90aee5c9759d11494f82e8e68e82977f456acc0fcc2ae77c524c9ec0 |
| ui-toggle-group | composition / public-import | ToggleGroup, ToggleGroupItem | act-feedback, choose | #toggle-group | 927d1dd5ececb5255dbe6c92a7bff65e59ccf821576dca0f5e5663f507484cf1 |
| ui-toggle | root / public-import | Toggle, toggleVariants | act-feedback | #toggle | 1c1b12a7fa20fa5960ba0417d4aa82fa9ea65cc9ee11cfa33f83d89410f25759 |
## 图表与数据合同

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-chart-area | root / public-import | AreaChart | analyze | #chart-area, #chart-business, #chart-category | 971ceee9ea5c72afa121704e2e6918d0f5cb9a119afed43b2c3512245f3f60e8 |
| ui-chart-bar | root / public-import | BarChart | analyze | #chart-bar, #chart-business | 39c5a782122c2d16dbbf34b5b051fa5e9a45f28ce4c79c9069b66f5466fa1673 |
| ui-chart-candlestick | root / public-import | CandlestickChart | analyze | #chart-candlestick | 7380481440650a7a68e9f8b74f2f2fbc63cb28af52b1fd9b38f8e346e0bcb76d |
| ui-chart-choropleth | root / public-import | ChoroplethChart | analyze | #chart-choropleth, #chart-china | 30dbed6a8a217fb4a412c8818e2250948865fc8ae33f7d88a2753ce7a405991c |
| ui-chart-composed | root / public-import | ComposedChart | analyze | #chart-composed, #chart-category | a493d5ba3edaac81200d87a210ca33c6d8118c7ab58c92df5cdf91e1aadc8339 |
| ui-chart-funnel | root / public-import | FunnelChart | analyze | #chart-funnel | eb8ad091d56693f1b712ef2e7787701d7287a5156f0f0a6ac9e8a3488c5dff4e |
| ui-chart-gauge | root / public-import | Gauge | analyze | #chart-gauge | 1120c8c9e61b221a05c640bb61a5997ae7cf9b04bb10c424077373eca8ae562a |
| ui-chart-heatmap | root / public-import | HeatmapChart | analyze | #chart-heatmap | 3fdea6fd2cd14106c2b5627e587ed99b649504f2a163693b2485092045bdee31 |
| ui-chart-line | root / public-import | LineChart | analyze | #chart-line, #chart-business, #chart-category | d885742b4d143f234324ebf56499df1a9acbbe6822a056ae69bc167bcce0517c |
| ui-chart-live-line | root / public-import | LiveLineChart | analyze | #chart-live-line | c3db03adf175e868b1130d6660525ce7d2e2333e773d09cd3b4af1bd7cd43866 |
| ui-chart-matrix | root / public-import | MatrixChart | analyze | #chart-matrix | 7f54902c1e8bb9fa7e24b56ea7016acd833d61cb16bf47838143733f77533519 |
| ui-chart-network | root / public-import | NetworkChart | analyze | #chart-network | eb8ec2ab3bac5c5c2f8de8c6784e3bb8fe8b69c097a66098c6f9dc9fcdc67a4e |
| ui-chart-pie | root / public-import | PieChart | analyze | #chart-pie, #chart-business | e2f67aae597170a121d2522af5f1996c653e962602e8e7589a6892253b8066c1 |
| ui-chart-profit-loss | specialization / public-import | ProfitLossLine | analyze | #chart-profit-loss | 13cb079c85b76bf1b3ecda73f860892b87a97f0432b84b9315d17d6bb296df80 |
| ui-chart-radar | root / public-import | RadarChart | analyze | #chart-radar | 0cc865cbc43a2af3b72e770d88acd1ac714fa2c8fcd7df33921c3336fcbcdfc8 |
| ui-chart-ring | root / public-import | RingChart | analyze | #chart-ring, #chart-business | ea56ec9e639449e9b145987530e5b04a4145f029728cccac37767f38a88e90ef |
| ui-chart-sankey | root / public-import | SankeyChart | analyze | #chart-sankey | 8a08920ba8d43439ca5cd6f07c5b6f78fad4502308bf7daca1e6e3686118d13d |
| ui-chart-scatter | root / public-import | ScatterChart | analyze | #chart-scatter | 29b93aa85e9549bfbd77e2df2552553fd83cfcb4b93c389ec023f4bc380d8114 |
| ui-chart-sunburst | root / public-import | SunburstChart | analyze | #chart-sunburst | 21cf1979a3479c8434c569796d141b57e1b2600d386da422709a8252530e3435 |
## 可搜索命令

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-command | root / public-import | CommandInput, CommandList, CommandGroup, CommandGroupLabel, CommandCollection, CommandItem, CommandEmpty, Command, Command.Input, Command.List, Command.Group, Command.GroupLabel, Command.Collection, Command.Item, Command.Empty | act-feedback, choose | #command | f502995789d8fe92c82aa0fc662f270fd0a611e5496290497ed16ffdd8f003d0 |
## 日期与时间字段

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-calendar | root / public-import | Calendar | choose, fill-validate | #calendar | d1ce9af56aaeecc0e0aa0bba9fa6597aeb0b8975f7b10956388f3e168541eda0 |
| ui-date-picker | composition / public-import | DatePicker | fill-validate, choose | #date-picker | 4e8a190a459a705545a34cc41eb10ac16746d75af679c38d4b1af730abac9103 |
## 对话框与边缘面板

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-alert-dialog | specialization / public-import | AlertDialog, AlertDialog.Root, AlertDialog.Trigger, AlertDialog.Content, AlertDialog.Header, AlertDialog.Body, AlertDialog.Footer, AlertDialog.Title, AlertDialog.Description, AlertDialog.Close | act-feedback | #dialog | ccc2767a19e2c80ff0cbb174cfa3499c26145250040c83ea277b270f4fae99b5 |
| ui-dialog | root / public-import | Dialog, Dialog.Root, Dialog.Trigger, Dialog.Content, Dialog.Header, Dialog.Body, Dialog.Footer, Dialog.Title, Dialog.Description, Dialog.Close | act-feedback, organize | #dialog | ccc2767a19e2c80ff0cbb174cfa3499c26145250040c83ea277b270f4fae99b5 |
| ui-drawer | root / public-import | Drawer, DrawerPortal, DrawerOverlay, DrawerSwipeHandle, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerDescription | organize, act-feedback | #drawer | 75b35c86e6e5add91e1801b6fa383daefbbd7b6d260db88b134765c99069bcc9 |
| ui-sheet | root / public-import | Sheet, Sheet.Root, Sheet.Trigger, Sheet.Portal, Sheet.Backdrop, Sheet.Content, Sheet.Header, Sheet.Body, Sheet.Footer, Sheet.Title, Sheet.Description, Sheet.Close | organize, act-feedback | #sheet | 328bf3774a72ec8858aa47120cc4bb7c8d2f20ac983af84465a61ccaef81868d |
## 文字、数值与字段容器

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| recipe-input-group | usage-reference / usage-reference | 无独立导出，用法参考 | fill-validate | #input-group | 15f7363ad2fff980bc2117b5d84fb260b3f6fd2ed72c4070d02e9e4e86950a62 |
| ui-form-item | root / public-import | FormItem | fill-validate | #input, #label, #field | 384e95d4804d3e75514df87646c90bf7cfd9f31e8a3aa9861803eef94432fe8a |
| ui-input-number | root / public-import | InputNumber | fill-validate | #input-number | a857cdc6d8de55a3725aa1cae9d6f8e6f704b4d98cc4098dc124a1e9cd789432 |
| ui-input-otp | root / public-import | InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator | fill-validate | #input-otp | 89a756865e168a5d747a24df5c579c463f67cb929be0b5dfe1ebfb884d8da6c5 |
| ui-input | root / public-import | Input | fill-validate | #input | 15aa2de4b234ce27c29fba52173a70e4dac5b320fd06d31464207cdecf402223 |
| ui-search-input | specialization / public-import | SearchInput | choose, fill-validate | #input | 4d2ac56edf058f0d4b0495cf2bcaa8c314c01775a582e71f7778bd8218617565 |
| ui-textarea | root / public-import | Textarea | fill-validate, read-communicate | manifests/ui/textarea.yaml + packages/ui/src/textarea/textarea.tsx | 52ac971ae94262429fb14fdbecd5110b8fea0a603b23a691f532f52c30e66796 |
## 排列、展开与滚动

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| layout-grid | layout / public-import | Grid | organize | #layouts | 5bcbcdbe967f940f852fae3de6967b7d726a624ad6cae7a2f5515828c6bb5c7a |
| layout-inline | layout / public-import | Inline | organize | #layouts | 5bcbcdbe967f940f852fae3de6967b7d726a624ad6cae7a2f5515828c6bb5c7a |
| layout-split | layout / public-import | Split, Split.Root, Split.Main, Split.Sidebar | organize | #layouts | 5bcbcdbe967f940f852fae3de6967b7d726a624ad6cae7a2f5515828c6bb5c7a |
| layout-stack | layout / public-import | Stack | organize | #layouts | 5bcbcdbe967f940f852fae3de6967b7d726a624ad6cae7a2f5515828c6bb5c7a |
| ui-accordion | root / public-import | Accordion, AccordionItem, AccordionTrigger, AccordionContent | organize, read-communicate | #accordion | e3cf937ef64e666c4ce41080b56c8e54b2630a4484645f9a7e4c13dde8b6bdb8 |
| ui-aspect-ratio | layout / public-import | AspectRatio | organize | #aspect-ratio | 9cd787af615c6737b88e1566c851d0fbe2e06eb5a99d7b579f7ee73b82fedd61 |
| ui-carousel | root / public-import | Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel, CarouselControls, CarouselIndicators, CarouselPlaybackControl | navigate, read-communicate | #carousel | 7f88b97494a91036e8ec7d9ce0f6caae4711ce7a0f894071ae56f3fe9f5f5fb0 |
| ui-collapsible | root / public-import | Collapsible, CollapsibleTrigger, CollapsibleContent | organize, read-communicate | #collapsible | 446ded759a2d98869df83e1a58906ef86aefa86a8d192fe59fcbad43338e5db8 |
| ui-direction | helper / public-import | DirectionProvider, useDirection | organize | #direction | cbd43760d78079f4b0f03bbbff306c63d6f5d7251d9ffceb494696f49d0f45f4 |
| ui-resizable | layout / public-import | ResizablePanelGroup, ResizablePanel, ResizableHandle | organize | #resizable | 84057b7d27429f31189525d298dd6eeb6c2396f4aa2d2d18bff66773d8a91692 |
| ui-scroll-area | layout / public-import | ScrollArea, ScrollArea.Root, ScrollArea.Viewport, ScrollArea.Content, ScrollArea.Scrollbar, ScrollArea.Thumb, ScrollArea.Corner | organize, read-communicate | #scroll-area | edd0d79cd5ca6a1502623803170109d4539dee70f8e552eebbc886f7942e73e4 |
| ui-separator | helper / public-import | Separator | organize | #dialog | 052bec81d01b9c59cb2923888f2e8910cceccd8ceb6629333c8119b1a4941151 |
## 加载、结果与操作反馈

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-alert | root / public-import | Alert, AlertTitle, AlertDescription, AlertActions | act-feedback | #alert | 44588b6a96e5cc57a562abc2ada0d692407a7866487ab087b31f80a4cd39ae28 |
| ui-empty | root / public-import | Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyActions | act-feedback, read-communicate | #table | 4ead8c1cd0897f86d41b076eb7de21bc521561d1dc75c056c3726e75baf8ec3e |
| ui-progress | root / public-import | Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue | act-feedback | #progress | 334baeb8d1a6c58e8a32f35683cdbd2154830c61673047f501cb30d7314695b6 |
| ui-skeleton | helper / public-import | Skeleton | act-feedback | #skeleton | 508f00cb670c6d6546fe71f5efd4a9a02f31f93458129aa1bcd64dee1d6f4def |
| ui-spinner | helper / public-import | Spinner | act-feedback | #spinner | 508f00cb670c6d6546fe71f5efd4a9a02f31f93458129aa1bcd64dee1d6f4def |
| ui-toast | root / public-import | Toaster, Toast, ToastAction, ToastClose, ToastContent, ToastDescription, ToastPortal, ToastProvider, ToastTitle, ToastViewport, createToastManager, toast, useToastManager | act-feedback | #toast | 31af1beb00b1e9b9dd9168ee37a7d468e2c18df5f4ba33b60783a88cda86b2ba |
## 会话展示、阅读与输入

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| recipe-conversation-composer | recipe / public-import | ConversationComposer | read-communicate, fill-validate | #conversation-composer | 27bb18845f11bad563c5fa27714edfcd3bf8e760aea1f10818e7718c5ca1fcd9 |
| ui-bubble | root / public-import | Bubble, BubbleGroup, BubbleContent, BubbleReactions | read-communicate | #bubble | 0be2e43107750bbbef7ae60c18b358e08128a6b7beb165f859383cab706e2411 |
| ui-marker | helper / public-import | Marker, MarkerIcon, MarkerContent, markerVariants | read-communicate, identify | #marker | 1aff170098fcf38c8b82e28240a5be720c293be4b0ad09434c540fdc4837a0a6 |
| ui-message-scroller | root / public-import | MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility | read-communicate | #message-scroller | e5a439e359f30b58671fc9927c9c157d635a094833a791093daa46985a9070d3 |
| ui-message | root / public-import | Message, MessageGroup, MessageAvatar, MessageContent, MessageHeader, MessageFooter | read-communicate | #message | 7574bc7c48db4b7610af994a5bb2ed79b655d5ce556547c0d80bad03fc33ab86 |
## 页面、范围与内容导航

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-breadcrumb | composition / public-import | Breadcrumb, Breadcrumb.List, Breadcrumb.Item, Breadcrumb.Link, Breadcrumb.Text, Breadcrumb.Page, Breadcrumb.Separator, Breadcrumb.Ellipsis, Breadcrumb.Back, Breadcrumb.Menu | navigate | #breadcrumb | 27ebf315ba0cbb8764ae246621ba1a2716bd4e5a716db822d32db5e4d38fb797 |
| ui-navigation-bar | root / public-import | NavigationBar | navigate | #navigation-v042, #navigation-bar | a1c01be7dd9b6d5b46e4aa132e4d7b59a4e001eaf8934e0b19b716e7dc36ad79 |
| ui-navigation-list | root / public-import | NavigationList | navigate | #navigation-v042, #navigation-list | 74ea3796b3062d546279dc6912b2e67c0ccb148cfcff042fd6c13721bd94c62d |
| ui-navigation-menu | root / public-import | NavigationMenu, NavigationMenu.Root, NavigationMenu.List, NavigationMenu.Item, NavigationMenu.Trigger, NavigationMenu.Content, NavigationMenu.Link, NavigationMenu.Viewport, NavigationMenu.Positioner, NavigationMenu.Portal, NavigationMenu.Popup, NavigationMenu.Arrow, NavigationMenu.Backdrop | navigate | #navigation-menu | 48f3c76f56c64349fbf2e256e189a3ede142e0cb844414f420f5b7615eadd52f |
| ui-navigation-tabs | specialization / public-import | NavigationTabs, NavigationTabs.Root, NavigationTabs.Nav, NavigationTabs.Panels | navigate | #navigation-v042, #navigation-tabs | a1c01be7dd9b6d5b46e4aa132e4d7b59a4e001eaf8934e0b19b716e7dc36ad79 |
| ui-object-navigator | root / public-import | ObjectNavigator | navigate, workbench | #navigation-v042, #object-navigator | 74ea3796b3062d546279dc6912b2e67c0ccb148cfcff042fd6c13721bd94c62d |
| ui-scope-navigation | composition / public-import | ScopeNavigation | navigate, workbench | #navigation-v042, #scope-navigation | a1c01be7dd9b6d5b46e4aa132e4d7b59a4e001eaf8934e0b19b716e7dc36ad79 |
| ui-sidebar | composition / public-import | Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarSection, SidebarItem, SidebarTrigger | navigate, organize | #sidebar | a7c48c6fa67d60b48e5fbae80a0c7aea9af666e79250c9ddc9eefb6d0f47dbf3 |
| ui-tabs | root / public-import | Tabs, Tabs.Root, Tabs.Nav, Tabs.Panels | navigate | #tabs | 51467459cc980c28965a6ed51499ac4c097b8f62d20cb161bb6ab611ea538826 |
## 锚定浮层与菜单

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-context-menu | root / public-import | ContextMenu, ContextMenu.Root, ContextMenu.Trigger, ContextMenu.Portal, ContextMenu.Positioner, ContextMenu.Popup, ContextMenu.Item, ContextMenu.LinkItem, ContextMenu.Separator, ContextMenu.Group, ContextMenu.GroupLabel, ContextMenu.CheckboxItem, ContextMenu.RadioItem, ContextMenu.RadioGroup, ContextMenu.SubmenuRoot, ContextMenu.SubmenuTrigger | act-feedback | #context-menu | 415339128e58b2d27263c5b8a274250228a0bcb5bb8677c04c9f540635a3b6ef |
| ui-dropdown-menu | root / public-import | DropdownMenu, DropdownMenu.Root, DropdownMenu.Trigger, DropdownMenu.Content, DropdownMenu.Item, DropdownMenu.LinkItem, DropdownMenu.CheckboxItem, DropdownMenu.RadioGroup, DropdownMenu.RadioItem, DropdownMenu.SubmenuRoot, DropdownMenu.SubmenuTrigger, DropdownMenu.Group, DropdownMenu.GroupLabel, DropdownMenu.Separator, DropdownMenu.ItemContent | act-feedback | #dropdown | b79118bdc3401d3aeab5cf38b794028771fbbe0c6f5d1a1e625b5c054c70f4cc |
| ui-hover-card | root / public-import | HoverCard, HoverCard.Root, HoverCard.Trigger, HoverCard.Portal, HoverCard.Positioner, HoverCard.Popup, HoverCard.Arrow | read-communicate | #hover-card | c3712d235a357344e092ab7c8022e7eb7b952157afea37b1005d36296060f19e |
| ui-menubar | root / public-import | Menubar, Menubar.Root, Menubar.Menu, Menubar.Trigger, Menubar.Positioner, Menubar.Popup, Menubar.Item, Menubar.LinkItem, Menubar.Separator, Menubar.Group, Menubar.GroupLabel, Menubar.SubmenuRoot, Menubar.SubmenuTrigger | act-feedback | #menubar | f2eab6788af66bb47852dacf11a3fb0e45057c443cf3fd4b22fc10c8f29978c9 |
| ui-popover | root / public-import | Popover, Popover.Root, Popover.Trigger, Popover.Content, Popover.Title, Popover.Description, Popover.Close | act-feedback | #dropdown | 11c0d87ea785d2bbeb90687082d2fc0479ecf6f09c2a0b0dc084a0aa237d8b49 |
| ui-tooltip | root / public-import | Tooltip | read-communicate | #tooltip | d23bc3d21c01ae7686eea781d0ee6fcb5d561f26f4d76529b410221fba8b1fb9 |
## 题号与逐题作答

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-question-number | root / public-import | QuestionNumber | navigate, workbench | #question-number | 2cfb90da3b3fee39e61d243496bd65891dd619a77859e8286c1fa28b7043b5f1 |
| ui-questionnaire | root / public-import | Questionnaire, QuestionnaireProgress, QuestionnaireItem, QuestionnaireTitle, QuestionnaireDescription, QuestionnaireChoices, QuestionnaireChoice, QuestionnaireChoiceDescription, QuestionnaireInput, QuestionnaireError, QuestionnaireActions, QuestionnairePrevious, QuestionnaireSkip, QuestionnaireNext, QuestionnaireSubmit | fill-validate, workbench | #questionnaire | 7e9aacd9bd0ae79722932efefcee76334bd41c4b69fc94472be7f9e40d4b9d0b |
## 候选选择

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-combobox | root / public-import | Combobox | choose, fill-validate | #combobox | 3cd044eaa97a53c1a49d40bf3a64aacd646d82be064635436ced961ef5959cb4 |
| ui-native-select | compatibility / public-import | NativeSelect, NativeSelectOption, NativeSelectOptGroup | choose, fill-validate | #native-select | 889de024335afd2cef28d5ad9961643b3ec1541d4e74f6dcd8a6ce0dd58164dd |
| ui-select | root / public-import | Select | choose, fill-validate | #select | b5c663fa7fd56b62540f0a07eb2358d4185b5485c51307e644227da25cd4fcaa |
## 选择输入与选择卡片

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| recipe-checkbox-object-card | recipe / public-import | CheckboxObjectCard | choose | #selection-cards | 640b5e49d8b339fb7657f60cf6fa0d0c1310b7b1a0b59c5028eda54f8d792d72 |
| recipe-radio-card-with-preview | recipe / public-import | RadioCardWithPreview | choose | #selection-cards | 640b5e49d8b339fb7657f60cf6fa0d0c1310b7b1a0b59c5028eda54f8d792d72 |
| recipe-radio-comparison-card | recipe / public-import | RadioComparisonCard | choose | #selection-cards | 640b5e49d8b339fb7657f60cf6fa0d0c1310b7b1a0b59c5028eda54f8d792d72 |
| recipe-radio-preview-card | recipe / public-import | RadioPreviewCard | choose | #selection-cards | 640b5e49d8b339fb7657f60cf6fa0d0c1310b7b1a0b59c5028eda54f8d792d72 |
| ui-checkbox-card | specialization / public-import | CheckboxCard | choose, fill-validate | #selection-playground, #selection-cards | 9834933982dca3f88cadff8da56e88631f204d999444c4f8aa6ec1a101a69e23 |
| ui-checkbox-group | composition / public-import | CheckboxGroup | choose, fill-validate | #selection-playground, #checkbox | fdbc62892d8745700eff73cfc95c4a2df5ba5794e642208184a8277c0e995890 |
| ui-checkbox | root / public-import | Checkbox | choose, fill-validate | #checkbox | fdbc62892d8745700eff73cfc95c4a2df5ba5794e642208184a8277c0e995890 |
| ui-option-button | composition / public-import | OptionGroup, OptionButton | choose, fill-validate | #option-button | 8e2a8173845b983d818482862103043fc09b1020e7e719fd5a9807f922a3717c |
| ui-radio-card | specialization / public-import | RadioCard | choose, fill-validate | #selection-playground, #selection-cards | 9834933982dca3f88cadff8da56e88631f204d999444c4f8aa6ec1a101a69e23 |
| ui-radio-group | composition / public-import | RadioGroup | choose, fill-validate | #selection-playground, #radio | 06288790ef128aee52f920c13ab0d469de15500f0e37ae87b345d0250dbeedc0 |
| ui-radio | root / public-import | Radio | choose, fill-validate | #radio | 06288790ef128aee52f920c13ab0d469de15500f0e37ae87b345d0250dbeedc0 |
| ui-segmented-control | specialization / public-import | SegmentedControl | choose | #navigation-v042, #segmented-control | 74ea3796b3062d546279dc6912b2e67c0ccb148cfcff042fd6c13721bd94c62d |
## 跨组件选择模式

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| pattern-dependent-fields | pattern / source-copy | DependentFields | choose, workbench | #selection-patterns | a24a1c686ec25f0ef199ceff993a14333b5472f2b59db8c0711466d643889514 |
| pattern-independent-preview | pattern / source-copy | IndependentPreview | choose, workbench | #selection-patterns | a24a1c686ec25f0ef199ceff993a14333b5472f2b59db8c0711466d643889514 |
| pattern-page-selection | pattern / source-copy | PageSelection | choose, workbench | #selection-patterns | a24a1c686ec25f0ef199ceff993a14333b5472f2b59db8c0711466d643889514 |
## 滑动数值选择

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-slider | root / public-import | Slider | choose, fill-validate | #slider | 176b3c856f545615aff5de7217012b219b67b990a05f39efc3faa619742ce414 |
## 状态与附着提示

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-activity-overlay | helper / public-import | ActivityOverlay | act-feedback, identify | #avatar | ff6038bf48ba804c39384622a943d84c316640d3f55a6623d3e7d7a0f5d9001b |
| ui-badge | helper / public-import | Badge | identify | manifests/ui/badge.yaml + packages/ui/src/badge/badge.tsx | 4db4f71b24a24cd378434a89795f56e703056d469c6acac441dbd08a97790085 |
| ui-status-indicator-group | composition / public-import | StatusIndicatorGroup | identify | #avatar | ff6038bf48ba804c39384622a943d84c316640d3f55a6623d3e7d7a0f5d9001b |
| ui-status-indicator | root / public-import | StatusIndicator | identify | #avatar | ff6038bf48ba804c39384622a943d84c316640d3f55a6623d3e7d7a0f5d9001b |
## 内容表面与内容结构

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-card | root / public-import | Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter | organize, read-communicate | #card | b8bfdf63dab7e50dcb1f4db4b0ec3ea45a02aa7caad50f7d4375290dd38263d7 |
| ui-item | root / public-import | Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle | organize, read-communicate | #item | 5283d45e1066f3bc0d4794612413c5c037d24befe244ceac964de69d78ea8616 |
| ui-surface | root / public-import | Surface | organize | manifests/ui/surface.yaml + packages/ui/src/surface/surface.tsx | b87805f94785bf2b942a768eeff6afb303db3f09db49f9d15990eb66f2bc9331 |
## 布尔设置

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-switch | root / public-import | Switch | fill-validate, act-feedback | #switch | cd3bd0a377872dd56a1f3f0055c60f6b507a40232321c43436fe55e3dd13c21b |
## 表格、分页与数据组合

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| recipe-data-table | recipe / source-copy | DataTableRecipe | analyze, choose | #data-table | deee3f8ae1807af026e4c56f3a705138816f380f23504b54dcef491b522773f6 |
| ui-pagination | root / public-import | Pagination | navigate, analyze | #table | db16d6ed96e18304732a5ed932a91b6ff0f345843282386ca768ed12e672e948 |
| ui-table | root / public-import | Table, TableScrollArea, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption | analyze, read-communicate | #table | 3669a83720570d85e8b1e5875059cab4bda7448f4933b442829051f51faff2ab |
## 分类标签与领域标记

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-checkable-tag-group | composition / public-import | CheckableTagGroup | choose | #tag | 06e11789d88994363132de450630782a31192333ab9e92b417ba006ac48bb291 |
| ui-checkable-tag | specialization / public-import | CheckableTag | choose, identify | #tag | 06e11789d88994363132de450630782a31192333ab9e92b417ba006ac48bb291 |
| ui-difficulty-tag | specialization / public-import | DifficultyTag | identify | #tag | c33cca8b926d11ae5787dc858167d6d2a2b20221b30897bd6366f4d59a1ca369 |
| ui-group-type-tag | specialization / public-import | GroupTypeTag | identify | #tag | c33cca8b926d11ae5787dc858167d6d2a2b20221b30897bd6366f4d59a1ca369 |
| ui-learning-unit-reminder-mark | specialization / public-import | LearningUnitReminderMark | identify | #tag | c33cca8b926d11ae5787dc858167d6d2a2b20221b30897bd6366f4d59a1ca369 |
| ui-learning-unit-tag | specialization / public-import | LearningUnitTag | identify | #tag | c33cca8b926d11ae5787dc858167d6d2a2b20221b30897bd6366f4d59a1ca369 |
| ui-link-tag | specialization / public-import | LinkTag | navigate, identify | #tag | 1c7cab582455d91f4517d8dd9804b1562a9ca49b6abd992c06b9ca99076edc31 |
| ui-scored-task-type-mark | specialization / public-import | ScoredTaskTypeMark | identify | #tag | c33cca8b926d11ae5787dc858167d6d2a2b20221b30897bd6366f4d59a1ca369 |
| ui-status-tag | specialization / public-import | StatusTag | identify | #tag | c33cca8b926d11ae5787dc858167d6d2a2b20221b30897bd6366f4d59a1ca369 |
| ui-system-status-tag | specialization / public-import | SystemStatusTag | identify | #tag | c33cca8b926d11ae5787dc858167d6d2a2b20221b30897bd6366f4d59a1ca369 |
| ui-tag-select | specialization / public-import | TagSelect | choose, identify | #tag | f377d12baea9a746aba955deacafd81dc89621d2c49f97a7c9d85583cc5af6c7 |
| ui-tag | root / public-import | Tag | identify | #tag | 1bf602eda07c7662f8a5707c7522f3dacda106778e251758e6b84dcd75278687 |
## 层级树与管理流程

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| pattern-manage-tree | pattern / source-copy | ManageTree | workbench, navigate | #manage-tree | 5a89751dad59610111e05aa85186bda26e404ef6377edd2ed4e0063770678ae0 |
| ui-tree | root / public-import | Tree | navigate, choose, workbench | #tree | 7b2bbbcad8548825962e864acca48f798023f092784e60128bac901feb71174d |
## 排版与阅读提示

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| ui-kbd | helper / public-import | Kbd | read-communicate | #kbd | 260552eb75b79a84fea8fd888fe5205edfca3795480d32476e3183345cfc294b |
| foundation-typography | foundation / public-import | typographyPresets, typographyUtilityClassNames, resolveTypographyPreset, validateTypographyComposition, validateDataFontUsage | read-communicate | #typography | 2e84c45453c31e6efcaf0636c66f9fd0c21177c722bfab6020cf1c356cd0ae8a |
## 工作区与导航场景样板

| 资产 | 角色/入口 | 实际 API / 复合成员 | 任务 | 文档或回退 | 来源哈希 |
| --- | --- | --- | --- | --- | --- |
| recipe-navigation-r1 | recipe / source-copy | R1Recipe | workbench, navigate, organize | #navigation-v042 | 4190f4506f2353590b47553a3ae77d14a1321d33ca60a9589977a34935f79c29 |
| recipe-navigation-r2 | recipe / source-copy | R2Recipe | workbench, navigate, organize | #navigation-v042 | d546638335770f403f1a5f3e141021f3b9b3e17e79c722a46cd726067c6ed159 |
| recipe-navigation-r3 | recipe / source-copy | R3Recipe | workbench, navigate, organize | #navigation-v042 | 4190f4506f2353590b47553a3ae77d14a1321d33ca60a9589977a34935f79c29 |
| recipe-navigation-r4 | recipe / source-copy | R4Recipe | workbench, navigate, organize | #navigation-v042 | d8da4b3a5866cb95ee811b5ed689cdcc0aebeb03e5312e23ac0a8237e4c10d70 |
| recipe-navigation-r5 | recipe / source-copy | R5Recipe | workbench, navigate, organize | #navigation-v042 | d8da4b3a5866cb95ee811b5ed689cdcc0aebeb03e5312e23ac0a8237e4c10d70 |
| recipe-navigation-r6 | recipe / source-copy | R6Recipe | workbench, navigate, organize | #navigation-v042 | d8da4b3a5866cb95ee811b5ed689cdcc0aebeb03e5312e23ac0a8237e4c10d70 |
| recipe-navigation-states | recipe / source-copy | WorkspaceStateSample | workbench, navigate, organize | #navigation-v042 | 9300206feeb8d546294c64f685955eb9e181813a9514921d59354a7107824de6 |
| layout-connected-surface | layout / public-import | ConnectedSurface | organize, navigate | #navigation-v042, #connected-surface | 60ab4b1eae4a8d7241732e5f0e6ed7083bd50519c1470075ab30d2b4310744b6 |
| layout-workspace-state | helper / public-import | createWorkspaceKey, createWorkspaceState, validateWorkspaceSpec, resolveWorkspace, workspaceReducer, loadWorkspacePreferences, saveWorkspacePreferences, WORKSPACE_PREFERENCES_VERSION | organize, workbench | #navigation-v042, #workspace | a49d7210d20f527bd5854df5fdfa831b80d9296cfc72eb92eed29acaa912b652 |
| layout-workspace | layout / public-import | WorkspaceLayout, RecoverableRegion, RegionRestoreTrigger, PaneSplitter, useWorkspaceLayout | organize, workbench | #navigation-v042, #workspace | baa7cd7a32732ab8e40502cf0ea6e5fcdacc6f4ecc1e6f199d6b56e93cbc333a |

## 旧状态与来源边界

全部140项受保护身份/路径/category/验收/发布字段与 M04 追加前一致，见 full-invariants.json。完整控制范围、owner、修改边界和关系条件见生成目录与各 Manifest。125个复合成员仅声明支持的静态对象形态，不把 style Parts 自动提升为公开成员。7个公开别名来自真实赋值。

43条审阅边均逐条回到当前源码核对，见 review-43-crosswalk.json。第41–43条分别是 NavigationBar/Tabs 共享外观、Drawer/Sheet 共同外部引擎的条件近邻、ProfitLossLine 必须的 LineChart/Line 上下文；未宣称这些种子或112条当前关系是完整依赖图。
