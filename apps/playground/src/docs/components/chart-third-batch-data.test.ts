import { expect, test } from "vitest";
import { applyScatterBoundary, applyCandleBoundary, applyProfitLossBoundary, assertOHLC, makeTimeline, makeCandles, makeProfitLoss } from "./chart-data";

test("named boundaries preserve the original arrays and observations", () => {
  const scatter=makeTimeline(), candle=makeCandles(), profit=makeProfitLoss();
  expect(applyScatterBoundary(scatter,"normal")).toBe(scatter);
  expect(applyCandleBoundary(candle,"normal")).toBe(candle);
  expect(applyProfitLossBoundary(profit,"normal")).toBe(profit);
  const before=JSON.stringify([scatter,candle,profit]);
  applyScatterBoundary(scatter,"scatter-dense"); applyScatterBoundary(scatter,"scatter-overlap");
  applyCandleBoundary(candle,"candlestick-dense"); applyCandleBoundary(candle,"candlestick-flat");
  applyProfitLossBoundary(profit,"profit-loss-near-zero"); applyProfitLossBoundary(profit,"profit-loss-zero-run");
  expect(JSON.stringify([scatter,candle,profit])).toBe(before);
});

test("dense dates are unique ordered and every candle retains valid OHLC", () => {
  const scatter=applyScatterBoundary(makeTimeline(),"scatter-dense"), candles=applyCandleBoundary(makeCandles(),"candlestick-dense");
  for(const data of [scatter,candles]) {
    expect(data).toHaveLength(96);
    expect(new Set(data.map(point=>point.date.getTime())).size).toBe(96);
    expect(data.every((point,index)=>index===0 || point.date>data[index-1]!.date)).toBe(true);
  }
  candles.forEach(assertOHLC);
  expect(scatter.every(point=>[point.enrolled,point.completed,point.returned,point.answered,point.reviewed].every(value=>typeof value==="number"&&value>=0))).toBe(true);
});

test("overlap preserves all series and flat candles use exact equality", () => {
  const rows=applyScatterBoundary(makeTimeline(),"scatter-overlap");
  expect(rows.every(point=>point.completed===point.enrolled&&point.returned===point.enrolled&&point.rate===100)).toBe(true);
  const flat=applyCandleBoundary(makeCandles(),"candlestick-flat");
  expect(flat.every(point=>point.open===point.close)).toBe(true); flat.forEach(assertOHLC);
});

test("near-zero readings retain both signs and continuous zero observations", () => {
  const near=applyProfitLossBoundary(makeProfitLoss(),"profit-loss-near-zero");
  expect(near.map(point=>point.value)).toEqual([-.004,-.001,0,.001,.004,0,-.002,.003]);
  const zero=applyProfitLossBoundary(makeProfitLoss(),"profit-loss-zero-run");
  expect(zero.map(point=>point.value)).toEqual([-2,0,0,3,0,0,-1,0]);
});

test("empty boundaries remain empty", () => {
  expect(applyScatterBoundary([],"scatter-dense")).toEqual([]);
  expect(applyCandleBoundary([],"candlestick-flat")).toEqual([]);
  expect(applyProfitLossBoundary([],"profit-loss-near-zero")).toEqual([]);
});
