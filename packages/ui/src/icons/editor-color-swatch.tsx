// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/editor-color-swatch", src: new URL("./assets/editor-color-swatch.svg", import.meta.url).href, colorMode: "intrinsic", rendering: "image" };

export const EditorColorSwatchIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function EditorColorSwatchIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
