// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/tag", src: new URL("./assets/tag.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const TagIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function TagIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
