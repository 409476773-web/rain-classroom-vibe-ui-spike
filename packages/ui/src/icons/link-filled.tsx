// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/link-filled", src: new URL("./assets/link-filled.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const LinkFilledIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function LinkFilledIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
