// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/person-off", src: new URL("./assets/person-off.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PersonOffIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PersonOffIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
