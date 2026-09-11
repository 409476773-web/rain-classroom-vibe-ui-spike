// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/arrow-up", src: new URL("./assets/arrow-up.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ArrowUpIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ArrowUpIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
