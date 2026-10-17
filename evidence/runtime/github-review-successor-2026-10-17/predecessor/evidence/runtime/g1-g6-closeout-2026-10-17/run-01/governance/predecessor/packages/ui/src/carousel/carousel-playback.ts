import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import type { CarouselApi } from "./carousel";

export type CarouselPlaybackConfig =
  | { mode: "autoplay"; delay?: number; direction?: "forward" | "reverse"; start?: boolean }
  | { mode: "continuous"; speed?: number; direction?: "forward" | "reverse"; start?: boolean };
export type CarouselPlaybackStatus = "manual" | "playing" | "paused" | "hover-paused" | "hidden-paused" | "unavailable";
export type CarouselPlaybackState = {
  mode: "manual" | "autoplay" | "continuous";
  enabled: boolean;
  isPlaying: boolean;
  available: boolean;
  status: CarouselPlaybackStatus;
  play: () => void;
  pause: () => void;
  getProgress: () => number;
};
export function validateCarouselPlayback(config?: CarouselPlaybackConfig) {
  if (!config) return;
  const value = config.mode === "autoplay" ? config.delay ?? 5000 : config.speed ?? 36;
  if (!Number.isFinite(value) || value <= 0) throw new RangeError("Carousel playback delay/speed must be a finite positive number.");
}
export function createCarouselAutoScroll(config?: CarouselPlaybackConfig) {
  if (config?.mode !== "continuous") return undefined;
  // Locked Embla 8.5.2 integrates at 60 fixed time steps/s. Public speed is px/s.
  return AutoScroll({ speed: (config.speed ?? 36) / 60, direction: config.direction === "reverse" ? "backward" : "forward",
    startDelay: 0, playOnInit: false, stopOnInteraction: true, stopOnMouseEnter: false, stopOnFocusIn: false });
}
const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** One playback intent; temporary visibility/hover reasons never overwrite user pause. */
export function useCarouselPlayback(api: CarouselApi, region: RefObject<HTMLDivElement | null>, config: CarouselPlaybackConfig | undefined,
  plugin: ReturnType<typeof AutoScroll> | undefined, selectedIndex: number, revision: number, canNavigate: boolean) {
  const mode = config?.mode ?? "manual", order = config?.direction ?? "forward", start = config?.start ?? true;
  const delay = config?.mode === "autoplay" ? config.delay ?? 5000 : 0;
  const [enabled, setEnabled] = useState(() => mode !== "manual" && start && !prefersReducedMotion());
  const [hovered, setHovered] = useState(false), [visible, setVisible] = useState(true), [foreground, setForeground] = useState(() => typeof document === "undefined" || !document.hidden);
  const elapsed = useRef(0), started = useRef<number | null>(null), timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const available = mode !== "manual" && canNavigate;
  const isPlaying = available && enabled && !hovered && visible && foreground;
  const clearTimer = useCallback(() => { if (timer.current !== null) clearTimeout(timer.current); timer.current = null; }, []);
  const stopIntent = useCallback(() => { clearTimer(); started.current = null; elapsed.current = 0; setEnabled(false); }, [clearTimer]);
  const pause = useCallback(() => { stopIntent(); plugin?.stop(); }, [stopIntent, plugin]);
  const play = useCallback(() => {
    if (!available || !api || !(order === "reverse" ? api.canScrollPrev() : api.canScrollNext())) return;
    elapsed.current = 0; started.current = null; setEnabled(true);
  }, [available, api, order]);
  useEffect(() => {
    clearTimer(); plugin?.stop(); elapsed.current = 0; started.current = null;
    setEnabled(mode !== "manual" && start && !prefersReducedMotion());
  }, [mode, order, start, delay, plugin, clearTimer]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => { if (media.matches) pause(); };
    const background = () => setForeground(!document.hidden);
    media.addEventListener("change", reduce); document.addEventListener("visibilitychange", background);
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0.15 });
    if (region.current) observer.observe(region.current);
    return () => { media.removeEventListener("change", reduce); document.removeEventListener("visibilitychange", background); observer.disconnect(); };
  }, [region, pause]);
  useEffect(() => {
    if (!api) return;
    api.on("pointerDown", pause).on("slideFocusStart", pause);
    return () => { api.off("pointerDown", pause).off("slideFocusStart", pause); };
  }, [api, pause]);
  const previousSelection = useRef(selectedIndex), previousRevision = useRef(revision);
  useEffect(() => {
    if (previousSelection.current !== selectedIndex || previousRevision.current !== revision) elapsed.current = 0;
    previousSelection.current = selectedIndex; previousRevision.current = revision;
    if (mode !== "autoplay" || !api || !isPlaying) return;
    if (!(order === "reverse" ? api.canScrollPrev() : api.canScrollNext())) { pause(); return; }
    started.current = performance.now();
    timer.current = setTimeout(() => {
      timer.current = null; elapsed.current = 0; started.current = null;
      if (order === "reverse" ? api.canScrollPrev() : api.canScrollNext()) order === "reverse" ? api.scrollPrev() : api.scrollNext();
      else pause();
    }, Math.max(0, delay - elapsed.current));
    return () => {
      clearTimer();
      if (started.current !== null) elapsed.current = Math.min(delay, elapsed.current + performance.now() - started.current);
      started.current = null;
    };
  }, [api, mode, order, delay, isPlaying, selectedIndex, revision, pause, clearTimer]);
  useEffect(() => {
    if (!api || !plugin) return;
    if (isPlaying) plugin.play(0); else plugin.stop();
    // AutoScroll 8.5.2 emits stop before clearing its active flag. Do not stop it recursively.
    const stopAtEdge = () => { if (!(order === "reverse" ? api.canScrollPrev() : api.canScrollNext())) stopIntent(); };
    api.on("autoScroll:stop", stopAtEdge);
    return () => { api.off("autoScroll:stop", stopAtEdge); plugin.stop(); };
  }, [api, plugin, order, isPlaying, revision, stopIntent]);
  useEffect(() => () => { clearTimer(); plugin?.stop(); }, [plugin, clearTimer]);
  const getProgress = useCallback(() => mode === "autoplay"
    ? Math.min(1, (elapsed.current + (started.current === null ? 0 : performance.now() - started.current)) / delay) : 0, [mode, delay]);
  const status: CarouselPlaybackStatus = mode === "manual" ? "manual" : !available ? "unavailable" : !enabled ? "paused"
    : hovered ? "hover-paused" : !visible || !foreground ? "hidden-paused" : "playing";
  return { state: { mode, enabled, isPlaying, available, status, play, pause, getProgress } satisfies CarouselPlaybackState,
    hover: { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) } };
}
