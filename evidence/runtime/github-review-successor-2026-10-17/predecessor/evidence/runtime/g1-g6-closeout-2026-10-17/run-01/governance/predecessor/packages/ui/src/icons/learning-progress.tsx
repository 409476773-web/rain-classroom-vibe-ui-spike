// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/learning-progress", src: new URL("./assets/learning-progress.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const LearningProgressIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function LearningProgressIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
