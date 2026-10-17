# DatePicker 辅助信息与时长区域视觉反馈

- 目标：落实2026-10-13用户四点反馈：低优先级提示很淡、时长预设有浅底、展开图标后置并缩小、时长读数突出、减少分隔线。
- 模式：System Mode，既有DatePicker registry-candidate的局部视觉修订，相关样板仅限`doc-date-picker`页面。
- 范围：DatePicker TSX/CSS、G5页面内作用域CSS、DatePicker Manifest与本轮来源/验证记录。按用户追加反馈，复用Button tertiary/mini与具名局部Recipe，28px高、13px常规字重、中性浅底及透明描边；text/regular使用已有12px后置图标。没有新增依赖、公共选项或全局Token。
- 方法：V04使提示退后、时长突出；V05可点击外观对应已有一次应用动作；D02用间距和轻表面组织分组；D05检查320px、短视口及预设换行。
- 不变关系：确认提交、取消恢复、日期时间校验、键盘/焦点、折叠语义及主要命中区。
- 验证：现有DatePicker与时间样板回归、UI/Playground类型与构建；实际浏览器检查启用/禁用、折叠/展开、清空后弱提示、摘要、单次错误、浅/深色、320px及短屏；保留截图与前后源摘要。
- 未验证假设：非常浅的辅助文字按用户本轮明确视觉偏好执行，不获得普通正文对比度验收；人工视觉、真实触摸与读屏验收独立保留。
- 既有证据：`evidence/runtime/date-picker-ux-refinement-2026-10-12/`保持历史快照；本轮输出仅写`evidence/runtime/date-picker-visual-feedback-2026-10-13/`。
