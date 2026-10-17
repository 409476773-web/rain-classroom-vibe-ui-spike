import { act, renderHook } from "@testing-library/react";
import { bisector } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { useLayoutEffect, useMemo } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { useChartInteraction } from "./vendor/charts/use-chart-interaction";
const data=[4,0,8].map((value,index)=>({date:new Date(2026,8,index+1),value}));
const lines=[{dataKey:"value",stroke:"var(--chart-1)",strokeWidth:2}];const margin={top:0,right:0,bottom:0,left:0};
const xAccessor=(point:Record<string,unknown>)=>point.date as Date;const bisectDate=bisector(xAccessor).left;
afterEach(()=>vi.unstubAllGlobals());

test("disabling interaction cancels a pending tooltip before it can commit",()=>{
  const frames=new Map<number,FrameRequestCallback>();let next=0;const commits:unknown[]=[];
  vi.stubGlobal("requestAnimationFrame",(callback:FrameRequestCallback)=>{frames.set(++next,callback);return next;});
  vi.stubGlobal("cancelAnimationFrame",(id:number)=>frames.delete(id));
  const view=renderHook(({canInteract})=>{
    const scales=useMemo(()=>{const xScale=scaleTime<number>().domain([data[0]!.date,data[2]!.date]).range([0,300]);const yScale=scaleLinear<number>().domain([0,10]).range([100,0]);return{xScale,yScale,yScales:{left:yScale}};},[]);
    const result=useChartInteraction({...scales,data,lines,margin,xAccessor,bisectDate,canInteract});
    useLayoutEffect(()=>{if(!canInteract)commits.push(result.tooltipData);});return result;
  },{initialProps:{canInteract:true}});
  const svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),group=document.createElementNS("http://www.w3.org/2000/svg","g");svg.appendChild(group);
  svg.getBoundingClientRect=()=>({x:0,y:0,left:0,top:0,width:300,height:100,right:300,bottom:100,toJSON:()=>({})});
  act(()=>view.result.current.interactionHandlers.onTouchStart?.({touches:[{clientX:150,clientY:80}],currentTarget:group,preventDefault:vi.fn()} as any));
  expect(frames.size).toBe(1);
  view.rerender({canInteract:false});
  act(()=>{for(const [id,callback] of [...frames]){frames.delete(id);callback(16);}});
  expect(view.result.current.tooltipData).toBeNull();expect(commits.every(point=>point===null)).toBe(true);expect(frames.size).toBe(0);
});
