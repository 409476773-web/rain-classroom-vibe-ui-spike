import {
  benchmarkIndex,
  type BenchmarkIndexEntry,
} from "../docs/benchmark-index";
import { overviewRoutes } from "./route-registry";

const implementationLabels: Record<
  BenchmarkIndexEntry["implementation"],
  string
> = {
  "not-started": "尚未实现",
  "in-progress": "实现中",
  completed: "已完成",
};

export function OverviewPage({
  benchmarks = benchmarkIndex,
}: {
  benchmarks?: readonly BenchmarkIndexEntry[];
}) {
  return (
    <main className="playground-shell" data-rain-id="playground-shell">
      <section
        className="intro"
        aria-labelledby="overview-title"
        data-slot="overview-intro"
      >
        <p className="eyebrow">Rain Classroom · Foundation Spike</p>
        <h1 id="overview-title" tabIndex={-1}>
          Rain Next Playground
        </h1>
        <p className="intro-copy" aria-label="历史基线">
          Day 3 Core UI 已完成本地实现和自动检查，现作为 B2 对照基线。
          图标库继续复用；各组件人工验收与发布状态独立记录。
        </p>
        <div className="phase-line" aria-label="当前阶段">
          <span className="phase-dot" aria-hidden="true" />
          <span>token-foundations-v1</span>
          <strong>第 0/1 批 · 基础能力建设 · 视觉验收待确认</strong>
        </div>
      </section>

      <section
        className="entry-section"
        aria-labelledby="entry-title"
        data-slot="overview-entry-list"
      >
        <div className="section-heading">
          <div>
            <p className="section-index">START HERE</p>
            <h2 id="entry-title">直接入口</h2>
          </div>
          <p>使用普通链接进入当前可检查区域；本阶段不建立持久文档导航。</p>
        </div>

        <ul className="entry-grid">
          {overviewRoutes.map((route) => (
            <li key={route.id}>
              <a
                data-focus="item"
                href={route.href}
                aria-label={`${route.label}：${route.description}`}
              >
                <span className="entry-meta">{route.meta}</span>
                <span className="entry-title">{route.label}</span>
                <span className="entry-description">{route.description}</span>
                <span className="entry-action" aria-hidden="true">
                  查看范围
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p><a href="#token-foundations" data-focus="item">Token 基础建设：颜色、排版、线条、圆角与间距</a></p>
      </section>

      <section
        className="components-section"
        id="components"
        aria-labelledby="components-title"
        data-slot="components-index"
      >
        <div className="section-heading compact-heading">
          <div>
            <p className="section-index">COMPONENTS</p>
            <h2 id="components-title" tabIndex={-1}>
              组件范围
            </h2>
          </div>
          <p>四个基础家族已完成本地实现和自动检查；点击 Components 可查看待人工验收的候选。</p>
        </div>
      </section>

      <section
        className="benchmark-section"
        id="benchmarks"
        aria-labelledby="benchmarks-title"
        data-slot="benchmark-index"
      >
        <div className="section-heading">
          <div>
            <p className="section-index">01 / 04</p>
            <h2 id="benchmarks-title" tabIndex={-1}>
              Benchmark 入口
            </h2>
          </div>
          <p>四类范围均已登记；实现、自动验证与 Human Gate 仍各自独立。</p>
        </div>

        <ul className="benchmark-grid">
          {benchmarks.map((benchmark) => {
            const implementation = benchmark.implementation;
            return (
              <li key={benchmark.id} id={`benchmark-${benchmark.key}`}>
                <article
                  className="benchmark-card"
                  data-rain-id={`benchmark-entry-${benchmark.id.toLowerCase()}`}
                  data-state={implementation}
                >
                  <span className="benchmark-id">{benchmark.id}</span>
                  <span className="benchmark-title">{benchmark.title}</span>
                  <span className="benchmark-status">
                    {implementationLabels[implementation]}
                  </span>
                  <span className="benchmark-evidence">
                    {benchmark.evidenceIds.length} 条正式来源
                  </span>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
