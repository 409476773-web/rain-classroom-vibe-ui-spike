import { createRoot } from "react-dom/client";
import { useState } from "react";
import { Tabs, NavigationBar } from "../../packages/ui/src/index";
import { FilterToolbarExample } from "../../apps/playground/src/docs/examples/filter-toolbar";
import { SectionedFormExample } from "../../apps/playground/src/docs/examples/sectioned-form";
import { GradingActionsExample } from "../../apps/playground/src/docs/examples/grading-actions";

function host(id: string) {
  document.getElementById("root")!.style.display = "none";
  const node = document.createElement("main"); node.id = id;
  Object.assign(node.style, { background: "var(--rain-color-surface-panel)", padding: "24px", color: "var(--rain-color-text-primary)" });
  document.body.append(node); return node;
}

export function mountTabsFixture() {
  createRoot(host("tabs-divider-verification")).render(<>
    {(["top", "bottom", "start", "end"] as const).map(position => <section key={position} data-divider-position={position} style={{ width: 700, marginBottom: 24 }}>
      <Tabs position={position} size={32} showDivider aria-label={`${position} divider`} items={[
        { value: "overview", label: "概览", content: <p>概览内容</p> },
        { value: "settings", label: "设置", content: <p>设置内容</p> },
      ]} />
    </section>)}
  </>);
}

export function mountCompositionsFixture() {
  createRoot(host("composition-verification")).render(<div style={{ display: "grid", gap: "var(--rain-space-32)", maxWidth: 880 }}>
    <FilterToolbarExample />
    <SectionedFormExample />
    <GradingActionsExample />
  </div>);
}

function NonTargetTabs() {
  const [page, setPage] = useState("overview");
  const items = [
    { value: "overview", label: "概览", content: <p>概览内容</p> },
    { value: "settings", label: "设置", content: <p>设置内容</p> },
    { value: "disabled", label: "停用", disabled: true, content: <p>不可进入</p> },
  ];
  return <>
    <section data-non-target="line"><Tabs showDivider={false} items={items} aria-label="line without divider" /></section>
    <section data-non-target="contained"><Tabs appearance="contained" items={items} aria-label="contained" /></section>
    <section data-non-target="soft"><Tabs appearance="soft" items={items} aria-label="soft" /></section>
    <NavigationBar aria-label="页面导航对照" activeId={page} onNavigate={(id, event) => { event.preventDefault(); setPage(id); }} items={[
      { id: "overview", label: "课程概览", href: "#overview" }, { id: "settings", label: "课程设置", href: "#settings" },
    ]} />
  </>;
}
export function mountNonTargetTabsFixture() { createRoot(host("tabs-non-target")).render(<NonTargetTabs />); }
