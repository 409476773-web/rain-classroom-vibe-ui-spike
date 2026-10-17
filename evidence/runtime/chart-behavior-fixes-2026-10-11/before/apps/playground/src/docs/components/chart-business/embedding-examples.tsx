import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Button, Card, CardHeader, CardTitle, CardContent, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableScrollArea, Tooltip } from "@rain-next/ui";
import { DataBar } from "@rain-next/ui/charts";
import { MiniColumns, MiniPie, MiniProgress, MiniTrend } from "./mini-examples";
import { getProgressReading, MINI_PART_LABELS, type MiniRow } from "./mini-data";
import { MINI_LAYOUT } from "./mini-layout";

const read = (value: number|null) => value === null ? "—" : String(value);
const composition = (values: MiniRow["parts"]) => values.map((value,index) => `${MINI_PART_LABELS[index]} ${read(value)}`).join(" / ");
const compact = MINI_LAYOUT.compact;
function placeholder(kind: string, frame: {width:number;height:number}) {
  return <div className="rain-business-mini rain-business-mini-placeholder" aria-hidden="true" data-mini-kind={kind} data-size="compact" data-mini-state="offscreen"><span className="rain-business-mini-slot" style={{display:"block",width:frame.width,height:frame.height,flexShrink:0}} /></div>;
}

