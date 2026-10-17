// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/undo", src: new URL("./assets/undo.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const UndoIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function UndoIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
