import { useState } from "react";
import { Button, Switch } from "@rain-next/ui";
import { ComponentDoc } from "./component-doc";

export function SwitchPage() {
  const [checked, setChecked] = useState(true);
  const [submitted, setSubmitted] = useState("尚未读取");
  return <ComponentDoc id="switch" title="Switch 开关" description="用于即时生效的二态设置，标签与说明由宿主组合。"
    useWhen={["开启或关闭即时设置", "表单中的布尔值"]} avoidWhen={["执行保存、提交命令", "三个以上互斥选项"]}
    props={[{name:"size",type:"small | medium | large",default:"medium",description:"三档现有控件尺寸"},{name:"checked / defaultChecked",type:"boolean",description:"受控或初始值"},{name:"onCheckedChange",type:"(checked: boolean) => void",description:"业务设置留给宿主"},{name:"disabled / loading",type:"boolean",default:"false",description:"禁止交互或处理中"},{name:"name / value / required",type:"原生表单属性",description:"参与原生提交、验证和重置"}]}
    source="packages/ui/src/switch/switch.tsx"
    code={'import { Switch } from "@rain-next/ui";\n<label htmlFor="notifications">接收通知</label>\n<Switch id="notifications" checked={checked} onCheckedChange={setChecked} />'}>
      <section className="core-family" aria-labelledby="switch-states-title">
        <h2 id="switch-states-title" className="m-rain-0 mb-rain-16 rain-type-section-title">三档尺寸与状态</h2>
        <div className="flex flex-wrap items-center gap-rain-16">
          <div className="inline-flex items-center gap-rain-8"><span>小</span><Switch size="small" aria-label="小尺寸开关" /></div>
          <div className="inline-flex items-center gap-rain-8"><span>中</span><Switch size="medium" aria-label="中尺寸开关" defaultChecked /></div>
          <div className="inline-flex items-center gap-rain-8"><span>大</span><Switch size="large" aria-label="大尺寸开关" /></div>
          <div className="inline-flex items-center gap-rain-8"><span>禁用</span><Switch aria-label="禁用开关" disabled /></div>
          <div className="inline-flex items-center gap-rain-8"><span>加载中</span><Switch aria-label="加载中的开关" loading /></div>
          <div className="inline-flex items-center gap-rain-8"><span>禁用加载</span><Switch aria-label="禁用且加载中的开关" disabled loading /></div>
        </div>
      </section>
      <section className="core-family" aria-labelledby="switch-form-title">
        <h2 id="switch-form-title" className="m-rain-0 mb-rain-16 rain-type-section-title">外部标签与原生表单</h2>
        <form aria-label="开关设置" onSubmit={(event) => { event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get("notifications") ?? "关闭")); }}>
          <div className="flex items-center gap-rain-8">
            <label htmlFor="switch-form-notifications">接收课程通知</label>
            <Switch id="switch-form-notifications" name="notifications" value="enabled" defaultChecked required />
          </div>
          <div className="mt-rain-16 flex flex-wrap gap-rain-8">
            <Button type="submit">读取表单值</Button>
            <Button type="reset" variant="secondary">重置</Button>
          </div>
          <p className="mb-rain-0 text-rain-size-13 leading-rain-22" role="status">当前表单值：{submitted}</p>
        </form>
      </section>
      <section className="core-family" aria-labelledby="switch-controlled-title">
        <h2 id="switch-controlled-title" className="m-rain-0 mb-rain-16 rain-type-section-title">受控设置</h2>
        <div className="flex items-center gap-rain-4">
          <Switch aria-label="自动发布" checked={checked} onCheckedChange={setChecked} />
          <span className="text-rain-size-14 text-rain-text-secondary">{checked ? "自动发布已开启" : "自动发布已关闭"}</span>
        </div>
      </section>
  </ComponentDoc>;
}
