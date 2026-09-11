// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/spotlight", src: new URL("./assets/spotlight.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const SpotlightIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function SpotlightIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
