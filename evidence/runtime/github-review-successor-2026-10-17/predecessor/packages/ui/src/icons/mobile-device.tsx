// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/mobile-device", src: new URL("./assets/mobile-device.svg", import.meta.url).href, colorMode: "intrinsic", rendering: "image" };

export const MobileDeviceIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MobileDeviceIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
