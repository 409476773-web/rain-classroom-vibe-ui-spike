import { useEffect, useMemo, useState } from "react";
import { Button, Input, Select } from "@rain-next/ui";
import { assetCatalog as generatedCatalog } from "./asset-catalog.generated";
import "./asset-discovery.css";
import { queryAssetCatalog } from "../../../../../scripts/asset-discovery-query.mjs";
import teacherGradingReadme from "../../../../prototype/src/scenarios/teacher-grading/README.md?raw";
import teacherGradingReadmeUrl from "../../../../prototype/src/scenarios/teacher-grading/README.md?url";

type Asset = {
  id: string; name: string; description: string; assetIdentity: string; maturity: string; publication: string;
  familyId: string | null; taskIds: readonly string[]; searchAliases: readonly string[]; implementationRole: string | null;
  stateOwner: string | null; controlScope: string | null; useWhen: readonly string[]; doNotUseWhen: readonly string[];
  sourcePath: string; manifestPath: string; verification: Record<string, unknown>;
  entry: { kind: string; importPath?: string; exportNames?: readonly string[]; sourcePath?: string };
  api: { exports: readonly string[]; members: readonly { reference: string }[]; styleParts: readonly string[] };
  documentation: readonly { href: string; viewKind: string }[];
  relationships: readonly { type: string; targetId: string; condition?: string; requiredExports?: readonly string[] }[];
  modification?: { mode: string; allowed: readonly string[]; restricted: readonly string[]; compositionRules?: readonly string[] };
};
type Catalog = { vocabulary: { tasks: readonly { id: string; label: string }[]; families: readonly { id: string; label: string }[] }; assets: readonly Asset[] };
const catalog = generatedCatalog as unknown as Catalog;
const identity = (value: string) => ({ "local-experiment": "本地实验", "registry-candidate": "共享候选", "approved": "已登记接受" }[value] ?? value);
const relationNames: Record<string, string> = { wraps: "基于", usesBehavior: "复用行为", sharesPresentation: "共享表现", composes: "组合", exampleUses: "示例使用", requiresContext: "必须配合", alternativeWhen: "何时比较" };
function selection() { return new URLSearchParams(window.location.hash.split("?")[1] ?? ""); }
function assetHref(id: string) { const next = selection(); next.set("asset", id); return `#components?${next}`; }
function primaryDocument(asset: Asset) { return asset.documentation.find(route => route.viewKind === "component") ?? asset.documentation[0]; }

export function AssetDetails({ asset }: { asset: Asset }) {
  return <article className="asset-detail" aria-labelledby={`asset-${asset.id}-title`} data-canonical-asset={asset.id}>
    <header><span className="asset-kicker">规范资产 · {identity(asset.assetIdentity)}</span><h3 id={`asset-${asset.id}-title`}>{asset.name}</h3><p>{asset.description}</p></header>
    <dl className="asset-facts"><div><dt>影响范围</dt><dd>{asset.controlScope ?? "以组件合同为准"}</dd></div><div><dt>状态由谁管理</dt><dd>{asset.stateOwner ?? "尚未迁移；先读取原合同"}</dd></div>
      <div><dt>真实入口</dt><dd>{asset.entry.kind === "public-import" ? <code>{`import { ${(asset.entry.exportNames ?? []).join(", ")} } from "${asset.entry.importPath}"`}</code> : <><span>{asset.entry.kind === "usage-reference" ? "用法参考，无独立导出" : "源码复制入口，保持本地身份"}</span><code>{asset.sourcePath}</code></>}</dd></div>
      <div><dt>结构与部件</dt><dd>{asset.api.members.length ? asset.api.members.map(item => <code key={item.reference}>{item.reference} </code>) : "无独立复合成员"}{(asset.api.styleParts?.length ?? 0) > 0 && <p>样式 Parts：{asset.api.styleParts?.join("、")}</p>}</dd></div>
    </dl>
    <div className="asset-detail-columns"><section><h4>适合</h4><ul>{asset.useWhen.map(text => <li key={text}>{text}</li>)}</ul></section><section><h4>避免</h4><ul>{asset.doNotUseWhen.map(text => <li key={text}>{text}</li>)}</ul></section></div>
    {asset.relationships.length > 0 && <section><h4>关系与近邻</h4><ul className="asset-relations">{asset.relationships.map((relation, index) => { const target = catalog.assets.find(item => item.id === relation.targetId); return <li key={`${relation.type}-${relation.targetId}-${index}`}><span>{relationNames[relation.type] ?? relation.type} </span><a href={assetHref(relation.targetId)}>{target?.name ?? relation.targetId}</a>{relation.condition && <p>{relation.condition}</p>}{relation.requiredExports?.length ? <p>保留上下文：{relation.requiredExports.join("、")}</p> : null}</li>; })}</ul></section>}
    <section><h4>局部改造边界</h4>{asset.modification ? <><p>模式：{asset.modification.mode}</p><ul>{asset.modification.allowed.map(text => <li key={text}>{text}</li>)}</ul><ul>{asset.modification.restricted.map(text => <li key={text}>{text}</li>)}</ul></> : <p>请阅读 {asset.manifestPath} 中的 allowedModifications 与 restrictedModifications。</p>}</section>
    {asset.id === "ui-tabs" && <details><summary data-focus="item">教师批改：已接受的局部 Tabs 决定</summary><p>以下直接读取现有 README 的当前范围；不重开原方向，不扩大原接受。</p><pre style={{ whiteSpace: "pre-wrap" }}>{teacherGradingReadme.split("## 历史过程")[0]}</pre><a href={teacherGradingReadmeUrl} target="_blank" rel="noreferrer">查看完整教师批改 README</a></details>}
    <details><summary data-focus="item">分别查看实现、检查、人工与发布记录</summary><dl className="asset-facts"><div><dt>成熟度</dt><dd>{asset.maturity}</dd></div><div><dt>发布</dt><dd>{asset.publication}</dd></div>{Object.entries(asset.verification).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{key === "scoped" && Array.isArray(value) ? <ul>{value.map((record: { scope: string; dimension: string; value: string; sourceField: string }, index: number) => <li key={index}>{record.scope} · {record.dimension}：{record.value}（{record.sourceField}）</li>)}</ul> : typeof value === "string" ? value : value == null ? "未记录" : JSON.stringify(value)}</dd></div>)}</dl></details>
    <footer><p>合同：<code>{asset.manifestPath}</code></p><p>源码：<code>{asset.sourcePath}</code></p><nav aria-label={`${asset.name} 文档与示例`}>{asset.documentation.map(route => <a key={route.href} href={route.href}>{route.viewKind === "component" ? "组件文档" : "用法示例"} {route.href}</a>)}</nav></footer>
  </article>;
}

