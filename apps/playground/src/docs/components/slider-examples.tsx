import { useId, useRef, useState } from "react";
import { Button, InputNumber, Slider, type SliderRange } from "@rain-next/ui";
import { DocCode, DocExample } from "./component-doc";
import "./slider-examples.css";

const scoreMarks = [{ value: 0, label: "0" }, { value: 60, label: "默认 60" }, { value: 100, label: "100" }];
const scalarExamples = {
  threshold: { label: "及格线", inputLabel: "精确及格线", unit: "分", initial: 60, min: 0, max: 100, step: 1, precision: 0, marks: scoreMarks, help: "调整后保存设置。" },
  volume: { label: "音量", inputLabel: "", unit: "%", initial: 60, min: 0, max: 100, step: 1, precision: 0, marks: [{ value: 0, label: "静音" }, { value: 100, label: "最大" }], help: "即时生效。" },
  speed: { label: "播放速度", inputLabel: "精确播放速度", unit: "倍", initial: 1.25, min: 0.5, max: 2, step: 0.05, precision: 2, marks: [{ value: 0.5, label: "0.5" }, { value: 1, label: "正常速度 1" }, { value: 2, label: "2" }], help: "正常速度为 1 倍，调整后即时生效。" },
};

function validStep(value: number | null, min: number, max: number, step: number): value is number {
  return value !== null && value >= min && value <= max && Math.abs((value - min) / step - Math.round((value - min) / step)) < 1e-8;
}

function ScalarExample({ kind }: { kind: keyof typeof scalarExamples }) {
  const config = scalarExamples[kind], id = useId();
  const [value, setValue] = useState(config.initial), [draft, setDraft] = useState<number | null>(config.initial);
  const [inputValid, setInputValid] = useState(true), [saved, setSaved] = useState<number | null>(null);
  const format = (next: number) => String(next) + (config.unit === "%" ? "%" : " " + config.unit);
  const stepValid = validStep(draft, config.min, config.max, config.step);
  const stepError = inputValid && draft !== null && !stepValid ? "请按 " + config.step + " 的步长调整" : "";
  return <form className={kind === "threshold" ? "g5-panel slider-example slider-example--field" : "slider-example slider-example--parameter"} data-kind={kind} aria-label={config.label + "设置"} onSubmit={event => {
    event.preventDefault();
    if (inputValid && stepValid) setSaved(draft);
  }}>
    <div className="slider-example__heading">
      <label id={id + "-label"} htmlFor={kind === "volume" ? undefined : id + "-input"}>{config.label}</label>
      {kind === "volume" ? <output aria-label="当前音量">{format(value)}</output> :
        <div className="slider-example__precise"><InputNumber id={id + "-input"} aria-label={config.inputLabel}
          aria-describedby={stepError ? id + "-step" : undefined} value={draft} required
          min={config.min} max={config.max} step={config.step} precision={config.precision} suffixText={config.unit}
          status={stepError ? "error" : "default"} controls={false}
          onValidityChange={next => setInputValid(next.valid)}
          onValueChange={next => {
            setDraft(next);
            if (validStep(next, config.min, config.max, config.step)) setValue(next);
          }} />
          {stepError && <p className="slider-example__error" id={id + "-step"}>{stepError}</p>}
        </div>}
    </div>
    <Slider aria-labelledby={id + "-label"} aria-describedby={id + "-help"} value={value}
      min={config.min} max={config.max} step={config.step} marks={config.marks} formatValue={format}
      onValueChange={next => { setValue(next); setDraft(next); }} />
    <p className="slider-example__help" id={id + "-help"}>{kind !== "volume" && (!inputValid || !stepValid) ? "输入尚未应用，当前仍为 " + format(value) + "。" : config.help}</p>
    {kind === "threshold" && <div className="slider-example__footer">
      <p role="status" aria-label="及格线保存结果">{saved === null ? "尚未保存" : inputValid && draft === saved ? "已保存及格线：" + format(saved) : "当前修改未保存；上次保存：" + format(saved)}</p>
      <Button type="submit" variant="primary" disabled={!inputValid || !stepValid || saved === draft}>保存及格线</Button>
    </div>}
    {kind === "volume" && <div className="slider-example__footer"><Button variant="text" aria-label="恢复默认音量"
      onClick={() => { setValue(config.initial); setDraft(config.initial); }}>重置</Button></div>}
  </form>;
}

