import { useMemo, useState } from "react";

import { iconCatalog } from "@rain-next/foundations/icons/catalog";
import { getIconUsage } from "@rain-next/foundations/icons/icon-contract";
import { Button, Input, Link } from "@rain-next/ui";
import { Icon } from "@rain-next/ui/icon";
import { iconPreviews } from "@rain-next/ui/icons/catalog";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";
import { CircleCheckIcon } from "@rain-next/ui/icons/circle-check";
import { CircleCloseIcon } from "@rain-next/ui/icons/circle-close";
import { DoubleArrowDownIcon } from "@rain-next/ui/icons/double-arrow-down";
import { DoubleArrowUpIcon } from "@rain-next/ui/icons/double-arrow-up";
import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";
import { PublishIcon } from "@rain-next/ui/icons/publish";
import { PublishedIcon } from "@rain-next/ui/icons/published";
import { ShareAltIcon } from "@rain-next/ui/icons/share-alt";

import "./icons-page.css";

const pageSize = 60;
const previews = new Map(iconPreviews.map((asset) => [asset.assetId, asset]));
const entries = iconCatalog.map((asset) => ({ ...asset, usages: getIconUsage(asset.assetId) }));
type CatalogEntry = (typeof entries)[number];
type UsageSelection = "default" | "requested" | "unconfirmed";
type UsageFilter = "all" | UsageSelection | "unavailable";
const availableCount = entries.filter((entry) => entry.availability === "available").length;
const supplementaryCount = entries.filter((entry) => entry.source.kind === "non-component").length;

const filters: ReadonlyArray<{ value: UsageFilter; label: string }> = [
  { value: "all", label: "全部图标" },
  { value: "default", label: "默认用途" },
  { value: "requested", label: "按要求使用" },
  { value: "unconfirmed", label: "用途待确认" },
  { value: "unavailable", label: "待修复" },
];

function selectionFor(entry: CatalogEntry): UsageSelection {
  if (entry.usages.some((usage) => usage.selection === "default")) return "default";
  return entry.usages.length > 0 ? "requested" : "unconfirmed";
}

function IconCard({ entry, size }: { entry: CatalogEntry; size: number }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const preview = previews.get(entry.assetId);
  const selection = selectionFor(entry);
  const code = entry.availability === "available" && entry.exportName && entry.importPath
    ? `import { ${entry.exportName} } from "${entry.importPath}";\n\n<${entry.exportName} />`
    : null;
  const label = entry.usages[0]?.label ?? entry.name.replace(/^icon\//, "");

  async function copyCode() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <li className="icons-page__card" data-asset-id={entry.assetId} data-availability={entry.availability} data-usage={selection}>
      <div className="icons-page__preview" data-slot="icon-preview">
        {entry.availability === "source-unavailable" ? <span className="icons-page__unavailable">源图形待修复</span> : preview ? <Icon asset={preview} size={size} /> : <span>图形暂未就绪</span>}
      </div>
      <div className="icons-page__card-content">
        <h3>{label}</h3>
        <p className="icons-page__asset-name">{entry.name}</p>
        <p className="icons-page__usage-label">{filters.find((filter) => filter.value === selection)?.label}</p>
        {entry.source.kind === "non-component" ? <p className="icons-page__usage-label">新增批改图标 · 待视觉验收</p> : null}
        <details className="icons-page__details" onToggle={(event) => setDetailsOpen(event.currentTarget.open)}>
          <summary data-focus="item"><span>用法与来源</span>{detailsOpen ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}</summary>
          {entry.usages.length > 0 ? entry.usages.map((usage) => (
            <div className="icons-page__usage" key={`${usage.ruleId}-${usage.selection}`}>
              <p>{usage.useWhen}</p>
              {usage.condition ? <p className="icons-page__condition">{usage.condition}</p> : null}
              {usage.doNotUseWhen.length > 0 ? <p>注意：{usage.doNotUseWhen.join("；")}</p> : null}
            </div>
          )) : <p>尚未登记固定用途。请根据具体场景核对，不作为全局默认。</p>}
          {entry.availability === "source-unavailable" ? <p>{entry.sourceIssue ?? "Figma 源组件没有可见图形，需要先修复来源。"}</p> : <p>{entry.colorMode === "intrinsic" ? "保留图标原有配色。" : "颜色由所在按钮、控件或状态区域提供。"}</p>}
          <Link href={entry.source.url} rel="noopener noreferrer" target="_blank">查看 Figma 来源</Link>
          <p className="icons-page__source-id">来源节点：{entry.source.nodeId}</p>
          {preview && code ? <Button onClick={copyCode} size="small" variant="text">复制引用</Button> : null}
          <p aria-atomic="true" className="icons-page__copy-feedback" role="status">
            {copyState === "copied" ? "已复制引用" : copyState === "failed" ? "暂时无法复制，请选中下方代码复制。" : ""}
          </p>
          {preview && code ? <pre tabIndex={0} data-focus="item"><code>{code}</code></pre> : null}
        </details>
      </div>
    </li>
  );
}

