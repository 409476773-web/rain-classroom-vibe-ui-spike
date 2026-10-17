// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/to-top", src: new URL("./assets/to-top.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ToTopIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ToTopIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
