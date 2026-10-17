// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/mini-window", src: new URL("./assets/mini-window.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MiniWindowIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MiniWindowIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
