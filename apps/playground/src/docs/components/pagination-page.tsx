import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button, Checkbox, FormItem, Link, Pagination, Select, type PaginationChangeDetails, type PaginationSize } from "@rain-next/ui";
import "./input-page.css";
import "./pagination-page.css";

const courses = Array.from({ length: 137 }, (_, index) => ({
  id: index + 1,
  name: ["人工智能导论", "大学物理", "设计思维", "数据分析基础", "中国文化概论", "高等数学"][index % 6],
}));
type PageState = { page: number; pageSize: number };
type PreviewProps = { size?: PaginationSize; showJumper: boolean; showLessItems: boolean; pageSizePlacement?: "settings" | "inline" };

function CourseListExample(props: PreviewProps) {
  const [state, setState] = useState<{ shown: PageState; target: PaginationChangeDetails | null; error: boolean; retrying: boolean }>({
    shown: { page: 1, pageSize: 20 }, target: null, error: false, retrying: false,
  });
  const [delay, setDelay] = useState(600);
  const [failNext, setFailNext] = useState(false);
  const latestRequest = useRef(0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const retryButton = useRef<HTMLButtonElement>(null);
  const resultsTitle = useRef<HTMLHeadingElement>(null);
  useEffect(() => () => { latestRequest.current++; timers.current.forEach(clearTimeout); }, []);
  const { shown, target, error } = state;
  const loading = target !== null && !error;
  const start = (shown.page - 1) * shown.pageSize;
  const records = courses.slice(start, start + shown.pageSize);
  const maxPage = Math.ceil(courses.length / shown.pageSize);

  function loadPage(next: PaginationChangeDetails, wait = delay, fail = failNext, retrying = false) {
    const request = ++latestRequest.current;
    setFailNext(false);
    setState((current) => ({ ...current, target: next, error: false, retrying }));
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      if (request !== latestRequest.current) return;
      if (!fail && retrying && document.activeElement === retryButton.current) resultsTitle.current?.focus({ preventScroll: true });
      setState((current) => fail
        ? { ...current, target: next, error: true, retrying: false }
        : { shown: { page: next.page, pageSize: next.pageSize }, target: null, error: false, retrying: false });
    }, wait);
    timers.current.add(timer);
  }

  return <section className="input-page__stack" aria-labelledby="pagination-data-title" data-rain-id="pagination-data-example" data-asset-identity="local-experiment">
    <h2 id="pagination-data-title">数据分页 · 课程列表</h2>
    <p>总数与翻页保持一行；每页条数和跳页收在末尾的更多按钮中。以下为模拟课程数据。</p>
    <div className="pagination-page__preview" data-slot="preview-container">
      <div className="pagination-page__list-heading">
        <h3 ref={resultsTitle} tabIndex={-1} data-slot="results-title">全部课程</h3>
        <p data-slot="data-range">当前显示第 {start + 1}–{start + records.length} 条</p>
      </div>
      <div role="region" aria-label="当前课程列表" aria-busy={loading} className="pagination-page__records" tabIndex={0} data-focus="control">
        <ol data-slot="records" start={start + 1}>
          {records.map((course) => <li key={course.id}><span>课程 {String(course.id).padStart(3, "0")}</span><span>{course.name}</span></li>)}
        </ol>
      </div>
      <Pagination {...props} variant="data" total={courses.length} page={shown.page} pageSize={shown.pageSize}
        loading={loading} onChange={loadPage} aria-label="课程列表分页" />
      <div className="pagination-page__feedback">
        <p role="status" data-slot="data-status">{loading
          ? `正在加载第 ${target.page} 页，当前列表保留。`
          : error ? `第 ${target!.page} 页加载失败，当前列表已保留，请重试。`
            : `已显示第 ${shown.page} 页，每页 ${shown.pageSize} 条。`}</p>
        {(error || state.retrying) && <Button ref={retryButton} variant="secondary" loading={loading}
          onClick={() => loadPage(target!, delay, false, true)}>重试</Button>}
      </div>
    </div>
    <div className="pagination-page__simulation" role="group" aria-label="模拟加载设置">
      <FormItem label="模拟加载速度">
        <Select size={props.size} value={delay} clearable={false}
          options={[{ value: 150, label: "快速 · 0.15 秒" }, { value: 600, label: "常规 · 0.6 秒" }, { value: 1200, label: "慢速 · 1.2 秒" }]}
          onValueChange={(value) => { if (typeof value === "number") setDelay(value); }} />
      </FormItem>
      <Checkbox label="模拟下次加载失败" checked={failNext} disabled={loading} onCheckedChange={setFailNext} />
      <Button disabled={loading || shown.page >= maxPage - 1} onClick={() => {
        loadPage({ page: shown.page + 1, pageSize: shown.pageSize, reason: "page" }, 900);
        loadPage({ page: shown.page + 2, pageSize: shown.pageSize, reason: "page" }, 200, false);
      }}>连续翻两页</Button>
    </div>
    <p>“连续翻两页”模拟后一页先加载完成；较早发起的结果不会覆盖最新页面。失败时保留当前数据，重试仍前往原目标页。</p>
  </section>;
}

