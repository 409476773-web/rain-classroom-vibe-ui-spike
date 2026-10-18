import { useRef, useState, type FormEvent } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { SearchIcon } from "@rain-next/ui/icons/search";
import { Button, FormItem, Input, Select } from "@rain-next/ui";

const materials = [
  { id: "lesson-1", title: "第一讲：数据与证据", kind: "lesson" },
  { id: "lesson-2", title: "第二讲：案例分析", kind: "lesson" },
  { id: "task-1", title: "案例分析练习", kind: "task" },
];
const initialQuery = { keyword: "", kind: "all" };

/** Local example host: query drafts, applied conditions and results belong here. */
type Query = typeof initialQuery;
const localSearch = async (_query: Query) => { await new Promise(resolve => setTimeout(resolve, 400)); };
export function FilterToolbarExample({ onSearch = localSearch, disabled = false }: { onSearch?: (query: Query) => Promise<void>; disabled?: boolean } = {}) {
  const inFlight = useRef(false);
  const [loading, setLoading] = useState(false), [failure, setFailure] = useState("");
  const locked = disabled || loading;
  const [draft, setDraft] = useState(initialQuery);
  const [applied, setApplied] = useState(initialQuery);
  const results = materials.filter(item => (applied.kind === "all" || item.kind === applied.kind)
    && item.title.includes(applied.keyword.trim()));
  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || inFlight.current) return;
    const query = { ...draft, keyword: draft.keyword.trim() };
    inFlight.current = true; setLoading(true); setFailure("");
    try { await onSearch(query); setApplied(query); }
    catch { setFailure("查询失败，已保留输入和上次结果，请重试。"); }
    finally { inFlight.current = false; setLoading(false); }
  }
  return <DensityProvider density="compact">
    <section aria-label="资源筛选组合" style={{ color: "var(--rain-color-text-primary)" }}>
      <style>{`.rain-filter-readable-field > [data-slot="control"]:not(:disabled)::placeholder { color: var(--rain-category-text-neutral-3); opacity: 1; }`}</style>
      <h3 style={{ margin: "0 0 var(--rain-space-8)", fontSize: "var(--rain-font-size-16)", lineHeight: "var(--rain-line-height-24)", fontWeight: 600 }}>查找教学资源</h3>
      <p>本地模拟数据；填写条件后点击查询，结果才更新。</p>
      <form aria-label="资源筛选" onSubmit={search} style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "var(--rain-space-12)" }}>
        <FormItem label="资源名称" className="flex-1">
          <Input className="rain-filter-readable-field" disabled={locked} size={32} value={draft.keyword} onValueChange={keyword => setDraft(current => ({ ...current, keyword }))} placeholder="输入资源名称" />
        </FormItem>
        <div style={{ width: 180, maxWidth: "100%" }}>
          <FormItem label="资源类型"><Select disabled={locked} size={32} clearable={false} value={draft.kind}
            options={[{ value: "all", label: "全部类型" }, { value: "lesson", label: "课件" }, { value: "task", label: "练习" }]}
            onValueChange={kind => setDraft(current => ({ ...current, kind: String(kind ?? "all") }))} /></FormItem>
        </div>
        <div style={{ display: "flex", gap: "var(--rain-space-8)" }}>
          <Button disabled={disabled} loading={loading} type="submit" size="small" variant="primary"><SearchIcon aria-hidden="true" />查询</Button>
          <Button disabled={locked} type="button" size="small" variant="secondary" onClick={() => { setDraft(initialQuery); setApplied(initialQuery); setFailure(""); }}>重置</Button>
        </div>
      </form>
      {failure && <p role="alert">{failure}</p>}
      <p role="status" aria-label="资源筛选结果">找到 {results.length} 项资源</p>
      {results.length ? <ul>{results.map(item => <li key={item.id}>{item.title}</li>)}</ul> : <p>没有匹配资源，请调整名称或类型。</p>}
    </section>
  </DensityProvider>;
}
