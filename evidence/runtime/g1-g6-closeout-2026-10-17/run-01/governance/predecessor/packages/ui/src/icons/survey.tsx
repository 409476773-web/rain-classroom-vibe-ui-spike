// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/survey", src: new URL("./assets/survey.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const SurveyIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function SurveyIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
