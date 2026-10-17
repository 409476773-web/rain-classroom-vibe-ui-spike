# E3 · G3 review-02 修订

日期：2026-10-05。依据用户 E3 首轮批注1–6及后补的队列紧凑/满分辅助文字两条、`docs/plans/2026-10-05-navigation-w6-review02-design.md`。仅改 local grading-workbench 源码、局部CSS及它的新增测试；E4与共享Foundation/UI/Layout默认不动。

## 设计与公开组件使用

- V04/D02/D05：报告标题使用现有16/22 Token，学号与当前题目移至标题同行最右侧，当前草稿状态Tag留在标题旁。Flex wrap适应窄容器，不设置1343px特例或固定标题高度。
- V05/D03/I01：次维对象改为公开受控 `NavigationTabs.Root` 的 `visualPreset="navigation-browser"`。左侧主对象队列仍为 ObjectNavigator；按人时中间为题目页签，按题时为学生页签，稳定student/question与draft key继续由宿主持有。
- 沿用既有R6白底肩头组合的公开 `ConnectedSurface`：merged/tonal，geometry={panelRadius:0,tabRadius:6,shoulder:4,trackInset:0}。本地轨道与白底变量映射至现有Rain Token。
- `Nav` 和 `Panels sharedContent` 共同组成真实内容域；题干、学生答案、评分参考完整位于当前tabpanel，始终只有一个实际面板。TabsItem的content:null只作为Root结构合同的条目字段，真正内容由公开sharedContent提供，不渲染空面板。
- 删除次维上方“这份报告的题目/选择题目后在右侧评分”行。未添加可选逐tab description，因为这会恢复双行64px身份页签并重复现有标题身份；本轮采用单行浏览器44px页签。
- InputNumber取消fullWidth并使用appearance=filled，保留公开36px、5ch编辑区、stacked、0–20整数及固定单位。评分评语使用公开Textarea filled。未覆盖字段颜色或尺寸。
- 后补队列修订：压缩局部队列上下padding、队列头至模式选择的间距、标签行高、两组模式控制与说明间距；对象entry竖向padding改为现有8 Token。保留公开最小对象行高度76px与模式控件32px。各题相同满分从Tag改成普通淡色12px辅助文字；学生状态Tag继续用于区分批改状态。

## 实际验证

- 新增2项真实轴选择/身份与草稿隔离/布局不保存/显式保存单元：先原实现red2/2，exit1；实施后2/2green，exit0，2.07s。见unit-red.log/unit-green.log。
- 当前Playground typecheck：exit0，typecheck.log。
- 后补两条落地后重新执行2项单元：2/2通过、exit0、1.94s，unit-queue-final.log；重新执行Playground typecheck：exit0，typecheck-queue-final.log。
- 独立Chromium源5204、1343×747：报告标题实际font16/line22/高度22；学号+当前题号与标题中心y差0且在同排最右。
- InputNumber实际宽135.125px，数字编辑区42px（既有5ch），fullWidth=false；数值与评语filled实际背景均rgb(245,247,254)，不写入本地硬编码颜色。
- 白底肩头SVG measured/activeVisible=true，fill白色，动态尺寸940px与当前工作区一致；真实tabpanel包含题干/答案/参考。
- ArrowRight仅移动焦点，Enter激活当前题目内容；按人/按题轴切换保留当前pair。学生页签分别保留草稿，所有轴/布局操作后仍“尚未保存到本地”。
- 996×600：主阅读区scrollTop143，分数框y前后均341；评分区持续存在。0 pageError、0 HTTP>=400。
- 后补队列实拍1343×747按题：pane y168–706，clientHeight=scrollHeight=538，scrollTop=0；三题各79px，第3题底642，完整位于首屏，满分Tag数0，两组模式控件均32px。源运行日志runtime-check-queue-final.log。
- 最终截图：E3-queue-question-1343x747.png、E3-1343x747.png、E3-996x600.png；具体测量与检查路径见runtime-check.json。独立三引擎/多宽度最终回归由root与验证代理记录。

旧消费者测试的次维角色须合法更新为tablist/tab；左侧当前批改对象仍group/button。本轮不修改历史review01记录，也不授予G3视觉、完整对比度或读屏接受。
