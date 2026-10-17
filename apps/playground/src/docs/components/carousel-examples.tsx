import { useCallback, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  Button, Carousel, CarouselContent, CarouselControls, CarouselIndicators, CarouselItem,
  CarouselNext, CarouselPlaybackControl, CarouselPrevious, Dialog, NativeSelect, useCarousel,
} from "@rain-next/ui";
import { Artwork } from "./carousel-artwork";
import { DocExample } from "./component-doc";
import "./carousel-examples.css";

// Page-local media/content fixtures from the user-accepted carousel-study v0.4.
// The public Carousel owns all position, drag, snap and playback state.
const courses = [
  { title: "看见数学的形状", label: "数学与生活", subtitle: "从一张纸、一束光开始，发现日常世界中的几何之美。", meta: "4 个章节 · 36 分钟", kind: 0 },
  { title: "让证据说话", label: "研究与表达", subtitle: "把观察变成问题，把数据变成可以交流的观点。", meta: "6 个章节 · 48 分钟", kind: 1 },
  { title: "一片叶子的宇宙", label: "自然与科学", subtitle: "从植物的生长，理解生命如何与周围的环境连接。", meta: "5 个章节 · 42 分钟", kind: 2 },
  { title: "走进空间的秩序", label: "建筑与设计", subtitle: "观察光线、尺度与结构，读懂一座建筑的语言。", meta: "4 个章节 · 32 分钟", kind: 3 },
  { title: "用图表讲清一个问题", label: "数据素养", subtitle: "寻找变化与联系，练习用清晰的图表表达发现。", meta: "3 个章节 · 25 分钟", kind: 1 },
  { title: "校园里的微型生态", label: "观察练习", subtitle: "记录身边的植物，完成一份属于自己的观察手册。", meta: "3 个章节 · 28 分钟", kind: 2 },
] as const;
type Course = typeof courses[number];
type Placement = "top" | "bottom" | "start" | "end";
type ControlLayout = "inline" | "overlay";
type PlaybackDirection = "forward" | "reverse";
type Scene = "featured" | "courses" | "vertical" | "timed" | "continuous";

function Choice({ label, value, options, onChange }: { label: string; value: string; options: readonly (readonly [string, string])[]; onChange: (value: string) => void }) {
  return <label className="carousel-example__choice"><span>{label}</span><NativeSelect size={36} value={value} onValueChange={onChange}>
    {options.map(([key, name]) => <option key={key} value={key}>{name}</option>)}
  </NativeSelect></label>;
}

function Preview({ item, children }: { item: Course; children: ReactNode }) {
  return <Dialog.Root><Dialog.Trigger render={<Button variant="primary" size="medium">{children}</Button>} />
    <Dialog.Content width={616}><Dialog.Header><Dialog.Title>{item.title}</Dialog.Title><Dialog.Description>{item.label} · 内容预览</Dialog.Description></Dialog.Header>
      <Dialog.Body><div className="carousel-example__dialog-art"><Artwork kind={item.kind} /></div><p>{item.subtitle}</p><p className="carousel-example__muted">这是本地演示课程，尚未连接真实学习内容。</p></Dialog.Body>
      <Dialog.Footer><Dialog.Close render={<Button variant="secondary">返回浏览</Button>} /></Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>;
}

function Poster({ item }: { item: Course }) {
  return <article className="carousel-example__poster" data-kind={item.kind}>
    <div className="carousel-example__poster-copy"><p className="carousel-example__kicker">{item.label}</p><h3>{item.title}</h3><p className="carousel-example__summary">{item.subtitle}</p>
      <div className="carousel-example__poster-action"><Preview item={item}>查看专题</Preview><span>{item.meta}</span></div>
    </div><div className="carousel-example__poster-art"><Artwork kind={item.kind} /></div>
  </article>;
}

function CourseCard({ item, actionable = true, sideIndicators = false }: { item: Course; actionable?: boolean; sideIndicators?: boolean }) {
  const { scrollSnaps } = useCarousel();
  // Capsule: 24px per snap + active extension/padding + media edge clearance.
  const coverStyle = sideIndicators ? { minHeight: scrollSnaps.length * 24 + 60 } : undefined;
  return <article className="carousel-example__course"><div className="carousel-example__cover" style={coverStyle}><Artwork kind={item.kind} /><span>{item.label}</span></div>
    <div className="carousel-example__course-copy"><span className="carousel-example__kicker">{item.label}</span><h3>{item.title}</h3><p>{item.meta}</p>{actionable && <Preview item={item}>查看课程</Preview>}</div>
  </article>;
}

