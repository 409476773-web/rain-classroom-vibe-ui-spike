import { useEffect, useRef, useState } from "react";
import {
  colorFillFamilies, colorRegistry, colorTokenOutputs, colorToCss, measureColorContrast,
  colorFamilyLabels, assessColorUse, resolveColor, resolveColorSurface, type ColorTheme, type ColorToken,
} from "@rain-next/foundations";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";

const outputs = new Map(colorTokenOutputs.map((output) => [output.id, output]));
const parentIds = ["Background/Neutral/1", "Background/Neutral/2", "Background/Neutral/3"];

function foregroundOptions(fill: ColorToken, category: "Text" | "Icon") {
  const optionsRequireOnColor = fill.mode === "Solid" && fill.key < 3;
  return colorRegistry.filter((token) => optionsRequireOnColor ? token.category === "OnColor" && (token.family === null || token.family === fill.family)
    : token.category === category && (token.family === fill.family || token.id === `${category}/Neutral/1`));
}

export function ColorPairingPreview({ theme, initialFamily }: { theme: ColorTheme; initialFamily?: string }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (initialFamily) heading.current?.focus(); }, [initialFamily]);
  const initialFill = colorRegistry.find((token) => token.family === initialFamily && token.category === "Fill" && token.mode === "Alpha" && token.key === 1);
  const [fillId, setFillId] = useState(initialFill?.id ?? "Fill/Second/Solid/1");
  const [textId, setTextId] = useState(initialFill ? "Text/Neutral/1" : "OnColor/1");
  const [iconId, setIconId] = useState(initialFill ? `Icon/${initialFamily}/1` : "OnColor/1");
  const [parentId, setParentId] = useState("Background/Neutral/1");
  const fill = colorRegistry.find((token) => token.id === fillId)!;
  const fillOutput = outputs.get(fillId)!;
  const parentOutput = outputs.get(parentId)!;
  const textOutput = outputs.get(textId)!;
  const iconOutput = outputs.get(iconId)!;
  const alpha = fill.mode === "Alpha";
  const strong = fill.mode === "Solid" && fill.key < 3;
  const surface = resolveColorSurface(fillId, theme, alpha ? parentId : undefined);
  const textContrast = measureColorContrast(resolveColor(textId, theme), surface);
  const iconContrast = measureColorContrast(resolveColor(iconId, theme), surface);
  const insufficient = textContrast < 4.5 || iconContrast < 3;
  const use = { property: "color", context: "page", theme, parentSurfaceId: fillId, parentBackgroundId: alpha ? parentId : undefined, interaction: "non-interactive", critical: true } as const;
  const textAssessment = assessColorUse({ ...use, tokenId: textId, role: "text", content: "text", onColor: textId.startsWith("OnColor/") });
  const iconAssessment = assessColorUse({ ...use, tokenId: iconId, role: "icon", content: "meaningful-icon", onColor: iconId.startsWith("OnColor/") });

  function selectFill(id: string) {
    const next = colorRegistry.find((token) => token.id === id);
    if (!next || next.category !== "Fill" || !colorFillFamilies.some((family) => family === next.family)) return;
    setFillId(id);
    for (const [category, current, set] of [["Text", textId, setTextId], ["Icon", iconId, setIconId]] as const) {
      const options = foregroundOptions(next, category);
      if (!options.some((token) => token.id === current)) {
        set(options.find((token) => token.family === next.family)?.id ?? options[0]!.id);
      }
    }
  }

  return (
    <section className="token-color-local-example" data-rain-id="token-color-pairing" data-asset-identity="local-experiment" aria-labelledby="color-pairing-title">
      <h3 id="color-pairing-title" ref={heading} tabIndex={-1}>Fill 前景配对预览</h3>
      <p>保留全部原值，分别检查普通文字与有意义图标。对比度满足不代表组件方案已验收。</p>
      {theme === "dark" && <p>Dark 配对暂按相同用途预览，具体搭配仍待你检查确认；普通文字与图标使用 Dark 的 Neutral 色值。</p>}
      <fieldset className="flex flex-wrap gap-rain-16" aria-describedby="color-pairing-rule">
        <legend>选择背景与前景</legend>
        <label className="grid gap-rain-4"><span>色系</span>
          <select value={fill.family!} data-focus="control" onChange={(event) => {
            if (colorFillFamilies.some((family) => family === event.target.value)) {
              const matching = colorRegistry.filter((token) => token.category === "Fill" && token.family === event.target.value);
              selectFill(matching.find((token) => token.mode === fill.mode && token.key === fill.key)?.id ?? matching[0]!.id);
            }
          }}>
            {colorFillFamilies.map((family) => <option key={family} value={family}>{colorFamilyLabels[family] ?? family}</option>)}
          </select>
        </label>
        <label className="grid gap-rain-4"><span>填充背景</span>
          <select value={fillId} data-focus="control" onChange={(event) => selectFill(event.target.value)}>
            {colorRegistry.filter((token) => token.category === "Fill" && token.family === fill.family).map((token) =>
              <option key={token.id} value={token.id}>{token.mode} · 第 {token.order} 级</option>)}
          </select>
        </label>
        {alpha && <label className="grid gap-rain-4"><span>Alpha 父背景</span>
          <select value={parentId} data-focus="control" onChange={(event) => {
            if (parentIds.includes(event.target.value)) setParentId(event.target.value);
          }}>
            {parentIds.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
        </label>}
        {(["Text", "Icon"] as const).map((category) => <label className="grid gap-rain-4" key={category}>
          <span>{category === "Text" ? "文字颜色" : "图标颜色"}</span>
          <select value={category === "Text" ? textId : iconId} data-focus="control" onChange={(event) => {
            if (foregroundOptions(fill, category).some((token) => token.id === event.target.value)) {
              (category === "Text" ? setTextId : setIconId)(event.target.value);
            }
          }}>
            {foregroundOptions(fill, category).map((token) => <option key={token.id} value={token.id}>{token.id}</option>)}
          </select>
        </label>)}
      </fieldset>
      <p id="color-pairing-rule">{strong ? "Solid 一级、二级仅放反白色系文字与图标。" : "Solid 三级与本次 Alpha 填充可放 Neutral 或同色系文字、图标；两者可独立选档。"}</p>
      <p>{theme === "dark" ? "Dark" : "Light"} · <code>{fillId}</code> · {colorToCss(resolveColor(fillId, theme))}{alpha && <> · 实际父背景：<code>{parentId}</code> · {colorToCss(resolveColor(parentId, theme))}</>}</p>
      <div className="token-color-pairing-canvas rain-type-ui-default" data-rain-theme={theme}>
        <div className={parentOutput.displayClassName} data-slot="pairing-background" aria-hidden="true">
          <div className={fillOutput.displayClassName} data-slot="pairing-background" aria-hidden="true">
            <div className="token-color-pairing-sample">
              <span className={textOutput.displayForegroundClassName} data-slot="pairing-text" aria-hidden="true">查看详情</span>
              <span className={iconOutput.displayForegroundClassName} data-slot="pairing-icon" aria-hidden="true"><ArrowDownIcon /></span>
            </div>
          </div>
        </div>
      </div>
      <div role="status" aria-live="polite" aria-atomic="true">
        <p>文字 {textContrast.toFixed(2)} : 1 · {textContrast >= 4.5 ? "满足" : "不足"} 4.5 : 1</p>
        <p>图标 {iconContrast.toFixed(2)} : 1 · {iconContrast >= 3 ? "满足" : "不足"} 3 : 1</p>
        <p>{insufficient ? "当前搭配有对比度缺口，仅作展示，不能作为已通过的组件方案。" : "当前两项对比度满足要求，实际状态、内容与视觉仍需验收。"}</p>
        <p>文字用途校验：{textAssessment.status === "passed" ? "通过" : textAssessment.status === "needs-context" ? "需补充条件" : "未通过"} · {textAssessment.reason}</p>
        <p>图标用途校验：{iconAssessment.status === "passed" ? "通过" : iconAssessment.status === "needs-context" ? "需补充条件" : "未通过"} · {iconAssessment.reason}</p>
      </div>
      <p>按页面自有内容校验。OnColor 另需具名表面 Recipe；新页面实际使用尚未验证。</p>
      <details><summary data-focus="item">查看完整使用类名与条件</summary>
        <dl className="token-color-detail-list">
          {[fillOutput, textOutput, iconOutput, ...(alpha ? [parentOutput] : [])].map((output, index) => <div key={`${output.id}-${index}`}>
            <dt>{output.id}</dt><dd>{[...new Set(output.utilities.map((utility) => utility.className))].map((className) => <div key={className}><code>{className}</code></div>)}</dd>
          </div>)}
        </dl>
        <p>主题：{theme}；父表面：{fillId}{alpha ? `；不透明父背景：${parentId}` : ""}。无整体透明度或额外状态叠层。</p>
      </details>
    </section>
  );
}
