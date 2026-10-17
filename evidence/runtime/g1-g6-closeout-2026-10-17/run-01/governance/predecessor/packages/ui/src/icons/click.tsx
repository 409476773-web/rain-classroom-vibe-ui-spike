// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/click", src: new URL("./assets/click.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ClickIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ClickIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
