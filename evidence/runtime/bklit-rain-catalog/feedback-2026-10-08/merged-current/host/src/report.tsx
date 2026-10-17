import { useMemo, useState } from 'react';
import { ComposedChart, Area, SeriesBar, Line, Grid, XAxis, YAxis, ChartTooltip, TooltipContent, ChartLegend, ChartLegendHoverProvider, curveLinear } from '@rain-next/ui/charts';
import { createReport, reportState, dateText, rateText, series } from './data.mjs';

const still = { type: 'tween' as const, duration: 0 };
export function CompletionReport({ reduced }: { reduced: boolean }) {
  const [mode, setMode] = useState('normal');
  const [updated, setUpdated] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const rows = useMemo(() => createReport(mode, updated), [mode, updated]);
  const state = reportState(rows);
  const drawable = state === 'normal' || state === 'zero';
  const message = state === 'mixed' ? '有日期报名人数为 0，完成率不适用。当前停止绘图，全部精确数据仍保留。'
    : state === 'invalid' ? '数据无效：完成人数超过报名人数，已拒绝绘图。'
    : state === 'empty' ? '当前没有报名记录。' : state === 'zero' ? '报名人数全部为 0，完成率不适用，已移除完成率曲线。'
    : updated ? '已追加 10月7日：报名 260 人，完成 234 人，完成率 90.0%。' : '当前数据：10月1日—10月6日。';
  return <section aria-labelledby="completion-title" className="rain-chart" data-recipe="category-near" data-consumer-task="report" data-state={state}>
    <div className="section-heading"><div><h2 id="completion-title">报名、完成与完成率</h2><p>左轴：人数（人） · 右轴：完成率（%）</p></div>
      <div className="controls"><label>报告数据 <select data-focus="control" aria-label="报告数据" value={mode} onChange={event => { setMode(event.target.value); setHovered(null); }}>
        <option value="normal">标准数据</option><option value="zero">全部零报名</option><option value="mixed">含零报名日期</option><option value="invalid">无效完成数</option><option value="empty">空记录</option>
      </select></label><button data-focus="control" type="button" disabled={updated} onClick={() => setUpdated(true)}>追加最新日期</button></div>
    </div>
    <p className="definition">完成率 = 完成人数 ÷ 报名人数 × 100。分母为同一日期的报名人数；报名人数为 0 时不适用。</p>
    <p role="status" className="status">{message}</p>
    <figure aria-labelledby="completion-title" aria-describedby="report-description">
      <figcaption id="report-description">面积为报名人数，柱为完成人数，折线为完成率；完成者包含在报名者中，人数不叠加。</figcaption>
      <ChartLegendHoverProvider hoveredIndex={hovered} onHoverChange={setHovered}>
        {drawable && <ComposedChart data={rows} className="rain-chart-plot" aspectRatio="" margin={{ top: 24, right: 76, bottom: 42, left: 76 }} maxBarSize={30} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? still : undefined} revealSignature={reduced ? 'reduced' : 'normal'}>
          <Grid horizontal numTicksRows={4} />
          <Area dataKey="enrolled" fill="var(--chart-1)" fillOpacity={.20} animate={!reduced} />
          <SeriesBar dataKey="completed" fill="var(--chart-2)" stroke="var(--chart-2)" animate={!reduced} />
          {state === 'normal' && <Line dataKey="rate" yAxisId="right" stroke="var(--chart-3)" curve={curveLinear} fadeEdges={false} showMarkers animate={!reduced} />}
          <YAxis numTicks={4} formatValue={value => String(value)} />
          {state === 'normal' && <YAxis yAxisId="right" orientation="right" numTicks={5} formatValue={value => `${value}%`} />}
          <XAxis numTicks={4} />
          <ChartTooltip content={({ point }) => <TooltipContent title={dateText(point.date as Date)} rows={[
            { label: '报名人数', value: `${point.enrolled} 人`, color: 'var(--chart-1)' },
            { label: '完成人数', value: `${point.completed} 人`, color: 'var(--chart-2)' },
            { label: '完成率（分母：报名）', value: rateText(point.rate as number | null), color: 'var(--chart-3)' },
          ]} />} />
        </ComposedChart>}
        <ChartLegend items={series.map(item => ({ label: `${item.label}（${item.key === 'rate' ? '右轴，%' : '左轴，人'}）`, color: item.color, value: 0 }))} hoveredIndex={hovered} onHover={setHovered} renderItem={({ item, index }) => <button type="button" data-focus="item" className="legend-button" onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} onClick={() => setHovered(index)}><span className="swatch" style={{ background: item.color }} />{item.label}</button>} />
      </ChartLegendHoverProvider>
    </figure>
    <div className="table-scroll" role="region" aria-label="每日报名与完成精确数据滚动区" tabIndex={0} data-focus="item"><table><caption>每日报名与完成精确数据（Mock）</caption><thead><tr><th scope="col">日期</th><th scope="col">报名人数（人）</th><th scope="col">完成人数（人）</th><th scope="col">完成率</th></tr></thead>
      <tbody>{rows.map(row => <tr key={row.date.getTime()}><th scope="row">{dateText(row.date)}</th><td>{row.enrolled}</td><td>{row.completed}</td><td>{row.completed > row.enrolled ? '无效（完成数超过报名数）' : rateText(row.rate)}</td></tr>)}</tbody>
    </table></div>
  </section>;
}
