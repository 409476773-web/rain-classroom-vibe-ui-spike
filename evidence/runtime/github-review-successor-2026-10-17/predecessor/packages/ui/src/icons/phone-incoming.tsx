// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/phone-incoming", src: new URL("./assets/phone-incoming.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PhoneIncomingIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PhoneIncomingIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
