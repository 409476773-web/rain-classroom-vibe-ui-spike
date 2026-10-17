import { semanticColorTokenEntries } from "@rain-next/foundations";
import { ColorPanel } from "./color-panel";
import { GeometryPanel } from "./geometry-panel";
import { TypographyPanel } from "./typography-panel";
import "./token-foundations.css";

export function TokenFoundationsPage() {
  return <main className="foundation-shell rain-type-ui-default" data-rain-id="token-foundations" data-asset-identity="registry-candidate">
    <header className="foundation-hero">
      <a className="back-link" data-focus="item" href="#foundations">返回 Foundations</a>
      <p className="eyebrow">RAIN NEXT · FOUNDATIONS V1</p>
      <h1 id="token-foundations-title" tabIndex={-1}>Token 基础建设</h1>
      <p className="foundation-lead rain-type-reading-default">这是 Foundations 下的 Token 目录与完整排版方案。Token 定义基础值与用途，排版方案组合字体、字号、行高和字重；Tailwind 类名使用同一套来源。</p>
      <p>默认使用完整排版方案，按需调整其中的单项 Token。全局 Tab 焦点使用 Border/Brand/1 细环与 Fill/Brand/Alpha/3 浅外圈；字体、密度、焦点与动效的完整规则见 Foundations 总入口。</p>
      <p>已确认的颜色视觉范围各自保留；现有语义色中 {semanticColorTokenEntries.filter((entry) => entry.categoryId).length} 项已共享这里的 Category 色源，其余保留原定义。下方目录已包含 Tag 的 20 组分类色，可按中文色名和业务名称查找；检索不会自动改变语义映射。逐项来源与默认层级见 Foundations 兼容区。</p>
      <p>排版、线条、圆角与间距的页面视觉已于 2026-09-12 确认。颜色、对比度、组件映射与剩余真机检查仍各自保留未决状态；本次确认不代表 Foundations 整体验收完成。</p>
    </header>
    <GeometryPanel />
    <TypographyPanel />
    <ColorPanel />
  </main>;
}
