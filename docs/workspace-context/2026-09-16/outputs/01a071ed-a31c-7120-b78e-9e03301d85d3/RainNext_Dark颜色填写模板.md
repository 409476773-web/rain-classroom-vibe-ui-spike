# Rain Next Dark 主题颜色填写模板

参考版本：2026-09-06。覆盖现有 105 个公共 Category 颜色 Token。

1. 只填写“颜色填写”中的 E、F、G 列，保留 Token ID。相同色值可从 Light 参考列复制。
2. 色号填写六位 Hex，例如 #1C3A9C；不透明度填写 100%、18% 等。18% 代表保留 18% 的颜色。
3. 每一项都要填写不透明度；Solid 固定为 100%。Alpha 填源色，不填与背景混合后的截图取色值。
4. 留空表示待定，不自动沿用 Light。若 Dark 不使用某项，色号填“不使用”，并在备注说明。
5. Text 与 Icon 分行保留。两者同色时可复制，允许分别填写不同值；不自动让小图标浅一档。
6. Background/Dark 是现有“深色背景”分类，不是主题开关。这 3 项也要填写 Dark 主题值。
7. OnColor 是独立的反白前景分类，Dark 中仍保留原 ID。若用途变化，请在下方说明。
8. 等级沿用现有身份，不因 Dark 主题亮度变化而倒序或改编号。空值不按 Light 自动推导。
9. 所有带 Alpha 的颜色，请在备注注明主要承载背景 Token，便于按真实背景检查叠加效果。

## 主题用法补充

| 事项 | Dark 用法（填写） | Light 参考规则 |
| --- | --- | --- |
| 页面的主要背景 Token |  | 默认值未统一指定 |
| 新增四族 Solid 1、2 前景 |  | 仅 OnColor 反白前景 |
| 新增四族 Solid 3 与 Alpha 前景 |  | 普通深色或同色系 Text / Icon |
| OnColor 的用途 |  | 用于指定填充上的反白前景 |

以下表格填写 Dark 色号与不透明度；备注可写实际承载背景、用途差异或不使用原因。

## 文字 Text

### 中性 · Text/Neutral

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Text/Neutral/1 | #142346 | 100% |  |  |  |
| Text/Neutral/2 | #3A4865 | 100% |  |  |  |
| Text/Neutral/3 | #495D87 | 100% |  |  |  |
| Text/Neutral/4 | #56688F | 100% |  |  |  |
| Text/Neutral/5 | #7485A8 | 100% |  |  |  |
| Text/Neutral/6 | #A0ACC5 | 100% |  |  |  |

### 品牌 · Text/Brand

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Text/Brand/1 | #0F55DF | 100% |  |  |  |
| Text/Brand/2 | #1561F8 | 100% |  |  |  |
| Text/Brand/3 | #3D7BFF | 100% |  |  |  |

### Second · Text/Second

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Text/Second/1 | #1C3A9C | 100% |  |  |  |
| Text/Second/2 | #3751A7 | 100% |  |  |  |
| Text/Second/3 | #576EBD | 100% |  |  |  |
| Text/Second/4 | #91ACEA | 100% |  |  |  |

### 橙色 · Text/Orange

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Text/Orange/1 | #DD5C00 | 100% |  |  |  |
| Text/Orange/2 | #F18300 | 100% |  |  |  |

### 绿色 · Text/Green

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Text/Green/1 | #058952 | 100% |  |  |  |
| Text/Green/2 | #00B574 | 100% |  |  |  |

### 红色 · Text/Red

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Text/Red/1 | #CA2732 | 100% |  |  |  |
| Text/Red/2 | #F34848 | 100% |  |  |  |

## 图标 Icon

### 中性 · Icon/Neutral

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Icon/Neutral/1 | #3A4865 | 100% |  |  |  |
| Icon/Neutral/2 | #495D87 | 100% |  |  |  |
| Icon/Neutral/3 | #7485A8 | 100% |  |  |  |
| Icon/Neutral/4 | #96A3C1 | 100% |  |  |  |
| Icon/Neutral/5 | #B8C2D8 | 100% |  |  |  |

