import { useRef, useState } from 'react';
import { Button, Dialog, FormItem, Input, Select, type TreeKey, type TreeNodeRecord } from '@rain-next/ui';
import { CourseIcon } from '@rain-next/ui/icons/course';
import { ManageTree, type ManageTreeEditorContext, type ManageTreeProps, type ManageTreeViewState } from '../../patterns/manage-tree/manage-tree';

const names=['第一章 · 函数、极限与连续','1.1 函数的基本概念','函数的定义与表示','函数的性质','1.2 极限与连续','数列极限','极限的定义','收敛性与极限运算','两个重要极限','常见题型与方法','例题与拓展练习','函数的连续性','1.3 习题与应用','第二章 · 导数与微分','2.1 导数的概念','2.2 导数的应用'];
const parents=[-1,0,1,1,0,4,5,5,7,8,9,4,0,-1,13,13];
const types=['','','讲义','视频','','','讲义','','','','作业','讲义','作业','','讲义','考试'];
const counts=[20,6,2,4,8,3,1,2,2,2,2,5,6,16,8,8];
type ResourceInfo = { type: string; count: number; unpublished?: boolean };
const info=(node:TreeNodeRecord)=>node.source as ResourceInfo;
function initialData(parent=-1):TreeNodeRecord[] {
  return names.flatMap((title,i)=>parents[i]!==parent?[]:[{key:`node${i}`,title,canHaveChildren:!types[i],
    ...(!types[i]?{children:initialData(i)}:{}),source:{type:types[i],count:counts[i]}}]);
}
function resourceStats(nodes:readonly TreeNodeRecord[]):{nodes:number;depth:number;units:number} {
  return nodes.reduce((total,node)=>{
    const child=resourceStats(node.children??[]);
    return {nodes:total.nodes+1+child.nodes,depth:Math.max(total.depth,1+child.depth),units:total.units+(info(node).type?info(node).count:child.units)};
  },{nodes:0,depth:0,units:0});
}
function ResourceEditor({value,onChange,confirm,cancel,validating,error}:ManageTreeEditorContext) {
  const data=info(value);
  return <Dialog.Root open onOpenChange={open=>{if(!open)cancel();}}>
    <Dialog.Content width={416} finalFocus={false}>
      <Dialog.Header><Dialog.Title>编辑内容节点</Dialog.Title><Dialog.Description>知识点可承载子内容，学习任务不包含子节点。确认后写入草稿。</Dialog.Description></Dialog.Header>
      <Dialog.Body className="nv42-resource-fields">
        <FormItem label="节点名称"><Input size={36} clearable={false} value={value.title} onValueChange={title=>onChange({...value,title})}/></FormItem>
        <FormItem label="内容类型" help={value.children?.length?'已有子内容的知识点不能改为学习任务。':undefined}>
          <Select size={36} value={data.type||'knowledge'} disabled={Boolean(value.children?.length)}
            options={[{value:'knowledge',label:'知识点'},...['讲义','视频','作业','考试'].map(type=>({value:type,label:type}))]}
            onValueChange={type=>{if(type)onChange({...value,canHaveChildren:type==='knowledge',source:{...data,type:type==='knowledge'?'':type,count:type==='knowledge'?0:data.count||1}});}}/>
        </FormItem>
        {error&&<p role="alert">{error}</p>}
      </Dialog.Body>
      <Dialog.Footer><Button variant="secondary" onClick={cancel}>取消编辑</Button><Button loading={validating} disabled={validating} onClick={()=>void confirm()}>确认编辑</Button></Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>;
}

/** Local course-resource fixture; ManageTree owns all uncommitted fields and structure. */
export function CourseResources({onFeedback}:{onFeedback:(message:string)=>void}) {
  const [record,setRecord]=useState(()=>({data:initialData() as readonly TreeNodeRecord[],revision:'1'}));
  const [view,setView]=useState<ManageTreeViewState>({expandedKeys:names.flatMap((_,i)=>types[i]?[]:[`node${i}`]),selectedKeys:['node4'],focusedKey:null});
  const [filter,setFilter]=useState('全部');
  const nextKey=useRef(100);
  const stats=resourceStats(record.data);
  const save:ManageTreeProps['onSave']=async({draft,baseRevision,signal})=>{
    if(signal.aborted)throw new Error('保存已取消');
    if(baseRevision!==record.revision)return {status:'conflict'};
    const keyMap=new Map<TreeKey,TreeKey>();
    const canonical=(nodes:readonly TreeNodeRecord[]):TreeNodeRecord[]=>nodes.map(node=>{
      const key=String(node.key).startsWith('tmp-')?`resource-${++nextKey.current}`:node.key;
      if(key!==node.key)keyMap.set(node.key,key);
      return {...node,key,...(node.children?{children:canonical(node.children)}:{})};
    });
    const treeData=canonical(draft),revision=String(Number(record.revision)+1);
    setRecord({data:treeData,revision});
    return {status:'success',treeData,revision,keyMap};
  };
  return <>
    <div className="nv42-table-tools">
      <div className="nv42-stats" aria-label="已保存内容统计"><span>{stats.depth} 级结构</span><span>{stats.nodes} 个内容节点</span><span>{stats.units} 个学习单元</span></div>
      <div className="nv42-filter" role="radiogroup" aria-label="内容类型">{['全部','作业','考试'].map((value,index)=><button key={value} role="radio" aria-checked={filter===value} tabIndex={filter===value?0:-1} onClick={()=>setFilter(value)} onKeyDown={e=>{if(['ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();const next=(index+(e.key==='ArrowRight'?1:2))%3;setFilter(['全部','作业','考试'][next]!);(e.currentTarget.parentElement?.children[next] as HTMLElement)?.focus();}}}>{value}</button>)}</div>
    </div>
    <div className="nv42-resource-help">统计为已保存内容。通过行尾操作新增、编辑或删除；拖动手柄排序。{filter!=='全部'?'筛选中暂不可排序，切回“全部”后操作。':'修改后保存草稿，取消可放弃本轮修改。'}</div>
    <ManageTree data={record.data} revision={record.revision} defaultMode="edit" viewState={view} onViewStateChange={setView}
      adapter={{
        createNode:(key,parent)=>({key,title:parent===null?'新知识点':'新学习任务',canHaveChildren:parent===null,source:{type:parent===null?'':'讲义',count:parent===null?0:1,unpublished:true}}),
        canAdd:node=>node===null||!info(node).type,
        validateField:(_,next)=>info(next).type&&next.children?.length?'请先移出子内容，再改为学习任务。':undefined,
      }}
      onSave={save} onFeedback={({message})=>onFeedback(message==='保存成功'?'已保存到本地示例，未发布。':message)}
      renderEditor={context=><ResourceEditor {...context} onChange={next=>{onFeedback('');context.onChange(next);}}/>}
      treeOptions={{'aria-label':'课程内容编辑树',variant:'basic',density:'default',showLine:true,
        search:{query:filter==='全部'?'':filter,mode:'filter',matcher:(node,query)=>info(node).type===query},
        renderLeading:node=>info(node).type?<span className="nv42-type" data-type={info(node).type}>{info(node).type}</span>:<CourseIcon size={16}/>,
        renderMeta:node=><span className="nv42-tree-meta"><span>{info(node).type?(info(node).unpublished?'未发布':'已发布'):`${resourceStats(node.children??[]).units} 个学习单元`}</span><span>{info(node).unpublished?'尚未发布':'09-24 更新'}</span></span>,
      }}/>
  </>;
}
