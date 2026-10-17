// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/text", src: new URL("./assets/text.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const TextIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function TextIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
