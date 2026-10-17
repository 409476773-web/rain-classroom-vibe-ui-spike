export type TimeText = { hour: string; minute: string };
export type TimeValue = { hour: number; minute: number };

const pad = (value: number) => String(value).padStart(2, "0");
export const validDate = (value: unknown): value is Date => value instanceof Date && Number.isFinite(value.getTime());

export function localDay(date: Date): Date {
  if (!validDate(date)) throw new Error("DatePicker requires a valid date.");
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function dateText(date: Date): string {
  if (!validDate(date)) throw new Error("DatePicker requires a valid date.");
  return `${String(date.getFullYear()).padStart(4, "0")}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function readDate(text: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const [year, month, day] = text.split("-").map(Number) as [number, number, number];
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const result = new Date(0);
  result.setHours(0, 0, 0, 0);
  result.setFullYear(year, month - 1, day);
  return result.getFullYear() === year && result.getMonth() === month - 1 && result.getDate() === day ? result : null;
}

export function readTime(text: TimeText): TimeValue | null {
  if (!/^\d{1,2}$/.test(text.hour) || !/^\d{1,2}$/.test(text.minute)) return null;
  const hour = Number(text.hour), minute = Number(text.minute);
  return hour <= 23 && minute <= 59 ? { hour, minute } : null;
}

export function combineDate(date: Date, time: TimeValue): Date | null {
  if (!validDate(date) || !Number.isInteger(time.hour) || time.hour < 0 || time.hour > 23
    || !Number.isInteger(time.minute) || time.minute < 0 || time.minute > 59) return null;
  const result = new Date(date);
  result.setHours(time.hour, time.minute, 0, 0);
  return result.getFullYear() === date.getFullYear() && result.getMonth() === date.getMonth() && result.getDate() === date.getDate()
    && result.getHours() === time.hour && result.getMinutes() === time.minute ? result : null;
}

export function readEndpoint(date: string, time?: TimeText): Date | null {
  const day = readDate(date);
  if (!day || time === undefined) return day;
  const parsed = readTime(time);
  return parsed ? combineDate(day, parsed) : null;
}

export function dateTimeText(date: Date, showTime = true): string {
  return `${dateText(date)}${showTime ? ` ${pad(date.getHours())}:${pad(date.getMinutes())}` : ""}`;
}

export function nextDay(date: Date): Date {
  const result = localDay(date);
  result.setDate(result.getDate() + 1);
  return result;
}

export function durationText(minutes: number): string {
  if (!Number.isInteger(minutes) || minutes < 0) throw new Error("DatePicker duration requires finite non-negative integer minutes.");
  const hours = Math.floor(minutes / 60), remaining = minutes % 60;
  return [hours ? `${hours} 小时` : "", remaining || !hours ? `${remaining} 分钟` : ""].filter(Boolean).join(" ");
}
