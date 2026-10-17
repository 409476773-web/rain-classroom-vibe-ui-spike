// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/back-to-top", src: new URL("./assets/back-to-top.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const BackToTopIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function BackToTopIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
