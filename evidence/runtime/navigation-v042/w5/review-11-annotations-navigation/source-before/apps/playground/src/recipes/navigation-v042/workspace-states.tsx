import { useMemo, useState, type ReactNode } from 'react';
import { Avatar, Button, Checkbox, NavigationList, NavigationTabs, Popover, Tag, defineRainLocalRecipe } from '@rain-next/ui';
import { WorkspaceLayout, RecoverableRegion, RegionRestoreTrigger, PaneSplitter, useWorkspaceLayout, createWorkspaceKey, type RibbonMode, type WorkspaceRegionSpec, type WorkspaceSpec, type WorkspaceStorage } from '@rain-next/layouts';
import { RainClassroomIcon } from '@rain-next/ui/icons/rain-classroom';
import { HomeIcon } from '@rain-next/ui/icons/home';
import { CourseIcon } from '@rain-next/ui/icons/course';
import { FolderIcon } from '@rain-next/ui/icons/folder';
import { GraduationCapIcon } from '@rain-next/ui/icons/graduation-cap';
import { MembersIcon } from '@rain-next/ui/icons/members';
import { PinIcon } from '@rain-next/ui/icons/pin';
import { CollapseIcon } from '@rain-next/ui/icons/collapse';
import { ExpandIcon } from '@rain-next/ui/icons/expand';
import { CloseIcon } from '@rain-next/ui/icons/close';
import { LayoutSplitIcon } from '@rain-next/ui/icons/layout-split';
import { Settings3Icon } from '@rain-next/ui/icons/settings-3';
import { EditorBoldIcon } from '@rain-next/ui/icons/editor-bold';
import { RefreshIcon } from '@rain-next/ui/icons/refresh';
import { HelpIcon } from '@rain-next/ui/icons/help';
import { NotificationIcon } from '@rain-next/ui/icons/notification';
import { HistoryBackIcon } from '@rain-next/ui/icons/history-back';
import { R1Recipe, R3Recipe, type WorkspaceRecipeOverrides } from './r1-r3';
import { R4Recipe, R5Recipe, R6Recipe } from './r4-r6';
import './workspace-states.css';

