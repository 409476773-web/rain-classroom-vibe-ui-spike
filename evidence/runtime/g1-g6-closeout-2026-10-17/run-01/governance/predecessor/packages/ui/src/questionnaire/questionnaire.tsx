// Adapted from shadcn-ui/ui@3ba91b1 Base UI Questionnaire and Nova; MIT.
import * as React from "react";
import { Questionnaire as Primitive } from "@shadcn/react/questionnaire";
import { useRender } from "@base-ui/react/use-render";
import { useDensity } from "@rain-next/foundations";
import type { ButtonProps } from "../button/button";
import { buttonRootRecipe } from "../button/button.styles";
import { CheckboxIndicator } from "../checkbox/checkbox";
import { RadioIndicator } from "../radio/radio";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import "./questionnaire.css";

export type { QuestionnaireChoiceDefinition, QuestionnaireInputType, QuestionnaireItemDefinition, QuestionnaireItemStatus, QuestionnaireShortcutMode } from "@shadcn/react/questionnaire";
export type QuestionnairePart = "root" | "progress" | "item" | "title" | "description" | "choices" | "choice" | "choice-description" | "input" | "error" | "actions" | "previous" | "skip" | "next" | "submit";
export type QuestionnaireRecipe = RainLocalRecipe<QuestionnairePart, "ui-questionnaire">;
const RecipeContext = React.createContext<QuestionnaireRecipe | undefined>(undefined);
type RecipeProp = { localRecipe?: QuestionnaireRecipe };
function usePartRecipe(recipe: QuestionnaireRecipe | undefined, part: QuestionnairePart) {
  const inherited = React.useContext(RecipeContext);
  return getRainLocalRecipePart(recipe ?? inherited, part);
}

export type QuestionnaireProps = React.ComponentProps<typeof Primitive.Root> & RecipeProp;
export function Questionnaire({ className, localRecipe, ...props }: QuestionnaireProps) {
  const density = useDensity();
  return <RecipeContext.Provider value={localRecipe}><Primitive.Root {...props} data-rain-id="ui-questionnaire" data-slot="root" data-density={density} data-local-recipe={localRecipe?.id}
    className={rainCn("rain-questionnaire flex w-full min-w-0 flex-col", getRainLocalRecipePart(localRecipe, "root"), className)} /></RecipeContext.Provider>;
}

