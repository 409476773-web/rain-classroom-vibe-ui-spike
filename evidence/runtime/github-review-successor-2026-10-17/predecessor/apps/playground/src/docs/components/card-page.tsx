import { useState } from "react";
import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, Input, Link, Select, Surface, Tag, defineRainLocalRecipe, type CardLocalRecipe } from "@rain-next/ui";
import { CardGallery, cardSpacingOptions, courseCardDefaultLayout, type CardSpacing } from "../../../../prototype/src/card-recipes";
import "./card-page.css";

const isolatedRecipe: CardLocalRecipe = defineRainLocalRecipe({
  id: "card-isolation-review", scope: "feature", origin: "ui-card",
  classes: { root: "[--rain-card-spacing:var(--rain-space-24)]", content: "px-rain-0" },
  modifiedParts: ["root", "content"], candidateTokens: [], promotionStatus: "not-proposed",
});

const wideActionsRecipe: CardLocalRecipe = defineRainLocalRecipe({
  id: "card-wide-actions-review", scope: "feature", origin: "ui-card",
  classes: { header: "grid-cols-1", action: "col-span-full row-start-3 justify-start" },
  modifiedParts: ["header", "action"], candidateTokens: [], promotionStatus: "not-proposed",
});

export function CardPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [density, setDensity] = useState<Density>("default");
  const [spacing, setSpacing] = useState<CardSpacing>(20);
  const [layout, setLayout] = useState<"stacked" | "side">(courseCardDefaultLayout);
  const [longContent, setLongContent] = useState(false);
  const [showHeader, setShowHeader] = useState(true), [showFooter, setShowFooter] = useState(true);
  const [narrow, setNarrow] = useState(false);
  const [tintedActions, setTintedActions] = useState(false);
  return <DensityProvider density={density}>
    <main className="card-review" data-rain-id="card-page" data-rain-theme={theme} data-asset-identity="local-experiment">
      <header><Link href="#components">返回组件</Link><h1 id="card-title" tabIndex={-1}>Card 卡片</h1>
        <p>用卡片呈现独立内容，并围绕阅读、查看或提交组织操作。</p><Tag color="neutral" size={20}>间距已确认 · 组件候选</Tag>
      </header>
      <section className="card-review-controls" aria-label="预览设置">
        <label className="card-review-setting"><span id="card-theme-label">主题</span><Select clearable={false} aria-labelledby="card-theme-label" value={theme} onValueChange={value => setTheme(value as "light" | "dark")} options={[{ value: "light", label: "浅色" }, { value: "dark", label: "深色" }]} /></label>
        <label className="card-review-setting"><span id="card-size-label">卡片内边距</span><Select clearable={false} aria-labelledby="card-size-label" value={spacing} onValueChange={value => setSpacing(value as CardSpacing)} options={cardSpacingOptions} /></label>
        <label className="card-review-setting"><span id="card-layout-label">课程卡布局</span><Select clearable={false} aria-labelledby="card-layout-label" value={layout} onValueChange={value => setLayout(value as "stacked" | "side")} options={[{ value: "stacked", label: "上图下文" }, { value: "side", label: "左图右文" }]} /></label>
        <Checkbox checked={density === "compact"} onCheckedChange={checked => setDensity(checked ? "compact" : "default")} label="紧凑控件" />
      </section>
      <details className="card-review-options"><summary data-focus="control">更多预览条件</summary>
        <div className="card-review-controls">
          <Checkbox checked={longContent} onCheckedChange={setLongContent} label="长内容" />
          <Checkbox checked={showHeader} onCheckedChange={setShowHeader} label="显示 Header" />
          <Checkbox checked={showFooter} onCheckedChange={setShowFooter} label="显示 Footer" />
          <Checkbox checked={narrow} onCheckedChange={setNarrow} label="窄容器" />
          <Checkbox checked={tintedActions} onCheckedChange={setTintedActions} label="浅底操作区（样式参考）" />
        </div>
      </details>
      <p className="card-review-note">四种卡片同步调整内边距，内容与宽度保持一致。默认内边距为 20px。以下内容使用虚构数据，操作仅在当前页面演示。</p>
      <CardGallery spacing={spacing} courseLayout={layout} longContent={longContent} showHeader={showHeader} showFooter={showFooter} narrow={narrow} tintedActions={tintedActions} />
      <details className="card-review-developer"><summary data-focus="control">开发验证</summary>
      <section className="card-review-section" aria-label="修改隔离验证">
        <h2>修改一张卡片，不影响其他卡片</h2><p>这组样本用于检查样式作用范围。左侧外卡改为 24px 留白，内容区贴边；内层卡片与右侧卡片仍保持默认 20px 留白。</p>
        <div className="card-review-comparison">
          <Card localRecipe={isolatedRecipe} data-example="isolation-target"><CardHeader><CardTitle>已修改的外卡</CardTitle></CardHeader>
            <CardContent><Card data-example="nested-default"><CardHeader><CardTitle>内层卡片</CardTitle><CardAction><Button size="mini" variant="tertiary">内层操作</Button></CardAction></CardHeader><CardContent>保留默认留白，不受外卡修改影响。</CardContent><CardFooter>内部脚注</CardFooter></Card></CardContent>
          </Card>
          <Card data-example="isolation-control"><CardHeader><CardTitle>默认对照</CardTitle></CardHeader><CardContent>不继承左侧的局部修改。</CardContent></Card>
        </div>
        <div className="card-review-theme-island" data-rain-theme={theme === "light" ? "dark" : "light"}><Card data-example="theme-island"><CardHeader><CardTitle>独立主题区域</CardTitle></CardHeader><CardContent>此区域使用相反主题，仍沿用同一套卡片结构。</CardContent></Card></div>
      </section>
      <section className="card-review-section" aria-label="既有组件对照"><h2>既有组件对照</h2><Surface data-rain-theme="light" variant="panel" className="card-review-protected" data-example="protected"><Button>既有按钮</Button><Input aria-label="既有输入框" defaultValue="课程标题" /><Tag color="brand" size={20}>既有标签</Tag></Surface></section>
      <section className="card-review-section" aria-label="宽操作布局验证"><h2>较多操作使用独立一行</h2>
        <Card localRecipe={wideActionsRecipe} data-example="wide-actions"><CardHeader>
          <CardTitle>学习提醒操作区</CardTitle><CardDescription>长文案或多个动作由当前用法明确安排。</CardDescription>
          <CardAction><Button size="small">保存并通知学生</Button><Button size="small" variant="tertiary">预览提醒</Button></CardAction>
        </CardHeader></Card>
      </section>
      </details>
      <section className="card-review-section"><h2>使用约定</h2><p>卡片四周留白不小于内容分组间距；相关内容靠近，主要区块间距最多 16px。卡片留白与控件密度分别设置。课程封面可贴边，正文沿用同一留白规则。操作区默认与卡片同色；浅底色仅作为可选样式参考。</p>
        <pre>{'import { Card, CardHeader, CardTitle, CardContent } from "@rain-next/ui";\n\n<Card size="default">\n  <CardHeader><CardTitle>课程公告</CardTitle></CardHeader>\n  <CardContent>公告内容</CardContent>\n</Card>'}</pre>
      </section>
    </main>
  </DensityProvider>;
}
