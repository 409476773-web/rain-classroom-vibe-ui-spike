// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/permission", src: new URL("./assets/permission.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PermissionIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PermissionIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
