import { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Dialog, DropdownMenu, IconButton, Input, InputNumber, Link, QuestionNumber, RadioCard, RadioGroup, Select, Tag, Tabs, defineRainLocalRecipe } from "@rain-next/ui";
import { RainClassroomIcon } from "@rain-next/ui/icons/rain-classroom";
import { WorkbenchIcon } from "@rain-next/ui/icons/workbench";
import { TeachingClassIcon } from "@rain-next/ui/icons/teaching-class";
import { CourseBuilderIcon } from "@rain-next/ui/icons/course-builder";
import { ComputerIcon } from "@rain-next/ui/icons/computer";
import { NotificationIcon } from "@rain-next/ui/icons/notification";
import { HelpCircleIcon } from "@rain-next/ui/icons/help-circle";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { CloseBoldIcon } from "@rain-next/ui/icons/close-bold";
import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";
import { UpIcon } from "@rain-next/ui/icons/up";
import { DownIcon } from "@rain-next/ui/icons/down";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { DoubleArrowDownIcon } from "@rain-next/ui/icons/double-arrow-down";
import { AddBoldIcon } from "@rain-next/ui/icons/add-bold";
import { ImportIcon } from "@rain-next/ui/icons/import";
import { DeleteIcon } from "@rain-next/ui/icons/delete";
import { SearchIcon } from "@rain-next/ui/icons/search";
import { MoveIcon } from "@rain-next/ui/icons/move";
import { EditorUndoIcon } from "@rain-next/ui/icons/editor-undo";
import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";
import { DownloadIcon } from "@rain-next/ui/icons/download";
import { ExamLibraryIcon } from "@rain-next/ui/icons/exam-library";
import { FileFormatXlsxIcon } from "@rain-next/ui/icons/file-format-xlsx";
import { FolderUploadIcon } from "@rain-next/ui/icons/folder-upload";
import { createQuestions, moveQuestions, questionTypes, type Question } from "./state";
import "./page.css";

