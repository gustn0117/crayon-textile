import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies, headers } from "next/headers";
import { readJson, writeJson } from "./data";

const scrypt = promisify(scryptCallback) as (
  password: string,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

const COOKIE = "crayon_admin";
const COOKIE_PATH = "/admin";
const SESSION_HOURS = 8;
const PASSWORD_FILE = "admin-password.json";
const SECRET_FILE = "admin-secret.json";

type PasswordRecord = { salt: string; hash: string };

async function hashPassword(password: string, salt: Buffer = randomBytes(16)): Promise<PasswordRecord> {
  const hash = await scrypt(password, salt, 32);
  return { salt: salt.toString("hex"), hash: hash.toString("hex") };
}

/** Seeded once from ADMIN_PASSWORD, then owned by the admin page. The repo is
    public, so the password never appears in the code. */
async function getPasswordRecord(): Promise<PasswordRecord | null> {
  const stored = await readJson<PasswordRecord>(PASSWORD_FILE);
  if (stored) return stored;
  const seed = process.env.ADMIN_PASSWORD;
  if (!seed) return null;
  const record = await hashPassword(seed);
  await writeJson(PASSWORD_FILE, record, 0o600);
  return record;
}

let secretPromise: Promise<Buffer> | null = null;

/** Kept on the volume so sessions survive a container restart. */
function getSecret() {
  secretPromise ??= (async () => {
    const stored = await readJson<{ secret: string }>(SECRET_FILE);
    if (stored) return Buffer.from(stored.secret, "hex");
    const secret = randomBytes(32);
    await writeJson(SECRET_FILE, { secret: secret.toString("hex") }, 0o600);
    return secret;
  })();
  return secretPromise;
}

/** Binding the signature to the password hash means changing the password
    signs out every existing session. */
async function sign(expires: number, record: PasswordRecord) {
  return createHmac("sha256", await getSecret()).update(`${expires}.${record.hash}`).digest("hex");
}

function sameHex(a: string, b: string) {
  const left = Buffer.from(a, "hex");
  const right = Buffer.from(b, "hex");
  return left.length > 0 && left.length === right.length && timingSafeEqual(left, right);
}

export async function isAdmin() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;
  const [expiresRaw, signature] = token.split(".");
  const expires = Number(expiresRaw);
  if (!signature || !Number.isFinite(expires) || expires < Date.now()) return false;
  const record = await getPasswordRecord();
  if (!record) return false;
  return sameHex(signature, await sign(expires, record));
}

async function startSession(record: PasswordRecord) {
  const expires = Date.now() + SESSION_HOURS * 3_600_000;
  (await cookies()).set(COOKIE, `${expires}.${await sign(expires, record)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: COOKIE_PATH,
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: COOKIE_PATH });
}

/* A four-digit password falls to 10,000 guesses, so failures are capped per
   address and across all addresses. In memory: this site runs one container. */
const WINDOW_MS = 15 * 60_000;
const MAX_PER_IP = 5;
const MAX_TOTAL = 30;

type Bucket = { count: number; since: number };
const buckets = new Map<string, Bucket>();
const total: Bucket = { count: 0, since: 0 };

function fresh(bucket: Bucket, now: number) {
  if (now - bucket.since > WINDOW_MS) {
    bucket.count = 0;
    bucket.since = now;
  }
  return bucket;
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

export type AuthResult = { ok: true } | { ok: false; error: string };

async function passwordMatches(password: string, record: PasswordRecord) {
  const attempt = await hashPassword(password.slice(0, 200), Buffer.from(record.salt, "hex"));
  return sameHex(attempt.hash, record.hash);
}

export async function login(password: string): Promise<AuthResult> {
  const now = Date.now();
  const ip = await clientIp();

  if (buckets.size > 1000) {
    for (const [key, bucket] of buckets) if (now - bucket.since > WINDOW_MS) buckets.delete(key);
  }
  const mine = fresh(buckets.get(ip) ?? { count: 0, since: now }, now);
  buckets.set(ip, mine);
  fresh(total, now);

  if (mine.count >= MAX_PER_IP || total.count >= MAX_TOTAL) {
    return { ok: false, error: "로그인 시도가 너무 많습니다. 15분 뒤에 다시 시도해 주세요." };
  }

  const record = await getPasswordRecord();
  if (!record) {
    return { ok: false, error: "관리자 비밀번호가 설정되지 않았습니다. 서버의 ADMIN_PASSWORD를 확인해 주세요." };
  }

  if (!(await passwordMatches(password, record))) {
    mine.count += 1;
    total.count += 1;
    return { ok: false, error: "비밀번호가 올바르지 않습니다." };
  }

  buckets.delete(ip);
  await startSession(record);
  return { ok: true };
}

export async function changePassword(current: string, next: string): Promise<AuthResult> {
  const record = await getPasswordRecord();
  if (!record || !(await passwordMatches(current, record))) {
    return { ok: false, error: "현재 비밀번호가 올바르지 않습니다." };
  }
  if (next.length < 4 || next.length > 200) {
    return { ok: false, error: "새 비밀번호는 4자 이상으로 입력해 주세요." };
  }
  const updated = await hashPassword(next);
  await writeJson(PASSWORD_FILE, updated, 0o600);
  await startSession(updated);
  return { ok: true };
}
