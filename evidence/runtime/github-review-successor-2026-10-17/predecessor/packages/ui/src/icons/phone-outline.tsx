// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/phone-outline", src: new URL("./assets/phone-outline.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PhoneOutlineIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PhoneOutlineIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
