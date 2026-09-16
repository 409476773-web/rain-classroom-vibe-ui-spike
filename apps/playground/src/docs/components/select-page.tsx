import { useEffect, useRef, useState } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Button, FormItem, Input, Link, Select, type SelectAppearance, type SelectOption, type SelectValue } from "@rain-next/ui";
import "./select-page.css";

const options: readonly SelectOption[] = [
  { value: "a", label: "视传 2401", group: "设计学院" },
  { value: "b", label: "数媒 2401", group: "设计学院", description: "数字媒体联合班" },
  { value: "c", label: "工业设计 2401", group: "设计学院" },
  { value: "long", label: "跨学院人工智能与数字媒体设计联合实验教学班" },
  { value: "disabled", label: "已停用班级", disabled: true },
];
const appearances: readonly SelectAppearance[] = ["outlined", "filled", "underlined"];
const appearanceNames = { outlined: "描边", filled: "填充", underlined: "底线" };

function RemoteExample() {
  const latest = useRef(0);
  const [query, setQuery] = useState(""), [retry, setRetry] = useState(0);
  const [result, setResult] = useState<readonly SelectOption[]>([]);
  const [loading, setLoading] = useState(false), [error, setError] = useState("");
  const [value, setValue] = useState<readonly SelectValue[]>(["a"]);
  const [selected, setSelected] = useState<readonly SelectOption[]>([options[0]!]);
  useEffect(() => {
    const request = ++latest.current;
    setLoading(true); setError("");
    const timer = setTimeout(() => {
      if (request !== latest.current) return;
      setLoading(false);
      if (query === "失败" && retry === 0) { setError("加载失败，请重试"); return; }
      setResult(query ? [{ value: query, label: query === "失败" ? "恢复后的班级" : query + " 班" }] : [options[1]!]);
    }, query === "A" ? 900 : 150);
    return () => { latest.current++; clearTimeout(timer); };
  }, [query, retry]);
  return <div data-testid="select-remote" className="select-page__stack">
    <FormItem label="远程教学班" help="模拟数据：A 较慢，B 较快；搜索“失败”可体验重试。">
      <Select multiple searchable filterOption={false} options={result} value={value} selectedOptions={selected}
        searchValue={query} onSearchValueChange={(next) => { setQuery(next); setRetry(0); }} loading={loading} loadError={error} onRetry={() => setRetry((count) => count + 1)}
        onValueChange={(next, details) => { setValue(next); setSelected(details.selectedOptions); }} />
    </FormItem>
  </div>;
}

function DraftExample() {
  const [saved, setSaved] = useState<readonly SelectValue[]>(["a"]);
  const [draft, setDraft] = useState(saved);
  return <div data-testid="select-draft" className="select-page__stack">
    <FormItem label="课程教学班" help="选择先进入当前表单草稿，保存后更新记录。">
      <Select multiple options={options} value={draft} onValueChange={setDraft} />
    </FormItem>
    <div className="select-page__row">
      <Button onClick={() => setSaved(draft)}>保存修改</Button>
      <Button variant="secondary" onClick={() => setDraft(saved)}>取消修改</Button>
    </div>
    <p data-testid="select-saved">已保存：{saved.map((value) => options.find((option) => option.value === value)?.label).join("、") || "未选择"}</p>
  </div>;
}

