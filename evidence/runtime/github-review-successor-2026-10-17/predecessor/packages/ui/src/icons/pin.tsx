// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/pin", src: new URL("./assets/pin.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PinIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PinIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
