// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/zoom-out", src: new URL("./assets/zoom-out.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ZoomOutIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ZoomOutIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
