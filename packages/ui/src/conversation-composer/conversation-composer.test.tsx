import { useState } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as voiceModule from "./use-composer-voice";
import { ConversationComposer } from "./conversation-composer";
import type { ComposerDraft, ConversationComposerProps } from "./types";

afterEach(()=>{cleanup();vi.restoreAllMocks();vi.useRealTimers();});
function Example(props: Partial<ConversationComposerProps> = {}) {
  const [draft, setDraft] = useState<ComposerDraft>({ text: "", references: [] });
  return <ConversationComposer conversationId="one" draft={draft} draftRevision={0} onDraftChange={setDraft} aria-label="内容" onSubmit={() => {}} {...props} />;
}
describe("ConversationComposer", () => {
  it("preserves the editor, text and selection across manual layout changes", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const editor = screen.getByRole("textbox", { name: "内容" }) as HTMLTextAreaElement;
    await user.type(editor, "观察与解释"); editor.setSelectionRange(2, 2);
    await user.click(screen.getByRole("button", { name: "展开输入框" }));
    expect(screen.getByRole("textbox")).toBe(editor);
    expect(editor).toHaveValue("观察与解释"); expect(editor.selectionStart).toBe(2);
    expect(editor).toHaveFocus();
    expect(screen.getByRole("button", { name: "收起输入框" })).toBeInTheDocument();
  });
  it("does not reclaim focus when a delayed controlled layout arrives after the user left", async () => {
    const user=userEvent.setup(),onLayoutChange=vi.fn();
    const view=(layout:"compact"|"expanded")=><><Example layout={layout} onLayoutChange={onLayoutChange}/><button>外部操作</button></>;
    const {rerender}=render(view("compact"));
    await user.click(screen.getByRole("button",{name:"展开输入框"}));
    expect(onLayoutChange).toHaveBeenCalledWith("expanded");
    await user.click(screen.getByRole("button",{name:"外部操作"}));
    rerender(view("expanded"));
    expect(screen.getByRole("button",{name:"外部操作"})).toHaveFocus();
  });
  it("keeps Enter as newline and submits only through the explicit main action", async () => {
    const user = userEvent.setup(), submit = vi.fn(); render(<Example onSubmit={submit} />);
    await user.type(screen.getByRole("textbox"), "事实{Enter}解释");
    expect(screen.getByRole("textbox")).toHaveValue("事实\n解释"); expect(submit).not.toHaveBeenCalled();
    fireEvent.compositionStart(screen.getByRole("textbox"));fireEvent.submit(screen.getByRole("form"));expect(submit).not.toHaveBeenCalled();
    fireEvent.compositionEnd(screen.getByRole("textbox"));
    await user.click(screen.getByRole("button", { name: "发送" })); expect(submit).toHaveBeenCalledTimes(1);
  });
  it("keeps a reply when compact and canceling it preserves the body", async () => {
    const user = userEvent.setup();
    function Reply() { const [draft, setDraft] = useState<ComposerDraft>({ text: "我的观察", references: [], reply: {messageId:"m1",author:"王同学",excerpt:"原消息"} }); return <Example draft={draft} onDraftChange={setDraft} />; }
    render(<Reply />); expect(screen.getByText("回复 王同学")).toBeInTheDocument();
    await user.click(screen.getByRole("button", {name:"取消回复"}));
    expect(screen.queryByText("回复 王同学")).toBeNull(); expect(screen.getByRole("textbox")).toHaveValue("我的观察");
  });
  it("opens the add menu before requesting a file and shows rejected files", async () => {
    const user=userEvent.setup(), files=vi.fn();
    render(<Example attachments={{items:[],onFiles:files,onRetry:()=>{},onCancel:()=>{},onRemove:async()=>true,rejections:[{file:new File(["x"],"bad.exe"),code:"type",reason:"不支持此文件类型"}]}} />);
    expect(screen.getByText("不支持此文件类型")).toBeInTheDocument();
    await user.click(screen.getByRole("button",{name:"添加资料"}));
    expect(await screen.findByRole("menuitem",{name:"上传文件或图片"})).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("上传文件或图片",{selector:"input"}),{target:{files:[new File(["a"],"note.txt")]}});
    expect(files).toHaveBeenCalledTimes(1);
  });
  it("blocks pending or unavailable content but stopping generation keeps the next draft", async () => {
    const user=userEvent.setup(),submit=vi.fn(),stop=vi.fn();
    const {rerender}=render(<Example draft={{text:"下一问",references:[]}} onSubmit={submit} generation={{running:true,onStop:stop}} />);
    await user.click(screen.getByRole("button",{name:"停止生成"})); expect(stop).toHaveBeenCalledOnce(); expect(submit).not.toHaveBeenCalled();
    expect(screen.getByRole("textbox")).toHaveValue("下一问");
    rerender(<Example draft={{text:"下一问",references:[]}} onSubmit={submit} submission={{status:"pending"}} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    fireEvent.submit(screen.getByRole("form")); expect(submit).not.toHaveBeenCalled();
  });
});

