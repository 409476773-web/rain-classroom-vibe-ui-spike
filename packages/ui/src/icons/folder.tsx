// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/folder", src: new URL("./assets/folder.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const FolderIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function FolderIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