export type WorkspaceStateScene = 'S1' | 'S2' | 'S3' | 'S4' | 'S5' | 'S6';
const sceneTitles: Record<WorkspaceStateScene, string> = { S1: '软件工程专业', S2: '错题集 · 1.2 极限与连续', S3: '课程教学协作空间', S4: '辩论赛：大学校园是否应该免费开放', S5: '角色冲突 · 教学设计', S6: '课堂回顾 · 第九章' };
const sceneContexts: Record<WorkspaceStateScene, string> = { S1: '专业导航', S2: '资源目录', S3: '工作区', S4: '课堂功能', S5: '课程导航', S6: '回顾列表' };
const sceneSubtitles: Record<WorkspaceStateScene, string> = { S1: '课程体系诊断', S2: '第一章 / 学习目录', S3: '学习反馈 / 反馈表单', S4: '课堂互动 / 小组讨论', S5: '备课工作区 / 社会学概论', S6: '电路原理 / 课堂回顾' };
const iconRecipe = defineRainLocalRecipe({ id: 'navigation-v042-workspace-icon', scope: 'feature', origin: 'ui-button', classes: { root: 'nv44-icon-button', label: 'nv44-icon-part' }, modifiedParts: ['root', 'label'], candidateTokens: [], promotionStatus: 'not-proposed' } as const);
const toolbarRecipe = defineRainLocalRecipe({ id: 'navigation-v042-workspace-toolbar', scope: 'feature', origin: 'ui-button', classes: { root: 'nv44-toolbar-button', label: 'nv44-toolbar-part', 'leading-icon': 'nv44-toolbar-part', 'trailing-icon': 'nv44-toolbar-part' }, modifiedParts: ['root', 'label', 'leading-icon', 'trailing-icon'], candidateTokens: [], promotionStatus: 'not-proposed' } as const);
const documentTagRecipe = defineRainLocalRecipe({ id: 'navigation-v042-document-tag', scope: 'feature', origin: 'ui-tag', classes: { root: 'nv44-editor-tag' }, modifiedParts: ['root'], candidateTokens: [], promotionStatus: 'not-proposed' } as const);
const layoutMenuRecipe = defineRainLocalRecipe({ id: 'navigation-v042-layout-menu', scope: 'feature', origin: 'ui-popover', classes: { content: 'nv44-layout-menu' }, modifiedParts: ['content'], candidateTokens: [], promotionStatus: 'not-proposed' } as const);
const menuButtonRecipe = defineRainLocalRecipe({ id: 'navigation-v042-layout-menu-button', scope: 'feature', origin: 'ui-button', classes: { root: 'nv44-menu-button' }, modifiedParts: ['root'], candidateTokens: [], promotionStatus: 'not-proposed' } as const);
const ribbonRecipe = defineRainLocalRecipe({ id: 'navigation-v042-ribbon-tabs', scope: 'feature', origin: 'ui-tabs', classes: { root: 'nv44-ribbon-tabs', nav: 'nv44-ribbon-nav', list: 'nv44-ribbon-list', tab: 'nv44-ribbon-tab', panel: 'nv44-ribbon-panel' }, modifiedParts: ['root', 'nav', 'list', 'tab', 'panel'], candidateTokens: [], promotionStatus: 'not-proposed' } as const);
const platformItems = ['工作台', '课程', '资源', '专业'].map((label, index) => ({ id: ['home', 'course', 'resource', 'major'][index]!, label, href: '#navigation-v042', icon: [<HomeIcon/>, <CourseIcon/>, <FolderIcon/>, <GraduationCapIcon/>][index] }));
const region = (id: string, label: string, width: number, minWidth: number, maxWidth: number, priority: number, extra: Partial<WorkspaceRegionSpec> = {}): WorkspaceRegionSpec => ({ id, label, side: 'start', allowedModes: ['expanded', 'hidden'], defaultMode: 'expanded', minWidth, defaultWidth: width, maxWidth, boundaryWidth: 5, adaptationPriority: priority, restoreOwnerId: 'workspace-toolbar', ...extra });

/** The immutable reference's widths are recipe data. Compact is restricted to identifiable global icons. */
export function createNavigationWorkspaceSpec(scene: WorkspaceStateScene, instanceId: string, variant: 'interaction' | 'grading' = 'interaction'): WorkspaceSpec {
  const global = region('global', '平台导航', 208, 184, 240, 0, { allowedModes: ['expanded', 'compact', 'hidden'], compactWidth: 64, defaultMode: scene === 'S1' ? 'expanded' : 'compact' });
  const context = region('context', sceneContexts[scene], scene === 'S2' ? 260 : scene === 'S4' ? 164 : 216, scene === 'S4' ? 152 : 176, 320, 1, { defaultMode: scene === 'S3' ? 'hidden' : 'expanded' });
  let regions: WorkspaceRegionSpec[];
  if (scene === 'S4' && variant === 'grading') regions = [region('queue', '学生列表', 240, 212, 320, 1, { boundaryWidth:10 }), region('review', '批改面板', 304, 280, 380, 2, { side: 'end', boundaryWidth:10 })];
  else if (scene === 'S6') regions = [global, region('events', '回顾列表', 228, 200, 320, 1), region('knowledge', '知识要点', 296, 264, 380, 2, { side: 'end' })];
  else regions = [global, context, ...(scene === 'S3' ? [region('directory', '内部目录', 190, 160, 280, 2), region('fields', '编辑工具', 188, 164, 260, 3)] : scene === 'S4' ? [region('queue', '小组列表', 240, 212, 320, 2)] : scene === 'S5' ? [region('ribbon', '文档工具', 1, 1, 1, 0, { side: 'top', allowedModes: ['full', 'icons', 'tabs', 'hidden'], defaultMode: 'full', boundaryWidth: 0 })] : [])];
  return { workspaceKey: createWorkspaceKey({ userScope: 'mock-review', workspaceId: 'rain-navigation-v042', subsceneId: `${scene}-${variant}`, instanceId }), regions, stableRestoreOwnerIds: ['workspace-toolbar'], minMainWidth: scene === 'S3' ? 620 : scene === 'S4' && variant === 'grading' ? 510 : 560 };
}

