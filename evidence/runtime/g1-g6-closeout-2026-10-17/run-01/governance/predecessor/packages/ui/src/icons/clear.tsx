// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/clear", src: new URL("./assets/clear.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ClearIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ClearIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
