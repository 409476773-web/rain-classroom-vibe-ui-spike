import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Button, Input } from "@rain-next/ui";
import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import { FavoriteIcon } from "@rain-next/ui/icons/favorite";
import { FavoriteFilledIcon } from "@rain-next/ui/icons/favorite-filled";
import { SearchIcon } from "@rain-next/ui/icons/search";
import linear from "../../docs/components/option-chart-linear.svg";
import parabola from "../../docs/components/option-chart-parabola.svg";

export type ReviewSettings = {
  theme: "light" | "dark";
  geometry: "source" | "tokens";
  feedback: "neutral" | "brand";
  shadow: "source" | "tokens";
};
export type FixtureProps = ReviewSettings & { closeOnAction: boolean; onEvent: (message: string) => void };

export function layerAttributes(settings: ReviewSettings) {
  return {
    "data-rain-theme": settings.theme, "data-geometry": settings.geometry,
    "data-feedback": settings.feedback, "data-shadow": settings.shadow,
    "data-flavor": "tokens", "data-asset-identity": "local-experiment",
  };
}

export function ItemContent({ label, description, descriptionId, leading, indicator, meta, submenu, critical = false }: {
  label: string; description?: string; descriptionId?: string; leading?: ReactNode;
  indicator?: "check" | "radio"; meta?: string; submenu?: boolean; critical?: boolean;
}) {
  return <>
    {indicator && <span className="dr-indicator" data-kind={indicator} aria-hidden="true"><CheckBoldIcon /></span>}
    {leading && <span className="dr-leading" aria-hidden="true">{leading}</span>}
    <span className="dr-item-copy" data-has-description={Boolean(description)}>
      <span data-slot="label">{label}</span>
      {description && <span id={descriptionId} data-slot="description" data-critical={critical}>{description}</span>}
    </span>
    {meta && <span className="dr-meta">{meta}</span>}
    {submenu && <ArrowRightIcon className="dr-submenu-icon" aria-hidden="true" />}
  </>;
}

export function Avatar() { return <span className="dr-avatar">王</span>; }

const templates = [
  { id: "linear", title: "函数图像练习", type: "作业", description: "从图像理解变化趋势", image: linear },
  { id: "parabola", title: "函数单元测验", type: "测验", description: "检查二次函数的理解", image: parabola },
  { id: "discussion", title: "课堂观点讨论", type: "作业", description: "以一个问题发起讨论", image: linear },
];

export function TemplateContent({ onComplete, inputRef }: { onComplete: (label: string) => void; inputRef: RefObject<HTMLInputElement | null> }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const attempt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const shown = templates.filter(item => (category === "全部" || item.type === category) && item.title.includes(query.trim()));
  function create() {
    if (!selected || pending) return;
    setPending(true); setError(false);
    timer.current = setTimeout(() => {
      setPending(false);
      if (attempt.current++ === 0) { setError(true); return; }
      onComplete(templates.find(item => item.id === selected)!.title);
    }, 450);
  }
  return <>
    <div className="dr-panel-body">
      <Input ref={inputRef} className="w-full" aria-label="搜索模板" placeholder="搜索模板" value={query} onValueChange={setQuery} leadingIcon={<SearchIcon />} />
      <div className="dr-categories" role="group" aria-label="模板分类">
        {["全部", "作业", "测验"].map(label => <Button key={label} variant="text" aria-pressed={category === label}
          onClick={() => setCategory(label)}>{label}</Button>)}
      </div>
      <div className="dr-template-list">
        {shown.map(item => <div key={item.id} className="dr-template-row" data-selected={selected === item.id}>
          <button type="button" className="dr-template-choice" data-focus="item" disabled={pending} aria-label={`选择 ${item.title}`}
            aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>
            <img className="dr-thumbnail" src={item.image} alt="" />
            <ItemContent label={item.title} description={item.description} />
          </button>
          <Button variant="text" aria-label={`${favorites.includes(item.id) ? "取消收藏" : "收藏"} ${item.title}`}
            aria-pressed={favorites.includes(item.id)} onClick={() => setFavorites(current => current.includes(item.id) ? current.filter(id => id !== item.id) : [...current, item.id])}>
            {favorites.includes(item.id) ? <FavoriteFilledIcon /> : <FavoriteIcon />}
          </Button>
        </div>)}
        {!shown.length && <p className="dr-empty" role="status">没有匹配的模板，换个关键词试试。</p>}
      </div>
      {error && <p className="dr-error" role="alert">暂时未能创建，选择和搜索已保留，请重试。</p>}
    </div>
    <div className="dr-panel-footer"><span>{selected ? "已选择 1 个模板" : "选择一个模板开始"}</span>
      <Button disabled={!selected} loading={pending} onClick={create}>{error ? "重试创建" : "创建学习单元"}</Button>
    </div>
  </>;
}

export function CourseFields({ inputRef }: { inputRef: RefObject<HTMLInputElement | null> }) {
  return <div className="dr-dialog-body">
    <label className="dr-field-label">课程名称<Input ref={inputRef} aria-label="课程名称" defaultValue="设计方法与实践" /></label>
    <label className="dr-field-label">课程说明<Input aria-label="课程说明" defaultValue="围绕真实问题，完成调研、设计与展示。" /></label>
    <div className="dr-long-copy">
      {Array.from({ length: 8 }, (_, index) => <p key={index}>第 {index + 1} 周：记录课堂讨论与练习反馈。课程内容由教师根据学习进度调整，保存后更新课程资料。</p>)}
    </div>
  </div>;
}

export const selectItems = [
  { value: "all", label: "全部课程" },
  { value: "disabled", label: "已停用课程", disabled: true },
  { value: "mine", label: "仅我创建" },
];
