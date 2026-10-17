import type { AttachmentConstraints, AttachmentRecord, AttachmentRejection } from "../attachment-workflow/types";

export type ComposerReference = { id: string; name: string; availability: "available" | "unavailable"; unavailableReason?: string };
export type ComposerReply = { messageId: string; author: string; excerpt: string };
export type ComposerDraft = { text: string; references: ComposerReference[]; reply?: ComposerReply; sourceScope?: string };
export type ComposerSourceOption = { value: string; label: string; description?: string; disabledReason?: string };
export type ComposerSubmission = { status: "idle" } | { status: "pending"; message?: string } | { status: "failed"; message: string };
export type ComposerReferenceService = {
  query: (query: string, context: { signal: AbortSignal }) => Promise<ComposerReference[]>;
  resolve: (ids: string[], context: { signal: AbortSignal }) => Promise<ComposerReference[]>;
};
export type ComposerTranscribe = (blob: Blob, context: { signal: AbortSignal; mimeType: string }) => Promise<string>;
export type ComposerAttachments = {
  items: AttachmentRecord[];
  constraints?: AttachmentConstraints;
  rejections?: AttachmentRejection[];
  removingIds?: string[];
  onClearRejections?: () => void;
  onFiles: (files: readonly File[]) => void;
  onRetry: (id: string) => void;
  onCancel: (id: string) => void;
  onRemove: (id: string) => Promise<boolean>;
};
export type ConversationComposerProps = {
  conversationId: string;
  draft: ComposerDraft;
  draftRevision: number;
  onDraftChange: (draft: ComposerDraft) => void;
  surface?: "gray" | "white";
  layout?: "compact" | "expanded";
  onLayoutChange?: (layout: "compact" | "expanded") => void;
  "aria-label": string;
  formLabel?: string;
  placeholder?: string;
  sendLabel?: string;
  attachments?: ComposerAttachments;
  references?: ComposerReferenceService;
  sources?: ComposerSourceOption[];
  onLocateReply?: () => void;
  voice?: { transcribe: ComposerTranscribe; onPermissionHelp?: () => void };
  submission?: ComposerSubmission;
  submitBlockedReason?: string;
  onSubmit: () => void;
  generation?: { running: boolean; onStop: () => void };
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
};
