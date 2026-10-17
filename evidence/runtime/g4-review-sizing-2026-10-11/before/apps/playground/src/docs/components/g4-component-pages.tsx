import { useState } from "react";
import { typographyPresets, typographyUtilityClassNames } from "@rain-next/foundations";
import {
  Button, Dialog, Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle,
  Link, Progress, ProgressLabel, ProgressValue, Spinner, Tag,
} from "@rain-next/ui";
import { FileIcon } from "@rain-next/ui/icons/file";
import { ChevronRightIcon } from "@rain-next/ui/icons/chevron-right";
import { CircleCheckIcon } from "@rain-next/ui/icons/circle-check";
import { CircleCloseIcon } from "@rain-next/ui/icons/circle-close";
import { ComponentDoc, DocCode, DocExample } from "./component-doc";
import "./g4-component-pages.css";

const typographyCode = `<>
<header>
  <p className="rain-type-ui-caption">人工智能导论 · 第 04 讲</p>
  <h3 className="rain-type-heading-page">从问题到证据</h3>
  <p className="rain-type-ui-default">学习如何观察问题、识别证据，并形成可解释的判断。</p>
  <p className="rain-type-ui-caption">林老师 · 10 月 11 日更新 · 约 5 分钟阅读</p>
</header>
<article className="rain-type-reading-default">
  <h4 className="rain-type-heading-section">先分清事实与判断</h4>
  <p>先描述你观察到的现象，再说明它能够支持什么判断。</p>
</article>
<p className="rain-type-ui-supporting">阅读后，请带着一条证据参加课堂讨论。</p>
</>`;
const statisticCode = `<div>
  <span className="rain-type-ui-default">平均得分</span>
  <div>
    <span className="rain-type-data-default">86.5</span>
    <span className="rain-type-ui-default">分</span>
  </div>
  <p className="rain-type-ui-supporting">共 24 份答卷 · 满分 100 分</p>
</div>`;
const typeSamples = {
  "ui-default": "界面正文", "ui-compact": "紧凑文字", "ui-caption": "元信息", "ui-supporting": "辅助说明",
  "heading-section": "区块标题", "heading-page": "页面标题", "reading-small": "紧凑阅读", "reading-default": "常规阅读", "reading-large": "大号阅读",
} as const;

