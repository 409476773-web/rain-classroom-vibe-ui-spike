import { useEffect, useRef, useState, type RefObject } from "react";
import {
  Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle,
  Avatar, avatarAssets, Bubble, BubbleContent, Button, Collapsible, CollapsibleContent, CollapsibleTrigger,
  Marker, MarkerContent, Message, MessageAvatar, MessageContent, MessageFooter, MessageHeader,
  MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport,
  ConversationComposer, Popover, Spinner, defineRainLocalRecipe, useMessageScroller, type AttachmentRecord, type ComposerReference, type MessagePart,
} from "@rain-next/ui";
import { FileIcon } from "@rain-next/ui/icons/file";
import { feedbackToggleRecipe } from "./g6-feedback-toggle";
import { createG6ReferenceService, mockG6Transcribe, mockG6Upload, useG6Composer } from "./g6-composer-adapters";
import "./g6-course-conversation.css";

const courseMessageRecipe = defineRainLocalRecipe<MessagePart, "ui-message">({
  id: "g6-course-reading", scope: "feature", origin: "ui-message",
  classes: { root: "g6-course-message", avatar: "g6-course-avatar", header: "g6-course-meta", footer: "g6-course-meta", content: "g6-course-message-content" },
  modifiedParts: ["root", "avatar", "header", "footer", "content"], candidateTokens: [], promotionStatus: "not-proposed",
});
const discussionMessageRecipe = defineRainLocalRecipe<MessagePart, "ui-message">({
  id: "g6-discussion-reading", scope: "feature", origin: "ui-message",
  classes: { root: "g6-discussion-message", avatar: "g6-discussion-avatar", header: "g6-discussion-meta", footer: "g6-discussion-meta", content: "g6-discussion-message-content" },
  modifiedParts: ["root", "avatar", "header", "footer", "content"], candidateTokens: [], promotionStatus: "not-proposed",
});

const answerSections = [
  { title: "先记录看见的，再解释它", text: "事实是可以被再次核对的观察记录；解释是你根据这些记录作出的判断。把两者分开写，并不是不允许解释，而是让读者知道：哪些内容已经发生，哪些仍需要证据支持。" },
  { title: "用三步完成一次课堂观察", text: "第一步，写清时间、人物与行为。例如：教师提出问题后，三位同学举手，其中两位解释了自己的解题步骤。尽量记录原话与动作，暂时不用“积极”“理解了”等概括。\n第二步，单列自己的解释。例如：这些同学可能理解了这一方法。使用“可能”“我推测”让判断的性质更清楚，同时写出你的依据。\n第三步，补一条需要核对的问题。没有举手的同学是否也理解了？可以观察随后的独立练习，或请不同同学说明理由，而不是仅用举手人数得出结论。" },
  { title: "把判断留给更多证据", text: "一次行为可能有不同原因。学生没有发言，可能正在思考，也可能没有听清问题。比较课堂发言、练习过程与课后反馈，才能逐步检验最初的解释。记录时保留不确定性，是让结论更可靠的一部分。" },
];
const fullAnswer = `${answerSections.map(section => `${section.title}\n${section.text}`).join("\n\n")}\n\n事实：三位同学举手。\n解释：他们可能理解了。\n待验证：其他同学能否独立完成练习？`;
type AnswerStatus = "waiting" | "generating" | "stopped" | "failed" | "done";
type CourseTurn = { id: string; question: string; material?: string; attachments?: AttachmentRecord[]; references?: ComposerReference[]; sourceScope?: string; answer: string; status: AnswerStatus };
const sampleTurn: CourseTurn = { id: "example", question: "课堂观察中，怎样区分事实与解释？能用一个例子说明吗？", material: "课堂观察记录与同伴反馈说明.pdf", answer: fullAnswer, status: "done" };

function Material({ name }: { name: string }) {
  return <Attachment size="sm" className="g6-course-material">
    <AttachmentMedia><FileIcon /></AttachmentMedia>
    <AttachmentContent>
      <Popover.Root>
        <AttachmentTitle><Popover.Trigger type="button" className="g6-course-filename-trigger" aria-label={`查看完整文件名：${name}`}>{name}</Popover.Trigger></AttachmentTitle>
        <Popover.Content width={320} className="g6-course-filename-preview">
          <Popover.Title>完整文件名</Popover.Title>
          <p>{name}</p>
        </Popover.Content>
      </Popover.Root>
      <AttachmentDescription>课程资料 · 仅本页使用</AttachmentDescription>
    </AttachmentContent>
  </Attachment>;
}

