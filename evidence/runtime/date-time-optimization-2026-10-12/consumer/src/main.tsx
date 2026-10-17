import { useState } from "react";
import { createRoot } from "react-dom/client";
import { DensityProvider } from "@rain-next/foundations";
import { Button, Calendar, Combobox, DatePicker, FormItem, Input, NativeSelect, NativeSelectOption, Slider, Textarea, type DatePickerPreset, type DateRange } from "@rain-next/ui";
import "./styles.css";
const overnightPresets: readonly DatePickerPreset<DateRange>[] = [{ label:"明晚跨午夜", getValue: now => ({ from:new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,23),to:new Date(now.getFullYear(),now.getMonth(),now.getDate()+2,1) }) }];
const dateTimeText = (value: Date) => value.toLocaleString("zh-CN", {year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false});
function App() {
  const [date,setDate]=useState<Date | undefined>(new Date(2026,9,12));
  const [text,setText]=useState("填写课堂说明");
  const [timeRange,setTimeRange]=useState<DateRange | null>({from:new Date(2026,9,12,23),to:new Date(2026,9,13,1)});
  return <DensityProvider density="default"><main>
    <header><h1>G5 · 独立源码消费</h1><p>本地候选组件；Label / Field 复用 FormItem，Input Group 复用 Input / Textarea。</p></header>
    <section><h2>Native Select</h2><FormItem label="课程" required help="浏览器原生选择和表单提交"><NativeSelect name="course" defaultValue="rain"><NativeSelectOption value="rain">雨课堂</NativeSelectOption><NativeSelectOption value="mooc">慕课</NativeSelectOption></NativeSelect></FormItem></section>
    <section><h2>Combobox</h2><FormItem label="课程名称" help="可搜索或输入自定义值"><Combobox allowCustomValue options={[{value:"rain",label:"雨课堂"},{value:"mooc",label:"慕课"}]} /></FormItem></section>
    <section><h2>Slider</h2><FormItem label="进度"><Slider defaultValue={36} /></FormItem><FormItem label="范围"><Slider range defaultValue={[20,80]} thumbLabels={["起点","终点"]} /></FormItem></section>
    <section><h2>Calendar</h2><Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026,9)} /></section>
    <section><h2>Date Picker</h2><FormItem label="单日"><DatePicker defaultValue={new Date(2026,9,12)} /></FormItem><FormItem label="单日和时间"><DatePicker showTime defaultValue={new Date(2026,9,12,9,5)} /></FormItem><FormItem label="日期范围"><DatePicker mode="range" defaultValue={{from:new Date(2026,9,12),to:new Date(2026,9,15)}} /></FormItem><FormItem label="日期时间范围"><DatePicker mode="range" showTime value={timeRange} onValueChange={setTimeRange} minDurationMinutes={1} durationPresets={[30,60,90,120]} presets={overnightPresets} /></FormItem><p role="status" aria-label="独立消费时间段">{timeRange ? dateTimeText(timeRange.from)+" 至 "+dateTimeText(timeRange.to)+"；时长 "+((timeRange.to.getTime()-timeRange.from.getTime())/60000)+" 分钟" : "未选择时间段"}</p></section>
    <section><h2>Label / Field / Input Group</h2><FormItem label="链接" required help="标签、帮助和验证仍由 FormItem 负责"><Input prefixText="https://" suffixText=".cn" placeholder="rain" /></FormItem><FormItem label="课堂说明"><Textarea value={text} onValueChange={setText} blockStart={<Button size="small" onClick={()=>setText(previous=>"课堂目标："+previous)}>添加标题</Button>} blockEnd={<Button size="small" onClick={()=>setText("")}>清空说明</Button>} /></FormItem><FormItem label="只读说明"><Textarea readOnly defaultValue="只读值" blockStart={<span>只读内容</span>} blockEndChangesValue={false} blockEnd={<Button size="small" onClick={()=>navigator.clipboard?.writeText("只读值")}>复制</Button>} /></FormItem></section>
  </main></DensityProvider>;
}
createRoot(document.getElementById("root")!).render(<App />);
