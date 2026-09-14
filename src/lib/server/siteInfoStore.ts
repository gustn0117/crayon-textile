import { cache } from "react";
import { connection } from "next/server";
import { defaultSiteInfo, parseSiteInfo, toInput, type SiteInfo } from "@/lib/siteInfo";
import { readJson, writeJson } from "./data";

const FILE = "site-info.json";

type Stored = { info: SiteInfo; updatedAt: string };

/** Read at request time. The file lives on the Docker volume, not in the build —
    a prerendered page would bake in whatever the build saw, and every deploy
    would quietly revert the live site to the defaults. */
export const getStoredSiteInfo = cache(
  async (): Promise<{ info: SiteInfo; updatedAt: string | null }> => {
    await connection();
    try {
      const stored = await readJson<Stored>(FILE);
      if (!stored) return { info: defaultSiteInfo, updatedAt: null };
      const parsed = parseSiteInfo(toInput(stored.info));
      if (!parsed.ok) {
        console.error("[site-info] stored file failed validation, using defaults", parsed.errors);
        return { info: defaultSiteInfo, updatedAt: null };
      }
      return { info: parsed.info, updatedAt: stored.updatedAt };
    } catch (err) {
      console.error("[site-info] read failed, using defaults", err);
      return { info: defaultSiteInfo, updatedAt: null };
    }
  },
);

export async function getSiteInfo() {
  return (await getStoredSiteInfo()).info;
}

export async function saveSiteInfo(info: SiteInfo) {
  await writeJson(FILE, { info, updatedAt: new Date().toISOString() } satisfies Stored);
}