export function TypographyPage() {
  return <ComponentDoc id="typography" title="Typography 文字排版" category="Foundations" status="复用现有排版基础 · 用法待审阅"
    description="用稳定的文字层级组织内容。界面文字帮助扫读，阅读文字保持连续，关键数字提供清楚的视觉锚点。"
    useWhen={["标题、控件说明、正文和元信息需要建立稳定层级。", "答案解析、评语与报告结论需要连续阅读。", "少量关键数值承担视觉锚点，数字与中文单位分开。"]}
    avoidWhen={["把普通日期、序号、表格数值或中文单位切换为关键数据字体。", "为每段文案另建字号、字体或同义包装组件。", "仅为增大字号选择更高的 HTML 标题层级。"]}
    props={Object.entries(typographyPresets).map(([name, preset]) => ({
      name: typographyUtilityClassNames.preset[name as keyof typeof typographyPresets],
      type: `${preset.fontRole} · ${preset.fontSize}px / ${preset.lineHeight}px`,
      description: preset.useWhen,
    }))}
    slots={["原生 heading / paragraph / article", "关键数据 label / value / unit"]}
    source="packages/foundations/src/typography-contract.ts" code={typographyCode}>
    <DocExample title="从标题到正文的阅读层级" description="同一份课程导读，把标题、阅读目标、元信息与正文放在连续的阅读顺序中。">
      <div className="g4-doc-panel g4-doc-article">
        <header className="g4-doc-copy" data-slot="typography-ui-example">
          <p className="rain-type-ui-caption g4-doc-muted">人工智能导论 · 第 04 讲</p>
          <h3 className="rain-type-heading-page">从问题到证据</h3>
          <p className="rain-type-ui-default g4-doc-body">学习如何观察问题、识别证据，并形成可解释的判断。</p>
          <p className="rain-type-ui-caption g4-doc-muted">林老师 · 10 月 11 日更新 · 约 5 分钟阅读</p>
        </header>
        <article className="g4-doc-copy g4-doc-reading rain-type-reading-default" aria-label="课程导读示例">
          <h4 className="rain-type-heading-section">先分清事实与判断</h4>
          <p>先描述你观察到的现象，再说明它能够支持什么判断。例如，学生完成了一次课堂讨论，这是可以记录的事实；学生是否理解了概念，还需要结合回答内容和后续表现。</p>
          <p>阅读案例时，可以圈出一条事实，写下你的解释，再问自己：还有没有其他可能？把依据与解释放在一起，能让交流更清楚，也让不同观点有机会被检验。</p>
        </article>
        <p className="rain-type-ui-supporting g4-doc-muted">阅读后，请带着一条证据参加课堂讨论。</p>
      </div>
      <details className="g4-doc-example-code"><summary>查看代码</summary><DocCode code={typographyCode} /></details>
    </DocExample>
    <DocExample title="直接比较已有字阶" description="用同一段文字比较字号与行高。选择依据是内容角色；字体和尺寸沿用已登记方案。">
      <div className="g4-doc-panel g4-doc-type-scale">
        {Object.entries(typeSamples).map(([name, label]) => {
          const key = name as keyof typeof typeSamples, preset = typographyPresets[key];
          return <div className="g4-doc-type-row" key={name}>
            <div className="g4-doc-type-spec"><span>{label}</span><span>{preset.fontSize} / {preset.lineHeight}</span></div>
            <p className={typographyUtilityClassNames.preset[key]}>观察问题，整理证据，形成判断。</p>
          </div>;
        })}
      </div>
    </DocExample>
    <DocExample title="关键数字与单位" description="数值承担视觉锚点，标签、中文单位和统计范围保持界面字体。以下为课程样例数据。">
      <div className="g4-doc-panel g4-doc-statistic" data-slot="typography-data-example">
        <span className="rain-type-ui-default" data-slot="label">平均得分</span>
        <div className="g4-doc-number"><span className="rain-type-data-default" data-slot="value">86.5</span><span className="rain-type-ui-default" data-slot="unit">分</span></div>
        <p className="rain-type-ui-supporting g4-doc-muted">共 24 份答卷 · 满分 100 分</p>
      </div>
      <details className="g4-doc-example-code"><summary>查看代码</summary><DocCode code={statisticCode} /></details>
    </DocExample>
  </ComponentDoc>;
}

