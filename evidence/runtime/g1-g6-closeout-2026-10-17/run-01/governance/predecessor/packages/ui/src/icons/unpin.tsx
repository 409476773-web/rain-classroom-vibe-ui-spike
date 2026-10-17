// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/unpin", src: new URL("./assets/unpin.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const UnpinIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function UnpinIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
