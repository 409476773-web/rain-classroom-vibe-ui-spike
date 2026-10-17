// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/chevron-left", src: new URL("./assets/chevron-left.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ChevronLeftIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ChevronLeftIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
