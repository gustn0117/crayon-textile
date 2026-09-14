import type { Locale } from "./i18n";

/* Content nodes carry both languages, so a Korean string can never ship
   without its English twin. */
export type Bi = { ko: string; en: string };

export function pick(v: Bi, lang: Locale) {
  return v[lang];
}
