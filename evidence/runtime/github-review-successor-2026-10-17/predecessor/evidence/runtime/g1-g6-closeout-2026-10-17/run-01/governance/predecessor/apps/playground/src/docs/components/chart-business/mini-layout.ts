export type MiniSize = "compact" | "comfortable";

// Page-local geometry; these sizes do not change shared chart or Foundation defaults.
export const MINI_LAYOUT = {
  compact: {
    plot: { width: 96, height: 32, padding: 2 },
    pie: { width: 32, height: 32, innerRadius: 10, hoverOffset: 1 },
    ring: { width: 32, height: 32, padding: 2, baseInnerRadius: 11, strokeWidth: 3 },
    arc: { width: 40, height: 30, canvasSize: 40, padding: 2, baseInnerRadius: 15, strokeWidth: 3, startAngle: -5 * Math.PI / 8, endAngle: 5 * Math.PI / 8 },
    bar: { width: 120, thickness: 6, canvasHeight: 10 },
    lineWidth: 1.5,
    readingGap: 8,
  },
  comfortable: {
    plot: { width: 128, height: 48, padding: 3 },
    pie: { width: 56, height: 56, innerRadius: 19, hoverOffset: 1 },
    ring: { width: 64, height: 64, padding: 2, baseInnerRadius: 25, strokeWidth: 5 },
    arc: { width: 72, height: 54, canvasSize: 72, padding: 4, baseInnerRadius: 28, strokeWidth: 4, startAngle: -5 * Math.PI / 8, endAngle: 5 * Math.PI / 8 },
    bar: { width: 160, thickness: 8, canvasHeight: 12 },
    lineWidth: 2,
    readingGap: 12,
  },
} as const;
