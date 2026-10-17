// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/list-view", src: new URL("./assets/list-view.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ListViewIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ListViewIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
