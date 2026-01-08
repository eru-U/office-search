import { prismaClient } from "../lib/client";

export const seedUsers = async () => {
  console.log("👤 Seeding Users...");
  const users = [];
  for (let i = 1; i <= 3; i++) {
    users.push(
      await prismaClient.user.upsert({
        where: { email: `user${i}@example.com` },
        update: {},
        create: {
          id: `u-${i}`,
          name: `ユーザー ${i}`,
          email: `user${i}@example.com`,
        },
      }),
    );
  }
  return users;
};
