// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/notification", src: new URL("./assets/notification.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const NotificationIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function NotificationIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
