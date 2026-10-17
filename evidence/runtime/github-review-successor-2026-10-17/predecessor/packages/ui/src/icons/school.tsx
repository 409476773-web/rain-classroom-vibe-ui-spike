// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/school", src: new URL("./assets/school.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const SchoolIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function SchoolIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