it("keeps unavailable voice keyboard discoverable and blocks retained retry when read only",()=>{
  const retry=vi.fn();
  vi.spyOn(voiceModule,"useComposerVoice").mockReturnValue({status:"retained",notice:"转写失败，录音已保留",available:true,elapsedSeconds:0,start:vi.fn(),stop:vi.fn(),cancel:vi.fn(),retry,discard:vi.fn(),clearNotice:vi.fn()});
  render(<Example voice={{transcribe:async()=>"文字"}} readOnly/>);
  expect(screen.getByRole("button",{name:"重试转写"})).toBeDisabled();
  fireEvent.click(screen.getByRole("button",{name:"重试转写"}));expect(retry).not.toHaveBeenCalled();
});
it("moves focus to voice cancellation and then the retained recording recovery",()=>{
  const state={status:"idle" as voiceModule.ComposerVoiceStatus,notice:"",available:true,elapsedSeconds:0,start:vi.fn(),stop:vi.fn(),cancel:vi.fn(),retry:vi.fn(),discard:vi.fn(),clearNotice:vi.fn()};
  vi.spyOn(voiceModule,"useComposerVoice").mockImplementation(()=>({...state}));
  const props={voice:{transcribe:async()=>"文字"}};
  const {rerender}=render(<Example {...props}/>);
  state.status="requesting";rerender(<Example {...props}/>);
  expect(screen.getByRole("button",{name:"取消语音输入"})).toHaveFocus();
  state.status="retained";state.notice="录音已保留";rerender(<Example {...props}/>);
  expect(screen.getByRole("button",{name:"重试转写"})).toHaveFocus();
});
it("keeps the same editor and toolbar through timed recording, transcription and recovery",()=>{
  const state={status:"idle" as voiceModule.ComposerVoiceStatus,notice:"",elapsedSeconds:0,available:true,start:vi.fn(),stop:vi.fn(),cancel:vi.fn(),retry:vi.fn(),discard:vi.fn(),clearNotice:vi.fn()};
  vi.spyOn(voiceModule,"useComposerVoice").mockImplementation(()=>({...state}));
  const props={voice:{transcribe:async()=>"文字"},draft:{text:"原有正文",references:[]}};
  const {rerender}=render(<Example {...props}/>),editor=screen.getByRole("textbox"),toolbar=document.querySelector('[data-slot="toolbar"]');
  state.status="recording";state.elapsedSeconds=65;rerender(<Example {...props}/>);
  expect(screen.getByRole("timer",{name:"录音时长"})).toHaveTextContent("01:05");
  expect(screen.getByRole("textbox")).toBe(editor);expect(editor).toHaveValue("原有正文");expect(editor).toHaveAttribute("readonly");
  expect(document.querySelector('[data-slot="toolbar"]')).toBe(toolbar);
  fireEvent.click(screen.getByRole("button",{name:"结束录音"}));expect(state.stop).toHaveBeenCalledOnce();
  state.status="transcribing";rerender(<Example {...props}/>);
  expect(screen.getByRole("button",{name:"正在转写"})).toBeDisabled();
  expect(screen.getByRole("timer",{name:"录音时长"})).toHaveTextContent("01:05");
  state.status="retained";state.notice="录音已保留";rerender(<Example {...props}/>);
  expect(screen.getByLabelText("保留录音时长 01:05")).toBeVisible();
  expect(editor).not.toHaveAttribute("readonly");expect(screen.getByRole("button",{name:"发送"})).toBeDisabled();
  expect(screen.getByRole("button",{name:"重试转写"})).toHaveFocus();
});
it("puts actionable materials first in DOM order and identifies each source",()=>{
  render(<Example draft={{text:"草稿",references:[{id:"ref",name:"课程说明.pdf",availability:"available"}]}} attachments={{items:[{id:"file",name:"失败.txt",status:"error",error:"上传中断"}],onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:async()=>true}}/>);
  const materials=screen.getByRole("group",{name:"本次资料，共 2 项"});
  expect(materials.firstElementChild).toHaveTextContent("失败.txt");
  expect(materials).toHaveAttribute("tabindex","0");
  expect(screen.getByText("本地文件")).toBeVisible();expect(screen.getByText("课程资料")).toBeVisible();
  expect(screen.getByRole("button",{name:"重试"})).toBeEnabled();
});
it("exposes a focused unavailable microphone reason without preventing text send",async()=>{
  const user=userEvent.setup();
  render(<Example voice={{transcribe:async()=>"文字"}}/>);
  const microphone=screen.getByRole("button",{name:"开始语音输入"});
  microphone.focus();expect(microphone).toHaveAccessibleDescription("当前浏览器暂不支持录音，可继续输入文字。");
  expect(microphone).toHaveAttribute("aria-disabled","true");expect(microphone).not.toBeDisabled();
  await user.type(screen.getByRole("textbox"),"仍可发送");expect(screen.getByRole("button",{name:"发送"})).toBeEnabled();
});

