// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/screen-share", src: new URL("./assets/screen-share.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ScreenShareIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ScreenShareIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
