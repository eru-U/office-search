"use client";

// biome-ignore assist/source/organizeImports: <>
import { searchCompaniesAction } from "@/app/actions/companies/search-action";
import { getIndustriesAction } from "@/app/actions/industories/get-industries-action";
import { CustomPagination } from "@/components/custom-pagination";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import type { CompanyListArraySchema } from "@terasu/schema";
import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CompanyListItem } from "./components/company-list-item";
import { CompanySearch } from "./components/company-search";

// スケルトンパーツ：リストアイテム用
const ListItemSkeleton = () => (
  <div className="flex items-center space-x-4 p-4 border rounded-xl">
    <Skeleton className="h-12 w-12 rounded-lg" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-4 w-[40%]" />
      <Skeleton className="h-3 w-[60%]" />
    </div>
    <Skeleton className="h-8 w-16 rounded-md" />
  </div>
);

// スケルトンパーツ：検索バー用
const SearchSkeleton = () => (
  <div className="flex flex-col gap-2 w-full">
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
);

export default function CompanyListPage() {
  const searchParams = useSearchParams();
  const [industries, setIndustries] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [companies, setCompanies] = useState<CompanyListArraySchema>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const pageSize = 20;
  const currentPage = Number(searchParams.get("page")) || 1;

  /**
   * ここで検索し、一覧表示する
   */
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const searchArgs = {
          name: searchParams.get("name") || "",
          industryName: searchParams.get("industryName") || "",
          yearSalary: Number(searchParams.get("yearSalary")) || 0,
          aspirationLevel: Number(searchParams.get("aspirationLevel")) || 0,
          score: Number(searchParams.get("score")) || 0,
          page: currentPage,
        };
        console.log(`検索結果${searchArgs}`);

        const [indResult, compResult] = await Promise.all([
          getIndustriesAction(),
          searchCompaniesAction(searchArgs),
        ]);
        console.log(compResult);

        if (indResult.success && indResult.data) {
          setIndustries(
            indResult.data.map((i) => ({ id: i.value, name: i.label ?? "" })),
          );
        }

        if (compResult.success) {
          setCompanies(compResult.data);
          setTotalCount(compResult.totalCount);
        }
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchParams, currentPage]);

  return (
    <div className="p-4 space-y-4 relative">
      <h1 className="text-xl font-bold tracking-tight">企業一覧</h1>

      {/* 検索バーセクション */}
      <div className="sticky top-0 z-30 -mx-4 px-4 py-2 bg-background/80 backdrop-blur-md border-b">
        {isLoading && industries.length === 0 ? (
          <SearchSkeleton />
        ) : (
          <CompanySearch industries={industries} />
        )}
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-1">
            {[...Array(5)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <>
              <ListItemSkeleton key={i} />
            ))}
          </div>
        ) : companies.length === 0 ? (
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
            {/* 上部サマリー & ページネーション */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-1">
              <p className="text-xs text-muted-foreground font-medium">
                全 <span className="text-foreground">{totalCount}</span> 件中
                <span className="mx-1">
                  {(currentPage - 1) * pageSize + 1} 〜{" "}
                  {Math.min(currentPage * pageSize, totalCount)}
                </span>
                件を表示
              </p>
              <CustomPagination totalCount={totalCount} pageSize={pageSize} />
            </div>

            {/* リスト本体 */}
            <div className="grid grid-cols-1 gap-1">
              {companies.map((company) => (
                <CompanyListItem key={company.id} company={company} />
              ))}
            </div>

            {/* 下部ページネーション */}
            <div className="border-t pt-4">
              <CustomPagination totalCount={totalCount} pageSize={pageSize} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
