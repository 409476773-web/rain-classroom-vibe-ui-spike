// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/search", src: new URL("./assets/search.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const SearchIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function SearchIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
