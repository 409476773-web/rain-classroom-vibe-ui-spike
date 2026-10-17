// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/person", src: new URL("./assets/person.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PersonIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PersonIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