function EmbeddedRow({row,maxValue,trendMaxValue,reduced,selected,onSelect}: {row:MiniRow;maxValue:number;trendMaxValue:number;reduced:boolean;selected:boolean;onSelect:()=>void}) {
  const ref = useRef<HTMLTableRowElement>(null);
  const inView = useInView(ref,{amount:.01});
  const [lastVisible,setLastVisible] = useState<{row:MiniRow;maxValue:number;trendMaxValue:number}|null>(null);
  useEffect(()=>{if(inView)setLastVisible({row,maxValue,trendMaxValue});},[inView,row,maxValue,trendMaxValue]);
  // Keep cached geometry only while its data and both comparison domains still match.
  const visual = inView || (lastVisible?.row === row && lastVisible.maxValue === maxValue && lastVisible.trendMaxValue === trendMaxValue);
  const progress = getProgressReading(row.completed,row.goal);
  return <TableRow ref={ref} data-row-id={row.id} selected={selected}>
    <TableCell><Tooltip text={`${row.label}：${read(row.count)} 人；点击查看完整数据`} portal><Button variant="text" size="small" className="rain-business-row-link" onClick={onSelect} aria-pressed={selected}>{row.label}</Button></Tooltip></TableCell>
    <TableCell><div className="rain-business-cell-value"><DataBar value={row.count} maxValue={maxValue} label="参与人数" decorative style={{width:80,height:compact.bar.thickness}} /><span className="rain-business-reading" data-reading="count">{read(row.count)}<small> 人</small></span></div></TableCell>
    <TableCell>{visual ? <MiniTrend values={row.trend} area size="compact" reduced={reduced} /> : placeholder("area",compact.plot)}</TableCell>
    <TableCell>{visual ? <MiniColumns values={row.trend} maxValue={trendMaxValue} size="compact" reduced={reduced} /> : placeholder("columns",compact.plot)}</TableCell>
    <TableCell><div className="rain-business-cell-radial" title={composition(row.parts)}>{visual ? <MiniPie values={row.parts} size="compact" reduced={reduced} /> : placeholder("pie",compact.pie)}{row.count === null ? !visual && <span>缺测</span> : <span>共 <b className="rain-business-reading">{row.count}</b><small> 门</small></span>}</div></TableCell>
    <TableCell><div className="rain-business-cell-radial">{visual ? <MiniProgress value={row.completed} maxValue={row.goal} size="compact" reduced={reduced} /> : placeholder("arc",compact.arc)}{(progress.fraction !== null || !visual) && <span className={progress.fraction === null ? undefined : "rain-business-reading"}>{progress.percentText}</span>}</div></TableCell>
  </TableRow>;
}
export function EmbeddingExamples({ rows,maxValue,trendMaxValue,reduced = false }: { rows: MiniRow[]; maxValue: number; trendMaxValue:number; reduced?: boolean }) {
  const [selected,setSelected] = useState<string|null>(null);
  const detail = rows.find(row => row.id === selected);
  const first = rows[0];
  if (!first) return <p role="status">暂无数据</p>;
  const progress = getProgressReading(first.completed,first.goal);
  return <>
    <section className="rain-business-section" aria-labelledby="business-cards-title"><h2 id="business-cards-title">指标卡：图文就近成组</h2>
      <div className="rain-business-cards">
        <Card size="sm"><CardHeader><CardTitle>本期参与人数</CardTitle></CardHeader><CardContent><div className="rain-business-metric"><span className="rain-business-number" data-primary-reading="">{read(first.count)}<small> 人</small></span><MiniTrend values={first.trend} area size="compact" reduced={reduced} /></div><p>近8天每日人数 · 趋势按自身范围展开</p></CardContent></Card>
        <Card size="sm"><CardHeader><CardTitle>课程构成</CardTitle></CardHeader><CardContent><div className="rain-business-metric"><span className="rain-business-number" data-primary-reading="">{read(first.count)}<small> 门</small></span><MiniPie values={first.parts} donut size="comfortable" reduced={reduced} /></div><div className="rain-business-composition-reading">{first.parts.map((value,index)=><span key={index}><i aria-hidden="true" style={{background:`var(--chart-${index+1})`}} />{MINI_PART_LABELS[index]} <b className="rain-business-reading">{read(value)}</b></span>)}</div></CardContent></Card>
        <Card size="sm"><CardHeader><CardTitle>目标完成</CardTitle></CardHeader><CardContent><div className="rain-business-metric"><span className="rain-business-number" data-primary-reading="">{progress.fraction === null ? "—" : progress.percentText}</span><MiniProgress value={first.completed} maxValue={first.goal} size="comfortable" showReading={false} reduced={reduced} /></div><p>{first.goal === 0 ? "目标未设置" : `已完成 ${read(first.completed)} / ${first.goal} 项`}</p></CardContent></Card>
      </div>
    </section>
    <section className="rain-business-section" aria-labelledby="business-table-title"><h2 id="business-table-title">表格：紧凑型号，一起比较</h2>
      <p className="rain-business-note">参与人数共用 {maxValue === 0 ? "全零量程" : `0—${maxValue} 人量程`}；每日柱图共用 {trendMaxValue === 0 ? "全零量程" : `0—${trendMaxValue} 人量程`}。面积走势用于看各自变化；点击学院名称读取每个数据点。</p>
      <TableScrollArea aria-label="学院数据与迷你图表" className="rain-business-table-scroll">
        <Table className="rain-business-table"><TableHeader><TableRow><TableHead>学院</TableHead><TableHead>参与人数</TableHead><TableHead>近8天趋势</TableHead><TableHead>每日分布</TableHead><TableHead>课程构成</TableHead><TableHead>目标完成</TableHead></TableRow></TableHeader>
          <TableBody>{rows.map(row => <EmbeddedRow key={row.id} row={row} maxValue={maxValue} trendMaxValue={trendMaxValue} reduced={reduced} selected={selected === row.id} onSelect={()=>setSelected(current=>current === row.id ? null : row.id)} />)}</TableBody>
        </Table>
      </TableScrollArea>
      {detail && <div className="rain-business-detail" role="status"><strong>{detail.label}</strong><p>每日读数：{detail.trend.map(read).join("、")} 人</p><p>构成：{composition(detail.parts)}；目标：{read(detail.completed)} / {detail.goal}</p></div>}
    </section>
    <section className="rain-business-section" aria-labelledby="business-list-title"><h2 id="business-list-title">课程列表：读数就近成组</h2>
      <ul className="rain-business-course-list">{rows.slice(0,3).map(row => <li key={row.id}>
        <div className="rain-business-list-title"><strong>{row.label} · 教学任务</strong></div>
        <div className="rain-business-list-score"><span>评分 <b className="rain-business-reading">{row.count === null ? "—" : (row.count/10).toFixed(1)}</b> / 10</span><DataBar value={row.count === null ? null : row.count/10} maxValue={10} label="评分" decorative style={{width:compact.bar.width,height:compact.bar.thickness}} /></div>
        <div className="rain-business-list-progress"><MiniProgress value={row.completed} maxValue={row.goal} arc={false} size="compact" reduced={reduced} /><div>{getProgressReading(row.completed,row.goal).fraction !== null && <b className="rain-business-reading">{getProgressReading(row.completed,row.goal).percentText}</b>}<span>{row.goal === 0 ? "目标未设置" : `已完成 ${read(row.completed)} / ${row.goal} 项`}</span></div></div>
      </li>)}</ul>
      <div className="rain-business-comfortable-group"><MiniProgress value={first.completed} maxValue={first.goal} size="comfortable" reduced={reduced} /><div><strong>{first.label} · 本期教学任务</strong><p>{first.goal === 0 ? "目标未设置" : `已完成 ${read(first.completed)} / ${first.goal} 项`}</p></div></div>
    </section>
  </>;
}
