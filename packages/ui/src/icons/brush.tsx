// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/brush", src: new URL("./assets/brush.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const BrushIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function BrushIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
