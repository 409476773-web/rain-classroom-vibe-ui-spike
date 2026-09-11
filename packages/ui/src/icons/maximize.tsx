// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/maximize", src: new URL("./assets/maximize.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MaximizeIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MaximizeIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
