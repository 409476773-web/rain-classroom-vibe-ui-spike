// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/pause-circle", src: new URL("./assets/pause-circle.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PauseCircleIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PauseCircleIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
