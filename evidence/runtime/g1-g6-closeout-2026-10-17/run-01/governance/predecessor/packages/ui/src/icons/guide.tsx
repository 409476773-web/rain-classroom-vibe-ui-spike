// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/guide", src: new URL("./assets/guide.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const GuideIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function GuideIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
