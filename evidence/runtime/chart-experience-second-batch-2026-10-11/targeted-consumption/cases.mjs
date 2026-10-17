const defaults = [
 ['pie','pie-small'],['pie','pie-remove'],['ring','ring-zero-goal'],['ring','ring-over'],
 ['funnel','funnel-missing'],['funnel','funnel-growth'],['funnel','funnel-zero-entry'],['funnel','funnel-above-entry'],
 ['sankey','sankey-thin'],['sankey','sankey-zero-link'],
].map(([id,boundaryScenario])=>({name:`default-${boundaryScenario}`,kind:'default',family:id,settings:{id,recipe:'monochrome-blue',state:'normal',revision:0,boundaryScenario}}));
export const cases = [
 ...defaults,
 {name:'default-heatmap-missing',kind:'default',family:'heatmap',settings:{id:'heatmap',recipe:'monochrome-blue',state:'missing',revision:0}},
 {name:'default-matrix-12',kind:'default',family:'matrix',settings:{id:'matrix',recipe:'monochrome-blue',state:'normal',matrixSize:12,revision:0}},
 {name:'variant-pie-legend-small',kind:'variant',family:'pie',variantId:'pie-legend',settings:{boundaryScenario:'pie-small'}},
 {name:'variant-ring-legend-zero-goal',kind:'variant',family:'ring',variantId:'ring-legend',settings:{boundaryScenario:'ring-zero-goal'}},
 {name:'variant-heatmap-gradient',kind:'variant',family:'heatmap',variantId:'heatmap-gradient-legend',settings:{}},
 {name:'variant-heatmap-horizontal',kind:'variant',family:'heatmap',variantId:'heatmap-horizontal-scroll',settings:{}},
 {name:'variant-heatmap-current-missing',kind:'variant',family:'heatmap',variantId:'heatmap-default',settings:{}},
 {name:'china-guangdong-table',kind:'china',family:'china',settings:{provinceId:'440000',selectedId:'440100',state:'normal',revision:2,recipe:'monochrome-blue'}},
];