function useDemoServices() {
  const [failUpload, setFailUpload] = useState(false), [failTranscribe, setFailTranscribe] = useState(false);
  const upload: typeof mockG6Upload = async (file, context) => {
    const result = await mockG6Upload(file, context);
    if (failUpload) throw new Error("本地模拟：上传失败，文件已保留，可关闭演示开关后重试。");
    return result;
  };
  const transcribe: typeof mockG6Transcribe = async (blob, context) => {
    const text = await mockG6Transcribe(blob, context);
    if (failTranscribe) throw new Error("本地模拟：转写失败，录音已保留。");
    return text;
  };
  return { upload, transcribe, failUpload, setFailUpload, failTranscribe, setFailTranscribe };
}

function DemoServiceControls({ services }: { services: ReturnType<typeof useDemoServices> }) {
  return <><Button type="button" variant="text" aria-pressed={services.failUpload} onClick={() => services.setFailUpload(value => !value)}>模拟上传失败：{services.failUpload ? "开" : "关"}</Button><Button type="button" variant="text" aria-pressed={services.failTranscribe} onClick={() => services.setFailTranscribe(value => !value)}>模拟转写失败：{services.failTranscribe ? "开" : "关"}</Button></>;
}

function CompleteAnswer() {
  return <>{answerSections.map((section, index) => <section key={section.title}>
    <h4>{section.title}</h4>
    {index === 1 ? <ol>{section.text.split("\n").map(text => <li key={text}>{text.replace(/^第[一二三]步，/, "")}</li>)}</ol> : <p>{section.text}</p>}
  </section>)}<div className="g6-course-comparison" role="region" aria-label="事实与解释对照" tabIndex={0}>
    <table><thead><tr><th scope="col">记录类型</th><th scope="col">示例</th></tr></thead><tbody>
      <tr><th scope="row">事实</th><td>三位同学举手。</td></tr>
      <tr><th scope="row">解释</th><td>他们可能理解了。</td></tr>
      <tr><th scope="row">待验证</th><td>其他同学能否独立完成练习？</td></tr>
    </tbody></table>
  </div></>;
}

function AnswerSources() {
  const commands = useMessageScroller();
  return <Collapsible variant="quiet" className="g6-course-sources">
    <CollapsibleTrigger onClick={event => {
      const item = event.currentTarget.closest<HTMLElement>("[data-message-id]");
      const viewport = event.currentTarget.closest<HTMLElement>(".rain-message-scroller__viewport");
      const content = item?.closest<HTMLElement>(".rain-message-scroller__content");
      if (!item?.dataset.messageId || !viewport || !content) return;
      const style = getComputedStyle(content);
      const paddingStart = Number.parseFloat(style.paddingBlockStart || style.paddingTop) || 0;
      // A public message jump at the current offset leaves bottom-following
      // before the details resize, keeping the clicked reading position stable.
      commands.scrollToMessage(item.dataset.messageId, { align: "start", behavior: "auto",
        scrollMargin: item.getBoundingClientRect().top - viewport.getBoundingClientRect().top - paddingStart });
    }}>参考资料 · 2 份</CollapsibleTrigger>
    <CollapsibleContent><div className="g6-course-source-list">
      <article><FileIcon aria-hidden="true" /><div><strong>课堂观察记录与同伴反馈说明</strong><span>本地示例摘录 · 观察记录</span><p>先记录可核对的言语与行为，再单列解释，并注明需要进一步验证的问题。</p></div></article>
      <article><FileIcon aria-hidden="true" /><div><strong>从课堂证据到学习判断</strong><span>本地示例摘录 · 证据判断</span><p>结合多种观察与学习产出检验解释，不以单次举手或沉默代替理解程度。</p></div></article>
    </div></CollapsibleContent>
  </Collapsible>;
}

function ReturnToLatest({ target, className }: { target: RefObject<HTMLDivElement | null>; className: string }) {
  const commands = useMessageScroller();
  return <div className={`${className}-bar`}><MessageScrollerButton type="button" variant="text" size="compact" className={className} onClick={event => {
    event.preventDefault();
    if (commands.scrollToEnd({ behavior: "auto" })) target.current?.focus({ preventScroll: true });
  }}>返回最新</MessageScrollerButton></div>;
}

