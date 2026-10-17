import { useState } from "react";
import { Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@rain-next/ui";
import { ComponentDoc, DocCode, DocExample } from "./component-doc";
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

const buttonSizes = [
  { size: "mini", label: "Mini · 28px" },
  { size: "small", label: "Small · 32px" },
  { size: "medium", label: "Medium · 36px" },
  { size: "large", label: "Large · 40px" },
  { size: "xl", label: "XL · 48px" },
] as const;

const sizesCode = `import { useState } from "react";
import { Button, ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from "@rain-next/ui";

export function ButtonGroupSizesExample() {
  const [result, setResult] = useState("请选择可用操作");
  const sizes = ["mini", "small", "medium", "large", "xl"] as const;
  return <>
    {sizes.map(size => <div key={size} className="overflow-x-auto p-rain-4">
      <ButtonGroup aria-label={size + " 横向按钮组"}>
        <Button size={size} variant="tertiary" onClick={() => setResult(size + "：已撤销")}>撤销</Button>
        <Button size={size} variant="tertiary" disabled>重做</Button>
        <Button size={size} variant="tertiary" onClick={() => setResult(size + "：已恢复")}>恢复</Button>
      </ButtonGroup>
      <ButtonGroup aria-label={size + " 文字按钮组"}>
        <ButtonGroupText>当前草稿</ButtonGroupText>
        <Button size={size} variant="secondary" onClick={() => setResult(size + "：已保存")}>保存</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" aria-label={size + " 竖向按钮组"}>
        <ButtonGroupText>章节</ButtonGroupText>
        <Button size={size} variant="tertiary" onClick={() => setResult(size + "：已添加")}>添加</Button>
        <ButtonGroupSeparator orientation="horizontal" />
        <Button size={size} variant="tertiary" disabled>移除</Button>
      </ButtonGroup>
    </div>)}
    <p role="status">{result}</p>
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

function ExampleCode({ code }: { code: string }) {
  return <details className="button-group-example-code"><summary>查看代码</summary><DocCode code={code} /></details>;
}

const disabledStates = [
  { name: "正常", disabled: [] },
  { name: "首项禁用", disabled: [0] },
  { name: "中间禁用", disabled: [1] },
  { name: "末项禁用", disabled: [2] },
  { name: "全部禁用", disabled: [0, 1, 2] },
];

export function ButtonGroupPage() {
  const [sizeResult, setSizeResult] = useState("每组使用相同 size；不指定时随密度选择 Medium 或 Small。");
  const [stateResult, setStateResult] = useState("点击可用按钮，检查反馈与焦点；禁用按钮不可执行。");
  const [chapterResult, setChapterResult] = useState("尚未移动章节");
  const [saveResult, setSaveResult] = useState("尚未保存草稿");
  return <ComponentDoc id="button-group" title="Button Group 按钮组" description="把同一任务的命令连接起来，每个按钮仍独立执行。方向由组控制，按钮状态由宿主提供；同组按钮采用同尺寸。"
    useWhen={["相关命令需要合并边界并形成一个操作区。"]} avoidWhen={["互斥显示模式或多选状态使用 Toggle Group；普通导航使用导航组件。"]}
    props={[
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "组排列方向。" },
      { name: "aria-label", type: "string", description: "说明按钮组的整体用途。" },
      { name: "children", type: "ReactNode", description: "Button、ButtonGroupText 与 ButtonGroupSeparator 作为直接子项；同组按钮采用同尺寸。" },
      { name: "子 Button.size", type: '"mini" | "small" | "medium" | "large" | "xl"', description: "显式 size 优先于密度；同组普通按钮保持一致，组内附加文字自动匹配。" },
      { name: "ButtonGroupSeparator.orientation", type: '"horizontal" | "vertical"', default: '"vertical"', description: "分隔线方向；与组方向正交。" },
      { name: "ButtonGroupText.render", type: "Base UI useRender", description: "静态标签跟随同组普通 Button 的实际尺寸；不承担按钮或选择状态。" },
    ]} slots={["button-group", "button-group-text", "button-group-separator"]} source="packages/ui/src/button-group/button-group.tsx" code={horizontalCode()}>
    <DocExample title="多尺寸" description="沿用 Button 的五档尺寸，横向、附加文字和竖向组合保持相同规格。窄容器中的大尺寸组可横向滚动。">
      <div className="button-group-size-list">
        {buttonSizes.map(({ size, label }) => <div className="button-group-state button-group-size-row" key={size}>
          <span>{label}</span>
          <div className="button-group-size-examples">
            <div className="button-group-size-scroll"><ButtonGroup aria-label={`${size} 横向按钮组`}>
              <Button size={size} variant="tertiary" onClick={() => setSizeResult(`${label}：已撤销`)}>撤销</Button>
              <Button size={size} variant="tertiary" disabled>重做</Button>
              <Button size={size} variant="tertiary" onClick={() => setSizeResult(`${label}：已恢复`)}>恢复</Button>
            </ButtonGroup></div>
            <div className="button-group-size-scroll"><ButtonGroup aria-label={`${size} 文字按钮组`}>
              <ButtonGroupText>当前草稿</ButtonGroupText><Button size={size} variant="secondary" onClick={() => setSizeResult(`${label}：已保存`)}>保存</Button>
            </ButtonGroup></div>
            <div className="button-group-size-scroll"><ButtonGroup orientation="vertical" aria-label={`${size} 竖向按钮组`}>
              <ButtonGroupText>章节</ButtonGroupText><Button size={size} variant="tertiary" onClick={() => setSizeResult(`${label}：已添加`)}>添加</Button>
              <ButtonGroupSeparator orientation="horizontal" /><Button size={size} variant="tertiary" disabled>移除</Button>
            </ButtonGroup></div>
          </div>
        </div>)}
      </div>
      <p role="status" aria-label="尺寸对照反馈">{sizeResult}</p>
      <ExampleCode code={sizesCode} />
    </DocExample>
    <DocExample title="禁用状态对照" description="外框和分界保持完整，禁用状态只弱化按钮内容。">
      <div className="button-group-state-grid">
        {disabledStates.map(({ name, disabled }) => <div className="button-group-state" key={name}>
          <span>{name}</span>
          <ButtonGroup aria-label={`${name}示例`}>
            {["撤销", "重做", "恢复"].map((action, index) => <Button key={action} variant="tertiary" disabled={disabled.includes(index)} onClick={() => setStateResult(`${name}：已执行${action}`)}>{action}</Button>)}
          </ButtonGroup>
        </div>)}
      </div>
      <p role="status" aria-label="状态对照反馈">{stateResult}</p>
    </DocExample>
    <DocExample title="横向基准" description="按钮直接连接，不额外插入分隔线。Tab 依次进入每个可用按钮，Enter 执行当前按钮；禁用按钮跳过。">
      <EditingActions />
      <ExampleCode code={horizontalCode()} />
    </DocExample>
    <DocExample title="横向显式分隔线" description="显式分隔线与普通接缝保持一致的颜色和完整边界。此组的撤销与重做状态独立。">
      <EditingActions separated />
      <ExampleCode code={horizontalCode(true)} />
    </DocExample>
    <DocExample title="竖向排列" description="竖向组的分隔线设置为 horizontal；按钮仍独立进入 Tab 顺序。">
      <ButtonGroup orientation="vertical" aria-label="章节操作"><Button variant="tertiary" onClick={() => setChapterResult("已上移章节")}>上移</Button><ButtonGroupSeparator orientation="horizontal" /><Button variant="tertiary" onClick={() => setChapterResult("已下移章节")}>下移</Button></ButtonGroup>
      <p role="status" aria-label="章节操作反馈">{chapterResult}</p>
      <ExampleCode code={verticalCode} />
    </DocExample>
    <DocExample title="文字与保存" description="ButtonGroupText 是静态说明文字，与保存按钮连接；它不承担按钮或选择状态。">
      <ButtonGroup aria-label="提交操作"><ButtonGroupText>当前草稿</ButtonGroupText><Button variant="secondary" onClick={() => setSaveResult("已保存当前草稿")}>保存</Button></ButtonGroup>
      <p role="status" aria-label="提交操作反馈">{saveResult}</p>
      <ExampleCode code={textCode} />
    </DocExample>
  </ComponentDoc>;
}
