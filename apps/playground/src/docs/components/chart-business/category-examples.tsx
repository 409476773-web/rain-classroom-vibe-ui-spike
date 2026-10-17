import { useId, useMemo } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, TableScrollArea } from "@rain-next/ui";
import { Area, AreaChart, ChartLegend, ChartTooltip, ComposedChart, curveNatural, Grid, Line, LineChart, SeriesBar, TooltipContent, XAxis, YAxis, type RainChartRecipe } from "@rain-next/ui/charts";
import { makeCategoryFixtures, type CategoryChartState, type CategoryFixture, type CategoryFixtureId, type CategoryRow, type CategorySeries } from "./comparison-data";

export type CategoryExamplesProps = { fixtureId?: CategoryFixtureId; state?: CategoryChartState; revision?: number; replay?: number; descending?: boolean; recipe?: RainChartRecipe; reduced?: boolean };
const color = (index: number) => `var(--chart-${index + 1})`;
const read = (value: unknown, unit: string, inapplicable = false) => value == null ? inapplicable ? "不适用" : "缺测" : `${value}${unit}`;

export function CategoryTooltip({ fixture, point }: { fixture: CategoryFixture; point: Record<string, unknown> }) {
  return <TooltipContent title={`${point.label}${point.campus ? ` · ${point.campus}` : ""}`} rows={fixture.series.map((series, index) => ({
    label: `${series.label}${fixture.id === "period" ? ` · ${point[series.key === "currentValue" ? "currentDate" : "previousDate"] ?? "无观测日期"}` : ""}`,
    value: read(point[series.key], series.unit, fixture.id === "knowledge" && series.key === "rate" && point.covered === 0 && point.uncovered === 0), color: color(index),
  }))} />;
}

function ExactTable({ fixture, rows }: { fixture: CategoryFixture; rows: CategoryRow[] }) {
  return <details className="rain-category-data"><summary>查看精确数据 · {fixture.title}</summary>
    <TableScrollArea aria-label={`${fixture.title}精确读数，可横向滚动`}><Table aria-label={`${fixture.title} · 精确数据`}>
      <TableCaption>{fixture.title} · 精确数据</TableCaption>
      <TableHeader><TableRow><TableHead>类别</TableHead>
        {fixture.id === "colleges" && <><TableHead>校区</TableHead><TableHead>计划课程 · 门</TableHead></>}
        {fixture.id === "period" && <><TableHead>本期原始日期</TableHead><TableHead>上期原始日期</TableHead></>}
        {fixture.series.map(series => <TableHead key={series.key}>{series.label} · {series.unit}</TableHead>)}
      </TableRow></TableHeader>
      <TableBody>{rows.map(row => <TableRow key={row.id} data-category-row={row.id}><TableHead scope="row">{row.label}</TableHead>
        {fixture.id === "colleges" && <><TableCell>{String(row.campus)}</TableCell><TableCell>{String(row.planned)}</TableCell></>}
        {fixture.id === "period" && <><TableCell>{String(row.currentDate ?? "无观测日期")}</TableCell><TableCell>{String(row.previousDate ?? "无观测日期")}</TableCell></>}
        {fixture.series.map(series => <TableCell key={series.key}>{read(row[series.key], "", fixture.id === "knowledge" && series.key === "rate" && row.covered === 0 && row.uncovered === 0)}</TableCell>)}
      </TableRow>)}</TableBody>
    </Table></TableScrollArea>
  </details>;
}

function seriesPart(series: CategorySeries, index: number, reduced: boolean, single: boolean) {
  if (series.kind === "bar") return <SeriesBar key={series.key} dataKey={series.key} yAxisId={series.yAxisId} fill={color(index)} animate={!reduced} radius={3} />;
  if (series.kind === "area") return <Area key={series.key} dataKey={series.key} yAxisId={series.yAxisId} curve={curveNatural} fill={color(index)} stroke={color(index)} fillOpacity={.3} fadeEdges={false} showMarkers={single} animate={!reduced} />;
  return <Line key={series.key} dataKey={series.key} yAxisId={series.yAxisId} stroke={color(index)} strokeWidth={2.5} fadeEdges={false} showMarkers={single} animate={!reduced} />;
}

