import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useComposerVoice } from "./use-composer-voice";
import type { ComposerTranscribe } from "./types";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

class Recorder {
  static instances: Recorder[] = [];
  static isTypeSupported = vi.fn((type: string) => type === "audio/mp4");
  state: RecordingState = "inactive";
  mimeType: string;
  ondataavailable: ((event: { data: Blob }) => void) | null = null;
  onstop: (() => void) | null = null;
  onerror: (() => void) | null = null;
  start = vi.fn(() => { this.state = "recording"; });
  stop = vi.fn(() => {
    this.state = "inactive";
    this.ondataavailable?.({ data: new Blob(["recorded voice"], { type: this.mimeType }) });
    this.onstop?.();
  });
  constructor(_stream: MediaStream, options?: MediaRecorderOptions) {
    this.mimeType = options?.mimeType ?? "audio/browser-default";
    Recorder.instances.push(this);
  }
}

function mediaStream() {
  const stop = vi.fn();
  return { stream: { getTracks: () => [{ stop }] } as unknown as MediaStream, stop };
}

describe("useComposerVoice", () => {
  let getUserMedia: ReturnType<typeof vi.fn>;
  let originalMediaDevices: PropertyDescriptor | undefined;

  beforeEach(() => {
    Recorder.instances = [];
    Recorder.isTypeSupported.mockReset().mockImplementation(type => type === "audio/mp4");
    getUserMedia = vi.fn();
    originalMediaDevices = Object.getOwnPropertyDescriptor(navigator, "mediaDevices");
    Object.defineProperty(navigator, "mediaDevices", { configurable: true, value: { getUserMedia } });
    vi.stubGlobal("MediaRecorder", Recorder);
  });

  afterEach(() => {
    if (originalMediaDevices) Object.defineProperty(navigator, "mediaDevices", originalMediaDevices);
    else Reflect.deleteProperty(navigator, "mediaDevices");
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  function setup(transcribe: ComposerTranscribe = vi.fn(async () => "识别文字")) {
    const onTranscript = vi.fn();
    const getSelectionEnd = vi.fn((): number | null => 3);
    const initialProps: { conversationId: string; draftRevision: number; enabled?: boolean } = { conversationId: "conversation-a", draftRevision: 1 };
    const hook = renderHook(
      ({ conversationId, draftRevision, enabled }: { conversationId: string; draftRevision: number; enabled?: boolean }) => useComposerVoice({ conversationId, draftRevision, enabled, transcribe, onTranscript, getSelectionEnd }),
      { initialProps },
    );
    return { ...hook, onTranscript, getSelectionEnd };
  }

  it("counts actual recording time without including permission or final-data delays", async () => {
    vi.useFakeTimers();
    const permission = deferred<MediaStream>(), transcript = deferred<string>();
    getUserMedia.mockReturnValue(permission.promise);
    const { result } = setup(vi.fn(() => transcript.promise));
    let start!: Promise<void>;
    act(() => { start = result.current.start(); });
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.elapsedSeconds).toBe(0);
    await act(async () => { permission.resolve(mediaStream().stream); await start; });
    act(() => vi.advanceTimersByTime(2500));
    expect(result.current.elapsedSeconds).toBe(2);

    const recorder = Recorder.instances[0]!;
    recorder.stop.mockImplementation(() => { recorder.state = "inactive"; });
    act(() => result.current.stop());
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.elapsedSeconds).toBe(2);
    expect(vi.getTimerCount()).toBe(0);
    act(() => {
      recorder.ondataavailable?.({ data: new Blob(["final voice"], { type: recorder.mimeType }) });
      recorder.onstop?.();
    });
    expect(result.current.status).toBe("transcribing");
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.elapsedSeconds).toBe(2);
    await act(async () => { transcript.resolve("转写文字"); });
    expect(result.current.elapsedSeconds).toBe(2);
    await act(async () => result.current.start());
    expect(result.current.elapsedSeconds).toBe(0);
  });

  it("retains recording duration through failed transcription and retry until discarded", async () => {
    vi.useFakeTimers();
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const retry = deferred<string>();
    const transcribe = vi.fn<ComposerTranscribe>().mockRejectedValueOnce(new Error("unavailable")).mockReturnValueOnce(retry.promise);
    const { result } = setup(transcribe);
    await act(async () => result.current.start());
    act(() => vi.advanceTimersByTime(3400));
    await act(async () => result.current.stop());
    expect(result.current.status).toBe("retained");
    expect(result.current.elapsedSeconds).toBe(3);
    act(() => result.current.retry());
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.elapsedSeconds).toBe(3);
    act(() => result.current.cancel());
    expect(result.current.elapsedSeconds).toBe(3);
    act(() => result.current.discard());
    expect(result.current.elapsedSeconds).toBe(0);
    await act(async () => { retry.resolve("迟到文字"); });
    expect(result.current.elapsedSeconds).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it.each(["cancel", "switch", "disable", "unmount"])("cleans up the recording clock on %s", async action => {
    vi.useFakeTimers();
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const { result, rerender, unmount } = setup();
    await act(async () => result.current.start());
    act(() => vi.advanceTimersByTime(2200));
    expect(result.current.elapsedSeconds).toBe(2);
    const recorder = Recorder.instances[0]!;
    const finish = recorder.onstop;
    if (action === "cancel") act(() => result.current.cancel());
    else if (action === "switch") rerender({ conversationId: "conversation-b", draftRevision: 1 });
    else if (action === "disable") rerender({ conversationId: "conversation-a", draftRevision: 1, enabled: false });
    else unmount();
    expect(vi.getTimerCount()).toBe(0);
    act(() => { finish?.(); vi.advanceTimersByTime(5000); });
    if (action !== "unmount") expect(result.current.elapsedSeconds).toBe(0);
  });

  it("requests the microphone only after start and uses a supported actual MIME", async () => {
    const { stream, stop } = mediaStream();
    getUserMedia.mockResolvedValue(stream);
    const transcribe = vi.fn<ComposerTranscribe>(async () => "识别文字");
    const { result, onTranscript, getSelectionEnd } = setup(transcribe);
    expect(result.current.available).toBe(true);
    expect(getUserMedia).not.toHaveBeenCalled();
    await act(async () => result.current.start());
    expect(getUserMedia).toHaveBeenCalledWith({ audio: true });
    expect(result.current.status).toBe("recording");
    expect(Recorder.instances[0]?.mimeType).toBe("audio/mp4");
    getSelectionEnd.mockReturnValue(20);
    await act(async () => result.current.stop());
    expect(transcribe).toHaveBeenCalledWith(expect.any(Blob), { signal: expect.any(AbortSignal), mimeType: "audio/mp4" });
    expect(transcribe.mock.calls[0]![0].type).toBe("audio/mp4");
    expect(stop).toHaveBeenCalledTimes(1);
    expect(onTranscript).toHaveBeenCalledWith("识别文字", 3);
    expect(result.current.status).toBe("idle");
  });

  it("uses the browser default when no MIME probe is supported", async () => {
    Recorder.isTypeSupported.mockReturnValue(false);
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const transcribe = vi.fn<ComposerTranscribe>(async () => "文字");
    const { result } = setup(transcribe);
    await act(async () => result.current.start());
    await act(async () => result.current.stop());
    expect(transcribe.mock.calls[0]![1].mimeType).toBe("audio/browser-default");
  });

  it("reports missing capability without requesting a microphone", async () => {
    const { result } = renderHook(() => useComposerVoice({ conversationId: "a", draftRevision: 1, getSelectionEnd: () => null, onTranscript: vi.fn() }));
    expect(result.current.available).toBe(false);
    await act(async () => result.current.start());
    expect(getUserMedia).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");
  });

  it.each(["NotAllowedError", "NotFoundError"])("keeps text available when microphone fails with %s", async name => {
    getUserMedia.mockRejectedValue(new DOMException("unavailable", name));
    const { result } = setup();
    await act(async () => result.current.start());
    expect(result.current.status).toBe("idle");
    expect(result.current.notice).not.toBe("");
    act(() => result.current.clearNotice());
    expect(result.current.notice).toBe("");
  });

  it("stops a permission result arriving after cancellation without recording", async () => {
    const permission = deferred<MediaStream>();
    const { stream, stop } = mediaStream();
    getUserMedia.mockReturnValue(permission.promise);
    const { result, onTranscript } = setup();
    let pending!: Promise<void>;
    act(() => { pending = result.current.start(); });
    expect(result.current.status).toBe("requesting");
    act(() => result.current.cancel());
    await act(async () => { permission.resolve(stream); await pending; });
    expect(stop).toHaveBeenCalledTimes(1);
    expect(Recorder.instances).toHaveLength(0);
    expect(onTranscript).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");
  });

  it("discards a canceled recording and releases recorder and tracks", async () => {
    const { stream, stop } = mediaStream();
    getUserMedia.mockResolvedValue(stream);
    const transcribe = vi.fn(async () => "文字");
    const { result } = setup(transcribe);
    await act(async () => result.current.start());
    act(() => result.current.cancel());
    expect(Recorder.instances[0]?.stop).toHaveBeenCalledTimes(1);
    expect(stop).toHaveBeenCalledTimes(1);
    expect(transcribe).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");
  });

  it("releases the microphone immediately while waiting for asynchronous final recording data", async () => {
    const { stream, stop } = mediaStream();
    getUserMedia.mockResolvedValue(stream);
    const pending = deferred<string>();
    const transcribe = vi.fn<ComposerTranscribe>().mockReturnValue(pending.promise);
    const { result, onTranscript } = setup(transcribe);
    await act(async () => result.current.start());
    const recorder = Recorder.instances[0]!;
    recorder.stop.mockImplementation(() => { recorder.state = "inactive"; });
    act(() => { result.current.stop(); result.current.stop(); });
    expect(stop).toHaveBeenCalledTimes(1);
    expect(recorder.stop).toHaveBeenCalledTimes(1);
    expect(transcribe).not.toHaveBeenCalled();

    act(() => {
      recorder.ondataavailable?.({ data: new Blob(["final voice"], { type: recorder.mimeType }) });
      recorder.onstop?.();
    });
    expect(result.current.status).toBe("transcribing");
    expect(transcribe).toHaveBeenCalledTimes(1);
    expect(stop).toHaveBeenCalledTimes(1);
    await act(async () => { pending.resolve("完成的文字"); });
    expect(onTranscript).toHaveBeenCalledWith("完成的文字", 3);
  });

  it("discards asynchronous final recording events when canceled after ending recording", async () => {
    const { stream, stop } = mediaStream();
    getUserMedia.mockResolvedValue(stream);
    const transcribe = vi.fn<ComposerTranscribe>(async () => "不应回填");
    const { result, onTranscript } = setup(transcribe);
    await act(async () => result.current.start());
    const recorder = Recorder.instances[0]!;
    recorder.stop.mockImplementation(() => { recorder.state = "inactive"; });
    const deliverData = recorder.ondataavailable, finish = recorder.onstop;
    act(() => result.current.stop());
    act(() => result.current.cancel());
    await act(async () => {
      deliverData?.({ data: new Blob(["late voice"], { type: recorder.mimeType }) });
      finish?.();
    });
    expect(stop).toHaveBeenCalledTimes(1);
    expect(transcribe).not.toHaveBeenCalled();
    expect(onTranscript).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");
  });

  it("retains asynchronous final data if the draft changes before the recording stop event", async () => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const transcribe = vi.fn<ComposerTranscribe>(async () => "新位置文字");
    const { result, rerender, onTranscript, getSelectionEnd } = setup(transcribe);
    await act(async () => result.current.start());
    const recorder = Recorder.instances[0]!;
    recorder.stop.mockImplementation(() => { recorder.state = "inactive"; });
    act(() => result.current.stop());
    rerender({ conversationId: "conversation-a", draftRevision: 2 });
    act(() => {
      recorder.ondataavailable?.({ data: new Blob(["retained voice"], { type: recorder.mimeType }) });
      recorder.onstop?.();
    });
    expect(result.current.status).toBe("retained");
    expect(transcribe).not.toHaveBeenCalled();
    getSelectionEnd.mockReturnValue(9);
    await act(async () => result.current.retry());
    expect(onTranscript).toHaveBeenCalledWith("新位置文字", 9);
    expect(getUserMedia).toHaveBeenCalledTimes(1);
  });

  it("permits only one recording attempt across rapid repeated starts", async () => {
    const permission = deferred<MediaStream>();
    getUserMedia.mockReturnValue(permission.promise);
    const { result } = setup();
    let first!: Promise<void>;
    act(() => { first = result.current.start(); void result.current.start(); });
    expect(getUserMedia).toHaveBeenCalledTimes(1);
    await act(async () => { permission.resolve(mediaStream().stream); await first; });
    await act(async () => result.current.start());
    expect(Recorder.instances).toHaveLength(1);
    expect(getUserMedia).toHaveBeenCalledTimes(1);
  });

  it("refuses to start while disabled without changing technical availability", async () => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const { result, rerender } = setup();
    rerender({ conversationId: "conversation-a", draftRevision: 1, enabled: false });
    expect(result.current.available).toBe(true);
    await act(async () => result.current.start());
    expect(getUserMedia).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");
    rerender({ conversationId: "conversation-a", draftRevision: 1, enabled: true });
    await act(async () => result.current.start());
    expect(result.current.status).toBe("recording");
  });

  it("cancels a pending microphone request when disabled and closes late tracks", async () => {
    const permission = deferred<MediaStream>(), late = mediaStream();
    getUserMedia.mockReturnValue(permission.promise);
    const { result, rerender } = setup();
    let pending!: Promise<void>;
    act(() => { pending = result.current.start(); });
    rerender({ conversationId: "conversation-a", draftRevision: 1, enabled: false });
    expect(result.current.status).toBe("idle");
    await act(async () => { permission.resolve(late.stream); await pending; });
    expect(late.stop).toHaveBeenCalledTimes(1);
    expect(Recorder.instances).toHaveLength(0);
  });

  it("discards an active recording and stops its resources when disabled", async () => {
    const { stream, stop } = mediaStream();
    getUserMedia.mockResolvedValue(stream);
    const transcribe = vi.fn<ComposerTranscribe>();
    const { result, rerender } = setup(transcribe);
    await act(async () => result.current.start());
    rerender({ conversationId: "conversation-a", draftRevision: 1, enabled: false });
    expect(stop).toHaveBeenCalledTimes(1);
    expect(Recorder.instances[0]?.stop).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe("idle");
    expect(transcribe).not.toHaveBeenCalled();
  });

  it("retains audio when disabled during transcription and permits retry only after re-enabling", async () => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const first = deferred<string>();
    const transcribe = vi.fn<ComposerTranscribe>().mockReturnValueOnce(first.promise).mockResolvedValueOnce("恢复文字");
    const { result, rerender, onTranscript } = setup(transcribe);
    await act(async () => result.current.start());
    act(() => result.current.stop());
    rerender({ conversationId: "conversation-a", draftRevision: 1, enabled: false });
    expect(transcribe.mock.calls[0]![1].signal.aborted).toBe(true);
    expect(result.current.status).toBe("retained");
    await act(async () => { first.resolve("禁用后的迟到文字"); });
    expect(onTranscript).not.toHaveBeenCalled();
    act(() => result.current.retry());
    expect(transcribe).toHaveBeenCalledTimes(1);
    rerender({ conversationId: "conversation-a", draftRevision: 1, enabled: true });
    await act(async () => result.current.retry());
    expect(transcribe.mock.calls[1]![0]).toBe(transcribe.mock.calls[0]![0]);
    expect(onTranscript).toHaveBeenCalledWith("恢复文字", 3);
  });

  it("stops a superseded permission result without changing a newer recording", async () => {
    const permission = deferred<MediaStream>(), old = mediaStream(), fresh = mediaStream();
    getUserMedia.mockReturnValueOnce(permission.promise).mockResolvedValueOnce(fresh.stream);
    const { result } = setup();
    let first!: Promise<void>;
    act(() => { first = result.current.start(); });
    act(() => result.current.cancel());
    await act(async () => result.current.start());
    await act(async () => { permission.resolve(old.stream); await first; });
    expect(old.stop).toHaveBeenCalledTimes(1);
    expect(fresh.stop).not.toHaveBeenCalled();
    expect(result.current.status).toBe("recording");
    expect(Recorder.instances).toHaveLength(1);
  });

  it("retains failed audio and retries the same Blob at the current selection", async () => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const transcribe = vi.fn<ComposerTranscribe>().mockRejectedValueOnce(new Error("服务暂不可用")).mockResolvedValueOnce("重试文字");
    const { result, rerender, onTranscript, getSelectionEnd } = setup(transcribe);
    await act(async () => result.current.start());
    await act(async () => result.current.stop());
    expect(result.current.status).toBe("retained");
    expect(result.current.notice).toContain("录音已保留");
    const originalBlob = transcribe.mock.calls[0]![0];
    rerender({ conversationId: "conversation-a", draftRevision: 2 });
    getSelectionEnd.mockReturnValue(8);
    await act(async () => result.current.retry());
    expect(transcribe.mock.calls[1]![0]).toBe(originalBlob);
    expect(onTranscript).toHaveBeenCalledWith("重试文字", 8);
    expect(result.current.status).toBe("idle");
    expect(getUserMedia).toHaveBeenCalledTimes(1);
  });

  it.each(["", "  \n\t"])("retains audio when transcription contains no text (%j)", async text => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const { result, onTranscript } = setup(vi.fn(async () => text));
    await act(async () => result.current.start());
    await act(async () => result.current.stop());
    expect(result.current.status).toBe("retained");
    expect(result.current.notice).toBe("未识别到文字，录音已保留");
    expect(onTranscript).not.toHaveBeenCalled();
  });

  it("keeps canceled transcription and retry audio until explicitly discarded", async () => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const first = deferred<string>(), second = deferred<string>(), third = deferred<string>();
    const transcribe = vi.fn<ComposerTranscribe>().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise).mockReturnValueOnce(third.promise);
    const { result, onTranscript } = setup(transcribe);
    await act(async () => result.current.start());
    act(() => result.current.stop());
    expect(result.current.status).toBe("transcribing");
    act(() => result.current.cancel());
    expect(transcribe.mock.calls[0]![1].signal.aborted).toBe(true);
    expect(result.current.status).toBe("retained");
    act(() => result.current.retry());
    act(() => result.current.cancel());
    expect(transcribe.mock.calls[1]![1].signal.aborted).toBe(true);
    expect(result.current.status).toBe("retained");
    await act(async () => { first.resolve("过期一"); second.resolve("过期二"); });
    expect(onTranscript).not.toHaveBeenCalled();
    act(() => result.current.retry());
    expect(transcribe.mock.calls[2]![0]).toBe(transcribe.mock.calls[0]![0]);
    act(() => result.current.discard());
    expect(transcribe.mock.calls[2]![1].signal.aborted).toBe(true);
    await act(async () => { third.resolve("已丢弃"); });
    expect(onTranscript).not.toHaveBeenCalled();
    expect(result.current.status).toBe("idle");
    act(() => result.current.retry());
    expect(transcribe).toHaveBeenCalledTimes(3);
  });

  it("blocks starting another recording while retained audio exists", async () => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const { result } = setup(vi.fn(async () => " "));
    await act(async () => result.current.start());
    await act(async () => result.current.stop());
    await act(async () => result.current.start());
    expect(getUserMedia).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe("retained");
    act(() => result.current.discard());
    await act(async () => result.current.start());
    expect(getUserMedia).toHaveBeenCalledTimes(2);
  });

  it("preserves audio when the draft changes during transcription and ignores the late result", async () => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const first = deferred<string>();
    const transcribe = vi.fn<ComposerTranscribe>().mockReturnValueOnce(first.promise).mockResolvedValueOnce("新稿位置");
    const { result, rerender, onTranscript, getSelectionEnd } = setup(transcribe);
    await act(async () => result.current.start());
    act(() => result.current.stop());
    rerender({ conversationId: "conversation-a", draftRevision: 2 });
    expect(result.current.status).toBe("retained");
    expect(transcribe.mock.calls[0]![1].signal.aborted).toBe(true);
    await act(async () => { first.resolve("旧稿位置"); });
    expect(onTranscript).not.toHaveBeenCalled();
    getSelectionEnd.mockReturnValue(null);
    await act(async () => result.current.retry());
    expect(onTranscript).toHaveBeenCalledWith("新稿位置", null);
  });

  it("cleans up on conversation switch and never writes old transcription into either conversation", async () => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const pending = deferred<string>();
    const transcribe = vi.fn<ComposerTranscribe>().mockReturnValue(pending.promise);
    const { result, rerender, onTranscript } = setup(transcribe);
    await act(async () => result.current.start());
    act(() => result.current.stop());
    rerender({ conversationId: "conversation-b", draftRevision: 1 });
    expect(transcribe.mock.calls[0]![1].signal.aborted).toBe(true);
    expect(result.current.status).toBe("idle");
    await act(async () => { pending.resolve("旧会话"); });
    expect(onTranscript).not.toHaveBeenCalled();
    act(() => result.current.retry());
    expect(transcribe).toHaveBeenCalledTimes(1);
  });

  it("stops recording when switching conversations and discards that audio", async () => {
    const { stream, stop } = mediaStream();
    getUserMedia.mockResolvedValue(stream);
    const transcribe = vi.fn<ComposerTranscribe>();
    const { result, rerender } = setup(transcribe);
    await act(async () => result.current.start());
    rerender({ conversationId: "conversation-b", draftRevision: 1 });
    expect(stop).toHaveBeenCalledTimes(1);
    expect(Recorder.instances[0]?.stop).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe("idle");
    expect(transcribe).not.toHaveBeenCalled();
    act(() => result.current.retry());
    expect(transcribe).not.toHaveBeenCalled();
  });

  it("retains completed audio when the host changes the draft during recording", async () => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const transcribe = vi.fn<ComposerTranscribe>().mockResolvedValue("新位置文字");
    const { result, rerender, onTranscript } = setup(transcribe);
    await act(async () => result.current.start());
    rerender({ conversationId: "conversation-a", draftRevision: 2 });
    expect(result.current.status).toBe("retained");
    expect(transcribe).not.toHaveBeenCalled();
    await act(async () => result.current.retry());
    expect(onTranscript).toHaveBeenCalledWith("新位置文字", 3);
  });

  it("aborts transcription on unmount and ignores its eventual success", async () => {
    getUserMedia.mockResolvedValue(mediaStream().stream);
    const pending = deferred<string>();
    const transcribe = vi.fn<ComposerTranscribe>().mockReturnValue(pending.promise);
    const { result, unmount, onTranscript } = setup(transcribe);
    await act(async () => result.current.start());
    act(() => result.current.stop());
    unmount();
    expect(transcribe.mock.calls[0]![1].signal.aborted).toBe(true);
    await act(async () => { pending.resolve("迟到结果"); });
    expect(onTranscript).not.toHaveBeenCalled();
  });

  it("stops recording resources on unmount and ignores late permissions", async () => {
    const first = mediaStream();
    getUserMedia.mockResolvedValueOnce(first.stream);
    const recording = setup();
    await act(async () => recording.result.current.start());
    recording.unmount();
    expect(first.stop).toHaveBeenCalledTimes(1);
    expect(Recorder.instances[0]?.stop).toHaveBeenCalledTimes(1);

    const permission = deferred<MediaStream>(), late = mediaStream();
    getUserMedia.mockReturnValueOnce(permission.promise);
    const requesting = setup();
    let pending!: Promise<void>;
    act(() => { pending = requesting.result.current.start(); });
    requesting.unmount();
    await act(async () => { permission.resolve(late.stream); await pending; });
    expect(late.stop).toHaveBeenCalledTimes(1);
    expect(Recorder.instances).toHaveLength(1);
  });
});
