// Adapted from shadcn-ui/ui@3ba91b1 Base UI Message and Nova; MIT, G6 source lock.
import * as React from "react";
import { useDensity } from "@rain-next/foundations";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import "./message.css";

export type MessagePart = "root" | "group" | "content" | "avatar" | "header" | "footer";
export type MessageRecipe = RainLocalRecipe<MessagePart, "ui-message">;
const MessageRecipeContext = React.createContext<MessageRecipe | undefined>(undefined);
export type MessageProps = React.ComponentProps<"div"> & { align?: "start" | "end"; localRecipe?: MessageRecipe };
export function Message({ className, align = "start", localRecipe, ...props }: MessageProps) {
  const density = useDensity();
  return <MessageRecipeContext.Provider value={localRecipe}>
    <div {...props} data-rain-id="ui-message" data-slot="root" data-align={align}
      data-density={density} data-local-recipe={localRecipe?.id}
      className={rainCn("rain-message relative flex w-full min-w-0", getRainLocalRecipePart(localRecipe, "root"), className)} />
  </MessageRecipeContext.Provider>;
}

export type MessageGroupProps = React.ComponentProps<"div"> & { localRecipe?: MessageRecipe };
export function MessageGroup({ className, localRecipe, ...props }: MessageGroupProps) {
  return <div {...props} data-rain-id="ui-message" data-slot="group"
    className={rainCn("rain-message__group flex min-w-0 flex-col gap-rain-8", getRainLocalRecipePart(localRecipe, "group"), className)} />;
}

export type MessageAvatarProps = React.ComponentProps<"div"> & { localRecipe?: MessageRecipe };
export function MessageAvatar({ className, localRecipe, ...props }: MessageAvatarProps) {
  const inheritedRecipe = React.useContext(MessageRecipeContext);
  const recipe = localRecipe ?? inheritedRecipe;
  return <div {...props} data-slot="avatar"
    className={rainCn("rain-message__avatar flex w-fit shrink-0 items-center justify-center self-end overflow-hidden rounded-rain-full", getRainLocalRecipePart(recipe, "avatar"), className)} />;
}

export type MessageContentProps = React.ComponentProps<"div"> & { localRecipe?: MessageRecipe };
export function MessageContent({ className, localRecipe, ...props }: MessageContentProps) {
  const inheritedRecipe = React.useContext(MessageRecipeContext);
  const recipe = localRecipe ?? inheritedRecipe;
  return <div {...props} data-slot="content"
    className={rainCn("rain-message__content flex w-full min-w-0 flex-col wrap-break-word", getRainLocalRecipePart(recipe, "content"), className)} />;
}

export type MessageHeaderProps = React.ComponentProps<"div"> & { localRecipe?: MessageRecipe };
export function MessageHeader({ className, localRecipe, ...props }: MessageHeaderProps) {
  const inheritedRecipe = React.useContext(MessageRecipeContext);
  const recipe = localRecipe ?? inheritedRecipe;
  return <div {...props} data-slot="header"
    className={rainCn("rain-message__header flex max-w-full min-w-0 items-center", getRainLocalRecipePart(recipe, "header"), className)} />;
}

export type MessageFooterProps = React.ComponentProps<"div"> & { localRecipe?: MessageRecipe };
export function MessageFooter({ className, localRecipe, ...props }: MessageFooterProps) {
  const inheritedRecipe = React.useContext(MessageRecipeContext);
  const recipe = localRecipe ?? inheritedRecipe;
  return <div {...props} data-slot="footer"
    className={rainCn("rain-message__footer flex max-w-full min-w-0 items-center", getRainLocalRecipePart(recipe, "footer"), className)} />;
}