type ProgressState = { current: number; total: number; first: boolean; last: boolean };
function ProgressSurface({ state, render, ...props }: React.ComponentProps<"div"> & { state: ProgressState; render?: QuestionnaireProgressProps["render"] }) {
  return useRender({ defaultTagName: "div", state, render: typeof render === "function" ? (nativeProps, nativeState) => render({ ...nativeProps }, nativeState) ?? <></> : render, props });
}
export type QuestionnaireProgressProps = React.ComponentProps<typeof Primitive.Progress> & RecipeProp;
export function QuestionnaireProgress({ className, localRecipe, children, render, "aria-label": label = "问答进度", "aria-valuetext": valueText, ...props }: QuestionnaireProgressProps) {
  const recipeClass = usePartRecipe(localRecipe, "progress");
  return <Primitive.Progress {...props} aria-label={label} data-slot="progress" className={rainCn("rain-questionnaire__progress", recipeClass, className)}
    render={(nativeProps, state) => {
      const text = state.total ? `第 ${state.current} 题，共 ${state.total} 题` : undefined;
      return <ProgressSurface {...nativeProps} state={state} render={render} aria-valuetext={valueText ?? text}>{children ?? text}</ProgressSurface>;
    }} />;
}
export type QuestionnaireItemProps = React.ComponentProps<typeof Primitive.Item> & RecipeProp;
export function QuestionnaireItem({ className, localRecipe, ...props }: QuestionnaireItemProps) {
  const recipeClass = usePartRecipe(localRecipe, "item");
  return <Primitive.Item {...props} data-slot="item" className={rainCn("rain-questionnaire__item", recipeClass, className)} />;
}
export type QuestionnaireTitleProps = React.ComponentProps<typeof Primitive.Title> & RecipeProp;
export function QuestionnaireTitle({ className, localRecipe, ...props }: QuestionnaireTitleProps) {
  const recipeClass = usePartRecipe(localRecipe, "title");
  return <Primitive.Title {...props} data-slot="title" className={rainCn("rain-questionnaire__title", recipeClass, className)} />;
}
export type QuestionnaireDescriptionProps = React.ComponentProps<typeof Primitive.Description> & RecipeProp;
export function QuestionnaireDescription({ className, localRecipe, ...props }: QuestionnaireDescriptionProps) {
  const recipeClass = usePartRecipe(localRecipe, "description");
  return <Primitive.Description {...props} data-slot="description" className={rainCn("rain-questionnaire__description", recipeClass, className)} />;
}
export type QuestionnaireChoicesProps = React.ComponentProps<typeof Primitive.Choices> & RecipeProp;
export function QuestionnaireChoices({ className, localRecipe, ...props }: QuestionnaireChoicesProps) {
  const recipeClass = usePartRecipe(localRecipe, "choices");
  return <Primitive.Choices {...props} data-slot="choices" className={rainCn("rain-questionnaire__choices grid min-w-0", recipeClass, className)} />;
}
export type QuestionnaireChoiceProps = React.ComponentProps<typeof Primitive.Choice> & RecipeProp;
export function QuestionnaireChoice({ className, localRecipe, children, ...props }: QuestionnaireChoiceProps) {
  const recipeClass = usePartRecipe(localRecipe, "choice");
  return <Primitive.Choice {...props} data-slot="choice" className={rainCn("rain-questionnaire__choice relative flex min-w-0 items-start", recipeClass, className)}>
    <Primitive.ChoiceInput data-slot="choice-input" className="rain-questionnaire__choice-input"
      render={(inputProps, state) => <><input {...inputProps} /><span aria-hidden="true" data-slot="choice-indicator" className="rain-questionnaire__choice-indicator">
        {state.type === "radio" ? <RadioIndicator checked={state.checked} /> : <CheckboxIndicator checked={state.checked} />}
      </span></>} />
    <Primitive.ChoiceLabel data-slot="choice-label" className="rain-questionnaire__choice-label flex min-w-0 flex-1 flex-col">{children}</Primitive.ChoiceLabel>
    <Primitive.ChoiceShortcut data-slot="choice-shortcut" className="rain-questionnaire__choice-shortcut" />
  </Primitive.Choice>;
}
export type QuestionnaireChoiceDescriptionProps = React.ComponentProps<"span"> & RecipeProp;
export function QuestionnaireChoiceDescription({ className, localRecipe, ...props }: QuestionnaireChoiceDescriptionProps) {
  const recipeClass = usePartRecipe(localRecipe, "choice-description");
  return <span {...props} data-slot="choice-description" className={rainCn("rain-questionnaire__choice-description", recipeClass, className)} />;
}
export type QuestionnaireInputProps = React.ComponentProps<typeof Primitive.Input> & RecipeProp;
export function QuestionnaireInput({ className, localRecipe, ...props }: QuestionnaireInputProps) {
  const recipeClass = usePartRecipe(localRecipe, "input");
  return <div data-slot="input-wrapper" className="rain-questionnaire__input-wrapper relative min-w-0"><Primitive.Input {...props} data-slot="input"
    className={rainCn("rain-questionnaire__input w-full min-w-0", recipeClass, className)} /></div>;
}
export type QuestionnaireErrorProps = React.ComponentProps<typeof Primitive.Error> & RecipeProp;
export function QuestionnaireError({ className, localRecipe, children, ...props }: QuestionnaireErrorProps) {
  const recipeClass = usePartRecipe(localRecipe, "error");
  return <Primitive.Error {...props} data-slot="error" className={rainCn("rain-questionnaire__error", recipeClass, className)}>{children ?? "请回答当前问题；可选问题也可跳过。"}</Primitive.Error>;
}
export type QuestionnaireActionsProps = React.ComponentProps<"div"> & RecipeProp;
export function QuestionnaireActions({ className, localRecipe, ...props }: QuestionnaireActionsProps) {
  const recipeClass = usePartRecipe(localRecipe, "actions");
  return <div {...props} data-slot="actions" className={rainCn("rain-questionnaire__actions grid w-full items-center", recipeClass, className)} />;
}

