import { Progress, ProgressLabel, ProgressValue } from "@rain-next/ui";

export function ProgressExamples() {
  return (
    <>
      <Progress value={6} min={0} max={24}>
        <ProgressLabel>批改任务</ProgressLabel>
        <ProgressValue />
      </Progress>
      <p>已完成 6 / 24 份</p>
      <Progress value={null}><ProgressLabel>正在解析资料</ProgressLabel></Progress>
      <p>进度暂不可计算，请等待结果。</p>
    </>
  );
}
