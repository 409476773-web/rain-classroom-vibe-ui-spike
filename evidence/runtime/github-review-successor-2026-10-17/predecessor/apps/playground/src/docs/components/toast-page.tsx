import { useState } from "react";
import { Button, Toaster, createToastManager } from "@rain-next/ui";
import { ComponentDoc, DocExample } from "./component-doc";

const code = `import { useState } from "react";
import { Button, Toaster, createToastManager } from "@rain-next/ui";

const [manager] = useState(() => createToastManager());
<Toaster toastManager={manager} timeout={4000} limit={3} theme="light">
  <Button onClick={() => manager.add({
    title: "已保存", description: "设置已保留", type: "success",
    actionProps: { children: "撤回", onClick: undo },
  })}>保存</Button>
</Toaster>`;

function ToastExamples({ theme }: { theme: "light" | "dark" }) {
  const [manager] = useState(() => createToastManager());
  const [lastAction, setLastAction] = useState("尚未撤回");
  const notify = (type: "success" | "error" | "info") => manager.add({ title: type === "success" ? "设置已保存" : type === "error" ? "保存失败" : "后台同步已开始", description: type === "error" ? "请检查连接并重试；本页为交互示例。" : "此通知属于当前页面的独立队列。", type, actionProps: type === "success" ? { children: "撤回", onClick: () => setLastAction("已撤回当前示例设置") } : undefined });
  return <Toaster toastManager={manager} theme={theme} timeout={4000} limit={3}>
    <DocExample title="结果、操作与关闭" description="通知在页面顶部居中，距顶边 24px；默认 4 秒后关闭。悬停或 F6 聚焦时暂停计时，可执行撤回或点击关闭。">
      <div className="flex flex-wrap gap-rain-8"><Button onClick={() => notify("success")}>成功提示</Button><Button variant="secondary" onClick={() => notify("info")}>信息提示</Button><Button variant="tertiary" onClick={() => notify("error")}>失败提示</Button></div><p className="component-doc__status" role="status">{lastAction}</p>
    </DocExample>
    <DocExample title="连续队列与持续通知" description="连续添加会形成真实叠放队列，可同时展示 3 条。持续通知 timeout=0，保留关闭入口。" code={`manager.add({ title: "仍在处理中", type: "info", timeout: 0 });`}>
      <div className="flex flex-wrap gap-rain-8"><Button variant="secondary" onClick={() => { for (let index = 1; index <= 4; index++) manager.add({ title: `队列通知 ${index}`, description: "移到通知区展开，检查每条通知。", type: "info" }); }}>连续添加 4 条</Button><Button variant="tertiary" onClick={() => manager.add({ title: "仍在处理中", description: "此通知不会自动消失，可手动关闭。", type: "loading", timeout: 0 })}>添加持续通知</Button></div>
    </DocExample>
  </Toaster>;
}

export function ToastPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return <ComponentDoc id="toast" title="Toast 轻提示" description="展示暂时性的操作结果，保留 Base UI 队列、关闭、计时暂停和键盘入口。每个宿主可创建独立 manager。"
    onThemeChange={setTheme}
    useWhen={["保存、撤回、同步等操作结果需要暂时反馈，并有可再次查看的持续结果。"]} avoidWhen={["必须回应的确认使用 Dialog；持续未解决的错误使用 Alert；不能只靠消失的通知说明问题。"]}
    props={[
      { name: "toastManager", type: "createToastManager() 返回值", default: "共享 toast manager", description: "推荐每个应用或独立演示只创建一个稳定实例。" },
      { name: "timeout", type: "number", default: "5000", description: "自动关闭毫秒数；可在 add 中覆盖，0 表示持续显示。" },
      { name: "limit", type: "number", default: "3", description: "Viewport 同时显示的通知数量。" },
      { name: "theme", type: '"light" | "dark"', default: '"light"', description: "显式传给 Portal 的主题；密度跟随 DensityProvider。" },
      { name: "manager.add", type: "Base UI Toast add options", description: "title、description、type、timeout、actionProps 等原生通知内容。" },
      { name: "Toast Parts", type: "Base UI 各 Parts Props", description: "需要自定义 Anatomy 时使用 Provider / Portal / Viewport / Root / Content / Title / Description / Action / Close。" },
    ]} slots={["toast-portal", "toast-viewport", "toast", "toast-content", "toast-icon", "toast-title", "toast-description", "toast-action", "toast-close"]} source="packages/ui/src/toast/toast.tsx" code={code}>
    <ToastExamples theme={theme} />
  </ComponentDoc>;
}
