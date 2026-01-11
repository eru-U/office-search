"use client";

import { CompanyDetailHeader } from "./components/company-detail-header/company-detail-header";
import { CompanyYearlyTabs } from "./components/company-yearly-tabs/company-yearly-tabs";

/**
 * 企業詳細ページ：メイン
 */
export default function CompanyDetailPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 企業の顔となるヘッダー（名前・公式サイト・評価・メモボタンなど） */}
      <CompanyDetailHeader />

      {/* メインコンテンツエリア：mx-auto で中央寄せ */}
      <main className="container mx-auto max-w-6xl w-full py-8 space-y-8 px-4 sm:px-6 lg:px-8">
        {/* 年度ごとの情報を切り替えるためのタブ。
          この中に基本情報から人物情報までの全カードが内包されます。
        */}
        <CompanyYearlyTabs />
      </main>
    </div>
  );
}
