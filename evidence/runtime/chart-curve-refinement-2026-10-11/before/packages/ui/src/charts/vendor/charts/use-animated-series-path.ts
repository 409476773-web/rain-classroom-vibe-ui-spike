"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LINE_LOADING_PULSE_EASE } from "./line-loading-timing";
import {
  computeSeriesPathPoints,
  getSeriesValue,
  interpolateSeriesPathPoints,
  type SeriesPathPoint,
  seriesPathFromPoints,
} from "./series-path-utils";

// biome-ignore lint/suspicious/noExplicitAny: d3 curve factory type
type CurveFactory = any;

export interface UseAnimatedSeriesPathOptions {
  renderData: Record<string, unknown>[];
  getX: (datum: Record<string, unknown>) => number;
  getXKey: (datum: Record<string, unknown>) => string;
  yScale: (value: number) => number | undefined;
  dataKey: string;
  curve: CurveFactory;
  chartPhase: string;
  durationMs: number;
  innerWidth: number;
  enabled: boolean;
}

export function useAnimatedSeriesPath({
  renderData,
  getX,
  getXKey,
  yScale,
  dataKey,
  curve,
  chartPhase,
  durationMs,
  innerWidth,
  enabled,
}: UseAnimatedSeriesPathOptions) {
  const reducedMotion = useReducedMotion();
  const [animatedPoints, setAnimatedPoints] = useState<
    SeriesPathPoint[] | null
  >(null);
  const displayedPointsRef = useRef<SeriesPathPoint[] | null>(null);
  const animatingRef = useRef(false);

  const targetPoints = useMemo(
    () =>
      computeSeriesPathPoints(renderData, getX, (x) => x, yScale, dataKey, getXKey),
    [renderData, getX, getXKey, yScale, dataKey]
  );

  const transitionSignature = useMemo(
    () => JSON.stringify([innerWidth, renderData.map((datum) => [getXKey(datum), getX(datum), getSeriesValue(datum, dataKey)])]),
    [innerWidth, renderData, getXKey, getX, dataKey]
  );
  const targetPointsRef = useRef(targetPoints);
  targetPointsRef.current = targetPoints;

  const prevTransitionSignatureRef = useRef(transitionSignature);

  useEffect(() => {
    if (!animatingRef.current && prevTransitionSignatureRef.current === transitionSignature) {
      displayedPointsRef.current = targetPoints;
    }
  }, [targetPoints, transitionSignature]);

  // The destination follows the Y-domain tween through a ref; only data/X changes restart motion.
  // biome-ignore lint/correctness/useExhaustiveDependencies: targetPointsRef carries the latest scale geometry
  useEffect(() => {
    const currentTarget = targetPointsRef.current;
    const shouldAnimate =
      enabled &&
      !reducedMotion &&
      chartPhase === "ready" &&
      durationMs > 0 &&
      currentTarget.length > 0;

    if (!shouldAnimate) {
      animatingRef.current = false;
      setAnimatedPoints(null);
      displayedPointsRef.current = currentTarget;
      prevTransitionSignatureRef.current = transitionSignature;
      return;
    }

    if (prevTransitionSignatureRef.current === transitionSignature) {
      return;
    }
    prevTransitionSignatureRef.current = transitionSignature;

    const fromPoints = displayedPointsRef.current ?? currentTarget;
    if (fromPoints.length === 0) {
      displayedPointsRef.current = currentTarget;
      return;
    }

    animatingRef.current = true;
    const fromSnapshot = fromPoints;
    setAnimatedPoints(interpolateSeriesPathPoints(fromSnapshot, currentTarget, 0));

    const control = animate(0, 1, {
      duration: durationMs / 1000,
      ease: [...LINE_LOADING_PULSE_EASE],
      onUpdate: (progress) => {
        const next = interpolateSeriesPathPoints(
          fromSnapshot,
          targetPointsRef.current,
          progress
        );
        displayedPointsRef.current = next;
        setAnimatedPoints(next);
      },
      onComplete: () => {
        animatingRef.current = false;
        displayedPointsRef.current = targetPointsRef.current;
        setAnimatedPoints(null);
      },
    });

    return () => {
      control.stop();
      animatingRef.current = false;
    };
  }, [
    transitionSignature,
    chartPhase,
    durationMs,
    enabled,
    reducedMotion,
  ]);

  const activePoints = useMemo(() => animatedPoints
    ? interpolateSeriesPathPoints(animatedPoints, targetPoints, 0)
    : targetPoints, [animatedPoints, targetPoints]);
  const pathD = useMemo(
    () => seriesPathFromPoints(activePoints, curve),
    [activePoints, curve]
  );

  return {
    points: activePoints,
    pathD,
    isPathAnimating: animatedPoints != null,
  };
}
