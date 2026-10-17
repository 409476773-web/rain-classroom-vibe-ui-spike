// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/refresh", src: new URL("./assets/refresh.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const RefreshIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function RefreshIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
