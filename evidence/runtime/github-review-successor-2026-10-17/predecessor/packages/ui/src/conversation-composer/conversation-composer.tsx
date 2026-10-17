import { forwardRef, useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { IconButton } from "../icon-button/icon-button";
import { Button } from "../button/button";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { Popover } from "../popover/popover";
import { RadioGroup } from "../radio/radio";
import { Attachment, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentTrigger } from "../attachment/attachment";
import { AttachmentPreview } from "../attachment-workflow/attachment-preview";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { AddIcon } from "../icons/add";
import { PublishFilledIcon } from "../icons/publish-filled";
import { RefreshIcon } from "../icons/refresh";
import { MicrophoneOnIcon } from "../icons/microphone-on";
import { StopPlaybackIcon } from "../icons/stop-playback";
import { CloseIcon } from "../icons/close";
import { MaximizeIcon } from "../icons/maximize";
import { MinimizeIcon } from "../icons/minimize";
import { FileIcon } from "../icons/file";
import { ResourceIcon } from "../icons/resource";
import { ArrowDownIcon } from "../icons/arrow-down";
import { ComposerContextPicker } from "./composer-context-picker";
import { useComposerVoice } from "./use-composer-voice";
import type { ConversationComposerProps } from "./types";
import type { AttachmentRecord } from "../attachment-workflow/types";
import "./conversation-composer.css";

const sendRecipe = defineRainLocalRecipe({ id: "conversation-composer-send", scope: "feature", origin: "ui-icon-button", classes: { root: "rain-composer__send" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed" });
const attachmentState = (status: AttachmentRecord["status"]) => status === "canceled" ? "idle" : status ?? "done";
const uploadText = { idle:"等待上传", uploading:"上传中", processing:"处理中", error:"上传失败", canceled:"已取消", done:"" };

export const ConversationComposer = forwardRef<HTMLTextAreaElement, ConversationComposerProps>(function ConversationComposer(props, forwardedRef) {
  const { conversationId, draft, draftRevision, onDraftChange, surface="gray", layout: controlledLayout, onLayoutChange,
    attachments, references, sources, voice: voiceService, submission={status:"idle"}, generation, disabled=false, readOnly=false } = props;
  const [localLayout,setLocalLayout]=useState<"compact"|"expanded">("compact"), [pickerOpen,setPickerOpen]=useState(false), [menuOpen,setMenuOpen]=useState(false), [scopeOpen,setScopeOpen]=useState(false), [materialsExpanded,setMaterialsExpanded]=useState(false);
  const [previewSelection,setPreviewSelection]=useState<{id:string;version:number}|null>(null), [removeErrors,setRemoveErrors]=useState<Record<string,string>>({});
  const [,refreshRemovals]=useState(0);
  const editor=useRef<HTMLTextAreaElement>(null), editorShell=useRef<HTMLDivElement>(null), addButton=useRef<HTMLButtonElement>(null), fileInput=useRef<HTMLInputElement>(null), current=useRef(props), composing=useRef(false), voiceCancel=useRef<HTMLButtonElement>(null), voiceRetry=useRef<HTMLButtonElement>(null), lastVoiceStatus=useRef("idle"), id=useId();
  const mounted=useRef(true), epoch=useRef({id:conversationId,version:0}), removeAttempts=useRef(new Map<string,symbol>()), pickerTimer=useRef<ReturnType<typeof setTimeout>|null>(null), pickerOwner=useRef(conversationId), voicePhase=useRef("idle");
  if(epoch.current.id!==conversationId){epoch.current={id:conversationId,version:epoch.current.version+1};removeAttempts.current.clear();}
  current.current=props;
  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;if(pickerTimer.current!==null)clearTimeout(pickerTimer.current);removeAttempts.current.clear();};},[]);
  useImperativeHandle(forwardedRef,()=>editor.current!,[]);
  const focus=()=>editor.current?.focus({preventScroll:true});
  const voiceEnabled=!disabled&&!readOnly&&submission.status!=="pending"&&!generation?.running;
  const voice=useComposerVoice({conversationId,draftRevision,enabled:voiceEnabled,transcribe:voiceService?.transcribe,getSelectionEnd:()=>editor.current?.selectionEnd??null,
    onTranscript:(text,position)=>{
      const latest=current.current, body=latest.draft.text, at=position!==null&&position>=0&&position<=body.length?position:body.length;
      const version=epoch.current.version,node=editor.current,nextText=body.slice(0,at)+text+body.slice(at);
      latest.onDraftChange({...latest.draft,text:nextText});
      requestAnimationFrame(()=>{if(mounted.current&&epoch.current.version===version&&editor.current===node&&current.current.draft.text===nextText){focus();node?.setSelectionRange(at+text.length,at+text.length);}});
    }});
  voicePhase.current=voice.status;
  const writableNow=()=>{const latest=current.current;return !latest.disabled&&!latest.readOnly&&latest.submission?.status!=="pending"&&!["requesting","recording","transcribing"].includes(voicePhase.current);};
  const layout=controlledLayout??localLayout;
  const previousLayout=useRef(layout), layoutConversation=useRef(conversationId);
  const layoutFocus=useRef<{layout:"compact"|"expanded";version:number;trigger:Element|null}|null>(null);
  const voiceBusy=["requesting","recording","transcribing"].includes(voice.status), retained=voice.status==="retained";
  const locked=disabled||readOnly||submission.status==="pending"||voiceBusy;
  const preview=previewSelection?.version===epoch.current.version?attachments?.items.find(item=>item.id===previewSelection.id)??null:null;
  const removingIds=new Set([...(attachments?.removingIds??[]),...removeAttempts.current.keys()]);
  const fileBlocked=attachments?.items.some(item=>Boolean(item.replacement)||(item.status!==undefined&&item.status!=="done")||(item.availability!==undefined&&item.availability!=="available"))||removingIds.size>0;
  const blocked=props.submitBlockedReason||(removingIds.size?"正在移除附件，请稍候。":fileBlocked?"请先完成上传，或移除未就绪的附件。":draft.references.some(item=>item.availability!=="available")?"请移除或重新选择暂不可用的资料。":retained?"请先完成转写或丢弃保留的录音。":undefined);
  const hasContent=Boolean(draft.text.trim()||attachments?.items.length);
  const canSubmit=!locked&&!blocked&&!generation?.running&&hasContent;
  const voiceReason=generation?.running?"回答期间可先输入文字，结束后再使用语音。":retained?"请先处理保留的录音。":!voice.available?"当前浏览器暂不支持录音，可继续输入文字。":undefined;
  useEffect(()=>{
    if(lastVoiceStatus.current===voice.status)return;
    const before=lastVoiceStatus.current;lastVoiceStatus.current=voice.status;
    if(voiceBusy)voiceCancel.current?.focus({preventScroll:true});
    else if(retained&&voiceEnabled)voiceRetry.current?.focus({preventScroll:true});
    else if(before!=="idle")focus();
  },[voice.status,voiceBusy,retained,voiceEnabled]);
  useEffect(()=>{setPickerOpen(false);setMenuOpen(false);setScopeOpen(false);setPreviewSelection(null);setRemoveErrors({});setMaterialsExpanded(false);},[conversationId]);
  useEffect(()=>{if(locked){setPickerOpen(false);setMenuOpen(false);setScopeOpen(false);if(pickerTimer.current!==null){clearTimeout(pickerTimer.current);pickerTimer.current=null;}}},[locked]);
  useLayoutEffect(()=>{
    const node=editor.current,shell=editorShell.current;if(!node||!shell)return;
    const grow=(animate=false)=>{
      const scrollTop=node.scrollTop,ceiling=Number.parseFloat(getComputedStyle(node).maxHeight)||(layout==="compact"?112:208);
      const previousHeight=Number.parseFloat(shell.style.height)||node.clientHeight;
      const wasAtEnd=scrollTop>0&&node.scrollHeight-previousHeight-scrollTop<=1;
      node.style.height="auto";const height=Math.max(24,node.scrollHeight);
      node.style.height=`${Math.min(height,ceiling)}px`;node.style.overflowY=height>ceiling?"auto":"hidden";
      // Animate the surrounding space, never scale the text or delay native editing.
      shell.dataset.resizing=String(animate);
      shell.style.height=`${node.getBoundingClientRect().height}px`;
      if(animate)node.scrollTop=wasAtEnd?node.scrollHeight-node.clientHeight:scrollTop;
    };
    grow(previousLayout.current!==layout&&layoutConversation.current===conversationId);
    previousLayout.current=layout;layoutConversation.current=conversationId;
    const requestedFocus=layoutFocus.current;
    if(requestedFocus?.version!==epoch.current.version||requestedFocus?.layout===layout)layoutFocus.current=null;
    if(requestedFocus?.version===epoch.current.version&&requestedFocus.layout===layout&&
      (document.activeElement===node||document.activeElement===requestedFocus.trigger)){
      // Native focus reveals the caret in the resized textarea; keep the surrounding page anchored.
      const scrollPositions:Array<{element:HTMLElement;top:number;left:number}>=[];
      for(let parent=node.parentElement;parent;parent=parent.parentElement){
        if(parent.scrollHeight>parent.clientHeight||parent.scrollWidth>parent.clientWidth)
          scrollPositions.push({element:parent,top:parent.scrollTop,left:parent.scrollLeft});
      }
      node.focus();
      for(const {element,top,left} of scrollPositions){
        if(element.scrollTop!==top)element.scrollTop=top;
        if(element.scrollLeft!==left)element.scrollLeft=left;
      }
    }
    let width=node.clientWidth,frame:number|undefined;
    const scheduleGrow=()=>{if(frame===undefined)frame=requestAnimationFrame(()=>{frame=undefined;grow();});};
    const observer=typeof ResizeObserver==="undefined"?undefined:new ResizeObserver(()=>{if(node.clientWidth!==width){width=node.clientWidth;scheduleGrow();}});
    observer?.observe(node);window.addEventListener("resize",scheduleGrow);
    return()=>{observer?.disconnect();window.removeEventListener("resize",scheduleGrow);if(frame!==undefined)cancelAnimationFrame(frame);};
  },[draft.text,layout,conversationId]);
  function setLayout(){
    const next=layout==="compact"?"expanded":"compact";
    layoutFocus.current={layout:next,version:epoch.current.version,trigger:document.activeElement};
    setLocalLayout(next);onLayoutChange?.(next);
  }
  async function remove(id:string){
    if(!writableNow()||!attachments||attachments.removingIds?.includes(id)||removeAttempts.current.has(id))return;
    const version=epoch.current.version,ticket=Symbol(id);removeAttempts.current.set(id,ticket);
    refreshRemovals(value=>value+1);
    const active=()=>mounted.current&&epoch.current.version===version&&removeAttempts.current.get(id)===ticket;
    try{const removed=await attachments.onRemove(id);if(active()){if(removed){setRemoveErrors(errors=>{const next={...errors};delete next[id];return next;});focus();}else setRemoveErrors(errors=>({...errors,[id]:"移除未完成，请重试。"}));}}
    catch(error){if(active())setRemoveErrors(errors=>({...errors,[id]:error instanceof Error?error.message:"移除失败，请重试。"}));}
    finally{if(active()){removeAttempts.current.delete(id);refreshRemovals(value=>value+1);}}
  }
  function openPicker(){
    setMenuOpen(false);if(pickerTimer.current!==null)clearTimeout(pickerTimer.current);
    const version=epoch.current.version;
    pickerTimer.current=setTimeout(()=>{pickerTimer.current=null;if(mounted.current&&epoch.current.version===version&&writableNow()){pickerOwner.current=current.current.conversationId;setPickerOpen(true);}},0);
  }
  const localizedBlock=fileBlocked||retained||draft.references.some(item=>item.availability!=="available");
  const materialCount=draft.references.length+(attachments?.items.length??0);
  const readyMaterials=[...draft.references.filter(item=>item.availability==="available").map(item=>`reference:${item.id}`),...(attachments?.items??[]).filter(item=>!item.replacement&&!item.error&&!removeErrors[item.id]&&!removingIds.has(item.id)&&(item.status===undefined||item.status==="done")&&(item.availability===undefined||item.availability==="available")).map(item=>`file:${item.id}`)];
  const hiddenMaterials=new Set(materialCount>3&&!materialsExpanded?readyMaterials.slice(2):[]);
  const feedback=submission.status==="failed"?submission.message:submission.status==="pending"?(submission.message||"正在发送…"):props.submitBlockedReason||(localizedBlock?undefined:blocked);
  const primaryLabel=submission.status==="failed"?"重新发送":submission.status==="pending"?"正在发送":props.sendLabel??"发送";
  const voiceTime=`${Math.floor(voice.elapsedSeconds/60).toString().padStart(2,"0")}:${(voice.elapsedSeconds%60).toString().padStart(2,"0")}`;
  const materialItems=[...draft.references.map(item=><div key={`reference:${item.id}`} className="rain-composer__reference" hidden={hiddenMaterials.has(`reference:${item.id}`)} data-attention={item.availability==="unavailable"||undefined}><Attachment size="sm" className="rain-composer__material" state={item.availability==="unavailable"?"error":"done"}><FileIcon size={20}/><AttachmentContent><AttachmentTitle title={item.name}>{item.name}</AttachmentTitle><AttachmentDescription>课程资料{item.availability==="unavailable"&&` · ${item.unavailableReason||"暂不可用"}`}</AttachmentDescription></AttachmentContent><AttachmentActions><IconButton size="28/16" icon={<CloseIcon/>} aria-label={`移除引用 ${item.name}`} disabled={locked} onClick={()=>{onDraftChange({...draft,references:draft.references.filter(value=>value.id!==item.id)});focus();}}/></AttachmentActions></Attachment></div>), ...(attachments?.items.map(item=><div key={`file:${item.id}`} className="rain-composer__file" hidden={hiddenMaterials.has(`file:${item.id}`)} data-attention={!readyMaterials.includes(`file:${item.id}`)||undefined}><Attachment size="sm" className="rain-composer__material" state={attachmentState(item.replacement?.status??item.status)}>
        <FileIcon size={20}/><AttachmentContent><AttachmentTitle title={item.name}>{item.name}</AttachmentTitle>
          <AttachmentDescription className="rain-composer__source">本地文件</AttachmentDescription>
          {removingIds.has(item.id)&&<AttachmentDescription role="status">正在移除…</AttachmentDescription>}
          {item.replacement?<AttachmentDescription>{item.replacement.error||`替换${uploadText[item.replacement.status]}`}</AttachmentDescription>:item.status&&item.status!=="done"&&<AttachmentDescription>{item.error||uploadText[item.status]}{item.status==="uploading"&&item.progress!==undefined?` ${Math.round(item.progress)}%`:""}</AttachmentDescription>}
          {item.availability&&item.availability!=="available"&&<AttachmentDescription>{item.availabilityMessage||"资料暂不可用"}</AttachmentDescription>}
        </AttachmentContent><AttachmentTrigger disabled={disabled||item.permissions?.preview===false} aria-label={`查看资料 ${item.name}`} title={item.name} onClick={()=>setPreviewSelection({id:item.id,version:epoch.current.version})}/><AttachmentActions>
          {(item.replacement?.status??item.status)==="error"||(item.replacement?.status??item.status)==="canceled"||(item.replacement?.status??item.status)==="idle"?<Button type="button" variant="text" disabled={locked} onClick={()=>{attachments.onRetry(item.id);focus();}}>{item.replacement?"重试替换":"重试"}</Button>:(item.replacement?.status??item.status)==="uploading"||(item.replacement?.status??item.status)==="processing"?<Button type="button" variant="text" disabled={locked} onClick={()=>{attachments.onCancel(item.id);focus();}}>{item.replacement?"取消替换":"取消上传"}</Button>:null}
          {item.replacement&&!["uploading","processing"].includes(item.replacement.status)&&<Button type="button" variant="text" disabled={locked} onClick={()=>{attachments.onCancel(item.id);focus();}}>取消替换</Button>}
          <IconButton size="28/16" icon={<CloseIcon/>} aria-label={`移除资料 ${item.name}`} disabled={locked||removingIds.has(item.id)||item.permissions?.remove===false} onClick={()=>void remove(item.id)}/>
        </AttachmentActions></Attachment>{removeErrors[item.id]&&!removingIds.has(item.id)&&<p className="rain-composer__error" role="status">{removeErrors[item.id]}</p>}</div>)??[])].sort((left,right)=>Number(Boolean(right.props["data-attention"]))-Number(Boolean(left.props["data-attention"])));
  return <form aria-label={props.formLabel??"发送消息"} className={`rain-composer ${props.className??""}`} data-rain-id="recipe-conversation-composer" data-slot="root" data-surface={surface} data-layout={layout} data-disabled={disabled||undefined}
    onSubmit={event=>{event.preventDefault();if(canSubmit&&!composing.current&&!removeAttempts.current.size)props.onSubmit();}}
    onDragOver={event=>{if(event.dataTransfer.types.includes("Files"))event.preventDefault();}}
    onDrop={event=>{if(event.dataTransfer.files.length){event.preventDefault();if(attachments&&!locked)attachments.onFiles(Array.from(event.dataTransfer.files));}}}>
    {(draft.reply||draft.references.length>0||Boolean(attachments?.items.length))&&<div className="rain-composer__context" data-slot="context">
      {draft.reply&&<div className="rain-composer__reply" role="group" aria-label="当前回复对象"><div>{props.onLocateReply?<button type="button" data-focus="control" onClick={props.onLocateReply}><strong>回复 {draft.reply.author}</strong></button>:<strong>回复 {draft.reply.author}</strong>}<p>{draft.reply.excerpt}</p></div><IconButton size="28/16" icon={<CloseIcon/>} aria-label="取消回复" disabled={locked} onClick={()=>{onDraftChange({...draft,reply:undefined});focus();}}/></div>}
      {materialCount>0&&<div className="rain-composer__materials" role="group" aria-label={`本次资料，共 ${materialCount} 项`} tabIndex={0}>
      {materialItems}
      </div>}
      {materialCount>3&&readyMaterials.length>2&&<Button type="button" variant="text" className="rain-composer__materials-toggle" aria-expanded={materialsExpanded} onClick={()=>setMaterialsExpanded(value=>!value)}>{materialsExpanded?"收起资料":`查看全部 ${materialCount} 项资料`}</Button>}
    </div>}
    <div className="rain-composer__input-row">
    <div ref={editorShell} className="rain-composer__editor-shell" onTransitionEnd={event=>{if(event.target===event.currentTarget&&event.propertyName==="height")event.currentTarget.dataset.resizing="false";}}>
    <textarea ref={editor} data-slot="editor" className="rain-composer__editor" aria-label={props["aria-label"]} aria-describedby={feedback?`${id}-feedback`:localizedBlock?`${id}-blocked`:undefined} placeholder={props.placeholder} rows={1} value={draft.text} readOnly={locked} disabled={disabled}
      onChange={event=>onDraftChange({...draft,text:event.currentTarget.value})} onCompositionStart={()=>{composing.current=true;}} onCompositionEnd={()=>{composing.current=false;}}
      onPaste={event=>{if(!attachments||locked)return;const files=Array.from(event.clipboardData.files);if(files.length){attachments.onFiles(files);if(!event.clipboardData.getData("text/plain"))event.preventDefault();}}}/>
    </div>
    <div className="rain-composer__toolbar" data-slot="toolbar">
    {voiceBusy&&<div className="rain-composer__voice" data-voice-state={voice.status}><IconButton ref={voiceCancel} size="28/16" icon={<CloseIcon/>} aria-label={voice.status==="recording"?"取消录音":voice.status==="requesting"?"取消语音输入":"取消转写"} disabled={disabled} onClick={()=>{voice.cancel();focus();}}/>
      <span key={voice.status} className="rain-composer__voice-status" role="status">{voice.status==="recording"?"录音中":voice.status==="requesting"?"请求麦克风…":"转写中…"}</span>
      {voice.status!=="requesting"&&<span className="rain-composer__voice-time" role="timer" aria-label="录音时长">{voiceTime}</span>}
      {voice.status==="recording"&&<div className="rain-composer__wave" aria-hidden="true">{Array.from({length:9},(_,index)=><i key={index}/>)}</div>}
    </div>}
    <div className="rain-composer__tools" hidden={voiceBusy}>
      {(attachments||references)&&<DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}><DropdownMenu.Trigger render={<IconButton ref={addButton} size="28/16" icon={<AddIcon/>} aria-label="添加资料" disabled={locked}/>}/><DropdownMenu.Content className="rain-composer__overlay" width={244} positionerProps={{side:"top",align:"start",sideOffset:8}}>
        {attachments&&<DropdownMenu.Item label="上传文件或图片" onClick={()=>fileInput.current?.click()}/>}
        {references&&<DropdownMenu.Item label="选择课程资料" onClick={openPicker}/>}
        {attachments&&<div className="rain-composer__menu-help">也可拖入文件或粘贴图片</div>}
      </DropdownMenu.Content></DropdownMenu.Root>}
      {sources&&sources.length>1&&<Popover.Root open={scopeOpen} onOpenChange={setScopeOpen}><Popover.Trigger render={<button type="button" className="rain-composer__scope" data-focus="control" disabled={locked} aria-label="选择搜索范围" aria-describedby={`${id}-scope`} title={sources.find(option=>option.value===draft.sourceScope)?.label}><ResourceIcon size={14}/><span id={`${id}-scope`} >{sources.find(option=>option.value===draft.sourceScope)?.label||"搜索范围"}</span><ArrowDownIcon size={12}/></button>}/><Popover.Content className="rain-composer__overlay" width={288} positionerProps={{side:"top"}}><Popover.Title>搜索范围</Popover.Title><RadioGroup legend="搜索范围" legendHidden value={draft.sourceScope??null} options={sources.map(option=>({value:option.value,label:option.label,description:option.disabledReason||option.description,disabled:Boolean(option.disabledReason)}))} onValueChange={value=>{onDraftChange({...draft,sourceScope:value});setScopeOpen(false);focus();}}/></Popover.Content></Popover.Root>}
      {sources?.length===1&&<span className="rain-composer__scope" role="group" aria-label={`搜索范围：${sources[0]!.label}`}><ResourceIcon size={14}/><span>{sources[0]!.label}</span></span>}
    </div><div className="rain-composer__tools">
      {voiceService&&!voiceBusy&&<IconButton size="28/16" icon={<MicrophoneOnIcon/>} aria-label="开始语音输入" title={voiceReason} aria-describedby={voiceReason?`${id}-voice-reason`:undefined} disabled={locked} aria-disabled={Boolean(voiceReason)} onClick={()=>{if(voiceEnabled&&!voiceReason)void voice.start();}}/>}
      <span className="rain-composer__layout-anchor"><IconButton size="28/16" className="rain-composer__layout-toggle" icon={layout==="compact"?<MaximizeIcon/>:<MinimizeIcon/>} aria-label={layout==="compact"?"展开输入框":"收起输入框"} aria-expanded={layout==="expanded"} onClick={setLayout}/></span>
      <span className="rain-composer__primary" data-slot="primary-action">{voiceBusy?<IconButton key="voice" size="32/18" type="button" icon={<StopPlaybackIcon/>} aria-label={voice.status==="recording"?"结束录音":voice.status==="requesting"?"正在请求麦克风":"正在转写"} localRecipe={sendRecipe} disabled={voice.status!=="recording"||disabled} loading={voice.status!=="recording"} onClick={voice.stop}/>:generation?.running?<IconButton key="stop" size="32/18" type="button" icon={<StopPlaybackIcon/>} aria-label="停止生成" disabled={disabled} onClick={()=>{generation.onStop();focus();}}/>:<IconButton key="send" size="32/16" type="submit" icon={submission.status==="failed"?<RefreshIcon/>:<PublishFilledIcon/>} aria-label={primaryLabel} aria-describedby={feedback?`${id}-feedback`:blocked?`${id}-blocked`:undefined} title={submission.status==="failed"?primaryLabel:blocked||primaryLabel} localRecipe={sendRecipe} disabled={submission.status==="pending"?disabled||readOnly:!canSubmit} loading={submission.status==="pending"}/>}</span>
    </div></div>
    </div>
    {voiceService&&voiceReason&&<span id={`${id}-voice-reason`} className="sr-only">{voiceReason}</span>}
    {voice.notice&&<div className={`rain-composer__feedback ${retained?"rain-composer__error":""}`} role="status"><span>{voice.notice}</span>{retained?<><span className="rain-composer__voice-time" aria-label={`保留录音时长 ${voiceTime}`}>{voiceTime}</span><Button ref={voiceRetry} type="button" variant="text" disabled={!voiceEnabled} onClick={()=>{if(voiceEnabled)voice.retry();}}>重试转写</Button><Button type="button" variant="text" disabled={!voiceEnabled} onClick={()=>{voice.discard();focus();}}>丢弃录音</Button></>:voiceService?.onPermissionHelp?<Button type="button" variant="text" onClick={voiceService.onPermissionHelp}>查看开启方法</Button>:null}</div>}
    {blocked&&!feedback&&<span id={`${id}-blocked`} className="sr-only">{blocked}</span>}
    {feedback&&<p id={`${id}-feedback`} data-slot="feedback" className={`rain-composer__feedback ${submission.status==="failed"?"rain-composer__error":""}`} role="status">{feedback}</p>}
    {Boolean(attachments?.rejections?.length)&&<div className="rain-composer__rejections" role="group" aria-label="文件提示">{attachments!.rejections!.map((rejection,index)=><p className="rain-composer__error" role="status" key={index}><span>{rejection.file.name}</span>：<span>{rejection.reason}</span></p>)}{attachments?.onClearRejections&&<Button type="button" variant="text" disabled={locked} onClick={attachments.onClearRejections}>清除文件提示</Button>}</div>}
    {attachments&&<input ref={fileInput} type="file" hidden multiple accept={attachments.constraints?.accept} aria-label="上传文件或图片" disabled={locked} onChange={event=>{if(!locked&&event.currentTarget.files)attachments.onFiles(Array.from(event.currentTarget.files));event.currentTarget.value="";}}/>}
    {references&&<ComposerContextPicker key={conversationId} open={pickerOpen} onOpenChange={setPickerOpen} selected={draft.references} service={references} returnFocus={addButton} onConfirm={items=>{if(writableNow()&&pickerOwner.current===current.current.conversationId)current.current.onDraftChange({...current.current.draft,references:items});}} onApplied={focus}/>}
    <AttachmentPreview attachment={preview} open={preview!==null} onOpenChange={open=>{if(!open)setPreviewSelection(null);}} returnFocus={editor}/>
  </form>;
});
