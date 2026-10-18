import { useState } from "react";
import { Button, Link } from "@rain-next/ui";
import { FilterToolbarExample } from "../examples/filter-toolbar";
import { SectionedFormExample } from "../examples/sectioned-form";
import { GradingActionsExample } from "../examples/grading-actions";
import filterSource from "../examples/filter-toolbar?raw";
import formSource from "../examples/sectioned-form?raw";
import gradingSource from "../examples/grading-actions?raw";
import { ComponentDoc, DocExample } from "./component-doc";

export function CompositionsPage() {
  const [fail, setFail] = useState(false), [disabled, setDisabled] = useState(false);
  async function request() { await new Promise(resolve => setTimeout(resolve, 700)); if (fail) throw new Error("Local preview failure"); }
  return <ComponentDoc id="compositions" title="三种常用组合" category="本地配方" status="本批实现 · 待视觉审阅"
    description="查询、统一保存与逐份批改各自管理业务状态；布局只负责阅读顺序。模拟请求等待 700ms，可切换失败与禁用，刷新不保留数据。"
    useWhen={["有明确的数据对象、保存范围和状态归属。", "按现有控件与公开入口组合，局部调整字段和分区。"]}
    avoidWhen={["把这些本地示例当成公共组件或已发布业务能力。", "将工作区收起、切换、尺寸变化绑定为保存。"]}
    props={[]} source="apps/playground/src/docs/examples/" code={filterSource}>
    <div aria-label="组合请求预览设置" style={{ display: "flex", gap: "var(--rain-space-12)", flexWrap: "wrap" }}>
      <Button variant="secondary" aria-pressed={fail} onClick={() => setFail(value => !value)}>模拟请求失败：{fail ? "开" : "关"}</Button>
      <Button variant="secondary" aria-pressed={disabled} onClick={() => setDisabled(value => !value)}>禁用操作：{disabled ? "开" : "关"}</Button>
      <Link href="#components">比较组件能力与近邻</Link>
    </div>
    <DocExample title="紧凑筛选工具栏" description="32px 字段与 small 按钮同排；输入不立即应用，成功查询才更换结果，失败保留旧结果。" code={filterSource}>
      <FilterToolbarExample onSearch={request} disabled={disabled} />
    </DocExample>
    <DocExample title="分区作业设置" description="36px 短字段；说明随内容增高。先校验并定位首错，保存失败保留全部输入。" code={formSource}>
      <SectionedFormExample onSave={request} disabled={disabled} />
    </DocExample>
    <DocExample title="连续批改操作区" description="草稿按学生与题目 ID 保存。0 分有效；等待期间锁定编辑与导航，成功后继续，失败留在当前对象。" code={gradingSource}>
      <GradingActionsExample onSave={request} disabled={disabled} />
    </DocExample>
  </ComponentDoc>;
}