export function SelectPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [parent, setParent] = useState<"1" | "3">("1");
  return <main className="select-page rain-type-ui-default" data-rain-id="select-page" data-rain-theme={theme}>
    <div className="select-page__content">
      <header className="select-page__stack">
        <Link href="#components">返回组件总览</Link>
        <h1 id="select-title" tabIndex={-1} className="rain-type-heading-page">Select 选择器</h1>
        <p>单选、多选和搜索共用一套字段。默认带清空、键盘操作与完整选中信息。</p>
        <div className="select-page__row" role="group" aria-label="预览主题">
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
          <Button variant="secondary" aria-pressed={parent === "3"} onClick={() => setParent(parent === "1" ? "3" : "1")}>切换父背景</Button>
        </div>
      </header>
      <section className="select-page__surface select-page__stack" data-parent={parent} aria-labelledby="select-capabilities">
        <h2 id="select-capabilities" className="rain-type-heading-section">四种选择方式</h2>
        <div className="select-page__grid">
          <FormItem label="普通单选"><Select options={options} /></FormItem>
          <FormItem label="普通多选"><Select multiple options={options} defaultValue={["a", "b"]} /></FormItem>
          <FormItem label="搜索单选"><Select searchable options={options} /></FormItem>
          <FormItem label="搜索多选"><Select multiple searchable options={options} defaultValue={["a"]} /></FormItem>
        </div>
      </section>
      <section className="select-page__surface select-page__stack" data-parent={parent} aria-labelledby="select-inside-label-title">
        <h2 id="select-inside-label-title" className="rain-type-heading-section">框内固定标题</h2>
        <p>筛选栏把标题和选中内容放在同一行。多选使用单行摘要或数量，超出宽度时保留选中数量；搜索仍在展开面板中进行。</p>
        <div className="select-page__grid">
          <FormItem label="教学班" labelPosition="inside"><Select size={32} options={options} defaultValue="a" /></FormItem>
          <FormItem label="授课范围" labelPosition="inside"><Select size={32} multiple searchable options={options} defaultValue={["a", "b", "c"]} /></FormItem>
        </div>
        <pre>{`<FormItem label="教学班" labelPosition="inside">
  <Select size={32} options={options} />
</FormItem>`}</pre>
      </section>
      <section aria-labelledby="select-appearances" className="select-page__stack">
        <h2 id="select-appearances" className="rain-type-heading-section">Input 与 Select 外观对照</h2>
        <p>下方 Input 用于并排比较描边、填充与底线；单位、内部按钮和搜索等完整用法统一在 Input 详情页。</p>
        <Link href="#input">查看 Input 全部用法</Link>
        <div className="select-page__three">
          {appearances.map((appearance) => <div className="select-page__surface select-page__stack" data-parent={parent} key={appearance} data-appearance-sample={appearance}>
            <h3 className="rain-type-heading-section">{appearanceNames[appearance]}</h3>
            <FormItem label={appearanceNames[appearance] + "输入"}><Input appearance={appearance} defaultValue="人工智能导论" /></FormItem>
            <FormItem label={appearanceNames[appearance] + "选择"}><Select appearance={appearance} options={options} defaultValue="a" /></FormItem>
            <FormItem label={appearanceNames[appearance] + "空值"}><Select appearance={appearance} options={options} /></FormItem>
            <FormItem label={appearanceNames[appearance] + "警告"} status="warning" message="请核对授课范围"><Select searchable appearance={appearance} options={options} defaultValue="a" /></FormItem>
            <FormItem label={appearanceNames[appearance] + "错误"} status="error" required message="请选择有效教学班"><Select searchable appearance={appearance} options={options} /></FormItem>
            <FormItem label={appearanceNames[appearance] + "只读"}><Select readOnly appearance={appearance} options={options} defaultValue="a" /></FormItem>
            <FormItem label={appearanceNames[appearance] + "禁用"} disabled><Select appearance={appearance} options={options} defaultValue="a" /></FormItem>
          </div>)}
        </div>
      </section>
      <section className="select-page__surface select-page__stack" data-parent={parent} aria-labelledby="select-sizes">
        <h2 id="select-sizes" className="rain-type-heading-section">尺寸、摘要与标签</h2>
        <div className="select-page__grid">
          {([24, 28, 32, 36] as const).map((size) => <FormItem key={size} label={size + "px 摘要"}>
            <Select multiple size={size} options={options} defaultValue={["a", "b", "c"]} />
          </FormItem>)}
          {([32, 36] as const).map((size) => <FormItem key={size} label={size + "px 标签"}>
            <Select multiple display="tags" size={size} options={options} defaultValue={["a", "b"]} />
          </FormItem>)}
          <FormItem label="长名称摘要"><Select multiple options={options} defaultValue={["long", "b", "c"]} /></FormItem>
          <FormItem label="长名称标签"><Select multiple display="tags" options={options} defaultValue={["long", "b", "c"]} /></FormItem>
          <FormItem label="仅显示数量"><Select multiple display="count" options={options} defaultValue={["a", "b", "c"]} /></FormItem>
          <FormItem label="最多选择两项"><Select multiple maxCount={2} options={options} defaultValue={["a", "b"]} /></FormItem>
          <DensityProvider density="compact"><FormItem label="紧凑区域默认"><Select options={options} defaultValue="a" /></FormItem></DensityProvider>
          <FormItem label="资料尚未返回"><Select multiple options={[]} value={["waiting-id"]} /></FormItem>
        </div>
      </section>
      <section className="select-page__surface select-page__stack" data-parent={parent} aria-labelledby="select-data">
        <h2 id="select-data" className="rain-type-heading-section">候选数据与表单草稿</h2>
        <div className="select-page__grid">
          <RemoteExample /><DraftExample />
          <FormItem label="暂无选项"><Select options={[]} /></FormItem>
          <FormItem label="正在加载"><Select loading searchable options={options} defaultValue="a" /></FormItem>
        </div>
      </section>
      <section data-rain-theme="light" className="select-page__surface select-page__stack" data-parent="1" aria-labelledby="select-nested">
        <h2 id="select-nested" className="rain-type-heading-section">独立浅色区域</h2>
        <FormItem label="嵌套浅色"><Select appearance="underlined" multiple display="tags" options={options} defaultValue={["a", "b"]} /></FormItem>
      </section>
      <p>当前为组件检查版，选项区已接入正式浮层、菜单内容与 Tag。当前真实组件视觉已完成人工验收；颜色与真实设备核验单独保留。</p>
    </div>
  </main>;
}
