export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

/** Korean lives at the root, English under /en. */
export function localePath(lang: Locale, path: string) {
  if (lang === "ko") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** The same page in the other language — used by the header switcher. */
export function otherLocalePath(lang: Locale, path: string) {
  return localePath(lang === "ko" ? "en" : "ko", path);
}

export const htmlLang: Record<Locale, string> = { ko: "ko", en: "en" };
