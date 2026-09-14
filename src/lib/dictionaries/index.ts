import type { Locale } from "@/lib/i18n";
import { getSiteInfo } from "@/lib/server/siteInfoStore";
import { ko, type Dictionary } from "./ko";
import { en } from "./en";

const dictionaries = { ko, en } as const;

/** Built per request — the contact details inside come from the admin page. */
export async function getDictionary(lang: Locale): Promise<Dictionary> {
  return dictionaries[lang](await getSiteInfo());
}

export type { Dictionary };
