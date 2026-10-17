import { useState } from "react";

import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button } from "@rain-next/ui";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";
import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";
import "./button-token-review.css";

const appearances = [
  { name: "普通 · 主按钮", props: { variant: "primary", tone: "default" } },
  { name: "普通 · 次按钮", props: { variant: "secondary", tone: "default" } },
  { name: "普通 · 轻按钮", props: { variant: "tertiary", tone: "default" } },
  { name: "危险 · 主按钮", props: { variant: "primary", tone: "danger" } },
  { name: "危险 · 次按钮", props: { variant: "secondary", tone: "danger" } },
  { name: "危险 · 轻按钮", props: { variant: "tertiary", tone: "danger" } },
  { name: "文字 · 普通", props: { variant: "text", tone: "default" } },
  { name: "文字 · 品牌", props: { variant: "text", tone: "brand" } },
  { name: "文字 · 危险", props: { variant: "text", tone: "danger" } },
] as const;

const sizes = [
  { name: "普通 Mini", height: 28, minWidth: 64, padding: 12, gap: 4, type: "13 / 18 / 600", icons: "14 / 10", props: { variant: "secondary", size: "mini" } },
  { name: "普通 Small", height: 32, minWidth: 64, padding: 20, gap: 4, type: "14 / 22 / 600", icons: "16 / 12", props: { variant: "secondary", size: "small" } },
  { name: "普通 Medium", height: 36, minWidth: 64, padding: 20, gap: 4, type: "14 / 22 / 600", icons: "16 / 12", props: { variant: "secondary", size: "medium" } },
  { name: "普通 Large", height: 40, minWidth: 80, padding: 24, gap: 4, type: "14 / 22 / 600", icons: "16 / 12", props: { variant: "secondary", size: "large" } },
  { name: "普通 XL", height: 48, minWidth: 160, padding: 28, gap: 6, type: "16 / 24 / 600", icons: "22 / 16", props: { variant: "secondary", size: "xl" } },
  { name: "文字 Small", height: 20, minWidth: 0, padding: 6, gap: 4, type: "12 / 14 / 400", icons: "14 / 12", props: { variant: "text", size: "small" } },
  { name: "文字 Compact", height: 24, minWidth: 0, padding: 6, gap: 4, type: "13 / 18 / 400", icons: "16 / 12", props: { variant: "text", size: "compact" } },
  { name: "文字 Regular", height: 26, minWidth: 0, padding: 6, gap: 4, type: "14 / 20 / 400", icons: "16 / 12", props: { variant: "text", size: "regular" } },
] as const;

const iconCombinations = [
  { name: "纯文字", leading: false, trailing: false },
  { name: "前图标", leading: true, trailing: false },
  { name: "后图标", leading: false, trailing: true },
  { name: "双图标", leading: true, trailing: true },
] as const;

