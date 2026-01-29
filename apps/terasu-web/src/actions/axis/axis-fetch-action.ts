"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

export const axisFetchAction = async () => {
  const { userId } = await getRequiredSession();
  try {
    const result = await prismaClient.jobHuntingAxis.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        content: true,
        priorityType: true,
        displayOrder: true,
        createdAt: true,
      },
    });
    return result;
  } catch (error) {
    console.error("error", error);
    throw new Error("Failed to fetch axis data");
  }
};
