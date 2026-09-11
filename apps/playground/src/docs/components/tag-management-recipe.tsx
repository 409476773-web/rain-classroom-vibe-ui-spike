import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { tagColorProfileNames, tagColorProfiles, tagColorSearchTerms, type ColorTheme, type TagColorProfile } from "@rain-next/foundations";
import { Button, CheckableTag, CheckableTagGroup, Input, Tag } from "@rain-next/ui";

export interface TagDraft { name: string; color: TagColorProfile }
export interface TagDefinition extends TagDraft { id: string }
export interface TagManagementRecipeProps {
  label: string;
  theme: ColorTheme;
  definitions: readonly TagDefinition[];
  value: readonly string[];
  onValueChange: (value: string[]) => void;
  onCreate: (draft: TagDraft, signal: AbortSignal) => Promise<TagDefinition>;
  onUpdate: (definition: TagDefinition, signal: AbortSignal) => Promise<TagDefinition>;
}
const colorOptions = tagColorProfileNames.map((color) => ({ value: color, label: tagColorSearchTerms[color][0], color }));
const normalized = (name: string) => name.trim().toLowerCase();
function validDefinition(value: unknown): value is TagDefinition {
  if (!value || typeof value !== "object") return false;
  const item = value as TagDefinition;
  return typeof item.id === "string" && Boolean(item.id.trim()) && typeof item.name === "string" && Boolean(item.name.trim())
    && tagColorProfileNames.includes(item.color);
}

