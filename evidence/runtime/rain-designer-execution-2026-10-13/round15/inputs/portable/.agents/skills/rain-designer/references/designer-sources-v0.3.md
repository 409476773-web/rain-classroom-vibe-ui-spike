# Designer v0.3：来源、推导与适用边界

登记日期：2026-10-06  
用途：供人类维护、审阅和追溯，不是 AI 每次生成页面前的必读材料。

## 1. 本轮材料范围

本轮重新读取了 Google 在 Coursera 发布的四个课程公开页面、Laws of UX 相关原则页面，以及前文已经同意纳入的 NN/g 文章和 Robin Williams 出版社公开节选。公开课程页面提供学习目标、模块说明和课程条目，不等同于已取得所有讲义与视频内容。

没有获得原先两篇 Notion 正文，也没有取得《Laws of UX》整本书。因此本文件不声称完成了两套资料的全文学习，不把 Notion 标题中的“2.0”直接认定为书籍第二版。

Figma 部分沿用本对话已提供的《雨课堂-设计案例校准-v0.1.md》中的观察记录；本轮未重新打开或操作 Figma，也没有验证线上产品。案例仅作为方法研究的输入，不成为默认页面模板或运行时检索步骤。

下文区分：原始来源支持的主题、针对当前用途所作的应用推导、以及暂时没有证据支持的结论。

## 2. Google UX：保留来源组织与术语

### G1. Start the UX Design Process: Empathize, Define, and Ideate

来源：https://www.coursera.org/learn/start-ux-design-process

公开模块依次涉及：Empathizing with users and defining pain points；Creating user stories and user journey maps；Defining user problems；Ideating design solutions。

**可支持：**设计需要理解使用者、明确问题并探索方案，来源也涉及问题陈述与假设。

**本项目转译：**以面向界面的业务理解作为前置，按任务需要选择研究方法，而不是每次完整重做课程作业。这是用途裁剪，不是 Google 对所有设计任务的强制建议。

### G2. Build Wireframes and Low-Fidelity Prototypes

来源：https://www.coursera.org/learn/wireframes-low-fidelity-prototypes

公开内容从用户流程和故事板进入纸面／数字线框，再到低保真原型；包括 Information Architecture，以及 similarity、proximity、common region 等分组原则。

**可支持：**信息组织、结构探索与行为原型属于设计工作，并不是只在视觉完成后追加交互。

**本项目转译：**先理解关系，再选择表达；允许结构因内容与任务不同而变化。该课程纲要不能证明某一种教育 SaaS 导航或工作台结构更优。

### G3. Create High-Fidelity Designs and Prototypes in Figma

来源：https://www.coursera.org/learn/high-fidelity-designs-prototype

公开模块为 Starting to create mockups；Applying visual design principles to mockups；Exploring design systems；Creating high-fidelity prototypes；Testing and iterating on designs。

明确列出的主题包括 typography、color、iconography、grids、containment、negative space，以及 emphasis、hierarchy、scale and proportion、unity and variety 和 Gestalt Principles。

**可支持：**视觉构成、设计系统、交互原型与迭代都有其独立内容；不能把高保真仅理解为给低保真补颜色。

**本项目转译：**将这些主题整理为五组视觉判断，并保留视觉兴趣和品牌表达。这五组不是 Google 的原始分类，也不提供具体字号、间距或布局数值的来源证明。

### G4. Conduct UX Research and Test Early Concepts

来源：https://www.coursera.org/learn/conduct-ux-research

公开目标包含规划和开展可用性研究、综合观察形成洞察、分享洞察，以及据此调整低保真设计。

**可支持：**观察、解释、洞察与设计修改相互连接。

**本项目转译：**明确区分 AI 静态自查、原型操作检查和真实参与者测试。四类变化检查、局部改动按风险选择验证范围，是本项目的方法建议，不是课程的固定测试量表。

Google 的 Empathize → Define → Ideate → Prototype → Test 主线仍保留为来源组织。运行时不要求线性完成所有步骤，也不把课程的求职、作品集或交付章节自动加入当前设计辅助。

## 3. Laws of UX：原义与本项目取用方式

以下为对应官网条目的短释义；不代表书籍各章节的全文内容。不同条目的理论性质与适用范围并不完全相同，不作为能够互换的数学公式。

