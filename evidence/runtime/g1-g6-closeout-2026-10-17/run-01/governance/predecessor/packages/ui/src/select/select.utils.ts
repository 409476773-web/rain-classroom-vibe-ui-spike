import type { SelectOption, SelectProps, SelectValue } from "./select";

function validValue(value: unknown): value is SelectValue {
  return typeof value === "string" || typeof value === "number" && Number.isFinite(value);
}

export function validateSelect(props: SelectProps, size: number) {
  for (const options of [props.options, props.selectedOptions ?? []]) {
    if (!Array.isArray(options)) throw new Error("Select options must be an array.");
    const values = new Set<SelectValue>();
    for (const option of options) {
      if (!option || !validValue(option.value) || values.has(option.value)
        || typeof option.label !== "string" || !option.label.trim()
        || option.description !== undefined && typeof option.description !== "string"
        || option.group !== undefined && (typeof option.group !== "string" || !option.group.trim())) {
        throw new Error("Select options require unique finite number/string values and non-empty labels and group names.");
      }
      values.add(option.value);
    }
  }
  for (const value of [props.value, props.defaultValue]) {
    if (value === undefined) continue;
    if (props.multiple ? !Array.isArray(value) || !value.every(validValue) || new Set(value).size !== value.length
      : value !== null && !validValue(value)) throw new Error("Select value must match its single or multiple mode.");
  }
  if (![24, 28, 32, 36].includes(size) || props.display === "tags" && size < 32) throw new Error("Select tags require size 32 or 36; summary supports 24, 28, 32 and 36.");
  if (props.display !== undefined && (!props.multiple || !["summary", "count", "tags"].includes(props.display))) throw new Error("Select display requires a supported multiple mode.");
  if (props.maxCount !== undefined && (!props.multiple || !Number.isInteger(props.maxCount) || props.maxCount < 0)) throw new Error("Select maxCount must be a finite non-negative integer in multiple mode.");
  if (!["outlined", "filled", "underlined"].includes(props.appearance ?? "outlined") || !["default", "warning", "error"].includes(props.status ?? "default")) throw new Error("Select appearance or status is invalid.");
}

export function selectValues(value: SelectProps["value"]): readonly SelectValue[] {
  return value === null || value === undefined ? [] : Array.isArray(value) ? value : [value as SelectValue];
}

export function filterSelectOptions(options: readonly SelectOption[], query: string, filter: SelectProps["filterOption"]) {
  const normalized = query.trim().toLocaleLowerCase();
  return filter === false ? options : options.filter((option) => filter ? filter(query, option)
    : `${option.label} ${option.description ?? ""}`.toLocaleLowerCase().includes(normalized));
}

export function groupSelectOptions(options: readonly SelectOption[]) {
  const groups = new Map<string | undefined, SelectOption[]>();
  for (const option of options) {
    if (!groups.has(option.group)) groups.set(option.group, []);
    groups.get(option.group)!.push(option);
  }
  return [...groups].map(([label, items]) => ({ label, items }));
}
