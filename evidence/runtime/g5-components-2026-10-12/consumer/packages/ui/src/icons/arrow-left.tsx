// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/arrow-left", src: new URL("./assets/arrow-left.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ArrowLeftIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ArrowLeftIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
