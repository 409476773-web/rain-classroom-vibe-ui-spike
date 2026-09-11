// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/other-apps", src: new URL("./assets/other-apps.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const OtherAppsIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function OtherAppsIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