it("ignores an attachment removal error from a previous conversation",async()=>{
  const user=userEvent.setup();let reject!:(error:Error)=>void;
  const pending=new Promise<boolean>((_resolve,fail)=>{reject=fail;});
  const attachments={items:[{id:"same",name:"共享资料.txt",status:"done" as const}],onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:()=>pending};
  const {rerender}=render(<Example attachments={attachments}/>);
  await user.click(screen.getByRole("button",{name:"移除资料 共享资料.txt"}));
  rerender(<Example conversationId="other" attachments={attachments}/>);
  const expand=screen.getByRole("button",{name:"展开输入框"});expand.focus();
  await act(async()=>reject(new Error("A 的移除失败")));
  expect(screen.queryByText("A 的移除失败")).toBeNull();expect(expand).toHaveFocus();
});

it("does not open a queued material picker after the composer becomes read only",async()=>{
  const user=userEvent.setup(),service={query:async()=>[],resolve:async()=>[]};
  const {rerender}=render(<Example references={service}/>);
  await user.click(screen.getByRole("button",{name:"添加资料"}));
  const action=await screen.findByRole("menuitem",{name:"选择课程资料"});
  vi.useFakeTimers();fireEvent.click(action);
  rerender(<Example references={service} readOnly/>);
  await act(async()=>vi.runOnlyPendingTimers());
  expect(screen.queryByRole("dialog",{name:"引用课程资料"})).toBeNull();
});
it("shows a single source as a summary without an unnecessary selection popup",()=>{
  render(<Example sources={[{value:"course",label:"本课程资料"}]}/>);
  expect(screen.queryByRole("button",{name:"选择搜索范围"})).toBeNull();
  expect(screen.getByLabelText("搜索范围：本课程资料")).toBeInTheDocument();
});
it("shares dropped and pasted files without swallowing pasted plain text",()=>{
  const files=vi.fn(),file=new File(["image"],"课堂.png",{type:"image/png"});
  render(<Example attachments={{items:[],onFiles:files,onRetry:()=>{},onCancel:()=>{},onRemove:async()=>true}}/>);
  fireEvent.drop(screen.getByRole("form"),{dataTransfer:{files:[file],types:["Files"]}});
  const mixedPaste=fireEvent.paste(screen.getByRole("textbox"),{clipboardData:{files:[file],getData:()=>"保留的文字"}});
  expect(mixedPaste).toBe(true);expect(files).toHaveBeenCalledTimes(2);
  expect(fireEvent.paste(screen.getByRole("textbox"),{clipboardData:{files:[file],getData:()=>""}})).toBe(false);
  expect(fireEvent.paste(screen.getByRole("textbox"),{clipboardData:{files:[],getData:()=>"纯文字"}})).toBe(true);
  expect(files).toHaveBeenCalledTimes(3);
});
it("rejects a file drop in read only mode without navigating away",()=>{
  const files=vi.fn();render(<Example readOnly attachments={{items:[],onFiles:files,onRetry:()=>{},onCancel:()=>{},onRemove:async()=>true}}/>);
  expect(fireEvent.drop(screen.getByRole("form"),{dataTransfer:{files:[new File(["x"],"资料.txt")],types:["Files"]}})).toBe(false);
  expect(files).not.toHaveBeenCalled();
});