function RangeExample() {
  const id = useId();
  const [range, setRange] = useState<SliderRange>([40, 90]), [drafts, setDrafts] = useState<readonly [number | null, number | null]>([40, 90]);
  const [applied, setApplied] = useState<SliderRange>([40, 90]);
  const [inputValid, setInputValid] = useState<readonly [boolean, boolean]>([true, true]);
  const [presetRevision, setPresetRevision] = useState(0);
  const changedThumb = useRef<number | null>(null);
  function update(index: number, next: number | null) {
    setDrafts(current => index ? [current[0], next] : [next, current[1]]);
    if (validStep(next, 0, 100, 1) && (index ? next >= range[0] : next <= range[1])) {
      setRange(current => index ? [current[0], next] : [next, current[1]]);
    }
  }
  function commit(index: number, next: number | null) {
    if (!validStep(next, 0, 100, 1) || inputValid.some((valid, endpoint) => endpoint !== index && !valid)
      || drafts.some((draft, endpoint) => endpoint !== index && draft !== range[endpoint])) return;
    const candidate: SliderRange = index ? [range[0], next] : [next, range[1]];
    if (candidate[0] <= candidate[1]) { setRange(candidate); setApplied(candidate); }
  }
  function commitSlider(next: SliderRange) {
    const index = changedThumb.current;
    if (index !== null && inputValid[1 - index] && drafts[1 - index] === next[1 - index]) setApplied(next);
    changedThumb.current = null;
  }
  // Reset also discards raw text whose last numeric value never changed.
  function load(next: SliderRange) { setRange(next); setDrafts(next); setApplied(next); setPresetRevision(current => current + 1); }
  const invalidDraft = inputValid.some(valid => !valid) || drafts.some((draft, index) => draft !== range[index]);
  const pending = range.some((value, index) => value !== applied[index]);
  return <div className="g5-panel slider-example slider-example--range">
    <p className="slider-example__label" id={id + "-label"}>成绩区间</p>
    <div className="slider-example__range-inputs">
      {["成绩下限", "成绩上限"].map((label, index) => {
        const draft = drafts[index];
        const conflict = validStep(draft ?? null, 0, 100, 1) && (index ? draft! < range[0] : draft! > range[1]);
        const error = conflict ? index ? "上限不能低于下限" : "下限不能高于上限" : "";
        return <div className="slider-example__endpoint" key={label + presetRevision}>
          <label htmlFor={id + "-" + index}>{index ? "上限" : "下限"}</label>
          <InputNumber id={id + "-" + index} aria-label={label} value={draft} min={0} max={100} precision={0} required
            suffixText="分" controls={false} status={error ? "error" : "default"}
            aria-describedby={error ? id + "-error-" + index : undefined}
            onValidityChange={next => setInputValid(current => index ? [current[0], next.valid] : [next.valid, current[1]])}
            onValueChange={next => update(index, next)} onValueCommit={next => commit(index, next)} />
          {error && <p className="slider-example__error" id={id + "-error-" + index}>{error}</p>}
        </div>;
      })}
    </div>
    <Slider range aria-labelledby={id + "-label"} value={range} thumbLabels={["成绩下限滑钮", "成绩上限滑钮"]}
      marks={[{ value: 0, label: "0" }, { value: 100, label: "100" }]} formatValue={value => String(value) + " 分"}
      onValueChange={(next, details) => {
        const index = details.activeThumbIndex;
        changedThumb.current = index;
        setRange(next);
        setDrafts(current => index ? [current[0], next[1]] : [next[0], current[1]]);
      }} onValueCommitted={commitSlider} />
    <div className="slider-example__feedback">
      <p className="slider-example__help" role="status" aria-label="成绩调节状态">{invalidDraft ? "输入尚未应用，请修正后确认。" : pending ? `预览：${range[0]}–${range[1]} 分；完成调节后应用。` : "拖动结束或确认输入后应用。"}</p>
    </div>
    <div className="slider-example__footer">
      <p className="slider-example__result" role="status" aria-label="成绩筛选结果">已应用筛选：{applied[0]}–{applied[1]} 分。</p>
      <Button variant="text" onClick={() => load([40, 90])}>恢复常用范围</Button>
    </div>
    <details className="slider-example__boundaries"><summary>状态与边界</summary>
    <div className="slider-example__presets" role="group" aria-label="范围边界示例">
      <Button variant="text" onClick={() => load([59, 61])}>加载接近范围</Button>
      <Button variant="text" onClick={() => load([60, 60])}>加载相等范围</Button>
      <Button variant="text" onClick={() => load([0, 100])}>加载完整范围</Button>
    </div>
    <p className="slider-example__help">预设立即应用；上下限允许相等，保持各自身份。</p>
    </details>
  </div>;
}

