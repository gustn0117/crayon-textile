import type { Locale } from "@/lib/i18n";
import { ko, type Dictionary } from "./ko";
import { en } from "./en";

const dictionaries = { ko, en } as const;

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
