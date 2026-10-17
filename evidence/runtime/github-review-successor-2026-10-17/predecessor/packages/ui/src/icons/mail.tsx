// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/mail", src: new URL("./assets/mail.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MailIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MailIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
