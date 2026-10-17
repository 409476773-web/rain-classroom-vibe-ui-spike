import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Breadcrumb, Button, IconButton, Link, Popover, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableScrollArea, Tooltip } from "@rain-next/ui";
import { CloseIcon } from "@rain-next/ui/icons/close";
import type { ChoroplethFeature, RainChartRecipe } from "@rain-next/ui/charts";
import { applyChinaStatistics, chinaIntensityColor, getChinaLayerRegions, getChinaRegion, loadChinaLayer, makeChinaStatistics, type ChinaDataState } from "./china-region-data";
import { ChinaAnimatedReading, ChinaRegionMap, chinaReading, type ChinaMapFocus, type ChinaMapView } from "./china-region-map";
import "./china-region-page.css";

export type ChinaChartSettings = { provinceId: string | null; selectedId: string | null; state: ChinaDataState; revision: number; recipe: RainChartRecipe };
type Navigation = Pick<ChinaChartSettings, "provinceId" | "selectedId">;
const valueOf = (feature: ChoroplethFeature) => typeof feature.properties.value === "number" ? feature.properties.value : null;
const levelName = { province: "省级", prefecture: "地级", county: "县级" } as const;
const centre: ChinaMapFocus = { x: .5, y: .5, direction: "in" };

export function ChinaRegionExamples({ provinceId = null, selectedId = null, state = "normal", revision = 0, recipe = "monochrome-blue", reduced = false, onNavigate }: Partial<ChinaChartSettings> & { reduced?: boolean; onNavigate?: (settings: Navigation) => void }) {
  const [navigation, setNavigation] = useState<Navigation>({ provinceId, selectedId });
  useEffect(() => { setNavigation({ provinceId, selectedId }); }, [provinceId, selectedId]);
  const current = onNavigate ? { provinceId, selectedId } : navigation;
  const navigate = (next: Navigation) => onNavigate ? onNavigate(next) : setNavigation(next);
  const [loaded, setLoaded] = useState<{ parentId: string | null; data: Awaited<ReturnType<typeof loadChinaLayer>> } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [focus, setFocus] = useState(centre);
  const views = useRef(new Map<string, ChinaMapView>()), domains = useRef(new Map<string, number>());
  const root = useRef<HTMLElement>(null), keyboardNavigation = useRef(false);
  const configuration = useMemo(() => {
    try {
      const province = current.provinceId == null ? undefined : getChinaRegion(current.provinceId);
      if (province && (province.level !== "province" || !province.hasChildren)) throw new Error("当前地区没有可用的省内地图层");
      const regions = getChinaLayerRegions(current.provinceId);
      if (current.selectedId != null && !regions.some(region => region.id === current.selectedId)) throw new Error("选择地区不属于当前地图层");
      return { error: undefined };
    } catch (cause) { return { error: cause instanceof Error ? cause.message : "无效地区身份" }; }
  }, [current.provinceId, current.selectedId]);
  const simulateError = state === "load-error";
  useEffect(() => {
    let active = true;
    setLoadError(null);
    if (configuration.error) { setLoading(false); return; }
    setLoading(true);
    const request = simulateError && retry === 0 ? Promise.reject(new Error("模拟加载失败（Mock）")) : loadChinaLayer(current.provinceId);
    request.then(data => {
      if (active) { setLoaded({ parentId: current.provinceId, data }); setLoading(false); }
    }).catch(cause => { if (active) { setLoadError(cause instanceof Error ? cause.message : "无法读取地区边界"); setLoading(false); } });
    return () => { active = false; };
  }, [current.provinceId, configuration.error, simulateError, retry]);

  const parentId = loaded ? loaded.parentId : current.provinceId;
  const layerId = parentId ?? "national";
  const regions = configuration.error ? [] : getChinaLayerRegions(parentId);
  const province = parentId && !configuration.error ? getChinaRegion(parentId) : undefined;
  const parentName = province?.name ?? "全国";
  const prepared = useMemo(() => {
    if (!loaded || configuration.error) return null;
    try {
      const result = applyChinaStatistics(loaded.data, makeChinaStatistics(loaded.parentId, state === "load-error" ? "normal" : state, revision));
      const actualMax = Math.max(0, ...result.data.features.map(feature => valueOf(feature) ?? 0));
      const initialMax = Math.max(0, ...makeChinaStatistics(loaded.parentId, "normal", 0).map(row => row.value ?? 0));
      const prior = domains.current.get(layerId) ?? Math.ceil(initialMax / 50) * 50;
      const max = Math.max(prior, Math.ceil(actualMax / 50) * 50);
      domains.current.set(layerId, max);
      return { ...result, actualMax, max, expanded: max > prior, error: undefined };
    } catch (cause) { return { data: loaded.data, unmatched: [], actualMax: 0, max: 0, expanded: false, error: cause instanceof Error ? cause.message : "无效统计数据" }; }
  }, [loaded, configuration.error, layerId, state, revision]);
  const selected = regions.find(region => region.id === current.selectedId);
  const selectedFeature = selected && prepared?.data.features.find(feature => feature.properties.id === selected.id);
  const onView = useCallback((view: ChinaMapView) => { views.current.set(layerId, view); }, [layerId]);
  const activate = (id: string, point?: ChinaMapFocus) => {
    const region = regions.find(region => region.id === id);
    if (!region) return;
    setPickerOpen(false);
    if (region.hasChildren) {
      const path = root.current?.querySelector(`[data-map-active="true"] [data-feature-id="${id}"]`);
      const plot = root.current?.querySelector(".rain-china-canvas")?.getBoundingClientRect(), box = path?.getBoundingClientRect();
      setFocus(point ?? (plot && box && plot.width > 0 && plot.height > 0 ? { x: (box.left + box.width / 2 - plot.left) / plot.width, y: (box.top + box.height / 2 - plot.top) / plot.height, direction: "in" } : centre));
      navigate({ provinceId: id, selectedId: null });
    } else navigate({ provinceId: parentId, selectedId: id });
  };
  const goBack = () => { setFocus({ x: .5, y: .5, direction: "out" }); setPickerOpen(false); navigate({ provinceId: null, selectedId: parentId }); };
  const clearSelection = () => navigate({ provinceId: parentId, selectedId: null });
  const unavailable = configuration.error ?? prepared?.error;
  const hasValues = prepared?.data.features.some(feature => valueOf(feature) !== null) ?? false;
  const pending = loading && !!loaded;
  useEffect(() => {
    if (!loading && !loadError && keyboardNavigation.current) {
      root.current?.querySelector<HTMLElement>('[aria-current="page"]')?.focus();
      keyboardNavigation.current = false;
    }
  }, [loading, loadError, parentId]);

  return <section ref={root} className="rain-china-example rain-chart" data-recipe={recipe} data-local-recipe="china-map-experience-2026-10-10" data-china-layer={layerId} data-state={state} data-revision={revision}
    onKeyDown={event => { if (event.key === "Escape" && !pickerOpen && selected) clearSelection(); }}>
    <header><h2>{parentName} · 地区参与人数</h2><span className="rain-china-reference">{parentId === "440000" ? "CH-119" : "CH-117"} · 示例数据</span></header>
    <div className="rain-china-navigation">
      <Breadcrumb aria-label="当前地图层级"><Breadcrumb.List>
        <Breadcrumb.Item>{parentId == null ? <Breadcrumb.Page tabIndex={-1}>全国</Breadcrumb.Page> : <Breadcrumb.Link href="#chart-china" aria-label="返回全国" onClick={event => { event.preventDefault(); keyboardNavigation.current = event.detail === 0; goBack(); }}>全国</Breadcrumb.Link>}</Breadcrumb.Item>
        {province && <><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Page tabIndex={-1}>{parentName}</Breadcrumb.Page></Breadcrumb.Item></>}
      </Breadcrumb.List></Breadcrumb>
      <Popover.Root open={pickerOpen} onOpenChange={open => setPickerOpen(open)}>
        <Popover.Trigger render={<Button size="small" variant="tertiary" disabled={!prepared || !!unavailable}>选择地区</Button>} />
        <Popover.Content className="rain-china-picker" aria-label="选择地区" width={320} positionerProps={{ align: "end" }}>
          <Popover.Title>{parentName} · 选择地区</Popover.Title>
          <ul className="rain-china-regions" aria-label="地区列表">{prepared && regions.map(region => {
            const feature = prepared!.data.features.find(feature => feature.properties.id === region.id)!;
            return <li key={region.id}><Button variant="tertiary" size="small" aria-label={region.name} aria-pressed={current.selectedId === region.id} data-china-region={region.id}
              onClick={event => { keyboardNavigation.current = event.detail === 0 && region.hasChildren; activate(region.id); }}>
              <span data-slot="region-name">{region.name}</span><span data-slot="value">{chinaReading(valueOf(feature))}</span>
            </Button></li>;
          })}</ul>
        </Popover.Content>
      </Popover.Root>
    </div>
    <div className="rain-china-canvas" aria-busy={loading}>
      <AnimatePresence initial={!reduced} custom={focus}>
        {prepared && !unavailable && <ChinaRegionMap key={layerId} layerId={layerId} data={prepared.data} selectedId={current.provinceId === parentId ? current.selectedId : null} max={prepared.max} view={views.current.get(layerId)} onView={onView} onActivate={activate} focus={focus} reduced={reduced} />}
      </AnimatePresence>
      {(unavailable || loadError || loading) && <div className="rain-china-state" role={unavailable || loadError ? "alert" : "status"}>
        <p>{configuration.error ? `无效地区配置：${configuration.error}` : prepared?.error ? `已拒绝无效统计数据：${prepared.error}` : loadError ? `边界加载失败：${loadError}` : pending ? `正在进入${current.provinceId ? getChinaRegion(current.provinceId).name : "全国"}…` : "加载地区边界…"}</p>
        {loadError && <Button size="small" variant="tertiary" onClick={() => setRetry(value => value + 1)}>重试加载</Button>}
        {loadError && loaded && loaded.parentId !== current.provinceId && <Button size="small" variant="tertiary" onClick={() => navigate({ provinceId: loaded.parentId, selectedId: null })}>继续查看{parentName}</Button>}
      </div>}
    </div>
    {prepared && !unavailable && <>
      <div className="rain-china-scale" role="group" data-domain-max={prepared.max} aria-label={`参与人数色阶，${hasValues ? `0到${prepared.max}人` : "暂无有效数值"}，另有无数据`}>
        <span className="rain-china-scale-scope">{parentId == null ? "全国范围" : "省内范围"}</span>
        {prepared.actualMax === 0 ? hasValues ? <><i style={{ background: chinaIntensityColor(0, prepared.max) }} aria-hidden="true" /><span>{prepared.data.features.some(feature => valueOf(feature) === null) ? "有效值均为 0" : "全部为 0"}</span></> : <span>暂无有效数值</span> : <><span>0 人</span><span className="rain-china-scale-stops">{[0, .25, .5, .75, 1].map(fraction => <i key={fraction} style={{ background: chinaIntensityColor(prepared.max * fraction, prepared.max) }} aria-hidden="true" />)}</span><span>{chinaReading(prepared.max)}</span></>}
        <span className="rain-china-no-data"><i style={{ background: chinaIntensityColor(null, prepared.max) }} aria-hidden="true" />无数据</span>
      </div>
      <div className="rain-china-reading" aria-live="polite" aria-atomic="true">
        {selected && selectedFeature && !selected.hasChildren ? <section className="rain-china-detail" aria-label="地区样本详情" data-selected-region={selected.id}>
          <div><h3>{selected.name}</h3><div className="rain-china-detail-value"><ChinaAnimatedReading value={valueOf(selectedFeature)} reduced={reduced} /><Tooltip text="关闭详情" placement="top"><IconButton size="32/18" icon={<CloseIcon />} aria-label="关闭地区详情" onClick={clearSelection} /></Tooltip></div></div>
          <p>{selected.branch === "municipality" ? "直辖市 · 查看市级读数" : selected.branch === "province-only-source" ? "当前来源未提供下级地图" : selected.branch === "province-direct-county" ? "省直管县级" : "地级"} · 地区代码 {selected.id} · 示例详情（Mock）</p>
        </section> : <p>{selected ? `刚才查看：${selected.name}。` : ""}指向地区查看人数，点击省份进入省内，点击城市保留读数。</p>}
      </div>
      {prepared.expanded && <p className="rain-china-note" role="status">新数值超出原范围，地图与图例量程已同步调整。</p>}
      {prepared.unmatched.length > 0 && <p role="alert" className="rain-china-unmatched">未匹配统计地区：{prepared.unmatched.map(row => row.id).join("、")}。未把这些记录赋给其它地区。</p>}
      <div className="rain-china-source-line"><span>边界来源</span> <Link href="https://data.humdata.org/dataset/cod-ab-chn" target="_blank" rel="noreferrer">HDX/OCHA</Link> · <Link href="https://creativecommons.org/licenses/by/3.0/igo/" target="_blank" rel="noreferrer">CC BY 3.0 IGO</Link> / <Link href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</Link> · <Link href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noreferrer">ODbL</Link></div>
      <details className="rain-china-data"><summary>查看精确数据</summary><TableScrollArea aria-label="地区精确数据，可横向滚动"><Table>
        <TableCaption>{parentName} · 示例参与人数</TableCaption><TableHeader><TableRow>{["地区代码", "地区", "层级", "参与人数"].map(header => <TableHead key={header}>{header}</TableHead>)}</TableRow></TableHeader>
        <TableBody>{regions.map(region => <TableRow key={region.id} data-china-row={region.id}><TableHead scope="row">{region.id}</TableHead><TableCell>{region.name}</TableCell><TableCell>{region.branch === "municipality" ? "直辖市" : region.branch === "province-direct-county" ? "省直管县级" : levelName[region.level]}</TableCell><TableCell>{chinaReading(valueOf(prepared.data.features.find(feature => feature.properties.id === region.id)!))}</TableCell></TableRow>)}</TableBody>
      </Table></TableScrollArea></details>
      <details className="rain-china-data rain-china-method"><summary>边界与统计说明</summary><p className="rain-china-note">各层独立统计、独立量程，全国与省内颜色深浅不直接比较。统计与详情均为 Mock。当前层 {regions.length} 个地区；保留真实地级、省直管县级身份，未扩展区县地图。</p><p className="rain-china-note">固定混合快照：地区名称按 2024 清单，HDX 为 2020 快照（实际边界年代未知），OSM 于 2026-10-09—10 提取；不代表最新行政边界。</p></details>
    </>}
  </section>;
}
