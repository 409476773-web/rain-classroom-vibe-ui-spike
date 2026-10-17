// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/calendar", src: new URL("./assets/calendar.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CalendarIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CalendarIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