function IconButton({ label, children, onClick, active = false }: { label: string; children: ReactNode; onClick: () => void; active?: boolean }) { return <Button variant="text" size="small" localRecipe={iconRecipe} title={label} aria-label={label} aria-pressed={active} data-workspace-action="region" onClick={onClick}>{children}</Button>; }
function PaneHeader({ regionId, brand = false }: { regionId: string; brand?: boolean }) {
  const { spec, state, effective, dispatch, viewportWidth } = useWorkspaceLayout(), pane = spec.regions.find(item => item.id === regionId)!, temporary = state.session.temporary?.regionId === regionId;
  const mode = effective.regions[regionId]!.mode, compact = mode === 'compact' && !temporary;
  return <header className="nv44-pane-head" data-compact={String(compact)}>{brand ? <span className="nv44-brand"><RainClassroomIcon size={23}/><strong>雨课堂</strong></span> : <strong>{pane.label}</strong>}
    {!brand && <small className="nv44-pane-status">{temporary ? '临时' : effective.regions[regionId]!.forced ? '自适应' : '常驻'}</small>}
    {brand && !temporary ? <IconButton label={compact ? '展开平台导航' : '收起为图标'} onClick={() => dispatch({ type: 'TOGGLE_GLOBAL', regionId, viewportWidth })}>{compact ? <ExpandIcon size={18}/> : <CollapseIcon size={18}/>}</IconButton>
      : <IconButton label={temporary ? `保持${pane.label}展开` : `取消${pane.label}固定`} active={temporary} onClick={() => dispatch({ type: temporary ? 'PIN_TEMP' : 'UNPIN', regionId, viewportWidth })}><PinIcon size={16}/></IconButton>}
    <IconButton label={`隐藏${pane.label}`} onClick={() => dispatch({ type: 'HIDE_REGION', regionId })}><CloseIcon size={16}/></IconButton>
  </header>;
}

