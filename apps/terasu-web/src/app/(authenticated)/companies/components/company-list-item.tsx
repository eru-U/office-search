"use client";
// apps/terasu-web/src/app/(authenticated)/companies/components/company-list-item.tsx
// biome-ignore assist/source/organizeImports: <>
import { StarRating } from "@/components/star-rating";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { companySchema } from "@terasu/schema";
import { Banknote, Building2 } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";

interface CompanyListItemProps {
  company: companySchema.CompanyListSchema;
}

/**
 * リスト一つ一つ用のコンポーネント
 */
export const CompanyListItem: FC<CompanyListItemProps> = ({ company }) => {
  // 💡 anyを使わず、型を絞り込むヘルパー
  const isAvailable = (val: string | number): val is number => {
    return typeof val === "number";
  };

  const renderSalary = () => {
    if (!isAvailable(company.amount)) return "---";

    const amount = company.amount;
    const isMonthly = company.categoryName?.includes("月");
    const annualAmount = isMonthly ? amount * 12 : amount;

    return (
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-green-600">
            {annualAmount.toLocaleString()}
          </span>
          <span className="text-xs font-bold text-green-600">
            円 (想定年収)
          </span>
        </div>
        {isMonthly && (
          <span className="text-[10px] text-gray-400">
            ※ {company.categoryName} {amount.toLocaleString()}円より換算
          </span>
        )}
      </div>
    );
  };

  return (
    <Link href={`companies/${company.id}`}>
      <Card className="group hover:shadow-md hover:border-blue-200 transition-all border-gray-100 my-2">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* 1. 企業メイン情報 */}
            <div className="md:col-span-4 space-y-2">
              <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 flex items-center gap-2 truncate">
                <Building2 className="w-4 h-4 shrink-0 text-blue-500/70" />
                {company.name}
              </h3>
              <div className="flex flex-wrap gap-1">
                {company.industryName.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-none text-[10px] px-1.5 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 2. 給与情報 */}
            <div className="md:col-span-3 flex items-center gap-3 border-l border-gray-100 md:pl-4">
              <div className="p-2 bg-green-50 rounded-full">
                <Banknote className="w-4 h-4 text-green-600" />
              </div>
              {renderSalary()}
            </div>

            {/* 3. 評価セクション (日本語ラベル) */}
            <div className="md:col-span-5 flex items-center gap-6 border-l border-gray-100 md:pl-4">
              <div className="flex flex-col gap-1 shrink-0">
                <span className="text-[10px] font-bold text-gray-400">
                  志望度
                </span>
                {isAvailable(company.aspirationLevel) ? (
                  <StarRating
                    value={company.aspirationLevel}
                    readOnly
                    className="scale-75 origin-left"
                  />
                ) : (
                  <span className="text-sm text-gray-300">---</span>
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-bold text-gray-400">
                    マッチング度
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-600">
                    {isAvailable(company.score) ? `${company.score}%` : "---"}
                  </span>
                </div>
                <Progress
                  value={isAvailable(company.score) ? company.score : 0}
                  className="h-1.5"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
