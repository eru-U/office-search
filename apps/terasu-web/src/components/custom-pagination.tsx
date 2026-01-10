"use client";

// biome-ignore assist/source/organizeImports: <>
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface CustomPaginationProps {
  totalCount: number;
  pageSize: number;
}

/**
 * 検索条件を維持したままページ移動を行う共通ページネーション
 */
export const CustomPagination = ({
  totalCount,
  pageSize,
}: CustomPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalCount / pageSize);

  // 現在の検索条件（クエリパラメータ）を維持したままページ番号だけを更新したURLを生成
  const createPageHref = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // 1ページしかない場合は何も表示しない
  if (totalPages <= 1) return null;

  // 表示するページ番号を計算（最初、最後、現在の前後を表示）
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* 前へボタン */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageHref(Math.max(1, currentPage - 1))}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {/* ページ番号ボタン（Ellipsis対応） */}
        {pageNumbers.map((p, index) => {
          const showEllipsis = index > 0 && p - pageNumbers[index - 1] > 1;

          return (
            <div key={p} className="flex items-center">
              {showEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href={createPageHref(p)}
                  isActive={p === currentPage}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            </div>
          );
        })}

        {/* 次へボタン */}
        <PaginationItem>
          <PaginationNext
            href={createPageHref(Math.min(totalPages, currentPage + 1))}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
