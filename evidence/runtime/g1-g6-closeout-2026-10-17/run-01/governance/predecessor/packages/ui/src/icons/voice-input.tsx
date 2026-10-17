// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/voice-input", src: new URL("./assets/voice-input.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const VoiceInputIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function VoiceInputIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
