import { prismaClient } from "../lib/client";
import { seedAuth } from "./auth";
import { seedCompanies } from "./company";
import { seedMasters } from "./master";
import { seedPersonalData } from "./personal";
import { seedUsers } from "./user";

async function main() {
  console.log("🚀 Initializing Granular Seeding...");
  try {
    const users = await seedUsers();
    const targetUser = users[0]; // 最初のユーザーに紐付ける

    await seedMasters(targetUser.id);
    await seedCompanies(targetUser.id);
    await seedPersonalData(targetUser.id);
    await seedAuth(targetUser.id);

    console.log("✅ All seeds planted in their respective files!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

main();
