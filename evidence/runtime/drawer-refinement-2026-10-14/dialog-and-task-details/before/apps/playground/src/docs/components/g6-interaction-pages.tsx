import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Button, Carousel, CarouselContent, CarouselControls, CarouselIndicators, CarouselItem, CarouselNext, CarouselPrevious,
  DirectionProvider, Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter,
  DrawerHeader, DrawerTitle, DrawerTrigger, FormItem, IconButton, Input,
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, Textarea, type CarouselApi,
} from "@rain-next/ui";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { ComponentDoc, DocExample } from "./component-doc";
import { CarouselVisualExamples } from "./carousel-examples";
import "./g6-interaction-pages.css";
import { TaskDraftDrawer } from "./g6-task-drawer";

export type G6InteractionId = "drawer" | "input-otp" | "carousel";
function DirectionalDrawers() {
  const options = [{ direction: "down", label: "底部", title: "底部任务概览" }, { direction: "up", label: "顶部", title: "顶部课堂提示" }, { direction: "left", label: "左侧", title: "左侧学习目录" }, { direction: "right", label: "右侧", title: "右侧资料详情" }] as const;
  return <div className="g6-interaction-actions">{options.map(option => <Drawer key={option.direction} swipeDirection={option.direction} showSwipeHandle>
    <DrawerTrigger render={<Button variant="secondary">从{option.label}打开</Button>} /><DrawerContent><DrawerHeader className="g6-drawer-example-header"><div className="g6-drawer-example-copy"><DrawerTitle>{option.title}</DrawerTitle><DrawerDescription>四个方向使用同一 Drawer 引擎，保留独立的拖动关闭方向。</DrawerDescription></div><DrawerClose render={<IconButton size="36/20" icon={<CloseIcon />} aria-label={`关闭${option.label}抽屉`} />} /></DrawerHeader><DrawerBody className="g6-interaction-drawer-body"><h3>从问题到证据</h3><p>课程导读、课堂观察与小组交流，围绕同一个学习目标组织。</p></DrawerBody></DrawerContent>
  </Drawer>)}</div>;
}
function ModalityDrawers() {
  const [count, setCount] = useState(0);
  return <div className="g6-interaction-stack"><div className="g6-interaction-field-row"><div><strong>课堂观察</strong><p data-testid="drawer-observation-count">已记录{count}次观察</p></div><Button variant="secondary" onClick={() => setCount(current => current + 1)}>记录一次观察</Button></div>
    <div className="g6-interaction-actions">{[{ modal: false, trigger: "打开非模态记录", title: "非模态课堂记录" }, { modal: "trap-focus", trigger: "打开焦点约束记录", title: "焦点约束课堂记录" }].map(option => <Drawer key={option.title} modal={option.modal as false | "trap-focus"} swipeDirection="right" disablePointerDismissal>
      <DrawerTrigger render={<Button variant="text">{option.trigger}</Button>} /><DrawerContent><DrawerHeader className="g6-drawer-example-header"><div className="g6-drawer-example-copy"><DrawerTitle>{option.title}</DrawerTitle><DrawerDescription>{option.modal === false ? "可以继续点击页面的记录按钮，也可以在页面与抽屉之间移动焦点。" : "页面仍接受指针点击；Tab 焦点被约束在抽屉内。"}</DrawerDescription></div><DrawerClose render={<IconButton size="36/20" icon={<CloseIcon />} aria-label="关闭课堂记录" />} /></DrawerHeader><DrawerBody className="g6-interaction-drawer-body"><FormItem label="随堂记录"><Textarea rows={5} placeholder="记下课堂中的观察" /></FormItem><p className="g6-interaction-meta">已记录{count}次观察。此例关闭指针外部退出，便于比较模式。</p></DrawerBody></DrawerContent>
    </Drawer>)}</div>
  </div>;
}
function DrawerPage() {
  return <ComponentDoc id="drawer" title="Drawer 拖动抽屉" description="保留课程上下文，处理一段短任务；滑动、分段高度和退出保护保持真实可操作。"
    useWhen={["移动端或课程页面中的短任务编辑、资料预览。", "需要拖动关闭、分段高度和嵌套抽屉的流程。"]}
    avoidWhen={["把长流程或多级页面导航全部塞进抽屉。", "用 Sheet 别名代替触摸手势，或用遮罩外观判断模态行为。"]}
    props={[{ name: "open / onOpenChange", type: "boolean / (open, details) => void", description: "受控状态；details.cancel() 可以阻止尚未确认的退出。" }, { name: "swipeDirection", type: "down / up / left / right", default: "down", description: "保留来源四方向；页面底部编辑为主场景。" }, { name: "snapPoints / snapPoint", type: "Array<number | string> / number | string | null", description: "纵向分段高度及受控位置；数字0—1为视口比例。" }, { name: "modal", type: "true / false / trap-focus", default: "true", description: "真实焦点与页面交互策略，与有无遮罩分开。" }, { name: "showSwipeHandle", type: "boolean", default: "false", description: "可选可视拖动把手，不增加假的独立交互控件。" }]}
    slots={["Drawer", "Trigger", "Portal", "Overlay", "SwipeHandle", "Content", "Header", "Body", "Footer", "Title", "Description", "Close"]} source="packages/ui/src/drawer/drawer.tsx"
    code={`<Drawer open={open} onOpenChange={(next, details) => {
  if (!next && hasUnsavedChanges) { details.cancel(); showExitChoice(); return; }
  setOpen(next);
}} showSwipeHandle snapPoints={[0.5, 0.85]} snapPoint={snap} onSnapPointChange={setSnap}>
  <DrawerTrigger render={<Button>编辑课前任务</Button>} />
  <DrawerContent><DrawerHeader className="flex-row items-start justify-between"><DrawerTitle>课前任务</DrawerTitle>
    <DrawerClose render={<IconButton icon={<CloseIcon />} aria-label="关闭课前任务" />} />
    </DrawerHeader><DrawerBody>{content}</DrawerBody>
  </DrawerContent>
</Drawer>`}>
    <DocExample title="课程任务草稿" description="半屏与展开位置由源引擎控制；正文独立滚动，底部操作保留在可见位置。完成方式直接可选，学生预览在同层切换；失败与退出确认可重复体验。"><TaskDraftDrawer /></DocExample>
    <DocExample title="四个打开方向" description="每个入口都打开真实抽屉；上下与左右分别使用纵轴和横轴手势。"><DirectionalDrawers /></DocExample>
    <DocExample title="页面交互与焦点约束" description="打开记录后继续点页面按钮，比较非模态与仅约束焦点模式。Tab 行为需在浏览器中检查。"><ModalityDrawers /></DocExample>
  </ComponentDoc>;
}

