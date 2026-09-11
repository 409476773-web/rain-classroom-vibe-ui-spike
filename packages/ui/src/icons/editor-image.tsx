// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/editor-image", src: new URL("./assets/editor-image.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const EditorImageIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function EditorImageIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
