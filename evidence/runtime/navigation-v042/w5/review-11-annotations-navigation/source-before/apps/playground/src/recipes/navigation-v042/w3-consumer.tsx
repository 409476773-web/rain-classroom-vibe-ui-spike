import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Input, NavigationTabs, SegmentedControl } from '@rain-next/ui';
import { ConnectedSurface } from '@rain-next/layouts';
import { R1Recipe, R3Recipe } from './r1-r3';
import { R4Recipe, R5Recipe, R6Recipe } from './r4-r6';
import { WorkspaceStateSample } from './workspace-states';
import '@rain-next/foundations/tokens.css';
import '@rain-next/foundations/typography.css';
import '@rain-next/foundations/motion.css';
import '@rain-next/foundations/focus.css';
import '@rain-next/ui/styles.css';
import '@rain-next/layouts/styles.css';
import './consumer.css';

function IsolationPane({id,title,compact=false,connection='inset'}:{id:string;title:string;compact?:boolean;connection?:'inset'|'merged'}){
  const [active,setActive]=useState<string|number|null>('edit'),[draft,setDraft]=useState(''),[filter,setFilter]=useState('all');
  return <section aria-label={`实例 ${id}`} style={{width:580,padding:16,border:'1px solid var(--rain-color-border-default)'}}><h2>{title}</h2>
    <SegmentedControl legend={`实例 ${id} 条件`} name={`instance-${id}-filter`} density={compact?'compact':'regular'} options={[{value:'all',label:'全部'},{value:'recent',label:'最近更新'}]} value={filter} onValueChange={value=>value&&setFilter(value)}/>
    <NavigationTabs aria-label={`实例 ${id} 内容`} visualPreset="navigation-browser" value={active} onValueChange={setActive} renderSurface={({track,panels})=><ConnectedSurface instanceId={`isolation-${id}`} connection={connection} activeKey={active} track={track}>{panels}</ConnectedSurface>} items={[
      {value:'edit',label:title,content:<label>本地草稿<Input aria-label={`实例 ${id} 草稿`} value={draft} onValueChange={setDraft}/></label>},
      {value:'preview',label:'预览',content:<p>{draft||'暂无内容'}</p>},
    ]}/>
  </section>;
}
function InstanceIsolation(){
  const [name,setName]=useState('资料审核 B'),[compact,setCompact]=useState(false),[connection,setConnection]=useState<'inset'|'merged'>('inset');
  return <><fieldset><legend>仅调整实例 B</legend><label>名称<Input aria-label="实例 B 名称" value={name} onValueChange={setName}/></label><label><input type="checkbox" checked={compact} onChange={event=>setCompact(event.target.checked)}/>紧凑条件</label><label>连接<select aria-label="实例 B 连接" value={connection} onChange={event=>setConnection(event.target.value as 'inset'|'merged')}><option value="inset">内缩</option><option value="merged">贴边</option></select></label></fieldset><div style={{display:'flex',gap:16}}><IsolationPane id="A" title="资料审核 A"/><IsolationPane id="B" title={name} compact={compact} connection={connection}/></div></>;
}
function Consumer(){
  const [scene,setScene]=useState('plan');
  if(scene==='paired-replay')return <main style={{minWidth:1200}}><button onClick={()=>setScene('plan')}>返回场景选择</button><section aria-label="回放实例 A"><R5Recipe/></section><section aria-label="回放实例 B"><R5Recipe/></section></main>;
  return <main style={{minWidth:1200}}><SegmentedControl legend="独立工作区场景" name="consumer-scenario" options={[{value:'plan',label:'课程体系诊断'},{value:'industry',label:'产业链图谱'},{value:'files',label:'云盘'},{value:'errors',label:'错题集'},{value:'interaction',label:'课堂互动'},{value:'grading',label:'教师批改'},{value:'playback',label:'课堂回放'},{value:'nested',label:'协作空间'},{value:'ribbon',label:'文档工具'},{value:'isolation',label:'实例隔离'},{value:'paired-replay',label:'双回放实例'}]} value={scene} onValueChange={value=>value&&setScene(value)}/>{scene==='isolation'?<InstanceIsolation/>:scene==='interaction'||scene==='grading'?<R4Recipe scene={scene}/>:scene==='playback'?<R5Recipe/>:scene==='nested'?<R6Recipe/>:scene==='ribbon'?<WorkspaceStateSample scene="S5" instanceId="independent-ribbon"/>:scene==='plan'||scene==='industry'?<R1Recipe scene={scene}/>:<R3Recipe scene={scene==='files'?'files':'errors'}/>}</main>;
}
const root=document.getElementById('root');
if(!root)throw new Error('W3 consumer root was not found');
createRoot(root).render(<StrictMode><Consumer/></StrictMode>);
