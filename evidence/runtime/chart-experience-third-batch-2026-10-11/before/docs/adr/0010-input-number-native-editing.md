# ADR 0010: InputNumber 的单一数字编辑模型

日期：2026-09-16。适用范围：用户已授权的新 InputNumber。

## 决定

使用原生 `input type=text` 与一份编辑草稿，配合原生 constraint validation；数字分类与步进使用局部纯函数。视觉复用共享 field frame 和正式图标，不另建 Field 框架，不改变既有 Input 的字符串职责。

## 依据与取舍

旧 Vue InputNumber 仅供视觉/功能参考：本轮明确替换其符号失焦恢复、固定±1、无范围、错误态隐藏控制器等行为。三种外观和左右按钮由用户逐项确认。

已读取本地 `@base-ui/react@1.8.0` NumberField：失焦会规范化 `001.50`；默认Intl可能显示舍入；即使allowOutOfRange允许手输越界，步进仍会clamp，不能直接满足120→119；默认Enter不是本轮要求的提交准备入口。为覆盖这些已确认规则再叠一份草稿/控制器会增加竞争状态。因此此次不接入该原语，也不新增另一套Headless库。这个决定不改变浮层家族的Base UI选择。

原生number输入无法完整保留上述草稿与格式。原生text输入仍提供标签、form关联、required、setCustomValidity/checkValidity/reportValidity等浏览器能力；自定义职责只限数值编辑、步进和ARIA语义。需验证Enter/点击提交、IME、reset、受控拒绝回填、keyboard与读屏。

参考：[shadcn Input Group](https://ui.shadcn.com/docs/components/base/input-group)、[Ant Design InputNumber](https://ant.design/components/input-number/)、[Material Web Text Field](https://material-web.dev/components/text-field/)、[Base UI NumberField](https://base-ui.com/react/components/number-field)。依赖比较基于本地已装版本，不把线上文档等同于实测。

代价：Rain持有少量数字解析和精确步进逻辑，必须保留行为回归。高精度字符串、复杂locale/货币格式化出现实际需求时，重新比较成熟数值库；当前不承诺这些能力。
