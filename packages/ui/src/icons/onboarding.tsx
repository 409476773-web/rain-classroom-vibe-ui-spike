// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/onboarding", src: new URL("./assets/onboarding.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const OnboardingIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function OnboardingIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
