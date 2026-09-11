// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/qr-code", src: new URL("./assets/qr-code.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const QrCodeIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function QrCodeIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
