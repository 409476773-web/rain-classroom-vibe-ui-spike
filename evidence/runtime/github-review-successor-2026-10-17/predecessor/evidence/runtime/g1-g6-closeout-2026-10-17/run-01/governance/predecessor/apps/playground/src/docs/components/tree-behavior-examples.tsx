import { useMemo, useRef, useState } from "react";
import { Button, Empty, EmptyTitle, EmptyDescription, EmptyActions, Input, Tag, Tree, applyTreeMove, type TreeHandle, type TreeNodeRecord } from "@rain-next/ui";

const asyncInitial: TreeNodeRecord[] = [
  { key: "remote-a", title: "第一组 · 异步课程", canHaveChildren: true, childrenComplete: false },
  { key: "remote-b", title: "第二组 · 失败后重试", canHaveChildren: true, childrenComplete: false },
  { key: "empty-folder", title: "空目录", canHaveChildren: true },
  { key: "local", title: "本地课件" },
];

function AsyncTreeExample() {
  const [data, setData] = useState(asyncInitial);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"filter" | "locate">("filter");
  const attempts = useRef(new Map<string, number>());
  const tree = useRef<TreeHandle>(null);
  return <>
    <p>可同时展开两组课程；第二组首次加载失败，可就地重试。勾选父节点后，新加载的后代会继承勾选。</p>
    <div className="tree-page__controls">
      <Button variant="secondary" onClick={() => setMode(mode === "filter" ? "locate" : "filter")}>{mode === "filter" ? "切换为定位搜索" : "切换为筛选搜索"}</Button>
      <Button variant="secondary" onClick={() => void tree.current?.refresh("remote-a")}>刷新第一组</Button>
      <Input aria-label="搜索异步示例" value={query} onValueChange={setQuery} placeholder="筛选时暂停拖拽" />
    </div>
    <Tree<TreeNodeRecord> ref={tree} aria-label="异步与移动示例" data={data} showLine checkable search={{ query, mode }}
      loadChildren={async (key, { signal }) => {
        await new Promise<void>((resolve, reject) => {
          const abort = () => { clearTimeout(timer); reject(new Error("加载已取消")); };
          const timer = setTimeout(() => { signal.removeEventListener("abort", abort); resolve(); }, 350);
          signal.addEventListener("abort", abort, { once: true });
        });
        const attempt = (attempts.current.get(String(key)) ?? 0) + 1;
        attempts.current.set(String(key), attempt);
        if (key === "remote-b" && attempt === 1) throw new Error("模拟网络失败");
        return { complete: true, children: [
          { key: `${key}-video`, title: `${key === "remote-a" ? "第一组" : "第二组"} · 视频课程` },
          { key: `${key}-quiz`, title: `${key === "remote-a" ? "第一组" : "第二组"} · 巩固练习` },
        ] };
      }}
      onChildrenLoaded={(key, result) => setData((previous) => {
        const merge = (nodes: readonly TreeNodeRecord[]): TreeNodeRecord[] => nodes.map((node) => node.key === key ? { ...node, children: result.children, childrenComplete: true } : node.children ? { ...node, children: merge(node.children) } : node);
        return merge(previous);
      })}
      dragAndDrop={{ onMove: (proposal) => setData((previous) => applyTreeMove(previous, proposal)) }} />
  </>;
}

function ScaleTreeExample() {
  const [count, setCount] = useState(1_000);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<(string | number)[]>(["scale-root", ...Array.from({ length: 14 }, (_, index) => `deep-${index + 1}`)]);
  const tree = useRef<TreeHandle>(null);
  const data = useMemo(() => {
    let deep: TreeNodeRecord = { key: "deep-14", title: "第 15 层 · 最深节点" };
    for (let depth = 13; depth >= 1; depth--) deep = { key: `deep-${depth}`, title: `第 ${depth + 1} 层 · 目录`, children: [deep] };
    return [{ key: "scale-root", title: "完整课程目录", children: [deep, ...Array.from({ length: count - 15 }, (_, index) => ({ key: `scale-${index}`, title: `课程节点 ${index + 1}` }))] }];
  }, [count]);
  return <>
    <p>共 {count.toLocaleString()} 个节点，含 15 层目录。窗口仅挂载当前区域和焦点节点；关系线随目录延续。</p>
    <div className="tree-page__controls">
      <Button variant="secondary" onClick={() => setCount(count === 1_000 ? 10_000 : 1_000)}>{count === 1_000 ? "使用 10,000 个节点" : "使用 1,000 个节点"}</Button>
      <Button variant="secondary" onClick={() => setExpanded(expanded.length ? [] : ["scale-root", ...Array.from({ length: 14 }, (_, index) => `deep-${index + 1}`)])}>{expanded.length ? "折叠全部" : "展开全部"}</Button>
      <Button variant="secondary" onClick={() => void tree.current?.reveal(`scale-${count - 16}`)}>定位末节点</Button>
      <Input aria-label="搜索大树" value={query} onValueChange={setQuery} placeholder="搜索课程节点" />
    </div>
    <Tree ref={tree} aria-label="大树与深层示例" data={data} showLine virtual={{ height: 360 }} expandedKeys={expanded} onExpandedKeysChange={setExpanded} search={{ query }} />
  </>;
}

