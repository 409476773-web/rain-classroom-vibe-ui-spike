// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/info", src: new URL("./assets/info.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const InfoIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function InfoIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
