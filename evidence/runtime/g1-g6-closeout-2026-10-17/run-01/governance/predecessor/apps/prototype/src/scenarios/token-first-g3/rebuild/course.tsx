import { useLayoutEffect, useRef, useState } from 'react';
import { Split, Inline } from '@rain-next/layouts';
import { Alert, AlertActions, AlertDescription, Button, Empty, EmptyTitle, FormItem, IconButton, Input, Pagination, Popover, Select, Textarea, defineRainLocalRecipe } from '@rain-next/ui';
import { CourseFilledIcon } from '@rain-next/ui/icons/course-filled';
import { CourseBuilderIcon } from '@rain-next/ui/icons/course-builder';
import { OutlineIcon } from '@rain-next/ui/icons/outline';
import { ContentExamIcon } from '@rain-next/ui/icons/content-exam';
import { MembersIcon } from '@rain-next/ui/icons/members';
import { LearningStatusIcon } from '@rain-next/ui/icons/learning-status';
import { ArrowLeftIcon } from '@rain-next/ui/icons/arrow-left';
import { CollapseIcon } from '@rain-next/ui/icons/collapse';
import { ExpandIcon } from '@rain-next/ui/icons/expand';
import { NavigationRail, type NavEntry } from './parts';
import { classItem, courses, queryClasses, routeHref, type Route } from './model';
import './course.css';

const courseRestoreTab = defineRainLocalRecipe<'root','ui-icon-button'>({
  id:'course-restore-tab', origin:'ui-icon-button', scope:'feature',
  classes:{root:'nr-course-restore-tab'}, modifiedParts:['root'], candidateTokens:[], promotionStatus:'not-proposed',
});

function ClassScopes({ route }: { route: Route }) {
  const [query,setQuery]=useState(''); const [cursor,setCursor]=useState(0); const [open,setOpen]=useState(false);
  const [status,setStatus]=useState('ready'); const [directCount,setDirectCount]=useState(0);
  const measuring=useRef<HTMLDivElement>(null); const available=useRef<HTMLDivElement>(null);
  const result=queryClasses({count:route.count,query,cursor});
  const scopeIndex=Number(route.scope.replace('class-',''));
  const scopeName=route.scope==='package'?'公共资源包':`${classItem(scopeIndex).name} · ${classItem(scopeIndex).semester}`;
  const candidates=Array.from({length:route.count},(_,i)=>classItem(i+1));
  useLayoutEffect(()=>{
    const root=available.current; if(!root) return;
    const measure=()=>{let width=0,count=0;const budget=root.clientWidth;for(const child of Array.from(measuring.current?.children??[])){width+=(child as HTMLElement).offsetWidth+8;if(width>budget)break;count++;}setDirectCount(count);};
    measure();const observer=new ResizeObserver(measure);observer.observe(root);return()=>observer.disconnect();
  },[route.count]);
  const choose=(id:string)=>{window.location.hash=routeHref(route,{scope:id,unit:''});setOpen(false);};
  return <div className="nr-scopes" aria-label="班级范围">
    <div className="nr-scope-line"><button className="nr-scope-button" aria-pressed={route.scope==='package'} onClick={()=>choose('package')}>公共资源包</button><span className="nr-scope-divider"/>
      <div className="nr-direct-classes" ref={available}>{candidates.slice(0,directCount).map(item=><button className="nr-scope-button" key={item.id} title={`${item.name} · ${item.semester}`} aria-label={`${item.name} · ${item.semester}`} aria-pressed={route.scope===item.id} disabled={!item.available} onClick={()=>choose(item.id)}>{item.name}{item.semester==='2025 秋季'?'（2025）':''}</button>)}</div>
      <Popover.Root open={open} onOpenChange={value=>{setOpen(value);if(value){setQuery('');setCursor(0);}}}><Popover.Trigger className="nr-quiet-button">全部班级</Popover.Trigger><Popover.Content className="nr-popup nr-class-popup" width={440} aria-label="全部班级查询"><Popover.Title>全部班级 · {route.count} 个</Popover.Title><Input aria-label="搜索全部班级" placeholder="搜索班级名称、学期或编号" value={query} onValueChange={value=>{setQuery(value);setCursor(0);}}/><div className="nr-fixture-field"><span>查询状态（同步模拟）</span><Select aria-label="班级查询状态" value={status} clearable={false} options={[{value:'ready',label:'正常'},{value:'loading',label:'加载中'},{value:'error',label:'查询失败'}]} onValueChange={value=>setStatus(String(value))}/></div>
      {status==='loading'?<p role="status">正在查找班级…</p>:status==='error'?<Alert tone="error" role="alert"><AlertDescription>班级查询失败。</AlertDescription><AlertActions><Button variant="text" tone="brand" onClick={()=>setStatus('ready')}>重试</Button></AlertActions></Alert>:<><div className="nr-class-results">{result.items.map(item=><button key={item.id} className="nr-class-option" disabled={!item.available} aria-label={`${item.name} · ${item.semester}`} onClick={()=>choose(item.id)}><strong>{item.name}</strong><span>{item.semester} · {item.id}{!item.available?' · 暂不可访问':''}</span></button>)}{!result.items.length&&<Empty presentation="text" align="start" className="nr-empty"><EmptyTitle as="p">没有匹配的班级</EmptyTitle></Empty>}</div><div className="nr-class-paging"><span>共 {result.total} 个匹配班级</span><Pagination variant="simple" aria-label="班级结果分页" total={result.total} page={Math.floor(cursor/20)+1} pageSize={20} showJumper={false} onChange={({page})=>setCursor((page-1)*20)}/></div></>}
      </Popover.Content></Popover.Root>
    </div>
    <div ref={measuring} className="nr-class-measure" aria-hidden="true">{candidates.map(item=><span key={item.id} className="nr-scope-button">{item.name}{item.semester==='2025 秋季'?'（2025）':''}</span>)}</div>
    <p className="nr-current-scope" aria-label="当前教学范围">当前范围：<strong>{scopeName}</strong>{route.scope==='package'?<span>公共内容可供班级复用</span>:<span>班级补充不反向修改资源包</span>}</p>
  </div>;
}

