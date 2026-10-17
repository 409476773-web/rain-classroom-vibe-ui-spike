export type NetworkNode = { id: string; label: string; category: string; x?: number; y?: number };
export type NetworkEdge = { id: string; source: string; target: string; relation: string; directed: boolean; value?: number };

export function layoutNetwork(nodes: readonly NetworkNode[], edges: readonly NetworkEdge[]): {
  nodes: (NetworkNode & { x: number; y: number })[];
  edges: (NetworkEdge & { lane: number })[];
} {
  const nodeIds = new Set<string>(), edgeIds = new Set<string>();
  for (const node of nodes) {
    if (typeof node.id !== "string" || !node.id.trim()) throw new Error("网络节点 ID 不可为空");
    if (nodeIds.has(node.id)) throw new Error("网络节点 ID 重复");
    if (typeof node.label !== "string" || !node.label.trim()) throw new Error("网络节点名称不可为空");
    if (typeof node.category !== "string" || !node.category.trim()) throw new Error("网络节点类别不可为空");
    if ((node.x !== undefined) !== (node.y !== undefined) || node.x !== undefined && (!Number.isFinite(node.x) || !Number.isFinite(node.y))) throw new Error("网络节点坐标必须成对且有限");
    nodeIds.add(node.id);
  }
  for (const edge of edges) {
    if (typeof edge.id !== "string" || !edge.id.trim()) throw new Error("网络边 ID 不可为空");
    if (edgeIds.has(edge.id)) throw new Error("网络边 ID 重复");
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) throw new Error("网络边引用未知节点");
    if (edge.source === edge.target) throw new Error("网络首版不支持自环");
    if (typeof edge.relation !== "string" || !edge.relation.trim()) throw new Error("网络边关系不可为空");
    if (typeof edge.directed !== "boolean") throw new Error("网络边方向必须是布尔值");
    if (edge.value !== undefined && (!Number.isFinite(edge.value) || edge.value < 0)) throw new Error("网络边权重必须是有限非负数");
    edgeIds.add(edge.id);
  }

  const byId = (a: { id: string }, b: { id: string }) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  const ordered = [...nodes].sort(byId);
  const neighbours = new Map(ordered.map(node => [node.id, new Set<string>()]));
  for (const edge of edges) { neighbours.get(edge.source)!.add(edge.target); neighbours.get(edge.target)!.add(edge.source); }
  const mostConnected = [...ordered].sort((a, b) => neighbours.get(b.id)!.size - neighbours.get(a.id)!.size || byId(a, b))[0];
  const hub = ordered.length >= 5 && mostConnected && neighbours.get(mostConnected.id)!.size >= 3 ? mostConnected.id : undefined;
  const perimeter = ordered.filter(node => node.id !== hub);
  const positioned = ordered.map(node => {
    const index = perimeter.findIndex(entry => entry.id === node.id);
    const angle = index / perimeter.length * Math.PI * 2 - Math.PI / 2 + .07 * Math.sin(index * 2);
    const radius = .36 + .025 * Math.sin(index * 1.7);
    const central = node.id === hub || ordered.length === 1;
    return { ...node, x: node.x ?? (central ? .48 : .5 + radius * Math.cos(angle)), y: node.y ?? (central ? .51 : .5 + radius * Math.sin(angle)) };
  });
  function fit(values: number[]) {
    const magnitude = Math.max(1, ...values.map(Math.abs));
    const scaled = values.map(value => value / magnitude);
    const min = Math.min(...scaled), max = Math.max(...scaled);
    return scaled.map(value => min === max ? .5 : .1 + (value - min) / (max - min) * .8);
  }
  const normalized = positioned.every(node => node.x >= 0 && node.x <= 1 && node.y >= 0 && node.y <= 1);
  const xs = normalized ? positioned.map(node => node.x) : fit(positioned.map(node => node.x));
  const ys = normalized ? positioned.map(node => node.y) : fit(positioned.map(node => node.y));

  const groups = new Map<string, NetworkEdge[]>();
  for (const edge of [...edges].sort(byId)) {
    const pair = JSON.stringify([edge.source, edge.target].sort());
    const group = groups.get(pair) ?? [];
    group.push(edge);
    groups.set(pair, group);
  }
  const withLanes = [...groups.values()].flatMap(group => group.map((edge, index) => ({ ...edge, lane: index - (group.length - 1) / 2 })));
  return {
    nodes: positioned.map((node, index) => ({ ...node, x: xs[index]!, y: ys[index]! })),
    edges: withLanes.sort(byId),
  };
}
