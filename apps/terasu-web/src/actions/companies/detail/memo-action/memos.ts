"use server";

import { prismaClient } from "@terasu/db";

/**
 * メモ追加用のサーバアクション
 * @param id 企業ID
 * @param content メモ内容
 */
export async function memoAdd(id: string, content: string) {
  try {
    // メモ追加
    await prismaClient.memo.create({
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
    // メモ編集
    await prismaClient.memo.update({
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

/**
 * メモ削除関数
 * @param id メモID
 */
export async function memoDelete(id: string) {
  try {
    await prismaClient.memo.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("企業情報取得エラー", error);
    return null;
  }
}

/**
 * 企業のメモ全件取得
 * @param id 企業ID
 */
export async function memoFetch(id: string) {
  try {
    const memos = await prismaClient.memo.findMany({
      where: {
        companyId: id,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return memos;
  } catch (error) {
    console.error("企業情報取得エラー", error);
    return null;
  }
}
