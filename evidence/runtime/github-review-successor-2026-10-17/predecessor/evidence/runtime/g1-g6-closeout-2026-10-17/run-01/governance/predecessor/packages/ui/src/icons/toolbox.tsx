// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/toolbox", src: new URL("./assets/toolbox.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ToolboxIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ToolboxIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
