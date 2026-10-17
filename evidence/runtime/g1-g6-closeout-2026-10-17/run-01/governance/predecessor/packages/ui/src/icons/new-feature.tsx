// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/new-feature", src: new URL("./assets/new-feature.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const NewFeatureIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function NewFeatureIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
