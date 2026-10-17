// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/fixed-width", src: new URL("./assets/fixed-width.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const FixedWidthIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function FixedWidthIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
