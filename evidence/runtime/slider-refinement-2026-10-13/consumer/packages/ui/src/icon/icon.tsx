import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";

/** An exact, generated asset. Selection rules belong to Foundations. */
export type IconAsset = Readonly<{ assetId: string; src: string }> & (
  | Readonly<{ colorMode: "host"; rendering: "svg-mask" | "png-mask" }>
  | Readonly<{ colorMode: "intrinsic"; rendering: "image" }>
);

export interface IconProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "color" | "dangerouslySetInnerHTML" | "onClick" | "tabIndex"
> {
  asset: IconAsset;
  label?: string;
  size?: CSSProperties["width"];
}

/** Mask sources remain separate documents, preserving their alpha and local IDs. */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { asset, label, size, className, style, ...props },
  ref,
) {
  const imageUrl = `url("${asset.src}")`;
  const dimensions = size === undefined ? {} : { width: size, height: size };
  const mask = asset.colorMode === "host"
    ? { maskImage: imageUrl, WebkitMaskImage: imageUrl }
    : {};

  return (
    <span
      {...props}
      ref={ref}
      className={["rain-icon", className].filter(Boolean).join(" ")}
      style={{ ...style, ...dimensions, ...mask }}
      aria-hidden={label ? undefined : true}
      aria-label={label || undefined}
      role={label ? "img" : undefined}
      data-rain-id="icon"
      data-icon={asset.assetId}
      data-icon-color-mode={asset.colorMode}
      data-icon-rendering={asset.rendering}
    >
      {asset.colorMode === "intrinsic" ? <img src={asset.src} alt="" draggable={false} /> : null}
    </span>
  );
});
