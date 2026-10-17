// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/password-lock", src: new URL("./assets/password-lock.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PasswordLockIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PasswordLockIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