function CategoryExample({ fixture, reduced, replay, descending, recipe }: { fixture: CategoryFixture; reduced: boolean; replay: number; descending: boolean; recipe: RainChartRecipe }) {
  const headingId = useId();
  const rows = descending ? [...fixture.rows].reverse() : fixture.rows;
  const invalid = rows.some(row => fixture.series.some(series => {
    const value = row[series.key];
    return value !== null && (typeof value !== "number" || !Number.isFinite(value) || value < 0);
  }));
  const width = Math.max(760, rows.length * Math.max(100, ...rows.map(row => row.label.length * 13 + 36)) + 120);
  const primaryUnit = fixture.series.find(series => !series.yAxisId || series.yAxisId === "left")?.unit ?? "";
  const parts = [
    <Grid key="grid" horizontal numTicksRows={4} />,
    ...fixture.series.map((series, index) => seriesPart(series, index, reduced, rows.length === 1)),
    <YAxis key="left" numTicks={4} formatValue={value => `${value}${primaryUnit}`} />,
    ...(fixture.yDomains?.right ? [<YAxis key="right" yAxisId="right" orientation="right" numTicks={4} formatValue={value => `${value}%`} />] : []),
    <XAxis key="x" numTicks={rows.length} />,
    <ChartTooltip key="tooltip" className="rain-category-tooltip" content={({ point }) => <CategoryTooltip fixture={fixture} point={point} />} />,
  ];
  const common = { data: rows, xMode: "category" as const, xDataKey: "id", xLabel: (row: Record<string, unknown>) => String(row.label), aspectRatio: "", className: "rain-category-plot", margin: { top: 24, right: fixture.yDomains?.right ? 62 : 24, bottom: 52, left: 62 }, animationDuration: reduced ? 0 : undefined, enterTransition: reduced ? { type: "tween" as const, duration: 0 } : undefined, revealSignature: String(replay) };
  return <section className="rain-category-example rain-chart" data-category-example={fixture.id} data-recipe={recipe} aria-labelledby={headingId}>
    <header><span className="rain-category-reference">{fixture.reference}</span><h2 id={headingId}>{fixture.title}</h2></header>
    <p className="rain-category-description">{fixture.description}</p>
    {invalid ? <p role="alert" className="rain-category-state">无效数据：读数应为有限非负数，缺测保留为空。</p> : rows.length === 0 ? <p role="status" className="rain-category-state">暂无数据</p> : <>
      <div className="rain-category-scroll" role="region" aria-label={`${fixture.title}图表，可横向滚动`} tabIndex={0}><div style={{ minWidth: width, height: 300 }}>
        {fixture.kind === "line" ? <LineChart {...common} yDomainTween={!reduced}>{parts}</LineChart> : fixture.kind === "area" ? <AreaChart {...common} yDomainTween={!reduced}>{parts}</AreaChart> : <ComposedChart {...common} stacked={fixture.stacked} yDomains={fixture.yDomains} maxBarSize={36}>{parts}</ComposedChart>}
      </div></div>
      <ChartLegend showValue={false} items={fixture.series.map((series, index) => ({ label: `${series.label} · ${series.unit}`, color: color(index), value: 0 }))} />
      <ExactTable fixture={fixture} rows={rows} />
    </>}
  </section>;
}

export function CategoryExamples({ fixtureId, state = "normal", revision = 0, replay = 0, descending = false, recipe = "monochrome-blue", reduced = false }: CategoryExamplesProps) {
  const fixtures = useMemo(() => makeCategoryFixtures(revision, state), [revision, state]);
  return <div className="rain-category-examples">{fixtures.filter(fixture => !fixtureId || fixture.id === fixtureId).map(fixture => <CategoryExample key={fixture.id} fixture={fixture} reduced={reduced} replay={replay} descending={descending} recipe={recipe} />)}</div>;
}
