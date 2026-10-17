import { Children, type ReactElement, type ReactNode } from "react";
import { rainCn } from "../utils/rain-class-names";
import "./status-indicator.css";

export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";
export interface StatusIndicatorProps {
  label: string;
  /** Use a formal Rain icon; the decoration owns its accessible label. */
  icon: ReactElement;
  tone?: StatusTone;
  size?: 16 | 20 | 24;
  className?: string;
}
export function StatusIndicator({ label, icon, tone = "neutral", size = 16, className }: StatusIndicatorProps) {
  return <span role="img" aria-label={label} data-rain-id="ui-status-indicator" data-slot="root" data-tone={tone} data-size={size}
    className={rainCn("rain-status-indicator", className)}><span aria-hidden="true">{icon}</span></span>;
}
export interface StatusIndicatorGroupProps {
  children: ReactNode;
  position?: "bottom-start" | "bottom-center" | "bottom-end";
  className?: string;
}
export function StatusIndicatorGroup({ children, position = "bottom-end", className }: StatusIndicatorGroupProps) {
  return <span data-rain-id="ui-status-indicator-group" data-slot="root" data-position={position}
    className={rainCn("rain-status-indicator-group", className)}>{Children.toArray(children).slice(0, 2)}</span>;
}
export interface ActivityOverlayProps {
  label: string;
  icon: ReactElement;
  active?: boolean;
  tone?: StatusTone;
  ring?: boolean;
  /** One animation only; pulse implies a ring. */
  motion?: "none" | "rotate" | "pulse";
  className?: string;
}
export function ActivityOverlay({ label, icon, active = true, tone = "info", ring = true, motion = "none", className }: ActivityOverlayProps) {
  return <span hidden={!active} role="img" aria-label={label} data-rain-id="ui-activity-overlay" data-slot="root"
    data-ring={ring || motion === "pulse"} data-motion={motion}
    className={rainCn("rain-activity-overlay", className)}><span aria-hidden="true" data-slot="indicator"><StatusIndicator label={label} icon={icon} tone={tone} size={20} /></span></span>;
}