it("explains an unsuccessful attachment removal and permits another attempt",async()=>{
  const user=userEvent.setup(),remove=vi.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);
  render(<Example attachments={{items:[{id:"file",name:"课堂.txt",status:"done"}],onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:remove}}/>);
  await user.click(screen.getByRole("button",{name:"移除资料 课堂.txt"}));
  expect(await screen.findByText("移除未完成，请重试。")).toBeInTheDocument();
  expect(screen.getByRole("button",{name:"查看资料 课堂.txt"})).toBeInTheDocument();
  await user.click(screen.getByRole("button",{name:"移除资料 课堂.txt"}));
  expect(remove).toHaveBeenCalledTimes(2);expect(screen.queryByText("移除未完成，请重试。")).toBeNull();
});

it.each(["rejected","declined"] as const)("blocks sending during local attachment removal and recovers when it is %s",async(outcome)=>{
  const user=userEvent.setup(),submit=vi.fn();
  let finish!:(value:boolean)=>void,reject!:(error:Error)=>void;
  const pending=new Promise<boolean>((resolve,fail)=>{finish=resolve;reject=fail;});
  const remove=vi.fn(()=>pending);
  render(<Example draft={{text:"请分析附件",references:[]}} onSubmit={submit} attachments={{items:[{id:"file",name:"课堂.txt",status:"done",availability:"available"}],onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:remove}}/>);
  const removeButton=screen.getByRole("button",{name:"移除资料 课堂.txt"});
  expect(screen.getByRole("button",{name:"发送"})).toBeEnabled();
  await user.click(removeButton);
  fireEvent.submit(screen.getByRole("form"));
  expect(submit).not.toHaveBeenCalled();
  expect(screen.getByRole("button",{name:"发送"})).toBeDisabled();
  expect(removeButton).toBeDisabled();
  expect(screen.getByText("正在移除…")).toBeVisible();
  fireEvent.click(removeButton);expect(remove).toHaveBeenCalledOnce();
  await act(async()=>{if(outcome==="rejected")reject(new Error("服务拒绝移除"));else finish(false);});
  expect(screen.queryByText("正在移除…")).toBeNull();
  expect(screen.getByText(outcome==="rejected"?"服务拒绝移除":"移除未完成，请重试。")).toBeVisible();
  expect(removeButton).toBeEnabled();expect(screen.getByRole("button",{name:"发送"})).toBeEnabled();
});

it("keeps a new local removal pending when an older conversation removal finishes",async()=>{
  const user=userEvent.setup();let finishOld!:(value:boolean)=>void,finishNew!:(value:boolean)=>void;
  const oldRequest=new Promise<boolean>(resolve=>{finishOld=resolve;}),newRequest=new Promise<boolean>(resolve=>{finishNew=resolve;});
  const remove=vi.fn().mockReturnValueOnce(oldRequest).mockReturnValueOnce(newRequest);
  const attachments={items:[{id:"same",name:"课堂.txt",status:"done" as const,availability:"available" as const}],onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:remove};
  const {rerender}=render(<Example conversationId="A" attachments={attachments}/>);
  await user.click(screen.getByRole("button",{name:"移除资料 课堂.txt"}));
  rerender(<Example conversationId="B" attachments={attachments}/>);
  expect(screen.getByRole("button",{name:"发送"})).toBeEnabled();
  expect(screen.queryByText("正在移除…")).toBeNull();
  await user.click(screen.getByRole("button",{name:"移除资料 课堂.txt"}));
  await act(async()=>finishOld(false));
  expect(screen.queryByText("移除未完成，请重试。")).toBeNull();
  expect(screen.getByText("正在移除…")).toBeVisible();
  expect(screen.getByRole("button",{name:"发送"})).toBeDisabled();
  expect(screen.getByRole("button",{name:"移除资料 课堂.txt"})).toBeDisabled();
  await act(async()=>finishNew(true));
  expect(screen.queryByText("正在移除…")).toBeNull();
  expect(screen.getByRole("button",{name:"发送"})).toBeEnabled();
});

