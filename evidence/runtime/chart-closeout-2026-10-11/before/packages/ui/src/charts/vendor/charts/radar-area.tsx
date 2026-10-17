"use client";

import type { MotionValue } from "motion/react";
import { motion, useTransform } from "motion/react";
import { memo, useEffect, useMemo, useState } from "react";
import { radarCssVars, useRadarHover, useRadarStable } from "./radar-context";
import { useEnterComplete } from "./use-enter-complete";
import { useMountProgress } from "./use-mount-progress";

export interface RadarAreaProps {
  /** Index of this area in the data array */
  index: number;
  /** Optional color override */
  color?: string;
  /** Show data point circles. Default: true */
  showPoints?: boolean;
  /** Show stroke outline on the polygon. Default: true */
  showStroke?: boolean;
  /** Show glow effect on hover. Default: true */
  showGlow?: boolean;
  /** Additional class name */
  className?: string;
}

function getStrokeWidth(isHovered: boolean): number {
  return isHovered ? 3 : 2;
}

function positionsToPath(positions: { x: number; y: number }[]): string {
  if (positions.length === 0) {
    return "";
  }
  return `M ${positions.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;
}

const RadarPoint = memo(function RadarPoint({
  mountProgress,
  target,
  color,
  isHovered,
  metricKey,
  enterComplete,
}: {
  mountProgress: MotionValue<number>;
  target: { x: number; y: number };
  color: string;
  isHovered: boolean;
  metricKey: string;
  enterComplete: boolean;
}) {
  const cx = useTransform(mountProgress, (t) => target.x * t);
  const cy = useTransform(mountProgress, (t) => target.y * t);

  if (enterComplete) {
    return (
      <circle
        cx={target.x}
        cy={target.y}
        fill={color}
        key={metricKey}
        r={isHovered ? 6 : 4}
        stroke={radarCssVars.background}
        strokeWidth={2}
      />
    );
  }

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      fill={color}
      key={metricKey}
      r={isHovered ? 6 : 4}
      stroke={radarCssVars.background}
      strokeWidth={2}
      transition={{
        r: { type: "spring", stiffness: 300, damping: 20 },
      }}
    />
  );
});

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: radar area enter/hover branches mirror pie slice
export const RadarArea = memo(function RadarArea({
  index,
  color: colorProp,
  showPoints = true,
  showStroke = true,
  showGlow = true,
  className = "",
}: RadarAreaProps) {
  const {
    data,
    metrics,
    levels,
    animate,
    enterDurationMs,
    staggerScale,
    enterTransition,
    motionReplayKey,
    getColor,
    getPointPosition,
  } = useRadarStable();
  const { hoveredIndex, setHoveredIndex } = useRadarHover();
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReducedMotion(media.matches);
    change();
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  const animateArea = animate && !reducedMotion && enterDurationMs > 0 && enterTransition?.duration !== 0;

  const durationFactor = enterDurationMs / 1100;
  const areaData = data[index];

  const targetPositions = useMemo(() => {
    if (!areaData) {
      return metrics.map(() => ({ x: 0, y: 0 }));
    }
    return metrics.map((metric, i) => {
      const value = areaData.values[metric.key] ?? 0;
      return getPointPosition(i, value);
    });
  }, [metrics, areaData, getPointPosition]);

  const staticPath = useMemo(
    () => positionsToPath(targetPositions),
    [targetPositions]
  );

  const gridStagger = 0.08 * staggerScale * durationFactor;
  const campaignBaseDelay = (levels * gridStagger + 0.2) * durationFactor;
  const campaignStagger = 0.15 * staggerScale * durationFactor;
  const animationDelay = campaignBaseDelay + index * campaignStagger;

  const mountProgress = useMountProgress(
    animateArea ? enterTransition : { type: "tween", duration: 0 },
    animateArea ? animationDelay : 0,
    `${motionReplayKey}-${index}`
  );
  const mountComplete = useEnterComplete(mountProgress);
  const enterComplete = !animateArea || mountComplete;

  const animatedPositions = useTransform(mountProgress, (t) =>
    targetPositions.map((p) => ({ x: p.x * t, y: p.y * t }))
  );

  const pathD = useTransform(animatedPositions, positionsToPath);

  if (!areaData) {
    return null;
  }

  const color = colorProp || getColor(index);
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
  const AreaGroup = animateArea ? motion.g : "g";
  const filter = showGlow && isHovered
    ? `drop-shadow(0 0 6px color-mix(in srgb, ${color} 25%, transparent))`
    : "none";

  return (
    <AreaGroup
      {...(animateArea ? {
        animate: { opacity: isOtherHovered ? 0.3 : 1, scale: isHovered ? 1.05 : 1 },
        initial: { opacity: 0 },
        transition: {
          opacity: { duration: 0.15 },
          scale: { type: "spring" as const, stiffness: 400, damping: 25 },
        },
      } : {})}
      className={className}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{ transformOrigin: "0px 0px", cursor: "pointer", ...(!animateArea ? {
        opacity: isOtherHovered ? 0.3 : 1,
        transform: isHovered ? "scale(1.05)" : undefined,
        transformOrigin: "50% 50%",
        transformBox: "fill-box" as const,
      } : {}) }}
    >
      {enterComplete ? (
        <path
          d={staticPath}
          fill={color}
          fillOpacity={isHovered ? 0.35 : 0.15}
          stroke={showStroke ? color : "none"}
          strokeLinejoin="round"
          strokeWidth={showStroke ? getStrokeWidth(isHovered) : 0}
          style={{ filter }}
        />
      ) : (
        <motion.path
          animate={{
            fillOpacity: isHovered ? 0.35 : 0.15,
            strokeWidth: showStroke ? getStrokeWidth(isHovered) : 0,
          }}
          d={pathD}
          fill={color}
          stroke={showStroke ? color : "none"}
          strokeLinejoin="round"
          style={{ filter }}
          transition={{
            fillOpacity: { duration: animateArea ? 0.2 : 0 },
            strokeWidth: { duration: animateArea ? 0.2 : 0 },
          }}
        />
      )}

      {showPoints &&
        metrics.map((metric, i) => {
          const target = targetPositions[i];
          if (!target) {
            return null;
          }
          return (
            <RadarPoint
              color={color}
              enterComplete={enterComplete}
              isHovered={isHovered}
              key={metric.key}
              metricKey={metric.key}
              mountProgress={mountProgress}
              target={target}
            />
          );
        })}
    </AreaGroup>
  );
});

RadarArea.displayName = "RadarArea";

export default RadarArea;
