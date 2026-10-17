import { useEffect, useRef, useState } from "react";
import type { ComposerTranscribe } from "./types";

export type ComposerVoiceOptions = {
  conversationId: string;
  draftRevision: number;
  enabled?: boolean;
  transcribe?: ComposerTranscribe;
  getSelectionEnd: () => number | null;
  onTranscript: (text: string, selectionEnd: number | null) => void;
};

export type ComposerVoiceStatus = "idle" | "requesting" | "recording" | "transcribing" | "retained";

type Attempt = { id: number; conversationId: string; draftRevision: number; selectionEnd: number | null };
type Recording = Attempt & { stream?: MediaStream; recorder?: MediaRecorder; chunks: Blob[]; stopping: boolean; startedAt?: number; timer?: ReturnType<typeof setInterval> };
type Transcription = Attempt & { controller: AbortController };

const mimeCandidates = ["audio/webm;codecs=opus", "audio/ogg;codecs=opus", "audio/mp4", "audio/webm", "audio/ogg"];
const changedDraftNotice = "草稿已更新，录音已保留，请重试转写";
const pausedNotice = "语音输入已暂停，录音已保留";

function stopTracks(recording: Recording) {
  recording.stream?.getTracks().forEach(track => track.stop());
  recording.stream = undefined;
}

function releaseRecording(recording: Recording) {
  clearInterval(recording.timer);
  recording.timer = undefined;
  const recorder = recording.recorder;
  if (recorder) {
    recorder.ondataavailable = null;
    recorder.onstop = null;
    recorder.onerror = null;
    if (recorder.state !== "inactive") {
      try { recorder.stop(); } catch { /* The device may already have stopped. */ }
    }
  }
  stopTracks(recording);
}

function microphoneNotice(error: unknown) {
  const name = error instanceof Error ? error.name : "";
  if (name === "NotAllowedError" || name === "SecurityError") return "未获得麦克风权限，可继续输入文字";
  if (name === "NotFoundError" || name === "DevicesNotFoundError") return "未找到麦克风，可继续输入文字";
  return "麦克风暂不可用，可继续输入文字";
}

