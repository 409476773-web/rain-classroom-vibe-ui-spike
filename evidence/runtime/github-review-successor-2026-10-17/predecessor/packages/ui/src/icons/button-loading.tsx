// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/button-loading", src: new URL("./assets/button-loading.png", import.meta.url).href, colorMode: "host", rendering: "png-mask" };

export const ButtonLoadingIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ButtonLoadingIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
