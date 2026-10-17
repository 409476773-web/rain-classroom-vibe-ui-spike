# NetworkChart

Rain 原生关系网络，`registry-candidate` / `unpublished`。节点类别、边关系类型和方向分别表达，复用现有 Rain 图表配色、Button、Table 与 Motion；没有力导模拟或新安装依赖。

```tsx
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "@rain-next/ui/charts/styles.css";
import { NetworkChart } from "@rain-next/ui/charts";

<NetworkChart caption="课程先修关系" variant="glow" data-recipe="monochrome-blue"
  categories={[{ id: "course", label: "课程", color: "var(--chart-1)" }]}
  relations={[{ id: "before", label: "先修", color: "var(--chart-2)", lineStyle: "solid" }]}
  nodes={[{ id: "math", label: "高等数学", category: "course" },
    { id: "probability", label: "概率统计", category: "course" }]}
  edges={[{ id: "math-probability", source: "math", target: "probability", relation: "before", directed: true }]}
  onNodeSelect={node => console.log(node?.id ?? null)} />;
```

宿主使用既有 Tailwind / Foundations 桥接并扫描 Registry 源码，以生成 Button/Table 的已有 utility；加载上述 UI 样式以保留按钮、表格和 Focus。只复制图表文件会遗漏统一入口引用的本地依赖，源码安装采用 `registry/charts.json` 的 `shared.files + item.files`。API 不要求从 UI 根入口导入图表。

| Props / 公共 helper | 合同 |
| --- | --- |
| `nodes` | `readonly NetworkNode[]`：`{id,label,category,x?,y?}`。ID唯一且非空，名称和类别非空；坐标必须成对、有限。 |
| `edges` | `readonly NetworkEdge[]`：`{id,source,target,relation,directed,value?}`。ID唯一，端点有效，自环拒绝；多节点环路及同一节点对的多关系有效。可选权重有限、非负，0保留，未提供显示“未提供”。 |
| `categories` | `{id,label,color?}[]`，唯一非空ID与名称；每个节点的category必须命中。未设颜色时按声明顺序取`--chart-1…`，宿主保持类别顺序或显式按ID指定颜色。 |
| `relations` | 同类别配置，另有`lineStyle?: "solid" \| "dashed" \| "dotted"`；每条边的relation必须命中。箭头由边的directed决定，线型不推断方向。 |
| `caption` | 图表名称，同时用于图示、完整关系列表、节点/关系精确表名称。 |
| `variant` | `"glow" \| "structured"`，默认`glow`。柔光圆点与结构化名称卡按传入坐标呈现，保留关系方向和选择身份；与`data-recipe`配色独立。 |
| `reducedMotion` | 显式减少运动；系统减少运动仍独立生效，过渡即时完成。 |
| `onNodeSelect` | 鼠标点击图形或列表按钮/Enter选择同一节点，回传原始节点；清除选择或当前输入移除选中节点时回传null。 |
| `className`, `style`及普通根div属性 | 宿主控制容器与局部配方；根保留`.rain-chart`及`data-rain-id="ui-chart-network"`。 |
| `layoutNetwork(nodes, edges)` | 校验图结构，按ID确定顺序。成对的`0…1`坐标原样保留；其他坐标单位整体拟合。无坐标用稳定的自然环绕位置，至少5节点且最大邻接数不少于3时将一个连接较多的节点放在内部。返回带x/y的节点及带lane的边，不修改输入、不启动力导循环。 |

默认柔光网络沿用原稿的实色中心向透明外缘渐变，普通节点没有深色描边，名称置于节点外。结构化关系用名称卡和类别色点，宿主应为卡片留出连线空间；不把有向关系自动解释成阶段或层级。类别图例与关系图例分别表达；关系使用颜色、实/虚/点线和原稿式实心等边三角箭头。箭头沿曲线末端方向，长度为当前线宽的5倍，高度为5.7735倍；颜色与透明度随所属关系，高亮线宽同步改变箭头，尖端保持既有边端点。来源为Figma CH-083的`ARROW_EQUILATERAL`矢量，见[箭头反馈证据](../../../../../evidence/runtime/chart-network-arrow-feedback-2026-10-10/verification.md)。选中节点使用类别色轮廓。

连线根据节点形状、名称边界和同节点对的独立路径选择浅弧或绕行曲线，端点停在节点外。结构化曲线使用卡片侧边端口与朝外的控制点，分开同侧的多条线，并把来源、目标卡片内部纳入避让。反向、平行和无向关系仍是独立记录，不合并成虚构路径。权重只在详情和精确表展示，线宽、距离及节点面积不编码权重；位置不能解释为相关度、掌握程度或业务优先级。

SVG为装饰图形；具名节点按钮提供键盘和触屏等价选择。指向图形或聚焦列表突出相邻节点与边，选中后保留详情与“清除节点选择”；不相邻项淡化。精确表包括节点名称/类别/ID和关系来源/目标/类型/方向/原始读数。图中文字按估算字宽截短并最多分成两行，按钮、详情和表格保留全文。没有节点时显示状态，不创造关系；单节点可以选择并明确“暂无相邻关系”。

宿主应先对完整数据调用`layoutNetwork`并准备当前样式的位置，再筛选，保留该样式的节点位置；未经固定坐标的任意输入变化仍可能改变回退布局。悬停、选择和换色不重算几何。柔光数据更新沿用240ms Motion过渡；结构化的节点位置与边路径即时同步更新，避免端口换侧时插值穿进卡片，高亮透明度仍使用短过渡。切换样式时节点形状和连线端口同时更新。配色和样式切换不清除选中ID；当前输入隐藏选中节点后清除选择。每实例箭头和渐变通过useId隔离，没有额外筛选引擎、重播API或图编辑操作。

Playground `/#chart-network`与独立原型`/bklit-catalog.html#chart-network`复用四组Mock：CH-065教学元素与知识点、CH-070知识点关联、CH-083课程先修/相似、CH-086理论实践反馈环路。业务页关系筛选、状态、更新、呈现样式和配色由宿主拥有；下载包含当前配置、真实fixture与样式，不导入旧G2原型。旧下载配置省略variant时仍使用glow。原17 Bklit和170官网变体身份保留，Network是第19个入口的Rain本地增量。

两种样式的业务数据相同，宿主分别准备完整布局。柔光保留已确认的自然错位位置；结构化的纯来源→目标映射使用两侧排列，其余图按已声明的节点类别分列。分组列不表示先修阶段，跨列、同列、反向和反馈关系全部保留。切回柔光恢复原来的位置。

当前四组样本为8—11节点、10—19条边，坐标视框960×560。容器宽度不超过620px时隐藏缩小的图示，改用包含全部关系的文字列表，节点选择、详情和精确表继续可用；恢复宽容器时重新显示图示。不会静默删边。

几何使用有限候选曲线，已检查这四组样本的正常/长名称、三个更新版本及两种样式。它不能保证任意密集、重叠坐标、特殊字体或大量节点的布局最优及完整避让；大规模输入需要另行引入图布局引擎和验证。没有拖拽编辑、缩放或物理布局。当前结果见[结构化反馈证据](../../../../../evidence/runtime/chart-network-structured-feedback-2026-10-10/verification.md)，此前记录见[视觉调整证据](../../../../../evidence/runtime/chart-network-visual-refinement-2026-10-09/verification.md)与[P4证据](../../../../../evidence/runtime/chart-business-expansion/p4/verification.md)。2026-10-10用户确认当前柔光视图；结构化实施视觉审阅、完整对比度、真实Safari/VoiceOver、物理触屏、forced-colors、深色主题及生产数据验证仍独立待办。
