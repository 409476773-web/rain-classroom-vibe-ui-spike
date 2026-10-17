// Adapted from shadcn-ui/ui@3ba91b1 Base UI Attachment and Nova; MIT/source lock: evidence/runtime/g6-preflight-2026-10-14.
import type { ComponentProps } from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Button } from "../button/button";
import { rainCn } from "../utils/rain-class-names";
import "./attachment.css";

export type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done";
export type AttachmentSize = "default" | "sm" | "xs";
export type AttachmentOrientation = "horizontal" | "vertical";
export type AttachmentProps = ComponentProps<"div"> & {
  state?: AttachmentState;
  size?: AttachmentSize;
  orientation?: AttachmentOrientation;
};

export function Attachment({ className, state = "done", size = "default", orientation = "horizontal", ...props }: AttachmentProps) {
  return <div {...props} data-rain-id="ui-attachment" data-slot="attachment"
    data-state={state} data-size={size} data-orientation={orientation} className={rainCn("rain-attachment", className)} />;
}

export type AttachmentMediaProps = ComponentProps<"div"> & { variant?: "icon" | "image" };
export function AttachmentMedia({ className, variant = "icon", ...props }: AttachmentMediaProps) {
  return <div {...props} data-slot="attachment-media" data-variant={variant}
    className={rainCn("rain-attachment__media", className)} />;
}

export type AttachmentContentProps = ComponentProps<"div">;
export function AttachmentContent({ className, ...props }: AttachmentContentProps) {
  return <div {...props} data-slot="attachment-content" className={rainCn("rain-attachment__content", className)} />;
}

export type AttachmentTitleProps = ComponentProps<"span">;
export function AttachmentTitle({ className, ...props }: AttachmentTitleProps) {
  return <span {...props} data-slot="attachment-title" className={rainCn("rain-attachment__title", className)} />;
}

export type AttachmentDescriptionProps = ComponentProps<"span">;
export function AttachmentDescription({ className, ...props }: AttachmentDescriptionProps) {
  return <span {...props} data-slot="attachment-description" className={rainCn("rain-attachment__description", className)} />;
}

export type AttachmentActionsProps = ComponentProps<"div">;
export function AttachmentActions({ className, ...props }: AttachmentActionsProps) {
  return <div {...props} data-slot="attachment-actions" className={rainCn("rain-attachment__actions", className)} />;
}

export type AttachmentActionProps = ComponentProps<typeof Button>;
export function AttachmentAction({ className, ...props }: AttachmentActionProps) {
  const classes = rainCn("rain-attachment__action", className);
  if (props.variant === "text") return <Button {...props} size={props.size ?? "regular"} className={classes} data-attachment-action="" />;
  if (props.variant === undefined && props.size === undefined && props.block === undefined) return <Button {...props} block={undefined} variant="text" size="regular" className={classes} data-attachment-action="" />;
  return <Button {...props} className={classes} data-attachment-action="" />;
}

export type AttachmentTriggerProps = useRender.ComponentProps<"button">;
export function AttachmentTrigger({ className, render, type, ...props }: AttachmentTriggerProps) {
  return useRender({
    defaultTagName: "button",
    props: { ...mergeProps<"button">({
      type: render ? type : type ?? "button",
      className: rainCn("rain-attachment__trigger", className),
    }, props), "data-focus": "control" },
    render,
    state: { slot: "attachment-trigger" },
  });
}

export type AttachmentGroupProps = ComponentProps<"div">;
export function AttachmentGroup({ className, ...props }: AttachmentGroupProps) {
  return <div {...props} data-rain-id="ui-attachment" data-slot="attachment-group"
    className={rainCn("rain-attachment__group", className)} />;
}
