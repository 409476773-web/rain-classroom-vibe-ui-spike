import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { NetworkChart, layoutNetwork, type NetworkNode, type NetworkEdge, type RainChartRecipe, type NetworkChartVariant } from "@rain-next/ui/charts";
import { makeNetworkFixtures, type NetworkFixtureId, type NetworkChartState } from "./network-data";
import "./network-page.css";

export function filterNetwork(nodes: readonly NetworkNode[], edges: readonly NetworkEdge[], relation: string) {
  if (relation === "all") return { nodes, edges };
  const filtered = edges.filter(edge => edge.relation === relation);
  const connected = new Set(filtered.flatMap(edge => [edge.source, edge.target]));
  return { nodes: nodes.filter(node => connected.has(node.id)), edges: filtered };
}

function NetworkExample({ fixture, relation, recipe, variant, reduced }: { fixture: ReturnType<typeof makeNetworkFixtures>[number]; relation: string; recipe: RainChartRecipe; variant: NetworkChartVariant; reduced: boolean }) {
  const present = useIsPresent();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const prepared = useMemo(() => {
    try {
      const model = layoutNetwork(fixture.nodes, fixture.edges);
      if (variant === "glow") return { nodes: model.nodes, error: undefined };
      const sources = new Set(model.edges.map(edge => edge.source)), targets = new Set(model.edges.map(edge => edge.target));
      const mapping = model.edges.length > 0 && model.edges.every(edge => edge.directed) && model.nodes.every(node => sources.has(node.id) !== targets.has(node.id));
      const columns = mapping ? [model.nodes.filter(node => sources.has(node.id)), model.nodes.filter(node => targets.has(node.id))] : fixture.categories.map(category => model.nodes.filter(node => node.category === category.id)).filter(column => column.length);
      if (columns.flat().length !== model.nodes.length) throw new Error("网络节点类别配置缺失或重复");
      if (mapping) for (let pass = 0; pass < 2; pass++) for (const [index, column] of columns.entries()) {
        const opposite = columns[1 - index]!;
        const rank = (node: NetworkNode) => {
          const neighbors = model.edges.filter(edge => edge.source === node.id || edge.target === node.id).map(edge => opposite.findIndex(other => other.id === (edge.source === node.id ? edge.target : edge.source)));
          return neighbors.reduce((sum, value) => sum + value, 0) / neighbors.length;
        };
        column.sort((a, b) => rank(a) - rank(b) || a.id.localeCompare(b.id));
      }
      else for (const column of columns) column.sort((a, b) => a.y - b.y || a.id.localeCompare(b.id));
      return { nodes: columns.flatMap((column, index) => column.map((node, row) => ({ ...node, x: columns.length < 2 ? .5 : .1 + index * .8 / (columns.length - 1), y: column.length < 2 ? .5 : .1 + row * .8 / (column.length - 1) }))), error: undefined };
    }
    catch (cause) { return { nodes: [], error: cause instanceof Error ? cause.message : "无效网络数据" }; }
  }, [fixture, variant]);
  const { error } = prepared;
  useEffect(() => { if (error) setSelectedId(null); }, [error]);
  const filtered = useMemo(() => filterNetwork(prepared.nodes, fixture.edges, relation), [prepared.nodes, fixture.edges, relation]);
  const selected = filtered.nodes.find(node => node.id === selectedId);
  return <section className="rain-network-example rain-chart" data-network-example={fixture.id} data-recipe={recipe} inert={!present} aria-hidden={!present || undefined}>
    <header><span className="rain-network-reference">{fixture.reference}</span><h2>{fixture.title}</h2></header>
    <p className="rain-network-description">{fixture.description}</p>
    {error ? <p className="rain-network-state" role="alert">已拒绝无效数据：{error}</p> : <>
      <NetworkChart variant={variant} data-recipe={recipe} nodes={filtered.nodes} edges={filtered.edges} categories={fixture.categories.map((category, index) => ({ ...category, color: `var(--chart-${index + 1})` }))} relations={fixture.relations.map((item, index) => ({ ...item, color: `var(--chart-${index + 1})`, lineStyle: (["solid", "dashed", "dotted"] as const)[index % 3] }))} caption={fixture.title} reducedMotion={reduced} onNodeSelect={node => setSelectedId(node?.id ?? null)} />
      {filtered.nodes.length > 0 && <p className="rain-network-feedback" role="status">{selected ? `已选择：${selected.label}` : "选择节点查看关联详情；也可通过节点列表操作。"}</p>}
      <p className="rain-network-note">当前 {filtered.nodes.length} 个节点、{filtered.edges.length} 条关系 · 示例数据。节点位置只帮助阅读连接，距离不表示相关度。{variant === "structured" && " 分组列不表示先修阶段。"}</p>
    </>}
  </section>;
}

export function NetworkExamples({ fixtureId, state = "normal", revision = 0, relation = "all", recipe = "monochrome-blue", variant = "glow", reduced = false }: { fixtureId?: NetworkFixtureId; state?: NetworkChartState; revision?: number; relation?: string; recipe?: RainChartRecipe; variant?: NetworkChartVariant; reduced?: boolean }) {
  const fixtures = useMemo(() => makeNetworkFixtures(revision, state), [revision, state]);
  return <div style={{ position: "relative" }}><AnimatePresence mode="popLayout" initial={false}>{fixtures.filter(fixture => !fixtureId || fixture.id === fixtureId).map(fixture => <motion.div key={fixture.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .18 }}><NetworkExample fixture={fixture} relation={relation} recipe={recipe} variant={variant} reduced={reduced} /></motion.div>)}</AnimatePresence></div>;
}
