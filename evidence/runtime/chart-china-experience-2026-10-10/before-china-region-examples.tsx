import { useEffect, useMemo, useState } from "react";
import { Breadcrumb, Button, Link, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableScrollArea } from "@rain-next/ui";
import { ChoroplethChart, ChoroplethFeatureComponent, ChoroplethTooltip, TooltipContent, useChoroplethZoom, type ChoroplethFeature, type RainChartRecipe } from "@rain-next/ui/charts";
import { applyChinaStatistics, chinaIntensityColor, getChinaLayerRegions, getChinaRegion, loadChinaLayer, makeChinaStatistics, type ChinaDataState } from "./china-region-data";
import "./china-region-page.css";

export type ChinaChartSettings = { provinceId: string | null; selectedId: string | null; state: ChinaDataState; revision: number; recipe: RainChartRecipe };
type Navigation = Pick<ChinaChartSettings, "provinceId" | "selectedId">;
const valueOf = (feature: ChoroplethFeature) => typeof feature.properties.value === "number" ? feature.properties.value : null;
const reading = (value: number | null) => value == null ? "无数据" : `${value.toLocaleString("zh-CN")} 人`;
const levelName = { province: "省级", prefecture: "地级", county: "县级" } as const;

function MapControls() {
  const { zoom } = useChoroplethZoom();
  if (!zoom) return null;
  return <div className="rain-china-map-controls">
    <Button size="mini" variant="secondary" aria-label="放大地图" onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}>放大</Button>
    <Button size="mini" variant="secondary" aria-label="缩小地图" onClick={() => zoom.scale({ scaleX: .8, scaleY: .8 })}>缩小</Button>
    <Button size="mini" variant="secondary" aria-label="重置地图" onClick={() => zoom.reset()}>重置</Button>
  </div>;
}

