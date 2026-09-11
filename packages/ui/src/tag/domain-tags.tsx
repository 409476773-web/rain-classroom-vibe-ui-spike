import type { ComponentPropsWithRef, ReactNode } from "react";
import { groupTypeTagProfiles, learningUnitMarkTypes, learningUnitTagProfiles, tagShapeClassNames, tagSystemProfiles, useDensity,
  type LearningUnitMarkType, type LearningUnitType, type TagMarkSize, type TagSize } from "@rain-next/foundations";
import { CircleCheckIcon } from "../icons/circle-check";
import { ButtonLoadingIcon } from "../icons/button-loading";
import { AlertCircleIcon } from "../icons/alert-circle";
import { CircleCloseIcon } from "../icons/circle-close";
import { InfoIcon } from "../icons/info";
import { rainCn } from "../utils/rain-class-names";
import { getTagRecipe, tagColorPaints, type TagAppearance } from "./tag.styles";
import { getDomainTagRecipe, tagDomainPaints, tagStatusPaints } from "./domain-tags.styles";

export type { LearningUnitType, LearningUnitMarkType, TagMarkSize } from "@rain-next/foundations";
type DisplayProps = Omit<ComponentPropsWithRef<"span">, "children" | "onClick" | "color" | "style" | "dangerouslySetInnerHTML">;
type OrdinaryProps = DisplayProps & { size?: TagSize; appearance?: TagAppearance };
type RootProps = DisplayProps & { rainId: string; children: ReactNode; appearance: TagAppearance; size: string | number; color: string; layout?: string; state?: string };

function DomainRoot({ rainId, appearance, size, color, layout = "horizontal", state = "static", children, className, ...nativeProps }: RootProps) {
  const density = useDensity();
  return <span {...nativeProps} data-rain-id={rainId} data-slot="root" data-size={size} data-appearance={appearance} data-variant={appearance}
    data-color={color} data-layout={layout} data-state={state} data-density={density} className={className}>{children}</span>;
}
function DomainLabel({ children, stacked = false }: { children: ReactNode; stacked?: boolean }) {
  return <span data-slot="label" className="inline-flex flex-col items-center justify-center">{stacked
    ? <><span data-slot="line">开放型</span><span data-slot="line">作业</span></> : children}</span>;
}
function assertMember(value: string | number, map: object, name: string) {
  if (!Object.hasOwn(map, value)) throw new Error(`Tag requires a registered ${name}.`);
}
function useTagSize(size?: TagSize) { const density = useDensity(); return size ?? (density === "compact" ? 20 : 24); }

export type LearningUnitTagProps = DisplayProps & (
  | { type: LearningUnitType; layout?: "horizontal"; size?: TagSize; appearance?: TagAppearance }
  | { type: "开放型作业"; layout: "stacked"; size?: never; appearance?: TagAppearance }
  | { type: "批量"; layout?: never; size?: never; appearance?: "solid" }
  | { type: "小组作答"; layout?: never; size?: never; appearance?: "outlined" }
);
export function LearningUnitTag({ type, layout, size, appearance, className, ...props }: LearningUnitTagProps) {
  const resolvedSize = useTagSize(size);
  const specialShape = type === "批量" || type === "小组作答" || layout === "stacked";
  if (specialShape && (size !== undefined || type !== "开放型作业" && layout !== undefined)) throw new Error("This learning-unit shape has predefined geometry.");
  if (type === "批量" || type === "小组作答") {
    const variant = type === "批量" ? "solid" : "outlined";
    if (appearance !== undefined && appearance !== variant) throw new Error("This learning-unit shape has a predefined appearance.");
    return <DomainRoot {...props} rainId="ui-learning-unit-tag" appearance={variant} size="fixed-shape" color={type === "批量" ? "batch" : "assignment"}
      className={rainCn(getDomainTagRecipe("assignment", variant, type === "批量" ? "batch" : "group"), type === "批量" && "rain-tag-batch border-none bg-transparent", className)}>
      {type === "批量" ? <><span aria-hidden="true" data-slot="back-layer" className={rainCn("rain-tag-batch__back absolute bottom-0", tagShapeClassNames["batch-layer"], tagDomainPaints.batch)} />
        <span data-slot="front-layer" className={rainCn("rain-tag-batch__front relative inline-flex items-center justify-center", tagShapeClassNames["batch-layer"], tagDomainPaints.batch)}><DomainLabel>{type}</DomainLabel></span></> : <DomainLabel>{type}</DomainLabel>}
    </DomainRoot>;
  }
  assertMember(type, learningUnitTagProfiles, "learning-unit type");
  if (layout !== undefined && layout !== "horizontal" && (layout !== "stacked" || type !== "开放型作业")) throw new Error("Unsupported learning-unit layout.");
  const color = learningUnitTagProfiles[type], variant = appearance ?? "filled";
  return <DomainRoot {...props} rainId="ui-learning-unit-tag" appearance={variant} size={specialShape ? "fixed-shape" : resolvedSize} color={color} layout={layout}
    className={rainCn(specialShape ? getDomainTagRecipe(color, variant, "stacked") : getTagRecipe(color, variant, resolvedSize).root, className)}>
    <DomainLabel stacked={layout === "stacked"}>{type}</DomainLabel>
  </DomainRoot>;
}

