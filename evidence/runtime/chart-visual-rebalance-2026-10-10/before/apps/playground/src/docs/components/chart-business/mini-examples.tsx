import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Area, AreaChart, Bar, BarChart, DataBar, Line, LineChart, PieChart, PieSlice, Ring, RingChart, curveMonotoneX } from "@rain-next/ui/charts";
import { compositionState, getProgressReading, MINI_PART_LABELS, type MiniRow } from "./mini-data";
import { MINI_LAYOUT, type MiniSize } from "./mini-layout";

const immediate = { type: "tween" as const, duration: 0 };
const compactMotion = { type: "tween" as const, duration: .65, ease: [.85, 0, .15, 1] as [number,number,number,number] };
const stateText: Record<string,string> = { missing: "缺测", zero: "零总量", invalid: "无效数据", empty: "暂无数据", overflow: "超出范围", inapplicable: "不适用" };
type MiniProps = { size?: MiniSize; reduced?: boolean };

function MiniSlot({ kind, size, state, width, height, children, reading, unavailable = false, style }: {
  kind: string; size: MiniSize; state: string; width: number; height: number; children?: ReactNode; reading?: ReactNode; unavailable?: boolean; style?: CSSProperties;
}) {
  return <div className="rain-business-mini" data-mini-kind={kind} data-size={size} data-mini-state={state}
    style={{ "--mini-reading-gap": `${MINI_LAYOUT[size].readingGap}px`, ...style } as CSSProperties}>
    <div className="rain-business-mini-slot" style={{ width, height }}>{children}</div>
    {unavailable && <span className="rain-business-mini-state">{stateText[state] ?? state}</span>}
    {reading}
  </div>;
}

export function MiniColumns({ values, maxValue, reduced = false, size = "compact" }: { values: (number|null)[]; maxValue: number } & MiniProps) {
  const layout = MINI_LAYOUT[size].plot;
  let state: string = compositionState(values);
  if (!Number.isFinite(maxValue) || maxValue < 0 || (maxValue === 0 && values.some(value => value !== null && value > 0))) state = "invalid";
  else if (state !== "invalid" && values.some(value => value !== null && value > maxValue)) state = "overflow";
  const drawable = state === "normal" || state === "zero";
  const data = values.map((value,index) => ({ id: `bucket-${index}`, value }));
  return <MiniSlot kind="columns" size={size} state={state} width={layout.width} height={layout.height} unavailable={!drawable}>
    {drawable && <div className="rain-business-mini-plot" aria-hidden="true">
      <BarChart data={data} xDataKey="id" valueDomain={[0,maxValue || 1]} aspectRatio="" margin={{ top: layout.padding, bottom: layout.padding, left: 0, right: 0 }} barGap={.35}
        animationDuration={reduced ? 0 : 650} enterTransition={reduced ? immediate : compactMotion}>
        <Bar dataKey="value" lineCap={2} animate={!reduced} fill="var(--chart-1)" minBarHeight={0} />
      </BarChart>
    </div>}
  </MiniSlot>;
}

export function MiniSegments({ values, reduced = false, size = "compact" }: { values: (number|null)[] } & MiniProps) {
  const state = compositionState(values);
  const layout = MINI_LAYOUT[size].bar;
  const total = state === "normal" ? values.reduce<number>((sum,value) => sum + (value ?? 0),0) : 0;
  const datum = Object.fromEntries(values.map((value,index) => [`part-${index}`, value]));
  return <MiniSlot kind="segments" size={size} state={state} width={layout.width} height={layout.canvasHeight} unavailable={state !== "normal"}>
    {state === "normal" && <div className="rain-business-mini-plot rain-business-mini-segments" aria-hidden="true" style={{ "--mini-bar-thickness": `${layout.thickness}px` } as CSSProperties}>
      <BarChart data={[{ id: "composition", ...datum }]} xDataKey="id" orientation="horizontal" stacked valueDomain={[0,total]} aspectRatio="" barGap={0}
        margin={{ top: 2, bottom: 2, left: 0, right: 0 }} animationDuration={reduced ? 0 : 650} enterTransition={reduced ? immediate : compactMotion}>
        {values.map((_,index) => <Bar key={index} dataKey={`part-${index}`} lineCap={0} stackGap={0} animate={!reduced} fill={`var(--chart-${index % 5 + 1})`} />)}
      </BarChart>
    </div>}
  </MiniSlot>;
}

