import cuid from "cuid";
import { prismaClient } from "../lib/client";

/**
 * 認証関連データのシード
 */
export const seedAuth = async (userId: string) => {
  console.log("🔑 認証関連テーブルのシードを実行中...");

  // Accountの作成
  await prismaClient.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: "google",
        providerAccountId: `acc-${userId}`,
      },
    },
    update: {},
    create: {
      id: cuid(),
      userId,
      type: "oauth",
      provider: "google",
      providerAccountId: `acc-${userId}`,
    },
  });

  // Sessionの作成
  await prismaClient.session.upsert({
    where: { sessionToken: `token-${userId}` },
    update: { expires: new Date(Date.now() + 86400000) },
    create: {
      id: cuid(),
      userId,
      sessionToken: `token-${userId}`,
      expires: new Date(Date.now() + 86400000),
    },
  });

  // VerificationTokenはスキーマ上 id がなく、identifier & token の複合キーなのでそのまま
  await prismaClient.verificationToken.upsert({
    where: {
      identifier_token: {
        identifier: `user-${userId}`,
        token: `tok-${userId}`,
      },
    },
    update: {},
    create: {
      identifier: `user-${userId}`,
      token: `tok-${userId}`,
      expires: new Date(Date.now() + 86400000),
    },
  });
};
