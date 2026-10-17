// Generated from the frozen Figma inventory. Do not redraw or edit.
import { forwardRef } from "react";
import { Icon, type IconAsset, type IconProps } from "../icon/icon";

const asset: IconAsset = { assetId: "icon/organization", src: new URL("./assets/organization.svg", import.meta.url).href, colorMode: "host", rendering: "svg-mask" };

export const OrganizationIcon = forwardRef<HTMLSpanElement, Omit<IconProps, "asset">>(function OrganizationIcon(props, ref) {
  return <Icon {...props} ref={ref} asset={asset} />;
});