export function MiniPie({ values, donut = false, reduced = false, size = "compact" }: { values: (number|null)[]; donut?: boolean } & MiniProps) {
  const state = compositionState(values);
  const layout = MINI_LAYOUT[size].pie;
  const data = values.map((value,index) => ({ label: MINI_PART_LABELS[index] ?? `类别${index+1}`, value: value!, color: `var(--chart-${index % 5 + 1})` }));
  return <MiniSlot kind={donut ? "donut" : "pie"} size={size} state={state} width={layout.width} height={layout.height} unavailable={state !== "normal"}>
    {state === "normal" && <div className="rain-business-mini-plot" aria-hidden="true">
      <PieChart data={data} size={layout.width} hoverOffset={layout.hoverOffset} innerRadius={donut ? layout.innerRadius : 0} padAngle={.025} cornerRadius={1}
        geometryScrubbing={reduced} enterTransition={reduced ? immediate : compactMotion} enterStaggerScale={reduced ? 0 : .25}>
        {data.map((item,index) => <PieSlice key={item.label} index={index} showGlow={false} hoverEffect="grow" hoverOffset={layout.hoverOffset} animate={!reduced} />)}
      </PieChart>
    </div>}
  </MiniSlot>;
}

export function MiniProgress({ value, maxValue, reduced = false, arc = true, size = "compact" }: { value: number|null; maxValue: number; arc?: boolean } & MiniProps) {
  const layout = MINI_LAYOUT[size][arc ? "arc" : "ring"];
  const reading = getProgressReading(value,maxValue);
  const readingRef = useRef<HTMLSpanElement>(null);
  const [outside, setOutside] = useState(false);
  const drawable = reading.fraction !== null;
  const canvasSize = layout.width;
  const centerReading = size === "comfortable" && drawable;
  useLayoutEffect(() => {
    const node = readingRef.current;
    if (!node || !centerReading) return;
    const context = document.createElement("canvas").getContext("2d");
    const measure = () => {
      if (!context) { setOutside(true); return; }
      const group = node.getBoundingClientRect();
      const fits = [...node.children].every(child => {
        const line = child as HTMLElement;
        const font = getComputedStyle(line);
        context.font = `${font.fontWeight} ${font.fontSize} ${font.fontFamily}`;
        const ink = context.measureText(line.textContent ?? "");
        const probe = document.createElement("span");
        probe.setAttribute("aria-hidden","true");
        probe.setAttribute("data-mini-baseline","");
        probe.style.cssText = "display:inline-block;width:0;height:0;padding:0;margin:0;vertical-align:baseline";
        line.append(probe);
        const baseline = probe.getBoundingClientRect().top - group.top;
        probe.remove();
        // Test the same hypothetical centered position even while the reading is outside.
        const x = line.getBoundingClientRect().left - group.left - group.width / 2;
        const y = baseline - group.height / 2 - 2;
        return [x - ink.actualBoundingBoxLeft,x + ink.actualBoundingBoxRight].every(horizontal =>
          [y - ink.actualBoundingBoxAscent,y + ink.actualBoundingBoxDescent].every(vertical => Math.hypot(horizontal,vertical) <= layout.baseInnerRadius));
      });
      setOutside(!fits);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [centerReading, layout.baseInnerRadius, reading.percentText]);
  return <MiniSlot kind={arc ? "arc" : "ring"} size={size} state={reading.state} width={layout.width} height={layout.height} unavailable={!drawable}
    style={{ "--mini-center": `${canvasSize / 2}px`, "--mini-center-y": `${canvasSize / 2 - 2}px` } as CSSProperties}
    reading={centerReading && <span ref={readingRef} className="rain-business-progress-reading" data-mini-reading data-placement={outside ? "outside" : "center"}>
      <strong data-primary-reading>{reading.percentText}</strong><span>完成率</span>
    </span>}>
    {drawable && <div className="rain-business-mini-progress-canvas" aria-hidden="true" style={{ width:canvasSize, height:canvasSize }}>
      <RingChart data={[{ label: "完成率", value:value!, maxValue }]} size={canvasSize} padding={layout.padding} baseInnerRadius={layout.baseInnerRadius} strokeWidth={layout.strokeWidth}
        startAngle={arc ? MINI_LAYOUT[size].arc.startAngle : 0} endAngle={arc ? MINI_LAYOUT[size].arc.endAngle : Math.PI * 2}
        enterTransition={reduced ? immediate : compactMotion} enterStaggerScale={reduced ? 0 : .3}>
        <Ring index={0} animate={!reduced} showGlow={false} />
      </RingChart>
    </div>}
  </MiniSlot>;
}

export function MiniTrend({ values, area = false, reduced = false, size = "compact" }: { values: (number|null)[]; area?: boolean } & MiniProps) {
  const state = compositionState(values);
  const layout = MINI_LAYOUT[size];
  const drawable = state === "normal" || state === "zero";
  const data = values.map((value,index) => ({ date: new Date(Date.UTC(2026,9,1+index)), value }));
  const props = { data, xDataKey: "date", aspectRatio: "", margin: { top: layout.plot.padding, bottom: layout.plot.padding, left: layout.plot.padding, right: layout.plot.padding }, animationDuration: reduced ? 0 : 650, enterTransition: reduced ? immediate : compactMotion };
  return <MiniSlot kind={area ? "area" : "line"} size={size} state={state} width={layout.plot.width} height={layout.plot.height} unavailable={!drawable}>
    {drawable && <div className="rain-business-mini-plot" aria-hidden="true">
      {area ? <AreaChart {...props}><Area dataKey="value" fill="var(--chart-1)" strokeWidth={layout.lineWidth} fillOpacity={.18} curve={curveMonotoneX} animate={!reduced} fadeEdges={false} /></AreaChart>
        : <LineChart {...props}><Line dataKey="value" stroke="var(--chart-1)" strokeWidth={layout.lineWidth} curve={curveMonotoneX} animate={!reduced} fadeEdges={false} /></LineChart>}
    </div>}
  </MiniSlot>;
}

export function MiniGallery({ row, maxValue, trendMaxValue, reduced = false }: { row: MiniRow; maxValue: number; trendMaxValue: number; reduced?: boolean }) {
  const read = (value: number|null) => value === null ? "缺测" : !Number.isFinite(value) || value < 0 ? "无效数据" : String(value);
  const progress = getProgressReading(row.completed,row.goal);
  const partsReading = <ul className="rain-business-mini-legend">{row.parts.map((value,index) => <li key={index}><i aria-hidden="true" style={{ background:`var(--chart-${index % 5 + 1})` }} />{MINI_PART_LABELS[index] ?? `类别${index+1}`} <span>{read(value)} 人</span></li>)}</ul>;
  const examples = [
    { kind:"quantity", title:"数量条", graphic:(size:MiniSize) => {
      const bar = MINI_LAYOUT[size].bar;
      const invalid = !Number.isFinite(maxValue) || maxValue < 0 || (row.count !== null && (!Number.isFinite(row.count) || row.count < 0 || (maxValue === 0 && row.count > 0)));
      const state = invalid ? "invalid" : row.count === null ? "missing" : row.count > maxValue ? "overflow" : row.count === 0 ? "zero" : "normal";
      return <MiniSlot kind="quantity" size={size} state={state} width={bar.width} height={bar.thickness} unavailable={state !== "normal" && state !== "zero"}>
        {(state === "normal" || state === "zero") && <DataBar value={row.count} maxValue={maxValue} label="本期人数" decorative style={{ width:bar.width, height:bar.thickness }} />}
      </MiniSlot>;
    }, description:<span>本期人数 · {read(row.count)} 人{maxValue === 0 && row.count === 0 && " · 全零量程，保留0与空轨"}</span> },
    { kind:"segments", title:"构成分段", graphic:(size:MiniSize) => <MiniSegments values={row.parts} size={size} reduced={reduced} />, description:partsReading },
    { kind:"columns", title:"每日柱图", graphic:(size:MiniSize) => <MiniColumns values={row.trend} maxValue={trendMaxValue} size={size} reduced={reduced} />, description:<span>近8天每日人数 · 共同上限 {read(trendMaxValue)} 人{trendMaxValue === 0 && compositionState(row.trend) === "zero" && " · 全零量程，保留0读数"}</span> },
    { kind:"pie", title:"小饼", graphic:(size:MiniSize) => <MiniPie values={row.parts} size={size} reduced={reduced} />, description:partsReading },
    { kind:"donut", title:"环饼", graphic:(size:MiniSize) => <MiniPie values={row.parts} donut size={size} reduced={reduced} />, description:partsReading },
    { kind:"ring", title:"完成环", graphic:(size:MiniSize) => <MiniProgress value={row.completed} maxValue={row.goal} arc={false} size={size} reduced={reduced} />, description:(size:MiniSize) => <span>完成 {read(row.completed)} 人 · 目标 {read(row.goal)} 人{progress.fraction === null || size === "comfortable" ? "" : ` · ${progress.percentText}`}</span> },
    { kind:"arc", title:"完成弧", graphic:(size:MiniSize) => <MiniProgress value={row.completed} maxValue={row.goal} size={size} reduced={reduced} />, description:(size:MiniSize) => <span>完成 {read(row.completed)} 人 · 目标 {read(row.goal)} 人{progress.fraction === null || size === "comfortable" ? "" : ` · ${progress.percentText}`}</span> },
    { kind:"line", title:"折线走势", graphic:(size:MiniSize) => <MiniTrend values={row.trend} size={size} reduced={reduced} />, description:<span>近8天每日人数 · 观察变化</span> },
    { kind:"area", title:"面积走势", graphic:(size:MiniSize) => <MiniTrend values={row.trend} area size={size} reduced={reduced} />, description:<span>近8天每日人数 · 观察变化</span> },
  ];
  return <div className="rain-business-mini-gallery">{examples.flatMap(example => (["compact","comfortable"] as const).map(size => <figure key={`${example.kind}-${size}`}>
    <div className="rain-business-mini-gallery__graphic">{example.graphic(size)}</div>
    <figcaption><strong>{example.title} · {size === "compact" ? "紧凑" : "舒展"}</strong>{typeof example.description === "function" ? example.description(size) : example.description}</figcaption>
  </figure>))}</div>;
}
