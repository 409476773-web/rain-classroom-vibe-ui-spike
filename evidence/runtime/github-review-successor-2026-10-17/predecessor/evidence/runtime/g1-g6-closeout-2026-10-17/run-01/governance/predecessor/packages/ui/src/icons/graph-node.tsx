// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/graph-node", src: new URL("./assets/graph-node.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const GraphNodeIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function GraphNodeIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
