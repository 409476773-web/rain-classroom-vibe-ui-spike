// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/loading-alt", src: new URL("./assets/loading-alt.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const LoadingAltIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function LoadingAltIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