function Position({ multi = false, continuous = false }: { multi?: boolean; continuous?: boolean }) {
  const { selectedIndex, scrollSnaps, slideCount, playback } = useCarousel();
  return <span aria-live={playback.isPlaying ? "off" : "polite"} aria-atomic="true" className="carousel-example__muted">
    {continuous ? `共 ${slideCount} 门课程 · 支持拖动与方向键` : multi ? `浏览位置 ${selectedIndex + 1} / ${scrollSnaps.length} · 共 ${slideCount} 门课程` : `${String(selectedIndex + 1).padStart(2, "0")} / ${String(scrollSnaps.length).padStart(2, "0")}`}
  </span>;
}

function PlaybackStatus() {
  const { playback } = useCarousel();
  const labels = { manual: "手动浏览", playing: "播放中", paused: "已暂停", "hover-paused": "悬停暂停", "hidden-paused": "暂时暂停", unavailable: "暂不可播放" };
  return <div className="carousel-example__playback"><span role="status" className="carousel-example__muted">{labels[playback.status]}</span><CarouselPlaybackControl /></div>;
}

// This measures only the host's content geometry, never carousel motion.
// On narrow screens overlay controls stay in the cover, above text and CTA.
function useControlHeight(scene: Scene, vertical: boolean) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const frame = useCallback((value: HTMLDivElement | null) => setNode(value), []);
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    const poster = node?.querySelector<HTMLElement>(".carousel-example__poster");
    const media = node?.querySelector<HTMLElement>(".carousel-example__cover, .carousel-example__poster-art");
    if (!node || !media) return;
    const measure = () => {
      setHeight((vertical ? node : media).getBoundingClientRect().height);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node); observer.observe(media); if (poster) observer.observe(poster);
    return () => observer.disconnect();
  }, [node, scene, vertical]);
  return { frame, height };
}

