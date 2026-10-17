/** Local fixture only. No public API, persistence or resource inheritance engine. */
export type Scene = 'platform' | 'course' | 'tools' | 'commands' | 'lab';
export type Route = { scene: Scene; page: string; course: string; scope: string; unit: string; recipe: string; view: string; count: number };
export const pages = { home: '教学工作台', courses: '课程建设', resources: '资源中心', exams: '考试管理', analysis: '学习数据与教学质量分析', team: '团队协作', messages: '消息中心', settings: '设置' };
export const courses = { math: '高等数学 A', physics: '大学物理 · 跨学院创新实验与工程实践课程' };
export function readRoute(hash: string): Route {
  const q = new URLSearchParams(hash.split('?')[1] ?? '');
  const scene = q.get('scene') ?? 'platform';
  return { scene: ['platform', 'course', 'tools', 'commands', 'lab'].includes(scene) ? scene as Scene : 'platform', page: q.get('page') ?? 'exams', course: q.get('course') === 'physics' ? 'physics' : 'math', scope: q.get('scope') ?? 'package', unit: q.get('unit') ?? '', recipe: q.get('recipe') ?? 'S01', view: q.get('view') ?? 'page', count: [0, 1, 4, 12, 200].includes(Number(q.get('count'))) && q.has('count') ? Number(q.get('count')) : 4 };
}
export function routeHref(route: Route, patch: Partial<Route> = {}) {
  const next = { ...route, ...patch };
  const q = new URLSearchParams({ rebuild: '1' });
  for (const [key, value] of Object.entries(next)) if (value !== '') q.set(key, String(value));
  return `#token-first-g3?${q}`;
}
export type ClassItem = { id: string; name: string; semester: string; available: boolean };
export function classItem(index: number): ClassItem {
  return { id: `class-${String(index).padStart(4, '0')}`, name: index === 2 ? '智能制造与工程创新跨学院联合实验班' : index === 3 ? '高等数学 1 班' : `高等数学 ${index} 班`, semester: index === 3 ? '2025 秋季' : '2026 秋季', available: index !== 12 };
}
export function queryClasses({ count, query, cursor }: { count: number; query: string; cursor: number }) {
  // ponytail: synchronous generated fixture scans the sample; replace with the same paged API when a backend exists.
  const all = Array.from({ length: Math.max(0, count) }, (_, i) => classItem(i + 1)).filter(item => `${item.name} ${item.semester} ${item.id}`.includes(query.trim()));
  const start = Math.max(0, cursor);
  return { query, cursor: start, items: all.slice(start, start + 20), nextCursor: start + 20 < all.length ? start + 20 : null, total: all.length };
}
export const recipes = [
  ['S01','深色贴边','platform','全局 平台 深色'], ['S02','浅色贴边','platform','全局 低干扰 浅色'], ['S04','图标收起','platform','全局 收起 子入口'],
  ['S05','窄轨＋次级栏','course','课程 全局 分层'], ['S06','内嵌主区','platform','内嵌 工作区'], ['S08','上下文抬头','course','课程 父级 切换'],
  ['N01','文字＋指示线','course','顶部 链接'], ['N02','柔和圆角块','course','顶部 链接'], ['N03','紧凑展开','tools','展开 二级'], ['N04','图标＋说明','tools','富链接 AI'],
  ['M01','无框命令栏','commands','命令 编辑'], ['M02','细边框命令栏','commands','命令 嵌入'],
] as const;
