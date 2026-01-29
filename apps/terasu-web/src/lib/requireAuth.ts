import { auth } from "@terasu/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

/**
 * 認証チェック関数
 * @returns {{ userId: string | undefined, session: Session }}
 */
export async function getRequiredSession() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("認証が必要です。");
    }
    return { userId, session };
  } catch (error) {
    console.error("認証エラー:", error);
    redirect("/login");
  }
}
