/* In-memory attempt counter shared by the admin login and the inquiry form.
   One container serves the site, so a Map is enough; it resets on restart,
   which only ever loosens the limit. */

type Bucket = { count: number; since: number };
const buckets = new Map<string, Bucket>();

/** Records one attempt for `key` inside `scope`. Returns false — without
    counting — once `max` attempts have landed within `windowMs`. */
export function take(scope: string, key: string, max: number, windowMs: number) {
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [id, b] of buckets) if (now - b.since > windowMs) buckets.delete(id);
  }
  const id = `${scope}:${key}`;
  let bucket = buckets.get(id);
  if (!bucket || now - bucket.since > windowMs) {
    bucket = { count: 0, since: now };
    buckets.set(id, bucket);
  }
  if (bucket.count >= max) return false;
  bucket.count += 1;
  return true;
}

export function reset(scope: string, key: string) {
  buckets.delete(`${scope}:${key}`);
}
