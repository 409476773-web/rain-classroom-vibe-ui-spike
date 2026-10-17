import { useState, type ReactNode } from "react";

import { DensityProvider, iconSizeClassNames, iconSizeTokenEntries } from "@rain-next/foundations";
import { Button, IconButton, Input, Link, defineRainLocalRecipe, iconButtonSizes, type IconButtonPart, type IconButtonSize } from "@rain-next/ui";
import { DeleteIcon } from "@rain-next/ui/icons/delete";
import { DislikeIcon } from "@rain-next/ui/icons/dislike";
import { DislikeFilledIcon } from "@rain-next/ui/icons/dislike-filled";
import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";
import { ExpandIcon } from "@rain-next/ui/icons/expand";
import { CollapseIcon } from "@rain-next/ui/icons/collapse";
import { FavoriteIcon } from "@rain-next/ui/icons/favorite";
import { FavoriteFilledIcon } from "@rain-next/ui/icons/favorite-filled";
import { FilterIcon } from "@rain-next/ui/icons/filter";
import { FilterFilledIcon } from "@rain-next/ui/icons/filter-filled";
import { LayoutSplitIcon } from "@rain-next/ui/icons/layout-split";
import { LikeIcon } from "@rain-next/ui/icons/like";
import { LikeFilledIcon } from "@rain-next/ui/icons/like-filled";
import { LikeAlt2Icon } from "@rain-next/ui/icons/like-alt-2";
import { LikeAltIcon } from "@rain-next/ui/icons/like-alt";
import { PinIcon } from "@rain-next/ui/icons/pin";
import { PinTopAltIcon } from "@rain-next/ui/icons/pin-top-alt";
import { PinTopAlt2Icon } from "@rain-next/ui/icons/pin-top-alt-2";
import { RatingStarIcon } from "@rain-next/ui/icons/rating-star";
import { RatingStar100Icon } from "@rain-next/ui/icons/rating-star-100";
import { SearchIcon } from "@rain-next/ui/icons/search";
import "./icon-button-page.css";

const rowActionRecipe = defineRainLocalRecipe<IconButtonPart, "ui-icon-button">({
  id: "icon-button-course-row-action", scope: "feature", origin: "ui-icon-button",
  classes: { root: "icon-button-page__row-action" }, modifiedParts: ["root"],
  candidateTokens: [], promotionStatus: "not-proposed",
});

const emphasisRecipe = defineRainLocalRecipe<IconButtonPart, "ui-icon-button">({
  id: "icon-button-contained-emphasis", scope: "feature", origin: "ui-icon-button",
  classes: { root: "data-[feedback=interactive]:hover:bg-rain-action-ghost data-[feedback=interactive]:active:bg-rain-action-ghost data-[feedback=interactive]:hover:text-rain-category-icon-neutral-1 data-[feedback=interactive]:active:text-rain-category-icon-neutral-1" },
  modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
});

