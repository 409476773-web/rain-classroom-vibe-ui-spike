// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/share", src: new URL("./assets/share.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ShareIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ShareIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
