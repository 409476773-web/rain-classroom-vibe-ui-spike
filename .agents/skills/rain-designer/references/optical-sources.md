# 光学校准补充：来源、推导与适用边界

核对日期：2026-10-13。适用文件：Designer v0.5、Rain Designer 0.2.0 审阅稿。

本轮读取公开网页正文或官方文字实录。IBM 与 Typographica 的部分原图链接返回错误；下列图例解释依据作者正文，不声称做过原图像素测量。没有重新审阅雨课堂页面、操作线上产品或安装 Skill。原 v0.3 来源记录按字节保留，作为原有方法论的历史依据，不代表本轮重新核实其全部链接。

## 1. 一手来源与取用范围

### A1 · Apple：Designing Glyphs（WWDC17）

[官方课程及文字实录](https://developer.apple.com/videos/play/wwdc2017/823/)

定位：Optical weight、Lines、Positioning；将 padding 做入资产；成组设计、情境测试和设备预览的段落。

原文支持：图标的视觉大小、线条重量和位置需要区分；几何居中可能需要修正；补偿可以在资产内部完成。

项目取用：先诊断而非统一位移，核对已有资产处理，在实际组合中比较。不采纳其示例中的移动方向或像素量为通用指令。

### A2 · IBM Design Language：UI icons — Usage

[官方规范](https://www.ibm.com/design/language/iconography/ui-icons/usage/)

定位：Sizing、Alignment、Clearance。

原文支持：IBM 图标已在边界框内光学居中，机械居中不总能满足观感；尺寸、文字搭配与触控留白有其系统约定。

项目取用：尊重既有校准和使用约定，区分图形与操作目标。IBM 的固定尺寸、Plex 搭配和触控数值不成为雨课堂的默认规范。

### A3 · Apple：SF Symbols 2（WWDC20）

[官方课程及文字实录](https://developer.apple.com/videos/play/wwdc2020/10207/)

定位：baseline、cap height、badges、alignment margins。

原文支持：符号通过字体参照与文字配合，轮廓不必停在基线上；带徽标符号可保持主要图形的对齐。

项目取用：先选参照、识别主体，再判断对齐。不将 SF Symbols 与 San Francisco 的方案直接套用到任意中文字体或第三方 SVG。

### A4 · Monotype：Lack of Overshoots

[Mary Catherine Pflug 的官方支持文章](https://foundrysupport.monotype.com/hc/en-us/articles/360029597112-Lack-of-Overshoots)

原文支持：圆形与尖形字形可越过字体参照线以获得视觉协调，补偿程度与字形风格和预期字号有关。

项目取用：几何等高不直接证明视觉等大，尊重字形内部设计。不把 overshoot 改写成页面逐字移动、圆形控件统一放大或固定补偿比例。

### A5 · Ian Moore：Making Geometric Type Work

[作者原文，Typographica](https://typographica.org/on-typography/making-geometric-type-work/)

定位：Balance、Spacing 及整组字形调整的讨论。

原文支持：相同几何间隔面对不同轮廓时，可能呈现不同空白感；局部字形需放回整体设计中比较。

项目取用：观察轮廓与空白关系，避免只在孤立对象中判断。不把字体制作经验直接变成所有 UI 元素逐项改变间距的规范。

### A6 · Adobe：Format paragraphs in Adobe InCopy

[官方文档](https://helpx.adobe.com/incopy/desktop/format-text/paragraph-formatting/formatting-paragraphs.html)

定位：Create hanging punctuation。

原文支持：Optical Margin Alignment 调整标点或字母边缘与段落边缘的关系；该功能说明面向西文，CJK 的标点悬挂另有处理。

项目取用：可见外缘不是唯一的对齐参照；不默认在中文 UI 套用西文悬挂策略。本文不推荐或测试任何 CSS 对应功能。

### A7 · Apple：The details of UI typography（WWDC20）

[官方课程及文字实录](https://developer.apple.com/videos/play/wwdc2020/10175/)

定位：Optical Sizes、tracking 与 kerning 的区分、actual size。

原文支持：预期字号与显示尺度会影响字形和间距的处理；字偶调整不同于整段字距。

项目取用：以目标呈现条件比较，保留字体既有处理。不把 Apple 的字号阈值、tracking 表或平台自动行为推导为跨字体、跨平台保证。

### A8 · OpenAI：Build skills

[官方编写说明](https://developers.openai.com/plugins/build/skills/)

原文支持：SKILL.md 保存工作指导，详细资料置于 references 并说明读取条件；不需要脚本即可完成的任务，不必增加脚本。

项目取用：入口只增加识别、读取与检查，诊断细节按需读取。本轮没有新增 MCP、设计时脚本、外部调用权限或全局配置。

## 2. 本项目新增的综合方法，不冒称原文定律

| 项目方法 | 来源启发 | 证据与边界 |
|---|---|---|
| 先明确目标关系，再选择布局、排版或形态参照 | A1、A3、A6 | 三类归纳为本项目提炼，不是统一行业分类 |
| 区分位置、大小、重量、边缘与间隔 | A1、A4、A5、A7 | 诊断角度；不提供通用补偿算法 |
| 先排除配置或重复补偿，再局部试调 | A1、A2、A3 | 基于资产机制的维护建议，需真实项目检查 |
| 不抹平有意主次，也不改变数据和公式含义 | 原指南语义与业务边界 | 项目约束，不称为上述图标规范中的条款 |
| 同条件比较、放回组合、无改善则停止 | A1、A5、A7 | 本项目检查程序；并非已经完成用户研究 |
| 保留无需调整、待确认和未检查等结论 | 原指南证据边界 | 防止为完成流程强制造改动 |

## 3. 本轮没有确认的事项

没有确认用户当前图标是否已经光学处理，也未核实实际使用字体与渲染条件。没有判断具体页面需要向哪个方向移动多少像素。没有运行独立 AI 任务或测试设计质量提升。

不承诺自动像素差异、元素框测量或填色面积质心能够独立判断视觉对齐。它们可以提供辅助信息，但不替代本次任务、资产约定和实际呈现的判断。没有新增行业通用数值阈值。

Robin Williams 的试读及 Hochuli 原书本轮没有作为新增细节结论的依据；本包不复制其全文、截图或字体。课程、书籍和页面中的例子不作为设计任务的默认模板。
