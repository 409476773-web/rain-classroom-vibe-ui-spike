// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/editor-link", src: new URL("./assets/editor-link.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const EditorLinkIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function EditorLinkIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
