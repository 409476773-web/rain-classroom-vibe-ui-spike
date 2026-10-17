// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/birthday", src: new URL("./assets/birthday.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const BirthdayIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function BirthdayIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
