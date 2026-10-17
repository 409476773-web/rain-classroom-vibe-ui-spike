import { memo, useState } from 'react';
import { Avatar, avatarAssets, assignAvatarAssets, Button, NavigationTabs, ObjectNavigator, ScopeNavigation, Tag, Textarea, type ScopeNavigationItem } from '@rain-next/ui';
import { ConnectedSurface, PaneSplitter, RecoverableRegion, RegionRestoreTrigger, WorkspaceLayout } from '@rain-next/layouts';
import { ActiveSessionGuard } from './active-session-guard';

// Page-private mock data and state. Public assets own navigation and layout only.
import { Toolbar, sideRegion, workspaceSpec, type WidthProps } from './workbench-parts';

export const courseScopes: readonly ScopeNavigationItem[] = [
  { id: 'shared', label: '公共资源包', description: '所有教学班共享 | 12项资料' },
  ...Array.from({ length: 240 }, (_, index) => {
    const n = index + 1, serial = String(n).padStart(3, '0');
    return { id: `class-${serial}`, label: n === 199 || n === 200 ? '同名跨学院联合班' : `跨学科项目课程：人工智能、教育创新与可持续城市设计 · ${serial}班`, description: `教学班 ${serial} | ${24 + n % 18}人 | ${n === 238 ? '已归档' : '2026秋季'}`, disabled: n === 238 };
  }),
];
const resourceRows = [
  ['项目任务书：校园微气候与公共空间设计', '任务书', '教师团队', '2026-09-29'],
  ['证据采集表与访谈记录模板', '资料模板', '课程负责人', '2026-09-28'],
  ['第一阶段文献导读与实验安全说明', '阅读材料', '教师团队', '2026-09-25'],
];
export function CourseResources({ active = true }: { active?: boolean } = {}) {
  const [scope, setScope] = useState('shared'), [removed, setRemoved] = useState<string[]>([]), [drafts, setDrafts] = useState<Record<string, string>>({});
  const current = courseScopes.find(item => item.id === scope)!;
  return <section className="w6-course" data-rain-id="local-navigation-w6-e1" data-scope-id={scope}>
    <header className="w6-page-heading"><div><p>跨学科项目课程 · 2026秋季</p><h1>课程资源管理</h1></div><span>公共资源包 + 240个教学班 · 模拟数据</span>{removed.includes(scope) && <Button variant="tertiary" size="small" onClick={() => setRemoved(previous => previous.filter(id => id !== scope))}>恢复刚移除的班级</Button>}</header>
    <ScopeNavigation key={active ? 'active-range-session' : 'inactive-range-session'} aria-label="课程资源范围" items={courseScopes.filter(item => !removed.includes(item.id))} value={scope} onValueChange={setScope} visibleLimit={4}
      renderSurface={({ track, panels }) => <ConnectedSurface instanceId="w6-e1-scope" activeKey={scope} track={track}>{panels}</ConnectedSurface>}>
      <article className="w6-content" data-testid="scope-editor"><div className="w6-section-heading"><h2>{current.label}资源</h2><Button variant="tertiary" size="small" disabled={scope === 'shared' || removed.includes(scope)} onClick={() => setRemoved(previous => [...previous, scope])}>移除当前班级</Button></div>
        <div className="w6-scope-facts" aria-label="当前资源范围信息"><Tag size={20} color={scope === 'shared' ? 'brand' : 'neutral'}>{scope === 'shared' ? '公共资源包' : '教学班'}</Tag><div className="w6-inline-facts">{current.description?.split(' | ').map(part => <span key={part}>{part}</span>)}</div></div><p className="w6-scope-note">范围切换保留各自的说明草稿。</p>
        <table className="w6-table"><thead><tr>{['资源名称', '类型', '维护人', '更新日期'].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{resourceRows.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{index === 1 ? <Tag size={20} color={cell === '任务书' ? 'assignment' : cell === '资料模板' ? 'paper' : 'courseware'}>{cell}</Tag> : cell}</td>)}</tr>)}</tbody></table>
        <label className="w6-field">资源说明草稿<Textarea aria-label="资源说明草稿" value={drafts[scope] ?? ''} onValueChange={value => setDrafts(previous => ({ ...previous, [scope]: value }))} placeholder="填写当前范围的本地说明" /></label>
      </article>
    </ScopeNavigation>
  </section>;
}

