// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/warning-beacon", src: new URL("./assets/warning-beacon.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const WarningBeaconIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function WarningBeaconIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
