// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/like-filled", src: new URL("./assets/like-filled.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const LikeFilledIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function LikeFilledIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
