import { useEffect, useRef, useState } from "react";
import { DensityProvider, type Density } from "@rain-next/foundations";
import { Alert, AlertActions, AlertDescription, AlertTitle, Button, Link, alertClassicShortRecipe, type AlertTone } from "@rain-next/ui";
import "./alert-page.css";
import { DocReference } from "./component-doc";

const examples: { tone: AlertTone; label: string; message: string }[] = [
  { tone: "info", label: "信息", message: "成绩发布后，学生才能查看批改结果。" },
  { tone: "success", label: "成功", message: "成绩已发布，学生现在可以查看评分与评语。" },
  { tone: "warning", label: "警告", message: "有 3 道题尚未设置分值，请在发布前补全。" },
  { tone: "error", label: "错误", message: "成绩提交失败，本次修改仍然保留。" },
];

function RetryExample() {
  const [status, setStatus] = useState<"error" | "pending" | "success">("error");
  const [visible, setVisible] = useState(true), [attempts, setAttempts] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const restore = useRef<HTMLButtonElement>(null), retry = useRef<HTMLButtonElement>(null), result = useRef<HTMLDivElement>(null);
  const focusResult = useRef(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { if (status === "success" && focusResult.current) { result.current?.focus(); focusResult.current = false; } }, [status]);
  function submit() {
    if (status === "pending") return;
    const attempt = attempts + 1; setAttempts(attempt); setStatus("pending");
    timer.current = setTimeout(() => {
      focusResult.current = attempt > 1 && document.activeElement === retry.current;
      setStatus(attempt > 1 ? "success" : "error");
    }, 900);
  }
  const summary = status === "success" ? "成绩已提交" : status === "pending" ? "正在提交成绩…" : attempts ? "仍未连接成功，修改已保留" : "有成绩尚未提交";
  return <div className="alert-demo__stack" data-testid="retry-example">
    <div className="alert-demo__row"><span className="alert-demo__label">{summary}</span><Button ref={restore} variant="text" size="compact" onClick={() => setVisible(true)}>查看提交状态</Button></div>
    <span className="alert-demo__sr-only" role="status" aria-atomic="true">{summary}</span>
    {visible && <Alert tone={status === "success" ? "success" : status === "pending" ? "info" : "error"} onClose={() => { setVisible(false); restore.current?.focus(); }} closeLabel="关闭提交提示" data-testid="retry-alert">
      <AlertTitle ref={result} tabIndex={-1} data-focus="item">{status === "success" ? "成绩已提交" : status === "pending" ? "正在重新提交" : attempts ? "暂时无法连接服务器" : "成绩提交失败"}</AlertTitle>
      <AlertDescription>{status === "success" ? "本次评分与评语已保存。你可以继续批改下一份作业。" : "本次评分与评语仍然保留。关闭提示不会取消提交，你可以随时查看最新状态。"}</AlertDescription>
      {status !== "success" && <AlertActions><Button ref={retry} variant="tertiary" size="mini" loading={status === "pending"} loadingLabel="正在提交" onClick={submit}>重新提交</Button></AlertActions>}
    </Alert>}
    <p className="alert-demo__note">交互演示：首次重试失败，第二次成功，不会提交真实成绩。</p>
  </div>;
}

