export const series = [
  { key: 'enrolled', label: '报名人数', color: 'var(--chart-1)', unit: '人' },
  { key: 'completed', label: '完成人数', color: 'var(--chart-2)', unit: '人' },
  { key: 'rate', label: '完成率', color: 'var(--chart-3)', unit: '%' },
];
export const completionRate = (enrolled, completed) => enrolled === 0 ? null : completed / enrolled * 100;
export function createReport(mode = 'normal', updated = false) {
  let counts = [[180,126], [225,180], [160,120], [300,225], [240,216], [200,160]];
  if (updated) counts.push([260,234]);
  if (mode === 'empty') counts = [];
  if (mode === 'zero') counts = counts.map(() => [0,0]);
  if (mode === 'mixed') counts[2] = [0,0];
  if (mode === 'invalid') counts[0] = [180,181];
  return counts.map(([enrolled, completed], index) => ({ date: new Date(2026, 9, index + 1, 12), enrolled, completed, rate: completionRate(enrolled, completed) }));
}
export function reportState(rows) {
  if (!rows.length) return 'empty';
  if (rows.some((row, index) => !(row.date instanceof Date) || !Number.isFinite(row.date.getTime()) || (index > 0 && row.date <= rows[index - 1].date) || !Number.isFinite(row.enrolled) || !Number.isFinite(row.completed) || row.enrolled < 0 || row.completed < 0 || row.completed > row.enrolled)) return 'invalid';
  if (rows.every(row => row.enrolled === 0)) return 'zero';
  if (rows.some(row => row.enrolled === 0)) return 'mixed';
  return 'normal';
}
export const dateText = date => `${date.getMonth() + 1}月${date.getDate()}日`;
export const rateText = rate => rate === null ? '不适用（报名人数为 0）' : `${rate.toFixed(1)}%`;

export const regions = [
  { id: 'west', name: '西河训练站', x: 101, y: 29 },
  { id: 'center', name: '中谷训练站', x: 103, y: 29 },
  { id: 'east', name: '东岭训练站', x: 105, y: 29 },
  { id: 'south', name: '南湾训练站', x: 101, y: 27 },
  { id: 'plateau', name: '高原训练站', x: 103, y: 27 },
  { id: 'shore', name: '海岸训练站', x: 105, y: 27 },
];
// Original schematic geometry for this consumer; no administrative boundary claim.
export const geography = { type: 'FeatureCollection', features: regions.map(({ id, name, x, y }) => ({ type: 'Feature', properties: { id, name }, geometry: { type: 'Polygon', coordinates: [[[x,y+1.8],[x+1.8,y+1.8],[x+1.8,y],[x,y],[x,y+1.8]]] } })) };
export function regionalValues(mode = 'normal', updated = false) {
  const values = { west: updated ? 8 : 0, center: updated ? 45 : 35, east: 80, south: null, plateau: 60, shore: 100 };
  if (mode === 'zero') for (const id of Object.keys(values)) values[id] = 0;
  if (mode === 'missing') for (const id of Object.keys(values)) values[id] = null;
  if (mode === 'invalid') values.west = -4;
  return values;
}
export const intensitySteps = [
  { label: '0—19', color: 'var(--chart-scale-01)' },
  { label: '20—39', color: 'var(--chart-scale-02)' },
  { label: '40—59', color: 'var(--chart-scale-03)' },
  { label: '60—79', color: 'var(--chart-scale-04)' },
  { label: '80—100', color: 'var(--chart-scale-05)' },
];
export function intensityColor(value) {
  if (value == null) return 'var(--chart-no-data)';
  if (!Number.isFinite(value) || value < 0 || value > 100) throw new RangeError('Intensity must be finite and within 0—100.');
  return intensitySteps[Math.min(4, Math.floor(value / 20))].color;
}
export const goals = [
  { id: 'lesson', label: '微课发布', unit: '节', value: 18, maxValue: 24, color: 'var(--chart-1)' },
  { id: 'reply', label: '评论回复', unit: '条', value: 70, maxValue: 100, color: 'var(--chart-2)' },
  { id: 'followup', label: '回访登记', unit: '项', value: 0, maxValue: 12, color: 'var(--chart-3)' },
  { id: 'coverage', label: '训练站覆盖', unit: '站', value: 6, maxValue: 6, color: 'var(--chart-4)' },
];
export function createGoals(mode = 'normal', updated = false) {
  if (mode === 'empty') return [];
  return goals.map((goal, index) => ({ ...goal, value: mode === 'zero' ? 0 : updated ? [20,82,3,6][index] : goal.value, maxValue: mode === 'invalid' && index === 0 ? 0 : goal.maxValue }));
}
export const validGoals = data => data.every(goal => Number.isFinite(goal.value) && Number.isFinite(goal.maxValue) && goal.maxValue > 0 && goal.value >= 0 && goal.value <= goal.maxValue);
export const validRegions = values => Object.values(values).every(value => value === null || (Number.isFinite(value) && value >= 0 && value <= 100));
