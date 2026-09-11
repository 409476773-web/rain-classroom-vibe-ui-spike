// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/circle-check", src: new URL("./assets/circle-check.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CircleCheckIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CircleCheckIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
