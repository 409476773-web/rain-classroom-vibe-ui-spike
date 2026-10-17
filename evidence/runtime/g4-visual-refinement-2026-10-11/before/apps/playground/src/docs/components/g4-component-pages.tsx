import { useState } from "react";
import { typographyPresets, typographyUtilityClassNames } from "@rain-next/foundations";
import {
  Button, Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemSeparator, ItemTitle,
  Progress, ProgressLabel, ProgressValue,
} from "@rain-next/ui";
import { FileIcon } from "@rain-next/ui/icons/file";
import { ChevronRightIcon } from "@rain-next/ui/icons/chevron-right";
import { ComponentDoc, DocExample } from "./component-doc";
import "./g4-component-pages.css";

const typographyCode = `<h2 className="rain-type-heading-section">课程资料</h2>
<p className="rain-type-ui-default">本周共 12 份资料，更新于 10 月 11 日。</p>
<p className="rain-type-ui-caption">普通日期、序号与表格数字沿用 UI 字体。</p>

<article className="rain-type-reading-default">
  <p>长答案、评语、课程介绍和报告结论使用 Reading 排版。</p>
</article>

<div>
  <span className="rain-type-ui-default">平均得分 </span>
  <span className="rain-type-data-default">86.5</span>
  <span className="rain-type-ui-default"> 分</span>
</div>`;

export function TypographyPage() {
  return <ComponentDoc id="typography" title="Typography 文字排版" category="Foundations" status="复用现有排版基础 · 用法待审阅"
    description="按内容角色选择已登记的排版方案，保留文字语义。界面、长阅读和关键数字各有清楚的用途。"
    useWhen={["标题、控件说明、正文和元信息需要建立稳定层级。", "答案解析、评语与报告结论需要连续阅读。", "少量关键数值承担视觉锚点，数字与中文单位分开。"]}
    avoidWhen={["把普通日期、序号、表格数值或中文单位切换为关键数据字体。", "为每段文案另建字号、字体或同义包装组件。", "仅为增大字号选择更高的 HTML 标题层级。"]}
    props={Object.entries(typographyPresets).map(([name, preset]) => ({
      name: typographyUtilityClassNames.preset[name as keyof typeof typographyPresets],
      type: `${preset.fontRole} · ${preset.fontSize}px / ${preset.lineHeight}px`,
      description: preset.useWhen,
    }))}
    slots={["原生 heading / paragraph / article", "关键数据 label / value / unit"]}
    source="packages/foundations/src/typography-contract.ts" code={typographyCode}>
    <DocExample title="界面文字：标题、正文与元信息" description="普通数字与中文、英文保持同一 UI 字体；HTML 标题层级按文档结构选择。">
      <div className="g4-doc-copy" data-slot="typography-ui-example">
        <h3 className="rain-type-heading-section">本周课程资料</h3>
        <p className="rain-type-ui-default">人工智能导论 · 第 04 讲，共 12 份资料。</p>
        <p className="rain-type-ui-supporting">请先阅读导读，再完成课堂讨论。示例包含中文、English 与普通数字 2026。</p>
        <p className="rain-type-ui-caption">更新于 2026-10-11 · 课程编号 AI-104</p>
      </div>
    </DocExample>
    <DocExample title="长内容：使用 Reading 排版" description="字号与行高由内容角色决定，不根据字符串长度临时调整。">
      <article className="g4-doc-copy g4-doc-reading rain-type-reading-default" aria-label="课程导读示例">
        <p>观察一个学习过程时，先明确学生要解决的问题，再选择能够解释过程的材料。相同的概念可以通过文字、实例和图形表达，阅读区应保持连续的节奏，让学生有足够空间理解关系。</p>
        <p>课堂讨论结束后，请结合证据说明你的判断。长答案、评语、课程介绍和报告结论沿用 Reading 排版；工具栏、表格与短标签继续使用 UI 排版。</p>
      </article>
    </DocExample>
    <DocExample title="关键数字：数值与单位分开" description="这是课程样例数据。关键数值使用 Data 字体；标签、单位、分母和解释保留 UI 字体。字体缺失时使用已登记回退，不随源码分发字体文件。">
      <div className="g4-doc-statistic" data-slot="typography-data-example">
        <span className="rain-type-ui-default" data-slot="label">平均得分</span>
        <div className="g4-doc-number"><span className="rain-type-data-default" data-slot="value">86.5</span><span className="rain-type-ui-default" data-slot="unit">分</span></div>
        <p className="rain-type-ui-supporting">满分 100 分 · 本地样例</p>
      </div>
    </DocExample>
  </ComponentDoc>;
}

const itemCode = `import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle, Button } from "@rain-next/ui";

<Item variant="outline">
  <ItemContent>
    <ItemTitle>第一讲阅读资料</ItemTitle>
    <ItemDescription>PDF · 12 页 · 由林老师整理</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button variant="text" onClick={openDetails}>查看资料</Button>
  </ItemActions>
</Item>

// 整行是链接时，内部只放展示内容。
<Item render={<a href="#typography" />}>
  <ItemContent><ItemTitle>查看文字排版规范</ItemTitle></ItemContent>
</Item>`;

