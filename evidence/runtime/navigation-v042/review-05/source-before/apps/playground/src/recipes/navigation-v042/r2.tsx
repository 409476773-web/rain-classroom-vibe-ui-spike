import { useId, useRef, useState, type ReactNode, type ReactElement } from 'react';
import { ConnectedSurface, Split } from '@rain-next/layouts';
import { Breadcrumb, Button, Dialog, DropdownMenu, IconButton, Popover, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarItem, ScopeNavigation, Tree, defineRainLocalRecipe, type ButtonPart, type TreeNodeRecord } from '@rain-next/ui';
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
import { AddBoldIcon } from '@rain-next/ui/icons/add-bold';
import { FilterIcon } from '@rain-next/ui/icons/filter';
import { MoreHorizontalIcon } from '@rain-next/ui/icons/more-horizontal';
import { ArrowDownIcon } from '@rain-next/ui/icons/arrow-down';
import { ArrowUpIcon } from '@rain-next/ui/icons/arrow-up';
import { ArrowLeftIcon } from '@rain-next/ui/icons/arrow-left';
import { SettingsAdjustIcon } from '@rain-next/ui/icons/settings-adjust';
import { AiSparklesIcon } from '@rain-next/ui/icons/ai-sparkles';
import './r2.css';

const actionRecipe = defineRainLocalRecipe<ButtonPart, 'ui-button'>({id:'navigation-v042-action',scope:'feature',origin:'ui-button',classes:{root:'nv42-action'},modifiedParts:['root'],candidateTokens:['--rain-local-r2-text'],promotionStatus:'not-proposed'});
const iconRecipe = defineRainLocalRecipe<'root', 'ui-icon-button'>({id:'navigation-v042-icon',scope:'feature',origin:'ui-icon-button',classes:{root:'nv42-icon'},modifiedParts:['root'],candidateTokens:['--rain-local-r2-muted'],promotionStatus:'not-proposed'});
const names=['第一章 · 函数、极限与连续','1.1 函数的基本概念','函数的定义与表示','函数的性质','1.2 极限与连续','数列极限','极限的定义','收敛性与极限运算','两个重要极限','常见题型与方法','例题与拓展练习','函数的连续性','1.3 习题与应用','第二章 · 导数与微分','2.1 导数的概念','2.2 导数的应用'];
const parent=[-1,0,1,1,0,4,5,5,7,8,9,4,0,-1,13,13];
const types=['','','讲义','视频','','','讲义','','','','作业','讲义','作业','','讲义','考试'];
const counts=[20,6,2,4,8,3,1,2,2,2,2,5,6,16,8,8];
function treeData(filter:string, titles:Record<string,string>):TreeNodeRecord[] {
  const build=(parentIndex:number):TreeNodeRecord[]=>names.flatMap((title,i)=>parent[i]!==parentIndex || (filter!=='全部' && types[i] && types[i]!==filter)?[]:[{key:`node${i}`,title:titles[`node${i}`]??title,...(!types[i]?{children:build(i)}:{}),source:{type:types[i],count:counts[i],top:parentIndex===-1}}]);
  return build(-1);
}
export const r2ScopeItems=Array.from({length:201},(_,i)=>({id:`scope-${i}`,label:i===0?'公共资源包':i===2?'2026 秋 · 创新实验班':`2026 秋 · 高等数学 ${i} 班`,description:i===0?'公共内容 · 班级共用':'教学班 · 2026 秋季学期',icon:i===0?<FolderIcon size={17}/>:<MembersIcon size={17}/>}));
export interface R2RecipeProps { editor?:ReactNode; instanceId?:string; visibleLimit?:3|4|5; connection?:'inset'|'merged' }
/** Copyable mock recipe. Navigation never publishes, syncs or owns editor drafts. */
export function R2Recipe({editor,instanceId,visibleLimit=4,connection='inset'}:R2RecipeProps) {
  const id=useId(), instance=instanceId??`r2-${id}`;
  const [scope,setScope]=useState('scope-0'),[contextHidden,setContextHidden]=useState(false),[platform,setPlatform]=useState<'compact'|'expanded'|'hidden'>('compact');
  const [filter,setFilter]=useState('全部'),[selected,setSelected]=useState<readonly (string|number)[]>(['node4']),[expanded,setExpanded]=useState<readonly (string|number)[]>(names.flatMap((_,i)=>types[i]?[]:[`node${i}`]));
  const [titles,setTitles]=useState<Record<string,string>>({}),[editing,setEditing]=useState<string|null>(null),[draft,setDraft]=useState(''),[notice,setNotice]=useState('');
  const [focusBefore,setFocusBefore]=useState<{platform:typeof platform;contextHidden:boolean}|null>(null);
  const [termOpen,setTermOpen]=useState(false);
  const restore=useRef<HTMLButtonElement>(null);
  const scopeLabel=r2ScopeItems.find(item=>item.id===scope)!.label;
  const inform=(label:string)=>setNotice(`${label}：本地演示，未连接真实服务。`);
  const icon=(label:string,child:ReactElement,onClick:()=>void,size:'28/14'|'28/16'='28/14')=><IconButton aria-label={label} size={size} localRecipe={iconRecipe} onClick={onClick} icon={child}/>;
  const action=(label:string,onClick:()=>void,leading?:ReactNode,primary=false)=><Button size="small" variant={primary?'primary':'secondary'} localRecipe={actionRecipe} leadingIcon={leading} onClick={onClick}>{label}</Button>;
  const beginEdit=(key:string,title:string)=>{setEditing(key);setDraft(titles[key]??title);};
  const focus=()=>{if(focusBefore){setPlatform(focusBefore.platform);setContextHidden(focusBefore.contextHidden);setFocusBefore(null);}else{setFocusBefore({platform,contextHidden});setPlatform('hidden');setContextHidden(true);}};
  return <section className="nv42-r2" data-rain-id="recipe-navigation-r2" data-local-recipe="navigation-v042-r2" data-instance-id={instance} data-slot="root">
    <header className="nv42-workspace-bar">
      {icon(platform==='expanded'?'收起平台导航':platform==='hidden'?'恢复平台导航':'展开平台导航',<ExpandIcon/>,()=>setPlatform(platform==='expanded'?'compact':'expanded'))}
      <IconButton ref={restore} size="28/14" localRecipe={iconRecipe} aria-label={contextHidden?'恢复课程导航':'隐藏课程导航'} onClick={()=>setContextHidden(!contextHidden)} icon={<CollapseIcon/>}/>
      <div className="nv42-identity"><strong>高等数学 A · 课程内容</strong><span>{scopeLabel}</span></div>
      <Popover.Root><Popover.Trigger render={<button className="nv42-layout-button"/>}><SettingsAdjustIcon size={14}/> 布局</Popover.Trigger><Popover.Content aria-label="R2 布局" className="nv42-layout-menu"><p>当前实例布局</p><label><input type="checkbox" checked={platform!=='hidden'} onChange={e=>setPlatform(e.target.checked?'compact':'hidden')}/> 显示平台导航</label><label><input type="checkbox" checked={!contextHidden} onChange={e=>setContextHidden(!e.target.checked)}/> 显示课程导航</label></Popover.Content></Popover.Root>
      {action(focusBefore?'退出专注':'专注内容',focus,<ExpandIcon size={14}/>)}
    </header>
    <div className="nv42-workspace-body">
      {platform!=='hidden'&&<Sidebar aria-label="平台导航" collapsed={platform==='compact'} className="nv42-rail">
        <SidebarHeader className="nv42-rail-head">{icon(platform==='compact'?'展开平台导航':'收起平台导航',platform==='compact'?<ExpandIcon/>:<CollapseIcon/>,()=>setPlatform(platform==='compact'?'expanded':'compact'),'28/16')}<div className="nv42-brand"><RainClassroomIcon size={23}/>{platform==='expanded'&&<strong>雨课堂</strong>}</div></SidebarHeader>
        <SidebarContent className="nv42-rail-links">{[{label:'工作台',icon:<HomeIcon size={15}/>},{label:'课程',icon:<CourseIcon size={15}/>},{label:'资源',icon:<FolderIcon size={15}/>},{label:'专业',icon:<GraduationCapIcon size={15}/>}].map(item=><SidebarItem key={item.label} href="#navigation-v042" aria-label={item.label} active={item.label==='课程'} icon={item.icon} onClick={e=>{e.preventDefault();if(item.label!=='课程')inform(item.label);}}>{item.label}</SidebarItem>)}</SidebarContent>
        <SidebarFooter className="nv42-rail-footer"><button className="nv42-account" aria-label="当前账户：林老师" onClick={()=>inform('账户')}><span className="nv42-account-avatar">林</span><span className="nv42-account-copy"><strong>林老师</strong><small>教师工作区</small></span></button><div className="nv42-utilities">{icon('通知',<NotificationIcon/>,()=>inform('通知'),'28/16')}{icon('帮助',<HelpIcon/>,()=>inform('帮助'),'28/16')}</div></SidebarFooter>
      </Sidebar>}
      <Split.Root className="nv42-split" sidebarId={`${instance}-context`} sidebarWidth={216} minMainWidth={500} collapsed={contextHidden} collapseFocusRef={restore}>
        <Split.Sidebar className="nv42-context">
          <div className="nv42-context-head"><strong>课程导航</strong>{icon('固定课程导航（区域协调器待 W4）',<PinIcon size={14}/>,()=>setNotice('当前使用常驻课程导航；临时浮出与固定将在 W4 接入。'))}{icon('隐藏课程导航',<CloseIcon size={14}/>,()=>setContextHidden(true))}</div>
          <div className="nv42-context-card"><button className="nv42-back" onClick={()=>inform('返回我的课程')}><ArrowLeftIcon size={16}/> 返回我的课程</button><div className="nv42-cover"><small>MATHEMATICS / 2026</small><strong>高等数学 A</strong><span aria-hidden="true">∫</span></div><h4>高等数学 A</h4><DropdownMenu.Root open={termOpen} onOpenChange={setTermOpen}><DropdownMenu.Trigger className="nv42-term">2026 秋季学期{termOpen?<ArrowUpIcon size={12}/>:<ArrowDownIcon size={12}/>}</DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item label="2026 秋季学期" selected/></DropdownMenu.Content></DropdownMenu.Root></div>
          <div className="nv42-group-label">教学空间</div>
          <Sidebar aria-label="课程导航" className="nv42-course-links">{[{label:'课程内容',icon:<CourseIcon size={16}/>},{label:'考核方案',icon:<EyeVisibleIcon size={16}/>},{label:'课程信息',icon:<CourseIcon size={16}/>},{label:'数据面板',icon:<RankingIcon size={16}/>}].map(item=><SidebarItem key={item.label} href="#navigation-v042" active={item.label==='课程内容'} icon={item.icon} onClick={e=>{e.preventDefault();if(item.label!=='课程内容')inform(item.label);}}>{item.label}</SidebarItem>)}<hr/>{[{label:'使用的班级',count:200,icon:<MembersIcon size={16}/>},{label:'关联的 AI 课',count:2,icon:<AiSparklesIcon size={16}/>},{label:'成员',count:12,icon:<MembersIcon size={16}/>}].map(item=><SidebarItem key={item.label} href="#navigation-v042" icon={item.icon} onClick={e=>{e.preventDefault();inform(item.label);}}><span>{item.label}</span><small>{item.count}</small></SidebarItem>)}</Sidebar>
          <button className="nv42-history" onClick={()=>inform('课程建设记录')}><HistoryBackIcon size={16}/><span>课程建设记录</span></button>
        </Split.Sidebar>
        <Split.Main className="nv42-main">
          <ScopeNavigation items={r2ScopeItems} value={scope} onValueChange={setScope} visibleLimit={visibleLimit} aria-label="课程内容范围" renderSurface={({track,panels})=><ConnectedSurface instanceId={`${instance}-scope`} activeKey={scope} connection={connection} track={track}>{panels}</ConnectedSurface>}>
            <div className="nv42-sheet"><div className="nv42-page-top"><div className="nv42-path" data-slot="scope-path"><Breadcrumb items={[{id:'course-content',label:'课程内容'},{id:scope,label:scopeLabel}]}/></div><div className="nv42-title-row"><div><h3>知识点总览</h3><p>以知识点组织公共资源，在班级中安排教学。</p></div><div className="nv42-tools">{action('预览学生端',()=>inform('预览学生端'),<EyeVisibleIcon size={16}/>)}{action('新增学习单元',()=>setNotice('新增学习单元：这是编辑树操作入口，尚未提交或发布任何内容。'),<AddBoldIcon size={16}/>,true)}</div></div></div>
            <div className="nv42-sheet-content"><div className="nv42-table-tools"><div className="nv42-stats"><span>7 级结构</span><span>16 个内容节点</span><span>36 个学习单元</span></div><div className="nv42-tools"><div className="nv42-filter" role="radiogroup" aria-label="内容类型">{['全部','作业','考试'].map((value,index)=><button key={value} role="radio" aria-checked={filter===value} tabIndex={filter===value?0:-1} onClick={()=>setFilter(value)} onKeyDown={e=>{if(['ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();const next=(index+(e.key==='ArrowRight'?1:2))%3;setFilter(['全部','作业','考试'][next]!);(e.currentTarget.parentElement?.children[next] as HTMLElement)?.focus();}}}>{value}</button>)}</div>{icon('筛选',<FilterIcon size={16}/>,()=>inform('更多筛选'))}</div></div>
            {editor??<Tree data={treeData(filter,titles)} aria-label="课程内容编辑树" density="default" selectedKeys={selected} onSelectedKeysChange={setSelected} expandedKeys={expanded} onExpandedKeysChange={setExpanded} className="nv42-editor-tree" renderLeading={node=>{const data=node.source as {type:string};return data.type?<span className="nv42-type" data-type={data.type}>{data.type}</span>:<CourseIcon size={13}/>;}} renderTitle={(node,ctx)=><span onDoubleClick={()=>beginEdit(String(node.key),node.title)} style={{fontWeight:(node.source as {top:boolean}).top||ctx.selected?600:400}}>{node.title}</span>} renderMeta={node=><span className="nv42-tree-meta"><span>{node.children?`${(node.source as {count:number}).count} 个学习单元`:'已发布'}</span><span>09-24 更新</span></span>} renderActions={node=>icon(`编辑${node.title}`,node.children?<AddBoldIcon size={12}/>:<MoreHorizontalIcon size={12}/>,()=>beginEdit(String(node.key),node.title))}/>}</div>
            <footer className="nv42-notice"><span>{scope==='scope-0'?'公共资源的内容可供关联班级复用。':'当前查看教学班内容。范围切换不自动发布或同步资源。'}</span><span>模拟数据 · 未执行发布</span></footer></div>
          </ScopeNavigation>
        </Split.Main>
      </Split.Root>
    </div>
    <Dialog.Root open={editing!==null} onOpenChange={open=>{if(!open)setEditing(null);}}><Dialog.Content className="nv42-edit-dialog"><Dialog.Header><Dialog.Title>编辑内容节点</Dialog.Title><Dialog.Close aria-label="关闭编辑"><CloseIcon size={14}/></Dialog.Close></Dialog.Header><Dialog.Body><Dialog.Description>仅修改本地演示名称，不发布或同步课程。</Dialog.Description><label>节点名称<input value={draft} onChange={e=>setDraft(e.target.value)}/></label></Dialog.Body><Dialog.Footer><Button size="small" variant="secondary" onClick={()=>setEditing(null)}>取消</Button><Button size="small" disabled={!draft.trim()} onClick={()=>{if(editing&&draft.trim()){setTitles({...titles,[editing]:draft.trim()});setEditing(null);}}}>保存本地名称</Button></Dialog.Footer></Dialog.Content></Dialog.Root>
    {notice&&<div className="nv42-toast" role="status">{notice}<button onClick={()=>setNotice('')} aria-label="关闭提示"><CloseIcon size={14}/></button></div>}
  </section>;
}
