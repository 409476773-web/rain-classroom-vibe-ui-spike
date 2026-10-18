import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Input, SearchInput, Tree, type TreeNodeRecord } from "../../packages/ui/src/index";

function fixtureHost(id: string) {
  document.getElementById("root")!.style.display = "none";
  const host = document.createElement("section");
  host.id = id;
  document.body.append(host);
  return host;
}

export function mountResetFixture() {
  createRoot(fixtureHost("native-reset-fixture")).render(<div>
    <form id="reset-owner">
      <Input aria-label="重置课程" name="title" defaultValue="原值" showCount />
      <SearchInput aria-label="重置搜索" name="query" defaultValue="" showCount />
      <Input aria-label="受控课程" name="controlled" value="宿主值" onChange={() => {}} />
      <button type="reset">原生重置</button>
    </form>
    <Input aria-label="外部课程" name="external" form="reset-owner" defaultValue="外部原值" />
    <form onReset={(event) => event.preventDefault()}>
      <Input aria-label="取消重置课程" defaultValue="保留值" />
      <button type="reset">取消重置</button>
    </form>
  </div>);
}

export function mountTreeFixture(controlled: boolean) {
  const host = fixtureHost("strict-tree-fixture");
  type Result = { children: TreeNodeRecord[]; complete: true };
  const pending: { signal: AbortSignal; resolve: (result: Result) => void }[] = [];
  const loadChildren = (_key: string | number, { signal }: { signal: AbortSignal }) => new Promise<Result>((resolve) => {
    pending.push({ signal, resolve });
    const record = () => { host.dataset.requests = JSON.stringify(pending.map((request) => request.signal.aborted)); };
    signal.addEventListener("abort", record);
    record();
  });
  function Host() {
    const [nodes, setNodes] = useState<TreeNodeRecord[]>([{ key: "lazy", title: "恢复的目录", canHaveChildren: true, childrenComplete: false }]);
    return <div>
      <Tree data={nodes} {...(controlled ? { expandedKeys: ["lazy"], onExpandedKeysChange: () => {} } : { defaultExpandedKeys: ["lazy"] })}
        loadChildren={loadChildren} onChildrenLoaded={(_key, result) => setNodes([{ key: "lazy", title: "恢复的目录", childrenComplete: true, children: result.children }])} />
      <button onClick={() => pending[0]!.resolve({ children: [{ key: "stale", title: "过期节点" }], complete: true })}>完成旧请求</button>
      <button onClick={() => pending.at(-1)!.resolve({ children: [{ key: "child", title: "有效节点" }], complete: true })}>完成当前请求</button>
    </div>;
  }
  createRoot(host).render(<StrictMode><Host /></StrictMode>);
}
