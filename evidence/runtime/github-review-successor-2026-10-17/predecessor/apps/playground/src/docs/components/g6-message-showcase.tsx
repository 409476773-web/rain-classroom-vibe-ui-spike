import { useState } from "react";
import {
  Attachment, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle,
  Avatar, avatarAssets, Bubble, BubbleContent, BubbleGroup, Button, defineRainLocalRecipe,
  Marker, MarkerContent, MarkerIcon,
  Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader,
} from "@rain-next/ui";
import { CircleCloseIcon } from "@rain-next/ui/icons/circle-close";
import { CopyIcon } from "@rain-next/ui/icons/copy";
import { FileIcon } from "@rain-next/ui/icons/file";
import { InfoIcon } from "@rain-next/ui/icons/info";
import { LikeIcon } from "@rain-next/ui/icons/like";
import { feedbackToggleRecipe } from "./g6-feedback-toggle";
import "./g6-message-showcase.css";

export const messageRecipe = defineRainLocalRecipe<"root" | "avatar" | "content" | "header" | "footer" | "group", "ui-message">({
  id: "g6-doc-message-reading-trial", scope: "feature", origin: "ui-message",
  classes: {
    root: "g6-message-showcase__message", avatar: "g6-message-showcase__avatar",
    content: "g6-message-showcase__content", header: "g6-message-showcase__metadata",
    footer: "g6-message-showcase__footer", group: "g6-message-showcase__turns",
  },
  modifiedParts: ["root", "avatar", "content", "header", "footer", "group"],
  candidateTokens: [], promotionStatus: "not-proposed",
});

export const answerRecipe = defineRainLocalRecipe<"root" | "content", "ui-bubble">({
  id: "g6-doc-answer-reading-trial", scope: "feature", origin: "ui-bubble",
  classes: { root: "g6-message-showcase__answer", content: "g6-message-showcase__reading" },
  modifiedParts: ["root", "content"], candidateTokens: [], promotionStatus: "not-proposed",
});

const questionRecipe = defineRainLocalRecipe<"root" | "content", "ui-bubble">({
  id: "g6-doc-question-surface-trial", scope: "feature", origin: "ui-bubble",
  classes: { root: "g6-message-showcase__question", content: "g6-message-showcase__question-text" },
  modifiedParts: ["root", "content"], candidateTokens: [], promotionStatus: "not-proposed",
});

const bubbleGroupRecipe = defineRainLocalRecipe<"group", "ui-bubble">({
  id: "g6-doc-bubble-turns-trial", scope: "feature", origin: "ui-bubble",
  classes: { group: "g6-message-showcase__turns" }, modifiedParts: ["group"],
  candidateTokens: [], promotionStatus: "not-proposed",
});

const markerRecipe = defineRainLocalRecipe<"root" | "icon" | "content", "ui-marker">({
  id: "g6-doc-marker-context-trial", scope: "feature", origin: "ui-marker",
  classes: {
    root: "g6-message-showcase__marker", icon: "g6-message-showcase__marker-icon",
    content: "g6-message-showcase__marker-text",
  },
  modifiedParts: ["root", "icon", "content"], candidateTokens: [], promotionStatus: "not-proposed",
});

const copiedAnswer = [
  "先写下你直接看到的事实，再把解释和需要验证的判断分开。",
  "事实：教师提问后，有三位同学举手。其中两位能说出自己的解题步骤。",
  "解释：他们可能已经理解了这个概念，但举手本身还不能说明每个人都理解了。",
  "下一步：请同学用自己的话解释，再结合一道新题检查理解。记录时间、原话与行为，之后再补上你的判断。",
].join("\n\n");

function ShowcaseHeading({ context }: { context: string }) {
  return <header className="g6-message-showcase__heading">
    <p className="g6-message-showcase__context">{context}</p>
    <span className="g6-message-showcase__sample">本地示例</span>
  </header>;
}

function CourseMaterial() {
  return <div className="g6-message-showcase__material-group">
    <Attachment size="sm" className="g6-message-showcase__material">
      <AttachmentMedia><FileIcon aria-hidden="true" /></AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle className="g6-message-showcase__material-title">课堂观察记录与同伴反馈说明.pdf</AttachmentTitle>
        <AttachmentDescription>课程导读 · 第 4–6 页</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
  </div>;
}

export function BubbleShowcase() {
  const [helpful, setHelpful] = useState(false);
  return <section className="g6-message-showcase" aria-label="事实与解释的辅导示例" data-g6-showcase="bubble">
    <ShowcaseHeading context="教育研究方法 · 课堂观察" />
    <BubbleGroup localRecipe={bubbleGroupRecipe}>
      <div className="g6-message-showcase__question-turn">
        <p className="g6-message-showcase__metadata"><span className="g6-message-showcase__sender">我</span><span>10:23</span></p>
        <Bubble variant="secondary" align="end" localRecipe={questionRecipe}>
          <BubbleContent>三位同学举手了，能直接写“他们已经理解”吗？</BubbleContent>
        </Bubble>
      </div>
      <div className="g6-message-showcase__answer-turn">
        <p className="g6-message-showcase__metadata"><span className="g6-message-showcase__sender">课程助教</span><span>10:24</span></p>
        <Bubble variant="ghost" localRecipe={answerRecipe}>
          <BubbleContent>
            <p><strong>还不能。</strong>“三位同学举手”是观察到的事实；“已经理解”还需要更多证据。</p>
            <p>可以把记录分成事实与解释：</p>
            <dl className="g6-message-showcase__comparison">
              <div><dt>观察到的事实</dt><dd>教师提问后，三位同学举手；其中两位说出了自己的解题步骤。</dd></div>
              <div><dt>暂时的解释</dt><dd>部分同学可能理解了概念，还需要用新的问题验证。</dd></div>
            </dl>
            <p>下一次观察，先记下同学的原话和行为，再单独补充你的解释。这样，讨论时就能找到判断的依据。</p>
          </BubbleContent>
        </Bubble>
        <CourseMaterial />
        <div className="g6-message-showcase__reaction">
          <Button variant="text" size="compact" localRecipe={feedbackToggleRecipe} leadingIcon={<LikeIcon aria-hidden="true" />} aria-pressed={helpful} onClick={() => setHelpful(value => !value)}>
            有帮助<span aria-hidden="true"> · {helpful ? 1 : 0}</span>
          </Button>
        </div>
      </div>
    </BubbleGroup>
  </section>;
}

