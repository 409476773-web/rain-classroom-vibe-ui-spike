// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/history-back", src: new URL("./assets/history-back.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const HistoryBackIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function HistoryBackIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
