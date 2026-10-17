import { useId, useState } from "react";
import {
  Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  DropdownMenu, IconButton, Input, Select, Tag, defineRainLocalRecipe, type CardLocalRecipe, type CardSize,
} from "@rain-next/ui";
import { MoreHorizontalIcon } from "@rain-next/ui/icons/more-horizontal";
import "./card-recipes.css";

export const courseCardDefaultLayout: "stacked" | "side" = "stacked";
export const cardSpacingOptions = [12, 16, 20, 24, 32].map(value => ({ value, label: `${value}px` }));
export type CardSpacing = 12 | 16 | 20 | 24 | 32;
const cardSpacingClasses: Record<CardSpacing, string> = {
  12: "[--rain-card-spacing:var(--rain-space-12)]",
  16: "[--rain-card-spacing:var(--rain-space-16)]",
  20: "[--rain-card-spacing:var(--rain-space-20)]",
  24: "[--rain-card-spacing:var(--rain-space-24)]",
  32: "[--rain-card-spacing:var(--rain-space-32)]",
};
const courseCardRecipe: CardLocalRecipe = defineRainLocalRecipe({
  id: "card-course-media", scope: "feature", origin: "ui-card",
  classes: { root: "py-rain-0 gap-rain-0", footer: "justify-between" }, modifiedParts: ["root", "footer"],
  candidateTokens: [], promotionStatus: "not-proposed",
});
const reportRecipe: CardLocalRecipe = defineRainLocalRecipe({
  id: "card-report-fragment", scope: "feature", origin: "ui-card",
  classes: { content: "flex flex-wrap items-baseline gap-rain-8" }, modifiedParts: ["content"],
  candidateTokens: [], promotionStatus: "not-proposed",
});
const reminderActionsRecipe: CardLocalRecipe = defineRainLocalRecipe({
  id: "card-reminder-actions", scope: "feature", origin: "ui-card",
  classes: {
    root: "pb-rain-0",
    footer: "reminder-card-footer justify-end",
  },
  modifiedParts: ["root", "footer"], candidateTokens: [], promotionStatus: "not-proposed",
});
const audienceOptions = [{ value: "all", label: "全部学生" }, { value: "unfinished", label: "尚未完成的学生" }];
export const courseData = {
  id: "demo-statistics", title: "统计学基础",
  description: "从课堂案例出发，理解数据背后的规律。", files: 24, units: 8,
} as const;

export interface CardGalleryProps {
  size?: CardSize;
  /** Local preview insets; does not add public Card sizes or affect controls. */
  spacing?: CardSpacing;
  courseLayout?: "stacked" | "side";
  longContent?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  narrow?: boolean;
  /** Optional presentation reference; ordinary cards keep one continuous surface. */
  tintedActions?: boolean;
}

