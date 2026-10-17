// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/warning-color", src: new URL("./assets/warning-color.svg", import.meta.url).href, colorMode: "intrinsic", rendering: "image" };

export const WarningColorIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function WarningColorIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
