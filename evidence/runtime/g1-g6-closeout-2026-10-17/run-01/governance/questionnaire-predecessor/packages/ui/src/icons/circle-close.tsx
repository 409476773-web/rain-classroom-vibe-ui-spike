// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/circle-close", src: new URL("./assets/circle-close.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CircleCloseIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CircleCloseIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