export function CardGallery({
  size = "default", spacing, courseLayout = courseCardDefaultLayout,
  longContent = false, showHeader = true, showFooter = true, narrow = false, tintedActions = false,
}: CardGalleryProps) {
  const spacingClassName = spacing === undefined ? undefined : cardSpacingClasses[spacing];
  const fieldId = useId();
  const [courseFeedback, setCourseFeedback] = useState("");
  const [reminderFeedback, setReminderFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [audience, setAudience] = useState<string | number | null>("all");
  const [draftTitle, setDraftTitle] = useState("本周学习提醒");
  const titleInvalid = submitted && !draftTitle.trim();
  const audienceInvalid = submitted && audience === null;
  function saveReminder() {
    setSubmitted(true);
    if (!draftTitle.trim() || audience === null) { setReminderFeedback(""); return; }
    setReminderFeedback(`已保存“${draftTitle.trim()}”，提醒对象：${audienceOptions.find(option => option.value === audience)?.label}。`);
  }
  return <div className="card-gallery" data-narrow={narrow} data-asset-identity="local-experiment">
    <section className="card-example" aria-label="简单信息卡">
      <p className="card-example-label">课程公告</p>
      <Card size={size} className={spacingClassName} aria-label="课程公告" data-example="cr-01">
        {showHeader && <CardHeader><CardTitle as="h2">课程公告</CardTitle><CardDescription className="text-rain-size-13">今天 09:30 · 教学团队</CardDescription></CardHeader>}
        <CardContent>{longContent ? "请在周五前完成第三单元学习，复习课堂案例并记录你对数据解读的疑问。".repeat(5) : "请在周五前完成第三单元学习。遇到问题时，可以先回看课堂案例，再整理到讨论区。"}</CardContent>
      </Card>
    </section>
    <section className="card-example" aria-label="课程媒体卡" data-course-layout={courseLayout}>
      <p className="card-example-label">课程介绍</p>
      <Card size={size} className={spacingClassName} localRecipe={courseCardRecipe} aria-label="统计学基础课程" data-example="cr-02" data-course-id={courseData.id}>
        <div className="course-card-layout" data-media-layout={courseLayout}>
          <div className="course-card-cover" role="img" aria-label="课程缺省封面">
            <span aria-hidden="true">课程封面</span>
          </div>
          <div className="course-card-body">
            {showHeader && <CardHeader><CardTitle as="h2">{longContent ? courseData.title + "：从真实课堂案例到完整数据分析方法与应用" : courseData.title}</CardTitle><CardDescription>{courseData.description}</CardDescription></CardHeader>}
            <CardContent className="flex flex-wrap items-center gap-rain-8"><Tag color="brand" size={20}>专业基础</Tag><span>{courseData.units} 个单元 · {courseData.files} 份资料</span></CardContent>
            {showFooter && <CardFooter><span>本学期教学资料</span><Button size="regular" variant="text" onClick={() => setCourseFeedback("已触发“查看课程”演示，当前页面不跳转。")}>查看课程</Button></CardFooter>}
            <p role="status" className={courseFeedback ? "card-action-status course-card-feedback" : "sr-only"}>{courseFeedback}</p>
          </div>
        </div>
      </Card>
    </section>
    <section className="card-example" aria-label="报表片段卡">
      <p className="card-example-label">学习进展</p>
      <Card size={size} className={spacingClassName} localRecipe={reportRecipe} aria-label="学习完成率" data-example="cr-03">
        {showHeader && <CardHeader><CardTitle as="h2">学习完成率</CardTitle><CardDescription>第三单元</CardDescription></CardHeader>}
        <CardContent><span data-slot="value" className="font-rain-data text-rain-size-22 leading-rain-28 font-rain-bold">83</span><span data-slot="unit" className="font-rain-data text-rain-size-14 leading-rain-22 font-rain-bold">%</span></CardContent>
        {showFooter && <CardFooter><span data-slot="label">按全部学习任务统计</span></CardFooter>}
      </Card>
    </section>
    <section className="card-example" aria-label="含操作卡">
      <p className="card-example-label">学习提醒</p>
      <Card size={size} className={spacingClassName} localRecipe={showFooter ? reminderActionsRecipe : undefined} aria-label="学习提醒" data-example="cr-04">
        {showHeader && <CardHeader>
          <CardTitle as="h2">{longContent ? "第三单元学习提醒与后续课堂安排、材料准备和学习任务说明" : "学习提醒"}</CardTitle>
          <CardDescription>为学生准备一条清晰的学习提示。</CardDescription>
          <CardAction><DropdownMenu.Root><DropdownMenu.Trigger render={<IconButton aria-label="更多操作" icon={<MoreHorizontalIcon />} size="32/16" highlight="none" />} />
            <DropdownMenu.Content><DropdownMenu.Item label="复制提醒" onClick={() => setReminderFeedback("已触发“复制提醒”演示，未写入剪贴板。")} /><DropdownMenu.Item label="稍后处理" onClick={() => setReminderFeedback("已标记稍后处理，仅在当前页面生效。")} /></DropdownMenu.Content>
          </DropdownMenu.Root></CardAction>
        </CardHeader>}
        <CardContent className="reminder-card-fields flex flex-col">
          <label className="flex flex-col gap-rain-8">提醒标题
            <Input aria-label="提醒标题" value={draftTitle} status={titleInvalid ? "error" : undefined}
              aria-describedby={titleInvalid ? `${fieldId}-title-error` : undefined}
              onChange={event => { setDraftTitle(event.target.value); setReminderFeedback(""); }} />
            {titleInvalid && <span id={`${fieldId}-title-error`} role="alert">请填写提醒标题。</span>}
          </label>
          <div className="flex flex-col gap-rain-8"><span id={`${fieldId}-audience`}>提醒对象</span>
            <Select aria-labelledby={`${fieldId}-audience`} value={audience} status={audienceInvalid ? "error" : undefined}
              aria-describedby={audienceInvalid ? `${fieldId}-audience-error` : undefined}
              onValueChange={value => { setAudience(value); setReminderFeedback(""); }} options={audienceOptions} />
            {audienceInvalid && <span id={`${fieldId}-audience-error`} role="alert">请选择提醒对象。</span>}
          </div>
          <p role="status" className={reminderFeedback ? "card-action-status" : "sr-only"}>{reminderFeedback}</p>
        </CardContent>
        {showFooter && <CardFooter className={tintedActions ? "reminder-card-actions" : undefined}><Button size="small" variant="primary" onClick={saveReminder}>保存提醒</Button></CardFooter>}
      </Card>
    </section>
  </div>;
}
