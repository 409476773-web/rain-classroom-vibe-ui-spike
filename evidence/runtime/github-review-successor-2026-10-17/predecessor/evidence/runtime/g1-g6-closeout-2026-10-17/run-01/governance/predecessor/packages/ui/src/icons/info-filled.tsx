// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/info-filled", src: new URL("./assets/info-filled.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const InfoFilledIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function InfoFilledIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
