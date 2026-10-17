// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/redo", src: new URL("./assets/redo.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const RedoIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function RedoIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
