// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/image", src: new URL("./assets/image.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ImageIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ImageIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
