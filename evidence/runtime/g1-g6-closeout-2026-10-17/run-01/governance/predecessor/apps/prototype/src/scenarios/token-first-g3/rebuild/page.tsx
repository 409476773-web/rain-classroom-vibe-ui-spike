import { useEffect, useRef, useState } from 'react';
import { DensityProvider } from '@rain-next/foundations';
import { Inline } from '@rain-next/layouts';
import { Button, Input, Breadcrumb, Popover, Sheet, Select, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableScrollArea, Empty, EmptyTitle, StatusTag, Tag } from '@rain-next/ui';
import { SearchIcon } from '@rain-next/ui/icons/search';
import { MoreHorizontalIcon } from '@rain-next/ui/icons/more-horizontal';
import { NavigationRail, globalEntries, NavRow, type RailMode, type Surface } from './parts';
import { pages, readRoute, routeHref, recipes, type Route, type Scene } from './model';
import './rebuild.css';
import { TopNavigation, NavigationPanelsDemo } from './top-navigation';
import { CourseWorkspace } from './course';
import { CommandWorkbench, CommandStateBoard } from './commands';
import catalog from './catalog.json';
import { LabWorkbench } from './lab';
const candidateSources = import.meta.glob('./*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string,string>;

function useRoute() {
  const [route, setRoute] = useState(() => readRoute(window.location.hash));
  useEffect(() => { const sync = () => setRoute(readRoute(window.location.hash)); window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync); }, []);
  return route;
}
const examRows = Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: ['高等数学 A · 第一章单元测验', '大学物理 · 力学基础阶段考试', '工程实践 · 课堂随堂练习', '高等数学 A · 极限与连续期中练习'][i % 4]!, group: ['2026 秋季 · 1 班', '2026 秋季 · 2 班', '跨学院创新实验班'][i % 3]!, status: i % 3 === 0 ? '进行中' : i % 3 === 1 ? '未开始' : '已结束', count: 32 + i * 3 }));
function PlatformPage({ route }: { route: Route }) {
  const [query, setQuery] = useState(''); const [status, setStatus] = useState('全部状态'); const [selected, setSelected] = useState<number | null>(null);
  const title = pages[route.page as keyof typeof pages] ?? '考试管理';
  const rows = examRows.map(row => route.page === 'exams' ? row : ({ ...row, name: `${title} · ${['本周教学安排', '跨班级协同记录', '课程资源检查', '教学进展汇总'][row.id % 4]}` })).filter(row => row.name.includes(query) && (status === '全部状态' || row.status === status));
  return <div className="nr-page-content">
    <Breadcrumb><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href={routeHref(route,{page:'home'})}>教学空间</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator/><Breadcrumb.Item><Breadcrumb.Page>{title}</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb>
    <div className="nr-page-heading nr-list-heading"><h1 tabIndex={-1}>{title}</h1></div>
    <Inline className="nr-list-tools" gap={12}>
      <span className="nr-result-count">共 {rows.length} 场考试</span>
      <Inline className="nr-toolbar-controls" gap={12}>
        <Input className="nr-search" size={36} leadingIcon={<SearchIcon aria-hidden="true"/>} aria-label="搜索考试" placeholder="搜索考试名称" value={query} onValueChange={setQuery}/>
        <Select size={36} aria-label="考试状态" value={status} clearable={false} options={['全部状态','未开始','进行中','已结束'].map(value=>({value,label:value}))} onValueChange={value=>setStatus(String(value))}/>
        <span className="nr-toolbar-action"><Button variant="primary" onClick={() => setSelected(0)}>新建考试</Button></span>
      </Inline>
    </Inline>
    {rows.length ? <TableScrollArea className="nr-table-wrap" aria-label="考试列表"><Table className="nr-table"><TableHeader><TableRow><TableHead>{route.page === 'exams' ? '考试名称' : '条目名称'}</TableHead><TableHead>编号</TableHead><TableHead>教学班级</TableHead><TableHead className="nr-cell-center">状态</TableHead><TableHead className="nr-cell-center">参与人数</TableHead><TableHead>更新时间</TableHead><TableHead className="nr-cell-center">操作</TableHead></TableRow></TableHeader><TableBody>{rows.map(row=><TableRow key={row.id} selected={selected===row.id}><TableCell><span className="nr-exam-name">{row.name}</span></TableCell><TableCell>EX-{String(row.id).padStart(4,'0')}</TableCell><TableCell>{row.group}</TableCell><TableCell className="nr-cell-center">{row.status==='未开始'?<Tag color="neutral">未开始</Tag>:row.status==='进行中'?<StatusTag status="进行中" showDot/>:<StatusTag status="已结束"/>}</TableCell><TableCell className="nr-cell-center">{row.count} 人</TableCell><TableCell className="nr-cell-updated">09-23 10:30</TableCell><TableCell className="nr-cell-center"><Button variant="text" tone="brand" size="regular" onClick={()=>setSelected(row.id)}>详情</Button></TableCell></TableRow>)}</TableBody></Table></TableScrollArea> : <Empty presentation="text" className="nr-table-empty"><EmptyTitle as="p">没有符合条件的考试，请调整搜索或筛选。</EmptyTitle></Empty>}
    <Sheet.Root open={selected!==null} onOpenChange={open=>{if(!open)setSelected(null);}}><Sheet.Portal><Sheet.Backdrop/><Sheet.Content side="right" aria-label="考试详情" className="nr-detail-sheet"><Sheet.Title>{selected===0?'新建考试（本地演示）':rows.find(row=>row.id===selected)?.name}</Sheet.Title><Sheet.Description>查看范围与考试安排。本地候选，不连接线上考试数据。</Sheet.Description><p>教学班级：{rows.find(row=>row.id===selected)?.group ?? '尚未选择'}</p><p>当前状态：{rows.find(row=>row.id===selected)?.status ?? '草稿'}</p><Sheet.Close>关闭详情</Sheet.Close></Sheet.Content></Sheet.Portal></Sheet.Root>
  </div>;
}
export function StateBoard({ route }: { route: Route }) {
  const [expanded,setExpanded]=useState<Record<string,boolean>>({});const [selected,setSelected]=useState('child');
  return <div className="nr-state-board"><h1>共同基础与状态</h1><p>相同内容、图标与排版；深浅面和密度独立对照。焦点请按 Tab 实测。</p><div className="nr-control-field"><span>父子当前关系</span><Select aria-label="状态板当前项" value={selected} clearable={false} options={[{value:'parent',label:'父级当前'},{value:'child',label:'子级当前'}]} onValueChange={value=>setSelected(String(value))}/></div><div className="nr-state-grid">{(['light','dark'] as const).flatMap(surface=>(['compact','default'] as const).map(density=><DensityProvider key={surface+density} density={density}><section className="nr-state-sample" data-rain-theme={surface}><h2>{surface==='dark'?'深色':'浅色'} · {density==='compact'?'紧凑':'标准'}</h2><NavRow entry={{id:'ordinary',label:'普通导航入口',href:routeHref(route,{page:'home'})}} current="current"/><NavRow entry={{id:'current',label:'当前入口与键盘焦点',href:routeHref(route,{page:'exams'})}} current="current"/><NavRow entry={{id:'long',label:'跨学院教学协作与资源质量检查的长名称',badge:'128',href:routeHref(route,{page:'resources'})}} current="current"/><NavRow entry={{id:'parent',label:'父级当前（独立访问）',href:routeHref(route,{page:'courses'}),children:[{id:'child',label:'子级当前',href:routeHref(route,{page:'course-content'})}]}} current={selected} expanded={!!expanded[surface+density]} onExpandedChange={()=>setExpanded(p=>({...p,[surface+density]:!p[surface+density]}))}/></section></DensityProvider>))}</div></div>;
}
function IsolationPage() {
  const [aDark,setADark]=useState(false); const [compact,setCompact]=useState(false);
  return <div className="nr-isolation"><header><h1>同页两实例 · 陌生业务再组合</h1><p>实验室设备预约。只修改 A 的面层或密度，B 保持原样。</p><Inline gap={12}><Button onClick={()=>setADark(!aDark)}>切换 A 面层</Button><Button onClick={()=>setCompact(!compact)}>切换 A 密度</Button></Inline></header><div className="nr-isolation-instance" data-instance="A" data-rain-theme={aDark?'dark':'light'}><DensityProvider density={compact?'compact':'default'}><LabWorkbench instance="A"/></DensityProvider></div><div className="nr-isolation-instance" data-instance="B" data-rain-theme="light"><DensityProvider density="default"><LabWorkbench instance="B"/></DensityProvider></div></div>;
}
export function NavigationRebuildPage() {
  const route=useRoute();
  const [surface,setSurface]=useState<Surface>(route.recipe==='S02'?'light':'dark');
  const [mode,setMode]=useState<RailMode>(route.recipe==='S04'?'icon':'full');
  const [mobileNavOpen,setMobileNavOpen]=useState(false);
  const [hidden,setHidden]=useState(false); const [density,setDensity]=useState<'compact'|'default'>('default');
  const [relation,setRelation]=useState(route.recipe==='S06'?'inset':route.recipe==='S07'?'floating':'edge');
  const [indicator,setIndicator]=useState<'fill'|'edge'>(route.recipe==='S03'?'edge':'fill');
  const [catalogQuery,setCatalogQuery]=useState('');
  const [scopeLoading,setScopeLoading]=useState(false);
  const restoreRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>setScopeLoading(false),[route.scene]);
  useEffect(()=>{setSurface(route.recipe==='S02'?'light':'dark');setMode(['S04','S05'].includes(route.recipe)?'icon':'full');setRelation(route.recipe==='S06'?'inset':route.recipe==='S07'?'floating':'edge');setIndicator(route.recipe==='S03'?'edge':'fill');},[route.recipe]);
  const navigate=(patch:Partial<Route>)=>{window.location.hash=routeHref(route,patch);};
  const entries=globalEntries(route).map(entry=>route.scene==='course'?{...entry,children:undefined}:entry);
  const topGlobal=['C01','N01','N02','S08'].includes(route.recipe);
  const railControls=!['catalog','states','isolation'].includes(route.view)&&route.scene!=='lab'&&!topGlobal;
  const shellControls=!['catalog','states','isolation'].includes(route.view)&&route.scene!=='lab';
  return <DensityProvider density={density}><div className="nr-app" data-rain-id="navigation-rebuild" data-recipe={route.recipe} data-focus-preview={route.view==='focus'}>
    {route.view==='focus'&&<a className="nr-exit-focus" href={routeHref(route,{view:'page'})}>返回候选目录</a>}<div className="nr-review-bar"><a className="nr-review-title" href={routeHref(route,{view:'page'})}>G3 导航重建 <span>v0.3 · 视觉待审核</span></a><nav aria-label="候选分区">{[['page','完整页面'],['catalog','12 个组合'],['states','共同基础 / 状态'],['isolation','实例隔离']].map(([view,label])=><a key={view} href={routeHref(route,{view})} aria-current={route.view===view?'page':undefined}>{label}</a>)}<a href={routeHref(route,{view:'focus'})}>专注预览</a><a href="#token-first-g3">旧版对照</a></nav></div>
    <div className="nr-controls">
      <div className="nr-control-field"><span>样例</span><Select aria-label="页面样例" value={route.scene} clearable={false} options={([['platform','平台考试'],['course','课程 / 班级'],['tools','导航面板'],['commands','文档命令'],['lab','设备预约']] as const).map(([value,label])=>({value,label}))} onValueChange={value=>navigate({scene:String(value) as Scene,unit:''})}/></div>
      <div className="nr-control-field"><span>组合</span><Select aria-label="导航组合" value={route.recipe} clearable={false} options={[...recipes.map(([id,name])=>({value:id,label:`${id} ${name}`})),{value:'S03',label:'S03 边缘指示'},{value:'S07',label:'S07 浮动对照'},{value:'C01',label:'C01 顶部＋左侧'}]} onValueChange={value=>{const next=String(value);const match=recipes.find(x=>x[0]===next);const sameFamily=[['S01','S02','S03','S04','S06','S07'],['N01','N02'],['M01','M02'],['N03','N04']].some(group=>group.includes(next)&&group.includes(route.recipe));const scene=sameFamily?route.scene:next==='C01'?'course':match?.[2]??route.scene;navigate({recipe:next,scene,unit:'',page:sameFamily?route.page:scene==='course'?'course-content':route.page});}}/></div>
      <div className="nr-control-field"><span>面层</span><Select aria-label="导航表面" disabled={!railControls} value={surface} clearable={false} options={[{value:'dark',label:'深色'},{value:'light',label:'浅色'}]} onValueChange={value=>setSurface(value as Surface)}/></div>
      <div className="nr-control-field"><span>密度</span><Select aria-label="导航密度" value={density} clearable={false} options={[{value:'default',label:'标准'},{value:'compact',label:'紧凑'}]} onValueChange={value=>setDensity(value as 'compact'|'default')}/></div>
      <div className="nr-control-field"><span>形态</span><Select aria-label="导航形态" disabled={!railControls} value={mode} clearable={false} options={[{value:'full',label:'完整'},{value:'icon',label:'纯图标'},{value:'short',label:'图标＋短文字'}]} onValueChange={value=>setMode(value as RailMode)}/></div>
      <div className="nr-control-field"><span>区域</span><Select aria-label="页面关系" disabled={!shellControls} value={relation} clearable={false} options={[{value:'edge',label:'贴边'},{value:'inset',label:'内嵌主区'},{value:'floating',label:'浮动对照'}]} onValueChange={value=>setRelation(String(value))}/></div>
      <div className="nr-control-field"><span>当前项</span><Select aria-label="导航当前表达" disabled={!railControls} value={indicator} clearable={false} options={[{value:'fill',label:'弱填充'},{value:'edge',label:'边缘指示'}]} onValueChange={value=>setIndicator(value as 'fill'|'edge')}/></div>
      {route.view==='page'&&route.scene==='course'&&!route.unit&&<Popover.Root><Popover.Trigger className="nr-quiet-button">课程测试</Popover.Trigger><Popover.Content className="nr-popup nr-course-test-panel" width={280} aria-label="课程测试"><Popover.Title>课程测试</Popover.Title><Popover.Description>仅调整预览样本与加载状态。</Popover.Description><div className="nr-fixture-field"><span>班级样本</span><Select aria-label="班级样本数量" value={route.count} clearable={false} options={[0,1,4,12,200].map(value=>({value,label:String(value)}))} onValueChange={value=>navigate({count:Number(value)})}/></div><Button variant="tertiary" aria-pressed={scopeLoading} onClick={()=>setScopeLoading(!scopeLoading)}>{scopeLoading?'恢复课程内容':'模拟课程加载'}</Button></Popover.Content></Popover.Root>}
    </div>
    {route.view==='catalog'?<div className="nr-catalog"><h1>十二个导航组合</h1><Input aria-label="搜索组合" placeholder="搜索 ID、家族或用途，如：父级、收起、富链接" value={catalogQuery} onChange={e=>setCatalogQuery(e.target.value)}/><div className="nr-catalog-grid">{recipes.filter(r=>r.join(' ').toLowerCase().includes(catalogQuery.toLowerCase())).map(([id,name,scene,keywords])=>{const card=catalog.find(c=>c.id===id)!;const file=id.startsWith('M')?'commands':id.startsWith('N')?'top-navigation':['S05','S08'].includes(id)?'course':'parts';return <article key={id}><small>{id} · {card.category} · local-candidate</small><h2>{name}</h2><p>{card.description}</p><a className="nr-open-preview" href={routeHref(route,{recipe:id,scene,view:'page',page:scene==='course'?'course-content':'exams',unit:''})}>打开全尺寸预览</a><p>适用：{card.useWhen.join('；')}</p><p>避免：{card.doNotUseWhen.join('；')}</p><details><summary>研究参考、源码与状态</summary><img src={new URL(`./references/${id}.png`,import.meta.url).href} alt={`${id} 原包研究示意，非运行截图`}/><p>原包 v0.2 研究图 · 不作为当前验收证据</p><p>真实源码：apps/prototype/src/scenarios/token-first-g3/rebuild/{file}.tsx</p><p>实际出口：{file==='commands'?'CommandWorkbench':file==='top-navigation'?'TopNavigation':file==='course'?'CourseWorkspace':'NavigationRail / NavRow'}</p><p>状态：{card.states.join(' / ')}</p><p>Token角色：{card.tokenRequirements.join(', ')}</p><p>运行检查：{card.acceptance.visualChecks.join(', ')}，实际结果见工作包 acceptance/results.json</p><p>视觉：pending-review · 公共API和发布未批准</p><details><summary>当前可消费源码</summary><pre>{candidateSources[`./${file}.tsx`]}</pre></details></details></article>})}</div></div>:route.view==='states'?<div className="nr-board-scroll"><StateBoard route={route}/><CommandStateBoard/></div>:route.view==='isolation'?<IsolationPage/>:route.scene==='lab'?<LabWorkbench instance="A"/>:<div className="nr-preview-frame">{topGlobal&&<div className="nr-global-top"><a className="nr-top-brand" href={routeHref(route,{page:'home',scene:'platform'})}>雨课堂</a><TopNavigation route={route} variant={route.recipe==='N02'?'soft':'underline'}/><span className="nr-avatar">林</span></div>}<div className="nr-shell" data-relation={relation}>
      {!hidden&&!topGlobal&&<NavigationRail entries={entries} current={route.scene==='course'?'courses':route.page} surface={surface} mode={mode} onModeChange={setMode} indicator={indicator}/>}
      <section className="nr-workspace">{!topGlobal&&<header className="nr-workspace-head"><button className="nr-quiet-button nr-mobile-nav" onClick={()=>setMobileNavOpen(true)}>打开全局导航</button><button ref={restoreRef} className="nr-quiet-button" onClick={()=>{setHidden(!hidden);restoreRef.current?.focus();}} aria-label={hidden?'恢复全局导航':'隐藏全局导航'}><MoreHorizontalIcon aria-hidden="true"/>{hidden?'恢复导航':'隐藏导航'}</button><span>教师工作空间</span><span className="nr-head-end">2026 秋季学期 <span className="nr-avatar">林</span></span></header>}<main className={`nr-main-scroll ${route.scene==='course'?'nr-main-course':''}`} data-slot="workspace-main">{route.scene==='course'?<CourseWorkspace route={route} scopeLoading={scopeLoading}/>:route.scene==='tools'?<NavigationPanelsDemo route={route}/>:route.scene==='commands'?<><CommandWorkbench instance="A" appearance={route.recipe==='M02'?'framed':'plain'}/><CommandWorkbench instance="B" appearance="framed"/></>:<PlatformPage route={route}/>}</main></section>
    </div></div>}
    <Sheet.Root open={mobileNavOpen} onOpenChange={setMobileNavOpen}><Sheet.Portal><Sheet.Backdrop/><Sheet.Content side="left" aria-label="全局导航面板" className="nr-mobile-sheet"><Sheet.Title>全局导航</Sheet.Title><Sheet.Description>窄视口导航入口</Sheet.Description><div onClick={event=>{if((event.target as HTMLElement).closest('a'))setMobileNavOpen(false);}}><NavigationRail entries={entries} current={route.scene==='course'?'courses':route.page} surface={surface} mode="full" label="窄视口全局导航"/></div><Sheet.Close className="nr-quiet-button">关闭导航</Sheet.Close></Sheet.Content></Sheet.Portal></Sheet.Root>
  </div></DensityProvider>;
}