function OTPSlots({ length, split = false }: { length: number; split?: boolean }) {
  const slots = (start: number, end: number) => <InputOTPGroup>{Array.from({ length: end - start }, (_, offset) => <InputOTPSlot key={start + offset} index={start + offset} />)}</InputOTPGroup>;
  return split ? <>{slots(0, 3)}<InputOTPSeparator />{slots(3, length)}</> : slots(0, length);
}
function OTPVerification() {
  const [code, setCode] = useState(""), [pending, setPending] = useState(false), [message, setMessage] = useState("");
  const [status, setStatus] = useState<"default" | "error">("default"), [submitted, setSubmitted] = useState(""), [complete, setComplete] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null), input = useRef<HTMLInputElement>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending) return;
    const nativeCode = String(new FormData(event.currentTarget).get("classroomCode") ?? "");
    if (nativeCode.length !== 6) return;
    setSubmitted(nativeCode); setPending(true); setStatus("default"); setMessage("正在模拟验证，请稍候……");
    timer.current = setTimeout(() => {
      const rejected = nativeCode === "123456";
      setPending(false); setStatus(rejected ? "error" : "default");
      setMessage(rejected ? "演示验证码已过期，请修改后重试。" : "验证通过，可继续本地课堂演示。");
      timer.current = null; if (rejected) input.current?.focus();
    }, 500);
  }
  return <form className="g6-interaction-otp-form" data-testid="otp-verification-form" onSubmit={submit} aria-busy={pending || undefined}>
    <div className="g6-interaction-course"><span className="g6-interaction-eyebrow">课堂观察 · 进入课堂</span><h3>从问题到证据</h3><p>输入老师提供的六位课堂验证码，确认后进入。</p></div>
    <FormItem label="课堂验证码" required status={status} message={<span role="status">{message}</span>} help="本地模拟：123456 会校验失败，其他完整六位数字通过；不连接真实课堂。">
      <InputOTP ref={input} name="classroomCode" maxLength={6} pattern={"^\\d+$"} placeholder="000000" value={code} readOnly={pending}
        onChange={value => { setCode(value); setComplete(false); setStatus("default"); setMessage(""); }} onComplete={() => setComplete(true)}><OTPSlots length={6} /></InputOTP>
    </FormItem>
    <p className="g6-interaction-feedback" role="status" data-testid="otp-length-notice">{complete ? "6位已填满，等待你确认" : "填写完成后再点击验证"}</p>
    <Button variant="primary" type="submit" disabled={code.length !== 6 || pending} loading={pending}>验证并进入课堂</Button>
    <p className="g6-interaction-meta" data-testid="otp-submitted-code">{submitted ? `真实表单提交值：${submitted}` : "真实表单：尚未提交"}</p>
  </form>;
}
function OTPErrorExample() {
  const [value, setValue] = useState("1357");
  return <FormItem label="需修改的验证码" status="error" message="验证码已过期，请向老师获取新的课堂码。"><InputOTP maxLength={4} value={value} onChange={setValue} pattern={"^\\d+$"}><OTPSlots length={4} /></InputOTP></FormItem>;
}
function OTPPage() {
  return <ComponentDoc id="input-otp" title="Input OTP 单次验证码" description="把验证码显示为独立槽位，让原生输入、粘贴和表单保持同一个真实值。"
    useWhen={["课堂入口、一次性验证码等固定长度输入。", "需要短信自动填充、整段粘贴与原生表单提交。"]}
    avoidWhen={["把槽位做成多个需要逐个跳转的原生输入。", "将 onComplete 当作校验通过或未经确认的业务提交。"]}
    props={[{ name: "maxLength", type: "positive safe integer", description: "真实输入长度；槽位索引必须在该范围内。" }, { name: "value / onChange", type: "string / (value) => void", description: "沿用 input-otp 受控值；失败保留当前输入。" }, { name: "onComplete", type: "(value) => void", description: "只代表指定长度已填满，验证由宿主提交。" }, { name: "name / ref / placeholder", type: "原生单 input 属性", description: "关联 FormData、真实焦点和引擎占位字符。" }, { name: "pattern / pasteTransformer", type: "string / (text) => string", description: "字符约束与整段粘贴清理；不重写输入状态机。" }]}
    slots={["InputOTP", "Group", "Slot", "Separator"]} source="packages/ui/src/input-otp/input-otp.tsx"
    code={`<FormItem label="课堂验证码" status={error ? "error" : "default"} message={error}>
  <InputOTP name="classroomCode" maxLength={6} value={code} onChange={setCode}
    pattern={"^\\\\d+$"} onComplete={() => setLengthComplete(true)}>
    <InputOTPGroup>{[0, 1, 2, 3, 4, 5].map(index => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup>
  </InputOTP>
</FormItem>
// form onSubmit读取FormData，显式验证；onComplete不自动提交。`}>
    <DocExample title="课堂入口与失败恢复" description="只有点击验证或提交表单才开始500ms本地等待。失败保留验证码，并允许继续修改。"><OTPVerification /></DocExample>
    <DocExample title="四位与3+3分组" description="改变视觉分组不会改变原生单 input 的值、粘贴或 Tab 顺序。">
      <div className="g6-interaction-otp-grid"><FormItem label="四位练习验证码"><InputOTP maxLength={4} name="practiceCode" pattern={"^\\d+$"} placeholder="0000"><OTPSlots length={4} /></InputOTP></FormItem><FormItem label="分组课堂验证码"><InputOTP maxLength={6} name="groupedCode" pattern={"^\\d+$"} placeholder="000000" pasteTransformer={text => text.replace(/[-\s]/g, "")}><OTPSlots length={6} split /></InputOTP></FormItem></div>
    </DocExample>
    <DocExample title="禁用、只读与错误" description="只读保留复制与聚焦；禁用停止输入。错误通过 FormItem 关联真实输入和说明。"><div className="g6-interaction-otp-grid">
      <FormItem label="暂不可用" disabled help="课堂暂未开放"><InputOTP maxLength={4} value="2468"><OTPSlots length={4} /></InputOTP></FormItem>
      <FormItem label="只读课堂码" help="可以选择并复制"><InputOTP maxLength={4} value="2468" readOnly><OTPSlots length={4} /></InputOTP></FormItem>
      <OTPErrorExample />
    </div></DocExample>
  </ComponentDoc>;
}

