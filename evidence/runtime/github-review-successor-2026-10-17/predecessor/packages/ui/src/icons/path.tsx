// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/path", src: new URL("./assets/path.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PathIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PathIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
