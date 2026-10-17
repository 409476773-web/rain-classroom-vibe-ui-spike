import React from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig, useReducedMotion } from 'motion/react';
import '@rain-next/foundations/tokens.css';
import '@rain-next/foundations/typography.css';
import '@rain-next/foundations/focus.css';
import '@rain-next/ui/charts/styles.css';
import './app.css';
import { CompletionReport } from './report';
import { RegionalGoals } from './regional';

function App() {
  const reduced = Boolean(useReducedMotion());
  const regional = new URLSearchParams(location.search).get('task') === 'regional';
  return <div className="consumer" data-rain-id="local-chart-consumption" data-density="default" data-motion={reduced ? 'reduced' : 'normal'}>
    <header><p className="eyebrow">训练营运营 · Mock 数据</p><h1>训练营报告</h1>
      <p>独立宿主消费 Rain 图表候选。示意数据与区域仅用于验证。</p>
      <nav aria-label="报告任务"><a data-focus="control" href="/?task=report" aria-current={!regional ? 'page' : undefined}>报名与完成</a><a data-focus="control" href="/?task=regional" aria-current={regional ? 'page' : undefined}>地区与目标</a></nav>
    </header>
    <main>{regional ? <RegionalGoals reduced={reduced} /> : <CompletionReport reduced={reduced} />}</main>
    <footer>本地候选 · unpublished · 真实读屏、触屏与最终视觉验收尚未进行</footer>
  </div>;
}
createRoot(document.getElementById('root')!).render(<MotionConfig reducedMotion="user"><App /></MotionConfig>);
