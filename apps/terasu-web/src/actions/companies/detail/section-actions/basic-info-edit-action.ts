"use server";
import { prismaClient } from "@terasu/db";
import type { BasicInfoEditTypes } from "@terasu/schema/models/companyDetailSchema";
import { revalidatePath } from "next/cache";

/**
 *
 * @param id 年代ID
 */
export const basicInfoEditAction = async (
  id: string,
  params: BasicInfoEditTypes,
) => {
  try {
    await prismaClient.companyYearlyInfo.update({
      where: {
        id: id,
      },
      data: {
        representative: params.representative,
        employeeCount: params.employeeCount,
        revenue: params.revenue,
        company: {
          update: {
            establishedDate: params.establishedDate,
            capital: params.capital,
            phoneNumber: params.phoneNumber,
          },
        },
      },
    });
    revalidatePath(`/companies/${id}`);
  } catch (error) {
    console.error("基本情報の更新に失敗しました", error);
    throw error;
  }
};