export function AlertPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light"), [density, setDensity] = useState<Density>("default");
  const [banner, setBanner] = useState(true), [details, setDetails] = useState(false);
  const announcement = useRef<HTMLButtonElement>(null), detailHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (details) detailHeading.current?.focus(); }, [details]);
  const showUsage = () => document.getElementById("alert-usage")?.focus();
  return <main className="alert-demo rain-type-ui-default" data-rain-theme={theme}>
    <DensityProvider density={density} className="alert-demo__content">
      <header className="alert-demo__header">
        <Link href="#components">返回组件总览</Link>
        <div><p className="alert-demo__eyebrow">反馈 / FEEDBACK</p><h1 id="alert-title" tabIndex={-1} data-focus="item">Alert 提示</h1><p className="alert-demo__intro">让重要信息留在相关内容旁，清楚说明发生了什么，以及下一步能做什么。</p></div>
        <div className="alert-demo__toolbar">
          <div className="alert-demo__row" role="group" aria-label="预览主题">{(["light", "dark"] as const).map(value => <Button key={value} size="small" variant={theme === value ? "secondary" : "text"} aria-pressed={theme === value} onClick={() => setTheme(value)}>{value === "light" ? "浅色" : "深色"}</Button>)}</div>
          <div className="alert-demo__row" role="group" aria-label="预览密度">{(["default", "compact"] as const).map(value => <Button key={value} size="small" variant={density === value ? "secondary" : "text"} aria-pressed={density === value} onClick={() => setDensity(value)}>{value === "default" ? "常规" : "紧凑"}</Button>)}</div>
        </div>
      </header>
      <section className="alert-demo__section" aria-labelledby="alert-tones-title">
        <div className="alert-demo__section-heading"><h2 id="alert-tones-title">四种状态，同一种阅读方式</h2><p>浅底与同色正文传达含义；复合提示显示面状状态图标。</p></div>
        <div className="alert-demo__grid" data-testid="tone-matrix">{examples.map(item => <div className="alert-demo__stack" key={item.tone}><span className="alert-demo__label">{item.label}</span><Alert tone={item.tone}>{item.message}</Alert></div>)}</div>
      </section>
      <section className="alert-demo__section" aria-labelledby="alert-actions-title">
        <div className="alert-demo__section-heading"><h2 id="alert-actions-title">有原因，也有下一步</h2><p>标题、说明和操作按内容组合；提示不会自动消失。</p></div>
        <div className="alert-demo__grid">
          <div className="alert-demo__stack"><span className="alert-demo__label">风险与处理建议</span><Alert tone="warning"><AlertTitle>发布前，请检查题目设置</AlertTitle><AlertDescription>还有以下内容需要补全：<ul><li>第 3、7、12 题尚未设置分值。</li><li>第 8 题缺少供学生查看的答案解析。</li></ul></AlertDescription><AlertActions><Button variant="tertiary" size="mini" onClick={() => setDetails(true)}>检查题目</Button><Button variant="text" size="compact" onClick={showUsage}>查看提示使用说明</Button></AlertActions></Alert>
            {details && <div className="alert-demo__detail"><h3 ref={detailHeading} tabIndex={-1} data-focus="item">需要检查的题目</h3><p>第 3、7、12 题：补充分值。第 8 题：补充解析。</p><p className="alert-demo__note">这是组件交互示例，不修改实际题目。</p></div>}
          </div><RetryExample />
        </div>
      </section>
      <section className="alert-demo__section" aria-labelledby="alert-banner-title">
        <div className="alert-demo__section-heading"><h2 id="alert-banner-title">顶部公告，保留页面上下文</h2><Button ref={announcement} variant="text" size="compact" onClick={() => setBanner(true)}>查看维护公告</Button></div>
        <div className="alert-demo__canvas" data-testid="banner-example">{banner && <Alert presentation="banner" onClose={() => { setBanner(false); announcement.current?.focus(); }} closeLabel="关闭维护公告"><AlertTitle>今晚 23:00—23:30 系统维护，期间暂时无法提交作业。</AlertTitle><AlertActions><Button variant="text" size="compact" onClick={showUsage}>了解提示规则</Button></AlertActions></Alert>}<div className="alert-demo__canvas-body"><span className="alert-demo__label">人工智能导论 · 课程作业</span><h3>第三章 · 课堂练习</h3><p>公告关闭后，课程内容仍可继续查看。</p></div></div>
      </section>
      <section className="alert-demo__section" aria-labelledby="alert-comparison-title">
        <div className="alert-demo__section-heading"><h2 id="alert-comparison-title">保留熟悉的短提示</h2><p>单段文字默认不显示图标；可选配方仍可显式关闭图标，密度切换只调整留白。</p></div>
        <div className="alert-demo__grid" data-testid="classic-comparison"><div className="alert-demo__stack"><span className="alert-demo__label">默认 · 同色正文、无图标</span>{examples.map(item => <Alert key={item.tone} tone={item.tone}>{item.message}</Alert>)}</div><div className="alert-demo__stack"><span className="alert-demo__label">可选 · 同色正文、显式无图标</span>{examples.map(item => <Alert key={item.tone} tone={item.tone} icon={false} localRecipe={alertClassicShortRecipe}>{item.message}</Alert>)}</div></div>
      </section>
      <section className="alert-demo__section" aria-labelledby="alert-narrow-title">
        <div className="alert-demo__section-heading"><h2 id="alert-narrow-title">窄容器也能完整阅读</h2><p>长文字自然换行，操作区下移，关闭入口始终独立。</p></div>
        <div className="alert-demo__narrow" data-testid="narrow-example"><Alert tone="info"><AlertTitle>当前资料仅向已加入课程的学生开放，请确认所选班级与课程对应。</AlertTitle><AlertActions><Button variant="text" size="compact" onClick={showUsage}>查看当前课程的资料访问权限说明与详细处理办法</Button></AlertActions></Alert><Alert tone="warning"><AlertTitle>文件名称较长</AlertTitle><AlertDescription>待处理文件：IntroductionToArtificialIntelligence_2026_ClassroomExercises_ChapterThree_RevisionFinal.pdf</AlertDescription></Alert></div>
      </section>
      <DocReference id="alert" title="Alert" source="packages/ui/src/alert/alert.tsx"
        props={[{name:"tone",type:"info | success | warning | error",default:"info",description:"提示语义与对应图标"},{name:"presentation",type:"page | banner",default:"page",description:"页面内提示或顶部公告"},{name:"icon",type:"ReactElement | false",description:"显式图标或隐藏图标"},{name:"onClose / closeLabel",type:"MouseEventHandler / string",description:"宿主控制关闭、草稿和焦点恢复"},{name:"localRecipe",type:"AlertLocalRecipe",description:"限定实例外观，不修改共享默认"}]}
        slots={["AlertTitle","AlertDescription","AlertActions"]}
        code={'import { Alert, AlertTitle, AlertDescription } from "@rain-next/ui";\n\nexport function SaveNotice() {\n  return <Alert tone="success" role="status">\n    <AlertTitle>草稿已保存</AlertTitle>\n    <AlertDescription>你可以继续编辑本份资料。</AlertDescription>\n  </Alert>;\n}'} />
      <footer className="alert-demo__usage" id="alert-usage" tabIndex={-1} data-focus="item"><h2>使用约定</h2><p>页面内持续提示用 Alert；自动消失的操作反馈用 Message / Toast；必须回应的重要确认用 AlertDialog。关闭提示不代表问题已解决。</p><p className="alert-demo__note">当前为未发布的共享候选；原运行视觉已确认，本轮新增文档单独审阅。四种同色正文的对比度仍需单独验收；关键任务应结合实际背景确认。</p></footer>
    </DensityProvider>
  </main>;
}