function AnswerMessage({ turn, busy, retry }: { turn: CourseTurn; busy: boolean; retry: () => void }) {
  const [notice, setNotice] = useState("");
  const [helpful, setHelpful] = useState(false);
  const growing = turn.status === "waiting" || turn.status === "generating";
  const status = turn.status === "waiting" ? turn.answer ? "重新生成中，以下是上次未完成内容" : "正在准备回答…"
    : turn.status === "generating" ? "正在生成…" : turn.status === "stopped" ? "已停止生成，回答尚未完成"
      : turn.status === "failed" ? turn.answer ? "回答中断，已保留生成内容" : "回答未能生成，请重试" : "";
  async function copy() {
    try { await navigator.clipboard.writeText(turn.answer); setNotice("已复制"); }
    catch { setNotice("复制未完成，请选择正文复制"); }
  }
  return <Message localRecipe={courseMessageRecipe} data-g6-answer-id={`answer-${turn.id}`} data-answer-status={turn.status} tabIndex={-1} data-focus="item" role="group" aria-label="课程助教回答">
    <MessageAvatar><Avatar size={32} src={avatarAssets["teacher-01"]} alt="" /></MessageAvatar>
    <MessageContent>
      <MessageHeader><strong>课程助教</strong><span>课程辅导</span></MessageHeader>
      {status && <Marker className="g6-course-answer-state" data-answer-status={turn.status}><MarkerContent>{growing && <Spinner aria-hidden="true" role="presentation" />}{status}</MarkerContent></Marker>}
      {turn.answer && <Bubble variant="ghost" className="g6-course-answer-bubble"><BubbleContent className="g6-course-answer" data-g6-answer-body>
        {turn.status === "done" ? <CompleteAnswer /> : <p className="g6-course-stream-text">{turn.answer}</p>}
      </BubbleContent></Bubble>}
      {!growing && <MessageFooter className="g6-course-answer-footer">
        {turn.status === "done" && <AnswerSources />}
        {turn.answer && <Button type="button" variant="text" size="compact" onClick={copy} aria-label="复制此回答">{notice === "已复制" ? "已复制" : "复制"}</Button>}
        {turn.status === "done" && <Button type="button" variant="text" size="compact" localRecipe={feedbackToggleRecipe} aria-pressed={helpful} onClick={() => setHelpful(value => !value)}>{helpful ? "已反馈有帮助" : "有帮助"}</Button>}
        {(turn.status === "stopped" || turn.status === "failed") && <Button type="button" variant="text" size="compact" disabled={busy} onClick={event => { setNotice(""); event.currentTarget.closest<HTMLElement>("[data-g6-answer-id]")?.focus({ preventScroll: true }); retry(); }} aria-label={turn.status === "failed" ? "重试此回答" : "重新生成此回答"}>{turn.status === "failed" ? "重试" : "重新生成"}</Button>}
        <span role="status">{notice}</span>
      </MessageFooter>}
    </MessageContent>
  </Message>;
}

