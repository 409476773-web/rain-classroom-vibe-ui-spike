// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/hourglass-progress", src: new URL("./assets/hourglass-progress.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const HourglassProgressIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function HourglassProgressIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
