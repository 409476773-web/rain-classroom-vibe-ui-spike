// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/knowledge-point", src: new URL("./assets/knowledge-point.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const KnowledgePointIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function KnowledgePointIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