function CourseScene({ turns, busy, composer, services, references, stop, retry, loadHistory, history, jumpId }: {
  turns: CourseTurn[]; busy: boolean; composer: ReturnType<typeof useG6Composer>; services: ReturnType<typeof useDemoServices>; references: ReturnType<typeof createG6ReferenceService>;
  stop: () => void; retry: (id: string) => void; loadHistory: () => void; history: boolean; jumpId: string | null;
}) {
  const input = useRef<HTMLTextAreaElement>(null), latest = useRef<HTMLDivElement>(null);
  const [permissionHelp, setPermissionHelp] = useState(false);
  const commands = useMessageScroller();
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current || !turns.length) return;
    // The initial last-anchor heuristic can see the intrinsic placeholder height
    // and enter following-bottom before the long answer is laid out. This one
    // public jump establishes the intended reading position; later updates never
    // replay it, so user history reading remains under the existing engine.
    initialized.current = commands.scrollToMessage(`question-${turns[turns.length - 1]!.id}`, { align: "start", behavior: "auto" });
  }, [turns, commands.scrollToMessage]);
  useEffect(() => { if (jumpId) commands.scrollToMessage(`question-${jumpId}`, { align: "start", behavior: "auto" }); }, [jumpId, commands.scrollToMessage]);
  return <section className="g6-course-shell" aria-label="课程答疑样板">
    <header className="g6-course-heading"><div><span>课堂观察 · 第 04 讲</span><h3>从事实出发，读懂课堂</h3></div><span className="g6-course-demo-label">本地示例</span></header>
    <MessageScroller className="g6-course-scroller">
      {turns.length === 0 ? <div className="g6-course-empty"><h4>把不确定的地方问清楚</h4><p>从一个观察片段开始，试着区分事实和解释。</p><Button type="button" variant="secondary" onClick={() => { composer.setDraft({ ...composer.draft, text: sampleTurn.question }); input.current?.focus(); }}>怎样区分事实与解释？</Button></div> : <>
        <MessageScrollerViewport aria-label="课程答疑记录" preserveScrollOnPrepend>
          <div className="g6-course-history"><Button type="button" variant="text" disabled={history} onClick={loadHistory}>{history ? "已显示本页全部记录" : "加载更早记录"}</Button></div>
          <MessageScrollerContent aria-busy={busy} className="g6-course-message-list">
            {turns.map((turn, index) => <MessageScrollerItem key={turn.id} messageId={`question-${turn.id}`} scrollAnchor className="g6-course-turn" ref={index === turns.length - 1 ? latest : undefined} tabIndex={-1} data-focus="item">
              <Message align="end" localRecipe={courseMessageRecipe}><MessageContent><MessageHeader><strong>我</strong></MessageHeader><Bubble variant="secondary" align="end" className="g6-course-question"><BubbleContent><p>{turn.question}</p>{turn.material && <Material name={turn.material} />}{turn.attachments?.map(item => <Material key={item.id} name={item.name} />)}{turn.references?.map(item => <Material key={item.id} name={item.name} />)}</BubbleContent></Bubble></MessageContent></Message>
              <AnswerMessage turn={turn} busy={busy} retry={() => retry(turn.id)} />
            </MessageScrollerItem>)}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <ReturnToLatest target={latest} className="g6-course-latest" />
      </>}
    </MessageScroller>
    <div className="g6-course-composer">
      <ConversationComposer ref={input} conversationId="g6-course" aria-label="输入课程问题" formLabel="课程提问" sendLabel="发送问题" placeholder="结合课程内容，写下你的问题…"
        draft={{ ...composer.draft, sourceScope: composer.draft.sourceScope ?? "course" }} draftRevision={composer.draftRevision} onDraftChange={composer.setDraft} attachments={composer.attachments}
        references={references} sources={[{ value: "course", label: "本课程资料", description: "本地演示课程的三份资料" }, { value: "references", label: "本次引用资料", description: "仅使用已选择的课程资料", disabledReason: composer.draft.references.length ? undefined : "请先添加引用资料" }]}
        voice={{ transcribe: services.transcribe, onPermissionHelp: () => setPermissionHelp(true) }} submission={composer.submission}
        submitBlockedReason={composer.submitFeedbackReason} onSubmit={() => void composer.onSubmit()} generation={{ running: busy, onStop: stop }} />
      <p className="g6-course-note">本地示例 · 上传、课程资料、转写与回答均为模拟。{busy ? "生成期间可准备下一问。" : "Enter 换行，点击发送。"}{permissionHelp && "请在浏览器网站设置中允许麦克风，然后重新开始录音。"}</p>
    </div>
  </section>;
}