function VisualCarousel({ scene }: { scene: Scene }) {
  const multi = scene === "courses", continuous = scene === "continuous", timed = scene === "timed";
  const [layout, setLayout] = useState<ControlLayout>("overlay");
  const [placement, setPlacement] = useState<Placement>(scene === "vertical" ? "end" : "bottom");
  const [direction, setDirection] = useState<PlaybackDirection>("forward");
  const [delay, setDelay] = useState(5000), [speed, setSpeed] = useState(36);
  const [continuousVertical, setContinuousVertical] = useState(false);
  const vertical = scene === "vertical" || continuous && continuousVertical;
  const { frame, height } = useControlHeight(scene, vertical);
  const items = multi || continuous ? courses : courses.slice(0, 4);
  const playback = useMemo(() => timed ? { mode: "autoplay" as const, delay, direction } : continuous ? { mode: "continuous" as const, speed, direction } : undefined, [timed, continuous, delay, direction, speed]);
  const sceneLabels: Record<Scene, string> = { featured: "精选内容", courses: "课程浏览", vertical: "纵向专题预览", timed: "定时精选内容", continuous: "连续课程展示" };
  const headings: Record<Scene, readonly [string, string]> = {
    featured: ["本周精选", "每一次探索，都有新发现"], timed: ["本周精选", "每一次探索，都有新发现"],
    courses: ["为你发现", "把好奇心，变成新的发现"], vertical: ["阅读与探索", "换个方向，看见更多"],
    continuous: ["灵感持续发生", "探索的脚步，不止于课堂"],
  };
  const navigationStyle: CSSProperties | undefined = continuous && vertical && layout === "overlay" ? { insetInlineStart: "22.5%", insetInlineEnd: "auto", transform: "translateX(-50%)" } : undefined;
  const separatedStyle: CSSProperties = { position: "static", inset: "auto", margin: 0, transform: "none" };
  const separatedArrows = <div className="carousel-example__arrows"><CarouselPrevious style={separatedStyle} /><CarouselNext style={separatedStyle} /></div>;
  const controls = <CarouselControls layout={layout} indicatorPlacement={placement} className="carousel-example__controls" style={layout === "overlay" && height ? { height } : undefined}>
    <CarouselPrevious style={navigationStyle ? { ...navigationStyle, insetBlockStart: "12px" } : undefined} />{!continuous && <CarouselIndicators getLabel={index => `转到第 ${index + 1} ${multi ? "组" : "项"}`} />}<CarouselNext style={navigationStyle ? { ...navigationStyle, insetBlockEnd: "12px" } : undefined} />
  </CarouselControls>;
  return <div className="carousel-example" data-asset-identity="local-experiment" data-content-source="carousel-study-v0.4" data-scene={scene} data-layout={layout} data-placement={placement} data-vertical={vertical || undefined}>
    <div className="carousel-example__options" aria-label={`${sceneLabels[scene]}设置`}>
      <Choice label="控件布局" value={layout} options={[["overlay", "覆盖内容"], ["inline", "与内容分离"]]} onChange={value => setLayout(value as ControlLayout)} />
      {!continuous && <Choice label="指示器" value={placement} options={[["top", "顶部"], ["bottom", "底部"], ["start", "左侧"], ["end", "右侧"]]} onChange={value => setPlacement(value as Placement)} />}
      {timed && <Choice label="停留" value={String(delay)} options={[["3000", "3 秒"], ["5000", "5 秒"], ["8000", "8 秒"]]} onChange={value => setDelay(Number(value))} />}
      {continuous && <><Choice label="方向" value={vertical ? "vertical" : "horizontal"} options={[["horizontal", "横向"], ["vertical", "纵向"]]} onChange={value => setContinuousVertical(value === "vertical")} />
        <Choice label="速度" value={String(speed)} options={[["24", "舒缓"], ["36", "适中"], ["60", "轻快"]]} onChange={value => setSpeed(Number(value))} /></>}
      {(timed || continuous) && <Choice label="顺序" value={direction} options={[["forward", "正向"], ["reverse", "反向"]]} onChange={value => setDirection(value as PlaybackDirection)} />}
    </div>
    <Carousel key={vertical ? "vertical" : "horizontal"} aria-label={sceneLabels[scene]} tabIndex={0} className="carousel-example__carousel" orientation={vertical ? "vertical" : "horizontal"}
      opts={{ align: "start", loop: timed || continuous, slidesToScroll: multi ? "auto" : 1, duration: 30 }} playback={playback}>
      <div className="carousel-example__heading"><div><p className="carousel-example__kicker">{headings[scene][0]}</p><h3>{headings[scene][1]}</h3></div>{layout === "inline" && !continuous && separatedArrows}</div>
      <div className="carousel-example__stage" ref={frame} style={{ "--carousel-example-media-height": height ? `${height}px` : undefined } as CSSProperties}>
        {layout === "inline" && !continuous && <CarouselControls layout="inline" indicatorPlacement={placement} className="carousel-example__separated-indicators" style={{ display: "block", gridArea: "indicators", margin: 0 }}><CarouselIndicators getLabel={index => `转到第 ${index + 1} ${multi ? "组" : "项"}`} /></CarouselControls>}
        <CarouselContent className="carousel-example__content">{items.map((item, index) => <CarouselItem key={item.title} data-slide-index={index} className={multi || continuous ? "carousel-example__course-slide" : "carousel-example__poster-slide"} aria-label={`${index + 1} / ${items.length}：${item.title}`}>
          {multi || continuous ? <CourseCard item={item} actionable={!continuous} sideIndicators={multi && layout === "overlay" && (placement === "start" || placement === "end")} /> : <Poster item={item} />}
        </CarouselItem>)}</CarouselContent>
        {layout === "overlay" && controls}
      </div>
      <div className="carousel-example__footer">{layout === "inline" && continuous ? separatedArrows : <Position multi={multi} continuous={continuous} />}{timed || continuous ? <PlaybackStatus /> : <span className="carousel-example__muted">支持拖动与{vertical ? "上下" : "左右"}方向键</span>}</div>
    </Carousel>
  </div>;
}

export function CarouselVisualExamples() {
  return <>
    <DocExample title="精选内容" description="沿用已确认稿的专题插画、信息层级和浅灰控件；箭头相邻浏览，短条直接定位。覆盖控件为文字与查看入口保留空间。"><VisualCarousel scene="featured" /></DocExample>
    <DocExample title="多卡课程浏览" description="宽屏同时浏览多门课程，窄屏保留完整课程与下一张线索。短条对应真实停靠组，覆盖控件留在封面。"><VisualCarousel scene="courses" /></DocExample>
    <DocExample title="纵向预览" description="上下拖动与方向键沿课程顺序切换，指示器位置可独立选择；内容区提供明确高度。"><VisualCarousel scene="vertical" /></DocExample>
    <DocExample title="定时翻页 · 正向与反向" description="显式启用定时播放。悬停临时暂停；点击导航、拖动或键盘进入后持续暂停，点击继续才恢复。"><VisualCarousel scene="timed" /></DocExample>
    <DocExample title="连续展示 · 正向与反向" description="以稳定速度展示课程；可以切换横纵方向与播放顺序。暂停后仍保留真实拖动与导航。"><VisualCarousel scene="continuous" /></DocExample>
  </>;
}
