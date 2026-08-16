import { HomePage } from "@/components/pages/HomePage";
import { getDictionary } from "@/lib/dictionaries";

export default function Page() {
  return <HomePage lang="ko" d={getDictionary("ko")} />;
}
