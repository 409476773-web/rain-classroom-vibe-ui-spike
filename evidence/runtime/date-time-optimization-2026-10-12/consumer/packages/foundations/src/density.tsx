import {
  createContext,
  useContext,
  type CSSProperties,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";
import { compositionSpaceTokens } from "./composition-contract";

export type Density = "compact" | "default";

export const densityMetrics = {
  compact: {
    controlHeight: "30px",
    controlPaddingInline: compositionSpaceTokens[10],
    itemGap: compositionSpaceTokens[6],
  },
  default: {
    controlHeight: "36px",
    controlPaddingInline: compositionSpaceTokens[14],
    itemGap: compositionSpaceTokens[10],
  },
} as const;

const DensityContext = createContext<Density>("default");

export type DensityProviderProps = PropsWithChildren<
  {
    density: Density;
    rainId?: string;
  } & Pick<HTMLAttributes<HTMLDivElement>, "className">
>;

export function DensityProvider({
  children,
  className,
  density,
  rainId = "foundation-density-context",
}: DensityProviderProps) {
  const metrics = densityMetrics[density];
  const densityStyle = {
    "--rain-density-control-height": metrics.controlHeight,
    "--rain-density-control-padding-inline": metrics.controlPaddingInline,
    "--rain-density-item-gap": metrics.itemGap,
  } as CSSProperties;

  return (
    <DensityContext.Provider value={density}>
      <div
        className={className}
        data-density={density}
        data-rain-id={rainId}
        data-slot="density-context"
        style={densityStyle}
      >
        {children}
      </div>
    </DensityContext.Provider>
  );
}

export function useDensity() {
  return useContext(DensityContext);
}
