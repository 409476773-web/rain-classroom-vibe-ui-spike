// Original Rain Classic artwork, copied unchanged. Provenance: evidence/runtime/empty-refinement/source-lock.json.
export const emptyIllustrations = {
  "empty-box": { light: new URL("./assets/empty-box-light.svg", import.meta.url).href, dark: new URL("./assets/empty-box-dark.svg", import.meta.url).href },
  "empty-search": { light: new URL("./assets/empty-search-light.svg", import.meta.url).href, dark: new URL("./assets/empty-search-dark.svg", import.meta.url).href },
  "empty-paper": { light: new URL("./assets/empty-paper-light.svg", import.meta.url).href, dark: new URL("./assets/empty-paper-dark.svg", import.meta.url).href },
  "no-one": { light: new URL("./assets/no-one-light.svg", import.meta.url).href, dark: new URL("./assets/no-one-dark.svg", import.meta.url).href },
  "outer-space": { light: new URL("./assets/outer-space-light.svg", import.meta.url).href, dark: new URL("./assets/outer-space-dark.svg", import.meta.url).href },
  "empty-sofa": { light: new URL("./assets/empty-sofa-light.svg", import.meta.url).href, dark: new URL("./assets/empty-sofa-dark.svg", import.meta.url).href },
  simple: { light: new URL("./assets/simple-light.svg", import.meta.url).href, dark: new URL("./assets/simple-dark.svg", import.meta.url).href },
} as const;

export type EmptyIllustration = keyof typeof emptyIllustrations;
