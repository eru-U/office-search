"use client";

// biome-ignore assist/source/organizeImports: <>
import { getIndustriesAction } from "@/app/actions/industories/get-industries-action";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { CompanyListArraySchema } from "@terasu/schema";
import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompanyListItem } from "./components/company-list-item";
import { CompanySearch } from "./components/company-search";

export default function CompanyListPage() {
  const searchParams = useSearchParams();

  // 🚀 1. 業界データを保持するステート（初期値は空配列）
  const [industries, setIndustries] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  // 業界一覧をfetch
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const result = await getIndustriesAction();

        // 🚀 1. 成功したかどうかをチェック
        if (result.success && result.data) {
          // 🚀 2. Action側の { label, value } を Page側の { name, id } に変換
          const formattedData = result.data.map((item) => ({
            id: item.value, // value を id に
            name: item.label ?? "", // label を name に（nullなら空文字）
          }));

          setIndustries(formattedData);
        } else {
          console.error("Actionがエラーを返しました:", result.error);
        }
      } catch (error) {
        console.error("通信エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIndustries();
  }, []);

  // --- 💡 ページネーション・ロジック ---
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalCount = 105; // 本来はDBから取得した全件数
  const pageSize = 20;
  const totalPages = Math.ceil(totalCount / pageSize);

  // 1からtotalPagesまでの配列を作成 [1, 2, 3, 4, 5, 6]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // テスト用データ（現在は空配列にするとEmptyが確認できます）
  const companies: CompanyListArraySchema = [
    {
      id: "1",
      name: "DEFY株式会社",
      amount: 2000000,
      aspirationLevel: 3,
      industryName: ["DX推進", "コンサル"],
      score: 100,
      categoryName: "月",
    },
    {
      id: "2",
      name: "DEFY株式会社",
      amount: 2000000,
      aspirationLevel: 3,
      industryName: ["DX推進", "コンサル"],
      score: 100,
      categoryName: "月",
    },
    {
      id: "3",
      name: "DEFY株式会社",
      amount: 2000000,
      aspirationLevel: 3,
      industryName: ["DX推進", "コンサル"],
      score: 100,
      categoryName: "月",
    },
    {
      id: "4",
      name: "DEFY株式会社",
      amount: 2000000,
      aspirationLevel: 3,
      industryName: ["DX推進", "コンサル"],
      score: 100,
      categoryName: "月",
    },
    {
      id: "5",
      name: "DEFY株式会社",
      amount: 2000000,
      aspirationLevel: 3,
      industryName: ["DX推進", "コンサル"],
      score: 100,
      categoryName: "月",
    },
  ];

  /**
   * 💡 再利用可能なページネーション・レンダラー
   */
  const renderPagination = (isTop = false) => {
    if (totalPages <= 1) return null;
    return (
      <div className={isTop ? "pb-2" : "pt-4"}>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${Math.max(1, currentPage - 1)}`}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {pageNumbers.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href={`?page=${p}`}
                  isActive={p === currentPage}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* ページ数が多い場合は適宜 Ellipsis を入れるロジックを追加可能 */}
            {totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                href={`?page=${Math.min(totalPages, currentPage + 1)}`}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4 relative">
      <h1 className="text-xl font-bold tracking-tight">企業一覧</h1>

      {/* 💡 追従する検索バーコンテナ（AccordionはCompanySearchの中に実装されている想定） */}
      {/* Page側 */}
      <div className="sticky top-0 z-30 -mx-4 px-4 py-2 bg-background/80 backdrop-blur-md border-b">
        {isLoading ? (
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ) : (
          <CompanySearch industries={industries} />
        )}
      </div>

      <div className="space-y-4">
        {companies.length === 0 ? (
          <Empty className="border-2 border-dashed border-muted/50 rounded-lg bg-gray-50/30">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchX />
              </EmptyMedia>
              <EmptyTitle>企業が見つかりませんでした</EmptyTitle>
              <EmptyDescription>
                検索条件を変更するか、キーワードを減らして再度お試しください。
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            {/* --- 💡 上部ページネーション & 件数サマリー --- */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-1">
              <p className="text-xs text-muted-foreground font-medium">
                全 <span className="text-foreground">{totalCount}</span> 件中
                <span className="mx-1">
                  {(currentPage - 1) * pageSize + 1} 〜{" "}
                  {Math.min(currentPage * pageSize, totalCount)}
                </span>
                件を表示
              </p>
              {renderPagination(true)}
            </div>

            {/* --- リスト表示 --- */}
            <div className="grid grid-cols-1 gap-1">
              {companies.map((company) => (
                <CompanyListItem key={company.id} company={company} />
              ))}
            </div>

            {/* --- 💡 下部ページネーション --- */}
            <div className="border-t pt-4">{renderPagination(false)}</div>
          </>
        )}
      </div>
    </div>
  );
}
