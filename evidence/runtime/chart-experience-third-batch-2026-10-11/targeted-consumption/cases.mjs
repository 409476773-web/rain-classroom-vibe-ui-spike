import {readFileSync} from 'node:fs';
const captured=JSON.parse(readFileSync(new URL('./live-captured.json',import.meta.url),'utf8'));
const snapshot=id=>captured.captured.find(item=>item.id===id);
const recipe=id=>readFileSync(new URL(`./${id}-actual-main.tsx`,import.meta.url),'utf8').match(/data-recipe="([^"]+)"/)[1];
const defaults=[
 ['scatter','scatter-dense'],['scatter','scatter-overlap'],
 ['profit-loss','profit-loss-near-zero'],['profit-loss','profit-loss-zero-run'],
 ['candlestick','candlestick-dense'],['candlestick','candlestick-flat'],
].map(([id,boundaryScenario])=>({name:`default-${boundaryScenario}`,kind:'default',family:id,settings:{id,recipe:'monochrome-blue',state:'normal',revision:0,boundaryScenario,...id==='scatter'?{seriesCount:5}:{}}}));
export const cases=[
 ...defaults,
 {name:'default-live-paused',kind:'default',family:'live-line',recipe:recipe('default'),actualCaptureId:'default',settings:{id:'live-line',recipe:recipe('default'),state:'normal',revision:0,liveSettings:snapshot('default').settings}},
 {name:'variant-scatter-dual-overlap',kind:'variant',family:'scatter',variantId:'scatter-dual-y-axis',settings:{boundaryScenario:'scatter-overlap'}},
 {name:'variant-scatter-small-dense',kind:'variant',family:'scatter',variantId:'scatter-small-dots',settings:{boundaryScenario:'scatter-dense'}},
 {name:'variant-profit-loss-near-zero',kind:'variant',family:'profit-loss',variantId:'line-profit-loss',settings:{boundaryScenario:'profit-loss-near-zero'}},
 {name:'variant-candlestick-pattern-flat',kind:'variant',family:'candlestick',variantId:'candlestick-pattern',settings:{boundaryScenario:'candlestick-flat'}},
 {name:'variant-candlestick-solid-dense',kind:'variant',family:'candlestick',variantId:'candlestick-solid-colors',settings:{boundaryScenario:'candlestick-dense'}},
 {name:'variant-candlestick-invalid',kind:'variant',family:'candlestick',variantId:'candlestick-solid-colors',settings:{state:'invalid'}},
 {name:'variant-live-paused',kind:'variant',family:'live-line',variantId:'live-line-default',recipe:recipe('live-line-default'),actualCaptureId:'live-line-default',settings:snapshot('live-line-default').settings},
];
