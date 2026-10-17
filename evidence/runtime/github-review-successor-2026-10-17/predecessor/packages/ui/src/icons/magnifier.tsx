// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/magnifier", src: new URL("./assets/magnifier.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MagnifierIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MagnifierIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
