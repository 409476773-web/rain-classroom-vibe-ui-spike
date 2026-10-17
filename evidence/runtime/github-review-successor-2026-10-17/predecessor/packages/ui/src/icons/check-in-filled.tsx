// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/check-in-filled", src: new URL("./assets/check-in-filled.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CheckInFilledIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CheckInFilledIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
