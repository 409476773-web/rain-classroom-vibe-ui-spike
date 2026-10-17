// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/comment", src: new URL("./assets/comment.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const CommentIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function CommentIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
