// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/up", src: new URL("./assets/up.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const UpIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function UpIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
