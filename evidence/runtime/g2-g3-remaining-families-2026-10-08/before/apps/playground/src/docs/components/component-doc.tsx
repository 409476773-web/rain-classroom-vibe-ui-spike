import { useLayoutEffect, useState, type ReactNode } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Button, Link } from "@rain-next/ui";
import "./component-doc.css";

export type DocProp = { name: string; type: string; default?: string; description: string };
export type ComponentDocProps = {
  id: string;
  title: string;
  description: string;
  category?: string;
  status?: string;
  useWhen: readonly string[];
  avoidWhen: readonly string[];
  props: readonly DocProp[];
  slots?: readonly string[];
  source: string;
  code: string;
  children: ReactNode;
};

export function ComponentDoc({ id, title, description, category = "UI", status = "共享候选 · 尚未发布", useWhen, avoidWhen, props, slots, source, code, children }: ComponentDocProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [density, setDensity] = useState<"default" | "compact">("default");
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previous = root.getAttribute("data-rain-theme");
    root.setAttribute("data-rain-theme", theme);
    return () => { if (previous === null) root.removeAttribute("data-rain-theme"); else root.setAttribute("data-rain-theme", previous); };
  }, [theme]);
  return <DensityProvider density={density}>
    <main className="component-doc core-ui-shell" data-rain-id={`doc-${id}`} data-asset-identity="local-experiment" data-rain-theme={theme}>
      <header className="component-doc__header">
        <Link href="#components">返回组件目录</Link>
        <div className="component-doc__title"><h1 id={`${id}-title`} tabIndex={-1}>{title}</h1><span>{category} · {status}</span></div>
        <p>{description}</p>
        <div className="component-doc__settings" aria-label="预览设置">
          <Button variant="text" size="small" tone={theme === "light" ? "brand" : "default"} aria-pressed={theme === "light"} onClick={() => setTheme("light")}>浅色</Button>
          <Button variant="text" size="small" tone={theme === "dark" ? "brand" : "default"} aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>深色</Button>
          <Button variant="text" size="small" tone={density === "compact" ? "brand" : "default"} aria-pressed={density === "compact"} onClick={() => setDensity(value => value === "default" ? "compact" : "default")}>紧凑密度</Button>
        </div>
      </header>
      <div className="component-doc__examples">{children}</div>
      <section className="component-doc__usage" aria-labelledby={`${id}-usage`}>
        <h2 id={`${id}-usage`}>使用边界</h2>
        <div className="component-doc__columns"><div><h3>适合用在</h3><ul>{useWhen.map(text => <li key={text}>{text}</li>)}</ul></div><div><h3>避免用在</h3><ul>{avoidWhen.map(text => <li key={text}>{text}</li>)}</ul></div></div>
      </section>
      <DocReference id={id} title={title} props={props} slots={slots} source={source} code={code} />
    </main>
  </DensityProvider>;
}

export function DocExample({ title, description, code, children }: { title: string; description?: string; code?: string; children: ReactNode }) {
  return <section className="component-doc__example"><h2>{title}</h2>{description ? <p>{description}</p> : null}<div className="component-doc__preview">{children}</div>{code ? <DocCode code={code} /> : null}</section>;
}

export function DocCode({ code }: { code: string }) {
  const [message, setMessage] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(code); setMessage("已复制"); }
    catch { setMessage("请选中下方代码复制"); }
  }
  return <div className="component-doc__code-block"><div className="component-doc__copy"><Button variant="text" onClick={copy}>复制代码</Button><span role="status">{message}</span></div><pre className="component-doc__code"><code>{code}</code></pre></div>;
}

export function DocReference({ id, title, props, slots, source, code }: Pick<ComponentDocProps, "id" | "title" | "props" | "slots" | "source" | "code">) {
  return <div className="component-doc__reference"><section className="component-doc__api" aria-labelledby={`${id}-api`}>
    <h2 id={`${id}-api`}>API 与结构</h2>
    <div className="component-doc__table"><table><caption>{title} 常用接口</caption><thead><tr><th scope="col">名称</th><th scope="col">类型</th><th scope="col">默认</th><th scope="col">说明</th></tr></thead><tbody>{props.map(prop => <tr key={prop.name}><th scope="row"><code>{prop.name}</code></th><td><code>{prop.type}</code></td><td>{prop.default ?? "—"}</td><td>{prop.description}</td></tr>)}</tbody></table></div>
    {slots?.length ? <p>Parts / Slots：{slots.join("、")}</p> : null}
  </section><section className="component-doc__calling" aria-labelledby={`${id}-code`}><h2 id={`${id}-code`}>调用示例</h2><DocCode code={code} /><p className="component-doc__source">当前源码：<code>{source}</code></p></section></div>;
}
