"use client";
import { YearlyInfo } from "./components/details/yearly-info";

/**
 * 企業詳細ページ：メイン
 */
export default function CompanyDetailPage() {
  return (
    <div className="bg-slate-50/50">
      <main>
        <YearlyInfo />
      </main>
    </div>
  );
}
