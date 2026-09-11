// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/help-filled", src: new URL("./assets/help-filled.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const HelpFilledIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function HelpFilledIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
