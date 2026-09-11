// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/home", src: new URL("./assets/home.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const HomeIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function HomeIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
