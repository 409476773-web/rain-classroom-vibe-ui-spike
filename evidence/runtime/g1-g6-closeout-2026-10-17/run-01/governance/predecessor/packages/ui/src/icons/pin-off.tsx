// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/pin-off", src: new URL("./assets/pin-off.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PinOffIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PinOffIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
