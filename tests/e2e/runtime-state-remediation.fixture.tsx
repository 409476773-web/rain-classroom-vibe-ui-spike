import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Input, SearchInput, FormItem, Tree, type TreeKey, type TreeNodeRecord } from "../../packages/ui/src/index";
import { WorkspaceLayout, RecoverableRegion, RegionRestoreTrigger, PaneSplitter, useWorkspaceLayout, type WorkspaceSpec } from "../../packages/layouts/src/index";

function host(id: string) {
  document.getElementById("root")!.style.display = "none";
  const element = document.createElement("section"); element.id = id;
  element.style.cssText = "padding:16px; color:var(--rain-category-text-neutral-1); background:var(--rain-category-background-neutral-1);";
  document.body.append(element); return element;
}

export function mountWorkspaceRemediation(side: "start" | "end" | "top") {
  const element = host("workspace-remediation");
  const spec: WorkspaceSpec = { workspaceKey: `remediation/${side}`, minMainWidth: 560, stableRestoreOwnerIds: ["toolbar"], regions: [
    { id: "subject", label: "复核区域", side, allowedModes: side === "top" ? ["full", "hidden"] : ["expanded", "compact"],
      defaultMode: side === "top" ? "full" : "expanded", minWidth: 176, defaultWidth: 216, maxWidth: 320,
      compactWidth: 64, adaptationPriority: 0, restoreOwnerId: "toolbar", boundaryWidth: side === "top" ? 0 : 5 },
  ] };
  function Controls() {
    const controller = useWorkspaceLayout();
    return <><output data-testid="workspace-state">{JSON.stringify({ preferences: controller.state.preferences, temporary: controller.state.session.temporary, ribbonTemporary: controller.state.session.ribbonTemporary, mainWidth: controller.effective.mainWidth })}</output>
      <button data-workspace-action="pin" onClick={() => controller.dispatch({ type: "PIN_TEMP", regionId: "subject", viewportWidth: controller.viewportWidth })}>固定当前区域</button>
      <button data-workspace-action="unpin" disabled={!Object.hasOwn(controller.state.session.pinnedBaseModes, "subject")} onClick={() => controller.dispatch({ type: "UNPIN", regionId: "subject", viewportWidth: controller.viewportWidth })}>取消固定区域</button></>;
  }
  createRoot(element).render(<WorkspaceLayout spec={spec} viewportWidth={window.innerWidth - 32}
    toolbar={<><RegionRestoreTrigger regionId="subject"/><Controls/></>}>
    <RecoverableRegion regionId="subject"><textarea aria-label="区域草稿" defaultValue="未保存的区域草稿"/></RecoverableRegion>
    {side !== "top" && <PaneSplitter regionId="subject"/>}
    <main><h2>稳定正文</h2><textarea aria-label="正文草稿" defaultValue="正文独立草稿"/></main>
  </WorkspaceLayout>);
}

export function mountInputRemediation() {
  function Fixture() {
    const [defaultValue, setDefaultValue] = useState("挂载值"), [controlled, setControlled] = useState("宿主草稿");
    const [calls, setCalls] = useState({ changed: 0, cleared: 0, searched: 0 });
    const bump = (key: keyof typeof calls) => setCalls(value => ({ ...value, [key]: value[key] + 1 }));
    return <div><button onClick={() => setDefaultValue("更新默认值")}>更新默认值</button><output data-testid="input-callbacks">{JSON.stringify(calls)}</output>
      <form id="reset-a" aria-label="复位表单A">
        <Input aria-label="默认字段" name="rain" defaultValue={defaultValue} showCount onValueChange={() => bump("changed")} onClear={() => bump("cleared")}/>
        <input aria-label="原生默认字段" name="native" defaultValue={defaultValue}/>
        <FormItem label="查询字段" status="error" message="宿主错误保留"><SearchInput name="query" defaultValue="初始查询" onSearch={() => bump("searched")} onClear={() => bump("cleared")}/></FormItem>
        <Input aria-label="组字字段" name="ime" defaultValue="AB" maxLength={3} showCount/>
        <Input aria-label="只读字段" name="readonly" defaultValue="只读" readOnly/>
        <Input aria-label="禁用字段" name="disabled" defaultValue="禁用" disabled/>
        <button type="reset">复位表单A</button>
      </form>
      <Input aria-label="外置字段" name="external" defaultValue="外置值" form="reset-a"/>
      <form id="reset-b" aria-label="复位表单B" onReset={event => event.preventDefault()}><Input aria-label="取消复位字段" name="cancelled" defaultValue="取消初值"/><button type="reset">取消复位B</button></form>
      <form aria-label="受控表单" onReset={() => setControlled("宿主重置值")}>
        <Input aria-label="受控更新字段" name="controlled" value={controlled} onValueChange={setControlled}/>
        <Input aria-label="受控拒绝字段" name="locked" value="固定宿主值" onChange={() => {}}/>
        <button type="reset">宿主主动复位</button>
      </form>
    </div>;
  }
  createRoot(host("input-remediation")).render(<Fixture/>);
}

