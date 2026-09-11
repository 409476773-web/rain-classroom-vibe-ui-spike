// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/copy", src: new URL("./assets/copy.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CopyIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CopyIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
