import { randomBytes } from "node:crypto";
import { listJsonDir, readJson, removeJson, writeJson } from "./data";
import type { Inquiry, InquiryData } from "../inquiry";

/* One file per enquiry under data/inquiries. Two people submitting at the same
   moment write two files, so there is nothing to lock. */

const DIR = "inquiries";
const ID = /^\d{6}-[0-9a-f]{4}$/;

/** The privacy policy promises one year; the store enforces it. */
export const RETENTION_MS = 365 * 24 * 3_600_000;

/** "260914-3f2a": a date people can read, plus four hex digits. */
export function newInquiryId(now = new Date()) {
  const d = now.toISOString().slice(2, 10).replace(/-/g, "");
  return `${d}-${randomBytes(2).toString("hex")}`;
}

function file(id: string) {
  if (!ID.test(id)) throw new Error(`bad inquiry id: ${id}`);
  return `${DIR}/${id}.json`;
}

async function purge(items: { name: string; value: Inquiry }[]) {
  const cutoff = Date.now() - RETENTION_MS;
  const kept: Inquiry[] = [];
  for (const { name, value } of items) {
    const at = Date.parse(value?.createdAt ?? "");
    if (!value?.id || Number.isNaN(at)) {
      console.error(`[inquiry] skipping malformed ${name}`);
      continue;
    }
    if (at < cutoff) {
      await removeJson(`${DIR}/${name}`);
      continue;
    }
    kept.push(value);
  }
  return kept.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Newest first. Anything past the retention window is deleted on the way. */
export async function listInquiries() {
  return purge(await listJsonDir<Inquiry>(DIR));
}

export async function saveInquiry(data: InquiryData): Promise<Inquiry> {
  let id = newInquiryId();
  for (let i = 0; i < 5 && (await readJson(file(id))); i++) id = newInquiryId();
  const inquiry: Inquiry = { ...data, id, createdAt: new Date().toISOString(), readAt: null };
  await writeJson(file(id), inquiry, 0o600);
  // Opportunistic purge; never lets a cleanup failure fail the form.
  void listInquiries().catch(() => {});
  return inquiry;
}

export async function getInquiry(id: string) {
  if (!ID.test(id)) return null;
  return readJson<Inquiry>(file(id));
}

export async function setInquiryRead(id: string, read: boolean) {
  const current = await getInquiry(id);
  if (!current) return null;
  const updated: Inquiry = { ...current, readAt: read ? new Date().toISOString() : null };
  await writeJson(file(id), updated, 0o600);
  return updated;
}

export async function removeInquiry(id: string) {
  if (!ID.test(id)) return;
  await removeJson(file(id));
}

export async function unreadCount() {
  return (await listInquiries()).filter((i) => !i.readAt).length;
}
