// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/switch", src: new URL("./assets/switch.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const SwitchIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function SwitchIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
