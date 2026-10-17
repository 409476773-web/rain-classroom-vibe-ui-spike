import { Bar, BarChart, BarYAxis, ChartTooltip, TooltipContent, DataBar } from "@rain-next/ui/charts";
import { MINI_PART_LABELS, type MiniRow } from "./mini-data";
import { MINI_LAYOUT } from "./mini-layout";

export function HorizontalBarExample({ rows, maxValue, reduced = false, replay = 0 }: { rows: MiniRow[]; maxValue: number; reduced?: boolean; replay?: number }) {
  return <div className="rain-business-bar-plot" data-business="horizontal" style={{ height: Math.max(180,rows.length*48+28) }}>
    <BarChart data={rows} xDataKey="id" orientation="horizontal" valueDomain={[0,maxValue || 1]} aspectRatio="" margin={{ left: 150, right: 24, top: 12, bottom: 12 }}
      animationDuration={reduced ? 0 : 1100} enterTransition={reduced ? { type: "tween",duration: 0 } : undefined} revealSignature={String(replay)} barGap={.58}>
      <Bar dataKey="count" fill="var(--chart-1)" lineCap={4} animate={!reduced} />
      <BarYAxis formatLabel={(_id,datum) => String(datum.label)} />
      <ChartTooltip className="rain-chart-tooltip" showDatePill={false} content={({ point }) => <TooltipContent title={String(point.label)} rows={[{ label: "参与人数",value: point.count === null ? "暂无数据" : `${point.count} 人`,color: "var(--chart-1)" }]} />} />
    </BarChart>
  </div>;
}

export function RankingBars({ rows,maxValue }: { rows: MiniRow[]; maxValue: number }) {
  return <figure style={{margin:0}}><ol className="rain-business-ranking" data-business="ranking">{rows.map(row => <li key={row.id} data-row-id={row.id}>
    <span className="rain-business-ranking__label">{row.label}</span><DataBar value={row.count} maxValue={maxValue} label={row.label} decorative style={{height:MINI_LAYOUT.compact.bar.thickness}} />
    <span className="rain-business-reading">{row.count === null ? "—" : row.count}<small> 人</small></span>
  </li>)}</ol>{maxValue === 0 && rows.length > 0 && rows.every(row => row.count === 0) && <figcaption className="rain-business-note">全零量程：保留0读数与空轨，不生成相对长度。</figcaption>}</figure>;
}

export function HorizontalBarComparison({ rows,maxValue,stacked = false,reduced = false,replay = 0 }: { rows: MiniRow[]; maxValue: number; stacked?: boolean; reduced?: boolean; replay?: number }) {
  const series = stacked ? MINI_PART_LABELS : ["本期", "上期"];
  const data = rows.map(row => ({ id:row.id,label:row.label,...Object.fromEntries(series.map((_,index) => [`value-${index}`,stacked ? row.parts[index] : index === 0 ? row.count : row.trend[0]])) }));
  return <figure style={{margin:0}} data-business={stacked ? "horizontal-stacked" : "horizontal-grouped"}>
    <figcaption>{stacked ? "互斥课程构成" : "本期与上期参与人数"}</figcaption>
    <div className="rain-business-bar-plot" style={{height:Math.max(180,rows.length*52+28)}}>
      <BarChart data={data} xDataKey="id" orientation="horizontal" stacked={stacked} valueDomain={[0,maxValue || 1]} aspectRatio="" margin={{left:150,right:24,top:12,bottom:12}} barGap={.4}
        animationDuration={reduced ? 0 : 1100} enterTransition={reduced ? {type:"tween",duration:0} : undefined} revealSignature={String(replay)}>
        {series.map((label,index) => <Bar key={label} dataKey={`value-${index}`} fill={`var(--chart-${index+1})`} lineCap={stacked ? 0 : 3} animate={!reduced} />)}
        <BarYAxis formatLabel={(_id,datum) => String(datum.label)} />
        <ChartTooltip className="rain-chart-tooltip" showDatePill={false} content={({point}) => <TooltipContent title={String(point.label)} rows={series.map((label,index) => ({label,value:point[`value-${index}`] === null ? "缺测" : `${point[`value-${index}`]} ${stacked ? "门" : "人"}`,color:`var(--chart-${index+1})`}))} />} />
      </BarChart>
    </div>
    <p className="rain-business-note">{series.map((label,index) => <span key={label} style={{marginRight:16}}><i aria-hidden="true" style={{display:"inline-block",width:8,height:8,marginRight:6,borderRadius:2,background:`var(--chart-${index+1})`}} />{label}</span>)}{maxValue === 0 && rows.length > 0 && rows.every(row => series.every((_,index) => (stacked ? row.parts[index] : index === 0 ? row.count : row.trend[0]) === 0)) && <span>全零量程：保留0读数，不生成相对长度。</span>}</p>
    <details className="rain-chart-data"><summary>查看分项读数</summary><table><caption>{stacked ? "各课程状态互斥，总量为三项之和" : "两期人数分别比较，不相加"}</caption><thead><tr><th scope="col">学院</th>{series.map(label => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.id}><th scope="row">{row.label}</th>{series.map((label,index) => {const value=stacked ? row.parts[index] : index === 0 ? row.count : row.trend[0];return <td key={label}>{value === null ? "—" : value}</td>;})}</tr>)}</tbody></table></details>
  </figure>;
}

export function RelativeBarExamples() {
  return <div className="rain-business-standalone-mini">
    <div><span>评分 7.5 / 10</span><DataBar value={7.5} maxValue={10} label="评分，满分10" decorative style={{width:MINI_LAYOUT.compact.bar.width,height:MINI_LAYOUT.compact.bar.thickness}} /></div>
    <div><span>相对位置 12 / 60（从前到后）</span><DataBar value={12} maxValue={60} label="相对位置，12/60" decorative style={{width:MINI_LAYOUT.compact.bar.width,height:MINI_LAYOUT.compact.bar.thickness}} /></div>
  </div>;
}
