import { DocReference } from "./component-doc";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Breadcrumb, Button, Link, type BreadcrumbEntry } from "@rain-next/ui";
import "./breadcrumb-page.css";

const destination = (id: string, label: string) => ({ id, label, href: `?breadcrumb-page=${id}#breadcrumb` });
const root = destination("messages", "消息中心");
const siblings = [destination("notices", "行政通知"), destination("teaching", "教学通知"), { ...destination("archived", "归档通知"), disabled: true }];
const notice = { ...siblings[0]!, siblings };
const detail = destination("detail", "通知详情");
const basic = [root, notice, detail];
const longLabel = "关于开展本学期本科教学质量检查与课程材料归档工作的通知";
const deep = [destination("home", "工作台"), destination("school", "学校管理"), destination("department", "教务处"), root, notice, detail];
const titles: Record<string, string> = { messages: "消息中心", notices: "行政通知", teaching: "教学通知", detail: "通知详情", home: "工作台", school: "学校管理", department: "教务处", long: longLabel };
const readPage = () => new URLSearchParams(window.location.search).get("breadcrumb-page") ?? "detail";

export function BreadcrumbPage() {
  const [page, setPage] = useState(readPage), [width, setWidth] = useState(560);
  const heading = useRef<HTMLHeadingElement>(null), moveFocus = useRef(false);
  useEffect(() => { if (moveFocus.current) { heading.current?.focus(); moveFocus.current = false; } }, [page]);
  useEffect(() => { const sync = () => { moveFocus.current = true; setPage(readPage()); }; window.addEventListener("popstate", sync); return () => window.removeEventListener("popstate", sync); }, []);
  function navigate(id: string) { moveFocus.current = true; window.history.pushState(null, "", destination(id, "").href); setPage(id); }
  function follow(event: MouseEvent<HTMLElement>) {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(anchor.href), id = url.searchParams.get("breadcrumb-page");
    if (id && url.origin === window.location.origin && url.hash === "#breadcrumb") { event.preventDefault(); navigate(id); }
  }
  const livePath: BreadcrumbEntry[] = page === "detail" ? basic : page === "notices" || page === "teaching"
    ? [root, { ...destination(page, titles[page]!), siblings }] : [destination(page, titles[page] ?? "消息中心")];
  return <main className="breadcrumb-demo rain-type-ui-default" onClick={follow}>
    <header className="breadcrumb-demo__intro"><Link href="#components">返回组件总览</Link><p className="breadcrumb-demo__eyebrow">导航 / NAVIGATION</p>
      <h1 id="breadcrumb-title" tabIndex={-1}>Breadcrumb 面包屑</h1><p>知道身在何处，也能轻松返回上级、切换同级。</p>
      <div className="breadcrumb-demo__spec"><span>13px 常规字重</span><span>22px 视觉高度</span><span>整项展开与收起</span></div>
    </header>
    <section data-testid="basic"><h2><small>01</small> 基础路径</h2><p>上级可返回，当前页保持深色静态文本。</p>
      <div className="breadcrumb-demo__stage"><Breadcrumb aria-label="基础路径" items={[root, destination("notices", "行政通知"), detail]} /></div>
    </section>
    <section data-testid="siblings"><h2><small>02</small> 整项展开 · 切换同级</h2><p>文字和箭头组成完整的下拉入口。点击整项展开或收起菜单，也可从菜单返回当前层。</p>
      <div className="breadcrumb-demo__stage"><Breadcrumb aria-label="可交互路径" items={livePath} />
        <div className="breadcrumb-demo__content"><h3 ref={heading} tabIndex={-1}>{titles[page] ?? "消息中心"}</h3><p role="status">{page === "detail" ? "关于本学期教学安排的通知" : `已进入${titles[page] ?? "消息中心"}`}</p><Button size="small" variant="text" onClick={() => navigate("detail")}>打开通知详情</Button></div>
      </div>
    </section>
    <section data-testid="states"><h2><small>03</small> 状态与语义</h2><p>用鼠标悬停、按下，或使用 Tab 查看焦点。分组名称与禁用入口分别表达不同含义。</p>
      <div className="breadcrumb-demo__stage breadcrumb-demo__states">
        <div><span>可返回 / 当前位置</span><Breadcrumb items={[root, detail]} aria-label="普通状态" /></div>
        <div><span>静态分组 / 禁用入口</span><Breadcrumb items={[{ id: "group", label: "教学管理" }, { ...destination("locked", "归档课程"), disabled: true }, detail]} aria-label="禁用状态" /></div>
        <div><span>当前位置也能切换同级</span><Breadcrumb items={[root, notice]} aria-label="当前层切换" /></div>
      </div>
    </section>
    <section data-testid="long"><h2><small>04</small> 长名称</h2><p>仅在文字被截断时显示完整名称；鼠标悬停和键盘聚焦都可查看。</p>
      <div className="breadcrumb-demo__stage"><Breadcrumb aria-label="长名称路径" items={[root, notice, { id: "long", label: longLabel, siblings: [destination("long", longLabel), detail] }]} /></div>
    </section>
    <section data-testid="deep"><h2><small>05</small> 深层路径</h2><p>先折叠中间层级，尽量保留根节点、父级与当前页；更窄时将根节点也收进上级菜单。</p>
      <label className="breadcrumb-demo__slider">容器宽度 <output>{width}px</output><input aria-label="路径容器宽度" type="range" min="240" max="800" value={width} onChange={event => setWidth(Number(event.target.value))} /></label>
      <div className="breadcrumb-demo__stage breadcrumb-demo__resize" style={{ width }}><Breadcrumb aria-label="深层路径" items={deep} /></div>
    </section>
    <section data-testid="header"><h2><small>06</small> 页面头部组合</h2><p>返回、页面标题和页面操作各自独立，面包屑始终保持单行。</p>
      <div className="breadcrumb-demo__stage breadcrumb-demo__header-example"><Breadcrumb aria-label="页面头部路径" items={deep} />
        <div className="breadcrumb-demo__page-title"><Button size="small" variant="text" onClick={() => navigate("notices")}>返回通知列表</Button><h3>通知详情</h3><Button size="small" variant="secondary" onClick={() => window.print()}>打印</Button></div>
        <p>关于本学期教学安排的通知</p><p className="breadcrumb-demo__muted">教务处 · 2026 年 9 月 24 日</p>
      </div>
    </section>
    <DocReference id="breadcrumb" title="Breadcrumb" source="packages/ui/src/breadcrumb/breadcrumb.tsx"
      props={[{name:"items",type:"readonly BreadcrumbEntry[]",description:"唯一id、名称与真实目的地；最后一项为当前页"},{name:"label / href",type:"string / string",description:"条目名称与原生导航地址"},{name:"siblings",type:"readonly BreadcrumbDestination[]",description:"同级目的地，菜单与文字截断提示互斥"},{name:"aria-label",type:"string",description:"区分多个路径导航区域"}]}
      slots={["Breadcrumb (root)","List","Item","Link","Text","Page","Separator","Ellipsis","Back","Menu"]}
      code={'import { Breadcrumb } from "@rain-next/ui";\n\nexport function CoursePath() {\n  return <Breadcrumb aria-label="课程路径" items={[\n    { id: "library", label: "组件目录", href: "#components" },\n    { id: "course", label: "课程资料" },\n  ]} />;\n}'} />
    <footer>本地组件候选 · 沿用 Rain 字体、颜色、菜单与提示 · 视觉已验收</footer>
  </main>;
}
