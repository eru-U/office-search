"use server";

import { prismaClient } from "@terasu/db";

/**
 * メモ追加用のサーバアクション
 * @param id 企業ID
 * @param content メモ内容
 */
export async function memoAdd(id: string, content: string) {
  try {
    if (!id) {
      return null;
    }

    // メモ追加
    prismaClient.memo.create({
      data: {
        companyId: id,
        content: content,
      },
    });
  } catch (error) {
    console.error("企業情報取得エラー", error);
    return null;
  }
}

/**
 * メモ編集用のサーバアクション
 * @param id メモID
 * @param content メモ内容
 */
export async function memoEdit(id: string, content: string) {
  try {
    if (!id) {
      return null;
    }

    // メモ編集
    prismaClient.memo.update({
      where: {
        id: id,
      },
      data: {
        content: content,
      },
    });
  } catch (error) {
    console.error("企業情報取得エラー", error);
    return null;
  }
}