export function ButtonTokenReviewPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [surface, setSurface] = useState<"task" | "page">("task");
  const [density, setDensity] = useState<Density>("default");
  const [compareLoading, setCompareLoading] = useState(false);
  const [sizeOptionsExpanded, setSizeOptionsExpanded] = useState(false);
  const [loadingOptionsExpanded, setLoadingOptionsExpanded] = useState(false);
  const [feedback, setFeedback] = useState({ name: "", count: 0 });

  function record(name: string) {
    setFeedback((current) => ({ name, count: current.count + 1 }));
  }

  return (
    <main className="button-token-review" data-asset-identity="local-experiment" data-rain-id="button-token-review" data-rain-theme={theme} data-review-surface={surface}>
      <div className="button-token-review__content">
        <header className="button-token-review__hero">
          <a href="#components">返回组件页</a>
          <h1 id="button-token-review-title" tabIndex={-1}>按钮 Token 对照</h1>
          <p>普通按钮与文字按钮，共享新的颜色来源，保留完整尺寸组合。</p>
          <p><strong>普通按钮与文字按钮的新配方已通过视觉验收。</strong> 全局 Tab 双层光环也已确认，品牌色细环与半透明浅蓝外圈共用现有 Token。</p>
        </header>

        <div aria-label="对照环境" className="button-token-review__controls" role="group">
          <label>主题<select onChange={(event) => setTheme(event.currentTarget.value as "light" | "dark")} value={theme}><option value="light">Light · 浅色</option><option value="dark">Dark · 深色</option></select></label>
          <label>按钮所在底色<select onChange={(event) => setSurface(event.currentTarget.value as "task" | "page")} value={surface}><option value="task">任务表面 · Background/Neutral/1</option><option value="page">页面底色 · Background/Neutral/3</option></select></label>
          <label>默认密度<select onChange={(event) => setDensity(event.currentTarget.value as Density)} value={density}><option value="default">Default · 常规</option><option value="compact">Compact · 紧凑</option></select></label>
        </div>

        <DensityProvider density={density} rainId="button-token-review-density">
          <section aria-labelledby="button-token-appearances-title" className="button-token-review__section">
            <h2 id="button-token-appearances-title">九组外观与状态</h2>
            <p>移入、按住默认按钮，或按 Tab 查看键盘焦点：细环使用 Border/Brand/1，浅色外圈使用 Fill/Brand/Alpha/3。所有操作只在本页记录次数。</p>
            <div className="button-token-review__samples button-token-review__scroll">
              <table>
                <thead><tr><th scope="col">外观</th><th scope="col">默认 · 可操作</th><th scope="col">禁用</th><th scope="col">加载中</th></tr></thead>
                <tbody>{appearances.map(({ name, props }) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td><Button {...props} onClick={() => record(name)}>操作示例</Button></td>
                    <td><Button {...props} disabled onClick={() => record(name)}>操作示例</Button></td>
                    <td><Button {...props} loading onClick={() => record(name)}>操作示例</Button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p>普通按钮加载时仅背景与边框保留 82%，文字和图标保持原色；文字按钮保持原方案。禁用保留各自色系：主按钮整体 30%，次按钮和轻按钮整体 40%，文字按钮仅前景 30%。加载示例保留键盘位置，但不会重复触发操作。</p>
          </section>

          <section aria-labelledby="button-token-sizes-title" className="button-token-review__section">
            <h2 id="button-token-sizes-title">八档完整尺寸</h2>
            <p>使用相同文案和图标比较；这里显式选择尺寸，因此不随上方默认密度切换。单位均为 px。</p>
            <div className="button-token-review__samples button-token-review__scroll">
              <table>
                <thead><tr><th scope="col">尺寸</th><th scope="col">实际按钮</th><th scope="col">高度 / 最小宽</th><th scope="col">每侧内距 / 图文间距</th><th scope="col">字号 / 行高 / 字重</th><th scope="col">前 / 后图标</th></tr></thead>
                <tbody>{sizes.map(({ name, height, minWidth, padding, gap, type, icons, props }) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td><Button {...props} aria-controls="button-token-size-options" aria-expanded={sizeOptionsExpanded} leadingIcon={<EditPencilIcon />} onClick={() => { setSizeOptionsExpanded(!sizeOptionsExpanded); record(name); }} trailingIcon={sizeOptionsExpanded ? <ArrowUpIcon /> : <ArrowDownIcon />}>编辑选项</Button></td>
                    <td>{height} / {minWidth}</td><td>{padding} / {gap}</td><td>{type}</td><td>{icons}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p hidden={!sizeOptionsExpanded} id="button-token-size-options">编辑选项已展开。这是一段本地演示内容，按钮及图标共同操作这一区域。</p>
            <p>普通按钮设置的是最小宽，文案较短时实际留白可能更大。文字按钮由内容撑宽，上下各留 3px，以行高 + 6px 组成高度，不额外套等高外框。</p>
          </section>

          <section aria-labelledby="button-token-layout-title" className="button-token-review__section">
            <h2 id="button-token-layout-title">相邻操作的间距</h2>
            <p>对照 8px 与 12px 两种排列，均按视觉中心对齐。间距由外层布局管理，按钮自身不增加外边距。</p>
            <div className="button-token-review__samples button-token-review__layout-examples">
              {["8", "12"].map((gap) => (
                <div key={gap}>
                  <h3>Space/{gap}</h3>
                  <div aria-label={`${gap}px 操作间距`} className="button-token-review__action-row" data-gap={gap} role="group">
                    <Button onClick={() => record(`${gap}px 查询`)} size="small" variant="primary">查询</Button>
                    <Button onClick={() => record(`${gap}px 重置`)} size="regular" variant="text">重置</Button>
                    <Button onClick={() => record(`${gap}px 保存`)} size="small" variant="secondary">保存筛选条件</Button>
                  </div>
                </div>
              ))}
            </div>
            <p>查询与重置先采用 8px 对照；12px 是另一种布局选择。普通按钮与文字按钮保持各自高度，空间不足时整组换行。</p>
          </section>

          <section aria-labelledby="button-token-loading-title" className="button-token-review__section">
            <h2 id="button-token-loading-title">图标与加载前后</h2>
            <label className="button-token-review__toggle"><input checked={compareLoading} onChange={(event) => setCompareLoading(event.currentTarget.checked)} type="checkbox" />切换加载状态</label>
            <p>双图标时，左侧标识保持原色，右侧箭头降低一个视觉层级。观察加载图标进入、前图标替换和后图标隐藏时的宽度变化；关闭开关即可恢复操作。</p>
            <div className="button-token-review__samples button-token-review__scroll">
              <table>
                <thead><tr><th scope="col">图标组合</th><th scope="col">普通按钮</th><th scope="col">文字按钮</th></tr></thead>
                <tbody>{iconCombinations.map(({ name, leading, trailing }) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    {(["secondary", "text"] as const).map((variant) => <td key={variant}><Button aria-controls={trailing ? "button-token-loading-options" : undefined} aria-expanded={trailing ? loadingOptionsExpanded : undefined} leadingIcon={leading ? <EditPencilIcon /> : undefined} loading={compareLoading} onClick={() => { if (trailing) setLoadingOptionsExpanded(!loadingOptionsExpanded); record(`${name} ${variant === "text" ? "文字" : "普通"}按钮`); }} trailingIcon={trailing ? loadingOptionsExpanded ? <ArrowUpIcon /> : <ArrowDownIcon /> : undefined} variant={variant}>编辑选项</Button></td>)}
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p hidden={!loadingOptionsExpanded} id="button-token-loading-options">编辑选项已展开；带后箭头的按钮可展开或收起本区域。</p>
          </section>
        </DensityProvider>

        <p aria-atomic="true" className="button-token-review__feedback" role="status">{feedback.count ? `最近操作：${feedback.name}；已触发 ${feedback.count} 次，仅本地演示。` : "点击默认按钮体验；禁用与加载状态不会增加操作次数。"}</p>
        <footer><a href="#token-foundations">查看 Token 来源</a><a href="#text-button">查看文字按钮使用说明</a></footer>
      </div>
    </main>
  );
}