function IconExamples() {
  const [expanded, setExpanded] = useState(false);
  const [editCount, setEditCount] = useState(0);
  const [publishCount, setPublishCount] = useState(0);

  return (
    <section aria-labelledby="icon-examples-title" className="icons-page__examples">
      <div className="icons-page__section-heading">
        <h2 id="icon-examples-title">放进真实场景</h2>
        <p>本地演示数据；只体验图标选择和颜色，不修改课程。</p>
      </div>
      <div className="icons-page__example-grid">
        <div className="icons-page__example">
          <h3>操作跟随按钮颜色</h3>
          <Button leadingIcon={<EditPencilIcon />} onClick={() => setEditCount((count) => count + 1)} variant="primary">编辑课程</Button>
          <p>一级按钮中的线性编辑图标，随文字变白。</p>
          <p role="status" aria-atomic="true">{editCount > 0 ? `已体验 ${editCount} 次编辑操作。` : ""}</p>
        </div>
        <div className="icons-page__example">
          <h3>展开与收起</h3>
          <Button aria-controls="icons-expanded-example" aria-expanded={expanded} onClick={() => setExpanded(!expanded)} trailingIcon={expanded ? <DoubleArrowUpIcon /> : <DoubleArrowDownIcon />} variant="text">{expanded ? "收起" : "展开更多"}</Button>
          <p>带展开／收起文案的文字按钮，默认使用双箭头。</p>
          <p hidden={!expanded} id="icons-expanded-example">这里是展开后显示的演示内容。</p>
        </div>
        <div className="icons-page__example">
          <h3>同一图形，不同用途</h3>
          <div aria-label="清空值示意" className="icons-page__host icons-page__host--control" role="group"><CircleCloseIcon size={20} /><span>清空值</span></div>
          <div aria-label="失败提示示意" className="icons-page__host icons-page__host--error" role="group"><CircleCloseIcon size={20} /><span>操作失败</span></div>
          <p>清空随控件前景色；失败提示由状态区域提供错误色。</p>
        </div>
        <div className="icons-page__example">
          <h3>发布动作与状态</h3>
          <Button leadingIcon={<PublishIcon />} onClick={() => setPublishCount((count) => count + 1)} variant="secondary">发布课程</Button>
          <div aria-label="成功结果示意" className="icons-page__host icons-page__host--success" role="group"><CircleCheckIcon size={20} /><span>发布成功</span></div>
          <div aria-label="当前已发布示意" className="icons-page__host icons-page__host--control" role="group"><PublishedIcon size={20} /><span>当前已发布</span></div>
          <p role="status" aria-atomic="true">{publishCount > 0 ? `已体验 ${publishCount} 次发布操作，仅本地演示。` : "动作、结果提示与业务状态分别选择。"}</p>
        </div>
        <div className="icons-page__example">
          <h3>按钮内页面跳转提示</h3>
          <Button onClick={() => { window.location.hash = "#text-button-help"; }} trailingIcon={<ShareAltIcon />} variant="secondary">查看详情</Button>
          <p>此示例在当前页打开帮助。打开方式由交互决定；这个图标不表示分享。</p>
        </div>
      </div>
    </section>
  );
}

