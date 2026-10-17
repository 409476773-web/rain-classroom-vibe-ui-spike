import type { layoutNetwork } from "./network-layout";

type Point = { x: number; y: number };
type Box = Point & { width: number; height: number };
const width = 960, height = 560, radius = 24;
const textWidth = (text: string) => [...text].reduce((sum, character) => sum + (/[^\u0000-\u007f]/.test(character) ? 14 : 8), 0);
const overlaps = (a: Box, b: Box) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
function segmentHits(a: Point, b: Point, box: Box, gap: number) {
  if (Math.max(a.x, b.x) <= box.x - gap || Math.min(a.x, b.x) >= box.x + box.width + gap || Math.max(a.y, b.y) <= box.y - gap || Math.min(a.y, b.y) >= box.y + box.height + gap) return false;
  let enter = 0, leave = 1;
  for (const [axis, extent] of [["x", "width"], ["y", "height"]] as const) {
    const delta = b[axis] - a[axis], min = box[axis] - gap, max = box[axis] + box[extent] + gap;
    if (!delta) { if (a[axis] <= min || a[axis] >= max) return false; continue; }
    const first = (min - a[axis]) / delta, last = (max - a[axis]) / delta;
    enter = Math.max(enter, Math.min(first, last)); leave = Math.min(leave, Math.max(first, last));
    if (enter >= leave) return false;
  }
  return true;
}

