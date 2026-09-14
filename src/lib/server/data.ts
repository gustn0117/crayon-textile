import { promises as fs } from "node:fs";
import path from "node:path";

/* The turbopackIgnore markers keep the build's file tracer from treating these
   runtime paths as imports — otherwise it copies the whole project, public
   folder included, into the standalone server bundle. */

/** The Docker volume in production (/app/data); ./data when run locally. */
export const dataDir =
  process.env.DATA_DIR ?? path.join(/* turbopackIgnore: true */ process.cwd(), "data");

function filePath(name: string) {
  return path.join(/* turbopackIgnore: true */ dataDir, name);
}

export async function readJson<T>(name: string): Promise<T | null> {
  try {
    return JSON.parse(await fs.readFile(filePath(name), "utf8")) as T;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

/** Write-then-rename, so a crash mid-save never leaves half a JSON file behind. */
export async function writeJson(name: string, value: unknown, mode = 0o644) {
  await fs.mkdir(dataDir, { recursive: true });
  const target = filePath(name);
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), { mode });
  await fs.rename(tmp, target);
}