| 来源与原术语 | 官网中可读取的核心表述 | 本指南取用与边界 |
|---|---|---|
| [L1 · Jakob’s Law](https://lawsofux.com/jakobs-law/) | 用户会将熟悉产品中的预期带到相似产品中。 | 用于关注含义和行为的熟悉性；不要求复制既有页面布局。 |
| [L2 · Fitts’s Law](https://lawsofux.com/fittss-law/) | 目标获取与目标距离、大小有关。 | 用于检查操作目标与空间；不据此统一放大所有控制。 |
| [L3 · Miller’s Law](https://lawsofux.com/millers-law/) | 条目以工作记忆限制引入信息分块，并明确提醒不要滥用“七”制造设计限制。 | 取用有意义的分组，不设菜单、模块或选项数量上限。 |
| [L4 · Hick’s Law](https://lawsofux.com/hicks-law/) | 决策时间与选择数量、复杂度有关，也提醒不要过度简化到抽象难懂。 | 取用对选择过程的检查；隐藏与分步不是通用最优解。 |
| [L5 · Postel’s Law](https://lawsofux.com/postels-law/) | 对输入和用户能力保持包容，同时提供边界和清楚反馈；原背景为网络／软件健壮性原则。 | 转译为有限度容错；不静默改写有歧义的业务意图。 |
| [L6 · Peak–End Rule](https://lawsofux.com/peak-end-rule/) | 回顾体验时，高峰与结束时刻可能具有较大影响。 | 作为关键时刻与结束体验的补充角度，不强制庆祝动效，也不忽视中间过程。 |
| [L7 · Aesthetic–Usability Effect](https://lawsofux.com/aesthetic-usability-effect/) | 美观会影响感知易用性，也可能掩盖可用性问题。 | 区分视觉完成度与交互验证；不宣称漂亮即实际更好用。 |
| [L8 · Von Restorff Effect](https://lawsofux.com/von-restorff-effect/) | 相似对象中的差异项更容易被记住；应用建议包含克制相互竞争的强调。 | 用于检查重点与差异；不能直接证明某一焦点布局效率更高。 |
| [L9 · Tesler’s Law](https://lawsofux.com/teslers-law/) | 核心复杂性不能简单消除，需要考虑由系统或用户承担。 | 提醒检查负担是否只是被转移；不是复杂度可精确计量的设计公式。 |
| [L10 · Doherty Threshold](https://lawsofux.com/doherty-threshold/) | 强调快速反馈，条目使用约400毫秒的参考。 | 本指南取用及时反馈，不将该数值设为所有业务处理的硬时限。 |
| [L11 · Law of Proximity](https://lawsofux.com/law-of-proximity/) | 接近的元素容易被感知为一组。 | 支持通过空间表达关联；不推导固定组内／组间比例。 |
| [L12 · Law of Common Region](https://lawsofux.com/law-of-common-region/) | 共享明确区域的元素容易被分组，区域可通过边界或背景形成。 | 支持分组方式选择；不要求所有内容套卡片。 |
| [L13 · Law of Similarity](https://lawsofux.com/law-of-similarity/) | 相似视觉特征会暗示元素之间有关联。 | 支持角色一致与分类表达；不把语义不同的内容强制同形。 |

**明确未直接采纳的内容：**Doherty 页面还包含通过进度表现或人为延迟改变感知的建议。本项目没有将其改写成来源只主张“真实反馈”，而是明确选择不把假进度或故意拖慢作为默认指导。这个选择属于本项目的诚信与设计边界，并非对原文的无声修正。

## 4. 已确认纳入的补充来源

### N1. Jakob Nielsen：10 Usability Heuristics for User Interface Design

来源：https://www.nngroup.com/articles/ten-usability-heuristics/

原始十项为：Visibility of System Status；Match Between the System and the Real World；User Control and Freedom；Consistency and Standards；Error Prevention；Recognition Rather than Recall；Flexibility and Efficiency of Use；Aesthetic and Minimalist Design；Help Users Recognize, Diagnose, and Recover from Errors；Help and Documentation。

文章明确将其称为一般性的 heuristics，而不是具体实施规格。本项目将相关内容与 Laws of UX 合并组织成五组交互判断。这五组不是 NN/g 十项原则的新译名，不替代其原始结构。

### N2. Kelley Gordon：5 Principles of Visual Design in UX

来源：https://www.nngroup.com/articles/principles-visual-design/

原分类是 Scale、Visual Hierarchy、Balance、Contrast、Gestalt。文章说明对比也可表达类别、功能和行为差异，并讨论非对称平衡与文字可读性风险。

**本项目取用：**相对层级、多种视觉手段与差异含义的辨认。

**未直接取用：**文章含有少量字号数量等经验建议，本指南没有据此设置全局数量上限；这属于对用途的选择，不冒称原文没有该建议。

### N3. Recognition and Recall in User Interfaces

来源：https://www.nngroup.com/articles/recognition-and-recall/

用于支持让任务信息容易识别或找回，减少不必要的跨界面记忆负担。“只保持仍然有效的状态”是本项目进一步的交互推导。

### N4. Visibility of System Status

来源：https://www.nngroup.com/articles/visibility-system-status/

用于支持清楚传达状态和给予适当反馈。将异步反馈关联原对象、区分局部与全局影响，是本指南对复杂界面的具体推导。

### N5. User Control and Freedom

来源：https://www.nngroup.com/articles/user-control-and-freedom/

用于区分返回、取消、关闭与撤销等控制意图。项目实际支持哪些恢复能力，仍需业务依据，不能单靠原则发明。

### N6. Error-Message Guidelines

来源：https://www.nngroup.com/articles/error-message-guidelines/

用于支持错误说明与可行的恢复指导。本指南不从该文章复制一套固定视觉提示样式。

### R1. Robin Williams：The Use of Repetition in Design

来源：https://www.peachpit.com/articles/article.aspx?p=2268752

这是出版社发布的《The Non-Designer’s Design Book》第四版节选，讨论重复如何建立统一和视觉兴趣、重复不一定意味着完全相同，以及过度重复的问题。

**本项目取用：**共同语言中的变化，并保留审美和形式趣味的正当位置。

**边界：**本轮不是重新通读该书所有章节，不把其书页中的具体字号与装饰示例升级为雨课堂规范。

## 5. 从页面观察到方法：只提炼关系，不传递模板

以下均来源于本对话已经提供的《雨课堂-设计案例校准-v0.1.md》相应章节。来源记录中的设计处理不等于其效果已经被验证；本轮不复制截图或人员资料，不要求原型生成时读取这些页面。

| 观察材料 | 可以提出的设计推论 | 不能推导成 |
|---|---|---|
| L1/L2：两类对象卡片具有不同信息重心 | 信息角色与识别／比较需要应先于外观决定 | 两种卡片模板，或图片／数值的固定用法 |
| R1：分类贯穿空间、标题与配色 | 分组线索应相互支持并表达一致的关系 | 固定三列、固定蓝青紫或固定阶段结构 |
| R2、F1：同页不同区域具有不同内部组织 | 局部构图可随内容变化，统一不等于同构 | 固定对象详情布局或固定表单列数 |
| L4：共同的列表角色容纳不同进展表达 | 统一角色与位置，允许状态形式符合真实含义 | 所有任务都使用百分比或同一种进度图 |
| W1：导航、阅读与工具并置，密度不同 | 空间与注意力可按区域任务分配 | 所有工作台三栏、评分工具必须在右侧 |
| W1：展示稿中出现题目高亮与标题不一致 | 需要检查跨区域对象和状态是否一致 | 断言线上产品存在同样问题或交互已验证 |

这些推论需要在新任务中继续检查。来源可信、用户认可页面、设计推论合理，是三件不同的事；其中任何一项都不自动证明另一项。

## 6. 指南章节与证据对应

| 指南内容 | 主要依据 | 综合或新增的部分 |
|---|---|---|
| 面向界面的业务理解 | G1、G2 | 分析到足以支持当前界面即停止；不扩展商业和数据分析角色 |
| V1 关系与分组 | G2、L11—L13 | 多线索一致性、不同关系的分隔强度与跨状态检查 |
| V2 主次与焦点 | G3、N2、L8 | 语义层级、注意力层级、操作优先级的分开判断 |
| V3 秩序与稳定 | R1、G3 | 稳定角色而非冻结像素，长内容下的规律保持 |
| V4 空间与节奏 | G3、N2、L2、L4、L9 | 区分内容数量、阅读和操作密度；按区域任务分配空间 |
| V5 统一与变化 | G3、R1、L13、L7 | 审美表达与业务含义分开，不把装饰误作数据编码 |
| I1 含义清楚 | N1、L1 | 根据行为而不是外观选择表达 |
| I2 结果可预期 | N1、L4 | 对象、作用范围、后果与业务缺失的处理 |
| I3 反馈可见 | N4、L10 | 异步反馈的对象关联，以及真实反馈的项目边界 |
| I4 控制与恢复 | N5、N6、L5 | 恢复能力依赖真实业务，不凭空提供撤销 |
| I5 连续与一致 | N3、L1、N1 | 有效状态保留与失效状态重确认 |
| 设计评议 | G4、G3、L7 | 变化条件检查、证据分级以及不以理论引用量衡量质量 |

## 7. 哪些问题仍未被这些材料回答

没有取得完整讲义或书籍，不能提供其未公开章节的细节。现有材料也不能直接决定雨课堂的最终字号、颜色、密度、滚动结构或某个业务方案；这些需由当前规范、任务条件和设计验证提供依据。

尚未开展指南有／无条件的独立任务对比，没有测量生成效率、视觉质量、设计师返工或交互遗漏的变化。v0.3 不承诺“加载文档即稳定改善设计”。

## 8. 对旧记录的解释更新

《雨课堂-设计案例校准-v0.1.md》中“命中任务时读取对应案例”的调用建议，已被当前用户方向取代：历史页面回到研究材料层，不再作为设计辅助的默认方案入口。原文件保留历史记录，本轮没有覆盖其内容。

v0.3 的核心文件不包含页面链接、截图、页面骨架或场景模板。它与本来源说明分开交付，目的在于让方法可以脱离原页面使用，同时仍可追溯概念和推论。

## 9. 后续审阅标准

优先检查：是否提供足够的设计判断而不过早规定形式；是否同时保留交互质量和视觉表达；是否混入没有依据的业务结论；是否把一般原则误写成绝对规律。

之后使用未参与上述提炼的新任务，观察不同方案是否仍能保持关键关系，记录具体错误、设计师修改与未验证项。这里不固定任务版式、不要求预先指定正确截图，也不以与旧页面的相似度作为成功指标。
