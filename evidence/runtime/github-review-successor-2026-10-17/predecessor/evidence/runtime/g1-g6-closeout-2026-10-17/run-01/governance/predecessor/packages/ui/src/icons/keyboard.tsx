// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/keyboard", src: new URL("./assets/keyboard.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const KeyboardIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function KeyboardIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
