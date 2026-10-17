import { compositionSpaceTokens, lineThicknessTokens, radiusTokens, type LineThicknessTokenName } from "@rain-next/foundations";
import { defineRainLocalRecipe, rainCn } from "@rain-next/ui";
import { useState } from "react";
import { tokenClassNames } from "./token-classes.generated";

const dividerRecipe = defineRainLocalRecipe({
  id: "line-v1-content-divider", scope: "feature", origin: "line-foundation-v1",
  classes: { divider: "h-rain-line-1 w-full flex-none bg-rain-border-subtle" },
  modifiedParts: ["divider"], candidateTokens: [], promotionStatus: "not-proposed",
});
const lineStyles = { solid: "border-solid", dashed: "border-dashed" } as const;

export function GeometryPanel() {
  const [thickness, setThickness] = useState<LineThicknessTokenName>("1");
  const [lineStyle, setLineStyle] = useState<keyof typeof lineStyles>("solid");
  return <>
    <section className="foundation-section" aria-labelledby="token-line-title" data-token-section="line">
      <h2 id="token-line-title">线条：粗细、颜色、线型各自选择</h2>
      <p>1–6px 固定粗细。改变下面的实验样本不会改变右侧内容分隔线。</p>
      <div className="flex flex-wrap gap-rain-16">
        <label className="grid gap-rain-4">线条粗细<select data-focus="control" value={thickness} onChange={(event) => {
          if (Object.hasOwn(lineThicknessTokens, event.target.value)) setThickness(event.target.value as LineThicknessTokenName);
        }}>{Object.entries(lineThicknessTokens).map(([key, value]) => <option value={key} key={key}>{value}</option>)}</select></label>
        <label className="grid gap-rain-4">线型<select data-focus="control" value={lineStyle} onChange={(event) => {
          if (Object.hasOwn(lineStyles, event.target.value)) setLineStyle(event.target.value as keyof typeof lineStyles);
        }}><option value="solid">实线</option><option value="dashed">虚线</option></select></label>
      </div>
      <div className="token-geometry-columns">
        <div className="grid gap-rain-16">
          <h3>实验样本</h3>
          <div data-slot="line-border-sample" className={rainCn("p-rain-20 rounded-rain-8 border-rain-border-default", tokenClassNames.line.border[thickness], lineStyles[lineStyle])}>容器边框</div>
          <div data-slot="line-horizontal-sample" aria-hidden="true" className={rainCn("w-full flex-none bg-rain-border-default", tokenClassNames.line.h[thickness])} />
          <div className="h-rain-40 flex"><div data-slot="line-vertical-sample" aria-hidden="true" className={rainCn("h-full flex-none bg-rain-border-default", tokenClassNames.line.w[thickness])} /></div>
        </div>
        <div className="grid gap-rain-16 p-rain-20 rounded-rain-12 bg-rain-surface-subtle">
          <section><h3>课程内容</h3><p>阅读材料与课程任务，按清楚的层次组织。</p></section>
          <div className={dividerRecipe.classes.divider} data-local-recipe={dividerRecipe.id} data-asset-identity="local-experiment" aria-hidden="true" />
          <section><h3>学习记录</h3><p>完整分隔方案使用 1px 填充线。周围间距由这个内容容器负责。</p></section>
        </div>
      </div>
    </section>
    <section className="foundation-section" aria-labelledby="token-geometry-title" data-token-section="geometry">
      <h2 id="token-geometry-title">圆角与间距：使用明确数值</h2>
      <p>数值是稳定身份；相同数值并不意味着组件必须共同变化。这里展示已确认选择，组件专属几何保留在自己的完整方案中。</p>
      <h3>7 档圆角</h3>
      <ul className="token-radius-list" aria-label="圆角选择">{Object.entries(radiusTokens).map(([key, value]) => <li key={key} className={rainCn("p-rain-20 border-rain-line-1 border-solid border-rain-border-default bg-rain-surface-subtle", tokenClassNames.radius[key as keyof typeof tokenClassNames.radius])}><strong>{value}</strong></li>)}</ul>
      <h3>16 档间距</h3>
      <ul className="token-space-list" aria-label="间距选择">{Object.entries(compositionSpaceTokens).map(([key, value]) => <li key={key}><span>{value}</span><div className={rainCn("flex", tokenClassNames.space[key as keyof typeof tokenClassNames.space].gap)} aria-hidden="true"><span className="token-space-mark" /><span className="token-space-mark" /></div></li>)}</ul>
    </section>
  </>;
}
