// Rain chart candidate: native Bklit Compound API, isolated from the UI root.
export {
  DEFAULT_ANIMATION_DURATION_MS,
  DEFAULT_ANIMATION_EASING,
  DEFAULT_CHART_ENTER_TRANSITION,
} from "./vendor/charts/animation";
export { Area, type AreaProps } from "./vendor/charts/area";
export { AreaChart, type AreaChartProps } from "./vendor/charts/area-chart";
export {
  Background,
  type BackgroundPatternPreset,
  type BackgroundProps,
} from "./vendor/charts/background";
export {
  Bar,
  type BarAnimationType,
  type BarLineCap,
  type BarProps,
} from "./vendor/charts/bar";
export { BarChart, type BarChartProps, type BarOrientation } from "./vendor/charts/bar-chart";
export { DataBar, type DataBarProps } from "./data-bar";
export {
  BarDepthBack,
  type BarDepthBackProps,
  type BarDepthEntry,
  BarDepthFront,
  type BarDepthFrontProps,
  BarDepthProvider,
  type BarDepthProviderProps,
  type BarDepthSegment,
  BarPulse,
  type BarPulseProps,
  useBarDepthEntries,
} from "./vendor/charts/bar-depth";
export {
  BarColumnTrack,
  type BarColumnTrackProps,
  BarSquares,
  type BarSquaresProps,
  type GradientStop,
} from "./vendor/charts/bar-squares";
export {
  computeSquareColumn,
  type SquareColumnLayout,
  topSquareCenterY,
} from "./vendor/charts/bar-squares-layout";
export { BarXAxis, type BarXAxisProps } from "./vendor/charts/bar-x-axis";
export { BarYAxis, type BarYAxisProps } from "./vendor/charts/bar-y-axis";
export { Candlestick, type CandlestickProps } from "./vendor/charts/candlestick";
export {
  CandlestickChart,
  type CandlestickChartProps,
  type OHLCDataPoint,
} from "./vendor/charts/candlestick-chart";
export {
  ChartBrush,
  type ChartBrushProps,
  type ChartBrushSelection,
} from "./vendor/charts/chart-brush";
export {
  ChartBrushLayout,
  type ChartBrushLayoutProps,
  type ChartBrushLayoutState,
} from "./vendor/charts/chart-brush-layout";
export {
  type ChartBrushPatternPreset,
  ChartBrushSelectionOverlay,
  type ChartBrushSelectionOverlayProps,
  type ChartBrushSelectionPattern,
} from "./vendor/charts/chart-brush-selection-overlay";
export {
  ChartBrushTrackOverlay,
  type ChartBrushTrackOverlayProps,
  type ChartBrushTrackOverlayStyle,
} from "./vendor/charts/chart-brush-track-overlay";
export {
  chartCenterContainerClassName,
  chartCenterLabelClassName,
  chartCenterValueClassName,
} from "./vendor/charts/chart-center-typography";
export { CHART_CLIP_PASSTHROUGH } from "./vendor/charts/chart-child-passthrough";
export {
  ChartConfigProvider,
  type ChartConfigProviderProps,
  type ChartConfigValue,
  DEFAULT_CHART_CONFIG,
  resolveTooltipBoxMotion,
  type SpringConfig,
  useChartConfig,
} from "./vendor/charts/chart-config-context";
export {
  type ChartContextValue,
  type ChartHoverContextValue,
  ChartProvider,
  type ChartStableContextValue,
  chartCssVars,
  defaultScatterColors,
  type LineConfig,
  type Margin,
  type TooltipData,
  useChart,
  useChartHover,
  useChartStable,
  useYScale,
} from "./vendor/charts/chart-context";
export {
  ChartLegend,
  type ChartLegendProps,
  type LegendItem,
} from "./vendor/charts/chart-legend";
export {
  ChartLegendHoverProvider,
  useChartLegendHover,
} from "./vendor/charts/chart-legend-hover";
export {
  ChartLoadingLabel,
  type ChartLoadingLabelProps,
} from "./vendor/charts/chart-loading-label";
export {
  type ChartPhase,
  type ChartStatus,
  DEFAULT_CHART_LIFECYCLE,
  DEFAULT_CHART_STATUS,
  DEFAULT_Y_DOMAIN_TWEEN_MS,
  isChartInteractionPhase,
  type LoadingStyle,
  resolveRestingChartPhase,
} from "./vendor/charts/chart-phase";
export {
  ChartRevealClip,
  type ChartRevealClipProps,
} from "./vendor/charts/chart-reveal-clip";
export {
  CHART_SCALE_VARS,
  type ChartScaleVars,
  chartScaleCssVars,
} from "./vendor/charts/chart-scale";
export {
  ChartStatFlow,
  type ChartStatFlowFormat,
  type ChartStatFlowProps,
  defaultChartStatFlowFormat,
} from "./vendor/charts/chart-stat-flow";
export {
  ChoroplethChart,
  type ChoroplethChartProps,
  type ChoroplethContextValue,
  type ChoroplethFeature,
  ChoroplethFeatureComponent,
  type ChoroplethFeatureProperties,
  type ChoroplethFeatureProps,
  ChoroplethGraticule,
  type ChoroplethGraticuleProps,
  ChoroplethProvider,
  ChoroplethTooltip,
  type ChoroplethTooltipData,
  type ChoroplethTooltipProps,
  choroplethCssVars,
  defaultChoroplethColors,
  type TransformMatrix,
  useChoropleth,
  useChoroplethZoom,
} from "./vendor/charts/choropleth";
export {
  ComposedChart,
  type ComposedChartProps,
} from "./vendor/charts/composed-chart";
export {
  FunnelChart,
  type FunnelChartProps,
  type FunnelGradientStop,
  type FunnelStage,
} from "./vendor/charts/funnel-chart";
export { Gauge, type GaugeOrientation, type GaugeProps } from "./vendor/charts/gauge";
export type {
  GaugeLabelAlign,
  GaugeLabelPlacement,
} from "./vendor/charts/gauge-label-layout";
export {
  type GenerateChartSkeletonDataOptions,
  generateChartSkeletonData,
} from "./vendor/charts/generate-chart-skeleton-data";
export { Grid, type GridProps } from "./vendor/charts/grid";
export {
  buildHeatmapColorScale,
  buildHeatmapColorScaleFromStyles,
  buildHeatmapFillScale,
  buildHeatmapLegendGradient,
  buildHeatmapRowOpacity,
  defaultHeatmapColorScale,
  defaultHeatmapFillScale,
  filterHeatmapColumns,
  formatHeatmapContributionLabel,
  formatHeatmapTooltipDate,
  formatHeatmapTooltipWeekday,
  formatHeatmapYAxisLabel,
  getHeatmapCalendarRangeStart,
  getHeatmapColumnMonthAnchor,
  getHeatmapDayLabels,
  getHeatmapSeparatorColumnIndices,
  getHeatmapTimeExtent,
  getHeatmapWeekCount,
  getHeatmapWeekStartAlignedToRange,
  getHeatmapWeekStartSunday,
  getHeatmapYearStartMonth,
  HEATMAP_DAY_LABELS,
  HEATMAP_DEFAULT_LEVEL_COLORS,
  HEATMAP_DEFAULT_LEVEL_STYLES,
  HEATMAP_LEGEND_LEVELS,
  HEATMAP_MONTHS_ONE_YEAR,
  HEATMAP_MONTHS_SIX,
  HEATMAP_WEEKS_ONE_YEAR,
  type HeatmapBin,
  HeatmapCells,
  type HeatmapCellsProps,
  HeatmapChart,
  HeatmapChartLoading,
  type HeatmapChartLoadingProps,
  type HeatmapChartProps,
  type HeatmapColumn,
  type HeatmapContextValue,
  HeatmapInteractionBoundary,
  HeatmapInteractionProvider,
  type HeatmapLayout,
  HeatmapLegend,
  type HeatmapLegendProps,
  type HeatmapLegendVariant,
  type HeatmapLevelColors,
  type HeatmapLevelFillMode,
  type HeatmapLevelStyle,
  type HeatmapLevelStyles,
  HeatmapProvider,
  HeatmapSeparator,
  type HeatmapSeparatorProps,
  HeatmapTooltip,
  type HeatmapTooltipProps,
  type HeatmapWeekRange,
  type HeatmapWeekStartDay,
  HeatmapXAxis,
  type HeatmapXAxisProps,
  HeatmapYAxis,
  type HeatmapYAxisLabelFormat,
  type HeatmapYAxisProps,
  type HeatmapYAxisTickFilter,
  heatmapCssVars,
  heatmapLevelPatternId,
  inferHeatmapCalendarRangeStart,
  isHeatmapLevelPattern,
  levelColorsFromStyles,
  levelStylesFromColors,
  resolveHeatmapLevelStyles,
  resolveHeatmapWeekRange,
  shouldShowHeatmapYAxisTick,
  useHeatmap,
} from "./vendor/charts/heatmap";
export {
  type IndicatorFadeEdges,
  indicatorFadeGradientStops,
  resolveVerticalFadeSides,
} from "./vendor/charts/indicator-fade";
export {
  Legend,
  type LegendContextValue,
  LegendItem as LegendItemComponent,
  type LegendItemContextValue,
  type LegendItemData,
  type LegendItemProps,
  LegendLabel,
  type LegendLabelProps,
  LegendMarker,
  type LegendMarkerProps,
  LegendProgress,
  type LegendProgressProps,
  type LegendProps,
  LegendValue,
  type LegendValueProps,
  legendCssVars,
  useLegend,
  useLegendItem,
} from "./vendor/charts/legend";
export { Line, type LineProps } from "./vendor/charts/line";
export { LineChart, type LineChartProps } from "./vendor/charts/line-chart";
export {
  LineSeriesTerminalMarker,
  type LineSeriesTerminalMarkerProps,
} from "./vendor/charts/line-series-terminal-marker";
export {
  type LineLoadingPulseMode,
  LineLoadingPulseStroke,
  type LineLoadingPulseStrokeProps,
  resolveLineLoadingPulseMode,
} from "./vendor/charts/line-loading-pulse";
export {
  detectMomentum,
  LiveLine,
  type LiveLineProps,
  type Momentum,
  type MomentumColors,
} from "./vendor/charts/live-line";
export {
  LiveLineChart,
  type LiveLineChartProps,
  type LiveLinePoint,
} from "./vendor/charts/live-line-chart";
export { LiveXAxis, type LiveXAxisProps } from "./vendor/charts/live-x-axis";
export { LiveYAxis, type LiveYAxisProps } from "./vendor/charts/live-y-axis";
export {
  type ChartMarker,
  ChartMarkers,
  type ChartMarkersProps,
  MarkerGroup,
  type MarkerGroupProps,
  MarkerTooltipContent,
  type MarkerTooltipContentProps,
  useActiveMarkers,
} from "./vendor/charts/markers";
export {
  BarLoadingSkeleton,
  type BarLoadingSkeletonProps,
  getSkeletonHeights,
  LineLoadingSweep,
  type LineLoadingSweepProps,
} from "./vendor/charts/loading-sweep";
export { PatternArea, type PatternAreaProps } from "./vendor/charts/pattern-area";
export {
  isCirclePattern,
  isCirclesPattern,
  PATTERN_PRESET_IDS,
  type PatternPresetId,
  type PatternPresetOptions,
  patternPresetTileSize,
  renderPatternPreset,
} from "./vendor/charts/pattern-preset";
export { PieCenter, type PieCenterProps } from "./vendor/charts/pie-center";
export {
  PieCenterShell,
  type PieCenterShellProps,
} from "./vendor/charts/pie-center-shell";
export {
  DEFAULT_HOVER_OFFSET,
  PieChart,
  type PieChartProps,
} from "./vendor/charts/pie-chart";
export {
  defaultPieColors,
  type PieArcData,
  type PieContextValue,
  type PieData,
  PieProvider,
  pieCssVars,
  usePie,
  usePieHover,
  usePieStable,
} from "./vendor/charts/pie-context";
export {
  PieSlice,
  type PieSliceHoverEffect,
  type PieSliceProps,
} from "./vendor/charts/pie-slice";
export {
  PROFIT_LOSS_LEGEND_ITEMS,
  ProfitLossLegend,
  type ProfitLossLegendProps,
} from "./vendor/charts/profit-loss-legend";
export {
  ProfitLossLegendHoverProvider,
  useProfitLossLegendHover,
} from "./vendor/charts/profit-loss-legend-hover";
export {
  PROFIT_LOSS_NEGATIVE_COLOR,
  PROFIT_LOSS_POSITIVE_COLOR,
  PROFIT_LOSS_TOOLTIP_LABEL_FALLBACK,
  ProfitLossLine,
  type ProfitLossLineProps,
  profitLossColor,
  resolveProfitLossTooltipLabel,
} from "./vendor/charts/profit-loss-line";
export {
  type ProfitLossSegment,
  splitProfitLossSegments,
} from "./vendor/charts/profit-loss-segments";
export {
  extractProjectionLineConfigs,
  mergeProjectionXDomainMax,
  mergeProjectionYDomain,
  type ProjectionLineConfig,
} from "./vendor/charts/projection-config";
export {
  ProjectionLine,
  type ProjectionLineProps,
  type ProjectionStrokeStyle,
} from "./vendor/charts/projection-line";
export {
  ProjectionLineEndMarker,
  type ProjectionLineEndMarkerProps,
} from "./vendor/charts/projection-line-end-marker";
export {
  type BuildProjectionPathOptions,
  buildHorizontalTangentBezierPath,
  buildProjectionPath,
  computeProjectionAnchorTangentSlope,
  type ProjectionAutoMethod,
  type ProjectionCurveKind,
  type ProjectionMode,
  type ProjectionPathDensity,
  type ProjectionPoint,
  projectionDateExtents,
  projectionValueExtents,
} from "./vendor/charts/projection-utils";
export { RadarArea, type RadarAreaProps } from "./vendor/charts/radar-area";
export { RadarAxis, type RadarAxisProps } from "./vendor/charts/radar-axis";
export { RadarChart, type RadarChartProps } from "./vendor/charts/radar-chart";
export {
  defaultRadarColors,
  type RadarContextValue,
  type RadarData,
  type RadarMetric,
  RadarProvider,
  radarCssVars,
  useRadar,
  useRadarHover,
  useRadarStable,
} from "./vendor/charts/radar-context";
export { RadarGrid, type RadarGridProps } from "./vendor/charts/radar-grid";
export { RadarLabels, type RadarLabelsProps } from "./vendor/charts/radar-labels";
export {
  ReferenceArea,
  type ReferenceAreaProps,
  type ReferenceAreaStrokeStyle,
} from "./vendor/charts/reference-area";
export {
  computeReferenceAreaRect,
  type ReferenceAreaIfOverflow,
  type ReferenceAreaRect,
} from "./vendor/charts/reference-area-geometry";
export { Ring, type RingLineCap, type RingProps } from "./vendor/charts/ring";
export { RingCenter, type RingCenterProps } from "./vendor/charts/ring-center";
export { RingChart, type RingChartProps } from "./vendor/charts/ring-chart";
export {
  defaultRingColors,
  type RingContextValue,
  type RingData,
  RingProvider,
  ringCssVars,
  useRing,
  useRingHover,
  useRingStable,
} from "./vendor/charts/ring-context";
export {
  SankeyChart,
  type SankeyChartProps,
  type SankeyContextValue,
  type SankeyData,
  type SankeyLabelOrientation,
  SankeyLink,
  type SankeyLinkDatum,
  type SankeyLinkProps,
  SankeyNode,
  type SankeyNodeDatum,
  type SankeyNodeProps,
  SankeyProvider,
  SankeyTooltip,
  type SankeyTooltipData,
  type SankeyTooltipProps,
  sankeyCssVars,
  useSankey,
} from "./vendor/charts/sankey";
export { Scatter, type ScatterProps } from "./vendor/charts/scatter";
export { ScatterChart, type ScatterChartProps } from "./vendor/charts/scatter-chart";
export {
  SegmentBackground,
  type SegmentBackgroundProps,
  SegmentLineFrom,
  type SegmentLineProps,
  SegmentLineTo,
  type SegmentLineVariant,
} from "./vendor/charts/segment";
export { SeriesBar, type SeriesBarProps } from "./vendor/charts/series-bar";
export {
  SeriesMarkers,
  type SeriesMarkersProps,
} from "./vendor/charts/series-markers";
export {
  getSeriesMarkerVisualExtent,
  SeriesPointMarker,
  type SeriesPointMarkerProps,
  type SeriesPointMarkerStyle,
} from "./vendor/charts/series-point-marker";
export {
  StaticChartPreviewProvider,
  useStaticChartPreview,
} from "./vendor/charts/static-chart-preview-context";
export {
  type ArcDatum,
  type ArcGeometry,
  arcPath,
  buildArcs,
  buildRevealDelays,
  buildRevealSchedule,
  buildSunburstEnterTiming,
  centroidAngle,
  clockwiseFraction,
  defaultSunburstGrowPadding,
  type Focus,
  geomCentroidAngle,
  geomCentroidRadius,
  geometryFor,
  lerpGeometry,
  localProgress,
  ringOptions,
  type SunburstEnterTiming,
  type SunburstRevealSchedule,
  type SunburstSegmentEnterDelays,
  segmentRevealFromRingSweep,
  sumValues,
  transitionGeometry,
} from "./vendor/charts/sunburst";
export {
  SunburstBreadcrumb,
  type SunburstBreadcrumbItem,
  type SunburstBreadcrumbProps,
  useSunburstBreadcrumbItems,
} from "./vendor/charts/sunburst-breadcrumb";
export { SunburstCenter, type SunburstCenterProps } from "./vendor/charts/sunburst-center";
export { SunburstChart, type SunburstChartProps } from "./vendor/charts/sunburst-chart";
export {
  defaultSunburstColors,
  opacityForRelativeDepth,
  sunburstCssVars,
  useSunburstHover,
  useSunburstStable,
} from "./vendor/charts/sunburst-context";
export type { SunburstNode } from "./vendor/charts/sunburst-data";
export {
  SunburstHint,
  type SunburstHintContext,
  type SunburstHintProps,
} from "./vendor/charts/sunburst-hint";
export { SunburstLabels, type SunburstLabelsProps } from "./vendor/charts/sunburst-labels";
export { SunburstSegment, type SunburstSegmentProps } from "./vendor/charts/sunburst-segment";
export {
  ChartTooltip,
  type ChartTooltipProps,
  DateTicker,
  type DateTickerProps,
  type IndicatorWidth,
  TooltipBox,
  type TooltipBoxProps,
  TooltipContent,
  type TooltipContentProps,
  TooltipDot,
  type TooltipDotProps,
  TooltipIndicator,
  type TooltipIndicatorProps,
  type TooltipRow,
} from "./vendor/charts/tooltip";
export { useAnimatedYDomains } from "./vendor/charts/use-animated-y-domains";
export {
  type ChartSelection,
  useChartInteraction,
} from "./vendor/charts/use-chart-interaction";
export {
  PatternCircles,
  PatternHexagons,
  PatternLines,
  PatternWaves,
} from "./vendor/charts/visx-pattern";
export { XAxis, type XAxisProps } from "./vendor/charts/x-axis";
export { YAxis, type YAxisProps } from "./vendor/charts/y-axis";
export {
  DEFAULT_Y_AXIS_ID,
  getPrimaryYScale,
  type YAxisOrientation,
} from "./vendor/charts/y-axis-scales";
export {
  resolveYAxisTickCount,
  Y_AXIS_DEFAULT_TICK_COUNT,
  Y_AXIS_MAX_TICK_COUNT,
  Y_AXIS_MIN_TICK_COUNT,
} from "./vendor/charts/y-axis-ticks";
export {
  computeYDomainsByAxis,
  isLoadingChromePhase,
  isYDomainTweenPhase,
  mergeYDomainRecords,
  niceYDomain,
  shouldTweenYDomain,
  type YDomain,
} from "./vendor/charts/y-domain-utils";
export { rainChartRecipes, type RainChartRecipe } from "./recipes";
export { MatrixChart, type MatrixChartProps } from "./matrix/matrix-chart";
export { getMatrixDataIndex, getMatrixEncoding, type MatrixAxisItem, type MatrixCell, type MatrixLevel, type MatrixEncoding } from "./matrix/matrix-data";
export { NetworkChart, type NetworkChartProps, type NetworkChartVariant, type NetworkCategory, type NetworkRelation } from "./network/network-chart";
export { layoutNetwork, type NetworkNode, type NetworkEdge } from "./network/network-layout";

export {
  curveBasis,
  curveCatmullRom,
  curveLinear,
  curveMonotoneX,
  curveNatural,
  curveStep,
} from "@visx/curve";
