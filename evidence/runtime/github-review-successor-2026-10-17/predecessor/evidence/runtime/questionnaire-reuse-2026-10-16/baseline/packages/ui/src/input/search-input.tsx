import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import { useDensity } from "@rain-next/foundations";
import { SearchIcon } from "@rain-next/ui/icons/search";
import { Button } from "../button/button";
import { rainCn } from "../utils/rain-class-names";
import { Input, type InputProps } from "./input";
import { useFormItem } from "./form-item";

export type SearchSource = "button" | "enter" | "clear";
export interface SearchInputProps extends Omit<InputProps, "trailingAction" | "trailingActionChangesValue"> {
  loading?: boolean;
  searchLabel?: ReactNode;
  onSearch?: (value: string, details: { source: SearchSource }) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput({
  loading = false, searchLabel = "搜索", onSearch, onClear, onPressEnter, disabled = false, size, className,
  leadingIcon = <SearchIcon />, ...props
}, ref) {
  const density = useDensity();
  const field = useFormItem();
  const controlRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(ref, () => controlRef.current!, []);
  const unavailable = disabled || Boolean(field?.disabled);
  const resolvedSize = size ?? (density === "compact" ? 24 : 28);
  function search(source: SearchSource) {
    if (unavailable || (loading && source !== "clear")) return;
    onSearch?.(source === "clear" ? "" : controlRef.current?.value ?? "", { source });
  }
  return <span className={rainCn("inline-flex min-w-0", className)} data-rain-id="ui-search-input" data-slot="root">
    <Input {...props} className="w-full" ref={controlRef}
    size={resolvedSize} disabled={disabled} leadingIcon={leadingIcon} trailingActionChangesValue={false}
    onClear={(event) => { onClear?.(event); search("clear"); }}
    onPressEnter={(event) => {
      onPressEnter?.(event);
      if (!event.defaultPrevented) { event.preventDefault(); search("enter"); }
    }}
    trailingAction={<Button variant="text" tone="brand" size={resolvedSize === 24 ? "compact" : "regular"}
      loading={loading} disabled={unavailable} onClick={() => search("button")}>
      {searchLabel}
    </Button>} />
  </span>;
});
SearchInput.displayName = "SearchInput";
