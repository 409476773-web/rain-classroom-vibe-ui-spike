import { useEffect, useRef, useState } from "react";
import { DensityProvider, tagColorProfileNames, learningUnitTagProfiles, learningUnitMarkTypes, groupTypeTagProfiles, type ColorTheme } from "@rain-next/foundations";
import { LearningUnitTag, DifficultyTag, GroupTypeTag, StatusTag, SystemStatusTag, LearningUnitReminderMark, ScoredTaskTypeMark, Button, CheckableTag, CheckableTagGroup, Link, LinkTag, Tag, type TagAppearance, type TagColor, type TagOption, type TagSize } from "@rain-next/ui";
import { TagIcon } from "@rain-next/ui/icons/tag";
import { TagFlowExamples } from "./tag-flow-examples";
import "./tag-page.css";

const appearances: TagAppearance[] = ["filled", "outlined", "solid"];
const sizes: TagSize[] = [20, 24, 28];
const labels = ["课堂", "分组", "试卷", "考试", "课件", "公告", "视频", "作业", "直播", "音频", "讨论", "图文", "投票", "自测", "回放", "1级", "2级", "3级", "4级", "5级"];
const options: TagOption[] = [{ value: "all", label: "全部" }, { value: "paper", label: "试卷", color: "paper" }, { value: "assignment", label: "作业", color: "assignment" }, { value: "locked", label: "未开放", color: "slate", disabled: true }];
const initialTags = [{ id: "review", label: "期末复习", color: "paper" as const }, { id: "slides", label: "第三章课件", color: "courseware" as const }, { id: "notes", label: "个人笔记", color: "purple" as const }];
const longName = "面向跨学科项目的人工智能课程期末复习与课堂资料整理";

function TagCollection() {
  const [items, setItems] = useState(initialTags), [pending, setPending] = useState(false), [fail, setFail] = useState(false);
  const [status, setStatus] = useState("可移除标签，或模拟失败后的恢复。");
  const [removed, setRemoved] = useState<{ item: typeof initialTags[number]; index: number } | null>(null);
  const [focusTarget, setFocusTarget] = useState<string | null>(null);
  const collectionRef = useRef<HTMLElement>(null);
  const roots = useRef(new Map<string, HTMLSpanElement>()), addRef = useRef<HTMLButtonElement>(null), timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!focusTarget || pending) return;
    if (document.activeElement !== document.body && !collectionRef.current?.contains(document.activeElement)) { setFocusTarget(null); return; }
    if (focusTarget === "add") addRef.current?.focus(); else roots.current.get(focusTarget)?.querySelector("button")?.focus();
    setFocusTarget(null);
  }, [focusTarget, pending, items]);
  function remove(index: number) {
    const item = items[index]!, next = items.filter((candidate) => candidate.id !== item.id);
    setPending(true); setItems(next); setRemoved(null); setStatus(`正在移除 ${item.label}…`);
    setFocusTarget(next[index]?.id ?? next[index - 1]?.id ?? "add");
    timer.current = setTimeout(() => {
      setPending(false);
      if (fail) { setItems(items); setFocusTarget(item.id); setStatus(`移除失败，已恢复 ${item.label}。`); }
      else { setRemoved({ item, index }); setStatus(`已移除 ${item.label}。`); }
    }, 300);
  }
  return <section ref={collectionRef} aria-label="管理标签" className="tag-page__samples" data-parent="1">
    <h3>管理标签</h3>
    <div className="tag-page__row" data-testid="tag-collection">
      {items.map((item, index) => <Tag key={item.id} color={item.color} disabled={pending} onRemove={() => remove(index)}
        ref={(element) => { if (element) roots.current.set(item.id, element); else roots.current.delete(item.id); }}>{item.label}</Tag>)}
      <Button ref={addRef} variant="text" tone="brand" disabled={pending || items.length === initialTags.length}
        onClick={() => { const item = initialTags.find((candidate) => !items.some(({ id }) => id === candidate.id))!; setItems([...items, item]); setRemoved(null); setFocusTarget(item.id); setStatus(`已添加 ${item.label}。`); }}>添加示例标签</Button>
      {removed && <Button variant="text" tone="brand" onClick={() => { const next = [...items]; next.splice(removed.index, 0, removed.item); setItems(next); setFocusTarget(removed.item.id); setStatus(`已恢复 ${removed.item.label}。`); setRemoved(null); }}>撤销移除</Button>}
    </div>
    <label className="tag-page__row"><input type="checkbox" checked={fail} disabled={pending} onChange={(event) => setFail(event.target.checked)} />模拟移除失败</label>
    <p role="status">{status}</p>
  </section>;
}

