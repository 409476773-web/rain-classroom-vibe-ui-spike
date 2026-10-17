// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/more", src: new URL("./assets/more.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MoreIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MoreIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
