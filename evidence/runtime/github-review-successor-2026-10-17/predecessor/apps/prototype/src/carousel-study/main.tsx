import { StrictMode, useEffect, useRef, useState, type ReactNode, type FocusEvent } from "react";
import { createRoot } from "react-dom/client";
import { DensityProvider } from "@rain-next/foundations";
import { Button, Carousel, CarouselContent, CarouselItem, IconButton, Dialog, defineRainLocalRecipe, type CarouselApi } from "@rain-next/ui";
import { ArrowLeftIcon } from "@rain-next/ui/icons/arrow-left";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { PlayTriangleIcon } from "@rain-next/ui/icons/play-triangle";
import { PauseTriangleIcon } from "@rain-next/ui/icons/pause-triangle";
import { Artwork } from "./Artwork";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/motion.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "../styles.css";
import "./study.css";

// Page-private design experiment. All course content is fictional.
const materials = [
  { title: "看见数学的形状", label: "数学与生活", subtitle: "从一张纸、一束光开始，发现日常世界中的几何之美。", meta: "4 个章节 · 36 分钟", kind: 0 },
  { title: "让证据说话", label: "研究与表达", subtitle: "把观察变成问题，把数据变成可以交流的观点。", meta: "6 个章节 · 48 分钟", kind: 1 },
  { title: "一片叶子的宇宙", label: "自然与科学", subtitle: "从植物的生长，理解生命如何与周围的环境连接。", meta: "5 个章节 · 42 分钟", kind: 2 },
  { title: "走进空间的秩序", label: "建筑与设计", subtitle: "观察光线、尺度与结构，读懂一座建筑的语言。", meta: "4 个章节 · 32 分钟", kind: 3 },
  { title: "用图表讲清一个问题", label: "数据素养", subtitle: "寻找变化与联系，练习用清晰的图表表达发现。", meta: "3 个章节 · 25 分钟", kind: 1 },
  { title: "校园里的微型生态", label: "观察练习", subtitle: "记录身边的植物，完成一份属于自己的观察手册。", meta: "3 个章节 · 28 分钟", kind: 2 },
];
type Material = typeof materials[number];
type Scene = "featured" | "courses" | "vertical" | "continuous";
type ControlLayout = "overlay" | "separated";
type Placement = "bottom" | "top" | "start" | "end";
const scenes: { id: Scene; label: string; description: string }[] = [
  { id: "featured", label: "精选内容", description: "一项内容，一次完整的介绍。箭头连续浏览，短条直接定位。" },
  { id: "courses", label: "课程浏览", description: "保留下一张的线索，在连续浏览中找到感兴趣的课程。" },
  { id: "vertical", label: "纵向预览", description: "按上下方向翻阅内容，比较覆盖式与分离式导航。" },
  { id: "continuous", label: "连续展示", description: "内容以稳定速度移动。适合轻量展示，停下后再仔细浏览。" },
];
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => { const m = matchMedia("(prefers-reduced-motion: reduce)"); const change = () => setReduced(m.matches); m.addEventListener("change", change); return () => m.removeEventListener("change", change); }, []);
  return reduced;
}
function usePlayback(initial: boolean) {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(initial && !reduced);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [foreground, setForeground] = useState(!document.hidden);
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => { if (reduced) setEnabled(false); }, [reduced]);
  useEffect(() => {
    const update = () => setForeground(!document.hidden);
    document.addEventListener("visibilitychange", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0.15 });
    if (region.current) observer.observe(region.current);
    return () => { document.removeEventListener("visibilitychange", update); observer.disconnect(); };
  }, []);
  return { region, enabled, setEnabled, reduced, playing: enabled && !hovered && visible && foreground,
    stop: () => setEnabled(false),
    hoverProps: { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) },
    status: !enabled ? "已暂停" : hovered ? "悬停暂停" : !visible || !foreground ? "暂时暂停" : "播放中" };
}
function stopOnFocus(event: FocusEvent<HTMLDivElement>, stop: () => void) {
  const target = event.target as HTMLElement;
  if (!target.closest("[data-play-control]") || target.matches(":focus-visible")) stop();
}
function Choice({ label, value, values, onChange }: { label: string; value: string; values: [string, string][]; onChange: (v: string) => void }) {
  return <label className="study-choice"><span>{label}</span><select value={value} onChange={e => onChange(e.target.value)}>{values.map(([key, name]) => <option key={key} value={key}>{name}</option>)}</select></label>;
}
const arrowRecipe = defineRainLocalRecipe<"root", "ui-icon-button">({
  id: "carousel-study-neutral-arrow", scope: "feature", origin: "ui-icon-button",
  classes: { root: "study-arrow" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
});
const playbackRecipe = defineRainLocalRecipe<"root" | "label" | "leading-icon", "ui-button">({
  id: "carousel-study-neutral-playback", scope: "feature", origin: "ui-button",
  classes: { root: "study-play-button", label: "study-play-part", "leading-icon": "study-play-part" }, modifiedParts: ["root", "label", "leading-icon"], candidateTokens: [], promotionStatus: "not-proposed",
});
function ControlChoice({ value, onChange }: { value: ControlLayout; onChange: (value: ControlLayout) => void }) {
  return <Choice label="控件布局" value={value} values={[["overlay", "覆盖内容"], ["separated", "与内容分离"]]} onChange={value => onChange(value as ControlLayout)} />;
}
// Overlay geometry follows the actual artwork area when the page reflows.
function useMediaHeight(dependency: unknown) {
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = frame.current, media = node?.querySelector<HTMLElement>(".study-cover, .study-poster-art");
    if (!node || !media) return;
    const measure = () => node.style.setProperty("--media-height", `${media.getBoundingClientRect().height}px`);
    measure(); const observer = new ResizeObserver(measure); observer.observe(media);
    return () => observer.disconnect();
  }, [dependency]);
  return frame;
}
function Arrow({ previous = false, vertical = false, disabled = false, onClick }: { previous?: boolean; vertical?: boolean; disabled?: boolean; onClick: () => void }) {
  const Icon = vertical ? previous ? ArrowUpIcon : ArrowDownIcon : previous ? ArrowLeftIcon : ArrowRightIcon;
  return <IconButton size="36/20" highlight="none" localRecipe={arrowRecipe} aria-label={previous ? "上一项" : "下一项"} aria-disabled={disabled} data-carousel-navigation={previous ? "previous" : "next"} icon={<Icon />} onClick={onClick} />;
}
function Preview({ item, children }: { item: Material; children: ReactNode }) {
  return <Dialog.Root><Dialog.Trigger render={<Button variant="primary" size="medium">{children}</Button>}>{children}</Dialog.Trigger><Dialog.Content width={616} theme="light"><Dialog.Header><Dialog.Title>{item.title}</Dialog.Title><Dialog.Description>{item.label} · 内容预览</Dialog.Description></Dialog.Header><Dialog.Body><div className="study-dialog-art"><Artwork kind={item.kind} /></div><p>{item.subtitle}</p><p className="study-muted">这是用于评议轮播体验的演示课程，尚未连接真实学习内容。</p></Dialog.Body><Dialog.Footer><Dialog.Close render={<Button variant="secondary">返回浏览</Button>}>返回浏览</Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Root>;
}
function Poster({ item, compact = false }: { item: Material; compact?: boolean }) {
  return <article className={`study-poster ${compact ? "is-compact" : ""}`} data-kind={item.kind}>
    <div className="study-poster-copy"><p className="study-kicker">{item.label}</p><h3>{item.title}</h3><p className="study-summary">{item.subtitle}</p><div className="study-poster-action"><Preview item={item}>查看专题</Preview><span>{item.meta}</span></div></div>
    <div className="study-poster-art"><Artwork kind={item.kind} /></div>
  </article>;
}
function CourseCard({ item, actionable = true }: { item: Material; actionable?: boolean }) {
  return <article className="study-course"><div className="study-cover"><Artwork kind={item.kind} /><span>{item.label}</span></div><div className="study-course-copy"><span className="study-course-category">{item.label}</span><h3>{item.title}</h3><p>{item.meta}</p>{actionable && <Preview item={item}>查看课程</Preview>}</div></article>;
}

