declare const process: {
  execPath: string;
};

declare class Buffer extends Uint8Array {
  static alloc(size: number): Buffer;
  static from(source: string | readonly number[] | Uint8Array): Buffer;
  copy(target: Buffer): number;
  write(source: string, offset: number, encoding: string): number;
  writeUInt32BE(value: number, offset: number): number;
}

declare module "node:child_process" {
  export type SpawnSyncResult = {
    status: number | null;
    stderr: string;
    stdout: string;
  };

  export function spawnSync(
    command: string,
    args: readonly string[],
    options: { cwd: string; encoding: "utf8" },
  ): SpawnSyncResult;
}

declare module "node:fs" {
  export function cpSync(
    source: string,
    destination: string,
    options?: {
      filter?: (source: string, destination: string) => boolean;
      recursive?: boolean;
    },
  ): void;
  export function existsSync(path: string): boolean;
  export function mkdirSync(
    path: string,
    options?: { recursive?: boolean },
  ): string | undefined;
  export function mkdtempSync(prefix: string): string;
  export function readFileSync(path: string, encoding: "utf8"): string;
  export function rmSync(
    path: string,
    options?: { force?: boolean; recursive?: boolean },
  ): void;
  export function writeFileSync(path: string, data: string): void;
}

declare module "node:os" {
  export function tmpdir(): string;
}

declare module "node:path" {
  export function dirname(path: string): string;
  export function join(...paths: string[]): string;
  export function resolve(...paths: string[]): string;
}

declare module "node:url" {
  export function fileURLToPath(url: string | URL): string;
}