export function MessageShowcase() {
  const [notice, setNotice] = useState("");
  async function copyAnswer() {
    try {
      await navigator.clipboard.writeText(copiedAnswer);
      setNotice("已复制辅导回答。");
    } catch {
      setNotice("复制未完成，请选择正文复制。");
    }
  }
  return <section className="g6-message-showcase" aria-label="课堂观察辅导消息示例" data-g6-showcase="message">
    <ShowcaseHeading context="教育研究方法 · 课堂观察" />
    <MessageGroup localRecipe={messageRecipe}>
      <Message align="end" localRecipe={messageRecipe}>
        <MessageAvatar><Avatar size={32} src={avatarAssets["student-03"]} alt="" /></MessageAvatar>
        <MessageContent>
          <MessageHeader><span className="g6-message-showcase__sender">我</span><span>10:23</span></MessageHeader>
          <Bubble align="end" variant="secondary" localRecipe={questionRecipe}><BubbleContent>我记了很多课堂片段，该从哪里开始整理？</BubbleContent></Bubble>
        </MessageContent>
      </Message>
      <Message localRecipe={messageRecipe}>
        <MessageAvatar><Avatar size={32} src={avatarAssets["teacher-01"]} alt="" /></MessageAvatar>
        <MessageContent>
          <MessageHeader><span className="g6-message-showcase__sender">课程助教</span><span>10:24</span></MessageHeader>
          <Bubble variant="ghost" localRecipe={answerRecipe}>
            <BubbleContent>
              <p>先写下你直接看到的事实，再把解释和需要验证的判断分开。</p>
              <dl className="g6-message-showcase__comparison">
                <div><dt>事实</dt><dd>教师提问后，有三位同学举手。其中两位能说出自己的解题步骤。</dd></div>
                <div><dt>解释</dt><dd>他们可能已经理解了这个概念，但举手本身还不能说明每个人都理解了。</dd></div>
              </dl>
              <p><strong>下一步：</strong>请同学用自己的话解释，再结合一道新题检查理解。记录时间、原话与行为，之后再补上你的判断。</p>
            </BubbleContent>
          </Bubble>
          <CourseMaterial />
          <MessageFooter>
            <Button variant="text" size="compact" leadingIcon={<CopyIcon aria-hidden="true" />} aria-label="复制辅导回答" onClick={copyAnswer}>复制回答</Button>
          </MessageFooter>
          <p className="g6-message-showcase__feedback" role="status">{notice}</p>
        </MessageContent>
      </Message>
    </MessageGroup>
  </section>;
}

export function MarkerShowcase() {
  return <section className="g6-message-showcase" aria-label="课堂讨论中的会话标记示例" data-g6-showcase="marker">
    <ShowcaseHeading context="教育研究方法 · 小组讨论" />
    <div className="g6-message-showcase__marker-thread">
      <Marker variant="separator" localRecipe={markerRecipe} className="g6-message-showcase__date"><MarkerContent>今天 · 10:24</MarkerContent></Marker>
      <Message align="end" localRecipe={messageRecipe}>
        <MessageContent>
          <MessageHeader><span className="g6-message-showcase__sender">我</span></MessageHeader>
          <Bubble variant="secondary" align="end" localRecipe={questionRecipe}><BubbleContent>这次记录里，“学生已经理解”能作为事实吗？</BubbleContent></Bubble>
        </MessageContent>
      </Message>
      <Marker localRecipe={markerRecipe}>
        <MarkerIcon><InfoIcon aria-hidden="true" /></MarkerIcon>
        <MarkerContent>讨论主题已切换为“事实与解释”。</MarkerContent>
      </Marker>
      <Message localRecipe={messageRecipe}>
        <MessageContent>
          <MessageHeader><span className="g6-message-showcase__sender">课程助教</span><span>10:25</span></MessageHeader>
          <Bubble variant="ghost" localRecipe={answerRecipe}><BubbleContent><p>先记录可直接观察到的行为，再把“是否理解”作为需要验证的问题。这样，每个判断都能回到具体的课堂片段。</p></BubbleContent></Bubble>
        </MessageContent>
      </Message>
      <Message align="end" localRecipe={messageRecipe}>
        <MessageContent>
          <MessageHeader><span className="g6-message-showcase__sender">我</span><span>10:26</span></MessageHeader>
          <Bubble variant="secondary" align="end" localRecipe={questionRecipe}><BubbleContent>如果只记录了一次举手，下一步可以怎样验证？</BubbleContent></Bubble>
          <MessageFooter>
            <Marker localRecipe={markerRecipe} className="g6-message-showcase__failure">
              <MarkerIcon><CircleCloseIcon aria-hidden="true" /></MarkerIcon>
              <MarkerContent>这条消息未发出，原文已保留。</MarkerContent>
            </Marker>
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  </section>;
}
