// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/card-view", src: new URL("./assets/card-view.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CardViewIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CardViewIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
