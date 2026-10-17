import { Progress, ProgressLabel, Spinner } from "@rain-next/ui";
import "./unknown-task.css";

export function UnknownTask() {
  return <section aria-label="资料解析任务">
    <Progress value={null} className="unknown-task">
      <ProgressLabel>正在解析资料</ProgressLabel>
      <Spinner aria-hidden="true" />
    </Progress>
    <p>正在识别资料目录，完成后会显示可阅读内容。</p>
  </section>;
}
