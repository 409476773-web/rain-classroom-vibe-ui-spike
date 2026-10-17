// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/gender", src: new URL("./assets/gender.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const GenderIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function GenderIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