function AdditionalStates({ size }: Pick<PreviewProps, "size">) {
  const [unknownPage, setUnknownPage] = useState(1);
  const [hideSingle, setHideSingle] = useState(true);
  return <section className="input-page__stack" aria-labelledby="pagination-states-title">
    <h2 id="pagination-states-title">边界与状态</h2>
    <div className="pagination-page__states">
      <div className="pagination-page__state">
        <h3>没有数据</h3>
        <Pagination size={size} variant="data" total={0} aria-label="零条分页" />
      </div>
      <div className="pagination-page__state">
        <h3>只有一页</h3>
        <Checkbox label="单页时隐藏导航" checked={hideSingle} onCheckedChange={setHideSingle} />
        <Pagination size={size} variant="data" total={8} hideOnSinglePage={hideSingle} aria-label="单页分页" />
      </div>
      <div className="pagination-page__state">
        <h3>较多页码</h3>
        <Pagination size={size} total={240000} defaultPage={10000} showJumper aria-label="大页码分页" />
      </div>
      <div className="pagination-page__state">
        <h3>总数尚未提供</h3>
        <p>只显示当前页；能否继续由本地样例提供。</p>
        <Pagination size={size} page={unknownPage} hasNextPage={unknownPage < 5}
          onChange={({ page }) => setUnknownPage(page)} aria-label="未知总数分页" />
      </div>
      <div className="pagination-page__state">
        <h3>暂不可操作</h3>
        <Pagination size={size} variant="data" total={137} defaultPage={3} disabled showJumper aria-label="禁用分页" />
      </div>
    </div>
  </section>;
}

function LinkedPagination({ size }: Pick<PreviewProps, "size">) {
  const [page] = useState(() => {
    const value = new URLSearchParams(window.location.search).get("pagination-page") ?? "1";
    return /^[1-9]\d*$/.test(value) && Number(value) <= 20 ? Number(value) : 1;
  });
  return <section className="input-page__stack" aria-labelledby="pagination-links-title">
    <h2 id="pagination-links-title">链接导航</h2>
    <p>页码使用本站链接，支持复制链接和在新标签页打开；刷新后保留链接中的页码。</p>
    <div className="pagination-page__state">
      <Pagination size={size} total={400} page={page}
        getPageHref={(next) => `?pagination-page=${next}#pagination`} aria-label="链接分页" />
    </div>
  </section>;
}

