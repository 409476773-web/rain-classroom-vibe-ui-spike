// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/members", src: new URL("./assets/members.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MembersIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MembersIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
