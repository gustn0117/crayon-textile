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
  const target = filePath(name);
  await fs.mkdir(path.dirname(target), { recursive: true });
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), { mode });
  await fs.rename(tmp, target);
}

/** Every *.json directly inside `dir` (relative to dataDir). A file that does
    not parse is skipped and logged, never fatal — one bad inquiry must not
    hide the rest. Missing directory → empty list. */
export async function listJsonDir<T>(dir: string): Promise<{ name: string; value: T }[]> {
  const full = filePath(dir);
  let names: string[];
  try {
    names = await fs.readdir(full);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
  const out: { name: string; value: T }[] = [];
  for (const name of names) {
    if (!name.endsWith(".json")) continue;
    try {
      out.push({ name, value: JSON.parse(await fs.readFile(path.join(full, name), "utf8")) as T });
    } catch (err) {
      console.error(`[data] skipping unreadable ${dir}/${name}`, err);
    }
  }
  return out;
}

export async function removeJson(name: string) {
  await fs.rm(filePath(name), { force: true });
}
