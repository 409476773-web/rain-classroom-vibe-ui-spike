// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/competency-tree", src: new URL("./assets/competency-tree.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CompetencyTreeIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CompetencyTreeIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
