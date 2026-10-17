import { createContext, useContext, useEffect, useRef, useState, type ChangeEvent } from "react";
import { DayPicker, getDefaultClassNames, type DayPickerProps, type DayButtonProps, type DropdownProps, type RootProps, type NavProps } from "react-day-picker";
import { zhCN } from "react-day-picker/locale";
import { ChevronLeftIcon } from "@rain-next/ui/icons/chevron-left";
import { ChevronRightIcon } from "@rain-next/ui/icons/chevron-right";
import { Button } from "../button/button";
import { IconButton } from "../icon-button/icon-button";
import { Select } from "../select/select";
import { FormItemContext } from "../input/form-item";
import { rainCn } from "../utils/rain-class-names";
import "./calendar.css";

/** shadcn/ui Calendar at 3ba91b1 + Nova: owned parts, Rain tokens and formal controls. */
export type CalendarProps = Extract<DayPickerProps, { mode: "single" | "range" }>;

/** Internal composition signal: an open month/year Select owns the next dismissal. */
export const CalendarOverlayContext = createContext<((open: boolean) => void) | undefined>(undefined);

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches));
  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return;
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function CalendarRoot({ rootRef, className, ...props }: RootProps) {
  return <div {...props} ref={rootRef} data-rain-id="ui-calendar" data-slot="root" className={className} />;
}

function CalendarDayButton({ day, modifiers, className, children, ...props }: DayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (modifiers.focused) ref.current?.focus(); }, [modifiers.focused]);
  return <Button {...props} ref={ref} variant="text" size="small" className={className}
    data-day={`${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, "0")}-${String(day.date.getDate()).padStart(2, "0")}`}
    data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
    data-range-start={modifiers.range_start} data-range-end={modifiers.range_end} data-range-middle={modifiers.range_middle}
    localRecipe={{ id: "calendar-day", origin: "ui-button", scope: "feature", modifiedParts: ["root", "label"], classes: { root: "rain-calendar__day-button", label: "rain-calendar__day-label" }, candidateTokens: [], promotionStatus: "not-proposed" }}>{children}</Button>;
}

function CalendarDropdown({ options = [], value, onChange, disabled, "aria-label": label }: DropdownProps) {
  const onOpenChange = useContext(CalendarOverlayContext);
  return <Select size={24} aria-label={label} value={Number(value)} disabled={disabled} options={options} clearable={false}
    onOpenChange={onOpenChange} className="rain-calendar__select"
    onValueChange={next => {
      if (next !== null) onChange?.({ target: { value: String(next) } } as ChangeEvent<HTMLSelectElement>);
    }} />;
}

function CalendarNav({ onPreviousClick, onNextClick, previousMonth, nextMonth, className, ...props }: NavProps) {
  return <nav {...props} className={className}>
    <IconButton size="24/14" aria-label="上个月" icon={<ChevronLeftIcon />} disabled={!previousMonth} onClick={onPreviousClick} />
    <IconButton size="24/14" aria-label="下个月" icon={<ChevronRightIcon />} disabled={!nextMonth} onClick={onNextClick} />
  </nav>;
}

export function Calendar({ className, classNames, components, formatters, labels, animate = true, startMonth, endMonth, ...props }: CalendarProps) {
  const reduced = useReducedMotion();
  const defaults = getDefaultClassNames();
  const currentYear = new Date().getFullYear();
  return <FormItemContext.Provider value={null}><DayPicker
    locale={zhCN} weekStartsOn={1} showOutsideDays fixedWeeks captionLayout="dropdown"
    startMonth={startMonth ?? new Date(currentYear - 100, 0)} endMonth={endMonth ?? new Date(currentYear + 100, 11)}
    {...props} animate={animate && !reduced}
    className={rainCn("rain-calendar rain-type-ui-default", className)}
    formatters={{ formatMonthDropdown: date => `${date.getMonth() + 1}月`, formatYearDropdown: date => `${date.getFullYear()}年`, formatWeekdayName: date => ["日", "一", "二", "三", "四", "五", "六"][date.getDay()]!, ...formatters }}
    labels={{ labelMonthDropdown: () => "选择月份", labelYearDropdown: () => "选择年份", labelNav: () => "切换月份",
      labelDayButton: (date, modifiers) => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${modifiers.today ? "，今天" : ""}${modifiers.selected ? "，已选中" : ""}`, ...labels }}
    classNames={{ ...defaults, months: rainCn(defaults.months, "rain-calendar__months"), month: rainCn(defaults.month, "rain-calendar__month"),
      nav: rainCn(defaults.nav, "rain-calendar__nav"), month_caption: rainCn(defaults.month_caption, "rain-calendar__caption"),
      dropdowns: rainCn(defaults.dropdowns, "rain-calendar__dropdowns"), month_grid: rainCn(defaults.month_grid, "rain-calendar__grid"),
      weekday: rainCn(defaults.weekday, "rain-calendar__weekday"), day: rainCn(defaults.day, "rain-calendar__day"),
      range_start: rainCn(defaults.range_start, "rain-calendar__range-start"), range_end: rainCn(defaults.range_end, "rain-calendar__range-end"),
      range_middle: rainCn(defaults.range_middle, "rain-calendar__range-middle"), today: rainCn(defaults.today, "rain-calendar__today"),
      outside: rainCn(defaults.outside, "rain-calendar__outside"), disabled: rainCn(defaults.disabled, "rain-calendar__disabled"),
      hidden: rainCn(defaults.hidden, "rain-calendar__hidden"), ...classNames }}
    components={{ Root: CalendarRoot, DayButton: CalendarDayButton, Dropdown: CalendarDropdown, Nav: CalendarNav, ...components }}
  /></FormItemContext.Provider>;
}
