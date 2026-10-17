import { expect, test } from "vitest";
import { makeNetworkFixtures } from "./chart-business/network-data";
import { layoutNetwork } from "../../../../../packages/ui/src/charts/network/network-layout";
import { networkGeometry } from "../../../../../packages/ui/src/charts/network/network-geometry";

function point(path: string, t: number) {
  const numbers = path.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi)!.map(Number);
  expect(numbers).toHaveLength(8);
  const s = 1 - t;
  return { x: s ** 3 * numbers[0]! + 3 * s ** 2 * t * numbers[2]! + 3 * s * t ** 2 * numbers[4]! + t ** 3 * numbers[6]!, y: s ** 3 * numbers[1]! + 3 * s ** 2 * t * numbers[3]! + 3 * s * t ** 2 * numbers[5]! + t ** 3 * numbers[7]! };
}

for (const variant of ["glow", "structured"] as const) {
  test.each([0, 1, 2].flatMap(revision => (["normal", "long"] as const).map(state => [revision, state] as const)))(`${variant}: revision %s / %s keeps curves clear of unrelated nodes and labels`, (revision, state) => {
    for (const fixture of makeNetworkFixtures(revision, state)) {
      const model = layoutNetwork(fixture.nodes, fixture.edges);
      const snapshot = structuredClone(model);
      const geometry = networkGeometry(model, variant);
      expect(model).toEqual(snapshot);
      expect(geometry.edges.map(edge => edge.id).sort()).toEqual(fixture.edges.map(edge => edge.id).sort());
      for (const node of geometry.nodes) {
        expect(node.labelBox.x).toBeGreaterThanOrEqual(0);
        expect(node.labelBox.y).toBeGreaterThanOrEqual(0);
        expect(node.labelBox.x + node.labelBox.width).toBeLessThanOrEqual(geometry.width);
        expect(node.labelBox.y + node.labelBox.height).toBeLessThanOrEqual(geometry.height);
        if (variant === "structured") for (const other of geometry.nodes) {
          if (node.id === other.id) continue;
          expect(node.body.x < other.body.x + other.body.width && node.body.x + node.body.width > other.body.x && node.body.y < other.body.y + other.body.height && node.body.y + node.body.height > other.body.y, `${fixture.id}: ${node.id} overlaps ${other.id}`).toBe(false);
        }
      }
      for (const edge of geometry.edges) {
        expect(edge.d).not.toMatch(/NaN|Infinity/);
        for (let step = 0; step <= 120; step++) {
          const p = point(edge.d, step / 120);
          expect(p.x, `${fixture.id}/${edge.id} x`).toBeGreaterThanOrEqual(0);
          expect(p.x, `${fixture.id}/${edge.id} x`).toBeLessThanOrEqual(geometry.width);
          expect(p.y, `${fixture.id}/${edge.id} y`).toBeGreaterThanOrEqual(0);
          expect(p.y, `${fixture.id}/${edge.id} y`).toBeLessThanOrEqual(geometry.height);
          for (const node of geometry.nodes) {
            const box = node.labelBox;
            expect(p.x > box.x && p.x < box.x + box.width && p.y > box.y && p.y < box.y + box.height, `${fixture.id}/${edge.id} crosses ${node.id} label`).toBe(false);
            if (variant === "glow" && (node.id === edge.source || node.id === edge.target)) continue;
            if (variant === "glow") expect(Math.hypot(p.x - node.x, p.y - node.y), `${fixture.id}/${edge.id} crosses ${node.id}`).toBeGreaterThanOrEqual(24);
            else expect(p.x > node.body.x && p.x < node.body.x + node.body.width && p.y > node.body.y && p.y < node.body.y + node.body.height, `${fixture.id}/${edge.id} crosses ${node.id}`).toBe(false);
          }
        }
      }
    }
  });
}

test("parallel and reverse links have distinct geometry and retain their data", () => {
  const nodes = ["a", "b", "c"].map((id, index) => ({ id, label: id, category: "concept", x: .2 + index * .3, y: .5 }));
  const edges = [
    { id: "first", source: "a", target: "c", relation: "support", directed: true, value: 0 },
    { id: "second", source: "a", target: "c", relation: "similar", directed: false },
    { id: "reverse", source: "c", target: "a", relation: "feedback", directed: true },
  ];
  const geometry = networkGeometry(layoutNetwork(nodes, edges), "glow");
  expect(geometry.edges.find(edge => edge.id === "first")).toMatchObject(edges[0]!);
  expect(geometry.edges.find(edge => edge.id === "second")).not.toHaveProperty("value");
  expect(geometry).toEqual(networkGeometry(layoutNetwork([...nodes].reverse(), [...edges].reverse()), "glow"));
  const midpoints = geometry.edges.map(edge => point(edge.d, .5));
  for (let i = 0; i < midpoints.length; i++) for (let j = i + 1; j < midpoints.length; j++) expect(Math.hypot(midpoints[i]!.x - midpoints[j]!.x, midpoints[i]!.y - midpoints[j]!.y)).toBeGreaterThan(8);
});

test("structured nodes fit legal frame boundaries and a fitting English name stays complete", () => {
  const nodes = [{ id: "left", label: "一二三四五六七八九十十一", category: "concept", x: 0, y: .5 }, { id: "right", label: "Random vectors", category: "concept", x: 1, y: .5 }];
  const geometry = networkGeometry(layoutNetwork(nodes, []), "structured");
  for (const node of geometry.nodes) {
    expect(node.body.x).toBeGreaterThanOrEqual(0);
    expect(node.body.x + node.body.width).toBeLessThanOrEqual(geometry.width);
    expect(node.labelBox.x).toBeGreaterThanOrEqual(0);
    expect(node.labelBox.x + node.labelBox.width).toBeLessThanOrEqual(geometry.width);
  }
  expect(geometry.nodes.find(node => node.id === "right")!.label).toBe("Random vectors");
});
