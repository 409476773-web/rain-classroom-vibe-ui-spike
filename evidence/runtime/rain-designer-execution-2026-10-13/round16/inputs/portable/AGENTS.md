# Rain Next 本地原型

生成、优化或评审原型界面时，使用 [Rain Designer](.agents/skills/rain-designer/SKILL.md)，并读取 [本库接入说明](docs/ai/prototype-design.md)。先理解当前任务和信息关系，再核对和复用合适能力；历史整页不作为默认模板，示例仅在明确要求参考/还原或核实具体用法时读取。设计方法在 Skill 中维护，品牌、组件 API、真实导出与实现边界按本库说明查找；已读内容可复用，不循环启动。记录依据、选择原因、实际检查与未验证项，局部参数不升级为全库规则，AI 自查不替代用户验收。

默认 Prototype Mode：共享 packages 与锁文件保持只读，优先已有 Variant、页面 Local Recipe、Local Fork。业务状态由页面持有；不扩大旧视觉接受，不自动发布、迁移、写入 Figma 或执行 Git 操作。用户的新任务指令优先。
