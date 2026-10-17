// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/person-filled", src: new URL("./assets/person-filled.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const PersonFilledIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function PersonFilledIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
