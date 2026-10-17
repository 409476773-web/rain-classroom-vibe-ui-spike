// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/member-add", src: new URL("./assets/member-add.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MemberAddIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MemberAddIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
