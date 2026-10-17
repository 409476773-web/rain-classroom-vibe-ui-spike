import { useEffect, useState } from "react";

export type ChartPointReadingField = { key: string; label: string; unit: string };
type DatedPoint = Record<string, unknown> & { date: Date };

function dateName(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function reading(value: unknown, unit: string) {
  if (typeof value !== "string" && (typeof value !== "number" || !Number.isFinite(value))) return "缺测";
  return `${String(value)}${unit ? ` ${unit}` : ""}`;
}

/** Private example reader: a date identifies a reading independently of its array position. */
export function ChartPointReading({ data, fields }: {
  data: readonly DatedPoint[];
  fields: readonly ChartPointReadingField[];
}) {
  const [selectedDate, setSelectedDate] = useState<number | null>(() => data[0]?.date.getTime() ?? null);
  const current = data.find(point => point.date.getTime() === selectedDate);
  useEffect(() => {
    if (selectedDate !== null && !current) setSelectedDate(null);
  }, [current, selectedDate]);

  return <div data-point-reading>
    <label className="rain-chart-example-control">读取日期 <select aria-label="读取日期" disabled={data.length === 0}
      value={current ? String(selectedDate) : ""} onChange={event => setSelectedDate(event.target.value === "" ? null : Number(event.target.value))}>
      <option value="">选择日期</option>
      {data.map(point => <option key={point.date.getTime()} value={String(point.date.getTime())}>{dateName(point.date)}</option>)}
    </select></label>
    <p className="rain-chart-note" role="status" aria-live="polite" aria-atomic="true" data-point-reading-date={current?.date.toISOString()}>
      {current ? `${dateName(current.date)} · ${fields.map(field => `${field.label} ${reading(current[field.key], field.unit)}`).join(" · ")}`
        : data.length === 0 ? "当前没有可读日期" : "请选择读取日期"}
    </p>
  </div>;
}
