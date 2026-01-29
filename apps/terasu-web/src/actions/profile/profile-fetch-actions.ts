"use server";

// biome-ignore assist/source/organizeImports: <>
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

export const profileFetchAction = async () => {
  const { userId } = await getRequiredSession();
  try {
    const result = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        image: true,
        createdAt: true,
        qualifications: {
          select: {
            id: true,
            name: true,
            obtainedDate: true,
          },
        },
        userTechs: {
          select: {
            id: true,
            techStack: {
              select: {
                id: true,
                name: true,
              },
            },
            note: true,
            startedAt: true,
          },
        },
      },
    });
    return result;
  } catch (_error) {
    console.error("プロフィールの取得に失敗しました", _error);
    throw new Error("Failed to fetch profile");
  }
};
