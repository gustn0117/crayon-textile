import { HomePage } from "@/components/pages/HomePage";
import { getDictionary } from "@/lib/dictionaries";

export default async function Page() {
  return <HomePage lang="ko" d={await getDictionary("ko")} />;
}