function RestoreBar({ scene, hover, onHoverChange, identity }: { scene: WorkspaceStateScene; hover: boolean; onHoverChange: (value: boolean) => void; identity?: { title: string; subtitle: string } }) {
  const { spec, state, effective, dispatch, viewportWidth } = useWorkspaceLayout();
  const modeLabels: Record<string, string> = { expanded: '展开', compact: '图标', hidden: '隐藏', full: '完整', icons: '图标', tabs: '仅标签' };
  return <header className="nv44-restorebar" aria-label="当前工作区与区域恢复"><div className="nv44-restores" aria-label="显示与隐藏区域">
    {spec.regions.map(pane => {
      const temporary = state.session.temporary?.regionId === pane.id || state.session.ribbonTemporary === pane.id;
      return <RegionRestoreTrigger key={pane.id} regionId={pane.id} intent="peek" className="nv44-restore-control">{pane.side === 'top' ? <Settings3Icon size={16}/> : <LayoutSplitIcon size={16}/>}<span className="nv44-restore-label">{temporary ? `关闭${pane.label}` : effective.regions[pane.id]!.mode === 'hidden' ? `显示${pane.label}` : pane.label}</span></RegionRestoreTrigger>;
    })}
  </div><span className="nv44-bar-separator"/><div className="nv44-identity"><strong>{identity?.title ?? sceneTitles[scene]}</strong><small>{identity?.subtitle ?? sceneSubtitles[scene]}</small></div><span className="nv44-spacer"/>
    <Button variant="tertiary" size="small" localRecipe={toolbarRecipe} leadingIcon={<ExpandIcon size={16}/>} data-workspace-action="focus" aria-label={state.session.focused ? '退出专注' : '专注内容'} title={state.session.focused ? '退出专注' : '专注内容'} aria-pressed={state.session.focused} onClick={() => dispatch({ type: state.session.focused ? 'EXIT_FOCUS' : 'ENTER_FOCUS' })}>{state.session.focused ? '退出专注' : '专注内容'}</Button>
    <Popover.Root><Popover.Trigger className="nv44-layout-trigger" data-workspace-action="layout" aria-label="布局设置" title="布局设置"><Settings3Icon size={17}/><span>布局</span></Popover.Trigger><Popover.Content localRecipe={layoutMenuRecipe} width={320} positionerProps={{ align: 'end', collisionPadding: 8 }}>
      <Popover.Title>布局与显示</Popover.Title><Popover.Description className="nv44-layout-description">按当前任务保留常用区域。</Popover.Description>
      {spec.regions.map(pane => <label className="nv44-menu-row" key={pane.id}><span>{pane.label}</span><select aria-label={`${pane.label}显示模式`} value={(state.session.focusOverrides[pane.id] ?? state.preferences[pane.id])!.mode} onChange={event => dispatch(pane.side === 'top' ? { type: 'SET_RIBBON', regionId: pane.id, mode: event.target.value as RibbonMode } : { type: 'SET_MODE', regionId: pane.id, mode: event.target.value as 'expanded' | 'compact' | 'hidden' })}>{pane.allowedModes.map(mode => <option key={mode} value={mode}>{modeLabels[mode]}</option>)}</select></label>)}
      <label className="nv44-menu-row"><span>悬停临时查看</span><Checkbox checked={hover} aria-label="悬停临时查看" onCheckedChange={checked => onHoverChange(checked === true)}/></label>
      <footer className="nv44-menu-footer"><Button size="small" variant="tertiary" localRecipe={menuButtonRecipe} onClick={() => { onHoverChange(false); dispatch({ type: 'SWITCH_CONTEXT', spec }); }}>恢复默认</Button><Button size="small" variant="tertiary" localRecipe={menuButtonRecipe} onClick={() => spec.regions.filter(pane => pane.allowedModes.includes('hidden')).forEach(pane => dispatch({ type: 'HIDE_REGION', regionId: pane.id }))}>隐藏全部区域</Button></footer>
      <span className="nv44-sr-only">工作区可用宽度 {Math.round(viewportWidth)}</span>
    </Popover.Content></Popover.Root>
  </header>;
}

function GlobalPane({ active, onActive, onNotice, inverse }: { active: string; onActive: (id: string) => void; onNotice: (message: string) => void; inverse?: boolean }) { return <RecoverableRegion regionId="global" className="nv44-global" data-rain-theme={inverse?'dark':undefined} header={<PaneHeader regionId="global" brand/>}>{({ effective, temporary }) => <><NavigationList className="nv44-platform-links" appearance={effective.mode === 'compact' && !temporary ? 'icons' : 'inset'} aria-label="平台导航" activeId={active} items={platformItems} onNavigate={(id, event) => { event.preventDefault(); onActive(id); onNotice('平台入口为本地示例；当前文档与草稿保留。'); }}/><footer className="nv44-global-foot"><Avatar size={32} alt="" className="nv44-avatar"/><span className="nv44-account-label">林老师</span><IconButton label="通知" onClick={() => onNotice('通知为本地入口示例；未读取消息服务。')}><NotificationIcon size={17}/></IconButton><IconButton label="帮助" onClick={() => onNotice('当前样板支持布局恢复、工具区切换与本地草稿编辑。')}><HelpIcon size={17}/></IconButton></footer></>}</RecoverableRegion>; }
function DocumentContext() {
  const [destination, setDestination] = useState('objective');
  const items = ['教学目标', '知识与案例', '课堂活动', '评价与反馈'].map((label, index) => ({ id: ['objective','knowledge','activity','feedback'][index]!, label, href:'#navigation-v042', icon:[<GraduationCapIcon size={16}/>,<CourseIcon size={16}/>,<MembersIcon size={16}/>,<GraduationCapIcon size={16}/>][index] }));
  return <RecoverableRegion regionId="context" className="nv44-context" header={<PaneHeader regionId="context"/>}><div className="nv44-context-card"><h4>备课工作区</h4><p>社会学概论 · 第三章</p></div><div className="nv44-nav-group-title">本节内容</div><NavigationList aria-label="本节内容" items={items} activeId={destination} onNavigate={(id,event)=>{event.preventDefault();setDestination(id);}}/><small className="nv44-footnote">文档为本地演示，不发布课程</small></RecoverableRegion>;
}
function DocumentHeader({ onNotice }: { onNotice: (message: string) => void }) { return <header className="nv44-workspace-head" data-scene="S5"><strong>角色冲突 · 教学设计</strong><span className="nv44-spacer"/><small>仅本地演示</small><Button size="small" variant="tertiary" localRecipe={toolbarRecipe} leadingIcon={<HistoryBackIcon/>} onClick={() => onNotice('版本记录为本地入口示例；未读取或保存文档版本。')}>版本记录</Button></header>; }


