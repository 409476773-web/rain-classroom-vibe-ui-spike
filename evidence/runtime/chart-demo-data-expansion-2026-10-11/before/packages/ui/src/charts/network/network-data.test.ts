import { expect, test } from "vitest";
import { layoutNetwork, type NetworkNode, type NetworkEdge } from "./network-layout";

const nodes: NetworkNode[] = [
  { id: "a", label: "概念 A", category: "concept" },
  { id: "b", label: "练习 B", category: "exercise" },
  { id: "c", label: "课程 C", category: "course" },
];
const edge: NetworkEdge = { id: "ab", source: "a", target: "b", relation: "supports", directed: true, value: 0 };

test("reordering nodes and edges preserves deterministic positions and distinct parallel lanes", () => {
  const edges: NetworkEdge[] = [edge, { ...edge, id: "ab-other", relation: "applies" }, { ...edge, id: "ba", source: "b", target: "a" }];
  const first = layoutNetwork(nodes, edges);
  expect(first).toEqual(layoutNetwork([...nodes].reverse(), [...edges].reverse()));
  expect(first.nodes.map(node => node.id)).toEqual(["a", "b", "c"]);
  expect(new Set(first.nodes.map(node => `${node.x},${node.y}`)).size).toBe(3);
  expect(first.edges.map(item => item.lane)).toEqual([-1, 0, 1]);
  expect(first.edges[0]).toMatchObject({ value: 0, relation: "supports", directed: true });
  for (const node of first.nodes) {
    expect(node.x).toBeGreaterThanOrEqual(.1);
    expect(node.x).toBeLessThanOrEqual(.9);
    expect(node.y).toBeGreaterThanOrEqual(.1);
    expect(node.y).toBeLessThanOrEqual(.9);
  }
});

test("paired supplied coordinates retain relative order while fitting the frame", () => {
  const model = layoutNetwork(nodes.map((node, index) => ({ ...node, x: [20, 60, 100][index]!, y: [10, 10, 90][index]! })), [edge]);
  expect(model.nodes[0]).toMatchObject({ x: .1, y: .1 });
  expect(model.nodes[1]!.x).toBeCloseTo(.5);
  expect(model.nodes[1]!.y).toBe(.1);
  expect(model.nodes[2]).toMatchObject({ x: .9, y: .9 });
});

test("mixed supplied and generated coordinates remain stable and finite", () => {
  const mixed = [{ ...nodes[0]!, x: 20, y: 10 }, nodes[1]!, nodes[2]!];
  expect(layoutNetwork(mixed, [edge])).toEqual(layoutNetwork([...mixed].reverse(), [edge]));
  expect(layoutNetwork(mixed, [edge]).nodes.every(node => Number.isFinite(node.x) && Number.isFinite(node.y))).toBe(true);
});

test("finite extreme coordinates are fitted without overflowing their span", () => {
  const model = layoutNetwork([{ ...nodes[0]!, x: -Number.MAX_VALUE, y: 0 }, { ...nodes[1]!, x: Number.MAX_VALUE, y: 0 }], [edge]);
  expect(model.nodes).toMatchObject([{ x: .1, y: .5 }, { x: .9, y: .5 }]);
});

test("multi-node cycles and different relation types are accepted", () => {
  const edges = [edge, { ...edge, id: "bc", source: "b", target: "c", relation: "practice" }, { ...edge, id: "ca", source: "c", target: "a", directed: false }];
  const model = layoutNetwork(nodes, edges);
  expect(model.edges).toHaveLength(3);
  expect(model.edges.every(item => item.lane === 0)).toBe(true);
});

test("empty and single-node networks do not invent relationships", () => {
  expect(layoutNetwork([], [])).toEqual({ nodes: [], edges: [] });
  expect(layoutNetwork([{ ...nodes[0]!, x: 18, y: -8 }], [])).toEqual({ nodes: [{ ...nodes[0]!, x: .5, y: .5 }], edges: [] });
});

test.each(["", "   "])("empty node or edge identity %s is rejected", id => {
  expect(() => layoutNetwork([{ ...nodes[0]!, id }], [])).toThrow(/ID/);
  expect(() => layoutNetwork(nodes, [{ ...edge, id }])).toThrow(/ID/);
});

