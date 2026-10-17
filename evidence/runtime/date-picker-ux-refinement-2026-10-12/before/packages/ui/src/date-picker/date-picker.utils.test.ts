import { afterEach, expect, it, vi } from "vitest";
import { combineDate, dateText, dateTimeText, durationText, localDay, nextDay, readDate, readEndpoint, readTime, validDate } from "./date-picker.utils";

afterEach(() => vi.unstubAllEnvs());

it("accepts strict local dates, including leap days and years below 100", () => {
  expect(dateText(readDate("2028-02-29")!)).toBe("2028-02-29");
  expect(readDate("0099-01-02")?.getFullYear()).toBe(99);
  for (const value of ["", "2026-02-30", "2026-02-29", "2026-13-01", "2026-01-00", "0000-01-01", "2026-2-03", "2026/02/03", " 2026-02-03", "2026-02-03 ", "2026-02-03T09:00"]) {
    expect(readDate(value), value).toBeNull();
  }
});

it("distinguishes empty and invalid time segments from zero", () => {
  expect(readTime({ hour: "9", minute: "5" })).toEqual({ hour: 9, minute: 5 });
  expect(readTime({ hour: "00", minute: "00" })).toEqual({ hour: 0, minute: 0 });
  expect(readTime({ hour: "23", minute: "59" })).toEqual({ hour: 23, minute: 59 });
  for (const value of [
    { hour: "", minute: "0" }, { hour: "9", minute: "" },
    { hour: "24", minute: "00" }, { hour: "12", minute: "60" },
    { hour: "-1", minute: "00" }, { hour: "9.5", minute: "00" },
    { hour: "009", minute: "00" }, { hour: "09:30", minute: "00" },
    { hour: " 9", minute: "00" }, { hour: "９", minute: "00" },
  ]) expect(readTime(value), JSON.stringify(value)).toBeNull();
});

it("combines local calendar fields without mutating the date or retaining hidden seconds", () => {
  const date = new Date(2026, 9, 20, 12, 34, 56, 789);
  const timestamp = date.getTime();
  expect(combineDate(date, { hour: 9, minute: 5 })).toEqual(new Date(2026, 9, 20, 9, 5));
  expect(date.getTime()).toBe(timestamp);
  expect(combineDate(date, { hour: 24, minute: 0 })).toBeNull();
  expect(combineDate(date, { hour: 9, minute: Number.NaN })).toBeNull();
  expect(combineDate(new Date(Number.NaN), { hour: 9, minute: 0 })).toBeNull();
  expect(readEndpoint("2026-10-20", { hour: "23", minute: "59" })).toEqual(new Date(2026, 9, 20, 23, 59));
  expect(readEndpoint("2026-10-20")).toEqual(new Date(2026, 9, 20));
  expect(readEndpoint("2026-02-30", { hour: "09", minute: "00" })).toBeNull();
  expect(readEndpoint("2026-10-20", { hour: "09", minute: "" })).toBeNull();
});

it("rejects local times that normalize across a daylight saving gap", () => {
  vi.stubEnv("TZ", "America/New_York");
  expect(readEndpoint("2026-03-08", { hour: "02", minute: "30" })).toBeNull();
  expect(dateTimeText(readEndpoint("2026-03-08", { hour: "03", minute: "30" })!)).toBe("2026-03-08 03:30");
});

it("advances the calendar day across month, year, leap day and daylight saving boundaries", () => {
  expect(dateText(nextDay(readDate("2026-12-31")!))).toBe("2027-01-01");
  expect(dateText(nextDay(readDate("2028-02-28")!))).toBe("2028-02-29");
  expect(dateText(nextDay(readDate("2028-02-29")!))).toBe("2028-03-01");
  vi.stubEnv("TZ", "America/New_York");
  const date = readDate("2026-03-08")!;
  expect(dateText(nextDay(date))).toBe("2026-03-09");
  expect((nextDay(date).getTime() - date.getTime()) / 3600000).toBe(23);
});

it("formats local minutes and elapsed durations without implying calendar days", () => {
  const date = new Date(2026, 9, 20, 9, 5, 20);
  expect(localDay(date)).toEqual(new Date(2026, 9, 20));
  expect(dateTimeText(date)).toBe("2026-10-20 09:05");
  expect(dateTimeText(date, false)).toBe("2026-10-20");
  expect([0, 30, 60, 90, 1440].map(durationText)).toEqual(["0 分钟", "30 分钟", "1 小时", "1 小时 30 分钟", "24 小时"]);
  expect(validDate(date)).toBe(true);
  for (const value of [null, "2026-10-20", new Date(Number.NaN)]) expect(validDate(value)).toBe(false);
  expect(() => dateText(new Date(Number.NaN))).toThrow();
  expect(() => localDay(new Date(Number.NaN))).toThrow();
  expect(() => nextDay(new Date(Number.NaN))).toThrow();
  for (const value of [-1, 1.5, Number.NaN, Infinity]) expect(() => durationText(value)).toThrow();
});
