import { useId, useRef, useState, type CSSProperties } from "react";
import { compositionSpaceTokens } from "@rain-next/foundations";
import { Grid, Inline, Split, Stack, defineLayoutSpacing, type LayoutSpacing } from "@rain-next/layouts";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, FormItem, Input, Select, Tag } from "@rain-next/ui";
import "./layout-recipes.css";

const modes = [{ value: "seminar", label: "研讨课" }, { value: "practice", label: "实践课" }, { value: "lecture", label: "讲授课" }];
const materials = ["从观察开始：发现真实的学习问题", "课堂讨论与小组协作", "访谈记录与研究方法", "把想法转化为可验证的方案", "学习作品与同伴反馈", "阶段回顾与课程总结"];

export const layoutSpacingDefaults = {
  page: defineLayoutSpacing({ inset: 32, section: 24, item: 16 }),
  card: defineLayoutSpacing({ inset: 20, section: 16, item: 12 }),
  panel: defineLayoutSpacing({ inset: 16, section: 12, item: 8 }),
};

/** Local teaching examples: business values and popup state stay with the host. */
export function LayoutRecipes({ panelSpacing = layoutSpacingDefaults.panel, cardSpacing = layoutSpacingDefaults.card }: { panelSpacing?: LayoutSpacing; cardSpacing?: LayoutSpacing }) {
  const panel = defineLayoutSpacing(panelSpacing), card = defineLayoutSpacing(cardSpacing);
  const cardStyle = { "--rain-card-spacing": compositionSpaceTokens[card.inset], "--rain-card-section-gap": compositionSpaceTokens[card.section] } as CSSProperties;
  const detailGap = Math.min(card.item, 4) as LayoutSpacing["item"], actionGap = Math.min(card.item, 8) as LayoutSpacing["item"];
  const [course, setCourse] = useState("设计方法与实践"), [mode, setMode] = useState("seminar");
  const [invalid, setInvalid] = useState(false), [notice, setNotice] = useState("");
  const [query, setQuery] = useState(""), [filter, setFilter] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false), [draft, setDraft] = useState(materials[0]!);
  const [materialMode, setMaterialMode] = useState("seminar"), [modeOpen, setModeOpen] = useState(false);
  const [draftNotice, setDraftNotice] = useState("");
  const courseInput = useRef<HTMLInputElement>(null), collapseButton = useRef<HTMLButtonElement>(null);
  const sidebarId = useId();
  const visible = materials.filter((name, index) => name.includes(query.trim()) && (filter === null || (index % 2 ? "worksheet" : "reading") === filter));
  function collapseDetails() { setModeOpen(false); setCollapsed(true); }

  return <Stack gap={layoutSpacingDefaults.page.section} className="layout-recipes" data-asset-identity="local-experiment" aria-label="课程组合示例">
    <Card data-example="layout-settings" style={cardStyle}>
      <CardHeader style={{ rowGap: compositionSpaceTokens[detailGap] }}><CardTitle as="h2">课程设置</CardTitle><CardDescription>相关字段成组排列，窄容器中自然转为单列。</CardDescription></CardHeader>
      <CardContent><form noValidate onSubmit={event => {
        event.preventDefault();
        if (!course.trim()) { setInvalid(true); setNotice(""); courseInput.current?.focus(); return; }
        setInvalid(false); setNotice("课程设置已保存在本页。");
      }}><Stack gap={card.section} data-example="settings-sections">
        <Grid columns={2} minColumnWidth={260} gap={card.item} className="items-start" data-example="settings-grid">
          <FormItem label="课程名称" required status={invalid ? "error" : "default"}
            message={invalid ? "请输入课程名称。较长的课程名称也可以完整填写，内容会保留在当前页面。" : undefined}>
            <Input ref={courseInput} value={course} onValueChange={value => { setCourse(value); setInvalid(false); setNotice(""); }} />
          </FormItem>
          <FormItem label="主要教学方式" help="根据本学期的主要活动选择，详细安排可以在后续教学任务中调整。">
            <Select value={mode} onValueChange={value => setMode(String(value))} options={modes} clearable={false} />
          </FormItem>
        </Grid>
        <Inline gap={card.item} justify="between" align="center">
          <p className="layout-example-muted" role="status">{notice || "设置仅作用于本页的虚构课程。"}</p>
          <Inline gap={actionGap} justify="end" className="layout-example-actions">
            <Button size="small" variant="tertiary" onClick={() => { setCourse("设计方法与实践"); setMode("seminar"); setInvalid(false); setNotice(""); }}>重置</Button>
            <Button size="small" variant="primary" type="submit">保存设置</Button>
          </Inline>
        </Inline>
      </Stack></form></CardContent>
    </Card>

    <Card data-example="layout-materials" style={cardStyle}>
      <CardHeader style={{ rowGap: compositionSpaceTokens[detailGap] }}><CardTitle as="h2">课程资料</CardTitle><CardDescription>查找资料、查看内容，并在侧区保留正在编辑的草稿。</CardDescription></CardHeader>
      <CardContent><Stack gap={card.section} data-example="material-sections">
        <Inline gap={card.item} align="end" data-example="query-inline">
          <div className="layout-example-search"><FormItem label="查找资料"><Input value={query} onValueChange={setQuery} placeholder="输入资料名称" /></FormItem></div>
          <div className="layout-example-filter"><FormItem label="资料类型"><Select value={filter} onValueChange={value => setFilter(value === null ? null : String(value))}
            options={[{ value: "reading", label: "阅读材料" }, { value: "worksheet", label: "课堂任务" }]} placeholder="全部资料" /></FormItem></div>
          <Inline gap={actionGap} justify="end" className="layout-example-actions" data-example="query-actions">
            <Button size="small" variant="tertiary" onClick={() => { setQuery(""); setFilter(null); }}>清空筛选</Button>
            <Button ref={collapseButton} size="small" variant="secondary" aria-expanded={!collapsed} aria-controls={sidebarId}
              onClick={() => { if (collapsed) setCollapsed(false); else collapseDetails(); }}>{collapsed ? "展开资料详情" : "收起资料详情"}</Button>
          </Inline>
        </Inline>

        <Split.Root collapsed={collapsed} sidebarWidth={320} minMainWidth={320} sidebarId={sidebarId}
          collapseFocusRef={collapseButton} gap={card.item} className="layout-example-workbench">
          <Split.Main scroll="auto" role="region" data-focus="item" aria-label="资料列表" tabIndex={0} className="layout-example-pane" style={{ padding: compositionSpaceTokens[panel.inset] }}>
            <Stack gap={panel.section} data-example="main-groups">
              <Inline gap={panel.item} justify="between"><h3>{filter === "worksheet" ? "课堂任务" : filter === "reading" ? "阅读材料" : "全部资料"}</h3><Tag size={20} color="neutral">{visible.length} 份资料</Tag></Inline>
              {visible.length === 0 ? <p className="layout-example-muted" role="status">没有找到相关资料，请调整查找条件。</p> :
                <Stack gap={panel.section} data-example="material-list">{visible.map((name, index) => <article key={name}>
                  <Stack gap={panel.item} data-example="material-info">
                    <h4>{name}</h4><p className="layout-example-muted">第 {index + 1} 周 · 阅读与课堂讨论</p>
                    <p>从真实的学习场景出发，记录观察、交流和实践中的发现，整理值得继续讨论的问题。</p>
                    <Inline gap={panel.item}><Button size="small" variant="text" aria-label={`查看《${name}》`} onClick={() => { setDraft(name); setDraftNotice(""); setModeOpen(false); setCollapsed(false); }}>查看资料</Button></Inline>
                  </Stack>
                </article>)}</Stack>}
            </Stack>
          </Split.Main>
          <Split.Sidebar scroll="auto" role="region" data-focus="item" aria-label="资料详情" tabIndex={0} className="layout-example-pane" style={{ padding: compositionSpaceTokens[panel.inset] }}>
            <Stack gap={panel.section} data-example="sidebar-groups">
              <Inline gap={panel.item} align="center" justify="between"><h3>资料详情</h3><Button size="small" variant="text" onClick={collapseDetails}>收起当前详情</Button></Inline>
              <FormItem label="资料标题" help="收起详情后，尚未保存的内容仍会保留。"><Input value={draft} onValueChange={value => { setDraft(value); setDraftNotice(""); }} /></FormItem>
              <FormItem label="关联教学方式"><Select open={modeOpen} onOpenChange={setModeOpen} value={materialMode} onValueChange={value => setMaterialMode(String(value))}
                options={modes} clearable={false} /></FormItem>
              <Stack gap={panel.item}><h4>内容摘要</h4><p>先观察课堂中发生了什么，再把记录转化为可以交流的材料。描述具体的情境、行动和变化，保留不同的观察角度。</p><p>完成阅读后，选择一项发现带入课堂讨论。可以用文字、图片或作品说明自己的判断依据。</p></Stack>
              <Stack gap={panel.item}><h4>学习建议</h4><p>将观察与解释分开记录，留意同伴的不同观点。课后回看自己的草稿，补充需要继续验证的问题。</p></Stack>
              <Button size="small" variant="secondary" onClick={() => setDraftNotice("资料草稿已保存在本页。")}>保存资料草稿</Button>
              {draftNotice && <p className="layout-example-muted" role="status">{draftNotice}</p>}
            </Stack>
          </Split.Sidebar>
        </Split.Root>
      </Stack></CardContent>
    </Card>
  </Stack>;
}
