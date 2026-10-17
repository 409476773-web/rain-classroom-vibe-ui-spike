// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/custom", src: new URL("./assets/custom.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CustomIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CustomIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
