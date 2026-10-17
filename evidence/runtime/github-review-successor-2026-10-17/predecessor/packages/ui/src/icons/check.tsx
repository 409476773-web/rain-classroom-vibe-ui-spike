// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/check", src: new URL("./assets/check.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CheckIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CheckIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
