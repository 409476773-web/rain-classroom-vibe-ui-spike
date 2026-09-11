// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/published", src: new URL("./assets/published.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PublishedIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PublishedIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
