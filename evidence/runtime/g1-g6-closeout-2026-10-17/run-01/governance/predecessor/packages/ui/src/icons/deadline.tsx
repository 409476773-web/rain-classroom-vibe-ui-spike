// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/deadline", src: new URL("./assets/deadline.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const DeadlineIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function DeadlineIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
