// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/slash", src: new URL("./assets/slash.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const SlashIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function SlashIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
