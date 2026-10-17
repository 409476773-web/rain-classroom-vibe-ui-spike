// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/more-vertical", src: new URL("./assets/more-vertical.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MoreVerticalIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MoreVerticalIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
