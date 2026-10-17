// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/upload", src: new URL("./assets/upload.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const UploadIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function UploadIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
