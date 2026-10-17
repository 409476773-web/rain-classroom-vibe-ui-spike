/** Rain Classic PNGs: 160px Figma export resampled to 240px; provenance is in source-assets.json. */
export const avatarAssets = {
  "default": new URL("./assets/default.png", import.meta.url).href,
  "student-01": new URL("./assets/student-01.png", import.meta.url).href,
  "student-02": new URL("./assets/student-02.png", import.meta.url).href,
  "student-03": new URL("./assets/student-03.png", import.meta.url).href,
  "student-04": new URL("./assets/student-04.png", import.meta.url).href,
  "student-05": new URL("./assets/student-05.png", import.meta.url).href,
  "student-06": new URL("./assets/student-06.png", import.meta.url).href,
  "student-07": new URL("./assets/student-07.png", import.meta.url).href,
  "student-08": new URL("./assets/student-08.png", import.meta.url).href,
  "student-09": new URL("./assets/student-09.png", import.meta.url).href,
  "student-10": new URL("./assets/student-10.png", import.meta.url).href,
  "student-11": new URL("./assets/student-11.png", import.meta.url).href,
  "student-12": new URL("./assets/student-12.png", import.meta.url).href,
  "student-13": new URL("./assets/student-13.png", import.meta.url).href,
  "student-14": new URL("./assets/student-14.png", import.meta.url).href,
  "student-15": new URL("./assets/student-15.png", import.meta.url).href,
  "student-16": new URL("./assets/student-16.png", import.meta.url).href,
  "student-17": new URL("./assets/student-17.png", import.meta.url).href,
  "student-18": new URL("./assets/student-18.png", import.meta.url).href,
  "student-19": new URL("./assets/student-19.png", import.meta.url).href,
  "student-20": new URL("./assets/student-20.png", import.meta.url).href,
  "student-21": new URL("./assets/student-21.png", import.meta.url).href,
  "student-22": new URL("./assets/student-22.png", import.meta.url).href,
  "student-23": new URL("./assets/student-23.png", import.meta.url).href,
  "student-24": new URL("./assets/student-24.png", import.meta.url).href,
  "student-25": new URL("./assets/student-25.png", import.meta.url).href,
  "teacher-01": new URL("./assets/teacher-01.png", import.meta.url).href,
  "teacher-02": new URL("./assets/teacher-02.png", import.meta.url).href,
  "teacher-03": new URL("./assets/teacher-03.png", import.meta.url).href,
  "teacher-04": new URL("./assets/teacher-04.png", import.meta.url).href,
  "teacher-05": new URL("./assets/teacher-05.png", import.meta.url).href,
  "teacher-06": new URL("./assets/teacher-06.png", import.meta.url).href,
  "teacher-07": new URL("./assets/teacher-07.png", import.meta.url).href,
  "teacher-08": new URL("./assets/teacher-08.png", import.meta.url).href,
  "teacher-09": new URL("./assets/teacher-09.png", import.meta.url).href,
  "teacher-10": new URL("./assets/teacher-10.png", import.meta.url).href,
  "teacher-11": new URL("./assets/teacher-11.png", import.meta.url).href,
  "teacher-12": new URL("./assets/teacher-12.png", import.meta.url).href,
  "teacher-13": new URL("./assets/teacher-13.png", import.meta.url).href,
  "teacher-14": new URL("./assets/teacher-14.png", import.meta.url).href,
  "teacher-15": new URL("./assets/teacher-15.png", import.meta.url).href,
  "teacher-16": new URL("./assets/teacher-16.png", import.meta.url).href,
  "teacher-17": new URL("./assets/teacher-17.png", import.meta.url).href,
  "teacher-18": new URL("./assets/teacher-18.png", import.meta.url).href,
  "teacher-19": new URL("./assets/teacher-19.png", import.meta.url).href,
  "teacher-20": new URL("./assets/teacher-20.png", import.meta.url).href,
  "teacher-21": new URL("./assets/teacher-21.png", import.meta.url).href,
  "teacher-22": new URL("./assets/teacher-22.png", import.meta.url).href,
  "teacher-23": new URL("./assets/teacher-23.png", import.meta.url).href,
  "teacher-24": new URL("./assets/teacher-24.png", import.meta.url).href,
  "teacher-25": new URL("./assets/teacher-25.png", import.meta.url).href,
} as const;
export type AvatarAssetId = keyof typeof avatarAssets;
export type AvatarAssetRole = "student" | "teacher";

/** Assign the complete member set before filtering. Persist the result if membership changes. */
export function assignAvatarAssets(keys: readonly string[], role: AvatarAssetRole): Record<string, AvatarAssetId> {
  if (!["student", "teacher"].includes(role)) throw new TypeError("Unknown avatar role");
  if (!Array.isArray(keys) || keys.some(key => typeof key !== "string" || !key.trim()) || new Set(keys).size !== keys.length) {
    throw new TypeError("Avatar member keys must be non-empty and unique");
  }
  const assigned: Record<string, AvatarAssetId> = Object.create(null);
  const used = new Set<number>();
  for (const key of [...keys].sort()) {
    let hash = 2166136261;
    const value = `${role}:${key}`;
    for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
    let index = (hash >>> 0) % 25;
    // ponytail: 25 portraits per role; larger sets intentionally reuse assets.
    if (used.size < 25) {
      while (used.has(index)) index = (index + 1) % 25;
      used.add(index);
    }
    assigned[key] = `${role}-${String(index + 1).padStart(2, "0")}` as AvatarAssetId;
  }
  return assigned;
}
