// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/favorite", src: new URL("./assets/favorite.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const FavoriteIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function FavoriteIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
