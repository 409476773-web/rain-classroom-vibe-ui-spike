import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@rain-next/ui";
import { ComponentDoc, DocExample } from "./component-doc";

const code = `import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@rain-next/ui";

const [view, setView] = useState<string[]>(["list"]);
<ToggleGroup aria-label="显示模式" value={view} onValueChange={setView} spacing={0} variant="outline">
  <ToggleGroupItem value="list">列表</ToggleGroupItem>
  <ToggleGroupItem value="split">分栏</ToggleGroupItem>
  <ToggleGroupItem value="focus">聚焦</ToggleGroupItem>
</ToggleGroup>`;

export function ToggleGroupPage() {
  const [view, setView] = useState<string[]>(["list"]);
  const [fields, setFields] = useState<string[]>(["name"]);
  const labels: Record<string, string> = { list: "列表", split: "分栏", focus: "聚焦", name: "姓名", score: "分数", notes: "批注" };
  return <ComponentDoc id="toggle-group" title="Toggle Group 选择按钮组" description="将相关可按下按钮组织为单选或多选。方向键移动组内焦点，Space 或 Enter 改变选择。"
    useWhen={["互斥显示模式，或同一工具组的多个显示字段。"]} avoidWhen={["互不相关的工具使用 Toggle；表单字段使用 Radio Group 或 Checkbox。"]}
    props={[
      { name: "value / defaultValue", type: "string[]", default: "[]", description: "单选和多选均使用数组；单选最多一个值。" },
      { name: "onValueChange", type: "Base UI Toggle Group callback", description: "回报整个组的新值数组。" },
      { name: "multiple", type: "boolean", default: "false", description: "true 允许同时选中多个项目。" },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "布局方向与方向键导航。" },
      { name: "spacing", type: "0 | 8", default: "8", description: "分开的控件或连接的边界。" },
      { name: "variant / size", type: "Toggle variant / size", description: "父组统一控制每个 item 外观和尺寸。" },
      { name: "disabled", type: "boolean", default: "false", description: "禁用整组；也可在 item 上禁用。" },
      { name: "ToggleGroupItem.value", type: "string", description: "同一组内唯一的选项标识。" },
    ]} slots={["toggle-group", "toggle-group-item"]} source="packages/ui/src/toggle-group/toggle-group.tsx" code={code}>
    <DocExample title="受控单选" description="单选允许取消到空数组；若业务要求必须选一个，由宿主约束。">
      <ToggleGroup aria-label="显示模式" value={view} onValueChange={setView} spacing={0} variant="outline"><ToggleGroupItem value="list">列表</ToggleGroupItem><ToggleGroupItem value="split">分栏</ToggleGroupItem><ToggleGroupItem value="focus">聚焦</ToggleGroupItem></ToggleGroup><p role="status">显示模式：{view.length ? view.map(item => labels[item]).join("、") : "未选择"}</p>
    </DocExample>
    <DocExample title="受控多选" code={`<ToggleGroup multiple value={fields} onValueChange={setFields} aria-label="显示字段">
  <ToggleGroupItem value="name">姓名</ToggleGroupItem>
  <ToggleGroupItem value="score">分数</ToggleGroupItem>
</ToggleGroup>`}>
      <ToggleGroup aria-label="显示字段" multiple value={fields} onValueChange={setFields} variant="outline"><ToggleGroupItem value="name">姓名</ToggleGroupItem><ToggleGroupItem value="score">分数</ToggleGroupItem><ToggleGroupItem value="notes">批注</ToggleGroupItem></ToggleGroup><p role="status">当前字段：{fields.length ? fields.map(item => labels[item]).join("、") : "未选择"}</p>
    </DocExample>
    <DocExample title="竖向、禁用与焦点跳过" description="竖向使用上下方向键；不可用选项不进入组内焦点。">
      <div className="flex flex-wrap items-start gap-rain-24"><ToggleGroup aria-label="竖向批改模式" orientation="vertical" defaultValue={["question"]} variant="outline"><ToggleGroupItem value="question">按题批改</ToggleGroupItem><ToggleGroupItem value="student" disabled>按人批改不可用</ToggleGroupItem><ToggleGroupItem value="review">复核</ToggleGroupItem></ToggleGroup><ToggleGroup aria-label="不可用的分组" disabled defaultValue={["a"]} spacing={0}><ToggleGroupItem value="a">选中且禁用</ToggleGroupItem><ToggleGroupItem value="b">未选中且禁用</ToggleGroupItem></ToggleGroup></div>
    </DocExample>
  </ComponentDoc>;
}
