// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/close", src: new URL("./assets/close.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CloseIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CloseIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
