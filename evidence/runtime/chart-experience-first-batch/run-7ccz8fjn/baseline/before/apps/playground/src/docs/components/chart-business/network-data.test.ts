import { expect, test } from "vitest";
import { layoutNetwork } from "../../../../../../packages/ui/src/charts/network/network-layout";
import { makeNetworkFixtures } from "./network-data";

test("four mock graph samples keep node categories distinct from edge relations", () => {
  const fixtures = makeNetworkFixtures();
  expect(fixtures.map(fixture => fixture.reference)).toEqual(["CH-065", "CH-070", "CH-083", "CH-086"]);
  for (const fixture of fixtures) {
    expect(fixture.description).toMatch(/Mock/);
    expect(fixture.nodes.length).toBeGreaterThanOrEqual(6);
    expect(fixture.nodes.length).toBeLessThanOrEqual(12);
    expect(() => layoutNetwork(fixture.nodes, fixture.edges)).not.toThrow();
    expect(fixture.nodes.every(node => fixture.categories.some(category => category.id === node.category))).toBe(true);
    expect(fixture.edges.every(edge => fixture.relations.some(relation => relation.id === edge.relation))).toBe(true);
  }
  expect(fixtures.some(fixture => fixture.nodes.every(node => node.x === undefined))).toBe(true);
  expect(fixtures.some(fixture => fixture.nodes.every(node => node.x !== undefined))).toBe(true);
  expect(fixtures.some(fixture => layoutNetwork(fixture.nodes, fixture.edges).edges.some(edge => edge.lane !== 0))).toBe(true);
});

test("data updates move supplied positions and readings without changing graph identities", () => {
  const before = makeNetworkFixtures(), after = makeNetworkFixtures(1);
  for (let index = 0; index < before.length; index++) {
    const a = before[index]!, b = after[index]!;
    expect(b.nodes.map(node => ({ id: node.id, category: node.category }))).toEqual(a.nodes.map(node => ({ id: node.id, category: node.category })));
    expect(b.edges.map(({ value: _value, ...edge }) => edge)).toEqual(a.edges.map(({ value: _value, ...edge }) => edge));
    expect(b.edges.some((edge, edgeIndex) => edge.value !== a.edges[edgeIndex]!.value)).toBe(true);
    if (a.nodes.some(node => node.x !== undefined)) {
      expect(layoutNetwork(a.nodes, a.edges).nodes).not.toEqual(layoutNetwork(b.nodes, b.edges).nodes);
    }
    expect(() => layoutNetwork(b.nodes, b.edges)).not.toThrow();
  }
});

test("empty, single and long-name fixtures retain full semantic configuration", () => {
  const normal = makeNetworkFixtures();
  for (const state of ["empty", "single", "long"] as const) {
    makeNetworkFixtures(0, state).forEach((fixture, index) => {
      expect(fixture.categories).toEqual(normal[index]!.categories);
      expect(fixture.relations).toEqual(normal[index]!.relations);
      expect(() => layoutNetwork(fixture.nodes, fixture.edges)).not.toThrow();
      if (state === "empty") expect(fixture.nodes).toHaveLength(0);
      if (state === "single") expect(fixture.nodes).toHaveLength(1);
      if (state !== "long") expect(fixture.edges).toHaveLength(0);
      if (state === "long") expect(fixture.nodes.every(node => node.label.length > 20)).toBe(true);
    });
  }
});

test("invalid fixtures exercise the same public validation boundary", () => {
  for (const fixture of makeNetworkFixtures(0, "invalid")) {
    expect(() => layoutNetwork(fixture.nodes, fixture.edges)).toThrow(/未知/);
  }
});

test("the course example includes a complex network with parallel and cross-category connections", () => {
  const fixture = makeNetworkFixtures().find(item => item.id === "courses")!;
  expect(fixture.nodes).toHaveLength(11);
  expect(fixture.edges).toHaveLength(19);
  const model = layoutNetwork(fixture.nodes, fixture.edges);
  expect(model.edges.some(edge => edge.lane !== 0)).toBe(true);
  expect(fixture.edges.some(edge => edge.directed && fixture.edges.some(reverse => reverse.directed && reverse.source === edge.target && reverse.target === edge.source))).toBe(true);
  expect(new Set(fixture.edges.filter(edge => edge.target === "database").map(edge => edge.source)).size).toBeGreaterThanOrEqual(3);
});
