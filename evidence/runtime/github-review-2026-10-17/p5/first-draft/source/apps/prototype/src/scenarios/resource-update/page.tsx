import { useRef, useState } from "react";
import { AlertDialog, Button, Checkbox, Dialog, FormItem, IconButton, Input, NativeSelect, NativeSelectOption, Tag, Textarea } from "@rain-next/ui";
import { FileIcon } from "@rain-next/ui/icons/file";
import { SearchIcon } from "@rain-next/ui/icons/search";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import { CloseBoldIcon } from "@rain-next/ui/icons/close-bold";
import { CircleCheckIcon } from "@rain-next/ui/icons/circle-check";
import { InfoIcon } from "@rain-next/ui/icons/info";
import "./page.css";

type UseLocation = { id: string; course: string; stage: string; purpose: string; editable: boolean };
const courses = ["学习方法与研究入门", "教育观察实践", "证据与表达"] as const;
const locations: UseLocation[] = [
  { id: "use-01", course: courses[0], stage: "第 4 讲 · 课前阅读", purpose: "阅读导引", editable: true },
  { id: "use-02", course: courses[0], stage: "第 4 讲 · 课堂讨论", purpose: "讨论材料", editable: true },
  { id: "use-03", course: courses[0], stage: "第 5 讲 · 课后练习", purpose: "练习参考", editable: true },
  { id: "use-04", course: courses[1], stage: "单元 2 · 观察记录", purpose: "方法参考", editable: true },
  { id: "use-05", course: courses[1], stage: "单元 2 · 小组作业", purpose: "作业附件", editable: true },
  { id: "use-06", course: courses[1], stage: "单元 3 · 案例评议", purpose: "拓展阅读", editable: false },
  { id: "use-07", course: courses[2], stage: "第 3 周 · 证据分析", purpose: "阅读材料", editable: true },
  { id: "use-08", course: courses[2], stage: "第 4 周 · 主题研讨", purpose: "讨论材料", editable: false },
];
const resourceName = "从问题到证据：课堂导读";
const changes = [
  { page: "第 2 页", kind: "替换示例", title: "观察记录示例", before: "课堂观察：学生积极参与讨论，课堂气氛活跃。", after: "课堂观察：10:15，教师提出问题后，6 名学生先后举手；其中 2 名学生引用了阅读材料。记录行为、时间与证据，暂不作价值判断。" },
  { page: "第 4 页", kind: "更正说明", title: "相关与因果", before: "如果两种现象同时变化，就可以说明其中一种现象导致另一种现象。", after: "两种现象同时变化，只能说明它们可能相关。判断因果关系，还需要排除共同原因，并结合时间顺序与其他证据。" },
  { page: "第 7–8 页", kind: "新增练习", title: "把判断转化为可检验的问题", before: "v2 共 6 页，未包含本节练习。", after: "练习 1：把“预习能提升讨论质量”改写为可观察、可检验的问题。\n练习 2：为问题列出所需证据，区分直接观察与推测，并说明还缺少哪些信息。" },
];
type SavedDraft = { id: string; ids: string[]; note: string; version: "v3"; fromVersion: "v2"; time: string };

function CloseDialog({ label }: { label: string }) {
  return <Dialog.Close render={<IconButton aria-label={label} icon={<CloseBoldIcon />} size="28/20" className="ru-dialog-close" />} />;
}
function VersionPair() {
  return <div className="ru-version-pair"><span><span className="ru-muted">当前已发布</span><strong>v2</strong></span><ArrowRightIcon aria-hidden="true" /><span><span className="ru-muted">草稿待采用</span><strong className="ru-brand">v3</strong></span></div>;
}
function ScopeList({ ids, removable }: { ids: string[]; removable?: (id: string) => void }) {
  return <div className="ru-scope-list">{courses.map(course => {
    const items = locations.filter(item => item.course === course && ids.includes(item.id) && item.editable);
    return items.length > 0 && <div key={course} className="ru-scope-group"><p>{course}</p>{items.map(item => <div className="ru-scope-item" key={item.id} data-testid={`scope-${item.id}`}><div><span>{item.stage}</span><small>{item.purpose} · {item.id}</small></div>{removable && <IconButton aria-label={`移除 ${item.stage}`} icon={<CloseBoldIcon />} size="24/14" onClick={() => removable(item.id)} />}</div>)}</div>;
  })}</div>;
}

