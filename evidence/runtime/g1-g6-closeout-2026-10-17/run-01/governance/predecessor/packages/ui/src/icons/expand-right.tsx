// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/expand-right", src: new URL("./assets/expand-right.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ExpandRightIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ExpandRightIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