export function ItemPage() {
  const [marked, setMarked] = useState(false);
  const [detail, setDetail] = useState(false);
  return <ComponentDoc id="item" title="Item 内容条目"
    description="将对象的图标、主信息、辅助说明与独立操作组织成一条可阅读内容。数据、选择和任务行为由宿主提供。"
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
    <DocExample title="内容与独立操作" description="重点标记和详情由本页管理，按钮不会触发整行导航。">
      <div className="g4-doc-stack">
        <Item variant="outline">
          <ItemMedia variant="icon"><FileIcon aria-hidden="true" /></ItemMedia>
          <ItemContent><ItemTitle>第一讲阅读资料</ItemTitle><ItemDescription>PDF · 12 页 · 由林老师整理</ItemDescription></ItemContent>
          <ItemActions><Button variant="text" size="small" aria-pressed={marked} onClick={() => setMarked(value => !value)}>{marked ? "取消重点" : "设为重点"}</Button><Button variant="secondary" size="small" onClick={() => setDetail(value => !value)}>{detail ? "收起详情" : "查看详情"}</Button></ItemActions>
        </Item>
        <p className="g4-doc-feedback" role="status">{marked ? "已标记为重点资料" : "尚未标记为重点资料"}</p>
        {detail && <div className="g4-doc-detail"><h3 className="rain-type-heading-section">资料详情</h3><p>本资料包含课程目标、案例导读与三道讨论题。页面操作只影响本地演示。</p></div>}
      </div>
    </DocExample>
    <DocExample title="分组、长标题与多行说明" description="列表成员使用明确的 listitem 结构；标题、说明和动作在窄容器内自然换行。">
      <ItemGroup aria-label="待阅读资料">
        <div role="listitem"><Item><ItemMedia variant="icon"><FileIcon aria-hidden="true" /></ItemMedia><ItemContent><ItemTitle>第二讲阅读资料：从观察问题到整理证据，建立可复核的学习过程说明</ItemTitle><ItemDescription>这是一段需要完整阅读的资料说明。长标题与中文、English、资料编号 AI-2026-104 保持自然换行，重要信息不会默认被截断。</ItemDescription></ItemContent><ItemActions><Button variant="text" size="small" disabled>等待发布</Button></ItemActions></Item></div>
        <ItemSeparator decorative />
        <div role="listitem"><Item variant="muted"><ItemContent><ItemTitle>课堂讨论准备</ItemTitle><ItemDescription>阅读资料后，选择一条证据说明你的观点。</ItemDescription></ItemContent></Item></div>
      </ItemGroup>
    </DocExample>
    <DocExample title="整行链接" description="这是原生链接，支持 Tab 聚焦、Enter 打开和浏览器链接操作；内部没有独立按钮。">
      <Item variant="outline" render={<a href="#typography" />}>
        <ItemContent><ItemTitle>查看文字排版规范</ItemTitle><ItemDescription>了解标题、正文和关键数据的现有用法。</ItemDescription></ItemContent>
        <ItemMedia><ChevronRightIcon aria-hidden="true" /></ItemMedia>
      </Item>
    </DocExample>
  </ComponentDoc>;
}

const progressCode = `import { Progress, ProgressLabel, ProgressValue } from "@rain-next/ui";

<Progress value={completed} min={0} max={24}>
  <ProgressLabel>批改任务</ProgressLabel>
  <ProgressValue />
</Progress>
<p>已完成 {completed} / 24 份</p>

<Progress value={null}>
  <ProgressLabel>正在解析资料</ProgressLabel>
</Progress>
<p>进度暂不可计算，请等待解析结果。</p>`;

export function ProgressPage() {
  const [value, setValue] = useState(40);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  return <ComponentDoc id="progress" title="Progress 任务进度"
    description="展示任务已经完成的比例。标签和读数保持同步；耗时或比例未知时明确表达未知状态。"
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
    <DocExample title="确定进度与宿主操作" description="本地批处理样例，每次点击明确完成一批；不会按时间自行增加。暂停、失败和重试由本页管理。">
      <div className="g4-doc-stack">
        <Progress value={value}><ProgressLabel>资料同步</ProgressLabel><ProgressValue /></Progress>
        <p className="g4-doc-feedback" role="status">{failed ? "同步失败，已完成的进度保留。请重试。" : value === 100 ? "全部资料已同步" : paused ? "同步已暂停，已完成的进度保留" : `已完成 ${value} / 100 份资料`}</p>
        <div className="g4-doc-actions">
          <Button variant="secondary" size="small" disabled={paused || failed || value === 100} onClick={() => setValue(current => Math.min(100, current + 20))}>完成下一批</Button>
          <Button variant="text" size="small" disabled={failed || value === 100} aria-pressed={paused} onClick={() => setPaused(current => !current)}>{paused ? "继续同步" : "暂停同步"}</Button>
          <Button variant="text" size="small" disabled={value === 100} onClick={() => { setFailed(current => !current); setPaused(false); }}>{failed ? "重试同步" : "模拟失败"}</Button>
          <Button variant="text" size="small" onClick={() => { setValue(0); setPaused(false); setFailed(false); }}>重新开始</Button>
        </div>
      </div>
    </DocExample>
    <DocExample title="未知比例" description="未知状态没有 aria-valuenow 或百分比读数。指示块表达任务正在处理，不暗示已完成的比例。">
      <div className="g4-doc-stack"><Progress value={null}><ProgressLabel>正在解析资料</ProgressLabel></Progress><p className="g4-doc-feedback">进度暂不可计算，请等待解析结果。</p></div>
    </DocExample>
    <DocExample title="总量不等于 100" description="完成量和总量以实际任务单位提供；引擎负责归一化显示。">
      <div className="g4-doc-stack"><Progress value={6} max={24}><ProgressLabel>批改任务</ProgressLabel><ProgressValue /></Progress><p className="g4-doc-feedback">已完成 6 / 24 份答卷</p></div>
    </DocExample>
  </ComponentDoc>;
}
