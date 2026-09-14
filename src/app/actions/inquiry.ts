"use server";

import { headers } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { parseInquiry, type InquiryErrors } from "@/lib/inquiry";
import { take } from "@/lib/server/rateLimit";
import { newInquiryId, saveInquiry } from "@/lib/server/inquiryStore";

export type InquiryFormState = {
  status: "idle" | "error" | "success";
  message: string;
  id?: string;
  errors?: InquiryErrors;
};

const WINDOW_MS = 10 * 60_000;
const MAX_PER_IP = 3;
const MAX_TOTAL = 40;

function text(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v : "";
}

async function clientIp() {
  const h = await headers();
  return (
    h.get("cf-connecting-ip") ??
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/* The public form's action. Reachable by any POST, so everything is checked
   here regardless of what the form in the browser allowed. */
export async function submitInquiryAction(_prev: InquiryFormState, formData: FormData): Promise<InquiryFormState> {
  const lang: Locale = text(formData.get("lang")) === "en" ? "en" : "ko";
  const t = (await getDictionary(lang)).inquiry;

  // Honeypot: people never see this field. A bot that fills it gets a
  // convincing "thanks" and nothing is stored.
  if (text(formData.get("website"))) return { status: "success", message: t.successBody, id: newInquiryId() };

  const fields = ["type", "name", "phone", "email", "company", "use", "quantity", "message", "consent"];
  const parsed = parseInquiry(Object.fromEntries(fields.map((k) => [k, text(formData.get(k))])), lang);
  if (!parsed.ok) return { status: "error", message: t.errorSummary, errors: parsed.errors };

  // Counted only once the input is valid, so fixing a typo never costs an attempt.
  const ip = await clientIp();
  if (!take("inquiry", ip, MAX_PER_IP, WINDOW_MS) || !take("inquiry", "all", MAX_TOTAL, WINDOW_MS)) {
    return { status: "error", message: t.rateLimited };
  }

  try {
    const saved = await saveInquiry(parsed.data);
    return { status: "success", message: t.successBody, id: saved.id };
  } catch (err) {
    console.error("[inquiry] save failed", err);
    return { status: "error", message: t.saveFailed };
  }
}
