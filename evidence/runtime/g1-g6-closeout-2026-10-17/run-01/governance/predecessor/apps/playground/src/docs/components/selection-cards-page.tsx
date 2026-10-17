import { useRef, useState } from "react";
import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button, CheckboxCard, CheckboxGroup, CheckboxObjectCard, Link, RadioCardWithPreview, RadioComparisonCard, RadioGroup, RadioPreviewCard } from "@rain-next/ui";
import listArtwork from "./assets/selection-cards/list-workbench.png";
import reportArtwork from "./assets/selection-cards/report-layout.png";
import { IndependentPreview } from "../../patterns/selection-patterns";
import { SelectionPreviewContent } from "./selection-preview-content";
import "./selection-cards-page.css";

const layouts = [
  { value: "list", label: "列表工作台", description: "适合密集信息浏览与高频批量操作" },
  { value: "report", label: "双栏报告", description: "适合图文对照、报告与分析阅读" },
];
const courses = [
  { value: "physics", label: "大学物理实验", description: "2026 秋季 · 物理学院 · 必修课程" },
  { value: "circuits", label: "电路原理", description: "2026 秋季 · 电子工程学院 · 专业课程" },
];
const methods = [
  { value: "direct", label: "直接评分", description: "直接输入最终分数，适合快速批改与统一评价。" },
  { value: "rubric", label: "量规评分", description: "按评价维度分别评分，再汇总最终成绩。" },
];
const templates = [
  { value: "lab", label: "实验报告量规", description: "覆盖实验准备、过程记录、结果分析与反思" },
  { value: "project", label: "课程项目量规", description: "适合长周期项目，关注过程投入与最终成果" },
];
export function SelectionCardsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light"), [density, setDensity] = useState<Density>("default");
  const [preview, setPreview] = useState<string | null>(null), [changes, setChanges] = useState(0), [submitted, setSubmitted] = useState<string | null>(null);
  const [previewKind, setPreviewKind] = useState("lab"), [previewOpen, setPreviewOpen] = useState(false);
  const previewTrigger = useRef<HTMLButtonElement>(null), previewFallback = useRef<HTMLHeadingElement>(null);
  const showPreview = (title: string, kind: string, trigger: HTMLButtonElement) => {
    previewTrigger.current = trigger; setPreview(title); setPreviewKind(kind); setPreviewOpen(true);
  };
  return <DensityProvider density={density}>
    <main data-rain-id="selection-cards-page" data-asset-identity="local-experiment" data-maturity="prototype-ready" data-rain-theme={theme} className="core-ui-shell selection-cards-page">
      <header className="flex flex-col gap-rain-12">
        <Link href="#components">返回组件</Link>
        <h1 ref={previewFallback} id="selection-cards-title" tabIndex={-1} className="m-rain-0 rain-type-page-title">选择卡片</h1>
        <p className="m-rain-0 rain-type-reading">选择模板、课程或评分方案。点击内容可以选择，查看预览是独立操作。</p>
        <div className="flex flex-wrap gap-rain-8" aria-label="预览设置">
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
          <Button variant="text" aria-pressed={density === "compact"} onClick={() => setDensity(density === "default" ? "compact" : "default")}>紧凑密度</Button>
        </div>
      </header>
      <form aria-label="选择卡片示例" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); setSubmitted(JSON.stringify(Object.fromEntries(Array.from(new Set(data.keys()), (key) => [key, data.getAll(key)])))); }}
        onReset={(event) => { const native = event.nativeEvent; queueMicrotask(() => { if (!native.defaultPrevented) { setSubmitted(null); setChanges(0); setPreview(null); setPreviewOpen(false); } }); }}>
        <div className="selection-cards-page__families">
          <section className="core-family" aria-labelledby="cards-preview-title">
            <h2 id="cards-preview-title">图文选择</h2><p className="selection-cards-page__intro">先辨认选项，再看预览。</p>
            <RadioGroup legend="工作台布局" name="layout" className="selection-cards-page__pair" options={layouts} defaultValue="list" onValueChange={() => setChanges((count) => count + 1)}
              renderOption={(props) => <RadioPreviewCard {...props} label={props.label!} imageSrc={props.value === "list" ? listArtwork : reportArtwork}
                layoutLabel={props.value === "list" ? "列表布局" : "双栏布局"} audienceLabel="教师工作台" />} />
          </section>
          <section className="core-family" aria-labelledby="cards-object-title">
            <h2 id="cards-object-title">对象多选</h2><p className="selection-cards-page__intro">名称、学期与数量连续呈现，图形帮助识别。</p>
            <CheckboxGroup legend="选择课程" name="course" options={courses} defaultValue={["physics"]} className="selection-cards-page__stack" onValueChange={() => setChanges((count) => count + 1)}
              renderOption={(props) => <CheckboxObjectCard {...props} label={props.label!} supportingValue={props.value === "physics" ? "120 名学生 · 4 个教学班" : "96 名学生 · 3 个教学班"}
                status="进行中" identityVisual={<span>{props.value === "physics" ? "物" : "电"}</span>} />} />
          </section>
          <section className="core-family" aria-labelledby="cards-compare-title">
            <h2 id="cards-compare-title">比较方案</h2><p className="selection-cards-page__intro">按相同顺序比较适用场景、能力与输出。</p>
            <RadioGroup legend="评分方式" name="method" options={methods} defaultValue="rubric" className="selection-cards-page__pair" onValueChange={() => setChanges((count) => count + 1)}
              renderOption={(props) => <RadioComparisonCard {...props} label={props.label!} recommended={props.value === "rubric"} details={[
                { label: "适用", value: props.value === "rubric" ? "实验报告 / 项目作业" : "日常练习 / 随堂作业" },
                { label: "支持", value: props.value === "rubric" ? "维度权重 · 分项评语" : "统一分值 · 整体评语" },
                { label: "输出", value: props.value === "rubric" ? "分项得分与最终成绩" : "最终得分与评价" },
              ]} />} />
          </section>
          <section className="core-family" aria-labelledby="cards-action-title">
            <h2 id="cards-action-title">带独立预览</h2><p className="selection-cards-page__intro">选择与查看分开，未选中的方案也可查看。</p>
            <RadioGroup legend="评分模板" name="template" options={templates} defaultValue="lab" className="selection-cards-page__stack" onValueChange={() => setChanges((count) => count + 1)}
              renderOption={(props) => <RadioCardWithPreview {...props} label={props.label!} supportingValue={props.value === "lab" ? "5 个评价维度 · 总分 100 分" : "4 个评价维度 · 总分 100 分"}
                recommended={props.value === "lab"} identityVisual={<span>量</span>} onPreview={(event) => showPreview(props.label!, props.value, event.currentTarget)} />} />
            <p className="selection-cards-page__note">打开预览了解评价维度；关闭后可继续选择。</p>
          </section>
        </div>
        <section className="core-family" aria-labelledby="cards-form-title">
          <h2 id="cards-form-title">表单与独立操作</h2>
          <div className="flex flex-wrap gap-rain-8"><Button type="submit">读取表单值</Button><Button type="reset" variant="secondary">恢复默认选择</Button></div>
          <p data-testid="card-changes" className="selection-cards-page__note">选择变化：{changes} 次</p>
          <p data-testid="card-preview-status" role="status" className="selection-cards-page__note">{preview ? `已触发「${preview}」预览入口；当前选择保持不变。` : "尚未触发预览入口。"}</p>
          <p data-testid="card-form-values" className="selection-cards-page__note">表单值：{submitted ?? "尚未读取"}</p>
        </section>
      </form>
      <section className="core-family" aria-labelledby="cards-stress-title">
        <h2 id="cards-stress-title">长标题与窄容器</h2>
        <div className="selection-cards-page__stress">
          <div className="selection-cards-page__reference"><RadioGroup legend="长标题比较" options={[{ value: "comparison", label: "按小组项目的阶段成果、个人贡献与过程材料进行综合评价", description: "按评价维度分别评分，再汇总最终成绩。" }]} defaultValue="comparison"
            renderOption={(props) => <RadioComparisonCard {...props} label={props.label!} recommended details={[{ label: "适用", value: "实验报告 / 项目作业" }, { label: "支持", value: "维度权重 · 分项评语" }, { label: "输出", value: "分项得分与最终成绩" }]} />} /></div>
          <div className="selection-cards-page__reference"><RadioGroup legend="长标题图文" options={[{ value: "preview", label: "面向跨学科项目的实验报告与过程分析双栏布局", description: "适合密集信息浏览与高频批量操作" }]} defaultValue="preview"
            renderOption={(props) => <RadioPreviewCard {...props} label={props.label!} imageSrc={listArtwork} layoutLabel="列表布局" audienceLabel="教师工作台" />} /></div>
          <div className="selection-cards-page__narrow"><CheckboxObjectCard label="大学物理实验 · 跨学科综合实践" description="2026 秋季 · 物理学院与电子工程学院共同开设的综合实验课程"
            supportingValue="120 名学生 · 4 个教学班 · LongUnbrokenCourseMetadataForResponsiveLayoutReview" status="进行中" identityVisual={<span>物</span>} /></div>
          <div className="selection-cards-page__narrow"><RadioGroup legend="长标题模板" options={[{ value: "long", label: "课程项目评价量规：综合实践、团队合作与阶段性成果反馈", description: "通过多维度评价记录长周期项目进展，支持在选择前了解模板的结构与内容。" }]}
            renderOption={(props) => <RadioCardWithPreview {...props} label={props.label!} supportingValue="5 个评价维度 · 总分 100 分" recommended identityVisual={<span>量</span>} onPreview={(event) => showPreview("长标题模板", "lab", event.currentTarget)} />} /></div>
        </div>
      </section>
      <section className="core-family" aria-labelledby="cards-states-title">
        <h2 id="cards-states-title">部分选择与禁用</h2>
        <div className="selection-cards-page__stress">
          <CheckboxCard label="部分内容已选" description="部分选择由外层数据确定。" indeterminate defaultChecked={false}><span className="text-rain-size-12 leading-rain-22">3 项内容中已选择 2 项</span></CheckboxCard>
          <CheckboxObjectCard label="已选择且锁定" description="该课程由管理员固定。" supportingValue="60 名学生 · 2 个教学班" identityVisual={<span>课</span>} defaultChecked disabled />
          <RadioCardWithPreview name="unavailable" value="restricted" checked={false} onCheckedChange={() => {}} disabled label="当前不可选择" description="当前权限不能修改此选项，仍可查看详情。"
            supportingValue="总分 100 分" identityVisual={<span>量</span>} onPreview={(event) => showPreview("当前不可选择", "restricted", event.currentTarget)} />
        </div>
      </section>
      <IndependentPreview open={previewOpen} onClose={() => setPreviewOpen(false)} title={preview ?? "模板预览"} description="演示内容，仅供查看；预览不会改变当前选择。"
        returnFocusRef={previewTrigger} fallbackFocusRef={previewFallback} theme={theme}>
        <SelectionPreviewContent kind={previewKind} />
      </IndependentPreview>
    </main>
  </DensityProvider>;
}
