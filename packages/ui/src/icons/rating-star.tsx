// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/rating-star", src: new URL("./assets/rating-star.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const RatingStarIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function RatingStarIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