const courseResources = [
  { id: "guide", label: "课程导读", title: "课程导读：从问题到证据", category: "课前必读", meta: "阅读材料 · 约 5 分钟 · 林老师", available: true,
    body: "先描述你观察到的现象，再说明它能够支持什么判断。\n\n阅读案例时，圈出一条事实，写下你的解释，再问自己：还有没有其他可能？\n\n阅读后，请带着一条证据参加课堂讨论。" },
  { id: "evidence", label: "案例阅读", title: "案例阅读：如何识别一条可靠的学习证据", category: "拓展阅读", meta: "案例材料 · 约 8 分钟 · 林老师", available: true,
    body: "两名学生都完成了同一份任务，但他们解释过程的方法不同。\n\n比较两份记录：哪些内容是直接观察，哪些内容是推断？找出支持判断的具体依据，并说明它的适用范围。" },
  { id: "discussion", label: "课堂讨论任务", title: "课堂讨论任务与提交说明", category: "课堂活动", meta: "讨论任务 · 10 月 16 日 09:00 开放", available: false,
    body: "" },
] as const;
const itemCode = `import { useState } from "react";
import { Button, Dialog, Item, ItemActions, ItemContent, ItemDescription,
  ItemGroup, ItemMedia, ItemSeparator, ItemTitle, Link, Tag } from "@rain-next/ui";
import { FileIcon } from "@rain-next/ui/icons/file";

const resources = [
  { id: "guide", label: "课程导读", title: "课程导读：从问题到证据", category: "课前必读",
    meta: "阅读材料 · 约 5 分钟 · 林老师", available: true,
    body: "先描述你观察到的现象，再说明它能够支持什么判断。" },
  { id: "evidence", label: "案例阅读", title: "案例阅读：如何识别一条可靠的学习证据", category: "拓展阅读",
    meta: "案例材料 · 约 8 分钟 · 林老师", available: true,
    body: "比较两份学习记录，找出支持判断的具体依据。" },
  { id: "discussion", label: "课堂讨论任务", title: "课堂讨论任务与提交说明", category: "课堂活动",
    meta: "讨论任务 · 10 月 16 日 09:00 开放", available: false, body: "" },
];

export function CourseResources() {
  const [readIds, setReadIds] = useState<string[]>([]);
  return <section aria-label="课程资料示例">
    <h3 className="rain-type-heading-section">从问题到证据</h3>
    <ItemGroup aria-label="本讲课程资料">
      {resources.map((resource, index) => <div role="listitem" key={resource.id}>
        {index > 0 && <ItemSeparator decorative />}
        <Dialog.Root>
          <Item>
            <ItemMedia><FileIcon aria-hidden="true" /></ItemMedia>
            <ItemContent>
              <ItemTitle>{resource.title}</ItemTitle>
              <Tag size={20} color={index === 0 ? "brand" : "neutral"}>{resource.category}</Tag>
              <ItemDescription>{resource.meta}</ItemDescription>
              <span className="rain-type-ui-caption">{resource.available
                ? readIds.includes(resource.id) ? "已读" : "未读"
                : "尚未开放"}</span>
            </ItemContent>
            <ItemActions>
              {resource.available ? <>
                <Dialog.Trigger render={<Button variant="text" size="regular" tone="brand"
                  aria-label={"阅读" + resource.label}>阅读</Button>} />
                <Link href={"data:text/markdown;charset=utf-8," + encodeURIComponent("# " + resource.title + "\\n\\n" + resource.body)}
                  download={resource.label + ".md"} aria-label={"下载" + resource.label}>下载</Link>
              </> : <Button variant="text" size="regular" disabled>未开放</Button>}
            </ItemActions>
          </Item>
          {resource.available && <Dialog.Content>
            <Dialog.Header><Dialog.Title>{resource.title}</Dialog.Title><Dialog.Description>{resource.meta}</Dialog.Description></Dialog.Header>
            <Dialog.Body><article className="rain-type-reading-default"><p>{resource.body}</p></article></Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close render={<Button variant="text">返回列表</Button>} />
              <Dialog.Close render={<Button variant="primary" onClick={() => setReadIds(ids =>
                ids.includes(resource.id) ? ids : [...ids, resource.id])}>
                {readIds.includes(resource.id) ? "完成阅读" : "标记已读"}</Button>} />
            </Dialog.Footer>
          </Dialog.Content>}
        </Dialog.Root>
      </div>)}
    </ItemGroup>
    <p role="status" className="rain-type-ui-caption">已读 {readIds.length} / 2 份</p>
  </section>;
}`;
const itemLinkCode = `import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@rain-next/ui";
import { ChevronRightIcon } from "@rain-next/ui/icons/chevron-right";

<Item variant="outline" render={<a href="#typography" />}>
  <ItemContent>
    <ItemTitle>文字排版规范</ItemTitle>
    <ItemDescription>查看标题、正文和关键数字的使用方式。</ItemDescription>
  </ItemContent>
  <ItemMedia><ChevronRightIcon aria-hidden="true" /></ItemMedia>
</Item>`;