export const sliderExampleCode = [
  'import { useId, useState } from "react";',
  'import { Button, InputNumber, Slider } from "@rain-next/ui";',
  'export function Example() {',
  '  const id = useId();',
  '  const [value, setValue] = useState(60);',
  '  const [draft, setDraft] = useState<number | null>(60);',
  '  const [saved, setSaved] = useState<number | null>(null);',
  '  const [inputValid, setInputValid] = useState(true);',
  '  const valid = inputValid && draft !== null && Number.isInteger(draft) && draft >= 0 && draft <= 100;',
  '  return <form onSubmit={event => { event.preventDefault(); if (valid) setSaved(draft); }}>',
  '    <label id={id + "-label"} htmlFor={id + "-input"}>及格线</label>',
  '    <InputNumber id={id + "-input"} aria-label="精确及格线" value={draft} required min={0} max={100}',
  '      precision={0} suffixText="分" controls={false} onValidityChange={next => setInputValid(next.valid)} onValueChange={next => {',
  '        setDraft(next);',
  '        if (next !== null && Number.isInteger(next) && next >= 0 && next <= 100) setValue(next);',
  '      }} />',
  '    <Slider aria-labelledby={id + "-label"} value={value} formatValue={next => String(next) + " 分"}',
  '      marks={[{ value: 0, label: "0" }, { value: 60, label: "默认 60" }, { value: 100, label: "100" }]}',
  '      onValueChange={next => { setValue(next); setDraft(next); }} />',
  '    <Button type="submit" disabled={!valid || saved === draft}>保存及格线</Button>',
  '    <p role="status">{saved === null ? "尚未保存" : valid && draft === saved ? String(saved) + " 分" : "当前修改未保存；上次保存：" + saved + " 分"}</p>',
  '  </form>;',
  '}',
].join("\n");

const rangeExampleCode = [
  'import { useRef, useState } from "react";',
  'import { InputNumber, Slider, type SliderRange } from "@rain-next/ui";',
  'export function Example() {',
  '  const [range, setRange] = useState<SliderRange>([40, 90]);',
  '  const [drafts, setDrafts] = useState<readonly [number | null, number | null]>([40, 90]);',
  '  const [applied, setApplied] = useState<SliderRange>([40, 90]);',
  '  const [inputValid, setInputValid] = useState<readonly [boolean, boolean]>([true, true]);',
  '  const changedThumb = useRef<number | null>(null);',
  '  function update(index: number, next: number | null) {',
  '    setDrafts(current => index ? [current[0], next] : [next, current[1]]);',
  '    if (next !== null && Number.isInteger(next) && next >= 0 && next <= 100',
  '      && (index ? next >= range[0] : next <= range[1])) {',
  '      setRange(current => index ? [current[0], next] : [next, current[1]]);',
  '    }',
  '  }',
  '  function commit(index: number, next: number | null) {',
  '    if (next === null || !Number.isInteger(next) || next < 0 || next > 100',
  '      || inputValid.some((valid, endpoint) => endpoint !== index && !valid)',
  '      || drafts.some((draft, endpoint) => endpoint !== index && draft !== range[endpoint])) return;',
  '    const candidate: SliderRange = index ? [range[0], next] : [next, range[1]];',
  '    if (candidate[0] <= candidate[1]) { setRange(candidate); setApplied(candidate); }',
  '  }',
  '  function commitSlider(next: SliderRange) {',
  '    const index = changedThumb.current;',
  '    if (index !== null && inputValid[1 - index] && drafts[1 - index] === next[1 - index]) setApplied(next);',
  '    changedThumb.current = null;',
  '  }',
  '  return <section aria-label="成绩范围筛选">',
  '    {[0, 1].map(index => <InputNumber key={index} aria-label={index ? "成绩上限" : "成绩下限"}',
  '      value={drafts[index]} min={0} max={100} precision={0} required suffixText="分" controls={false}',
  '      onValidityChange={next => setInputValid(current => index ? [current[0], next.valid] : [next.valid, current[1]])}',
  '      onValueChange={next => update(index, next)} onValueCommit={next => commit(index, next)} />)}',
  '    <Slider range aria-label="成绩范围" value={range} thumbLabels={["成绩下限", "成绩上限"]}',
  '      formatValue={next => String(next) + " 分"}',
  '      onValueChange={(next, details) => {',
  '        const index = details.activeThumbIndex;',
  '        changedThumb.current = index; setRange(next);',
  '        setDrafts(current => index ? [current[0], next[1]] : [next[0], current[1]]);',
  '      }} onValueCommitted={commitSlider} />',
  '    <p role="status">{inputValid.some(valid => !valid) || drafts.some((draft, index) => draft !== range[index])',
  '      ? "输入尚未应用，请修正后确认。" : range.some((value, index) => value !== applied[index])',
  '      ? `预览：${range[0]}–${range[1]} 分；完成调节后应用。` : "拖动结束或确认输入后应用。"}</p>',
  '    <p role="status">已应用筛选：{applied[0]}–{applied[1]} 分</p>',
  '  </section>;',
  '}',
].join("\n");

