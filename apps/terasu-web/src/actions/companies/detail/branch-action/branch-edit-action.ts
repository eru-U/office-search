"use server";

import { prismaClient } from "@terasu/db";
import type { CompanyDetailBranchTypes } from "@terasu/schema/models/companyDetailBranchSchema";

/**
 * 企業に拠点・支店を編集する関数
 * @param branchId 拠点・支店ID
 */
export const branchEditAction = async (
  branchId: string,
  data: CompanyDetailBranchTypes,
) => {
  try {
    await prismaClient.branch.update({
      where: {
        id: branchId,
      },
      data: {
        address: data.address,
      },
    });
  } catch (error) {
    console.error("拠点・支店編集に失敗しました", error);
    throw error;
  }
};
