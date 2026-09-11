// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/insert", src: new URL("./assets/insert.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const InsertIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function InsertIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
