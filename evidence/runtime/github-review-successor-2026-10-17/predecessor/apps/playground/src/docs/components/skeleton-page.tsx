import { useState } from "react";
import { Button, Skeleton } from "@rain-next/ui";
import { CourseIcon } from "@rain-next/ui/icons/course";
import { FileIcon } from "@rain-next/ui/icons/file";
import { ComponentDoc, DocExample } from "./component-doc";
import "./skeleton-page.css";

const code = `import { Skeleton } from "@rain-next/ui";

<section aria-busy={loading} aria-label="课程摘要">
  <p role="status">{loading ? "正在加载课程摘要" : "课程摘要已加载"}</p>
  {loading ? <div className="summary-row">
    <Skeleton className="summary-avatar" />
    <div><Skeleton className="summary-title" /><Skeleton className="summary-description" /></div>
  </div> : <CourseSummary />}
</section>
// 占位与真实内容使用同一布局和几何。`;

export function SkeletonPage() {
  const [loading, setLoading] = useState(true);
  return <ComponentDoc id="skeleton" title="Skeleton 骨架占位" description="在内容结构已知时保留布局位置。Skeleton 是装饰性节点，宽高和最终内容的对应关系由宿主负责。"
    useWhen={["名单、摘要或卡片结构已知，需要在加载时保留阅读位置。"]} avoidWhen={["未知最终布局时使用 Spinner；不要用骨架假冒已加载的真实内容。"]}
    props={[
      { name: "className", type: "string", description: "宿主指定对应真实内容的宽高与排布。" },
      { name: "native div props", type: 'ComponentProps<"div">', description: "可传入原生属性，aria-hidden 始终为 true。" },
      { name: "motion", type: "prefers-reduced-motion", description: "跟随系统偏好停止 shimmer；没有独立状态或计时。" },
    ]} slots={["skeleton"]} source="packages/ui/src/loading/loading.tsx" code={code}>
    <DocExample title="同一条记录的加载与内容" description="切换查看占位与真实内容。容器提供加载公告，不重复读取每一段骨架。">
      <div className="skeleton-doc-demo" aria-busy={loading} aria-label="课程摘要"><div className="skeleton-doc-record">{loading ? <><Skeleton className="skeleton-doc-avatar" /><div className="skeleton-doc-lines"><Skeleton className="skeleton-doc-title" /><Skeleton className="skeleton-doc-description" /></div></> : <><div className="skeleton-doc-avatar skeleton-doc-avatar-content" aria-hidden="true"><CourseIcon /></div><div className="skeleton-doc-lines"><strong className="skeleton-doc-title">教学设计导论</strong><span className="skeleton-doc-description">4 个章节 · 课程资料已就绪</span></div></>}</div><p className="component-doc__status" role="status">{loading ? "正在加载课程摘要" : "课程摘要已加载"}</p><Button variant="secondary" onClick={() => setLoading(value => !value)}>{loading ? "显示课程内容" : "显示骨架占位"}</Button></div>
    </DocExample>
    <DocExample title="资料列表占位" description="沿用同一加载开关。列表的图标、标题与说明保留各自位置；系统偏好 reduced-motion 时骨架静止。">
      <div className="skeleton-doc-list" aria-busy={loading} aria-label="课程资料列表">{["课程讲义", "课前阅读", "课堂练习"].map(label => <div className="skeleton-doc-list-row" key={label}>{loading ? <Skeleton className="skeleton-doc-list-icon" /> : <span className="skeleton-doc-list-icon" aria-hidden="true"><FileIcon /></span>}<div className="skeleton-doc-lines">{loading ? <><Skeleton className="skeleton-doc-title" /><Skeleton className="skeleton-doc-description" /></> : <><strong className="skeleton-doc-title">{label}</strong><span className="skeleton-doc-description">教学设计导论 · 林老师</span></>}</div></div>)}</div>
    </DocExample>
  </ComponentDoc>;
}