const interactionSpec = workspaceSpec('interaction', 'E2', [sideRegion('activities', '课堂活动', 'start', 230), sideRegion('groups', '小组列表', 'start', 230)], 400);
const activities = [
  { id: 'discussion', label: '证据分析讨论', description: '从观测数据判断原因', participation: '3组已提交', category: 'classroom', type: '讨论', title: '为什么广场午后更热？', claim: '遮阴与地面材质共同影响局部微气候，增加树冠覆盖是值得验证的改善方向。', evidence: '我们比较了广场、林荫道与建筑阴影下的地表温度。三处样本在相同时间、相同高度采集，广场的地表温度持续较高。', nextStep: '统一测量时间，补充风速与湿度记录，区分天气变化和场地本身的影响。' },
  { id: 'vote', label: '方案投票', description: '比较公共空间改善方案', participation: '15人参与', category: 'classroom', type: '投票', title: '投票选择：增加树冠覆盖', claim: '优先增加步行路径上的树冠覆盖，在改善热舒适的同时保留公共活动空间。', evidence: '15位成员完成了方案比较。三个小组都将遮阴效果、实施成本与场地可达性列为主要判断依据。', nextStep: '在方案图上标明遮阴时段，并比较新增树木与遮阳构筑物的维护成本。' },
  { id: 'reflection', label: '课后反思', description: '复盘观察与推论的关系', participation: '15份反思', category: 'after-class', type: '反思', title: '从观察到可验证的假设', claim: '观察记录支持了初步判断，但需要更完整的变量控制才能形成可靠结论。', evidence: '成员分别回顾了数据采集、资料检索与方案表达过程，发现测量时间和湿度记录仍有缺口。', nextStep: '将发现整理为新的实验假设，并写明下一轮采样需要控制的变量。' },
];
// E2-only fixture: persistent people belong to a group; activity choices do not reassign them.
const interactionGroups = [
  { id: 'g1', label: '第一研究组', score: 8, members: [
    { id: 'e2-student-001', name: '李南', studentNumber: '2026030101', role: '证据整理' },
    { id: 'e2-student-002', name: '周岚', studentNumber: '2026030102', role: '实地测量' },
    { id: 'e2-student-003', name: '唐远', studentNumber: '2026030103', role: '方案表达' },
    { id: 'e2-student-004', name: '叶青', studentNumber: '2026030104', role: '文献检索' },
  ] },
  { id: 'g2', label: '第二研究组', score: 7, members: [
    { id: 'e2-student-005', name: '陈晓', studentNumber: '2026030105', role: '协作统筹' },
    { id: 'e2-student-006', name: '林越', studentNumber: '2026030106', role: '实地测量' },
    { id: 'e2-student-007', name: '赵宁', studentNumber: '2026030107', role: '数据分析' },
    { id: 'e2-student-008', name: '宋禾', studentNumber: '2026030108', role: '文献检索' },
    { id: 'e2-student-009', name: '许言', studentNumber: '2026030109', role: '方案表达' },
  ] },
  { id: 'g3', label: '第三研究组', score: 6, members: [
    { id: 'e2-student-010', name: '王珂', studentNumber: '2026030110', role: '协作统筹' },
    { id: 'e2-student-011', name: '何雨', studentNumber: '2026030111', role: '实地测量' },
    { id: 'e2-student-012', name: '陆川', studentNumber: '2026030112', role: '证据整理' },
    { id: 'e2-student-013', name: '郑语', studentNumber: '2026030113', role: '数据分析' },
    { id: 'e2-student-014', name: '吴桐', studentNumber: '2026030114', role: '文献检索' },
    { id: 'e2-student-015', name: '沈晨', studentNumber: '2026030115', role: '方案表达' },
  ] },
];
const interactionPortraits = assignAvatarAssets(interactionGroups.flatMap(group => group.members.map(member => member.id)), 'student');
export function ClassroomInteraction({ viewportWidth, active = true }: WidthProps = {}) {
  const [activity, setActivity] = useState('discussion'), [group, setGroup] = useState('discussion-g1'), [drafts, setDrafts] = useState<Record<string, string>>({});
  const current = activities.find(item => item.id === activity)!;
  const selected = interactionGroups.find(item => `${activity}-${item.id}` === group)!;
  const groups = interactionGroups.map(item => ({ id: `${activity}-${item.id}`, label: item.label, description: `${item.members.length}位成员`, count: `${item.score}/10`, status: <Tag size={20} color={activity === 'vote' ? 'brand' : 'olive'}>{activity === 'vote' ? '已投票' : '已提交'}</Tag> }));
  return <WorkspaceLayout spec={interactionSpec} viewportWidth={viewportWidth} className="w6-workspace w6-interaction-workspace" data-rain-id-consumer="local-navigation-w6-e2"
    toolbar={<Toolbar title="校园微气候项目 · 课堂互动" regions={['activities', 'groups']} />}>
    <ActiveSessionGuard active={active} />
    <RecoverableRegion regionId="activities" className="w6-pane w6-activity-pane"><header className="w6-panel-heading"><span className="w6-panel-eyebrow">选择活动</span><h2>课堂活动</h2></header><div role="group" aria-label="课堂活动对象" className="w6-activity-groups">{[{ id: 'classroom', title: '课堂内', description: '讨论与即时反馈' }, { id: 'after-class', title: '课后', description: '复盘与延伸' }].map(category => <section className="w6-activity-category" key={category.id}><div className="w6-activity-category-heading"><h3>{category.title}</h3><span>{category.description}</span></div><ObjectNavigator aria-label={category.id === 'classroom' ? '课堂内活动' : '课后活动'} appearance="cards" content="info" items={activities.filter(item => item.category === category.id).map(item => ({ id: item.id, label: item.label, description: item.description, meta: <><Tag size={20} color={item.type === '反思' ? 'purple' : item.type === '投票' ? 'brand' : 'classroom'}>{item.type}</Tag><span>{item.participation}</span></> }))} value={current.category === category.id ? activity : null} onValueChange={id => { setActivity(id); setGroup(`${id}-g1`); }} /></section>)}</div></RecoverableRegion><PaneSplitter regionId="activities" />
    <RecoverableRegion regionId="groups" className="w6-pane w6-group-pane"><header className="w6-panel-heading"><span className="w6-panel-eyebrow">查看提交</span><div className="w6-group-heading"><h2>参与小组</h2><span>{interactionGroups.length}组</span></div><p>{current.label}</p></header><ObjectNavigator aria-label="小组对象" appearance="queue" content="identity" items={groups} value={group} onValueChange={setGroup} /></RecoverableRegion><PaneSplitter regionId="groups" />
    <article className="w6-main w6-interaction-main" data-testid="interaction-identity" data-activity-id={activity} data-group-id={group}>
      <header className="w6-interaction-summary"><div className="w6-interaction-title-row"><h1>{selected.label} · {current.label}</h1><Tag size={20} color={activity === 'vote' ? 'brand' : 'olive'}>{activity === 'vote' ? '已投票' : '已提交'}</Tag></div><div className="w6-interaction-kicker"><Tag size={20} color={current.category === 'after-class' ? 'purple' : 'classroom'}>{current.category === 'after-class' ? '课后活动' : '课堂内活动'}</Tag><div className="w6-inline-facts"><span>{selected.members.length}位成员</span><span>当前成绩 {selected.score}/10</span><span>模拟记录</span></div></div></header>
      <NavigationTabs aria-label="小组详情内容" defaultValue="submission" items={[
        { value: 'submission', label: '小组提交', content: <section className="w6-interaction-submission"><div className="w6-submission-viewpoint"><span className="w6-panel-eyebrow">小组观点</span><h2>{current.title}</h2><p>{current.claim}</p></div><dl className="w6-submission-evidence"><div><dt>观察依据</dt><dd>{current.evidence}</dd></div><div><dt>下一步验证</dt><dd>{current.nextStep}</dd></div></dl></section> },
        { value: 'members', label: '小组成员', content: <section className="w6-interaction-members"><div className="w6-members-heading"><h2>成员与分工</h2><span>{selected.members.length}位成员 · 校园微气候项目</span></div><ul aria-label={`${selected.label}成员`} className="w6-member-list">{selected.members.map(member => <li key={member.id} data-member-id={member.id} data-student-number={member.studentNumber}><Avatar size={32} src={avatarAssets[interactionPortraits[member.id] ?? 'default']} alt="" /><div className="w6-member-identity"><strong>{member.name}</strong><span>{member.studentNumber}</span></div><span className="w6-member-role" data-member-role>{member.role}</span></li>)}</ul></section> },
      ]} />
      <label className="w6-field w6-interaction-feedback"><span className="w6-feedback-heading"><strong>教师反馈草稿</strong><span>仅当前小组</span></span><Textarea aria-label="课堂反馈草稿" appearance="filled" rows={3} placeholder="结合小组提交与分工，记录具体的反馈建议" value={drafts[group] ?? ''} onValueChange={value => setDrafts(previous => ({ ...previous, [group]: value }))} /></label>
    </article>
  </WorkspaceLayout>;
}

