// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/help", src: new URL("./assets/help.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const HelpIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function HelpIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
