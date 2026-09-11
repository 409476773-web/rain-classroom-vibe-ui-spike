import { useEffect, useRef, useState } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Button, FormItem, IconButton, Input, Link, SearchInput, type InputAppearance, type InputSize, type SearchSource } from "@rain-next/ui";
import { SearchIcon } from "@rain-next/ui/icons/search";
import "./input-page.css";

const sizes: InputSize[] = [24, 28, 32, 36];
const appearances = [{ value: "outlined", label: "描边" }, { value: "filled", label: "填充" }, { value: "underlined", label: "底线" }] as const;
function QueryExample({ appearance }: { appearance: InputAppearance }) {
  const latestRequest = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("尚未查询");
  const [submitted, setSubmitted] = useState("尚未提交");
  useEffect(() => () => { latestRequest.current++; timers.current.forEach(clearTimeout); }, []);
  function search(value: string, { source }: { source: SearchSource }) {
    const request = ++latestRequest.current;
    setLoading(true);
    setSubmitted(`${value || "全部课程"} · ${source}`);
    timers.current.push(setTimeout(() => {
      if (request !== latestRequest.current) return;
      setResult(`${value || "全部课程"}（必修课）`);
      setLoading(false);
    }, value ? 900 : 150));
  }
  return <div className="input-page__query" data-testid="input-query">
    <FormItem label="课程搜索" help="输入时保留草稿；按 Enter 或搜索提交。加载中仍可输入和清空。">
      <SearchInput appearance={appearance} loading={loading} onSearch={search} placeholder="输入课程名称" maxLength={20} />
    </FormItem>
    <p>课程类型：必修课</p>
    <p data-testid="input-query-submitted">最近提交：{submitted}</p>
    <p role="status" data-testid="input-query-result">{loading ? "正在查询…" : `最新结果：${result}`}</p>
  </div>;
}