export function CourseConversation() {
  const [turns, setTurns] = useState<CourseTurn[]>([sampleTurn]);
  const [activeId, setActiveId] = useState<string | null>(null), [history, setHistory] = useState(false), [jumpId, setJumpId] = useState<string | null>(null);
  const services = useDemoServices(), [references] = useState(createG6ReferenceService), accepted = useRef(new Set<string>());
  const timer = useRef<ReturnType<typeof setInterval> | null>(null), sequence = useRef(0), attempt = useRef(0), active = useRef<string | null>(null);
  function cancelTimer() { attempt.current++; if (timer.current !== null) clearInterval(timer.current); timer.current = null; }
  useEffect(() => () => { attempt.current++; if (timer.current !== null) clearInterval(timer.current); }, []);
  function generate(id: string) {
    if (active.current !== null) return;
    cancelTimer(); const request = attempt.current; let count = 0;
    active.current = id; setActiveId(id);
    setTurns(current => current.map(turn => turn.id === id ? { ...turn, status: "waiting" } : turn));
    timer.current = setInterval(() => {
      if (attempt.current !== request || active.current !== id) return;
      count += 12;
      const done = count >= fullAnswer.length;
      setTurns(current => current.map(turn => turn.id === id ? { ...turn, answer: fullAnswer.slice(0, count), status: done ? "done" : "generating" } : turn));
      if (done) { cancelTimer(); active.current = null; setActiveId(null); }
    }, 70);
  }
  function stop(status: "stopped" | "failed") {
    const id = active.current; if (id === null) return;
    cancelTimer(); active.current = null; setActiveId(null);
    setTurns(current => current.map(turn => turn.id === id ? { ...turn, status } : turn));
  }
  const composer = useG6Composer("g6-course", {
    upload: services.upload,
    submitBlockedReason: activeId !== null ? "请先等待回答完成，或停止当前回答。" : undefined,
    submit: async snapshot => {
      if (accepted.current.has(snapshot.clientMessageId)) return;
      if (active.current !== null) throw new Error("请先等待回答完成，或停止当前回答。");
      if (snapshot.draft.sourceScope === "references" && snapshot.draft.references.length === 0) throw new Error("请添加引用资料或更改范围。");
      const id = String(++sequence.current);
      accepted.current.add(snapshot.clientMessageId);
      setTurns(current => [...current, { id, question: snapshot.draft.text.trim(), attachments: snapshot.attachments, references: snapshot.draft.references, sourceScope: snapshot.draft.sourceScope, answer: "", status: "waiting" }]);
      setJumpId(id); generate(id);
    },
  });
  function loadExample(empty = false) {
    cancelTimer(); active.current = null; setActiveId(null); setTurns(empty ? [] : [sampleTurn]); setHistory(false); setJumpId(null); composer.resetDraft(); accepted.current.clear();
  }
  return <div className="g6-course-example"><MessageScrollerProvider autoScroll={true} defaultScrollPosition="last-anchor">
    <CourseScene turns={turns} busy={activeId !== null} composer={composer} services={services} references={references} stop={() => stop("stopped")} retry={generate} history={history} jumpId={jumpId}
      loadHistory={() => { setTurns(current => [{ ...sampleTurn, id: "earlier", question: "为什么观察记录需要写清时间和场景？", material: undefined }, ...current]); setHistory(true); }} />
  </MessageScrollerProvider><details className="g6-course-demo-controls"><summary>演示控制</summary><p>以下操作只改变本页模拟服务。</p><div><Button type="button" variant="secondary" onClick={() => loadExample()}>载入示例</Button><Button type="button" variant="text" onClick={() => loadExample(true)}>查看空会话</Button><Button type="button" variant="text" disabled={activeId === null} onClick={() => stop("failed")}>模拟回答中断</Button><DemoServiceControls services={services} /></div></details></div>;
}

type DiscussionMessage = { id: string; author: string; role?: string; text: string; time: string; startsGroup?: boolean; dateMarker?: string; reply?: { id: string; author: string; text: string }; own?: boolean; attachments?: AttachmentRecord[] };
const discussionMessages: DiscussionMessage[] = [
  { id: "teacher", author: "张老师", role: "教师", text: "请描述一个你在课堂上观察到的片段。先写事实，再说说你的解释，以及准备怎样验证。", time: "10:24", startsGroup: true, dateMarker: "今天 · 课堂讨论" },
  { id: "student-1", author: "李同学", text: "小组讨论开始后，有三位同学轮流解释各自的解题步骤，另一位同学在做记录。", time: "10:26" },
  { id: "student-2", author: "李同学", text: "我最初认为他们已经理解了，但还需要看看每个人能否独立完成下一题。", time: "10:26" },
  { id: "student-3", author: "王同学", text: "我会把“做了记录”和“已经理解”分开写。记录本身不能证明理解，还需要听听他怎样解释。", time: "10:28", reply: { id: "student-1", author: "李同学", text: "另一位同学在做记录。" } },
];
const discussionPortraits: Record<string, string> = {
  "张老师": avatarAssets["teacher-02"], "李同学": avatarAssets["student-01"], "王同学": avatarAssets["student-02"],
};