it("refreshes an open attachment preview when availability or permissions change",async()=>{
  const user=userEvent.setup(),item={id:"image",name:"课堂.png",type:"image/png",url:"https://example.com/class.png",status:"done" as const,availability:"available" as const};
  const attachments={items:[item],onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:async()=>true};
  const {rerender}=render(<Example attachments={attachments}/>);
  await user.click(screen.getByRole("button",{name:"查看资料 课堂.png"}));
  expect(await screen.findByRole("img",{name:"课堂.png"})).toBeInTheDocument();
  rerender(<Example attachments={{...attachments,items:[{...item,permissions:{preview:false,download:false,open:false}}]}}/>);
  expect(screen.queryByRole("img",{name:"课堂.png"})).toBeNull();
  expect(screen.queryByRole("button",{name:"下载 课堂.png"})).toBeNull();
  expect(screen.getByText("不允许预览此文件")).toBeInTheDocument();
  rerender(<Example attachments={{...attachments,items:[{...item,availability:"forbidden"}]}}/>);
  expect(screen.getByText("你没有访问此文件的权限")).toBeInTheDocument();
  expect(screen.queryByRole("img",{name:"课堂.png"})).toBeNull();
  rerender(<Example attachments={{...attachments,items:[]}}/>);
  expect(screen.queryByRole("dialog")).toBeNull();
});

it("does not send the old attachment while its replacement is unresolved",()=>{
  const submit=vi.fn();
  render(<Example draft={{text:"请分析",references:[]}} onSubmit={submit} attachments={{items:[{id:"file",name:"旧资料.txt",status:"done",availability:"available",replacement:{file:new File(["new"],"新资料.txt"),status:"error",error:"替换失败"}}],onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:async()=>true}}/>);
  fireEvent.submit(screen.getByRole("form"));
  expect(submit).not.toHaveBeenCalled();expect(screen.getByRole("button",{name:"发送"})).toBeDisabled();
});

it.each(["conversation", "draft", "unmount"])("ignores transcript caret recovery after a %s change",async(change)=>{
  let options!:voiceModule.ComposerVoiceOptions;
  const frames:FrameRequestCallback[]=[];
  vi.spyOn(window,"requestAnimationFrame").mockImplementation(callback=>{frames.push(callback);return frames.length;});
  vi.spyOn(voiceModule,"useComposerVoice").mockImplementation(value=>{options=value;return {status:"idle",notice:"",available:true,elapsedSeconds:0,start:vi.fn(),stop:vi.fn(),cancel:vi.fn(),retry:vi.fn(),discard:vi.fn(),clearNotice:vi.fn()};});
  const draft={text:"原稿",references:[]},onDraftChange=vi.fn();
  const {rerender,unmount}=render(<Example draft={draft} onDraftChange={onDraftChange}/>);
  const editor=screen.getByRole("textbox") as HTMLTextAreaElement;
  act(()=>options.onTranscript("转写",1));
  expect(onDraftChange).toHaveBeenCalledWith({...draft,text:"原转写稿"});
  if(change==="unmount")unmount();
  else rerender(<Example conversationId={change==="conversation"?"other":"one"} draft={{text:"新会话或新文字",references:[]}} onDraftChange={onDraftChange}/>);
  const focus=vi.spyOn(editor,"focus"),selection=vi.spyOn(editor,"setSelectionRange");
  act(()=>frames.forEach(callback=>callback(0)));
  expect(focus).not.toHaveBeenCalled();expect(selection).not.toHaveBeenCalled();
});

it("keeps attachment recovery local while retaining an accessible send restriction",()=>{
  render(<Example draft={{text:"请分析",references:[]}} attachments={{items:[{id:"failed",name:"记录.txt",status:"error",error:"网络中断"}],onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:async()=>true}}/>);
  expect(screen.getByText(/网络中断/)).toBeVisible();
  expect(screen.queryByText("附件上传失败，请重试或移除。",{selector:'[data-slot="feedback"]'})).toBeNull();
  expect(screen.getByRole("button",{name:"发送"})).toBeDisabled();
  expect(screen.getByRole("button",{name:"发送"})).toHaveAccessibleDescription("请先完成上传，或移除未就绪的附件。");
});