### 品牌 · Icon/Brand

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Icon/Brand/1 | #0F55DF | 100% |  |  |  |
| Icon/Brand/2 | #1561F8 | 100% |  |  |  |

### Second · Icon/Second

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Icon/Second/1 | #1C3A9C | 100% |  |  |  |
| Icon/Second/2 | #3751A7 | 100% |  |  |  |
| Icon/Second/3 | #576EBD | 100% |  |  |  |
| Icon/Second/4 | #91ACEA | 100% |  |  |  |

### 橙色 · Icon/Orange

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Icon/Orange/1 | #DD5C00 | 100% |  |  |  |
| Icon/Orange/2 | #F18300 | 100% |  |  |  |

### 绿色 · Icon/Green

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Icon/Green/1 | #058952 | 100% |  |  |  |
| Icon/Green/2 | #00B574 | 100% |  |  |  |

### 红色 · Icon/Red

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Icon/Red/1 | #CA2732 | 100% |  |  |  |
| Icon/Red/2 | #F34848 | 100% |  |  |  |

## 描边 Border

### 中性 · Border/Neutral

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Border/Neutral/1 | #103FB7 | 35% |  |  |  |
| Border/Neutral/2 | #103FB7 | 25% |  |  |  |
| Border/Neutral/3 | #103FB7 | 16% |  |  |  |
| Border/Neutral/4 | #103FB7 | 10% |  |  |  |

### 品牌 · Border/Brand

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Border/Brand/1 | #3D7BFF | 100% |  |  |  |
| Border/Brand/2 | #6495FF | 100% |  |  |  |
| Border/Brand/3 | #B5CCFC | 100% |  |  |  |

### Second · Border/Second

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Border/Second/1 | #5F7DE1 | 100% |  |  |  |
| Border/Second/2 | #ACBAEA | 100% |  |  |  |

### 橙色 · Border/Orange

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Border/Orange/1 | #F78600 | 100% |  |  |  |
| Border/Orange/2 | #FFD6B7 | 100% |  |  |  |

### 绿色 · Border/Green

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Border/Green/1 | #14BF82 | 100% |  |  |  |
| Border/Green/2 | #98DAC5 | 100% |  |  |  |

### 红色 · Border/Red

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Border/Red/1 | #F34848 | 100% |  |  |  |
| Border/Red/2 | #F5BABC | 100% |  |  |  |

## 背景 Background

### 中性 · Background/Neutral

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Background/Neutral/1 | #FFFFFF | 100% |  |  |  |
| Background/Neutral/2 | #F7F9FF | 100% |  |  |  |
| Background/Neutral/3 | #F2F4FF | 100% |  |  |  |
| Background/Neutral/4 | #EBEFFF | 100% |  |  |  |
| Background/Neutral/5 | #E3E9FD | 100% |  |  |  |

### 深色背景 · Background/Dark

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Background/Dark/1 | #15192B | 100% |  |  |  |
| Background/Dark/2 | #32364B | 100% |  |  |  |
| Background/Dark/3 | #535970 | 100% |  |  |  |

## 填充 Fill · Solid

### 中性 · Fill/Neutral/Solid

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Neutral/Solid/1 | #CCD4ED | 100% |  |  |  |
| Fill/Neutral/Solid/2 | #D7DEF5 | 100% |  |  |  |
| Fill/Neutral/Solid/3 | #E3E9FD | 100% |  |  |  |
| Fill/Neutral/Solid/4 | #EBEFFF | 100% |  |  |  |
| Fill/Neutral/Solid/5 | #F2F4FF | 100% |  |  |  |
| Fill/Neutral/Solid/6 | #F5F7FE | 100% |  |  |  |
| Fill/Neutral/Solid/7 | #FFFFFF | 100% |  |  |  |

### 品牌 · Fill/Brand/Solid

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Brand/Solid/1 | #0F55DF | 100% |  |  |  |
| Fill/Brand/Solid/2 | #1561F8 | 100% |  |  |  |
| Fill/Brand/Solid/3 | #C6D8FF | 100% |  |  |  |
| Fill/Brand/Solid/4 | #E0EAFF | 100% |  |  |  |

