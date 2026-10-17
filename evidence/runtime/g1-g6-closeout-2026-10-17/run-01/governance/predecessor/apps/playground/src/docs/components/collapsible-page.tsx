import { useState } from "react";
import { Button, Collapsible, CollapsibleTrigger, CollapsibleContent, type CollapsibleVariant } from "@rain-next/ui";
import { ComponentDoc, DocExample } from "./component-doc";
import "./g1-component-pages.css";

const code = `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@rain-next/ui";

<Collapsible variant="line">
  <CollapsibleTrigger>更多说明</CollapsibleTrigger>
  <CollapsibleContent>惯性是物体固有的属性，不能看作维持运动的力。</CollapsibleContent>
</Collapsible>`;

export function CollapsiblePage() {
  const [open, setOpen] = useState(false);
  return <ComponentDoc id="collapsible" title="Collapsible 折叠内容" description="按需展开单段说明或详情，收起后仍保留明确的查看入口。"
    useWhen={["正文旁的补充说明或低频详情。", "需要独立展开一份示例作答。"]}
    avoidWhen={["多段内容需要统一展开规则时使用 Accordion。", "不把关键错误或必读说明默认藏在折叠区。", "组件已有展开箭头，宿主不重复添加。"]}
    props={[
      { name: "variant", type: '"line" | "contained" | "tinted" | "quiet"', default: '"line"', description: "沿用 G1 的四种承载方式。" },
      { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控状态或非受控初值。" },
      { name: "onOpenChange", type: "(open, details) => void", description: "由宿主响应展开状态变化。" },
      { name: "disabled", type: "boolean", default: "false", description: "禁止触发器改变展开状态。" },
      { name: "children / className", type: "ReactNode / string", description: "各 Part 的标题、正文和实例内样式；其余 Props 沿 Base UI。" },
    ]} slots={["Collapsible", "CollapsibleTrigger", "CollapsibleContent"]}
    source="packages/ui/src/collapsible/collapsible.tsx" code={code}>
    <DocExample title="默认收起与四种外观" description="触发器自带箭头；切换页面顶部的密度可查看紧凑状态。">
      <div className="g1-doc-grid">{(["line", "contained", "tinted", "quiet"] as const).map((variant: CollapsibleVariant) => <div key={variant}>
        <h3>{variant}</h3><Collapsible variant={variant}><CollapsibleTrigger>示例作答</CollapsibleTrigger><CollapsibleContent>惯性是物体固有的属性，不能看作维持运动的力。判断运动状态是否变化，应分析合外力。</CollapsibleContent></Collapsible>
      </div>)}</div>
    </DocExample>
    <DocExample title="初始展开与禁用">
      <div className="g1-doc-grid"><Collapsible defaultOpen variant="contained"><CollapsibleTrigger>已展开的说明</CollapsibleTrigger><CollapsibleContent>defaultOpen 只决定初始展开；后续点击由组件管理。</CollapsibleContent></Collapsible>
        <Collapsible disabled variant="contained"><CollapsibleTrigger>尚未开放的详情</CollapsibleTrigger><CollapsibleContent>该详情尚未开放。</CollapsibleContent></Collapsible></div>
    </DocExample>
    <DocExample title="受控展开" description="关闭内容只影响展开状态，宿主业务内容不会因此重置。" code={`const [open, setOpen] = useState(false);
<Collapsible open={open} onOpenChange={setOpen}>…</Collapsible>`}>
      <div className="g1-doc-stack"><Button variant="secondary" onClick={() => setOpen(value => !value)}>{open ? "从外部收起" : "从外部展开"}</Button>
        <Collapsible open={open} onOpenChange={setOpen} variant="quiet"><CollapsibleTrigger>批改说明</CollapsibleTrigger><CollapsibleContent>按论证内容判断，不根据字数直接给分；每份作答保留独立判断。</CollapsibleContent></Collapsible>
        <p role="status">当前状态：{open ? "已展开" : "已收起"}</p>
      </div>
    </DocExample>
  </ComponentDoc>;
}