export function networkGeometry(model: ReturnType<typeof layoutNetwork>, variant: "glow" | "structured") {
  const structured = variant === "structured";
  const nodes = model.nodes.map(node => {
    let label = node.label;
    if (textWidth(label) > 168) {
      label = "";
      for (const character of node.label) { if (textWidth(label + character) > 154) break; label += character; }
      label += "…";
    }
    const lines = [""];
    for (const character of label) {
      if (textWidth(lines.at(-1)! + character) > 114) lines.push("");
      lines[lines.length - 1] += character;
    }
    const labelWidth = Math.max(...lines.map(textWidth));
    const x = 84 + node.x * (width - 168), y = 56 + node.y * (height - 112);
    const nodeWidth = structured ? 144 : radius * 2;
    const nodeHeight = structured ? 44 : radius * 2;
    const body = { x: x - nodeWidth / 2, y: y - nodeHeight / 2, width: nodeWidth, height: nodeHeight };
    const textX = x + (structured ? 8 : 0);
    return { ...node, x, y, label, lines, body, labelBox: { x: textX - labelWidth / 2, y: y - lines.length * 10, width: labelWidth, height: lines.length * 20 }, textX, textY: y + 5 - (lines.length - 1) * 10 };
  });
  const placed: Box[] = [];
  for (const node of nodes) {
    if (structured) continue;
    const { x, y } = node, w = node.labelBox.width, h = node.labelBox.height;
    const positions = {
      above: { x: x - w / 2, y: y - 34 - h, width: w, height: h },
      below: { x: x - w / 2, y: y + 34, width: w, height: h },
      left: { x: x - 34 - w, y: y - h / 2, width: w, height: h },
      right: { x: x + 34, y: y - h / 2, width: w, height: h },
    };
    const dx = x - width / 2, dy = y - height / 2;
    const preferred = Math.hypot(dx, dy) < 100 ? "below" : Math.abs(dx) > Math.abs(dy) * 1.4 ? dx < 0 ? "left" : "right" : dy < 0 ? "above" : "below";
    const choices = [positions[preferred], ...Object.values(positions).filter(box => box !== positions[preferred])];
    const score = (box: Box) => {
      const out = box.x < 8 || box.y < 8 || box.x + box.width > width - 8 || box.y + box.height > height - 8;
      return (out ? 1000 : 0) + nodes.filter(other => overlaps(box, { x: other.body.x - 6, y: other.body.y - 6, width: other.body.width + 12, height: other.body.height + 12 })).length * 100 + placed.filter(other => overlaps(box, other)).length * 100;
    };
    node.labelBox = choices.reduce((best, box) => score(box) < score(best) ? box : best);
    node.textX = node.labelBox.x + node.labelBox.width / 2;
    node.textY = node.labelBox.y + 15;
    placed.push(node.labelBox);
  }
  const positions = new Map(nodes.map(node => [node.id, node]));
  type Side = "left" | "right" | "top" | "bottom";
  const normals: Record<Side, Point> = { left: { x: -1, y: 0 }, right: { x: 1, y: 0 }, top: { x: 0, y: -1 }, bottom: { x: 0, y: 1 } };
  const alternatePorts: [Side, Side][] = [["top", "top"], ["bottom", "bottom"], ["right", "right"], ["left", "left"], ["top", "bottom"], ["bottom", "top"]];
  function preferredPorts(edge: typeof model.edges[number]): [Side, Side] {
    const a = positions.get(edge.source)!, b = positions.get(edge.target)!;
    if (Math.abs(b.x - a.x) >= 180) return b.x > a.x ? ["right", "left"] : ["left", "right"];
    if (Math.abs(b.y - a.y) >= 76) return b.y > a.y ? ["bottom", "top"] : ["top", "bottom"];
    return (a.y + b.y) / 2 < height / 2 ? ["top", "top"] : ["bottom", "bottom"];
  }
  const portCache = new Map<string, Point>();
  function cardPort(node: typeof nodes[number], edge: typeof model.edges[number], side: Side) {
    const key = JSON.stringify([node.id, edge.id, side]), cached = portCache.get(key);
    if (cached) return cached;
    const horizontal = side === "left" || side === "right", axis = horizontal ? "y" : "x";
    const connections = model.edges.filter(link => (link.source === node.id || link.target === node.id) && (link.id === edge.id || preferredPorts(link)[link.source === node.id ? 0 : 1] === side));
    const other = (link: typeof edge) => positions.get(link.source === node.id ? link.target : link.source)!;
    connections.sort((a, b) => other(a)[axis] - other(b)[axis] || a.id.localeCompare(b.id));
    const offset = connections.length < 2 ? 0 : (connections.findIndex(link => link.id === edge.id) / (connections.length - 1) - .5) * (horizontal ? 28 : 96);
    const normal = normals[side], gap = node.id === edge.target && edge.directed ? 5 : 3;
    const distance = (horizontal ? node.body.width : node.body.height) / 2 + gap;
    const result = { x: node.x + normal.x * distance + (horizontal ? 0 : offset), y: node.y + normal.y * distance + (horizontal ? offset : 0) };
    portCache.set(key, result);
    return result;
  }
  type Curve = { start: Point; c1: Point; c2: Point; end: Point };
  const point = (curve: Curve, t: number) => {
    const s = 1 - t;
    return { x: s ** 3 * curve.start.x + 3 * s ** 2 * t * curve.c1.x + 3 * s * t ** 2 * curve.c2.x + t ** 3 * curve.end.x, y: s ** 3 * curve.start.y + 3 * s ** 2 * t * curve.c1.y + 3 * s * t ** 2 * curve.c2.y + t ** 3 * curve.end.y };
  };
  function curve(edge: typeof model.edges[number], bend1: number, bend2: number, portChoice = 0): Curve {
    const a = positions.get(edge.source)!, b = positions.get(edge.target)!;
    const dx = b.x - a.x, dy = b.y - a.y, length = Math.hypot(dx, dy) || 1;
    const direction = edge.source < edge.target ? 1 : -1;
    const nx = -dy / length * direction, ny = dx / length * direction;
    const first = edge.source < edge.target ? bend1 : bend2, second = edge.source < edge.target ? bend2 : bend1;
    if (structured) {
      const [sourceSide, targetSide] = portChoice ? alternatePorts[portChoice - 1]! : preferredPorts(edge);
      const start = cardPort(a, edge, sourceSide), end = cardPort(b, edge, targetSide);
      const sourceNormal = normals[sourceSide], targetNormal = normals[targetSide];
      const opposing = sourceNormal.x === -targetNormal.x && sourceNormal.y === -targetNormal.y;
      const arm = opposing ? Math.max(8, Math.min(100, Math.hypot(end.x - start.x, end.y - start.y) * .35)) : Math.max(32, Math.min(100, length * .25));
      return { start, end, c1: { x: start.x + sourceNormal.x * Math.max(8, arm + first), y: start.y + sourceNormal.y * Math.max(8, arm + first) }, c2: { x: end.x + targetNormal.x * Math.max(8, arm + second), y: end.y + targetNormal.y * Math.max(8, arm + second) } };
    }
    const c1 = { x: a.x + dx / 3 + nx * (first + edge.lane * 44), y: a.y + dy / 3 + ny * (first + edge.lane * 44) };
    const c2 = { x: b.x - dx / 3 + nx * (second + edge.lane * 44), y: b.y - dy / 3 + ny * (second + edge.lane * 44) };
    function port(node: typeof nodes[number], control: Point, arrow: boolean) {
      const vx = control.x - node.x, vy = control.y - node.y, distance = Math.hypot(vx, vy) || 1;
      const ux = vx / distance, uy = vy / distance;
      const boundary = structured ? Math.min(node.body.width / 2 / (Math.abs(ux) || 1e-9), node.body.height / 2 / (Math.abs(uy) || 1e-9)) : radius;
      return { x: node.x + ux * (boundary + 3 + (arrow ? 2 : 0)), y: node.y + uy * (boundary + 3 + (arrow ? 2 : 0)) };
    }
    return { start: port(a, c1, false), c1, c2, end: port(b, c2, edge.directed) };
  }
  function score(curve: Curve, edge: typeof model.edges[number]) {
    let collisions = 0;
    let previous = curve.start;
    for (let step = 0; step <= 160; step++) {
      const p = point(curve, step / 160);
      if (p.x < 4 || p.x > width - 4 || p.y < 4 || p.y > height - 4) collisions += 4;
      for (const node of nodes) {
        if (segmentHits(previous, p, node.labelBox, 3)) collisions++;
        const endpoint = node.id === edge.source || node.id === edge.target;
        if ((structured || !endpoint) && segmentHits(previous, p, node.body, endpoint ? 0 : 5)) collisions += 2;
      }
      previous = p;
    }
    return collisions * 10000;
  }
  const groups = new Map<string, typeof model.edges>();
  for (const edge of model.edges) {
    const key = JSON.stringify([edge.source, edge.target].sort());
    groups.set(key, [...(groups.get(key) ?? []), edge]);
  }
  const paths = new Map<string, string>();
  // shortcut: bounded curve candidates suit small networks, use a graph layout engine for large or tightly packed inputs.
  for (const group of groups.values()) {
    const edge = group[0]!, a = positions.get(edge.source)!, b = positions.get(edge.target)!;
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    const normalX = -(b.y - a.y) * (edge.source < edge.target ? 1 : -1), normalY = (b.x - a.x) * (edge.source < edge.target ? 1 : -1);
    const outward = normalX * ((a.x + b.x) / 2 - width / 2) + normalY * ((a.y + b.y) / 2 - height / 2) < 0 ? -1 : 1;
    const preferred = structured || group.length > 1 ? 0 : outward * Math.min(56, length * .09);
    const candidates = [preferred, 0, 24, -24, 48, -48, 88, -88, 136, -136, 200, -200, 280, -280, 380, -380].map(bend => [bend, bend] as const);
    candidates.push([88, -88], [-88, 88], [160, -160], [-160, 160], [240, -240], [-240, 240]);
    for (const bend of [48, -48, 88, -88, 136, -136, 200, -200, 280, -280]) candidates.push([0, bend], [bend, 0]);
    const midpoints: Point[] = [];
    for (const item of group) {
      type Candidate = readonly [number, number, number?];
      const cost = (bends: Candidate) => {
        const candidate = curve(item, ...bends), middle = point(candidate, .5);
        const duplicate = midpoints.some(p => Math.hypot(p.x - middle.x, p.y - middle.y) < 12);
        return score(candidate, item) + (duplicate ? 1000000 : 0) + Math.abs(bends[0] - preferred) + Math.abs(bends[1] - preferred) + (bends[0] !== bends[1] ? 100 : 0) + (bends[2] ? 80 : 0);
      };
      let chosen: Candidate = candidates[0]!, bestCost = cost(chosen);
      const consider = (candidate: Candidate) => { const value = cost(candidate); if (value < bestCost) { chosen = candidate; bestCost = value; } };
      for (const candidate of candidates.slice(1)) consider(candidate);
      if (structured && bestCost >= 10000) for (let port = 1; port <= alternatePorts.length; port++) for (const candidate of candidates) consider([candidate[0], candidate[1], port]);
      if (bestCost >= 10000) {
        const detours = [0, 32, -32, 64, -64, 96, -96, 128, -128, 160, -160, 208, -208, 256, -256, 320, -320, 400, -400];
        for (const first of detours) for (const second of detours) consider([first, second]);
      }
      const { start, c1, c2, end } = curve(item, ...chosen);
      midpoints.push(point({ start, c1, c2, end }, .5));
      paths.set(item.id, `M${start.x},${start.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${end.x},${end.y}`);
    }
  }
  return { width, height, radius, nodes, edges: model.edges.map(edge => ({ ...edge, d: paths.get(edge.id)! })) };
}
