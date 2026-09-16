declare const process: {
  env: Record<string, string | undefined>;
  execPath: string;
};

declare class Buffer extends Uint8Array {
  static alloc(size: number): Buffer;
  static byteLength(source: string, encoding?: string): number;
  static compare(left: Uint8Array, right: Uint8Array): number;
  static concat(list: readonly Uint8Array[]): Buffer;
  static from(source: string, encoding?: string): Buffer;
  static from(source: readonly number[] | Uint8Array): Buffer;
  static isBuffer(value: unknown): value is Buffer;
  copy(target: Buffer): number;
  readUInt32BE(offset: number): number;
  toString(encoding?: string): string;
  write(source: string, offset: number, encoding: string): number;
  writeUInt32BE(value: number, offset?: number): number;
}

declare module "node:crypto" {
  export type Hash = {
    digest(encoding: "hex"): string;
    update(data: string | Uint8Array): Hash;
  };

  export function createHash(algorithm: string): Hash;
}

declare module "node:child_process" {
  export type SpawnSyncResult = {
    error?: Error;
    status: number | null;
    stderr: string;
    stdout: string;
  };

  export function spawnSync(
    command: string,
    args: readonly string[],
    options?: {
      cwd?: string;
      encoding?: "utf8";
      env?: Record<string, string | undefined>;
      maxBuffer?: number;
      timeout?: number;
    },
  ): SpawnSyncResult;
}

declare module "node:fs" {
  export function cpSync(
    source: string,
    destination: string,
    options?: {
      recursive?: boolean;
      filter?: (source: string, destination: string) => boolean;
    },
  ): void;
  export function existsSync(path: string): boolean;
  export function mkdirSync(
    path: string,
    options?: { recursive?: boolean },
  ): string | undefined;
  export function mkdtempSync(prefix: string): string;
  export function readFileSync(path: string): Buffer;
  export function readFileSync(path: string, encoding: "utf8"): string;
  export function readdirSync(path: string): string[];
  export function renameSync(oldPath: string, newPath: string): void;
  export function rmSync(
    path: string,
    options?: { force?: boolean; recursive?: boolean },
  ): void;
  export function symlinkSync(
    target: string,
    path: string,
    type?: "dir" | "file" | "junction",
  ): void;
  export function writeFileSync(path: string, data: string | Uint8Array): void;
}

declare module "node:os" {
  export function tmpdir(): string;
}

declare module "node:path" {
  export function dirname(path: string): string;
  export function join(...paths: string[]): string;
  export function relative(from: string, to: string): string;
  export function resolve(...paths: string[]): string;
}

declare module "node:url" {
  export function fileURLToPath(url: string | URL): string;
}
