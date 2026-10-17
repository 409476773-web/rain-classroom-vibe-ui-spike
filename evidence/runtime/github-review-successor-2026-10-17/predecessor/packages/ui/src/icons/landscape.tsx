// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/landscape", src: new URL("./assets/landscape.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const LandscapeIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function LandscapeIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
