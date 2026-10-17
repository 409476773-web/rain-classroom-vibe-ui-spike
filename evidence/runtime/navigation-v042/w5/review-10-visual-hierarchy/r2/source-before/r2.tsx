import { useId, useMemo, useState, type ReactNode, type ReactElement } from 'react';
import { ConnectedSurface, WorkspaceLayout, RecoverableRegion, RegionRestoreTrigger, PaneSplitter, useWorkspaceLayout, createWorkspaceKey, type WorkspaceSpec } from '@rain-next/layouts';
import { Avatar, Breadcrumb, Button, DropdownMenu, IconButton, Popover, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, ScopeNavigation, Tooltip, defineRainLocalRecipe, type ButtonPart } from '@rain-next/ui';
import { HomeIcon } from '@rain-next/ui/icons/home';
import { CourseIcon } from '@rain-next/ui/icons/course';
import { FolderIcon } from '@rain-next/ui/icons/folder';
import { GraduationCapIcon } from '@rain-next/ui/icons/graduation-cap';
import { RankingIcon } from '@rain-next/ui/icons/ranking';
import { MembersIcon } from '@rain-next/ui/icons/members';
import { RainClassroomIcon } from '@rain-next/ui/icons/rain-classroom';
import { NotificationIcon } from '@rain-next/ui/icons/notification';
import { HelpIcon } from '@rain-next/ui/icons/help';
import { ExpandIcon } from '@rain-next/ui/icons/expand';
import { CollapseIcon } from '@rain-next/ui/icons/collapse';
import { CloseIcon } from '@rain-next/ui/icons/close';
import { PinIcon } from '@rain-next/ui/icons/pin';
import { HistoryBackIcon } from '@rain-next/ui/icons/history-back';
import { EyeVisibleIcon } from '@rain-next/ui/icons/eye-visible';
import { ArrowDownIcon } from '@rain-next/ui/icons/arrow-down';
import { ArrowUpIcon } from '@rain-next/ui/icons/arrow-up';
import { ArrowLeftIcon } from '@rain-next/ui/icons/arrow-left';
import { SettingsAdjustIcon } from '@rain-next/ui/icons/settings-adjust';
import { AiSparklesIcon } from '@rain-next/ui/icons/ai-sparkles';
import { CourseResources } from './course-resources';
import './r2.css';

