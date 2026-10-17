import { useId, useState } from "react";
import { Button, FormItem, Input, ScopeNavigation, Textarea, defineRainLocalRecipe } from "@rain-next/ui";
import { ConnectedSurface, type ConnectedSurfaceConnection, type ConnectedSurfaceMode } from "@rain-next/layouts";
import { FolderIcon } from "@rain-next/ui/icons/folder";
import { MembersIcon } from "@rain-next/ui/icons/members";
import { FileFormatPdfIcon } from "@rain-next/ui/icons/file-format-pdf";
import { ResourceIcon } from "@rain-next/ui/icons/resource";
import { ExamLibraryIcon } from "@rain-next/ui/icons/exam-library";
import { AddCircleOutlineIcon } from "@rain-next/ui/icons/add-circle-outline";
import "./scope-connected-recipes.css";

export const scopeNavigationRecipe = defineRainLocalRecipe({
  id: "navigation-playground-scope", scope: "feature", origin: "ui-scope-navigation",
  classes: { root: "scope-recipe__navigation" }, modifiedParts: ["root"],
  candidateTokens: [], promotionStatus: "not-proposed",
} as const);

const scopes = [{ id: "public", label: "公共资源包", description: "课程内容 · 班级共用", icon: <FolderIcon size={18} /> },
  ...Array.from({ length: 10 }, (_, index) => ({ id: `class-${index + 1}`, label: `高等数学 ${index + 1} 班`, description: "教学班 · 2026 秋", icon: <MembersIcon size={18} /> }))];
const initialResources = [
  { id: "lecture", title: "函数的定义与表示", kind: "讲义", detail: "PDF · 8 页" },
  { id: "video", title: "极限的直观理解", kind: "视频", detail: "18 分钟" },
  { id: "practice", title: "第一章随堂练习", kind: "练习", detail: "3 道题" },
];
type CourseResource = typeof initialResources[number];

function CourseScopeScene({ connections = false }: { connections?: boolean }) {
  const instance = useId();
  const [scopeId, setScopeId] = useState("public");
  const [connection, setConnection] = useState<ConnectedSurfaceConnection>("inset"), [surface, setSurface] = useState<ConnectedSurfaceMode>("tonal");
  const [notes, setNotes] = useState<Record<string, string>>({}), [saved, setSaved] = useState<Record<string, string>>({});
  const [resourcesByScope, setResourcesByScope] = useState<Record<string, CourseResource[]>>({});
  const [pending, setPending] = useState<Record<string, string | undefined>>({});
  const selected = scopes.find(item => item.id === scopeId)!;
  const resources = resourcesByScope[scopeId] ?? initialResources;
  const note = notes[scopeId] ?? "";
  const icons = [<FileFormatPdfIcon size={24} />, <ResourceIcon size={24} />, <ExamLibraryIcon size={24} />];
  return <section className="scope-recipe" aria-label="课程范围内容" data-rain-id="recipe-course-scope" data-asset-identity="local-experiment">
    <header className="scope-recipe__course"><div><h3>高等数学 A</h3><p>课程资料 · 2026 秋季学期</p></div><a href={`?sample=${connections ? "Connections" : "R2"}#navigation-v042`}>完整建设页 ↗</a></header>
    {connections && <div className="scope-recipe__connections" aria-label="连续表面设置">
      <Button variant="text" size="small" aria-pressed={connection === "inset"} onClick={() => setConnection("inset")}>内衬连接</Button>
      <Button variant="text" size="small" aria-pressed={connection === "merged"} onClick={() => setConnection("merged")}>贴边连接</Button>
      <Button variant="text" size="small" aria-pressed={surface === "outlined"} onClick={() => setSurface(surface === "outlined" ? "tonal" : "outlined")}>白底轮廓</Button>
    </div>}
    <ScopeNavigation className={scopeNavigationRecipe.classes.root} items={scopes} value={scopeId} onValueChange={setScopeId} visibleLimit={3} aria-label="课程资料范围"
      renderSurface={({ track, panels }) => <ConnectedSurface instanceId={`course-scope-${instance}`} className="scope-recipe__surface" activeKey={scopeId} connection={connection} surfaceMode={surface} track={track}>{panels}</ConnectedSurface>}>
      <div className="scope-recipe__content">
        <div className="scope-recipe__path">课程资料 / {selected.label}</div>
        <div className="scope-recipe__chapter"><div><h3>第一章　函数、极限与连续</h3><p>{resources.length} 项资料 · {scopeId === "public" ? "供关联班级复用" : "当前教学班的课程内容"}</p></div>
          <Button variant="tertiary" size="small" leadingIcon={<AddCircleOutlineIcon />} onClick={() => setPending(previous => ({ ...previous, [scopeId]: "" }))}>添加资料</Button>
        </div>
        <ul className="scope-recipe__resources" aria-label="本章资料">{resources.map((resource, index) => <li key={resource.id}>
          <span className="scope-recipe__file-icon" aria-hidden="true">{icons[index] ?? icons[0]}</span><div><strong>{resource.title}</strong><span>{resource.kind} · {resource.detail}</span></div>
          <span className="scope-recipe__resource-status">{scopeId === "public" ? "课程共用" : index < 2 ? "已开放" : "草稿"}</span>
        </li>)}</ul>
        {pending[scopeId] !== undefined && <form className="scope-recipe__add" onSubmit={event => {
          event.preventDefault(); const title = pending[scopeId]?.trim(); if (!title) return;
          setResourcesByScope(previous => ({ ...previous, [scopeId]: [...resources, { id: `${scopeId}-resource-${resources.length + 1}`, title, kind: "讲义", detail: "本地示例" }] }));
          setPending(previous => ({ ...previous, [scopeId]: undefined }));
        }}>
          <FormItem label="资源名称"><Input value={pending[scopeId]} autoComplete="off" required maxLength={80} placeholder="填写资料名称" onValueChange={value => setPending(previous => ({ ...previous, [scopeId]: value }))} /></FormItem>
          <div><Button type="submit" variant="primary" size="small" disabled={!pending[scopeId]?.trim()}>添加到本范围</Button><Button type="button" variant="tertiary" size="small" onClick={() => setPending(previous => ({ ...previous, [scopeId]: undefined }))}>取消</Button></div>
        </form>}
        <div className="scope-recipe__note"><FormItem label="范围教学备注"><Textarea rows={2} value={note} placeholder="记录本范围的教学安排" onValueChange={value => setNotes(previous => ({ ...previous, [scopeId]: value }))} /></FormItem></div>
        <footer className="scope-recipe__footer"><span>{scopeId === "public" ? "公共资源可供班级复用" : selected.label}<span role="status">{note !== (saved[scopeId] ?? "") ? " · 有未保存修改" : saved[scopeId] !== undefined ? " · 草稿已在本地保存" : " · 仅本地演示"}</span></span>
          <Button variant="primary" size="small" onClick={() => setSaved(previous => ({ ...previous, [scopeId]: note }))}>保存草稿</Button>
        </footer>
      </div>
    </ScopeNavigation>
  </section>;
}

export function ScopeNavigationRecommendedScene() { return <CourseScopeScene />; }
export function ConnectedSurfaceRecommendedScene() { return <CourseScopeScene connections />; }