### Second · Fill/Second/Solid

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Second/Solid/1 | #3752AB | 100% |  |  |  |
| Fill/Second/Solid/2 | #365BD6 | 100% |  |  |  |
| Fill/Second/Solid/3 | #E3E9FC | 100% |  |  |  |

### 橙色 · Fill/Orange/Solid

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Orange/Solid/1 | #EB7600 | 100% |  |  |  |
| Fill/Orange/Solid/2 | #F78600 | 100% |  |  |  |
| Fill/Orange/Solid/3 | #FFF2EB | 100% |  |  |  |

### 绿色 · Fill/Green/Solid

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Green/Solid/1 | #0E9954 | 100% |  |  |  |
| Fill/Green/Solid/2 | #14B565 | 100% |  |  |  |
| Fill/Green/Solid/3 | #E7F9F2 | 100% |  |  |  |

### 红色 · Fill/Red/Solid

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Red/Solid/1 | #E13843 | 100% |  |  |  |
| Fill/Red/Solid/2 | #F34848 | 100% |  |  |  |
| Fill/Red/Solid/3 | #FCEDED | 100% |  |  |  |

## 填充 Fill · Alpha

### 中性 · Fill/Neutral/Alpha

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Neutral/Alpha/1 | #546CC6 | 28% |  |  |  |
| Fill/Neutral/Alpha/2 | #4A66D1 | 20% |  |  |  |
| Fill/Neutral/Alpha/3 | #5075FE | 16% |  |  |  |
| Fill/Neutral/Alpha/4 | #5075FE | 12% |  |  |  |
| Fill/Neutral/Alpha/5 | #5577F4 | 10% |  |  |  |
| Fill/Neutral/Alpha/6 | #5570F4 | 6% |  |  |  |

### 品牌 · Fill/Brand/Alpha

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Brand/Alpha/1 | #003AAD | 85% |  |  |  |
| Fill/Brand/Alpha/2 | #154DBE | 65% |  |  |  |
| Fill/Brand/Alpha/3 | #3D7BFF | 20% |  |  |  |
| Fill/Brand/Alpha/4 | #3D7BFF | 10% |  |  |  |

### Second · Fill/Second/Alpha

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Second/Alpha/1 | #4976F2 | 18% |  |  |  |
| Fill/Second/Alpha/2 | #4976F2 | 10% |  |  |  |

### 橙色 · Fill/Orange/Alpha

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Orange/Alpha/1 | #F78600 | 18% |  |  |  |
| Fill/Orange/Alpha/2 | #F78600 | 10% |  |  |  |

### 绿色 · Fill/Green/Alpha

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Green/Alpha/1 | #14B565 | 18% |  |  |  |
| Fill/Green/Alpha/2 | #14B565 | 10% |  |  |  |

### 红色 · Fill/Red/Alpha

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| Fill/Red/Alpha/1 | #F34848 | 18% |  |  |  |
| Fill/Red/Alpha/2 | #F34848 | 10% |  |  |  |

## 反白 OnColor

### OnColor

| Token ID | Light 色号 | Light 不透明度 | Dark 色号（填写） | Dark 不透明度（填写） | 备注 |
| --- | --- | --- | --- | --- | --- |
| OnColor/1 | #FFFFFF | 100% |  |  |  |
| OnColor/2 | #FFFFFF | 85% |  |  |  |
| OnColor/3 | #E8F0FF | 75% |  |  |  |
| OnColor/4 | #D8E0FF | 45% |  |  |  |
| OnColor/5 | #D8E0FF | 25% |  |  |  |

## 范围与来源

来源：Rain Next 当前颜色登记表及已确认的颜色治理规范、2026-09-06 四色系补充规范。

本表覆盖 105 个公共 Category 颜色。既有 42 个 Semantic 另计，后续按用途建立主题映射。填完可用于 Dark 色值接入和预览建设，具体组件的背景搭配、交互状态及对比度仍需验证。
