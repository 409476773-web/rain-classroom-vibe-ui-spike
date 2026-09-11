// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/loading-refresh", src: new URL("./assets/loading-refresh.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const LoadingRefreshIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function LoadingRefreshIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
