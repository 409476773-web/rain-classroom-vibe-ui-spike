// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/male", src: new URL("./assets/male.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const MaleIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function MaleIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