test("duplicate node and edge IDs are rejected", () => {
  expect(() => layoutNetwork([nodes[0]!, nodes[0]!], [])).toThrow(/重复/);
  expect(() => layoutNetwork(nodes, [edge, edge])).toThrow(/重复/);
});

test.each(["source", "target"] as const)("unknown %s is rejected", key => {
  expect(() => layoutNetwork(nodes, [{ ...edge, [key]: "unknown" }])).toThrow(/未知/);
});

test.each([{ x: 10 }, { y: 10 }, { x: NaN, y: 1 }, { x: 1, y: Infinity }, { x: null, y: 1 }])("half or invalid coordinate $x,$y is rejected", position => {
  expect(() => layoutNetwork([{ ...nodes[0]!, ...position } as NetworkNode], [])).toThrow(/坐标/);
});

test("self-loops are rejected explicitly", () => {
  expect(() => layoutNetwork(nodes, [{ ...edge, target: "a" }])).toThrow(/自环/);
});

test.each([-1, NaN, Infinity, null])("invalid optional weight %s is rejected", value => {
  expect(() => layoutNetwork(nodes, [{ ...edge, value } as NetworkEdge])).toThrow(/权重/);
});

test("missing weights remain absent rather than becoming zero", () => {
  const { value: _value, ...withoutWeight } = edge;
  expect(layoutNetwork(nodes, [withoutWeight]).edges[0]).not.toHaveProperty("value");
});

test("labels, categories, relation names and direction must have their declared types", () => {
  expect(() => layoutNetwork([{ ...nodes[0]!, label: "" }], [])).toThrow(/名称/);
  expect(() => layoutNetwork([{ ...nodes[0]!, category: "" }], [])).toThrow(/类别/);
  expect(() => layoutNetwork(nodes, [{ ...edge, relation: "" }])).toThrow(/关系/);
  expect(() => layoutNetwork(nodes, [{ ...edge, directed: "yes" } as unknown as NetworkEdge])).toThrow(/方向/);
});

test("endpoint IDs containing delimiters do not merge unrelated lane groups", () => {
  const delimiterNodes = ["a|b", "c", "a", "b|c"].map(id => ({ id, label: id, category: "concept" }));
  const edges = [{ ...edge, source: "a|b", target: "c" }, { ...edge, id: "second", source: "a", target: "b|c" }];
  expect(layoutNetwork(delimiterNodes, edges).edges.map(item => item.lane)).toEqual([0, 0]);
});

test("layout does not mutate the caller's arrays or records", () => {
  const original = { nodes: structuredClone(nodes), edges: [structuredClone(edge)] };
  const snapshot = structuredClone(original);
  layoutNetwork(original.nodes, original.edges);
  expect(original).toEqual(snapshot);
});

test("normalized coordinates are stable when relation filtering removes other nodes", () => {
  const positioned = nodes.map((node, index) => ({ ...node, x: [.18, .47, .82][index]!, y: [.2, .55, .76][index]! }));
  const full = layoutNetwork(positioned, [edge]);
  const filtered = layoutNetwork(positioned.slice(0, 2), [edge]);
  expect(filtered.nodes).toEqual(full.nodes.slice(0, 2));
  expect(full.nodes.map(({ x, y }) => ({ x, y }))).toEqual(positioned.map(({ x, y }) => ({ x, y })));
});

test("a generated hub sits inside its neighbours and geometry ignores weights", () => {
  const hubNodes = ["hub", "a", "b", "c", "d"].map(id => ({ id, label: id, category: "concept" }));
  const hubEdges = hubNodes.slice(1).map(node => ({ ...edge, id: `hub-${node.id}`, source: "hub", target: node.id }));
  const result = layoutNetwork(hubNodes, hubEdges);
  const hub = result.nodes.find(node => node.id === "hub")!;
  expect(hub.x).toBeGreaterThan(.35);
  expect(hub.x).toBeLessThan(.65);
  expect(hub.y).toBeGreaterThan(.35);
  expect(hub.y).toBeLessThan(.65);
  expect(result.nodes).toEqual(layoutNetwork([...hubNodes].reverse(), hubEdges.map(item => ({ ...item, value: 99 })).reverse()).nodes);
});