function Section({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-title`} className="icon-button-page__section">
    <h2 id={`${id}-title`} tabIndex={-1}>{title}</h2>
    <p className="icon-button-page__description">{description}</p>
    {children}
  </section>;
}

const markExamples = [
  { id: "star-favorite", title: "星标收藏", label: "星标收藏课程", icon: <RatingStarIcon />, markedIcon: <RatingStar100Icon />,
    resting: "尚未收藏", marked: "已收藏", description: "星形由线性变为面性，保留收藏标记。" },
  { id: "favorite", title: "心形收藏", label: "收藏课程", icon: <FavoriteIcon />, markedIcon: <FavoriteFilledIcon />,
    resting: "尚未收藏", marked: "已收藏", description: "心形由线性变为面性，是另一种收藏表达。" },
  { id: "like", title: "点赞", label: "点赞课程", icon: <LikeIcon />, markedIcon: <LikeFilledIcon />,
    resting: "尚未点赞", marked: "已点赞", description: "面性图标表示已经点赞，再次点击取消。" },
  { id: "dislike", title: "不喜欢", label: "不喜欢课程", icon: <DislikeIcon />, markedIcon: <DislikeFilledIcon />,
    resting: "尚未标记", marked: "已标记不喜欢", description: "面性图标表示不喜欢，与点赞示例独立体验。" },
  { id: "applause", title: "鼓掌", label: "为课程鼓掌", icon: <LikeAlt2Icon />, markedIcon: <LikeAltIcon />,
    resting: "尚未鼓掌", marked: "已鼓掌", description: "选中后填充后掌，沿用现有图形。" },
  { id: "top", title: "置顶", label: "置顶课程", icon: <PinTopAlt2Icon />, markedIcon: <PinTopAlt2Icon />,
    resting: "尚未置顶", marked: "已置顶", description: "前后使用同一图形，以蓝色和状态文字表示置顶。" },
  { id: "pin", title: "固定", label: "固定课程", icon: <PinIcon />, markedIcon: <PinTopAltIcon />,
    resting: "尚未固定", marked: "已固定", description: "固定后图钉改变朝向，使用已确认的现有配对。" },
] as const;

function MarkExample({ example }: { example: typeof markExamples[number] }) {
  const [marked, setMarked] = useState(false);
  const statusId = `icon-button-mark-${example.id}-status`;
  return <div className="icon-button-page__sample" data-testid={`icon-button-mark-${example.id}`}>
    <h3>{example.title}</h3>
    <div className="icon-button-page__row">
      <IconButton aria-label={example.label} aria-pressed={marked} aria-describedby={statusId}
        highlight={marked ? "icon" : "none"} icon={marked ? example.markedIcon : example.icon}
        onClick={() => setMarked((current) => !current)} />
      <span id={statusId}>{marked ? example.marked : example.resting}</span>
    </div>
    <p className="icon-button-page__description">{example.description}</p>
  </div>;
}

function FilterExample({ fixture, initiallyApplied, initiallyOpen }: { fixture: string; initiallyApplied: boolean; initiallyOpen: boolean }) {
  const [applied, setApplied] = useState(initiallyApplied);
  const [open, setOpen] = useState(initiallyOpen);
  const panelId = `icon-button-filter-panel-${fixture}`;
  return <div className="icon-button-page__sample" data-testid={`icon-button-filter-${fixture}`}>
    <div className="icon-button-page__row">
      <IconButton aria-label="筛选课程" aria-expanded={open} aria-controls={panelId}
        aria-describedby={`${panelId}-status`} highlight={open ? "surface" : applied ? "icon" : "none"}
        icon={applied ? <FilterFilledIcon /> : <FilterIcon />} onClick={() => setOpen((current) => !current)} />
      <span id={`${panelId}-status`}>{applied ? "已筛选" : "未筛选"} · {open ? "已展开" : "已收起"}</span>
    </div>
    <div className="icon-button-page__panel" hidden={!open} id={panelId}>
      <p>仅显示进行中的课程</p>
      <div className="icon-button-page__row">
        <Button variant="text" onClick={() => setApplied(true)}>应用筛选</Button>
        <Button variant="text" onClick={() => setApplied(false)}>清除筛选</Button>
      </div>
    </div>
  </div>;
}

export function IconButtonPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const [loadingActivations, setLoadingActivations] = useState(0);
  const [rowActivations, setRowActivations] = useState(0);
  const [editActivations, setEditActivations] = useState(0);
  const [query, setQuery] = useState("");
  const [inputFeedback, setInputFeedback] = useState("输入关键词后，点击搜索或按 Enter。");
  const [feedback, setFeedback] = useState("移入、按住按钮或按 Tab，比较每一种反馈。");
  const [sizeFeedback, setSizeFeedback] = useState("点击任意尺寸，体验不同点击区域。");

  function search() {
    setInputFeedback(query.trim() ? `正在查看“${query.trim()}”的演示结果` : "请输入课程关键词。");
  }

  return <main className="icon-button-page rain-type-ui-default" data-rain-id="icon-button-page"
    data-asset-identity="local-experiment" data-rain-theme={theme}>
    <div className="icon-button-page__content">
      <header className="icon-button-page__hero">
        <Link href="#components">返回组件页</Link>
        <p className="icon-button-page__eyebrow">RAIN NEXT · ICONBUTTON</p>
        <h1 id="icon-button-title" tabIndex={-1}>图标按钮，让紧凑操作更清楚</h1>
        <p>保留雨课堂的图标比例与轻量反馈，使用新的颜色、尺寸与键盘焦点。</p>
        <p className="icon-button-page__description">本地演示 · 视觉验收已通过</p>
        <div className="icon-button-page__theme" role="group" aria-label="预览主题">
          <span>预览主题</span>
          <Button variant={theme === "light" ? "primary" : "secondary"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant={theme === "dark" ? "primary" : "secondary"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
        </div>
      </header>

      <Section id="icon-button-actions" title="动作、标记与面板，各自表达" description="7 种标记操作与目录面板可以独立体验，下方还有筛选的 4 种状态。标记只突出图标，持续展开的面板保留浅蓝背景。">
        <div className="icon-button-page__columns">
          {markExamples.map((example) => <MarkExample key={example.id} example={example} />)}
          <div className="icon-button-page__sample">
            <h3>课程目录</h3>
            <div className="icon-button-page__row">
              <IconButton aria-label={directoryOpen ? "收起课程目录" : "展开课程目录"} aria-expanded={directoryOpen} aria-controls="icon-button-course-directory"
                highlight={directoryOpen ? "surface" : "none"} icon={directoryOpen ? <CollapseIcon /> : <ExpandIcon />} onClick={() => setDirectoryOpen((current) => !current)} />
              <span>{directoryOpen ? "目录已展开" : "目录已收起"}</span>
            </div>
            <p className="icon-button-page__description">图标表示下一步展开或收起；浅蓝背景表示目录正在展开。</p>
            <div className="icon-button-page__panel" hidden={!directoryOpen} id="icon-button-course-directory">
              <p>第一章 · 函数与极限</p><p>第二章 · 导数与微分</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="icon-button-filters" title="筛选生效与面板展开，分别表达" description="实心漏斗表示已有筛选，浅蓝背景表示面板展开。收起面板后，已有筛选仍然保留。">
        <div className="icon-button-page__columns">
          <FilterExample fixture="00" initiallyApplied={false} initiallyOpen={false} />
          <FilterExample fixture="01" initiallyApplied={false} initiallyOpen />
          <FilterExample fixture="10" initiallyApplied initiallyOpen={false} />
          <FilterExample fixture="11" initiallyApplied initiallyOpen />
        </div>
      </Section>

      <Section id="icon-button-appearances" title="普通、危险与高亮" description="默认无底色，移入后出现轻背景；高亮可以只突出图标，也可以同时保留浅底色。">
        <div className="icon-button-page__scroll">
          <table className="icon-button-page__table" aria-label="图标按钮外观与状态">
            <thead><tr><th scope="col">外观</th><th scope="col">可操作</th><th scope="col">禁用</th><th scope="col">加载中</th><th scope="col">禁用并加载</th></tr></thead>
            <tbody>{([
              { name: "普通", props: { tone: "default", highlight: "none" }, icon: <EditPencilIcon /> },
              { name: "危险", props: { tone: "danger", highlight: "none" }, icon: <DeleteIcon /> },
              { name: "图标高亮", props: { tone: "default", highlight: "icon" }, icon: <FavoriteFilledIcon /> },
              { name: "浅底高亮", props: { tone: "default", highlight: "surface" }, icon: <LayoutSplitIcon /> },
            ] as const).map(({ name, props, icon }) => <tr key={name}>
              <th scope="row">{name}</th>
              {[{ name: "可操作" }, { name: "禁用", disabled: true }, { name: "加载中", loading: true }, { name: "禁用并加载", loading: true, disabled: true }].map(({ name: stateName, ...state }) => <td key={stateName}>
                <IconButton {...props} {...state} icon={icon} aria-label={`${name} ${stateName}`} onClick={() => setFeedback(`已触发${name}操作，仅在本页演示。`)} />
              </td>)}
            </tr>)}</tbody>
          </table>
        </div>
        <p className="icon-button-page__feedback" role="status">{feedback}</p>
        <div className="icon-button-page__sample">
          <h3>已有清晰容器时，只加深图标</h3>
          <div className="icon-button-page__row">
            <IconButton aria-label="强调反馈编辑" icon={<EditPencilIcon />} localRecipe={emphasisRecipe} onClick={() => setFeedback("已触发局部强调反馈的编辑操作。")} />
            <IconButton aria-label="强调反馈禁用" icon={<EditPencilIcon />} localRecipe={emphasisRecipe} disabled />
            <IconButton aria-label="强调反馈加载" icon={<EditPencilIcon />} localRecipe={emphasisRecipe} loading />
            <span>默认 · 禁用 · 加载</span>
          </div>
          <p className="icon-button-page__description">这种局部反馈保留透明背景；禁用与加载继续遵循组件规则。</p>
        </div>
      </Section>

      <Section id="icon-button-loading" title="等待时留在原位，结束后显示最新结果" description="切换下方状态，观察等待图形、禁用颜色与原按钮尺寸。加载期间的点击不会重复触发。">
        <div className="icon-button-page__row">
          <IconButton data-testid="icon-button-loading-action" aria-label="同步收藏结果" aria-pressed={loadingFavorite}
            highlight={loadingFavorite ? "icon" : "none"} icon={loadingFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
            loading={loading} disabled={disabled} onClick={() => setLoadingActivations((current) => current + 1)} />
          <span data-testid="icon-button-loading-status" role="status">触发 {loadingActivations} 次 · 当前结果{loadingFavorite ? "已收藏" : "未收藏"}</span>
        </div>
        <div className="icon-button-page__controls">
          <label><input type="checkbox" checked={loading} onChange={(event) => setLoading(event.currentTarget.checked)} />加载中</label>
          <label><input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.currentTarget.checked)} />操作不可用</label>
          <label><input type="checkbox" checked={loadingFavorite} onChange={(event) => setLoadingFavorite(event.currentTarget.checked)} />加载期间更新收藏结果</label>
        </div>
      </Section>

      <Section id="icon-button-embedded" title="放进表格与输入框" description="行内操作在移入或键盘进入时出现。点击编辑不会打开整行，输入框尾部搜索也有自己的键盘位置。">
        <div className="icon-button-page__scroll">
          <table className="icon-button-page__table" aria-label="课程操作演示">
            <thead><tr><th scope="col">课程</th><th scope="col">进度</th><th scope="col">操作</th></tr></thead>
            <tbody><tr data-testid="icon-button-table-row" onClick={() => setRowActivations((current) => current + 1)}>
              <td><Button variant="text">高等数学 · 第一章</Button></td><td>进行中</td>
              <td><IconButton aria-label="编辑第一章" size="24/14" icon={<EditPencilIcon />} localRecipe={rowActionRecipe}
                onClick={(event) => { event.stopPropagation(); setEditActivations((current) => current + 1); }} /></td>
            </tr></tbody>
          </table>
        </div>
        <p className="icon-button-page__feedback" data-testid="icon-button-row-status" role="status">打开课程 {rowActivations} 次 · 编辑 {editActivations} 次</p>
        <div className="icon-button-page__input-example">
          <label htmlFor="icon-button-course-search">课程关键词</label>
          <Input id="icon-button-course-search" value={query} onValueChange={setQuery} onPressEnter={search}
            trailingAction={<IconButton aria-label="搜索课程" size="24/16" icon={<SearchIcon />} onClick={search} />} />
          <p className="icon-button-page__feedback" data-testid="icon-button-input-status" role="status">{inputFeedback}</p>
        </div>
      </Section>

      <Section id="icon-button-density" title="默认尺寸跟随区域密度" description="紧凑区域默认 32 / 18，常规区域默认 36 / 20。明确选定的 24 / 14 在两种区域中保持一致。">
        <div className="icon-button-page__columns">{(["compact", "default"] as const).map((density) => <DensityProvider density={density} key={density}>
          <div className="icon-button-page__sample" data-testid={`icon-button-density-${density}`}>
            <h3>{density === "compact" ? "紧凑区域" : "常规区域"}</h3>
            <div className="icon-button-page__row"><IconButton aria-label={`${density} 默认尺寸`} icon={<EditPencilIcon />} onClick={() => setSizeFeedback(`已体验${density === "compact" ? "紧凑" : "常规"}区域默认尺寸。`)} /><span>区域默认</span></div>
            <div className="icon-button-page__row"><IconButton aria-label={`${density} 明确尺寸`} size="24/14" icon={<EditPencilIcon />} onClick={() => setSizeFeedback("明确尺寸 24 / 14 在两种区域中保持一致。")} /><span>固定 24 / 14</span></div>
          </div>
        </DensityProvider>)}</div>
      </Section>

      <Section id="icon-button-sizes" title="18 组按钮与图标尺寸" description="数字分别是按钮外框与图标槽，单位 px。相同区域先统一按钮外框，再按图形的视觉重量选择图标尺寸。">
        <div className="icon-button-page__size-grid" data-testid="icon-button-size-matrix">
          {Object.entries(iconButtonSizes).map(([size, geometry]) => <div className="icon-button-page__size" key={size}>
            <IconButton aria-label={`体验 ${size} 尺寸`} size={size as IconButtonSize} icon={<EditPencilIcon />} onClick={() => setSizeFeedback(`当前体验 ${size} 尺寸。`)} />
            <strong>{geometry.control} / {geometry.icon}</strong><small>圆角 {geometry.radius}</small>
          </div>)}
        </div>
        <p className="icon-button-page__feedback" role="status">{sizeFeedback}</p>
        <p className="icon-button-page__description">小于 24px 的按钮用于桌面紧凑区域，实际排列仍需留出足够的点击空间。</p>
      </Section>

      <Section id="icon-sizes" title="公共图标尺寸" description="15 档尺寸供整个组件库共用。4 / 6 是公共微型符号档，需按具体图形验证适用性；点击区域和状态由所在控件决定。">
        <div className="icon-button-page__size-grid" data-testid="icon-size-matrix">
          {iconSizeTokenEntries.map(([size, token]) => <div className="icon-button-page__size" data-icon-size={size} key={size}>
            <EditPencilIcon className={iconSizeClassNames[size]} /><strong>{token.value} px</strong>
            <small>{token.range === "micro" ? "微型符号档" : "常用尺寸"}</small>
          </div>)}
        </div>
        <p className="icon-button-page__description">尺寸对应标准图标画布，实际轮廓可能留有光学边距。Loading 复用统一资产，在同一图标槽中保持约定的可见尺寸。</p>
        <Link href="#foundations">返回 Foundations</Link> · <Link href="#icons">查看完整图标库</Link>
      </Section>
      <footer className="icon-button-page__description">此页只演示本地交互，尚未发布，也没有迁移现有业务组件。</footer>
    </div>
  </main>;
}
