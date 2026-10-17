// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/fullscreen", src: new URL("./assets/fullscreen.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const FullscreenIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function FullscreenIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