type Material = { id: string; title: string; format: string; detail: string; chapter: string };
const materials: Material[] = [
  { id: "guide", title: "课程导读：从问题到证据", format: "PDF · 6页", detail: "先读三个真实观察案例，练习把笼统的感受转化为可追问的问题。", chapter: "01 / 课前导读" },
  { id: "worksheet", title: "课堂观察记录表", format: "DOCX · 2页", detail: "记录现象、已有解释和需要补充的证据，课堂中可继续完善。", chapter: "02 / 观察与记录" },
  { id: "discussion", title: "同伴反馈提示卡", format: "PDF · 4页", detail: "用一个追问和一条证据反馈同伴的观点，让小组交流更具体。", chapter: "03 / 同伴交流" },
];
const extraMaterial: Material = { id: "review", title: "小组讨论回顾", format: "PDF · 3页", detail: "整理共同观点与仍有分歧的问题，保留下一次课堂的讨论线索。", chapter: "04 / 课堂回顾" };
function MaterialCard({ material, index, note = false }: { material: Material; index: number; note?: boolean }) {
  return <article className="g6-interaction-material"><div className="g6-interaction-material-cover"><span>{material.chapter}</span><strong>从问题<br />到证据</strong><span>课堂观察 · 学习资料</span></div><div className="g6-interaction-material-copy"><span className="g6-interaction-meta">{material.format}</span><h3>{material.title}</h3><p>{material.detail}</p>{note && <FormItem label={`记录第${index + 1}份资料笔记`}><Input clearable={false} placeholder="记录一个问题，方向键可编辑" /></FormItem>}</div></article>;
}
function LearningMaterials() {
  const [items, setItems] = useState(materials), [api, setApi] = useState<CarouselApi>();
  const [position, setPosition] = useState({ current: 0, count: 0 });
  useEffect(() => {
    if (!api) return;
    const update = () => setPosition({ current: api.selectedScrollSnap() + 1, count: api.scrollSnapList().length });
    update(); api.on("select", update); api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);
  return <div className="g6-interaction-stack carousel-example-boundary"><div className="g6-interaction-field-row"><div><span className="g6-interaction-eyebrow">课堂观察 · 第04讲</span><h3>沿着学习任务阅读</h3></div><Button variant="text" disabled={items.length === 4} onClick={() => setItems([...materials, extraMaterial])}>添加一份资料</Button></div>
    <div className="g6-interaction-carousel-frame"><Carousel aria-label="课程学习资料" tabIndex={0} opts={{ align: "start" }} setApi={setApi}>
      <CarouselContent>{items.map((material, index) => <CarouselItem key={material.id} aria-label={`${index + 1} / ${items.length}：${material.title}`} data-slide-index={index}><MaterialCard material={material} index={index} note={index === 0} /></CarouselItem>)}</CarouselContent>
      <CarouselControls><CarouselPrevious aria-label="阅读上一份资料" /><CarouselIndicators getLabel={index => `阅读第 ${index + 1} 份资料`} /><CarouselNext aria-label="阅读下一份资料" /></CarouselControls>
    </Carousel></div>
    <div className="g6-interaction-field-row"><span role="status" aria-live="polite" aria-atomic="true" className="g6-interaction-meta" data-testid="carousel-position">{position.count ? `第${position.current}份 / 共${position.count}份` : "正在准备资料"}</span><Button variant="text" disabled={items.length === 3} onClick={() => setItems(materials)}>恢复三份资料</Button></div>
  </div>;
}
function DrawerCarousel() {
  const [api, setApi] = useState<CarouselApi>(), [position, setPosition] = useState({ current: 0, count: 0 });
  useEffect(() => {
    if (!api) return;
    const update = () => setPosition({ current: api.selectedScrollSnap() + 1, count: api.scrollSnapList().length });
    update(); api.on("select", update); api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);
  return <Drawer swipeDirection="down" showSwipeHandle><DrawerTrigger render={<Button variant="secondary">在抽屉中阅读资料</Button>} />
    <DrawerContent className="g6-interaction-reading-drawer"><DrawerHeader className="g6-drawer-example-header"><div className="g6-drawer-example-copy"><DrawerTitle>课堂资料阅读</DrawerTitle><DrawerDescription>资料区横向拖动交给轮播；标题和把手区域仍可向下拖动关闭抽屉。</DrawerDescription></div><DrawerClose render={<IconButton size="36/20" icon={<CloseIcon />} aria-label="关闭资料阅读" />} /></DrawerHeader>
      <div className="g6-interaction-drawer-body carousel-example-boundary"><div className="g6-interaction-carousel-frame"><Carousel aria-label="抽屉内课程资料" data-base-ui-swipe-ignore="" tabIndex={0} setApi={setApi} opts={{ align: "start" }}>
        <CarouselContent>{materials.map((material, index) => <CarouselItem key={material.id} data-slide-index={index} aria-label={`${index + 1} / 3：${material.title}`}><article className="g6-interaction-excerpt"><span className="g6-interaction-eyebrow">{material.chapter}</span><h3>{material.title}</h3><p>{material.detail}</p></article></CarouselItem>)}</CarouselContent>
        <CarouselControls><CarouselPrevious aria-label="抽屉内上一份资料" /><CarouselIndicators getLabel={index => `阅读抽屉内第 ${index + 1} 份资料`} /><CarouselNext aria-label="抽屉内下一份资料" /></CarouselControls>
      </Carousel></div><p role="status" aria-live="polite" aria-atomic="true" className="g6-interaction-meta" data-testid="drawer-carousel-position">{position.count ? `第${position.current}份 / 共${position.count}份` : "正在准备资料"}</p></div>
    </DrawerContent>
  </Drawer>;
}
function CarouselPage() {
  return <ComponentDoc id="carousel" title="Carousel 内容轮播" description="以已确认的视觉与交互稿为参照，组合精选、多卡、纵向和播放场景；真实位置与运动统一由公共组件提供。"
    useWhen={["少量专题、课程封面或学习资料适合逐项浏览。", "需要横纵拖动、真实停靠点定位，或显式开启定时与连续展示。"]}
    avoidWhen={["大量对象必须同时比较，或重要信息必须同时可见。", "隐藏必要内容，或默认开启没有暂停入口的自动播放。"]}
    props={[{ name: "opts / plugins", type: "EmblaOptions / EmblaPlugin[]", description: "保留来源引擎入口；拖动、吸附、循环和尺寸变化均由 Embla 管理。" }, { name: "playback", type: "autoplay / continuous", description: "显式开启定时或连续播放；可设置正反方向。默认手动浏览。" }, { name: "CarouselControls", type: "layout / indicatorPlacement", description: "覆盖或独立排列；短条可以在顶部、底部、起侧或末侧。宿主为覆盖控件提供媒体安全区。" }, { name: "CarouselIndicators", type: "getLabel(index)", description: "数量、当前项和直接定位来自实际停靠点；0/1 个停靠点不显示。" }, { name: "CarouselPlaybackControl", type: "showLabel?: boolean", default: "true", description: "默认带文字的暂停/继续按钮，false使用紧凑图标；悬停临时暂停，交互接管后保持暂停。" }, { name: "setApi / useCarousel", type: "CarouselApi / Context", description: "读取实际位置及统一播放状态；setApi 订阅由宿主清理。" }, { name: "orientation / dir", type: "horizontal / vertical · ltr / rtl", default: "horizontal", description: "纵向提供明确可用高度；方向键与实际引擎方向一致。" }, { name: "Previous / Next", type: "Rain ButtonProps", description: "默认浅灰 36px 圆形箭头；边缘保持焦点并阻止导航，支持显式文字按钮。" }]}
    slots={["Carousel", "Content", "Item", "Controls", "Indicators", "Previous", "Next", "PlaybackControl", "useCarousel / CarouselApi"]} source="packages/ui/src/carousel/carousel.tsx"
    code={`<Carousel aria-label="本周精选" tabIndex={0} opts={{ align: "start" }}>
  <CarouselContent>{courses.map(course =>
    <CarouselItem key={course.title} aria-label={course.title}>{/* 专题内容 */}</CarouselItem>
  )}</CarouselContent>
  <CarouselControls layout="inline" indicatorPlacement="bottom">
    <CarouselPrevious /><CarouselIndicators /><CarouselNext />
  </CarouselControls>
</Carousel>
// 显式自动播放：playback={{ mode: "autoplay", delay: 5000, direction: "forward" }}
// 连续播放：playback={{ mode: "continuous", speed: 36, direction: "reverse" }}
// 覆盖式 Controls 的 height/style 指向实际媒体安全区；业务内容留在宿主。`}>
    <CarouselVisualExamples />
    <DocExample title="资料更新与输入边界" description="资料增删后计数来自实际 API；笔记输入保留自己的方向键，导航独立排在内容下方。"><LearningMaterials /></DocExample>
    <DocExample title="从右向左的学习资料" description="DOM 与引擎使用同一 RTL 方向；显式文字导航保留公共控件的行为与焦点。"><DirectionProvider direction="rtl"><div dir="rtl" className="g6-interaction-carousel-frame carousel-example-boundary"><Carousel aria-label="资料 RTL 示例" tabIndex={0} opts={{ align: "start" }}><CarouselContent>{materials.map((material, index) => <CarouselItem key={material.id} data-slide-index={index} aria-label={`${index + 1} / 3：${material.title}`}><article className="g6-interaction-excerpt"><span className="g6-interaction-eyebrow" lang="ar">مواد التعلم</span><h3>{material.title}</h3><p>{material.detail}</p></article></CarouselItem>)}</CarouselContent><CarouselControls><CarouselPrevious variant="secondary">上一份</CarouselPrevious><CarouselIndicators /><CarouselNext variant="secondary">下一份</CarouselNext></CarouselControls></Carousel></div></DirectionProvider></DocExample>
    <DocExample title="在课程抽屉中阅读" description="保留轮播与抽屉各自的引擎。当前 Base UI 1.8 按 data-base-ui-swipe-ignore 属性的存在忽略该区域手势，不解析轴值；真实触摸仲裁仍需设备检查。"><DrawerCarousel /></DocExample>
  </ComponentDoc>;
}

export function G6InteractionPage({ component }: { component: G6InteractionId }) {
  return component === "drawer" ? <DrawerPage /> : component === "input-otp" ? <OTPPage /> : <CarouselPage />;
}
