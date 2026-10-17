// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/feedback", src: new URL("./assets/feedback.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const FeedbackIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function FeedbackIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