export type DifficultyTagProps = OrdinaryProps & { level: 1 | 2 | 3 | 4 | 5 };
const difficultyColors = { 1: "difficulty1", 2: "difficulty2", 3: "difficulty3", 4: "difficulty4", 5: "difficulty5" } as const;
export function DifficultyTag({ level, size, appearance = "filled", className, ...props }: DifficultyTagProps) {
  const resolvedSize = useTagSize(size); assertMember(level, difficultyColors, "difficulty level");
  const color = difficultyColors[level];
  return <DomainRoot {...props} rainId="ui-difficulty-tag" appearance={appearance} size={resolvedSize} color={color} className={rainCn(getTagRecipe(color, appearance, resolvedSize).root, className)}><DomainLabel>{level}级</DomainLabel></DomainRoot>;
}
export type GroupTypeTagProps = OrdinaryProps & { type: keyof typeof groupTypeTagProfiles };
export function GroupTypeTag({ type, size, appearance = "filled", className, ...props }: GroupTypeTagProps) {
  const resolvedSize = useTagSize(size); assertMember(type, groupTypeTagProfiles, "group type");
  const color = groupTypeTagProfiles[type];
  return <DomainRoot {...props} rainId="ui-group-type-tag" appearance={appearance} size={resolvedSize} color={color} className={rainCn(getTagRecipe(color, appearance, resolvedSize).root, className)}><DomainLabel>{type}</DomainLabel></DomainRoot>;
}

export type StatusTagProps = DisplayProps & { size?: 20 | 24 | 32; appearance?: "filled" | "solid" } & (
  | { status: "进行中"; showDot?: boolean } | { status: "未提交" | "已结束"; showDot?: never });
export function StatusTag({ status, size, appearance = "filled", showDot = false, className, ...props }: StatusTagProps) {
  const density = useDensity(), resolvedSize = size ?? (density === "compact" ? 20 : 24);
  assertMember(status, tagStatusPaints, "status");
  if (![20, 24, 32].includes(resolvedSize) || !["filled", "solid"].includes(appearance) || showDot && status !== "进行中") throw new Error("Unsupported status size, appearance or dot.");
  return <DomainRoot {...props} rainId="ui-status-tag" appearance={appearance} size={resolvedSize} color={status}
    className={rainCn(getDomainTagRecipe("neutral", appearance, resolvedSize === 20 ? "status-20" : resolvedSize === 24 ? "status-24" : "status-32"), tagStatusPaints[status][appearance], "gap-rain-4", className)}>
    {showDot && <span aria-hidden="true" data-slot="status-dot" className={rainCn("rain-tag-status-dot inline-flex flex-none rounded-rain-full", appearance === "solid" ? undefined : tagStatusPaints.进行中.dot)} />}
    <DomainLabel>{status}</DomainLabel>
  </DomainRoot>;
}

