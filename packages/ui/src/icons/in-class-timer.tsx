// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/in-class-timer", src: new URL("./assets/in-class-timer.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const InClassTimerIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function InClassTimerIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
