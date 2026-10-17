// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/medal", src: new URL("./assets/medal.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MedalIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MedalIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
