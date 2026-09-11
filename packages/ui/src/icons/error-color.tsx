// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/error-color", src: new URL("./assets/error-color.svg", import.meta.url).href, colorMode: "intrinsic", rendering: "image" };

export const ErrorColorIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ErrorColorIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
