"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { changePassword, endSession, isAdmin, login } from "@/lib/server/adminAuth";
import { saveSiteInfo } from "@/lib/server/siteInfoStore";
import { parseSiteInfo, type SiteInfoField, type SiteInfoInput } from "@/lib/siteInfo";

export type FormState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Partial<Record<SiteInfoField, string>>;
};

const EXPIRED: FormState = {
  status: "error",
  message: "로그인이 만료되었습니다. 새로고침한 뒤 다시 로그인해 주세요.",
};

function text(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const result = await login(text(formData.get("password")));
  if (!result.ok) return { status: "error", message: result.error };
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin");
}

/* Every action checks the session itself: a Server Action is a public POST
   endpoint whether or not the form that calls it is on screen. */
export async function saveInfoAction(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdmin())) return EXPIRED;

  const fields: SiteInfoField[] = [
    "tel",
    "mobile",
    "fax",
    "email",
    "addressKo0",
    "addressKo1",
    "addressEn0",
    "addressEn1",
    "mapUrl",
  ];
  const input: SiteInfoInput = Object.fromEntries(fields.map((f) => [f, text(formData.get(f))]));
  const parsed = parseSiteInfo(input);
  if (!parsed.ok) {
    return { status: "error", message: "입력한 내용을 확인해 주세요.", errors: parsed.errors };
  }

  await saveSiteInfo(parsed.info);
  revalidatePath("/", "layout");
  return { status: "success", message: "저장했습니다. 사이트에 바로 반영됩니다." };
}

export async function passwordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdmin())) return EXPIRED;

  const next = text(formData.get("next"));
  if (next !== text(formData.get("confirm"))) {
    return { status: "error", message: "새 비밀번호 두 칸이 서로 다릅니다." };
  }
  const result = await changePassword(text(formData.get("current")), next);
  if (!result.ok) return { status: "error", message: result.error };
  return {
    status: "success",
    message: "비밀번호를 바꿨습니다. 다른 기기의 로그인은 모두 해제됩니다.",
  };
}
