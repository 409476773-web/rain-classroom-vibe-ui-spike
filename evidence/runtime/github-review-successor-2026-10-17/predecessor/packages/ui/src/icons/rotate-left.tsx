// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/rotate-left", src: new URL("./assets/rotate-left.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const RotateLeftIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function RotateLeftIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
