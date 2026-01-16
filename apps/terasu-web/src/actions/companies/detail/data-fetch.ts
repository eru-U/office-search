"use server";
import { getRequiredSession } from "@/lib/requireAuth";
import { prismaClient } from "@terasu/db";

/**
 * 年代IDから企業の詳細情報を取得する関数
 * @param id 年代ID
 */
export const detailDataFetch = async (id: string) => {
  const { userId } = await getRequiredSession();

  try {
    const result = await prismaClient.companyYearlyInfo.findMany({
      select: {
        id: true,
        representative: true,
        employeeCount: true,
        revenue: true,
        company: {
          select: {
            establishedDate: true,
            capital: true,
            phoneNumber: true,
            philosophies: {
              select: {
                id: true,
                content: true,
              },
            },
            branches: {
              select: {
                id: true,
                address: true,
              },
            },
          },
        },
        welfares: {
          select: {
            id: true,
            name: true,
            content: true,
          },
        },

        contactPersons: {
          select: {
            id: true,
            name: true,
            position: true,
          },
        },
      },
      where: {
        id: id,
        company: {
          userId: userId,
        },
      },
    });
    return result;
  } catch (error) {
    console.error("企業詳細情報を取得できませんでした。", error);
    throw error;
  }
};
