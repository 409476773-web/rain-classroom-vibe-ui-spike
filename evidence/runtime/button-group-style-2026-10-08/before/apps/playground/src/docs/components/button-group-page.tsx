import { useState } from "react";
import { Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@rain-next/ui";
import { ComponentDoc, DocExample } from "./component-doc";
import "./button-group-page.css";

function horizontalCode(separated = false) {
  const label = separated ? "带分隔线的编辑操作" : "编辑操作";
  return `import { useState } from "react";
import { Button, ButtonGroup${separated ? ", ButtonGroupSeparator" : ""} } from "@rain-next/ui";

export function ${separated ? "SeparatedEditingExample" : "EditingExample"}() {
  const [canRedo, setCanRedo] = useState(false);
  const [result, setResult] = useState("尚未执行操作");
  return <>
    <ButtonGroup aria-label="${label}">
      <Button variant="tertiary" onClick={() => { setCanRedo(true); setResult("已撤销当前示例更改"); }}>撤销</Button>
${separated ? "      <ButtonGroupSeparator />\n" : ""}      <Button variant="tertiary" disabled={!canRedo} onClick={() => { setCanRedo(false); setResult("已重做当前示例更改"); }}>重做</Button>
      <Button variant="tertiary" onClick={() => { setCanRedo(false); setResult("已恢复默认设置"); }}>恢复</Button>
    </ButtonGroup>
    <p role="status" aria-label="${label}反馈">{result}</p>
  </>;
}`;
}

const verticalCode = `import { useState } from "react";
import { Button, ButtonGroup, ButtonGroupSeparator } from "@rain-next/ui";

export function ChapterActionsExample() {
  const [result, setResult] = useState("尚未移动章节");
  return <>
    <ButtonGroup orientation="vertical" aria-label="章节操作">
      <Button variant="tertiary" onClick={() => setResult("已上移章节")}>上移</Button>
      <ButtonGroupSeparator orientation="horizontal" />
      <Button variant="tertiary" onClick={() => setResult("已下移章节")}>下移</Button>
    </ButtonGroup>
    <p role="status" aria-label="章节操作反馈">{result}</p>
  </>;
}`;

const textCode = `import { useState } from "react";
import { Button, ButtonGroup, ButtonGroupText } from "@rain-next/ui";

export function DraftActionsExample() {
  const [result, setResult] = useState("尚未保存草稿");
  return <>
    <ButtonGroup aria-label="提交操作">
      <ButtonGroupText>当前草稿</ButtonGroupText>
      <Button variant="secondary" onClick={() => setResult("已保存当前草稿")}>保存</Button>
    </ButtonGroup>
    <p role="status" aria-label="提交操作反馈">{result}</p>
  </>;
}`;

function EditingActions({ separated = false }: { separated?: boolean }) {
  const [canRedo, setCanRedo] = useState(false);
  const [result, setResult] = useState("尚未执行操作");
  const label = separated ? "带分隔线的编辑操作" : "编辑操作";
  return <>
    <ButtonGroup aria-label={label}>
      <Button variant="tertiary" onClick={() => { setCanRedo(true); setResult("已撤销当前示例更改"); }}>撤销</Button>
      {separated && <ButtonGroupSeparator />}
      <Button variant="tertiary" disabled={!canRedo} onClick={() => { setCanRedo(false); setResult("已重做当前示例更改"); }}>重做</Button>
      <Button variant="tertiary" onClick={() => { setCanRedo(false); setResult("已恢复默认设置"); }}>恢复</Button>
    </ButtonGroup>
    <p role="status" aria-label={`${label}反馈`}>{result}</p>
  </>;
}

export function ButtonGroupPage() {
  const [chapterResult, setChapterResult] = useState("尚未移动章节");
  const [saveResult, setSaveResult] = useState("尚未保存草稿");
  return <ComponentDoc id="button-group" title="Button Group 按钮组" description="把同一任务的命令连接起来，每个按钮仍独立执行。方向由组控制，按钮状态由宿主提供；同组按钮采用同尺寸。"
    useWhen={["相关命令需要合并边界并形成一个操作区。"]} avoidWhen={["互斥显示模式或多选状态使用 Toggle Group；普通导航使用导航组件。"]}
    props={[
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "组排列方向。" },
      { name: "aria-label", type: "string", description: "说明按钮组的整体用途。" },
      { name: "children", type: "ReactNode", description: "Button、ButtonGroupText 与 ButtonGroupSeparator 作为直接子项；同组按钮采用同尺寸。" },
      { name: "ButtonGroupSeparator.orientation", type: '"horizontal" | "vertical"', default: '"vertical"', description: "分隔线方向；与组方向正交。" },
      { name: "ButtonGroupText.render", type: "Base UI useRender", description: "静态标签匹配默认或紧凑普通按钮的字号；不承担按钮或选择状态。" },
    ]} slots={["button-group", "button-group-text", "button-group-separator"]} source="packages/ui/src/button-group/button-group.tsx" code={horizontalCode()}>
    <DocExample title="横向基准" description="按钮直接连接，不额外插入分隔线。Tab 依次进入每个可用按钮，Enter 执行当前按钮；禁用按钮跳过。" code={horizontalCode()}>
      <EditingActions />
    </DocExample>
    <DocExample title="横向显式分隔线" description="需要在相关命令之间强调边界时，显式插入竖向分隔线。此组的撤销与重做状态独立。" code={horizontalCode(true)}>
      <EditingActions separated />
    </DocExample>
    <DocExample title="竖向排列" description="竖向组的分隔线设置为 horizontal；按钮仍独立进入 Tab 顺序。" code={verticalCode}>
      <ButtonGroup orientation="vertical" aria-label="章节操作"><Button variant="tertiary" onClick={() => setChapterResult("已上移章节")}>上移</Button><ButtonGroupSeparator orientation="horizontal" /><Button variant="tertiary" onClick={() => setChapterResult("已下移章节")}>下移</Button></ButtonGroup>
      <p role="status" aria-label="章节操作反馈">{chapterResult}</p>
    </DocExample>
    <DocExample title="文字与保存" description="ButtonGroupText 是静态说明文字，与保存按钮连接；它不承担按钮或选择状态。" code={textCode}>
      <ButtonGroup aria-label="提交操作"><ButtonGroupText>当前草稿</ButtonGroupText><Button variant="secondary" onClick={() => setSaveResult("已保存当前草稿")}>保存</Button></ButtonGroup>
      <p role="status" aria-label="提交操作反馈">{saveResult}</p>
    </DocExample>
  </ComponentDoc>;
}