export function mountTreeRemediation(controlled: boolean, strict = true) {
  const element = host("tree-remediation");
  type Result = { children: TreeNodeRecord[]; complete: true };
  type Pending = { key: TreeKey; requestId: number; revision?: string | number; signal: AbortSignal; resolve: (result: Result) => void; reject: (error: Error) => void };
  const pending: Pending[] = [], timeline: object[] = [];
  const record = (event: object) => { timeline.push(event); element.dataset.timeline = JSON.stringify(timeline); };
  const loadChildren = (key: TreeKey, { signal, requestId, dataRevision }: { signal: AbortSignal; requestId: number; dataRevision?: string | number }) => new Promise<Result>((resolve, reject) => {
    pending.push({ key, signal, requestId, revision: dataRevision, resolve, reject }); record({ type: "request", key, requestId, revision: dataRevision });
    signal.addEventListener("abort", () => record({ type: "abort", key, requestId }));
  });
  const active = (key: TreeKey) => [...pending].reverse().find(request => request.key === key && !request.signal.aborted)!;
  function Fixture() {
    const [nodes, setNodes] = useState<TreeNodeRecord[]>([{ key: "alpha", title: "甲分支", canHaveChildren: true, childrenComplete: false }, { key: "beta", title: "乙分支", canHaveChildren: true, childrenComplete: false }]);
    const [revision, setRevision] = useState(1), [mounted, setMounted] = useState(true);
    const [expanded, setExpanded] = useState<TreeKey[]>(["alpha", "beta"]);
    return <div>{mounted && <Tree data={nodes} dataRevision={revision} {...(controlled ? { expandedKeys: expanded, onExpandedKeysChange: setExpanded } : { defaultExpandedKeys: ["alpha", "beta"] })}
      loadChildren={loadChildren} onChildrenLoaded={(key, result, context) => {
        record({ type: "delivered", key, requestId: context.requestId, revision: context.dataRevision });
        setNodes(current => current.map(node => node.key === key ? { ...node, childrenComplete: true, children: result.children } : node));
      }}/>}<button onClick={() => pending.filter(request => request.signal.aborted).forEach(request => request.reject(new Error("old cancelled request")))}>拒绝已取消请求</button>
      <button onClick={() => active("alpha").reject(new Error("active request offline"))}>拒绝甲分支</button>
      <button onClick={() => active("alpha").resolve({ children: [{ key: "child-a", title: "甲分支子节点" }], complete: true })}>完成甲分支</button>
      <button onClick={() => active("beta").resolve({ children: [{ key: "child-b", title: "乙分支子节点" }], complete: true })}>完成乙分支</button>
      <button onClick={() => setRevision(value => value + 1)}>更换数据版本</button>
      <button onClick={() => setNodes(current => current.filter(node => node.key !== "beta"))}>删除乙分支</button>
      <button onClick={() => setMounted(false)}>卸载树</button>
      <button onClick={() => pending.forEach(request => request.resolve({ children: [{ key: "late", title: "迟到节点" }], complete: true }))}>完成全部旧请求</button>
    </div>;
  }
  createRoot(element).render(strict ? <StrictMode><Fixture/></StrictMode> : <Fixture/>);
}
