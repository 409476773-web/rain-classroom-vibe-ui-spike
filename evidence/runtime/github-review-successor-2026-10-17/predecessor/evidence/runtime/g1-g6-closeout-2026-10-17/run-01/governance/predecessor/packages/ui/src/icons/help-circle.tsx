// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/help-circle", src: new URL("./assets/help-circle.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const HelpCircleIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function HelpCircleIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
