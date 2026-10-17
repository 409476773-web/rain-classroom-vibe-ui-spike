export type AttachmentUploadStatus = "idle" | "uploading" | "processing" | "error" | "canceled" | "done";
export type AttachmentAvailability = "available" | "processing" | "forbidden" | "missing" | "expired";
export type AttachmentOperation = "preview" | "download" | "open" | "remove" | "replace";

export type AttachmentReplacement = {
  file: File;
  status: AttachmentUploadStatus;
  progress?: number;
  error?: string;
};

/** A caller-owned resource. Upload, resource availability and action permissions are independent. */
export type AttachmentRecord = {
  id: string;
  name: string;
  size?: number;
  type?: string;
  file?: File;
  url?: string;
  previewUrl?: string;
  thumbnailUrl?: string;
  remoteId?: string;
  uploadedBy?: string;
  uploadedAt?: string;
  description?: string;
  status?: AttachmentUploadStatus;
  progress?: number;
  error?: string;
  availability?: AttachmentAvailability;
  availabilityMessage?: string;
  permissions?: Partial<Record<AttachmentOperation, boolean>>;
  permissionReasons?: Partial<Record<AttachmentOperation, string>>;
  replacement?: AttachmentReplacement;
};

export type AttachmentConstraints = {
  /** Native accept syntax: comma-separated extensions, MIME types, or MIME groups. */
  accept?: string;
  maxFiles?: number;
  maxFileSize?: number;
  maxTotalSize?: number;
  duplicates?: "reject" | "allow";
  validate?: (file: File) => string | undefined;
};
export type AttachmentRejectionCode = "empty" | "type" | "size" | "count" | "total-size" | "duplicate" | "custom";
export type AttachmentRejection = { file: File; code: AttachmentRejectionCode; reason: string };

export type AttachmentUploadResult = Pick<AttachmentRecord,
  "url" | "previewUrl" | "thumbnailUrl" | "remoteId" | "availability" | "availabilityMessage" | "uploadedBy" | "uploadedAt"
>;
export type AttachmentUploadContext = {
  id: string;
  signal: AbortSignal;
  replacing?: AttachmentRecord;
  /** Omit progress when total length is unknown; 100% is still not server processing completion. */
  onProgress: (percent?: number) => void;
  onProcessing: () => void;
};
export type AttachmentUploadHandler = (file: File, context: AttachmentUploadContext) => Promise<AttachmentUploadResult>;
export type AttachmentRemoveHandler = (attachment: AttachmentRecord, context: { signal: AbortSignal }) => void | Promise<void>;
