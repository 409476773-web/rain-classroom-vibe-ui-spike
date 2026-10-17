// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/delete", src: new URL("./assets/delete.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const DeleteIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function DeleteIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
