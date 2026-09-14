import { HomePage } from "@/components/pages/HomePage";
import { getDictionary } from "@/lib/dictionaries";
import { getSiteInfo } from "@/lib/server/siteInfoStore";

export default async function Page() {
  return <HomePage lang="ko" d={await getDictionary("ko")} info={await getSiteInfo()} />;
}
