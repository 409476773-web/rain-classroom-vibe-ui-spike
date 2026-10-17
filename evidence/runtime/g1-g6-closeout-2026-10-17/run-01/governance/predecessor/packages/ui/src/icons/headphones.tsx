// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/headphones", src: new URL("./assets/headphones.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const HeadphonesIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function HeadphonesIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
