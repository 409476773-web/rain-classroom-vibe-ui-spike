/** Named chart-local recipes. Colors are owned by styles.css, not global Tokens. */
export const rainChartRecipes = {
  "trend-soft": { label: "清晰线与轻面积", semantics: "trend", reference: "P03", areaOpacity: .24, miniOpacity: .2 },
  "category-near": { label: "蓝紫近邻", semantics: "category", reference: "P01/P03" },
  "category-wide": { label: "多色类别", semantics: "category", reference: "P01/P02" },
  "category-solid": { label: "协调实色", semantics: "category", reference: "P04" },
  "bar-gradient": { label: "同色渐变柱", semantics: "category", reference: "P01", topOpacity: .95, bottomOpacity: .4 },
  "bar-fade": { label: "圆头渐隐柱", semantics: "category", reference: "P02", topOpacity: 1, bottomOpacity: 0 },
  intensity: { label: "连续强度色阶", semantics: "intensity", reference: "P05" },
  flow: { label: "来源到目标渐变", semantics: "flow", reference: "P07" },
  sign: { label: "正负与涨跌", semantics: "sign", reference: "Rain local sign roles" },
} as const;
export type RainChartRecipe = keyof typeof rainChartRecipes;
