// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/down", src: new URL("./assets/down.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const DownIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function DownIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