export function InputPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [appearance, setAppearance] = useState<InputAppearance>("outlined");
  const [viewed, setViewed] = useState(false);
  return <main className="input-page rain-type-ui-default" data-rain-id="input-page" data-rain-theme={theme}>
    <div className="input-page__content">
      <header className="input-page__header">
        <Link href="#components">返回组件总览</Link>
        <h1 id="input-title" tabIndex={-1} className="rain-type-heading-page">Input 输入框</h1>
        <p>Input 家族的完整用法：四档尺寸、前后文案、单位、内部按钮、清空、计数与搜索快捷用法，统一使用三种外观。</p>
        <div className="input-page__row" role="group" aria-label="预览主题">
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
        </div>
      </header>
      <section className="input-page__stack" aria-labelledby="input-appearances-title">
        <h2 id="input-appearances-title" className="rain-type-heading-section">字段外观</h2>
        <div className="input-page__row" role="group" aria-label="输入框外观">
          {appearances.map(({ value, label }) => <Button key={value} variant={appearance === value ? "primary" : "secondary"}
            aria-pressed={appearance === value} onClick={() => setAppearance(value)}>{label}</Button>)}
        </div>
        <p>切换后，下方全部示例共用所选外观，已输入的内容会保留。</p>
      </section>
      <section aria-labelledby="input-sizes-title">
        <h2 id="input-sizes-title" className="rain-type-heading-section">尺寸与状态</h2>
        <p>24 用于紧凑区域；28、32 用于普通表单和查询；36 用于更宽松的界面。</p>
        <div className="input-page__matrix">
          {sizes.map((size) => <div className="input-page__column" key={size} data-input-size={size}>
            <h3 className="rain-type-heading-section">{size}px</h3>
            <FormItem label={`${size} 常规`}><Input appearance={appearance} size={size} placeholder="输入课程名称" /></FormItem>
            <FormItem label={`${size} 已填写`}><Input appearance={appearance} size={size} defaultValue="人工智能导论" /></FormItem>
            <FormItem label={`${size} 警告`} status="warning" message="名称较相似，请检查"><Input appearance={appearance} size={size} defaultValue="人工智能导论" /></FormItem>
            <FormItem label={`${size} 错误`} status="error" message="课程编号已存在"><Input appearance={appearance} size={size} defaultValue="AI-2026" /></FormItem>
            <FormItem label={`${size} 只读`}><Input appearance={appearance} size={size} readOnly defaultValue="教务系统同步" /></FormItem>
            <FormItem label={`${size} 禁用`} disabled><Input appearance={appearance} size={size} defaultValue="等待授权" /></FormItem>
          </div>)}
        </div>
      </section>
      <section aria-labelledby="input-parts-title">
        <h2 id="input-parts-title" className="rain-type-heading-section">常用组合</h2>
        <div className="input-page__grid">
          <FormItem label="课程学分" help="清除在单位之前；计数与末尾操作保持固定位置。">
            <Input appearance={appearance} defaultValue="3" suffixText="学分" maxLength={3} trailingAction={<Button variant="text" size="regular">换算</Button>} />
          </FormItem>
          <div className="input-page__anatomy-scroll"><FormItem className="input-page__anatomy" label="全部附加内容" status="warning" message="附加内容较多，窄屏可左右滑动查看完整结构。">
            <Input appearance={appearance} leadingIcon={<SearchIcon />} prefix={<span>建议</span>} prefixText="￥" defaultValue="120" suffixText="元" suffix={<span>含税</span>}
              trailingIcon={<SearchIcon />} maxLength={6} trailingAction={<IconButton icon={<SearchIcon />} size="24/16" aria-label="查看价格" />} />
          </FormItem></div>
          <FormItem label="只读课程编号" help={viewed ? "已读取：AI-2026" : "只读内容可以选择、复制和查看；按 Tab 定位操作。"}>
            <Input appearance={appearance} readOnly defaultValue="AI-2026" trailingActionChangesValue={false}
              trailingAction={<Button variant="text" size="regular" onClick={() => setViewed(true)}>查看</Button>} />
          </FormItem>
          <FormItem label="只读改值操作" help="会改值的操作保留位置并禁用。">
            <Input appearance={appearance} readOnly defaultValue="教学班同步" trailingAction={<Button variant="text" size="regular">更新</Button>} />
          </FormItem>
          <DensityProvider density="compact">
            <FormItem label="紧凑搜索" help="紧凑区域默认 24px，搜索操作使用 24px 文字按钮。"><SearchInput appearance={appearance} defaultValue="课程" /></FormItem>
          </DensityProvider>
          <FormItem label="关闭清空" help="明确关闭时释放清空占位。"><Input appearance={appearance} clearable={false} defaultValue="无需清空的字段" /></FormItem>
        </div>
      </section>
      <section aria-labelledby="input-count-title">
        <h2 id="input-count-title" className="rain-type-heading-section">字数与回填</h2>
        <div className="input-page__grid">
          <FormItem label="硬限制" help="组合 Emoji 算一个字，中文组字结束后应用限制。"><Input appearance={appearance} maxLength={6} defaultValue="雨👨‍👩‍👧‍👦" /></FormItem>
          <FormItem label="软限制" help="保留超限内容；计数提示不会自动变成字段错误。"><Input appearance={appearance} maxLength={4} countMode="soft" defaultValue="人工智能导论" /></FormItem>
          <FormItem label="超限回填" help="已有内容完整保留，可逐步删减；不会静默截断尾部。"><Input appearance={appearance} maxLength={4} defaultValue="abcdef" /></FormItem>
          <FormItem label="隐藏计数" help="隐藏数字后，超限仍提供可访问的文字说明。"><Input appearance={appearance} maxLength={4} defaultValue="abcdef" showCount={false} /></FormItem>
        </div>
      </section>
      <section className="input-page__stack" aria-labelledby="input-search-title">
        <h2 id="input-search-title" className="rain-type-heading-section">搜索快捷用法</h2>
        <p>SearchInput 使用同一个 Input，提供搜索按钮、Enter 提交和清空搜索；加载中仍可编辑。</p>
        <QueryExample appearance={appearance} />
      </section>
      <p className="input-page__note">当前运行视觉已完成人工验收，组件仍未发布。弱边界、辅助文字及部分状态下的颜色问题已单独记录。</p>
    </div>
  </main>;
}
