import { forwardRef, type ReactNode } from "react";
import { Autocomplete } from "@base-ui/react/autocomplete";
import { rainCn } from "../utils/rain-class-names";

export interface CommandOption { value: string; label: string; disabled?: boolean }
export interface CommandGroupData { value: string; items: readonly CommandOption[] }
export type CommandProps = Omit<Autocomplete.Root.Props<CommandOption>, "items" | "children" | "inline" | "open"> & {
  items: readonly CommandGroupData[];
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
};

function Root({ items, children, className, "aria-label": label = "命令", ...props }: CommandProps) {
  return <div data-rain-id="ui-command" data-slot="root" aria-label={label} className={rainCn("rain-command min-w-0", className)}>
    <Autocomplete.Root {...props} items={items} inline open autoHighlight="always" keepHighlight>
      {children}
    </Autocomplete.Root>
  </div>;
}

export type CommandInputProps = Omit<Autocomplete.Input.Props, "className"> & { className?: string };
const Input = forwardRef<HTMLInputElement, CommandInputProps>(function Input({ className, "aria-label": label, placeholder, ...props }, ref) {
  return <Autocomplete.Input {...props} ref={ref} placeholder={placeholder} aria-label={label ?? placeholder} data-slot="input"
    className={rainCn("rain-command-input w-full rounded-rain-6 border-solid border-rain-line-1 border-rain-category-border-neutral-3 bg-rain-category-background-neutral-1 px-rain-12 text-rain-size-14 leading-rain-22 text-rain-category-text-neutral-1 outline-none focus-visible:border-rain-category-border-brand-1 focus-visible:outline-rain-focus", className)} />;
});

export type CommandListProps = Omit<Autocomplete.List.Props, "className" | "children"> & { className?: string; children?: ReactNode | ((group: CommandGroupData) => ReactNode) };
const List = forwardRef<HTMLDivElement, CommandListProps>(function List({ className, children, ...props }, ref) {
  return <Autocomplete.List {...props} ref={ref} data-slot="list" className={rainCn("rain-command-list overflow-y-auto p-rain-6", className)}>{children as Autocomplete.List.Props["children"]}</Autocomplete.List>;
});

export type CommandGroupProps = Omit<Autocomplete.Group.Props, "className"> & { className?: string };
const Group = forwardRef<HTMLDivElement, CommandGroupProps>(function Group({ className, ...props }, ref) {
  return <Autocomplete.Group {...props} ref={ref} data-slot="group" className={rainCn("p-rain-4", className)} />;
});

const GroupLabel = forwardRef<HTMLDivElement, Omit<Autocomplete.GroupLabel.Props, "className"> & { className?: string }>(function GroupLabel({ className, ...props }, ref) {
  return <Autocomplete.GroupLabel {...props} ref={ref} data-slot="heading" className={rainCn("px-rain-6 py-rain-4 text-rain-size-12 leading-rain-18 font-rain-semibold text-rain-category-text-neutral-4", className)} />;
});

export type CommandItemProps = Omit<Autocomplete.Item.Props, "value" | "className" | "onClick"> & {
  value: CommandOption;
  className?: string;
  onSelect?: () => void;
};
const Item = forwardRef<HTMLDivElement, CommandItemProps>(function Item({ className, onSelect, ...props }, ref) {
  return <Autocomplete.Item {...props} ref={ref} onClick={onSelect} data-slot="item"
    className={rainCn("rain-command-item flex cursor-pointer items-center gap-rain-10 rounded-rain-6 px-rain-8 py-rain-4 text-rain-size-14 leading-rain-22 text-rain-category-text-neutral-1 outline-none data-[highlighted]:bg-rain-category-fill-neutral-alpha-6 data-[disabled]:cursor-not-allowed data-[disabled]:text-rain-category-text-neutral-6", className)} />;
});

const Empty = forwardRef<HTMLDivElement, Omit<Autocomplete.Empty.Props, "className"> & { className?: string }>(function Empty({ className, ...props }, ref) {
  return <Autocomplete.Empty {...props} ref={ref} data-slot="empty" className={rainCn("p-rain-16 text-center text-rain-size-14 leading-rain-24 text-rain-category-text-neutral-4", className)} />;
});

export const CommandInput = Input;
export const CommandList = List;
export const CommandGroup = Group;
export const CommandGroupLabel = GroupLabel;
export const CommandCollection = Autocomplete.Collection;
export const CommandItem = Item;
export const CommandEmpty = Empty;
export const Command = Object.assign(Root, { Input, List, Group, GroupLabel, Collection: Autocomplete.Collection, Item, Empty });
