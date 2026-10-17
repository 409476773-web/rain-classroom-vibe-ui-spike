import { useRef, useState } from "react";
import { Button, ResizablePanelGroup, ResizablePanel, ResizableHandle, type ResizableGroupHandle } from "@rain-next/ui";
import { ComponentDoc, DocExample } from "./component-doc";
import "./g1-component-pages.css";

const code = `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@rain-next/ui";

<div style={{ height: 240 }}>
  <ResizablePanelGroup orientation="horizontal">
    <ResizablePanel id="answer" defaultSize="55%" minSize="25%" maxSize="75%">作答</ResizablePanel>
    <ResizableHandle withHandle aria-label="调整作答与评分依据宽度" />
    <ResizablePanel id="rubric" minSize="25%">评分依据</ResizablePanel>
  </ResizablePanelGroup>
</div>`;

function SplitExample({ id, vertical = false, disabled = false }: { id: string; vertical?: boolean; disabled?: boolean }) {
  const groupRef = useRef<ResizableGroupHandle>(null);
  const [layout, setLayout] = useState<Record<string, number>>({});
  const answer = `${id}-answer`, rubric = `${id}-rubric`;
  return <div className="g1-doc-stack">
    <Button variant="secondary" onClick={() => groupRef.current?.setLayout({ [answer]: 55, [rubric]: 45 })}>恢复比例</Button>
    <div className="g1-doc-split" data-orientation={vertical ? "vertical" : "horizontal"}>
      <ResizablePanelGroup groupRef={groupRef} orientation={vertical ? "vertical" : "horizontal"} onLayoutChanged={setLayout}>
        <ResizablePanel id={answer} defaultSize="55%" minSize="25%" maxSize="75%"><div className="g1-doc-pane"><h3>示例作答</h3><p>物体保持静止或匀速直线运动，需要合外力为零。惯性是物体固有的属性，不能看作维持运动的力。</p><p>判断运动状态是否变化，应分析合外力，而不是只看速度大小。</p></div></ResizablePanel>
        <ResizableHandle withHandle disabled={disabled} aria-label={vertical ? "调整上下内容高度" : disabled ? "不可调整的作答与评分依据分隔条" : "调整作答与评分依据宽度"} />
        <ResizablePanel id={rubric} minSize="25%"><div className="g1-doc-pane"><h3>评分依据</h3><p>研究对象与现象说明</p><p>区分惯性与力</p><p>表达与适用条件</p></div></ResizablePanel>
      </ResizablePanelGroup>
    </div>
    <p role="status">作答区域：{Math.round(layout[answer] ?? 55)}%；评分依据：{Math.round(layout[rubric] ?? 45)}%</p>
  </div>;
}

export function ResizablePage() {
  return <ComponentDoc id="resizable" title="Resizable 可调分区" description="用拖动和键盘调整相邻内容的空间，面板内部保持独立阅读。"
    useWhen={["用户需要分配相邻阅读与判断区域的空间。", "预览区与说明区需要调整宽度或高度。"]}
    avoidWhen={["固定网格使用 CSS 或 Layout。", "不另写拖动或键盘引擎。", "拖动和恢复比例不隐式保存、切换或清空业务内容。"]}
    props={[
      { name: "Group.orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "分区排列方向；Group 占满父级高度。" },
      { name: "Group.groupRef", type: "Ref<ResizableGroupHandle>", description: "setLayout({ panelId: percentage }) 从宿主恢复比例。" },
      { name: "Group.defaultLayout / onLayoutChanged", type: "Layout / (layout) => void", description: "初始比例和布局变化结果；没有额外受控 layout 属性。" },
      { name: "Panel.id", type: "string", description: "每个 Panel 的稳定唯一 ID。" },
      { name: "Panel.defaultSize / minSize / maxSize", type: "number | string", description: "4.x 数字为像素；百分比必须写为 55% 等字符串。" },
      { name: "Handle.withHandle", type: "boolean", default: "false", description: "显示已有 2×24px 握柄。" },
      { name: "Handle.disabled / aria-label", type: "boolean / string", description: "禁止交互或说明调节对象；其余 Props 沿用原引擎。" },
    ]} slots={["ResizablePanelGroup", "ResizablePanel", "ResizableHandle"]}
    source="packages/ui/src/resizable/resizable.tsx" code={code}>
    <DocExample title="横向调宽与宿主恢复" description="拖动分隔条，或聚焦后按方向键、Home、End；边界为25%–75%。容器高度与内部滚动由宿主定义。" code={`const groupRef = useRef<ResizableGroupHandle>(null);
<ResizablePanelGroup groupRef={groupRef}>…</ResizablePanelGroup>
groupRef.current?.setLayout({ answer: 55, rubric: 45 });`}><SplitExample id="horizontal" /></DocExample>
    <DocExample title="纵向调高" description="每组管理自己的比例；改变上一组不会影响本组。"><SplitExample id="vertical" vertical /></DocExample>
    <DocExample title="禁用分隔条" description="禁止用户拖动与键盘调节；宿主仍可调用恢复比例。"><SplitExample id="disabled" disabled /></DocExample>
  </ComponentDoc>;
}