/** Page-local course recipe: callers own the vocabulary and persist stable IDs. */
export function TagManagementRecipe(props: TagManagementRecipeProps) {
  const { label, theme, definitions, value, onValueChange } = props;
  const generated = useId(), triggerRef = useRef<HTMLButtonElement>(null), searchRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null), headingRef = useRef<HTMLHeadingElement>(null);
  const editRefs = useRef(new Map<string, HTMLButtonElement>()), returnId = useRef<string | null>(null);
  const request = useRef<AbortController | null>(null), mounted = useRef(false), focusView = useRef(false);
  const [open, setOpen] = useState(false), [view, setView] = useState<"select" | "manage" | "create" | "edit">("select");
  const [query, setQuery] = useState(""), [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState(""), [color, setColor] = useState<TagColorProfile>("purple");
  const [pending, setPending] = useState(false), [error, setError] = useState(""), [notice, setNotice] = useState("");
  const latest = useRef(props); latest.current = props;
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; request.current?.abort(); }; }, []);
  useLayoutEffect(() => {
    if (!open || !focusView.current) return;
    focusView.current = false;
    if (view === "create" || view === "edit") nameRef.current?.focus();
    else if (view === "select") searchRef.current?.focus();
    else (returnId.current ? editRefs.current.get(returnId.current) : headingRef.current)?.focus();
  }, [view, open]);

  if (!label.trim() || !definitions.every(validDefinition) || new Set(definitions.map((item) => item.id)).size !== definitions.length
    || new Set(value).size !== value.length || value.some((id) => !definitions.some((item) => item.id === id)))
    throw new Error("TagManagementRecipe requires a label, unique definitions from the twenty Tag colors and valid associated IDs.");
  const current = value.map((id) => definitions.find((item) => item.id === id)!);
  const filtered = definitions.filter((item) => [item.name, item.color, tagColorProfiles[item.color].family, ...tagColorSearchTerms[item.color]]
    .some((term) => term.toLowerCase().includes(normalized(query))));
  const hasExactName = definitions.some((item) => normalized(item.name) === normalized(query));
  const editing = view === "edit", title = view === "select" ? "选择标签" : view === "manage" ? "管理标签" : editing ? "编辑标签" : "创建标签";
  function changeView(next: typeof view) { focusView.current = true; setView(next); setError(""); }
  function beginCreate() { setEditingId(null); setName(query.trim()); setColor("purple"); changeView("create"); }
  function beginEdit(item: TagDefinition) {
    returnId.current = item.id; setEditingId(item.id); setName(item.name); setColor(item.color); changeView("edit");
  }
  async function save() {
    if (request.current) return;
    const draft = { name: name.trim(), color }, before = latest.current.definitions;
    if (!draft.name) { setError("请输入标签名称。"); nameRef.current?.focus(); return; }
    if (before.some((item) => item.id !== editingId && normalized(item.name) === normalized(draft.name))) {
      setError("已有同名标签，请选择现有标签或使用其他名称。"); nameRef.current?.focus(); return;
    }
    const controller = new AbortController(); request.current = controller; setPending(true); setError("");
    try {
      const saved = editingId
        ? await latest.current.onUpdate({ id: editingId, ...draft }, controller.signal)
        : await latest.current.onCreate(draft, controller.signal);
      if (!mounted.current || controller.signal.aborted) return;
      if (!validDefinition(saved) || (editingId ? saved.id !== editingId : before.some((item) => item.id === saved.id)))
        throw new Error("保存结果无效，请重试。");
      if (!editingId) {
        latest.current.onValueChange([...new Set([...latest.current.value, saved.id])]);
        setQuery(""); changeView("select");
      } else changeView("manage");
      setNotice(`${saved.name} 已${editingId ? "更新，所有引用已同步" : "创建并选中"}。`);
    } catch (reason) {
      if (mounted.current && !controller.signal.aborted) setError(reason instanceof Error ? reason.message : "保存失败，请重试。");
    } finally {
      if (request.current === controller) request.current = null;
      if (mounted.current) setPending(false);
    }
  }
  return <div data-rain-id="tag-management-recipe" data-local-recipe="course-tag-management" className="tag-management">
    <Popover.Root open={open} onOpenChange={setOpen} modal={false}>
      <div className="tag-page__row">
        <div role="group" aria-label={`当前${label}`} className="tag-page__row">
          {current.length ? current.map((item) => <Tag key={item.id} color={item.color} title={item.name} disabled={pending}
            onRemove={() => { onValueChange(value.filter((id) => id !== item.id)); setNotice(`已从当前资料移除 ${item.name}。`); triggerRef.current?.focus(); }}>{item.name}</Tag>) : <span>尚未添加标签</span>}
        </div>
        <Popover.Trigger ref={triggerRef} render={<Button variant="text" tone="brand" size="small">设置标签</Button>} aria-label={`设置${label}`} />
      </div>
      <Popover.Portal>
        <Popover.Positioner data-rain-theme={theme} className="tag-management__positioner" sideOffset={8} align="start" collisionPadding={8}>
          <Popover.Popup data-rain-id="tag-management-recipe" data-slot="popup" className="tag-management__popup shadow-rain-overlay rain-type-ui-default"
            initialFocus={() => view === "select" ? searchRef.current : view === "manage" ? headingRef.current : nameRef.current}>
            <header className="tag-management__header">
              <Popover.Title render={<h3 ref={headingRef} tabIndex={-1} className="rain-type-ui-default font-rain-semibold" />}>{title}</Popover.Title>
              <Popover.Close render={<Button variant="text" size="small">关闭</Button>} aria-label="关闭标签面板" />
            </header>
            <Popover.Description className="tag-management__help">{view === "select" ? "勾选后立即应用；标签上的 × 只解除当前资料的关联。" : view === "manage" || editing ? "修改名称或颜色会同步到使用这个标签的其他资料。" : "从当前 20 种颜色中选择，创建后自动应用到这份资料。"}</Popover.Description>
            {view === "select" ? <>
              <Input ref={searchRef} aria-label="搜索标签" placeholder="搜索名称或颜色" value={query} onValueChange={setQuery} size={32} />
              <div className="tag-management__choices" role="group" aria-label="可选标签">
                {filtered.map((item) => <CheckableTag key={item.id} value={item.id} label={item.name} color={item.color} checked={value.includes(item.id)}
                  onCheckedChange={(checked) => { onValueChange(checked ? [...value, item.id] : value.filter((id) => id !== item.id)); setNotice(`${item.name} 已${checked ? "选中" : "取消选择"}。`); }} />)}
                {!filtered.length && <p>没有匹配标签。</p>}
              </div>
              {query.trim() && !hasExactName && <Button variant="text" tone="brand" size="small" onClick={beginCreate}>创建“{query.trim()}”</Button>}
              <footer className="tag-management__footer">
                <Button variant="text" tone="brand" size="small" onClick={beginCreate}>创建标签</Button>
                <Button variant="text" size="small" onClick={() => { returnId.current = null; changeView("manage"); }}>管理标签</Button>
              </footer>
            </> : view === "manage" ? <>
              <div className="tag-management__list">{definitions.map((item) => <div key={item.id} className="tag-management__entry">
                <Tag color={item.color} title={item.name}>{item.name}</Tag>
                <Button ref={(element) => { if (element) editRefs.current.set(item.id, element); else editRefs.current.delete(item.id); }} variant="text" size="small" aria-label={`编辑${item.name}`} onClick={() => beginEdit(item)}>编辑</Button>
              </div>)}</div>
              <footer className="tag-management__footer"><Button variant="text" size="small" onClick={() => changeView("select")}>返回选择</Button><Button variant="text" tone="brand" size="small" onClick={beginCreate}>创建标签</Button></footer>
            </> : <form className="tag-management__form" aria-busy={pending} onSubmit={(event) => { event.preventDefault(); void save(); }}
              onKeyDownCapture={(event) => { if (event.key === "Enter" && (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)) { event.preventDefault(); event.stopPropagation(); } }}>
              <Input ref={nameRef} aria-label="标签名称" aria-required="true" aria-describedby={error ? `${generated}-error` : undefined}
                status={error ? "error" : "default"} value={name} onValueChange={(next) => { setName(next); setError(""); }} disabled={pending} size={32} />
              <CheckableTagGroup legend="标签颜色" options={colorOptions} value={color} onValueChange={(next) => { if (next) setColor(next as TagColorProfile); }} disabled={pending} />
              {error && <p id={`${generated}-error`} role="alert" className="tag-management__error">{error}</p>}
              <footer className="tag-management__footer">
                <Button variant="text" size="small" disabled={pending} onClick={() => changeView(editing ? "manage" : "select")}>{editing ? "返回管理" : "返回选择"}</Button>
                <Button type="submit" variant="primary" size="small" loading={pending} loadingLabel="保存中…">{editing ? "保存修改" : "创建并选中"}</Button>
              </footer>
            </form>}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
    <p role="status" className="tag-management__status">{notice}</p>
  </div>;
}
