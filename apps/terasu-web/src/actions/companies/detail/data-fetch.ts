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
                content: true,
              },
            },
          },
        },
        welfares: {
          select: {
            name: true,
            content: true,
          },
        },
        branches: {
          select: {
            address: true,
          },
        },
        contactPersons: {
          select: {
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
    console.error("Error fetching detail data:", error);
    throw error;
  }
};