export function useComposerVoice(options: ComposerVoiceOptions) {
  const [status, setStatus] = useState<ComposerVoiceStatus>("idle");
  const [notice, setNotice] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const latest = useRef(options);
  latest.current = options;
  const mounted = useRef(true);
  const phase = useRef<ComposerVoiceStatus>("idle");
  const attemptId = useRef(0);
  const recording = useRef<Recording | null>(null);
  const transcription = useRef<Transcription | null>(null);
  const retained = useRef<Blob | null>(null);
  const previousConversation = useRef(options.conversationId);
  const available = Boolean(options.transcribe && typeof navigator !== "undefined" && typeof navigator.mediaDevices?.getUserMedia === "function" && typeof MediaRecorder !== "undefined");

  function transition(next: ComposerVoiceStatus, message = "") {
    phase.current = next;
    if (mounted.current) { setStatus(next); setNotice(message); }
  }

  function captureAttempt(): Attempt {
    return { id: ++attemptId.current, conversationId: latest.current.conversationId, draftRevision: latest.current.draftRevision, selectionEnd: latest.current.getSelectionEnd() };
  }

  function matchesContext(attempt: Attempt) {
    return mounted.current && latest.current.enabled !== false && attempt.id === attemptId.current && attempt.conversationId === latest.current.conversationId && attempt.draftRevision === latest.current.draftRevision;
  }

  function abortTranscription() {
    const active = transcription.current;
    transcription.current = null;
    active?.controller.abort();
  }

  function disposeRecording() {
    const active = recording.current;
    recording.current = null;
    if (active) releaseRecording(active);
  }

  function updateElapsed(active: Recording) {
    if (mounted.current && recording.current === active && active.conversationId === latest.current.conversationId && active.startedAt !== undefined) {
      setElapsedSeconds(Math.floor((performance.now() - active.startedAt) / 1000));
    }
  }

  function finishRecordingClock(active: Recording) {
    updateElapsed(active);
    clearInterval(active.timer);
    active.timer = undefined;
    active.startedAt = undefined;
  }

  function discard() {
    ++attemptId.current;
    abortTranscription();
    disposeRecording();
    retained.current = null;
    if (mounted.current) setElapsedSeconds(0);
    transition("idle");
  }

  function keepAfterContextChange(active: Attempt) {
    if (active.conversationId !== latest.current.conversationId) {
      retained.current = null;
      if (mounted.current) setElapsedSeconds(0);
      transition("idle");
    } else transition("retained", latest.current.enabled === false ? pausedNotice : changedDraftNotice);
  }

  async function transcribeBlob(blob: Blob, attempt: Attempt) {
    const service = latest.current.transcribe;
    if (!service) { transition("retained", "转写服务暂不可用，录音已保留"); return; }
    const active: Transcription = { ...attempt, controller: new AbortController() };
    transcription.current = active;
    transition("transcribing");
    try {
      const text = await service(blob, { signal: active.controller.signal, mimeType: blob.type });
      if (!mounted.current || transcription.current !== active) return;
      transcription.current = null;
      if (!matchesContext(active)) { keepAfterContextChange(active); return; }
      if (!text.trim()) { transition("retained", "未识别到文字，录音已保留"); return; }
      retained.current = null;
      transition("idle");
      latest.current.onTranscript(text, active.selectionEnd);
    } catch {
      if (!mounted.current || transcription.current !== active) return;
      transcription.current = null;
      if (!matchesContext(active)) { keepAfterContextChange(active); return; }
      transition("retained", "转写失败，录音已保留，可重试转写");
    }
  }

  async function start() {
    if (phase.current !== "idle" || retained.current || !mounted.current || latest.current.enabled === false) return;
    if (!available) { transition("idle", "当前环境暂不支持语音输入，可继续输入文字"); return; }
    const active: Recording = { ...captureAttempt(), chunks: [], stopping: false };
    recording.current = active;
    setElapsedSeconds(0);
    transition("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      active.stream = stream;
      if (recording.current !== active || !matchesContext(active)) {
        stopTracks(active);
        if (recording.current === active) { recording.current = null; transition("idle"); }
        return;
      }
      const mimeType = typeof MediaRecorder.isTypeSupported === "function" ? mimeCandidates.find(type => MediaRecorder.isTypeSupported(type)) : undefined;
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      active.recorder = recorder;
      recorder.ondataavailable = event => { if (event.data.size) active.chunks.push(event.data); };
      recorder.onstop = () => {
        if (recording.current !== active) return;
        finishRecordingClock(active);
        const blob = new Blob(active.chunks, { type: recorder.mimeType || active.chunks[0]?.type || mimeType || "" });
        recording.current = null;
        releaseRecording(active);
        if (!mounted.current || active.id !== attemptId.current) return;
        if (!blob.size) { transition("idle", "没有录到声音，请重新录制"); return; }
        retained.current = blob;
        if (!matchesContext(active)) { keepAfterContextChange(active); return; }
        void transcribeBlob(blob, active);
      };
      recorder.onerror = () => {
        if (recording.current !== active) return;
        finishRecordingClock(active);
        recording.current = null;
        releaseRecording(active);
        transition("idle", "录音中断，请重新录制或继续输入文字");
      };
      recorder.start();
      active.startedAt = performance.now();
      active.timer = setInterval(() => updateElapsed(active), 1000);
      transition("recording");
    } catch (error) {
      releaseRecording(active);
      if (recording.current !== active) return;
      recording.current = null;
      if (matchesContext(active)) transition("idle", microphoneNotice(error));
      else transition("idle");
    }
  }

  function stop() {
    const active = recording.current;
    if (phase.current !== "recording" || !active?.recorder || active.stopping) return;
    active.stopping = true;
    finishRecordingClock(active);
    try { active.recorder.stop(); }
    catch { active.recorder.onerror?.(new ErrorEvent("error")); }
    stopTracks(active);
  }

  function cancel() {
    if (phase.current === "transcribing" && retained.current) {
      ++attemptId.current;
      abortTranscription();
      transition("retained", "已取消转写，录音已保留");
    } else if (phase.current === "requesting" || phase.current === "recording") discard();
  }

  function retry() {
    if (latest.current.enabled !== false && phase.current === "retained" && retained.current) void transcribeBlob(retained.current, captureAttempt());
  }

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      ++attemptId.current;
      abortTranscription();
      disposeRecording();
      retained.current = null;
    };
  }, []);

  useEffect(() => {
    if (previousConversation.current !== options.conversationId) {
      previousConversation.current = options.conversationId;
      discard();
      return;
    }
    if (options.enabled === false) {
      if (transcription.current) {
        ++attemptId.current;
        abortTranscription();
        transition("retained", pausedNotice);
      }
      if (recording.current) discard();
      return;
    }
    const activeTranscription = transcription.current;
    if (activeTranscription && !matchesContext(activeTranscription)) {
      ++attemptId.current;
      abortTranscription();
      transition("retained", changedDraftNotice);
    }
    const activeRecording = recording.current;
    if (activeRecording && !matchesContext(activeRecording)) {
      if (phase.current === "recording") stop();
      else discard();
    }
  }, [options.conversationId, options.draftRevision, options.enabled]);

  return { status, notice, elapsedSeconds, available, start, stop, cancel, retry, discard, clearNotice: () => setNotice("") };
}
