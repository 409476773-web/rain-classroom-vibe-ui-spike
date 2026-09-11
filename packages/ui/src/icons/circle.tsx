// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/circle", src: new URL("./assets/circle.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CircleIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CircleIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
