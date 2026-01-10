import { prismaClient } from "../lib/client";

export const seedUsers = async () => {
  console.log("👤 テスト用ユーザーの作成（オプション）...");
  const users = [];
  for (let i = 1; i <= 3; i++) {
    users.push(
      await prismaClient.user.upsert({
        where: { email: `test-user${i}@example.com` },
        update: {},
        create: {
          id: `u-${i}`,
          name: `テストユーザー ${i}`,
          email: `test-user${i}@example.com`,
        },
      }),
    );
  }
  return users;
};
