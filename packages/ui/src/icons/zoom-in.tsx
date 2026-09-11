// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/zoom-in", src: new URL("./assets/zoom-in.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ZoomInIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ZoomInIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
