"use client";
import { YearlyInfo } from "./components/details/yearly-info";

/**
 * 企業詳細ページ：メイン
 */
export default function CompanyDetailPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <main>
        <YearlyInfo />
      </main>
    </div>
  );
}
