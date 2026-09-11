// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/save", src: new URL("./assets/save.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const SaveIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function SaveIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
