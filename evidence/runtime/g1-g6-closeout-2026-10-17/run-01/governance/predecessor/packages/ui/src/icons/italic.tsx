// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/italic", src: new URL("./assets/italic.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ItalicIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ItalicIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
