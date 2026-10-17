// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/play", src: new URL("./assets/play.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PlayIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PlayIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
