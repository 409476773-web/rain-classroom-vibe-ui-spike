// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/home-filled", src: new URL("./assets/home-filled.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const HomeFilledIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function HomeFilledIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
