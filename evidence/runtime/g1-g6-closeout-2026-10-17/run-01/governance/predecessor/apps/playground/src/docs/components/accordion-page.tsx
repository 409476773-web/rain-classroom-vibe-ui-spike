import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Button, type AccordionVariant } from "@rain-next/ui";
import { ComponentDoc, DocExample } from "./component-doc";
import "./g1-component-pages.css";

const code = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@rain-next/ui";

<Accordion variant="line" defaultValue={[]}>
  <AccordionItem value="rubric">
    <AccordionTrigger>评分细则</AccordionTrigger>
    <AccordionContent>根据论证内容判断，不按字数直接给分。</AccordionContent>
  </AccordionItem>
</Accordion>`;

export function AccordionPage() {
  const [value, setValue] = useState<string[]>([]);
  return <ComponentDoc id="accordion" title="Accordion 手风琴" description="按标题展开一组同级内容，保留阅读顺序与当前上下文。"
    useWhen={["多个相关章节需要按需阅读。", "需要选择单项或多项展开。"]}
    avoidWhen={["完整同级视图切换使用 Tabs。", "只有一段补充内容时使用 Collapsible。", "标题内不嵌套其他按钮或链接。"]}
    props={[
      { name: "variant", type: '"line" | "contained" | "tinted" | "quiet"', default: '"line"', description: "沿用 G1 的四种承载方式。" },
      { name: "multiple", type: "boolean", default: "false", description: "允许同时展开多个 Item。" },
      { name: "value / defaultValue", type: "Item value[]", default: "[]", description: "受控值或非受控初值；默认全部收起。" },
      { name: "onValueChange", type: "(value, details) => void", description: "由宿主响应展开状态变化。" },
      { name: "Item.value / Item.disabled", type: "value / boolean", description: "每项使用稳定唯一 value；disabled 禁止该项展开操作。" },
      { name: "className / 原生 Props", type: "string / Base UI Props", description: "按 Part 提供内容与实例内局部样式；密度来自父级。" },
    ]} slots={["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"]}
    source="packages/ui/src/accordion/accordion.tsx" code={code}>
    <DocExample title="单项展开" description="默认收起；再次点击可关闭最后一项。使用 Tab 访问标题，Enter 或空格展开。">
      <Accordion>
        <AccordionItem value="rubric"><AccordionTrigger>评分细则</AccordionTrigger><AccordionContent>根据论证内容判断，不按字数直接给分。</AccordionContent></AccordionItem>
        <AccordionItem value="reference"><AccordionTrigger>参考作答</AccordionTrigger><AccordionContent>物体保持静止或匀速直线运动，需要合外力为零。惯性是物体固有的属性。</AccordionContent></AccordionItem>
      </Accordion>
    </DocExample>
    <DocExample title="四种外观" description="同一套交互，根据相邻内容选择分割线、白色表面、浅底或无边界。">
      <div className="g1-doc-grid">{(["line", "contained", "tinted", "quiet"] as const).map((variant: AccordionVariant) => <div key={variant}>
        <h3>{variant}</h3><Accordion variant={variant} defaultValue={["example"]}><AccordionItem value="example"><AccordionTrigger>课程说明</AccordionTrigger><AccordionContent>面向持续阅读保留原有文字、间距与展开动画。</AccordionContent></AccordionItem></Accordion>
      </div>)}</div>
    </DocExample>
    <DocExample title="多项展开与禁用" code={`<Accordion multiple defaultValue={["one"]}>
  <AccordionItem value="one">…</AccordionItem>
  <AccordionItem value="two">…</AccordionItem>
  <AccordionItem value="locked" disabled>…</AccordionItem>
</Accordion>`}>
      <Accordion multiple defaultValue={["one"]} variant="contained">
        <AccordionItem value="one"><AccordionTrigger>现象与研究对象</AccordionTrigger><AccordionContent>说明研究对象与观察到的运动现象。</AccordionContent></AccordionItem>
        <AccordionItem value="two"><AccordionTrigger>适用条件</AccordionTrigger><AccordionContent>讨论合外力和运动状态变化之间的关系。</AccordionContent></AccordionItem>
        <AccordionItem value="locked" disabled><AccordionTrigger>未开放的附录</AccordionTrigger><AccordionContent>该附录尚未开放。</AccordionContent></AccordionItem>
      </Accordion>
    </DocExample>
    <DocExample title="受控展开" description="按钮与标题共用宿主状态；此处只改变展开状态。" code={`const [value, setValue] = useState<string[]>([]);
<Accordion value={value} onValueChange={setValue}>…</Accordion>`}>
      <div className="g1-doc-stack"><Button variant="secondary" onClick={() => setValue(value.length ? [] : ["criteria"])}>{value.length ? "从外部收起" : "从外部展开"}</Button>
        <Accordion value={value} onValueChange={setValue}><AccordionItem value="criteria"><AccordionTrigger>判断依据</AccordionTrigger><AccordionContent>展开与保存、评分、草稿互相独立。</AccordionContent></AccordionItem></Accordion>
        <p role="status">当前展开：{value.length ? "判断依据" : "无"}</p>
      </div>
    </DocExample>
  </ComponentDoc>;
}
