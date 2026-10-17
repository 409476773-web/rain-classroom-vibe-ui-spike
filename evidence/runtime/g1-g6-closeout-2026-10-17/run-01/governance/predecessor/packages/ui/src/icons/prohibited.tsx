// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/prohibited", src: new URL("./assets/prohibited.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ProhibitedIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ProhibitedIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
