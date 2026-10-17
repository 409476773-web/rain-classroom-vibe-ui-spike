# 讲稿演示素材来源

- 用途：导航 Playground 的讲稿缩略图与当前页预览，Prototype Mode / local-experiment。
- 来源：2026-10-09 使用内置 `image_gen.imagegen`，按四个独立提示词生成。
- 性质：合成的示意性教学材料，**不是已核验 PDF 的页面截图，也不是经过学科审校的正式教材**。
- 视觉依据：任务选定稿 `/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-5ee30f3b-4118-465e-8828-191631e2cd2c.png`。只借用讲稿区的白底、蓝灰文字和蓝色学术图示语言。
- 原图目录：`/Users/wenchengkai/.codex/generated_images/01a12145-3506-7ea1-956e-43b8b345c8e8/`。
- 所有 PNG：1672 × 941 像素，近似 16:9；按字节直接复制原图，没有裁剪、缩放、颜色或文字后处理。
- 检查：逐页目视核对中文标题；第 02 页曲线从上方趋近水平 L，第 03 页蓝点趋近右侧 L；PNG 头部尺寸与复制后 SHA-256 一致性检查通过。页面实际显示、缩略图可读性与人工设计 Gate 由消费页面另行验证。

| 文件 | 标题 | 原始生成文件 | SHA-256 |
| --- | --- | --- | --- |
| lecture-01.png | 高等数学 A | exec-901b3cdc-bdb5-467c-a5c5-1581348e6ce5.png | `524010856ff3c12ba04e67f94c49882605c0ec9fd062fbbe401f1de48a27682f` |
| lecture-02.png | 极限的直观理解 | exec-eed2d0c9-2d00-43c0-96d5-4817e6591365.png | `084aaa2f080a57f180b891b9136ae0955b7dcb54a3b93442c3c4ec3319128c7d` |
| lecture-03.png | 从数列变化理解趋近过程 | exec-b8490f9a-eb56-47c3-b299-aebf5bfb4f4b.png | `8ddb804b2b4a5d262eb056f0ccf9683481c155ee9dd904aae087aa3afabb54d7` |
| lecture-04.png | 课堂小结 | exec-94efce3d-8f05-4aa6-8519-ad6888376b8d.png | `2383951ea0dcd7a7ac8d9999285590c22df57f6d458fc2397416f72786d6df17` |

## 实际提示词

每页实际提示词为以下公共提示词加对应页提示词。

### 公共提示词

```text
Use case: scientific-educational.
Asset type: actual raster teaching slide used in a lecture preview and small lecture-page thumbnails.
Create ONE finished landscape lecture slide image, 16:9, approximately 1280 x 720 pixels. The image itself is the complete slide, without any outer frame or UI. It is part of a coordinated set of 4 pages for the same Chinese higher mathematics course.
Visual language: clean academic layout on pure white #FFFFFF, Chinese typography close to PingFang SC, very large clear semibold deep blue-gray #14233C title at the upper-left with generous margins (about 80 pixels), regular blue-gray support text. Restrained Rain blue #1561F8 diagram strokes and dots, small pale cool-blue accents. Generous white space. High legibility at thumbnail size, crisp carefully typeset Chinese. Flat printed slide graphics; no gradient, no drop shadow, no photograph, no marketing decoration, no browser or app controls, no watermark. Do not create a board of multiple slides.
```

### 第 01 页

```text
Primary request: course introduction title slide. Exact main title (verbatim): "高等数学 A". Exact subtitle (verbatim): "函数、极限与连续". Set the main title prominently in the upper-left to mid-left, and subtitle below it. The title is the primary subject. A small restrained Rain blue line and a simple thin blue illustrative curve on the far right may anchor the otherwise spacious composition. Avoid any other text. Pure white background with only a tiny pale blue academic accent; do not fill the slide with color.
```

### 第 02 页

```text
Primary request: intuition of limits. Exact main title (verbatim): "极限的直观理解". Small exact course label (verbatim): "高等数学 A". Put the title upper-left. Below title on the left, include exactly this short two-line caption: "当 x 持续增大" and "函数值逐渐接近同一个数". On the right half, draw a clean mathematical illustration: thin blue-gray x and y axes, blue smooth strictly decreasing curve initially high and steep on the left, flattening to approach a horizontal blue dashed asymptote from ABOVE. Label the dashed asymptote "y = L" near its right end. Label axes "x" and "y", and origin "0". The curve must never cross or touch the dashed asymptote. Diagram illustrative, no long math formulas. White around both title and diagram, no heavy card/background.
```

### 第 03 页

```text
Primary request: approaching a limit through a number sequence. Exact main title (verbatim): "从数列变化理解趋近过程". Small exact course label (verbatim): "高等数学 A". The full Chinese title must be spelled correctly in one readable line, moderately smaller only if needed to fit generous margins. Beneath the title include the exact minimal caption: "不断靠近，趋向同一个值". Center below that a wide clean horizontal blue-gray number line with a row of 8 Rain-blue dots, in increasing positions from left to right whose spacing gets progressively smaller as they approach a clearly marked endpoint on the right. Endpoint is a thin vertical marker labeled "L"; all the dots remain strictly left of the endpoint. Dot sizes equal. Add a small light-blue rightward direction arrow below the dots. White background, no legend and no extra formulas.
```

### 第 04 页

```text
Primary request: conceptual lesson summary. Exact main title (verbatim): "课堂小结". Small exact course label (verbatim): "高等数学 A". Beneath the title create a simple restrained academic conceptual overview: two equally prominent pale blue outlined or softly filled circular areas side by side, one labeled (verbatim) "极限" with short caption (verbatim) "描述趋近的结果", the other labeled (verbatim) "连续" with short caption (verbatim) "变化过程平稳衔接". A small clean blue connecting line or arrow between the concepts. Include below one exact short caption: "理解变化，建立联系". Both labels and their captions must be clearly readable, with generous white space and no other text. No Venn overlap unless it communicates a simple shared relationship; avoid implying mathematically false set inclusion.
```

