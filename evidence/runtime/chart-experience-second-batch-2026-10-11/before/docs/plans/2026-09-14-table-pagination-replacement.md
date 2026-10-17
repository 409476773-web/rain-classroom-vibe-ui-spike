# 表格统一接入已确认的 Pagination

用户要求将现有表格的分页部分替换为新分页器。System Mode；沿用当前 RN-08 候选和本地资料配方，不新建组件。

现场核对：主目录 rain-classroom-vibe-ui-spike 的 Pagination 已获得 pagination-current-runtime-visual-only 确认；本工作目录 card-v2 的 #table 与 prototype #materials 共用 DataTableRecipe，却仍使用旧的 pageCount/onPageChange 版分页和独立 Select。其他原生表格为无分页的规范/属性展示；图标图库与选择组合不是表格，保持本次范围。

实施：按原字节接入主目录 Pagination 的六个实现/测试文件；依赖的 Button、IconButton、Popover、FormItemContext、Input 现有接口兼容，不复制或改动这些共享组件。资料配方使用 total / page / pageSize / onChange，将 1-based 页码转为 TanStack 的 pageIndex，并原子接受页码和容量。用 variant=data、inline 容量入口替代独立 Select，保留 5/10/20 选项及初始 5 条。容量改变遵循已确认的新组件合同，保留原首条记录所在页；查询改变仍回首页并清空选择。

范围：分页组件来源、公共导出与 Manifest/Registry；资料配方及说明/测试；精确阶段与颜色/样式登记。无新增依赖、Foundation 值变更、Git 提交/推送、Figma、发布或业务迁移。

验证：先写会在旧分页上失败的消费检查，再验证容量/跳页/筛选/跨视图选择、空结果和加载；沿用已确认组件单元检查，类型、构建、治理，三浏览器桌面及 320/390 窄屏。独立技术复核与本批视觉验收分开。未验证假设：新组件在现有表格容器下的响应式和浮层边界，需实测。

证据：evidence/runtime/table-pagination-replacement/verification.md。新组件原视觉确认保留；本批表格组合待人工验收，对比度接受未授予。

执行完成：实施、自动验证、独立技术审阅均 passed/completed。两组定向检查 33/33 和 241/241；三引擎 15/15；类型、构建、完整治理通过。独立复核 36/36，未发现 P1/P2。新源码保持原样，桌面与窄屏容器假设已实测；人工组合验收仍待确认。