function Ribbon({ onCommand }: { onCommand: (command: string) => void }) {
  const { state, effective, dispatch } = useWorkspaceLayout(), [group, setGroup] = useState('start');
  const mode = effective.regions.ribbon!.mode, temporary = state.session.ribbonTemporary === 'ribbon';
  const commands = group === 'start' ? [['bold', '加粗目标'], ['highlight', '突出重点'], ['clear', '清除样式']] : group === 'insert' ? [['append', '插入示例'], ['note', '添加说明'], ['attachment', '插入附件']] : [['check', '检查目标'], ['comment', '查看批注'], ['reference', '对照原文']];
  const tools = <div className="nv44-ribbon-tools">{commands.map(([id, label], index) => <button key={id} type="button" onClick={() => onCommand(id!)} aria-label={label}><span aria-hidden="true">{index === 0 ? <EditorBoldIcon size={19}/> : index === 1 ? <Settings3Icon size={19}/> : <RefreshIcon size={19}/>}</span><span>{label}</span></button>)}<span className="nv44-ribbon-divider"/><div className="nv44-ribbon-hint">只作用于本页演示内容</div></div>;
  return <RecoverableRegion regionId="ribbon" className="nv44-ribbon" topHeights={{ full: 111, icons: 83, tabs: 41, hidden: 0 }} topTemporaryHeight={112} aria-label="文档工具区" onClickCapture={event => {
    const tab = event.target instanceof Element ? event.target.closest('[role="tab"]') : null;
    if (tab && event.currentTarget.contains(tab) && tab.getAttribute('aria-disabled') !== 'true' && !tab.hasAttribute('disabled') && (mode === 'tabs' || mode === 'hidden')) dispatch({ type: 'OPEN_RIBBON_TEMP', regionId: 'ribbon' });
  }}>
    <NavigationTabs aria-label="工具分类" value={group} onValueChange={value => { if (typeof value === 'string') setGroup(value); }} localRecipe={ribbonRecipe}
      items={[{ value: 'start', label: '开始', content: tools }, { value: 'insert', label: '插入', content: tools }, { value: 'review', label: '审阅', content: tools }]} extraEnd={<>{temporary && <IconButton label="保持工具展开" onClick={() => dispatch({ type: 'SET_RIBBON', regionId: 'ribbon', mode: 'full' })}><PinIcon size={16}/></IconButton>}<IconButton label="收起工具区" onClick={() => dispatch(temporary ? { type: 'DISMISS_TEMP', reason: 'close' } : { type: 'SET_RIBBON', regionId: 'ribbon', mode: 'tabs' })}><CloseIcon size={16}/></IconButton></>}/>
  </RecoverableRegion>;
}