const targetRecipe = defineRainLocalRecipe({
  id: "exam-move-target", scope: "feature", origin: "ui-radio-card", classes: { root: "em-target", selection: "em-target-selection", label: "em-target-label", description: "em-target-stem" },
  modifiedParts: ["root", "selection", "label", "description"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);
const numberRecipe = defineRainLocalRecipe({
  id: "exam-directory-number", scope: "feature", origin: "ui-question-number", classes: { root: "p-rain-0 em-directory-number", control: "em-directory-number-control", label: "em-directory-number-label" }, modifiedParts: ["root", "control", "label"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);
const questionIconRecipe = defineRainLocalRecipe({
  id: "exam-question-icon", scope: "feature", origin: "ui-icon-button", classes: { root: "em-question-icon" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);
const moveButtonRecipe = defineRainLocalRecipe({
  id: "exam-move-button", scope: "feature", origin: "ui-button", classes: { root: "em-move-button", label: "em-move-button-label", "leading-icon": "em-move-button-icon" }, modifiedParts: ["root", "label", "leading-icon"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);
const importRecipe = defineRainLocalRecipe({
  id: "exam-import-button", scope: "feature", origin: "ui-button", classes: { root: "px-rain-12" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);
const previewButtonRecipe = defineRainLocalRecipe({
  id: "exam-preview-button", scope: "feature", origin: "ui-button", classes: { root: "px-rain-14" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);
const saveButtonRecipe = defineRainLocalRecipe({
  id: "exam-save-button", scope: "feature", origin: "ui-button", classes: { root: "px-rain-28" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);
const topicTagRecipe = defineRainLocalRecipe({
  id: "exam-topic-tag", scope: "feature", origin: "ui-tag", classes: { label: "text-rain-category-text-neutral-6" }, modifiedParts: ["label"], candidateTokens: [], promotionStatus: "not-proposed",
} as const);

const templateDownloadHref = `data:text/csv;charset=utf-8,${encodeURIComponent("题型,题干,选项A,选项B,选项C,选项D,正确答案,分值,难度,知识点\\n单选题,一个电阻两端加上电压后电流如何变化？,示例选项A,示例选项B,示例选项C,示例选项D,B,2,2,欧姆定律")}`;
const bankQuestions = createQuestions().slice(5, 11);


function QuestionTags({ question: q }: { question: Question }) {
  return <><Tag size={20} color={q.difficulty >= 4 ? "courseware" : "classroom"} appearance="outlined">{q.difficulty}级</Tag><Tag size={20} color="gold">应用</Tag><Tag size={20} localRecipe={topicTagRecipe}>{q.topic}</Tag></>;
}

export function ExamEditorPage() {
  const [questions, setQuestions] = useState(createQuestions);
  const [selected, setSelected] = useState<string[]>([]);
  const [moving, setMoving] = useState<string[] | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [side, setSide] = useState<"before" | "after">("after");
  const [query, setQuery] = useState("");
  const [displayMode, setDisplayMode] = useState<"compact" | "default" | "relaxed">("default");
  const [active, setActive] = useState("s1");
  const [notice, setNotice] = useState("");
  const [undo, setUndo] = useState<Question[] | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState("电路原理小作业");
  const [editTitle, setEditTitle] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newStem, setNewStem] = useState("");
  const [importDialog, setImportDialog] = useState<"template" | "bank" | null>(null);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [bankQuery, setBankQuery] = useState("");
  const [bankSelected, setBankSelected] = useState<string[]>([]);
  const templateFileRef = useRef<HTMLInputElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const movedFocus = useRef<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const total = questions.reduce((sum, q) => sum + q.score, 0);
  const numberOf = (id: string) => questions.findIndex(q => q.id === id) + 1;
  const gathering = Boolean(target && moving?.includes(target));
  const next = moving && target ? moveQuestions(questions, moving, target, side) : questions;
  const canMove = Boolean(target && next !== questions);
  const search = query.trim();
  const filtered = questions.filter((q, i) => !search || (/^\d+$/.test(search) ? Number(search) === i + 1 : q.stem.includes(search) || q.type.includes(search)));
  const filteredBank = bankQuestions.filter(q => !bankQuery.trim() || q.stem.includes(bankQuery.trim()) || q.topic.includes(bankQuery.trim()) || q.type.includes(bankQuery.trim()));

  useEffect(() => { document.title = "试卷编辑 · 雨课堂"; }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id.replace("exam-", ""));
    }, { root: listRef.current, rootMargin: "-65px 0px -65% 0px" });
    listRef.current?.querySelectorAll(".em-question").forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [questions]);

  function locate(id: string, focus = false) {
    setActive(id);
    requestAnimationFrame(() => {
      const node = document.getElementById(`exam-${id}`);
      node?.scrollIntoView({ block: "start", behavior: "instant" });
      if (focus) node?.focus({ preventScroll: true });
    });
  }
  function change(nextQuestions: Question[]) {
    setQuestions(nextQuestions); setDirty(true); setSaved(false); setUndo(null); setNotice("");
  }
  function openMove(ids: string[], trigger: HTMLElement) {
    lastTrigger.current = trigger; movedFocus.current = null;
    setMoving(ids); setTarget(null); setSide("after"); setQuery("");
  }
  function applyMove() {
    if (!canMove || !moving) return;
    setUndo(questions); setQuestions(next); setDirty(true); setSaved(false);
    const first = questions.find(q => moving.includes(q.id))!.id;
    movedFocus.current = first;
    setNotice(`已移动 ${moving.length} 道习题`); setSelected([]); setMoving(null); locate(first);
  }
  function oneStep(id: string, direction: -1 | 1) {
    const adjacent = questions[numberOf(id) - 1 + direction];
    if (!adjacent) return;
    setUndo(questions); setQuestions(moveQuestions(questions, [id], adjacent.id, direction < 0 ? "before" : "after"));
    setDirty(true); setSaved(false); setNotice(direction < 0 ? "习题已上移" : "习题已下移"); locate(id);
  }
  function save() { setDirty(false); setSaved(true); setNotice("试卷已保存（本地演示）"); setUndo(null); }
  function openImportDialog(kind: "template" | "bank") {
    setImportDialog(kind);
    setTemplateFile(null);
    setBankQuery("");
    setBankSelected([]);
  }
  function importQuestions(source: "template" | "bank") {
    const stamp = Date.now();
    const sourceQuestions = source === "template"
      ? createQuestions().filter(q => ["s2", "s3", "s4"].includes(q.id))
      : bankQuestions.filter(q => bankSelected.includes(q.id));
    const added = sourceQuestions.map((q, i) => ({ ...q, id: `${source}-${stamp}-${i}` }));
    if (!added.length || questions.length + added.length > 500) return;
    change([...questions, ...added]);
    setImportDialog(null);
    setNotice(`已从${source === "template" ? "模板" : "题库"}导入 ${added.length} 道习题`);
    locate(added[0]!.id);
  }
  function renderQuestion(q: Question, i: number, readOnly = false) {
    return <article key={q.id} id={readOnly ? undefined : `exam-${q.id}`} tabIndex={-1} className="em-question" data-selected={selected.includes(q.id) && !readOnly} data-slot="question" aria-label={`第 ${i + 1} 题 ${q.type}`}>
      <header className="em-question-heading">
        {!readOnly && <Checkbox aria-label={`选择第 ${i + 1} 题`} checked={selected.includes(q.id)} onCheckedChange={checked => setSelected(old => checked ? [...old, q.id] : old.filter(id => id !== q.id))} />}
        <div className="em-question-meta"><h2>{i + 1}. {q.type}</h2><QuestionTags question={q} /></div>
        {!readOnly && <div className="em-question-actions">
          <Button variant="tertiary" size="mini" localRecipe={moveButtonRecipe} leadingIcon={<MoveIcon />} onClick={event => openMove([q.id], event.currentTarget)}>移动到</Button>
          <IconButton size="28/16" localRecipe={questionIconRecipe} icon={<UpIcon />} aria-label={`上移第 ${i + 1} 题`} title="上移一题" disabled={i === 0} onClick={() => oneStep(q.id, -1)} />
          <IconButton size="28/16" localRecipe={questionIconRecipe} icon={<DownIcon />} aria-label={`下移第 ${i + 1} 题`} title="下移一题" disabled={i === questions.length - 1} onClick={() => oneStep(q.id, 1)} />
          <IconButton size="28/16" localRecipe={questionIconRecipe} icon={<DeleteIcon />} aria-label={`删除第 ${i + 1} 题`} title="从试卷删除" onClick={() => { const old = questions; change(questions.filter(item => item.id !== q.id)); setUndo(old); setNotice(`已删除第 ${i + 1} 题`); setSelected(ids => ids.filter(id => id !== q.id)); }} />
        </div>}
      </header>
      <div className="em-question-content">
        {q.type === "材料题" && <p className="em-material-label">阅读材料，回答下列问题</p>}
        <p className={q.type === "材料题" ? "em-stem em-material-stem" : "em-stem"}>{q.stem}</p>
        {q.options && <ol className="em-options">{q.options.map((option, index) => { const letter = String.fromCharCode(65 + index); return <li key={letter}><span className="em-option-letter" data-correct={!readOnly && q.answer.includes(letter)}>{letter}</span><span>{option}</span></li>; })}</ol>}
        {q.type === "材料题" && <div className="em-subquestions"><p>（1）根据材料中的已知条件，写出分析所需的电路关系式。</p><p>（2）给出计算过程，并说明结果的物理意义。</p></div>}
        {q.type === "主观题" && readOnly && <div className="em-answer-space" />}
        {!readOnly && <>
          <div className="em-answer"><p><strong>正确答案</strong><span>{q.answer}</span></p><details><summary data-focus="item">答案解析 <DoubleArrowDownIcon /></summary><p>{q.analysis}</p></details></div>
          <div className="em-score"><span>本题分值</span><InputNumber aria-label={`第 ${i + 1} 题分值`} value={q.score} size={32} min={0} max={100} precision={1} step={0.5} controls={false} required onValueCommit={value => { if (value !== null && value !== q.score) change(questions.map(item => item.id === q.id ? { ...item, score: value } : item)); }} /><span>分</span>{q.type === "材料题" && <span className="em-muted">含 2 道小题 · 整体移动</span>}</div>
        </>}
      </div>
    </article>;
  }

  return <main className="em" data-rain-id="prototype-exam-editor" data-rain-theme="light" data-density="default">
    <aside className="em-nav" aria-label="平台导航">
      <div className="em-logo" title="雨课堂"><RainClassroomIcon /></div>
      {[{ icon: <WorkbenchIcon />, text: "工作台" }, { icon: <TeachingClassIcon />, text: "教学管理" }, { icon: <CourseBuilderIcon />, text: "课程建设" }, { icon: <ComputerIcon />, text: "平台管理" }].map(item => <div className="em-nav-item" key={item.text} data-current={item.text === "课程建设"} aria-current={item.text === "课程建设" ? "page" : undefined}>{item.icon}<span>{item.text}</span></div>)}
      <div className="em-nav-bottom"><NotificationIcon /><HelpCircleIcon /><span className="em-avatar">师</span></div>
    </aside>
    <div className="em-app">
      <header className="em-topbar">
        <div className="em-title"><span className="em-back" aria-hidden="true"><CloseIcon /></span><span className="em-top-divider" />{editTitle ? <Input aria-label="试卷名称" value={title} autoFocus clearable={false} size={28} onValueChange={value => { setTitle(value); setDirty(true); setSaved(false); }} onBlur={() => { setTitle(old => old.trim() || "未命名试卷"); setEditTitle(false); }} onPressEnter={() => { setTitle(old => old.trim() || "未命名试卷"); setEditTitle(false); }} /> : <h1>{title}</h1>}<Tag appearance="outlined" size={20}>计入成绩</Tag><Button variant="text" size="regular" tone="brand" leadingIcon={<EditPencilIcon />} onClick={() => setEditTitle(true)}>编辑</Button></div>
        <div className="em-save-actions"><span className="em-save-state">{dirty ? "有修改尚未保存" : saved ? "已保存 · 本地演示" : "已保存"}</span><Button size="small" variant="secondary" localRecipe={previewButtonRecipe} onClick={() => { save(); setPreview(true); }}>保存并预览</Button><Button size="small" variant="primary" localRecipe={saveButtonRecipe} onClick={save}>保存</Button></div>
      </header>
      <div className="em-workspace">
        <section className="em-paper" aria-label="试卷编辑区域">
          <div className="em-paper-toolbar" data-slot="selection-toolbar">
            <div className="em-selection-summary"><Checkbox aria-label="全选习题" checked={questions.length > 0 && selected.length === questions.length} indeterminate={selected.length > 0 && selected.length < questions.length} onCheckedChange={checked => setSelected(checked ? questions.map(q => q.id) : [])} />{selected.length ? <><strong>已选 <em>{selected.length}</em> 题</strong><Button variant="text" size="small" onClick={() => setSelected([])}>取消选择</Button></> : <><strong>共 <em>{questions.length}</em> 题，满分 {Number(total.toFixed(1))} 分</strong><span className="em-limit">（上限500题）</span></>}</div>
            <div className="em-toolbar-actions">{selected.length > 0 && <Button size="small" variant="secondary" leadingIcon={<MoveIcon />} onClick={event => openMove(selected, event.currentTarget)}>批量移动</Button>}<DropdownMenu.Root><DropdownMenu.Trigger openOnHover delay={0} closeDelay={120} render={<Button size="small" variant="primary" localRecipe={importRecipe} leadingIcon={<ImportIcon />} trailingIcon={<ArrowDownIcon />}>导入习题</Button>} /><DropdownMenu.Content className="em-import-menu" width={236}><DropdownMenu.Item label="模板导入" description="上传 Excel 模板，批量加入习题" leading={<FileFormatXlsxIcon />} onClick={() => openImportDialog("template")} /><DropdownMenu.Item label="题库导入" description="从已有题库挑选习题" leading={<ExamLibraryIcon />} onClick={() => openImportDialog("bank")} /></DropdownMenu.Content></DropdownMenu.Root><Button size="small" variant="primary" leadingIcon={<AddBoldIcon />} onClick={() => { setNewStem(""); setAddOpen(true); }}>添加习题</Button></div>
          </div>
          <div className="em-paper-scroll" ref={listRef}>{questions.map((q, i) => renderQuestion(q, i))}{!questions.length && <div className="em-empty"><h2>试卷中还没有习题</h2><p>添加或导入习题后开始编辑。</p></div>}</div>
        </section>
        <aside className="em-directory" aria-label="习题列表"><h2>习题列表</h2><div className="em-directory-scroll">{questionTypes.map(type => {
          const group = questions.filter(q => q.type === type);
          if (!group.length) return null;
          const score = group.every(q => q.score === group[0]!.score) ? group[0]!.score : null;
          return <section className="em-type-group" key={type}><h3>{type}</h3><div className="em-group-meta"><label className="em-group-score"><span>每题</span><InputNumber aria-label={`${type}每题分值`} value={score} placeholder="不同" size={24} controls={false} min={0} max={100} precision={1} onValueCommit={value => { if (value !== null && group.some(q => q.score !== value)) change(questions.map(q => q.type === type ? { ...q, score: value } : q)); }} /><span>分</span></label><span>{group.length} 题</span><span><span className="em-group-points">{Number(group.reduce((sum, q) => sum + q.score, 0).toFixed(1))}</span> 分</span></div><div className="em-question-grid">{group.map(q => <QuestionNumber key={q.id} number={numberOf(q.id)} size={40} current={active === q.id} localRecipe={numberRecipe} aria-label={`定位到第 ${numberOf(q.id)} 题`} onClick={() => locate(q.id, true)} />)}</div></section>;
        })}</div><p className="em-prototype-note">交互原型 · 示例数据 · 刷新后重置</p></aside>
      </div>
    </div>

    {notice && <div className="em-toast"><CheckBoldIcon /><span role="status">{notice}</span>{undo && <Button variant="text" size="small" tone="brand" leadingIcon={<EditorUndoIcon />} onClick={() => { setQuestions(undo); setDirty(true); setSaved(false); setUndo(null); setSelected([]); setNotice("已撤销上一步操作"); locate(undo[0]?.id ?? ""); }}>撤销</Button>}<IconButton size="24/14" icon={<CloseIcon />} aria-label="关闭操作提示" onClick={() => setNotice("")} /></div>}

    <Dialog.Root open={moving !== null} onOpenChange={open => { if (!open) setMoving(null); }}>
      <Dialog.Content width={displayMode === "compact" ? 816 : 916} viewportInset={40} className="em-move-dialog" data-display-mode={displayMode} theme="light" finalFocus={() => (movedFocus.current ? document.getElementById(`exam-${movedFocus.current}`) : lastTrigger.current) ?? false}>
        <Dialog.Header className="em-modal-header"><div className="em-modal-title"><Dialog.Title>选择习题移动的位置</Dialog.Title><Dialog.Close render={<IconButton size="28/20" icon={<CloseBoldIcon />} aria-label="关闭移动弹窗" />} /></div></Dialog.Header>
        <div className="em-target-toolbar"><h3>选择参照题 <span>共 {questions.length} 题</span></h3><div className="em-target-tools"><Tabs className="em-display-modes" aria-label="习题展示模式" size={32} appearance="contained" widthMode="equal" panelMount="unmount" value={displayMode} onValueChange={value => { if (value === "compact" || value === "default" || value === "relaxed") setDisplayMode(value); }} items={[{ value: "compact", label: "紧凑", content: null }, { value: "default", label: "默认", content: null }, { value: "relaxed", label: "宽松", content: null }]} /><Input aria-label="搜索目标题" size={32} placeholder="搜索题号或题干" leadingIcon={<SearchIcon />} value={query} onValueChange={setQuery} /></div></div>
        <Dialog.Body className="em-target-body">
          {filtered.length ? <RadioGroup legend="选择参照题" legendHidden name="exam-move-target" value={target} onValueChange={setTarget} options={filtered.map(q => ({ value: q.id, label: `第 ${numberOf(q.id)} 题 · ${q.type}`, description: q.stem }))} renderOption={props => { const q = questions.find(item => item.id === props.value)!; return <div className="em-target-wrap">
            {target === props.value && canMove && !gathering && side === "before" && <div className="em-insert-line"><span>{moving?.length} 道习题将移动到这里</span></div>}
            <RadioCard {...props} label={`${numberOf(q.id)}. ${q.type}`} aria-label={props.label} labelEnd={<span className="em-target-meta"><QuestionTags question={q} /></span>} localRecipe={targetRecipe} />
            {moving?.includes(q.id) && <span className="em-moving-tag">本次已选</span>}
            {target === props.value && canMove && gathering && <p className="em-gather-preview">{moving?.length} 道习题将移动到这里</p>}
            {target === props.value && canMove && !gathering && side === "after" && <div className="em-insert-line"><span>{moving?.length} 道习题将移动到这里</span></div>}
          </div>; }} /> : <div className="em-empty"><SearchIcon /><h3>没有找到匹配的习题</h3><p>试试其他题号或题干关键词。</p><Button variant="text" tone="brand" onClick={() => setQuery("")}>清空搜索</Button></div>}
        </Dialog.Body>
        <Dialog.Footer divider className="em-move-footer">
          <div className="em-move-summary">
            <div className="em-move-destination"><span role="status">{target ? <>将 {moving?.length ?? 0} 道习题移动到 <strong>第 {numberOf(target)} 题</strong>{gathering ? "处" : null}</> : moving?.length === questions.length ? "已选中全部习题" : "请选择参照题"}</span>{!gathering && <Select aria-label="插入位置" size={28} clearable={false} disabled={!target} value={side} onValueChange={value => { if (value === "before" || value === "after") setSide(value); }} options={[{ value: "before", label: "之前" }, { value: "after", label: "之后" }]} />}</div>
            {!canMove && (target || moving?.length === questions.length) && <p className="em-move-feedback" role="status">已在此位置，无需移动</p>}
          </div>
          <div className="em-footer-actions"><Dialog.Close render={<Button variant="tertiary">取消</Button>} /><Button variant="primary" disabled={!canMove} onClick={applyMove}>确认移动</Button></div>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>

    <Dialog.Root open={preview} onOpenChange={setPreview}><Dialog.Content width={916} className="em-preview" theme="light"><Dialog.Header><div className="em-modal-title"><Dialog.Title>{title}</Dialog.Title><Dialog.Close render={<IconButton size="28/20" icon={<CloseBoldIcon />} aria-label="关闭预览" />} /></div><Dialog.Description>试卷预览 · 共 {questions.length} 题，满分 {Number(total.toFixed(1))} 分</Dialog.Description></Dialog.Header><Dialog.Body>{questions.map((q, i) => renderQuestion(q, i, true))}</Dialog.Body></Dialog.Content></Dialog.Root>
    <Dialog.Root open={addOpen} onOpenChange={setAddOpen}><Dialog.Content width={616} theme="light"><Dialog.Header><div className="em-modal-title"><Dialog.Title>添加习题</Dialog.Title><Dialog.Close render={<IconButton size="28/20" icon={<CloseBoldIcon />} aria-label="关闭添加习题" />} /></div><Dialog.Description>输入题干，添加一道主观题用于体验移动。</Dialog.Description></Dialog.Header><Dialog.Body><Input aria-label="新习题题干" placeholder="请输入题干" value={newStem} onValueChange={setNewStem} /></Dialog.Body><Dialog.Footer><Dialog.Close render={<Button variant="tertiary">取消</Button>} /><Button variant="primary" disabled={questions.length + 1 > 500 || !newStem.trim()} onClick={() => { const stamp = Date.now(); const added: Question[] = [{ id: `new-${stamp}`, type: "主观题", stem: newStem.trim(), topic: "未设置知识点", difficulty: 2, score: 5, answer: "暂未设置参考答案", analysis: "暂未设置解析" }]; change([...questions, ...added]); setAddOpen(false); locate(added[0]!.id); }}>添加</Button></Dialog.Footer></Dialog.Content></Dialog.Root>
    <Dialog.Root open={importDialog === "template"} onOpenChange={open => { if (!open) setImportDialog(null); }}><Dialog.Content width={616} theme="light" className="em-import-dialog"><Dialog.Header><div className="em-modal-title"><Dialog.Title>模板导入</Dialog.Title><Dialog.Close render={<IconButton size="28/20" icon={<CloseBoldIcon />} aria-label="关闭模板导入" />} /></div><Dialog.Description>按模板整理习题后上传，一次导入多道题目。</Dialog.Description></Dialog.Header><Dialog.Body className="em-import-body"><section className="em-import-hero"><span className="em-import-hero-icon"><FileFormatXlsxIcon /></span><div><h3>上传 Excel 模板</h3><p>支持 .xlsx、.xls 文件，单次最多导入 100 道习题。</p></div></section><input ref={templateFileRef} aria-label="选择 Excel 模板" type="file" accept=".xlsx,.xls" hidden onChange={event => setTemplateFile(event.currentTarget.files?.[0] ?? null)} /><div className="em-upload-row"><Button variant="secondary" leadingIcon={<FolderUploadIcon />} onClick={() => templateFileRef.current?.click()}>选择文件</Button>{templateFile ? <span className="em-selected-file"><FileFormatXlsxIcon />{templateFile.name}</span> : <span className="em-upload-hint">尚未选择文件</span>}</div><div className="em-template-link"><DownloadIcon /><Link href={templateDownloadHref} download="习题导入模板.csv">下载 Excel 模板</Link><span>先下载模板填写，导入更顺畅</span></div></Dialog.Body><Dialog.Footer divider><span className="em-dialog-footnote">本原型会根据上传动作模拟导入 3 道示例习题。</span><div className="em-footer-actions"><Dialog.Close render={<Button variant="tertiary">取消</Button>} /><Button variant="primary" disabled={!templateFile || questions.length + 3 > 500} onClick={() => importQuestions("template")}>导入习题</Button></div></Dialog.Footer></Dialog.Content></Dialog.Root>
    <Dialog.Root open={importDialog === "bank"} onOpenChange={open => { if (!open) setImportDialog(null); }}><Dialog.Content width={816} theme="light" className="em-import-dialog"><Dialog.Header><div className="em-modal-title"><Dialog.Title>题库导入</Dialog.Title><Dialog.Close render={<IconButton size="28/20" icon={<CloseBoldIcon />} aria-label="关闭题库导入" />} /></div><Dialog.Description>从题库中选择习题加入当前试卷，可按题型或知识点搜索。</Dialog.Description></Dialog.Header><div className="em-bank-toolbar"><Input aria-label="搜索题库习题" size={32} placeholder="搜索题干、题型或知识点" leadingIcon={<SearchIcon />} value={bankQuery} onValueChange={setBankQuery} /><span>{bankSelected.length} 道已选</span></div><Dialog.Body className="em-bank-body">{filteredBank.length ? <div className="em-bank-list">{filteredBank.map((q, i) => <label className="em-bank-item" key={q.id}><Checkbox aria-label={`选择题库习题 ${i + 1}`} checked={bankSelected.includes(q.id)} onCheckedChange={checked => setBankSelected(current => checked ? [...current, q.id] : current.filter(id => id !== q.id))} /><div className="em-bank-copy"><div className="em-bank-meta"><strong>{q.type}</strong><QuestionTags question={q} /><span>{q.score} 分</span></div><p>{q.stem}</p></div></label>)}</div> : <div className="em-empty"><SearchIcon /><h3>没有找到匹配的习题</h3><p>试试其他题型或知识点关键词。</p></div>}</Dialog.Body><Dialog.Footer divider><span className="em-dialog-footnote">已选习题会追加到试卷末尾。</span><div className="em-footer-actions"><Dialog.Close render={<Button variant="tertiary">取消</Button>} /><Button variant="primary" disabled={!bankSelected.length || questions.length + bankSelected.length > 500} onClick={() => importQuestions("bank")}>导入 {bankSelected.length || ""} 道习题</Button></div></Dialog.Footer></Dialog.Content></Dialog.Root>
  </main>;
}
