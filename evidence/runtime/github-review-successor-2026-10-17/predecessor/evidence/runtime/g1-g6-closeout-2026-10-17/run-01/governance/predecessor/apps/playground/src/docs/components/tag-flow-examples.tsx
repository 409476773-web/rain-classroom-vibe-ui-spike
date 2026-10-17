import { useRef, useState } from "react";
import { type ColorTheme } from "@rain-next/foundations";
import { Button, Tag, TagSelect, type TagAppearance, type TagSelectOption, type TagSize } from "@rain-next/ui";
import { TagManagementRecipe, type TagDefinition } from "./tag-management-recipe";

const stageOptions: readonly TagSelectOption[] = [
  { value: 0, label: "课前", color: "purple" }, { value: "during", label: "课中", color: "paper" },
  { value: "after", label: "课后", color: "courseware" }, { value: "archived", label: "已归档", color: "slate", disabled: true },
];
const longOptions: readonly TagSelectOption[] = [
  { value: "long", label: "面向跨学科项目的人工智能课程期末复习与课堂资料整理", color: "purple" },
  ...Array.from({ length: 18 }, (_, index) => ({ value: index, label: `第 ${index + 1} 单元的学习资料`, color: "paper" as const })),
];
const initial: TagDefinition[] = [
  { id: "review", name: "期末复习", color: "paper" }, { id: "key", name: "重点内容", color: "purple" },
  { id: "discussion", name: "课堂讨论", color: "magenta" },
];

export function TagFlowExamples({ theme, appearance, size }: { theme: ColorTheme; appearance: TagAppearance; size: TagSize }) {
  const [stage, setStage] = useState<string | number>(0), [controlledOpen, setControlledOpen] = useState(false);
  const [definitions, setDefinitions] = useState(initial), [value, setValue] = useState(["review", "key"]);
  const [failNext, setFailNext] = useState(false), nextId = useRef(1);
  const failure = useRef(failNext); failure.current = failNext;
  async function waitForSave(signal: AbortSignal) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    await new Promise<void>((resolve, reject) => {
      const abort = () => { window.clearTimeout(timer); reject(new DOMException("Aborted", "AbortError")); };
      const timer = window.setTimeout(() => { signal.removeEventListener("abort", abort); resolve(); }, 450);
      signal.addEventListener("abort", abort, { once: true });
    });
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    if (failure.current) { failure.current = false; setFailNext(false); throw new Error("暂时无法保存，名称和颜色已保留，请重试。"); }
  }
  return <section aria-labelledby="tag-flow-title" data-testid="tag-flow-examples" className="tag-page__stack">
    <div><h2 id="tag-flow-title" className="rain-type-heading-section">选择与自定义标签</h2><p>切换学习环节，或为资料选择、创建和管理标签。示例使用本地数据，刷新后恢复。</p></div>
    <div className="tag-flow__grid">
      <section className="tag-page__samples tag-page__stack" data-parent="1" aria-label="当前资料">
        <div><p>教学资料 / 设计方法</p><h3>设计方法复习资料</h3></div>
        <div className="tag-page__row"><span>学习环节</span><TagSelect aria-label="学习环节" options={stageOptions} value={stage} onValueChange={setStage} appearance={appearance} size={size} /></div>
        <TagManagementRecipe label="资料标签" theme={theme} definitions={definitions} value={value} onValueChange={setValue}
          onCreate={async (draft, signal) => { await waitForSave(signal); const item = { id: `custom-${nextId.current++}`, ...draft }; setDefinitions((items) => [...items, item]); return item; }}
          onUpdate={async (item, signal) => { await waitForSave(signal); setDefinitions((items) => items.map((candidate) => candidate.id === item.id ? item : candidate)); return item; }} />
      </section>
      <section className="tag-page__samples tag-page__stack" data-parent="1" aria-label="关联资料">
        <div><p>另一份资料</p><h3>第三周课堂练习</h3></div>
        <div className="tag-page__row">{definitions.filter((item) => item.id === "review").map((item) => <Tag key={item.id} color={item.color} title={item.name}>{item.name}</Tag>)}</div>
        <p>这份资料也使用“期末复习”标签。编辑该标签时，两处名称和颜色同步更新。</p>
      </section>
    </div>
    <details><summary data-focus="item">尺寸、展开与边界检查</summary>
      <div className="tag-page__samples tag-page__stack" data-parent="1" data-testid="tag-select-checks">
        <div className="tag-page__row"><label><input type="checkbox" checked={failNext} onChange={(event) => setFailNext(event.target.checked)} />模拟下一次标签保存失败</label></div>
        {([20, 24, 28] as const).map((size) => <div key={size} className="tag-page__row"><span>{size}px</span>{(["filled", "outlined", "solid"] as const).map((appearance) => <TagSelect key={appearance} aria-label={`${size}px ${appearance} 标签`} options={stageOptions} defaultValue={0} size={size} appearance={appearance} />)}</div>)}
        <div className="tag-page__row"><TagSelect aria-label="禁用标签选择" options={stageOptions} defaultValue={0} disabled /><Button size="small" onClick={() => setControlledOpen(!controlledOpen)}>切换候选面板</Button><TagSelect aria-label="受控展开标签" options={stageOptions} defaultValue={0} open={controlledOpen} onOpenChange={setControlledOpen} /></div>
        <div className="tag-page__samples tag-page__row" data-parent="1" data-rain-theme="light"><span>嵌套浅色区域</span><TagSelect aria-label="嵌套浅色标签" options={stageOptions} defaultValue={0} /></div>
        <div className="tag-flow__scroll" data-testid="tag-select-scroll"><div className="tag-page__long"><TagSelect aria-label="滚动区域长名称标签" options={longOptions} defaultValue="long" /></div><p>滚动这个区域时，候选面板继续跟随触发器定位。</p><div className="tag-flow__scroll-space" aria-hidden="true" /></div>
      </div>
    </details>
  </section>;
}
