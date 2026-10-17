// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/voice", src: new URL("./assets/voice.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const VoiceIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function VoiceIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
