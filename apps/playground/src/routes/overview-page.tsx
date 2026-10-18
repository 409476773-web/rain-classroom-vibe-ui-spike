import {
  benchmarkIndex,
  type BenchmarkIndexEntry,
} from "../docs/benchmark-index";
import delivery from "../docs/library-status.generated.json";
import { overviewRoutes } from "./route-registry";
import "./overview-page.css";

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
        <p className="eyebrow">Rain Classroom · Local Component Library</p>
        <h1 id="overview-title" tabIndex={-1}>
          Rain Next Playground
        </h1>
        <div className="phase-line" aria-label="当前阶段">
          <span className="phase-dot" aria-hidden="true" />
          <strong>{delivery.title}</strong>
          <span>更新于 {delivery.updatedAt}</span>
        </div>
        <div className="overview-summary">
          <p>{delivery.scope}</p>
          <p>{delivery.currentWork}</p>
          <p aria-label="资产范围">{delivery.contracts} 份资产合同 · {delivery.candidates} 项候选 · {delivery.localExperiments} 项本地实验</p>
          <p>{delivery.acceptance}</p>
          <p>{delivery.limitations}</p>
        </div>
        <details className="overview-history">
          <summary data-focus="item">历史基线</summary>
          <p className="intro-copy" aria-label="历史基线">
            Day 3 Core UI 已完成本地实现和自动检查，现作为 B2 对照基线。
            图标库继续复用；各组件人工验收与发布状态独立记录。
          </p>
        </details>
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
          <p>从基础规范、组件用法、图标和业务切片进入当前可体验范围。</p>
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
          <p>组件目录覆盖基础控件、表单、导航、工作区、图表与会话组合；实现与各自验收范围见对应文档。</p>
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
          <p>四类业务切片已有本地实现；下方分别显示实现、自动检查与人工确认记录。</p>
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
                    实现：{implementationLabels[implementation]}
                  </span>
                  <div className="benchmark-lifecycle">
                    <span>自动检查：{benchmark.automatedVerification === "passed" ? "已有通过记录" : benchmark.automatedVerification === "failed" ? "失败" : "未运行"}</span>
                    <span>人工确认：{benchmark.humanGate === "accepted" ? "当前场景已接受" : "待确认"}</span>
                  </div>
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
