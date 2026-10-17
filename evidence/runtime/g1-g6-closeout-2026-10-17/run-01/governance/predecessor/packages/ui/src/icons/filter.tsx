// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/filter", src: new URL("./assets/filter.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const FilterIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function FilterIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
