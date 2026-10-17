// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/check-color", src: new URL("./assets/check-color.svg", import.meta.url).href, colorMode: "intrinsic", rendering: "image" };

export const CheckColorIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CheckColorIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
