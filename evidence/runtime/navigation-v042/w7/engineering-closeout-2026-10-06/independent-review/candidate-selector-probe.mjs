import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../../../../../..');
const {JSDOM}=await import(`${root}/node_modules/jsdom/lib/api.js`);
const summary=JSON.parse(readFileSync(`${root}/evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/summary.json`,'utf8'));
const diffPath=`evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-06/${summary.accountHoverCandidate.source}`;
const diff=readFileSync(`${root}/${diffPath}`,'utf8');
const added=diff.split('\n').find(line=>line.startsWith('+')&&!line.startsWith('+++')&&line.includes('.nv42-account'));
assert(added);const selector=added.slice(1).replace(/,$/,'');assert(selector.endsWith(':hover'));
// Only static scope/disabled eligibility is checked; no hover interaction is claimed.
const eligibility=selector.slice(0,-':hover'.length);
const dom=new JSDOM('<section class="rain-workspace nv42-r2"><div class="rain-workspace__region" data-region-id="global"><button id="enabled" class="nv42-account"></button><button id="native-disabled" class="nv42-account" disabled></button><button id="aria-disabled" class="nv42-account" aria-disabled="true"></button><fieldset disabled><button id="fieldset-disabled" class="nv42-account"></button></fieldset><span id="span" class="nv42-account"></span></div><div class="rain-workspace__region" data-region-id="context"><button id="other-region" class="nv42-account"></button></div></section><section class="rain-workspace nv43-workspace"><div class="rain-workspace__region" data-region-id="global"><button id="other-scope" class="nv42-account"></button></div></section>');
const results=[];for(const [id,expected] of [['enabled',true],['native-disabled',false],['aria-disabled',false],['fieldset-disabled',false],['span',false],['other-region',false],['other-scope',false]]){const actual=dom.window.document.getElementById(id).matches(eligibility);assert.equal(actual,expected);results.push({id,expected,actual,passed:true});}
console.log(JSON.stringify({scope:'candidate selector static eligibility only; no CSS cascade/render/hover/native-browser pass claim',diffPath,selector,results},null,2));
