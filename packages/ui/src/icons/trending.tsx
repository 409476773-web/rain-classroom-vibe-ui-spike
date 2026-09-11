// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/trending", src: new URL("./assets/trending.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const TrendingIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function TrendingIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
