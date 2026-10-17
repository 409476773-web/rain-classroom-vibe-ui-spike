"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";

export interface DataBarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  value: number | null;
  maxValue: number;
  label: string;
  valueText?: string;
  decorative?: boolean;
}

/** A quantity comparison with a host-owned scale; it does not imply task progress. */
export function DataBar({ value, maxValue, label, valueText, decorative = false, className = "", ...props }: DataBarProps) {
  const reduced = useReducedMotion();
  const invalid = !Number.isFinite(maxValue) || maxValue < 0 || (value !== null && (!Number.isFinite(value) || value < 0 || (maxValue === 0 && value > 0)));
  const state = invalid ? "invalid" : value === null ? "missing" : value > maxValue ? "overflow" : maxValue === 0 ? "unscaled" : value === 0 ? "zero" : "normal";
  const fraction = state === "normal" && value !== null ? value / maxValue : 0;
  const reading = invalid ? "无效数据" : value === null ? "暂无数据" : `${valueText ?? value}${state === "overflow" ? "，超出范围" : ""}`;
  return <span {...props} className={`rain-data-bar ${className}`} role={decorative ? undefined : "img"} aria-hidden={decorative || undefined}
    aria-label={decorative ? undefined : `${label}，${reading}`} data-state={state} data-fraction={fraction}>
    <motion.span className="rain-data-bar__fill" initial={{ width: reduced ? `${fraction * 100}%` : "0%" }} animate={{ width: `${fraction * 100}%` }}
      transition={reduced ? { duration: 0 } : { type: "tween", duration: .55, ease: [.85, 0, .15, 1] }} />
  </span>;
}
