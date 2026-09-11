// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/loading-filled", src: new URL("./assets/loading-filled.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const LoadingFilledIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function LoadingFilledIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
