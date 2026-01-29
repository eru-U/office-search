"use server";

import { prismaClient } from "@terasu/db";
import type { CompanyDetailBranchTypes } from "@terasu/schema/models/companyDetailBranchSchema";

/**
 * 企業に拠点・支店を追加する関数
 * @param companyId 企業ID
 */
export const branchAddAction = async (
  companyId: string,
  data: CompanyDetailBranchTypes,
) => {
  try {
    await prismaClient.branch.create({
      data: {
        companyId: companyId,
        address: data.address,
      },
    });
  } catch (error) {
    console.error("拠点・支店登録に失敗しました", error);
    throw error;
  }
};