export function PaginationPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [density, setDensity] = useState<Density>("default");
  const [size, setSize] = useState<PaginationSize>();
  const [width, setWidth] = useState(1000);
  const [showJumper, setShowJumper] = useState(true);
  const [inlineSize, setInlineSize] = useState(false);
  const [showLessItems, setShowLessItems] = useState(false);
  const [basic, setBasic] = useState<PageState>({ page: 1, pageSize: 20 });
  const [simple, setSimple] = useState<PageState>({ page: 1, pageSize: 20 });
  const previewProps: PreviewProps = { size, showJumper, showLessItems, pageSizePlacement: inlineSize ? "inline" : "settings" };

  return <DensityProvider density={density}><main className="input-page pagination-page rain-type-ui-default"
    data-rain-id="pagination-page" data-rain-theme={theme} data-density={density}
    style={{ "--rain-local-pagination-preview-width": `${width}px` } as CSSProperties}>
    <div className="input-page__content">
      <header className="input-page__header">
        <Link href="#components">返回组件总览</Link>
        <h1 id="pagination-title" tabIndex={-1}>Pagination 分页</h1>
        <p>用于课程、资源与记录列表。轻量页码、浅蓝当前页，支持按页浏览、调整条数与快速跳转。</p>
        <div className="pagination-page__controls">
          <div className="input-page__row" role="group" aria-label="预览主题">
            {(["light", "dark"] as const).map((value) => <Button key={value} variant={theme === value ? "primary" : "secondary"}
              aria-pressed={theme === value} onClick={() => setTheme(value)}>{value === "light" ? "浅色" : "深色"}</Button>)}
          </div>
          <div className="input-page__row" role="group" aria-label="区域密度">
            {(["default", "compact"] as const).map((value) => <Button key={value} variant={density === value ? "primary" : "secondary"}
              aria-pressed={density === value} onClick={() => setDensity(value)}>{value === "default" ? "常规" : "紧凑"}</Button>)}
          </div>
          <div className="input-page__row" role="group" aria-label="分页尺寸">
            <Button variant={size === undefined ? "primary" : "secondary"} aria-pressed={size === undefined} onClick={() => setSize(undefined)}>自动</Button>
            {([24, 28, 32] as const).map((value) => <Button key={value} variant={size === value ? "primary" : "secondary"}
              aria-pressed={size === value} onClick={() => setSize(value)}>{value}px</Button>)}
          </div>
        </div>
        <p>自动尺寸：常规 32px、紧凑 24px。显式选择尺寸后，窄容器只调整布局，控件高度保持不变。</p>
        <div className="pagination-page__controls">
          <div className="pagination-page__width-control">
            <label htmlFor="pagination-preview-width">预览容器宽度</label>
            <input id="pagination-preview-width" type="range" min={240} max={1100} step={10} value={width}
              data-focus="control" onChange={(event) => setWidth(Number(event.target.value))} />
            <output htmlFor="pagination-preview-width">{width}px</output>
          </div>
          <Checkbox label="允许跳页" checked={showJumper} onCheckedChange={setShowJumper} />
          <Checkbox label="条数常驻" checked={inlineSize} onCheckedChange={setInlineSize} />
          <Checkbox label="减少页码" checked={showLessItems} onCheckedChange={setShowLessItems} />
        </div>
        <p>宽度控制下方三种组合，最大不超过页面可用空间。</p>
      </header>

      <CourseListExample {...previewProps} />

      <section className="input-page__stack" aria-labelledby="pagination-basic-title" data-rain-id="pagination-basic-example">
        <h2 id="pagination-basic-title">基础分页 · 内容浏览</h2>
        <p>适合只需要选择页码的内容列表。省略号可以跨段跳页。</p>
        <div className="pagination-page__preview" data-slot="preview-container">
          <p data-slot="current-page">正在浏览第 {basic.page} 页内容</p>
          <Pagination {...previewProps} {...basic} total={240} onChange={({ page, pageSize }) => setBasic({ page, pageSize })} aria-label="基础分页" />
        </div>
      </section>

      <section className="input-page__stack" aria-labelledby="pagination-simple-title" data-rain-id="pagination-simple-example">
        <h2 id="pagination-simple-title">精简分页 · 小空间</h2>
        <p>以当前页和总页数保持位置感，适合侧栏和窄面板。</p>
        <div className="pagination-page__preview" data-slot="preview-container">
          <p data-slot="current-page">正在浏览第 {simple.page} 页内容</p>
          <Pagination {...previewProps} {...simple} variant="simple" total={240}
            onChange={({ page, pageSize }) => setSimple({ page, pageSize })} aria-label="精简分页" />
        </div>
      </section>

      <AdditionalStates size={size} />
      <LinkedPagination size={size} />

      <section className="input-page__stack" aria-labelledby="pagination-api-title">
        <h2 id="pagination-api-title">使用与组合</h2>
        <dl className="pagination-page__api">
          <dt>三种组合</dt><dd>variant 为 basic、data 或 simple。data 默认显示总数，条数选择收在更多按钮中。已知总页数时默认允许跳页；showTotal、showPageSize 和 showJumper 分别控制这些能力。</dd>
          <dt>辅助操作</dt><dd>pageSizePlacement 默认为 settings，设为 inline 可常驻紧凑的条数入口。两种入口均打开同一个浮层；条数选中即生效，跳页通过输入框内的“跳转”文字按钮或 Enter 提交。横向省略号用于跨段翻页，末尾竖向更多按钮打开设置。</dd>
          <dt>页码与条数</dt><dd>page / pageSize 为受控值，defaultPage / defaultPageSize 为初始值。页码从 1 开始，每页默认 20 条，可选 10 / 20 / 50 / 100。修改条数时保留原首条记录所在的新页。</dd>
          <dt>数据归属</dt><dd>onChange 一次给出 page、pageSize 和 reason。宿主负责请求、筛选、排序、加载和错误；组件不请求数据。本页示例等待模拟结果成功后一起接受新页码和新条数。</dd>
          <dt>数量与范围</dt><dd>已知数量传 total；未知数量省略 total 并提供 hasNextPage。showTotal="range" 可显示记录范围。hideOnSinglePage 仅隐藏单页导航，保留需要的辅助区。</dd>
          <dt>大小与布局</dt><dd>size 支持 24 / 28 / 32，align 支持 start / center / end。分页始终单行；responsive 按整条可用空间减少页码、切换当前页/总页数，再将总数收进浮层。showLessItems 主动减少页码，控件高度保持不变。</dd>
          <dt>链接与内容</dt><dd>getPageHref 提供真实链接；renderPage 只替换页码内容。布局可使用 className，视觉改造沿用具名 localRecipe；保持 Rain Token、尺寸、语义和焦点规范。</dd>
          <dt>键盘与状态</dt><dd>Tab 按自然顺序移动，Enter 激活或提交跳页。跳页失焦不提交，空值不提交，非法值提示范围。disabled 阻止操作；loading 保留当前内容并阻止重复分页操作。当前页提供 aria-current。</dd>
        </dl>
      </section>
      <section className="input-page__stack" aria-labelledby="pagination-lineage-title">
        <h2 id="pagination-lineage-title">视觉来源</h2>
        <p>以 Rain Classic Vue 分页器的视觉血缘和业务能力为参考，使用 Rain Token、现有按钮与字段重写。保留教育管理场景的清晰密度，改善页码层级、窄容器布局和输入反馈。</p>
        <div className="input-page__row">
          <Link href="https://ui.shadcn.com/docs/components/base/pagination">shadcn · 组合与链接</Link>
          <Link href="https://ant.design/components/pagination/">Ant Design · 功能对照</Link>
          <Link href="https://mui.com/material-ui/react-pagination/">MUI · 页码窗口</Link>
          <Link href="https://www.chakra-ui.com/docs/components/pagination">Chakra · 精简呈现</Link>
        </div>
      </section>
      <p className="input-page__note">当前为本地候选组件，模拟数据刷新后重置。运行视觉、对比度与人工验收分别记录，尚未发布。</p>
    </div>
  </main></DensityProvider>;
}
