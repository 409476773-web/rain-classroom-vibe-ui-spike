// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/add", src: new URL("./assets/add.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const AddIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function AddIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
