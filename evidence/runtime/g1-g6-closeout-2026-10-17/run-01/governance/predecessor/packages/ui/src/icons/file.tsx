// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/file", src: new URL("./assets/file.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const FileIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function FileIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