function DiscussionScene({ messages, composer, services, history, loadHistory, sentId }: {
  messages: DiscussionMessage[]; composer: ReturnType<typeof useG6Composer>; services: ReturnType<typeof useDemoServices>;
  history: boolean; loadHistory: () => void; sentId: string | null;
}) {
  const input = useRef<HTMLTextAreaElement>(null), latest = useRef<HTMLDivElement>(null), messageNodes = useRef(new Map<string, HTMLDivElement>());
  const [returnId, setReturnId] = useState<string | null>(null), [notice, setNotice] = useState(""), [liked, setLiked] = useState<string[]>([]);
  const [permissionHelp, setPermissionHelp] = useState(false);
  const pending = composer.submission.status === "pending";
  const commands = useMessageScroller();
  useEffect(() => { if (sentId) commands.scrollToMessage(sentId, { align: "end", behavior: "auto" }); }, [sentId, commands.scrollToMessage]);
  function locate(id: string, from?: string) {
    if (commands.scrollToMessage(id, { align: "center", behavior: "auto" })) {
      messageNodes.current.get(id)?.focus({ preventScroll: true }); setReturnId(from ?? null); setNotice("");
    } else setNotice("原消息暂不可用，引用内容仍保留在这里。");
  }
  return <section className="g6-discussion-shell" aria-label="课堂讨论样板">
    <header className="g6-discussion-heading"><div><span>课堂观察 · 教学研讨班</span><h3>哪些是事实，哪些是解释？</h3></div><span className="g6-discussion-demo-label">本地示例</span></header>
    <MessageScroller className="g6-discussion-scroller"><MessageScrollerViewport aria-label="课堂讨论记录" preserveScrollOnPrepend>
      <div className="g6-discussion-history"><Button type="button" variant="text" disabled={history} onClick={loadHistory}>{history ? "已显示本页全部记录" : "加载更早讨论"}</Button></div>
      <MessageScrollerContent className="g6-discussion-message-list">
      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const grouped = !message.startsGroup && previous?.author === message.author && previous.reply?.id === message.reply?.id;
        return <MessageScrollerItem key={message.id} messageId={message.id} scrollAnchor={message.id === "teacher"} tabIndex={-1} data-focus="item" data-discussion-own={message.own || undefined} data-grouped={grouped || undefined}
          className="g6-discussion-row" ref={node => { if (node) messageNodes.current.set(message.id, node); else messageNodes.current.delete(message.id); if (index === messages.length - 1) latest.current = node; }}>
          {message.dateMarker && <Marker variant="separator" className="g6-discussion-date"><MarkerContent>{message.dateMarker}</MarkerContent></Marker>}
          <Message localRecipe={discussionMessageRecipe}><MessageAvatar aria-hidden={grouped || undefined}>{!grouped && <Avatar size={32} src={message.own ? avatarAssets["student-03"] : discussionPortraits[message.author]} alt="" />}</MessageAvatar><MessageContent>
            {!grouped && <MessageHeader><strong>{message.author}</strong>{message.role && <span className="g6-discussion-role">{message.role}</span>}<time>{message.time}</time></MessageHeader>}
            {message.reply && <button className="g6-discussion-quote" data-focus="control" onClick={() => locate(message.reply!.id, message.id)}><strong>{message.reply.author}</strong><span>{message.reply.text}</span></button>}
            <Bubble variant={message.own ? "secondary" : "ghost"} className="g6-discussion-bubble"><BubbleContent><p>{message.text}</p>{message.attachments?.map(item => <Material key={item.id} name={item.name} />)}</BubbleContent></Bubble>
            <MessageFooter className="g6-discussion-tools"><Button type="button" variant="text" size="compact" disabled={pending} aria-label={`回复${message.author}的消息`} onClick={() => { if (input.current?.readOnly) return; composer.setDraft({ ...composer.draft, reply: { messageId: message.id, author: message.author, excerpt: message.text } }); input.current?.focus(); }}>回复</Button><Button type="button" variant="text" size="compact" localRecipe={feedbackToggleRecipe} aria-label={`赞同${message.author}的消息`} aria-pressed={liked.includes(message.id)} onClick={() => setLiked(current => current.includes(message.id) ? current.filter(id => id !== message.id) : [...current, message.id])}>{liked.includes(message.id) ? "已赞同" : "赞同"}</Button></MessageFooter>
          </MessageContent></Message>
        </MessageScrollerItem>;
      })}
    </MessageScrollerContent></MessageScrollerViewport><ReturnToLatest target={latest} className="g6-discussion-latest" /></MessageScroller>
    <div className="g6-discussion-composer">
      {returnId && <Button type="button" variant="text" onClick={() => locate(returnId)}>返回引用处</Button>}
      <ConversationComposer ref={input} conversationId="g6-discussion" aria-label="输入讨论内容" formLabel="发送课堂讨论" sendLabel="发送讨论" placeholder={composer.draft.reply ? `回复${composer.draft.reply.author}…` : "写下你的观察与思考…"}
        draft={composer.draft} draftRevision={composer.draftRevision} onDraftChange={composer.setDraft} attachments={composer.attachments}
        onLocateReply={composer.draft.reply ? () => locate(composer.draft.reply!.messageId) : undefined} voice={{ transcribe: services.transcribe, onPermissionHelp: () => setPermissionHelp(true) }}
        submission={composer.submission} submitBlockedReason={composer.submitFeedbackReason} onSubmit={() => void composer.onSubmit()} />
      <p className="g6-discussion-note" role="status">{notice || "本地示例 · 上传、转写与发送均为模拟。Enter 换行，点击发送。"}{permissionHelp && "请在浏览器网站设置中允许麦克风，然后重新开始录音。"}</p>
    </div>
  </section>;
}

