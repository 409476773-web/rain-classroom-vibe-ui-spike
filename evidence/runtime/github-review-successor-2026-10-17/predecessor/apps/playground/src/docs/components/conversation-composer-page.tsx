import { useMemo, useState } from "react";
import { Button, ConversationComposer, RadioGroup, type ComposerDraft } from "@rain-next/ui";
import { ComponentDoc, DocExample } from "./component-doc";
import { createG6ReferenceService, mockG6Transcribe, mockG6Upload, useG6Composer } from "./g6-composer-adapters";
import "./conversation-composer-page.css";

function ComposerExample({label,surface,initialLayout,workbench=false}:{label:string;surface:"gray"|"white";initialLayout:"compact"|"expanded";workbench?:boolean}) {
  const [layout,setLayout]=useState(initialLayout),[conversation,setConversation]=useState("course-a"),[failSend,setFailSend]=useState(false),[failUpload,setFailUpload]=useState(false),[failTranscribe,setFailTranscribe]=useState(false),[help,setHelp]=useState(false),[sent,setSent]=useState<string[]>([]);
  const service=useMemo(createG6ReferenceService,[]);
  const composer=useG6Composer(conversation,{
    allowAttachmentsOnly:true,
    constraints:{maxFiles:5,maxFileSize:20*1024*1024,maxTotalSize:40*1024*1024,duplicates:"reject"},
    upload:async(file,context)=>{if(failUpload)throw new Error("本地模拟上传失败，可关闭开关后重试。");return mockG6Upload(file,context);},
    submit:async(snapshot,{signal})=>{
      await new Promise(resolve=>setTimeout(resolve,180));
      if(signal.aborted)throw new DOMException("已取消","AbortError");
      if(failSend)throw new Error("发送失败，内容已保留。");
      setSent(items=>[...items,`${snapshot.draft.text||snapshot.attachments.map(item=>item.name).join("、")}`]);
    },
  });
  const scope=composer.draft.sourceScope??"course";
  const blocked=composer.submitFeedbackReason;
  const draft:ComposerDraft={...composer.draft,sourceScope:scope};
  return <section className="composer-demo" aria-label={label}>
    {workbench&&<RadioGroup legend="页面内会话草稿" orientation="horizontal" value={conversation} options={[{value:"course-a",label:"会话 A"},{value:"course-b",label:"会话 B"}]} onValueChange={setConversation}/>}
    <ConversationComposer conversationId={`${label}:${conversation}`} draft={draft} draftRevision={composer.draftRevision} onDraftChange={composer.setDraft}
      surface={surface} layout={layout} onLayoutChange={setLayout} aria-label={`${label}内容`} formLabel={label} placeholder="结合课程资料，写下你的问题…"
      attachments={composer.attachments} references={service} sources={[{value:"references",label:"本次引用资料",description:"仅检索已添加的资料",disabledReason:!draft.references.length?"请先添加引用资料":undefined},{value:"course",label:"本课程资料",description:"检索本课程的可用资料"}]}
      voice={{transcribe:async(blob,context)=>{if(failTranscribe)throw new Error("本地模拟转写失败");return mockG6Transcribe(blob,context);},onPermissionHelp:()=>setHelp(value=>!value)}}
      submission={composer.submission} submitBlockedReason={blocked} onSubmit={()=>void composer.onSubmit()}/>
    {help&&<p className="composer-demo__note">在浏览器地址栏的网站权限中允许麦克风，并检查系统麦克风权限；开启后再次点击语音输入。</p>}
    {sent.length>0&&<p className="composer-demo__note" role="status">本地接收：{sent[sent.length-1]}</p>}
    {workbench&&<details className="composer-demo__controls"><summary>演示控制</summary><div>
      <Button variant="text" aria-pressed={failSend} onClick={()=>setFailSend(value=>!value)}>模拟发送失败：{failSend?"开":"关"}</Button>
      <Button variant="text" aria-pressed={failUpload} onClick={()=>setFailUpload(value=>!value)}>模拟上传失败：{failUpload?"开":"关"}</Button>
      <Button variant="text" aria-pressed={failTranscribe} onClick={()=>setFailTranscribe(value=>!value)}>模拟转写失败：{failTranscribe?"开":"关"}</Button>
      <Button variant="text" onClick={()=>composer.setDraft({...draft,reply:{messageId:"example-reply",author:"王同学",excerpt:"记录本身不能证明理解，还需要听听他怎样解释。"}})}>加入回复对象</Button>
      <Button variant="text" onClick={()=>composer.setDraft({...draft,text:"从一段课堂观察出发，区分事实、解释与待验证的问题。\n".repeat(12)})}>填入长草稿</Button>
    </div></details>}
  </section>;
}

export function ConversationComposerPage(){
  return <ComponentDoc id="conversation-composer" category="Pattern / Recipe" title="ConversationComposer 对话输入" description="在同一份草稿中准备文字、资料、引用或回复，再明确发送。"
    useWhen={["AI 答疑、聊天和讨论需要共享的输入体验。","需要真实文件生命周期、语音输入适配与失败保稿。"]} avoidWhen={["只需普通表单多行字段。","需要内置消息服务、课程权限或跨设备草稿同步。"]}
    source="packages/ui/src/conversation-composer/index.ts" slots={["context","editor","toolbar","primary-action","feedback"]}
    props={[{name:"draft / draftRevision",type:"ComposerDraft / number",description:"宿主受控内容版本；上传进度不算用户编辑。"},{name:"surface / layout",type:"gray | white / compact | expanded",description:"两种表面与两种布局独立；切换保留草稿和光标。"},{name:"attachments / references / voice",type:"可选能力组",description:"附件状态只有一个所有者；服务由宿主接入。"},{name:"submission / generation",type:"独立受控状态",description:"确认前保稿，AI 回答时可准备下一稿。"}]}
    code={`<ConversationComposer\n  conversationId={id} draft={draft} draftRevision={revision}\n  onDraftChange={setDraft} aria-label="消息内容"\n  attachments={attachmentAdapter} references={referenceService}\n  voice={{ transcribe }} submission={submission}\n  onSubmit={submitSnapshot}\n/>`}>
    <DocExample title="交互体验" description="添加资料、切换范围或使用语音；演示控制可重现失败与长草稿。"><ComposerExample label="恢复与会话示例" surface="white" initialLayout="expanded" workbench/></DocExample>
    <DocExample title="表面与布局" description="四个独立草稿均可输入、添加资料与展开。Enter 换行，点击发送按钮提交。"><div className="composer-demo-grid">
      <div><h4>灰底 · 紧凑</h4><ComposerExample label="灰底紧凑示例" surface="gray" initialLayout="compact"/></div>
      <div><h4>白底 · 紧凑</h4><ComposerExample label="白底紧凑示例" surface="white" initialLayout="compact"/></div>
      <div><h4>灰底 · 展开</h4><ComposerExample label="灰底展开示例" surface="gray" initialLayout="expanded"/></div>
      <div><h4>白底 · 展开</h4><ComposerExample label="白底展开示例" surface="white" initialLayout="expanded"/></div>
    </div></DocExample>
    <DocExample title="接入与验证边界"><p>录音使用浏览器真实录音能力；本页上传、转写、课程资料和消息接收均为本地模拟。转写成功后先审阅文字，再发送。尚未处理的保留录音需要重试或明确丢弃。</p><p>实际课程答疑和课堂讨论见 <a href="#message-scroller">会话滚动与场景组合</a>。业务接口、权限、消息幂等与持久化由宿主提供；真实设备与服务验证单独记录。</p></DocExample>
  </ComponentDoc>;
}
