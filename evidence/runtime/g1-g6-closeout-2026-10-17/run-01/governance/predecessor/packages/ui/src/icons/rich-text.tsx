// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/rich-text", src: new URL("./assets/rich-text.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const RichTextIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function RichTextIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