export function ClassroomDiscussion() {
  const [messages, setMessages] = useState(discussionMessages);
  const [failSend, setFailSend] = useState(false), [history, setHistory] = useState(false), [sentId, setSentId] = useState<string | null>(null);
  const sequence = useRef(0), accepted = useRef(new Set<string>()), services = useDemoServices();
  const composer = useG6Composer("g6-discussion", {
    upload: services.upload,
    allowAttachmentsOnly: true,
    submit: async (snapshot, { signal }) => {
      if (accepted.current.has(snapshot.clientMessageId)) return;
      const shouldFail = failSend;
      await new Promise<void>((resolve, reject) => {
        if (signal.aborted) { reject(new DOMException("本地模拟发送已取消", "AbortError")); return; }
        const abort = () => { clearTimeout(timer); signal.removeEventListener("abort", abort); reject(new DOMException("本地模拟发送已取消", "AbortError")); };
        const timer = setTimeout(() => { signal.removeEventListener("abort", abort); resolve(); }, 450);
        signal.addEventListener("abort", abort, { once: true });
      });
      if (shouldFail) throw new Error("发送未成功，文字、资料和回复对象已保留。请重试。");
      if (signal.aborted || accepted.current.has(snapshot.clientMessageId)) return;
      accepted.current.add(snapshot.clientMessageId);
      const id = `own-${++sequence.current}`, reply = snapshot.draft.reply;
      setMessages(current => [...current, { id, author: "我", text: snapshot.draft.text.trim(), time: "刚刚", own: true, attachments: snapshot.attachments, reply: reply ? { id: reply.messageId, author: reply.author, text: reply.excerpt } : undefined }]);
      setSentId(id);
    },
  });
  const pending = composer.submission.status === "pending";
  function reset() {
    composer.resetDraft(); accepted.current.clear(); setMessages(discussionMessages); setHistory(false); setSentId(null);
  }
  return <div className="g6-discussion-example"><MessageScrollerProvider autoScroll={true} defaultScrollPosition="end">
    <DiscussionScene messages={messages} composer={composer} services={services} history={history} sentId={sentId}
      loadHistory={() => { setMessages(current => [{ id: "earlier-discussion", author: "张老师", role: "教师", text: "请先阅读课程材料中的观察记录，再加入今天的讨论。", time: "10:20", startsGroup: true, dateMarker: "今天 · 课前准备" }, ...current]); setHistory(true); }} />
  </MessageScrollerProvider><details className="g6-discussion-demo-controls"><summary>演示控制</summary><p>以下操作只改变本页模拟服务。</p><div><Button type="button" variant="secondary" onClick={reset}>载入示例</Button><Button type="button" variant="text" disabled={pending} aria-pressed={failSend} onClick={() => setFailSend(value => !value)}>模拟发送失败：{failSend ? "开" : "关"}</Button><DemoServiceControls services={services} /></div></details></div>;
}