function SnapStudy({ scene }: { scene: Exclude<Scene, "continuous"> }) {
  const vertical = scene === "vertical", multi = scene === "courses";
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0), [count, setCount] = useState(1);
  const [canPrev, setCanPrev] = useState(false), [canNext, setCanNext] = useState(true);
  const [controlLayout, setControlLayout] = useState<ControlLayout>("overlay");
  const stage = useMediaHeight(scene);
  const [placement, setPlacement] = useState<Placement>(vertical ? "end" : "bottom");
  const [automatic, setAutomatic] = useState(false), [interval, setInterval] = useState(5), [reverse, setReverse] = useState(false);
  const playback = usePlayback(false);
  const elapsed = useRef(0), progress = useRef<HTMLDivElement>(null);
  const items = multi ? materials : materials.slice(0, 4);
  useEffect(() => {
    if (!api) return;
    const update = () => { setIndex(api.selectedScrollSnap()); setCount(api.scrollSnapList().length); setCanPrev(api.canScrollPrev()); setCanNext(api.canScrollNext()); elapsed.current = 0; progress.current?.style.setProperty("--time", "0");
      // Offscreen slides should not create invisible Tab stops.
      const visible = new Set(api.slidesInView()); api.slideNodes().forEach((node, i) => { node.inert = !visible.has(i); });
    };
    const syncVisibility = () => { const visible = new Set(api.slidesInView()); api.slideNodes().forEach((node, i) => { node.inert = !visible.has(i); }); };
    const stop = () => playback.setEnabled(false);
    update(); api.on("select", update).on("reInit", update).on("settle", syncVisibility).on("slidesInView", syncVisibility).on("pointerDown", stop).on("slideFocusStart", stop);
    return () => { api.off("select", update).off("reInit", update).off("settle", syncVisibility).off("slidesInView", syncVisibility).off("pointerDown", stop).off("slideFocusStart", stop); };
  }, [api]);
  useEffect(() => {
    if (!api || !automatic || !playback.playing || count < 2) return;
    let frame = 0, previous = performance.now();
    const tick = (now: number) => {
      elapsed.current += Math.min(now - previous, 100); previous = now;
      progress.current?.style.setProperty("--time", String(Math.min(elapsed.current / (interval * 1000), 1)));
      if (elapsed.current >= interval * 1000) { elapsed.current = 0; reverse ? api.scrollPrev() : api.scrollNext(); }
      frame = requestAnimationFrame(tick);
    }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
  }, [api, automatic, playback.playing, interval, reverse, count]);
  const manual = (action: () => void) => { playback.stop(); elapsed.current = 0; progress.current?.style.setProperty("--time", "0"); action(); };
  const indicators = <div className="study-indicators" role="group" aria-label="选择轮播位置">{Array.from({ length: count }, (_, n) => <button key={n} type="button" aria-label={`转到第 ${n + 1} ${multi ? "组" : "项"}`} aria-current={n === index ? "true" : undefined} onClick={() => manual(() => api?.scrollTo(n))}><span /></button>)}</div>;
  const arrows = <div className={`study-arrows ${controlLayout === "overlay" ? "study-overlay-arrows" : ""}`}><Arrow previous vertical={vertical} disabled={!canPrev} onClick={() => manual(() => api?.scrollPrev())} /><Arrow vertical={vertical} disabled={!canNext} onClick={() => manual(() => api?.scrollNext())} /></div>;
  return <>
    <div className="study-options" aria-label="轮播样式设置">
      <ControlChoice value={controlLayout} onChange={setControlLayout} />
      <Choice label="播放方式" value={automatic ? "auto" : "manual"} values={[["manual", "手动浏览"], ["auto", "定时翻页"]]} onChange={v => { const auto = v === "auto"; setAutomatic(auto); elapsed.current = 0; playback.setEnabled(auto && !playback.reduced); }} />
      <Choice label="指示器" value={placement} values={[["top", "顶部"], ["bottom", "底部"], ["start", "左侧"], ["end", "右侧"]]} onChange={v => setPlacement(v as Placement)} />
      {automatic && <><Choice label="停留" value={String(interval)} values={[["3", "3 秒"], ["5", "5 秒"], ["8", "8 秒"]]} onChange={v => { setInterval(Number(v)); elapsed.current = 0; }} /><Choice label="顺序" value={reverse ? "reverse" : "forward"} values={[["forward", "正向"], ["reverse", "反向"]]} onChange={v => { setReverse(v === "reverse"); elapsed.current = 0; }} /></>}
    </div>
    <div className="study-demo" ref={node => { playback.region.current = node; progress.current = node; }} {...playback.hoverProps} onFocusCapture={e => stopOnFocus(e, playback.stop)}>
      <div className="study-demo-heading"><div><p className="study-kicker">{multi ? "为你发现" : vertical ? "阅读与探索" : "本周精选"}</p><h2>{multi ? "把好奇心，变成新的发现" : vertical ? "换个方向，看见更多" : "每一次探索，都有新发现"}</h2></div>{controlLayout === "separated" && arrows}</div>
      <Carousel className={`study-carousel is-${scene} controls-${controlLayout}`} orientation={vertical ? "vertical" : "horizontal"} setApi={setApi}
        opts={{ align: "start", loop: automatic, slidesToScroll: multi ? "auto" : 1, duration: 30, inViewThreshold: 0.6 }} aria-label={scenes.find(s => s.id === scene)?.label} tabIndex={0}
        onFocusCapture={playback.stop} onKeyDown={e => { if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) playback.stop(); }}>
        <div ref={stage} className={`study-stage placement-${placement} ${automatic ? "is-timed" : ""}`}>
          {indicators}
          {controlLayout === "overlay" && arrows}
          <div className="study-track-wrap"><CarouselContent>{items.map((item, n) => <CarouselItem key={item.title} aria-label={`${n + 1} / ${items.length}`} className={multi ? "study-course-slide" : "study-poster-slide"}>{multi ? <CourseCard item={item} /> : <Poster item={item} compact={vertical} />}</CarouselItem>)}</CarouselContent></div>
        </div>
      </Carousel>
      <div className="study-footer"><span aria-live={playback.playing ? "off" : "polite"}>{multi ? `浏览位置 ${index + 1} / ${count} · 共 ${items.length} 门课程` : `${String(index + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`}</span>
        {automatic ? <div className="study-playback"><span className="study-play-state">{playback.status}</span><Button data-play-control localRecipe={playbackRecipe} variant="secondary" leadingIcon={playback.enabled ? <PauseTriangleIcon size={16} /> : <PlayTriangleIcon size={16} />} onClick={() => { elapsed.current = 0; playback.setEnabled(!playback.enabled); }}>{playback.enabled ? "暂停播放" : "继续播放"}</Button></div> : <span>支持拖动{vertical ? "与上下方向键" : "与左右方向键"}</span>}
      </div>
    </div>
    <div className="study-notes"><p><strong>{multi ? "内容优先" : vertical ? "方向与位置独立" : "两种浏览入口"}</strong>{multi ? "窄屏保留一张完整课程与下一张线索；覆盖控件留在封面区域。" : vertical ? "上下翻页保持内容顺序；四个指示器位置可独立切换。" : "箭头负责相邻切换，短条负责直接定位；可对比覆盖内容和独立排列两种形式。"}</p><p><strong>播放由你控制</strong>定时模式悬停临时暂停；点击、拖动或键盘进入后持续暂停，点击继续才恢复。</p></div>
  </>;
}