const customData: TreeNodeRecord[] = [{ key: "custom-root", title: "课程材料", children: [
  { key: "custom-video", title: "课前视频" },
  { key: "custom-locked", title: "指定阅读", checkDisabled: true, children: [{ key: "custom-reading", title: "延伸阅读" }] },
] }];

function CustomTreeExample() {
  const [data, setData] = useState(customData), [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  return <>
    <p>这里把“勾选材料”表达为“加入清单”。节点旁的标签、提示和按钮都是自定义内容，会随节点状态同步变化。</p>
    <ol className="tree-state-guide tree-state-copy">
      <li><strong>勾选「课前视频」</strong>：标签变成「已加入」，按钮变成「移出清单」，上级显示「部分加入」。</li>
      <li><strong>点击节点名称</strong>：出现「当前行选中」标签和行背景，材料是否加入清单保持不变。</li>
      <li><strong>勾选「延伸阅读」</strong>：它可以正常加入；「指定阅读」仍不可勾选，限制只作用于当前分组。</li>
    </ol>
    <Tree className="tree-state-demo" aria-label="自定义状态与空态示例" data={data} variant="rich" checkable showLine defaultExpandedKeys={["custom-root", "custom-locked"]} search={{ query }}
      renderTitle={(node, state) => <span className="tree-state-title">{node.title}{state.selected && <Tag color="brand" appearance="outlined" size={20}>当前行选中</Tag>}</span>}
      renderDescription={(_, state) => state.disabledReasons.check ? <span className="tree-state-copy">此分组不可勾选，下级材料仍可单独加入。</span> : null}
      renderMeta={(_, state) => <Tag size={20} color={!state.disabledReasons.check && (state.checked || state.indeterminate) ? "brand" : "neutral"}>{state.disabledReasons.check ? "不可勾选" : state.indeterminate ? "部分加入" : state.checked ? "已加入" : "未加入"}</Tag>}
      renderActions={(node, state) => <Button size="small" variant="text" disabled={!!state.disabledReasons.check} aria-label={`${state.checked ? "移出清单" : "加入清单"}：${node.title}`} onClick={state.actions.toggleChecked}>{state.checked ? "移出清单" : "加入清单"}</Button>}
      renderEmpty={({ reason }) => <Empty presentation="text">
        <EmptyTitle>{reason === "empty" ? "还没有课程材料" : "未找到匹配的材料"}</EmptyTitle>
        <EmptyDescription>{reason === "empty" ? "恢复示例后继续体验节点操作。" : "试试其他关键词，或清空搜索。"}</EmptyDescription>
        <EmptyActions><Button variant="secondary" onClick={() => { if (reason === "empty") setData(customData); setQuery(""); input.current?.focus(); }}>{reason === "empty" ? "恢复课程材料" : "清空搜索"}</Button></EmptyActions>
      </Empty>} />
    <p className="tree-state-hint tree-state-copy">也可以直接点击「加入清单／移出清单」：左侧复选框和状态标签会同步变化。</p>
    <div className="tree-state-empty-guide">
      <h3>继续体验：自定义空态</h3>
      <p className="tree-state-copy">输入不存在的名称，查看「搜索无结果」；清空材料，查看「暂无数据」。两种空态都有自己的说明和恢复按钮。</p>
      <div className="tree-page__controls">
        <Button variant="secondary" onClick={() => setData(data.length ? [] : customData)}>{data.length ? "清空材料" : "恢复材料"}</Button>
        <Input ref={input} aria-label="搜索自定义示例" value={query} onValueChange={setQuery} placeholder="试着搜索：不存在的材料" />
      </div>
    </div>
  </>;
}

export function TreeBehaviorExamples() {
  const [asyncOpen, setAsyncOpen] = useState(false), [scaleOpen, setScaleOpen] = useState(false);
  return <div className="tree-page__behavior-examples">
    <details className="tree-page__panel" onToggle={(event) => setAsyncOpen(event.currentTarget.open)}>
      <summary>04　异步加载、勾选继承与搜索拖拽</summary>
      {asyncOpen && <AsyncTreeExample />}
    </details>
    <details className="tree-page__panel" onToggle={(event) => setScaleOpen(event.currentTarget.open)}>
      <summary>05　大树与 15 层目录</summary>
      {scaleOpen && <ScaleTreeExample />}
    </details>
    <details className="tree-page__panel">
      <summary>06　节点内容随状态变化</summary>
      <CustomTreeExample />
    </details>
  </div>;
}
