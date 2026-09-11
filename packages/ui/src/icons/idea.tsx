// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/idea", src: new URL("./assets/idea.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const IdeaIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function IdeaIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