export function IconsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<UsageFilter>("all");
  const [page, setPage] = useState(0);
  const [color, setColor] = useState("default");
  const [size, setSize] = useState(24);
  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return entries.filter((entry) => {
      if (filter === "unavailable" && entry.availability !== "source-unavailable") return false;
      if (filter !== "all" && filter !== "unavailable" && selectionFor(entry) !== filter) return false;
      const terms = [entry.name, entry.exportName ?? "", ...entry.usages.flatMap((usage) => [usage.label, usage.useWhen, ...usage.keywords])];
      return !search || terms.some((term) => term.toLocaleLowerCase().includes(search));
    });
  }, [query, filter]);
  const visible = filtered.slice(page * pageSize, (page + 1) * pageSize);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));

  function clearFilters() {
    setQuery("");
    setFilter("all");
    setPage(0);
  }

  return (
    <main className="icons-page" data-asset-identity="local-experiment" data-rain-id="icons-page">
      <div className="icons-page__content">
        <header className="icons-page__hero">
          <Link href="#overview">返回总览</Link>
          <p className="icons-page__eyebrow">Rain Next · Foundations</p>
          <h1 id="icons-title" tabIndex={-1}>Icons 图标库</h1>
          <p className="icons-page__lead">先按用途找到合适的图标，再把它放进真实场景。</p>
          <div className="icons-page__hero-meta"><span>{iconCatalog.length} 个来源图标</span><span>{availableCount} 个可预览 · {entries.length - availableCount} 个源图形待修复</span><span>原有图标视觉已验收</span>{supplementaryCount > 0 ? <span>{supplementaryCount} 枚新增批改图标待视觉验收</span> : null}<Link href="#text-button">体验文字按钮</Link></div>
        </header>

        <section aria-labelledby="icons-catalog-title" className="icons-page__catalog">
          <div className="icons-page__section-heading"><h2 id="icons-catalog-title">查找图标</h2><p>已确认的默认用途优先遵循规范；其他资产保留原名，按具体场景选择。</p></div>
          <div className="icons-page__search"><label htmlFor="icons-search">搜索图标</label><Input id="icons-search" onValueChange={(value) => { setQuery(value); setPage(0); }} placeholder="试试：编辑、展开、清空，或英文名称" role="searchbox" value={query} /></div>
          <div aria-label="用途范围" className="icons-page__filters" role="group">
            {filters.map((item) => <Button aria-pressed={filter === item.value} key={item.value} onClick={() => { setFilter(item.value); setPage(0); }} size="small" variant={filter === item.value ? "secondary" : "tertiary"}>{item.label}</Button>)}
          </div>
          <div className="icons-page__preview-controls">
            <fieldset><legend>预览颜色</legend>{[{ value: "default", label: "默认" }, { value: "brand", label: "主题蓝" }, { value: "danger", label: "危险红" }, { value: "inverse", label: "深色底" }].map((item) => <label key={item.value}><input checked={color === item.value} data-focus="control" name="icon-preview-color" onChange={() => setColor(item.value)} type="radio" value={item.value} />{item.label}</label>)}</fieldset>
            <fieldset><legend>预览尺寸</legend>{[16, 20, 24, 32].map((value) => <label key={value}><input checked={size === value} data-focus="control" name="icon-preview-size" onChange={() => setSize(value)} type="radio" value={value} />{value}px</label>)}</fieldset>
          </div>
          <p className="icons-page__note">固定配色图标保留原色。其余图标跟随预览区域颜色。</p>
          <p aria-atomic="true" className="icons-page__result-count" role="status">找到 {filtered.length} 个图标{filtered.length > 0 ? ` · 第 ${page + 1} / ${pageCount} 页` : ""}</p>
          {filtered.length > 0 ? <ul aria-label="图标列表" className="icons-page__grid" data-preview-color={color} data-preview-size={size}>{visible.map((entry) => <IconCard entry={entry} key={entry.assetId} size={size} />)}</ul> : <div className="icons-page__empty"><h3>没有找到匹配的图标</h3><p>换一个操作名称或英文名称试试，未知名称不会替换成近似图标。</p><Button onClick={clearFilters} variant="secondary">清除搜索与筛选</Button></div>}
          <div aria-label="图标翻页" className="icons-page__pagination" role="group"><Button disabled={page === 0} onClick={() => setPage((current) => current - 1)} variant="secondary">上一页</Button><span>{page + 1} / {pageCount}</span><Button disabled={page + 1 >= pageCount} onClick={() => setPage((current) => current + 1)} variant="secondary">下一页</Button></div>
        </section>

        <IconExamples />
        <footer className="icons-page__footer">图形来源于雨课堂 Figma 图标库。默认用途来自已确认规范；当前页面提供本地浏览与体验，视觉验收和发布状态各自独立。</footer>
      </div>
    </main>
  );
}
