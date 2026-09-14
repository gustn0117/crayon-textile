"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server/adminAuth";
import { removeInquiry, setInquiryRead } from "@/lib/server/inquiryStore";

function id(formData: FormData) {
  const v = formData.get("id");
  return typeof v === "string" ? v : "";
}

/* Both check the session themselves: a Server Action is a public POST
   endpoint whether or not its form is on screen. */
export async function toggleReadAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const read = formData.get("read") === "true";
  await setInquiryRead(id(formData), read);
  revalidatePath("/admin", "layout");
  // The detail page marks whatever it shows as read, so "keep this unread"
  // has to leave the page — back to the list, where the dot is visible.
  if (!read) redirect("/admin/inquiries");
}

export async function deleteInquiryAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  await removeInquiry(id(formData));
  revalidatePath("/admin", "layout");
  redirect("/admin/inquiries");
}
