import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../../../../../..');
const {parseSync}=await import(`${root}/node_modules/vite/dist/node/index.js`);
const sha=v=>createHash('sha256').update(v).digest('hex');
const expected={x:340,y:760,width:938,height:538};
function mockGeometry({windowX,windowY,ancestorX,ancestorY,moveX=0,moveY=0}){
 const window={scrollX:windowX,scrollY:windowY};
 const rootElement={scrollLeft:windowX,scrollTop:windowY,parentElement:null};
 const body={scrollLeft:0,scrollTop:0,parentElement:rootElement};
 const gallery={scrollLeft:ancestorX,scrollTop:ancestorY,parentElement:body};
 const element={parentElement:gallery,getBoundingClientRect(){return {x:expected.x+moveX-windowX-ancestorX,y:expected.y+moveY-windowY-ancestorY,width:expected.width,height:expected.height};}};
 return {window,document:{scrollingElement:rootElement},element};
}
const sources=['tests/e2e/navigation-v042-w5.spec.ts','tests/e2e/navigation-v042-w7.spec.ts'].map(file=>{
 const source=readFileSync(`${root}/${file}`,'utf8');const p=parseSync(file,source).program;
 const shape=p.body.flatMap(node=>node.type==='VariableDeclaration'?node.declarations:[]).find(node=>node.id?.name==='shape');
 const callback=shape.init.body.arguments[0];
 const fnSource=source.slice(callback.start,callback.end);
 const run=state=>new Function('window','document',`return (${fnSource});`)(state.window,state.document)(state.element);
 const before=run(mockGeometry({windowX:40,windowY:80,ancestorX:0,ancestorY:0}));
 const after=run(mockGeometry({windowX:50,windowY:200,ancestorX:60,ancestorY:180}));
 const moved=run(mockGeometry({windowX:50,windowY:200,ancestorX:60,ancestorY:180,moveX:7,moveY:11}));
 assert.deepEqual(before,expected);assert.deepEqual([before.width,before.height],[after.width,after.height]);
 const ancestorScrollCovered=JSON.stringify(before)===JSON.stringify(after);
 if(file.includes('w7')){assert(ancestorScrollCovered);assert.deepEqual(moved,{...expected,x:347,y:771});assert.notDeepEqual(moved,before);}
 return {file,sourceSha256:sha(source),callback:fnSource,before,after,moved,ancestorScrollCovered,positionAssertionsRetained:source.includes('expect(await shape(content)).toEqual(before)')||source.includes("expect(await shape(root.locator('.nv5-group-detail'))).toEqual(main)")};
});
const legacyState=mockGeometry({windowX:50,windowY:200,ancestorX:60,ancestorY:180});
const legacyRect=legacyState.element.getBoundingClientRect();
const legacyWindowOnly={x:legacyRect.x+legacyState.window.scrollX,y:legacyRect.y+legacyState.window.scrollY,width:legacyRect.width,height:legacyRect.height};
assert.notDeepEqual(legacyWindowOnly,expected);
console.log(JSON.stringify({legacyWindowOnlyCounterexample:{before:expected,after:legacyWindowOnly,missedAncestorOffsets:{scrollLeft:60,scrollTop:180}},recordedAt:new Date().toISOString(),scope:'actual extracted driver callbacks; simulated nested gallery/window scrolling, no browser/native OS',sources,windowRootDoubleCountCounterexample:{correct:expected,ifDocumentScrollingElementNotSkipped:{...expected,x:390,y:960}},genuineLayoutMovementStillDetected:true},null,2));
