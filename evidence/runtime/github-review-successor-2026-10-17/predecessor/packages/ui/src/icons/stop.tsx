// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/stop", src: new URL("./assets/stop.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const StopIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function StopIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
