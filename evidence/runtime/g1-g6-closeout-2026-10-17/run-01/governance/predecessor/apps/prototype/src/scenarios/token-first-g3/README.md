# G3 共享组件工作台

入口：`http://127.0.0.1:4174/#token-first-g3`

本页是 G3 的真实本地消费与验收场景，消费 `@rain-next/ui` 的十项共享组件：ScrollArea、Sheet、Sidebar、Breadcrumb、NavigationMenu、Menubar、Command、ContextMenu、HoverCard、Kbd。

页面提供“层级型工作台”和“密度型指挥台”两套视觉方向。任务、路径、命令注册表和操作反馈全部是当前页面内的虚构数据与宿主状态；没有生产接口依赖。

G3 临时视觉值集中在 `page.css`，没有改动基础 Token。组件来源、版本和校验见 `evidence/runtime/token-first-v12-g3/source-lock.json`；本批不自动进入 Registry、Figma、业务迁移或正式发布。
