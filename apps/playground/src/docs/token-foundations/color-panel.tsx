import { useState } from "react";
import {
  colorAlphaValues, colorCategoryProfiles, colorRegistry, colorTokenOutputs, colorToCss,
  colorDiscovery, colorFamilyLabels, searchColorTokens,
  localColorRecipe, localColorRecipeOutput, resolveColor, type ColorCategory, type ColorTheme, type ColorToken,
} from "@rain-next/foundations";
import { Button } from "@rain-next/ui";
import { InfoIcon } from "@rain-next/ui/icons/info";
import { ColorPairingPreview } from "./color-pairing-preview";

const foregroundFamilies = [...new Set(colorRegistry.filter((token) => token.category === "Text" || token.category === "Icon").map((token) => token.family!))];
const matrices = [
  ...foregroundFamilies.map((family) => ({ title: `Text + Icon / ${family}`, profiles: [`Text/${family}`, `Icon/${family}`].filter((id) => colorCategoryProfiles.some((profile) => profile.id === id)) })),
  ...colorCategoryProfiles.filter((profile) => profile.category !== "Text" && profile.category !== "Icon")
    .map((profile) => ({ title: profile.id, profiles: [profile.id] })),
];
const outputs = new Map(colorTokenOutputs.map((output) => [output.id, output]));

