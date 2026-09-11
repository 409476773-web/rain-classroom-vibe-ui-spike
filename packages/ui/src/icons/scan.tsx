// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/scan", src: new URL("./assets/scan.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ScanIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ScanIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