const actionRecipe = defineRainLocalRecipe<ButtonPart, 'ui-button'>({id:'navigation-v042-action',scope:'feature',origin:'ui-button',classes:{root:'nv42-action'},modifiedParts:['root'],candidateTokens:['--rain-local-r2-text'],promotionStatus:'not-proposed'});
const iconRecipe = defineRainLocalRecipe<'root', 'ui-icon-button'>({id:'navigation-v042-icon',scope:'feature',origin:'ui-icon-button',classes:{root:'nv42-icon'},modifiedParts:['root'],candidateTokens:['--rain-local-r2-muted'],promotionStatus:'not-proposed'});
export const r2ScopeItems=Array.from({length:201},(_,i)=>({id:`scope-${i}`,label:i===0?'公共资源包':i===2?'2026 秋 · 创新实验班':`2026 秋 · 高等数学 ${i} 班`,description:i===0?'公共内容 · 班级共用':'教学班 · 2026 秋季学期',icon:i===0?<FolderIcon size={17}/>:<MembersIcon size={17}/>}));
export interface R2RecipeProps { editor?:ReactNode; instanceId?:string; visibleLimit?:3|4|5; connection?:'inset'|'merged' }
/** Copyable mock recipe. Navigation never publishes, syncs or owns editor drafts. */
export function R2Recipe({editor,instanceId,visibleLimit=4,connection='inset'}:R2RecipeProps) {
  const id=useId(),instance=instanceId??`r2-${id}`;
  const spec=useMemo<WorkspaceSpec>(()=>({workspaceKey:createWorkspaceKey({userScope:'prototype',workspaceId:'r2',subsceneId:'course-content',instanceId:instance}),minMainWidth:500,stableRestoreOwnerIds:['workspace-bar'],regions:[
    {id:'global',label:'平台导航',side:'start',allowedModes:['expanded','compact','hidden'],defaultMode:'compact',minWidth:180,defaultWidth:208,maxWidth:260,compactWidth:64,adaptationPriority:0,restoreOwnerId:'workspace-bar'},
    {id:'context',label:'课程导航',side:'start',allowedModes:['expanded','hidden'],minWidth:180,defaultWidth:216,maxWidth:420,boundaryWidth:5,adaptationPriority:1,restoreOwnerId:'workspace-bar'}
  ]}),[instance]);
  return <WorkspaceLayout spec={spec} className="nv42-r2" data-rain-id="recipe-navigation-r2" data-local-recipe="navigation-v042-r2" data-instance-id={instance} data-slot="root"><R2Workspace editor={editor} instance={instance} visibleLimit={visibleLimit} connection={connection}/></WorkspaceLayout>;
}
function R2Workspace({editor,instance,visibleLimit,connection}:{editor?:ReactNode;instance:string;visibleLimit:3|4|5;connection:'inset'|'merged'}) {
  const {state,effective,dispatch,viewportWidth}=useWorkspaceLayout();
  const platform=state.session.temporary?.regionId==='global'?'expanded':effective.regions.global!.mode;
  const contextHidden=effective.regions.context!.mode==='hidden'&&state.session.temporary?.regionId!=='context';
  const setPlatform=(mode:'compact'|'expanded'|'hidden')=>dispatch({type:'SET_MODE',regionId:'global',mode});
  const setContextHidden=(hidden:boolean)=>dispatch({type:hidden?'HIDE_REGION':'SHOW_REGION',regionId:'context',viewportWidth});
  const [scope,setScope]=useState('scope-0');
  const [notice,setNotice]=useState('');
  const focusBefore=state.session.focused;
  const [termOpen,setTermOpen]=useState(false);
  const scopeLabel=r2ScopeItems.find(item=>item.id===scope)!.label;
  const inform=(label:string)=>setNotice(`${label}：本地演示，未连接真实服务。`);
  const icon=(label:string,child:ReactElement,onClick:()=>void,size:'28/14'|'28/16'='28/14')=><IconButton aria-label={label} size={size} localRecipe={iconRecipe} onClick={onClick} icon={child}/>;
  const action=(label:string,onClick:()=>void,leading?:ReactNode,primary=false)=><Button size="small" variant={primary?'primary':'secondary'} localRecipe={actionRecipe} leadingIcon={leading} onClick={onClick}>{label}</Button>;
  const focus=()=>dispatch({type:focusBefore?'EXIT_FOCUS':'ENTER_FOCUS'});
  return <div className="nv42-r2-frame" data-rain-id="recipe-navigation-r2" data-local-recipe="navigation-v042-r2" data-instance-id={instance} data-slot="root">

    <header className="nv42-workspace-bar">
      <RegionRestoreTrigger regionId="global" className="nv42-icon" aria-label={platform==='expanded'?'收起平台导航':platform==='hidden'?'恢复平台导航':'展开平台导航'}><ExpandIcon size={14}/></RegionRestoreTrigger>
      <RegionRestoreTrigger regionId="context" className="nv42-icon" aria-label={contextHidden?'恢复课程导航':'隐藏课程导航'}><CollapseIcon size={14}/></RegionRestoreTrigger>
      <div className="nv42-identity"><strong>高等数学 A · 课程内容</strong><span>{scopeLabel}</span></div>
      <Popover.Root><Popover.Trigger render={<button className="nv42-layout-button"/>}><SettingsAdjustIcon size={14}/> 布局</Popover.Trigger><Popover.Content aria-label="R2 布局" className="nv42-layout-menu"><p>当前实例布局</p><label><input type="checkbox" checked={platform!=='hidden'} onChange={e=>setPlatform(e.target.checked?'compact':'hidden')}/> 显示平台导航</label><label><input type="checkbox" checked={!contextHidden} onChange={e=>setContextHidden(!e.target.checked)}/> 显示课程导航</label></Popover.Content></Popover.Root>
      {action(focusBefore?'退出专注':'专注内容',focus,<ExpandIcon size={14}/>)}
    </header>
    <div className="nv42-workspace-body">
      <RecoverableRegion regionId="global" className="nv42-global-region"><Sidebar aria-label="平台导航" collapsed={platform==='compact'} className="nv42-rail">
        <SidebarHeader className="nv42-rail-head">{icon(platform==='compact'?'展开平台导航':'收起平台导航',platform==='compact'?<ExpandIcon/>:<CollapseIcon/>,()=>setPlatform(platform==='compact'?'expanded':'compact'),'28/16')}<div className="nv42-brand"><RainClassroomIcon size={23}/><strong aria-hidden={platform!=='expanded'}>雨课堂</strong></div></SidebarHeader>
        <SidebarContent className="nv42-rail-links">{[{label:'工作台',icon:<HomeIcon size={15}/>},{label:'课程',icon:<CourseIcon size={15}/>},{label:'资源',icon:<FolderIcon size={15}/>},{label:'专业',icon:<GraduationCapIcon size={15}/>}].map(item=><Tooltip key={item.label} text={item.label} placement="right" portal disabled={platform!=='compact'}><SidebarItem href="#navigation-v042" aria-label={item.label} active={item.label==='课程'} icon={item.icon} onClick={e=>{e.preventDefault();if(item.label!=='课程')inform(item.label);}}>{item.label}</SidebarItem></Tooltip>)}</SidebarContent>
        <SidebarFooter className="nv42-rail-footer"><button className="nv42-account" aria-label="当前账户：林老师" onClick={()=>inform('账户')}><Avatar className="nv42-account-avatar" size={32} alt=""/><span className="nv42-account-copy"><strong>林老师</strong><small>教师工作区</small></span></button><div className="nv42-utilities">{icon('通知',<NotificationIcon/>,()=>inform('通知'),'28/16')}{icon('帮助',<HelpIcon/>,()=>inform('帮助'),'28/16')}</div></SidebarFooter>
      </Sidebar></RecoverableRegion>
      <div className="nv42-split">
        <RecoverableRegion regionId="context" className="nv42-context">
          <div className="nv42-context-head"><strong>课程导航</strong>{icon(state.session.temporary?.regionId==='context'?'固定课程导航':'取消固定，改为临时课程导航',<PinIcon size={14}/>,()=>dispatch({type:state.session.temporary?.regionId==='context'?'PIN_TEMP':'UNPIN',regionId:'context',viewportWidth}))}{icon('隐藏课程导航',<CloseIcon size={14}/>,()=>setContextHidden(true))}</div>
          <div className="nv42-context-card"><button className="nv42-back" onClick={()=>inform('返回我的课程')}><ArrowLeftIcon size={16}/> 返回我的课程</button><div className="nv42-cover"><small>MATHEMATICS / 2026</small><strong>高等数学 A</strong><span aria-hidden="true">∫</span></div><h4>高等数学 A</h4><DropdownMenu.Root open={termOpen} onOpenChange={setTermOpen}><DropdownMenu.Trigger className="nv42-term">2026 秋季学期{termOpen?<ArrowUpIcon size={12}/>:<ArrowDownIcon size={12}/>}</DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item label="2026 秋季学期" selected/></DropdownMenu.Content></DropdownMenu.Root></div>
          <div className="nv42-group-label">教学空间</div>
          <Sidebar aria-label="课程导航" className="nv42-course-links">{[{label:'课程内容',icon:<CourseIcon size={16}/>},{label:'考核方案',icon:<EyeVisibleIcon size={16}/>},{label:'课程信息',icon:<CourseIcon size={16}/>},{label:'数据面板',icon:<RankingIcon size={16}/>}].map(item=><SidebarItem key={item.label} href="#navigation-v042" active={item.label==='课程内容'} icon={item.icon} onClick={e=>{e.preventDefault();if(item.label!=='课程内容')inform(item.label);}}>{item.label}</SidebarItem>)}<hr/>{[{label:'使用的班级',count:200,icon:<MembersIcon size={16}/>},{label:'关联的 AI 课',count:2,icon:<AiSparklesIcon size={16}/>},{label:'成员',count:12,icon:<MembersIcon size={16}/>}].map(item=><SidebarItem key={item.label} href="#navigation-v042" icon={item.icon} onClick={e=>{e.preventDefault();inform(item.label);}}><span>{item.label}</span><small>{item.count}</small></SidebarItem>)}</Sidebar>
          <button className="nv42-history" onClick={()=>inform('课程建设记录')}><HistoryBackIcon size={16}/><span>课程建设记录</span></button>
        </RecoverableRegion><PaneSplitter regionId="context"/>
        <div className="nv42-main">
          <ScopeNavigation items={r2ScopeItems} value={scope} onValueChange={setScope} visibleLimit={visibleLimit} aria-label="课程内容范围" renderSurface={({track,panels})=><ConnectedSurface instanceId={`${instance}-scope`} activeKey={scope} connection={connection} track={track}>{panels}</ConnectedSurface>}>
            <div className="nv42-sheet"><div className="nv42-page-top"><div className="nv42-path" data-slot="scope-path"><Breadcrumb items={[{id:'course-content',label:'课程内容'},{id:scope,label:scopeLabel}]}/></div><div className="nv42-title-row"><div><h3>知识点总览</h3><p>以知识点组织公共资源，在班级中安排教学。</p></div><div className="nv42-tools">{action('预览学生端',()=>inform('预览学生端'),<EyeVisibleIcon size={16}/>)}</div></div></div>
            <div className="nv42-sheet-content">{editor??<CourseResources onFeedback={setNotice}/>}</div>
            <footer className="nv42-notice"><span>{scope==='scope-0'?'公共资源的内容可供关联班级复用。':'当前查看教学班内容。范围切换不自动发布或同步资源。'}</span><span>模拟数据 · 未执行发布</span></footer></div>
          </ScopeNavigation>
        </div>
      </div>
    </div>
    {notice&&<div className="nv42-toast" role="status">{notice}<button onClick={()=>setNotice('')} aria-label="关闭提示"><CloseIcon size={14}/></button></div>}
  </div>;
}
