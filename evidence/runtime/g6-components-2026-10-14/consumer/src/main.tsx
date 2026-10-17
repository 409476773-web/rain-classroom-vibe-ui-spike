import { createRoot } from "react-dom/client";
import { useState } from "react";
import { DensityProvider } from "@rain-next/foundations";
import {
 AspectRatio, Attachment, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction,
 DirectionProvider, useDirection, Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
 InputOTP, InputOTPGroup, InputOTPSlot, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
 Bubble, BubbleContent, Marker, MarkerContent, Message, MessageContent, MessageHeader,
 MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton,
 Questionnaire, QuestionnaireProgress, QuestionnaireItem, QuestionnaireTitle, QuestionnaireChoice, QuestionnaireError, QuestionnaireActions, QuestionnaireSubmit,
 Button, FormItem, defineRainLocalRecipe, type BubbleRecipe,
} from "@rain-next/ui";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/foundations/motion.css";
import "@rain-next/ui/styles.css";
import "./styles.css";
import "@rain-next/layouts/styles.css";
import {DataTableRecipe} from "./data-table-recipe";
import {LocalDataTableRecipe} from "./data-table-recipe-local";
const bubbleRecipe:BubbleRecipe=defineRainLocalRecipe({id:"consumer-course-note",scope:"feature",origin:"ui-bubble",classes:{content:"consumer-local"},modifiedParts:["content"],candidateTokens:[],promotionStatus:"not-proposed"});
function DirectionLabel(){return <p>方向：{useDirection()}</p>;}
function Fixture({mode}:{mode:"default"|"local"|"sibling"}){
 const [feedback,setFeedback]=useState("");const label=mode==="local"?"局改":mode==="sibling"?"未改兄弟":"默认";const recipe=mode==="local"?bubbleRecipe:undefined;
 return <section className="consumer-card" data-testid={mode}><h2>{label}</h2>
 <AspectRatio ratio={16/9} className={mode==="local"?"consumer-local":undefined}><p>课程封面</p></AspectRatio>
 <Attachment style={mode==="local"?{paddingInline:"var(--rain-space-24)"}:undefined}><AttachmentMedia>PDF</AttachmentMedia><AttachmentContent><AttachmentTitle>课程导读.pdf</AttachmentTitle><AttachmentDescription>本地资料</AttachmentDescription></AttachmentContent><AttachmentActions><AttachmentAction onClick={()=>setFeedback(`${label}附件已打开`)}>预览</AttachmentAction></AttachmentActions></Attachment>
 <DirectionProvider direction={mode==="local"?"rtl":"ltr"}><div dir={mode==="local"?"rtl":"ltr"}><DirectionLabel/></div></DirectionProvider>
 <Drawer showSwipeHandle><DrawerTrigger render={<Button>打开{label}任务</Button>} /><DrawerContent className={mode==="local"?"consumer-local":undefined}><DrawerHeader><DrawerTitle>{label}任务</DrawerTitle><DrawerDescription>源码和样式从独立包消费。</DrawerDescription></DrawerHeader><p>课堂观察记录。</p><DrawerFooter><DrawerClose render={<Button>关闭任务</Button>} /></DrawerFooter></DrawerContent></Drawer>
 <FormItem label={`${label}验证码`}><InputOTP maxLength={4} name={`code-${mode}`}><InputOTPGroup style={mode==="local"?{gap:"var(--rain-space-8)"}:undefined}>{[0,1,2,3].map(index=><InputOTPSlot key={index} index={index}/>)}</InputOTPGroup></InputOTP></FormItem>
 <div className="consumer-carousel"><Carousel style={mode==="local"?{paddingInline:"var(--rain-space-24)"}:undefined} aria-label={`${label}资料轮播`} tabIndex={0}><CarouselContent>{["导读","记录","交流"].map(text=><CarouselItem key={text}><p>{text}</p></CarouselItem>)}</CarouselContent><CarouselPrevious/><CarouselNext/></Carousel></div>
 <Bubble variant="tinted" localRecipe={recipe}><BubbleContent>事实与解释分开记录。</BubbleContent></Bubble><Marker style={mode==="local"?{paddingInline:"var(--rain-space-24)"}:undefined} variant="separator"><MarkerContent>课堂开始</MarkerContent></Marker><Message className={mode==="local"?"consumer-local":undefined}><MessageContent><MessageHeader>课程助教</MessageHeader><Bubble variant="ghost"><BubbleContent>从你直接观察到的事实开始。</BubbleContent></Bubble></MessageContent></Message>
 <MessageScrollerProvider><MessageScroller style={mode==="local"?{height:240}:undefined} className="consumer-scroll"><MessageScrollerViewport aria-label={`${label}消息`}><MessageScrollerContent>{[0,1,2,3,4].map(i=><MessageScrollerItem messageId={`${mode}-${i}`} key={i}><p>课程观察记录 {i+1}：描述事实、寻找证据并讨论。</p></MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton/></MessageScroller></MessageScrollerProvider>
 <Questionnaire style={mode==="local"?{paddingInline:"var(--rain-space-24)"}:undefined} aria-label={`${label}反馈`} items={[{name:"goal",required:true,choices:[{value:"review"}]}]} onSubmit={event=>{event.preventDefault();setFeedback(`反馈：${new FormData(event.currentTarget).get("goal")}`);}}><QuestionnaireProgress/><QuestionnaireItem name="goal" required><QuestionnaireTitle>学习目标</QuestionnaireTitle><QuestionnaireChoice value="review">复习课程</QuestionnaireChoice><QuestionnaireError/></QuestionnaireItem><QuestionnaireActions><QuestionnaireSubmit>提交{label}反馈</QuestionnaireSubmit></QuestionnaireActions></Questionnaire><p role="status">{feedback}</p>
 </section>;
}
createRoot(document.getElementById("root")!).render(<DensityProvider density="default"><main className="consumer" data-rain-theme="light"><h1>G6 独立包消费</h1><section className="consumer-card"><h2>课程资料 Recipe</h2>{(["default","local","sibling"] as const).map(mode=><section key={mode} data-testid={`table-${mode}`}><h3>{mode==="local"?"局改配方":mode==="sibling"?"未改兄弟配方":"默认配方"}</h3>{mode==="local"?<LocalDataTableRecipe/>:<DataTableRecipe/>}</section>)}</section><div className="consumer-grid">{(["default","local","sibling"] as const).map(mode=><Fixture key={mode} mode={mode}/>)}</div></main></DensityProvider>);
