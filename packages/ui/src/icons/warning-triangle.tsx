// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/warning-triangle", src: new URL("./assets/warning-triangle.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const WarningTriangleIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function WarningTriangleIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
