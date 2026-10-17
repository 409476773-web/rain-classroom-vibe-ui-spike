import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {build} from 'vite';
const workspace=process.cwd(),evidence=dirname(fileURLToPath(import.meta.url)),host=mkdtempSync('/private/tmp/rain-chart-ssr-preflight-');
const hash=value=>createHash('sha256').update(value).digest('hex');
const sourceInputs=['packages/ui/src/charts/index.ts','packages/ui/src/charts/data-bar.tsx','packages/ui/src/charts/vendor/charts/line-chart.tsx','packages/ui/src/charts/vendor/charts/live-line-chart.tsx','apps/playground/src/docs/components/chart-examples.tsx','apps/playground/src/docs/components/chart-example-source.tsx'];
const facts={status:'running',host,scope:'Preflight Vite-to-Node SSR representative rendering using current canonical sources and existing workspace dependencies; not independent installation or all-framework SSR/hydration support',sources:sourceInputs.map(path=>({path,sha256:hash(readFileSync(join(workspace,path)))})),serverGlobals:'No window/document/ResizeObserver shim',aliases:'Explicit preflight workspace-source/tool dependencies; independent final consumer will use installed package exports without aliases',observations:[]};
const source=`import {createElement} from 'react';
import {renderToString} from 'react-dom/server';
import {DataBar,LineChart,Line,LiveLineChart,LiveLine} from '@rain-next/ui/charts';
import {ChartExample} from ${JSON.stringify(join(workspace,'apps/playground/src/docs/components/chart-examples.tsx'))};
const dated=[{date:new Date('2026-09-01T00:00:00Z'),value:2},{date:new Date('2026-09-02T00:00:00Z'),value:4}];
const samples=[
 ['public-data-bar',createElement(DataBar,{value:25,maxValue:100,label:'人数',valueText:'25人'})],
 ['public-line',createElement(LineChart,{data:dated,style:{width:480,height:300}},createElement(Line,{dataKey:'value',animate:false}))],
 ['public-live',createElement(LiveLineChart,{data:[{time:1788192000,value:25}],value:25,paused:true,running:false,frozenNow:1788192000000,style:{width:480,height:300}},createElement(LiveLine,{dataKey:'value'}))],
 ['default-example-line',createElement(ChartExample,{id:'line',recipe:'monochrome-blue',reduced:true})],
 ['default-example-live',createElement(ChartExample,{id:'live-line',recipe:'monochrome-blue',reduced:true})],
];
export const observations=samples.map(([name,node])=>{try{const html=renderToString(node);return{name,status:'rendered',html,svgCount:(html.match(/<svg/g)||[]).length,rawTable:html.includes('<table'),byteLength:html.length};}catch(error){return{name,status:'rejected',error:String(error)}}});
`;
writeFileSync(join(host,'package.json'),JSON.stringify({private:true,type:'module'}));writeFileSync(join(host,'entry.ts'),source);
try{
 await build({root:host,configFile:false,oxc:{jsx:{runtime:'automatic'}},resolve:{alias:{'@rain-next/ui':join(workspace,'packages/ui/src'),'@rain-next/foundations':join(workspace,'packages/foundations/src'),'react':join(workspace,'node_modules/react'),'react-dom':join(workspace,'node_modules/react-dom')}},ssr:{noExternal:true},build:{ssr:join(host,'entry.ts'),outDir:'dist',minify:false,rolldownOptions:{output:{entryFileNames:'probe.mjs'}}}});
 facts.observations=(await import(pathToFileURL(join(host,'dist/probe.mjs')).href)).observations;
 const find=name=>facts.observations.find(row=>row.name===name);
 assert.equal(find('public-data-bar').status,'rendered');assert(find('public-data-bar').html.includes('aria-label="人数，25人"'));
 assert.equal(find('public-line').status,'rendered');assert.equal(find('public-line').svgCount,0);
 assert.equal(find('public-live').status,'rendered');assert.equal(find('public-live').svgCount,0);
 assert.equal(find('default-example-line').status,'rendered');assert.equal(find('default-example-line').rawTable,true);
 assert.equal(find('default-example-live').status,'rejected');assert(find('default-example-live').error.includes('document is not defined'));
 facts.sourceChanges=facts.sources.filter(row=>hash(readFileSync(join(workspace,row.path)))!==row.sha256).map(row=>row.path);assert.deepEqual(facts.sourceChanges,[]);facts.status='passed-scoped-boundary-probe';console.log(JSON.stringify({status:facts.status,observations:facts.observations.map(({html,...row})=>row)},null,2));
}catch(error){facts.status='failed';facts.error=String(error);throw error;}finally{writeFileSync(join(evidence,'ssr-preflight-facts.json'),JSON.stringify(facts,null,2));}
