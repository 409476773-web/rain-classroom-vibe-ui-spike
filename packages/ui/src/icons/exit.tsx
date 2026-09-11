// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/exit", src: new URL("./assets/exit.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ExitIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ExitIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
