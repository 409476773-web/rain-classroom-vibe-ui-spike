// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/dislike", src: new URL("./assets/dislike.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const DislikeIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function DislikeIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
