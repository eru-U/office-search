import { auth } from "@terasu/auth";
import { Session } from "next-auth";

/**
 * 認証チェック関数
 * @returns {{ userId: string | undefined, session: Session }}
 */
export async function getRequiredSession() {
  const session = await auth();
  const userId = session?.user?.id;
  return { userId, session };
}