it("names rejected files and lets the user dismiss their notice",async()=>{
  const user=userEvent.setup(),clear=vi.fn();
  render(<Example attachments={{items:[],rejections:[{file:new File(["x"],"bad.exe"),code:"type",reason:"不支持此文件类型"}],onClearRejections:clear,onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:async()=>true}}/>);
  expect(screen.getByText("bad.exe")).toBeVisible();
  await user.click(screen.getByRole("button",{name:"清除文件提示"}));expect(clear).toHaveBeenCalledOnce();
});

it("offers explicit recording discard without repeating its send restriction",async()=>{
  const user=userEvent.setup(),discard=vi.fn();
  vi.spyOn(voiceModule,"useComposerVoice").mockReturnValue({status:"retained",notice:"转写失败，录音已保留。",available:true,elapsedSeconds:0,start:vi.fn(),stop:vi.fn(),cancel:vi.fn(),retry:vi.fn(),discard,clearNotice:vi.fn()});
  render(<Example voice={{transcribe:async()=>"文字"}}/>);
  expect(screen.getByText("丢弃录音")).toBeVisible();
  expect(screen.queryByText("请先完成转写或丢弃保留的录音。",{selector:'[data-slot="feedback"]'})).toBeNull();
  await user.click(screen.getByRole("button",{name:"丢弃录音"}));expect(discard).toHaveBeenCalledOnce();
});

it("collapses ready materials while keeping failed files reachable",async()=>{
  const user=userEvent.setup();
  const references=Array.from({length:4},(_,index)=>({id:`r${index}`,name:`课程资料${index}.pdf`,availability:"available" as const}));
  render(<Example draft={{text:"问题",references}} attachments={{items:[{id:"failed",name:"失败.txt",status:"error",error:"上传中断"}],onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:async()=>true}}/>);
  expect(screen.getByText("课程资料2.pdf")).not.toBeVisible();
  expect(screen.getByRole("button",{name:"重试"})).toBeVisible();
  await user.click(screen.getByRole("button",{name:"查看全部 5 项资料"}));
  expect(screen.getByText("课程资料2.pdf")).toBeVisible();
  await user.click(screen.getByRole("button",{name:"收起资料"}));
  expect(screen.getByRole("button",{name:"重试"})).toBeVisible();
});

it("keeps an independent host restriction visible beside local attachment errors",()=>{
  render(<Example submitBlockedReason="课程已结束，无法发送。" attachments={{items:[{id:"f",name:"记录.txt",status:"error",error:"网络中断"}],onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:async()=>true}}/>);
  expect(screen.getByText("课程已结束，无法发送。",{selector:'[data-slot="feedback"]'})).toBeVisible();
});

it("keeps removal failures visible when ready materials are collapsed again",async()=>{
  const user=userEvent.setup(),items=Array.from({length:4},(_,index)=>({id:`f${index}`,name:`记录${index}.txt`,status:"done" as const}));
  render(<Example attachments={{items,onFiles:()=>{},onRetry:()=>{},onCancel:()=>{},onRemove:async()=>false}}/>);
  await user.click(screen.getByRole("button",{name:"查看全部 4 项资料"}));
  await user.click(screen.getByRole("button",{name:"移除资料 记录3.txt"}));
  expect(await screen.findByText("移除未完成，请重试。")).toBeVisible();
  await user.click(screen.getByRole("button",{name:"收起资料"}));
  expect(screen.getByText("移除未完成，请重试。")).toBeVisible();
});

it("offers retry and cancellation for a failed replacement without removing the original",async()=>{
  const user=userEvent.setup(),retry=vi.fn(),cancel=vi.fn(),remove=vi.fn().mockResolvedValue(true);
  render(<Example attachments={{items:[{id:"f",name:"原资料.txt",status:"done",replacement:{file:new File(["new"],"新资料.txt"),status:"error",error:"替换失败"}}],onFiles:()=>{},onRetry:retry,onCancel:cancel,onRemove:remove}}/>);
  await user.click(screen.getByRole("button",{name:"重试替换"}));expect(retry).toHaveBeenCalledWith("f");
  expect(screen.getByRole("textbox")).toHaveFocus();
  await user.click(screen.getByRole("button",{name:"取消替换"}));expect(cancel).toHaveBeenCalledWith("f");expect(remove).not.toHaveBeenCalled();
  expect(screen.getByRole("textbox")).toHaveFocus();
});
