import { prismaClient } from "../lib/client";
import { seedAuth } from "./auth";
import { seedCompanies } from "./company";
import { SEED_CONFIG } from "./config";
import { seedMasters } from "./master";
import { seedPersonalData } from "./personal";

async function main() {
  const targetUserId = SEED_CONFIG.userId;
  console.log(`🚀 シード開始: ターゲットユーザー [${targetUserId}]`);

  try {
    // ユーザーが存在しない場合のみ作成（GitHub連携のアカウント保護）
    await prismaClient.user.upsert({
      where: { id: targetUserId },
      update: {},
      create: {
        id: targetUserId,
        name: "Dev User",
        email: "dev@example.com",
      },
    });

    // 依存関係を考慮した順番で実行
    await seedMasters(targetUserId);
    await seedCompanies(targetUserId);
    await seedPersonalData(targetUserId);
    await seedAuth(targetUserId);

    console.log("✅ 全てのデータが正常にセットアップされました。");
  } catch (e) {
    console.error("❌ エラー発生:", e);
    process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

main();