export function AssetDiscovery() {
  const [params, setParams] = useState(selection);
  const query = params.get("q") ?? "";
  useEffect(() => { const sync = () => setParams(selection()); window.addEventListener("hashchange", sync); return () => window.removeEventListener("hashchange", sync); }, []);
  const task = params.get("task") ?? "", family = params.get("family") ?? "", selected = catalog.assets.find(item => item.id === params.get("asset"));
  const setFilter = (key: string, value: string) => { const next = new URLSearchParams(params); next.delete("asset"); value ? next.set(key, value) : next.delete(key); setParams(next); window.location.hash = `components${next.size ? `?${next}` : ""}`; };
  const results = useMemo(() => queryAssetCatalog(catalog, { query, task, family, includeLocal: true }) as Asset[], [query, task, family]);
  return <section className="asset-discovery" aria-labelledby="asset-discovery-title">
    <header><p className="asset-kicker">按任务选择</p><h2 id="asset-discovery-title">先确定要改变什么</h2><p>从任务找到家族，比较能力和状态归属，再进入用法。完整目录保留公共候选、本地组件和配方的不同身份。</p></header>
    <div className="asset-task-options" aria-label="任务类型"><Button variant="text" aria-pressed={!task} onClick={() => setFilter("task", "")}>全部任务</Button>{catalog.vocabulary.tasks.map(item => <Button key={item.id} variant="text" aria-pressed={task === item.id} onClick={() => setFilter("task", item.id)}>{item.label}</Button>)}</div>
    <div className="asset-search"><label>查找名称或旧称<Input aria-label="查找组件名称或旧称" size={32} value={query} onValueChange={value => setFilter("q", value)} placeholder="例如 Label、TextButton、InputGroup" /></label><label>组件家族<Select aria-label="组件家族" size={32} value={family || "all"} onValueChange={value => setFilter("family", value === "all" ? "" : String(value ?? ""))} options={[{ value: "all", label: "全部家族" }, ...catalog.vocabulary.families.map(item => ({ value: item.id, label: item.label }))]} /></label></div>
    {selected && <AssetDetails asset={selected} />}
    {!selected && params.has("asset") && <p role="status">未找到该规范资产，请重新搜索。</p>}
    <p role="status" aria-label="选型结果">{results.length} 项结果 · {catalog.assets.length} 份规范资产</p>
    {results.length === 0 ? <p>没有匹配项。可清除名称或切换任务与家族。</p> : <ul className="asset-results">{results.map(asset => { const document = primaryDocument(asset); return <li key={asset.id}><div><span className="asset-kicker">{identity(asset.assetIdentity)} · {asset.implementationRole ?? "待迁移"}</span><h3><a href={assetHref(asset.id)} aria-label={`查看规范：${asset.name}`}>{asset.name}</a></h3><p>{asset.description}</p></div><div className="asset-result-links"><a href={assetHref(asset.id)}>能力与近邻</a>{document && <a href={document.href} aria-label={`打开示例：${asset.name}`}>打开示例</a>}</div></li>; })}</ul>}
  </section>;
}

/** Legacy pages point to the same canonical model without inventing public imports for document names. */
export function CanonicalAssetLinks({ documentId }: { documentId: string }) {
  const assets = catalog.assets.filter(asset => asset.documentation.some(route => route.href === `#${documentId}`));
  if (!assets.length) return null;
  return <aside className="asset-canonical-links" aria-label="规范资产归属"><span>能力与改造边界：</span>{assets.map(asset => <a key={asset.id} href={assetHref(asset.id)}>{asset.name} · {identity(asset.assetIdentity)}</a>)}</aside>;
}