function TagDomainExamples({ surface, appearance, size }: { surface: string; appearance: TagAppearance; size: TagSize }) {
  const [scored, setScored] = useState(true), [reminder, setReminder] = useState(true);
  const markSizes = ["small", "medium", "large"] as const;
  return <section aria-labelledby="tag-domain-title" data-testid="tag-domain-examples" className="tag-page__stack">
    <h2 id="tag-domain-title" className="rain-type-heading-section">业务标签与专用形状</h2>
    <p>颜色随业务类型固定；方形标记提供完整尺寸。计分开关保持正文位置与外观。</p>
    <div className="tag-page__row"><label><input type="checkbox" checked={scored} onChange={(event) => setScored(event.target.checked)} />显示计分角标</label><label><input type="checkbox" checked={reminder} onChange={(event) => setReminder(event.target.checked)} />显示新提醒</label></div>
    <div className="tag-page__samples tag-page__stack" data-parent={surface}>
      <h3>竖向与固定形状</h3>
      <div className="tag-page__row" data-testid="tag-domain-shapes">{sizes.map((size) => <Tag key={size} layout="vertical" color="assignment" appearance={appearance} size={size}>作业</Tag>)}<LearningUnitTag type="批量" /><LearningUnitTag type="小组作答" /><LearningUnitTag type="开放型作业" layout="stacked" appearance={appearance} /></div>
      <h3>学习单元</h3>
      <div className="tag-page__row">{(Object.keys(learningUnitTagProfiles) as (keyof typeof learningUnitTagProfiles)[]).map((type) => <LearningUnitTag key={type} type={type} appearance={appearance} size={size} />)}</div>
      <h3>难度与分组</h3>
      <div className="tag-page__row">{([1, 2, 3, 4, 5] as const).map((level) => <DifficultyTag key={level} level={level} appearance={appearance} size={size} />)}{(Object.keys(groupTypeTagProfiles) as (keyof typeof groupTypeTagProfiles)[]).map((type) => <GroupTypeTag key={type} type={type} appearance={appearance} size={size} />)}</div>
    </div>
    <div className="tag-page__samples tag-page__stack" data-parent={surface}>
      <h3>业务状态 · 20 / 24 / 32</h3>
      {([20, 24, 32] as const).map((size) => <div key={size} className="tag-page__row">{(["filled", "solid"] as const).map((appearance) => <span key={appearance} className="tag-page__row"><StatusTag status="进行中" appearance={appearance} size={size} /><StatusTag status="进行中" showDot appearance={appearance} size={size} /><StatusTag status="未提交" appearance={appearance} size={size} /><StatusTag status="已结束" appearance={appearance} size={size} /></span>)}</div>)}
      <h3>系统状态 · 20 / 24 / 28</h3>
      {sizes.map((size) => <div key={size} className="tag-page__row">{(["success", "processing", "warning", "error", "neutral"] as const).map((status) => <SystemStatusTag key={status} status={status} appearance={appearance} size={size} />)}</div>)}
    </div>
    <div className="tag-page__samples tag-page__stack" data-parent={surface} data-testid="tag-domain-marks">
      <h3>计分标记 · 单行 / 双行</h3>
      {markSizes.map((size) => <div key={size} className="tag-page__row" data-mark-size={size}><span>{size}</span>{(["filled", "solid"] as const).map((appearance) => <span key={appearance} className="tag-page__row"><ScoredTaskTypeMark type="作业" size={size} scored={scored} appearance={appearance} /><ScoredTaskTypeMark type="开放型作业" size={size} scored={scored} appearance={appearance} /></span>)}</div>)}
      <h3>新提醒 · 三档</h3>
      {markSizes.map((size) => <div key={size} className="tag-page__row"><LearningUnitReminderMark type="作业" size={size} showReminder={reminder} /><LearningUnitReminderMark type="开放型作业" size={size} showReminder={reminder} /></div>)}
      <h3>18 种标记类型</h3>
      <div className="tag-page__row">{learningUnitMarkTypes.map((type) => <LearningUnitReminderMark key={type} type={type} showReminder={reminder} />)}</div>
    </div>
  </section>;
}