export type SystemStatusTagProps = OrdinaryProps & { status: keyof typeof tagSystemProfiles; children?: string };
const systemLabels = { success: "成功", processing: "处理中", warning: "警告", error: "错误", neutral: "信息" } as const;
const systemIcons = { success: CircleCheckIcon, processing: ButtonLoadingIcon, warning: AlertCircleIcon, error: CircleCloseIcon, neutral: InfoIcon };
export function SystemStatusTag({ status, size, appearance = "filled", children, className, ...props }: SystemStatusTagProps) {
  const resolvedSize = useTagSize(size); assertMember(status, tagSystemProfiles, "system status");
  const color = tagSystemProfiles[status], Icon = systemIcons[status], recipe = getTagRecipe(color, appearance, resolvedSize);
  if (children !== undefined && (typeof children !== "string" || !children.trim())) throw new Error("SystemStatusTag requires readable text.");
  return <DomainRoot {...props} rainId="ui-system-status-tag" appearance={appearance} size={resolvedSize} color={color} state={status}
    className={rainCn(getDomainTagRecipe(color, appearance, resolvedSize === 20 ? "system-20" : resolvedSize === 24 ? "system-24" : "system-28"), "gap-rain-4", className)}>
    <span data-slot="status-icon" aria-hidden="true" className={rainCn(recipe.icon, status === "processing" && "rain-tag-processing")}><Icon /></span>
    <DomainLabel>{children ?? systemLabels[status]}</DomainLabel>
  </DomainRoot>;
}

type MarkProps = DisplayProps & { type: LearningUnitMarkType; size?: TagMarkSize };
export type LearningUnitReminderMarkProps = MarkProps & { showReminder?: boolean };
export type ScoredTaskTypeMarkProps = MarkProps & { scored?: boolean; appearance?: "filled" | "solid" };
const reminderShapes = { small: "reminder-small", medium: "reminder-medium", large: "reminder-large" } as const;
const reminderStackedShapes = { small: "reminder-stacked-small", medium: "reminder-stacked-medium", large: "reminder-stacked-large" } as const;
const scoreShapes = { small: "score-small", medium: "score-medium", large: "score-large" } as const;
const scoreStackedShapes = { small: "score-stacked-small", medium: "score-stacked-medium", large: "score-stacked-large" } as const;
function validateMark(type: LearningUnitMarkType, size: TagMarkSize) {
  if (!learningUnitMarkTypes.includes(type)) throw new Error("Unsupported learning-unit mark type.");
  assertMember(size, reminderShapes, "mark size");
}
export function LearningUnitReminderMark({ type, size = "medium", showReminder = false, className, ...props }: LearningUnitReminderMarkProps) {
  validateMark(type, size); const color = learningUnitTagProfiles[type], stacked = type === "开放型作业";
  return <DomainRoot {...props} rainId="ui-learning-unit-reminder-mark" appearance="solid" size={size} color={color} state={showReminder ? "reminder" : "static"} layout={stacked ? "stacked" : "square"}
    className={rainCn(getDomainTagRecipe(color, "solid", (stacked ? reminderStackedShapes : reminderShapes)[size]), "border-none", className)}>
    <DomainLabel stacked={stacked}>{type}</DomainLabel>
    {showReminder && <><span data-slot="reminder-hint" className="sr-only">，有新提醒</span><span aria-hidden="true" data-slot="reminder" className={rainCn("rain-tag-reminder absolute box-border rounded-rain-full border-solid", tagDomainPaints.reminder)} /></>}
  </DomainRoot>;
}
export function ScoredTaskTypeMark({ type, size = "medium", scored = false, appearance = "solid", className, ...props }: ScoredTaskTypeMarkProps) {
  validateMark(type, size); if (!["filled", "solid"].includes(appearance)) throw new Error("Unsupported scored mark appearance.");
  const color = learningUnitTagProfiles[type], stacked = type === "开放型作业";
  return <DomainRoot {...props} rainId="ui-scored-task-type-mark" appearance={appearance} size={size} color={color} state={scored ? "scored" : "unscored"} layout={stacked ? "stacked" : "square"}
    className={rainCn(getDomainTagRecipe(color, appearance, (stacked ? scoreStackedShapes : scoreShapes)[size]), "rain-tag-score border-none", className)}>
    <DomainLabel stacked={stacked}>{type}</DomainLabel>
    <span data-slot="score-badge" className={rainCn("rain-tag-score-badge inline-flex items-center justify-center font-rain-semibold", tagShapeClassNames["score-badge"], appearance === "solid" ? tagDomainPaints.solidBadge : tagColorPaints[color].solid, tagDomainPaints.badge)}>计分</span>
  </DomainRoot>;
}
