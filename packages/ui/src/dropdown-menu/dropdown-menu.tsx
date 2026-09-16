import { CheckboxIndicator } from "../checkbox/checkbox";
import { RadioIndicator } from "../radio/radio";
import { createContext, forwardRef, useContext, useId, type ReactNode } from "react";
import { Menu } from "@base-ui/react/menu";
import { PopupProvider, popupSurfaceClassName, popupWidthStyle, usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import { CheckBoldIcon } from "../icons/check-bold";
import { ArrowRightIcon } from "../icons/arrow-right";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { menuItemClassName, menuCopyClassName, menuDescriptionClassName, menuGroupLabelClassName } from "./dropdown-menu.styles";
import "./dropdown-menu.css";

export type DropdownMenuPart = "content" | "item" | "label" | "description" | "leading" | "meta" | "shortcut" | "indicator" | "confirmation";
export type DropdownMenuLocalRecipe = RainLocalRecipe<DropdownMenuPart, "ui-dropdown-menu">;
export type DropdownMenuRootProps = Menu.Root.Props & { closeOnAction?: boolean; localRecipe?: DropdownMenuLocalRecipe };
const RecipeContext = createContext<{ closeOnAction: boolean; localRecipe?: DropdownMenuLocalRecipe }>({ closeOnAction: true });

function Root({ closeOnAction = true, localRecipe, onOpenChange, ...props }: DropdownMenuRootProps) {
  return <RecipeContext.Provider value={{ closeOnAction, localRecipe }}><PopupProvider triggerId={props.triggerId} defaultTriggerId={props.defaultTriggerId}>{setAnchor =>
    <Menu.Root modal={false} {...props} onOpenChange={(open, details) => {
      onOpenChange?.(open, details);
      if (open && !details.isCanceled && details.trigger instanceof HTMLElement) setAnchor(details.trigger);
    }} />}
  </PopupProvider></RecipeContext.Provider>;
}
const Trigger = forwardRef<HTMLElement, Menu.Trigger.Props>(function Trigger(props, ref) {
  const anchorRef = usePopupTriggerRef(ref);
  return <Menu.Trigger data-rain-id="ui-dropdown-menu" data-slot="trigger" data-focus="control" {...props} ref={anchorRef} />;
});
export type DropdownMenuContentProps = Omit<Menu.Popup.Props, "className" | "style"> & {
  className?: string;
  width?: number | "auto";
  positionerProps?: Omit<Menu.Positioner.Props, "className" | "style"> & { className?: string };
};
const Content = forwardRef<HTMLDivElement, DropdownMenuContentProps>(function Content({ className, width = "auto", positionerProps, ...props }, ref) {
  const { theme, density, densityStyle } = usePopupScope(), { localRecipe } = useContext(RecipeContext);
  return <Menu.Portal><Menu.Positioner align="start" sideOffset={6} collisionPadding={8} {...positionerProps}
    data-rain-theme={theme} data-density={density} style={densityStyle} className={rainCn("rain-popup-positioner", positionerProps?.className)}>
    <Menu.Popup {...props} ref={ref} data-rain-id="ui-dropdown-menu" data-slot="content" data-local-recipe={localRecipe?.id}
      style={width === "auto" ? undefined : popupWidthStyle(width)} className={rainCn(popupSurfaceClassName, "rain-menu p-rain-8", className, getRainLocalRecipePart(localRecipe, "content"))} />
  </Menu.Positioner></Menu.Portal>;
});

export interface DropdownMenuItemContentProps {
  label: string;
  description?: string;
  descriptionId?: string;
  critical?: boolean;
  leading?: ReactNode;
  meta?: ReactNode;
  shortcut?: ReactNode;
}
function ItemContent({ label, description, descriptionId, critical = false, leading, meta, shortcut }: DropdownMenuItemContentProps) {
  const { localRecipe } = useContext(RecipeContext);
  return <>
    {leading && <span data-slot="leading" aria-hidden="true" className={rainCn("inline-flex flex-none", getRainLocalRecipePart(localRecipe, "leading"))}>{leading}</span>}
    <span className={menuCopyClassName}>
      <span data-slot="label" className={getRainLocalRecipePart(localRecipe, "label")}>{label}</span>
      {description && <span data-slot="description" id={descriptionId} data-critical={critical}
        className={rainCn(menuDescriptionClassName, getRainLocalRecipePart(localRecipe, "description"))}>{description}</span>}
    </span>
    {meta && <span data-slot="meta" className={rainCn(menuDescriptionClassName, getRainLocalRecipePart(localRecipe, "meta"))}>{meta}</span>}
    {shortcut && <span data-slot="shortcut" className={rainCn(menuDescriptionClassName, getRainLocalRecipePart(localRecipe, "shortcut"))}>{shortcut}</span>}
  </>;
}
type ItemAppearance = DropdownMenuItemContentProps & {
  children?: ReactNode;
  className?: string;
  selected?: boolean;
  tone?: "default" | "danger";
  pending?: boolean;
};
type BrandedItem<Props> = Omit<Props, keyof ItemAppearance> & ItemAppearance;
export type DropdownMenuItemProps = BrandedItem<Menu.Item.Props>;
export type DropdownMenuCheckboxItemProps = Omit<BrandedItem<Menu.CheckboxItem.Props>, "selected">;
export type DropdownMenuRadioItemProps = Omit<BrandedItem<Menu.RadioItem.Props>, "selected">;
export type DropdownMenuLinkItemProps = Omit<BrandedItem<Menu.LinkItem.Props>, "pending">;

function useItem<T extends ItemAppearance & { "aria-describedby"?: string }>({ label, description, descriptionId: suppliedId, critical, leading, meta, shortcut, children,
  className, selected, tone = "default", pending = false, "aria-describedby": externalDescription, ...rest }: T) {
  const id = useId(), { localRecipe, closeOnAction } = useContext(RecipeContext);
  if (!label.trim()) throw new Error("Menu items require a non-empty label for accessible naming and typeahead.");
  const descriptionId = suppliedId ?? (description ? `${id}-description` : undefined);
  const describedBy = [...new Set(`${externalDescription ?? ""} ${descriptionId ?? ""}`.split(/\s+/).filter(Boolean))].join(" ") || undefined;
  return { rest, pending, closeOnAction,
    attributes: { "data-slot": "item", "data-focus": "item", "data-selected": selected, "data-tone": tone,
      "aria-label": label, "aria-describedby": describedBy, "aria-busy": pending || undefined,
      label, className: rainCn(menuItemClassName, className, getRainLocalRecipePart(localRecipe, "item")) },
    content: children == null ? <ItemContent {...{ label, description, descriptionId, critical, leading, meta, shortcut }} />
      : <>{description && !suppliedId && <span id={descriptionId} className="sr-only">{description}</span>}{children}</>,
  };
}
const Item = forwardRef<HTMLElement, DropdownMenuItemProps>(function Item(props, ref) {
  const item = useItem(props);
  return <Menu.Item {...item.attributes} {...item.rest} ref={ref} disabled={props.disabled || item.pending}
    closeOnClick={props.closeOnClick ?? item.closeOnAction}>{item.content}{props.selected && <Confirmation />}</Menu.Item>;
});
const LinkItem = forwardRef<Element, DropdownMenuLinkItemProps>(function LinkItem(props, ref) {
  const item = useItem(props);
  return <Menu.LinkItem {...item.attributes} {...item.rest} ref={ref}
    closeOnClick={props.closeOnClick ?? item.closeOnAction}>{item.content}{props.selected && <Confirmation />}</Menu.LinkItem>;
});
function Confirmation() {
  const { localRecipe } = useContext(RecipeContext);
  return <span data-slot="confirmation" className={rainCn("inline-flex flex-none items-center justify-center rounded-rain-full", getRainLocalRecipePart(localRecipe, "confirmation"))} aria-hidden="true"><CheckBoldIcon /></span>;
}
function Indicator({ kind }: { kind: "checkbox" | "radio" }) {
  const { localRecipe } = useContext(RecipeContext);
  const StateIndicator = kind === "checkbox" ? Menu.CheckboxItemIndicator : Menu.RadioItemIndicator;
  return <StateIndicator keepMounted render={(props, state) =>
    <span {...props} data-slot="indicator" data-kind={kind} data-menu-control="" data-state={state.checked ? "checked" : "unchecked"}
      data-disabled={state.disabled} className={rainCn(kind === "checkbox" ? "rain-checkbox" : "rain-radio", "inline-flex flex-none", getRainLocalRecipePart(localRecipe, "indicator"))}>
      {kind === "checkbox" ? <CheckboxIndicator checked={state.checked} /> : <RadioIndicator checked={state.checked} />}
    </span>} />;
}
const CheckboxItem = forwardRef<HTMLElement, DropdownMenuCheckboxItemProps>(function CheckboxItem(props, ref) {
  const item = useItem(props);
  return <Menu.CheckboxItem {...item.attributes} {...item.rest} ref={ref} disabled={props.disabled || item.pending}
    closeOnClick={props.closeOnClick ?? item.closeOnAction}><Indicator kind="checkbox" />{item.content}</Menu.CheckboxItem>;
});
const RadioItem = forwardRef<HTMLElement, DropdownMenuRadioItemProps>(function RadioItem(props, ref) {
  const item = useItem(props);
  return <Menu.RadioItem {...item.attributes} {...item.rest} ref={ref} disabled={props.disabled || item.pending}
    closeOnClick={props.closeOnClick ?? item.closeOnAction}><Indicator kind="radio" />{item.content}</Menu.RadioItem>;
});
function SubmenuRoot(props: Menu.SubmenuRoot.Props) {
  return <PopupProvider><Menu.SubmenuRoot {...props} /></PopupProvider>;
}
const SubmenuTrigger = forwardRef<HTMLElement, BrandedItem<Menu.SubmenuTrigger.Props>>(function SubmenuTrigger(props, ref) {
  const item = useItem(props), anchorRef = usePopupTriggerRef(ref);
  return <Menu.SubmenuTrigger {...item.attributes} {...item.rest} ref={anchorRef} disabled={props.disabled || item.pending}>
    {item.content}<ArrowRightIcon data-slot="submenu-indicator" aria-hidden="true" />
  </Menu.SubmenuTrigger>;
});
const GroupLabel = forwardRef<HTMLDivElement, Omit<Menu.GroupLabel.Props, "className"> & { className?: string }>(function GroupLabel({ className, ...props }, ref) {
  return <Menu.GroupLabel {...props} ref={ref} data-slot="group-label" className={rainCn(menuGroupLabelClassName, typeof className === "string" && className)} />;
});
const Separator = forwardRef<HTMLDivElement, Omit<Menu.Separator.Props, "className"> & { className?: string }>(function Separator({ className, ...props }, ref) {
  return <Menu.Separator {...props} ref={ref} data-slot="separator" className={rainCn("rain-menu-separator mx-rain-4 my-rain-6", typeof className === "string" && className)} />;
});

export const DropdownMenu = { Root, Trigger, Content, Item, LinkItem, CheckboxItem, RadioGroup: Menu.RadioGroup,
  RadioItem, SubmenuRoot, SubmenuTrigger, Group: Menu.Group, GroupLabel, Separator, ItemContent };
