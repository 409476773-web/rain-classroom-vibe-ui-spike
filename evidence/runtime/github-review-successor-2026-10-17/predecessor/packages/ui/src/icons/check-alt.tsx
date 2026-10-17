// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/check-alt", src: new URL("./assets/check-alt.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CheckAltIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CheckAltIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
