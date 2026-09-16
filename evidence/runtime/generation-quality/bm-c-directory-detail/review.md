# BM-C 目录与分数细节

## 范围与结果

2026-09-16；Prototype Mode / local-experiment；用户四条批注：橙色分数与弱化单位、题组轻分隔、短分数输入、学生头像。实现、定向自动验证、独立技术审阅完成；视觉 Human Gate 待用户查看。未发布、迁移、提交 Git 或写入 Figma。

- 复用 Avatar size=24 与 assignAvatarAssets，完整虚构学生集合在模块级分配；按题为学生行头像，按人为学生父组头像。空 alt 避免重复读名，不新增图片/依赖。
- 题组之间使用12px留白、12px内距与1px轻分隔线，不添加嵌套卡片。
- 得分输入由外部128px/max-width:100%容器控制宽度；保留 filled 公共变体及 FormItem 标签、必填、错误、禁用语义。
- 数字仍16px粗数据字体，使用 Text/TagBrown/1 深橙棕色；单位为13px Text/Neutral/3。选中时数字采用当前行 Text/Brand/1，单位保持中性。
- 颜色选择经过实际父表面校验：Text/Orange/1 在白底仅3.75，不直接使用；TagBrown 在普通白底/hover通过，但浅蓝选中底为4.49、深色选中底为3.87，因此选中状态跟随原蓝色。未调公共 Token、未降低4.5阈值或授予例外。
- 原评分状态机、草稿、保存锁、0分、导航和过滤逻辑保持不变。

## 验证

- typecheck 与 prototype build 通过；构建仍有既有 chunk-size 提醒。
- BM-C/BM-D state + M2颜色/授权 + asset-index 定向测试17/17通过。
- 最终源码 Chromium / Firefox / WebKit 36/36通过；新增验证头像加载、6名学生不同头像、分组/筛选后映射一致、128px输入、题组边界、分数/单位字形、浅/深色选中分数一致。原0分、失败恢复、草稿、键盘、折叠焦点、899/390布局回归通过。
- 已查看1215×778整页截图与实时窄屏页面。证据包含三个浏览器截图和 browser-report.json。
- 独立只读审阅 /root/bm_d_feedback_review：无阻塞问题，颜色表面、头像映射与语义、Input context、宿主状态和精确授权通过。最后浏览器结果为36/36。
- 全库治理仍受外部 apps/prototype/src/scenarios/list-composition/list.css 颜色登记缺失阻塞；本轮 BM-C 本地颜色测试通过。公共组件已有对比度待审项不等于接受。
- before.json / protected-files.json 记录共享实现、BM-D及 BM-C state.ts 指纹；未由本轮修改共享组件。

真人读屏、物理设备与用户视觉接受未验证。
