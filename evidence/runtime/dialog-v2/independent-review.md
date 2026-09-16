# RN-05 独立技术复核

2026-09-13，独立只读代理 `/root/dialog_review` 复核 Dialog、Separator、课程编辑消费示例与本批修正，未修改仓库。

结论：当前范围未发现尚未修复的新增 P1 / P2。该结论不等于 Human Gate、完整无障碍或对比度接受。

1. 初次发现 P2：DensityProvider 多出的 DOM 阻断 Popup 的 flex 高度分配。修复为现有 `className="contents"` 后，独立浏览器确认 Body 可滚动，滚动前后 Header / Footer 坐标不变。
2. 后续发现全局样式层顺序回归：新增 `@layer utilities` 提前创建层，导致 preflight 覆盖留白和边框。最终改为不分层的低特异性 Dialog 边框色，移除该层声明。独立检查开发5193、生产5195均得到 Header / Footer padding=24px，Popup border=1px solid rgba(16,63,183,0.16)，见 [原始测量](independent-paints.json)。
3. 独立亲自执行 Dialog 单元3 / 3通过，覆盖取消打开、多触发器主题切换、初始/返回焦点与ref、无触发器显式主题及Separator语义。

已有深色 Focus 对比度不足及人工视觉决定仍保持未接受。主执行者的更广泛1279项单元和39项浏览器范围另见 [verification.md](verification.md)，不计作独立代理亲自执行的数量。
