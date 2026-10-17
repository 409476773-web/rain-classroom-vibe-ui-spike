import { Progress, ProgressLabel, ProgressValue } from "@rain-next/ui";
export function Example(){return (<>
<Progress value={6} max={24}>
  <ProgressLabel>批改任务</ProgressLabel>
  <ProgressValue />
</Progress>
<p>已完成 6 / 24 份答卷</p>
</>);}