export { GradingWorkbench } from './grading-workbench';
export { ReplayWorkbench } from './replay-workbench';

const directory = [{ id: 'overview', label: '项目概览', description: '目标与约定 · 2页' }, { id: 'method', label: '实验方法', description: '采样、变量与工具 · 6页' }, { id: 'evidence', label: '证据汇总', description: '观察表与访谈 · 8页' }, { id: 'results', label: '结果讨论', description: '结论与局限 · 3页' }];
const IsolationPane = memo(function IsolationPane({ id, compact, viewportWidth, active }: { id: 'A' | 'B'; compact: boolean; viewportWidth?: number; active: boolean }) {
  const [selected, setSelected] = useState('overview'), [draft, setDraft] = useState('');
  const [spec] = useState(() => workspaceSpec('isolation', `E5-${id}`, [sideRegion(`directory-${id}`, '资料目录', 'start', 220)], 220));
  return <section aria-label={`实例 ${id}`} data-instance-id={`w6-E5-${id}`} data-directory-density={compact ? 'compact' : 'regular'} className="w6-isolation-instance">
    <WorkspaceLayout spec={spec} viewportWidth={viewportWidth} className="w6-workspace w6-workspace-paired" toolbar={<header className="w6-workspace-toolbar"><strong>项目资料审阅 · 实例 {id}</strong><RegionRestoreTrigger regionId={`directory-${id}`} /></header>}>
      <ActiveSessionGuard active={active} />
      <RecoverableRegion regionId={`directory-${id}`} className="w6-pane w6-directory"><h2>资料目录</h2><ObjectNavigator aria-label={`实例 ${id} 目录对象`} appearance="queue" content="info" items={directory} value={selected} onValueChange={setSelected} /></RecoverableRegion><PaneSplitter regionId={`directory-${id}`} />
      <article className="w6-main"><h2>{directory.find(item => item.id === selected)!.label}</h2><p className="w6-reading">审阅目标、实验步骤与证据之间的关系。此目录与草稿只属于当前实例。</p><label className="w6-field">审阅说明<Textarea aria-label={`实例 ${id} 草稿`} value={draft} onValueChange={setDraft} /></label></article>
    </WorkspaceLayout>
  </section>;
});
export function InstanceIsolation({ viewportWidth, active = true }: WidthProps = {}) {
  const [compact, setCompact] = useState(false);
  return <section className="w6-isolation"><header className="w6-page-heading"><div><h1>并行资料审阅</h1><p>两个独立目录与本地草稿</p></div><Button variant="tertiary" size="medium" aria-pressed={compact} onClick={() => setCompact(value => !value)}>{compact ? '恢复实例 A 默认目录' : '仅当前实例 A 使用紧凑目录'}</Button></header><div className="w6-pair"><IsolationPane id="A" compact={compact} viewportWidth={viewportWidth} active={active} /><IsolationPane id="B" compact={false} viewportWidth={viewportWidth} active={active} /></div></section>;
}
