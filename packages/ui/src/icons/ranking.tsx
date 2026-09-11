// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/ranking", src: new URL("./assets/ranking.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const RankingIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function RankingIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
