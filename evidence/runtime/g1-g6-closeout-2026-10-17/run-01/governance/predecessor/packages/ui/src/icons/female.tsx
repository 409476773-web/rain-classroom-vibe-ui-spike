// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/female", src: new URL("./assets/female.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const FemaleIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function FemaleIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
