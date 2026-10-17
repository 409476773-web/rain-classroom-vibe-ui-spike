// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/learning-status", src: new URL("./assets/learning-status.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const LearningStatusIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function LearningStatusIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