const volumeExampleCode = [
  'import { useState } from "react";',
  'import { Button, Slider } from "@rain-next/ui";',
  'export function Example() {',
  '  const [volume, setVolume] = useState(60);',
  '  return <section aria-label="音量设置">',
  '    <p>音量</p>',
  '    <output aria-label="当前音量">{volume}%</output>',
  '    <Slider aria-label="音量" value={volume} onValueChange={setVolume}',
  '      formatValue={next => String(next) + "%"} />',
  '    <Button variant="text" onClick={() => setVolume(60)}>恢复默认音量</Button>',
  '  </section>;',
  '}',
].join("\n");

const speedExampleCode = [
  'import { useState } from "react";',
  'import { InputNumber, Slider } from "@rain-next/ui";',
  'export function Example() {',
  '  const [speed, setSpeed] = useState(1.25);',
  '  const [draft, setDraft] = useState<number | null>(1.25);',
  '  const [inputValid, setInputValid] = useState(true);',
  '  const validStep = draft !== null && draft >= 0.5 && draft <= 2',
  '    && Math.abs((draft - 0.5) / 0.05 - Math.round((draft - 0.5) / 0.05)) < 1e-8;',
  '  const error = inputValid && draft !== null && !validStep ? "请按 0.05 的步长调整" : "";',
  '  return <section aria-label="播放速度设置">',
  '    <InputNumber aria-label="精确播放速度" value={draft} required min={0.5} max={2} step={0.05} controls={false}',
  '      precision={2} suffixText="倍" status={error ? "error" : "default"}',
  '      onValidityChange={next => setInputValid(next.valid)}',
  '      onValueChange={next => { setDraft(next);',
  '        if (next !== null && next >= 0.5 && next <= 2',
  '          && Math.abs((next - 0.5) / 0.05 - Math.round((next - 0.5) / 0.05)) < 1e-8) setSpeed(next);',
  '      }} />',
  '    {error && <p>{error}</p>}',
  '    <Slider aria-label="播放速度" value={speed} min={0.5} max={2} step={0.05}',
  '      formatValue={next => String(next) + " 倍"}',
  '      onValueChange={next => { setSpeed(next); setDraft(next); }} />',
  '  </section>;',
  '}',
].join("\n");

export function SliderExamples() {
  const [comparison, setComparison] = useState<"outline" | "solid">("outline");
  const [narrow, setNarrow] = useState(70);
  return <div className="slider-examples" data-rain-id="local-slider-examples" data-asset-identity="local-experiment" data-comparison={comparison}>
    <DocExample title="单值阈值与精确输入" description="精确输入靠近标签；未完成和非法输入保留，保存由表单负责。">
      <ScalarExample kind="threshold" />
    </DocExample>
    <DocExample title="双端成绩范围" description="两端分别编辑，操作中只显示当前端的数值提示。">
      <RangeExample />
    </DocExample>
    <details className="slider-example__code"><summary>查看双端范围代码</summary><DocCode code={rangeExampleCode} /></details>
    <DocExample title="紧凑参数组合" description="音量即时反馈，倍速可直接输入精确值。">
      <div className="g5-panel slider-example__parameters">
        <ScalarExample kind="volume" />
        <ScalarExample kind="speed" />
      </div>
    </DocExample>
    <details className="slider-example__code"><summary>查看音量调节代码</summary><DocCode code={volumeExampleCode} /></details>
    <details className="slider-example__code"><summary>查看小数步长代码</summary><DocCode code={speedExampleCode} /></details>
    <DocExample title="局部宽度与禁用" description="缩短容器宽度后保持焦点和命中区域，禁用状态保留读数。">
      <div className="g5-panel slider-example slider-example__states">
        <div><div className="slider-example__heading"><p className="slider-example__label">窄容器</p><output aria-label="窄容器当前值">{narrow}%</output></div><Slider aria-label="局部宽度滑块" value={narrow} onValueChange={setNarrow} className="g5-slider-short"
          marks={[{ value: 0, label: "0" }, { value: 100, label: "100" }]} formatValue={value => String(value) + "%"} /></div>
        <div><p className="slider-example__label">禁用 50%</p><Slider aria-label="禁用滑块" defaultValue={50} disabled
          marks={[{ value: 0, label: "0" }, { value: 100, label: "100" }]} /></div>
      </div>
    </DocExample>
    <details className="slider-example__boundaries"><summary>外观对照</summary>
      <div className="slider-examples__comparison" role="group" aria-label="滑钮视觉对照">
        <span>滑钮外观</span>
        <Button variant="text" aria-pressed={comparison === "outline"} onClick={() => setComparison("outline")}>表面色内芯与品牌描边</Button>
        <Button variant="text" aria-pressed={comparison === "solid"} onClick={() => setComparison("solid")}>实心蓝对照</Button>
      </div>
    </details>
  </div>;
}
