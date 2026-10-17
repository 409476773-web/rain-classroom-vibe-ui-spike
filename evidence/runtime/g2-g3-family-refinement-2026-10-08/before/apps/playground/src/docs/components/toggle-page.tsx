import { useState } from "react";
import { Toggle } from "@rain-next/ui";
import { ComponentDoc, DocExample } from "./component-doc";

const code = `import { useState } from "react";
import { Toggle } from "@rain-next/ui";

const [showAnnotations, setShowAnnotations] = useState(false);
<Toggle pressed={showAnnotations} onPressedChange={setShowAnnotations} variant="outline">
  显示批注
</Toggle>`;

export function TogglePage() {
  const [pressed, setPressed] = useState(false);
  return <ComponentDoc id="toggle" title="Toggle 可按下按钮" description="保留按下状态的工具按钮。多个 Toggle 可独立启用；状态与持久化由宿主负责。"
    useWhen={["显示批注、强调工具等可保持启用的独立操作。"]} avoidWhen={["立即生效的表单设置使用 Switch；一组选项使用 Toggle Group。"]}
    props={[
      { name: "pressed / defaultPressed", type: "boolean", default: "false", description: "受控值或非受控初始值。" },
      { name: "onPressedChange", type: "Base UI Toggle callback", description: "回报按下状态，宿主决定是否保存。" },
      { name: "variant", type: '"default" | "outline"', default: '"default"', description: "透明底或描边外观。" },
      { name: "size", type: '"sm" | "default" | "lg"', default: "跟随密度", description: "32 / 36 / 40 控件高度；compact 默认 sm。" },
      { name: "disabled", type: "boolean", default: "false", description: "不可按下，也不进入键盘焦点。" },
      { name: "children / aria-label", type: "ReactNode / string", description: "为按钮提供准确名称。" },
    ]} slots={["toggle"]} source="packages/ui/src/toggle/toggle.tsx" code={code}>
    <DocExample title="宿主控制状态" description="Space 或 Enter 切换；按下状态通过 aria-pressed 表达。">
      <Toggle pressed={pressed} onPressedChange={setPressed} variant="outline">显示批注</Toggle><p role="status">{pressed ? "批注已显示" : "批注已隐藏"}</p>
    </DocExample>
    <DocExample title="外观、尺寸与禁用" description="以下按钮各自保持独立状态；显式尺寸优先于预览密度。">
      <div className="flex flex-wrap items-center gap-rain-12"><Toggle size="sm">小尺寸</Toggle><Toggle size="default" variant="outline" defaultPressed>默认按下</Toggle><Toggle size="lg" variant="outline">大尺寸</Toggle><Toggle disabled variant="outline">答案解析不可用</Toggle><Toggle disabled defaultPressed variant="outline">禁用且按下</Toggle></div>
    </DocExample>
  </ComponentDoc>;
}
