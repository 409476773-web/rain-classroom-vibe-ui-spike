// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/smile", src: new URL("./assets/smile.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const SmileIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function SmileIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
