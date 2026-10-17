// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/group", src: new URL("./assets/group.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const GroupIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function GroupIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
