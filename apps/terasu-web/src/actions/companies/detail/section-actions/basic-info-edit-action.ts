import { prismaClient } from "@terasu/db"
import type { BasicInfoEditTypes } from "@terasu/schema/models/companyDetailSchema";


/**
 * 
 * @param id 年代ID
 */
export const basicInfoEditAction = async (id:string, params: BasicInfoEditTypes) => {
  try {
    await prismaClient.companyYearlyInfo.update({
      where: {
        id: id
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
          }
        }
      }
    })
  } catch(_error) {
    console.error("更新に失敗しました", _error);
    
  }
}