export function ChinaRegionExamples({ provinceId = null, selectedId = null, state = "normal", revision = 0, recipe = "monochrome-blue", reduced = false, onNavigate }: Partial<ChinaChartSettings> & { reduced?: boolean; onNavigate?: (settings: Navigation) => void }) {
  const [navigation, setNavigation] = useState<Navigation>({ provinceId, selectedId });
  useEffect(() => { setNavigation({ provinceId, selectedId }); }, [provinceId, selectedId]);
  const current = onNavigate ? { provinceId, selectedId } : navigation;
  const navigate = (next: Navigation) => onNavigate ? onNavigate(next) : setNavigation(next);
  const [loaded, setLoaded] = useState<{ parentId: string | null; data: Awaited<ReturnType<typeof loadChinaLayer>> } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const configuration = useMemo(() => {
    try {
      const province = current.provinceId == null ? undefined : getChinaRegion(current.provinceId);
      if (province && (province.level !== "province" || !province.hasChildren)) throw new Error("当前地区没有可用的省内地图层");
      const regions = getChinaLayerRegions(current.provinceId);
      if (current.selectedId != null && !regions.some(region => region.id === current.selectedId)) throw new Error("选择地区不属于当前地图层");
      return { province, regions, error: undefined };
    } catch (cause) { return { province: undefined, regions: [], error: cause instanceof Error ? cause.message : "无效地区身份" }; }
  }, [current.provinceId, current.selectedId]);
  const simulateError = state === "load-error";
  useEffect(() => {
    let active = true;
    setLoaded(null);
    setLoadError(null);
    if (configuration.error) return;
    const request = simulateError && retry === 0 ? Promise.reject(new Error("模拟加载失败（Mock）")) : loadChinaLayer(current.provinceId);
    request.then(data => { if (active) setLoaded({ parentId: current.provinceId, data }); }).catch(cause => { if (active) setLoadError(cause instanceof Error ? cause.message : "无法读取地区边界"); });
    return () => { active = false; };
  }, [current.provinceId, configuration.error, simulateError, retry]);
  const prepared = useMemo(() => {
    if (!loaded || loaded.parentId !== current.provinceId) return null;
    try {
      const rows = makeChinaStatistics(current.provinceId, state === "load-error" ? "normal" : state, revision);
      const result = applyChinaStatistics(loaded.data, rows);
      return { ...result, max: Math.max(0, ...result.data.features.map(feature => valueOf(feature) ?? 0)), error: undefined };
    } catch (cause) { return { data: loaded.data, unmatched: [], max: 0, error: cause instanceof Error ? cause.message : "无效统计数据" }; }
  }, [loaded, current.provinceId, state, revision]);
  const parentName = configuration.province?.name ?? "全国";
  const selected = configuration.regions.find(region => region.id === current.selectedId);
  const activate = (id: string) => {
    const region = configuration.regions.find(region => region.id === id);
    if (!region) return;
    navigate(region.hasChildren ? { provinceId: id, selectedId: null } : { provinceId: current.provinceId, selectedId: id });
  };
  const clearSelection = () => navigate({ provinceId: current.provinceId, selectedId: null });
  const unavailable = configuration.error ?? loadError ?? prepared?.error;
  const hasValues = prepared?.data.features.some(feature => valueOf(feature) !== null) ?? false;
  return <section className="rain-china-example rain-chart" data-recipe={recipe} data-china-layer={current.provinceId ?? "national"} data-state={state} data-revision={revision}>
    <header><span className="rain-china-reference">{current.provinceId === "440000" ? "CH-119" : "CH-117"}</span><h2>{parentName} · 地区参与人数</h2></header>
    <div className="rain-china-navigation">
      <Breadcrumb aria-label="当前地图层级"><Breadcrumb.List>
        <Breadcrumb.Item><Breadcrumb.Text aria-current={current.provinceId == null ? "page" : undefined}>全国</Breadcrumb.Text></Breadcrumb.Item>
        {configuration.province && <><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Text aria-current="page">{parentName}</Breadcrumb.Text></Breadcrumb.Item></>}
      </Breadcrumb.List></Breadcrumb>
      {current.provinceId != null && <Button size="small" variant="secondary" onClick={() => navigate({ provinceId: null, selectedId: current.provinceId })}>返回全国</Button>}
    </div>
    <p className="rain-china-note">示例参与人数 · 各层独立统计、独立量程；全国与省内的颜色深浅不直接比较。统计值与地区详情均为 Mock。</p>
    {configuration.error ? <p role="alert" className="rain-china-state">无效地区配置：{configuration.error}</p> : loadError ? <div className="rain-china-state" role="alert"><p>边界加载失败：{loadError}</p><Button size="small" variant="secondary" onClick={() => setRetry(value => value + 1)}>重试加载</Button></div> : prepared?.error ? <p role="alert" className="rain-china-state">已拒绝无效统计数据：{prepared.error}</p> : !prepared ? <p role="status" className="rain-china-state">加载地区边界…</p> : <>
      {prepared.unmatched.length > 0 && <p role="alert" className="rain-china-unmatched">未匹配统计地区：{prepared.unmatched.map(row => row.id).join("、")}。未把这些记录赋给其它地区。</p>}
      <ChoroplethChart key={current.provinceId ?? "national"} data={prepared.data} className="rain-china-map" fitToData zoomEnabled aspectRatio="16 / 9" margin={{ top: 20, right: 20, bottom: 20, left: 20 }} animationDuration={reduced ? 0 : undefined} enterTransition={reduced ? { duration: 0 } : undefined}>
        <ChoroplethFeatureComponent stroke="var(--chart-background)" strokeWidth={.65} selectedFeatureId={current.selectedId ?? undefined} getFeatureColor={feature => chinaIntensityColor(valueOf(feature), prepared.max)} onFeatureActivate={id => { if (typeof id === "string") activate(id); }} />
        <ChoroplethTooltip className="rain-chart-tooltip" content={({ feature }) => <TooltipContent title={String(feature.properties.name)} rows={[{ label: "示例参与人数", value: reading(valueOf(feature)), color: chinaIntensityColor(valueOf(feature), prepared.max) }]} />} />
        <MapControls />
      </ChoroplethChart>
      <p className="rain-china-note">固定混合快照：地区名称按 2024 清单，HDX 为 2020 快照（实际边界年代未知），OSM 于 2026-10-09—10 提取；不代表最新行政边界。<Link href="https://data.humdata.org/dataset/cod-ab-chn" target="_blank" rel="noreferrer">HDX/OCHA</Link>（<Link href="https://creativecommons.org/licenses/by/3.0/igo/" target="_blank" rel="noreferrer">CC BY 3.0 IGO</Link>）；<Link href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</Link>（<Link href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noreferrer">ODbL</Link>）。</p>
      <div className="rain-china-scale" role="group" aria-label={`参与人数色阶，${hasValues ? `0到${prepared.max}人` : "暂无有效数值"}，另有无数据`}>
        {prepared.max === 0 ? hasValues ? <><i style={{ background: chinaIntensityColor(0, 0) }} aria-hidden="true" /><span>{prepared.data.features.some(feature => valueOf(feature) === null) ? "有效值均为 0" : "全部为 0"}</span></> : <span>暂无有效数值</span> : <><span>0 人</span>{[0, .25, .5, .75, 1].map(fraction => <i key={fraction} style={{ background: chinaIntensityColor(prepared.max * fraction, prepared.max) }} aria-hidden="true" />)}<span>{reading(prepared.max)}</span></>}
        <i style={{ background: chinaIntensityColor(null, prepared.max) }} aria-hidden="true" /><span>无数据</span>
      </div>
      <p className="rain-china-note">可点地图或用下方地区按钮操作，支持 Enter / 空格。{current.provinceId == null ? "省份进入省内层；直辖市和无下级来源地区进入说明。" : "省内列表按真实地级、省直管县级标明层级；选择地区查看样本详情。"}</p>
      <ul className="rain-china-regions" aria-label="地区列表">{configuration.regions.map(region => {
        const feature = prepared.data.features.find(feature => feature.properties.id === region.id)!;
        return <li key={region.id}><Button variant="tertiary" size="small" aria-label={region.name} aria-pressed={current.selectedId === region.id} data-china-region={region.id} onClick={() => activate(region.id)}><span data-slot="region-name">{region.name}</span><span data-slot="value">{reading(valueOf(feature))}</span></Button><span className="rain-china-level">{region.branch === "municipality" ? "直辖市" : region.branch === "province-direct-county" ? "省直管县级" : levelName[region.level]}</span></li>;
      })}</ul>
      {selected && !selected.hasChildren && <section className="rain-china-detail" aria-label="地区样本详情" data-selected-region={selected.id}>
        <div><h3>{selected.name} · 地区样本详情（Mock）</h3><Button size="small" variant="secondary" onClick={clearSelection}>关闭地区详情</Button></div>
        <p>{selected.branch === "municipality" ? "直辖市：本例直接读取市级样本，不复制同名城市或继续展示区县地图。" : selected.branch === "province-only-source" ? "当前来源未提供下级地图；保留省级读数与本地样本说明。" : selected.branch === "province-direct-county" ? "省直管县级单元：保留真实县级身份，不当作地级市。" : "当前地区的本地样本入口；未连接真实业务服务。"}</p>
        <p>示例参与人数：{reading(valueOf(prepared.data.features.find(feature => feature.properties.id === selected.id)!))} · 地区代码 {selected.id}</p>
      </section>}
      <details className="rain-china-data"><summary>查看精确数据</summary><TableScrollArea aria-label="地区精确数据，可横向滚动"><Table>
        <TableCaption>{parentName} · 示例参与人数</TableCaption><TableHeader><TableRow>{["地区代码", "地区", "层级", "参与人数"].map(header => <TableHead key={header}>{header}</TableHead>)}</TableRow></TableHeader>
        <TableBody>{configuration.regions.map(region => <TableRow key={region.id} data-china-row={region.id}><TableHead scope="row">{region.id}</TableHead><TableCell>{region.name}</TableCell><TableCell>{region.branch === "municipality" ? "直辖市" : region.branch === "province-direct-county" ? "省直管县级" : levelName[region.level]}</TableCell><TableCell>{reading(valueOf(prepared.data.features.find(feature => feature.properties.id === region.id)!))}</TableCell></TableRow>)}</TableBody>
      </Table></TableScrollArea></details>
    </>}
    {!unavailable && prepared && <p className="rain-china-note">当前省级层 34 个地区；省内层保留实际地级和省直管县级身份，未扩展区县地图。</p>}
  </section>;
}
