// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/select", src: new URL("./assets/select.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const SelectIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function SelectIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
