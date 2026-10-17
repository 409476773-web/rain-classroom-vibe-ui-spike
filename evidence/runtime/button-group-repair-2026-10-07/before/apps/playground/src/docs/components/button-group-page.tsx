import { useState } from "react";
import { Button, ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@rain-next/ui";
import { ComponentDoc, DocExample } from "./component-doc";

const code = `import { Button, ButtonGroup, ButtonGroupSeparator } from "@rain-next/ui";

<ButtonGroup aria-label="编辑操作" orientation="horizontal">
  <Button variant="tertiary" onClick={undo}>撤销</Button>
  <ButtonGroupSeparator />
  <Button variant="tertiary" disabled={!canRedo} onClick={redo}>重做</Button>
</ButtonGroup>`;

export function ButtonGroupPage() {
  const [result, setResult] = useState("尚未执行操作");
  return <ComponentDoc id="button-group" title="Button Group 按钮组" description="把同一任务的命令连接起来，每个按钮仍独立执行。方向由组控制，按钮状态由宿主提供。"
    useWhen={["相关命令需要合并边界并形成一个操作区。"]} avoidWhen={["互斥显示模式或多选状态使用 Toggle Group；普通导航使用导航组件。"]}
    props={[
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "组排列方向。" },
      { name: "aria-label", type: "string", description: "说明按钮组的整体用途。" },
      { name: "children", type: "ReactNode", description: "Button、ButtonGroupText 与 ButtonGroupSeparator。" },
      { name: "ButtonGroupSeparator.orientation", type: '"horizontal" | "vertical"', default: '"vertical"', description: "分隔线方向；与组方向正交。" },
      { name: "ButtonGroupText.render", type: "Base UI useRender", description: "可组合静态标签；不承担按钮或选择状态。" },
    ]} slots={["button-group", "button-group-text", "button-group-separator"]} source="packages/ui/src/button-group/button-group.tsx" code={code}>
    <DocExample title="连接命令" description="Tab 依次进入可用按钮，Enter 执行当前按钮；禁用按钮跳过。">
      <ButtonGroup aria-label="编辑操作"><Button variant="tertiary" onClick={() => setResult("已撤销当前示例更改")}>撤销</Button><ButtonGroupSeparator /><Button variant="tertiary" disabled>重做</Button><Button variant="tertiary" onClick={() => setResult("已恢复默认设置")}>恢复</Button></ButtonGroup>
      <p role="status">{result}</p>
    </DocExample>
    <DocExample title="垂直排列与附加文字" description="标签是说明文字；竖向组的分隔线设置为 horizontal。" code={`<ButtonGroup orientation="vertical" aria-label="章节操作">
  <Button variant="tertiary">上移</Button>
  <ButtonGroupSeparator orientation="horizontal" />
  <Button variant="tertiary">下移</Button>
</ButtonGroup>`}>
      <div className="flex flex-wrap items-start gap-rain-24"><ButtonGroup orientation="vertical" aria-label="章节操作"><Button variant="tertiary" onClick={() => setResult("已上移章节")}>上移</Button><ButtonGroupSeparator orientation="horizontal" /><Button variant="tertiary" onClick={() => setResult("已下移章节")}>下移</Button></ButtonGroup><ButtonGroup aria-label="提交操作"><ButtonGroupText>当前草稿</ButtonGroupText><Button variant="secondary" onClick={() => setResult("已保存当前草稿")}>保存</Button></ButtonGroup></div>
    </DocExample>
  </ComponentDoc>;
}
