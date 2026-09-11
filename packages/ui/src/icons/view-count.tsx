// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/view-count", src: new URL("./assets/view-count.svg", import.meta.url).href, colorMode: "intrinsic", rendering: "image" };

export const ViewCountIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ViewCountIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
