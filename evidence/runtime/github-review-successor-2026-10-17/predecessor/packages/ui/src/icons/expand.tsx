// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/expand", src: new URL("./assets/expand.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ExpandIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ExpandIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
