import { useState } from "react";
import { Button, Link, Progress, ProgressLabel, ProgressValue } from "@rain-next/ui";

export function MaterialSync() {
  const [value, setValue] = useState(40);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const complete = value === 100;
  return <>
    <section aria-label="资料同步任务">
      <Progress value={value} max={100}>
        <ProgressLabel>资料同步</ProgressLabel><ProgressValue />
      </Progress>
      <div role="status">
        <p>{failed ? "同步中断，请重试" : complete ? "全部资料已同步"
          : paused ? "同步已暂停" : "已完成 " + value + " / 100 份资料"}</p>
        {(failed || paused) && <p className="rain-type-ui-caption">已完成 {value} 份，继续时保留当前进度。</p>}
      </div>
      {failed ? <Button variant="primary" onClick={() => { setFailed(false); setPaused(false); }}>重试同步</Button>
        : complete ? <Link href="#item">查看课程资料</Link>
          : <Button variant={paused ? "secondary" : "text"} aria-pressed={paused}
            onClick={() => setPaused(current => !current)}>{paused ? "继续同步" : "暂停同步"}</Button>}
    </section>
    <div role="group" aria-label="演示控制">
      <span className="rain-type-ui-caption">演示控制</span>
      <Button variant="secondary" disabled={paused || failed || complete}
        onClick={() => setValue(current => Math.min(100, current + 20))}>完成下一批</Button>
      <Button variant="text" disabled={complete || failed}
        onClick={() => { setFailed(true); setPaused(false); }}>模拟失败</Button>
      <Button variant="text" onClick={() => { setValue(0); setPaused(false); setFailed(false); }}>重新开始</Button>
    </div>
  </>;
}
