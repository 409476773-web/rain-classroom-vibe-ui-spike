// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/global-inventory", src: new URL("./assets/global-inventory.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const GlobalInventoryIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function GlobalInventoryIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