type Place = { query:string; selected:string; expanded:boolean; scroll:number };
const freshPlace=():Place=>({query:'',selected:'unit-source-01',expanded:true,scroll:0});
const sourceUnits=[{id:'unit-source-01',name:'极限的概念与计算',kind:'视频 · 讲义 · 练习'},{id:'unit-source-02',name:'函数的连续性',kind:'讲义 · 随堂测验'},...Array.from({length:18},(_,i)=>({id:`unit-source-${String(i+3).padStart(2,'0')}`,name:`第 ${i+3} 节 · 微积分基础学习与拓展`,kind:'讲义 · 练习'}))];
export function CourseWorkspace({route,instance='primary',scopeLoading=false}:{route:Route;instance?:string;scopeLoading?:boolean}) {
  const [contextHidden,setContextHidden]=useState(false); const [places,setPlaces]=useState<Record<string,Place>>({}); const [drafts,setDrafts]=useState<Record<string,string>>({});
  const toggle=useRef<HTMLButtonElement>(null); const floatingToggle=useRef<HTMLButtonElement>(null); const wasHidden=useRef(false); const scroll=useRef<HTMLDivElement>(null); const placeKey=`${instance}/${route.course}/${route.scope}`;
  const place=places[placeKey]??freshPlace(); const patchPlace=(patch:Partial<Place>)=>setPlaces(prev=>({...prev,[placeKey]:{...(prev[placeKey]??freshPlace()),...patch}}));
  const courseName=courses[route.course as keyof typeof courses]; const scopeName=route.scope==='package'?'公共资源包':`${classItem(Number(route.scope.replace('class-',''))).name} · ${classItem(Number(route.scope.replace('class-',''))).semester}`;
  const accessible=route.scope==='package'||(/^class-\d{4}$/.test(route.scope)&&Number(route.scope.replace('class-',''))>0&&Number(route.scope.replace('class-',''))<=route.count&&classItem(Number(route.scope.replace('class-',''))).available);
  const units=route.scope==='class-0001'?[{id:'unit-class-added-01',name:'本班拓展练习',kind:'本班新增 · 练习'},...sourceUnits]:sourceUnits;
  const selectedUnit=units.find(u=>u.id===route.unit);
  const inherited=route.scope!=='package'&&route.unit.startsWith('unit-source-');
  const draftKey=`${placeKey}/${route.unit}`;
  useLayoutEffect(()=>{if(!route.unit&&scroll.current)scroll.current.scrollTop=place.scroll;},[route.unit,placeKey]);
  useLayoutEffect(()=>{if(wasHidden.current&&!contextHidden)toggle.current?.focus({preventScroll:true});wasHidden.current=contextHidden;},[contextHidden]);
  const goEdit=(unit:string)=>{patchPlace({selected:unit,scroll:scroll.current?.scrollTop??0});window.location.hash=routeHref(route,{unit});};
  const contextEntries:NavEntry[]=[{id:'course-overview',label:'课程概览',href:routeHref(route,{page:'course-overview',unit:''}),icon:<CourseBuilderIcon aria-hidden="true"/>},{id:'course-content',label:'课程内容',href:routeHref(route,{page:'course-content',unit:''}),icon:<OutlineIcon aria-hidden="true"/>,children:[{id:'course-outline',label:'知识点目录',href:routeHref(route,{page:'course-outline',unit:''})}]},{id:'course-tests',label:'作业与测验',href:routeHref(route,{page:'course-tests',unit:''}),icon:<ContentExamIcon aria-hidden="true"/>,badge:'12'},{id:'course-students',label:'学生管理',href:routeHref(route,{page:'course-students',unit:''}),icon:<MembersIcon aria-hidden="true"/>},{id:'course-report',label:'成绩分析',href:routeHref(route,{page:'course-report',unit:''}),icon:<LearningStatusIcon aria-hidden="true"/>}];
  if(route.unit&&(!selectedUnit||!accessible)) return <div className="nr-unit-editor"><a href={routeHref(route,{unit:'',page:'course-content'})}>返回课程内容</a><h1>无法访问此学习单元</h1><p>当前范围保留；请返回确认班级与单元。</p></div>;
  if(route.unit&&selectedUnit) return <div className="nr-unit-editor" data-slot="unit-editor"><a className="nr-back-link" href={routeHref(route,{unit:'',page:'course-content'})}><ArrowLeftIcon aria-hidden="true"/>返回课程内容</a><div className="nr-unit-heading"><span>{courseName}</span><h1>{selectedUnit.name}</h1><p>当前编辑范围：{scopeName}</p></div><Alert tone="info" className="nr-scope-note"><AlertDescription>{inherited?'本示例未实现班级中编辑继承单元的规则；当前仅查看。':route.scope==='package'?'正在编辑资源包源单元。班级复用该内容；同步、发布与冲突规则不在本示例实现。':'正在编辑本班新增单元，不反向修改公共资源包。'}</AlertDescription></Alert><FormItem className="nr-draft-field" label="单元内容"><Textarea readOnly={inherited} rows={12} value={drafts[draftKey]??'在这里编写单元导读、学习目标与补充资料。'} onValueChange={value=>setDrafts(prev=>({...prev,[draftKey]:value}))}/></FormItem><p className="nr-local-note">本地演示草稿 · 返回保留，刷新清空 · 不提交、不发布</p></div>;
  return <div className="nr-course-workspace">
    {contextHidden&&<IconButton ref={floatingToggle} className="nr-course-floating-toggle" localRecipe={courseRestoreTab} icon={<ExpandIcon/>} size="32/18" aria-label="恢复课程导航" title="恢复课程导航" aria-expanded={false} aria-controls={`${instance}-course-sidebar`} onClick={()=>setContextHidden(false)}/>}
    <Split.Root collapsed={contextHidden} sidebarWidth={256} minMainWidth={560} sidebarId={`${instance}-course-sidebar`} collapseFocusRef={floatingToggle} className="nr-course-split"><Split.Sidebar><NavigationRail label="课程导航" current={route.page==='courses'?'course-overview':route.page} entries={contextEntries} surface="light" header={<div className="nr-course-identity"><div className="nr-course-identity-top"><a className="nr-back-link" href={routeHref(route,{scene:'platform',page:'courses'})}><ArrowLeftIcon aria-hidden="true"/>返回我的课程</a><IconButton ref={toggle} icon={<CollapseIcon/>} size="32/18" aria-label="隐藏课程导航" title="隐藏课程导航" aria-expanded={true} aria-controls={`${instance}-course-sidebar`} onClick={()=>setContextHidden(true)}/></div><strong title={courseName}>{courseName}</strong><span>2026 秋季学期</span><div className="nr-course-picker"><span>切换课程</span><Select aria-label="切换课程" value={route.course} clearable={false} options={Object.entries(courses).map(([value,label])=>({value,label}))} onValueChange={value=>{window.location.hash=routeHref(route,{course:String(value),scope:'package',page:'course-content',unit:''});}}/></div></div>} footer={<span className="nr-local-note">课程身份与入口属于同一范围</span>}/></Split.Sidebar>
    <Split.Main className="nr-course-main"><div className="nr-course-scroll" ref={scroll} data-slot="course-scroll" onScroll={e=>patchPlace({scroll:e.currentTarget.scrollTop})}>
      <div className="nr-page-heading nr-course-heading"><div><small>{courseName}</small><h1>{route.page==='course-overview'||route.page==='courses'?'课程概览':route.page==='course-tests'?'作业与测验':route.page==='course-students'?'学生管理':route.page==='course-report'?'成绩分析':'课程内容'}</h1><p>以知识点组织公共资源，在班级中安排教学。</p></div></div>
      <ClassScopes route={route}/>
      {scopeLoading?<p role="status" className="nr-empty">正在加载课程内容…</p>:!accessible?<Alert tone="warning" role="alert"><AlertDescription>此班级暂不可访问。当前范围已保留，可选择其他班级或返回公共资源包。</AlertDescription></Alert>:<><div className="nr-course-filter"><Input aria-label="筛选学习单元" placeholder="搜索当前范围内的学习单元" value={place.query} onValueChange={value=>patchPlace({query:value})}/><span className="nr-filter-summary">{route.scope==='package'?'公共资源包':'班级教学内容'}</span></div>
      <div className="nr-unit-section"><button className="nr-unit-group" aria-expanded={place.expanded} onClick={()=>patchPlace({expanded:!place.expanded})}><CourseFilledIcon aria-hidden="true"/><strong>第一章　函数、极限与连续</strong><span>{units.length} 个学习单元</span></button>
      {place.expanded&&<div className="nr-unit-list" aria-label="知识点目录（集成样例）">{units.filter(u=>u.name.includes(place.query)).map((unit,i)=><div className="nr-unit-row" key={unit.id} data-selected={place.selected===unit.id||undefined}><span className="nr-unit-number">{String(i+1).padStart(2,'0')}</span><button className="nr-unit-select" onClick={()=>patchPlace({selected:unit.id})}><strong>{unit.name}</strong><small>{unit.kind}</small></button><span className="nr-unit-origin">{unit.id==='unit-class-added-01'?'本班新增':'来自资源包'}</span>{route.scope==='package'||unit.id==='unit-class-added-01'?<Button variant="text" tone="brand" size="regular" aria-label={`编辑 ${unit.name}`} onClick={()=>goEdit(unit.id)}>编辑单元</Button>:<span className="nr-local-note" title="本示例未实现班级中编辑继承单元的规则">仅查看</span>}</div>)}{!units.some(u=>u.name.includes(place.query))&&<Empty presentation="text" className="nr-empty"><EmptyTitle as="p">没有匹配的学习单元</EmptyTitle></Empty>}</div>}
      </div><p className="nr-local-note">目录为当前页面集成样例；未实现拖拽、继承覆盖或同步规则。</p></>}
    </div></Split.Main></Split.Root>
  </div>;
}
