// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/dialog", src: new URL("./assets/dialog.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const DialogIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function DialogIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
