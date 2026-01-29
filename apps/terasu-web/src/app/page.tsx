import { redirect } from "next/navigation";

// のちのちログイン前のトップページ（説明など）として使用する可能性有
export default function Home() {
  redirect("/dashboard");
}
