// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/exam-library", src: new URL("./assets/exam-library.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const ExamLibraryIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function ExamLibraryIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