function ContinuousStudy() {
  const [controlLayout, setControlLayout] = useState<ControlLayout>("overlay");
  const [vertical, setVertical] = useState(false), [reverse, setReverse] = useState(false), [speed, setSpeed] = useState(36), [all, setAll] = useState(false);
  const playback = usePlayback(true);
  const frame = useMediaHeight(all);
  const viewport = useRef<HTMLDivElement>(null), original = useRef<HTMLDivElement>(null), first = useRef<HTMLDivElement>(null);
  const period = useRef(0), position = useRef(0), drag = useRef<{ coordinate: number; start: number } | null>(null);
  useEffect(() => {
    const node = viewport.current, group = original.current, lead = first.current;
    if (!node || !group || !lead || all) return;
    let previousExtent = 0;
    const measure = () => {
      const extent = vertical ? group.offsetTop - lead.offsetTop : group.offsetLeft - lead.offsetLeft;
      const relativePosition = previousExtent ? position.current / previousExtent : 1;
      period.current = extent; position.current = relativePosition * extent; previousExtent = extent;
      if (vertical) node.scrollTop = position.current; else node.scrollLeft = position.current;
    };
    measure(); const observer = new ResizeObserver(measure); observer.observe(group); observer.observe(node); return () => observer.disconnect();
  }, [vertical, all]);
  useEffect(() => {
    const node = viewport.current;
    if (!node || all || !playback.playing) return;
    let frame = 0, last = performance.now(); position.current = vertical ? node.scrollTop : node.scrollLeft;
    const tick = (now: number) => {
      const extent = period.current;
      if (extent > (vertical ? node.clientHeight : node.clientWidth)) {
        position.current += (reverse ? -1 : 1) * speed * Math.min(now - last, 80) / 1000;
        if (position.current >= extent * 2) position.current -= extent;
        if (position.current < extent) position.current += extent;
        if (vertical) node.scrollTop = position.current; else node.scrollLeft = position.current;
      }
      last = now; frame = requestAnimationFrame(tick);
    }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
  }, [vertical, reverse, speed, all, playback.playing]);
  const navigate = (delta: number) => {
    playback.stop(); const node = viewport.current, group = original.current; if (!node || !group) return;
    const card = group.children[0] as HTMLElement | undefined; if (!card) return;
    const step = (vertical ? card.offsetHeight : card.offsetWidth) + 20;
    const current = vertical ? node.scrollTop : node.scrollLeft;
    let next = Math.round((current - period.current) / step) * step + period.current + delta * step;
    if (next < period.current) next += period.current; if (next >= period.current * 2) next -= period.current;
    // Immediate positioning keeps the visual clones from exposing a long wrap transition.
    node.scrollTo(vertical ? { top: next, behavior: "instant" } : { left: next, behavior: "instant" });
    position.current = vertical ? node.scrollTop : node.scrollLeft;
  };
  const arrows = <div className={`study-arrows ${controlLayout === "overlay" ? "study-overlay-arrows" : ""}`}><Arrow previous vertical={vertical} onClick={() => navigate(-1)} /><Arrow vertical={vertical} onClick={() => navigate(1)} /></div>;
  return <>
    <div className="study-options"><ControlChoice value={controlLayout} onChange={setControlLayout} /><Choice label="运动方向" value={vertical ? "vertical" : "horizontal"} values={[["horizontal", "横向"], ["vertical", "纵向"]]} onChange={v => setVertical(v === "vertical")} /><Choice label="顺序" value={reverse ? "reverse" : "forward"} values={[["forward", "正向"], ["reverse", "反向"]]} onChange={v => setReverse(v === "reverse")} /><Choice label="速度" value={String(speed)} values={[["24", "舒缓"], ["36", "标准"], ["60", "轻快"]]} onChange={v => setSpeed(Number(v))} /></div>
    <div className="study-demo" ref={playback.region} {...playback.hoverProps} onFocusCapture={e => stopOnFocus(e, playback.stop)}><div className="study-demo-heading"><div><p className="study-kicker">灵感持续发生</p><h2>探索的脚步，不止于课堂</h2></div><Button variant="text" tone="brand" onClick={() => { playback.stop(); setAll(!all); }}>{all ? "返回轮播" : "展开全部"}</Button></div>
      {all ? <div className="study-all">{materials.map(item => <CourseCard key={item.title} item={item} />)}</div> : <div ref={frame} className={`study-continuous-frame controls-${controlLayout} ${vertical ? "is-vertical" : ""}`}><div className={`study-continuous ${vertical ? "is-vertical" : ""}`} ref={viewport} role="region" aria-label="连续课程展示" tabIndex={0}
        onFocus={playback.stop} onWheel={playback.stop}
        onKeyDown={e => { const prev = vertical ? "ArrowUp" : "ArrowLeft", next = vertical ? "ArrowDown" : "ArrowRight"; if (e.key === prev || e.key === next) { e.preventDefault(); navigate(e.key === prev ? -1 : 1); } }}
        onPointerDown={e => { playback.stop(); if (e.pointerType === "mouse" && e.button !== 0) return; drag.current = { coordinate: vertical ? e.clientY : e.clientX, start: vertical ? e.currentTarget.scrollTop : e.currentTarget.scrollLeft }; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if (!drag.current) return; const next = drag.current.start - ((vertical ? e.clientY : e.clientX) - drag.current.coordinate); if (vertical) e.currentTarget.scrollTop = next; else e.currentTarget.scrollLeft = next; position.current = vertical ? e.currentTarget.scrollTop : e.currentTarget.scrollLeft; }}
        onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
        <div className="study-belt">{[0, 1, 2].map(copy => <div className="study-belt-group" key={copy} ref={copy === 0 ? first : copy === 1 ? original : undefined} aria-hidden={copy !== 1 ? true : undefined} inert={copy !== 1 ? true : undefined}>{materials.map(item => <CourseCard key={item.title} item={item} actionable={false} />)}</div>)}</div>
      </div>{controlLayout === "overlay" && arrows}</div>}
      {!all && <div className="study-footer">{controlLayout === "separated" ? arrows : <span>拖动可停留浏览</span>}<div className="study-playback"><span className="study-play-state">{playback.status}</span><Button data-play-control localRecipe={playbackRecipe} variant="secondary" leadingIcon={playback.enabled ? <PauseTriangleIcon size={16} /> : <PlayTriangleIcon size={16} />} onClick={() => playback.setEnabled(!playback.enabled)}>{playback.enabled ? "暂停播放" : "继续播放"}</Button></div></div>}
    </div><div className="study-notes"><p><strong>连续，不是快速翻页</strong>没有逐项停留和倒计时。普通暂停保留位置，点箭头时再定位到完整内容。</p><p><strong>也可以安静地浏览</strong>悬停临时暂停；拖动或键盘进入后持续暂停。展开全部可一次查看所有课程。</p></div>
  </>;
}
function App() {
  const fromHash = () => scenes.find(s => s.id === location.hash.slice(1))?.id ?? "featured";
  const [scene, setScene] = useState<Scene>(fromHash);
  useEffect(() => { const change = () => setScene(fromHash()); addEventListener("hashchange", change); return () => removeEventListener("hashchange", change); }, []);
  return <DensityProvider density="default"><main className="study-page" data-rain-theme="light" data-rain-id="local-experiment-carousel-study"><header className="study-header"><div><p className="study-eyebrow">RAIN NEXT / G6 CAROUSEL</p><h1>让内容，值得停留</h1><p>视觉与动效对照稿 · 先体验，再确定组件方案</p></div><a className="study-baseline" href="http://127.0.0.1:5196/#carousel" target="_blank" rel="noreferrer">查看当前版本 <ArrowRightIcon size={16} /></a></header>
    <nav className="study-tabs" aria-label="对照场景">{scenes.map(s => <a key={s.id} href={`#${s.id}`} aria-current={scene === s.id ? "page" : undefined}>{s.label}</a>)}</nav>
    <p className="study-intro">{scenes.find(s => s.id === scene)?.description}</p>
    {scene === "continuous" ? <ContinuousStudy key={scene} /> : <SnapStudy key={scene} scene={scene} />}
    <footer className="study-page-footer">本地实验 · 演示内容 · 公共组件尚未修改<span>2026.10.14 / v0.4</span></footer>
  </main></DensityProvider>;
}
const root = createRoot(document.getElementById("root")!);
root.render(<StrictMode><App /></StrictMode>);
if (import.meta.hot) import.meta.hot.dispose(() => root.unmount());