function displayValue(token: ColorToken, theme: ColorTheme) {
  const value = resolveColor(token.id, theme);
  const hex = `#${value.rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
  return value.alpha === 1 ? hex : `${hex} · ${Math.round(value.alpha * 100)}%`;
}

export function ColorPanel() {
  const [selectedId, setSelectedId] = useState("Text/Neutral/1");
  const [theme, setTheme] = useState<ColorTheme>("light");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ColorCategory | "">("");
  const [previewRequest, setPreviewRequest] = useState<{ family: string; sequence: number }>();
  const matches = searchColorTokens(query, category || undefined);
  const matchingIds = new Set(matches.map((entry) => entry.id));
  const selected = colorRegistry.find((token) => token.id === selectedId)!;
  const selectedProfile = colorCategoryProfiles.find((profile) => profile.id === selected.profileId)!;
  const selectedEntry = colorDiscovery.entries.find((entry) => entry.id === selectedId)!;
  const pairings = colorDiscovery.pairings.filter((pairing) => pairing.family === selected.family);

  return (
    <section className="token-color-panel" aria-labelledby="token-colors-title" data-rain-id="token-color-panel">
      <header className="foundation-section__heading">
        <div><p className="section-index">LIGHT / DARK · COLOR</p><h2 id="token-colors-title">颜色：先选用途，再选层级</h2></div>
        <p>{colorRegistry.length} 个色阶均已登记 Light / Dark 色值。点击查看细节；组件迁移与正式视觉验收另行记录。</p>
      </header>
      <p className="token-color-guidance">优先使用已有 Variant 与完整 Recipe。色阶分别显示在两种主题的 Background/Neutral/1 上；Alpha 色块按该背景叠加。</p>
      <p>Tag 分类色来自旧 Vue 的完整 20 组配色。搜索名称不改变颜色身份；关闭反馈与业务专用色沿用原用途。<a href="#tag" data-focus="item">查看 Tag 组件与验收范围</a></p>
      <fieldset className="flex flex-wrap items-end gap-rain-16" aria-describedby="color-search-help">
        <legend>查找颜色</legend>
        <label className="grid min-w-0 flex-1 gap-rain-4"><span>搜索颜色</span>
          <input type="search" className="w-full min-w-0" value={query} data-focus="control" onChange={(event) => setQuery(event.target.value)} />
        </label>
        <label className="grid gap-rain-4"><span>颜色用途</span>
          <select value={category} data-focus="control" onChange={(event) => {
            const categoryValue = event.target.value;
            if (!categoryValue || colorRegistry.some((token) => token.category === categoryValue)) setCategory(categoryValue as ColorCategory | "");
          }}>
            <option value="">全部用途</option>
            <option value="Text">文字</option><option value="Icon">图标</option><option value="Border">边界</option>
            <option value="Background">背景表面</option><option value="Fill">填充</option><option value="OnColor">反白前景</option>
          </select>
        </label>
        <button type="button" data-focus="control" disabled={!query && !category} onClick={() => { setQuery(""); setCategory(""); }}>清空筛选</button>
      </fieldset>
      <p id="color-search-help">支持色名、业务名称、Family 和 Token ID，例如“蓝紫”“视频”“TagPurple”。空格分隔多个关键词。</p>
      <p role="status" aria-live="polite">{matches.length ? `找到 ${matches.length} 个颜色 Token；每个同时展示 Light / Dark。` : "没有匹配的颜色，请换一个色名、业务名称或 Token ID。"}</p>
      <label className="grid gap-rain-4"><span>预览主题</span>
        <select value={theme} data-focus="control" onChange={(event) => {
          if (event.target.value === "light" || event.target.value === "dark") setTheme(event.target.value);
        }}>
          <option value="light">Light</option><option value="dark">Dark</option>
        </select>
      </label>
      <ColorPairingPreview key={previewRequest?.sequence ?? 0} theme={theme} initialFamily={previewRequest?.family} />
      <div className="token-color-matrices">
        {matrices.map((matrix) => {
          const rows = matrix.profiles.map((profileId) => colorRegistry.filter((token) => token.profileId === profileId && matchingIds.has(token.id)).sort((a, b) => a.order - b.order)).filter((row) => row.length);
          if (!rows.length) return null;
          const orders = [...new Set(rows.flatMap((row) => row.map((token) => token.order)))].sort((a, b) => a - b);
          return (
            <div className="token-color-table-scroll" key={matrix.title}>
              <table className="token-color-table" aria-label={matrix.title}>
                <caption>{matrix.title} · {colorFamilyLabels[rows[0]![0]!.family ?? ""] ?? "按用途选择"}</caption>
                <thead><tr><th scope="col">模式 / 类别</th>{orders.map((order) => <th key={order} scope="col">第 {order} 级</th>)}</tr></thead>
                <tbody>
                  {rows.map((row) => (
                    <tr className="token-color-light-canvas" data-rain-theme="light" key={row[0]!.profileId}>
                      <th scope="row">Light<br />{row[0]!.profileId}</th>
                      {orders.map((order) => {
                        const token = row.find((item) => item.order === order);
                        if (!token) return <td key={order}>—</td>;
                        const output = outputs.get(token.id)!;
                        return <td key={token.id}><button type="button" className="token-color-cell" aria-label={token.id} aria-pressed={selectedId === token.id && theme === "light"} data-focus="item" onClick={() => { setSelectedId(token.id); setTheme("light"); }}>
                          <span className={output.displayClassName} data-slot="category-swatch" aria-hidden="true" />
                          <code>{token.id}</code><span>{displayValue(token, "light")}</span>
                        </button></td>;
                      })}
                    </tr>
                  ))}
                  {rows.map((row) => <tr className="token-color-dark-canvas" data-rain-theme="dark" key={`dark-${row[0]!.profileId}`}>
                    <th scope="row">Dark<br />{row[0]!.profileId}</th>
                    {orders.map((order) => {
                      const darkToken = row.find((item) => item.order === order);
                      if (!darkToken) return <td key={order}>—</td>;
                      const darkOutput = outputs.get(darkToken.id)!;
                      return <td key={darkToken.id}><button type="button" className="token-color-cell" aria-label={`Dark ${darkToken.id}`} aria-pressed={selectedId === darkToken.id && theme === "dark"} data-focus="item" onClick={() => { setSelectedId(darkToken.id); setTheme("dark"); }}>
                        <span className={darkOutput.displayClassName} data-slot="category-swatch" aria-hidden="true" />
                        <code>{darkToken.id}</code><span>{displayValue(darkToken, "dark")}</span>
                      </button></td>;
                    })}
                  </tr>)}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      <section className="token-color-detail" aria-label="颜色详情" aria-live="polite">
        <h3>颜色详情</h3><code>{selected.id}</code>
        <dl className="token-color-detail-list">
          <div><dt>搜索名称</dt><dd>{selectedEntry.label}</dd></div>
          <div><dt>用途范围</dt><dd>{selectedEntry.purpose}</dd></div>
          <div><dt>完整 Tailwind 类名</dt><dd>{selectedEntry.utilities.map((utility) => <div key={`${utility.role}-${utility.property}`}><code>{utility.className}</code> · {utility.role} / {utility.property}</div>)}</dd></div>
          <div><dt>当前展示位置</dt><dd>第 {selected.order} 级 · 稳定 Key {selected.key}</dd></div>
          <div><dt>当前预览主题</dt><dd>{theme === "dark" ? "Dark" : "Light"}</dd></div>
          <div><dt>Light 解析值</dt><dd>{colorToCss(selected.light)}</dd></div>
          <div><dt>Dark 解析值</dt><dd>{colorToCss(selected.dark)}</dd></div>
          <div><dt>排序方向</dt><dd>{selectedProfile.direction === "front-to-back" ? "表面由前到后" : "本类别由强到弱"}</dd></div>
          <div><dt>默认选用范围</dt><dd>{selectedProfile.defaultIds.join("、") || "按实际用途与表面选择"}</dd></div>
          <div><dt>常用 / 条件 / 限制标签</dt><dd>待消费者证据确认</dd></div>
          <div><dt>Semantic 与迁移</dt><dd>未建立新 Alias；现有组件保持原配方</dd></div>
          <div><dt>使用登记</dt><dd>实际消费者见 Token Manifest 的 colorConsumers / colorRecipeConsumers；各组件验收独立记录</dd></div>
          <div><dt>使用验证</dt><dd>色块只展示事实；有意义内容须在实际父表面上验证</dd></div>
          <div><dt>来源</dt><dd><code>{selected.source}</code></dd></div>
          <div><dt>Dark 来源</dt><dd><code>{selected.darkSource}</code></dd></div>
        </dl>
        {pairings.length > 0 && <>
          <h4>可检查的配对</h4>
          <p>以下为非交互正文或有意义图标，父背景固定为 Background/Neutral/1；不含整体透明度或状态叠层。</p>
          <ul>{pairings.map((pairing) => <li key={pairing.label}>
            {pairing.label}：Light {pairing.themes.light.status === "passed" ? "声明条件通过" : "未通过"} / Dark {pairing.themes.dark.status === "passed" ? "声明条件通过" : "未通过"}。
            <code>{pairing.use.tokenId}</code> → <code>{pairing.use.parentSurfaceId}</code>
          </li>)}</ul>
          <Button size="small" onClick={() => setPreviewRequest((previous) => ({ family: selected.family!, sequence: (previous?.sequence ?? 0) + 1 }))}>预览此色组配对</Button>
        </>}
        <details><summary data-focus="item">组件建设与 Alpha</summary>
          <p>完整 Alpha 预设直接使用。新组合进入具名 Recipe，实色才可追加 Alpha；替换预设的 Alpha 必须显式生成局部输出。</p>
          <p>合法不透明度：{colorAlphaValues.map((alpha) => `${alpha}%`).join(" · ")}</p>
          <p>Color Alpha 与整个组件的 Opacity 各自声明；Light 页面中的 Background/Dark 仍属于 Light。</p>
        </details>
      </section>

      <section className="token-color-local-example" data-rain-id="token-color-discovery-examples" data-asset-identity="local-experiment" aria-label="页面自有内容使用示例">
        <h3>页面自有内容使用示例</h3>
        <p>两种最小用途：中性正文与同色提示图标，均使用已有 Category 类名。此处的声明与实际父表面逐项登记，不扩展控件或业务状态用途。</p>
        <div className="grid gap-rain-16">
          <div data-rain-theme="light" data-slot="discovery-light-surface" className="bg-rain-category-background-neutral-1 p-rain-16">
            <div data-slot="discovery-light-fill" className="bg-rain-category-fill-tagpurple-alpha-1 p-rain-16">
              <p data-slot="discovery-light-text" className="text-rain-category-text-neutral-1">Light · 复习资料已整理，可按章节阅读。</p>
              <span data-slot="discovery-light-icon" className="text-rain-category-icon-tagpurple-1" role="img" aria-label="提示"><InfoIcon /></span>
            </div>
          </div>
          <div data-rain-theme="dark" data-slot="discovery-dark-surface" className="bg-rain-category-background-neutral-1 p-rain-16">
            <div data-slot="discovery-dark-fill" className="bg-rain-category-fill-tagpurple-alpha-1 p-rain-16">
              <p data-slot="discovery-dark-text" className="text-rain-category-text-neutral-1">Dark · 复习资料已整理，可按章节阅读。</p>
              <span data-slot="discovery-dark-icon" className="text-rain-category-icon-tagpurple-1" role="img" aria-label="提示"><InfoIcon /></span>
            </div>
          </div>
        </div>
      </section>

      <section className="token-color-local-example" data-rain-id="token-color-demo" data-rain-theme="light" data-local-recipe={localColorRecipe.recipeId} data-asset-identity="local-experiment" aria-label="局部 Alpha 替换样本">
        <h3>同一来源，局部改变叠加强度</h3>
        <p>以下两个装饰填充均位于白色表面。右侧替换为 20%，原 16% 预设保持不变；不把它们相乘为 3.2%。</p>
        <div className="token-color-recipe-comparison bg-rain-category-background-neutral-1">
          <figure><span className="bg-rain-category-fill-neutral-alpha-3" data-slot="original-fill" aria-hidden="true" /><figcaption>完整预设 · 16%</figcaption></figure>
          <figure><span className="bg-rain-local-token-color-demo-highlight" data-slot="derived-fill" aria-hidden="true" /><figcaption>局部替换 · 20%</figcaption></figure>
        </div>
        <p><code>{localColorRecipeOutput.variable}</code> · 只作用于本样本</p>
      </section>
    </section>
  );
}
