import { useMemo, useState } from 'react';
import { ChoroplethChart, ChoroplethFeatureComponent, ChoroplethTooltip, TooltipContent, RingChart, Ring, RingCenter, ChartLegend, type ChoroplethChartProps } from '@rain-next/ui/charts';
import { geography, regions, regionalValues, intensitySteps, intensityColor, createGoals, validGoals, validRegions } from './data.mjs';

const still = { type: 'tween' as const, duration: 0 };
export function RegionalGoals({ reduced }: { reduced: boolean }) {
  const [updated, setUpdated] = useState(false);
  const [regionMode, setRegionMode] = useState('normal');
  const [goalMode, setGoalMode] = useState('normal');
  const [hovered, setHovered] = useState<number | null>(0);
  const values = useMemo(() => regionalValues(regionMode, updated), [regionMode, updated]);
  const regionDataValid = validRegions(values);
  const goals = useMemo(() => createGoals(goalMode, updated), [goalMode, updated]);
  const goalDataValid = validGoals(goals);
  const active = hovered !== null && hovered < goals.length ? hovered : 0;
  return <section aria-labelledby="regional-title" data-consumer-task="regional">
    <div className="section-heading"><div><h2 id="regional-title">地区强度与独立目标</h2><p>每个地区的强度为 0—100；各项目保留自己的目标和单位。</p></div><button data-focus="control" type="button" disabled={updated} onClick={() => setUpdated(true)}>刷新地区与目标数据</button></div>
    <p role="status" className="status">{updated ? '已更新：西河强度 8、中谷强度 45；微课发布 20/24、评论回复 82/100、回访登记 3/12。' : '示意 GeoJSON 为本任务自行绘制，无真实行政区域含义。'}</p>
    <div className="regional-grid">
      <figure className="rain-chart" data-recipe="intensity" aria-labelledby="map-title" data-region-state={regionMode}>
        <figcaption id="map-title">训练站区域强度（Mock）</figcaption>
        <label className="control-label">地区数据 <select data-focus="control" aria-label="地区数据" value={regionMode} onChange={event => setRegionMode(event.target.value)}><option value="normal">标准，含零值与缺测</option><option value="zero">全部有效零值</option><option value="missing">全部缺测</option><option value="invalid">无效强度</option><option value="empty">空地区</option></select></label>
        {regionMode === 'empty' ? <p role="status">没有地区几何，已停止绘图。</p> : !regionDataValid ? <p role="status">地区值无效：强度超出 0—100，已拒绝绘图。</p> : <ChoroplethChart data={geography as ChoroplethChartProps['data']} className="rain-chart-plot" aspectRatio="" center={[104, 29]} scale={2100} margin={{ top: 24, right: 24, bottom: 24, left: 24 }} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? still : undefined} revealSignature={reduced ? 'reduced' : 'normal'}>
          <ChoroplethFeatureComponent getFeatureColor={feature => intensityColor(values[String(feature.properties.id) as keyof typeof values])} stroke="var(--rain-category-border-neutral-3)" />
          <ChoroplethTooltip content={({ feature }) => { const value = values[String(feature.properties.id) as keyof typeof values]; return <TooltipContent title={String(feature.properties.name)} rows={[{ label: '区域强度（0—100）', value: value === null ? '缺测，未记录' : String(value), color: intensityColor(value) }]} />; }} />
        </ChoroplethChart>}
        <div className="scale" aria-label="区域强度色阶">{[...intensitySteps, { label: '缺测', color: 'var(--chart-no-data)' }].map(step => <span key={step.label}><i className="swatch" style={{ background: step.color }} />{step.label}</span>)}</div>
        <p className="definition">有效 0 使用最浅强度色；缺测使用独立无数据色。图形、色阶与提示采用同一个 0—100 映射。</p>
        <div className="table-scroll" role="region" aria-label="区域强度精确数据滚动区" tabIndex={0} data-focus="item"><table><caption>区域强度精确数据</caption><thead><tr><th scope="col">地区</th><th scope="col">强度</th><th scope="col">状态</th></tr></thead><tbody>{regionMode !== 'empty' && regions.map(region => { const value = values[region.id as keyof typeof values]; return <tr key={region.id} data-region-id={region.id}><th scope="row">{region.name}</th><td>{value === null ? '—' : value}</td><td>{value === null ? '缺测' : value < 0 || value > 100 ? '无效' : '有效'}</td></tr>; })}</tbody></table></div>
      </figure>
      <figure className="rain-chart" data-recipe="category-wide" aria-labelledby="goals-title" data-goal-state={goalMode}>
        <figcaption id="goals-title">四个独立目标（Mock）</figcaption>
        <label className="control-label">目标数据 <select data-focus="control" aria-label="目标数据" value={goalMode} onChange={event => { setGoalMode(event.target.value); setHovered(0); }}><option value="normal">标准数据</option><option value="zero">全部零进度</option><option value="invalid">零目标分母</option><option value="empty">空目标</option></select></label>
        {!goals.length ? <p role="status">当前没有目标。</p> : !goalDataValid ? <p role="status">目标无效：maxValue 必须大于 0，已拒绝绘图。</p> : <>
          <div className="ring-container"><RingChart data={goals} className="ring-plot" hoveredIndex={active} onHoverChange={index => setHovered(index ?? active)} strokeWidth={12} ringGap={7} baseInnerRadius={62} enterTransition={reduced ? still : undefined} enterStaggerScale={reduced ? 0 : 1}>
            {goals.map((goal, index) => <Ring key={goal.id} index={index} animate={!reduced} />)}
            <RingCenter>{({ data }) => <div className="goal-center"><span className="goal-rate">{(data.value / data.maxValue * 100).toFixed(1)}%</span><span>{data.label}</span></div>}</RingCenter>
          </RingChart></div>
          <ChartLegend items={goals} hoveredIndex={active} onHover={index => setHovered(index ?? active)} renderItem={({ item, index, percentage }) => <button type="button" data-focus="item" className="legend-button" onFocus={() => setHovered(index)} onClick={() => setHovered(index)}><span className="swatch" style={{ background: item.color }} />{item.label} · {percentage.toFixed(1)}%</button>} />
        </>}
        <p className="definition">每环达成率 = 自己的 value ÷ maxValue。中心只显示当前目标，不把不同目标或单位相加。</p>
        <div className="table-scroll" role="region" aria-label="独立目标精确数据滚动区" tabIndex={0} data-focus="item"><table><caption>各目标的独立分母与精确读数</caption><thead><tr><th scope="col">目标</th><th scope="col">当前 / 目标</th><th scope="col">达成率</th></tr></thead><tbody>{goals.map(goal => <tr key={goal.id}><th scope="row">{goal.label}</th><td>{goal.value} / {goal.maxValue} {goal.unit}</td><td>{goal.maxValue > 0 ? `${(goal.value / goal.maxValue * 100).toFixed(1)}%` : '无效分母'}</td></tr>)}</tbody></table></div>
      </figure>
    </div>
  </section>;
}
