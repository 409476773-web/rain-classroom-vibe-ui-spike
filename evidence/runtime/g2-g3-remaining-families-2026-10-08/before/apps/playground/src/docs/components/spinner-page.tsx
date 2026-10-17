import { useState } from "react";
import { Button, Spinner } from "@rain-next/ui";
import { ComponentDoc, DocExample } from "./component-doc";

const code = `import { Spinner } from "@rain-next/ui";

<div aria-busy={loading}>
  {loading ? <Spinner aria-label="正在读取课程资料" /> : <p>课程资料已就绪</p>}
</div>`;

export function SpinnerPage() {
  const [loading, setLoading] = useState(true);
  return <ComponentDoc id="spinner" title="Spinner 加载指示" description="表示正在进行且耗时未知的操作。复用 Rain 加载图标，不生成进度百分比。"
    useWhen={["短时操作或未知完成比例的异步任务。"]} avoidWhen={["可计算完成比例时使用进度组件；内容结构已知时可配合 Skeleton。"]}
    props={[
      { name: "aria-label", type: "string", default: '"正在加载"', description: "具体的加载任务名称。" },
      { name: "aria-hidden", type: "boolean", description: "有相邻加载说明时隐藏重复的图标公告。" },
      { name: "className", type: "string", description: "宿主布局；默认图标 18px。" },
      { name: "native span props", type: 'ComponentProps<"span">', description: "可传入原生语义属性，默认 role=status。" },
    ]} slots={["spinner"]} source="packages/ui/src/loading/loading.tsx" code={code}>
    <DocExample title="加载与完成" description="点击切换状态，加载时容器 aria-busy=true；完成文字保持在同一区域。">
      <div className="flex flex-wrap items-center gap-rain-12" aria-busy={loading}>{loading ? <Spinner aria-label="正在读取课程资料" /> : <span role="status">课程资料已就绪</span>}<Button variant="secondary" onClick={() => setLoading(value => !value)}>{loading ? "完成加载" : "重新加载"}</Button></div>
    </DocExample>
    <DocExample title="带明确文字的加载" description="图标为装饰性，整行说明负责公告；系统偏好 reduced-motion 时停止旋转。" code={`<p role="status"><Spinner aria-hidden="true" /> 正在同步资料</p>`}>
      <p role="status" className="flex items-center gap-rain-8"><Spinner aria-hidden="true" />正在同步资料</p>
    </DocExample>
  </ComponentDoc>;
}