type ButtonAppearance = Pick<Extract<ButtonProps, { variant: "text" }>, "variant" | "size"> | Pick<Exclude<ButtonProps, { variant: "text" }>, "variant" | "size">;
type NavigationProps = React.ComponentProps<typeof Primitive.Next> & ButtonAppearance & RecipeProp;
function QuestionnaireButtonSurface({ variant = "secondary", size, className, ...props }: React.ComponentProps<"button"> & ButtonAppearance) {
  const density = useDensity();
  const resolvedSize = size ?? (variant === "text" ? density === "compact" ? "compact" : "regular" : density === "compact" ? "small" : "medium");
  const unavailable = props.disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
  return <button {...props} data-focus="control" data-density={density} data-size={resolvedSize} data-variant={variant} className={rainCn(buttonRootRecipe({ block: false, variant, size: resolvedSize, tone: "default", state: unavailable ? "disabled" : "default" }), className)} />;
}
function defaultButton(props: NavigationProps, defaultVariant: "primary" | "secondary") {
  return props.variant === "text" ? <QuestionnaireButtonSurface variant="text" size={props.size} /> : <QuestionnaireButtonSurface variant={props.variant ?? defaultVariant} size={props.size} />;
}
function guardAriaDisabled(props: NavigationProps): React.MouseEventHandler<HTMLButtonElement> {
  return event => {
    if (props["aria-disabled"] === true || props["aria-disabled"] === "true") { event.preventDefault(); return; }
    props.onClick?.(event);
  };
}
export type QuestionnairePreviousProps = NavigationProps;
export function QuestionnairePrevious(props: QuestionnairePreviousProps) {
  const { children, className, localRecipe, render, variant, size, ...nativeProps } = props;
  const recipeClass = usePartRecipe(localRecipe, "previous");
  return <Primitive.Previous {...nativeProps} onClick={guardAriaDisabled(props)} data-slot="previous" className={rainCn("rain-questionnaire__navigation rain-questionnaire__previous", recipeClass, className)} render={render ?? defaultButton(props, "secondary")}>{children ?? "上一题"}</Primitive.Previous>;
}
export type QuestionnaireSkipProps = NavigationProps;
export function QuestionnaireSkip(props: QuestionnaireSkipProps) {
  const { children, className, localRecipe, render, variant, size, ...nativeProps } = props;
  const recipeClass = usePartRecipe(localRecipe, "skip");
  return <Primitive.Skip {...nativeProps} onClick={guardAriaDisabled(props)} data-slot="skip" className={rainCn("rain-questionnaire__navigation rain-questionnaire__skip", recipeClass, className)} render={render ?? defaultButton(props, "secondary")}>{children ?? "跳过"}</Primitive.Skip>;
}
export type QuestionnaireNextProps = NavigationProps;
export function QuestionnaireNext(props: QuestionnaireNextProps) {
  const { children, className, localRecipe, render, variant, size, ...nativeProps } = props;
  const recipeClass = usePartRecipe(localRecipe, "next");
  return <Primitive.Next {...nativeProps} onClick={guardAriaDisabled(props)} data-slot="next" className={rainCn("rain-questionnaire__navigation rain-questionnaire__next", recipeClass, className)} render={render ?? defaultButton(props, "primary")}>{children ?? "下一题"}</Primitive.Next>;
}
export type QuestionnaireSubmitProps = NavigationProps;
export function QuestionnaireSubmit(props: QuestionnaireSubmitProps) {
  const { children, className, localRecipe, render, variant, size, ...nativeProps } = props;
  const recipeClass = usePartRecipe(localRecipe, "submit");
  return <Primitive.Submit {...nativeProps} onClick={guardAriaDisabled(props)} data-slot="submit" className={rainCn("rain-questionnaire__navigation rain-questionnaire__submit", recipeClass, className)} render={render ?? defaultButton(props, "primary")}>{children ?? "提交"}</Primitive.Submit>;
}
