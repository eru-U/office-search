import { prismaClient } from "../lib/client";

export const seedAuth = async (userId: string) => {
  console.log("🔑 認証関連テーブルのシードを実行中...");

  await prismaClient.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: "google",
        providerAccountId: `acc-${userId}`,
      },
    },
    update: {},
    create: {
      userId,
      type: "oauth",
      provider: "google",
      providerAccountId: `acc-${userId}`,
    },
  });

  await prismaClient.session.upsert({
    where: { sessionToken: `token-${userId}` },
    update: { expires: new Date(Date.now() + 86400000) },
    create: {
      userId,
      sessionToken: `token-${userId}`,
      expires: new Date(Date.now() + 86400000),
    },
  });

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
