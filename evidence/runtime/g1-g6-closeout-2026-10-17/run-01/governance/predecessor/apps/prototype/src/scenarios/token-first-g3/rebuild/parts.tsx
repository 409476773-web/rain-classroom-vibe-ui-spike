import { useId, useState, type ReactNode } from 'react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, Popover, Tooltip } from '@rain-next/ui';
import { HomeIcon } from '@rain-next/ui/icons/home';
import { CourseIcon } from '@rain-next/ui/icons/course';
import { ResourceIcon } from '@rain-next/ui/icons/resource';
import { ExamLibraryIcon } from '@rain-next/ui/icons/exam-library';
import { LearningStatusIcon } from '@rain-next/ui/icons/learning-status';
import { MembersIcon } from '@rain-next/ui/icons/members';
import { MessageIcon } from '@rain-next/ui/icons/message';
import { Settings3Icon } from '@rain-next/ui/icons/settings-3';
import { RainClassroomIcon } from '@rain-next/ui/icons/rain-classroom';
import { TeacherStudentProfileIcon } from '@rain-next/ui/icons/teacher-student-profile';
import { ArrowDownIcon } from '@rain-next/ui/icons/arrow-down';
import { ArrowUpIcon } from '@rain-next/ui/icons/arrow-up';
import { ArrowRightIcon } from '@rain-next/ui/icons/arrow-right';
import { CollapseIcon } from '@rain-next/ui/icons/collapse';
import { ExpandIcon } from '@rain-next/ui/icons/expand';
import { pages, routeHref, type Route } from './model';
export type NavEntry = { id: string; label: string; href: string; icon?: ReactNode; badge?: string; children?: NavEntry[]; shortLabel?: string };
export type Surface = 'light' | 'dark';
export type RailMode = 'full' | 'icon' | 'short';
export function globalEntries(route: Route): NavEntry[] {
  const icons = { home: <HomeIcon/>, courses: <CourseIcon/>, resources: <ResourceIcon/>, exams: <ExamLibraryIcon/>, analysis: <LearningStatusIcon/>, team: <MembersIcon/>, messages: <MessageIcon/>, settings: <Settings3Icon/> } satisfies Record<keyof typeof pages, ReactNode>;
  return Object.entries(pages).map(([id, label], i) => ({ id, label, shortLabel: ['工作台','课程','资源','考试','数据','团队','消息','设置'][i], href: routeHref(route, { page: id, scene: id === 'courses' ? 'course' : 'platform', unit: '' }), icon: icons[id as keyof typeof pages], badge: id === 'resources' ? '128' : undefined,
    children: id === 'courses' ? [{ id: 'course-content', label: '课程内容', href: routeHref(route, { scene: 'course', page: 'course-content', unit: '' }) }, { id: 'course-overview', label: '课程概览', href: routeHref(route, { scene: 'course', page: 'course-overview', unit: '' }) }] : undefined }));
}
/** Local navigation row: explicit leading/body/trailing and a sibling disclosure. */
export function NavRow({ entry, current, mode = 'full', expanded, onExpandedChange, surface = 'light' }: { entry: NavEntry; current: string; mode?: RailMode; expanded?: boolean; onExpandedChange?: () => void; surface?: Surface }) {
  const childId = useId();
  const active = entry.id === current;
  const within = entry.children?.some(child => child.id === current);
  const link = <a className="nr-link" href={entry.href} aria-current={active ? 'page' : undefined} aria-label={entry.label} title={mode === 'full' ? entry.label : undefined}>
    {entry.icon && <span className="nr-leading" aria-hidden="true">{entry.icon}</span>}
    {mode !== 'icon' && <span className="nr-label">{mode === 'short' ? entry.shortLabel ?? entry.label : entry.label}</span>}
    {entry.badge && mode === 'full' && <span className="nr-count">{entry.badge}</span>}
  </a>;
  return <div className="nr-branch" data-current-within={within || undefined}>
    <div className="nr-row" data-current={active || undefined} data-mode={mode}>
      {mode === 'icon' ? <Tooltip text={entry.label} portal>{link}</Tooltip> : link}
      {entry.children && (mode === 'full' ? <button className="nr-disclosure" type="button" aria-label={`${expanded ? '收起' : '展开'}${entry.label}`} aria-expanded={!!expanded} aria-controls={childId} onClick={onExpandedChange}>{expanded ? <ArrowUpIcon aria-hidden="true"/> : <ArrowDownIcon aria-hidden="true"/>}</button> :
        <Popover.Root><Popover.Trigger className="nr-disclosure" aria-label={`展开${entry.label}`}><ArrowRightIcon aria-hidden="true"/></Popover.Trigger><Popover.Content className="nr-popup" width={256} data-rain-theme={surface} positionerProps={{ side: 'right', align: 'start' }}><Popover.Title>{entry.label}</Popover.Title><nav aria-label={`${entry.label}子入口`}>{entry.children.map(child => <NavRow key={child.id} entry={child} current={current}/>)}</nav></Popover.Content></Popover.Root>)}
    </div>
    {mode === 'full' && entry.children && <div id={childId} className="nr-children" hidden={!expanded}>{entry.children.map(child => <NavRow key={child.id} entry={child} current={current}/>)}</div>}
  </div>;
}
export function NavigationRail({ entries, current, surface = 'dark', mode = 'full', onModeChange, header, footer, label = '全局导航', indicator = 'fill' }: { entries: NavEntry[]; current: string; surface?: Surface; mode?: RailMode; onModeChange?: (mode: RailMode) => void; header?: ReactNode; footer?: ReactNode; label?: string; indicator?: 'fill' | 'edge' }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ courses: true });
  return <Sidebar className="nr-rail" data-rain-theme={surface} data-mode={mode} data-indicator={indicator} aria-label={label} collapsed={mode !== 'full'}>
    <SidebarHeader className="nr-rail-head">{header ?? <a className="nr-brand" href={entries[0]?.href} aria-label="雨课堂教学工作台"><RainClassroomIcon aria-hidden="true"/>{mode === 'full' && <span>雨课堂<small>教学管理</small></span>}</a>}</SidebarHeader>
    <SidebarContent className="nr-rail-content"><div className="nr-group-label">{mode === 'full' ? '教学空间' : '导航'}</div>{entries.map(entry => <NavRow key={entry.id} entry={entry} current={current} mode={mode} surface={surface} expanded={!!expanded[entry.id]} onExpandedChange={() => setExpanded(value => ({ ...value, [entry.id]: !value[entry.id] }))}/>)}</SidebarContent>
    <SidebarFooter className="nr-rail-foot">{onModeChange && <button type="button" className="nr-rail-toggle" aria-label={mode === 'full' ? '收起全局导航' : '展开全局导航'} onClick={() => onModeChange(mode === 'full' ? 'icon' : 'full')}>{mode === 'full' ? <CollapseIcon aria-hidden="true"/> : <ExpandIcon aria-hidden="true"/>}{mode === 'full' && '收起导航'}</button>}{footer ?? <div className="nr-profile"><span className="nr-avatar" aria-hidden="true"><TeacherStudentProfileIcon/></span>{mode === 'full' && <span>林老师<small>教师工作空间</small></span>}</div>}</SidebarFooter>
  </Sidebar>;
}
