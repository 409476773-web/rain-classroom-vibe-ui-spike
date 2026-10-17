// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/forbidden", src: new URL("./assets/forbidden.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ForbiddenIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ForbiddenIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
