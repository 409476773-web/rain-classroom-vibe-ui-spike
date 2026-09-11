// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/mobile", src: new URL("./assets/mobile.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MobileIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MobileIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
