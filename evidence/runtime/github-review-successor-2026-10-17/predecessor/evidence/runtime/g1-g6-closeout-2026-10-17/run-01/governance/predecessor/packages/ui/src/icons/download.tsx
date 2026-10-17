// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/download", src: new URL("./assets/download.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const DownloadIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function DownloadIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
