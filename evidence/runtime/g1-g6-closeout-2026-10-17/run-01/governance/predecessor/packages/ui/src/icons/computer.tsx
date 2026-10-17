// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/computer", src: new URL("./assets/computer.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ComputerIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ComputerIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
