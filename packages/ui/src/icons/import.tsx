// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/import", src: new URL("./assets/import.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ImportIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ImportIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
