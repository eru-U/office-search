"use client";

import { CompanyDetailHeader } from "./components/company-detail-header/company-detail-header";

/**
 * 企業詳細ページ：メイン
 */
export default function CompanyDetailPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <CompanyDetailHeader />

      <main></main>
    </div>
  );
}