export function ItemPage() {
  const [readIds, setReadIds] = useState<string[]>([]);
  return <ComponentDoc id="item" title="Item 内容条目"
    description="把对象名称、属性、状态与操作组织成清楚的内容条目。连续列表保持稳定的对齐，独立动作靠近它们作用的对象。"
    useWhen={["资料、通知、成员或任务摘要需要稳定的内容与动作排列。", "普通列表需要清晰的分组与长内容换行。"]}
    avoidWhen={["表单字段使用 FormItem；导航选择使用 NavigationList 或 ObjectNavigator。", "把含按钮、输入或其他链接的整条内容再包成链接或按钮。", "为静态信息添加伪点击、tabIndex 或选择状态。"]}
    props={[
      { name: "variant", type: '"default" | "outline" | "muted"', default: '"default"', description: "透明内容、轻边界与浅底承载。" },
      { name: "size", type: '"default" | "sm" | "xs"', description: "未指定时跟随父级 Density；显式尺寸只影响当前条目。" },
      { name: "render", type: "ReactElement / render function", description: "复用原生链接等语义；整行链接内部只放非交互内容。" },
      { name: "children / className / ref", type: "React / native props", description: "开放 Parts 组合和宿主布局，不内置业务状态。" },
    ]}
    slots={["ItemGroup", "ItemMedia", "ItemContent", "ItemTitle", "ItemDescription", "ItemActions", "ItemHeader", "ItemFooter", "ItemSeparator（复用 Separator）"]}
    source="packages/ui/src/item/item.tsx" code={itemCode}>
    <DocExample title="课程资料列表" description="围绕查找、阅读和下载组织资料。样例材料可实际打开，下载为对应的 Markdown 文本；已读状态仅保留在本页。">
      <section className="g4-doc-panel g4-doc-resources" aria-label="课程资料示例">
        <header className="g4-doc-resource-header">
          <div className="g4-doc-copy"><p className="rain-type-ui-caption g4-doc-muted">人工智能导论 · 第 04 讲</p><h3 className="rain-type-heading-section">从问题到证据</h3></div>
          <span className="rain-type-ui-caption g4-doc-muted">3 份资料</span>
        </header>
        <ItemGroup aria-label="本讲课程资料" className="g4-doc-resource-list">
          {courseResources.map((resource, index) => {
            const read = readIds.includes(resource.id);
            return <div role="listitem" key={resource.id}>
              {index > 0 && <ItemSeparator decorative />}
              <Dialog.Root>
                <Item className="g4-doc-resource-row">
                  <ItemMedia className="g4-doc-file"><FileIcon aria-hidden="true" /></ItemMedia>
                  <ItemContent>
                    <div className="g4-doc-resource-heading"><ItemTitle>{resource.title}</ItemTitle><Tag size={20} color={index === 0 ? "brand" : "neutral"}>{resource.category}</Tag></div>
                    <ItemDescription>{resource.meta}</ItemDescription>
                    <span className="g4-doc-read-state rain-type-ui-caption">{resource.available ? <>{read && <CircleCheckIcon aria-hidden="true" />}{read ? "已读" : "未读"}</> : "尚未开放"}</span>
                  </ItemContent>
                  <ItemActions>
                    {resource.available ? <>
                      <Dialog.Trigger render={<Button variant="text" size="regular" tone="brand" aria-label={`阅读${resource.label}`}>阅读</Button>} />
                      <Link href={`data:text/markdown;charset=utf-8,${encodeURIComponent(`# ${resource.title}\n\n${resource.body}\n`)}`} download={`${resource.label}.md`} aria-label={`下载${resource.label}`}>下载</Link>
                    </> : <Button variant="text" size="regular" disabled aria-label="课堂讨论任务尚未开放">未开放</Button>}
                  </ItemActions>
                </Item>
                {resource.available && <Dialog.Content>
                  <Dialog.Header><Dialog.Title>{resource.title}</Dialog.Title><Dialog.Description>{resource.meta}</Dialog.Description></Dialog.Header>
                  <Dialog.Body><article className="g4-doc-copy rain-type-reading-default">{resource.body.split("\n\n").map(text => <p key={text}>{text}</p>)}</article></Dialog.Body>
                  <Dialog.Footer><Dialog.Close render={<Button variant="text">返回列表</Button>} /><Dialog.Close render={<Button variant="primary" onClick={() => setReadIds(ids => ids.includes(resource.id) ? ids : [...ids, resource.id])}>{read ? "完成阅读" : "标记已读"}</Button>} /></Dialog.Footer>
                </Dialog.Content>}
              </Dialog.Root>
            </div>;
          })}
        </ItemGroup>
        <footer className="g4-doc-resource-footer"><span>课前完成阅读，课堂一起讨论</span><span role="status">已读 {readIds.length} / 2 份</span></footer>
      </section>
      <details className="g4-doc-example-code"><summary>查看代码</summary><DocCode code={itemCode} /></details>
    </DocExample>
    <DocExample title="整行链接" description="整条内容作为一个入口时，只保留展示信息和一个导航目标。">
      <div className="g4-doc-link-example"><Item variant="outline" render={<a href="#typography" />}>
        <ItemContent><ItemTitle>文字排版规范</ItemTitle><ItemDescription>查看标题、正文和关键数字的使用方式。</ItemDescription></ItemContent>
        <ItemMedia><ChevronRightIcon aria-hidden="true" /></ItemMedia>
      </Item></div>
      <details className="g4-doc-example-code"><summary>查看代码</summary><DocCode code={itemLinkCode} /></details>
    </DocExample>
  </ComponentDoc>;
}

const progressCode = `import { useState } from "react";
import { Button, Link, Progress, ProgressLabel, ProgressValue } from "@rain-next/ui";

export function MaterialSync() {
  const [value, setValue] = useState(40);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const complete = value === 100;
  return <>
    <section aria-label="资料同步任务">
      <Progress value={value} max={100}>
        <ProgressLabel>资料同步</ProgressLabel><ProgressValue />
      </Progress>
      <div role="status">
        <p>{failed ? "同步中断，请重试" : complete ? "全部资料已同步"
          : paused ? "同步已暂停" : "已完成 " + value + " / 100 份资料"}</p>
        {(failed || paused) && <p className="rain-type-ui-caption">已完成 {value} 份，继续时保留当前进度。</p>}
      </div>
      {failed ? <Button variant="primary" onClick={() => { setFailed(false); setPaused(false); }}>重试同步</Button>
        : complete ? <Link href="#item">查看课程资料</Link>
          : <Button variant={paused ? "secondary" : "text"} aria-pressed={paused}
            onClick={() => setPaused(current => !current)}>{paused ? "继续同步" : "暂停同步"}</Button>}
    </section>
    <div role="group" aria-label="演示控制">
      <span className="rain-type-ui-caption">演示控制</span>
      <Button variant="secondary" disabled={paused || failed || complete}
        onClick={() => setValue(current => Math.min(100, current + 20))}>完成下一批</Button>
      <Button variant="text" disabled={complete || failed}
        onClick={() => { setFailed(true); setPaused(false); }}>模拟失败</Button>
      <Button variant="text" onClick={() => { setValue(0); setPaused(false); setFailed(false); }}>重新开始</Button>
    </div>
  </>;
}`;
const unknownCode = `import { Progress, ProgressLabel, Spinner } from "@rain-next/ui";
import "./unknown-task.css";

export function UnknownTask() {
  return <section aria-label="资料解析任务">
    <Progress value={null} className="unknown-task">
      <ProgressLabel>正在解析资料</ProgressLabel>
      <Spinner aria-hidden="true" />
    </Progress>
    <p>正在识别资料目录，完成后会显示可阅读内容。</p>
  </section>;
}`;
const unknownCss = `/* 局部组合用 Spinner 表示未知耗时，隐藏可能被误读的比例轨道。 */
.unknown-task > [data-slot="progress-track"] { display: none; }`;
const quantityCode = `import { Progress, ProgressLabel, ProgressValue } from "@rain-next/ui";

<>
<Progress value={6} max={24}>
  <ProgressLabel>批改任务</ProgressLabel>
  <ProgressValue />
</Progress>
<p>已完成 6 / 24 份答卷</p>
</>`;

export function ProgressPage() {
  const [value, setValue] = useState(40);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const complete = value === 100;
  return <ComponentDoc id="progress" title="Progress 任务进度"
    description="让任务名称、完成量与状态保持在一起。可计算时显示真实比例，未知时明确表达正在处理。"
    useWhen={["同步、上传或批处理有明确总量与完成量。", "一个持续任务需要稳定的标签、完成比例和外部状态说明。"]}
    avoidWhen={["用计时动画伪造处理进度。", "把失败、暂停、重试、请求或数据持久化放进通用进度组件。", "用普通进度条替代构成图或多目标进度图表。"]}
    props={[
      { name: "value", type: "number | null", description: "当前完成量；null 表示未知比例，非有限值按未知处理。有限值由 Base UI 限制在范围内。" },
      { name: "min / max", type: "number", default: "0 / 100", description: "有限数值且 min < max；错误范围会抛出 RangeError。" },
      { name: "aria-label / ProgressLabel", type: "accessible name", description: "提供明确的任务名称；使用 ProgressLabel 时自动建立关联。" },
      { name: "ProgressValue", type: "Base UI Value props", description: "由引擎提供归一化读数；未知状态不显示假百分比。" },
      { name: "className / style / ref / render", type: "Base UI props", description: "保持原生组合能力与状态回调；不覆盖引擎的数值含义。" },
    ]}
    slots={["root", "progress-label", "progress-value", "progress-track", "progress-indicator"]}
    source="packages/ui/src/progress/progress.tsx" code={progressCode}>
    <DocExample title="一个任务的完成量与状态" description="任务信息与恢复动作保持就近。下方演示控制可切换进度、失败与重置，不会按时间自行增长。">
      <div className="g4-doc-stack">
        <section className="g4-doc-panel g4-doc-task" aria-label="资料同步任务">
          <p className="rain-type-ui-caption g4-doc-muted">人工智能导论 · 第 04 讲</p>
          <Progress value={value}><ProgressLabel className="rain-type-heading-section">资料同步</ProgressLabel><ProgressValue /></Progress>
          <div className="g4-doc-task-footer">
            <div className="g4-doc-task-feedback" data-kind={failed ? "error" : complete ? "complete" : "default"} role="status">
              {failed ? <CircleCloseIcon aria-hidden="true" /> : complete ? <CircleCheckIcon aria-hidden="true" /> : null}
              <div><p>{failed ? "同步中断，请重试" : complete ? "全部资料已同步" : paused ? "同步已暂停" : `已完成 ${value} / 100 份资料`}</p>{(failed || paused) && <p className="rain-type-ui-caption g4-doc-muted">已完成 {value} 份，继续时保留当前进度。</p>}</div>
            </div>
            {failed ? <Button variant="primary" size="small" onClick={() => { setFailed(false); setPaused(false); }}>重试同步</Button>
              : complete ? <Link href="#item">查看课程资料</Link>
                : <Button variant={paused ? "secondary" : "text"} size="small" aria-pressed={paused} onClick={() => setPaused(current => !current)}>{paused ? "继续同步" : "暂停同步"}</Button>}
          </div>
        </section>
        <div className="g4-doc-demo-controls" role="group" aria-label="演示控制">
          <span className="rain-type-ui-caption g4-doc-muted">演示控制</span>
          <Button variant="secondary" size="small" disabled={paused || failed || complete} onClick={() => setValue(current => Math.min(100, current + 20))}>完成下一批</Button>
          <Button variant="text" size="small" disabled={complete || failed} onClick={() => { setFailed(true); setPaused(false); }}>模拟失败</Button>
          <Button variant="text" size="small" onClick={() => { setValue(0); setPaused(false); setFailed(false); }}>重新开始</Button>
        </div>
      </div>
      <details className="g4-doc-example-code"><summary>查看代码</summary><DocCode code={progressCode} /></details>
    </DocExample>
    <DocExample title="未知耗时：明确表达正在处理" description="未知任务保留标签和可访问语义，配合既有加载指示；这个局部组合不展示比例轨道。">
      <section className="g4-doc-panel g4-doc-task" aria-label="资料解析任务">
        <Progress value={null} className="g4-doc-progress-unknown"><ProgressLabel className="rain-type-heading-section">正在解析资料</ProgressLabel><Spinner aria-hidden="true" /></Progress>
        <p className="g4-doc-feedback">正在识别资料目录，完成后会显示可阅读内容。</p>
      </section>
      <details className="g4-doc-example-code"><summary>查看代码</summary><p className="rain-type-ui-caption">UnknownTask.tsx</p><DocCode code={unknownCode} /><p className="rain-type-ui-caption">unknown-task.css</p><DocCode code={unknownCss} /></details>
    </DocExample>
    <DocExample title="按实际任务单位计量" description="完成量与总量使用答卷份数，百分比与数量就近展示。">
      <section className="g4-doc-panel g4-doc-task" aria-label="答卷批改任务">
        <p className="rain-type-ui-caption g4-doc-muted">人工智能导论 · 课堂练习</p>
        <Progress value={6} max={24}><ProgressLabel className="rain-type-heading-section">批改任务</ProgressLabel><ProgressValue /></Progress>
        <p className="g4-doc-feedback">已完成 6 / 24 份答卷</p>
      </section>
      <details className="g4-doc-example-code"><summary>查看代码</summary><DocCode code={quantityCode} /></details>
    </DocExample>
  </ComponentDoc>;
}