export function ResourceUpdatePage() {
  const [selected, setSelected] = useState<string[]>([]), [note, setNote] = useState("");
  const [course, setCourse] = useState("all"), [keyword, setKeyword] = useState("");
  const [detailOpen, setDetailOpen] = useState(false), [activeId, setActiveId] = useState("use-01");
  const [checkOpen, setCheckOpen] = useState(false), [discardOpen, setDiscardOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false), [saved, setSaved] = useState<SavedDraft | null>(null);
  const [saving, setSaving] = useState(false), [failureNext, setFailureNext] = useState(false);
  const [saveError, setSaveError] = useState(false), [notice, setNotice] = useState("");
  const savingRef = useRef(false), checkTrigger = useRef<HTMLButtonElement>(null);
  const detailTrigger = useRef<HTMLButtonElement | null>(null), discardSafe = useRef<HTMLButtonElement>(null);
  const active = locations.find(item => item.id === activeId)!;
  const visible = locations.filter(item => (course === "all" || item.course === course) && `${item.course} ${item.stage} ${item.purpose} ${item.id}`.toLowerCase().includes(keyword.trim().toLowerCase()));
  const editableVisible = visible.filter(item => item.editable);
  const hiddenSelected = selected.filter(id => !visible.some(item => item.id === id)).length;
  const selectedCourses = new Set(locations.filter(item => selected.includes(item.id)).map(item => item.course)).size;
  const dirty = selected.length > 0 || note.length > 0;
  const savedMatches = saved && saved.note === note && [...saved.ids].sort().join() === [...selected].sort().join();
  function select(id: string, checked: boolean) {
    if (!locations.some(item => item.id === id && item.editable)) return;
    setSelected(current => checked ? [...new Set([...current, id])] : current.filter(value => value !== id));
    setNotice(""); setSaveError(false);
  }
  function save() {
    if (savingRef.current || selected.length === 0) return;
    savingRef.current = true; setSaving(true); setSaveError(false);
    const validIds = locations.filter(item => item.editable && selected.includes(item.id)).map(item => item.id);
    const snapshot: SavedDraft = { id: "local-001", ids: validIds, note, fromVersion: "v2", version: "v3", time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }) };
    const fail = failureNext;
    if (fail) setFailureNext(false);
    window.setTimeout(() => {
      savingRef.current = false; setSaving(false);
      if (fail) { setSaveError(true); return; }
      setSaved(snapshot); setCheckOpen(false); setNotice("草稿已保存在本页，可重新打开并继续编辑。");
    }, 650);
  }
  function discard() { setSelected([]); setNote(""); setSaveError(false); setNotice("已放弃本轮修改。"); setDiscardOpen(false); }
  return <main className="ru-page" data-rain-theme="light" data-rain-id="prototype-resource-update">
    <header className="ru-topbar"><div className="ru-brandmark"><span aria-hidden="true">雨</span><strong>雨课堂</strong><span className="ru-topbar-divider" /><span>课程资源</span></div><Tag appearance="outlined" color="neutral" size={24}>本地原型 · 虚构样本</Tag></header>
    <div className="ru-workspace">
      <div className="ru-page-heading"><div><p className="ru-eyebrow">课程资源 / 引用管理</p><h1>更新资源引用</h1><p className="ru-muted">先核对新版本的变化，再选择本次更新的使用位置。</p></div><div className="ru-session"><span className="ru-dot" />本页草稿{saved ? " 1 份" : "尚未保存"}</div></div>
      <section className="ru-resource" aria-labelledby="resource-title"><div className="ru-resource-heading"><div className="ru-document-icon"><FileIcon aria-hidden="true" /><span>PDF</span></div><div className="ru-resource-identity"><h2 id="resource-title">{resourceName}</h2><p>PDF 文档<span>8 个使用位置</span><span>3 门课程</span></p></div><Tag size={24} color="brand" appearance="filled">待更新至 v3</Tag></div>
        <div className="ru-resource-content"><div className="ru-version-block"><div><span className="ru-label">当前版本</span><strong>v2</strong><span className="ru-muted">1.8 MB · 2026-10-10</span></div><ArrowRightIcon aria-hidden="true" /><div><span className="ru-label">待采用版本</span><strong className="ru-brand">v3</strong><span className="ru-muted">2.1 MB · 2026-10-16</span></div></div><div className="ru-change-summary"><p>本次有 3 项内容变化</p><div><span>第 2 页 · 替换示例</span><span>第 4 页 · 更正说明</span><span>第 7–8 页 · 新增练习</span></div></div>
          <Dialog.Root><Dialog.Trigger render={<Button variant="secondary" size="medium">查看版本比较</Button>} /><Dialog.Content width={1016} className="ru-comparison-dialog"><Dialog.Header><Dialog.Title>比较资源版本</Dialog.Title><Dialog.Description>{resourceName} · 以下为本地文本预览</Dialog.Description><CloseDialog label="关闭版本比较" /></Dialog.Header><Dialog.Body><div className="ru-comparison-intro"><VersionPair /><span className="ru-muted">3 项变化 · 关闭后保留选择和备注</span></div><div className="ru-compare-columns"><div>v2 · 当前已发布<span>PDF · 1.8 MB · 6 页</span></div><div>v3 · 待采用<span>PDF · 2.1 MB · 8 页</span></div></div>{changes.map(change => <section className="ru-change" key={change.page}><div className="ru-change-label"><Tag size={20} color="brand">{change.kind}</Tag><h3>{change.page} · {change.title}</h3></div><div className="ru-compare-text"><article aria-label={`${change.page} v2 内容`}><span className="ru-mobile-version">v2 · 当前</span><p>{change.before}</p></article><article aria-label={`${change.page} v3 内容`}><span className="ru-mobile-version">v3 · 待采用</span><p>{change.after}</p></article></div></section>)}</Dialog.Body></Dialog.Content></Dialog.Root>
        </div>
      </section>
      {notice && <div className="ru-notice" role="status"><CircleCheckIcon aria-hidden="true" /><span>{notice}</span></div>}
      {saved && <div className="ru-saved-banner"><div><strong>本地更新草稿</strong><span>v2 → v3 · {saved.ids.length} 个位置 · {saved.time} 保存</span></div><Dialog.Root open={savedOpen} onOpenChange={setSavedOpen}><Dialog.Trigger render={<Button variant="text" tone="brand">重新打开草稿</Button>} /><Dialog.Content width={616}><Dialog.Header><Dialog.Title>本地更新草稿</Dialog.Title><Dialog.Description>{resourceName} · {saved.id}</Dialog.Description><CloseDialog label="关闭已保存草稿" /></Dialog.Header><Dialog.Body><VersionPair /><p className="ru-panel-summary">已保存 {saved.ids.length} 个使用位置，均为当前教师可编辑的位置。</p><ScopeList ids={saved.ids} /><div className="ru-saved-note"><h3>更新备注</h3><p>{saved.note || "未填写备注"}</p></div><p className="ru-info-text"><InfoIcon aria-hidden="true" />仅保存在当前页面，已发布资源与引用仍为 v2。</p></Dialog.Body><Dialog.Footer><Button variant="primary" onClick={() => { setSelected([...saved.ids]); setNote(saved.note); setSavedOpen(false); setNotice("已恢复草稿，可以继续调整范围与备注。"); }}>继续编辑此草稿</Button></Dialog.Footer></Dialog.Content></Dialog.Root></div>}
      <div className="ru-task-layout"><section className="ru-locations" aria-labelledby="locations-title"><div className="ru-section-heading"><div><div className="ru-heading-line"><span className="ru-step">1</span><h2 id="locations-title">选择使用位置</h2></div><p>6 个位置可编辑，2 个位置由其他教师维护。</p></div></div>
        <div className="ru-filters"><FormItem label="课程" labelPosition="inside"><NativeSelect aria-label="按课程筛选" value={course} onValueChange={setCourse} size={36}><NativeSelectOption value="all">全部课程</NativeSelectOption>{courses.map(item => <NativeSelectOption key={item} value={item}>{item}</NativeSelectOption>)}</NativeSelect></FormItem><Input aria-label="搜索使用位置" placeholder="搜索环节、用途或位置 ID" value={keyword} onValueChange={setKeyword} size={36} leadingIcon={<SearchIcon />} /></div>
        <div className="ru-result-toolbar"><span aria-live="polite">显示 {visible.length} / 8 个位置{hiddenSelected > 0 && <span className="ru-brand"> · 筛选外已选 {hiddenSelected} 个</span>}</span><Button variant="text" tone="brand" disabled={editableVisible.length === 0 || editableVisible.every(item => selected.includes(item.id))} onClick={() => { setSelected(current => [...new Set([...current, ...editableVisible.map(item => item.id)])]); setNotice(""); }}>选择当前可编辑位置</Button></div>
        <Dialog.Root open={detailOpen} onOpenChange={setDetailOpen}>
          <div className="ru-location-list">{courses.map(courseName => { const items = visible.filter(item => item.course === courseName); return items.length > 0 && <div className="ru-course" key={courseName}><div className="ru-course-heading"><h3>{courseName}</h3><span>{items.length} 个位置</span></div>{items.map(item => <div className={`ru-location${selected.includes(item.id) ? " is-selected" : ""}${!item.editable ? " is-readonly" : ""}`} data-testid={`row-${item.id}`} key={item.id}><Checkbox aria-label={`选择 ${item.stage} ${item.id}`} disabled={!item.editable} checked={selected.includes(item.id)} onCheckedChange={checked => select(item.id, checked)} /><div className="ru-location-main"><div className="ru-location-title"><span>{item.stage}</span>{!item.editable && <Tag color="neutral" size={20} appearance="outlined">只读</Tag>}</div><p>{item.purpose}<span>{item.id}</span><span>当前 v2</span>{!item.editable && <span>其他教师维护</span>}</p></div><Button variant="text" tone="brand" aria-label={`查看使用位置 ${item.id}`} onClick={event => { detailTrigger.current = event.currentTarget; setActiveId(item.id); setDetailOpen(true); }}>查看</Button></div>)}</div>; })}{visible.length === 0 && <div className="ru-no-results"><SearchIcon aria-hidden="true" /><h3>没有匹配的使用位置</h3><p>试试其他课程或关键词，已选范围会保留。</p><Button variant="secondary" onClick={() => { setCourse("all"); setKeyword(""); }}>清除筛选</Button></div>}</div>
          <Dialog.Content width={616} finalFocus={detailTrigger}><Dialog.Header><Dialog.Title>使用位置详情</Dialog.Title><Dialog.Description>查看具体引用，切换位置不会改变选择。</Dialog.Description><CloseDialog label="关闭使用位置详情" /></Dialog.Header><Dialog.Body><FormItem label="当前使用位置"><NativeSelect size={36} value={activeId} onValueChange={setActiveId}>{locations.map(item => <NativeSelectOption key={item.id} value={item.id}>{item.id} · {item.stage}</NativeSelectOption>)}</NativeSelect></FormItem><dl className="ru-detail-facts"><div><dt>所属课程</dt><dd>{active.course}</dd></div><div><dt>所在环节</dt><dd>{active.stage}</dd></div><div><dt>资源用途</dt><dd>{active.purpose}</dd></div><div><dt>当前位置权限</dt><dd>{active.editable ? "可编辑 · 可加入本次更新" : "只读 · 其他教师维护，不可加入更新"}</dd></div><div><dt>已发布版本</dt><dd>v2 · {resourceName}</dd></div></dl><div className="ru-inline-preview"><span>当前引用内容 · v2</span><h3>从问题到证据</h3><p>带着一个可以观察的问题进入课堂。先记录你看见的行为，再区分事实、解释与判断。</p><p>阅读提示：留意第 2 页的观察示例，以及第 4 页关于相关与因果的说明。</p></div></Dialog.Body></Dialog.Content>
        </Dialog.Root>
        <div className="ru-list-footnote"><InfoIcon aria-hidden="true" /><span>只读位置不会进入本次更新范围。所有位置的已发布版本目前均为 v2。</span></div>
      </section>
      <aside className="ru-review" aria-labelledby="review-title"><div className="ru-review-heading"><div className="ru-heading-line"><span className="ru-step">2</span><h2 id="review-title">本次更新范围</h2></div><span className="ru-local-label">本地草稿</span></div><div className="ru-review-body"><VersionPair /><div className="ru-selection-summary" aria-live="polite"><strong>{selected.length}</strong><span>个位置{selected.length > 0 && ` · ${selectedCourses} 门课程`}</span>{selected.length > 0 && <Button variant="text" size="compact" onClick={() => { setSelected([]); setSaveError(false); }}>清空选择</Button>}</div>{selected.length === 0 ? <div className="ru-selection-empty"><div className="ru-empty-line" /><p>从左侧选择需要更新的位置</p><span>筛选和查看详情不会清除已选内容。</span></div> : <ScopeList ids={selected} removable={id => select(id, false)} />}
        <div className="ru-note-field"><FormItem label="更新备注（选填）" help="随草稿保留，便于稍后继续。"><Textarea value={note} onValueChange={value => { setNote(value); setNotice(""); }} rows={3} placeholder="例如：先更新课前阅读，课堂讨论待下周确认。" /></FormItem></div><div className="ru-save-explanation"><InfoIcon aria-hidden="true" /><span>保存仅生成本地更新草稿，原资源与已发布引用保持不变。</span></div>
        <Dialog.Root open={checkOpen} onOpenChange={open => { if (!savingRef.current) { setCheckOpen(open); if (!open) setSaveError(false); } }}><Dialog.Trigger render={<Button variant="primary" block disabled={selected.length === 0} ref={checkTrigger}>检查更新范围<ArrowRightIcon aria-hidden="true" /></Button>} /><Dialog.Content width={716} finalFocus={checkTrigger}><Dialog.Header><Dialog.Title>检查更新范围</Dialog.Title><Dialog.Description>确认以下全部位置后，保存一份本地更新草稿。</Dialog.Description>{!saving && <CloseDialog label="关闭检查，保留修改" />}</Dialog.Header><Dialog.Body><div className="ru-check-resource"><FileIcon aria-hidden="true" /><div><strong>{resourceName}</strong><span>当前 v2 → 待采用 v3 · PDF · 2.1 MB</span></div></div><p className="ru-panel-summary">全部已选：<strong>{selected.length} 个位置 · {selectedCourses} 门课程</strong>，包含筛选视图之外的选择。</p><ScopeList ids={selected} /><div className="ru-saved-note"><h3>更新备注</h3><p>{note || "未填写备注"}</p></div><p className="ru-info-text"><InfoIcon aria-hidden="true" />2 个只读位置已排除。保存草稿不会替换已发布引用。</p>{saveError && <div className="ru-save-error" role="alert"><strong>这次保存未成功</strong><p>模拟失败，选择与备注已保留。现在可以重试。</p></div>}</Dialog.Body><Dialog.Footer divider><Button variant="secondary" disabled={saving} onClick={() => { setCheckOpen(false); setSaveError(false); }}>返回调整</Button><Button variant="primary" loading={saving} loadingLabel="正在保存…" leadingIcon={saveError ? undefined : <FileIcon />} onClick={save}>{saveError ? "重试保存" : savedMatches ? "保存此草稿" : "保存本地草稿"}</Button></Dialog.Footer></Dialog.Content></Dialog.Root>
        <AlertDialog.Root open={discardOpen} onOpenChange={setDiscardOpen}><AlertDialog.Trigger render={<Button variant="text" disabled={!dirty} className="ru-discard">放弃本轮修改</Button>} /><AlertDialog.Content width={416} initialFocus={discardSafe}><AlertDialog.Header><AlertDialog.Title>放弃本轮修改？</AlertDialog.Title><AlertDialog.Description>将清空当前选择与备注。{saved ? "已经保存的本地草稿仍可重新打开。" : "关闭版本比较或使用详情，无需放弃修改。"}</AlertDialog.Description></AlertDialog.Header><AlertDialog.Footer><Button ref={discardSafe} variant="secondary" onClick={() => setDiscardOpen(false)}>继续编辑</Button><Button variant="primary" tone="danger" onClick={discard}>确认放弃</Button></AlertDialog.Footer></AlertDialog.Content></AlertDialog.Root>
      </div></aside></div>
      <footer className="ru-prototype-footer"><span>原型演示 · 无真实替换或接口请求 · 刷新后清空</span><Checkbox label="下次保存模拟失败" checked={failureNext} onCheckedChange={setFailureNext} /></footer>
    </div>
  </main>;
}