export function TagPage() {
  const [theme, setTheme] = useState<ColorTheme>("light"), [surface, setSurface] = useState("1"), [color, setColor] = useState<TagColor>("paper");
  const [appearance, setAppearance] = useState<TagAppearance>("filled");
  const [size, setSize] = useState<TagSize>(24);
  const [single, setSingle] = useState<string | null>("all"), [multiple, setMultiple] = useState<string[]>(["paper"]), [checked, setChecked] = useState(false);
  const [linkRemoved, setLinkRemoved] = useState(false), [lastAction, setLastAction] = useState("尚未操作");
  const linkRef = useRef<HTMLAnchorElement>(null), restoreLinkRef = useRef<HTMLButtonElement>(null), returnLinkFocus = useRef(false);
  useEffect(() => {
    if (!returnLinkFocus.current) return;
    (linkRemoved ? restoreLinkRef.current : linkRef.current)?.focus();
    returnLinkFocus.current = false;
  }, [linkRemoved]);
  return <main className="tag-page rain-type-ui-default" data-rain-id="tag-page" data-rain-theme={theme}>
    <div className="tag-page__content">
      <header>
        <Link href="#components">返回组件总览</Link>
        <h1 id="tag-title" tabIndex={-1} className="rain-type-heading-page">Tag 标签</h1>
        <p>保留雨课堂的完整分类色。普通标签默认浅底，可独立关闭、导航，或用于单选与多选。</p>
        <div className="tag-page__row tag-page__controls">
          <label>主题<select value={theme} data-focus="control" onChange={(event) => setTheme(event.target.value as ColorTheme)}><option value="light">浅色</option><option value="dark">深色</option></select></label>
          <label>标签所在底色<select value={surface} data-focus="control" onChange={(event) => setSurface(event.target.value)}><option value="1">白色任务面</option><option value="2">浅色过渡面</option><option value="3">页面底色</option></select></label>
          <label>交互示例配色<select value={color} data-focus="control" onChange={(event) => setColor(event.target.value as TagColor)}><option value="neutral">neutral</option><option value="brand">brand</option>{tagColorProfileNames.map((profile) => <option value={profile} key={profile}>{profile}</option>)}</select></label>
          <label>交互示例外观<select value={appearance} data-focus="control" onChange={(event) => setAppearance(event.target.value as TagAppearance)}>{appearances.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
          <label>交互示例尺寸<select value={size} data-focus="control" onChange={(event) => setSize(Number(event.target.value) as TagSize)}>{sizes.map((value) => <option key={value} value={value}>{value}px</option>)}</select></label>
        </div>
      </header>
      <TagFlowExamples theme={theme} appearance={appearance} size={size} />
      <TagDomainExamples surface={surface} appearance={appearance} size={size} />
      <section aria-labelledby="tag-palette-title">
        <h2 id="tag-palette-title" className="rain-type-heading-section">20 组分类色</h2>
        <p>每组依次展示 Filled、Outlined、Solid；Solid 使用 700 字重。</p>
        <div className="tag-page__palette tag-page__samples" data-parent={surface}>
          {tagColorProfileNames.map((profile, index) => <div data-profile={profile} key={profile} className="tag-page__palette-cell">
            <code>{profile}</code><div className="tag-page__row">{appearances.map((appearance) => <Tag color={profile} appearance={appearance} key={appearance}>{labels[index]}</Tag>)}</div>
          </div>)}
        </div>
      </section>
      <section aria-labelledby="tag-sizes-title">
        <h2 id="tag-sizes-title" className="rain-type-heading-section">完整尺寸</h2>
        <div className="tag-page__sizes tag-page__samples" data-parent={surface}>
          {sizes.map((size) => <div key={size} data-tag-size={size}><h3>{size}px</h3><div className="tag-page__row">
            {appearances.map((appearance) => <Tag key={appearance} color={color} size={size} appearance={appearance} leadingIcon={<TagIcon />} onRemove={() => setLastAction(`操作了 ${size}px ${appearance} 的关闭`)}>期末复习</Tag>)}
          </div></div>)}
          <DensityProvider density="compact"><div className="tag-page__row" data-testid="tag-compact"><span>紧凑默认</span><Tag color={color}>静态 20</Tag><Tag color={color} onRemove={() => setLastAction("操作了紧凑关闭")}>可关闭 24</Tag></div></DensityProvider>
        </div>
      </section>
      <section aria-labelledby="tag-actions-title">
        <h2 id="tag-actions-title" className="rain-type-heading-section">独立操作</h2>
        <div className="tag-page__samples tag-page__stack" data-parent={surface}>
          <div className="tag-page__row">
            <Tag color={color} appearance={appearance} size={size}>静态标签</Tag>
            <Tag color={color} appearance={appearance} size={size} disabled onRemove={() => undefined}>已锁定</Tag>
            {!linkRemoved ? <LinkTag ref={linkRef} color={color} appearance={appearance} size={size} href="#tag" onClick={(event) => { event.preventDefault(); setLastAction("打开第三章课件"); }} onRemove={() => { returnLinkFocus.current = true; setLinkRemoved(true); setLastAction("已移除链接标签"); }}>第三章课件</LinkTag> : <Button ref={restoreLinkRef} variant="text" onClick={() => { returnLinkFocus.current = true; setLinkRemoved(false); }}>恢复链接标签</Button>}
            <LinkTag color={color} appearance={appearance} size={size} href="https://www.xuetangx.com/" target="_blank">学堂在线</LinkTag>
            <LinkTag color={color} appearance={appearance} size={size} href="https://www.xuetangx.com/" disabled onRemove={() => undefined}>禁用链接</LinkTag>
            <CheckableTag label="可选分类" value="choice" color={color} appearance={appearance} size={size} checked={checked} onCheckedChange={setChecked} />
          </div>
          <div className="tag-page__row">{appearances.flatMap((appearance) => (["neutral", "brand"] as const).map((tone) => <Tag color={tone} appearance={appearance} key={`${tone}-${appearance}`}>{tone} · {appearance}</Tag>))}</div>
          <p role="status" data-testid="tag-action-status">{lastAction}</p>
        </div>
      </section>
      <section aria-labelledby="tag-selection-title">
        <h2 id="tag-selection-title" className="rain-type-heading-section">选择与筛选</h2>
        <form className="tag-page__samples tag-page__stack" data-parent={surface} onSubmit={(event) => { event.preventDefault(); setLastAction(`已提交 ${new FormData(event.currentTarget).getAll("resources").join("、") || "空筛选"}`); }}>
          <CheckableTagGroup legend="资源类型" name="resource-type" options={options} value={single} onValueChange={setSingle} appearance={appearance} size={size} clearable />
          <CheckableTagGroup mode="multiple" legend="资源筛选" name="resources" options={options.slice(1)} value={multiple} onValueChange={setMultiple} appearance={appearance} size={size} clearable />
          <div><Button type="submit" variant="secondary">提交筛选</Button></div>
        </form>
      </section>
      <TagCollection />
      <section aria-labelledby="tag-long-title" className="tag-page__samples" data-parent={surface}>
        <h2 id="tag-long-title" className="rain-type-heading-section">长名称与嵌套浅色</h2>
        <div className="tag-page__long"><Tag color={color} leadingIcon={<TagIcon />} onRemove={() => setLastAction("操作了长名称的关闭")}>{longName}</Tag></div>
        <details><summary data-focus="item">查看完整名称</summary><p>{longName}</p></details>
        <div data-rain-theme="light" className="tag-page__samples tag-page__row" data-parent="1" data-testid="tag-light-island"><span>浅色区域</span><Tag color="paper" appearance="filled">试卷</Tag><Tag color="paper" appearance="solid">试卷</Tag></div>
      </section>
      <p>三批视觉均已确认，包含标签选择、创建管理及关闭按钮右侧留白修订；对比度不足单独保留记录。</p>
    </div>
  </main>;
}
