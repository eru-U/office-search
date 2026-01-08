import { prismaClient } from "../lib/client";

export const seedAuth = async (userId: string) => {
  console.log("🔑 Seeding Auth tables...");
  await prismaClient.account.create({
    data: {
      userId,
      type: "oauth",
      provider: "google",
      providerAccountId: `acc-${userId}`,
    },
  });
  await prismaClient.session.create({
    data: {
      userId,
      sessionToken: `token-${userId}`,
      expires: new Date(Date.now() + 86400000),
    },
  });
  await prismaClient.verificationToken.create({
    data: {
      identifier: `user-${userId}`,
      token: `tok-${userId}`,
      expires: new Date(),
    },
  });
};
