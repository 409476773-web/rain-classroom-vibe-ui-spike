// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/camera", src: new URL("./assets/camera.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CameraIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CameraIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