function DocumentMain({ draft, onDraft, onNotice }: { draft: string; onDraft: (value: string) => void; onNotice: (message: string) => void }) {
  const [bold, setBold] = useState(false), [highlight, setHighlight] = useState(false);
  const command = (id: string) => { if (id === 'bold') setBold(value => !value); else if (id === 'highlight') setHighlight(value => !value); else if (id === 'clear') { setBold(false); setHighlight(false); } else if (id === 'append') onDraft(`${draft}\n情境示例：当课程任务与团队活动冲突时，识别不同角色的期待。`); else if (id === 'note') onDraft(`${draft}\n教学提示：先明确概念，再比较案例。`); else onNotice(id === 'attachment' ? '插入附件为本地工具示例；未上传文件。' : id === 'check' ? '检查目标为本地工具示例；未调用分析服务。' : id === 'comment' ? '批注入口为本地工具示例；未创建批注。' : '对照原文为本地工具示例；未读取外部文档。'); };
  return <><Ribbon onCommand={command}/><div className="nv44-editor-canvas"><article className="nv44-editor-paper" data-bold={String(bold)} data-highlight={String(highlight)}><div className="nv44-eyebrow">LESSON PLAN / SOCIOLOGY</div><h2>理解角色冲突，协调多重期待</h2><Tag size={20} color="neutral" localRecipe={documentTagRecipe}>社会学概论</Tag> <Tag size={20} color="neutral" localRecipe={documentTagRecipe}>建议时长 45 分钟</Tag><h4>01　学习目标</h4><p>从学生熟悉的情境出发，区分角色间与角色内冲突，建立分析社会角色的基本方法。</p><label>可编辑目标<span className="nv44-editor-label-hint"> · 用于验证显隐后内容保留</span><textarea aria-label="教学目标草稿" value={draft} onChange={event => onDraft(event.target.value)}/></label><h4>02　情境导入</h4><p>校队比赛与课程展示安排在同一时间。请从角色期待、资源约束与协商路径三个角度分析这一情境。</p><div className="nv44-insight"><h4>讨论提示</h4><p>哪些要求来自不同角色？哪些要求来自同一角色中的不同关系？</p></div></article></div></>;
}



export interface WorkspaceStateSampleProps { scene?: WorkspaceStateScene; variant?: 'interaction' | 'grading'; instanceId?: string; inverse?: boolean; hoverPreview?: boolean; storage?: WorkspaceStorage }
/** S1–S6 expose the shared W4 controller; business drafts live in this stable caller, outside layout state. */
export function WorkspaceStateSample({ scene = 'S1', variant = 'interaction', instanceId = 'state-preview', inverse = false, hoverPreview = false, storage }: WorkspaceStateSampleProps) {
  const spec = useMemo(() => createNavigationWorkspaceSpec(scene, instanceId, variant), [scene, instanceId, variant]), [hover, setHover] = useState(hoverPreview), [active, setActive] = useState('course');
  const [drafts, setDrafts] = useState<Record<string, string>>({}), [notice, setNotice] = useState('');
  const draft = drafts[instanceId] ?? '学生能够识别角色间冲突与角色内冲突，结合校园情境给出解释，并提出可执行的协调方案。';
  const setDraft = (value: string) => setDrafts(previous => ({ ...previous, [instanceId]: value }));
  const workspace: WorkspaceRecipeOverrides = { spec, toolbar: identity => <RestoreBar scene={scene} hover={hover} onHoverChange={setHover} identity={identity}/>, inverse, hoverPreview: hover, storage };
  if (scene !== 'S5') return <div className="nv44-shared" data-scene={scene} data-instance-id={instanceId}>{scene === 'S1' ? <R1Recipe scene="plan" workspace={workspace}/> : scene === 'S2' ? <R3Recipe scene="errors" workspace={workspace}/> : scene === 'S3' ? <R6Recipe workspace={workspace}/> : scene === 'S4' ? <R4Recipe scene={variant} workspace={workspace}/> : <R5Recipe workspace={workspace}/>}</div>;
  return <WorkspaceLayout spec={spec} className="nv44-workspace" data-scene={scene} data-variant={variant} data-inverse={String(inverse)} aria-label={`${scene} 状态工作区`} hoverPreview={hover} storage={storage} toolbar={<RestoreBar scene={scene} hover={hover} onHoverChange={setHover}/>}>
    <GlobalPane active={active} onActive={setActive} onNotice={setNotice} inverse={inverse}/><PaneSplitter regionId="global"/><DocumentContext/><PaneSplitter regionId="context"/>
    <section className="nv44-main"><DocumentHeader onNotice={setNotice}/><DocumentMain draft={draft} onDraft={setDraft} onNotice={setNotice}/></section>
    <p className="nv44-local-notice" role="status" aria-live="polite">{notice}</p>
  </WorkspaceLayout>;
}
